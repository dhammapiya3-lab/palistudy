// 28과: -u/-ar 남성명사 + 친족명사
import type { StepWithoutId } from './types'

export const LESSON_25: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '28과: -u/-ar 남성 + 친족명사', subtitle: 'Puliṅga -u/-ar nāma + ñātināma', description: 'satthu/satthar(스승) 격변화\npitu/pitar(아버지) 격변화\nbhātu/bhātar(형제) 격변화\nmātu/mātar(어머니) 여성 격변화\ndhītu(딸) 격변화', icon: '👨‍👩‍👧‍👦' },

  // === satthu/satthar 격변화표 ===
  { type: 'teach-grammar', title: '-u/-ar 남성명사 격변화 (satthu 스승)', example: '주격: satthā / satthāro\n목적격: satthāraṃ / satthāro,satthāre\n도구격: satthārā / satthārehi\n여격: satthu,satthuno,satthassa / satthārānaṃ,satthānaṃ\n탈격: satthārā / satthārehi\n소유격: satthu,satthuno,satthassa / satthārānaṃ,satthānaṃ\n처소격: satthari / satthāresu\n호격: sattha / satthāro', exampleKo: '단수: satthā(주)/satthāraṃ(목)/satthārā(구·탈)\n복수: satthāro(주·목)/satthārehi(구·탈)', explanation: '-u/-ar 명사 핵심:\n• 주격 단수: -ā (장음화)\n• 목적격: -āraṃ\n• 도구격/탈격: -ārā\n• 여격/소유격: -u/-uno/-assa\n• 처소격: -ari\n• 복수: -āro/-āre/-ārehi/-ānaṃ/-āresu' },

  // === -u/-ar 명사 단어 ===
  { type: 'teach', word: 'satthu', pronKo: '삿투', meaning: '스승', icon: '🧑‍🏫', grammar: '-u/-ar 남성명사', baseForm: 'satthar', formNote: '주격: satthā / satthāro', buddhism: '붓다를 가리키는 칭호로 자주 사용' },
  { type: 'teach', word: 'kattu', pronKo: '깟뚜', meaning: '행위자', icon: '🏃', grammar: '-u/-ar 남성명사', baseForm: 'kattar', formNote: '주격: kattā / kattāro' },
  { type: 'teach', word: 'gantu', pronKo: '간뚜', meaning: '가는 자', icon: '🚶', grammar: '-u/-ar 남성명사', baseForm: 'gantar', formNote: '주격: gantā / gantāro' },
  { type: 'teach', word: 'sotu', pronKo: '소뚜', meaning: '듣는 자', icon: '👂', grammar: '-u/-ar 남성명사', baseForm: 'sotar', formNote: '주격: sotā / sotāro' },
  { type: 'teach', word: 'dātu', pronKo: '다-뚜', meaning: '주는 자', icon: '🎁', grammar: '-u/-ar 남성명사', baseForm: 'dātar', formNote: '주격: dātā / dātāro' },
  { type: 'teach', word: 'netu', pronKo: '네뚜', meaning: '이끄는 자', icon: '🧭', grammar: '-u/-ar 남성명사', baseForm: 'netar', formNote: '주격: netā / netāro' },
  { type: 'teach', word: 'vattu', pronKo: '왓뚜', meaning: '말하는 자', icon: '🗣️', grammar: '-u/-ar 남성명사', baseForm: 'vattar', formNote: '주격: vattā / vattāro' },
  { type: 'teach', word: 'jetu', pronKo: '제뚜', meaning: '승리자', icon: '🏆', grammar: '-u/-ar 남성명사', baseForm: 'jetar', formNote: '주격: jetā / jetāro' },
  { type: 'teach', word: 'bhattu', pronKo: '밧뚜', meaning: '남편', icon: '💑', grammar: '-u/-ar 남성명사', baseForm: 'bhattar', formNote: '주격: bhattā / bhattāro' },
  { type: 'teach', word: 'nattu', pronKo: '낫뚜', meaning: '손자', icon: '👶', grammar: '-u/-ar 남성명사', baseForm: 'nattar', formNote: '주격: nattā / nattāro' },

  // === pitu/pitar 격변화표 (아버지) ===
  { type: 'teach-grammar', title: '친족명사: pitu/pitar (아버지)', example: '주격: pitā / pitaro\n목적격: pitaraṃ / pitaro,pitare\n도구격: pitarā,pitunā / pitarehi,pitūhi\n여격: pitu,pituno,pitussa / pitarānaṃ,pitānaṃ,pitūnaṃ\n탈격: pitarā / pitarehi,pitūhi\n소유격: pitu,pituno,pitussa / pitarānaṃ,pitānaṃ,pitūnaṃ\n처소격: pitari / pitaresu,pitūsu\n호격: pita / pitaro', exampleKo: '단수: pitā(주)/pitaraṃ(목)/pitarā(구·탈)\n복수: pitaro(주·목)/pitarehi(구·탈)', explanation: 'pitu는 satthu와 유사하지만 모음 차이:\n• satthu → satthā (ā 장음)\n• pitu → pitā (ā 장음)\n• 처소격 단수: pitari (satthari와 동일 패턴)\n• 복수에 -ūhi/-ūnaṃ/-ūsu 형태도 가능' },

  // === bhātu/bhātar 격변화표 (형제) ===
  { type: 'teach-grammar', title: '친족명사: bhātu/bhātar (형제)', example: '주격: bhātā / bhātaro\n목적격: bhātaraṃ / bhātaro,bhātare\n도구격: bhātarā,bhātunā / bhātarehi,bhātūhi\n여격: bhātu,bhātuno,bhātussa / bhātarānaṃ,bhātānaṃ,bhātūnaṃ\n탈격: bhātarā / bhātarehi,bhātūhi\n소유격: bhātu,bhātuno,bhātussa / bhātarānaṃ,bhātānaṃ,bhātūnaṃ\n처소격: bhātari / bhātaresu,bhātūsu\n호격: bhāta / bhātaro', exampleKo: 'pitu와 완전히 동일한 패턴', explanation: 'bhātu는 pitu와 동일한 격변화:\n• 주격: bhātā / bhātaro\n• 어근 bhātar-에 격어미 부착\n• 복수 여격/소유격에 3가지 형태 가능' },

  // === mātu/mātar 격변화표 (어머니, 여성) ===
  { type: 'teach-grammar', title: '친족명사(여성): mātu/mātar (어머니)', example: '주격: mātā / mātaro\n목적격: mātaraṃ / mātaro,mātare\n도구격: mātarā,mātuyā / mātarehi,mātūhi\n여격: mātu,mātuyā / mātarānaṃ,mātānaṃ,mātūnaṃ\n탈격: mātarā,mātuyā / mātarehi,mātūhi\n소유격: mātu,mātuyā / mātarānaṃ,mātānaṃ,mātūnaṃ\n처소격: mātari / mātaresu,mātūsu\n호격: māta / mātaro', exampleKo: '단수 구~소유격에 -uyā 형태 추가(여성 특징)', explanation: 'mātu 여성명사 특징:\n• pitu와 기본 동일하나 여성이므로\n• 도구격~소유격 단수에 -uyā 형태 추가\n• 이는 -u 여성명사(dhenu)의 -uyā와 동일 패턴' },

  // === dhītu(딸) ===
  { type: 'teach', word: 'dhītu', pronKo: '디-뚜', meaning: '딸', icon: '👧', grammar: '친족 여성명사', formNote: '주격: dhītā / dhītaro\nmātu와 동일 격변화 패턴' },

  // === 친족명사 정리 ===
  { type: 'teach', word: 'pitā', pronKo: '삐따-', meaning: '아버지', icon: '👨', grammar: '친족명사 (pitu/pitar)', formNote: '여격: pitu,pituno,pitussa' },
  { type: 'teach', word: 'bhātā', pronKo: '바-따-', meaning: '형제', icon: '👦', grammar: '친족명사 (bhātu/bhātar)', formNote: '여격: bhātu,bhātuno,bhātussa' },
  { type: 'teach', word: 'mātā', pronKo: '마-따-', meaning: '어머니', icon: '👩', grammar: '친족명사 (mātu/mātar)', formNote: '여격: mātu,mātuyā' },
  { type: 'teach', word: 'bhattā', pronKo: '밧따-', meaning: '남편', icon: '💑', grammar: '-u/-ar 남성명사 (bhattu)', formNote: '주격: bhattā / bhattāro' },
  { type: 'teach', word: 'nattā', pronKo: '낫따-', meaning: '손자', icon: '👶', grammar: '-u/-ar 남성명사 (nattu)', formNote: '주격: nattā / nattāro' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Satthā bhikkhūnaṃ dhammaṃ desesi.', options: ['스승(붓다)은 비구들에게 법을 설했다', '스승들은 비구들에게 법을 설했다', '비구들은 스승에게 법을 물었다', '스승은 비구에게 법을 설했다'], answer: 0, hint: 'satthā = 스승(주격 단수), desesi = 설했다' },
  { type: 'quiz', question: '2. Pitā puttassa dhammaṃ ācikkhi.', options: ['아버지는 아들에게 법을 가르쳤다', '아들은 아버지에게 법을 가르쳤다', '아버지들은 아들들에게 법을 가르쳤다', '아버지는 아들에게 이야기를 들려주었다'], answer: 0, hint: 'pitā = 아버지(주격), puttassa = 아들에게(여격)' },
  { type: 'quiz', question: '3. Bhātā bhātuno gehaṃ gacchi.', options: ['형제는 형제의 집에 갔다', '형제들은 형제의 집에 갔다', '형제는 형제와 함께 갔다', '형제는 형제의 집에서 왔다'], answer: 0, hint: 'bhātuno = 형제의(소유격 단수)' },
  { type: 'quiz', question: '4. Mātā dhītaraṃ ovadi.', options: ['어머니는 딸을 훈계했다', '어머니는 아들을 훈계했다', '딸은 어머니를 훈계했다', '어머니들은 딸들을 훈계했다'], answer: 0, hint: 'dhītaraṃ = 딸을(목적격), ovadi = 훈계했다' },
  { type: 'quiz', question: '5. satthu의 처소격 단수는?', options: ['satthari', 'satthāre', 'satthāsu', 'satthāresu'], answer: 0, hint: '-u/-ar 명사 처소격 단수 = -ari' },
  { type: 'quiz', question: '6. Bhattā bhariyāya saddhiṃ nagaraṃ agami.', options: ['남편은 아내와 함께 도시에 갔다', '아내는 남편과 함께 도시에 갔다', '남편들은 아내들과 함께 도시에 갔다', '남편은 아내와 함께 마을에 갔다'], answer: 0, hint: 'bhattā = 남편(주격), bhariyāya saddhiṃ = 아내와 함께' },
  { type: 'quiz', question: '7. Nattā pitāmahassa santike nisīdi.', options: ['손자는 할아버지의 곁에 앉았다', '손자들은 할아버지의 곁에 앉았다', '손자는 할아버지의 집에 갔다', '할아버지는 손자의 곁에 앉았다'], answer: 0, hint: 'nattā = 손자(주격), santike = 곁에' },
  { type: 'quiz', question: '8. Sotāro satthu dhammaṃ suṇiṃsu.', options: ['듣는 자들은 스승의 법을 들었다', '듣는 자는 스승의 법을 들었다', '듣는 자들은 스승에게 법을 물었다', '스승은 듣는 자들에게 법을 설했다'], answer: 0, hint: 'sotāro = 듣는 자들(복수), satthu = 스승의(소유격)' },
  { type: 'quiz', question: '9. mātu의 도구격 단수 2가지는?', options: ['mātarā, mātuyā', 'mātāya, mātuyā', 'mātarā, mātunā', 'mātussa, mātuyā'], answer: 0, hint: '여성 친족명사: -arā(공통) + -uyā(여성 특유)' },
  { type: 'quiz', question: '10. Jetā sattūnaṃ balaṃ jini.', options: ['승리자는 적들의 군대를 이겼다', '승리자들은 적들의 군대를 이겼다', '적들은 승리자의 군대를 이겼다', '승리자는 적의 군대를 이겼다'], answer: 0, hint: 'jetā = 승리자(주격 단수), sattūnaṃ = 적들의' },

  // === 경전 구절 ===
  { type: 'verse', pali: 'Satthā bhikkhūnaṃ dhammaṃ desento anukampaṃ upādāya', pronKo: '삿타- 빅쿠-낭 담망 데센또 아누깜빵 우빠-다-야', translation: '스승은 비구들에게 법을 설하시면서 연민을 지니시고', highlight: ['Satthā', 'bhikkhūnaṃ'], note: 'satthā = satthu의 주격 단수. 붓다가 자비심으로 가르치심을 표현' },

  // === 마무리 ===
  { type: 'speak', pali: 'Satthā bhikkhūnaṃ dhammaṃ desesi', pronKo: '삿타- 빅쿠-낭 담망 데세시' },
]
