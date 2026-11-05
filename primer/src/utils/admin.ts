// 피드백 메모 관리자 — 관리자 암호를 한 번 넣은 기기만 모든 메모를 보고 검토 상태를 바꿀 수 있음
// 두 앱이 같은 주소(dhammapiya3-lab.github.io)라 이 기기 표시는 두 앱이 함께 씀
// ※ 화면에서 가리는 것이므로, 저장소 자체의 읽기 권한은 Firebase 보안 규칙에서 따로 막아야 함
const KEY = 'palistudy-memo-admin'
const HASH = 'd47a64bf883184a83bd8127b8a583b7c14d79e91b9f73ced8b4cf419a1770e06'

export function isAdmin(): boolean {
  try { return localStorage.getItem(KEY) === HASH } catch { return false }
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

/** 암호가 맞으면 이 기기를 관리자로 */
export async function unlockAdmin(code: string): Promise<boolean> {
  const h = await sha256('palistudy-admin:' + code.trim())
  if (h !== HASH) return false
  try { localStorage.setItem(KEY, HASH) } catch { /* 무시 */ }
  return true
}

export function lockAdmin() {
  try { localStorage.removeItem(KEY) } catch { /* 무시 */ }
}
