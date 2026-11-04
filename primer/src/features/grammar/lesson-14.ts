// 15과: 원망형 (Optative / Conditional) — -eyya
// 조건문 + 부사: sace, yadi, ca, pi, na, viya
import type { StepWithoutId } from './types'

const V_OPT = 'Sace bhikkhu sīlaṃ rakkheyya, sukhī assa.'
const V_OPT_K = '만약 비구가 계를 지킨다면, 행복할 것이다.'

export const LESSON_14: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '15과: 원망형', subtitle: 'Sattamī (Optative / Conditional)', description: '원망형: ~할 수 있다, ~해야 한다, ~한다면\n동사어근 + eyya\n\n• paceyya = 요리할 수 있다/해야 한다\n• sace paceyya = 만약 요리한다면\n\n부사: sace(만약), ca(그리고), pi(또한)', icon: '🌙' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_OPT, pronKo: '사쩨 빅쿠 실-랑 락케이야, 수키- 앗사', translation: V_OPT_K, highlight: ['Sace', 'rakkheyya', 'assa'], note: 'sace = 만약 (조건 부사)\nrakkheyya = rakkhati(지키다)의 원망형\nassa = atthi(있다)의 원망형\n"만약 ~한다면, ~일 것이다"' },

  // === 원망형 문법 ===
  { type: 'teach-grammar', title: '원망형 활용 — -eyya', example: '3인칭: paceyya / paceyyuṃ\n2인칭: paceyyāsi / paceyyātha\n1인칭: paceyyāmi / paceyyāma', exampleKo: '단수 / 복수', explanation: '원망형 공식: 어근 + eyya + 인칭어미\n\n인칭 | 단수 | 복수\n3인칭 | -eyya | -eyyuṃ\n2인칭 | -eyyāsi | -eyyātha\n1인칭 | -eyyāmi | -eyyāma\n\n의미:\n① 소원/희망: ~하기를 바란다\n② 가능: ~할 수 있다\n③ 당위: ~해야 한다\n④ 조건: sace/yadi와 함께 "만약 ~한다면"' },

  // === 부사 학습 ===
  { type: 'teach-grammar', title: '부사 — 조건·접속·부정', example: 'sace / yadi = 만약 (~한다면)\nca = 그리고, 또한\npi = 또한, ~조차\nna = 아니다 (부정)\nviya = ~처럼, ~같이', exampleKo: '조건: sace, yadi\n접속: ca, pi\n부정: na\n비유: viya', explanation: '주요 부사 용법:\n\n• sace/yadi + 원망형: 조건문\n  sace gaccheyya = 만약 간다면\n• ca: 문장 뒤에 위치 (후치사)\n  naro ca nārī ca = 남자와 여자\n• pi: 강조 (~도, ~조차)\n  so pi gaccheyya = 그도 갈 것이다\n• na: 동사 앞에 위치\n  na gaccheyya = 가지 않을 것이다\n• viya: 비유 (~처럼)\n  sīho viya = 사자처럼' },

  // === 단어 학습 ===
  { type: 'teach', word: 'sace / yadi', pronKo: '사쩨 / 야디', meaning: '만약 (~한다면)', icon: '❓', grammar: '조건 부사', baseForm: 'sace, yadi', formNote: 'sace + 원망형: 조건문\n두 단어 의미 동일' },
  { type: 'teach', word: 'ca', pronKo: '짜', meaning: '그리고, 또한', icon: '🔗', grammar: '접속 부사 (후치)', baseForm: 'ca', formNote: '문장/단어 뒤에 위치\nnaro ca nārī ca = 남자와 여자' },
  { type: 'teach', word: 'pi', pronKo: '삐', meaning: '또한, ~조차', icon: '➕', grammar: '강조 부사', baseForm: 'pi', formNote: '= api의 축약형\nso pi = 그도' },
  { type: 'teach', word: 'na', pronKo: '나', meaning: '아니다, ~않다', icon: '🚫', grammar: '부정 부사', baseForm: 'na', formNote: '동사 앞에 위치\nna gacchati = 가지 않는다' },
  { type: 'teach', word: 'viya', pronKo: '위야', meaning: '~처럼, ~같이', icon: '🪞', grammar: '비유 부사', baseForm: 'viya', formNote: '= iva의 변형\nsīho viya = 사자처럼' },
  { type: 'teach', word: 'paceyya', pronKo: '빠쩨이야', meaning: '요리할 수 있다/해야 한다', icon: '🍳', grammar: '원망형 3인칭 단수', baseForm: 'pacati', formNote: '현재: pacati\n원망형: paceyya\n복수: paceyyuṃ' },
  { type: 'teach', word: 'gaccheyya', pronKo: '갓체이야', meaning: '갈 수 있다/간다면', icon: '🚶', grammar: '원망형 3인칭 단수', baseForm: 'gacchati', formNote: '현재: gacchati\n원망형: gaccheyya\n복수: gaccheyyuṃ' },
  { type: 'teach', word: 'dadeyya', pronKo: '다데이야', meaning: '줄 수 있다/준다면', icon: '🎁', grammar: '원망형 3인칭 단수', baseForm: 'dadāti', formNote: '현재: dadāti/deti\n원망형: dadeyya\n복수: dadeyyuṃ' },
  { type: 'teach', word: 'labhetha', pronKo: '랍베타', meaning: '얻을 수 있다', icon: '🏆', grammar: '원망형 3인칭 단수', baseForm: 'labhati', formNote: '현재: labhati\n원망형: labheyya/labhetha\n두 형태 모두 사용' },

  // === 예문 3쌍 ===
  { type: 'verse', pali: 'Sace samaṇo dhammaṃ deseyya, manussā suṇeyyuṃ.\nYadi samaṇā dhammaṃ deseyyuṃ, manussā suṇeyyuṃ.', pronKo: '사쩨 사마노 담망 데세이야, 마눗사- 수네이융\n야디 사마나- 담망 데세이융, 마눗사- 수네이융', translation: '만약 사문이 법을 설한다면, 사람들이 들을 것이다.\n만약 사문들이 법을 설한다면, 사람들이 들을 것이다.', highlight: ['deseyya', 'deseyyuṃ', 'suṇeyyuṃ'], note: 'sace/yadi + 원망형 = 조건문\n-eyya(단수) / -eyyuṃ(복수)' },
  { type: 'verse', pali: 'Upāsako dānaṃ dadeyya.\nUpāsakā dānāni dadeyyuṃ.', pronKo: '우빠-사꼬 다-낭 다데이야\n우빠-사까- 다-나-니 다데이융', translation: '우바새는 보시를 줄 수 있다.\n우바새들은 보시들을 줄 수 있다.', highlight: ['dadeyya', 'dadeyyuṃ'] },
  { type: 'verse', pali: 'Sace tvaṃ sīlaṃ rakkheyyāsi, sukhaṃ labheyyāsi.\nSace tumhe sīlaṃ rakkheyyātha, sukhaṃ labheyyātha.', pronKo: '사쩨 뜨왕 시-랑 락케이야-시, 수캉 랍베이야-시\n사쩨 뚬헤 시-랑 락케이야-타, 수캉 랍베이야-타', translation: '만약 네가 계를 지킨다면, 행복을 얻을 것이다.\n만약 너희가 계를 지킨다면, 행복을 얻을 것이다.', highlight: ['rakkheyyāsi', 'rakkheyyātha', 'labheyyāsi', 'labheyyātha'], note: '2인칭: -eyyāsi(단수) / -eyyātha(복수)' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Sace puriso dhammaṃ suṇeyya, paññaṃ labheyya.', options: ['만약 사람이 법을 듣는다면, 지혜를 얻을 것이다', '사람은 법을 듣고 지혜를 얻는다', '만약 사람들이 법을 듣는다면, 지혜를 얻을 것이다', '사람이 법을 들어야 한다'], answer: 0, hint: 'sace + 원망형 = 조건문, suṇeyya=듣다면, labheyya=얻을 것이다' },
  { type: 'quiz', question: '2. Bhikkhu sīlaṃ rakkheyya.', options: ['비구는 계를 지켜야 한다', '비구는 계를 지킨다', '비구들은 계를 지켜야 한다', '비구는 계를 지킬 것이다'], answer: 0, hint: 'rakkheyya = 원망형 — 당위: ~해야 한다' },
  { type: 'quiz', question: '3. Yadi kassako khettaṃ kaseyya, sassaṃ labheyya.', options: ['만약 농부가 밭을 갈면, 곡식을 얻을 것이다', '농부가 밭을 간다', '만약 농부들이 밭을 갈면, 곡식을 얻을 것이다', '농부는 밭을 갈아야 한다'], answer: 0, hint: 'yadi=만약, kaseyya=갈다면(원망형), labheyya=얻을 것이다' },
  { type: 'quiz', question: '4. Ahaṃ vihāraṃ gaccheyyāmi.', options: ['나는 정사에 갈 수 있다', '나는 정사에 간다', '나는 정사에 갈 것이다', '우리는 정사에 갈 수 있다'], answer: 0, hint: 'gaccheyyāmi = 1인칭 단수 원망형 (가능: ~할 수 있다)' },
  { type: 'quiz', question: '5. Manussā sīho viya vīriyaṃ kareyyuṃ.', options: ['사람들은 사자처럼 노력을 해야 한다', '사람들은 사자처럼 걷는다', '사람은 사자처럼 노력을 해야 한다', '사람들은 사자처럼 노력한다'], answer: 0, hint: 'viya=~처럼, kareyyuṃ=해야 한다(원망형 복수)' },
  { type: 'quiz', question: '6. Upāsakā ca upāsikā ca dānaṃ dadeyyuṃ.', options: ['우바새들과 우바이들은 보시를 줘야 한다', '우바새와 우바이는 보시를 준다', '우바새들과 우바이들은 보시를 줄 것이다', '우바새들은 보시를 줘야 한다'], answer: 0, hint: 'ca...ca = ~와 ~, dadeyyuṃ = 줘야 한다(원망형 복수)' },
  { type: 'quiz', question: '7. Na so pāpaṃ kareyya.', options: ['그는 악을 행하지 말아야 한다', '그는 악을 행한다', '그는 악을 행하지 않는다', '그들은 악을 행하지 말아야 한다'], answer: 0, hint: 'na=아니다, kareyya=행해야 한다(원망형) → 부정원망형' },
  { type: 'quiz', question: '8. Tvaṃ pi dhammaṃ suṇeyyāsi.', options: ['너도 법을 들어야 한다', '너는 법을 듣는다', '너도 법을 들을 것이다', '너희도 법을 들어야 한다'], answer: 0, hint: 'pi=~도, suṇeyyāsi=들어야 한다(2인칭 단수 원망형)' },
  { type: 'quiz', question: '9. Sace mayaṃ kusalaṃ kareyyāma, sukhī bhaveyyāma.', options: ['만약 우리가 선을 행한다면, 행복해질 것이다', '우리가 선을 행한다', '만약 내가 선을 행한다면, 행복해질 것이다', '우리는 선을 행해야 한다'], answer: 0, hint: 'kareyyāma, bhaveyyāma = 1인칭 복수 원망형' },
  { type: 'quiz', question: '10. Sace devo vasseyya, kassako khettaṃ kaseyya.', options: ['만약 비가 내린다면, 농부는 밭을 갈 것이다', '비가 내리고 농부는 밭을 간다', '만약 비가 내린다면, 농부들은 밭을 갈 것이다', '비가 내려서 농부는 밭을 갈았다'], answer: 0, hint: 'devo vasseyya = 비가 내린다면 (deva=비/신, vassati=비가 오다)' },

  // === 마무리 ===
  { type: 'speak', pali: 'Sace sīlaṃ rakkheyya sukhī assa', pronKo: '사쩨 시-랑 락케이야 수키- 앗사' },
]
