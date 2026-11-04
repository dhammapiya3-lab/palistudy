import { useGrammarLearn } from './hooks/useGrammarLearn'
import LearnHeader from './components/LearnHeader'
import LearnFooter from './components/LearnFooter'
import StepRenderer from './components/StepRenderer'
import CompletionScreen from './components/CompletionScreen'
import GameOverScreen from './components/GameOverScreen'
import TOCSheet from './components/TOCSheet'
import ReferenceSheet from './components/ReferenceSheet'

export default function GrammarLearn() {
  const {
    nav, lid, lesson, STEPS, stepIdx, setStepIdx,
    hearts, setHearts, selected, setSelected,
    showResult, setShowResult, writingChecked, setWritingChecked,
    arrangeOrder, setArrangeOrder, phase,
    showCompletion, setShowCompletion, correctCount, setCorrectCount,
    showTOC, setShowTOC, showRef, setShowRef,
    heartShakeIdx, refTables, writingEnabled,
    step, progress, speak, shuffledOpts,
    getElapsedMin, handleCheck, handleNext, handlePrev,
    isQuizType, isArrangeCorrect, transitionTo, startTimeRef
  } = useGrammarLearn()

  if (!STEPS.length) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <p>과를 찾을 수 없습니다.</p>
      </div>
    )
  }

  if (showCompletion) {
    return (
      <CompletionScreen
        correctCount={correctCount}
        hearts={hearts}
        elapsed={getElapsedMin()}
        onHome={() => nav('/')}
        onRestart={() => {
          setShowCompletion(false)
          setHearts(5)
          setCorrectCount(0)
          setStepIdx(0)
          startTimeRef.current = Date.now()
        }}
      />
    )
  }

  if (hearts <= 0) {
    const firstQuizIdx = STEPS.findIndex(s =>
      s.type === 'quiz' || s.type === 'match-listen' || s.type === 'match-reverse'
    )
    return (
      <GameOverScreen
        stepIdx={stepIdx}
        totalSteps={STEPS.length}
        onRestart={() => {
          setHearts(5)
          setStepIdx(0)
          setCorrectCount(0)
          setSelected(null)
          setShowResult(false)
        }}
        onRestartFromQuiz={() => {
          setHearts(5)
          setStepIdx(firstQuizIdx)
          setCorrectCount(0)
          setSelected(null)
          setShowResult(false)
        }}
        onHome={() => nav('/')}
        firstQuizIdx={firstQuizIdx}
      />
    )
  }

  const stepTitle = step.type === 'intro' ? '소개'
    : step.type === 'teach' ? `단어: ${step.word}`
    : step.type === 'teach-grammar' ? `문법: ${step.title}`
    : step.type === 'quiz' ? '퀴즈'
    : step.type === 'match-listen' ? '듣기'
    : step.type === 'match-reverse' ? '뜻맞추기'
    : step.type === 'writing' ? '쓰기'
    : step.type === 'speak' ? '따라읽기'
    : step.type === 'arrange' ? '배열'
    : step.type === 'verse' ? '경전'
    : `스텝 ${stepIdx + 1}`

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="max-w-lg mx-auto w-full flex flex-col flex-1">
        <LearnHeader
          onClose={() => nav('/')}
          progress={progress}
          STEPS={STEPS}
          stepIdx={stepIdx}
          refTables={refTables}
          onShowRef={() => setShowRef(true)}
          onShowTOC={() => setShowTOC(true)}
          hearts={hearts}
          heartShakeIdx={heartShakeIdx}
          lessonTitle={lesson?.title || lid}
          stepTitle={stepTitle}
          stepId={step.id}
        />

        <div className={`flex-1 flex flex-col overflow-y-auto px-4 pt-3 pb-28 scroll-smooth ${phase === 'enter' ? 'step-enter' : phase === 'exit' ? 'step-exit' : ''}`}>
          <StepRenderer
            step={step}
            lid={lid}
            onSpeak={speak}
            showResult={showResult}
            selected={selected}
            shuffledOpts={shuffledOpts}
            getAnswerText={() => {
              if (!('answer' in step) || !('options' in step)) return ''
              return (step as any).options[(step as any).answer]
            }}
            onSelect={setSelected}
            writingEnabled={writingEnabled}
            writingChecked={writingChecked}
            onSetWritingChecked={setWritingChecked}
            onNext={handleNext}
            arrangeOrder={arrangeOrder}
            onSetArrangeOrder={setArrangeOrder}
            isArrangeCorrect={isArrangeCorrect}
          />
        </div>

        <LearnFooter
          stepIdx={stepIdx}
          onPrev={handlePrev}
          isQuizType={isQuizType}
          showResult={showResult}
          onCheck={handleCheck}
          selected={selected}
          onNext={handleNext}
          isLastStep={stepIdx + 1 >= STEPS.length}
        />

        {showTOC && (
          <TOCSheet
            STEPS={STEPS}
            stepIdx={stepIdx}
            onSelect={(i) => transitionTo(() => { setStepIdx(i); setShowTOC(false); })}
            onClose={() => setShowTOC(false)}
          />
        )}

        {showRef && (
          <ReferenceSheet
            refTables={refTables}
            onClose={() => setShowRef(false)}
          />
        )}
      </div>
    </div>
  )
}
