
interface LearnFooterProps {
  stepIdx: number
  onPrev: () => void
  isQuizType: boolean
  showResult: boolean
  onCheck: () => void
  selected: number | null
  onNext: () => void
  isLastStep: boolean
}

export default function LearnFooter({
  stepIdx,
  onPrev,
  isQuizType,
  showResult,
  onCheck,
  selected,
  onNext,
  isLastStep
}: LearnFooterProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bottom-bar-frost"
      style={{
        borderTop: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)',
      }}
    >
      <div className="max-w-lg mx-auto px-4 pt-3 pb-3 flex items-center gap-3">
        {/* 뒤로 */}
        {stepIdx > 0 && (
          <button
            onClick={onPrev}
            className="w-12 h-12 flex items-center justify-center rounded-2xl
                       text-sm font-bold active:scale-95 transition-transform shrink-0"
            style={{
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
          >
            ←
          </button>
        )}

        {/* 메인 버튼 */}
        {isQuizType && !showResult ? (
          <button
            onClick={onCheck}
            disabled={selected === null}
            className="flex-1 py-3.5 rounded-2xl text-white font-bold text-sm
                       transition-all duration-200 active:scale-[0.97]"
            style={{
              backgroundColor: selected !== null
                ? 'var(--color-primary)'
                : 'var(--color-border)',
              color: selected !== null ? 'white' : 'var(--color-text-secondary)',
              opacity: selected !== null ? 1 : 0.7,
              minHeight: '48px',
            }}
          >
            확인
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex-1 py-3.5 rounded-2xl text-white font-bold text-sm
                       active:scale-[0.97] transition-transform"
            style={{
              backgroundColor: 'var(--color-primary)',
              minHeight: '48px',
            }}
          >
            {isLastStep ? '🪷 완료' : '다음'}
          </button>
        )}

        {/* 건너뛰기 */}
        {!isLastStep && (
          <button
            onClick={onNext}
            className="shrink-0 text-xs font-medium py-2 px-1
                       active:opacity-50 transition-opacity"
            style={{
              color: 'var(--color-text-secondary)',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            건너뛰기
          </button>
        )}
      </div>
    </div>
  )
}
