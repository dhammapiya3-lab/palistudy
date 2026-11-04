// 드래그앤드롭 순서 관리 훅 (HTML5 Drag and Drop API)
import { useState, useRef, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'pali-review-order'

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
  dragIndex: number | null   // 드래그 중인 항목 인덱스
  overIndex: number | null   // 드롭 대상 인덱스
}

interface UseDragOrderReturn<T extends { id: string }> {
  orderedItems: T[]
  dragState: DragOrderState
  handlers: (index: number) => {
    draggable: true
    onDragStart: (e: React.DragEvent) => void
    onDragOver: (e: React.DragEvent) => void
    onDragEnter: (e: React.DragEvent) => void
    onDragLeave: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent) => void
    onDragEnd: () => void
  }
}

export function useDragOrder<T extends { id: string }>(
  items: T[]
): UseDragOrderReturn<T> {
  const [orderedItems, setOrderedItems] = useState<T[]>(() => {
    const ids = items.map(i => i.id)
    const sorted = loadOrder(ids)
    return sorted.map(id => items.find(i => i.id === id)!).filter(Boolean)
  })

  // 새로운 항목이 완료되었을 때 목록 갱신
  useEffect(() => {
    const ids = items.map(i => i.id)
    const sorted = loadOrder(ids)
    setOrderedItems(sorted.map(id => items.find(i => i.id === id)!).filter(Boolean))
  }, [items])

  const [dragState, setDragState] = useState<DragOrderState>({
    dragIndex: null,
    overIndex: null,
  })

  // 드래그 중인 인덱스를 ref로도 유지 (클로저 문제 방지)
  const dragIndexRef = useRef<number | null>(null)

  const handlers = useCallback((index: number) => ({
    draggable: true as const,

    onDragStart: (e: React.DragEvent) => {
      dragIndexRef.current = index
      setDragState({ dragIndex: index, overIndex: null })
      // Firefox 호환을 위해 dataTransfer 설정
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', String(index))
    },

    onDragOver: (e: React.DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    },

    onDragEnter: (e: React.DragEvent) => {
      e.preventDefault()
      if (dragIndexRef.current !== null && dragIndexRef.current !== index) {
        setDragState(prev => ({ ...prev, overIndex: index }))
      }
    },

    onDragLeave: (_e: React.DragEvent) => {
      // 자식 요소로 이동하는 경우 무시 (relatedTarget 체크)
    },

    onDrop: (e: React.DragEvent) => {
      e.preventDefault()
      const from = dragIndexRef.current
      if (from === null || from === index) return

      setOrderedItems(prev => {
        const next = [...prev]
        const [moved] = next.splice(from, 1)
        next.splice(index, 0, moved)
        saveOrder(next.map(i => i.id))
        return next
      })
      setDragState({ dragIndex: null, overIndex: null })
      dragIndexRef.current = null
    },

    onDragEnd: () => {
      setDragState({ dragIndex: null, overIndex: null })
      dragIndexRef.current = null
    },
  }), [])

  return { orderedItems, dragState, handlers }
}
