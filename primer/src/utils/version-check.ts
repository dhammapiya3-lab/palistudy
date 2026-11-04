// 버전 자동 감지 — 새 배포 시 브라우저 자동 새로고침
// version.json을 주기적으로 + 탭 복귀 시 체크

const CHECK_INTERVAL = 5 * 60 * 1000 // 5분마다
const BASE = import.meta.env.BASE_URL || '/'

let currentVersion: string | null = null

async function fetchVersion(): Promise<string | null> {
  try {
    // 캐시 완전 우회
    const res = await fetch(`${BASE}version.json?_=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.v || null
  } catch {
    return null
  }
}

async function checkAndReload() {
  const latest = await fetchVersion()
  if (!latest) return

  if (currentVersion === null) {
    // 최초 로드 — 현재 버전 기록
    currentVersion = latest
    return
  }

  if (latest !== currentVersion) {
    // 새 버전 감지 — 자동 새로고침
    console.info(`[version-check] 새 버전 감지: ${currentVersion} → ${latest}`)
    currentVersion = latest
    window.location.reload()
  }
}

/** 앱 시작 시 호출 — 주기적 체크 + 탭 복귀 시 체크 */
export function startVersionCheck() {
  // 개발 모드에서는 비활성화
  if (import.meta.env.DEV) return

  // 최초 버전 기록
  checkAndReload()

  // 주기적 체크 (5분)
  setInterval(checkAndReload, CHECK_INTERVAL)

  // 탭 복귀 시 즉시 체크 (가장 효과적)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkAndReload()
    }
  })
}
