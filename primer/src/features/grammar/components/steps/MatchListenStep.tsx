import type { MatchListenStep as MatchListenStepType } from '../../types'
import OptionsList from './OptionsList'
import AnswerExplain from './AnswerExplain'

interface MatchListenStepProps {
  step: MatchListenStepType
  showResult: boolean
  selected: number | null
  shuffledOpts: string[]
  getAnswerText: () => string
  onSelect: (index: number) => void
  onSpeak: (text: string) => void
  lastOk?: boolean
  large?: boolean
}

export default function MatchListenStep({
  step,
  showResult,
  selected,
  shuffledOpts,
  getAnswerText,
  onSelect,
  onSpeak,
  lastOk,
  large,
}: MatchListenStepProps) {
  return (
    <div className="flex-1 flex flex-col">
      <p className="text-sm font-bold mb-4">{step.instruction}</p>
      <button
        onClick={() => onSpeak(step.word)}
        aria-label="소리 듣기"
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
        hideGloss
        large={large}
      />
      {!showResult && (
        <p className="text-xs mt-3 text-center" style={{ color: 'var(--color-text-secondary)' }}>
          🔊를 누르면 다시 들을 수 있어요
        </p>
      )}
      {/* 채점 뒤: 들은 낱말과 한글 발음 */}
      {showResult && lastOk !== undefined && (
        <AnswerExplain
          ok={lastOk}
          answer={<><span lang="pi" className="pali-text">{step.word}</span> <span className="font-normal">[{step.pronKo}]</span></>}
          explain={lastOk ? undefined : '🔊를 다시 눌러 소리를 들어 보세요.'}
        />
      )}
    </div>
  )
}
