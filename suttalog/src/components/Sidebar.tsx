// 데스크톱 사이드바 네비게이션
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', icon: '🏠', label: '대시보드' },
  { to: '/path', icon: '🪷', label: '학습 경로' },
  { to: '/browse', icon: '📚', label: '경전 탐색' },
  { to: '/srs', icon: '🔄', label: '플래시카드' },
  { to: '/settings', icon: '⚙️', label: '설정' },
]

export default function Sidebar() {
  return (
    <aside
      className="h-full flex flex-col border-r"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* 로고 */}
      <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <h1 className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
          🪷 SuttaLog
        </h1>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          빠알리어 경전 학습
        </p>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 py-2">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                isActive ? 'font-semibold' : 'opacity-70 hover:opacity-100'
              }`
            }
            style={({ isActive }) => ({
              color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
              backgroundColor: isActive ? 'var(--color-primary)10' : 'transparent',
            })}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
