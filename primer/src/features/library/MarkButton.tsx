// 공부 화면의 '🔖 책갈피' 단추 — 예문(구절)·따라 읽기 카드를 내 서재에 넣거나 뺌
import { useEffect, useState } from 'react'
import { library } from '../../utils/library'

type Props = { lessonId: string; raw: number; pali: string; pronKo?: string; translation?: string }

export default function MarkButton({ lessonId, raw, pali, pronKo, translation }: Props) {
  const [marked, setMarked] = useState(() => !!library.findLesson(lessonId, raw))
  const [msg, setMsg] = useState('')
  useEffect(() => {
    const check = () => setMarked(!!library.findLesson(lessonId, raw))
    check()
    return library.onChange(check)
  }, [lessonId, raw])
  useEffect(() => {
    if (!msg) return
    const t = window.setTimeout(() => setMsg(''), 2500)
    return () => window.clearTimeout(t)
  }, [msg])

  const toggle = () => {
    const on = library.toggleLesson({ lessonId, raw, pali, pronKo, translation })
    setMsg(on ? '내 서재에 저장했어요 — 아래 메뉴의 ‘내 서재’에서 볼 수 있어요' : '책갈피를 뺐어요')
  }

  return (
    <div className="flex flex-col items-center mt-3">
      <button onClick={toggle} aria-pressed={marked}
        className="px-4 py-2 rounded-full text-sm font-semibold active:scale-95 transition-transform"
        style={marked
          ? { backgroundColor: 'var(--color-accent)', color: '#fff' }
          : { border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-surface)' }}>
        {marked ? '🔖 내 서재에 저장됨' : '🔖 책갈피'}
      </button>
      <p role="status" aria-live="polite" className="text-xs mt-1.5 min-h-[1rem]" style={{ color: 'var(--color-text-secondary)' }}>{msg}</p>
    </div>
  )
}
