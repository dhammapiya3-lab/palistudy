// 21과: 현재분사 여성형 -ntī/-mānā
import type { StepWithoutId } from './types'

export const LESSON_20: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '21과: 현재분사 여성형', subtitle: 'Itthiliṅga vattamāna kicca', description: '현재분사 여성형:\n-ntī (능동): pacantī = 요리하는 (여자)\n-mānā (중간): pacamānā = 요리하는 (여자)\n\npacantī 격변화표 학습', icon: '👩‍🍳' },

  // === 현재분사 여성형 문법 ===
  { type: 'teach-grammar', title: '현재분사 여성형 -ntī / -mānā', example: 'pac → pacantī / pacamānā (요리하는 여자)\ngam → gacchantī / gacchamānā (가고 있는 여자)\nṭhā → tiṭṭhantī / tiṭṭhamānā (서 있는 여자)', exampleKo: '-ntī = 능동 현재분사 여성\n-mānā = 중간 현재분사 여성', explanation: '남성 현재분사 -nt(a) → 여성 -ntī:\n• pacanto (요리하는 남자) → pacantī (요리하는 여자)\n• gacchanto → gacchantī\n\n남성 -māna → 여성 -mānā:\n• pacamāno → pacamānā\n\n-ntī와 -mānā는 의미 동일,\n형태만 다릅니다.' },

  // === pacantī 격변화표 ===
  { type: 'teach-grammar', title: 'pacantī 격변화표 (여성 현재분사)', example: '주격: pacantī / pacantiyo\n목적격: pacantiṃ / pacantiyo\n도구격: pacantiyā / pacantīhi\n여격: pacantiyā / pacantīnaṃ\n탈격: pacantiyā / pacantīhi\n소유격: pacantiyā / pacantīnaṃ\n처소격: pacantiyā,pacantiyaṃ / pacantīsu\n호격: pacanti / pacantiyo', exampleKo: '-ī 여성명사와 동일한 격변화 패턴', explanation: '여성 현재분사 -ntī는\n-ī 여성명사(nadī형)와 동일하게 변화합니다.\n\n단수: -iyā (도구격~처소격)\n복수: -iyo(주격/목적격), -īhi, -īnaṃ, -īsu\n\n-mānā는 -ā 여성명사와 동일하게 변화:\n주격: pacamānā / pacamānāyo\n목적격: pacamānaṃ / pacamānāyo' },

  // === 단어 학습 ===
  { type: 'teach', word: 'pacantī', pronKo: '빠짠띠-', meaning: '요리하는 (여자)', icon: '👩‍🍳', grammar: '여성 현재분사 (-ntī)', formNote: 'pac + antī\n복수: pacantiyo' },
  { type: 'teach', word: 'pacamānā', pronKo: '빠짜마-나-', meaning: '요리하는 (여자)', icon: '👩‍🍳', grammar: '여성 현재분사 (-mānā)', formNote: 'pac + amānā\n= pacantī와 동일 의미' },
  { type: 'teach', word: 'gacchantī', pronKo: '갓찬띠-', meaning: '가고 있는 (여자)', icon: '🚶‍♀️', grammar: '여성 현재분사', formNote: 'gam → gacch + antī' },
  { type: 'teach', word: 'nisīdantī', pronKo: '니시-단띠-', meaning: '앉는 (여자)', icon: '🧘‍♀️', grammar: '여성 현재분사', formNote: 'nisīd + antī' },
  { type: 'teach', word: 'dhāvantī', pronKo: '다-완띠-', meaning: '달리는 (여자)', icon: '🏃‍♀️', grammar: '여성 현재분사', formNote: 'dhāv + antī' },
  { type: 'teach', word: 'hasantī', pronKo: '하산띠-', meaning: '웃는 (여자)', icon: '😄', grammar: '여성 현재분사', formNote: 'has + antī' },
  { type: 'teach', word: 'rodantī', pronKo: '로단띠-', meaning: '울고 있는 (여자)', icon: '😢', grammar: '여성 현재분사', formNote: 'rud → rod + antī' },

  // === 예문 (단수 + 복수) ===
  { type: 'verse', pali: 'Pacantī nārī gehasmiṃ vasati.', pronKo: '빠짠띠- 나-리- 게하스밍 와사띠', translation: '요리하는 여자는 집에서 산다.', highlight: ['Pacantī'], note: 'pacantī = 요리하는 (여성 현재분사 단수)' },
  { type: 'verse', pali: 'Pacantiyo nāriyo gehesu vasanti.', pronKo: '빠짠띠요 나-리요 게헤수 와산띠', translation: '요리하는 여자들은 집들에서 산다.', highlight: ['Pacantiyo'], note: 'pacantiyo = 요리하는 (여성 현재분사 복수)' },
  { type: 'verse', pali: 'Gacchantī kumārī vihāraṃ passati.', pronKo: '갓찬띠- 꾸마-리- 위하-랑 빳사띠', translation: '가고 있는 소녀는 정사를 본다.', highlight: ['Gacchantī'], note: 'gacchantī = 가고 있는 (여성 현재분사 단수)' },
  { type: 'verse', pali: 'Hasantiyā kumāriyā saddo suyyati.', pronKo: '하산띠야- 꾸마-리야- 삿도 숫야띠', translation: '웃는 소녀의 소리가 들린다.', highlight: ['Hasantiyā'], note: 'hasantiyā = 웃는 (소유격 단수)' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Pacantī nārī odanaṃ pacati.', options: ['요리하는 여자는 밥을 짓는다', '여자가 요리를 한다', '요리하는 여자들은 밥을 짓는다', '여자는 밥을 먹는다'], answer: 0, hint: 'pacantī = 요리하는 (여성 현재분사)' },
  { type: 'quiz', question: '2. "pacantī"의 복수 주격은?', options: ['pacantiyo', 'pacantīyo', 'pacantā', 'pacantīhi'], answer: 0, hint: '-ntī → 복수 주격: -ntiyo' },
  { type: 'quiz', question: '3. Gacchantī bhaginī nadiṃ passati.', options: ['가고 있는 여동생은 강을 본다', '가고 있는 여동생들은 강을 본다', '여동생은 강으로 간다', '가고 있는 여동생은 강에서 논다'], answer: 0, hint: 'gacchantī = 가고 있는 (단수), nadiṃ = 강을' },
  { type: 'quiz', question: '4. -mānā 여성분사의 격변화는 어떤 명사형을 따르나?', options: ['-ā 여성명사형', '-ī 여성명사형', '-i 여성명사형', '-u 여성명사형'], answer: 0, hint: 'pacamānā → -ā 여성명사처럼 변화' },
  { type: 'quiz', question: '5. Rodantiyo dārikāyo mātaraṃ avhayanti.', options: ['울고 있는 소녀들은 어머니를 부른다', '울고 있는 소녀는 어머니를 부른다', '소녀들은 어머니를 위해 운다', '울고 있는 소녀들은 어머니를 본다'], answer: 0, hint: 'rodantiyo = 울고 있는 (복수), avhayanti = 부르다' },
  { type: 'quiz', question: '6. Dhāvantī yuvati aṭaviṃ pavisati.', options: ['달리는 하녀는 숲으로 들어간다', '하녀는 숲에서 달린다', '달리는 하녀들은 숲으로 들어간다', '달리는 하녀는 숲에서 나온다'], answer: 0, hint: 'dhāvantī = 달리는 (단수), pavisati = 들어가다' },
  { type: 'quiz', question: '7. pacantī의 도구격 단수는?', options: ['pacantiyā', 'pacantīhi', 'pacantena', 'pacantāya'], answer: 0, hint: '-ntī 여성 → 단수 도구격~처소격: -iyā' },
  { type: 'quiz', question: '8. Nisīdantī bhikkhunī dhammaṃ suṇāti.', options: ['앉아 있는 비구니는 법을 듣는다', '비구니는 앉아서 법을 설한다', '앉아 있는 비구니들은 법을 듣는다', '비구니는 앉아서 명상한다'], answer: 0, hint: 'nisīdantī = 앉아 있는 (단수)' },
  { type: 'quiz', question: '9. -ntī와 -mānā의 관계는?', options: ['의미 동일, 형태만 다름', '능동과 수동의 차이', '현재와 과거의 차이', '단수와 복수의 차이'], answer: 0, hint: 'pacantī = pacamānā = 요리하는 (여자)' },
  { type: 'quiz', question: '10. Hasantiyo kumāriyo uyyāne kīḷanti.', options: ['웃는 소녀들은 공원에서 논다', '웃는 소녀는 공원에서 논다', '소녀들은 공원에서 웃는다', '웃는 소녀들은 숲에서 논다'], answer: 0, hint: 'hasantiyo = 웃는 (복수), kīḷanti = 놀다' },

  // === 마무리 ===
  { type: 'speak', pali: 'Pacantī nārī gehasmiṃ vasati', pronKo: '빠짠띠- 나-리- 게하스밍 와사띠' },
]
