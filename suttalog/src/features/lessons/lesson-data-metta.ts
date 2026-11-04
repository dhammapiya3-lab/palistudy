// 8과: 자애경 (Metta Sutta, Snp 1.8) — text/제8과. 자애경.txt 전문 기반
import type { StepType } from './lesson-data-sn56-11'

const V1A = 'Karaṇīyamatthakusalena, yantasantaṃ padaṃ abhisamecca.'
const V1B = 'Sakko ujū ca suhujū ca, sūvaco cassa mudu anatimānī.'
const V1K = '선함에 능숙하여 할 일을 하는 자, 고요한 경지를 깨달은 자는 — 유능하고 정직하고 매우 정직하며, 온순하고 유연하며 교만하지 않아야 한다.'

const V2A = 'Santussako ca subharo ca, appakicco ca sallahukavutti.'
const V2B = 'Santindriyo ca nipako ca, appagabbho kulesvananugiddho.'
const V2K = '만족하고 공양하기 쉽고, 일이 적고 검소하며 — 감관이 고요하고 지혜롭고, 불손하지 않고 가정에 집착하지 않는다.'

const V3A = 'Na ca khuddamācare kiñci, yena viññū pare upavadeyyuṃ.'
const V3B = 'Sukhino va khemino hontu, sabbasattā bhavantu sukhitattā.'
const V3K = '지혜로운 자들이 비난할 만한 사소한 잘못도 범하지 않는다. — 일체 중생이 행복하고 안온하기를! 모든 존재가 행복한 마음이 되기를!'

const V4A = 'Ye keci pāṇabhūtatthi, tasā vā thāvarā vanavasesā.'
const V4B = 'Dīghā vā ye va mahantā, majjhimā rassakā aṇukathūlā.'
const V4K = '어떤 살아있는 존재든 — 떠는 자(중생)나 머무는 자(아라한)나 남김없이, 긴 것이나 큰 것이나 중간 것이나 짧은 것이나 작은 것이나 굵은 것이나,'

const V5A = 'Diṭṭhā vā ye va adiṭṭhā, ye va dūre vasanti avidūre.'
const V5B = 'Bhūtā va sambhavesī va, sabbasattā bhavantu sukhitattā.'
const V5K = '본 것이나 보지 못한 것이나, 멀리 또는 가까이 사는 것이나, 이미 태어난 것이나 태어나려 하는 것이나 — 모든 존재가 행복한 마음이 되기를!'

const V6A = 'Na paro paraṃ nikubbetha, nātimaññetha katthaci na kañci.'
const V6B = 'Byārosanā paṭighasaññā, nāññamaññassa dukkhamiccheyya.'
const V6K = '서로 속이지 말고 어디서도 누구도 경멸하지 말기를. 분노나 적의의 인식으로, 서로 고통을 바라지 말기를.'

const V7A = 'Mātā yathā niyaṃ puttamāyusā ekaputtamanurakkhe.'
const V7B = 'Evampi sabbabhūtesu, mānasaṃ bhāvaye aparimāṇaṃ.'
const V7K = '어머니가 자신의 외아들을 목숨 다해 보호하듯, 모든 존재에 대해 한량없는 마음을 닦으라.'

const V8A = 'Mettañca sabbalokasmi, mānasaṃ bhāvaye aparimāṇaṃ.'
const V8B = 'Uddhaṃ adho ca tiriyañca, asambādhaṃ averamasapattaṃ.'
const V8K = '온 세상에 한량없는 자애의 마음을 닦으라 — 위·아래·사방으로, 막힘 없이, 원한 없이, 적의 없이.'

const V9A = 'Tiṭṭhaṃ caraṃ nisinno va, sayāno yāvatāssa vitamiddho.'
const V9B = 'Etaṃ satiṃ adhiṭṭheyya, brahmametaṃ vihāramidhamāhu.'
const V9K = '서 있거나 걷거나 앉아 있거나 누워 있을 때, 깨어있는 한 — 이 마음챙김을 확립하라. 이를 일러 여기서의 범주(梵住)라 한다.'

