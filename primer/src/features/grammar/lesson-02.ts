// 2과: -a 남성명사 목적격 (교재 2과 완전 수록)
// 경전: 전법륜경 + 무아경에서 목적격 실례
import type { StepWithoutId } from './types'

const V_DHAMMA = 'Tathāgato dhammaṃ bhāsati.'
const V_DHAMMA_K = '여래는 법을 말씀하신다.'
const V_DUKKHA = 'Idaṃ kho pana, bhikkhave, dukkhaṃ ariyasaccaṃ—'
const V_DUKKHA_K = '비구들이여, 이것이 괴로움의 성스러운 진리이다—'

export const LESSON_02: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '2과: 남성명사 목적격', subtitle: 'Dutiyā vibhatti (Accusative)', description: '목적격은 동작의 대상(~을, ~를)과\n방향(~로, ~에게로)을 나타냅니다.\n\n경전에서 dhammaṃ(법을)이 바로 목적격입니다!', icon: '🎯' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_DHAMMA, pronKo: '따타-가또 담망 바-사띠', translation: V_DHAMMA_K, highlight: ['dhammaṃ'], note: 'dhammaṃ = dhamma(법) + ṃ(목적격 어미)\n여래가 "무엇을" 말하는가? → 법을(dhammaṃ)' },

  // === 목적격 문법 ===
  { type: 'teach-grammar', title: '목적격 (Accusative) — ~을/를', example: 'nara + ṃ = naraṃ (사람을)\nnara → nare (사람들을)', exampleKo: '단수: 기본형 + -ṃ / 복수: -a → -e', explanation: '목적격은 동작의 대상을 나타냅니다.\n\n-a 남성명사:\n• 단수: 기본형 + -ṃ (naraṃ, dhammaṃ)\n• 복수: -a → -e (nare, dhamme)\n\n해석: ~을, ~를, ~에게로, ~로' },

  // === 명사 14개 (교재 전체) ===
  { type: 'teach', word: 'dhammaṃ', pronKo: '담망', meaning: '법을 (목적격 단수)', icon: '☸️', grammar: '남성명사 · 목적격 단수', baseForm: 'dhamma (법, 진리, 가르침)', formNote: 'dhamma + ṃ → dhammaṃ', buddhism: '"Tathāgato dhammaṃ bhāsati" — 경전 핵심 목적격 용례', verseLine: V_DHAMMA, verseLineKo: V_DHAMMA_K },
  { type: 'teach', word: 'bhattaṃ', pronKo: '밧땅', meaning: '쌀을 (목적격 단수)', icon: '🍚', grammar: '남성명사 · 목적격 단수', baseForm: 'bhatta (쌀)', formNote: 'bhatta + ṃ → bhattaṃ' },
  { type: 'teach', word: 'odanaṃ', pronKo: '오다낭', meaning: '밥을 (목적격 단수)', icon: '🍚', grammar: '남성명사 · 목적격 단수', baseForm: 'odana (밥)', formNote: 'odana + ṃ → odanaṃ' },
  { type: 'teach', word: 'gāmaṃ', pronKo: '가-망', meaning: '마을로 (목적격 단수)', icon: '🏘️', grammar: '남성명사 · 목적격 단수', baseForm: 'gāma (마을)', formNote: 'gāma + ṃ → gāmaṃ (방향: 마을로)' },
  { type: 'teach', word: 'suriyaṃ', pronKo: '수리양', meaning: '태양을 (목적격 단수)', icon: '☀️', grammar: '남성명사 · 목적격 단수', baseForm: 'suriya (태양)', formNote: 'suriya + ṃ → suriyaṃ' },
  { type: 'teach', word: 'candaṃ', pronKo: '짠당', meaning: '달을 (목적격 단수)', icon: '🌙', grammar: '남성명사 · 목적격 단수', baseForm: 'canda (달)', formNote: 'canda + ṃ → candaṃ' },
  { type: 'teach', word: 'kukkuraṃ', pronKo: '꾹꾸랑', meaning: '개를 (목적격 단수)', icon: '🐕', grammar: '남성명사 · 목적격 단수', baseForm: 'kukkura / sunakha / soṇa (개)', formNote: 'kukkura + ṃ → kukkuraṃ' },
  { type: 'teach', word: 'vihāraṃ', pronKo: '위하-랑', meaning: '정사로 (목적격 단수)', icon: '🏛️', grammar: '남성명사 · 목적격 단수', baseForm: 'vihāra (절, 사원, 정사)', formNote: 'vihāra + ṃ → vihāraṃ' },
  { type: 'teach', word: 'pattaṃ', pronKo: '빳땅', meaning: '발우를 (목적격 단수)', icon: '🥣', grammar: '남성명사 · 목적격 단수', baseForm: 'patta (발우, 그릇)', formNote: 'patta + ṃ → pattaṃ' },
  { type: 'teach', word: 'āvāṭaṃ', pronKo: '아-와-땅', meaning: '구덩이를 (목적격 단수)', icon: '🕳️', grammar: '남성명사 · 목적격 단수', baseForm: 'āvāṭa (구덩이)', formNote: 'āvāṭa + ṃ → āvāṭaṃ' },
  { type: 'teach', word: 'pabbataṃ', pronKo: '빱바땅', meaning: '산을 (목적격 단수)', icon: '⛰️', grammar: '남성명사 · 목적격 단수', baseForm: 'pabbata (산)', formNote: 'pabbata + ṃ → pabbataṃ' },
  { type: 'teach', word: 'yācakaṃ', pronKo: '야-짜깡', meaning: '거지를 (목적격 단수)', icon: '🧎', grammar: '남성명사 · 목적격 단수', baseForm: 'yācaka (거지)', formNote: 'yācaka + ṃ → yācakaṃ (목적격)' },
  { type: 'teach', word: 'sigālaṃ', pronKo: '시가-랑', meaning: '재칼을 (목적격 단수)', icon: '🦊', grammar: '남성명사 · 목적격 단수', baseForm: 'sigāla (재칼)', formNote: 'sigāla + ṃ → sigālaṃ' },
  { type: 'teach', word: 'rukkhaṃ', pronKo: '룩캉', meaning: '나무를 (목적격 단수)', icon: '🌳', grammar: '남성명사 · 목적격 단수', baseForm: 'rukkha (나무)', formNote: 'rukkha + ṃ → rukkhaṃ' },

  // === 동사 10개 (교재 전체) ===
  { type: 'teach', word: 'harati', pronKo: '하라띠', meaning: '운반하다, 빼앗다', icon: '📦', grammar: '동사 · 현재 3인칭 단수', baseForm: 'hara (운반하다)', formNote: 'hara + ti / 복수: haranti' },
  { type: 'teach', word: 'āharati', pronKo: '아-하라띠', meaning: '가져오다', icon: '📥', grammar: '동사 · 현재 3인칭 단수', baseForm: 'āhara (가져오다)', formNote: 'āhara + ti / 복수: āharanti' },
  { type: 'teach', word: 'āruhati', pronKo: '아-루하띠', meaning: '오르다, 올라가다', icon: '⬆️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'āruha (오르다)', formNote: 'āruha + ti / 복수: āruhanti' },
  { type: 'teach', word: 'oruhati', pronKo: '오루하띠', meaning: '내려오다', icon: '⬇️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'oruha (내려오다)', formNote: 'oruha + ti / 복수: oruhanti' },
  { type: 'teach', word: 'yācati', pronKo: '야-짜띠', meaning: '구걸하다', icon: '🤲', grammar: '동사 · 현재 3인칭 단수', baseForm: 'yāca (구걸하다)', formNote: 'yāca + ti / 복수: yācanti' },
  { type: 'teach', word: 'khaṇati', pronKo: '카나띠', meaning: '파다', icon: '⛏️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'khaṇa (파다)', formNote: 'khaṇa + ti / 복수: khaṇanti' },
  { type: 'teach', word: 'vijjhati', pronKo: '윗자띠', meaning: '쏘다', icon: '🏹', grammar: '동사 · 현재 3인칭 단수', baseForm: 'vijjha (쏘다)', formNote: 'vijjha + ti / 복수: vijjhanti' },
  { type: 'teach', word: 'paharati', pronKo: '빠하라띠', meaning: '때리다, 치다', icon: '👊', grammar: '동사 · 현재 3인칭 단수', baseForm: 'pahara (때리다)', formNote: 'pahara + ti / 복수: paharanti' },
  { type: 'teach', word: 'rakkhati', pronKo: '락카띠', meaning: '보호하다', icon: '🛡️', grammar: '동사 · 현재 3인칭 단수', baseForm: 'rakkha (보호하다)', formNote: 'rakkha + ti / 복수: rakkhanti' },
  { type: 'teach', word: 'vandati', pronKo: '완다띠', meaning: '인사하다, 경배하다', icon: '🙏', grammar: '동사 · 현재 3인칭 단수', baseForm: 'vanda (경배하다)', formNote: 'vanda + ti / 복수: vandanti' },

  // === 교재 예문 3쌍 ===
  { type: 'verse', pali: 'Putto naraṃ passati / Puttā nare passanti', pronKo: '뿟또 나랑 빳사띠 / 뿟따- 나레 빳산띠', translation: '아들은 사람을 본다 / 아들들은 사람들을 본다', highlight: ['naraṃ', 'nare', 'passati', 'passanti'] },
  { type: 'verse', pali: 'Brāhmaṇo mātulaṃ rakkhati / Brāhmaṇā mātule rakkhanti', pronKo: '브라-흐마노 마-뚤랑 락카띠 / 브라-흐마나- 마-뚤레 락칸띠', translation: '바라문은 삼촌을 보호한다 / 바라문들은 삼촌들을 보호한다', highlight: ['mātulaṃ', 'mātule'] },
  { type: 'verse', pali: 'Vāṇijo kassakaṃ paharati / Vāṇijā kassake paharanti', pronKo: '와-니조 깟사깡 빠하라띠 / 와-니자- 깟사게 빠하란띠', translation: '상인은 농부를 때린다 / 상인들은 농부들을 때린다', highlight: ['kassakaṃ', 'kassake'] },

  // === 경전 실례 ===
  { type: 'verse', pali: V_DUKKHA, pronKo: '이당 코 빠나 빅카웨 둑캉 아리야삿짱', translation: V_DUKKHA_K, highlight: ['dukkhaṃ', 'ariyasaccaṃ'], note: 'dukkhaṃ ariyasaccaṃ: -ṃ이지만 중성명사 주격!\n(중성명사 주격도 -ṃ — 나중에 배움)' },

  // === 연습문제 2 (25문제) ===
  { type: 'quiz', question: '1. Tathāgato dhammaṃ bhāsati.', options: ['여래는 법을 말씀하신다', '여래를 법이 말한다', '여래는 법으로 간다', '여래들은 법을 말한다'], answer: 0, hint: 'Tathāgato=여래는, dhammaṃ=법을, bhāsati=말하다' },
  { type: 'quiz', question: '2. Brāhmaṇā odanaṃ bhuñjanti.', options: ['바라문은 밥을 먹는다', '바라문들은 쌀을 요리한다', '바라문들은 밥을 먹는다', '사람들은 밥을 먹는다'], answer: 2, hint: 'Brāhmaṇā=바라문들은(복수), odanaṃ=밥을' },
  { type: 'quiz', question: '3. Manusso suriyaṃ passati.', options: ['사람들은 태양을 본다', '사람은 달을 본다', '사람은 태양을 본다', '사람은 태양으로 간다'], answer: 2, hint: 'Manusso=사람은(단수), suriyaṃ=태양을' },
  { type: 'quiz', question: '4. Kumārā sigāle paharanti.', options: ['소년은 재칼을 때린다', '소년들은 재칼들을 때린다', '소년들은 개들을 때린다', '왕들은 재칼들을 때린다'], answer: 1, hint: 'Kumārā=소년들은, sigāle=재칼들을(목적격 복수)' },
  { type: 'quiz', question: '5. Yācakā bhattaṃ yācanti.', options: ['거지는 쌀을 구걸한다', '거지들은 밥을 먹는다', '거지들은 쌀을 구걸한다', '거지들은 밥을 요리한다'], answer: 2, hint: 'Yācakā=거지들은, bhattaṃ=쌀을, yācanti=구걸하다(복수)' },
  { type: 'quiz', question: '6. Kassakā āvāṭe khaṇanti.', options: ['농부는 구덩이를 판다', '농부들은 산을 오른다', '농부들은 구덩이들을 판다', '농부들은 나무를 자른다'], answer: 2, hint: 'āvāṭe=구덩이들을(목적격 복수), khaṇanti=파다' },
  { type: 'quiz', question: '7. Mitto gāmaṃ āgacchati.', options: ['친구는 마을로 간다', '친구는 마을로 온다', '친구들은 마을로 온다', '친구는 산으로 간다'], answer: 1, hint: 'Mitto=친구는(단수), gāmaṃ=마을로, āgacchati=오다' },
  { type: 'quiz', question: '8. Bhūpālo manusse rakkhati.', options: ['왕은 사람을 보호한다', '왕들은 사람들을 보호한다', '왕은 사람들을 보호한다', '사람들은 왕을 보호한다'], answer: 2, hint: 'Bhūpālo=왕은(단수), manusse=사람들을(목적격 복수)' },
  { type: 'quiz', question: '9. Puttā pabbataṃ gacchanti.', options: ['아들은 산으로 간다', '아들들은 산으로 간다', '아들들은 마을로 간다', '아들들은 산을 오른다'], answer: 1, hint: 'Puttā=아들들은, pabbataṃ=산으로, gacchanti=가다(복수)' },
  { type: 'quiz', question: '10. Kumāro Buddhaṃ vandati.', options: ['소년은 붓다를 본다', '소년은 붓다에게 경배한다', '소년들은 붓다에게 경배한다', '왕은 붓다에게 경배한다'], answer: 1, hint: 'Kumāro=소년은, Buddhaṃ=붓다에게, vandati=경배하다' },
  { type: 'quiz', question: '11. Vāṇijā patte āharanti.', options: ['상인들은 그릇들을 가져온다', '상인은 그릇를 가져온다', '상인들은 그릇을 운반한다', '상인들은 밥을 가져온다'], answer: 0, hint: 'Vāṇijā=상인들은, patte=그릇들을(목적격 복수)' },
  { type: 'quiz', question: '12. Puriso vihāraṃ gacchati.', options: ['남자들은 정사로 간다', '남자는 마을로 간다', '남자는 정사로 간다', '남자는 정사를 본다'], answer: 2, hint: 'Puriso=남자는(단수), vihāraṃ=정사로' },
  { type: 'quiz', question: '13. Kukkurā pabbataṃ dhāvanti.', options: ['개는 산으로 달린다', '개들은 마을로 달린다', '개들은 산으로 달린다', '재칼들은 산으로 달린다'], answer: 2, hint: 'Kukkurā=개들은, pabbataṃ=산으로, dhāvanti=달리다(복수)' },
  { type: 'quiz', question: '14. Sigālā gāmaṃ āgacchanti.', options: ['재칼은 마을로 온다', '재칼들은 마을로 간다', '재칼들은 마을로 온다', '개들은 마을로 온다'], answer: 2, hint: 'Sigālā=재칼들은(복수), āgacchanti=오다(복수)' },
  { type: 'quiz', question: '15. Brāhmaṇā sahāyake āharanti.', options: ['바라문들은 친구들을 데려온다', '바라문은 친구를 데려온다', '바라문들은 친구들을 본다', '바라문들은 친구들을 보호한다'], answer: 0, hint: 'sahāyake=친구들을(목적격 복수), āharanti=가져오다(복수)' },
  { type: 'quiz', question: '16. Bhūpālā sugataṃ vandanti.', options: ['왕은 선서에게 경배한다', '왕들은 여래에게 경배한다', '왕들은 선서에게 경배한다', '왕들은 선서를 본다'], answer: 2, hint: 'Bhūpālā=왕들은, sugataṃ=선서에게, vandanti=경배하다' },
  { type: 'quiz', question: '17. Yācakā sayanti.', options: ['거지는 잔다', '거지들은 먹는다', '거지들은 잔다', '거지들은 구걸한다'], answer: 2, hint: 'Yācakā=거지들은(복수), sayanti=자다(복수)' },
  { type: 'quiz', question: '18. Mittā sunakhe haranti.', options: ['친구들은 개들을 운반한다', '친구는 개를 운반한다', '친구들은 개들을 때린다', '친구들은 개를 보호한다'], answer: 0, hint: 'Mittā=친구들은, sunakhe=개들을(목적격 복수)' },
  { type: 'quiz', question: '19. Putto candaṃ passati.', options: ['아들은 태양을 본다', '아들들은 달을 본다', '아들은 달을 본다', '아들은 달로 간다'], answer: 2, hint: 'Putto=아들은, candaṃ=달을, passati=보다' },
  { type: 'quiz', question: '20. Kassako gāmaṃ dhāvati.', options: ['농부는 마을로 달린다', '농부들은 마을로 달린다', '농부는 마을로 간다', '농부는 산으로 달린다'], answer: 0, hint: 'Kassako=농부는(단수), gāmaṃ=마을로, dhāvati=달리다' },
  { type: 'quiz', question: '21. Vāṇijā rukkhe chindanti.', options: ['상인은 나무를 자른다', '상인들은 나무들을 자른다', '상인들은 나무를 자른다', '농부들은 나무들을 자른다'], answer: 1, hint: 'Vāṇijā=상인들은, rukkhe=나무들을(목적격 복수)' },
  { type: 'quiz', question: '22. Naro sigālaṃ vijjhati.', options: ['사람은 재칼을 쏜다', '사람은 재칼을 때린다', '사람들은 재칼을 쏜다', '사람은 개를 쏜다'], answer: 0, hint: 'Naro=사람은, sigālaṃ=재칼을, vijjhati=쏘다' },
  { type: 'quiz', question: '23. Kumāro odanaṃ bhuñjati.', options: ['소년은 쌀을 요리한다', '소년들은 밥을 먹는다', '소년은 밥을 먹는다', '소년은 밥을 가져온다'], answer: 2, hint: 'Kumāro=소년은, odanaṃ=밥을, bhuñjati=먹다' },
  { type: 'quiz', question: '24. Yācako soṇaṃ paharati.', options: ['거지는 개를 때린다', '거지들은 개를 때린다', '거지는 개를 쏜다', '거지는 재칼을 때린다'], answer: 0, hint: 'Yācako=거지는, soṇaṃ=개를, paharati=때리다' },
  { type: 'quiz', question: '25. Sahāyakā pabbate āruhanti.', options: ['친구는 산을 오른다', '친구들은 산들을 오른다', '친구들은 산을 오른다', '친구들은 산으로 달린다'], answer: 1, hint: 'Sahāyakā=친구들은, pabbate=산들을(목적격 복수), āruhanti=오르다' },

  // === 마무리 ===
  { type: 'speak', pali: 'Buddhaṃ saraṇaṃ gacchāmi', pronKo: '붓당 사라낭 갓차-미' },
]
