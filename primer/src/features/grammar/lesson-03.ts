// 3과: -a 남성명사 도구격 (교재 3과 완전 수록)
// 경전: saddhiṃ(함께) 구문, 팔정도, 중도
import type { StepWithoutId } from './types'

const V_MAGGA = 'Ayameva ariyo aṭṭhaṅgiko maggo, seyyathidaṃ—sammādiṭṭhi sammāsaṅkappo sammāvācā sammākammanto sammāājīvo sammāvāyāmo sammāsati sammāsamādhi.'
const V_MAGGA_K = '이것이 바로 성스러운 팔정도이니—바른 견해, 바른 사유, 바른 말, 바른 행위, 바른 생계, 바른 정진, 바른 마음챙김, 바른 삼매이다.'
const V_MAJJHIMA = 'Ete kho, bhikkhave, ubho ante anupagamma majjhimā paṭipadā tathāgatena abhisambuddhā'
const V_MAJJHIMA_K = '비구들이여, 이 양극단에 다가가지 않고, 여래에 의해 깨달아진 중도가 있으니'

export const LESSON_03: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '3과: 남성명사 도구격', subtitle: 'Tatiyā vibhatti (Instrumental)', description: '도구격은 수단·도구·동행을 나타냅니다.\n~에 의해서, ~와 함께, ~(으)로\n\n경전: "tathāgatena(여래에 의해)"\n"sāvakehi saddhiṃ(제자들과 함께)"', icon: '🤝' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_MAJJHIMA, pronKo: '에떼 코 빅카웨 우보 안떼 아누빠감마 맛지마- 빠띠빠다- 따타-가떼나 아비삼붓다-', translation: V_MAJJHIMA_K, highlight: ['tathāgatena'], note: 'tathāgatena = tathāgata(여래) + -ena(도구격 어미)\n"여래에 의해" 깨달아진 — 행위자를 도구격으로 표현!' },

  // === 도구격 문법 ===
  { type: 'teach-grammar', title: '도구격 (Instrumental) — ~로/함께/의해', example: 'nara + ena = narena (사람에 의해)\nnara + ehi = narehi (사람들에 의해)', exampleKo: '단수: -a → -ena / 복수: -a → -ehi(-ebhi)', explanation: '도구격의 다양한 의미:\n• 수단/도구: kakacena chindati (톱으로 자르다)\n• 동행: saddhiṃ/saha + 도구격 (함께)\n• 행위자: tathāgatena abhisambuddhā (여래에 의해 깨달아진)\n\n-a 남성명사:\n• 단수: -ena (narena, tathāgatena)\n• 복수: -ehi/-ebhi (narehi, sāvakehi)\nehi=ebhi (b탈락 형태)' },

  // === saddhiṃ/saha 설명 ===
  { type: 'teach-grammar', title: 'saddhiṃ / saha — ~와 함께', example: 'sāvakehi saddhiṃ (제자들과 함께)\nmātulena saha (삼촌과 함께)', exampleKo: 'saddhiṃ 또는 saha + 도구격 명사', explanation: 'saddhiṃ과 saha는 도구격과 함께 사용하여\n"~와 함께"를 나타냅니다.\n\n보통 사물에는 사용하지 않습니다.\n(사람/생물과의 동행에 사용)\n\n예: narena saddhiṃ = 사람과 함께\n예: mātulena saha = 삼촌과 함께' },

  // === 명사 17개 (교재 전체) ===
  { type: 'teach', word: 'rathena', pronKo: '라테나', meaning: '마차로 (도구격 단수)', icon: '🛞', grammar: '남성명사 · 도구격 단수', baseForm: 'ratha (마차)', formNote: 'ratha + ena → rathena' },
  { type: 'teach', word: 'sakaṭena', pronKo: '사까떼나', meaning: '짐수레로 (도구격 단수)', icon: '🛒', grammar: '남성명사 · 도구격 단수', baseForm: 'sakaṭa (짐수레)', formNote: 'sakaṭa + ena → sakaṭena' },
  { type: 'teach', word: 'hatthena', pronKo: '핫테나', meaning: '손으로 (도구격 단수)', icon: '✋', grammar: '남성명사 · 도구격 단수', baseForm: 'hattha (손)', formNote: 'hattha + ena → hatthena\n복수: hatthehi (손들로)' },
  { type: 'teach', word: 'pādena', pronKo: '빠-데나', meaning: '발로 (도구격 단수)', icon: '🦶', grammar: '남성명사 · 도구격 단수', baseForm: 'pāda (발)', formNote: 'pāda + ena → pādena\n복수: pādehi (발들로)' },
  { type: 'teach', word: 'maggena', pronKo: '맛게나', meaning: '길로, 길을 통해 (도구격 단수)', icon: '🛤️', grammar: '남성명사 · 도구격 단수', baseForm: 'magga (길, 도)', formNote: 'magga + ena → maggena', buddhism: '팔정도(aṭṭhaṅgiko maggo)의 magga(道)와 같은 단어' },
  { type: 'teach', word: 'dīpaṃ', pronKo: '디-빵', meaning: '섬을/등불을 (목적격)', icon: '🏝️', grammar: '남성명사', baseForm: 'dīpa (섬, 대륙, 등불)', formNote: '도구격: dīpena' },
  { type: 'teach', word: 'sāvakena', pronKo: '사-와게나', meaning: '제자에 의해 (도구격 단수)', icon: '🙇', grammar: '남성명사 · 도구격 단수', baseForm: 'sāvaka (제자)', formNote: 'sāvaka + ena → sāvakena\n복수: sāvakehi', buddhism: 'sāvaka = "듣는 자". 붓다의 가르침을 듣고 수행하는 제자' },
  { type: 'teach', word: 'samaṇena', pronKo: '사마네나', meaning: '사문과 함께 (도구격 단수)', icon: '🧘', grammar: '남성명사 · 도구격 단수', baseForm: 'samaṇa (사문, 스님)', formNote: 'samaṇa + ena → samaṇena' },
  { type: 'teach', word: 'saggena', pronKo: '삭게나', meaning: '하늘로 (도구격 단수)', icon: '☁️', grammar: '남성명사 · 도구격 단수', baseForm: 'sagga (하늘)', formNote: 'sagga + ena → saggena\n목적격: saggaṃ' },
  { type: 'teach', word: 'assena', pronKo: '앗세나', meaning: '말로 (도구격 단수)', icon: '🐴', grammar: '남성명사 · 도구격 단수', baseForm: 'assa (말)', formNote: 'assa + ena → assena\n복수: assehi' },
  { type: 'teach', word: 'migena', pronKo: '미게나', meaning: '사슴과 함께 (도구격 단수)', icon: '🦌', grammar: '남성명사 · 도구격 단수', baseForm: 'miga (사슴, 짐승)', formNote: 'miga + ena → migena\n복수: migehi' },
  { type: 'teach', word: 'sarena', pronKo: '사레나', meaning: '화살로 (도구격 단수)', icon: '🏹', grammar: '남성명사 · 도구격 단수', baseForm: 'sara (화살)', formNote: 'sara + ena → sarena' },
  { type: 'teach', word: 'pāsāṇena', pronKo: '빠-사-네나', meaning: '돌로 (도구격 단수)', icon: '🪨', grammar: '남성명사 · 도구격 단수', baseForm: 'pāsāṇa (돌, 바위)', formNote: 'pāsāṇa + ena → pāsāṇena' },
  { type: 'teach', word: 'kakacena', pronKo: '까까게나', meaning: '톱으로 (도구격 단수)', icon: '🪚', grammar: '남성명사 · 도구격 단수', baseForm: 'kakaca (톱)', formNote: 'kakaca + ena → kakacena' },
  { type: 'teach', word: 'khaggena', pronKo: '캇게나', meaning: '칼로 (도구격 단수)', icon: '🗡️', grammar: '남성명사 · 도구격 단수', baseForm: 'khagga (칼)', formNote: 'khagga + ena → khaggena' },
  { type: 'teach', word: 'corena', pronKo: '조레나', meaning: '도둑에 의해 (도구격 단수)', icon: '🥷', grammar: '남성명사 · 도구격 단수', baseForm: 'cora (도둑, 강도)', formNote: 'cora + ena → corena' },
  { type: 'teach', word: 'paṇḍitena', pronKo: '빤디떼나', meaning: '현자와 함께 (도구격 단수)', icon: '🧠', grammar: '남성명사 · 도구격 단수', baseForm: 'paṇḍita (현자, 현명한 사람)', formNote: 'paṇḍita + ena → paṇḍitena\n복수: paṇḍitehi' },

  // === 교재 예문 3쌍 ===
  { type: 'verse', pali: 'Samaṇo narena saddhiṃ gāmaṃ gacchati.\nSamaṇā narehi saddhiṃ gāmaṃ gacchanti.', pronKo: '사마노 나레나 삿딤 가-망 갓차띠\n사마나- 나레히 삿딤 가-망 갓찬띠', translation: '사문은 사람과 함께 마을로 간다.\n사문들은 사람들과 함께 마을로 간다.', highlight: ['narena', 'narehi', 'saddhiṃ'] },
  { type: 'verse', pali: 'Putto mātulena saha candaṃ passati.\nPuttā mātulehi saha candaṃ passanti.', pronKo: '뿟또 마-뚤레나 사하 짠당 빳사띠\n뿟따- 마-뚤레히 사하 짠당 빳산띠', translation: '아들은 삼촌과 함께 달을 본다.\n아들들은 삼촌들과 함께 달을 본다.', highlight: ['mātulena', 'mātulehi', 'saha'] },
  { type: 'verse', pali: 'Kassako kakacena rukkhaṃ chindati.\nKassakā kakacehi rukkhe chindanti.', pronKo: '깟사꼬 까까게나 룩캉 친다띠\n깟사까- 까까게히 룩케 친단띠', translation: '농부는 톱으로 나무를 자른다.\n농부들은 톱들로 나무들을 자른다.', highlight: ['kakacena', 'kakacehi'] },

  // === 팔정도 경전 구절 ===
  { type: 'verse', pali: V_MAGGA, pronKo: '아야메와 아리요 앗탕기꼬 맛고', translation: V_MAGGA_K, highlight: ['maggo', 'sammādiṭṭhi', 'sammāsati'], note: 'maggo = magga의 주격 단수 (복습!)\nsammā = 바른 (불변어)' },

  // === 연습문제 3 (25문제) ===
  { type: 'quiz', question: '1. Buddho sāvakehi saddhiṃ vihāraṃ gacchati.', options: ['붓다는 제자들과 함께 정사로 간다', '붓다는 제자를 위해 정사로 간다', '붓다들은 제자들과 함께 정사로 간다', '붓다는 제자들과 함께 마을로 간다'], answer: 0, hint: 'sāvakehi saddhiṃ=제자들과 함께(도구격+saddhiṃ)' },
  { type: 'quiz', question: '2. Puriso puttena saha dīpaṃ dhāvati.', options: ['남자는 아들과 함께 마을로 달린다', '남자는 아들과 함께 섬으로 달린다', '남자들은 아들과 함께 섬으로 달린다', '남자는 아들에 의해 섬으로 간다'], answer: 1, hint: 'puttena saha=아들과 함께, dīpaṃ=섬으로' },
  { type: 'quiz', question: '3. Kassako sarena sigālaṃ vijjhati.', options: ['농부는 화살로 개를 쏜다', '농부는 화살로 재칼을 쏜다', '농부는 돌로 재칼을 쏜다', '농부들은 화살로 재칼을 쏜다'], answer: 1, hint: 'sarena=화살로(도구격), sigālaṃ=재칼을' },
  { type: 'quiz', question: '4. Brāhmaṇā mātulena saha pabbataṃ āruhanti.', options: ['바라문은 삼촌과 함께 산을 오른다', '바라문들은 삼촌과 함께 산을 오른다', '바라문들은 삼촌들과 함께 산을 오른다', '바라문들은 삼촌과 함께 산으로 간다'], answer: 1, hint: 'Brāhmaṇā=바라문들은, mātulena saha=삼촌과 함께' },
  { type: 'quiz', question: '5. Puttā pādehi kukkure paharanti.', options: ['아들들은 손으로 개들을 때린다', '아들들은 발들로 개들을 때린다', '아들은 발로 개를 때린다', '아들들은 발들로 재칼들을 때린다'], answer: 1, hint: 'pādehi=발들로(도구격 복수), kukkure=개들을' },
  { type: 'quiz', question: '6. Mātulo puttehi saddhiṃ rathena gāmaṃ āgacchati.', options: ['삼촌은 아들들과 함께 마차로 마을로 온다', '삼촌들은 아들들과 함께 마차로 마을로 온다', '삼촌은 아들과 함께 마차로 마을로 간다', '삼촌은 아들들과 함께 마을에서 온다'], answer: 0, hint: 'puttehi saddhiṃ=아들들과 함께, rathena=마차로' },
  { type: 'quiz', question: '7. Kumārā hatthehi patte āharanti.', options: ['소년들은 손들로 그릇들을 가져온다', '소년은 손으로 그릇를 가져온다', '소년들은 손들로 밥을 가져온다', '소년들은 발로 그릇들을 운반한다'], answer: 0, hint: 'hatthehi=손들로(도구격 복수), patte=그릇들을' },
  { type: 'quiz', question: '8. Coro maggena assaṃ harati.', options: ['도둑은 길로 마차를 운반한다', '도둑은 길로 말을 운반한다', '도둑들은 길로 말을 운반한다', '도둑은 길에서 말을 본다'], answer: 1, hint: 'maggena=길로(도구격), assaṃ=말을' },
  { type: 'quiz', question: '9. Kassako āvāṭaṃ oruhati.', options: ['농부는 구덩이를 판다', '농부는 구덩이로 내려온다', '농부들은 구덩이로 내려온다', '농부는 산에서 내려온다'], answer: 1, hint: 'āvāṭaṃ=구덩이를, oruhati=내려오다' },
  { type: 'quiz', question: '10. Bhūpālā paṇḍitehi saha samaṇe passanti.', options: ['왕들은 현자들과 함께 사문들을 본다', '왕은 현자와 함께 사문을 본다', '왕들은 현자들에 의해 사문들을 본다', '왕들은 현자들과 함께 사문들에게 간다'], answer: 0, hint: 'paṇḍitehi saha=현자들과 함께, samaṇe=사문들을' },
  { type: 'quiz', question: '11. Paṇḍito bhūpālena saha Tathāgataṃ vandati.', options: ['현자는 왕과 함께 여래에게 경배한다', '현자들은 왕과 함께 여래에게 경배한다', '현자는 왕에 의해 여래에게 경배한다', '현자는 왕과 함께 여래를 본다'], answer: 0, hint: 'bhūpālena saha=왕과 함께, Tathāgataṃ=여래에게' },
  { type: 'quiz', question: '12. Puttā sahāyena saddhiṃ odanaṃ bhuñjanti.', options: ['아들은 친구와 함께 밥을 먹는다', '아들들은 친구와 함께 밥을 먹는다', '아들들은 친구들과 함께 밥을 먹는다', '아들들은 친구와 함께 쌀을 요리한다'], answer: 1, hint: 'sahāyena saddhiṃ=친구와 함께, odanaṃ=밥을' },
  { type: 'quiz', question: '13. Vāṇijo pāsāṇena migaṃ paharati.', options: ['상인은 돌로 사슴을 때린다', '상인은 돌로 재칼을 때린다', '상인들은 돌로 사슴을 때린다', '상인은 화살로 사슴을 쏜다'], answer: 0, hint: 'pāsāṇena=돌로(도구격), migaṃ=사슴을' },
  { type: 'quiz', question: '14. Sunakhā pādehi āvāṭe khaṇanti.', options: ['개들은 손으로 구덩이들을 판다', '개들은 발들로 구덩이들을 판다', '개는 발로 구덩이를 판다', '재칼들은 발들로 구덩이들을 판다'], answer: 1, hint: 'Sunakhā=개들은, pādehi=발들로, āvāṭe=구덩이들을' },
  { type: 'quiz', question: '15. Brāhmaṇo puttena saha suriyaṃ vandati.', options: ['바라문은 아들과 함께 달에게 경배한다', '바라문들은 아들과 함께 태양에게 경배한다', '바라문은 아들과 함께 태양에게 경배한다', '바라문은 아들에 의해 태양을 본다'], answer: 2, hint: 'puttena saha=아들과 함께, suriyaṃ=태양에게' },
  { type: 'quiz', question: '16. Kassako soṇehi saddhiṃ rukkhe rakkhati.', options: ['농부는 개들과 함께 나무들을 보호한다', '농부들은 개들과 함께 나무를 보호한다', '농부는 개와 함께 나무를 보호한다', '농부는 개들과 함께 산을 보호한다'], answer: 0, hint: 'soṇehi saddhiṃ=개들과 함께, rukkhe=나무들을' },
  { type: 'quiz', question: '17. Sugato sāvakehi saha vihāraṃ āgacchati.', options: ['선서는 제자들과 함께 정사로 간다', '선서는 제자들과 함께 정사로 온다', '선서들은 제자들과 함께 정사로 온다', '여래는 제자들과 함께 마을로 온다'], answer: 1, hint: 'Sugato=선서는, sāvakehi saha=제자들과 함께, āgacchati=오다' },
  { type: 'quiz', question: '18. Yācako pattena bhattaṃ āharati.', options: ['거지는 그릇으로 밥을 가져온다', '거지는 그릇으로 쌀을 가져온다', '거지들은 그릇으로 쌀을 가져온다', '거지는 그릇으로 밥을 요리한다'], answer: 1, hint: 'pattena=그릇으로(도구격), bhattaṃ=쌀을' },
  { type: 'quiz', question: '19. Paṇḍitā saggaṃ gacchanti.', options: ['현자는 하늘로 간다', '현자들은 마을로 간다', '현자들은 하늘로 간다', '현자들은 정사로 간다'], answer: 2, hint: 'Paṇḍitā=현자들은(복수), saggaṃ=하늘로' },
  { type: 'quiz', question: '20. Kumārā assehi saddhiṃ gāmaṃ dhāvanti.', options: ['소년들은 말들과 함께 마을로 달린다', '소년은 말과 함께 마을로 달린다', '소년들은 말들과 함께 산으로 달린다', '소년들은 개들과 함께 마을로 달린다'], answer: 0, hint: 'assehi saddhiṃ=말들과 함께, gāmaṃ=마을로' },
  { type: 'quiz', question: '21. Coro khaggena naraṃ paharati.', options: ['도둑은 칼로 사람을 때린다', '도둑은 돌로 사람을 때린다', '도둑들은 칼로 사람을 때린다', '도둑은 칼로 사람들을 때린다'], answer: 0, hint: 'khaggena=칼로(도구격), naraṃ=사람을' },
  { type: 'quiz', question: '22. Vāṇijo sakaṭena dīpe āharati.', options: ['상인은 짐수레로 섬들을 가져온다', '상인은 짐수레로 등불들을 가져온다', '상인들은 짐수레로 등불을 가져온다', '상인은 마차로 섬들을 가져온다'], answer: 1, hint: 'sakaṭena=짐수레로, dīpe=등불들을(목적격 복수)' },
  { type: 'quiz', question: '23. Assā maggena dhāvanti.', options: ['말은 길로 달린다', '말들은 길로 달린다', '말들은 길로 간다', '사슴들은 길로 달린다'], answer: 1, hint: 'Assā=말들은(복수), maggena=길로(도구격)' },
  { type: 'quiz', question: '24. Sigālā migehi saddhiṃ pabbataṃ dhāvanti.', options: ['재칼들은 사슴들과 함께 산으로 달린다', '재칼은 사슴과 함께 산으로 달린다', '재칼들은 사슴들과 함께 마을로 달린다', '개들은 사슴들과 함께 산으로 달린다'], answer: 0, hint: 'migehi saddhiṃ=사슴들과 함께, pabbataṃ=산으로' },
  { type: 'quiz', question: '25. Bhūpālo paṇḍitena saha manusse rakkhati.', options: ['왕은 현자와 함께 사람들을 보호한다', '왕들은 현자와 함께 사람들을 보호한다', '왕은 현자에 의해 사람들을 보호한다', '왕은 현자와 함께 사람을 보호한다'], answer: 0, hint: 'paṇḍitena saha=현자와 함께, manusse=사람들을' },

  // === 마무리 ===
  { type: 'speak', pali: 'Ete kho bhikkhave ubho ante anupagamma majjhimā paṭipadā tathāgatena abhisambuddhā', pronKo: '에떼 코 빅카웨 우보 안떼 아누빠감마 맛지마- 빠띠빠다- 따타-가떼나 아비삼붓다-' },
]
