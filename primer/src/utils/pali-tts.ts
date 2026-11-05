// 빠알리어 TTS — edge-tts mp3 우선 재생 + Web Speech API 폴백
// edge-tts (Microsoft hi-IN-MadhurNeural) 고품질 음성

import { useStore } from '../store/useStore'

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
loadManifest()

// 현재 재생 중인 Audio 인스턴스
let currentAudio: HTMLAudioElement | null = null

/** 녹음 목록에서 찾기 — 대소문자, 앞뒤 문장부호, 줄바꿈 표기 차이를 무시 */
function findMp3(text: string): string | null {
  if (!manifest) return null
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
    tryPlayMp3(text, f)
  }
  if (letterMap) go(); else void loadLetterMap().then(go)
}

function tryPlayMp3(text: string, forcedFile?: string): boolean {
  const filename = forcedFile ?? findMp3(text)
  if (!filename) return false
  try {
    if (currentAudio) { currentAudio.pause(); currentAudio = null }
    const audio = new Audio(`${AUDIO_DIR}${filename}`)
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

// === Web Speech API 폴백 (기존 코드) ===

const CONSONANTS: Record<string, string> = {
  'kh': 'ख', 'k': 'क', 'gh': 'घ', 'g': 'ग', 'ṅ': 'ङ',
  'ch': 'छ', 'c': 'च', 'jh': 'झ', 'j': 'ज', 'ñ': 'ञ',
  'ṭh': 'ठ', 'ṭ': 'ट', 'ḍh': 'ढ', 'ḍ': 'ड', 'ṇ': 'ण',
  'th': 'थ', 't': 'त', 'dh': 'ध', 'd': 'द', 'n': 'न',
  'ph': 'फ', 'p': 'प', 'bh': 'भ', 'b': 'ब', 'm': 'म',
  'y': 'य', 'r': 'र', 'l': 'ल', 'ḷ': 'ळ',
  'v': 'व', 's': 'स', 'h': 'ह',
}

const VOWELS_IND: Record<string, string> = {
  'ā': 'आ', 'a': 'अ', 'ī': 'ई', 'i': 'इ',
  'ū': 'ऊ', 'u': 'उ', 'e': 'ए', 'o': 'ओ',
}

const VOWELS_DEP: Record<string, string> = {
  'ā': 'ा', 'a': '', 'ī': 'ी', 'i': 'ि',
  'ū': 'ू', 'u': 'ु', 'e': 'े', 'o': 'ो',
}

const VIRAMA = '्'
const isVowel = (ch: string) => ch in VOWELS_IND

export function paliToDevanagari(roman: string): string {
  let result = '', i = 0
  const s = roman.toLowerCase()
  while (i < s.length) {
    const ch = s[i]
    if (/[\s,.;:!?\-—–/"'()""'']/.test(ch)) { result += ch === '/' ? ',' : ch; i++; continue }
    if (ch === 'ṃ') { result += 'ं'; i++; continue }
    const two = s.slice(i, i + 2)
    let consonant: string | undefined, consumed = 0
    if (CONSONANTS[two]) { consonant = CONSONANTS[two]; consumed = 2 }
    else if (CONSONANTS[ch]) { consonant = CONSONANTS[ch]; consumed = 1 }
    if (consonant) {
      i += consumed
      if (i < s.length && isVowel(s[i])) { result += consonant + VOWELS_DEP[s[i]]; i++ }
      else { result += consonant + VIRAMA }
      continue
    }
    if (isVowel(ch)) { result += VOWELS_IND[ch]; i++; continue }
    result += ch; i++
  }
  // 힌디어 schwa deletion 방지: 단어 끝 자음의 내재 'a'를 명시적으로 표기
  // 빠알리어는 모든 'a'를 발음해야 함 (힌디어와 다름)
  result = preventSchwa(result)
  return result
}

/** 힌디어 schwa deletion 방지 — 단어 끝 자음에 ा 추가 */
function preventSchwa(deva: string): string {
  return deva.split(/(\s+|,)/).map(word => {
    if (!word.trim() || word === ',') return word
    const code = word.charCodeAt(word.length - 1)
    // 데바나가리 자음 범위 (क=0x0915 ~ ह=0x0939): 내재 'a'가 묵음 처리됨
    if (code >= 0x0915 && code <= 0x0939) {
      return word + 'ा'
    }
    return word
  }).join('')
}

function findBestVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()
  for (const lang of ['hi-IN', 'hi', 'sa', 'si', 'en-IN', 'it-IT', 'en-US']) {
    const found = voices.find(v => v.lang.startsWith(lang))
    if (found) return found
  }
  return voices[0] || null
}

function speakWithWebAPI(text: string) {
  const id = playId
  const trySpeak = () => {
    const voice = findBestVoice()
    const useDevanagari = voice && (voice.lang.startsWith('hi') || voice.lang.startsWith('sa'))
    const u = new SpeechSynthesisUtterance(useDevanagari ? paliToDevanagari(text) : text)
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
  // mp3 먼저 시도 (edge-tts 고품질)
  if (tryPlayMp3(text)) return
  // 폴백: Web Speech API
  try { speakWithWebAPI(text) } catch { finishCurrent() }
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
