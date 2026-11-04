// 새 배포 알림 — 공부 도중 화면을 저절로 새로고침하지 않는다.
// 새 판이 올라오면 '새 버전이 있어요' 띠만 보여 주고, 사용자가 누를 때 새로고침한다.
// (앱을 새로 열면 서버에서 새 index.html을 받으므로 저절로 새 판이 적용됨)

const CHECK_INTERVAL = 10 * 60 * 1000 // 10분마다
const BASE = import.meta.env.BASE_URL || '/'

let currentVersion: string | null = null
let updateReady = false
const listeners = new Set<(ready: boolean) => void>()
let registration: ServiceWorkerRegistration | null = null

function setReady() {
  if (updateReady) return
  updateReady = true
  listeners.forEach(fn => fn(true))
}

export function isUpdateReady() { return updateReady }

export function onUpdateReady(fn: (ready: boolean) => void): () => void {
  listeners.add(fn)
  if (updateReady) fn(true)
  return () => { listeners.delete(fn) }
}

async function fetchVersion(): Promise<string | null> {
  try {
    const res = await fetch(`${BASE}version.json?_=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.v || null
  } catch {
    return null
  }
}

async function check() {
  const latest = await fetchVersion()
  if (!latest) return
  if (currentVersion === null) { currentVersion = latest; return }
  if (latest !== currentVersion) {
    console.info(`[version-check] 새 버전: ${currentVersion} → ${latest}`)
    registration?.update().catch(() => {})
    setReady()
  }
}

/** 사용자가 '새로고침'을 눌렀을 때 — 기다리는 새 서비스워커를 켜고 새로고침 */
export function applyUpdate() {
  const waiting = registration?.waiting
  if (waiting) {
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true })
    waiting.postMessage({ type: 'SKIP_WAITING' })
    // 혹시 전환 신호가 오지 않으면 그냥 새로고침
    setTimeout(() => window.location.reload(), 1500)
  } else {
    window.location.reload()
  }
}

/** 앱 시작 시 호출 — 서비스워커 등록 + 새 판 확인 */
export function startVersionCheck() {
  if ('serviceWorker' in navigator && !import.meta.env.DEV) {
    navigator.serviceWorker.register(`${BASE}sw.js`).then(reg => {
      registration = reg
      if (reg.waiting && navigator.serviceWorker.controller) setReady()
      reg.addEventListener('updatefound', () => {
        const w = reg.installing
        w?.addEventListener('statechange', () => {
          // 새 판이 설치되어 기다리는 중 → 띠만 보여 줌 (강제 새로고침 안 함)
          if (w.state === 'installed' && navigator.serviceWorker.controller) setReady()
        })
      })
    }).catch(() => { /* 무시 */ })
  }

  if (import.meta.env.DEV) return
  check()
  setInterval(check, CHECK_INTERVAL)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') check()
  })
}
