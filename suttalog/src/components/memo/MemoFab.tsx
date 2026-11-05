// 어느 화면에서나 쓰는 메모 버튼 (빠알리 프라이머와 같은 모양)
// 경전 과 화면은 아래 막대 위에 자기 메모 버튼이 따로 있어서 여기서는 숨김
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import MemoModal from './MemoModal'

export default function MemoFab() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  if (pathname.startsWith('/learn/scripture/') || pathname === '/memos') return null
  // 기초 레슨·외우기 화면은 아래쪽에 큰 버튼이 있어 조금 올림
  const raised = pathname.startsWith('/learn/') || pathname.startsWith('/recite/') || pathname.startsWith('/lesson')
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ bottom: raised ? 'calc(6.5rem + env(safe-area-inset-bottom))' : 'calc(5rem + env(safe-area-inset-bottom))',
          right: 'max(16px, calc((100vw - 430px) / 2 + 16px))' }}
        className="fixed z-40 w-12 h-12 rounded-full bg-amber-600 text-white shadow-lg flex items-center justify-center hover:bg-amber-700 active:scale-95 transition-all"
        aria-label="메모"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6" aria-hidden="true">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
      <MemoModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
