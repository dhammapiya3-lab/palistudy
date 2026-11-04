import type { ArrangeStep as ArrangeStepType } from '../../types'

interface ArrangeStepProps {
  step: ArrangeStepType
  arrangeOrder: number[]
  onSetArrangeOrder: (val: number[] | ((prev: number[]) => number[])) => void
  isArrangeCorrect: boolean
}

export default function ArrangeStep({
  step,
  arrangeOrder,
  onSetArrangeOrder,
  isArrangeCorrect
}: ArrangeStepProps) {
  return (
    <div className="flex-1 flex flex-col">
      <p className="text-lg font-bold mb-2">🧩 {step.instruction}</p>
      <p
        className="text-xs mb-4"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {step.translation}
      </p>

      {/* 배치 슬롯 (드롭존) */}
      <div
        className="flex flex-wrap gap-2 p-4 min-h-16 rounded-2xl mb-4
                   transition-all duration-200"
        style={{
          backgroundColor: arrangeOrder.length
            ? 'color-mix(in srgb, var(--color-primary) 5%, var(--color-surface))'
            : 'var(--color-surface)',
          border: arrangeOrder.length
            ? '2px solid color-mix(in srgb, var(--color-primary) 30%, transparent)'
            : '2px dashed var(--color-border)',
        }}
      >
        {arrangeOrder.length === 0 && (
          <p
            className="text-xs w-full text-center"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            아래에서 단어를 순서대로 선택하세요
          </p>
        )}
        {arrangeOrder.map((idx, i) => (
          <button
            key={i}
            onClick={() =>
              onSetArrangeOrder(o => o.filter((_, j) => j !== i))
            }
            className="px-4 py-2.5 rounded-xl text-sm font-medium pali-text
                       active:scale-95 transition-all"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              boxShadow: '0 2px 6px rgba(212,118,10,0.2)',
            }}
          >
            {step.blocks[idx]}
          </button>
        ))}
      </div>

      {/* 선택 블록 */}
      <div className="flex flex-wrap gap-2">
        {step.blocks.map((block, idx) => {
          const used = arrangeOrder.includes(idx)
          return (
            <button
              key={idx}
              onClick={() =>
                !used && onSetArrangeOrder(o => [...o, idx])
              }
              className="px-4 py-2.5 rounded-xl text-sm font-medium pali-text
                         active:scale-95 transition-all duration-200"
              style={{
                backgroundColor: used
                  ? 'var(--color-border)'
                  : 'var(--color-surface)',
                border: used
                  ? '1.5px solid var(--color-border)'
                  : '1.5px solid var(--color-border)',
                opacity: used ? 0.35 : 1,
                transform: used ? 'scale(0.95)' : 'scale(1)',
                boxShadow: used
                  ? 'none'
                  : '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              {block}
            </button>
          )
        })}
      </div>

      {/* 정답 체크 */}
      {arrangeOrder.length === step.blocks.length && (
        <div
          className={`mt-4 rounded-2xl p-4 text-center text-sm font-medium
            ${isArrangeCorrect ? 'option-correct' : 'option-wrong'}`}
          style={{
            backgroundColor: isArrangeCorrect
              ? '#E8F5E9'
              : '#FFEBEE',
            border: `1.5px solid ${isArrangeCorrect ? '#C8E6C9' : '#FFCDD2'}`,
          }}
        >
          {isArrangeCorrect ? (
            <span className="flex items-center justify-center gap-2">
              <span className="text-green-600 text-lg">✓</span>
              정답입니다!
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span className="text-red-500 text-lg">✕</span>
              다시 시도해보세요
            </span>
          )}
        </div>
      )}
    </div>
  )
}
