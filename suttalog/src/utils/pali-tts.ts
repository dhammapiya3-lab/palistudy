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

// 사용 가능한 인도계 음성 찾기 (hi-IN > hi > sa > en-IN > 아무거나)
function findBestVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()
  const priorities = ['hi-IN', 'hi', 'sa', 'en-IN', 'it-IT', 'en-US']
  for (const lang of priorities) {
    const found = voices.find(v => v.lang.startsWith(lang))
    if (found) return found
  }
  return voices[0] || null
}

// TTS 발음 재생
export function speakPali(text: string) {
  speechSynthesis.cancel()

  // 소리 끔 설정 체크
  if (localStorage.getItem('suttalog-sound') === 'off') return

  const trySpeak = () => {
    const voice = findBestVoice()
    const useDevanagari = voice && (voice.lang.startsWith('hi') || voice.lang.startsWith('sa'))
    const speakText = useDevanagari ? paliToDevanagari(text) : text

    const u = new SpeechSynthesisUtterance(speakText)
    u.lang = voice?.lang || 'hi-IN'
    if (voice) u.voice = voice
    u.rate = 0.6
    speechSynthesis.speak(u)
  }

  // iOS Safari에서 voices가 비동기로 로드됨
  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = () => {
      speechSynthesis.onvoiceschanged = null
      trySpeak()
    }
    // 폴백: 0.5초 후 그냥 시도
    setTimeout(() => {
      if (speechSynthesis.speaking) return
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'hi-IN'
      u.rate = 0.6
      speechSynthesis.speak(u)
    }, 500)
  } else {
    trySpeak()
  }
}
