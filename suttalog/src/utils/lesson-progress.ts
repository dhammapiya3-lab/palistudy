// 경전 과별 진도 읽기 — 홈·학습맵·복습·프로필이 같은 계산을 쓰도록 한 곳에 모음.
//
// 저장 키 (ScriptureLearn이 기록):
//   suttalog-progress-<id> : 현재 스텝 인덱스(0부터)
//   suttalog-done-<id>     : 'true' 이면 끝까지 마침
//   suttalog-total-<id>    : (있으면) 원본 데이터 기준 스텝 수 (진도 번호도 원본 기준)
//   suttalog-last-studied  : { id, at } — 5단계 이상 실제로 넘긴 마지막 과
// total 키가 없으면 레슨 데이터의 원본 스텝 수(RAW_TOTALS)를 쓴다.
// 레슨 데이터(약 2MB)를 홈에서 불러오지 않으려고 스텝 수만 상수로 둔다.
import { LESSON_ORDER, LESSON_META } from './lessons-meta'

export const RAW_TOTALS: Record<string, number> = {
  'namo': 13,
  'trisarana': 32,
  'pancasila': 43,
  'tisarana-guna': 55,
  'sn45-8': 193,
  'mangala': 162,
  'sn56-11': 314,
  'metta': 116,
  'sn22-59': 200,
  'ratana': 229,
  'mn10': 1008,
}

/** 과마다 낱말 카드(teach) 수 — '배운 낱말 n / 약 m' 표시용 */
export const TEACH_TOTALS: Record<string, number> = {
  'namo': 5, 'trisarana': 15, 'pancasila': 25, 'tisarana-guna': 39, 'sn45-8': 155, 'mangala': 137,
  'sn56-11': 223, 'metta': 93, 'sn22-59': 157, 'ratana': 194, 'mn10': 808,
}

/** 한 단계에 드는 평균 시간(초) — 분량 표시용 어림값 */
export const SECONDS_PER_STEP = 12

/** 이 단계 수 이하로 본 과는 '잠깐 열어 본 것'으로 보고 이어서 할 과로 치지 않음 */
export const PEEK_STEPS = 5

export type LessonProgress = {
  id: string
  step: number      // 현재 스텝 인덱스
  total: number     // 전체 스텝 수
  ratio: number     // 0~1
  done: boolean
  started: boolean
}

function num(key: string): number {
  const v = Number(localStorage.getItem(key))
  return Number.isFinite(v) ? v : 0
}

export function getLessonProgress(id: string): LessonProgress {
  const step = Math.max(0, num(`suttalog-progress-${id}`))
  const savedTotal = num(`suttalog-total-${id}`)
  const total = savedTotal > 0 ? savedTotal : (RAW_TOTALS[id] ?? 1)
  const done = localStorage.getItem(`suttalog-done-${id}`) === 'true'
  // 마지막 스텝까지 왔으면 거의 끝(100%는 완료 표시가 있을 때만)
  const ratio = done ? 1 : Math.min(0.99, total > 1 ? step / (total - 1) : 0)
  return { id, step, total, ratio, done, started: done || step > 0 }
}

export function getAllProgress(): LessonProgress[] {
  return LESSON_ORDER.map(id => getLessonProgress(id))
}

/** 잠깐 열어 본 과(5단계도 안 넘김, 안 끝냄) */
export function isPeek(p: LessonProgress): boolean {
  return !p.done && p.step < PEEK_STEPS
}

/** 학습 화면이 기록한 '마지막으로 공부한 과' */
export function getLastStudied(): { id: string; at: number } | null {
  try {
    const v = JSON.parse(localStorage.getItem('suttalog-last-studied') || 'null')
    if (v && typeof v.id === 'string' && v.id in LESSON_META) return { id: v.id, at: Number(v.at) || 0 }
  } catch { /* 무시 */ }
  return null
}

/** 순서상 다음 과 중 아직 안 끝낸 첫 과(없으면 앞에서부터 안 끝낸 첫 과) */
function nextUndone(afterId: string | null, all: LessonProgress[]): string | null {
  const start = afterId ? (LESSON_ORDER as readonly string[]).indexOf(afterId) + 1 : 0
  const later = all.slice(start).find(p => !p.done)
  if (later) return later.id
  return all.find(p => !p.done)?.id ?? null
}

/**
 * 지금 이어서 공부할 과:
 * 1) 마지막으로 공부한 과(아직 안 끝냄)
 * 2) 5단계 이상 진행한 과 중 학습맵 순서상 첫 과 (예전 기록만 있는 경우)
 * 3) 아직 안 끝낸 첫 과
 * 잠깐 열어 본 과(5단계 미만)는 이어서 할 과로 치지 않음.
 */
export function getCurrentLessonId(): string {
  const all = getAllProgress()
  const last = getLastStudied()
  if (last) {
    const p = all.find(x => x.id === last.id)
    if (p && !p.done) return p.id
    // 마지막으로 공부한 과를 마쳤으면 그다음 과
    const n = nextUndone(last.id, all)
    if (n) return n
  }
  const inProgress = all.find(p => p.started && !p.done && !isPeek(p))
  if (inProgress) return inProgress.id
  return (all.find(p => !p.done) ?? all[0]).id
}

/** 홈 카드 아래 '추천 다음 과' — 지금 과 다음으로, 순서상 아직 안 끝낸 과 */
export function getRecommendedNextId(currentId: string): string | null {
  const all = getAllProgress().filter(p => p.id !== currentId)
  const order = LESSON_ORDER as readonly string[]
  const cur = order.indexOf(currentId)
  return (all.find(p => !p.done && order.indexOf(p.id) > cur) ?? all.find(p => !p.done))?.id ?? null
}

/** 전체 진도 — 실제 단계 수 기준 */
export function getOverall(): { doneLessons: number; lessons: number; stepsDone: number; stepsTotal: number; pct: number } {
  const all = getAllProgress()
  let stepsDone = 0, stepsTotal = 0
  for (const p of all) {
    stepsTotal += p.total
    stepsDone += p.done ? p.total : Math.min(p.step, p.total)
  }
  return {
    doneLessons: all.filter(p => p.done).length,
    lessons: all.length,
    stepsDone, stepsTotal,
    pct: stepsTotal ? Math.floor((stepsDone / stepsTotal) * 100) : 0,
  }
}

/** 단계 수 → '약 3분' / '약 1시간 20분' */
export function formatDuration(steps: number): string {
  const min = Math.max(1, Math.round((steps * SECONDS_PER_STEP) / 60))
  if (min < 60) return `약 ${min}분`
  const h = Math.floor(min / 60), m = Math.round((min % 60) / 10) * 10
  return m ? `약 ${h}시간 ${m}분` : `약 ${h}시간`
}

/** 하루 목표(분)로 며칠 걸리는지 */
export function daysAtGoal(steps: number, goalMin: number): number {
  return Math.max(1, Math.ceil((steps * SECONDS_PER_STEP) / 60 / Math.max(1, goalMin)))
}

export function lessonExists(id: string): boolean {
  return id in LESSON_META
}
