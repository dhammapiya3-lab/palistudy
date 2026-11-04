// 하단 네비게이션 바 — 글래스 효과 + SVG 아이콘 + 안전 영역
import { useNavigate, useLocation } from 'react-router-dom'

// 탭 정의
const TABS = [
  {
    key: 'home',
    label: '홈',
    path: '/',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        {!active && <polyline points="9 22 9 12 15 12 15 22" />}
      </svg>
    ),
  },
  {
    key: 'courses',
    label: '과목',
    path: '/courses',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    key: 'review',
    label: '복습',
    path: '/review',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={active ? '2.5' : '2'}
        strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    key: 'profile',
    label: '프로필',
    path: '/profile',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
] as const

export default function BottomNav() {
  const nav = useNavigate()
  const location = useLocation()

  // 학습 화면에서는 하단바 숨김
  if (location.pathname.startsWith('/learn/')) return null

  // 현재 활성 탭 판별
  const activeTab = TABS.find(t =>
    t.path === '/' ? location.pathname === '/' : location.pathname.startsWith(t.path)
  )?.key ?? 'home'

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bottom-bar-frost"
      style={{
        borderTop: '1px solid var(--color-border-light)',
      }}
    >
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {TABS.map(tab => {
          const isActive = tab.key === activeTab
          return (
            <button
              key={tab.key}
              onClick={() => nav(tab.path)}
              className="flex flex-col items-center justify-center gap-0.5 py-2 px-4 flex-1
                transition-all duration-200 active:scale-95"
              style={{
                minHeight: '56px',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
              }}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* 활성 인디케이터 */}
              <div className="relative">
                {isActive && (
                  <span
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full"
                    style={{ background: 'var(--color-primary-gradient)' }}
                  />
                )}
                <span className="block mt-1">{tab.icon(isActive)}</span>
              </div>
              <span
                className="text-[10px] font-semibold tracking-wide"
                style={{ opacity: isActive ? 1 : 0.7 }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
