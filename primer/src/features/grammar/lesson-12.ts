// 13과: -e어간 동사 + -nā어간 동사 + 특수 동사 활용
// deseti, cinteti, kiṇāti, suṇāti, bhavati/hoti, karoti
import type { StepWithoutId } from './types'

export const LESSON_12: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '12과: -e어간 + -nā어간 동사', subtitle: 'Causative(-e) / Nā-dhātu verbs', description: '-e어간: deseti, cinteti, pūjeti...\n-nā어간: kiṇāti, suṇāti, jānāti...\n특수 동사: bhavati/hoti, karoti\n\n경전: "Buddho dhammaṃ deseti"', icon: '📖' },

  // === 경전 구절 ===
  { type: 'verse', pali: 'Buddho dhammaṃ deseti.\nBhikkhū dhammaṃ suṇanti.', pronKo: '붓도 담망 데세띠\n빅쿠- 담망 수난띠', translation: '부처님은 법을 가르치신다.\n비구들은 법을 듣는다.', highlight: ['deseti', 'suṇanti', 'dhammaṃ'], note: 'deseti = -e어간 동사 (가르치다)\nsuṇanti = suṇāti(-nā어간)의 복수\n이 두 동사류를 이번 과에서 배웁니다!' },

  // === -e어간 동사 문법 ===
  { type: 'teach-grammar', title: '-e어간 동사 (제7류) 활용', example: '         단수        복수\n3인칭: deseti       desenti\n2인칭: desesi       desetha\n1인칭: desemi       desema', exampleKo: '어간 dese- + 인칭 어미', explanation: '-e어간 동사는 사역형(causative) 계열로\n어간이 -e로 끝납니다.\n\n활용 규칙:\n• 3인칭: -eti / -enti\n• 2인칭: -esi / -etha\n• 1인칭: -emi / -ema\n\n-ati 동사와 비교:\npacati → pac + ati (어간 pac-)\ndeseti → dese + ti (어간 dese-)\n\n어미 구조는 동일하나\n어간에 -e가 포함된 것이 특징!' },

  // === -e어간 동사 목록 ===
  { type: 'teach', word: 'deseti', pronKo: '데세띠', meaning: '가르치다, 설하다', icon: '🎓', grammar: '동사 · -e어간 3인칭 단수', baseForm: 'deseti', formNote: '복수: desenti\ndis(가리키다)의 사역형\nBuddho dhammaṃ deseti', buddhism: '법을 설하다 = dhammaṃ deseti\n경전에서 가장 많이 나오는 -e동사' },
  { type: 'teach', word: 'cinteti', pronKo: '찐떼띠', meaning: '생각하다', icon: '💭', grammar: '동사 · -e어간 3인칭 단수', baseForm: 'cinteti', formNote: '복수: cintenti\ncint(생각하다)에서 파생\ncintā = 생각, 사유' },
  { type: 'teach', word: 'pūjeti', pronKo: '뿌-제띠', meaning: '공경하다, 공양하다', icon: '🙏', grammar: '동사 · -e어간 3인칭 단수', baseForm: 'pūjeti', formNote: '복수: pūjenti\npūjā = 공양, 공경\npupphena pūjeti = 꽃으로 공양하다' },
  { type: 'teach', word: 'katheti', pronKo: '까테띠', meaning: '말하다, 이야기하다', icon: '💬', grammar: '동사 · -e어간 3인칭 단수', baseForm: 'katheti', formNote: '복수: kathenti\nkathā = 이야기, 담론' },
  { type: 'teach', word: 'jāleti', pronKo: '자-레띠', meaning: '불태우다, 태우다', icon: '🔥', grammar: '동사 · -e어간 3인칭 단수', baseForm: 'jāleti', formNote: '복수: jālenti\njal(타다)의 사역형\n자동사: jalati (타다)' },
  { type: 'teach', word: 'māreti', pronKo: '마-레띠', meaning: '죽이다', icon: '⚔️', grammar: '동사 · -e어간 3인칭 단수', baseForm: 'māreti', formNote: '복수: mārenti\nmar(죽다)의 사역형\nMāra = 마라(악마)', buddhism: 'pāṇātipātā veramaṇī = 살생을 삼가는 것\n첫째 계율' },
  { type: 'teach', word: 'coreti', pronKo: '쪼레띠', meaning: '훔치다', icon: '🦹', grammar: '동사 · -e어간 3인칭 단수', baseForm: 'coreti', formNote: '복수: corenti\ncora = 도둑\ncoreyya = 훔칠 것이다' },

  // === -nā어간 동사 문법 ===
  { type: 'teach-grammar', title: '-nā어간 동사 활용', example: '         단수        복수\n3인칭: suṇāti       suṇanti\n2인칭: suṇāsi       suṇātha\n1인칭: suṇāmi       suṇāma', exampleKo: '어간 suṇā- + 인칭 어미', explanation: '-nā어간 동사는 어근에 -nā가 붙은 형태입니다.\n\n주요 -nā동사:\n• kiṇāti (사다) ← ki + nā\n• suṇāti (듣다) ← su + nā\n• jānāti (알다) ← ñā + nā\n• gaṇhāti (잡다) ← gah + nā\n• uṇṇāti (제거하다)\n\n활용은 -ati 동사와 동일하나\n어간에 -nā가 포함됩니다.\n\n3인칭 복수에서 -nā가 탈락하는 경우:\nsuṇāti → suṇanti (suṇānti가 아님!)' },

  // === -nā어간 동사 목록 ===
  { type: 'teach', word: 'kiṇāti', pronKo: '끼나-띠', meaning: '사다, 구매하다', icon: '🛒', grammar: '동사 · -nā어간 3인칭 단수', baseForm: 'kiṇāti', formNote: '복수: kiṇanti\nki + nā → kiṇā-\n절대분사: kiṇitvā (사고서)' },
  { type: 'teach', word: 'suṇāti', pronKo: '수나-띠', meaning: '듣다', icon: '👂', grammar: '동사 · -nā어간 3인칭 단수', baseForm: 'suṇāti', formNote: '복수: suṇanti\nsu + nā → suṇā-\n절대분사: sutvā (듣고서)', buddhism: 'dhammaṃ suṇāti = 법을 듣다\n문혜수(聞慧修) 중 첫째' },
  { type: 'teach', word: 'jānāti', pronKo: '자-나-띠', meaning: '알다', icon: '🧠', grammar: '동사 · -nā어간 3인칭 단수', baseForm: 'jānāti', formNote: '복수: jānanti\nñā + nā → jānā-\n절대분사: ñatvā (알고서)', buddhism: 'pajānāti = 꿰뚫어 알다\nabhijānāti = 완전히 알다' },
  { type: 'teach', word: 'gaṇhāti', pronKo: '간하-띠', meaning: '잡다, 취하다', icon: '✊', grammar: '동사 · -nā어간 3인칭 단수', baseForm: 'gaṇhāti', formNote: '복수: gaṇhanti\ngah + nā → gaṇhā-\n절대분사: gahetvā (잡고서)' },

  // === bhavati/hoti 특수 활용 ===
  { type: 'teach-grammar', title: 'bhavati / hoti (되다, ~이다) 활용', example: 'bhavati = hoti (동의어)\n         단수        복수\n3인칭: hoti         honti\n2인칭: hosi         hotha\n1인칭: homi         homa', exampleKo: 'bhavati와 hoti는 같은 뜻', explanation: 'bhavati와 hoti는 모두 "되다, ~이다"입니다.\nhoti가 경전에서 더 자주 사용됩니다.\n\nbhavati 활용:\n• bhavati / bhavanti\n• bhavasi / bhavatha\n• bhavāmi / bhavāma\n\nhoti 활용 (불규칙):\n• hoti / honti\n• hosi / hotha\n• homi / homa\n\natthi(있다) vs hoti(되다):\n• atthi = 존재/상태\n• hoti = 생성/변화\n경전에서 종종 혼용됩니다.' },

  // === karoti 특수 활용 ===
  { type: 'teach-grammar', title: 'karoti (하다) 전체 활용 복습', example: '         단수        복수\n3인칭: karoti       karonti\n2인칭: karosi       karotha\n1인칭: karomi       karoma\n\n명령형: karohi (하라!) / karotha (하라!)', exampleKo: 'karoti는 -o어간 특수 동사', explanation: 'karoti는 어간이 karo-로\n일반 -ati/-eti와 다른 패턴입니다.\n\n자주 쓰이는 표현:\n• kammaṃ karoti = 업을 짓다\n• puññaṃ karoti = 공덕을 짓다\n• pāpaṃ karoti = 악을 짓다\n• vandanaṃ karoti = 예배하다\n\n절대분사: karitvā / katvā (하고서)\n부정사: kātuṃ (하기 위해)' },

  // === 예문 ===
  { type: 'verse', pali: 'Upāsakā pupphehi Buddhaṃ pūjenti.', pronKo: '우빠-사까- 뿝페히 붓당 뿌-젠띠', translation: '우바새들은 꽃들로 부처님을 공양한다.', highlight: ['pūjenti', 'pupphehi', 'Buddhaṃ'], note: 'pūjenti = pūjeti의 3인칭 복수\npupphehi = 꽃들로 (도구격 복수)' },
  { type: 'verse', pali: 'Ahaṃ dhammaṃ jānāmi.\nTvaṃ dhammaṃ jānāsi.', pronKo: '아항 담망 자-나-미\n뜨왕 담망 자-나-시', translation: '나는 법을 안다.\n너는 법을 안다.', highlight: ['jānāmi', 'jānāsi'], note: 'jānāmi = jānāti의 1인칭 단수\njānāsi = jānāti의 2인칭 단수' },
  { type: 'verse', pali: 'Manusso kusalañ ca pāpañ ca jānāti.', pronKo: '마눗소 꾸살란 짜 빠-빤 짜 자-나-띠', translation: '사람은 선과 악을 안다.', highlight: ['kusalañ', 'pāpañ', 'jānāti'], note: 'ca...ca = ~과 ~\nkusalañ = kusalaṃ의 연음\npāpañ = pāpaṃ의 연음 (ṃ + ca → ñ ca)' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Buddho dhammaṃ deseti.', options: ['부처님은 법을 가르치신다', '부처님은 법을 듣는다', '부처님들은 법을 가르치신다', '부처님은 법을 생각하신다'], answer: 0, hint: 'deseti = 가르치다 (-e어간 동사)' },
  { type: 'quiz', question: '2. Paṇḍitā dhammaṃ cintenti.', options: ['현자들은 법을 생각한다', '현자는 법을 생각한다', '현자들은 법을 가르친다', '현자들은 법을 듣는다'], answer: 0, hint: 'cintenti = cinteti의 3인칭 복수' },
  { type: 'quiz', question: '3. Upāsako pupphehi Buddhaṃ pūjeti.', options: ['우바새는 꽃들로 부처님을 공양한다', '우바새들은 꽃들로 부처님을 공양한다', '우바새는 꽃으로 법을 공양한다', '우바새는 과일로 부처님을 공양한다'], answer: 0, hint: 'pūjeti = 공양하다, pupphehi = 꽃들로(도구격)' },
  { type: 'quiz', question: '4. Vāṇijo āpaṇe bhaṇḍāni kiṇāti.', options: ['상인은 가게에서 상품들을 산다', '상인은 가게에서 상품들을 판다', '상인들은 가게에서 상품들을 산다', '상인은 도시에서 상품들을 산다'], answer: 0, hint: 'kiṇāti = 사다(-nā어간), āpaṇe = 가게에서' },
  { type: 'quiz', question: '5. Bhikkhū Buddhassa dhammaṃ suṇanti.', options: ['비구들은 부처님의 법을 듣는다', '비구는 부처님의 법을 듣는다', '비구들은 부처님의 법을 가르친다', '비구들은 부처님께 법을 말한다'], answer: 0, hint: 'suṇanti = suṇāti의 복수, Buddhassa = 부처님의(소유격)' },
  { type: 'quiz', question: '6. So katheti: "Ahaṃ saccaṃ jānāmi."', options: ['그는 말한다: "나는 진리를 안다"', '그는 말한다: "나는 진리를 가르친다"', '그들은 말한다: "나는 진리를 안다"', '그는 생각한다: "나는 진리를 안다"'], answer: 0, hint: 'katheti = 말하다, jānāmi = 알다(1인칭 단수)' },
  { type: 'quiz', question: '7. Coro ratti bhaṇḍaṃ gaṇhāti.', options: ['도둑은 밤에 물건을 잡는다(훔친다)', '도둑은 낮에 물건을 잡는다', '도둑들은 밤에 물건을 잡는다', '도둑은 밤에 물건을 버린다'], answer: 0, hint: 'gaṇhāti = 잡다(-nā어간), ratti = 밤에' },
  { type: 'quiz', question: '8. So dānaṃ deti, puññaṃ hoti.', options: ['그는 보시를 행하면 공덕이 된다', '그는 보시를 행하면 악이 된다', '그들은 보시를 행하면 공덕이 된다', '그는 보시를 행하고 공덕을 짓는다'], answer: 0, hint: 'hoti = 되다/~이다, puññaṃ = 공덕이' },
  { type: 'quiz', question: '9. Kassako tiṇaṃ jāleti.', options: ['농부는 풀을 태운다', '농부는 풀을 모은다', '농부들은 풀을 태운다', '농부는 풀을 심는다'], answer: 0, hint: 'jāleti = 태우다(-e어간 사역동사)' },
  { type: 'quiz', question: '10. Manusso pāṇaṃ na māreti.', options: ['사람은 생물을 죽이지 않는다', '사람은 생물을 죽인다', '사람들은 생물을 죽이지 않는다', '사람은 생물을 기르지 않는다'], answer: 0, hint: 'na māreti = 죽이지 않는다, pāṇa = 생물/목숨' },

  // === 마무리 ===
  { type: 'speak', pali: 'Buddho dhammaṃ deseti', pronKo: '붓도 담망 데세띠' },
]
