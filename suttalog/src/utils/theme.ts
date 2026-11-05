// 화면 테마(밝게/어둡게/휴대폰 설정 따르기) — 빠알리 프라이머와 같은 동작
// 저장 키: 'suttalog-theme' = 'light' | 'dark' | 'system'(기본: 휴대폰 설정 따르기)
// CSS의 어두운 색은 index.css의 [data-theme="dark"] 에 있음
export type ThemeSetting = 'light' | 'dark' | 'system'

const KEY = 'suttalog-theme'

const media = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : null

let current: ThemeSetting = 'system'

export function getSavedTheme(): ThemeSetting {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : 'system'
  } catch { return 'system' }
}

/** 실제로 어두운 화면인지 */
export function isDarkTheme(setting: ThemeSetting = current): boolean {
  if (setting === 'dark') return true
  if (setting === 'light') return false
  return !!media?.matches
}

/** <html>에 테마 적용 */
export function applyTheme(setting: ThemeSetting = getSavedTheme()) {
  current = setting
  const dark = isDarkTheme(setting)
  const root = document.documentElement
  root.dataset.theme = dark ? 'dark' : 'light'
  root.style.colorScheme = dark ? 'dark' : 'light'
  // 주소창·상태표시줄 색
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', dark ? '#141210' : '#C06B0A')
}

/** 저장 + 적용 */
export function setTheme(setting: ThemeSetting) {
  try {
    if (setting === 'system') localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, setting)
  } catch { /* 무시 */ }
  applyTheme(setting)
}

// '휴대폰 설정 따르기'일 때 휴대폰 설정이 바뀌면 바로 반영
media?.addEventListener?.('change', () => {
  if (current === 'system') applyTheme('system')
})
