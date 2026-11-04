import CircleProgress from './CircleProgress'

interface CourseCardProps {
  lesson: {
    id: string
    title: string
    subtitle: string
    steps: any[]
  }
  isCompleted: boolean
  isCurrent: boolean
  pct: number
  onClick: () => void
}

export default function CourseCard({ lesson, isCompleted, isCurrent, pct, onClick }: CourseCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-left
        transition-all duration-300
        hover:shadow-md hover:-translate-y-px
        active:scale-[0.98]"
      style={{
        backgroundColor: isCurrent
          ? 'color-mix(in srgb, var(--color-primary) 5%, var(--color-surface-elevated))'
          : 'var(--color-surface-elevated)',
        border: isCurrent ? '1.5px solid var(--color-primary-light)' : '1px solid transparent',
        minHeight: '48px',
      }}>

      {/* 원형 진도 or 완료 체크 */}
      <div className="shrink-0 relative">
        {isCompleted ? (
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 12%, transparent)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="var(--color-accent)" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        ) : (
          <div className="relative">
            {isCurrent && (
              <span className="absolute inset-[-2px] rounded-full animate-ping opacity-15"
                style={{ backgroundColor: 'var(--color-primary)' }} />
            )}
            <CircleProgress pct={pct} size={36} stroke={3} />
            <span className="absolute inset-0 flex items-center justify-center
              text-[9px] font-bold"
              style={{ color: 'var(--color-primary)' }}>
              {pct}%
            </span>
          </div>
        )}
      </div>

      {/* 과 정보 */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[13px] leading-snug truncate">
          {lesson.title}
        </p>
        <p className="text-[11px] mt-0.5 truncate"
          style={{ color: 'var(--color-text-secondary)' }}>
          {lesson.subtitle}
        </p>
      </div>

      {/* 스텝 수 */}
      <span className="text-[10px] font-semibold shrink-0"
        style={{ color: 'var(--color-text-tertiary)' }}>
        {lesson.steps.length}스텝
      </span>
    </button>
  )
}
