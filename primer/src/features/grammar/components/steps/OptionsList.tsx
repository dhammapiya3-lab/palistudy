
interface OptionsListProps {
  showResult: boolean
  selected: number | null
  shuffledOpts: string[]
  answerText: string
  onSelect: (index: number) => void
  /** 듣기 문제: 채점 전에는 '(한글 뜻)' 부분을 숨김 — 글자만 보고 맞히지 않게 */
  hideGloss?: boolean
  /** 큰 보기 (쉬운 화면) */
  large?: boolean
}

/** 'bhagavā (세존)' → 'bhagavā' */
const stripGloss = (s: string) => s.replace(/\s*\([^()]*\)\s*$/, '')

export default function OptionsList({
  showResult,
  selected,
  shuffledOpts,
  answerText,
  onSelect,
  hideGloss,
  large,
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
            className={`w-full flex items-center gap-3 p-4 rounded-2xl text-left ${large ? 'text-lg' : 'text-sm'}
              font-medium transition-all active:scale-[0.98]
              ${isAns ? 'option-correct' : ''}
              ${isWrn ? 'option-wrong' : ''}`}
            style={{
              backgroundColor: isAns
                ? 'var(--color-success-bg)'
                : isWrn
                  ? 'var(--color-wrong-bg)'
                  : 'var(--color-surface)',
              border: isAns
                ? '2px solid var(--color-success-strong)'
                : isWrn
                  ? '2px solid var(--color-wrong-strong)'
                  : isSelected
                    ? '2px solid var(--color-primary)'
                    : '1.5px solid var(--color-border)',
              minHeight: large ? '60px' : '48px',
            }}
          >
            <span
              className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                border: isAns
                  ? '2px solid var(--color-success-strong)'
                  : isWrn
                    ? '2px solid var(--color-wrong-strong)'
                    : isSelected
                      ? '2px solid var(--color-primary)'
                      : '2px solid var(--color-border)',
                backgroundColor: isAns
                  ? 'var(--color-success-strong)'
                  : isWrn
                    ? 'var(--color-wrong-strong)'
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
            <span className="flex-1" lang={hideGloss && !showResult ? 'pi' : undefined}>
              {hideGloss && !showResult ? stripGloss(opt) : opt}
            </span>
            {isAns && (
              <span className="font-bold text-base" style={{ color: 'var(--color-success-strong)' }} aria-label="정답">✓</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
