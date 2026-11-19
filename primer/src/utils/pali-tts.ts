// 빠알리어 TTS — 녹음 mp3(edge-tts) 우선 재생 + 기기 목소리(Web Speech API) 폴백

import { useStore } from '../store/useStore'
import { pickPaliVoice, textForVoice, type VoiceGender } from '../shared/pali-voice'
import { readVoiceGender, saveVoiceGender } from '../shared/voice-setting'

export { paliToDevanagari } from '../shared/pali-voice'

const BASE = import.meta.env.BASE_URL || '/'

/** 설정의 소리 속도 (0.75 느리게 / 1 보통) */
function audioRate(): number {
  try {
    const r = useStore.getState().audioRate
    return r === 0.75 ? 0.75 : 1
  } catch { return 1 }
}

// 소리가 끝났을 때(또는 멈췄을 때) 알려 줄 함수 — 한 번에 하나
let onDone: (() => void) | null = null
let playId = 0
/** id: 그 소리를 시작할 때의 번호 — 이미 다른 소리로 바뀌었으면 무시 */
function finishCurrent(id = playId) {
  if (id !== playId) return
  const f = onDone
  onDone = null
  if (f) f()
}
const AUDIO_DIR = `${BASE}audio/`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let manifest: Record<string, string> | null = null
let manifestLoaded = false

// 매니페스트 로드 (텍스트 → 파일명 매핑)
async function loadManifest() {
  if (manifestLoaded) return
  manifestLoaded = true
  try {
    const res = await fetch(`${AUDIO_DIR}manifest.json`, { cache: 'no-store' })
    if (res.ok) {
      const raw = await res.json()
      // 원본 키 + 소문자 키 모두 등록 (대소문자 무시 매칭)
      manifest = {}
      for (const [rawKey, val] of Object.entries(raw)) {
        const key = rawKey.normalize('NFC')
        manifest[key] = val as string
        const lower = key.toLowerCase()
        if (!manifest[lower]) manifest[lower] = val as string
      }
    }
  } catch { /* manifest 없으면 Web Speech API 폴백 */ }
}

// 앱 시작 시 매니페스트 로드
const manifestReady = loadManifest()

// ───── 목소리 성별 — 설정(또는 내 서재)에서 고름, 기본은 남성 ─────
let gender: VoiceGender = readVoiceGender()
let femaleManifest: Record<string, string> | null = null
let femaleLoading: Promise<void> | null = null
function loadFemale(): Promise<void> {
  if (!femaleLoading) {
    femaleLoading = fetch(`${BASE}audio-f/manifest.json`, { cache: 'no-cache' })
      .then(r => (r.ok ? r.json() : {}))
      .then(raw => {
        const m: Record<string, string> = {}
        for (const [rawKey, val] of Object.entries(raw as Record<string, string>)) {
          const key = rawKey.normalize('NFC')
          m[key] = val
          if (!m[key.toLowerCase()]) m[key.toLowerCase()] = val
        }
        femaleManifest = m
      })
      .catch(() => { femaleManifest = {} })
  }
  return femaleLoading
}
/** 목소리 성별 바꾸기 — 여성은 여성 녹음(audio-f)과 여성 기기 목소리를 먼저 씀
 *  save: true면 앱 전체 설정으로 저장(설정 화면), false면 지금만(내 서재 안에서) */
export function setVoiceGender(g: VoiceGender, save = true): void {
  gender = g
  if (save) saveVoiceGender(g)
  if (g === 'f') void loadFemale()
}
if (gender === 'f' && typeof window !== 'undefined') void loadFemale()

/** 이 글의 녹음(mp3)이 있는지 — 녹음 목록을 다 받은 뒤에 답함 */
export async function hasRecording(text: string): Promise<boolean> {
  await manifestReady
  if (gender === 'f') await loadFemale()
  return !!findMp3(text)
}

// 현재 재생 중인 Audio 인스턴스
let currentAudio: HTMLAudioElement | null = null

