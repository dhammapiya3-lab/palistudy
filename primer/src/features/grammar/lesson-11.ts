// 12과: 동사 인칭변화 (현재형) — 전 인칭 활용
// 인칭대명사 + 현재형 어미 + atthi/karoti 활용
import type { StepWithoutId } from './types'

export const LESSON_11: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '11과: 동사 인칭변화 (현재형)', subtitle: 'Vattamānā-vibhatti (Present Tense Conjugation)', description: '현재형 전 인칭 어미:\n3인칭: -ti/-nti\n2인칭: -si/-tha\n1인칭: -āmi/-āma\n\n인칭대명사: So, Tvaṃ, Ahaṃ...\n경전: "Buddhaṃ saraṇaṃ gacchāmi"', icon: '🗣️' },

  // === 경전 구절 ===
  { type: 'verse', pali: 'Buddhaṃ saraṇaṃ gacchāmi.\nDhammaṃ saraṇaṃ gacchāmi.\nSaṅghaṃ saraṇaṃ gacchāmi.', pronKo: '붓당 사라낭 갓차-미\n담망 사라낭 갓차-미\n상강 사라낭 갓차-미', translation: '부처님께 귀의합니다.\n법에 귀의합니다.\n승가에 귀의합니다.', highlight: ['gacchāmi', 'saraṇaṃ', 'Buddhaṃ'], note: 'gacchāmi = gacchati의 1인칭 단수!\n-āmi 어미 = "나는 ~한다"\nsaraṇaṃ gacchāmi = 귀의합니다 (피난처로 갑니다)\n— 삼귀의(Tisaraṇa), 불교 귀의문의 핵심!' },

  // === 현재형 인칭 어미 ===
  { type: 'teach-grammar', title: '현재형 인칭 어미표', example: '         단수        복수\n3인칭: -ti          -nti\n2인칭: -si          -tha\n1인칭: -āmi/-mi     -āma/-mha', exampleKo: '6가지 인칭 어미', explanation: '빠알리어 동사는 주어에 따라 어미가 변합니다.\n\n3인칭 (그/그녀/그들):\n• so pacati (그는 요리한다)\n• te pacanti (그들은 요리한다)\n\n2인칭 (너/너희):\n• tvaṃ pacasi (너는 요리한다)\n• tumhe pacatha (너희는 요리한다)\n\n1인칭 (나/우리):\n• ahaṃ pacāmi (나는 요리한다)\n• mayaṃ pacāma (우리는 요리한다)\n\n지금까지 배운 -ti/-nti는 3인칭이었습니다!' },

  // === pacati 전체 활용 ===
  { type: 'teach-grammar', title: 'pacati (요리하다) 전체 활용', example: 'So pacati. (그는 요리한다)\nTe pacanti. (그들은 요리한다)\nTvaṃ pacasi. (너는 요리한다)\nTumhe pacatha. (너희는 요리한다)\nAhaṃ pacāmi. (나는 요리한다)\nMayaṃ pacāma. (우리는 요리한다)', exampleKo: '어간 pac- + 인칭 어미', explanation: '모든 -ati 동사는 이 패턴을 따릅니다:\n\n어간(pac-) + 어미:\n• pac + ati = pacati (3단)\n• pac + anti = pacanti (3복)\n• pac + asi = pacasi (2단)\n• pac + atha = pacatha (2복)\n• pac + āmi = pacāmi (1단)\n• pac + āma = pacāma (1복)\n\n다른 동사도 동일:\ngacch- → gacchati/gacchasi/gacchāmi...\nvas- → vasati/vasasi/vasāmi...' },

  // === 인칭대명사 ===
  { type: 'teach-grammar', title: '인칭대명사 (주격)', example: '3인칭: So (그) / Sā (그녀) / Te (그들)\n2인칭: Tvaṃ (너) / Tumhe (너희)\n1인칭: Ahaṃ (나) / Mayaṃ (우리)', exampleKo: '7가지 인칭대명사', explanation: '인칭대명사 주격 형태:\n\n3인칭 남성:\n• So = 그 (단수)\n• Te = 그들 (복수)\n\n3인칭 여성:\n• Sā = 그녀 (단수)\n• Tā = 그녀들 (복수)\n\n2인칭:\n• Tvaṃ = 너 (단수)\n• Tumhe = 너희들 (복수)\n\n1인칭:\n• Ahaṃ = 나 (단수)\n• Mayaṃ = 우리 (복수)\n\n경전에서는 대명사가 생략되기도 합니다.\n어미만으로 인칭을 알 수 있기 때문!' },

  // === atthi/santi ===
  { type: 'teach-grammar', title: 'atthi (있다, ~이다) 활용', example: '         단수        복수\n3인칭: atthi        santi\n2인칭: asi          attha\n1인칭: asmi/amhi    asma/amha', exampleKo: 'atthi = 영어 is/are/am', explanation: 'atthi는 가장 중요한 동사 중 하나입니다.\n존재(있다)와 서술(~이다) 모두에 사용됩니다.\n\n• So atthi = 그는 있다\n• Te santi = 그들은 있다\n• Tvaṃ asi = 너는 있다/~이다\n• Tumhe attha = 너희는 있다\n• Ahaṃ asmi = 나는 있다/~이다\n• Mayaṃ asma = 우리는 있다\n\n주의: 3인칭 복수가 santi로 불규칙!\nnatthi = na + atthi = 없다' },

  // === karoti 활용 ===
  { type: 'teach-grammar', title: 'karoti (하다) 활용', example: '         단수        복수\n3인칭: karoti       karonti\n2인칭: karosi       karotha\n1인칭: karomi       karoma', exampleKo: 'karoti = 하다 (특수 동사)', explanation: 'karoti는 "하다, 만들다"의 뜻으로\n매우 자주 사용되는 동사입니다.\n\n• So kammaṃ karoti = 그는 업을 짓는다\n• Te kammaṃ karonti = 그들은 업을 짓는다\n• Ahaṃ kammaṃ karomi = 나는 업을 짓는다\n\n명사와 결합하여 많은 표현을 만듭니다:\n• pūjaṃ karoti = 공양하다\n• vīriyaṃ karoti = 정진하다\n• mettaṃ karoti = 자비를 베풀다' },

  // === 핵심 단어 ===
  { type: 'teach', word: 'ahaṃ', pronKo: '아항', meaning: '나', icon: '👤', grammar: '1인칭 대명사 단수 주격', baseForm: 'ahaṃ', formNote: '목적격: maṃ/mamaṃ\n소유격: mama/mayhaṃ\n여격: mayhaṃ/me' },
  { type: 'teach', word: 'mayaṃ', pronKo: '마양', meaning: '우리', icon: '👥', grammar: '1인칭 대명사 복수 주격', baseForm: 'mayaṃ', formNote: '목적격: amhe/amhākaṃ\n소유격: amhākaṃ/amhaṃ' },
  { type: 'teach', word: 'tvaṃ', pronKo: '뜨왕', meaning: '너', icon: '👆', grammar: '2인칭 대명사 단수 주격', baseForm: 'tvaṃ', formNote: '목적격: taṃ/tavaṃ\n소유격: tava/tuyhaṃ\n여격: tuyhaṃ/te' },
  { type: 'teach', word: 'tumhe', pronKo: '뚬헤', meaning: '너희', icon: '👆👆', grammar: '2인칭 대명사 복수 주격', baseForm: 'tumhe', formNote: '목적격: tumhe/tumhākaṃ\n소유격: tumhākaṃ' },
  { type: 'teach', word: 'saraṇa', pronKo: '사라나', meaning: '피난처, 귀의', icon: '🙏', grammar: '중성명사', baseForm: 'saraṇa', formNote: '주격: saraṇaṃ\nsaraṇaṃ gacchāmi = 귀의합니다', buddhism: 'tisaraṇa = 삼귀의 (불·법·승)' },

  // === 예문 ===
  { type: 'verse', pali: 'Ahaṃ dhammaṃ suṇāmi.\nMayaṃ dhammaṃ suṇāma.', pronKo: '아항 담망 수나-미\n마양 담망 수나-마', translation: '나는 법을 듣는다.\n우리는 법을 듣는다.', highlight: ['suṇāmi', 'suṇāma', 'Ahaṃ', 'Mayaṃ'], note: 'suṇāmi = suṇāti의 1인칭 단수\nsuṇāma = suṇāti의 1인칭 복수' },
  { type: 'verse', pali: 'Tvaṃ kiṃ passasi?\nAhaṃ rukkhaṃ passāmi.', pronKo: '뜨왕 킹 빳사시?\n아항 룩캉 빳사-미', translation: '너는 무엇을 보느냐?\n나는 나무를 본다.', highlight: ['passasi', 'passāmi', 'kiṃ'], note: 'passasi = passati의 2인칭 단수\npassāmi = passati의 1인칭 단수\nkiṃ = 무엇(의문사)' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Buddhaṃ saraṇaṃ gacchāmi.', options: ['나는 부처님께 귀의합니다', '그는 부처님께 귀의합니다', '우리는 부처님께 귀의합니다', '너는 부처님께 귀의합니다'], answer: 0, hint: 'gacchāmi = 1인칭 단수 (-āmi)' },
  { type: 'quiz', question: '2. Tvaṃ kiṃ karosi?', options: ['너는 무엇을 하느냐?', '나는 무엇을 하느냐?', '그는 무엇을 하느냐?', '너희는 무엇을 하느냐?'], answer: 0, hint: 'karosi = 2인칭 단수 (-osi), tvaṃ=너' },
  { type: 'quiz', question: '3. Mayaṃ vihāre vasāma.', options: ['우리는 정사에서 산다', '나는 정사에서 산다', '너희는 정사에서 산다', '그들은 정사에서 산다'], answer: 0, hint: 'vasāma = 1인칭 복수 (-āma), mayaṃ=우리' },
  { type: 'quiz', question: '4. Tumhe dhammaṃ suṇātha.', options: ['너희는 법을 듣는다', '우리는 법을 듣는다', '그들은 법을 듣는다', '너는 법을 듣는다'], answer: 0, hint: 'suṇātha = 2인칭 복수 (-tha), tumhe=너희' },
  { type: 'quiz', question: '5. Ahaṃ bhikkhu asmi.', options: ['나는 비구이다', '나는 비구가 아니다', '그는 비구이다', '너는 비구이다'], answer: 0, hint: 'asmi = atthi의 1인칭 단수 (~이다)' },
  { type: 'quiz', question: '6. Te gāme santi.', options: ['그들은 마을에 있다', '그는 마을에 있다', '그녀들은 마을에 있다', '너희는 마을에 있다'], answer: 0, hint: 'santi = atthi의 3인칭 복수, te=그들' },
  { type: 'quiz', question: '7. Ahaṃ puññaṃ karomi.', options: ['나는 공덕을 짓는다', '그는 공덕을 짓는다', '우리는 공덕을 짓는다', '나는 악을 짓는다'], answer: 0, hint: 'karomi = karoti의 1인칭 단수' },
  { type: 'quiz', question: '8. Tvaṃ kuhiṃ gacchasi?', options: ['너는 어디에 가느냐?', '나는 어디에 가느냐?', '그는 어디에 가느냐?', '너희는 어디에 가느냐?'], answer: 0, hint: 'gacchasi = 2인칭 단수, kuhiṃ=어디에' },
  { type: 'quiz', question: '9. Mayaṃ Buddhaṃ vandāma.', options: ['우리는 부처님께 예배한다', '나는 부처님께 예배한다', '너희는 부처님께 예배한다', '그들은 부처님께 예배한다'], answer: 0, hint: 'vandāma = vandati의 1인칭 복수' },
  { type: 'quiz', question: '10. Natthi santi paramaṃ sukhaṃ.', options: ['평화보다 더 큰 행복은 없다', '평화는 가장 큰 행복이다', '행복은 평화에 있다', '평화와 행복은 없다'], answer: 0, hint: 'natthi=없다, santi=평화, paramaṃ=최상의, sukhaṃ=행복' },

  // === 마무리 ===
  { type: 'speak', pali: 'Buddhaṃ saraṇaṃ gacchāmi', pronKo: '붓당 사라낭 갓차-미' },
]
