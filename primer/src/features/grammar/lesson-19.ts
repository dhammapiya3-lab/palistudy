// 20과: -i/-ī 여성명사
import type { StepWithoutId } from './types'

export const LESSON_19: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '20과: -i/-ī 여성명사', subtitle: 'Itthiliṅga -i/-ī nāma', description: '-i 여성명사 격변화 (bhūmi 기준)\n-ī 여성명사 격변화 (nadī 기준)\n새 동사 학습', icon: '👩' },

  // === bhūmi 격변화표 ===
  { type: 'teach-grammar', title: '-i 여성명사 격변화 (bhūmi)', example: '주격: bhūmi / bhūmiyo\n목적격: bhūmiṃ / bhūmiyo\n도구격: bhūmiyā / bhūmīhi\n여격: bhūmiyā / bhūmīnaṃ\n탈격: bhūmiyā / bhūmīhi\n소유격: bhūmiyā / bhūmīnaṃ\n처소격: bhūmiyā,bhūmiyaṃ / bhūmīsu\n호격: bhūmi / bhūmiyo', exampleKo: '단수: 도구격~처소격 모두 -iyā\n복수: -iyo/-īhi/-īnaṃ/-īsu', explanation: '-i 여성명사 핵심:\n• 단수: 도구격·여격·탈격·소유격·처소격 = bhūmiyā\n• 복수 주격/목적격 = -iyo\n• 복수 도구격/탈격 = -īhi\n• 복수 여격/소유격 = -īnaṃ\n• 복수 처소격 = -īsu' },

  // === -i 여성명사 단어 ===
  { type: 'teach', word: 'bhūmi', pronKo: '부-미', meaning: '땅, 대지', icon: '🌍', grammar: '-i 여성명사', formNote: '주격: bhūmi / bhūmiyo' },
  { type: 'teach', word: 'aṅguli', pronKo: '앙굴리', meaning: '손가락', icon: '☝️', grammar: '-i 여성명사', formNote: '주격: aṅguli / aṅguliyo' },
  { type: 'teach', word: 'aṭavi', pronKo: '아따위', meaning: '숲', icon: '🌲', grammar: '-i 여성명사', formNote: '주격: aṭavi / aṭaviyo' },
  { type: 'teach', word: 'ratti', pronKo: '랏띠', meaning: '밤', icon: '🌙', grammar: '-i 여성명사', formNote: '주격: ratti / rattiyo' },
  { type: 'teach', word: 'doṇi', pronKo: '도니', meaning: '배(船)', icon: '⛵', grammar: '-i 여성명사', formNote: '주격: doṇi / doṇiyo' },
  { type: 'teach', word: 'yuvati', pronKo: '유와띠', meaning: '하녀, 젊은 여자', icon: '👧', grammar: '-i 여성명사', formNote: '주격: yuvati / yuvatiyo' },
  { type: 'teach', word: 'yaṭṭhi', pronKo: '얏티', meaning: '지팡이', icon: '🦯', grammar: '-i 여성명사', formNote: '주격: yaṭṭhi / yaṭṭhiyo' },
  { type: 'teach', word: 'asani', pronKo: '아사니', meaning: '번개', icon: '⚡', grammar: '-i 여성명사', formNote: '주격: asani / asaniyo' },
  { type: 'teach', word: 'iddhi', pronKo: '잇디', meaning: '신통력', icon: '✨', grammar: '-i 여성명사', formNote: '주격: iddhi / iddhiyo', buddhism: 'iddhipāda = 신족(神足), 사여의족' },

  // === nadī 격변화표 ===
  { type: 'teach-grammar', title: '-ī 여성명사 격변화 (nadī)', example: '주격: nadī / nadiyo,najjo\n목적격: nadiṃ / nadiyo,najjo\n도구격: nadiyā / nadīhi\n여격: nadiyā / nadīnaṃ\n탈격: nadiyā / nadīhi\n소유격: nadiyā / nadīnaṃ\n처소격: nadiyā,nadiyaṃ / nadīsu\n호격: nadi / nadiyo', exampleKo: '단수: -iyā 형태 / 복수: -iyo,-īhi,-īnaṃ,-īsu', explanation: '-ī 여성명사는 -i형과 유사하나\n주격 단수가 -ī (장음)입니다.\n\n핵심 차이:\n• -i형: bhūmi (주격 단수 -i)\n• -ī형: nadī (주격 단수 -ī)\n• 격변화 패턴은 거의 동일' },

  // === -ī 여성명사 단어 ===
  { type: 'teach', word: 'nadī', pronKo: '나디-', meaning: '강', icon: '🏞️', grammar: '-ī 여성명사', formNote: '주격: nadī / nadiyo' },
  { type: 'teach', word: 'nārī / itthī', pronKo: '나-리- / 잇티-', meaning: '여자', icon: '👩', grammar: '-ī 여성명사', formNote: '주격: nārī / nāriyo\nitthī / itthiyo' },
  { type: 'teach', word: 'taruṇī', pronKo: '따루니-', meaning: '젊은 여자', icon: '👩‍🦱', grammar: '-ī 여성명사', formNote: '주격: taruṇī / taruṇiyo' },
  { type: 'teach', word: 'bhaginī', pronKo: '바기니-', meaning: '여동생, 자매', icon: '👭', grammar: '-ī 여성명사', formNote: '주격: bhaginī / bhaginiyo' },
  { type: 'teach', word: 'vāpī', pronKo: '와-삐-', meaning: '물탱크, 저수지', icon: '🏊', grammar: '-ī 여성명사', formNote: '주격: vāpī / vāpiyo' },
  { type: 'teach', word: 'pokkharaṇī', pronKo: '뽁카라니-', meaning: '연못', icon: '🪷', grammar: '-ī 여성명사', formNote: '주격: pokkharaṇī / pokkharaṇiyo' },
  { type: 'teach', word: 'kadalī', pronKo: '까달리-', meaning: '바나나', icon: '🍌', grammar: '-ī 여성명사', formNote: '주격: kadalī / kadaliyo' },
  { type: 'teach', word: 'gāvī', pronKo: '가-위-', meaning: '암소', icon: '🐄', grammar: '-ī 여성명사', formNote: '주격: gāvī / gāviyo' },
  { type: 'teach', word: 'rājinī / devī', pronKo: '라-지니- / 데위-', meaning: '왕비', icon: '👑', grammar: '-ī 여성명사', formNote: '주격: rājinī / rājiniyo\ndevī / deviyo' },
  { type: 'teach', word: 'kumārī', pronKo: '꾸마-리-', meaning: '소녀', icon: '👧', grammar: '-ī 여성명사', formNote: '주격: kumārī / kumāriyo' },

  // === 동사 ===
  { type: 'teach', word: 'vyākaroti', pronKo: '위야-까로띠', meaning: '해답하다, 수기하다', icon: '📖', grammar: '동사 · 현재 3인칭 단수', formNote: '복수: vyākaronti\nvi + ā + kar', buddhism: 'vyākaraṇa = 수기(授記)' },
  { type: 'teach', word: 'pattheti', pronKo: '빳테띠', meaning: '원하다, 발원하다', icon: '🙏', grammar: '동사 · 현재 3인칭 단수', formNote: '복수: patthenti\npa + atth' },
  { type: 'teach', word: 'vissajjeti', pronKo: '윗삿제띠', meaning: '해답하다, 보내다', icon: '💬', grammar: '동사 · 현재 3인칭 단수', formNote: '복수: vissajjenti\nvi + sajj(풀다)' },
  { type: 'teach', word: 'āroceti', pronKo: '아-로쩨띠', meaning: '알리다, 보고하다', icon: '📢', grammar: '동사 · 현재 3인칭 단수', formNote: '복수: ārocenti\nā + ruc(빛나다)' },
  { type: 'teach', word: 'muñcati', pronKo: '문짜띠', meaning: '풀다, 놓아주다', icon: '🔓', grammar: '동사 · 현재 3인칭 단수', formNote: '복수: muñcanti\nmuc(풀다)', buddhism: 'vimutti = 해탈' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Nadiyā jalaṃ pibanti gāviyo.', options: ['암소들은 강에서 물을 마신다', '암소는 강에서 물을 마신다', '암소들은 연못에서 물을 마신다', '암소들은 강으로 물을 가져온다'], answer: 0, hint: 'nadiyā = 강에서(처소격), gāviyo = 암소들(복수)' },
  { type: 'quiz', question: '2. Kumārī pokkharaṇiyā pupphāni saṃharati.', options: ['소녀는 연못에서 꽃들을 모은다', '소녀들은 연못에서 꽃을 모은다', '소녀는 강에서 꽃들을 모은다', '소녀는 연못에서 풀을 모은다'], answer: 0, hint: 'pokkharaṇiyā = 연못에서(처소격)' },
  { type: 'quiz', question: '3. bhūmi의 소유격 단수는?', options: ['bhūmiyā', 'bhūmissa', 'bhūmīnaṃ', 'bhūmiyaṃ'], answer: 0, hint: '-i 여성명사 단수: 도구격~처소격 모두 -iyā' },
  { type: 'quiz', question: '4. Nāriyo rattiṃ gehesu vasanti.', options: ['여자들은 밤에 집들에서 산다', '여자는 밤에 집에서 산다', '여자들은 낮에 집들에서 산다', '여자들은 밤에 숲에서 산다'], answer: 0, hint: 'rattiṃ = 밤에(목적격=시간), gehesu = 집들에서' },
  { type: 'quiz', question: '5. Bhaginī bhikkhussa dānaṃ deti.', options: ['여동생은 비구에게 보시를 행한다', '여동생들은 비구에게 보시를 행한다', '여동생은 비구의 보시를 받는다', '자매는 비구와 보시를 행한다'], answer: 0, hint: 'bhaginī = 여동생(단수), bhikkhussa = 비구에게' },
  { type: 'quiz', question: '6. nadī의 복수 처소격은?', options: ['nadīsu', 'nadiyā', 'nadiyo', 'nadīhi'], answer: 0, hint: '-ī 여성명사 복수 처소격 = -īsu' },
  { type: 'quiz', question: '7. Devī Buddhaṃ vandati.', options: ['왕비는 붓다를 경배한다', '왕비들은 붓다를 경배한다', '여왕은 붓다에게 묻는다', '왕비는 붓다를 본다'], answer: 0, hint: 'devī = 왕비(단수), vandati = 경배하다' },
  { type: 'quiz', question: '8. Yuvatiyo doṇiyā nadiṃ taranti.', options: ['하녀들은 배로 강을 건넌다', '하녀는 배로 강을 건넌다', '하녀들은 배에서 강을 본다', '하녀들은 배로 바다를 건넌다'], answer: 0, hint: 'doṇiyā = 배로(도구격), nadiṃ = 강을(목적격)' },
  { type: 'quiz', question: '9. Ācariyo iddhiṃ āroceti.', options: ['스승은 신통력을 알린다', '스승은 신통력을 본다', '스승들은 신통력을 알린다', '스승은 신통력을 행한다'], answer: 0, hint: 'iddhiṃ = 신통력을(목적격), āroceti = 알리다' },
  { type: 'quiz', question: '10. Taruṇī aṭaviyā pupphāni saṃharati.', options: ['젊은 여자는 숲에서 꽃들을 모은다', '젊은 여자들은 숲에서 꽃을 모은다', '젊은 여자는 숲으로 꽃들을 가져간다', '젊은 여자는 공원에서 꽃들을 모은다'], answer: 0, hint: 'aṭaviyā = 숲에서(처소격)' },

  // === 마무리 ===
  { type: 'speak', pali: 'Nadiyā jalaṃ pibanti gāviyo', pronKo: '나디야- 잘랑 삐반띠 가-위요' },
]
