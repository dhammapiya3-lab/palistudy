// 복습 화면에 있는 동안 공부 시간 기록 (15초마다, 화면이 보일 때만) — 하루 목표에 더해짐
import { useEffect } from 'react'
import { useStore } from '../../store/useStore'

export function useStudyTimer(active = true) {
  const addStudySeconds = useStore(s => s.addStudySeconds)
  useEffect(() => {
    if (!active) return
    const t = setInterval(() => {
      if (document.visibilityState === 'visible') addStudySeconds(15)
    }, 15000)
    return () => clearInterval(t)
  }, [active, addStudySeconds])
}
