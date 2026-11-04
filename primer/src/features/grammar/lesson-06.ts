// 6과: 소유격 (Genitive) - 교재 6과 완전 수록
// 경전: Namo tassa bhagavato arahato sammāsambuddhassa
import type { StepWithoutId } from './types'

const V_NAMO = 'Esa bhagavato sāvakasaṅgho, ujupaṭipanno bhagavato sāvakasaṅgho.'
const V_NAMO_K = '이 세존의 제자 승가는 바르게 행하는 이들이며, 이 세존의 제자 승가는 올바르게 행하는 이들입니다.'

export const LESSON_06: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '6과: 남성명사 소유격', subtitle: 'Chaṭṭhī vibhatti (Genitive)', description: '소유격은 소유·관계를 나타냅니다.\n~의, ~에게, ~를 위하여\n\n단수: -ssa / 복수: -ānaṃ\n(여격과 형태 유사)\n\n경전: "bhagavato sāvakasaṅgho\n(세존의 제자 승가)"', icon: '👑' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_NAMO, pronKo: '에사 바가와또 사-와까상고 우주빠띠빤노 바가와또 사-와까상고', translation: V_NAMO_K, highlight: ['bhagavato', 'sāvakasaṅgho', 'ujupaṭipanno'], note: 'bhagavato = bhagavant(세존)의 소유격\nsāvakasaṅgho = sāvaka(제자) + saṅgha(승가)\nujupaṭipanno = 바르게(uju) 행하는(paṭipanna)\n※ 승가예경(Saṅgha-vandanā) 구절' },

  // === 소유격 문법 ===
  { type: 'teach-grammar', title: '소유격 (Genitive) — ~의', example: 'nara + ssa = narassa (사람의)\nnara + ānaṃ = narānaṃ (사람들의)', exampleKo: '단수: -a → -assa / 복수: -a → -ānaṃ', explanation: '소유격의 의미:\n• 소유: narassa putto (사람의 아들)\n• 관계: Buddhassa sāvako (붓다의 제자)\n• ~를 위하여: kassakassa (농부를 위하여)\n\n-a 남성명사:\n• 단수: -assa (narassa, kassakassa)\n• 복수: -ānaṃ (narānaṃ, kassakānaṃ)\n\n여격(-āya/-ānaṃ)과 복수형 동일!' },

  // === 소유격 vs 여격 비교 ===
  { type: 'teach-grammar', title: '소유격 vs 여격 — 구별법', example: '소유격: narassa putto (사람의 아들)\n여격: narāya deti (사람에게 준다)', exampleKo: '소유격=소유·관계 / 여격=방향·수여', explanation: '복수형은 둘 다 -ānaṃ으로 동일!\n문맥으로 구별합니다.\n\n• 소유격: ~의 (수식어 역할)\n  narānaṃ puttā = 사람들의 아들들\n• 여격: ~에게 (동사의 간접목적어)\n  narānaṃ deti = 사람들에게 준다\n\n단수는 다름:\n• 소유격: -assa (narassa)\n• 여격: -āya (narāya)' },

  // === 교재 예문 3쌍 ===
  { type: 'verse', pali: 'Narassa putto bhattaṃ yācati.\nNarānaṃ puttā bhattaṃ yācanti.', pronKo: '나랏사 뿟또 밧땅 야-자띠\n나라-남 뿟따- 밧땅 야-잔띠', translation: '사람의 아들은 밥을 구한다.\n사람들의 아들들은 밥을 구한다.', highlight: ['Narassa', 'Narānaṃ'] },
  { type: 'verse', pali: 'Mātulassa sahāyako rathaṃ āharati.\nMātulānaṃ sahāyakā rathe āharanti.', pronKo: '마-뚤랏사 사하-야꼬 라탐 아-하라띠\n마-뚤라-남 사하-야까- 라테 아-하란띠', translation: '삼촌의 친구는 마차를 가져온다.\n삼촌들의 친구들은 마차들을 가져온다.', highlight: ['Mātulassa', 'Mātulānaṃ'] },
  { type: 'verse', pali: 'Kassakassa sūkaro dīpaṃ dhāvati.\nKassakānaṃ sūkarā dīpe dhāvanti.', pronKo: '깟사깟사 수-까로 디-빵 다-와띠\n깟사까-남 수-까라- 디-뻬 다-완띠', translation: '농부의 돼지는 섬으로 달린다.\n농부들의 돼지들은 섬들로 달린다.', highlight: ['Kassakassa', 'Kassakānaṃ'] },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Kassakassa putto vejjassa sahāyena saddhiṃ āgacchati.', options: ['농부의 아들은 의사의 친구와 함께 온다', '농부의 아들은 의사와 함께 온다', '농부들의 아들은 의사의 친구와 함께 간다', '농부의 아들들은 의사의 친구와 함께 온다'], answer: 0, hint: 'kassakassa=농부의, vejjassa sahāyena=의사의 친구와(도구격)' },
  { type: 'quiz', question: '2. Brāhmaṇassa kuddālo hatthamhā patati.', options: ['바라문의 괭이가 손에서 떨어진다', '바라문은 괭이를 손으로 던진다', '바라문의 괭이가 나무에서 떨어진다', '바라문들의 괭이가 손에서 떨어진다'], answer: 0, hint: 'brāhmaṇassa=바라문의, kuddālo=괭이가, hatthamhā=손에서(탈격)' },
  { type: 'quiz', question: '3. Migā āvāṭehi nikkhamanti.', options: ['사슴들은 구덩이들에서 나온다', '사슴은 구덩이에서 나온다', '사슴들은 마을들에서 나온다', '사슴들은 구덩이들로 달린다'], answer: 0, hint: 'āvāṭehi=구덩이들에서(탈격), nikkhamanti=나오다(복수)' },
  { type: 'quiz', question: '4. Vāṇijānaṃ assā kassakassa gāmaṃ dhāvanti.', options: ['상인들의 말들은 농부의 마을로 달린다', '상인의 말은 농부의 마을로 달린다', '상인들의 말들은 농부들의 마을로 간다', '상인들의 말들은 농부의 마을에서 달린다'], answer: 0, hint: 'vāṇijānaṃ=상인들의, kassakassa=농부의' },
  { type: 'quiz', question: '5. Mātulassa mitto Tathāgatassa sāvake vandati.', options: ['삼촌의 친구는 여래의 제자들에게 경배한다', '삼촌의 친구는 여래의 제자에게 경배한다', '삼촌들의 친구는 여래의 제자를 본다', '삼촌의 친구들은 여래의 제자들에게 경배한다'], answer: 0, hint: 'mātulassa mitto=삼촌의 친구는, Tathāgatassa sāvake=여래의 제자들에게' },
  { type: 'quiz', question: '6. Amacco bhūpālassa khaggena sappaṃ paharati.', options: ['대신은 왕의 칼로 뱀을 때린다', '대신은 왕에게 칼로 뱀을 때린다', '대신들은 왕의 칼로 뱀을 때린다', '대신은 왕의 칼로 사슴을 때린다'], answer: 0, hint: 'bhūpālassa khaggena=왕의 칼로, sappaṃ=뱀을' },
  { type: 'quiz', question: '7. Vāṇijā gāme manussānaṃ piṭakehi macche āharanti.', options: ['상인들은 마을에서 사람들의 바구니로 물고기를 가져온다', '상인들은 마을의 사람들에게 바구니로 물고기를 가져온다', '상인은 마을에서 사람들의 바구니로 물고기를 가져온다', '상인들은 마을에서 사람들의 바구니들로 물고기들을 가져온다'], answer: 3, hint: 'manussānaṃ piṭakehi=사람들의 바구니들로(복수 도구격)' },
  { type: 'quiz', question: '8. Coro vejjassa sakaṭena mittena saha gāmamhā nikkhamati.', options: ['도둑은 의사의 짐수레로 친구와 함께 마을에서 나온다', '도둑은 의사와 짐수레로 친구와 함께 마을로 간다', '도둑들은 의사의 짐수레로 친구와 함께 마을에서 나온다', '도둑은 의사의 짐수레와 친구와 함께 마을에서 나온다'], answer: 0, hint: 'vejjassa sakaṭena=의사의 짐수레로, gāmamhā=마을에서(탈격)' },
  { type: 'quiz', question: '9. Upāsakassa puttā samaṇehi saha vihāraṃ gacchanti.', options: ['우바새의 아들들은 사문들과 함께 정사로 간다', '우바새들의 아들들은 사문들과 함께 정사로 간다', '우바새의 아들은 사문과 함께 정사로 간다', '우바새의 아들들은 사문들과 함께 마을로 간다'], answer: 0, hint: 'upāsakassa puttā=우바새의 아들들은, samaṇehi saha=사문들과 함께' },
  { type: 'quiz', question: '10. Yācako amaccassa sāṭakaṃ icchati.', options: ['거지는 대신의 옷을 원한다', '거지들은 대신의 옷을 원한다', '거지는 대신에게 옷을 원한다', '거지는 대신의 밥을 원한다'], answer: 0, hint: 'amaccassa=대신의(소유격), sāṭakaṃ=옷을' },

  // === 마무리 ===
  { type: 'speak', pali: V_NAMO, pronKo: '에사 바가와또 사-와까상고 우주빠띠빤노 바가와또 사-와까상고' },
]
