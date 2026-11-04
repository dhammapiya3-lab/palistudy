import type { StepType } from '../types'

interface TOCSheetProps {
  STEPS: StepType[]
  stepIdx: number
  onSelect: (index: number) => void
  onClose: () => void
}

export default function TOCSheet({
  STEPS,
  stepIdx,
  onSelect,
  onClose
}: TOCSheetProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: 'var(--color-overlay)' }}
      onClick={onClose}>
      <div className="w-full max-w-lg rounded-t-3xl overflow-hidden animate-slideUp"
        style={{ backgroundColor: 'var(--color-bg)', maxHeight: '70vh' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-base font-bold">스텝 목차</h3>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full
                       active:scale-90 transition-transform"
            style={{ color: 'var(--color-text-secondary)' }}>✕</button>
        </div>
        <div className="overflow-y-auto px-3 pb-6" style={{ maxHeight: 'calc(70vh - 60px)' }}>
          {STEPS.map((s, i) => {
            const label = s.type === 'intro' ? `${s.title}`
              : s.type === 'teach' ? `${s.word} — ${s.meaning}`
              : s.type === 'teach-grammar' ? s.title
              : s.type === 'quiz' ? `퀴즈: ${s.question.slice(0, 30)}...`
              : s.type === 'match-listen' ? `듣기: ${s.instruction.slice(0, 30)}`
              : s.type === 'match-reverse' ? `뜻맞추기: ${s.meaning}`
              : s.type === 'writing' ? `쓰기: ${s.answer}`
              : s.type === 'speak' ? `따라읽기: ${s.pali.slice(0, 30)}`
              : s.type === 'arrange' ? `배열: ${s.instruction.slice(0, 30)}`
              : s.type === 'verse' ? `경전: ${s.pali.slice(0, 30)}`
              : `스텝 ${i + 1}`
            const isCur = i === stepIdx
            const typeIcon = s.type === 'intro' ? '📖' : s.type === 'teach' ? '📝'
              : s.type === 'teach-grammar' ? '📐' : s.type === 'quiz' ? '❓'
              : s.type === 'match-listen' ? '🔊' : s.type === 'match-reverse' ? '🎯'
              : s.type === 'writing' ? '✍️' : s.type === 'speak' ? '🎤'
              : s.type === 'arrange' ? '🧩' : s.type === 'verse' ? '☸️' : '•'

            return (
              <button key={i}
                onClick={() => onSelect(i)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                           transition-all duration-200 active:scale-[0.98]"
                style={{
                  backgroundColor: isCur
                    ? 'color-mix(in srgb, var(--color-primary) 10%, var(--color-surface))'
                    : 'transparent',
                  border: isCur ? '1px solid var(--color-primary-light)' : '1px solid transparent',
                }}>
                <span className="text-sm shrink-0">{typeIcon}</span>
                <span className="text-xs font-medium truncate flex-1"
                  style={{ color: isCur ? 'var(--color-primary)' : 'var(--color-text)' }}>
                  {i + 1}. {label}
                </span>
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
