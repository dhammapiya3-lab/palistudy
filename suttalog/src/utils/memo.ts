// 메모 CRUD — localStorage 기반
// 차후 AI가 메모 기반으로 lesson-data 일괄 수정 시 anchor 정보로 사용됨.
import { getLessonTitle } from './lessons-meta'

const MEMO_PREFIX = 'suttalog-memo:'
const MEMO_INDEX = 'suttalog-memo-index'

export type StepSnapshot = {
  stepType: string
  word?: string
  pali?: string
  question?: string
  title?: string
  instruction?: string
}

// AI 일괄 수정 워크플로: 메모마다 0~1개의 patch가 매달릴 수 있음.
// proposed → approved/rejected → applied
export type Patch = {
  patchId: string
  filePath: string
  before: string
  after: string
  summary: string
  status: 'proposed' | 'approved' | 'rejected' | 'applied'
  proposedAt: string
  decidedAt?: string
  author?: string
}

export type Memo = {
  memoId: string         // UUID — 메모 자체의 고유 id
  pageId: string         // {lessonId}:{stepIdx}
  lessonId: string
  lessonTitle: string
  stepIdx: number
  stepSnapshot: StepSnapshot
  body: string
  createdAt: string
  updatedAt: string
  author?: string
  source?: 'local' | 'github'
  patch?: Patch
}

export function pageIdOf(lessonId: string, stepIdx: number): string {
  return `${lessonId}:${stepIdx}`
}

function uuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function readIndex(): string[] {
  try { return JSON.parse(localStorage.getItem(MEMO_INDEX) || '[]') } catch { return [] }
}
function writeIndex(ids: string[]): void { localStorage.setItem(MEMO_INDEX, JSON.stringify(ids)) }
function indexAdd(pageId: string): void {
  const ids = readIndex()
  if (!ids.includes(pageId)) { ids.push(pageId); writeIndex(ids) }
}
function indexRemove(pageId: string): void {
  writeIndex(readIndex().filter(id => id !== pageId))
}

export function getMemo(pageId: string): Memo | null {
  const raw = localStorage.getItem(MEMO_PREFIX + pageId)
  if (!raw) return null
  try { return JSON.parse(raw) as Memo } catch { return null }
}

export function hasMemo(pageId: string): boolean { return readIndex().includes(pageId) }

export function saveMemo(lessonId: string, stepIdx: number, body: string, snapshot: StepSnapshot): Memo {
  const pageId = pageIdOf(lessonId, stepIdx)
  const existing = getMemo(pageId)
  const now = new Date().toISOString()
  const memo: Memo = {
    memoId: existing?.memoId ?? uuid(),
    pageId, lessonId,
    lessonTitle: getLessonTitle(lessonId),
    stepIdx, stepSnapshot: snapshot, body,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    author: existing?.author,
    source: existing?.source ?? 'local',
    patch: existing?.patch,
  }
  localStorage.setItem(MEMO_PREFIX + pageId, JSON.stringify(memo))
  indexAdd(pageId)
  return memo
}

export function deleteMemo(pageId: string): void {
  localStorage.removeItem(MEMO_PREFIX + pageId)
  indexRemove(pageId)
}

export function listMemos(): Memo[] {
  const ids = readIndex()
  const memos: Memo[] = []
  for (const id of ids) { const m = getMemo(id); if (m) memos.push(m) }
  return memos.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function countMemos(): number { return readIndex().length }

export function attachPatch(pageId: string, patch: Patch): Memo | null {
  const m = getMemo(pageId)
  if (!m) return null
  const next: Memo = { ...m, patch, updatedAt: new Date().toISOString() }
  localStorage.setItem(MEMO_PREFIX + pageId, JSON.stringify(next))
  return next
}

export function decidePatch(pageId: string, status: 'approved' | 'rejected'): Memo | null {
  const m = getMemo(pageId)
  if (!m || !m.patch) return null
  const next: Memo = {
    ...m,
    patch: { ...m.patch, status, decidedAt: new Date().toISOString() },
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(MEMO_PREFIX + pageId, JSON.stringify(next))
  return next
}

export function exportMemosJson(): string {
  const memos = listMemos()
  return JSON.stringify({ exportedAt: new Date().toISOString(), app: 'SuttaLog', count: memos.length, memos }, null, 2)
}

export function downloadMemosJson(): void {
  const json = exportMemosJson()
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `suttalog-memos-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}
