// 새 버전 안내 띠 — 누르면 새로고침 (공부 중에는 저절로 새로고침하지 않음)
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { onUpdateReady, applyUpdate } from '../utils/version-check'

export default function UpdateBanner() {
  const [ready, setReady] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()

  useEffect(() => onUpdateReady(setReady), [])

  // 학습 화면에서는 방해되지 않게 보이지 않음 (홈·과목 등으로 나오면 보임)
  if (!ready || hidden || location.pathname.startsWith('/learn/')) return null

  return (
    <div
      role="status"
      className="fixed left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-md
        flex items-center gap-3 px-4 py-3 rounded-2xl animate-slideUp"
      style={{
        top: 'max(env(safe-area-inset-top), 12px)',
        backgroundColor: 'var(--color-surface)',
        border: '1.5px solid var(--color-primary)',
        boxShadow: 'var(--shadow-lg)',
        color: 'var(--color-text)',
      }}
    >
      <span className="text-sm flex-1">새 버전이 있어요. 새로고침하면 적용됩니다.</span>
      <button
        onClick={applyUpdate}
        className="shrink-0 px-3 py-2 rounded-xl text-sm font-bold text-white"
        style={{ backgroundColor: 'var(--color-primary-dark)', minHeight: 40 }}
      >
        새로고침
      </button>
      <button
        onClick={() => setHidden(true)}
        className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full"
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label="나중에"
      >
        ✕
      </button>
    </div>
  )
}
