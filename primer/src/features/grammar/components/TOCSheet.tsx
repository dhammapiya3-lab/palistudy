import { stepLabel } from './step-label'
import type { StepType } from '../types'

interface TOCSheetProps {
  STEPS: StepType[]
  stepIdx: number
  isSkipped?: (index: number) => boolean
  onSelect: (index: number) => void
  onClose: () => void
}

export default function TOCSheet({
  STEPS,
  stepIdx,
  isSkipped,
  onSelect,
  onClose
}: TOCSheetProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: 'var(--color-overlay)' }}
      onClick={onClose}
      onKeyDown={e => { if (e.key === 'Escape') onClose() }}
      role="dialog" aria-modal="true" aria-label="단계 목차">
      <div className="w-full max-w-lg rounded-t-3xl overflow-hidden animate-slideUp"
        style={{ backgroundColor: 'var(--color-bg)', maxHeight: '70vh' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-base font-bold">스텝 목차</h3>
          <button onClick={onClose} autoFocus
            className="w-11 h-11 flex items-center justify-center rounded-full shrink-0
                       active:scale-90 transition-transform"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label="목차 닫기">✕</button>
        </div>
        <div className="overflow-y-auto px-3 pb-6" style={{ maxHeight: 'calc(70vh - 60px)' }}>
          {STEPS.map((s, i) => {
            const label = stepLabel(s, i)
            const isCur = i === stepIdx
            const skipped = isSkipped?.(i) ?? false
            const typeIcon = s.type === 'intro' ? '📖' : s.type === 'teach' ? '📝'
              : s.type === 'teach-grammar' ? '📐' : s.type === 'quiz' ? '❓'
              : s.type === 'match-listen' ? '🔊' : s.type === 'match-reverse' ? '🎯'
              : s.type === 'writing' ? '✍️' : s.type === 'speak' ? '🎤'
              : s.type === 'arrange' ? '🧩' : s.type === 'verse' ? '☸️' : '•'

            return (
              <button key={i}
                onClick={() => onSelect(i)}
                disabled={skipped}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                           transition-all duration-200 active:scale-[0.98]"
                style={{
                  backgroundColor: isCur
                    ? 'color-mix(in srgb, var(--color-primary) 10%, var(--color-surface))'
                    : 'transparent',
                  border: isCur ? '1px solid var(--color-primary-light)' : '1px solid transparent',
                  opacity: skipped ? 0.45 : 1,
                }}>
                <span className="text-sm shrink-0">{typeIcon}</span>
                <span className="text-xs font-medium truncate flex-1"
                  style={{ color: isCur ? 'var(--color-primary)' : 'var(--color-text)' }}>
                  {i + 1}. {label}
                </span>
                {skipped && (
                  <span className="text-[10px] shrink-0" style={{ color: 'var(--color-text-secondary)' }}>쓰기 모드 꺼짐</span>
                )}
                {isCur && (
                  <span className="text-[10px] font-bold shrink-0"
                    style={{ color: 'var(--color-primary)' }}>현재</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
