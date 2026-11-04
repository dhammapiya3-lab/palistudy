// 화면 테마(밝게/어둡게/휴대폰 설정 따르기) 적용
// CSS의 어두운 색은 <html data-theme="dark"> 에 걸려 있다.

export type ThemeSetting = 'light' | 'dark' | 'system'

const media = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : null

let current: ThemeSetting = 'system'

/** 실제로 어두운 화면인지 */
export function isDarkTheme(setting: ThemeSetting = current): boolean {
  if (setting === 'dark') return true
  if (setting === 'light') return false
  return !!media?.matches
}

/** <html>에 테마 적용 */
export function applyTheme(setting: ThemeSetting) {
  current = setting
  const dark = isDarkTheme(setting)
  const root = document.documentElement
  root.dataset.theme = dark ? 'dark' : 'light'
  root.style.colorScheme = dark ? 'dark' : 'light'
  // 주소창·상태표시줄 색
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', dark ? '#141210' : '#C06B0A')
}

// '휴대폰 설정 따르기'일 때 휴대폰 설정이 바뀌면 바로 반영
media?.addEventListener?.('change', () => {
  if (current === 'system') applyTheme('system')
})
