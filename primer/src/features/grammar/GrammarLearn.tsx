import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { estimateMinutes } from '../../utils/lesson-time'
import { buildGlossary } from './verse-gloss'
import ChunkBreakScreen from './components/ChunkBreakScreen'
import OnboardingCards from './components/OnboardingCards'
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
  const backToSutta = useSuttaBack(lid)
  if (data.status === 'ready') return (
    <>
      {backToSutta && (
        <a
          href={backToSutta}
          className="fixed left-1/2 -translate-x-1/2 z-[60] text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ top: 'max(6px, env(safe-area-inset-top))', backgroundColor: 'var(--color-primary)', color: '#fff', boxShadow: 'var(--shadow-sm)' }}
        >
          ← 경전으로 돌아가기
        </a>
      )}
      <GrammarLearnView lesson={data.lesson} />
    </>
  )
  return <LessonLoadState error={data.status === 'error'} isReview={lid === REVIEW_QUIZ_ID} />
}

/** 경전으로 배우기의 문법 칩에서 왔으면(?back=) 돌아갈 주소 — 이 앱 주소에서 지워져도 유지 */
function useSuttaBack(lid: string): string | null {
  const [back] = useState<string | null>(() => {
    try {
      const q = window.location.hash.split('?')[1] || ''
      const b = new URLSearchParams(q).get('back')
      if (b && b.startsWith('/palistudy/suttalog/')) {
        sessionStorage.setItem('primer-back-to-sutta', JSON.stringify({ lid, b }))
        return b
      }
      const saved = JSON.parse(sessionStorage.getItem('primer-back-to-sutta') || 'null') as { lid: string; b: string } | null
      return saved && saved.lid === lid ? saved.b : null
    } catch { return null }
  })
  return back
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

/** 쉬운 화면: 학습 화면에 있는 동안 글씨를 '매우 크게'(21px)로 — 나가면 원래대로 */
function useEasyFont(on: boolean) {
  useEffect(() => {
    if (!on) return
    const el = document.documentElement
    const before = el.style.fontSize
    el.style.fontSize = '21px'
    return () => { el.style.fontSize = before }
  }, [on])
}

function GrammarLearnView({ lesson }: { lesson: LessonInfo | null }) {
  const {
    lid, STEPS, stepIdx, isReview,
    hearts, selected, setSelected,
    showResult, writingChecked, setWritingChecked,
    arrangeOrder, setArrangeOrder, phase,
    showCompletion, correctCount, quizTotal,
    showTOC, setShowTOC, showRef, setShowRef,
    heartShakeIdx, refTables, writingEnabled, easyMode,
    step, speak, shuffledOpts,
    getElapsedMin, handleCheck, handleNext, handlePrev, seekTo, restart, close,
    isLastStep, hasPrev,
    isQuizType, isArrangeCorrect, isSkipped, skipReason,
    lastAnswer, chunks, chunkLabel, chunkBreak, continueChunk, stopAtChunk, restartChunk,
    retryMode, retryWrong, wrongCount, nextLesson, goNextLesson,
    moreGroups, openMoreGroup, inlineMore, visibleSteps,
  } = useGrammarLearn(lesson)

  const onboardingSeen = useStore(s => s.onboardingSeen)
  const setOnboardingSeen = useStore(s => s.setOnboardingSeen)
  const dailyGoalMin = useStore(s => s.dailyGoalMin)
  const writingSetting = useStore(s => s.writingEnabled)
  const setWritingEnabled = useStore(s => s.setWritingEnabled)
  const writingOffered = useStore(s => s.writingOffered)
  const setWritingOffered = useStore(s => s.setWritingOffered)

  useEasyFont(easyMode)

  // 경전 낱말 풀이 — 같은 과 낱말 카드에서
  const glossary = useMemo(() => buildGlossary(STEPS, lid), [STEPS, lid])

  // 쉬운 화면: 메모 버튼 숨김 (학습 화면에 있는 동안만)
  const hideMemo = easyMode ? <style>{'button[aria-label="메모"]{display:none!important}'}</style> : null

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
    // 1과를 마치면 한 번만 '글자 쓰기도 해 볼까요?' (쓰기가 꺼져 있고 쉬운 화면이 아닐 때)
    const writingOffer = lid === 'lesson-01' && !writingOffered && !writingSetting && !easyMode
    return (
      <>
        {hideMemo}
        <CompletionScreen
          correctCount={correctCount}
          quizTotal={quizTotal}
          hearts={hearts}
          elapsed={getElapsedMin()}
          isReview={isReview}
          onHome={close}
          onRestart={() => restart(0)}
          nextLessonTitle={nextLesson?.title}
          onNextLesson={nextLesson ? goNextLesson : undefined}
          wrongCount={wrongCount}
          onRetryWrong={retryWrong}
          moreGroups={moreGroups}
          onOpenMore={openMoreGroup}
          writingOffer={writingOffer}
          onWritingOffer={accept => { setWritingOffered(true); if (accept) setWritingEnabled(true) }}
          easyMode={easyMode}
        />
      </>
    )
  }

  if (chunkBreak) {
    const nextChunk = chunks[chunkBreak.done]
    return (
      <>
        {hideMemo}
        <ChunkBreakScreen
          done={chunkBreak.done}
          total={chunks.length}
          lessonTitle={lesson?.title || lid}
          nextMinutes={nextChunk ? estimateMinutes(nextChunk.length) : 0}
          easyMode={easyMode}
          onContinue={continueChunk}
          onStop={stopAtChunk}
        />
      </>
    )
  }

  if (hearts <= 0 && !easyMode && !retryMode) {
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
        onRestartChunk={chunks.length > 1 && chunkLabel ? restartChunk : undefined}
        chunkLabel={chunkLabel}
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
      {hideMemo}
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
          stepTitle={retryMode ? `다시 풀기 · ${stepTitle}` : step.more ? `더 알아보기 · ${stepTitle}` : stepTitle}
          onSeek={seekTo}
          hideHearts={easyMode || retryMode}
          chunkLabel={chunkLabel}
          visibleSteps={visibleSteps}
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
              return (step as { options: string[]; answer: number }).options[(step as { answer: number }).answer]
            }}
            onSelect={setSelected}
            writingEnabled={writingEnabled}
            writingChecked={writingChecked}
            onSetWritingChecked={setWritingChecked}
            onNext={handleNext}
            arrangeOrder={arrangeOrder}
            onSetArrangeOrder={setArrangeOrder}
            isArrangeCorrect={isArrangeCorrect}
            lastOk={showResult ? lastAnswer?.ok : undefined}
            easyMode={easyMode}
            glossary={glossary}
          />

          {/* 바로 뒤에 붙은 '더 알아보기' — 원할 때만 */}
          {inlineMore && (
            <button
              type="button"
              onClick={() => openMoreGroup(inlineMore)}
              className="self-start mt-4 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium active:scale-95 transition-transform"
              style={{ color: 'var(--color-primary)', border: '1px dashed var(--color-primary-light)', minHeight: 40 }}
            >
              📖 더 알아보기: {inlineMore} ›
            </button>
          )}
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
            skipReason={skipReason}
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

        {/* 처음 공부할 때 30초 안내 */}
        {!onboardingSeen && !isReview && (
          <OnboardingCards goalMin={dailyGoalMin} easyMode={easyMode} onDone={() => setOnboardingSeen(true)} />
        )}
      </div>
    </div>
  )
}
