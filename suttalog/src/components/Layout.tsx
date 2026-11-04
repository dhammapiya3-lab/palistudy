import { Outlet, useLocation } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import BottomNav, { isNavHidden } from './BottomNav'

export default function Layout() {
  const location = useLocation()
  const navHidden = isNavHidden(location.pathname)

  useEffect(() => {
    if ('speechSynthesis' in window) speechSynthesis.cancel()
  }, [location.pathname])

  return (
    <div className="min-h-dvh" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* 하단 메뉴가 있는 화면은 메뉴 높이만큼 아래 여백 → 맨 아래 버튼이 메뉴에 가려지지 않음 */}
      <div style={{ paddingBottom: navHidden ? undefined : 'calc(72px + env(safe-area-inset-bottom))' }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
      <BottomNav />
    </div>
  )
}
