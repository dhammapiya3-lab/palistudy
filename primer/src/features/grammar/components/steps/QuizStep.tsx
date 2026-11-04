import { useState } from 'react'
import type { QuizStep as QuizStepType } from '../../types'
import OptionsList from './OptionsList'

interface QuizStepProps {
  step: QuizStepType
  showResult: boolean
  selected: number | null
  shuffledOpts: string[]
  getAnswerText: () => string
  onSelect: (index: number) => void
}

export default function QuizStep({
  step,
  showResult,
  selected,
  shuffledOpts,
  getAnswerText,
  onSelect
}: QuizStepProps) {
  // 힌트는 접힌 채로 시작 — 필요할 때 눌러서 봄
  const [hintOpen, setHintOpen] = useState(false)
  return (
    <div className="flex-1 flex flex-col">
      <p className="text-lg font-bold mb-2">{step.question}</p>
      {step.hint && !hintOpen && (
        <button
          type="button"
          onClick={() => setHintOpen(true)}
          className="self-start flex items-center gap-1.5 mb-4 px-3 py-2 rounded-xl text-xs font-medium active:scale-95 transition-transform"
          style={{
            color: 'var(--color-text-secondary)',
            border: '1px dashed var(--color-border)',
            minHeight: 36,
          }}
          aria-expanded={false}
        >
          <span aria-hidden="true">💡</span> 힌트 보기
        </button>
      )}
      {step.hint && hintOpen && (
        <div
          className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl text-xs reveal-down"
          style={{
            backgroundColor: 'var(--color-warn-bg)',
            border: '1px solid var(--color-warn-border)',
          }}
        >
          <span aria-hidden="true">💡</span>
          <span>{step.hint}</span>
        </div>
      )}
      <OptionsList
        showResult={showResult}
        selected={selected}
        shuffledOpts={shuffledOpts}
        answerText={getAnswerText()}
        onSelect={onSelect}
      />
    </div>
  )
}
