// 아래로 내려 읽는 동안에는 메모 버튼을 옆으로 비켜 두고,
// 위로 올리거나 맨 위에 있을 때 다시 보여 줌 → 버튼이 글·달력·스위치를 가리지 않게
import { useEffect, useState } from 'react'

export function useHideOnScroll(): boolean {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const lastY = new WeakMap<EventTarget, number>()
    const onScroll = (e: Event) => {
      const t = e.target
      const el = t === document || t === window ? document.scrollingElement : (t as Element)
      if (!el || !t) return
      const y = (el as Element).scrollTop
      const prev = lastY.get(t) ?? 0
      lastY.set(t, y)
      if (y < 40) setHidden(false)
      else if (y > prev + 6) setHidden(true)
      else if (y < prev - 6) setHidden(false)
    }
    document.addEventListener('scroll', onScroll, { capture: true, passive: true })
    return () => document.removeEventListener('scroll', onScroll, { capture: true })
  }, [])
  return hidden
}