const V10A = 'Diṭṭhiñca anupaggamma, sīlavā dassanena sampanno.'
const V10B = 'Kāmesu vinaya gedhaṃ, na hi jātuggabbhaseyya punaretīti.'
const V10K = '(잘못된) 견해를 따르지 않고, 계행이 있고, (바른) 봄을 갖추어, 감각적 쾌락에서 탐착을 다스리면 — 결코 다시는 모태에 들지 않는다.'

export const LESSON_METTA: StepType[] = [
  { type: 'intro', icon: '💛', title: '자애경 (Metta Sutta)', subtitle: 'Snp 1.8 — 자애 수행의 정수',
    description: '숲속 수행자들이 나무 정령의 방해를 받자 붓다께서 자애(慈愛, Mettā)를 닦는 법을 설하신 경.\n\n10 게송:\n① 수행자의 자질 (1-3게송)\n② 자애의 대상 (4-5게송)\n③ 자애의 태도 (6-9게송)\n④ 결과: 모태에 다시 들지 않음 (10게송)' },

  // 핵심 단어
  { type: 'teach', icon: '💛', word: 'mettā', pronKo: '멧따~', meaning: '자애, 자비',
    grammar: '여성명사', baseForm: 'mettā',
    formNote: '√mid(부드럽다) / mitra(친구)와 어원 공유\nmettañca = mettaṃ + ca',
    buddhism: '자(慈). 4범주(四梵住, brahmavihāra)의 첫째.',
    audio: true },

  // ===== 게송 1 =====
  { type: 'intro', icon: '①', title: '— 1게송: 수행자의 첫 자질 —', subtitle: '능숙·정직·온순',
    description: '6가지 자질: sakko·ujū·suhujū·sūvaco·mudu·anatimānī' },
  { type: 'teach', icon: '🎯', word: 'Karaṇīyamatthakusalena', pronKo: '까라니~야맛타꾸살레나', meaning: '선에 능숙한 자가 할 일을',
    grammar: '복합어, 도구격', baseForm: 'karaṇīya(해야 할) + attha(목적) + kusala(능숙) + -ena',
    verseLine: V1A, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'santaṃ padaṃ', pronKo: '산땅 빠당', meaning: '고요한 경지를',
    grammar: '형용사+명사 대격', baseForm: 'santa + pada',
    buddhism: '열반의 다른 표현.',
    verseLine: V1A, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '💡', word: 'abhisamecca', pronKo: '아비사멧짜', meaning: '깨달은 뒤 (절대분사)',
    grammar: '절대분사', baseForm: 'abhisameti (abhi- + saṃ- + √i)',
    verseLine: V1A, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '💪', word: 'sakko', pronKo: '삭꼬', meaning: '유능한, 가능한',
    grammar: '형용사, 주격', baseForm: 'sakka',
    verseLine: V1B, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '📏', word: 'ujū', pronKo: '우주~', meaning: '정직한',
    grammar: '형용사, 주격', baseForm: 'uju',
    verseLine: V1B, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '📐', word: 'suhujū', pronKo: '수후주~', meaning: '매우 정직한',
    grammar: '형용사, 주격', baseForm: 'su(잘) + huju',
    verseLine: V1B, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🤝', word: 'sūvaco', pronKo: '수~와쪼', meaning: '온순한, 가르치기 쉬운',
    grammar: '형용사, 주격', baseForm: 'su + vaca',
    verseLine: V1B, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🌿', word: 'mudu', pronKo: '무두', meaning: '유연한, 부드러운',
    grammar: '형용사, 주격', baseForm: 'mudu',
    verseLine: V1B, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🙇', word: 'anatimānī', pronKo: '아나띠마~니~', meaning: '교만하지 않은',
    grammar: '형용사, 주격', baseForm: 'an + atimānin',
    verseLine: V1B, verseLineKo: V1K, audio: true },
  { type: 'verse', pali: V1A + '\n' + V1B, pronKo: '까라니~야맛타꾸살레나, 얀따산땅 빠당 아비사멧짜. 삭꼬 우주~ 짜 수후주~ 짜, 수~와쪼 짯사 무두 아나띠마~니~.',
    translation: V1K, highlight: ['Karaṇīyamatthakusalena','santaṃ','padaṃ','abhisamecca','sakko','ujū','suhujū','sūvaco','mudu','anatimānī'],
    note: '① 1게송: 수행자의 6자질.' },

  // ===== 게송 2 =====
  { type: 'teach', icon: '😊', word: 'santussako', pronKo: '산뚯사꼬', meaning: '만족하는',
    grammar: '형용사, 주격', baseForm: 'santussaka (saṃ + √tuṣ)',
    verseLine: V2A, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🍚', word: 'subharo', pronKo: '수바로', meaning: '공양하기 쉬운',
    grammar: '형용사, 주격', baseForm: 'su + bhara',
    verseLine: V2A, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🌱', word: 'appakicco', pronKo: '압빠낏쪼', meaning: '일이 적은',
    grammar: '형용사, 주격', baseForm: 'appa(적은) + kicca(일)',
    verseLine: V2A, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🪶', word: 'sallahukavutti', pronKo: '살라후까웃띠', meaning: '검소하게 사는',
    grammar: '형용사, 주격', baseForm: 'sallahuka(가벼운) + vutti(생활)',
    verseLine: V2A, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '😌', word: 'santindriyo', pronKo: '산띤드리요', meaning: '감관이 고요한',
    grammar: '복합어, 주격', baseForm: 'santa + indriya',
    verseLine: V2B, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🧠', word: 'nipako', pronKo: '니빠꼬', meaning: '지혜로운, 신중한',
    grammar: '형용사, 주격', baseForm: 'nipaka',
    verseLine: V2B, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🙏', word: 'appagabbho', pronKo: '압빠갑보', meaning: '불손하지 않은',
    grammar: '형용사, 주격', baseForm: 'a + pagabbha',
    verseLine: V2B, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🏠', word: 'kulesvananugiddho', pronKo: '꿀레슈와나누긷도', meaning: '가정에 집착하지 않는',
    grammar: '복합어, 주격', baseForm: 'kulesu + an + anugiddha',
    formNote: 'kulesu(가정들에서) + an(부정) + anugiddha(탐착한)',
    verseLine: V2B, verseLineKo: V2K, audio: true },
  { type: 'verse', pali: V2A + '\n' + V2B, pronKo: '산뚯사꼬 짜 수바로 짜, 압빠낏쪼 짜 살라후까웃띠. 산띤드리요 짜 니빠꼬 짜, 압빠갑보 꿀레슈와나누긷도.',
    translation: V2K, highlight: ['santussako','subharo','appakicco','sallahukavutti','santindriyo','nipako','appagabbho','kulesvananugiddho'],
    note: '② 2게송: 만족·검소·고요한 감관.' },

  // ===== 게송 3 (자애 핵심) =====
  { type: 'teach', icon: '🚫', word: 'khuddamācare', pronKo: '쿳다마~짜레', meaning: '사소한 잘못을 행하다',
    grammar: '대격+동사 가능법', baseForm: 'khudda + ācarati 가능법',
    verseLine: V3A, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🧠', word: 'viññū pare upavadeyyuṃ', pronKo: '윈뉴~ 빠레 우빠와데이융', meaning: '지혜로운 자들이 비난할',
    grammar: '주격복수+동사 가능법', baseForm: 'viññū + para + upavadati',
    verseLine: V3A, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '😊', word: 'sukhino', pronKo: '수키노', meaning: '행복한 (자들이)',
    grammar: '형용사, 주격 복수', baseForm: 'sukhin',
    verseLine: V3B, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'khemino', pronKo: '케미노', meaning: '안온한 (자들이)',
    grammar: '형용사, 주격 복수', baseForm: 'khemin',
    verseLine: V3B, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🙏', word: 'hontu', pronKo: '혼뚜', meaning: '되기를! (3인칭 복수 명령)',
    grammar: '동사 3인칭 복수 명령형', baseForm: 'bhavati (있다, 되다)',
    formNote: 'bhavati → hontu (단축) — 기원의 명령형',
    verseLine: V3B, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🌍', word: 'sabbasattā', pronKo: '삽바삿따~', meaning: '모든 존재들',
    grammar: '복합어, 주격 복수', baseForm: 'sabba + satta',
    verseLine: V3B, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🙏', word: 'bhavantu', pronKo: '바완뚜', meaning: '되기를! (3인칭 복수 명령)',
    grammar: '동사 3인칭 복수 명령형', baseForm: 'bhavati',
    formNote: '자애 명상의 핵심 정형구',
    verseLine: V3B, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '😄', word: 'sukhitattā', pronKo: '수키땃따~', meaning: '행복한 마음의 (주격 복수)',
    grammar: '복합어, 주격 복수', baseForm: 'sukhita(행복한) + atta(자기)',
    verseLine: V3B, verseLineKo: V3K, audio: true },
  { type: 'verse', pali: V3A + '\n' + V3B, pronKo: '나 짜 쿳다마~짜레 낀찌, 예나 윈뉴~ 빠레 우빠와데이융. 수키노 와 케미노 혼뚜, 삽바삿따~ 바완뚜 수키땃따~.',
    translation: V3K, highlight: ['sukhino','khemino','hontu','sabbasattā','bhavantu','sukhitattā'],
    note: '③ 3게송 후반: 자애 명상의 핵심 기원!' },

  // ===== 게송 4 (자애 대상의 범위) =====
  { type: 'teach', icon: '🐾', word: 'pāṇabhūta', pronKo: '빠~나부~따', meaning: '살아있는 존재 (생명체)',
    grammar: '복합어', baseForm: 'pāṇa + bhūta',
    verseLine: V4A, verseLineKo: V4K, audio: true },
  { type: 'teach', icon: '😰', word: 'tasā', pronKo: '따사~', meaning: '떠는 자 (범부)',
    grammar: '형용사, 주격 복수', baseForm: 'tasa',
    verseLine: V4A, verseLineKo: V4K, audio: true },
  { type: 'teach', icon: '🗿', word: 'thāvarā', pronKo: '타~와라~', meaning: '머무는 자 (아라한)',
    grammar: '형용사, 주격 복수', baseForm: 'thāvara',
    verseLine: V4A, verseLineKo: V4K, audio: true },
  { type: 'teach', icon: '🏃', word: 'dīghā·majjhimā·rassakā', pronKo: '디~가~·맛지마~·랏사까~', meaning: '긴·중간·짧은',
    grammar: '형용사, 주격 복수', baseForm: 'dīgha + majjhima + rassaka',
    verseLine: V4B, verseLineKo: V4K, audio: true },
  { type: 'teach', icon: '🦋', word: 'mahantā·aṇukathūlā', pronKo: '마한따~·아누까투~라~', meaning: '큰·작고 굵은',
    grammar: '형용사 복수', baseForm: 'mahanta + aṇuka + thūla',
    formNote: '모든 크기의 생명체 포함',
    verseLine: V4B, verseLineKo: V4K, audio: true },
  { type: 'verse', pali: V4A + '\n' + V4B, pronKo: '예 께찌 빠~나부~땃티, 따사~ 와~ 타~와라~ 와나와세사~. 디~가~ 와~ 예 와 마한따~, 맛지마~ 랏사까~ 아누까투~라~.',
    translation: V4K, highlight: ['pāṇabhūta','tasā','thāvarā','dīghā','majjhimā','rassakā','mahantā'],
    note: '④ 4게송: 자애 대상의 범위 1 — 크기/단계.' },

  // ===== 게송 5 =====
  { type: 'teach', icon: '👁️', word: 'diṭṭhā·adiṭṭhā', pronKo: '딧타~·아딧타~', meaning: '본·보지 못한',
    grammar: '과거분사 복수', baseForm: 'diṭṭha + a + diṭṭha',
    verseLine: V5A, verseLineKo: V5K, audio: true },
  { type: 'teach', icon: '🌐', word: 'dūre·avidūre', pronKo: '두~레·아위두~레', meaning: '먼·가까운',
    grammar: '부사', baseForm: 'dūra + a + vidūra',
    verseLine: V5A, verseLineKo: V5K, audio: true },
  { type: 'teach', icon: '🌱', word: 'bhūtā·sambhavesī', pronKo: '부~따~·삼바웨시~', meaning: '이미 태어난·태어나려 하는',
    grammar: '과거분사+미래분사', baseForm: 'bhūta + sambhavesin',
    verseLine: V5B, verseLineKo: V5K, audio: true },
  { type: 'verse', pali: V5A + '\n' + V5B, pronKo: '딧타~ 와~ 예 와 아딧타~, 예 와 두~레 와산띠 아위두~레. 부~따~ 와 삼바웨시~ 와, 삽바삿따~ 바완뚜 수키땃따~.',
    translation: V5K, highlight: ['diṭṭhā','adiṭṭhā','dūre','avidūre','bhūtā','sambhavesī'],
    note: '⑤ 5게송: 자애 대상의 범위 2 — 보이는/먼/이미/장차.' },

  // ===== 게송 6 =====
  { type: 'teach', icon: '🤝', word: 'na paro paraṃ nikubbetha', pronKo: '나 빠로 빠랑 니꿉베타', meaning: '서로 속이지 말기를',
    grammar: '부정+주격+대격+가능법', baseForm: 'para + para + nikubbeti',
    verseLine: V6A, verseLineKo: V6K, audio: true },
  { type: 'teach', icon: '😤', word: 'nātimaññetha', pronKo: '나~띠만녜타', meaning: '경멸하지 말기를',
    grammar: '부정+동사 가능법', baseForm: 'na + atimaññati',
    verseLine: V6A, verseLineKo: V6K, audio: true },
  { type: 'teach', icon: '😠', word: 'byārosanā paṭighasaññā', pronKo: '뱌~로사나~ 빠띠가산냐~', meaning: '분노와 적의의 인식으로',
    grammar: '도구격 명사들', baseForm: 'byārosana + paṭighasaññā',
    verseLine: V6B, verseLineKo: V6K, audio: true },
  { type: 'teach', icon: '🚫', word: 'nāññamaññassa dukkhamiccheyya', pronKo: '난~냐만냣사 둑카밋체이야', meaning: '서로 고통을 바라지 말기를',
    grammar: '부정+상호대명사+대격+가능법', baseForm: 'na + aññamañña + dukkha + icchati',
    verseLine: V6B, verseLineKo: V6K, audio: true },
  { type: 'verse', pali: V6A + '\n' + V6B, pronKo: '나 빠로 빠랑 니꿉베타, 나~띠만녜타 깟타찌 나 깐찌. 뱌~로사나~ 빠띠가산냐~, 난~냐만냣사 둑카밋체이야.',
    translation: V6K, highlight: ['paro','nikubbetha','nātimaññetha','byārosanā','paṭighasaññā','dukkhamiccheyya'],
    note: '⑥ 6게송: 자애의 태도 — 속이지·경멸·분노·고통 바람 모두 금지.' },

  // ===== 게송 7 (어머니 비유) =====
  { type: 'teach', icon: '👩', word: 'mātā yathā niyaṃ puttamāyusā ekaputtamanurakkhe', pronKo: '마~따~ 야타~ 니양 뿟따마~유사~ 에까뿟따마누락케', meaning: '어머니가 자신의 외아들을 목숨 다해 보호하듯',
    grammar: '비유 구문', baseForm: 'mātā + niya(자기) + putta + āyu + ekaputta + anurakkhati',
    buddhism: '자애경의 가장 유명한 비유. 모성의 무조건적 사랑.',
    verseLine: V7A, verseLineKo: V7K, audio: true },
  { type: 'teach', icon: '🌍', word: 'sabbabhūtesu', pronKo: '삽바부~떼수', meaning: '모든 존재에 대해 (처격 복수)',
    grammar: '복합어, 처격 복수', baseForm: 'sabba + bhūta',
    verseLine: V7B, verseLineKo: V7K, audio: true },
  { type: 'teach', icon: '💭', word: 'mānasaṃ bhāvaye', pronKo: '마~나상 바~와예', meaning: '마음을 닦으라 (가능법)',
    grammar: '대격+동사 가능법', baseForm: 'mānasa + bhāveti',
    verseLine: V7B, verseLineKo: V7K, audio: true },
  { type: 'teach', icon: '♾️', word: 'aparimāṇaṃ', pronKo: '아빠리마~낭', meaning: '한량없는, 무량의',
    grammar: '형용사, 대격 중성', baseForm: 'a + parimāṇa',
    buddhism: '무량심(無量心). 4범주의 본성.',
    verseLine: V7B, verseLineKo: V7K, audio: true },
  { type: 'verse', pali: V7A + '\n' + V7B, pronKo: '마~따~ 야타~ 니양 뿟따마~유사~ 에까뿟따마누락케. 에왐삐 삽바부~떼수, 마~나상 바~와예 아빠리마~낭.',
    translation: V7K, highlight: ['mātā','niyaṃ','puttamāyusā','ekaputtam','anurakkhe','sabbabhūtesu','mānasaṃ','bhāvaye','aparimāṇaṃ'],
    note: '⑦ 7게송: 어머니의 외아들 비유 — 자애의 정수.' },

  // ===== 게송 8 (온 세상) =====
  { type: 'teach', icon: '🌍', word: 'sabbalokasmiṃ', pronKo: '삽발로까스밍', meaning: '온 세상에 (처격)',
    grammar: '복합어, 처격', baseForm: 'sabba + loka',
    verseLine: V8A, verseLineKo: V8K, audio: true },
  { type: 'teach', icon: '⬆️', word: 'uddhaṃ adho tiriyañca', pronKo: '웃당 아도 띠리얀짜', meaning: '위·아래·사방으로',
    grammar: '부사들', baseForm: 'uddhaṃ + adho + tiriyaṃ',
    verseLine: V8B, verseLineKo: V8K, audio: true },
  { type: 'teach', icon: '🆓', word: 'asambādhaṃ', pronKo: '아삼바~당', meaning: '막힘 없이',
    grammar: '형용사, 대격', baseForm: 'a + sambādha',
    verseLine: V8B, verseLineKo: V8K, audio: true },
  { type: 'teach', icon: '☮️', word: 'averaṃ', pronKo: '아웨랑', meaning: '원한 없이',
    grammar: '형용사, 대격', baseForm: 'a + vera',
    verseLine: V8B, verseLineKo: V8K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'asapattaṃ', pronKo: '아사빳땅', meaning: '적의 없이',
    grammar: '형용사, 대격', baseForm: 'a + sapatta',
    verseLine: V8B, verseLineKo: V8K, audio: true },
  { type: 'verse', pali: V8A + '\n' + V8B, pronKo: '멧딴짜 삽발로까스미~, 마~나상 바~와예 아빠리마~낭. 웃당 아도 짜 띠리얀짜, 아삼바~당 아웨라마사빳땅.',
    translation: V8K, highlight: ['Mettaṃ','sabbalokasmiṃ','aparimāṇaṃ','uddhaṃ','adho','tiriyaṃ','asambādhaṃ','averaṃ','asapattaṃ'],
    note: '⑧ 8게송: 온 세상 자애 방사.' },

  // ===== 게송 9 (4자세 + 범주) =====
  { type: 'teach', icon: '🧍', word: 'tiṭṭhaṃ caraṃ nisinno sayāno', pronKo: '띳탕 짜랑 니신노 사야~노', meaning: '서고·걷고·앉고·누워',
    grammar: '현재분사 + 과거분사 4가지', baseForm: 'tiṭṭhati + carati + nisinna + sayāna',
    formNote: '11과 MN10 V_IRI의 4자세와 동일',
    verseLine: V9A, verseLineKo: V9K, audio: true },
  { type: 'teach', icon: '☀️', word: 'yāvatāssa vitamiddho', pronKo: '야~와따~싸 위따밋도', meaning: '깨어있는 한',
    grammar: '관계절', baseForm: 'yāva + assa + vitamiddha',
    verseLine: V9A, verseLineKo: V9K, audio: true },
  { type: 'teach', icon: '💎', word: 'etaṃ satiṃ adhiṭṭheyya', pronKo: '에땅 사띵 아딧테이야', meaning: '이 마음챙김을 확립하라',
    grammar: '대격+가능법', baseForm: 'satiṃ + adhiṭṭhāti',
    verseLine: V9B, verseLineKo: V9K, audio: true },
  { type: 'teach', icon: '🕉️', word: 'brahmametaṃ vihāramidhamāhu', pronKo: '브라흐마메땅 위하~라미다마~후', meaning: '이를 여기서 범주(梵住)라 한다',
    grammar: '복합 구문', baseForm: 'brahma + etaṃ + vihāra + idha + māhu',
    buddhism: '범주(梵住, brahmavihāra). 4무량심: 자·비·희·사.',
    verseLine: V9B, verseLineKo: V9K, audio: true },
  { type: 'verse', pali: V9A + '\n' + V9B, pronKo: '띳탕 짜랑 니신노 와, 사야~노 야~와따~싸 위따밋도. 에땅 사띵 아딧테이야, 브라흐마메땅 위하~라미다마~후.',
    translation: V9K, highlight: ['tiṭṭhaṃ','caraṃ','nisinno','sayāno','vitamiddho','satiṃ','adhiṭṭheyya','brahma','vihāra'],
    note: '⑨ 9게송: 4자세 모두에서 자애 마음챙김 — 이것이 梵住.' },

  // ===== 게송 10 (결과) =====
  { type: 'teach', icon: '🚫', word: 'diṭṭhiṃ anupaggamma', pronKo: '딧팅 아누빡감마', meaning: '(잘못된) 견해를 따르지 않고',
    grammar: '대격+절대분사', baseForm: 'diṭṭhi + an + upagacchati',
    verseLine: V10A, verseLineKo: V10K, audio: true },
  { type: 'teach', icon: '📿', word: 'sīlavā dassanena sampanno', pronKo: '시~라와~ 닷사네나 삼빤노', meaning: '계행 있고 봄을 갖춘',
    grammar: '형용사+도구격+과거분사', baseForm: 'sīlavā + dassana + sampanna',
    verseLine: V10A, verseLineKo: V10K, audio: true },
  { type: 'teach', icon: '💋', word: 'kāmesu vinaya gedhaṃ', pronKo: '까~메수 위나야 게당', meaning: '감각욕에서 탐착을 다스리고',
    grammar: '처격+절대분사+대격', baseForm: 'kāma + vineti + gedha',
    verseLine: V10B, verseLineKo: V10K, audio: true },
  { type: 'teach', icon: '🚫', word: 'na hi jātu gabbhaseyyaṃ punar eti', pronKo: '나 히 자~뚜 갑바세이양 뿌나레띠', meaning: '결코 다시는 모태에 들지 않는다',
    grammar: '부정+강조+대격+동사', baseForm: 'na + jātu + gabbhaseyyā + punar + eti',
    buddhism: '불환과 또는 아라한과의 결실 — 윤회 종식.',
    verseLine: V10B, verseLineKo: V10K, audio: true },
  { type: 'verse', pali: V10A + '\n' + V10B, pronKo: '딧틴짜 아누빡감마, 시~라와~ 닷사네나 삼빤노. 까~메수 위나야 게당, 나 히 자~뚝갑바세이야 뿌나레띠~띠.',
    translation: V10K, highlight: ['diṭṭhiṃ','anupaggamma','sīlavā','sampanno','kāmesu','vinaya','gedhaṃ','jātu','gabbhaseyyaṃ','punar','eti'],
    note: '⑩ 10게송: 자애 수행의 결과 — 다시는 윤회의 모태에 들지 않음.' },

  { type: 'verse', pali: 'mettasuttaṃ niṭṭhitaṃ.', pronKo: '멧따숫땅 닛티땅.', translation: '— 자애경 끝 —' },

  { type: 'teach-grammar', title: '원망형(願望形)·명령형 — hontu/bhavantu/bhāvaye',
    example: 'sukhino hontu / sabbasattā bhavantu sukhitattā / mānasaṃ bhāvaye',
    exampleKo: '행복하기를! / 모든 존재가 행복한 마음이 되기를! / 마음을 닦으라.',
    explanation: '자애경 핵심 동사:\n• hontu / bhavantu = 명령형 3인칭 복수 ("~되기를!")\n• bhāvaye = 가능법 ("닦아야 한다")\n\n자애 명상은 이 정형구를 반복.' },

  { type: 'quiz', question: '"mettā"의 뜻은?',
    options: ['계율', '자애, 자비', '지혜', '삼매'], answer: 1 },
  { type: 'quiz', question: '"sabbe sattā bhavantu sukhitattā"는?',
    options: ['모든 존재가 행복한 마음이 되기를!', '모든 존재가 사라지기를', '모든 존재는 영원하다', '모든 존재가 깨닫기를'], answer: 0 },
  { type: 'quiz', question: '"aparimāṇaṃ"의 뜻은?',
    options: ['원한 없이', '막힘 없이', '한량없는', '고요한'], answer: 2 },
  { type: 'quiz', question: '자애경의 어머니 비유에서 어머니는 누구를 보호?',
    options: ['외아들 (ekaputta)', '많은 아들', '남편', '부모'], answer: 0 },
  { type: 'quiz', question: '"brahmavihāra"(梵住) 4무량심은?',
    options: ['자(慈)·비(悲)·희(喜)·사(捨)', '계·정·혜·해탈', '신·구·의·법', '4성제'], answer: 0 },
  { type: 'quiz', question: '자애 수행의 결과 (10게송)는?',
    options: ['다시 모태에 들지 않음', '많은 재산', '많은 친구', '오래 살기'], answer: 0 },

  { type: 'speak', pali: V3B, pronKo: '수키노 와 케미노 혼뚜, 삽바삿따~ 바완뚜 수키땃따~.' },
  { type: 'speak', pali: V8A + ' ' + V8B, pronKo: '멧딴짜 삽발로까스미~ 마~나상 바~와예 아빠리마~낭. 웃당 아도 짜 띠리얀짜...' },

  { type: 'arrange', instruction: '빠알리 문장을 순서대로 배열하세요.',
    translation: '모든 존재들이여, 행복한 마음이 되기를!',
    blocks: ['sattā', 'sabba', 'sukhitattā.', 'bhavantu'],
    correctOrder: [1, 0, 3, 2] },
]
