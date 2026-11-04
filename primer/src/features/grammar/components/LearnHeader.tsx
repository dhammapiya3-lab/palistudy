import type { StepType } from '../types'
import type { DeclensionTable } from '../declension-tables'

interface LearnHeaderProps {
  onClose: () => void
  progress: number
  STEPS: StepType[]
  stepIdx: number
  refTables: DeclensionTable[]
  onShowRef: () => void
  onShowTOC: () => void
  hearts: number
  heartShakeIdx: number | null
  lessonTitle: string
  stepTitle: string
  stepId?: string
}

export default function LearnHeader({
  onClose,
  progress,
  STEPS,
  stepIdx,
  refTables,
  onShowRef,
  onShowTOC,
  hearts,
  heartShakeIdx,
  lessonTitle,
  stepTitle,
  stepId
}: LearnHeaderProps) {
  const renderProgressDots = () => {
    const maxDots = Math.min(STEPS.length, 12)
    const ratio = STEPS.length / maxDots
    return (
      <div className="flex items-center gap-1 mt-1 justify-center">
        {Array.from({ length: maxDots }, (_, i) => {
          const mappedIdx = Math.floor(i * ratio)
          const isCurrent = mappedIdx <= stepIdx
          const isExact = Math.floor(stepIdx / ratio) === i
          return (
            <span
              key={i}
              className={`rounded-full transition-all duration-300
                ${isExact ? 'dot-active' : ''}`}
              style={{
                width: isExact ? '8px' : '5px',
                height: isExact ? '8px' : '5px',
                backgroundColor: isCurrent
                  ? 'var(--color-primary)'
                  : 'var(--color-border)',
              }}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="shrink-0 px-4 pt-3 pb-1">
      <div className="flex items-center gap-3">
        {/* 닫기 */}
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full
                     text-base active:scale-90 transition-transform"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          ✕
        </button>

        {/* 프로그레스 바 */}
        <div className="flex-1 flex flex-col gap-0.5">
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--color-border)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 ease-out
                         progress-bar-gradient"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">{renderProgressDots()}</div>
            <span
              className="text-[10px] ml-2 shrink-0"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {stepIdx + 1}/{STEPS.length}
            </span>
          </div>
        </div>

        {/* 심화자료 버튼 */}
        {refTables.length > 0 && (
          <button
            onClick={onShowRef}
            className="w-8 h-8 flex items-center justify-center rounded-full
                       active:scale-90 transition-transform shrink-0"
            style={{ color: 'var(--color-primary)' }}
            aria-label="심화자료"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </button>
        )}

        {/* 목차 버튼 */}
        <button
          onClick={onShowTOC}
          className="w-8 h-8 flex items-center justify-center rounded-full
                     active:scale-90 transition-transform shrink-0"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="목차"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </button>

        {/* 하트 */}
        <div className="flex gap-1 shrink-0 ml-1">
          {[0, 1, 2, 3, 4].map(i => (
            <span
              key={i}
              className={`text-lg transition-all duration-300
                ${i < hearts ? 'heart-pulse' : 'opacity-15 grayscale scale-75'}
                ${heartShakeIdx === i ? 'heart-shake' : ''}`}
              style={{
                animationDelay: i < hearts ? `${i * 0.2}s` : undefined,
              }}
            >
              🪷
            </span>
          ))}
        </div>
      </div>

      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 px-1 mt-1 text-[11px] leading-tight"
        style={{ color: 'var(--color-text-secondary)' }}>
        <span className="font-semibold truncate" style={{ color: 'var(--color-primary)', maxWidth: '40%' }}>
          {lessonTitle}
        </span>
        <span style={{ color: 'var(--color-border)' }}>›</span>
        <span className="truncate">{stepTitle}</span>
        {stepId && (
          <span className="ml-auto font-mono text-[9px] opacity-40 shrink-0">
            {stepId}
          </span>
        )}
      </div>
    </div>
  )
}
