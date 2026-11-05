// 0과(자모와 발음) 순서 변경 — 예전 진도(단계 번호)를 새 번호로 옮기는 표
// 단계 ID는 그대로라서 메모 위치(stepId)와 문제 기록(quizRecords)은 따로 옮길 필요가 없다.
// 진도·과 안 학습 상태(pali-lesson-session)는 '단계 번호'로 저장되어 있어 여기 표로 옮긴다.
// ※ lesson-00-alphabet.ts의 순서를 바꾸면 NEW_ORDER도 같이 고칠 것 (개발 화면에서 다르면 경고)

export const LESSON_00_ID = 'lesson-00'

/** 예전 0과 순서 (31단계) */
export const LESSON_00_OLD_ORDER = [
  'intro-1', 'teach-grammar-1', 'teach-1', 'teach-2', 'teach-3',
  'teach-grammar-2', 'teach-grammar-3', 'teach-grammar-4', 'teach-grammar-5', 'teach-grammar-6',
  'teach-grammar-7', 'teach-grammar-8', 'teach-grammar-9', 'teach-grammar-10', 'teach-grammar-11',
  'verse-1', 'verse-2',
  'quiz-1', 'quiz-2', 'quiz-3', 'quiz-4', 'quiz-5', 'quiz-6', 'quiz-7', 'quiz-8', 'quiz-9',
  'match-listen-1', 'writing-1', 'writing-2', 'speak-1', 'speak-2',
].map(s => `${LESSON_00_ID}-${s}`)

/** 새 0과 순서 (34단계) — '*'로 끝나면 '더 알아보기'(평소 건너뜀) */
const NEW_ORDER_RAW = [
  'intro-1', 'teach-grammar-1', 'teach-1', 'teach-2', 'teach-3', 'match-listen-2', 'quiz-2', 'quiz-3',
  'teach-grammar-2', 'teach-grammar-3', 'match-listen-3',
  'teach-grammar-4', 'teach-grammar-5', 'teach-grammar-6', 'teach-grammar-7', 'teach-grammar-8*',
  'match-listen-4', 'teach-grammar-9', 'quiz-4', 'quiz-5',
  'verse-2', 'match-listen-1', 'writing-2', 'speak-1',
  'quiz-1*', 'quiz-6*', 'verse-1*', 'writing-1*', 'speak-2*',
  'teach-grammar-10*', 'teach-grammar-11*', 'quiz-7*', 'quiz-8*', 'quiz-9*',
]
export const LESSON_00_NEW_ORDER = NEW_ORDER_RAW.map(s => `${LESSON_00_ID}-${s.replace('*', '')}`)
const NEW_IS_MORE = NEW_ORDER_RAW.map(s => s.endsWith('*'))

/** 예전 단계 번호 → 새 번호 (같은 단계) */
export function lesson00SameStep(oldIdx: number): number {
  const id = LESSON_00_OLD_ORDER[oldIdx]
  return id ? LESSON_00_NEW_ORDER.indexOf(id) : -1
}

/**
 * 예전 진도(지금 위치·가장 멀리 간 곳) → 새 진도
 * 아직 보지 않은 단계를 건너뛰지 않도록, 예전 순서에서 oldIdx 이후 단계들 중
 * 새 순서에서 가장 앞에 있는 (더 알아보기가 아닌) 단계 번호로 옮긴다. (조금 되풀이될 수 있음)
 * 끝까지 간 진도(31 이상)는 새 단계 수로.
 */
export function migrateLesson00Index(oldIdx: number): number {
  if (!(oldIdx > 0)) return 0
  if (oldIdx >= LESSON_00_OLD_ORDER.length) return LESSON_00_NEW_ORDER.length
  let best = Infinity
  for (let i = oldIdx; i < LESSON_00_OLD_ORDER.length; i++) {
    const n = LESSON_00_NEW_ORDER.indexOf(LESSON_00_OLD_ORDER[i])
    if (n >= 0 && !NEW_IS_MORE[n] && n < best) best = n
  }
  if (Number.isFinite(best)) return best
  // 남은 것이 모두 '더 알아보기'면 본 흐름의 마지막 단계로
  return NEW_IS_MORE.lastIndexOf(false)
}

/**
 * 예전 '가장 멀리 간 곳' → 새 번호 — 진도 %가 크게 줄지 않도록 비율로 옮김
 * (본 흐름 마지막 단계를 넘지 않음, 지금 위치보다 작지 않음)
 */
export function migrateLesson00Best(oldBest: number, newProgress: number): number {
  if (!(oldBest > 0)) return Math.max(0, newProgress)
  if (oldBest >= LESSON_00_OLD_ORDER.length) return LESSON_00_NEW_ORDER.length
  const lastMain = NEW_IS_MORE.lastIndexOf(false)
  const prop = Math.round((oldBest * (lastMain + 1)) / LESSON_00_OLD_ORDER.length)
  return Math.max(newProgress, Math.min(lastMain, prop))
}

/** 과 안 학습 상태(pali-lesson-session)의 0과 푼 문제 번호를 새 번호로 (localStorage 직접) */
export function migrateLesson00Session() {
  try {
    const KEY = 'pali-lesson-session'
    const all = JSON.parse(localStorage.getItem(KEY) || '{}')
    const s = all[LESSON_00_ID]
    if (!s || !s.answers) return
    const next: Record<number, unknown> = {}
    for (const [k, v] of Object.entries(s.answers)) {
      const n = lesson00SameStep(Number(k))
      // 보기 섞는 순서가 단계 번호에 따라 달라서, 예전에 고른 보기 번호(sel)는 버리고 정답 여부만 남김
      if (n >= 0 && v && typeof v === 'object') next[n] = { ...(v as object), sel: -1 }
    }
    all[LESSON_00_ID] = { ...s, answers: next }
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch { /* 무시 */ }
}
