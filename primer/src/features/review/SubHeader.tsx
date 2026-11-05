// 복습 안쪽 화면 머리 (뒤로 + 제목)
import { useNavigate } from 'react-router-dom'

export default function SubHeader({ title, sub, back = '/review', onBack, right }: { title: string; sub?: string; back?: string; onBack?: () => void; right?: React.ReactNode }) {
  const nav = useNavigate()
  return (
    <div className="flex items-center gap-3 pt-[max(env(safe-area-inset-top),16px)] pb-3 sticky top-0 z-10"
      style={{ backgroundColor: 'var(--color-bg)' }}>
      <button onClick={() => (onBack ? onBack() : nav(back))} aria-label="뒤로"
        className="flex items-center justify-center w-11 h-11 rounded-full active:scale-90 transition-transform shrink-0"
        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold truncate">{title}</h1>
        {sub && <p className="text-xs truncate" style={{ color: 'var(--color-text-secondary)' }}>{sub}</p>}
      </div>
      {right}
    </div>
  )
}
