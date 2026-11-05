import type { MatchReverseStep as MatchReverseStepType } from '../../types'
import OptionsList from './OptionsList'
import AnswerExplain from './AnswerExplain'

interface MatchReverseStepProps {
  step: MatchReverseStepType
  showResult: boolean
  selected: number | null
  shuffledOpts: string[]
  getAnswerText: () => string
  onSelect: (index: number) => void
  lastOk?: boolean
  large?: boolean
}

export default function MatchReverseStep({
  step,
  showResult,
  selected,
  shuffledOpts,
  getAnswerText,
  onSelect,
  lastOk,
  large,
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
        large={large}
      />
      {showResult && lastOk !== undefined && (
        <AnswerExplain
          ok={lastOk}
          answer={<>“{step.meaning}” = <span lang="pi" className="pali-text">{getAnswerText()}</span></>}
        />
      )}
    </div>
  )
}
