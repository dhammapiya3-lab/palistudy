// 경전 과별 진도 읽기 — 홈·학습맵·복습·프로필이 같은 계산을 쓰도록 한 곳에 모음.
//
// 저장 키 (ScriptureLearn이 기록):
//   suttalog-progress-<id> : 현재 스텝 인덱스(0부터)
//   suttalog-done-<id>     : 'true' 이면 끝까지 마침
//   suttalog-total-<id>    : (있으면) 원본 데이터 기준 스텝 수 (진도 번호도 원본 기준)
// total 키가 없으면 레슨 데이터의 원본 스텝 수(RAW_TOTALS)를 쓴다.
// 레슨 데이터(약 2MB)를 홈에서 불러오지 않으려고 스텝 수만 상수로 둔다.
import { LESSON_ORDER, LESSON_META } from './lessons-meta'

const RAW_TOTALS: Record<string, number> = {
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

/** 지금 이어서 공부할 과: 진행 중인 과 중 학습맵 순서상 첫 번째 → 없으면 아직 안 끝난 첫 과 */
export function getCurrentLessonId(): string {
  const all = getAllProgress()
  const inProgress = all.find(p => p.started && !p.done)
  if (inProgress) return inProgress.id
  return (all.find(p => !p.done) ?? all[0]).id
}

export function lessonExists(id: string): boolean {
  return id in LESSON_META
}