/** 녹음 파일 주소(BASE 뒤) — 여성을 골랐으면 여성 녹음 먼저, 없으면 남성 녹음 */
function findMp3(text: string): string | null {
  const f = gender === 'f' && femaleManifest ? lookup(femaleManifest, text) : null
  if (f) return `audio-f/${f}`
  const m = manifest ? lookup(manifest, text) : null
  return m ? `audio/${m}` : null
}

/** 녹음 목록에서 찾기 — 대소문자, 앞뒤 문장부호, 줄바꿈 표기 차이를 무시 */
function lookup(manifest: Record<string, string>, text: string): string | null {
  const t = text.normalize('NFC').trim()
  const stripped = t.replace(/^[\p{P}\s]+|[\p{P}\s]+$/gu, '')
  // 녹음 목록에는 줄바꿈이 '\\n' 글자로 적혀 있음
  const escNl = (s: string) => s.replace(/\r?\n/g, '\\n')
  const candidates = [t, escNl(t), stripped, escNl(stripped), t.replace(/\s*\n\s*/g, ' ')]
  for (const c of candidates) {
    if (!c) continue
    const f = manifest[c] || manifest[c.toLowerCase()]
    if (f) return f
  }
  return null
}

/** mp3 파일로 재생 시도 → 찾았으면 true (재생이 막히면 기계 음성으로) */
// '자모와 발음 2'의 글자 단계 전용 목소리 (글자마다 고른 언어) — audio/letters.json
let letterMap: Record<string, { file: string }> | null = null
let letterMapLoading: Promise<void> | null = null
function loadLetterMap(): Promise<void> {
  if (letterMap) return Promise.resolve()
  if (!letterMapLoading) {
    letterMapLoading = fetch(`${AUDIO_DIR}letters.json`, { cache: 'no-cache' })
      .then(r => (r.ok ? r.json() : {}))
      .then(j => { letterMap = j as Record<string, { file: string }> })
      .catch(() => { letterMap = {} })
  }
  return letterMapLoading
}

/** 자모 글자 소리 — 고른 목소리가 있으면 그것으로, 없으면 평소 소리 */
export function speakLetter(text: string) {
  const key = text.normalize('NFC').trim().toLowerCase()
  const go = () => {
    const f = letterMap?.[key]?.file
    if (!f) { speakPali(text); return }
    stopPali()
    if (isSoundOff()) return
    tryPlayMp3(text, `audio/${f}`)
  }
  if (letterMap) go(); else void loadLetterMap().then(go)
}

function tryPlayMp3(text: string, forcedFile?: string): boolean {
  const filename = forcedFile ?? findMp3(text)
  if (!filename) return false
  try {
    if (currentAudio) { currentAudio.pause(); currentAudio = null }
    const audio = new Audio(`${BASE}${filename}`)
    currentAudio = audio
    audio.playbackRate = audioRate()
    // 느리게 들어도 음높이는 그대로
    ;(audio as HTMLAudioElement & { preservesPitch?: boolean }).preservesPitch = true
    const id = playId
    audio.addEventListener('ended', () => { if (currentAudio === audio) { currentAudio = null; finishCurrent(id) } })
    const p = audio.play()
    if (p && typeof p.catch === 'function') {
      p.catch((e: unknown) => {
        // 다른 소리로 바뀌어 멈춘 경우(AbortError)는 그대로 둠
        if (currentAudio !== audio || (e as { name?: string })?.name === 'AbortError') return
        speakWithWebAPI(text)
      })
    }
    return true
  } catch { return false }
}

/** 재생 중인 소리 모두 멈춤 (다음 단계로 넘어가거나 과를 나갈 때) */
export function stopPali() {
  seqToken++ // 이어 듣기 중이면 멈춤
  stopCurrent()
}

/** 지금 나는 소리만 멈춤 (이어 듣기 순서는 유지) */
function stopCurrent() {
  try { speechSynthesis.cancel() } catch { /* 무시 */ }
  if (currentAudio) { currentAudio.pause(); currentAudio = null }
  finishCurrent()
}

