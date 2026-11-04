// 19과: 과거분사 -(i)ta/-na
import type { StepWithoutId } from './types'

export const LESSON_18: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '19과: 과거분사', subtitle: 'Atīta kicca (Past Participle)', description: '과거분사 -(i)ta / -na 형태\n타동사 → 수동 의미 (된, 받은)\n자동사 → 능동 의미 (간, 앉은)\n불규칙 과거분사 학습', icon: '⏪' },

  // === 규칙적 과거분사 -(i)ta ===
  { type: 'teach-grammar', title: '과거분사 -(i)ta 형태', example: 'pac(요리하다) → pacita (요리된)\nbhās(말하다) → bhāsita (말해진)\nkhaṇ(파다) → khaṇita (파인)', exampleKo: '어근 + ita = 과거분사', explanation: '과거분사는 동작의 완료를 나타냅니다.\n\n타동사 과거분사 → 수동 의미:\n• pacita = 요리된 (pac + ita)\n• bhāsita = 말해진 (bhās + ita)\n\n자동사 과거분사 → 능동 의미:\n• gata = 간 (gam + ta)\n• ṭhita = 선 (ṭhā + ita)' },

  // === 규칙적 과거분사 -na ===
  { type: 'teach-grammar', title: '과거분사 -na 형태', example: 'chid(자르다) → chinna (잘린)\nbhid(부수다) → bhinna (파괴된)\nnis+sad → nisinna (앉은)\ntarati → tiṇṇa (건넌)', exampleKo: '어근이 변형되며 -na/-ṇṇa 붙음', explanation: '-na 과거분사는 어근이 변형됩니다:\n• chinna = 잘린 (chid + na → nn)\n• bhinna = 파괴된 (bhid + na → nn)\n• nisinna = 앉은 (ni + sad + na)\n• tiṇṇa = 건넌 (tar + na → ṇṇa)\n• hata = 죽인/죽은 (han + ta)' },

  // === 불규칙 과거분사 ===
  { type: 'teach-grammar', title: '불규칙 과거분사 (특별 형태)', example: 'dassati → diṭṭha (보인)\ndadāti → dinna (준)\nkaroti → kata (행해진)\nbhuñjati → bhutta (먹은)\nvapati → vutta (심은)\nlabhati → laddha (얻은)', exampleKo: '어근 변화가 큰 불규칙형', explanation: '자주 쓰이는 불규칙 과거분사:\n• diṭṭha = 보인 (dis → diṭṭha)\n• dinna = 준 (dā → dinna)\n• kata = 행해진 (kar → kata)\n• bhutta = 먹은 (bhuj → bhutta)\n• vutta = 심은 (vap → vutta)\n• laddha = 얻은 (labh → laddha)\n• daṭṭha = 물은 (ḍaṃs → daṭṭha)\n• phuṭṭha = 접촉된 (phus → phuṭṭha)\n• bhūta = 된 (bhū → bhūta)\n• dhota = 씻긴 (dhov → dhota)\n• pahīna = 멸해진 (pa+hā → pahīna)\n• mutta = 해탈된 (muc → mutta)' },

  // === 단어 학습 ===
  { type: 'teach', word: 'pacita', pronKo: '빠찌따', meaning: '요리된', icon: '🍳', grammar: '과거분사 (pac)', formNote: '타동사 → 수동: 요리된 밥' },
  { type: 'teach', word: 'bhāsita', pronKo: '바-시따', meaning: '말해진', icon: '🗣️', grammar: '과거분사 (bhās)', formNote: '타동사 → 수동: 말해진 법' },
  { type: 'teach', word: 'gata', pronKo: '가따', meaning: '간', icon: '🚶', grammar: '과거분사 (gam)', formNote: '자동사 → 능동: 간 사람', buddhism: 'sugata = 잘 가신 분 (붓다)' },
  { type: 'teach', word: 'diṭṭha', pronKo: '딧타', meaning: '보인, 본', icon: '👁️', grammar: '불규칙 과거분사 (dis)', formNote: 'dis → diṭṭha (불규칙)', buddhism: 'diṭṭhi = 견해(見)' },
  { type: 'teach', word: 'dinna', pronKo: '딘나', meaning: '준, 주어진', icon: '🎁', grammar: '불규칙 과거분사 (dā)', formNote: 'dā → dinna (불규칙)', buddhism: 'dinna = 보시된' },
  { type: 'teach', word: 'kata', pronKo: '까따', meaning: '행해진, 만들어진', icon: '✅', grammar: '불규칙 과거분사 (kar)', formNote: 'kar → kata (불규칙)', buddhism: 'kataṃ = 행해진 것, karaṇīya = 할 일' },
  { type: 'teach', word: 'laddha', pronKo: '랏다', meaning: '얻은', icon: '🏆', grammar: '불규칙 과거분사 (labh)', formNote: 'labh → laddha (불규칙)' },
  { type: 'teach', word: 'mutta', pronKo: '뭇따', meaning: '해탈된, 풀린', icon: '🕊️', grammar: '불규칙 과거분사 (muc)', formNote: 'muc → mutta (불규칙)', buddhism: 'vimutta = 완전히 해탈된' },

  // === 교재 예문 6개 ===
  { type: 'verse', pali: 'Buddhena bhāsitaṃ dhammaṃ suṇāma.', pronKo: '붓데나 바-시땅 담망 수나-마', translation: '우리는 붓다에 의해 말씀하신 법을 듣는다.', highlight: ['bhāsitaṃ'], note: 'bhāsitaṃ = 말해진 (과거분사, 수동)' },
  { type: 'verse', pali: 'Corena dinnaṃ dhanaṃ na gaṇhāmi.', pronKo: '쪼레나 딘낭 다낭 나 간하-미', translation: '나는 도둑에 의해 주어진 재물을 받지 않는다.', highlight: ['dinnaṃ'], note: 'dinnaṃ = 주어진 (dinna의 중성 주격)' },
  { type: 'verse', pali: 'Gato so puriso nagaraṃ.', pronKo: '가또 소 뿌리소 나가랑', translation: '그 사람은 도시로 갔다.', highlight: ['Gato'], note: 'gato = 간 (자동사 → 능동 의미)' },
  { type: 'verse', pali: 'Nisinnā bhikkhū dhammaṃ suṇanti.', pronKo: '니신나- 빅쿠- 담망 수난띠', translation: '앉은 비구들은 법을 듣는다.', highlight: ['Nisinnā'], note: 'nisinnā = 앉은 (복수 주격)' },
  { type: 'verse', pali: 'Hatā pāpakā dhammā.', pronKo: '하따- 빠-빠까- 담마-', translation: '악한 법들은 죽임 당했다(제거되었다).', highlight: ['Hatā'], note: 'hatā = 죽은/제거된 (han → hata)' },
  { type: 'verse', pali: 'Tiṇṇo samuddaṃ paṇḍito.', pronKo: '띤노 사뭇당 빤디또', translation: '현자는 바다를 건넜다.', highlight: ['Tiṇṇo'], note: 'tiṇṇo = 건넌 (tar → tiṇṇa, 주격 남성)' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Buddhena desitaṃ dhammaṃ suṇāmi.', options: ['나는 붓다에 의해 설해진 법을 듣는다', '나는 붓다에게 법을 설한다', '나는 붓다의 법을 읽는다', '나는 붓다와 함께 법을 듣는다'], answer: 0, hint: 'desitaṃ = 설해진 (과거분사, 수동)' },
  { type: 'quiz', question: '2. Gato puriso vihāraṃ.', options: ['사람은 정사로 갔다', '사람은 정사에서 왔다', '사람은 정사에 머문다', '사람은 정사에서 나왔다'], answer: 0, hint: 'gato = 간 (자동사 능동), vihāraṃ = 정사로' },
  { type: 'quiz', question: '3. "chinna"의 의미는?', options: ['잘린', '부서진', '건넌', '앉은'], answer: 0, hint: 'chid(자르다) → chinna' },
  { type: 'quiz', question: '4. Laddhaṃ dhanaṃ rakkhati puriso.', options: ['사람은 얻은 재물을 지킨다', '사람은 재물을 얻는다', '사람은 재물을 잃는다', '사람은 얻은 재물을 버린다'], answer: 0, hint: 'laddhaṃ = 얻은 (과거분사)' },
  { type: 'quiz', question: '5. "mutta"는 어떤 동사의 과거분사인가?', options: ['muc (풀다, 해탈하다)', 'mut (죽다)', 'muc (묶다)', 'mud (기뻐하다)'], answer: 0, hint: 'muc → mutta (해탈된, 풀린)' },
  { type: 'quiz', question: '6. Katā puññāni samaṇehi.', options: ['공덕들은 사문들에 의해 행해졌다', '사문들은 공덕을 행한다', '사문들이 공덕으로 행한다', '공덕은 사문에 의해 행해졌다'], answer: 0, hint: 'katā = 행해진 (복수), samaṇehi = 사문들에 의해' },
  { type: 'quiz', question: '7. "diṭṭha"의 뜻은?', options: ['보인, 본', '들은', '말한', '준'], answer: 0, hint: 'dis(보다) → diṭṭha' },
  { type: 'quiz', question: '8. Bhuttaṃ bhojanaṃ sāduṃ.', options: ['먹은 음식은 맛있다', '먹을 음식은 맛있다', '음식을 먹는다', '맛있는 음식을 먹는다'], answer: 0, hint: 'bhuttaṃ = 먹은 (과거분사)' },
  { type: 'quiz', question: '9. 자동사 과거분사의 의미는?', options: ['능동 의미 (~한)', '수동 의미 (~된)', '미래 의미 (~할)', '명령 의미 (~하라)'], answer: 0, hint: 'gata = 간 (능동), nisinna = 앉은 (능동)' },
  { type: 'quiz', question: '10. Pahīnā kilesā arahato.', options: ['아라한의 번뇌들은 멸해졌다', '아라한은 번뇌를 멸한다', '아라한의 번뇌들은 남아있다', '번뇌가 아라한을 멸했다'], answer: 0, hint: 'pahīnā = 멸해진 (복수), arahato = 아라한의' },

  // === 마무리 ===
  { type: 'speak', pali: 'Buddhena bhāsitaṃ dhammaṃ suṇāma', pronKo: '붓데나 바-시땅 담망 수나-마' },
]
