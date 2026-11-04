import type { StepType } from '../types'
import IntroStep from './steps/IntroStep'
import TeachStep from './steps/TeachStep'
import TeachGrammarStep from './steps/TeachGrammarStep'
import QuizStep from './steps/QuizStep'
import MatchListenStep from './steps/MatchListenStep'
import MatchReverseStep from './steps/MatchReverseStep'
import WritingStep from './steps/WritingStep'
import SpeakStep from './steps/SpeakStep'
import ArrangeStep from './steps/ArrangeStep'
import VerseStep from './steps/VerseStep'

interface StepRendererProps {
  step: StepType
  lid: string
  onSpeak: (text: string) => void
  showResult: boolean
  selected: number | null
  shuffledOpts: string[]
  getAnswerText: () => string
  onSelect: (index: number) => void
  writingEnabled: boolean
  writingChecked: boolean
  onSetWritingChecked: (val: boolean) => void
  onNext: () => void
  arrangeOrder: number[]
  onSetArrangeOrder: (val: number[] | ((prev: number[]) => number[])) => void
  isArrangeCorrect: boolean
}

export default function StepRenderer(props: StepRendererProps) {
  const { step } = props

  switch (step.type) {
    case 'intro':
      return <IntroStep step={step} />
    case 'teach':
      return <TeachStep step={step} lid={props.lid} onSpeak={props.onSpeak} />
    case 'teach-grammar':
      return <TeachGrammarStep step={step} />
    case 'quiz':
      return (
        <QuizStep
          step={step}
          showResult={props.showResult}
          selected={props.selected}
          shuffledOpts={props.shuffledOpts}
          getAnswerText={props.getAnswerText}
          onSelect={props.onSelect}
        />
      )
    case 'match-listen':
      return (
        <MatchListenStep
          step={step}
          showResult={props.showResult}
          selected={props.selected}
          shuffledOpts={props.shuffledOpts}
          getAnswerText={props.getAnswerText}
          onSelect={props.onSelect}
          onSpeak={props.onSpeak}
        />
      )
    case 'match-reverse':
      return (
        <MatchReverseStep
          step={step}
          showResult={props.showResult}
          selected={props.selected}
          shuffledOpts={props.shuffledOpts}
          getAnswerText={props.getAnswerText}
          onSelect={props.onSelect}
        />
      )
    case 'writing':
      return (
        <WritingStep
          step={step}
          writingEnabled={props.writingEnabled}
          writingChecked={props.writingChecked}
          onSetWritingChecked={props.onSetWritingChecked}
          onSpeak={props.onSpeak}
          onNext={props.onNext}
        />
      )
    case 'speak':
      return <SpeakStep step={step} onSpeak={props.onSpeak} />
    case 'arrange':
      return (
        <ArrangeStep
          step={step}
          arrangeOrder={props.arrangeOrder}
          onSetArrangeOrder={props.onSetArrangeOrder}
          isArrangeCorrect={props.isArrangeCorrect}
        />
      )
    case 'verse':
      return <VerseStep step={step} onSpeak={props.onSpeak} />
    default:
      return null
  }
}
