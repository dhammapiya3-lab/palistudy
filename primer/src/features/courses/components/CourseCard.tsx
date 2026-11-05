import CircleProgress from './CircleProgress'
import { estimateMinutes, chunkCount } from '../../../utils/lesson-time'
import { friendlySubtitle } from '../subtitles'
import { suttaLinksFor, suttaLessonUrl } from '../../reference/sutta-links'

interface CourseCardProps {
  lesson: {
    id: string
    title: string
    subtitle: string
    stepCount: number
  }
  isCompleted: boolean
  isCurrent: boolean
  pct: number
  onClick: () => void
}

export default function CourseCard({ lesson, isCompleted, isCurrent, pct, onClick }: CourseCardProps) {
  const min = estimateMinutes(lesson.stepCount)
  const chunks = chunkCount(lesson.stepCount)
  // 마친 과에는 '이 문법이 나오는 경전' 한 줄
  const sutta = isCompleted ? suttaLinksFor(lesson.id)[0] : undefined
  return (
    <div>
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
          {friendlySubtitle(lesson.id, lesson.subtitle)}
        </p>
      </div>

      {/* 예상 시간 · 마디 수 */}
      {min > 0 && (
        <span className="text-[10px] font-semibold shrink-0 text-right leading-tight"
          style={{ color: 'var(--color-text-tertiary)' }}>
          약 {min}분<br />{chunks}마디
        </span>
      )}
    </button>
    {sutta && (
      <a href={suttaLessonUrl(sutta.sutta)}
        className="flex items-center gap-1.5 mt-1 ml-12 mr-1 px-2.5 py-1.5 rounded-lg text-[11px]"
        style={{ color: 'var(--color-primary)', backgroundColor: 'color-mix(in srgb, var(--color-primary) 6%, transparent)' }}>
        <span aria-hidden="true">🪷</span>
        <span className="truncate">이 문법이 나오는 경전 · {sutta.title} — {sutta.note}</span>
        <span aria-hidden="true" className="ml-auto shrink-0">›</span>
      </a>
    )}
    </div>
  )
}
