// 전체 과 목록 — 요약(LESSONS)은 늘 들고 있고, 과 내용(단계)은 loadLesson()으로 열 때 받음
// 과 목록·제목은 lesson-sources.ts, 단계 수·검색 낱말은 lessons-meta.generated.ts (빌드할 때 자동 생성)
import type { LessonInfo, LessonMeta, StepType } from './types'
import { assignStepIds } from '../../utils/step-id-generator'
import { LESSON_SOURCES } from './lesson-sources'
import { LESSON_META } from './lessons-meta.generated'
import { LESSON_00_ID, LESSON_00_NEW_ORDER } from './lesson-00-order'

export const LESSONS: LessonMeta[] = LESSON_SOURCES.map(({ id, title, subtitle, icon }) => {
  const m = LESSON_META[id]
  if (!m && import.meta.env?.DEV) console.warn(`[lessons] ${id} 요약 없음 — npm run gen:meta 실행 필요`)
  return { id, title, subtitle, icon, stepCount: m?.stepCount ?? 0, search: m?.search ?? '' }
})

/** 과 요약 (제목·단계 수 등) */
export function getLessonMeta(id: string): LessonMeta | undefined {
  return LESSONS.find(l => l.id === id)
}

/** fixedId가 있는 단계는 그 ID를 그대로 씀 (0과처럼 순서를 바꾼 과의 예전 ID 유지) */
function withFixedIds(steps: StepType[]): StepType[] {
  if (!steps.some(s => s.fixedId)) return steps
  const out = steps.map(s => (s.fixedId ? { ...s, id: s.fixedId } : s))
  if (import.meta.env?.DEV) {
    const ids = new Set<string>()
    for (const s of out) {
      if (ids.has(s.id)) console.warn(`[lessons] 단계 ID 중복: ${s.id}`)
      ids.add(s.id)
    }
  }
  return out
}

const cache = new Map<string, LessonInfo>()
const pending = new Map<string, Promise<LessonInfo | undefined>>()

/** 이미 받아 둔 과 내용 (없으면 undefined) */
export function getLoadedLesson(id: string): LessonInfo | undefined {
  return cache.get(id)
}

/** 과 내용 받기 — 없는 과면 undefined, 받기 실패하면 오류 */
export function loadLesson(id: string): Promise<LessonInfo | undefined> {
  const hit = cache.get(id)
  if (hit) return Promise.resolve(hit)
  const inflight = pending.get(id)
  if (inflight) return inflight
  const src = LESSON_SOURCES.find(s => s.id === id)
  if (!src) return Promise.resolve(undefined)
  const p = src.load().then(raw => {
    const lesson: LessonInfo = { id, title: src.title, subtitle: src.subtitle, icon: src.icon, steps: withFixedIds(assignStepIds(id, raw)) }
    if (import.meta.env?.DEV && id === LESSON_00_ID && lesson.steps.map(s => s.id).join() !== LESSON_00_NEW_ORDER.join()) {
      console.warn('[lessons] 0과 순서가 lesson-00-order.ts의 표와 다름 — 예전 진도 옮기기가 틀어질 수 있음')
    }
    if (import.meta.env?.DEV && lesson.steps.length !== LESSON_META[id]?.stepCount) {
      console.warn(`[lessons] ${id} 단계 수가 요약과 다름 — npm run gen:meta 실행 필요`)
    }
    cache.set(id, lesson)
    return lesson
  }).finally(() => pending.delete(id))
  pending.set(id, p)
  return p
}

/** 여러 과 내용을 한꺼번에 받기 (순서 유지, 없는 과는 빠짐) */
export async function loadLessons(ids: string[]): Promise<LessonInfo[]> {
  const list = await Promise.all(ids.map(loadLesson))
  return list.filter((l): l is LessonInfo => !!l)
}

/** 모든 과 내용 받기 (메모 위치 찾기 등) */
export function loadAllLessons(): Promise<LessonInfo[]> {
  return loadLessons(LESSONS.map(l => l.id))
}

/** 단계 ID(lesson-xx-type-n)가 속한 과 ID — 가장 길게 맞는 과 */
export function lessonIdOfStepId(stepId: string): string | undefined {
  let found: string | undefined
  for (const l of LESSONS) {
    if (stepId.startsWith(l.id + '-') && (!found || l.id.length > found.length)) found = l.id
  }
  return found
}
