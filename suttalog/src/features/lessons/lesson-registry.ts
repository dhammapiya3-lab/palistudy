// 경전 레슨 데이터 불러오기 — 레슨마다 따로 내려받음(코드 분할).
// 홈이나 학습맵만 열 때는 레슨 데이터(약 2MB)를 받지 않고, 해당 경전을 열 때 그 경전 것만 받습니다.
import type { StepType } from './lesson-data-sn56-11'

type Loader = () => Promise<StepType[]>

const LOADERS: Record<string, Loader> = {
  'namo': () => import('./lesson-data-namo').then(m => m.LESSON_NAMO),
  'trisarana': () => import('./lesson-data-trisarana').then(m => m.LESSON_TRISARANA),
  'pancasila': () => import('./lesson-data-pancasila').then(m => m.LESSON_PANCASILA),
  'tisarana-guna': () => import('./lesson-data-tisarana-guna').then(m => m.LESSON_TISARANA_GUNA),
  'sn45-8': () => import('./lesson-data-sn45-8').then(m => m.LESSON_SN45_8),
  'mangala': () => import('./lesson-data-mangala').then(m => m.LESSON_MANGALA),
  'sn56-11': () => import('./lesson-data-sn56-11').then(m => m.LESSON_SN56_11),
  'metta': () => import('./lesson-data-metta').then(m => m.LESSON_METTA),
  'sn22-59': () => import('./lesson-data-sn22-59').then(m => m.LESSON_SN22_59),
  'ratana': () => import('./lesson-data-ratana').then(m => m.LESSON_RATANA),
  'mn10': () => import('./lesson-data-mn10').then(m => m.LESSON_MN10),
}

export function hasLessonData(id: string): boolean {
  return id in LOADERS
}

const cache: Record<string, StepType[]> = {}

export function getCachedLesson(id: string): StepType[] | undefined {
  return cache[id]
}

export async function loadLesson(id: string): Promise<StepType[]> {
  if (cache[id]) return cache[id]
  const loader = LOADERS[id]
  if (!loader) throw new Error(`unknown lesson: ${id}`)
  const steps = await loader()
  cache[id] = steps
  return steps
}

/** 경전 레슨 ID 전체(미리 받기·배운 낱말 찾기용) */
export const LESSON_IDS: string[] = Object.keys(LOADERS)

/** 모든 레슨을 한 번에 받아 둠(오프라인 대비). 하나라도 실패하면 실패로 알림 */
export async function loadAllLessons(): Promise<void> {
  const results = await Promise.allSettled(LESSON_IDS.map(id => loadLesson(id)))
  if (results.some(r => r.status === 'rejected')) throw new Error('일부 레슨을 받지 못함')
}
