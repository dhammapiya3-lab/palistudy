// 하루 목표·공부 시간·학습일 계산 (홈·프로필·온보딩·설정에서 같이 사용)
//   suttalog-daily-goal            : '5' | '10' | '15' (분, 기본 10)
//   suttalog-study-seconds-<날짜>   : 그날 공부한 초 (학습 화면이 15초마다 더함)
//   suttalog-study-dates           : 공부한 날짜 배열
import { localDateStr } from './local-date'

export const GOAL_OPTIONS = [5, 10, 15] as const
export type DailyGoal = typeof GOAL_OPTIONS[number]

export function getDailyGoal(): DailyGoal {
  const v = Number(localStorage.getItem('suttalog-daily-goal'))
  return (GOAL_OPTIONS as readonly number[]).includes(v) ? (v as DailyGoal) : 10
}

export function setDailyGoal(min: DailyGoal): void {
  localStorage.setItem('suttalog-daily-goal', String(min))
}

export function studySecondsOn(date: string): number {
  const v = Number(localStorage.getItem(`suttalog-study-seconds-${date}`))
  return Number.isFinite(v) && v > 0 ? v : 0
}

export function todayStudySeconds(): number {
  return studySecondsOn(localDateStr())
}

export function readStudyDates(): Set<string> {
  try {
    const v = JSON.parse(localStorage.getItem('suttalog-study-dates') || '[]')
    return new Set(Array.isArray(v) ? v : [])
  } catch { return new Set() }
}

/** 이번 주(월~일) 날짜별 학습 여부 */
export function thisWeek(dates: Set<string>): { label: string; date: string; studied: boolean; isToday: boolean; future: boolean }[] {
  const today = new Date()
  const mondayOffset = (today.getDay() + 6) % 7
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - mondayOffset)
  return ['월', '화', '수', '목', '금', '토', '일'].map((label, i) => {
    const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i)
    const date = localDateStr(d)
    return { label, date, studied: dates.has(date), isToday: i === mondayOffset, future: i > mondayOffset }
  })
}

/** 월요일 기준 주 번호(같은 주인지 비교용) */
function weekKey(d: Date): string {
  const off = (d.getDay() + 6) % 7
  return localDateStr(new Date(d.getFullYear(), d.getMonth(), d.getDate() - off))
}

/**
 * 이어 가는 학습일 수 — 한 주(월~일)에 하루 쉬는 것은 끊기지 않은 것으로 봄.
 * 오늘 아직 공부하지 않았으면 오늘은 빼고 어제부터 셈.
 */
export function forgivingStreak(dates: Set<string>): number {
  const d = new Date()
  if (!dates.has(localDateStr(d))) d.setDate(d.getDate() - 1)
  const restUsed = new Set<string>()
  let n = 0
  for (let guard = 0; guard < 3700; guard++) {
    const key = localDateStr(d)
    if (dates.has(key)) n++
    else {
      const wk = weekKey(d)
      if (restUsed.has(wk)) break
      // 쉼 하루 다음 날(더 이전)도 공부했어야 이어진 것으로 봄
      const prev = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1)
      if (!dates.has(localDateStr(prev))) break
      restUsed.add(wk)
    }
    d.setDate(d.getDate() - 1)
  }
  return n
}

/** 엄격한 연속 학습일 중 가장 긴 기록 */
export function longestStreak(dates: Set<string>): number {
  let best = 0
  for (const s of dates) {
    const [y, m, day] = s.split('-').map(Number)
    if (dates.has(localDateStr(new Date(y, m - 1, day - 1)))) continue // 연속 구간의 첫날에서만 셈
    let n = 0
    const d = new Date(y, m - 1, day)
    while (dates.has(localDateStr(d))) { n++; d.setDate(d.getDate() + 1) }
    best = Math.max(best, n)
  }
  return best
}
