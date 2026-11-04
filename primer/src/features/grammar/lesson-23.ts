// 24-26과: -u/-i/-ī 남성명사 + -u 여성명사
import type { StepWithoutId } from './types'

export const LESSON_23: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '24-26과: -u/-i/-ī 남성명사 + -u 여성명사', subtitle: 'Puliṅga -i/-ī/-u + Itthiliṅga -u nāma', description: '-u 여성명사 (dhenu 기준)\n-i 남성명사 (aggi 기준)\n-ī 남성명사 (pakkhī 기준)\n\n3과 통합 학습', icon: '📚' },

  // === -u 여성명사 격변화 (dhenu) ===
  { type: 'teach-grammar', title: '-u 여성명사 격변화 (dhenu 소)', example: '주격: dhenu / dhenuyo\n목적격: dhenuṃ / dhenuyo\n도구격: dhenuyā / dhenūhi\n여격: dhenuyā / dhenūnaṃ\n탈격: dhenuyā / dhenūhi\n소유격: dhenuyā / dhenūnaṃ\n처소격: dhenuyā,dhenuyaṃ / dhenūsu\n호격: dhenu / dhenuyo', exampleKo: '단수: -uyā (구~처소격)\n복수: -uyo/-ūhi/-ūnaṃ/-ūsu', explanation: '-u 여성명사는 -i 여성명사(bhūmi)와 패턴 동일:\n• 단수 도구격~처소격 = -uyā\n• 복수 주격/목적격 = -uyo\n• 복수 도구격/탈격 = -ūhi\n• 복수 여격/소유격 = -ūnaṃ\n• 복수 처소격 = -ūsu' },

  // === -u 여성명사 단어 ===
  { type: 'teach', word: 'dhenu', pronKo: '데누', meaning: '(젖 짜는) 소', icon: '🐄', grammar: '-u 여성명사', formNote: '주격: dhenu / dhenuyo' },
  { type: 'teach', word: 'yāgu', pronKo: '야-구', meaning: '죽(粥)', icon: '🥣', grammar: '-u 여성명사', formNote: '주격: yāgu / yāguyo' },
  { type: 'teach', word: 'kāsu', pronKo: '까-수', meaning: '구덩이', icon: '🕳️', grammar: '-u 여성명사', formNote: '주격: kāsu / kāsuyo' },
  { type: 'teach', word: 'vijju', pronKo: '윗주', meaning: '번개', icon: '⚡', grammar: '-u 여성명사', formNote: '주격: vijju / vijjuyo' },
  { type: 'teach', word: 'rajju', pronKo: '랏주', meaning: '밧줄', icon: '🪢', grammar: '-u 여성명사', formNote: '주격: rajju / rajjuyo' },
  { type: 'teach', word: 'dhātu', pronKo: '다-뚜', meaning: '요소, 계(界)', icon: '🔬', grammar: '-u 여성명사', formNote: '주격: dhātu / dhātuyo', buddhism: '18계(dhātu): 6근+6경+6식' },
  { type: 'teach', word: 'sassu', pronKo: '삿수', meaning: '시어머니', icon: '👵', grammar: '-u 여성명사', formNote: '주격: sassu / sassuyo' },
  { type: 'teach', word: 'vadhū', pronKo: '와두-', meaning: '며느리', icon: '👰', grammar: '-u 여성명사', formNote: '주격: vadhū / vadhuyo' },

  // === -i 남성명사 격변화 (aggi) ===
  { type: 'teach-grammar', title: '-i 남성명사 격변화 (aggi 불)', example: '주격: aggi / aggī,aggiyo\n목적격: aggiṃ / aggī,aggiyo\n도구격: agginā / aggīhi\n여격: aggino,aggissa / aggīnaṃ\n탈격: agginā,aggimhā / aggīhi\n소유격: aggino,aggissa / aggīnaṃ\n처소격: aggimhi,aggismiṃ / aggīsu\n호격: aggi / aggī,aggiyo', exampleKo: '단수: -inā(도구격), -ino/-issa(여/소유)\n복수: -ī/-īhi/-īnaṃ/-īsu', explanation: '-i 남성명사 핵심:\n• 도구격 단수: -inā (narena와 대응)\n• 여격/소유격 단수: -ino 또는 -issa\n• 탈격: -inā 또는 -imhā\n• 처소격: -imhi 또는 -ismiṃ\n• 복수: -ī/-īhi/-īnaṃ/-īsu' },

  // === -i 남성명사 단어 ===
  { type: 'teach', word: 'aggi', pronKo: '앗기', meaning: '불', icon: '🔥', grammar: '-i 남성명사', formNote: '주격: aggi / aggī' },
  { type: 'teach', word: 'muni', pronKo: '무니', meaning: '성자, 무니', icon: '🧘', grammar: '-i 남성명사', formNote: '주격: muni / munī', buddhism: 'Sakyamuni = 석가모니(석가족의 성자)' },
  { type: 'teach', word: 'kavi', pronKo: '까위', meaning: '시인', icon: '✍️', grammar: '-i 남성명사', formNote: '주격: kavi / kavī' },
  { type: 'teach', word: 'ari', pronKo: '아리', meaning: '적(敵)', icon: '⚔️', grammar: '-i 남성명사', formNote: '주격: ari / arī' },
  { type: 'teach', word: 'gahapati', pronKo: '가하빠띠', meaning: '가장, 거사', icon: '🏠', grammar: '-i 남성명사', formNote: '주격: gahapati / gahapatī', buddhism: '재가 신자 중 유력자' },
  { type: 'teach', word: 'vyādhi', pronKo: '뱌-디', meaning: '병, 질병', icon: '🤒', grammar: '-i 남성명사', formNote: '주격: vyādhi / vyādhī', buddhism: '사문유관: 노병사(jarā, vyādhi, maraṇa)' },
  { type: 'teach', word: 'maṇi', pronKo: '마니', meaning: '보석', icon: '💎', grammar: '-i 남성명사', formNote: '주격: maṇi / maṇī' },
  { type: 'teach', word: 'asi', pronKo: '아시', meaning: '칼', icon: '🗡️', grammar: '-i 남성명사', formNote: '주격: asi / asī' },

  // === -ī 남성명사 격변화 (pakkhī) ===
  { type: 'teach-grammar', title: '-ī 남성명사 격변화 (pakkhī 새)', example: '주격: pakkhī / pakkhī,pakkhino\n목적격: pakkhiṃ,pakkhiṃaṃ / pakkhī,pakkhino\n도구격: pakkhinā / pakkhīhi\n여격: pakkhino,pakkhissa / pakkhīnaṃ\n탈격: pakkhinā,pakkhimhā / pakkhīhi\n소유격: pakkhino,pakkhissa / pakkhīnaṃ\n처소격: pakkhimhi,pakkhismiṃ / pakkhīsu\n호격: pakkhi / pakkhī,pakkhino', exampleKo: '-i 남성과 유사, 주격이 -ī(장음)', explanation: '-ī 남성명사는 -i 남성과 거의 동일:\n• 주격 단수: -ī (장음)\n• 나머지 격변화는 -i 남성과 같은 패턴\n\n주요 차이:\n• -i형: aggi (주격 -i 단음)\n• -ī형: pakkhī (주격 -ī 장음)' },

  // === -ī 남성명사 단어 ===
  { type: 'teach', word: 'pakkhī', pronKo: '빡키-', meaning: '새', icon: '🐦', grammar: '-ī 남성명사', formNote: '주격: pakkhī / pakkhī,pakkhino' },
  { type: 'teach', word: 'hatthī', pronKo: '핫티-', meaning: '코끼리', icon: '🐘', grammar: '-ī 남성명사', formNote: '주격: hatthī / hatthī,hatthino' },
  { type: 'teach', word: 'seṭṭhī', pronKo: '셋티-', meaning: '장자(長者)', icon: '💰', grammar: '-ī 남성명사', formNote: '주격: seṭṭhī / seṭṭhī,seṭṭhino' },
  { type: 'teach', word: 'sukhī', pronKo: '수키-', meaning: '행복한 자', icon: '😊', grammar: '-ī 남성명사', formNote: '주격: sukhī / sukhī,sukhino' },
  { type: 'teach', word: 'vaḍḍhakī', pronKo: '왓다끼-', meaning: '목수', icon: '🪚', grammar: '-ī 남성명사', formNote: '주격: vaḍḍhakī / vaḍḍhakī,vaḍḍhakino' },

  // === 연습문제 15개 (3과 합산) ===
  { type: 'quiz', question: '1. Dhenuyo khette tiṇaṃ khādanti.', options: ['소들은 들에서 풀을 먹는다', '소는 들에서 풀을 먹는다', '소들은 숲에서 풀을 먹는다', '소들은 들에서 물을 마신다'], answer: 0, hint: 'dhenuyo = 소들(복수), khādanti = 먹다' },
  { type: 'quiz', question: '2. dhenu의 소유격 단수는?', options: ['dhenuyā', 'dhenussa', 'dhenūnaṃ', 'dhenuno'], answer: 0, hint: '-u 여성명사 단수 구~처소격 = -uyā' },
  { type: 'quiz', question: '3. Muni araññe viharati.', options: ['성자는 숲에서 머문다', '성자들은 숲에서 머문다', '성자는 숲으로 간다', '성자는 마을에서 머문다'], answer: 0, hint: 'muni = 성자(단수), araññe = 숲에서' },
  { type: 'quiz', question: '4. aggi의 도구격 단수는?', options: ['agginā', 'aggena', 'aggissa', 'aggīhi'], answer: 0, hint: '-i 남성명사 도구격 단수 = -inā' },
  { type: 'quiz', question: '5. Hatthī nagaraṃ gacchati.', options: ['코끼리는 도시로 간다', '코끼리들은 도시로 간다', '코끼리는 도시에서 온다', '코끼리는 숲으로 간다'], answer: 0, hint: 'hatthī = 코끼리(단수), nagaraṃ = 도시로' },
  { type: 'quiz', question: '6. Vadhū sassuyā saha vasati.', options: ['며느리는 시어머니와 함께 산다', '시어머니는 며느리와 함께 산다', '며느리들은 시어머니와 함께 산다', '며느리는 시어머니의 집에 산다'], answer: 0, hint: 'sassuyā = 시어머니와(도구격), saha = 함께' },
  { type: 'quiz', question: '7. Kavī gītaṃ likhanti.', options: ['시인들은 노래를 쓴다', '시인은 노래를 쓴다', '시인들은 책을 쓴다', '시인들은 노래를 부른다'], answer: 0, hint: 'kavī = 시인들(복수), gītaṃ = 노래를' },
  { type: 'quiz', question: '8. Seṭṭhī bhikkhūnaṃ dānaṃ deti.', options: ['장자는 비구들에게 보시를 행한다', '장자들은 비구들에게 보시를 행한다', '장자는 비구에게 보시를 행한다', '비구들은 장자에게 보시를 받는다'], answer: 0, hint: 'seṭṭhī = 장자(단수), bhikkhūnaṃ = 비구들에게' },
  { type: 'quiz', question: '9. "dhātu"는 어떤 명사 유형인가?', options: ['-u 여성명사', '-u 남성명사', '-ū 여성명사', '-i 여성명사'], answer: 0, hint: 'dhātu = 요소/계(界), 여성명사' },
  { type: 'quiz', question: '10. Pakkhino rukkhesu nisīdanti.', options: ['새들은 나무들에 앉는다', '새는 나무에 앉는다', '새들은 나무에서 날아간다', '새들은 나무들 아래 앉는다'], answer: 0, hint: 'pakkhino = 새들(복수), rukkhesu = 나무들에' },
  { type: 'quiz', question: '11. Gahapati Buddhaṃ vandati.', options: ['거사는 붓다를 경배한다', '거사들은 붓다를 경배한다', '거사는 붓다에게 묻는다', '거사는 붓다를 본다'], answer: 0, hint: 'gahapati = 거사(단수)' },
  { type: 'quiz', question: '12. aggi의 처소격 단수는?', options: ['aggimhi 또는 aggismiṃ', 'agge', 'aggiyā', 'aggīsu'], answer: 0, hint: '-i 남성명사 처소격 = -imhi/-ismiṃ' },
  { type: 'quiz', question: '13. Vaḍḍhakī gehaṃ karoti.', options: ['목수는 집을 짓는다', '목수들은 집을 짓는다', '목수는 집에서 일한다', '목수는 집을 수리한다'], answer: 0, hint: 'vaḍḍhakī = 목수(단수), karoti = 만들다/짓다' },
  { type: 'quiz', question: '14. Yāguṃ pacanti dāsiyo.', options: ['하녀들은 죽을 끓인다', '하녀는 죽을 끓인다', '하녀들은 밥을 짓는다', '하녀들은 죽을 먹는다'], answer: 0, hint: 'yāguṃ = 죽을(목적격), dāsiyo = 하녀들' },
  { type: 'quiz', question: '15. Sukhī puriso dhammaṃ suṇāti.', options: ['행복한 사람은 법을 듣는다', '행복한 사람들은 법을 듣는다', '사람은 행복한 법을 듣는다', '행복한 사람은 법을 설한다'], answer: 0, hint: 'sukhī = 행복한 자(남성 단수)' },

  // === 마무리 ===
  { type: 'speak', pali: 'Muni araññe viharati', pronKo: '무니 아란녜 위하라띠' },
]
