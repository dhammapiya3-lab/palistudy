import type { MatchReverseStep as MatchReverseStepType } from '../../types'
import OptionsList from './OptionsList'

interface MatchReverseStepProps {
  step: MatchReverseStepType
  showResult: boolean
  selected: number | null
  shuffledOpts: string[]
  getAnswerText: () => string
  onSelect: (index: number) => void
}

export default function MatchReverseStep({
  step,
  showResult,
  selected,
  shuffledOpts,
  getAnswerText,
  onSelect
}: MatchReverseStepProps) {
  return (
    <div className="flex-1 flex flex-col">
      <p className="text-sm font-bold mb-2">{step.instruction}</p>
      <div
        className="rounded-2xl p-4 mb-4 text-center"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1.5px solid var(--color-primary)',
        }}
      >
        <p
          className="text-xl font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          {step.meaning}
        </p>
      </div>
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
