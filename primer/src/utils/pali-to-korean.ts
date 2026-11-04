// 빠알리어 로마자 → 한국어 발음 자동 변환
// 예: deva → 데와, buddha → 붓다, Buddhaṃ saraṇaṃ gacchāmi → 붓당 사라낭 갓차미

// 자음 매핑 (단자음 + 모음 조합)
const CONSONANTS: Record<string, { initial: string; final: string }> = {
  'kh': { initial: '카', final: '크' },
  'k': { initial: '까', final: '끄' },
  'gh': { initial: '가', final: '그' },
  'g': { initial: '가', final: '그' },
  'ṅ': { initial: '응', final: '응' },
  'ch': { initial: '차', final: '쯔' },
  'c': { initial: '짜', final: '쯔' },
  'jh': { initial: '자', final: '즈' },
  'j': { initial: '자', final: '즈' },
  'ñ': { initial: '냐', final: '느' },
  'ṭh': { initial: '타', final: '뜨' },
  'ṭ': { initial: '따', final: '뜨' },
  'ḍh': { initial: '다', final: '드' },
  'ḍ': { initial: '다', final: '드' },
  'ṇ': { initial: '나', final: '느' },
  'th': { initial: '타', final: '뜨' },
  't': { initial: '따', final: '뜨' },
  'dh': { initial: '다', final: '드' },
  'd': { initial: '다', final: '드' },
  'n': { initial: '나', final: '느' },
  'ph': { initial: '파', final: '프' },
  'p': { initial: '빠', final: '쁘' },
  'bh': { initial: '바', final: '브' },
  'b': { initial: '바', final: '브' },
  'm': { initial: '마', final: '므' },
  'y': { initial: '야', final: '이' },
  'r': { initial: '라', final: '르' },
  'l': { initial: '라', final: '르' },
  'ḷ': { initial: '라', final: '르' },
  'v': { initial: '와', final: '우' },
  's': { initial: '사', final: '스' },
  'h': { initial: '하', final: '흐' },
}

// 모음 매핑
const VOWELS: Record<string, string> = {
  'a': '아', 'ā': '아',
  'i': '이', 'ī': '이',
  'u': '우', 'ū': '우',
  'e': '에', 'o': '오',
}

