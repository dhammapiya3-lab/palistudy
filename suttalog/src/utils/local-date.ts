// 현지(기기) 시간 기준 날짜 문자열 'YYYY-MM-DD'.
// toISOString()은 UTC 날짜라서 한국 시간 0~9시에는 하루 전 날짜가 나옴 → 이 함수를 쓸 것.
export function localDateStr(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
