
interface OptionsListProps {
  showResult: boolean
  selected: number | null
  shuffledOpts: string[]
  answerText: string
  onSelect: (index: number) => void
}

export default function OptionsList({
  showResult,
  selected,
  shuffledOpts,
  answerText,
  onSelect
}: OptionsListProps) {
  return (
    <div className="space-y-3">
      {shuffledOpts.map((opt, i) => {
        const isAns = showResult && opt === answerText
        const isWrn = showResult && selected === i && opt !== answerText
        const isSelected = !showResult && selected === i
        return (
          <button
            key={i}
            onClick={() => !showResult && onSelect(i)}
            disabled={showResult}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl text-left text-sm
              font-medium transition-all active:scale-[0.98]
              ${isAns ? 'option-correct' : ''}
              ${isWrn ? 'option-wrong' : ''}`}
            style={{
              backgroundColor: isAns
                ? '#E8F5E9'
                : isWrn
                  ? '#FFEBEE'
                  : 'var(--color-surface)',
              border: isAns
                ? '2px solid #4CAF50'
                : isWrn
                  ? '2px solid #F44336'
                  : isSelected
                    ? '2px solid var(--color-primary)'
                    : '1.5px solid var(--color-border)',
              minHeight: '48px',
            }}
          >
            <span
              className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                border: isAns
                  ? '2px solid #4CAF50'
                  : isWrn
                    ? '2px solid #F44336'
                    : isSelected
                      ? '2px solid var(--color-primary)'
                      : '2px solid var(--color-border)',
                backgroundColor: isAns
                  ? '#4CAF50'
                  : isWrn
                    ? '#F44336'
                    : isSelected
                      ? 'var(--color-primary)'
                      : 'transparent',
              }}
            >
              {(isAns || isSelected) && !isWrn && (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
              {isWrn && (
                <span className="text-white text-xs font-bold">✕</span>
              )}
            </span>
            <span className="flex-1">{opt}</span>
            {isAns && (
              <span className="text-green-600 font-bold text-base">✓</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
