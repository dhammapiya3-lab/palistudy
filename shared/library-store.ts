// 내 서재 저장소 — 책갈피한 구절과 직접 붙여넣은 빠알리어 글 (이 기기에만 저장)
// 두 앱(경전으로 배우기·빠알리 프라이머)이 함께 씀. 앱마다 저장 이름(storageKey)만 다름.
export type Bookmark = {
  id: string
  kind: 'lesson' | 'mine'     // lesson: 공부 화면에서 책갈피 / mine: 직접 붙여넣음
  pali: string
  pronKo?: string             // 과 자료의 발음 (붙여넣은 글은 비워 두고 화면에서 자동으로 만듦)
  translation?: string        // 과 자료의 번역 또는 내가 적은 뜻
  note?: string               // 내 메모
  lessonId?: string
  raw?: number                // 과 안의 단계 번호 (그 자리로 돌아가기)
  at: number                  // 저장한 때
}

export type LessonMark = { lessonId: string; raw: number; pali: string; pronKo?: string; translation?: string }

export type LibraryStore = ReturnType<typeof createLibraryStore>

export function createLibraryStore(storageKey: string) {
  const listeners = new Set<() => void>()

  function read(): Bookmark[] {
    try {
      const v = JSON.parse(localStorage.getItem(storageKey) || '[]')
      if (!Array.isArray(v)) return []
      return v
        .filter(b => b && typeof b.pali === 'string')
        // 처음 판에서는 책갈피 종류를 'sutta'라고 적었음
        .map(b => (b.kind === 'sutta' ? { ...b, kind: 'lesson' } : b)) as Bookmark[]
    } catch { return [] }
  }

  function write(list: Bookmark[]) {
    try { localStorage.setItem(storageKey, JSON.stringify(list)) } catch { /* 저장 공간 부족 등은 무시 */ }
    listeners.forEach(f => f())
  }

  const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  const same = (b: Bookmark, lessonId: string, raw: number) => b.kind === 'lesson' && b.lessonId === lessonId && b.raw === raw

  return {
    read,
    /** 바뀔 때마다 알림 받기 (돌려받은 함수를 부르면 그만 받음) */
    onChange(f: () => void): () => void {
      listeners.add(f)
      return () => { listeners.delete(f) }
    },
    findLesson(lessonId: string, raw: number): Bookmark | undefined {
      return read().find(b => same(b, lessonId, raw))
    },
    /** 공부 화면의 구절을 책갈피에 넣거나 뺌 — 넣었으면 true */
    toggleLesson(m: LessonMark): boolean {
      const list = read()
      const i = list.findIndex(b => same(b, m.lessonId, m.raw))
      if (i >= 0) { list.splice(i, 1); write(list); return false }
      list.unshift({ id: newId(), kind: 'lesson', at: Date.now(), ...m })
      write(list)
      return true
    },
    addMine(pali: string, translation?: string): Bookmark {
      const b: Bookmark = { id: newId(), kind: 'mine', pali: pali.trim(), translation: translation?.trim() || undefined, at: Date.now() }
      write([b, ...read()])
      return b
    },
    update(id: string, patch: Partial<Pick<Bookmark, 'pali' | 'translation' | 'note'>>) {
      write(read().map(b => (b.id === id ? { ...b, ...patch } : b)))
    },
    remove(id: string): Bookmark | undefined {
      const list = read()
      const i = list.findIndex(b => b.id === id)
      if (i < 0) return undefined
      const [gone] = list.splice(i, 1)
      write(list)
      return gone
    },
    /** 지운 것 되돌리기 (원래 자리에) */
    restore(b: Bookmark) {
      const list = read().filter(x => x.id !== b.id)
      const at = list.findIndex(x => x.at < b.at)
      list.splice(at < 0 ? list.length : at, 0, b)
      write(list)
    },
  }
}
