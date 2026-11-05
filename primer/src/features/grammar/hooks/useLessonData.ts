// 과 내용 받기 — 과를 열 때만 해당 과(lesson-*.ts) 파일을 받음
// 랜덤 복습은 완료한 과들만 받아서 퀴즈를 모음
import { useEffect, useState } from 'react'
import { getLoadedLesson, loadLesson, loadLessons } from '../lessons'
import type { LessonInfo, StepType } from '../types'
import { useStore } from '../../../store/useStore'
import { completedLessons } from '../../../utils/lesson-progress'

/** 랜덤 복습(완료한 과의 퀴즈만 모은 묶음) 주소 */
export const REVIEW_QUIZ_ID = 'review-quiz'
const REVIEW_QUIZ_COUNT = 10

export const isQuizStep = (s?: StepType) =>
  s?.type === 'quiz' || s?.type === 'match-listen' || s?.type === 'match-reverse'

/** 완료한 과의 퀴즈 단계에서 무작위로 골라 복습 묶음 만들기 */
function buildReviewLesson(done: LessonInfo[]): LessonInfo {
  const pool = done.flatMap(l => l.steps.filter(s => isQuizStep(s)))
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return { id: REVIEW_QUIZ_ID, title: '랜덤 복습', subtitle: '완료한 과의 퀴즈', icon: '🔁', steps: pool.slice(0, REVIEW_QUIZ_COUNT) }
}

export type LessonData =
  | { status: 'loading'; lesson: null }
  | { status: 'error'; lesson: null }
  | { status: 'ready'; lesson: LessonInfo | null }   // null = 없는 과

/** 과 내용 (이미 받아 둔 과는 바로, 아니면 받는 동안 'loading') */
export function useLessonData(lid: string): LessonData {
  const isReview = lid === REVIEW_QUIZ_ID
  const [data, setData] = useState<LessonData>(() => {
    if (!isReview) {
      const hit = getLoadedLesson(lid)
      if (hit) return { status: 'ready', lesson: hit }
    }
    return { status: 'loading', lesson: null }
  })

  useEffect(() => {
    if (data.status !== 'loading') return
    let alive = true
    const job: Promise<LessonInfo | null> = isReview
      ? loadLessons(completedLessons(useStore.getState()).map(l => l.id)).then(buildReviewLesson)
      : loadLesson(lid).then(l => l ?? null)
    job.then(
      lesson => { if (alive) setData({ status: 'ready', lesson }) },
      err => {
        console.warn('[lessons] 과 내용을 받지 못함', err)
        if (alive) setData({ status: 'error', lesson: null })
      },
    )
    return () => { alive = false }
    // 과마다 한 번만 받음 (과가 바뀌면 화면이 새로 만들어짐)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data
}
