// 저장 데이터 이전 — 앱 시작 시 한 번 실행(여러 번 실행해도 안전).
// 1) 예전 별칭 ID(dhp1-alphabet)로 저장된 진도·완료·메모를 정식 ID(sn56-11)로 옮김.
import { LESSON_ALIASES } from './lessons-meta'

const MEMO_PREFIX = 'suttalog-memo:'
const MEMO_INDEX = 'suttalog-memo-index'

function moveProgress(oldId: string, newId: string) {
  const oldKey = `suttalog-progress-${oldId}`
  const newKey = `suttalog-progress-${newId}`
  const oldVal = localStorage.getItem(oldKey)
  if (oldVal !== null) {
    const merged = Math.max(Number(oldVal) || 0, Number(localStorage.getItem(newKey)) || 0)
    localStorage.setItem(newKey, String(merged))
    localStorage.removeItem(oldKey)
  }
  for (const k of ['done', 'total']) {
    const ok = `suttalog-${k}-${oldId}`
    const v = localStorage.getItem(ok)
    if (v !== null) {
      if (localStorage.getItem(`suttalog-${k}-${newId}`) === null) localStorage.setItem(`suttalog-${k}-${newId}`, v)
      localStorage.removeItem(ok)
    }
  }
}

function moveMemos(oldId: string, newId: string) {
  let index: string[]
  try { index = JSON.parse(localStorage.getItem(MEMO_INDEX) || '[]') } catch { return }
  if (!Array.isArray(index)) return
  let changed = false
  const next: string[] = []
  for (const pageId of index) {
    if (!pageId.startsWith(oldId + ':')) { if (!next.includes(pageId)) next.push(pageId); continue }
    changed = true
    const rest = pageId.slice(oldId.length + 1)
    const newPageId = `${newId}:${rest}`
    const raw = localStorage.getItem(MEMO_PREFIX + pageId)
    localStorage.removeItem(MEMO_PREFIX + pageId)
    if (!raw) continue
    try {
      const memo = JSON.parse(raw)
      const existingRaw = localStorage.getItem(MEMO_PREFIX + newPageId)
      memo.pageId = newPageId
      memo.lessonId = newId
      if (existingRaw) {
        // 같은 자리에 이미 메모가 있으면 내용을 합침(어느 쪽도 잃지 않게)
        const existing = JSON.parse(existingRaw)
        if (existing.body !== memo.body) existing.body = `${existing.body}\n\n${memo.body}`
        localStorage.setItem(MEMO_PREFIX + newPageId, JSON.stringify(existing))
      } else {
        localStorage.setItem(MEMO_PREFIX + newPageId, JSON.stringify(memo))
      }
      if (!next.includes(newPageId)) next.push(newPageId)
    } catch { /* 깨진 메모는 건너뜀 */ }
  }
  if (changed) localStorage.setItem(MEMO_INDEX, JSON.stringify(next))
}

export function runMigrations(): void {
  try {
    for (const [oldId, newId] of Object.entries(LESSON_ALIASES)) {
      moveProgress(oldId, newId)
      moveMemos(oldId, newId)
    }
  } catch (e) {
    console.error('저장 데이터 이전 실패', e)
  }
}
