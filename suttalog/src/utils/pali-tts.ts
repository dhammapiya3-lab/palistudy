// 빠알리어 소리 — 미리 녹음한 mp3(빠알리 프라이머와 같은 목소리) 우선, 없으면 기기 목소리(TTS)
// - 녹음 목록: public/audio/manifest.json = { ttsKey(글): 'audio/ 아래 파일 이름' } (없으면 기기 목소리만 씀)
// - 알파벳·발음 레슨의 글자 하나: public/audio/letters.json (빠알리 프라이머 '자모와 발음 2'에서 고른 글자 목소리)
// - 기기 목소리: 공용 규칙(shared/pali-voice.ts) — 텔루구어 > 칸나다어 > 힌디어 목소리, 녹음과 같은 글자 변환
import { ttsKey } from './tts-key'
import { pickPaliVoice, textForVoice, type VoiceGender } from '../shared/pali-voice'
import { readVoiceGender, saveVoiceGender } from '../shared/voice-setting'

export { paliToDevanagari } from '../shared/pali-voice'

const BASE = import.meta.env.BASE_URL || '/'
const AUDIO_DIR = `${BASE}audio/`

// ───── 목소리 성별 — 설정(또는 내 서재)에서 고름, 기본은 남성 ─────
let gender: VoiceGender = readVoiceGender()
let femaleManifest: Record<string, string> | null = null
let femaleLoading: Promise<void> | null = null
function loadFemale(): Promise<void> {
  if (!femaleLoading) {
    femaleLoading = fetch(`${BASE}audio-f/manifest.json`, { cache: 'no-cache' })
      .then(r => (r.ok && (r.headers.get('content-type') || '').includes('json') ? r.json() : null))
      .then((raw: Record<string, string> | null) => {
        const m: Record<string, string> = {}
        if (raw && typeof raw === 'object') for (const [k, v] of Object.entries(raw)) if (typeof v === 'string') { const key = ttsKey(k); if (key && !m[key]) m[key] = v }
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

// ───────────────── 녹음 목록 (한 번만 받아 둠) ─────────────────
let manifest: Record<string, string> | null = null
let manifestReady = false
const manifestLoading: Promise<void> = typeof window === 'undefined' ? Promise.resolve() :
  fetch(`${AUDIO_DIR}manifest.json`, { cache: 'no-cache' })
    .then(r => (r.ok && (r.headers.get('content-type') || '').includes('json') ? r.json() : null))
    .then((raw: Record<string, string> | null) => {
      if (!raw || typeof raw !== 'object') return
      const m: Record<string, string> = {}
      for (const [k, v] of Object.entries(raw)) if (typeof v === 'string') { const key = ttsKey(k); if (key && !m[key]) m[key] = v }
      if (Object.keys(m).length) manifest = m
    })
    .catch(() => { /* 녹음 목록이 없으면 기기 목소리로 */ })
    .finally(() => { manifestReady = true })

/** 이 글의 녹음(mp3)이 있는지 — 녹음 목록을 다 받은 뒤에 답함 */
export async function hasRecording(text: string): Promise<boolean> {
  await manifestLoading
  if (gender === 'f') await loadFemale()
  return !!findMp3(text)
}

/** 이 글의 녹음 파일 주소(BASE 뒤) — 여성을 골랐으면 여성 녹음 먼저, 없으면 남성 녹음 (없으면 null) */
function findMp3(text: string): string | null {
  const key = ttsKey(text)
  const f = gender === 'f' ? femaleManifest?.[key] : undefined
  if (f) return `audio-f/${f}`
  const m = manifest?.[key]
  return m ? `audio/${m}` : null
}

// 일부 안드로이드 WebView·인앱 브라우저에는 speechSynthesis가 없음 → 없으면 조용히 건너뜀
function getSynth(): SpeechSynthesis | null {
  return typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null
}

/** 이 기기에서 소리 내어 읽기(TTS)를 쓸 수 있는지 */
export function ttsAvailable(): boolean {
  return synthAvailable() || (manifest !== null && typeof Audio !== 'undefined')
}

function synthAvailable(): boolean {
  return getSynth() !== null && typeof SpeechSynthesisUtterance !== 'undefined'
}

/** 재생 중인 소리 멈춤 (TTS가 없는 기기에서도 안전) — 이어 듣기도 함께 멈춤 */
export function stopSpeech(): void {
  requestSeq++
  endSequence(true)
  stopAudio()
  try { getSynth()?.cancel() } catch { /* 무시 */ }
}

// 지금 재생 중인 녹음
let currentAudio: HTMLAudioElement | null = null
function stopAudio() {
  const a = currentAudio
  currentAudio = null
  if (a) { try { a.pause() } catch { /* 무시 */ } }
}

/** 소리 끔 설정인지 */
export function soundOff(): boolean {
  return localStorage.getItem('suttalog-sound') === 'off'
}

// 읽기 속도 — 설정 'suttalog-audio-rate': '1'(보통, 기본) | '0.75'(느리게)
function rateSetting(): number {
  return Number(localStorage.getItem('suttalog-audio-rate') || '1') === 0.75 ? 0.75 : 1
}
// 기기 목소리는 '보통'도 원래 쓰던 0.6배속으로 천천히 읽고, '느리게'는 그 0.75배
const BASE_RATE = 0.6
export function speechRate(): number {
  return BASE_RATE * rateSetting()
}
// 녹음(mp3)은 이미 천천히(-30%) 녹음했으므로 '보통' 1배, '느리게' 0.75배
function audioRate(): number {
  return rateSetting()
}

// 재생 요청 번호 — 늦게 도착한 이전 요청이 또 읽지 않도록
let requestSeq = 0

// TTS 발음 재생 (onEnd: 다 읽었을 때 — 이어 듣기에서 사용)
export function speakPali(text: string, onEnd?: (failed: boolean) => void) {
  endSequence(true)
  speakOne(text, onEnd)
}

function speakOne(text: string, onEnd?: (failed: boolean) => void): number {
  // 소리 끔 설정 체크
  if (soundOff()) return -1
  stopAudio()
  try { getSynth()?.cancel() } catch { /* 무시 */ }

  const seq = ++requestSeq
  let ended = false
  const fire = (failed: boolean) => { if (!ended && seq === requestSeq) { ended = true; onEnd?.(failed) } }

  const go = () => {
    if (seq !== requestSeq) return
    const file = findMp3(text)
    if (file) playMp3(seq, file, fire, () => speakSynth(seq, text, fire))
    else speakSynth(seq, text, fire)
  }
  if (manifestReady && (gender === 'm' || femaleManifest)) {
    if (!findMp3(text) && !synthAvailable()) return -1
    go()
  } else {
    void Promise.all([manifestLoading, gender === 'f' ? loadFemale() : null]).then(go)
  }
  return seq
}

/** 녹음 재생 — 끝나면 fire(false). 재생할 수 없으면 fallback(기기 목소리) */
function playMp3(seq: number, file: string, fire: (failed: boolean) => void, fallback: () => void) {
  let audio: HTMLAudioElement
  try { audio = new Audio(`${BASE}${file}`) } catch { fallback(); return }
  currentAudio = audio
  audio.playbackRate = audioRate()
  // 느리게 들어도 음높이는 그대로
  ;(audio as HTMLAudioElement & { preservesPitch?: boolean }).preservesPitch = true
  let fellBack = false
  const fail = () => {
    if (fellBack || currentAudio !== audio || seq !== requestSeq) return
    fellBack = true
    currentAudio = null
    fallback()
  }
  audio.addEventListener('ended', () => { if (currentAudio === audio) { currentAudio = null; fire(false) } })
  audio.addEventListener('error', fail)
  const p = audio.play()
  if (p && typeof p.catch === 'function') {
    p.catch((e: unknown) => {
      // 다른 소리로 바뀌어 멈춘 경우(AbortError)는 그대로 둠
      if ((e as { name?: string })?.name === 'AbortError') return
      fail()
    })
  }
}

/** 기기 목소리(TTS)로 읽기 */
function speakSynth(seq: number, text: string, fire: (failed: boolean) => void) {
  const synth = getSynth()
  if (!synth || typeof SpeechSynthesisUtterance === 'undefined') { fire(true); return }
  synth.cancel()
  let played = false
  const trySpeak = () => {
    if (played || seq !== requestSeq) return // 한 요청은 한 번만 읽음
    played = true
    const voice = pickPaliVoice(synth.getVoices(), gender)
    const speakText = voice ? textForVoice(text, voice.lang) : text

    const u = new SpeechSynthesisUtterance(speakText)
    u.lang = voice?.lang || 'hi-IN'
    if (voice) u.voice = voice
    u.rate = speechRate()
    u.onend = () => fire(false)
    // 끊김(interrupted/canceled)이 아닌 오류 = 이 기기에서 읽을 수 없음
    u.onerror = e => fire(e.error !== 'interrupted' && e.error !== 'canceled')
    synth.speak(u)
  }

  // iOS Safari에서 voices가 비동기로 로드됨
  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = () => {
      synth.onvoiceschanged = null
      trySpeak()
    }
    // 폴백: 0.5초 안에 목소리 목록이 안 오면 같은 경로로 한 번만 시도
    setTimeout(trySpeak, 500)
  } else {
    trySpeak()
  }
}

// ───────────────── 글자 하나 (알파벳·발음 레슨) ─────────────────
let letterMap: Record<string, { file: string }> | null = null
let letterMapLoading: Promise<void> | null = null
/** 글자 목소리 목록을 미리 받아 둠 (알파벳 레슨을 열 때) — 누른 순간 바로 재생되도록 */
export function preloadLetters(): void { void loadLetterMap() }
function loadLetterMap(): Promise<void> {
  if (!letterMapLoading) {
    letterMapLoading = fetch(`${AUDIO_DIR}letters.json`, { cache: 'no-cache' })
      .then(r => (r.ok ? r.json() : {}))
      .then(j => { letterMap = j && typeof j === 'object' ? j as Record<string, { file: string }> : {} })
      .catch(() => { letterMap = {} })
  }
  return letterMapLoading
}

/** 자모 글자 소리 — 빠알리 프라이머 '자모와 발음 2'에서 고른 글자 목소리, 없으면 평소 소리 */
export function speakLetter(text: string) {
  const key = text.normalize('NFC').trim().toLowerCase()
  endSequence(true)
  const seq = ++requestSeq
  const go = () => {
    if (seq !== requestSeq) return
    const file = letterMap?.[key]?.file
    if (!file) { speakPali(text); return }
    if (soundOff()) return
    stopAudio()
    try { getSynth()?.cancel() } catch { /* 무시 */ }
    const s = ++requestSeq
    playMp3(s, `audio/${file}`, () => {}, () => speakSynth(s, text, () => {}))
  }
  if (letterMap) go(); else void loadLetterMap().then(go)
}

// ───────────────── 이어 듣기 (구절을 차례로 읽기) ─────────────────
// 녹음이 있는 구절은 통째로 재생하고 끝나면('ended') 다음으로.
// 기기 목소리는 한 번에 너무 긴 글을 중간에 끊는 브라우저가 있어 문장 단위로 나눠 읽음

type Sequence = { onIndex?: (i: number) => void; onDone?: (stopped: boolean) => void }
let current: Sequence | null = null

function endSequence(stopped: boolean) {
  const s = current
  current = null
  s?.onDone?.(stopped)
}

function chunks(text: string): string[] {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= 220) return t ? [t] : []
  const parts = t.split(/(?<=[.;:!?–—])\s+/)
  const out: string[] = []
  let buf = ''
  for (const p of parts) {
    if (buf && (buf + ' ' + p).length > 220) { out.push(buf); buf = p }
    else buf = buf ? buf + ' ' + p : p
  }
  if (buf) out.push(buf)
  return out
}

/** 여러 구절을 차례로 읽음. onIndex(i): i번째 구절을 읽기 시작할 때, onDone(stopped): 끝나거나 멈췄을 때 */
export function speakSequence(texts: string[], opts: Sequence = {}): void {
  stopSpeech()
  if (!ttsAvailable() || soundOff() || !texts.length) { opts.onDone?.(true); return }
  const me: Sequence = { ...opts }
  current = me
  let ti = 0
  let pieces: string[] = []
  let pi = 0
  const next = () => {
    if (current !== me) return
    while (pi >= pieces.length) {
      if (ti >= texts.length) { current = null; me.onDone?.(false); return }
      // 녹음이 있으면 구절 통째로, 없으면 기기 목소리가 끊지 않도록 문장 단위로
      pieces = findMp3(texts[ti]) ? [texts[ti]] : chunks(texts[ti]); pi = 0
      me.onIndex?.(ti)
      ti++
    }
    const piece = pieces[pi++]
    // 끝 알림이 오지 않는 기기를 위한 안전장치: 글 길이에 맞춘 넉넉한 시간 뒤 다음으로
    let moved = false
    const go = (failed = false) => {
      if (moved) return
      moved = true
      window.clearTimeout(timer)
      if (current !== me) return
      if (failed) { endSequence(true); return }
      window.setTimeout(next, 250)
    }
    const timer = window.setTimeout(() => go(false), Math.max(4000, piece.length * 260 / speechRate()))
    if (speakOne(piece, go) < 0) { window.clearTimeout(timer); endSequence(true) }
  }
  next()
}