// 자음+모음 조합 (초성+중성)
const COMBO: Record<string, Record<string, string>> = {
  'k': { 'a': '까', 'ā': '까', 'i': '끼', 'ī': '끼', 'u': '꾸', 'ū': '꾸', 'e': '께', 'o': '꼬' },
  'kh': { 'a': '카', 'ā': '카', 'i': '키', 'ī': '키', 'u': '쿠', 'ū': '쿠', 'e': '케', 'o': '코' },
  'g': { 'a': '가', 'ā': '가', 'i': '기', 'ī': '기', 'u': '구', 'ū': '구', 'e': '게', 'o': '고' },
  'gh': { 'a': '가', 'ā': '가', 'i': '기', 'ī': '기', 'u': '구', 'ū': '구', 'e': '게', 'o': '고' },
  'ṅ': { 'a': '응아', 'ā': '응아', 'i': '응이', 'ī': '응이', 'u': '응우', 'ū': '응우', 'e': '응에', 'o': '응오' },
  'c': { 'a': '짜', 'ā': '짜', 'i': '찌', 'ī': '찌', 'u': '쭈', 'ū': '쭈', 'e': '쩨', 'o': '쪼' },
  'ch': { 'a': '차', 'ā': '차', 'i': '치', 'ī': '치', 'u': '추', 'ū': '추', 'e': '체', 'o': '초' },
  'j': { 'a': '자', 'ā': '자', 'i': '지', 'ī': '지', 'u': '주', 'ū': '주', 'e': '제', 'o': '조' },
  'jh': { 'a': '자', 'ā': '자', 'i': '지', 'ī': '지', 'u': '주', 'ū': '주', 'e': '제', 'o': '조' },
  'ñ': { 'a': '냐', 'ā': '냐', 'i': '니', 'ī': '니', 'u': '뉴', 'ū': '뉴', 'e': '녜', 'o': '뇨' },
  'ṭ': { 'a': '따', 'ā': '따', 'i': '띠', 'ī': '띠', 'u': '뚜', 'ū': '뚜', 'e': '떼', 'o': '또' },
  'ṭh': { 'a': '타', 'ā': '타', 'i': '티', 'ī': '티', 'u': '투', 'ū': '투', 'e': '테', 'o': '토' },
  'ḍ': { 'a': '다', 'ā': '다', 'i': '디', 'ī': '디', 'u': '두', 'ū': '두', 'e': '데', 'o': '도' },
  'ḍh': { 'a': '다', 'ā': '다', 'i': '디', 'ī': '디', 'u': '두', 'ū': '두', 'e': '데', 'o': '도' },
  'ṇ': { 'a': '나', 'ā': '나', 'i': '니', 'ī': '니', 'u': '누', 'ū': '누', 'e': '네', 'o': '노' },
  't': { 'a': '따', 'ā': '따', 'i': '띠', 'ī': '띠', 'u': '뚜', 'ū': '뚜', 'e': '떼', 'o': '또' },
  'th': { 'a': '타', 'ā': '타', 'i': '티', 'ī': '티', 'u': '투', 'ū': '투', 'e': '테', 'o': '토' },
  'd': { 'a': '다', 'ā': '다', 'i': '디', 'ī': '디', 'u': '두', 'ū': '두', 'e': '데', 'o': '도' },
  'dh': { 'a': '다', 'ā': '다', 'i': '디', 'ī': '디', 'u': '두', 'ū': '두', 'e': '데', 'o': '도' },
  'n': { 'a': '나', 'ā': '나', 'i': '니', 'ī': '니', 'u': '누', 'ū': '누', 'e': '네', 'o': '노' },
  'p': { 'a': '빠', 'ā': '빠', 'i': '삐', 'ī': '삐', 'u': '뿌', 'ū': '뿌', 'e': '뻬', 'o': '뽀' },
  'ph': { 'a': '파', 'ā': '파', 'i': '피', 'ī': '피', 'u': '푸', 'ū': '푸', 'e': '페', 'o': '포' },
  'b': { 'a': '바', 'ā': '바', 'i': '비', 'ī': '비', 'u': '부', 'ū': '부', 'e': '베', 'o': '보' },
  'bh': { 'a': '바', 'ā': '바', 'i': '비', 'ī': '비', 'u': '부', 'ū': '부', 'e': '베', 'o': '보' },
  'm': { 'a': '마', 'ā': '마', 'i': '미', 'ī': '미', 'u': '무', 'ū': '무', 'e': '메', 'o': '모' },
  'y': { 'a': '야', 'ā': '야', 'i': '이', 'ī': '이', 'u': '유', 'ū': '유', 'e': '예', 'o': '요' },
  'r': { 'a': '라', 'ā': '라', 'i': '리', 'ī': '리', 'u': '루', 'ū': '루', 'e': '레', 'o': '로' },
  'l': { 'a': '라', 'ā': '라', 'i': '리', 'ī': '리', 'u': '루', 'ū': '루', 'e': '레', 'o': '로' },
  'ḷ': { 'a': '라', 'ā': '라', 'i': '리', 'ī': '리', 'u': '루', 'ū': '루', 'e': '레', 'o': '로' },
  'v': { 'a': '와', 'ā': '와', 'i': '위', 'ī': '위', 'u': '우', 'ū': '우', 'e': '웨', 'o': '워' },
  's': { 'a': '사', 'ā': '사', 'i': '시', 'ī': '시', 'u': '수', 'ū': '수', 'e': '세', 'o': '소' },
  'h': { 'a': '하', 'ā': '하', 'i': '히', 'ī': '히', 'u': '후', 'ū': '후', 'e': '헤', 'o': '호' },
}

const isVowel = (ch: string) => ch in VOWELS

export function paliToKorean(roman: string): string {
  let result = '', i = 0
  const s = roman.toLowerCase()

  while (i < s.length) {
    const ch = s[i]

    // 공백/구두점
    if (/[\s,.;:!?\-—–/"'()""'']/.test(ch)) {
      result += ch === '/' ? ' ' : ch
      i++
      continue
    }

    // ṃ (아누스바라 — 비음)
    if (ch === 'ṃ') {
      result += '응'
      i++
      continue
    }

    // 자음 매칭 (3글자 → 2글자 → 1글자)
    const three = s.slice(i, i + 3)
    const two = s.slice(i, i + 2)
    let conKey: string | null = null
    let consumed = 0

    if (CONSONANTS[three]) { conKey = three; consumed = 3 }
    else if (CONSONANTS[two]) { conKey = two; consumed = 2 }
    else if (CONSONANTS[ch]) { conKey = ch; consumed = 1 }

    if (conKey) {
      i += consumed
      // 뒤에 모음이 오면 조합
      if (i < s.length && isVowel(s[i])) {
        const vowel = s[i]
        result += COMBO[conKey]?.[vowel] || (CONSONANTS[conKey].initial.slice(0, -1) + VOWELS[vowel])
        i++
      } else {
        // 자음만 (종성)
        result += CONSONANTS[conKey].final
      }
      continue
    }

    // 독립 모음
    if (isVowel(ch)) {
      result += VOWELS[ch]
      i++
      continue
    }

    // 기타 문자
    result += ch
    i++
  }

  return result
}
