// 11개 경전 과(課)의 메타 정보 — 이름·순서·아이콘의 단일 출처(SSOT).
// 홈, 온보딩, 학습맵, 복습, 메모, ScriptureLearn 등 경전 이름이 필요한 곳은 모두 여기서 가져온다.

export type LessonMeta = {
  title: string
  subtitle: string
  source: string
  icon: string
}

// 학습맵 순서(제1과 → 제11과) — 과 ID는 그대로 두고 보여 주는 순서·번호만 정함.
// 귀에 익은 독송문을 먼저(제1~7과), 이어서 경전 읽기(제8~11과).
export const LESSON_ORDER = [
  'namo', 'trisarana', 'pancasila', 'tisarana-guna', 'metta', 'mangala', 'ratana',
  'sn45-8', 'sn56-11', 'sn22-59', 'mn10',
] as const

/** 학습맵의 두 갈래 묶음 */
export const LESSON_GROUPS: { key: string; title: string; desc: string; icon: string; ids: readonly string[] }[] = [
  { key: 'chant', title: '독송문 먼저', icon: '🙏', desc: '예불 때 귀에 익은 글부터 — 뜻을 알고 외워요',
    ids: ['namo', 'trisarana', 'pancasila', 'tisarana-guna', 'metta', 'mangala', 'ratana'] },
  { key: 'sutta', title: '경전 읽기', icon: '📜', desc: '부처님 말씀을 처음부터 끝까지 빠짐없이',
    ids: ['sn45-8', 'sn56-11', 'sn22-59', 'mn10'] },
]

/** 독송문 과 — '외우기' 모드가 있는 과 */
export const RECITE_LESSONS: readonly string[] = LESSON_GROUPS[0].ids

export function isReciteLesson(id: string): boolean {
  return RECITE_LESSONS.includes(canonicalLessonId(id))
}

/** 이 과 전에 보면 좋은 기초 다지기 레슨 (학습맵 카드에 연결 표시) */
export const LESSON_PREREQ: Record<string, { kind: 'grammar' | 'reading'; id: string; label: string }> = {
  'namo':          { kind: 'grammar', id: 'declension-a', label: '격변화' },
  'trisarana':     { kind: 'grammar', id: 'nom-acc', label: '주격과 대격' },
  'pancasila':     { kind: 'grammar', id: 'declension-a', label: '격변화' },
  'tisarana-guna': { kind: 'grammar', id: 'declension-a', label: '격변화' },
  'metta':         { kind: 'grammar', id: 'declension-a', label: '격변화' },
  'mangala':       { kind: 'reading', id: 'evam', label: 'Evaṃ me sutaṃ 정형구' },
  'ratana':        { kind: 'grammar', id: 'declension-a', label: '격변화' },
  'sn45-8':        { kind: 'reading', id: 'evam', label: 'Evaṃ me sutaṃ 정형구' },
  'sn56-11':       { kind: 'reading', id: 'sn56-11', label: '초전법륜경 첫 부분 독해' },
  'sn22-59':       { kind: 'grammar', id: 'present', label: '동사 활용' },
  'mn10':          { kind: 'reading', id: 'evam', label: 'Evaṃ me sutaṃ 정형구' },
}

export const LESSON_META: Record<string, LessonMeta> = {
  'namo':          { title: '나모땃사',     subtitle: '세존께 경배',                    source: '전통 예경문', icon: '🙏' },
  'trisarana':     { title: '삼귀의',       subtitle: '붓다·담마·상가에 귀의',          source: 'Khp 1',      icon: '🪷' },
  'pancasila':     { title: '오계',         subtitle: '다섯 가지 수행 규칙',            source: 'AN 8.39',    icon: '📿' },
  'tisarana-guna': { title: '삼보공덕',     subtitle: '붓다·담마·상가의 공덕',          source: 'AN 11.12',   icon: '🙏' },
  'sn45-8':        { title: '도분별경',     subtitle: '팔정도 각 항목 분석',            source: 'SN 45.8',    icon: '📐' },
  'mangala':       { title: '축복경',       subtitle: '최상의 축복 38가지',             source: 'Snp 2.4',    icon: '🌸' },
  'sn56-11':       { title: '초전법륜경',   subtitle: '사성제와 팔정도 · 첫 설법',     source: 'SN 56.11',   icon: '☸️' },
  'metta':         { title: '자애경',       subtitle: '자애의 마음 수행',               source: 'Snp 1.8',    icon: '💛' },
  'sn22-59':       { title: '무아의 특징경', subtitle: '오온과 무아',                   source: 'SN 22.59',   icon: '🔍' },
  'ratana':        { title: '보배경',       subtitle: '삼보의 공덕과 가피',             source: 'Snp 2.1',    icon: '💎' },
  'mn10':          { title: '대념처경',     subtitle: '마음챙김 확립의 큰 경 · 사념처 전문(全文)', source: 'DN 22', icon: '🧘' },
}

// 예전 ID → 현재 ID (같은 경전을 가리키던 별칭)
export const LESSON_ALIASES: Record<string, string> = {
  'dhp1-alphabet': 'sn56-11',
}

export function canonicalLessonId(lessonId: string): string {
  return LESSON_ALIASES[lessonId] ?? lessonId
}

export function getLessonTitle(lessonId: string): string {
  return LESSON_META[canonicalLessonId(lessonId)]?.title ?? lessonId
}

/** 학습맵 기준 과 번호(1부터). 없으면 0 */
export function lessonNumber(lessonId: string): number {
  return (LESSON_ORDER as readonly string[]).indexOf(canonicalLessonId(lessonId)) + 1
}
