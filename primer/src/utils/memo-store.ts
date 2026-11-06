// 피드백 메모 저장소 (Supabase) — 두 앱이 함께 씀
// 메모는 함수(memo_list 등)를 거쳐서만 읽고 쓸 수 있음:
//   · 보통 기기: 이 기기에서 쓴 메모만 (기기마다 만든 비밀 열쇠로 구분)
//   · 관리자: 관리자 암호가 맞을 때만 모든 메모
const URL_ = 'https://ncoghwflcgdkedchdimd.supabase.co/rest/v1/rpc/'
const KEY = 'sb_publishable_uvVDjOPLa4kn7F-LTGiEUA_PbjOjSfk'
const DEVICE_KEY = 'palistudy-memo-key'
const ADMIN_CODE = 'palistudy-memo-admin-code'

/** 이 기기의 비밀 열쇠 (다른 기기·다른 사람은 모름) */
export function deviceKey(): string {
  let k = ''
  try { k = localStorage.getItem(DEVICE_KEY) || '' } catch { /* 무시 */ }
  if (k.length < 16) {
    const a = new Uint8Array(24)
    crypto.getRandomValues(a)
    k = Array.from(a).map(b => b.toString(16).padStart(2, '0')).join('')
    try { localStorage.setItem(DEVICE_KEY, k) } catch { /* 무시 */ }
  }
  return k
}

export function getAdminCode(): string {
  try { return localStorage.getItem(ADMIN_CODE) || '' } catch { return '' }
}
export function setAdminCode(code: string | null) {
  try { if (code) localStorage.setItem(ADMIN_CODE, code); else localStorage.removeItem(ADMIN_CODE) } catch { /* 무시 */ }
}

export async function rpc<T = unknown>(name: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(URL_ + name, {
    method: 'POST',
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    let msg = ''
    try { msg = (await res.json())?.message || '' } catch { /* 무시 */ }
    const err = new Error(msg || `http-${res.status}`) as Error & { code?: string }
    err.code = res.status === 401 || res.status === 403 ? 'permission-denied' : res.status === 400 ? 'invalid-argument' : res.status >= 500 ? 'unavailable' : ''
    throw err
  }
  const t = await res.text()
  return (t ? JSON.parse(t) : null) as T
}

export interface MemoRow {
  id: string; app: string; page: string; step_id: string | null; status: string | null; text: string
  images: unknown; snapshot: string | null; created_at: string; updated_at: string | null
  device_id: string | null; user_agent: string | null; mine: boolean
}
