// 과별 진도·완료 판단 (홈·과목·복습이 같은 기준을 쓰도록 한곳에 모음)
import { LESSONS } from '../features/grammar/lessons'
import { useStore } from '../store/useStore'

interface ProgressState {
  progress: Record<string, number>
  best: Record<string, number>
  completed: Record<string, boolean>
}

/** 끝까지 마친 과인지 (다시 학습 중이어도 완료로 유지) */
export function isLessonCompleted(s: ProgressState, lessonId: string, totalSteps: number): boolean {
  return !!s.completed[lessonId] || (s.progress[lessonId] || 0) >= totalSteps
}

/** 과 진도 (0~100%) — 완료한 과는 100%, 아니면 가장 멀리 간 단계 기준 */
export function lessonPct(s: ProgressState, lessonId: string, totalSteps: number): number {
  if (isLessonCompleted(s, lessonId, totalSteps)) return 100
  const reached = Math.max(s.best[lessonId] || 0, s.progress[lessonId] || 0)
  // 단계 번호는 0부터 → 지금 보고 있는 단계까지를 본 것으로 계산하지 않고, 지나간 단계만 셈
  return Math.min(99, Math.round((Math.min(reached, totalSteps) / totalSteps) * 100))
}

/** 완료한 과 목록 */
export function completedLessons(s: ProgressState) {
  return LESSONS.filter(l => isLessonCompleted(s, l.id, l.stepCount))
}

/**
 * 저장 형식 정리 — 앱을 시작할 때와 클라우드에서 가져온 뒤 한 번 실행
 * 1) 예전 판의 진도 키(localStorage 'pali-primer-lesson-XX')를 새 저장소로 옮김 (더 많이 한 쪽 유지)
 * 2) 예전 방식(진도 = 단계 수 → 완료)으로 저장된 과를 '완료' 목록에 올림
 */
export function normalizeProgress() {
  const st = useStore.getState()
  const progress = { ...st.progress }
  const best = { ...st.best }
  const completed = { ...st.completed }
  let changed = false

  for (const l of LESSONS) {
    const legacyKey = `pali-primer-${l.id}`
    let legacy = 0
    try { legacy = Number(localStorage.getItem(legacyKey) || '0') || 0 } catch { /* 무시 */ }
    if (legacy > 0) {
      if (legacy >= l.stepCount) {
        if (!completed[l.id]) { completed[l.id] = true; changed = true }
      } else if (legacy > (best[l.id] || 0)) {
        best[l.id] = legacy
        if ((progress[l.id] || 0) < legacy) progress[l.id] = legacy
        changed = true
      }
      try { localStorage.removeItem(legacyKey) } catch { /* 무시 */ }
    }
    const p = progress[l.id] || 0
    if (p >= l.stepCount && !completed[l.id]) { completed[l.id] = true; changed = true }
    if (p > (best[l.id] || 0)) { best[l.id] = Math.min(p, l.stepCount); changed = true }
  }

  if (changed) useStore.setState({ progress, best, completed })
}
