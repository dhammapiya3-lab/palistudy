import type { MatchListenStep as MatchListenStepType } from '../../types'
import OptionsList from './OptionsList'

interface MatchListenStepProps {
  step: MatchListenStepType
  showResult: boolean
  selected: number | null
  shuffledOpts: string[]
  getAnswerText: () => string
  onSelect: (index: number) => void
  onSpeak: (text: string) => void
}

export default function MatchListenStep({
  step,
  showResult,
  selected,
  shuffledOpts,
  getAnswerText,
  onSelect,
  onSpeak
}: MatchListenStepProps) {
  return (
    <div className="flex-1 flex flex-col">
      <p className="text-sm font-bold mb-4">{step.instruction}</p>
      <button
        onClick={() => onSpeak(step.word)}
        className="w-24 h-24 mx-auto rounded-full flex items-center justify-center
                   text-4xl active:scale-90 transition-transform mb-6 mic-pulse"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
        }}
      >
        🔊
      </button>
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