// === Web Speech API 폴백 — 목소리 고르기·글자 변환은 공용 규칙(shared/pali-voice.ts) ===

function speakWithWebAPI(text: string) {
  const id = playId
  const trySpeak = () => {
    const voice = pickPaliVoice(speechSynthesis.getVoices(), gender)
    const u = new SpeechSynthesisUtterance(voice ? textForVoice(text, voice.lang) : text)
    u.lang = voice?.lang || 'hi-IN'
    if (voice) u.voice = voice
    u.rate = 0.6 * audioRate()
    u.onend = () => finishCurrent(id)
    u.onerror = () => finishCurrent(id)
    speechSynthesis.speak(u)
  }
  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = () => { speechSynthesis.onvoiceschanged = null; trySpeak() }
    setTimeout(() => {
      if (speechSynthesis.speaking) return
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'hi-IN'; u.rate = 0.6 * audioRate()
      u.onend = () => finishCurrent(id)
      u.onerror = () => finishCurrent(id)
      speechSynthesis.speak(u)
    }, 500)
  } else { trySpeak() }
}

/** 메인 TTS 함수 — mp3 우선, 없으면 Web Speech API 폴백 */
export function speakPali(text: string) {
  // 기존 재생 중지 (이어 듣기도 멈춤)
  stopPali()
  playOne(text)
}

/** 소리를 끈 설정인지 */
export function isSoundOff(): boolean {
  try { return localStorage.getItem('suttalog2-sound') === 'off' } catch { return false }
}

/** 소리 하나 재생 — 끝나면 done 호출 (소리 끔·빈 글이면 바로) */
function playOne(text: string, done?: () => void) {
  stopCurrent()
  playId++
  if (!text || !text.trim() || isSoundOff()) { done?.(); return }
  onDone = done || null
  const id = playId
  const go = () => {
    if (id !== playId) return
    // mp3 먼저 시도 (edge-tts 고품질)
    if (tryPlayMp3(text)) return
    // 폴백: Web Speech API
    try { speakWithWebAPI(text) } catch { finishCurrent() }
  }
  // 여성 녹음 목록을 아직 못 받았으면 받은 뒤에
  if (gender === 'f' && !femaleManifest) void loadFemale().then(go)
  else go()
}

// 이어 듣기 순서 번호 — stopPali()나 새 이어 듣기가 시작되면 바뀌어 앞의 것이 멈춤
let seqToken = 0

/** 소리 하나를 끝까지 재생 (끝나거나 멈추면 resolve) — 너무 오래 걸리면 30초 뒤 넘어감 */
function playAndWait(text: string): Promise<void> {
  return new Promise(resolve => {
    let settled = false
    const end = () => { if (!settled) { settled = true; clearTimeout(t); resolve() } }
    const t = setTimeout(end, 30000)
    playOne(text, end)
  })
}

const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

/**
 * 여러 소리를 차례로 재생 — 한 낱말씩 이어 듣기, 같은 구절 n번 반복 등
 * @param items 재생할 글 목록
 * @param opts.gapMs 소리 사이 쉬는 시간 / opts.onItem 지금 재생하는 순번 알림 (끝나면 -1)
 * @returns 끝까지 재생했으면 true, 중간에 멈췄으면 false
 */
export async function speakSequence(
  items: string[],
  opts: { gapMs?: number; onItem?: (i: number) => void } = {},
): Promise<boolean> {
  stopPali()
  const my = ++seqToken
  const gap = opts.gapMs ?? 500
  for (let i = 0; i < items.length; i++) {
    if (my !== seqToken) { opts.onItem?.(-1); return false }
    opts.onItem?.(i)
    await playAndWait(items[i])
    if (my !== seqToken) { opts.onItem?.(-1); return false }
    if (i < items.length - 1) await wait(gap)
  }
  if (my === seqToken) opts.onItem?.(-1)
  return my === seqToken
}
