// 메모 CRUD — localStorage 기반
// 차후 AI가 메모 기반으로 lesson-data 일괄 수정 시 anchor 정보로 사용됨.
import { getLessonTitle } from './lessons-meta'
import { localDateStr } from './local-date'

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

// pageId의 stepIdx는 '원본 레슨 데이터(필터 전)' 기준 번호입니다.
// 설정(단어 설명 단계: 첫 등장만/횟수 제한)을 바꿔도 같은 단계를 가리키도록.
export function pageIdOf(lessonId: string, stepIdx: number): string {
  return `${lessonId}:${stepIdx}`
}

function sameSnapshot(a: StepSnapshot, b: StepSnapshot): boolean {
  if (a.stepType !== b.stepType) return false
  const keys: (keyof StepSnapshot)[] = ['word', 'pali', 'question', 'title', 'instruction']
  return keys.every(k => (a[k] ?? '') === (b[k] ?? ''))
}

/**
 * 예전 메모 위치 바로잡기 — 예전에는 '걸러진 단계 번호'로 저장되어 설정에 따라 다른 단계를 가리킬 수 있었음.
 * 메모에 저장된 단계 내용(stepSnapshot)과 원본 단계를 비교해, 지금 번호가 맞지 않으면
 * 내용이 같은 가장 가까운 원본 단계로 옮깁니다. 맞는 단계를 못 찾으면 그대로 둡니다. 여러 번 실행해도 안전.
 */
export function relocateLessonMemos(lessonId: string, rawSnapshots: StepSnapshot[]): number {
  let moved = 0
  for (const pageId of readIndex()) {
    if (!pageId.startsWith(lessonId + ':')) continue
    const m = getMemo(pageId)
    if (!m || !m.stepSnapshot) continue
    const cur = rawSnapshots[m.stepIdx]
    if (cur && sameSnapshot(cur, m.stepSnapshot)) continue
    let best = -1
    for (let i = 0; i < rawSnapshots.length; i++) {
      if (!sameSnapshot(rawSnapshots[i], m.stepSnapshot)) continue
      if (best < 0 || Math.abs(i - m.stepIdx) < Math.abs(best - m.stepIdx)) best = i
    }
    if (best < 0) continue
    const newPageId = pageIdOf(lessonId, best)
    if (newPageId === pageId || getMemo(newPageId)) continue // 이미 그 자리에 메모가 있으면 건드리지 않음
    const next: Memo = { ...m, pageId: newPageId, stepIdx: best }
    localStorage.setItem(MEMO_PREFIX + newPageId, JSON.stringify(next))
    localStorage.removeItem(MEMO_PREFIX + pageId)
    writeIndex(readIndex().map(id => (id === pageId ? newPageId : id)))
    moved++
  }
  return moved
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
  a.download = `suttalog-memos-${localDateStr()}.json`
  a.click()
  URL.revokeObjectURL(url)
}
