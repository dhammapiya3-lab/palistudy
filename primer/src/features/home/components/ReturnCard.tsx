// 오래 쉬다 돌아왔을 때 — 다정한 인사 + 지난 과에서 2분 복습
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { localDateStr } from '../../../utils/date'

const DISMISS_KEY = 'primer-return-dismissed'

interface Props {
  daysAway: number
  lesson: { id: string; title: string } | null
  monthDays: number
}

/** '9과: 절대분사' → "9과 '절대분사'" */
function quoteTitle(t: string) {
  const [no, name] = t.split(/:\s*/)
  return name ? `${no} '${name}'` : `'${t}'`
}

export default function ReturnCard({ daysAway, lesson, monthDays }: Props) {
  const nav = useNavigate()
  const today = localDateStr()
  const [hidden, setHidden] = useState(() => {
    try { return localStorage.getItem(DISMISS_KEY) === today } catch { return false }
  })
  if (hidden) return null
  const close = () => {
    try { localStorage.setItem(DISMISS_KEY, today) } catch { /* 무시 */ }
    setHidden(true)
  }

  return (
    <section aria-label="다시 오신 것을 환영합니다" className="rounded-2xl p-4 mb-4 animate-fadeIn relative"
      style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border))', boxShadow: 'var(--shadow-sm)' }}>
      <button onClick={close} aria-label="닫기" className="absolute top-1.5 right-1.5 w-10 h-10 flex items-center justify-center rounded-full"
        style={{ color: 'var(--color-text-tertiary)' }}>✕</button>
      <p className="font-bold text-base pr-8">다시 오셨네요 <span aria-hidden="true">🙏</span></p>
      <p className="text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        {daysAway}일 만이에요.{' '}
        {lesson ? <>지난번엔 {quoteTitle(lesson.title)}를 공부했어요. 2분 복습부터 할까요?</> : '천천히 이어서 해 봐요.'}
      </p>
      {monthDays > 0 && (
        <p className="text-xs mt-1.5" style={{ color: 'var(--color-accent)' }}>이번 달에 벌써 {monthDays}일 공부했어요. 끊겨도 괜찮아요.</p>
      )}
      <div className="flex gap-2 mt-3">
        {lesson && (
          <button onClick={() => { close(); nav(`/review/quiz?lesson=${lesson.id}&n=5`) }}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: 'var(--color-primary-dark)', minHeight: 48 }}>
            2분 복습하기
          </button>
        )}
        <button onClick={close} className="px-4 py-3 rounded-xl text-sm font-semibold"
          style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-text-secondary)', minHeight: 48, flex: lesson ? undefined : 1 }}>
          {lesson ? '바로 이어서' : '알겠어요'}
        </button>
      </div>
    </section>
  )
}
