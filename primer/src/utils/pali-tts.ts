// 빠알리어 TTS — edge-tts mp3 우선 재생 + Web Speech API 폴백
// edge-tts (Microsoft hi-IN-MadhurNeural) 고품질 음성

const BASE = import.meta.env.BASE_URL || '/'
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
      for (const [key, val] of Object.entries(raw)) {
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

/** mp3 파일로 재생 시도 → 성공 시 true (대소문자 무시) */
function tryPlayMp3(text: string): boolean {
  if (!manifest) return false
  const filename = manifest[text] || manifest[text.toLowerCase()] || manifest[text.trim()]
  if (!filename) return false
  try {
    if (currentAudio) { currentAudio.pause(); currentAudio = null }
    currentAudio = new Audio(`${AUDIO_DIR}${filename}`)
    currentAudio.play()
    return true
  } catch { return false }
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
  const trySpeak = () => {
    const voice = findBestVoice()
    const useDevanagari = voice && (voice.lang.startsWith('hi') || voice.lang.startsWith('sa'))
    const u = new SpeechSynthesisUtterance(useDevanagari ? paliToDevanagari(text) : text)
    u.lang = voice?.lang || 'hi-IN'
    if (voice) u.voice = voice
    u.rate = 0.6
    speechSynthesis.speak(u)
  }
  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = () => { speechSynthesis.onvoiceschanged = null; trySpeak() }
    setTimeout(() => {
      if (speechSynthesis.speaking) return
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'hi-IN'; u.rate = 0.6; speechSynthesis.speak(u)
    }, 500)
  } else { trySpeak() }
}

/** 메인 TTS 함수 — mp3 우선, 없으면 Web Speech API 폴백 */
export function speakPali(text: string) {
  // 기존 재생 중지
  speechSynthesis.cancel()
  if (currentAudio) { currentAudio.pause(); currentAudio = null }
  if (localStorage.getItem('suttalog2-sound') === 'off') return

  // mp3 먼저 시도 (edge-tts 고품질)
  if (tryPlayMp3(text)) return

  // 폴백: Web Speech API
  speakWithWebAPI(text)
}
