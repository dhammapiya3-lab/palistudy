// 31과: 대명사 1인칭/2인칭 (ma-, amh-, tva-, tumh-)
import type { StepWithoutId } from './types'

export const LESSON_28: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '31과: 대명사 1인칭/2인칭', subtitle: 'Sabbanāma — ahaṃ / tvaṃ', description: '1인칭 대명사 (ahaṃ = 나)\n2인칭 대명사 (tvaṃ = 너)\n\n어간: ma-/amh- (1인칭), tva-/tumh- (2인칭)\n단수·복수 8격 변화 학습', icon: '🗣️' },

  // === 1인칭 대명사 격변화 (ahaṃ) ===
  { type: 'teach-grammar', title: '1인칭 대명사 격변화 (ahaṃ 나)', example: '주격: ahaṃ / mayaṃ\n목적격: maṃ, mamaṃ / amhe\n도구격: mayā, me / amhehi, no\n여격: mayhaṃ, mamaṃ, me / amhākaṃ, no\n탈격: mayā / amhehi, no\n소유격: mama, mayhaṃ, me / amhākaṃ, no\n처소격: mayi / amhesu\n호격: — / —', exampleKo: '단수 어간: ma-, 복수 어간: amh-\nme/no = 단축형 (구·여·소유격 공통)', explanation: '1인칭 핵심 패턴:\n• 주격: ahaṃ(나) / mayaṃ(우리)\n• me = 단수 구·여·소유격 단축형\n• no = 복수 구·여·탈·소유격 단축형\n• mayā = 도구격·탈격 겸용\n• 처소격: mayi(단수), amhesu(복수)' },

  // === 1인칭 단어 ===
  { type: 'teach', word: 'ahaṃ', pronKo: '아항', meaning: '나 (주격)', icon: '👤', grammar: '1인칭 대명사 단수', formNote: '주격: ahaṃ, 목적격: maṃ' },
  { type: 'teach', word: 'mayaṃ', pronKo: '마양', meaning: '우리 (주격)', icon: '👥', grammar: '1인칭 대명사 복수', formNote: '주격: mayaṃ, 목적격: amhe' },

  // === 2인칭 대명사 격변화 (tvaṃ) ===
  { type: 'teach-grammar', title: '2인칭 대명사 격변화 (tvaṃ 너)', example: '주격: tvaṃ, tuvaṃ / tumhe\n목적격: taṃ, tavaṃ, tuvaṃ / tumhe\n도구격: tvayā, tayā, te / tumhehi, vo\n여격: tuyhaṃ, te / tumhākaṃ, vo\n탈격: tvayā, tayā / tumhehi, vo\n소유격: tava, tuyhaṃ, te / tumhākaṃ, vo\n처소격: tvayi, tayi / tumhesu\n호격: tvaṃ, tuvaṃ / tumhe', exampleKo: '단수 어간: tva-/ta-, 복수 어간: tumh-\nte/vo = 단축형 (구·여·소유격 공통)', explanation: '2인칭 핵심 패턴:\n• 주격: tvaṃ(너) / tumhe(너희)\n• te = 단수 구·여·소유격 단축형\n• vo = 복수 구·여·탈·소유격 단축형\n• tvayā/tayā = 도구격·탈격 겸용\n• 1인칭과 구조 동일 (me↔te, no↔vo)' },

  // === 2인칭 단어 ===
  { type: 'teach', word: 'tvaṃ', pronKo: '뜨왕', meaning: '너 (주격)', icon: '👤', grammar: '2인칭 대명사 단수', formNote: '주격: tvaṃ/tuvaṃ, 목적격: taṃ/tavaṃ' },
  { type: 'teach', word: 'tumhe', pronKo: '뚬헤', meaning: '너희 (주격)', icon: '👥', grammar: '2인칭 대명사 복수', formNote: '주격: tumhe, 목적격: tumhe' },

  // === 1인칭 vs 2인칭 대조 ===
  { type: 'teach-grammar', title: '1인칭 / 2인칭 단축형 대조', example: '       1인칭    2인칭\n단축(단수): me       te\n단축(복수): no       vo\n주격(단수): ahaṃ     tvaṃ\n주격(복수): mayaṃ    tumhe\n처소(단수): mayi     tvayi\n처소(복수): amhesu   tumhesu', exampleKo: 'me/te = 단수 단축, no/vo = 복수 단축', explanation: '단축형 규칙:\n• me (나를/나에게/나의) — 문맥으로 격 판단\n• te (너를/너에게/너의) — 문맥으로 격 판단\n• no (우리를/우리에게/우리의)\n• vo (너희를/너희에게/너희의)\n\n단축형은 문장 첫 자리에 올 수 없음!' },

  // === 연습문제 10개 (교재 31과) ===
  { type: 'quiz', question: '1. Mama ācariyo maṃ vācento potthakaṃ likhi.', options: ['나의 선생님은 나를 가르치면서 책을 쓰셨다', '나의 선생님은 나에게 책을 읽어주셨다', '선생님이 나의 책을 쓰셨다', '나는 선생님의 책을 읽었다'], answer: 0, hint: 'mama = 나의, maṃ = 나를, vācento = 가르치면서' },
  { type: 'quiz', question: '2. Mayhaṃ bhaginī gilānaṃ pitaraṃ posesi.', options: ['나의 여동생은 아픈 아버지를 돌보았다', '나의 형은 아픈 어머니를 돌보았다', '나의 여동생은 아버지를 방문했다', '나에게 여동생이 아버지를 보내었다'], answer: 0, hint: 'mayhaṃ = 나의, bhaginī = 여동생, gilānaṃ = 아픈' },
  { type: 'quiz', question: '3. Dātāro bhikkhūnaṃ dānaṃ dentā amhe pi bhojāpesuṃ.', options: ['보시자들은 비구들에게 보시를 하면서 우리도 먹였다', '보시자들은 비구들에게 음식을 주면서 우리를 불렀다', '우리는 비구들에게 보시를 했다', '비구들은 우리에게 보시를 행했다'], answer: 0, hint: 'amhe = 우리를, pi = ~도, bhojāpesuṃ = 먹였다' },
  { type: 'quiz', question: '4. Tvaṃ mayā saha āgaccha.', options: ['너는 나와 함께 오너라', '나는 너와 함께 간다', '너는 나에게 오너라', '우리는 함께 가자'], answer: 0, hint: 'tvaṃ = 너, mayā saha = 나와 함께, āgaccha = 오라' },
  { type: 'quiz', question: '5. Tuyhaṃ puttā tumhe upaṭṭhahanti.', options: ['너의 아들들이 너희를 시중든다', '나의 아들들이 우리를 시중든다', '너의 아들이 너를 시중든다', '너희 아들들이 나를 시중든다'], answer: 0, hint: 'tuyhaṃ = 너의, puttā = 아들들, tumhe = 너희를' },
  { type: 'quiz', question: '6. "나를"의 빠알리어는?', options: ['maṃ', 'mayā', 'mama', 'mayi'], answer: 0, hint: '목적격 단수 = maṃ, mamaṃ' },
  { type: 'quiz', question: '7. "너희에게"의 빠알리어 단축형은?', options: ['vo', 'te', 'no', 'me'], answer: 0, hint: '2인칭 복수 단축형 = vo' },
  { type: 'quiz', question: '8. Mayaṃ Bhagavato sāvakā.', options: ['우리는 세존의 제자들이다', '나는 세존의 제자이다', '너희는 세존의 제자들이다', '그들은 세존의 제자들이다'], answer: 0, hint: 'mayaṃ = 우리, Bhagavato = 세존의' },
  { type: 'quiz', question: '9. mayi의 격은?', options: ['처소격 (나에게서, 내 안에)', '소유격 (나의)', '여격 (나에게)', '도구격 (나에 의해)'], answer: 0, hint: '처소격 단수: mayi, 복수: amhesu' },
  { type: 'quiz', question: '10. Te bhikkhū amhākaṃ ovādaṃ karonti.', options: ['그 비구들은 우리에게 훈계를 한다', '그 비구들은 너희에게 훈계를 한다', '우리 비구들은 그들에게 훈계를 한다', '나의 비구들은 그들을 훈계한다'], answer: 0, hint: 'te = 그(지시), amhākaṃ = 우리에게' },

  // === 경전 구절 ===
  { type: 'verse', pali: 'Buddhaṃ saraṇaṃ gacchāmi\nDhammaṃ saraṇaṃ gacchāmi\nSaṅghaṃ saraṇaṃ gacchāmi', pronKo: '붓당 사라낭 갓차-미\n담망 사라낭 갓차-미\n상강 사라낭 갓차-미', translation: '나는 붓다께 귀의합니다\n나는 담마에 귀의합니다\n나는 상가에 귀의합니다', highlight: ['gacchāmi'], note: 'gacchāmi = (ahaṃ) gacchāmi — 1인칭 단수 동사에 주어 ahaṃ 생략 가능' },

  // === 마무리 ===
  { type: 'speak', pali: 'Buddhaṃ saraṇaṃ gacchāmi', pronKo: '붓당 사라낭 갓차-미' },
]
