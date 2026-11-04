// 30과: -vantu/-mantu 소유 형용사
import type { StepWithoutId } from './types'

export const LESSON_27: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '30과: -vantu/-mantu 소유 형용사', subtitle: '-vantu/-mantu Kitaka', description: '-vantu: "~을 가진" (guṇavantu = 덕을 가진)\n-mantu: "~을 가진" (satimantu = 마음챙김을 가진)\n\nBhagavā는 Bhagavantu의 주격!', icon: '👑' },

  // === -vantu 남성 격변화 (guṇavantu) ===
  { type: 'teach-grammar', title: '-vantu 남성 격변화 (guṇavantu 유덕한)', example: '주격: guṇavā / guṇavanto,guṇavantā\n목적격: guṇavantaṃ / guṇavante\n도구격: guṇavatā,guṇavantena / guṇavantehi\n여격: guṇavato,guṇavantassa / guṇavataṃ,guṇavantānaṃ\n탈격: guṇavatā,guṇavantamhā / guṇavantehi\n소유격: guṇavato,guṇavantassa / guṇavataṃ,guṇavantānaṃ\n처소격: guṇavati,guṇavantamhi / guṇavantesu\n호격: guṇava,guṇavaṃ / guṇavanto,guṇavantā', exampleKo: '주격 단수: -vā (특이한 형태!)\n도구격 단수: -vatā/-vantena\n여/소유 단수: -vato/-vantassa', explanation: '-vantu 남성명사 핵심:\n• 주격 단수: -vā (어간 -vantu → -vā)\n• 주격 복수: -vanto/-vantā\n• 도구격 단수: -vatā 또는 -vantena\n• 여/소유격: -vato 또는 -vantassa\n• 처소격 단수: -vati 또는 -vantamhi\n\n-a 명사와 -nt 어간이 혼합된 패턴' },

  // === -vantu 중성 격변화 ===
  { type: 'teach-grammar', title: '-vantu 중성 격변화 (ojavantu 영양있는)', example: '주격: ojavantaṃ / ojavantā,ojavantāni\n목적격: ojavantaṃ / ojavante,ojavantāni\n(나머지 격은 남성과 동일)', exampleKo: '중성은 주격/목적격만 남성과 다르다', explanation: '중성 -vantu 핵심:\n• 주격 단수: -vantaṃ (남성 -vā와 다름)\n• 주격 복수: -vantā 또는 -vantāni\n• 나머지(도구격~처소격)는 남성과 동일\n\n중성 주격=목적격 원칙 적용' },

  // === -vantu 여성형 ===
  { type: 'teach-grammar', title: '-vantu 여성형 (-vatī/-vantī)', example: '남성: guṇavā (유덕한 남자)\n여성: guṇavatī, guṇavantī (유덕한 여자)\n\n여성형은 -ī 여성명사처럼 변화', exampleKo: '-vatī/-vantī → -ī 여성명사 패턴', explanation: '-vantu 여성형 규칙:\n• -vantu → -vatī 또는 -vantī\n• 이후 nadī(-ī 여성명사) 패턴으로 격변화\n• 주격: guṇavatī / guṇavatiyo\n• 도구격~처소격: nadī와 동일' },

  // === -vantu 형용사 단어 ===
  { type: 'teach', word: 'guṇavantu', pronKo: '구나완뚜', meaning: '유덕한, 덕이 있는', icon: '🙏', grammar: '-vantu 형용사', formNote: '남성 주격: guṇavā' },
  { type: 'teach', word: 'dhanavantu', pronKo: '다나완뚜', meaning: '부유한', icon: '💰', grammar: '-vantu 형용사', formNote: '남성 주격: dhanavā' },
  { type: 'teach', word: 'Bhagavantu', pronKo: '바가완뚜', meaning: '세존(世尊), 복된 분', icon: '🙏', grammar: '-vantu 형용사 → 존칭명사', formNote: '남성 주격: Bhagavā', buddhism: 'Bhagavā = 붓다의 호칭. 10가지 호칭 중 하나' },
  { type: 'teach', word: 'yasavantu', pronKo: '야사완뚜', meaning: '유명한, 명성있는', icon: '⭐', grammar: '-vantu 형용사', formNote: '남성 주격: yasavā' },
  { type: 'teach', word: 'sīlavantu', pronKo: '시-라완뚜', meaning: '계행이 있는, 덕있는', icon: '📿', grammar: '-vantu 형용사', formNote: '남성 주격: sīlavā', buddhism: '오계(pañcasīla)를 지키는 자' },
  { type: 'teach', word: 'saddhāvantu', pronKo: '삿다-완뚜', meaning: '믿음이 있는', icon: '🕊️', grammar: '-vantu 형용사', formNote: '남성 주격: saddhāvā', buddhism: 'saddhā(믿음) = 오근(五根) 중 하나' },
  { type: 'teach', word: 'balavantu', pronKo: '발라완뚜', meaning: '힘센, 강한', icon: '💪', grammar: '-vantu 형용사', formNote: '남성 주격: balavā' },
  { type: 'teach', word: 'paññavantu', pronKo: '빤냐완뚜', meaning: '현명한', icon: '🧠', grammar: '-vantu 형용사', formNote: '남성 주격: paññavā', buddhism: 'paññā(지혜) = 삼학(三學)의 완성' },
  { type: 'teach', word: 'himavantu', pronKo: '히마완뚜', meaning: '눈(雪)이 있는 → 히말라야', icon: '🏔️', grammar: '-vantu 형용사 → 고유명사', formNote: '남성 주격: himavā', buddhism: 'Himavā = 히말라야 산 (히마와-)' },

  // === -mantu 형용사 단어 ===
  { type: 'teach-grammar', title: '-mantu 형용사 (-vantu와 동일 패턴)', example: '남성 주격: satimā (← satimantu)\n도구격: satimatā, satimantena\n여/소유격: satimato, satimantassa\n처소격: satimati, satimantamhi', exampleKo: '-mantu는 -vantu와 완전히 같은 변화', explanation: '-mantu = -vantu와 동일 패턴:\n• v → m 만 다름\n• 주격 -mā, 도구격 -matā/-mantena\n• 여성: -matī/-mantī\n\n-vantu: 주로 명사 + vantu\n-mantu: 주로 명사 + mantu' },

  { type: 'teach', word: 'satimantu', pronKo: '사띠만뚜', meaning: '마음챙김이 있는', icon: '🧘', grammar: '-mantu 형용사', formNote: '남성 주격: satimā', buddhism: 'sati(마음챙김) = 사념처(四念處)의 핵심. satimā = 사띠마-' },
  { type: 'teach', word: 'cakkhumantu', pronKo: '짝쿠만뚜', meaning: '눈이 있는 → 통찰력 있는', icon: '👁️', grammar: '-mantu 형용사', formNote: '남성 주격: cakkhumā', buddhism: '붓다의 별칭으로 사용. cakkhumā = 짝쿠마-' },
  { type: 'teach', word: 'bhānumantu', pronKo: '바-누만뚜', meaning: '빛나는 → 태양', icon: '☀️', grammar: '-mantu 형용사', formNote: '남성 주격: bhānumā' },
  { type: 'teach', word: 'buddhimantu', pronKo: '붓디만뚜', meaning: '총명한, 지혜로운', icon: '🎓', grammar: '-mantu 형용사', formNote: '남성 주격: buddhimā' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Bhagavā Sāvatthiyaṃ viharati.', options: ['세존께서는 사왓티에 머문다', '세존께서는 사왓티로 간다', '세존들께서는 사왓티에 머문다', '세존께서는 사왓티에서 떠난다'], answer: 0, hint: 'Bhagavā = Bhagavantu 주격, viharati = 머물다' },
  { type: 'quiz', question: '2. Bhagavantu의 도구격 단수는?', options: ['Bhagavatā', 'Bhagavā', 'Bhagavantaṃ', 'Bhagavato'], answer: 0, hint: '-vantu 도구격 단수 = -vatā 또는 -vantena' },
  { type: 'quiz', question: '3. Bhagavatā desitaṃ dhammaṃ.', options: ['세존에 의해 설해진 법', '세존이 설하는 법', '세존에게 설해진 법', '세존의 법을 설한다'], answer: 0, hint: 'Bhagavatā = 세존에 의해(도구격), desitaṃ = 설해진(과거분사)' },
  { type: 'quiz', question: '4. Sīlavā bhikkhu piṇḍāya carati.', options: ['계행있는 비구는 탁발하러 다닌다', '비구는 계행을 위해 다닌다', '계행있는 비구들은 탁발하러 다닌다', '계행있는 비구는 걸식을 받는다'], answer: 0, hint: 'sīlavā = sīlavantu 주격, piṇḍāya = 탁발을 위해' },
  { type: 'quiz', question: '5. guṇavantu의 여성 주격 단수는?', options: ['guṇavatī 또는 guṇavantī', 'guṇavā', 'guṇavantaṃ', 'guṇavatā'], answer: 0, hint: '-vantu 여성형 = -vatī/-vantī' },
  { type: 'quiz', question: '6. Dhanavanto dānaṃ denti.', options: ['부유한 이들은 보시를 행한다', '부유한 이는 보시를 행한다', '부유한 이들은 재산을 준다', '부유한 이들은 보시를 받는다'], answer: 0, hint: 'dhanavanto = dhanavantu 복수 주격' },
  { type: 'quiz', question: '7. Satimā bhikkhu sammā paṭipajjati.', options: ['마음챙김 있는 비구는 바르게 수행한다', '비구는 마음챙김을 수행한다', '마음챙김 있는 비구들은 수행한다', '마음챙김 있는 비구는 앉아 있다'], answer: 0, hint: 'satimā = satimantu 주격, sammā = 바르게' },
  { type: 'quiz', question: '8. Bhagavato sāsanaṃ suṇāma.', options: ['세존의 가르침을 우리는 듣는다', '세존이 가르침을 듣는다', '세존에게 가르침을 말한다', '세존의 가르침을 그는 듣는다'], answer: 0, hint: 'Bhagavato = 세존의(소유격), suṇāma = 듣다(1인칭 복수)' },
  { type: 'quiz', question: '9. Himavā pabbatānaṃ rājā.', options: ['히말라야는 산들의 왕이다', '히말라야에 왕이 있다', '눈 덮인 산이 왕이다', '히말라야는 산의 왕들이다'], answer: 0, hint: 'Himavā = himavantu 주격, rājā = 왕' },
  { type: 'quiz', question: '10. Balavā puriso ariṃ parājeti.', options: ['힘센 사람은 적을 패배시킨다', '힘센 사람들은 적을 패배시킨다', '사람은 힘세게 적을 이긴다', '힘센 사람은 적에게 진다'], answer: 0, hint: 'balavā = balavantu 주격, parājeti = 패배시키다' },

  // === 경전 구절 ===
  { type: 'verse', pali: 'Evaṃ me sutaṃ:\nekaṃ samayaṃ Bhagavā\nSāvatthiyaṃ viharati\nJetavane Anāthapiṇḍikassa ārāme.', pronKo: '에왕 메 수땅\n에깡 사마양 바가와-\n사-왓티양 위하라띠\n제따와네 아나-타삔디깟사 아-라-메', translation: '이와 같이 나는 들었다:\n한때 세존께서\n사왓티의\n제따 숲 아나타핀디카의 동산에 머무셨다.', highlight: ['Bhagavā', 'Bhagavatā'], note: '경전 첫 정형구. Bhagavā = Bhagavantu의 주격 단수. 거의 모든 경이 이 문장으로 시작' },

  { type: 'verse', pali: 'Bhagavatā desitaṃ dhammaṃ\ndhāremi.', pronKo: '바가와따- 데시땅 담망\n다-레미', translation: '세존에 의해 설해진 법을\n나는 수지한다.', highlight: ['Bhagavatā', 'desitaṃ'], note: 'Bhagavatā = 도구격(~에 의해). desitaṃ = 과거분사(설해진). 수동 구문의 전형' },

  // === 마무리 ===
  { type: 'speak', pali: 'Evaṃ me sutaṃ: ekaṃ samayaṃ Bhagavā Sāvatthiyaṃ viharati', pronKo: '에왕 메 수땅: 에깡 사마양 바가와- 사-왓티양 위하라띠' },
]
