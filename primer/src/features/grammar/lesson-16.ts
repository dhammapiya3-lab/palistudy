// 17과: 과거형 (Aorist) — a어간 + e어간 과거 활용
// 어두첨자 a- 과거표시
import type { StepWithoutId } from './types'

const V_AORI = 'Bhagavā evaṃ avoca.'
const V_AORI_K = '세존께서 이와 같이 말씀하셨다.'

export const LESSON_16: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '17과: 과거형 (Aorist)', subtitle: 'Ajjatanī (Aorist / Past Tense)', description: '과거형: 이미 일어난 사건\n\n• -a어간: apaci / paci (요리했다)\n• -e어간: coresi / corayi (훔쳤다)\n• 어두첨자 a-: 과거 표시 (선택적)\n\n경전: "Bhagavā evaṃ avoca\n(세존께서 이와 같이 말씀하셨다)"', icon: '⏳' },

  // === 경전 구절 ===
  { type: 'verse', pali: V_AORI, pronKo: '바가와- 에왕 아워짜', translation: V_AORI_K, highlight: ['avoca'], note: 'avoca = vacati(말하다)의 과거형\na(과거접두) + voca(어근 vac의 변형)\n경전 말미에 자주 등장하는 정형구' },

  // === -a어간 과거형 ===
  { type: 'teach-grammar', title: '과거형 — -a어간 (pacati) 전체 활용', example: '3인칭: apaci, paci / apaciṃsu, paciṃsu\n2인칭: apaco, paco / apacittha, pacittha\n1인칭: apaciṃ, paciṃ / apacimhā, pacimhā', exampleKo: '단수 / 복수\n(a- 접두사는 선택적)', explanation: '-a어간 과거형 어미:\n\n인칭 | 단수 | 복수\n3인칭 | -i | -iṃsu\n2인칭 | -o | -ittha\n1인칭 | -iṃ | -imhā\n\n어두첨자 a-:\n• apaci = a + paci (과거 강조)\n• paci = 같은 의미 (a- 생략 가능)\n\n경전에서는 a- 없는 형태가 더 흔합니다.\n의미 차이는 없습니다.' },

  // === -e어간 과거형 ===
  { type: 'teach-grammar', title: '과거형 — -e어간 (coreti)', example: '3인칭: coresi, corayi / coresuṃ, corayiṃsu\n2인칭: coreso, corayo / coresittha\n1인칭: coresiṃ, corayiṃ / coresimhā', exampleKo: '단수 / 복수\n(-esi/-ayi 두 형태)', explanation: '-e어간 과거형은 두 패턴이 있습니다:\n\n패턴 A (-esi): coresi, coresuṃ\n패턴 B (-ayi): corayi, corayiṃsu\n\n인칭 | 단수A/B | 복수A/B\n3인칭 | -esi/-ayi | -esuṃ/-ayiṃsu\n2인칭 | -eso/-ayo | -esittha/-ayittha\n1인칭 | -esiṃ/-ayiṃ | -esimhā/-ayimhā\n\n다른 예:\n• deseti → desesi/desayi (설했다)\n• pūjeti → pūjesi/pūjayi (공양했다)' },

  // === 어두첨자 설명 ===
  { type: 'teach-grammar', title: '어두첨자 a- (Augment)', example: 'paci → apaci (요리했다)\ngami → agami (갔다)\nvoca → avoca (말했다)', exampleKo: 'a- = 과거를 나타내는 접두사', explanation: '어두첨자 a-는 과거를 표시합니다.\n\n규칙:\n• 자음 시작: a- 붙임 → a + paci = apaci\n• 모음 시작: 사용 안 함\n\n특징:\n• 선택적 — 있어도 없어도 과거\n• 경전에서는 생략이 더 일반적\n• 산스크리트의 augment에 해당\n\n예: avoca = a + voca (말했다)\n→ 경전 정형구에서는 a- 포함 형태 유지' },

  // === 단어 학습 ===
  { type: 'teach', word: 'apaci / paci', pronKo: '아빠찌 / 빠찌', meaning: '요리했다', icon: '🍳', grammar: '과거형 3인칭 단수', baseForm: 'pacati', formNote: '현재: pacati\n과거: paci / apaci\n복수: paciṃsu / apaciṃsu' },
  { type: 'teach', word: 'agami / gami', pronKo: '아가미 / 가미', meaning: '갔다', icon: '🚶', grammar: '과거형 3인칭 단수', baseForm: 'gacchati', formNote: '현재: gacchati\n과거: gami / agami\n복수: gamiṃsu' },
  { type: 'teach', word: 'adadi / adaṃsu', pronKo: '아다디 / 아당수', meaning: '주었다', icon: '🎁', grammar: '과거형 3인칭', baseForm: 'dadāti', formNote: '현재: dadāti\n과거 단수: adadi\n과거 복수: adaṃsu / dadaṃsu' },
  { type: 'teach', word: 'avoca', pronKo: '아워짜', meaning: '말했다', icon: '🗣️', grammar: '과거형 3인칭 단수', baseForm: 'vacati', formNote: '현재: vacati/vadati\n과거: avoca\n복수: avocuṃ\n경전 정형구에 빈출' },
  { type: 'teach', word: 'desesi / desayi', pronKo: '데세시 / 데사이', meaning: '설했다', icon: '📖', grammar: '과거형 3인칭 단수', baseForm: 'deseti', formNote: '현재: deseti\n과거: desesi / desayi\n복수: desesuṃ / desayiṃsu', buddhism: 'Buddho dhammaṃ desesi = 붓다께서 법을 설하셨다' },
  { type: 'teach', word: 'pūjesi / pūjayi', pronKo: '뿌-제시 / 뿌-자이', meaning: '공양했다', icon: '🙏', grammar: '과거형 3인칭 단수', baseForm: 'pūjeti', formNote: '현재: pūjeti\n과거: pūjesi / pūjayi\n복수: pūjesuṃ' },
  { type: 'teach', word: 'akāsi / akariṃsu', pronKo: '아까-시 / 아까링수', meaning: '했다 / 했다(복수)', icon: '⚒️', grammar: '과거형 3인칭', baseForm: 'karoti', formNote: '현재: karoti\n과거 단수: akāsi\n과거 복수: akariṃsu / akaṃsu' },
  { type: 'teach', word: 'aṭṭhāsi', pronKo: '앗타-시', meaning: '섰다', icon: '🧍', grammar: '과거형 3인칭 단수', baseForm: 'tiṭṭhati', formNote: '현재: tiṭṭhati\n과거: aṭṭhāsi\n복수: aṭṭhaṃsu' },

  // === 예문 ===
  { type: 'verse', pali: 'Buddho Sāvatthiyaṃ dhammaṃ desesi.\nBhikkhū dhammaṃ suṇiṃsu.', pronKo: '붓도 사-왓티양 담망 데세시\n빅쿠- 담망 수닝수', translation: '붓다께서 사왓티에서 법을 설하셨다.\n비구들은 법을 들었다.', highlight: ['desesi', 'suṇiṃsu'], note: 'desesi = deseti의 과거형 3인칭 단수\nsuṇiṃsu = suṇāti의 과거형 3인칭 복수' },
  { type: 'verse', pali: 'Upāsako vihāraṃ agami.\nUpāsakā vihāraṃ agamiṃsu.', pronKo: '우빠-사꼬 위하-랑 아가미\n우빠-사까- 위하-랑 아가밍수', translation: '우바새는 정사에 갔다.\n우바새들은 정사에 갔다.', highlight: ['agami', 'agamiṃsu'], note: '과거형: agami(단수) / agamiṃsu(복수)\n어두첨자 a- + gam + i' },
  { type: 'verse', pali: 'Ahaṃ dānaṃ adaṃ.\nMayaṃ dānaṃ adamhā.', pronKo: '아항 다-낭 아당\n마양 다-낭 아담하-', translation: '나는 보시를 주었다.\n우리는 보시를 주었다.', highlight: ['adaṃ', 'adamhā'], note: '1인칭 과거: adaṃ(단수) / adamhā(복수)\ndadāti의 불규칙 과거형' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Bhagavā evaṃ avoca.', options: ['세존께서 이와 같이 말씀하셨다', '세존께서 이와 같이 말씀하신다', '세존께서 이와 같이 말씀하실 것이다', '세존들께서 이와 같이 말씀하셨다'], answer: 0, hint: 'avoca = vacati의 과거형, evaṃ = 이와 같이' },
  { type: 'quiz', question: '2. Kassako khettaṃ kasi.', options: ['농부는 밭을 갈았다', '농부는 밭을 간다', '농부는 밭을 갈 것이다', '농부들은 밭을 갈았다'], answer: 0, hint: 'kasi = kasati(갈다)의 과거형 3인칭 단수' },
  { type: 'quiz', question: '3. Upāsakā Buddhaṃ pūjesuṃ.', options: ['우바새들은 붓다를 공양했다', '우바새는 붓다를 공양했다', '우바새들은 붓다를 공양한다', '우바새들은 붓다를 공양할 것이다'], answer: 0, hint: 'pūjesuṃ = pūjeti의 과거형 3인칭 복수 (-e어간)' },
  { type: 'quiz', question: '4. Ahaṃ vihāraṃ agamiṃ.', options: ['나는 정사에 갔다', '나는 정사에 간다', '우리는 정사에 갔다', '나는 정사에 갈 것이다'], answer: 0, hint: 'agamiṃ = 1인칭 단수 과거형 (-iṃ)' },
  { type: 'quiz', question: '5. Samaṇo dhammaṃ desesi.', options: ['사문은 법을 설했다', '사문은 법을 설한다', '사문들은 법을 설했다', '사문은 법을 설할 것이다'], answer: 0, hint: 'desesi = deseti의 과거형 3인칭 단수' },
  { type: 'quiz', question: '6. Corā bhaṇḍāni coresuṃ.', options: ['도둑들은 물건들을 훔쳤다', '도둑은 물건을 훔쳤다', '도둑들은 물건들을 훔친다', '도둑들은 물건들을 훔칠 것이다'], answer: 0, hint: 'coresuṃ = coreti의 과거형 3인칭 복수' },
  { type: 'quiz', question: '7. Manussā nagaramhi aṭṭhaṃsu.', options: ['사람들은 도시에 섰다', '사람은 도시에 섰다', '사람들은 도시에 서 있다', '사람들은 도시에 설 것이다'], answer: 0, hint: 'aṭṭhaṃsu = tiṭṭhati의 과거형 3인칭 복수' },
  { type: 'quiz', question: '8. Tumhe odanaṃ apacittha.', options: ['너희는 밥을 요리했다', '너는 밥을 요리했다', '너희는 밥을 요리한다', '너희는 밥을 요리할 것이다'], answer: 0, hint: 'apacittha = 2인칭 복수 과거형 (-ittha)' },
  { type: 'quiz', question: '9. Bhikkhū Buddhaṃ vandiṃsu.', options: ['비구들은 붓다께 예배했다', '비구는 붓다께 예배했다', '비구들은 붓다께 예배한다', '비구들은 붓다께 예배할 것이다'], answer: 0, hint: 'vandiṃsu = vandati의 과거형 3인칭 복수' },
  { type: 'quiz', question: '10. Mayaṃ dhammaṃ suṇimhā.', options: ['우리는 법을 들었다', '나는 법을 들었다', '우리는 법을 듣는다', '우리는 법을 들을 것이다'], answer: 0, hint: 'suṇimhā = 1인칭 복수 과거형 (-imhā)' },

  // === 마무리 ===
  { type: 'speak', pali: 'Bhagavā evaṃ avoca', pronKo: '바가와- 에왕 아워짜' },
]
