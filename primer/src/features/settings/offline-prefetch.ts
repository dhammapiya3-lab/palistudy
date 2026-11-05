// 오프라인 대비 — 와이파이로 연결돼 있을 때 앱이 한가한 틈에 모든 과 내용을 미리 받아 둠
// (받은 파일은 서비스워커가 저장해 두어, 인터넷이 끊겨도 과를 열 수 있음)
// - 설정에서 끌 수 있음 (기본 켜짐)
// - 데이터 절약 모드(saveData)이거나 휴대폰 데이터(cellular)로 연결돼 있으면 받지 않음
// - navigator.connection을 모르는 브라우저(아이폰 등)는 그냥 받음
import { loadAllLessons } from '../grammar/lessons'

const KEY = 'primer-offline-prefetch'

export function isPrefetchEnabled(): boolean {
  try { return localStorage.getItem(KEY) !== 'false' } catch { return true }
}

export function setPrefetchEnabled(on: boolean) {
  try { localStorage.setItem(KEY, on ? 'true' : 'false') } catch { /* 무시 */ }
  if (on) schedulePrefetch(1000)
}

interface NetInfo { type?: string; saveData?: boolean; effectiveType?: string }

function connectionAllows(): boolean {
  const c = (navigator as Navigator & { connection?: NetInfo }).connection
  if (!c) return true
  if (c.saveData) return false
  // type이 있으면 와이파이·유선만 (cellular·bluetooth 등은 받지 않음)
  if (c.type && !['wifi', 'ethernet', 'unknown', 'other'].includes(c.type)) return false
  // type을 모르면 느린 연결(2g)만 피함
  if (!c.type && c.effectiveType && /(^|-)2g$/.test(c.effectiveType)) return false
  return true
}

let started = false

/** 앱 시작 뒤 한가할 때 한 번 (delay ms 뒤부터) */
export function schedulePrefetch(delay = 8000) {
  if (started || typeof window === 'undefined') return
  if (!isPrefetchEnabled() || !navigator.onLine || !connectionAllows()) return
  started = true
  const run = () => {
    if (!isPrefetchEnabled() || !connectionAllows()) { started = false; return }
    loadAllLessons().catch(() => { started = false /* 다음에 다시 */ })
  }
  const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback
  setTimeout(() => {
    if (idle) idle(run, { timeout: 15000 })
    else run()
  }, delay)
}
