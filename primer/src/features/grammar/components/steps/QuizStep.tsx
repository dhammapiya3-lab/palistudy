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
  return (
    <div className="flex-1 flex flex-col">
      <p className="text-lg font-bold mb-2">{step.question}</p>
      {step.hint && !showResult && (
        <div
          className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl text-xs"
          style={{
            backgroundColor: '#FFF8E1',
            border: '1px solid #FFE082',
          }}
        >
          <span>💡</span>
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
