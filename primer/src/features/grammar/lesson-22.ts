// 23과: 사역형 -e/-aya/-āpe/-āpaya
import type { StepWithoutId } from './types'

export const LESSON_22: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '23과: 사역형', subtitle: 'Kārita (Causative)', description: '~시키다, ~하게 하다\n\n-e/-aya: \n-āpe/-āpaya: \n\n예: pacati(요리한다) → pāceti(요리시킨다)', icon: '👨‍💼' },

  // === 사역형 -e/-aya ===
  { type: 'teach-grammar', title: '사역형 -e/-aya', example: 'pac(요리하다) → pāceti / pācayati\nbhuj(먹다) → bhojeti / bhojayati\nkar(행하다) → kāreti / kārayati\ndā(주다) → dāpeti / dāpayati', exampleKo: '어근 모음 강화 + -eti/-ayati', explanation: '-e/-aya:\n• pāceti = 요리시킨다 (pac → pāc + eti)\n• bhojeti = 먹인다 (bhuj → bhoj + eti)\n• kāreti = 행하게 한다 (kar → kār + eti)\n\n어근의 모음이 강화됩니다:\n• a → ā (pac → pāc)\n• u → o (bhuj → bhoj)\n• i → e (nis → nes → neseti, 인도하다)' },

  // === 사역형 -āpe/-āpaya ===
  { type: 'teach-grammar', title: '사역형 -āpe/-āpaya', example: 'cor(훔치다) → corāpeti (훔치게 시킨다)\nkiṇ(사다) → kiṇāpeti (사게 시킨다)\npac → pācāpeti (요리하게 시킨다)', exampleKo: '어근 + -āpeti', explanation: '-āpe/-āpaya:\n• corāpeti = 훔치게 한다\n• kiṇāpeti = 사게 한다\n• pācāpeti = 요리하게 시킨다\n\npāceti = 요리하게 한다\npācāpeti = 요리하게 시킨다' },

  // === 단어 학습 ===
  { type: 'teach', word: 'pāceti', pronKo: '빠-쩨띠', meaning: '요리시키다', icon: '👨‍🍳', grammar: '사역형 (pac)', formNote: 'pac → pāc + eti\n복수: pācenti' },
  { type: 'teach', word: 'bhojeti', pronKo: '보제띠', meaning: '먹이다', icon: '🍽️', grammar: '사역형 (bhuj)', formNote: 'bhuj → bhoj + eti\n복수: bhojenti' },
  { type: 'teach', word: 'kāreti', pronKo: '까-레띠', meaning: '행하게 하다', icon: '📋', grammar: '사역형 (kar)', formNote: 'kar → kār + eti\n복수: kārenti' },
  { type: 'teach', word: 'dāpeti', pronKo: '다-뻬띠', meaning: '주게 하다', icon: '🤲', grammar: '사역형 (dā)', formNote: 'dā → dāp + eti\n복수: dāpenti' },
  { type: 'teach', word: 'corāpeti', pronKo: '쪼라-뻬띠', meaning: '훔치게 시키다', icon: '🦹', grammar: '사역형 (cor)', formNote: 'cor + āpeti\n복수: corāpenti' },
  { type: 'teach', word: 'kiṇāpeti', pronKo: '끼나-뻬띠', meaning: '사게 시키다', icon: '🛒', grammar: '사역형 (kiṇ)', formNote: 'kiṇ + āpeti\n복수: kiṇāpenti' },

  // === 예문 7개 ===
  { type: 'verse', pali: 'Mātā dāsiṃ odanaṃ pāceti.', pronKo: '마-따- 다-싱 오다낭 빠-쩨띠', translation: '어머니는 하녀에게 밥을 요리시킨다.', highlight: ['pāceti'], note: 'pāceti = 요리시키다 (사역)' },
  { type: 'verse', pali: 'Rājā purise kammaṃ kāreti.', pronKo: '라-자- 뿌리세 깜망 까-레띠', translation: '왕은 사람들에게 일을 시킨다.', highlight: ['kāreti'], note: 'kāreti = 행하게 하다 (사역형)' },
  { type: 'verse', pali: 'Upāsako bhikkhū bhojeti.', pronKo: '우빠-사꼬 빅쿠- 보제띠', translation: '우바새는 비구들을 먹인다(공양한다).', highlight: ['bhojeti'], note: 'bhojeti = 먹이다 (사역형)' },
  { type: 'verse', pali: 'Ācariyo sissehi potthake likhāpeti.', pronKo: '아-짜리야 싯세히 뽓타께 리카-뻬띠', translation: '스승은 제자들에게 책을 쓰게 시킨다.', highlight: ['likhāpeti'], note: 'likhāpeti = 쓰게 시키다 (사역형)' },
  { type: 'verse', pali: 'Pitā puttaṃ dānaṃ dāpeti.', pronKo: '삐따- 뿟땅 다-낭 다-뻬띠', translation: '아버지는 아들에게 보시를 주게 한다.', highlight: ['dāpeti'], note: 'dāpeti = 주게 하다 (사역)' },
  { type: 'verse', pali: 'Coro purisaṃ dhanaṃ corāpeti.', pronKo: '쪼로 뿌리상 다낭 쪼라-뻬띠', translation: '도둑은 사람에게 재물을 훔치게 시킨다.', highlight: ['corāpeti'], note: 'corāpeti = 훔치게 시키다 (사역형)' },
  { type: 'verse', pali: 'Seṭṭhī dāsaṃ bhaṇḍāni kiṇāpeti.', pronKo: '셋티- 다-상 반다-니 끼나-뻬띠', translation: '장자는 하인에게 상품들을 사게 시킨다.', highlight: ['kiṇāpeti'], note: 'kiṇāpeti = 사게 시키다 (사역형)' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Mātā dhītaraṃ odanaṃ pāceti.', options: ['어머니는 딸에게 밥을 요리시킨다', '어머니는 딸과 밥을 요리한다', '딸은 어머니에게 밥을 요리한다', '어머니는 딸의 밥을 요리한다'], answer: 0, hint: 'pāceti = 요리시키다 (사역형)' },
  { type: 'quiz', question: '2. "bhojeti"의 의미는?', options: ['먹이다', '먹다', '먹어야 할', '먹은'], answer: 0, hint: 'bhuj → bhoj + eti (사역형)' },
  { type: 'quiz', question: '3. Rājā purise gehaṃ kāreti.', options: ['왕은 사람들에게 집을 짓게 한다', '왕은 사람들의 집을 짓는다', '사람들은 왕의 집을 짓는다', '왕은 사람들과 집을 짓는다'], answer: 0, hint: 'kāreti = 행하게 하다/짓게 하다' },
  { type: 'quiz', question: '4. "dāpeti"는 어떤 동사의 사역형인가?', options: ['dādāti (주다)', 'dassati (보다)', 'dahati (태우다)', 'dhāvati (달리다)'], answer: 0, hint: 'dā(주다) → dāpeti(주게 하다)' },
  { type: 'quiz', question: '5. Ācariyo sissehi gītaṃ gāyāpeti.', options: ['스승은 제자들에게 노래를 부르게 시킨다', '스승은 제자들과 노래를 부른다', '제자들은 스승에게 노래를 부른다', '스승은 제자들의 노래를 듣는다'], answer: 0, hint: 'gāyāpeti = 부르게 시키다 (사역형)' },
  { type: 'quiz', question: '6. Upāsikā samaṇe bhojeti.', options: ['여신도는 사문들을 먹인다', '여신도는 사문들과 먹는다', '사문들은 여신도를 먹인다', '여신도는 사문들을 본다'], answer: 0, hint: 'bhojeti = 먹이다/공양하다' },
  { type: 'quiz', question: '7. "corāpeti"의 의미는?', options: ['훔치게 시키다', '훔치다', '훔친', '훔쳐야 할'], answer: 0, hint: 'cor + āpeti = 사역형' },
  { type: 'quiz', question: '8. Seṭṭhī dāse kammaṃ kāreti.', options: ['장자는 하인들에게 일을 시킨다', '하인들은 장자에게 일을 한다', '장자는 하인들의 일을 한다', '장자는 하인들과 일을 한다'], answer: 0, hint: 'kāreti = 일시키다 (사역형)' },

  // === 마무리 ===
  { type: 'speak', pali: 'Rājā purise kammaṃ kāreti', pronKo: '라-자- 뿌리세 깜망 까-레띠' },
]
