// 학습 경로 경전 매핑 (SSOT)

export interface PathStep {
  title: string
  titlePali: string
  description: string
  suttas: string[] // SuttaCentral UID
}

export interface LearningPath {
  id: string
  name: string
  description: string
  icon: string
  steps: PathStep[]
}

// 깨달음 순서 (교리 체계별)
const AWAKENING_PATH: LearningPath = {
  id: 'awakening',
  name: '깨달음 순서',
  description: '사성제 → 팔정도 → 삼법인 → 사념처 → 칠각지',
  icon: '🪷',
  steps: [
    {
      title: '사성제 (Four Noble Truths)',
      titlePali: 'Cattāri Ariyasaccāni',
      description: '괴로움, 원인, 소멸, 도',
      suttas: ['sn56.11', 'sn56.31', 'sn56.35'],
    },
    {
      title: '팔정도 (Noble Eightfold Path)',
      titlePali: 'Ariyo Aṭṭhaṅgiko Maggo',
      description: '바른 견해부터 바른 삼매까지',
      suttas: ['sn45.8', 'mn117', 'mn141'],
    },
    {
      title: '삼법인 (Three Marks)',
      titlePali: 'Tilakkhaṇa',
      description: '무상, 고, 무아',
      suttas: ['sn22.59', 'sn35.28', 'an3.136'],
    },
    {
      title: '사념처 (Four Foundations of Mindfulness)',
      titlePali: 'Cattāro Satipaṭṭhānā',
      description: '몸, 느낌, 마음, 법에 대한 마음챙김',
      suttas: ['mn10', 'dn22'],
    },
    {
      title: '칠각지 (Seven Factors of Awakening)',
      titlePali: 'Satta Bojjhaṅgā',
      description: '마음챙김에서 평정까지',
      suttas: ['sn46.1', 'sn46.3', 'mn118'],
    },
  ],
}

// 설법 순서 (추정 시간순)
const TEACHING_ORDER_PATH: LearningPath = {
  id: 'teaching-order',
  name: '설법 순서',
  description: '부처님의 추정 설법 시간순',
  icon: '📜',
  steps: [
    {
      title: '첫 설법 (First Discourse)',
      titlePali: 'Dhammacakkappavattana',
      description: '전법륜경 - 녹야원에서의 첫 설법',
      suttas: ['sn56.11'],
    },
    {
      title: '무아의 가르침 (Discourse on Not-Self)',
      titlePali: 'Anattalakkhaṇa',
      description: '다섯 비구에게 설한 무아경',
      suttas: ['sn22.59'],
    },
    {
      title: '고귀한 탐구 (Noble Search)',
      titlePali: 'Ariyapariyesanā',
      description: '깨달음을 향한 여정',
      suttas: ['mn26'],
    },
    {
      title: '큰 고행의 경 (Greater Discourse on Struggle)',
      titlePali: 'Mahāsaccaka',
      description: '고행의 경험과 깨달음',
      suttas: ['mn36'],
    },
    {
      title: '사문과경 (Fruits of the Contemplative Life)',
      titlePali: 'Sāmaññaphala',
      description: '수행의 결실',
      suttas: ['dn2'],
    },
    {
      title: '대념처경 (Great Discourse on Mindfulness)',
      titlePali: 'Mahāsatipaṭṭhāna',
      description: '사념처 수행의 완전한 가르침',
      suttas: ['dn22'],
    },
  ],
}

// 자유 선택
const FREE_PATH: LearningPath = {
  id: 'free',
  name: '자유 선택',
  description: 'Nikaya별 자유롭게 탐색',
  icon: '🔍',
  steps: [],
}

export const LEARNING_PATHS: LearningPath[] = [
  AWAKENING_PATH,
  TEACHING_ORDER_PATH,
  FREE_PATH,
]

// Nikaya 정보
export const NIKAYAS = [
  { id: 'dn', name: 'Dīgha Nikāya', nameKo: '장부', description: '긴 경전 모음', count: 34 },
  { id: 'mn', name: 'Majjhima Nikāya', nameKo: '중부', description: '중간 길이 경전 모음', count: 152 },
  { id: 'sn', name: 'Saṃyutta Nikāya', nameKo: '상응부', description: '주제별 모음', count: 2904 },
  { id: 'an', name: 'Aṅguttara Nikāya', nameKo: '증지부', description: '숫자별 모음', count: 8777 },
  { id: 'kn', name: 'Khuddaka Nikāya', nameKo: '소부', description: '짧은 경전 모음', count: 0 },
] as const
