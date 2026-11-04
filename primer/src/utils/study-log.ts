// 학습 기록 관리 — 날짜별 학습 시간, 과목, 점수, 횟수 저장

const STORAGE_KEY = 'pali-study-log'

export interface StudyEntry {
  lessonId: string
  lessonTitle: string
  minutes: number
  score: number       // 정답 수
  totalSteps: number  // 전체 스텝 수
  hearts: number      // 남은 하트
  timestamp: number   // 밀리초
}

export interface DayLog {
  date: string          // YYYY-MM-DD
  entries: StudyEntry[]
  totalMinutes: number
  sessionCount: number
}

// 전체 로그 읽기
function getAllLogs(): Record<string, DayLog> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch { return {} }
}

// 학습 기록 저장
export function addStudyEntry(entry: StudyEntry) {
  const logs = getAllLogs()
  const date = new Date(entry.timestamp).toISOString().slice(0, 10)

  if (!logs[date]) {
    logs[date] = { date, entries: [], totalMinutes: 0, sessionCount: 0 }
  }

  logs[date].entries.push(entry)
  logs[date].totalMinutes += entry.minutes
  logs[date].sessionCount += 1

  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))

  // 학습 날짜 캘린더용 (호환)
  const dates: string[] = JSON.parse(localStorage.getItem('pali-study-dates') || '[]')
  if (!dates.includes(date)) {
    dates.push(date)
    localStorage.setItem('pali-study-dates', JSON.stringify(dates))
  }
}

// 특정 날짜 로그 조회
export function getDayLog(date: string): DayLog | null {
  return getAllLogs()[date] || null
}

// 특정 월의 학습 날짜 목록 (캘린더용)
export function getMonthStudyDates(year: number, month: number): Set<string> {
  const logs = getAllLogs()
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`
  const dates = new Set<string>()
  for (const date of Object.keys(logs)) {
    if (date.startsWith(prefix)) dates.add(date)
  }
  return dates
}

// 전체 학습 통계
export function getTotalStats() {
  const logs = getAllLogs()
  let totalDays = 0, totalSessions = 0, totalMinutes = 0
  for (const day of Object.values(logs)) {
    totalDays++
    totalSessions += day.sessionCount
    totalMinutes += day.totalMinutes
  }
  return { totalDays, totalSessions, totalMinutes }
}
