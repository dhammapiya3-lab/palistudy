// 피드백 메모 — 빠알리 프라이머와 같은 온라인 저장소(Firestore 'pali-primer-memos')에 저장
// 이 앱의 메모는 app: 'suttalog' 표시로 구분 (프라이머 목록에는 보이지 않음)
// Firebase 라이브러리 없이 Firestore REST 주소로 직접 주고받음
import { fitImages, withTimeout, friendlyError } from './memo-fit'

const PROJECT = 'panditarama-video'
const API_KEY = 'AIzaSyDDNRL69ugkKb6mJPnJb2kQud0_3b97viA'
const COLLECTION = 'pali-primer-memos'
const APP = 'suttalog'
const DOCS = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`
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

// ── Firestore 값 변환 ──
type FsValue = Record<string, unknown>
function toValue(v: unknown): FsValue {
  if (v === null || v === undefined) return { nullValue: null }
  if (typeof v === 'string') return { stringValue: v }
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v }
  if (typeof v === 'boolean') return { booleanValue: v }
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toValue) } }
  if (typeof v === 'object') return { mapValue: { fields: toFields(v as Record<string, unknown>) } }
  return { stringValue: String(v) }
}
function toFields(o: Record<string, unknown>): Record<string, FsValue> {
  const f: Record<string, FsValue> = {}
  for (const [k, v] of Object.entries(o)) if (v !== undefined) f[k] = toValue(v)
  return f
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromValue(v: any): unknown {
  if (!v) return undefined
  if ('stringValue' in v) return v.stringValue
  if ('integerValue' in v) return Number(v.integerValue)
  if ('doubleValue' in v) return v.doubleValue
  if ('booleanValue' in v) return v.booleanValue
  if ('nullValue' in v) return undefined
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(fromValue)
  if ('mapValue' in v) return fromFields(v.mapValue.fields || {})
  return undefined
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromFields(f: Record<string, any>): Record<string, unknown> {
  const o: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(f)) o[k] = fromValue(v)
  return o
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDoc(d: any): Memo & { app?: string } {
  const o = fromFields(d.fields || {}) as unknown as Memo & { app?: string }
  return { ...o, id: String(d.name).split('/').pop(), images: Array.isArray(o.images) ? o.images : [] }
}

async function call(url: string, init?: RequestInit) {
  const res = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } })
  if (!res.ok) {
    let msg = ''
    try { msg = (await res.json())?.error?.status || '' } catch { /* 무시 */ }
    const err = new Error(msg || `http-${res.status}`) as Error & { code?: string }
    err.code = res.status === 403 ? 'permission-denied' : res.status === 400 ? 'invalid-argument' : res.status >= 500 ? 'unavailable' : ''
    throw err
  }
  return res.status === 204 ? null : res.json()
}

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
  let docs: (Memo & { app?: string })[] = []
  try {
    const rows = await call(`${DOCS}:runQuery?key=${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({ structuredQuery: {
        from: [{ collectionId: COLLECTION }],
        where: { fieldFilter: { field: { fieldPath: 'app' }, op: 'EQUAL', value: { stringValue: APP } } },
      } }),
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    docs = (rows || []).filter((r: any) => r.document).map((r: any) => fromDoc(r.document))
  } catch {
    // 조건 검색이 막혀 있으면 전체를 쪽 단위로 받아서 고름
    try {
      docs = []
      let tok = ''
      for (let i = 0; i < 20; i++) {
        const j = await call(`${DOCS}/${COLLECTION}?key=${API_KEY}&pageSize=300${tok ? `&pageToken=${encodeURIComponent(tok)}` : ''}`)
        docs.push(...(j?.documents || []).map(fromDoc))
        tok = j?.nextPageToken || ''
        if (!tok) break
      }
    } catch (e) {
      console.error('메모 조회 실패:', e)
      return cache || []
    }
  }
  cache = docs.filter(m => m.app === APP).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
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
    const memo = {
      app: APP, page, text, images,
      createdAt: createdAt || new Date().toISOString(),
      deviceId: getDeviceId(),
      userAgent: navigator.userAgent.slice(0, 150),
      stepId, snapshot,
    }
    await withTimeout(call(`${DOCS}/${COLLECTION}?key=${API_KEY}`, { method: 'POST', body: JSON.stringify({ fields: toFields(memo) }) }), SAVE_TIMEOUT)
    getMemos()
    return true
  } catch (e) {
    console.error('메모 저장 실패:', e)
    lastMemoError = friendlyError(e)
    return false
  }
}

async function patch(memoId: string, data: Record<string, unknown>, mask: string[]) {
  const q = mask.map(m => `updateMask.fieldPaths=${encodeURIComponent(m)}`).join('&')
  await withTimeout(call(`${DOCS}/${COLLECTION}/${memoId}?key=${API_KEY}&${q}`, {
    method: 'PATCH', body: JSON.stringify({ fields: toFields(data) }),
  }), SAVE_TIMEOUT)
}

export async function updateMemo(memoId: string, text: string, images: MemoImage[]): Promise<boolean> {
  lastMemoError = ''
  try {
    const fitted = await fitImages(text, images)
    if (!fitted) throw new Error('too-big')
    await patch(memoId, { text, images: fitted, updatedAt: new Date().toISOString() }, ['text', 'images', 'updatedAt'])
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
    const data: Record<string, unknown> = { updatedAt: new Date().toISOString() }
    if (status) data.status = status
    await patch(memoId, data, ['status', 'updatedAt'])
    getMemos()
    return true
  } catch (e) {
    console.error('메모 상태 바꾸기 실패:', e)
    return false
  }
}

export async function deleteMemo(memoId: string): Promise<boolean> {
  try {
    await call(`${DOCS}/${COLLECTION}/${memoId}?key=${API_KEY}`, { method: 'DELETE' })
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
