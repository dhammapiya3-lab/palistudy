// 날짜 문자열 (YYYY-MM-DD) — 기기 시간대 기준
// toISOString()은 세계 표준시(UTC)라서 한국에서는 오전 9시 전이 '어제'가 되므로 쓰지 않는다.

export function localDateStr(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** 오늘에서 n일 전 날짜 문자열 */
export function localDateStrDaysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return localDateStr(d)
}
