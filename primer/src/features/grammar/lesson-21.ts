// 22과: 미래수동분사 -(i/e)tabba/-anīya
import type { StepWithoutId } from './types'

export const LESSON_21: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '22과: 미래수동분사', subtitle: 'Kicca (Future Passive Participle)', description: '~해야 할, ~될 수 있는\n\n-tabba/-itabba/-etabba 형태\n-anīya 형태\n\n의무·가능·적합의 의미', icon: '📋' },

  // === -tabba 형태 ===
  { type: 'teach-grammar', title: '미래수동분사 -(i/e)tabba', example: 'pac → pacitabba (요리되어야 할)\nbhuj → bhuñjitabba (먹어져야 할)\nkar → kātabba (행해져야 할)\ndā → dātabba (주어져야 할)\ngam → gantabba (가야 할 / 도달되어야 할)', exampleKo: '어근 + (i)tabba = ~해야 할', explanation: '-tabba 미래수동분사:\n• pacitabba = 요리되어야 할 (pac + itabba)\n• bhuñjitabba = 먹어져야 할 (bhuj + itabba)\n• kātabba = 행해져야 할 (kar → kā + tabba)\n• dātabba = 주어져야 할 (dā + tabba)\n• gantabba = 가야 할 / 도달되어야 할 (gam + tabba)\n\n의미: 의무(~해야 할), 가능(~될 수 있는), 적합(~할 만한)' },

  // === -anīya 형태 ===
  { type: 'teach-grammar', title: '미래수동분사 -anīya', example: 'pac → pacanīya (요리되어야 할)\nbhuj → bhojanīya (먹어져야 할)\nkar → karaṇīya (행해져야 할)\ndā → dānīya (주어져야 할)\npūj → pūjanīya (공경받아야 할)', exampleKo: '어근 + anīya = ~해야 할', explanation: '-anīya 미래수동분사:\n• pacanīya = 요리되어야 할\n• bhojanīya = 먹을 만한, 먹어져야 할\n• karaṇīya = 행해져야 할\n• pūjanīya = 공경받아야 할\n\n-tabba와 -anīya는 의미 동일:\npacitabba = pacanīya\n\n-anīya형이 더 문학적·격식체' },

  // === 단어 학습 ===
  { type: 'teach', word: 'pacitabba / pacanīya', pronKo: '빠찌땁바 / 빠짜니-야', meaning: '요리되어야 할', icon: '🍳', grammar: '미래수동분사 (pac)', formNote: '-tabba형 = -anīya형' },
  { type: 'teach', word: 'bhuñjitabba / bhojanīya', pronKo: '분지땁바 / 보자니-야', meaning: '먹어져야 할', icon: '🍽️', grammar: '미래수동분사 (bhuj)', formNote: 'bhojanīya → bhojana(음식)과 관련' },
  { type: 'teach', word: 'kātabba / karaṇīya', pronKo: '까-땁바 / 까라니-야', meaning: '행해져야 할', icon: '✅', grammar: '미래수동분사 (kar)', formNote: 'karaṇīya = 의무, 할 일', buddhism: 'Karaṇīya Mettā Sutta = 자비경' },
  { type: 'teach', word: 'dātabba', pronKo: '다-땁바', meaning: '주어져야 할', icon: '🎁', grammar: '미래수동분사 (dā)', formNote: 'dā + tabba' },
  { type: 'teach', word: 'gantabba', pronKo: '간땁바', meaning: '가야 할 / 도달되어야 할', icon: '🚶', grammar: '미래수동분사 (gam)', formNote: 'gam + tabba' },
  { type: 'teach', word: 'pūjanīya', pronKo: '뿌-자니-야', meaning: '공경받아야 할', icon: '🙏', grammar: '미래수동분사 (pūj)', formNote: 'pūj + anīya', buddhism: '부처님 = pūjanīya(공경 받을 분)' },

  // === 예문 3개 ===
  { type: 'verse', pali: 'Dhammo samaṇena desitabbo.', pronKo: '담모 사마네나 데시땁보', translation: '법은 사문에 의해 설해져야 한다.', highlight: ['desitabbo'], note: 'desitabbo = 설해져야 할 (미래수동분사, 남성 주격)' },
  { type: 'verse', pali: 'Karaṇīyaṃ kusalaṃ sukhāvahaṃ.', pronKo: '까라니-양 꾸살랑 수카-와항', translation: '행해져야 할 선은 행복을 가져온다.', highlight: ['Karaṇīyaṃ'], note: 'karaṇīyaṃ = 행해져야 할 (중성 주격)' },
  { type: 'verse', pali: 'Buddho pūjanīyo sabbalokaṃ.', pronKo: '붓도 뿌-자니-요 삽발로깡', translation: '붓다는 온 세상에 의해 공경받아야 한다.', highlight: ['pūjanīyo'], note: 'pūjanīyo = 공경받아야 할 (남성 주격)' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Dhammo bhikkhuhi desitabbo.', options: ['법은 비구들에 의해 설해져야 한다', '비구들은 법을 설한다', '법은 비구들에게 설해졌다', '비구들이 법을 설할 것이다'], answer: 0, hint: 'desitabbo = 설해져야 할 (미래수동분사)' },
  { type: 'quiz', question: '2. "karaṇīya"의 의미는?', options: ['행해져야 할', '행해진', '행하는', '행할 것이다'], answer: 0, hint: 'kar + anīya = 미래수동분사' },
  { type: 'quiz', question: '3. Odanaṃ pacitabbaṃ dāsiyā.', options: ['밥은 하녀에 의해 요리되어야 한다', '하녀는 밥을 요리한다', '밥은 하녀에 의해 요리되었다', '하녀가 밥을 요리할 것이다'], answer: 0, hint: 'pacitabbaṃ = 요리해야 할 (중성)' },
  { type: 'quiz', question: '4. -tabba와 -anīya의 관계는?', options: ['의미 동일, 형태만 다름', '능동과 수동의 차이', '현재와 미래의 차이', '의무와 가능의 차이'], answer: 0, hint: 'pacitabba = pacanīya = 요리해야 할' },
  { type: 'quiz', question: '5. Dānaṃ dātabbaṃ upāsakena.', options: ['보시는 우바새에 의해 주어져야 한다', '우바새는 보시를 준다', '보시는 우바새에게 주어졌다', '우바새가 보시를 줄 것이다'], answer: 0, hint: 'dātabbaṃ = 주어야 할 (중성)' },
  { type: 'quiz', question: '6. "bhojanīya"는 어떤 동사에서 왔는가?', options: ['bhuñjati (먹다)', 'bhojeti (먹이다)', 'bhavati (되다)', 'bhāsati (말하다)'], answer: 0, hint: 'bhuj → bhojanīya' },
  { type: 'quiz', question: '7. Buddho vandanīyo manussehi.', options: ['붓다는 사람들에 의해 경배받아야 한다', '사람들은 붓다를 경배한다', '붓다가 사람들을 경배한다', '사람들이 붓다를 경배했다'], answer: 0, hint: 'vandanīyo = 경배받아야 할' },
  { type: 'quiz', question: '8. 미래수동분사의 3가지 의미는?', options: ['의무·가능·적합', '과거·현재·미래', '능동·수동·중간', '주격·목적격·도구격'], answer: 0, hint: '~해야 할, ~될 수 있는, ~할 만한' },
  { type: 'quiz', question: '9. Nagaraṃ gantabbaṃ mayā.', options: ['도시는 나에 의해 가야 할 곳이다', '나는 도시로 간다', '도시는 나에 의해 갔다', '나는 도시로 갈 것이다'], answer: 0, hint: 'gantabbaṃ = 가야 할, mayā = 나에 의해' },
  { type: 'quiz', question: '10. Sīlaṃ rakkhitabbaṃ sabbadā.', options: ['계는 항상 지켜져야 한다', '계를 항상 지킨다', '계는 항상 지켜졌다', '계를 항상 지킬 것이다'], answer: 0, hint: 'rakkhitabbaṃ = 지켜야 할, sabbadā = 항상' },

  // === 마무리 ===
  { type: 'speak', pali: 'Karaṇīyaṃ kusalaṃ sukhāvahaṃ', pronKo: '까라니-양 꾸살랑 수카-와항' },
]
