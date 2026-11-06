// 피드백 메모 — 빠알리 프라이머와 같은 온라인 저장소(Supabase 'memos')에 저장
// 이 앱의 메모는 app: 'suttalog'로 구분 (프라이머 목록에는 보이지 않음)
// 보통 기기는 자기 메모만, 관리자 암호가 맞을 때만 모든 메모를 받음 (저장소가 직접 확인)
import { fitImages, withTimeout, friendlyError } from './memo-fit'
import { rpc, deviceKey, getAdminCode, type MemoRow } from './memo-store'

const APP = 'suttalog'
const DEVICE_ID_KEY = 'pali-memo-device-id' // 프라이머와 같은 키 (같은 주소라 기기 ID도 같음)
const MAX_IMAGE_WIDTH = 800
const SAVE_TIMEOUT = 25000

export interface MemoImage { order: number; dataUrl: string; name: string }
export type MemoStatus = '승인' | '보류' | '미승인'

export interface Memo {
  id?: string
  page: string        // 사람이 읽는 위치 (예: '경전: 보배경 · 15번째 단계')
  stepId?: string     // 위치 ID — 경전 과는 '{lessonId}:{원본 단계 번호}', 그 밖은 화면 주소
  status?: MemoStatus
  text: string
  images: MemoImage[]
  createdAt: string
  updatedAt?: string
  deviceId: string
  userAgent: string
  snapshot?: string   // 메모를 쓴 단계의 내용 요약(JSON) — 단계 번호가 바뀌어도 찾을 수 있게
}

export function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY)
  if (!id) {
    id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
    localStorage.setItem(DEVICE_ID_KEY, id)
  }
  return id
}

function fromRow(r: MemoRow): Memo {
  return {
    id: r.id, page: r.page, stepId: r.step_id || undefined, status: (r.status || undefined) as MemoStatus | undefined,
    text: r.text, images: Array.isArray(r.images) ? (r.images as MemoImage[]) : [],
    createdAt: r.created_at, updatedAt: r.updated_at || undefined,
    // 이 기기에서 쓴 메모는 이 기기 ID로 (목록에서 '내 메모'로 보이고 고칠 수 있게)
    deviceId: r.mine ? getDeviceId() : (r.device_id || ''),
    userAgent: r.user_agent || '', snapshot: r.snapshot || undefined,
  }
}
const adminCode = () => getAdminCode() || null

// ── 사진 ──
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let { width, height } = img
      if (width > MAX_IMAGE_WIDTH) { height = Math.round(height * (MAX_IMAGE_WIDTH / width)); width = MAX_IMAGE_WIDTH }
      canvas.width = width; canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', 0.8))
    }
    img.onerror = () => reject(new Error('image-read'))
    img.src = URL.createObjectURL(file)
  })
}

// ── 목록 (화면 여러 곳에서 같이 쓰도록 한 번 받아 둠) ──
let cache: Memo[] | null = null
const listeners = new Set<() => void>()
export function onMemosChanged(fn: () => void): () => void { listeners.add(fn); return () => { listeners.delete(fn) } }
function emit() { listeners.forEach(fn => fn()) }
export function cachedMemos(): Memo[] | null { return cache }

export async function getMemos(): Promise<Memo[]> {
  try {
    const rows = await rpc<MemoRow[]>('memo_list', { p_app: APP, p_device_key: deviceKey(), p_admin_code: adminCode() })
    cache = (rows || []).map(fromRow)
  } catch (e) {
    console.error('메모 조회 실패:', e)
    return cache || []
  }
  emit()
  return cache
}

export let lastMemoError = ''

export async function saveMemo(page: string, text: string, imageFiles: File[], stepId?: string, snapshot?: string, createdAt?: string): Promise<boolean> {
  lastMemoError = ''
  try {
    let images: MemoImage[] = []
    for (let i = 0; i < imageFiles.length; i++) {
      images.push({ order: i + 1, dataUrl: await fileToDataUrl(imageFiles[i]), name: imageFiles[i].name || `image-${i + 1}.jpg` })
    }
    const fitted = await fitImages(text, images)
    if (!fitted) throw new Error('too-big')
    images = fitted
    await withTimeout(rpc('memo_add', {
      p_app: APP, p_page: page, p_text: text, p_images: images, p_step_id: stepId ?? null, p_snapshot: snapshot ?? null,
      p_device_id: getDeviceId(), p_device_key: deviceKey(), p_user_agent: navigator.userAgent.slice(0, 150),
      p_created_at: createdAt ?? null,
    }), SAVE_TIMEOUT)
    getMemos()
    return true
  } catch (e) {
    console.error('메모 저장 실패:', e)
    lastMemoError = friendlyError(e)
    return false
  }
}

