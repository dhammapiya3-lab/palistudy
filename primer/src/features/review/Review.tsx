// 복습 — 완료한 과 목록 + 완료한 과의 퀴즈로 랜덤 복습
import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDragOrder } from './useDragOrder'
import { useStore } from '../../store/useStore'
import { completedLessons as getCompletedLessons } from '../../utils/lesson-progress'
import { REVIEW_QUIZ_ID } from '../grammar/hooks/useGrammarLearn'

export default function Review() {
  const nav = useNavigate()
  const progress = useStore(s => s.progress)
  const best = useStore(s => s.best)
  const completed = useStore(s => s.completed)

  // 완료한 과 목록 (과목·홈과 같은 기준)
  const completedLessons = useMemo(() =>
    getCompletedLessons({ progress, best, completed }),
  [progress, best, completed])

  // 끌어서 순서 바꾸기 (터치·마우스) + 키보드(↑/↓)
  const { orderedItems, dragState, handleProps, moveItem } = useDragOrder(completedLessons)
  const [announce, setAnnounce] = useState('')
  const handleRefs = useRef<(HTMLDivElement | null)[]>([])

  const hasCompleted = completedLessons.length > 0

  return (
    <div className="min-h-screen pb-24"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
     <div className="max-w-lg mx-auto px-4">

      {/* 헤더 */}
      <div className="pt-[max(env(safe-area-inset-top),20px)] pb-4 animate-fadeIn">
        <h1 className="text-2xl font-bold tracking-tight">복습</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          끝까지 마친 과를 다시 보거나, 그 과들의 퀴즈를 섞어 풀어 봅니다
        </p>
      </div>

      {hasCompleted ? (
        <div className="space-y-3 animate-slideUp">
          <p className="sr-only" aria-live="polite">{announce}</p>
          {/* 랜덤 복습 버튼 */}
          <button
            onClick={() => nav(`/learn/${REVIEW_QUIZ_ID}`, { state: { from: '/review' } })}
            className="w-full rounded-2xl p-5 text-left card-shadow
              transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: 'var(--color-cta-gradient)',
              minHeight: '48px',
            }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-base">랜덤 퀴즈 복습</p>
                <p className="text-white/90 text-xs mt-0.5">
                  마친 {orderedItems.length}개 과의 퀴즈 중 10문제
                </p>
              </div>
            </div>
          </button>

          {/* 완료한 과 목록 헤더 */}
          <h2 className="text-sm font-bold pt-3 flex items-center gap-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            복습 가능한 과
            <span className="text-[11px] font-normal">⋮⋮ 를 끌어서 순서 변경</span>
          </h2>

          {/* 과 목록 — 왼쪽 손잡이(⋮⋮)를 끌어서 순서 변경 (터치·마우스) */}
          {orderedItems.map((lesson, index) => {
            const isDragging = dragState.dragIndex === index
            const isOver = dragState.overIndex === index && !isDragging
            return (
              <div
                key={lesson.id}
                data-drag-index={index}
                className="flex items-stretch rounded-2xl card-shadow"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: isOver || isDragging
                    ? '1.5px solid var(--color-accent)'
                    : '1.5px solid var(--color-border)',
                  transform: isDragging ? `translateY(${dragState.offsetY}px) scale(1.02)` : undefined,
                  transition: isDragging ? 'none' : 'transform 0.15s, border-color 0.15s',
                  position: 'relative',
                  zIndex: isDragging ? 10 : undefined,
                  boxShadow: isDragging ? '0 8px 24px rgba(0,0,0,0.18)' : undefined,
                }}
              >
                {/* 끌기 손잡이 — 손가락으로 누르기 쉽게 넓게 */}
                <div
                  {...handleProps(index)}
                  ref={el => { handleRefs.current[index] = el }}
                  aria-label={`${lesson.title} 순서 바꾸기 — 위아래 화살표 키로 옮기기 (${index + 1}/${orderedItems.length}번째)`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
                    e.preventDefault()
                    const to = moveItem(index, e.key === 'ArrowUp' ? -1 : 1)
                    if (to === null) return
                    setAnnounce(`${lesson.title}을(를) ${to + 1}번째로 옮겼습니다`)
                    // 옮긴 항목의 손잡이에 포커스 유지
                    requestAnimationFrame(() => handleRefs.current[to]?.focus())
                  }}
                  className="shrink-0 w-11 flex items-center justify-center select-none rounded-l-2xl"
                  style={{ ...handleProps(index).style, color: 'var(--color-text-tertiary)' }}
                >
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <circle cx="9" cy="6" r="1.4" />
                    <circle cx="9" cy="12" r="1.4" />
                    <circle cx="9" cy="18" r="1.4" />
                    <circle cx="15" cy="6" r="1.4" />
                    <circle cx="15" cy="12" r="1.4" />
                    <circle cx="15" cy="18" r="1.4" />
                  </svg>
                </div>

                <button
                  onClick={() => nav(`/learn/${lesson.id}`, { state: { from: '/review' } })}
                  className="flex-1 min-w-0 flex items-center gap-3 pr-4 py-3.5 text-left active:scale-[0.98] transition-transform"
                  style={{ minHeight: '48px' }}>
                  {/* 완료 아이콘 */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="var(--color-accent)" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[13px] truncate">{lesson.title}</p>
                    <p className="text-[11px] mt-0.5 truncate"
                      style={{ color: 'var(--color-text-secondary)' }}>
                      {lesson.subtitle}
                    </p>
                  </div>

                  {/* 복습 화살표 */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="var(--color-text-tertiary)" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        /* 완료한 과 없음 */
        <div className="pt-16 text-center animate-fadeIn">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6"
            style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke="var(--color-text-tertiary)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </div>
          <h2 className="text-lg font-bold mb-2">아직 완료한 과가 없습니다</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            과를 완료하면 여기서 복습할 수 있어요
          </p>
          <button
            onClick={() => nav('/courses')}
            className="btn-primary px-8 py-3 text-sm">
            학습 시작하기
          </button>
        </div>
      )}
     </div>
    </div>
  )
}
