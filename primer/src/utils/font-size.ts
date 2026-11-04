// 글씨 크기 조절 — html font-size로 앱 전체 스케일
// Tailwind rem 기반이므로 html font-size 변경 시 전체 반영

const STORAGE_KEY = 'pali-primer-fontsize'

/** 크기 단계 정의 (px) */
export const FONT_SIZES = [
  { key: 'small', label: '작게', px: 15 },
  { key: 'medium', label: '보통', px: 17 },
  { key: 'large', label: '크게', px: 19 },
  { key: 'xlarge', label: '매우 크게', px: 21 },
] as const

export type FontSizeKey = typeof FONT_SIZES[number]['key']

const DEFAULT_KEY: FontSizeKey = 'large'

/** 저장된 크기 키 읽기 */
export function getSavedFontSize(): FontSizeKey {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && FONT_SIZES.some(s => s.key === saved)) return saved as FontSizeKey
  return DEFAULT_KEY
}

/** 크기 저장 + 적용 */
export function setFontSize(key: FontSizeKey) {
  localStorage.setItem(STORAGE_KEY, key)
  applyFontSize()
}

/** html font-size에 적용 */
export function applyFontSize() {
  const key = getSavedFontSize()
  const size = FONT_SIZES.find(s => s.key === key)
  if (size) {
    document.documentElement.style.fontSize = `${size.px}px`
  }
}
