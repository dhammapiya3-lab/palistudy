// 기기 목소리(브라우저 TTS)로 빠알리어를 읽을 때 쓰는 공용 규칙 — 두 앱이 함께 씀
// 녹음 mp3를 만들 때(primer/scripts/tts/pali_script.py)와 같은 변환을 씀.
//   1) 텔루구어 목소리: 텔루구 문자로 바꿔 읽힘 (ñ → ny, ph → p+h) — 녹음 mp3와 같은 목소리 계열
//   2) 칸나다어 목소리: 칸나다 문자로
//   3) 힌디어 목소리: 데바나가리로 (낱말 끝 a가 빠지지 않게 보정)
// 텔루구어·칸나다어는 낱말 끝 모음을 그대로 읽어 빠알리어에 가까움. 힌디어는 끝 a를 빼고 읽음(cakkaṃva → 짝깡우).

const CONSONANTS: Record<string, string> = {
  'kh': 'ख', 'k': 'क', 'gh': 'घ', 'g': 'ग', 'ṅ': 'ङ',
  'ch': 'छ', 'c': 'च', 'jh': 'झ', 'j': 'ज', 'ñ': 'ञ',
  'ṭh': 'ठ', 'ṭ': 'ट', 'ḍh': 'ढ', 'ḍ': 'ड', 'ṇ': 'ण',
  'th': 'थ', 't': 'त', 'dh': 'ध', 'd': 'द', 'n': 'न',
  'ph': 'फ', 'p': 'प', 'bh': 'भ', 'b': 'ब', 'm': 'म',
  'y': 'य', 'r': 'र', 'l': 'ल', 'ḷ': 'ळ',
  'v': 'व', 's': 'स', 'h': 'ह',
}
const VOWELS_IND: Record<string, string> = { 'ā': 'आ', 'a': 'अ', 'ī': 'ई', 'i': 'इ', 'ū': 'ऊ', 'u': 'उ', 'e': 'ए', 'o': 'ओ' }
const VOWELS_DEP: Record<string, string> = { 'ā': 'ा', 'a': '', 'ī': 'ी', 'i': 'ि', 'ū': 'ू', 'u': 'ु', 'e': 'े', 'o': 'ो' }
const VIRAMA = '्'
const isVowel = (ch: string) => ch in VOWELS_IND

/** 빠알리 로마자 → 데바나가리 (녹음 만들기 to_devanagari 와 같은 규칙) */
export function paliToDevanagari(roman: string): string {
  let out = ''
  let i = 0
  const s = roman.normalize('NFC').toLowerCase()
  while (i < s.length) {
    const ch = s[i]
    if (ch === 'ṃ' || ch === 'ṁ') { out += 'ं'; i++; continue }
    const two = s.slice(i, i + 2)
    let cons: string | undefined
    let used = 0
    if (CONSONANTS[two]) { cons = CONSONANTS[two]; used = 2 } else if (CONSONANTS[ch]) { cons = CONSONANTS[ch]; used = 1 }
    if (cons) {
      i += used
      if (i < s.length && isVowel(s[i])) { out += cons + VOWELS_DEP[s[i]]; i++ } else out += cons + VIRAMA
      continue
    }
    if (isVowel(ch)) { out += VOWELS_IND[ch]; i++; continue }
    out += ch === '/' ? ',' : ch // 공백·문장부호 등
    i++
  }
  return out
}

/** 데바나가리(U+0900) 글자를 같은 배열의 다른 인도 문자 블록으로 옮김 (텔루구 0x0C00, 칸나다 0x0C80) */
function shiftBlock(deva: string, base: number): string {
  let out = ''
  for (const c of deva) {
    const code = c.codePointAt(0)!
    out += code >= 0x0900 && code <= 0x097F ? String.fromCodePoint(code - 0x0900 + base) : c
  }
  return out
}

/** 텔루구어 목소리는 ఞ(ñ)를 n으로 읽음 → ny로 적음 (pali_script.py telugu_ny 와 같음) */
function teluguNy(te: string): string {
  const NY = 'న', Y = 'య', VIR = '్'
  return te
    .split('ఞ్ఞ').join(NY + VIR + NY + VIR + Y)
    .replace(/ఞ(?=్[చఛజఝ])/g, NY)
    .replace(/ఞ(?=్హ)/g, NY)
    .split('ఞ').join(NY + VIR + Y)
}

/** 힌디어 목소리가 낱말 끝 a를 빼지 않도록 끝 자음에 ा 를 붙임 */
function preventSchwa(deva: string): string {
  return deva.split(/(\s+|,)/).map(word => {
    if (!word.trim() || word === ',') return word
    const code = word.charCodeAt(word.length - 1)
    return code >= 0x0915 && code <= 0x0939 ? word + 'ा' : word
  }).join('')
}

/** 고른 목소리의 언어에 맞춰 읽을 글을 바꿈 */
export function textForVoice(text: string, lang: string): string {
  const l = lang.toLowerCase()
  if (l.startsWith('te') || l.startsWith('kn')) {
    // ph는 f로 읽지 않도록 p + h로 따로 적음 (녹음과 같음)
    const deva = paliToDevanagari(text).split('फ').join('प्ह')
    return l.startsWith('te') ? teluguNy(shiftBlock(deva, 0x0C00)) : shiftBlock(deva, 0x0C80)
  }
  if (l.startsWith('hi') || l.startsWith('sa') || l.startsWith('mr')) return preventSchwa(paliToDevanagari(text))
  return text
}

/** 목소리 성별 — 'm' 남성 · 'f' 여성 */
export type VoiceGender = 'm' | 'f'

// 기기 목소리는 성별을 알려 주지 않으므로 이름으로 짐작 (마이크로소프트·애플·구글에서 쓰는 이름)
// 구글 기본 목소리('Google ...')는 대부분 여성
const FEMALE = /female|woman|shruti|sapna|swara|kalpana|lekha|neerja|ananya|aarohi|heera|kajal|veena|zira|samantha|alice|google/i
const MALE = /\bmale\b|\bman\b|mohan|gagan|madhur|hemant|rishi|prabhat|arjun|aarav|ravi|kunal|david|mark|luca|diego/i
function guessGender(v: SpeechSynthesisVoice): VoiceGender | null {
  if (MALE.test(v.name)) return 'm'
  if (FEMALE.test(v.name)) return 'f'
  return null
}

/** 빠알리어를 읽기에 가장 알맞은 기기 목소리 — 언어 순서가 먼저, 같은 언어 안에서 고른 성별을 우선 */
export function pickPaliVoice(voices: SpeechSynthesisVoice[], gender?: VoiceGender): SpeechSynthesisVoice | null {
  const priorities = ['te-IN', 'te', 'kn-IN', 'kn', 'hi-IN', 'hi', 'sa', 'en-IN', 'it-IT', 'en-US']
  for (const lang of priorities) {
    const same = voices.filter(v => v.lang.replace('_', '-').startsWith(lang))
    if (!same.length) continue
    return (gender && same.find(v => guessGender(v) === gender)) || same[0]
  }
  return voices[0] || null
}