export async function updateMemo(memoId: string, text: string, images: MemoImage[]): Promise<boolean> {
  lastMemoError = ''
  try {
    const fitted = await fitImages(text, images)
    if (!fitted) throw new Error('too-big')
    const ok = await withTimeout(rpc<boolean>('memo_update', { p_id: memoId, p_text: text, p_images: fitted, p_step_id: null, p_device_key: deviceKey(), p_admin_code: adminCode() }), SAVE_TIMEOUT)
    if (!ok) throw Object.assign(new Error('denied'), { code: 'permission-denied' })
    getMemos()
    return true
  } catch (e) {
    console.error('메모 수정 실패:', e)
    lastMemoError = friendlyError(e)
    return false
  }
}

/** 검토 상태 바꾸기 (null이면 상태 지움) */
export async function updateMemoStatus(memoId: string, status: MemoStatus | null): Promise<boolean> {
  try {
    const ok = await rpc<boolean>('memo_set_status', { p_id: memoId, p_status: status, p_admin_code: adminCode() })
    if (!ok) return false
    getMemos()
    return true
  } catch (e) {
    console.error('메모 상태 바꾸기 실패:', e)
    return false
  }
}

export async function deleteMemo(memoId: string): Promise<boolean> {
  try {
    const ok = await rpc<boolean>('memo_delete', { p_id: memoId, p_device_key: deviceKey(), p_admin_code: adminCode() })
    if (!ok) return false
    if (cache) { cache = cache.filter(m => m.id !== memoId); emit() }
    return true
  } catch (e) {
    console.error('메모 삭제 실패:', e)
    return false
  }
}

// ── 예전 메모 옮기기: 기기에만 저장돼 있던 메모(suttalog-memo:…)를 온라인 저장소로 올리고 기기에서 지움 ──
const OLD_PREFIX = 'suttalog-memo:'
const OLD_INDEX = 'suttalog-memo-index'
let migrating = false

export async function migrateLocalMemos(lessonTitle: (id: string) => string): Promise<number> {
  if (migrating) return 0
  migrating = true
  let moved = 0
  try {
    let ids: string[] = []
    try { ids = JSON.parse(localStorage.getItem(OLD_INDEX) || '[]') } catch { ids = [] }
    for (const pageId of [...ids]) {
      const raw = localStorage.getItem(OLD_PREFIX + pageId)
      if (!raw) { removeOld(pageId); continue }
      let m: { body?: string; lessonId?: string; stepIdx?: number; stepSnapshot?: unknown; createdAt?: string }
      try { m = JSON.parse(raw) } catch { removeOld(pageId); continue }
      if (!m.body || !m.body.trim()) { removeOld(pageId); continue }
      const lessonId = m.lessonId || pageId.split(':')[0]
      const stepIdx = Number.isInteger(m.stepIdx) ? (m.stepIdx as number) : Number(pageId.split(':')[1] || 0)
      const ok = await saveMemo(stepLabel(lessonTitle(lessonId), stepIdx), m.body, [], pageId,
        m.stepSnapshot ? JSON.stringify(m.stepSnapshot) : undefined, m.createdAt)
      if (!ok) break // 인터넷이 안 되면 다음에 다시
      removeOld(pageId)
      moved++
    }
  } finally {
    migrating = false
  }
  return moved
}
function removeOld(pageId: string) {
  localStorage.removeItem(OLD_PREFIX + pageId)
  try {
    const ids: string[] = JSON.parse(localStorage.getItem(OLD_INDEX) || '[]')
    localStorage.setItem(OLD_INDEX, JSON.stringify(ids.filter(i => i !== pageId)))
  } catch { /* 무시 */ }
}

export function stepLabel(lessonTitle: string, rawIdx: number): string {
  return `경전: ${lessonTitle} · ${rawIdx + 1}번째 단계`
}

// ── 지금 보고 있는 위치 (경전 과 화면이 알려 줌) ──
export interface MemoContext { stepId: string; page: string; snapshot?: string; lessonId?: string }
let ctx: MemoContext | null = null
export function setMemoContext(c: MemoContext | null) { ctx = c }
export function getMemoContext(): MemoContext | null { return ctx }
