// 내 서재 — 책갈피한 경전 구절과 직접 붙여넣은 빠알리어 글 (이 기기에만 저장)
export type Bookmark = {
  id: string
  kind: 'sutta' | 'mine'      // sutta: 공부 화면에서 책갈피 / mine: 직접 붙여넣음
  pali: string
  pronKo?: string             // 경전 구절은 과 자료의 발음, 붙여넣은 글은 비워 둠(화면에서 자동으로 만듦)
  translation?: string        // 경전 구절의 번역 또는 내가 적은 뜻
  note?: string               // 내 메모
  lessonId?: string
  raw?: number                // 과 안의 단계 번호 (그 자리로 돌아가기)
  at: number                  // 저장한 때
}

const KEY = 'suttalog-library'
const listeners = new Set<() => void>()

export function readBookmarks(): Bookmark[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(v) ? v.filter(b => b && typeof b.pali === 'string') : []
  } catch { return [] }
}

function write(list: Bookmark[]) {
  try { localStorage.setItem(KEY, JSON.stringify(list)) } catch { /* 저장 공간 부족 등은 무시 */ }
  listeners.forEach(f => f())
}

/** 바뀔 때마다 알림 받기 (돌려받은 함수를 부르면 그만 받음) */
export function onBookmarksChange(f: () => void): () => void {
  listeners.add(f)
  return () => { listeners.delete(f) }
}

function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function findSuttaBookmark(lessonId: string, raw: number): Bookmark | undefined {
  return readBookmarks().find(b => b.kind === 'sutta' && b.lessonId === lessonId && b.raw === raw)
}

/** 공부 화면의 구절을 책갈피에 넣거나 뺌 — 넣었으면 true */
export function toggleSuttaBookmark(b: { lessonId: string; raw: number; pali: string; pronKo?: string; translation?: string }): boolean {
  const list = readBookmarks()
  const i = list.findIndex(x => x.kind === 'sutta' && x.lessonId === b.lessonId && x.raw === b.raw)
  if (i >= 0) { list.splice(i, 1); write(list); return false }
  list.unshift({ id: newId(), kind: 'sutta', at: Date.now(), ...b })
  write(list)
  return true
}

export function addMine(pali: string, translation?: string): Bookmark {
  const b: Bookmark = { id: newId(), kind: 'mine', pali: pali.trim(), translation: translation?.trim() || undefined, at: Date.now() }
  write([b, ...readBookmarks()])
  return b
}

export function updateBookmark(id: string, patch: Partial<Pick<Bookmark, 'pali' | 'translation' | 'note'>>) {
  write(readBookmarks().map(b => b.id === id ? { ...b, ...patch } : b))
}

export function removeBookmark(id: string): Bookmark | undefined {
  const list = readBookmarks()
  const i = list.findIndex(b => b.id === id)
  if (i < 0) return undefined
  const [gone] = list.splice(i, 1)
  write(list)
  return gone
}

/** 지운 것 되돌리기 (원래 자리에) */
export function restoreBookmark(b: Bookmark) {
  const list = readBookmarks().filter(x => x.id !== b.id)
  const at = list.findIndex(x => x.at < b.at)
  list.splice(at < 0 ? list.length : at, 0, b)
  write(list)
}
