import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import BottomNav from './BottomNav'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    speechSynthesis.cancel()
  }, [location.pathname])

  return (
    <div className="min-h-dvh" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Outlet />
      <BottomNav />
    </div>
  )
}
