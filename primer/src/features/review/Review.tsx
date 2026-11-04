// 복습 모드 — 완료한 과에서 랜덤 퀴즈 선택
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LESSONS } from '../grammar/lessons'
import { useDragOrder } from './useDragOrder'

// 과별 진행도 조회
function getProgress(id: string, total: number) {
  return Math.min(Number(localStorage.getItem(`pali-primer-${id}`) || '0'), total)
}

export default function Review() {
  const nav = useNavigate()

  // 완료한 과 목록
  const completedLessons = useMemo(() =>
    LESSONS.filter(l => getProgress(l.id, l.steps.length) >= l.steps.length),
  [])

  // 드래그앤드롭 순서 관리
  const { orderedItems, dragState, handlers } = useDragOrder(completedLessons)

  const hasCompleted = completedLessons.length > 0

  return (
    <div className="min-h-screen pb-24"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
     <div className="max-w-lg mx-auto px-4">

      {/* 헤더 */}
      <div className="pt-[max(env(safe-area-inset-top),20px)] pb-4 animate-fadeIn">
        <h1 className="text-2xl font-bold tracking-tight">복습</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          완료한 과에서 랜덤 퀴즈
        </p>
      </div>

      {hasCompleted ? (
        <div className="px-5 space-y-3 animate-slideUp">
          {/* 랜덤 복습 버튼 */}
          <button
            onClick={() => {
              const random = orderedItems[Math.floor(Math.random() * orderedItems.length)]
              nav(`/learn/${random.id}`)
            }}
            className="w-full rounded-2xl p-5 text-left card-shadow
              transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: 'var(--color-primary-gradient)',
              minHeight: '48px',
            }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-base">랜덤 복습 시작</p>
                <p className="text-white/70 text-xs mt-0.5">
                  {orderedItems.length}개 과에서 랜덤 선택
                </p>
              </div>
            </div>
          </button>

          {/* 완료한 과 목록 헤더 */}
          <h2 className="text-sm font-bold pt-3 flex items-center gap-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            복습 가능한 과
            <span className="text-[10px] font-normal opacity-60">드래그로 순서 변경</span>
          </h2>

          {/* 드래그앤드롭 과 목록 */}
          {orderedItems.map((lesson, index) => {
            const h = handlers(index)
            const isDragging = dragState.dragIndex === index
            const isOver = dragState.overIndex === index
            return (
              <div
                key={lesson.id}
                {...h}
                style={{
                  opacity: isDragging ? 0.4 : 1,
                  transform: isOver ? 'scale(1.02)' : undefined,
                  transition: 'opacity 0.15s, transform 0.15s',
                  borderRadius: '1rem',
                  outline: isOver ? '2px solid var(--color-accent)' : undefined,
                  cursor: 'grab',
                }}
              >
                <button
                  onClick={() => !isDragging && nav(`/learn/${lesson.id}`)}
                  className="w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left
                    card-shadow transition-all duration-300
                    hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: isOver
                      ? '1.5px solid var(--color-accent)'
                      : '1.5px solid var(--color-border)',
                    minHeight: '48px',
                  }}>
                  {/* 드래그 핸들 아이콘 */}
                  <div className="shrink-0 opacity-30 hover:opacity-60 transition-opacity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="6" r="1" fill="currentColor" stroke="none" />
                      <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
                      <circle cx="9" cy="18" r="1" fill="currentColor" stroke="none" />
                      <circle cx="15" cy="6" r="1" fill="currentColor" stroke="none" />
                      <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
                      <circle cx="15" cy="18" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </div>

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
        <div className="px-5 pt-16 text-center animate-fadeIn">
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
