// 드래그로 순서 바꾸기 훅 — 포인터 이벤트 사용 (휴대폰 터치 + 마우스 모두 지원)
// 손잡이(⋮⋮)를 눌러 끌 때만 움직이므로, 목록의 다른 곳을 밀면 평소처럼 화면이 스크롤됨
import { useState, useRef, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'pali-review-order'
const EDGE = 80          // 화면 위·아래 가장자리 이 범위(px)에 손가락이 오면 자동 스크롤
const SCROLL_STEP = 12   // 자동 스크롤 한 번에 움직이는 거리(px)

// localStorage에서 저장된 순서 불러오기
export function loadOrder(ids: string[]): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return ids
    const parsed: string[] = JSON.parse(saved)
    // 저장된 순서에 없는 신규 항목은 뒤에 추가
    const extra = ids.filter(id => !parsed.includes(id))
    // 저장된 항목 중 현재 목록에 없는 것은 제거
    return [...parsed.filter(id => ids.includes(id)), ...extra]
  } catch {
    return ids
  }
}

// localStorage에 순서 저장
function saveOrder(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // 저장 실패 무시
  }
}

interface DragOrderState {
  dragIndex: number | null   // 끌고 있는 항목 위치
  overIndex: number | null   // 놓일 위치
  offsetY: number            // 끌고 있는 항목이 처음 위치에서 움직인 거리(px)
}

const IDLE: DragOrderState = { dragIndex: null, overIndex: null, offsetY: 0 }

// 손가락/마우스 아래에 있는 항목의 위치 찾기 (각 항목에 data-drag-index 필요)
// 끌고 있는 항목 자신이 손가락 바로 아래에 있으므로, 그것은 건너뛰고 그 아래 항목을 찾음
function indexAt(x: number, y: number, skip: number): number | null {
  try {
    for (const el of document.elementsFromPoint(x, y)) {
      const box = el.closest('[data-drag-index]')
      if (!box) continue
      const n = Number(box.getAttribute('data-drag-index'))
      if (Number.isFinite(n) && n !== skip) return n
    }
    return null
  } catch {
    return null
  }
}

export function useDragOrder<T extends { id: string }>(items: T[]) {
  const [orderedItems, setOrderedItems] = useState<T[]>(() => {
    const sorted = loadOrder(items.map(i => i.id))
    return sorted.map(id => items.find(i => i.id === id)!).filter(Boolean)
  })

  // 새로운 항목이 완료되었을 때 목록 갱신
  useEffect(() => {
    const sorted = loadOrder(items.map(i => i.id))
    setOrderedItems(sorted.map(id => items.find(i => i.id === id)!).filter(Boolean))
  }, [items])

  const [dragState, setDragState] = useState<DragOrderState>(IDLE)
  // 이벤트 사이에 값을 유지 (다시 그리기와 무관하게)
  const drag = useRef({ from: null as number | null, over: null as number | null, startY: 0, scrollStart: 0 })

  // 손잡이에 붙이는 속성
  const handleProps = useCallback((index: number) => ({
    onPointerDown: (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      e.preventDefault()
      e.stopPropagation()
      try { (e.currentTarget as Element).setPointerCapture(e.pointerId) } catch { /* 무시 */ }
      drag.current = { from: index, over: index, startY: e.clientY, scrollStart: window.scrollY }
      setDragState({ dragIndex: index, overIndex: index, offsetY: 0 })
    },

    onPointerMove: (e: React.PointerEvent) => {
      const d = drag.current
      if (d.from === null) return
      e.preventDefault()
      // 가장자리에서 자동 스크롤
      if (e.clientY < EDGE) window.scrollBy(0, -SCROLL_STEP)
      else if (e.clientY > window.innerHeight - EDGE) window.scrollBy(0, SCROLL_STEP)

      const target = indexAt(e.clientX, e.clientY, d.from)
      if (target !== null) d.over = target
      const offsetY = e.clientY - d.startY + (window.scrollY - d.scrollStart)
      setDragState({ dragIndex: d.from, overIndex: d.over, offsetY })
    },

    onPointerUp: () => {
      const { from, over } = drag.current
      drag.current.from = null
      setDragState(IDLE)
      if (from === null || over === null || from === over) return
      setOrderedItems(prev => {
        const next = [...prev]
        const [moved] = next.splice(from, 1)
        next.splice(over, 0, moved)
        saveOrder(next.map(i => i.id))
        return next
      })
    },

    onPointerCancel: () => {
      drag.current.from = null
      setDragState(IDLE)
    },

    // 손잡이 위에서는 화면 스크롤·길게 누르기 메뉴 대신 끌기 동작
    style: { touchAction: 'none' as const, cursor: 'grab' },
  }), [])

  return { orderedItems, dragState, handleProps }
}
