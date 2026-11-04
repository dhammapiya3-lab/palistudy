// 11개 lesson의 메타 정보 — title/subtitle/source
// memo, MemoList, ScriptureLearn 등 lesson 식별이 필요한 곳에서 참조.

export type LessonMeta = {
  title: string
  subtitle: string
  source: string
}

export const LESSON_META: Record<string, LessonMeta> = {
  'namo':          { title: '나모땃사',         subtitle: '세존께 경배',                  source: '전통 예경문' },
  'trisarana':     { title: '삼귀의',           subtitle: '붓다·담마·상가에 귀의',        source: 'Khp 1' },
  'pancasila':     { title: '오계',             subtitle: '다섯 가지 수행 규칙',          source: 'AN 8.39' },
  'tisarana-guna': { title: '삼보공덕',         subtitle: '붓다·담마·상가의 공덕',        source: 'AN 11.12' },
  'sn45-8':        { title: '도분별경',         subtitle: '팔정도 각 항목 분석',          source: 'SN 45.8' },
  'mangala':       { title: '축복경',           subtitle: '최상의 축복 38가지',           source: 'Snp 2.4' },
  'sn56-11':       { title: '초전법륜경',       subtitle: '사성제와 팔정도 · 첫 설법',   source: 'SN 56.11' },
  'metta':         { title: '자애경',           subtitle: '자애의 마음 수행',             source: 'Snp 1.8' },
  'sn22-59':       { title: '무아의 특징경',    subtitle: '오온과 무아',                  source: 'SN 22.59' },
  'ratana':        { title: '보배경',           subtitle: '삼보의 공덕과 가피',           source: 'Snp 2.1' },
  'mn10':          { title: '마음챙김 확립의 큰 경', subtitle: '사념처 수행 — 전문(全文)', source: 'DN 22' },
}

export function getLessonTitle(lessonId: string): string {
  return LESSON_META[lessonId]?.title ?? lessonId
}
