// 1과: -a 남성명사 주격 + 현재 3인칭 동사 (교재 1과 완전 수록)
// 경전 구절: 전법륜경(SN 56.11)
import type { StepWithoutId } from './types'

const V1 = 'Ekaṃ samayaṃ bhagavā bārāṇasiyaṃ viharati isipatane migadāye.'
const V1K = '한 때 세존께서 바라나시의 녹야원, 이시빠따나에 머무셨다.'
const V2 = 'Tatra kho bhagavā pañcavaggiye bhikkhū āmantesi:'
const V2K = '거기서 세존께서 다섯 비구에게 말씀하셨다:'

export const LESSON_01: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '1과: 남성명사 주격 + 동사', subtitle: '-a puliṅga paṭhamā vibhatti', description: '-a로 끝나는 남성명사의 주격과\n현재 3인칭 동사를 배웁니다.\n\n전법륜경의 첫 구절에서 직접 확인합니다.', icon: '📿' },

  // === 경전 구절 ===
  { type: 'verse', pali: V1, pronKo: '에깡 사마양 바가와~ 바-라-나시양 위하라띠 이시빠따네 미가다-예', translation: V1K, highlight: ['bhagavā', 'viharati'], note: 'bhagavā(세존)는 주격, viharati(머무시다)는 현재 3인칭 동사입니다.\n오늘 이 문법을 배웁니다!' },

  // === 주격 문법 ===
  { type: 'teach-grammar', title: '주격 (Nominative) — ~은/는/이/가', example: 'nara + o = naro (사람은)\nnara + ā = narā (사람들은)', exampleKo: '단수: -a → -o / 복수: -a → -ā', explanation: '주격은 문장의 주어입니다.\n\n-a로 끝나는 남성명사:\n• 단수: -a → -o (naro, buddho, kassako)\n• 복수: -a → -ā (narā, buddhā, kassakā)' },

  // === 명사 13개 (교재 전체) ===
  { type: 'teach', word: 'Buddho', pronKo: '붓도', meaning: '붓다는 (주격 단수)', icon: '🙏', grammar: '남성명사 · 주격 단수', baseForm: 'Buddha (붓다, 깨달은 자)', formNote: 'Buddha → Buddho (-a → -o)' },
  { type: 'teach', word: 'Tathāgato', pronKo: '따타-가또', meaning: '여래는 (주격 단수)', icon: '☸️', grammar: '남성명사 · 주격 단수', baseForm: 'Tathāgata (여래)', formNote: 'Tathāgata → Tathāgato', buddhism: '"이와 같이 온 자" 또는 "이와 같이 간 자"', verseLine: V2, verseLineKo: V2K },
  { type: 'teach', word: 'Sugato', pronKo: '수가또', meaning: '선서는 (주격 단수)', icon: '☸️', grammar: '남성명사 · 주격 단수', baseForm: 'Sugata (선서, 잘 가신 분)', formNote: 'Sugata → Sugato' },
  { type: 'teach', word: 'manusso', pronKo: '마눗소', meaning: '사람은 (주격 단수)', icon: '👤', grammar: '남성명사 · 주격 단수', baseForm: 'manussa (사람, 인간)', formNote: 'manussa → manusso' },
  { type: 'teach', word: 'naro', pronKo: '나로', meaning: '인간은, 남자는 (주격 단수)', icon: '👤', grammar: '남성명사 · 주격 단수', baseForm: 'nara / purisa (인간, 남자)', formNote: 'nara → naro / purisa → puriso' },
  { type: 'teach', word: 'kassako', pronKo: '깟사꼬', meaning: '농부는 (주격 단수)', icon: '🌾', grammar: '남성명사 · 주격 단수', baseForm: 'kassaka (농부)', formNote: 'kassaka → kassako' },
  { type: 'teach', word: 'brāhmaṇo', pronKo: '브라-흐마노', meaning: '바라문은 (주격 단수)', icon: '🧘', grammar: '남성명사 · 주격 단수', baseForm: 'brāhmaṇa (바라문)', formNote: 'brāhmaṇa → brāhmaṇo' },
  { type: 'teach', word: 'putto', pronKo: '뿟또', meaning: '아들은 (주격 단수)', icon: '👦', grammar: '남성명사 · 주격 단수', baseForm: 'putta (아들)', formNote: 'putta → putto' },
  { type: 'teach', word: 'mātulo', pronKo: '마-뚤로', meaning: '삼촌은 (주격 단수)', icon: '👨', grammar: '남성명사 · 주격 단수', baseForm: 'mātula (삼촌)', formNote: 'mātula → mātulo' },
  { type: 'teach', word: 'kumāro', pronKo: '꾸마-로', meaning: '소년은, 왕자는 (주격 단수)', icon: '👦', grammar: '남성명사 · 주격 단수', baseForm: 'kumāra (소년, 왕자)', formNote: 'kumāra → kumāro' },
  { type: 'teach', word: 'vāṇijo', pronKo: '와-니조', meaning: '상인은 (주격 단수)', icon: '💰', grammar: '남성명사 · 주격 단수', baseForm: 'vāṇija (상인)', formNote: 'vāṇija → vāṇijo' },
  { type: 'teach', word: 'bhūpālo', pronKo: '부-빨-로', meaning: '왕은 (주격 단수)', icon: '👑', grammar: '남성명사 · 주격 단수', baseForm: 'bhūpāla (왕)', formNote: 'bhūpāla → bhūpālo' },
  { type: 'teach', word: 'sahāyako', pronKo: '사하-야꼬', meaning: '친구는 (주격 단수)', icon: '🤝', grammar: '남성명사 · 주격 단수', baseForm: 'sahāya / sahāyaka / mitta (친구, 벗)', formNote: 'sahāyaka → sahāyako / mitta → mitto' },

  // === 동사 10개 (교재 전체) ===
  { type: 'teach-grammar', title: '현재 3인칭 동사', example: '단수: 어간 + -ti (bhāsati 말한다)\n복수: 어간 + -nti (bhāsanti 말한다)', exampleKo: '단수 -ti / 복수 -nti', explanation: '현재 3인칭 동사 활용:\n• 단수: 어간 + -ti → bhāsati, pacati\n• 복수: 어간 + -nti → bhāsanti, pacanti' },
  { type: 'teach', word: 'bhāsati', pronKo: '바-사띠', meaning: '말하다', icon: '🗣️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'bhāsa (말하다)', formNote: 'bhāsa + ti / 복수: bhāsanti' },
  { type: 'teach', word: 'pacati', pronKo: '빠짜띠', meaning: '요리하다', icon: '🍳', grammar: '동사 · 현재 3인칭 단수', baseForm: 'paca (요리하다)', formNote: 'paca + ti / 복수: pacanti' },
  { type: 'teach', word: 'kasati', pronKo: '까사띠', meaning: '쟁기질하다', icon: '🌾', grammar: '동사 · 현재 3인칭 단수', baseForm: 'kasa (쟁기질하다)', formNote: 'kasa + ti / 복수: kasanti' },
  { type: 'teach', word: 'bhuñjati', pronKo: '분자띠', meaning: '먹다', icon: '🍚', grammar: '동사 · 현재 3인칭 단수', baseForm: 'bhuñja (먹다)', formNote: 'bhuñja + ti / 복수: bhuñjanti' },
  { type: 'teach', word: 'sayati', pronKo: '사야띠', meaning: '자다, 눕다', icon: '😴', grammar: '동사 · 현재 3인칭 단수', baseForm: 'saya (자다)', formNote: 'saya + ti / 복수: sayanti' },
  { type: 'teach', word: 'passati', pronKo: '빳사띠', meaning: '보다', icon: '👁️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'passa (보다)', formNote: 'passa + ti / 복수: passanti' },
  { type: 'teach', word: 'chindati', pronKo: '친다띠', meaning: '자르다', icon: '✂️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'chinda (자르다)', formNote: 'chinda + ti / 복수: chindanti' },
  { type: 'teach', word: 'gacchati', pronKo: '갓차띠', meaning: '가다', icon: '🚶', grammar: '동사 · 현재 3인칭 단수', baseForm: 'gaccha (가다)', formNote: 'gaccha + ti / 복수: gacchanti' },
  { type: 'teach', word: 'āgacchati', pronKo: '아-갓차띠', meaning: '오다', icon: '🚶‍♂️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'āgaccha (오다)', formNote: 'āgaccha + ti / 복수: āgacchanti' },
  { type: 'teach', word: 'dhāvati', pronKo: '다-와띠', meaning: '달리다', icon: '🏃', grammar: '동사 · 현재 3인칭 단수', baseForm: 'dhāva (달리다)', formNote: 'dhāva + ti / 복수: dhāvanti' },

  // === 교재 예문 3쌍 ===
  { type: 'verse', pali: 'Naro bhāsati / Narā bhāsanti', pronKo: '나로 바-사띠 / 나라- 바-산띠', translation: '사람은 말한다 / 사람들은 말한다', highlight: ['Naro', 'Narā', 'bhāsati', 'bhāsanti'] },
  { type: 'verse', pali: 'Mātulo pacati / Mātulā pacanti', pronKo: '마-뚤로 빠짜띠 / 마-뚤라- 빠짠띠', translation: '삼촌은 요리한다 / 삼촌들은 요리한다', highlight: ['Mātulo', 'Mātulā', 'pacati', 'pacanti'] },
  { type: 'verse', pali: 'Kassako kasati / Kassakā kasanti', pronKo: '깟사꼬 까사띠 / 깟사까- 까산띠', translation: '농부는 쟁기질한다 / 농부들은 쟁기질한다', highlight: ['Kassako', 'Kassakā', 'kasati', 'kasanti'] },

  // === 경전 구절 ===
  { type: 'verse', pali: V2, pronKo: '따뜨라 코 바가와~ 빤짜왓기예 빅쿠- 아-만떼시', translation: V2K, highlight: ['bhagavā', 'āmantesi'], note: 'bhagavā = 주격 (세존께서)\nāmantesi = 과거형 동사 (말씀하셨다)' },

  // === 연습문제 1 (16문제) ===
  { type: 'quiz', question: '1. Bhūpālo bhuñjati.', options: ['왕은 먹는다', '왕은 달린다', '왕들은 먹는다', '소년은 먹는다'], answer: 0, hint: 'Bhūpālo = 왕은(주격 단수), bhuñjati = 먹다' },
  { type: 'quiz', question: '2. Puttā sayanti.', options: ['아들은 잔다', '아들들은 잔다', '아들들은 먹는다', '아들은 본다'], answer: 1, hint: 'Puttā = 아들들은(주격 복수), sayanti = 자다(복수)' },
  { type: 'quiz', question: '3. Vāṇijā sayanti.', options: ['상인은 잔다', '농부들은 잔다', '상인들은 잔다', '상인들은 말한다'], answer: 2, hint: 'Vāṇijā = 상인들은(주격 복수)' },
  { type: 'quiz', question: '4. Buddho passati.', options: ['붓다를 본다', '붓다는 보신다', '붓다는 말한다', '붓다들은 본다'], answer: 1, hint: 'Buddho = 붓다는(주격 단수), passati = 보다' },
  { type: 'quiz', question: '5. Kumāro dhāvati.', options: ['소년들은 달린다', '소년은 간다', '소년은 달린다', '왕은 달린다'], answer: 2, hint: 'Kumāro = 소년은(주격 단수), dhāvati = 달리다' },
  { type: 'quiz', question: '6. Mātulo kasati.', options: ['삼촌은 요리한다', '삼촌은 쟁기질한다', '삼촌들은 쟁기질한다', '농부는 쟁기질한다'], answer: 1, hint: 'Mātulo = 삼촌은, kasati = 쟁기질하다' },
  { type: 'quiz', question: '7. Brāhmaṇā bhāsanti.', options: ['바라문은 말한다', '바라문들은 본다', '바라문들은 말한다', '사람들은 말한다'], answer: 2, hint: 'Brāhmaṇā = 바라문들은(복수), bhāsanti = 말하다(복수)' },
  { type: 'quiz', question: '8. Mittā gacchanti.', options: ['친구는 간다', '친구들은 온다', '친구들은 간다', '친구들은 달린다'], answer: 2, hint: 'Mittā = 친구들은(복수), gacchanti = 가다(복수)' },
  { type: 'quiz', question: '9. Kassakā pacanti.', options: ['농부는 요리한다', '농부들은 쟁기질한다', '농부들은 요리한다', '바라문들은 요리한다'], answer: 2, hint: 'Kassakā = 농부들은(복수), pacanti = 요리하다(복수)' },
  { type: 'quiz', question: '10. Manusso chindati.', options: ['사람들은 자른다', '사람은 자른다', '사람은 먹는다', '농부는 자른다'], answer: 1, hint: 'Manusso = 사람은(단수), chindati = 자르다' },
  { type: 'quiz', question: '11. Purisā dhāvanti.', options: ['남자는 달린다', '남자들은 간다', '남자들은 달린다', '소년들은 달린다'], answer: 2, hint: 'Purisā = 남자들은(복수), dhāvanti = 달리다(복수)' },
  { type: 'quiz', question: '12. Sahāyako bhuñjati.', options: ['친구들은 먹는다', '친구는 먹는다', '친구는 잔다', '상인은 먹는다'], answer: 1, hint: 'Sahāyako = 친구는(단수), bhuñjati = 먹다' },
  { type: 'quiz', question: '13. Tathāgato bhāsati.', options: ['여래는 보신다', '여래를 말한다', '여래는 말씀하신다', '여래들은 말한다'], answer: 2, hint: 'Tathāgato = 여래는(주격 단수), bhāsati = 말하다' },
  { type: 'quiz', question: '14. Naro pacati.', options: ['사람은 요리한다', '사람들은 요리한다', '사람은 먹는다', '남자는 잔다'], answer: 0, hint: 'Naro = 사람은(단수), pacati = 요리하다' },
  { type: 'quiz', question: '15. Sahāyā kasanti.', options: ['친구는 쟁기질한다', '친구들은 요리한다', '친구들은 쟁기질한다', '농부들은 쟁기질한다'], answer: 2, hint: 'Sahāyā = 친구들은(복수), kasanti = 쟁기질하다(복수)' },
  { type: 'quiz', question: '16. Sugato āgacchati.', options: ['선서는 가신다', '선서는 오신다', '선서들은 오신다', '여래는 오신다'], answer: 1, hint: 'Sugato = 선서는(주격 단수), āgacchati = 오다' },

  // === 마무리 ===
  { type: 'speak', pali: 'Ekaṃ samayaṃ bhagavā bārāṇasiyaṃ viharati', pronKo: '에깡 사마양 바가와~ 바-라-나시양 위하라띠' },
]
