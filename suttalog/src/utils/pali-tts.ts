// 빠알리어 로마자 → 데바나가리 변환 + 힌디어 TTS
// 힌디어 TTS에 데바나가리를 넘기면 빠알리어 발음이 정확해짐

const CONSONANTS: Record<string, string> = {
  'kh': 'ख', 'k': 'क',
  'gh': 'घ', 'g': 'ग',
  'ṅ': 'ङ',
  'ch': 'छ', 'c': 'च',
  'jh': 'झ', 'j': 'ज',
  'ñ': 'ञ',
  'ṭh': 'ठ', 'ṭ': 'ट',
  'ḍh': 'ढ', 'ḍ': 'ड',
  'ṇ': 'ण',
  'th': 'थ', 't': 'त',
  'dh': 'ध', 'd': 'द',
  'n': 'न',
  'ph': 'फ', 'p': 'प',
  'bh': 'भ', 'b': 'ब',
  'm': 'म',
  'y': 'य', 'r': 'र', 'l': 'ल', 'ḷ': 'ळ',
  'v': 'व', 's': 'स', 'h': 'ह',
}

const VOWELS_INDEPENDENT: Record<string, string> = {
  'ā': 'आ', 'a': 'अ',
  'ī': 'ई', 'i': 'इ',
  'ū': 'ऊ', 'u': 'उ',
  'e': 'ए', 'o': 'ओ',
}

const VOWELS_DEPENDENT: Record<string, string> = {
  'ā': 'ा', 'a': '',
  'ī': 'ी', 'i': 'ि',
  'ū': 'ू', 'u': 'ु',
  'e': 'े', 'o': 'ो',
}

const VIRAMA = '्'

// 장모음 키 목록 (2글자 체크 불필요 — 모두 1글자)
// 장모음 참조용
// const LONG_VOWELS = new Set(['ā', 'ī', 'ū'])

function isVowel(ch: string): boolean {
  return ch in VOWELS_INDEPENDENT
}

export function paliToDevanagari(roman: string): string {
  let result = ''
  let i = 0
  const s = roman.toLowerCase()

  while (i < s.length) {
    const ch = s[i]

    // 공백/구두점 그대로
    if (/[\s,.;:!?\-—–"'()""'']/.test(ch)) {
      result += ch
      i++
      continue
    }

    // ṃ (anusvara)
    if (ch === 'ṃ') {
      result += 'ं'
      i++
      continue
    }

    // 자음 체크 (2글자 먼저)
    const two = s.slice(i, i + 2)
    let consonant: string | undefined
    let consumed = 0

    if (CONSONANTS[two]) {
      consonant = CONSONANTS[two]
      consumed = 2
    } else if (CONSONANTS[ch]) {
      consonant = CONSONANTS[ch]
      consumed = 1
    }

    if (consonant) {
      i += consumed
      // 다음 글자가 모음이면 dependent vowel mark
      if (i < s.length && isVowel(s[i])) {
        result += consonant + VOWELS_DEPENDENT[s[i]]
        i++
      } else {
        // 다음이 자음이거나 끝이면 virama
        result += consonant + VIRAMA
      }
      continue
    }

    // 독립 모음
    if (isVowel(ch)) {
      result += VOWELS_INDEPENDENT[ch]
      i++
      continue
    }

    // 알 수 없는 문자 그대로
    result += ch
    i++
  }

  return result
}

// 일부 안드로이드 WebView·인앱 브라우저에는 speechSynthesis가 없음 → 없으면 조용히 건너뜀
function getSynth(): SpeechSynthesis | null {
  return typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null
}

/** 이 기기에서 소리 내어 읽기(TTS)를 쓸 수 있는지 */
export function ttsAvailable(): boolean {
  return getSynth() !== null && typeof SpeechSynthesisUtterance !== 'undefined'
}

/** 재생 중인 소리 멈춤 (TTS가 없는 기기에서도 안전) */
export function stopSpeech(): void {
  try { getSynth()?.cancel() } catch { /* 무시 */ }
}

// 사용 가능한 인도계 음성 찾기 (hi-IN > hi > sa > en-IN > 아무거나)
function findBestVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices()
  const priorities = ['hi-IN', 'hi', 'sa', 'en-IN', 'it-IT', 'en-US']
  for (const lang of priorities) {
    const found = voices.find(v => v.lang.startsWith(lang))
    if (found) return found
  }
  return voices[0] || null
}

// 재생 요청 번호 — 늦게 도착한 이전 요청이 또 읽지 않도록
let requestSeq = 0

// TTS 발음 재생
export function speakPali(text: string) {
  const synth = getSynth()
  if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return
  synth.cancel()

  // 소리 끔 설정 체크
  if (localStorage.getItem('suttalog-sound') === 'off') return

  const seq = ++requestSeq
  let played = false
  const trySpeak = () => {
    if (played || seq !== requestSeq) return // 한 요청은 한 번만 읽음
    played = true
    const voice = findBestVoice(synth)
    const useDevanagari = voice && (voice.lang.startsWith('hi') || voice.lang.startsWith('sa'))
    const speakText = useDevanagari ? paliToDevanagari(text) : text

    const u = new SpeechSynthesisUtterance(speakText)
    u.lang = voice?.lang || 'hi-IN'
    if (voice) u.voice = voice
    u.rate = 0.6
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
