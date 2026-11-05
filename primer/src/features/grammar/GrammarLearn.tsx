import { useNavigate, useParams } from 'react-router-dom'
import { useGrammarLearn } from './hooks/useGrammarLearn'
import { useLessonData, REVIEW_QUIZ_ID } from './hooks/useLessonData'
import type { LessonInfo } from './types'
import LearnHeader from './components/LearnHeader'
import LearnFooter from './components/LearnFooter'
import StepRenderer from './components/StepRenderer'
import CompletionScreen from './components/CompletionScreen'
import GameOverScreen from './components/GameOverScreen'
import TOCSheet from './components/TOCSheet'
import ReferenceSheet from './components/ReferenceSheet'

/** 과 화면 — 과 내용을 받은 뒤 학습 화면을 띄움 (받는 동안 잠깐 '불러오는 중') */
export default function GrammarLearn() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const lid = lessonId || 'lesson-01'
  const data = useLessonData(lid)
  if (data.status === 'ready') return <GrammarLearnView lesson={data.lesson} />
  return <LessonLoadState error={data.status === 'error'} isReview={lid === REVIEW_QUIZ_ID} />
}

/** 과 내용을 받는 중 / 받지 못함 */
function LessonLoadState({ error, isReview }: { error: boolean; isReview: boolean }) {
  const nav = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {error ? (
        <div className="text-center px-6 animate-fadeIn" role="alert">
          <p className="mb-1">과 내용을 불러오지 못했습니다.</p>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>인터넷 연결을 확인한 뒤 다시 시도해 주세요.</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => window.location.reload()} className="btn-primary">다시 시도</button>
            <button onClick={() => nav(isReview ? '/review' : '/')} className="btn-secondary">돌아가기</button>
          </div>
        </div>
      ) : (
        <div className="text-center px-6 lesson-loading" role="status" aria-live="polite">
          <div className="w-8 h-8 mx-auto mb-3 rounded-full border-[3px] animate-spin"
            style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-primary)' }} aria-hidden="true" />
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>불러오는 중…</p>
        </div>
      )}
    </div>
  )
}

function GrammarLearnView({ lesson }: { lesson: LessonInfo | null }) {
  const {
    lid, STEPS, stepIdx, isReview,
    hearts, selected, setSelected,
    showResult, writingChecked, setWritingChecked,
    arrangeOrder, setArrangeOrder, phase,
    showCompletion, correctCount, quizTotal,
    showTOC, setShowTOC, showRef, setShowRef,
    heartShakeIdx, refTables, writingEnabled,
    step, speak, shuffledOpts,
    getElapsedMin, handleCheck, handleNext, handlePrev, seekTo, restart, close,
    isLastStep, hasPrev,
    isQuizType, isArrangeCorrect, isSkipped
  } = useGrammarLearn(lesson)

  if (!STEPS.length) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="text-center px-6">
          <p className="mb-4">{isReview ? '복습할 퀴즈가 아직 없습니다.' : '과를 찾을 수 없습니다.'}</p>
          <button onClick={close} className="btn-primary">돌아가기</button>
        </div>
      </div>
    )
  }

  if (showCompletion) {
    return (
      <CompletionScreen
        correctCount={correctCount}
        quizTotal={quizTotal}
        hearts={hearts}
        elapsed={getElapsedMin()}
        isReview={isReview}
        onHome={close}
        onRestart={() => restart(0)}
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
        onRestart={() => restart(0)}
        onRestartFromQuiz={() => restart(firstQuizIdx)}
        onHome={close}
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
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="max-w-lg mx-auto w-full min-w-0 flex flex-col flex-1">
        <LearnHeader
          onClose={close}
          STEPS={STEPS}
          stepIdx={stepIdx}
          refTables={refTables}
          onShowRef={() => setShowRef(true)}
          onShowTOC={() => setShowTOC(true)}
          hearts={hearts}
          heartShakeIdx={heartShakeIdx}
          lessonTitle={lesson?.title || lid}
          stepTitle={stepTitle}
          onSeek={seekTo}
        />

        <div className={`flex-1 flex flex-col overflow-y-auto px-4 pt-3 pb-28 scroll-smooth ${phase === 'enter' ? 'step-enter' : phase === 'exit' ? 'step-exit' : ''}`}>
          <StepRenderer
            key={step.id}
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
          hasPrev={hasPrev}
          onPrev={handlePrev}
          isQuizType={isQuizType}
          showResult={showResult}
          onCheck={handleCheck}
          selected={selected}
          onNext={handleNext}
          isLastStep={isLastStep}
        />

        {showTOC && (
          <TOCSheet
            STEPS={STEPS}
            stepIdx={stepIdx}
            isSkipped={isSkipped}
            onSelect={(i) => { setShowTOC(false); seekTo(i) }}
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
