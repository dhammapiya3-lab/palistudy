import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom'
import { speakPali, stopPali } from '../../../utils/pali-tts'
import type { StepType, LessonInfo } from '../types'
import { getTablesForLesson } from '../declension-tables'
import { addStudyEntry } from '../../../utils/study-log'
import { useStore } from '../../../store/useStore'
import { REVIEW_QUIZ_ID, isQuizStep } from './useLessonData'

type TransitionPhase = 'enter' | 'stable' | 'exit'

// ── 과 안에서의 학습 상태 (연꽃잎·정답·푼 문제) — 과를 나갔다 와도 이어짐 ──
const SESSION_KEY = 'pali-lesson-session'
interface Answer { sel: number; ok: boolean }
interface LessonSession { hearts: number; correct: number; answers: Record<number, Answer>; start: number }

function loadSession(lid: string): LessonSession | null {
  try {
    const all = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}')
    const s = all[lid]
    if (s && typeof s.hearts === 'number') return { hearts: s.hearts, correct: s.correct || 0, answers: s.answers || {}, start: s.start || Date.now() }
  } catch { /* 무시 */ }
  return null
}
function saveSession(lid: string, s: LessonSession | null) {
  try {
    const all = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}')
    if (s) all[lid] = s
    else delete all[lid]
    localStorage.setItem(SESSION_KEY, JSON.stringify(all))
  } catch { /* 무시 */ }
}

/** 과 학습 화면 상태 — lesson: 받아 둔 과 내용 (useLessonData), null이면 없는 과 */
export function useGrammarLearn(lesson: LessonInfo | null) {
  const nav = useNavigate()
  const location = useLocation()
  const { lessonId } = useParams<{ lessonId: string }>()
  const lid = lessonId || 'lesson-01'
  const isReview = lid === REVIEW_QUIZ_ID
  const STEPS = useMemo(() => lesson?.steps || [], [lesson])

  // 들어온 곳(과목·복습·홈)으로 돌아가기
  const backTo = (location.state as { from?: string } | null)?.from || (isReview ? '/review' : '/')

  const [searchParams, setSearchParams] = useSearchParams()
  const urlStep = searchParams.get('step')

  // --- 스토어 구독 ---
  const globalProgress = useStore(state => state.progress)
  const setGlobalProgress = useStore(state => state.setProgress)
  const markCompleted = useStore(state => state.markCompleted)
  const writingEnabled = useStore(state => state.writingEnabled)
  const recordStudy = useStore(state => state.recordStudy)

  // 쓰기 모드를 끄면 쓰기 단계는 건너뜀
  const isSkipped = useCallback((i: number) =>
    !writingEnabled && STEPS[i]?.type === 'writing', [writingEnabled, STEPS])
  const nextIdx = useCallback((from: number) => {
    for (let j = from + 1; j < STEPS.length; j++) if (!isSkipped(j)) return j
    return -1
  }, [STEPS.length, isSkipped])
  const prevIdx = useCallback((from: number) => {
    for (let j = from - 1; j >= 0; j--) if (!isSkipped(j)) return j
    return -1
  }, [isSkipped])
  /** 건너뛸 단계면 가려던 방향으로 가장 가까운 단계 */
  const resolveIdx = useCallback((target: number, dir: 1 | -1 = 1) => {
    if (!isSkipped(target)) return target
    const a = dir > 0 ? nextIdx(target) : prevIdx(target)
    if (a !== -1) return a
    const b = dir > 0 ? prevIdx(target) : nextIdx(target)
    return b !== -1 ? b : target
  }, [isSkipped, nextIdx, prevIdx])

  const [stepIdx, setStepIdxRaw] = useState(() => {
    const savedStep = isReview ? 0 : (globalProgress[lid] || 0)
    const fromUrl = urlStep !== null ? Number(urlStep) : NaN
    const initial = !isNaN(fromUrl) ? fromUrl : savedStep
    const clamped = initial >= STEPS.length || initial < 0 ? 0 : initial
    return STEPS.length ? resolveIdx(clamped, 1) : 0
  })

  const [session] = useState(() => (isReview ? null : loadSession(lid)))
  const [hearts, setHearts] = useState(session?.hearts ?? 5)
  const [prevHearts, setPrevHearts] = useState(session?.hearts ?? 5)
  const [answers, setAnswers] = useState<Record<number, Answer>>(session?.answers ?? {})
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [writingChecked, setWritingChecked] = useState(false)
  const [arrangeOrder, setArrangeOrder] = useState<number[]>([])
  const [phase, setPhase] = useState<TransitionPhase>('enter')
  const [showCompletion, setShowCompletion] = useState(false)
  const startTimeRef = useRef(session?.start ?? Date.now())
  const [correctCount, setCorrectCount] = useState(session?.correct ?? 0)
  const [showTOC, setShowTOC] = useState(false)
  const [showRef, setShowRef] = useState(false)
  const [heartShakeIdx, setHeartShakeIdx] = useState<number | null>(null)
  const studiedRef = useRef(false)

  const refTables = isReview ? [] : getTablesForLesson(lid)
  const quizTotal = useMemo(() => STEPS.filter(s => isQuizStep(s)).length, [STEPS])

  // 학습 상태 저장 (연꽃잎·정답·푼 문제)
  useEffect(() => {
    if (isReview || showCompletion) return
    saveSession(lid, { hearts, correct: correctCount, answers, start: startTimeRef.current })
  }, [isReview, lid, hearts, correctCount, answers, showCompletion])

  const stepRef = useRef(stepIdx)
  stepRef.current = stepIdx
  const setStepIdx = useCallback((updater: number | ((prev: number) => number)) => {
    const next = typeof updater === 'function' ? updater(stepRef.current) : updater
    const clamped = Math.max(0, Math.min(next, STEPS.length - 1))
    stepRef.current = clamped
    setStepIdxRaw(clamped)
    // 진도 저장 (지금 위치) — 완료 기록은 따로 있어서 지워지지 않음
    if (!isReview) setGlobalProgress(lid, clamped)
    window.currentLessonInfo = { lessonId: lid, stepIndex: clamped }
  }, [lid, isReview, setGlobalProgress, STEPS.length])

  // 주소의 ?step= 은 한 번 적용한 뒤 지움 (새로고침해도 예전 단계로 돌아가지 않게)
  useEffect(() => {
    if (urlStep === null) return
    const target = Number(urlStep)
    if (!isNaN(target) && target >= 0 && target < STEPS.length) {
      setStepIdx(resolveIdx(target, 1))
    }
    setSearchParams({}, { replace: true, state: location.state })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlStep])

  useEffect(() => {
    window.currentLessonInfo = { lessonId: lid, stepIndex: stepIdx }
  }, [lid, stepIdx])

  // 화면을 나가면 소리 멈춤
  useEffect(() => () => stopPali(), [])

  useEffect(() => {
    if (hearts < prevHearts) {
      setHeartShakeIdx(hearts)
      const t = setTimeout(() => setHeartShakeIdx(null), 600)
      return () => clearTimeout(t)
    }
    setPrevHearts(hearts)
  }, [hearts, prevHearts])

  useEffect(() => {
    setPhase('enter')
    const t = setTimeout(() => setPhase('stable'), 350)
    return () => clearTimeout(t)
  }, [stepIdx])

  // 이미 푼 문제로 돌아오면 고른 답과 결과만 보여 줌 (다시 채점하지 않음)
  useEffect(() => {
    const a = answers[stepIdx]
    if (a && isQuizStep(STEPS[stepIdx])) {
      setSelected(a.sel)
      setShowResult(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx])

  // 쓰기 모드를 학습 중에 끄면 지금 쓰기 단계에서 벗어남
  useEffect(() => {
    if (STEPS.length && isSkipped(stepIdx)) setStepIdx(resolveIdx(stepIdx, 1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writingEnabled])

  const step: StepType = STEPS[stepIdx]
  const progress = ((stepIdx + 1) / Math.max(1, STEPS.length)) * 100
  const speak = (text: string) => speakPali(text)

  const getAnswerText = useCallback((): string => {
    if (!step || !('answer' in step) || !('options' in step)) return ''
    const s = step as { options: string[]; answer: number }
    return s.options[s.answer]
  }, [step])

  const shuffledOpts = (() => {
    if (!step || !('options' in step)) return []
    const opts = [...(step as { options: string[] }).options]
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.abs(((stepIdx + 1) * 31 + i * 17) % (i + 1))
      ;[opts[i], opts[j]] = [opts[j], opts[i]]
    }
    return opts
  })()

  const getElapsedMin = useCallback(() =>
    Math.round((Date.now() - startTimeRef.current) / 60000), [])

  const handleCheck = useCallback(() => {
    if (selected === null || showResult || answers[stepIdx]) return
    setShowResult(true)
    const ok = shuffledOpts[selected] === getAnswerText()
    if (!ok) setHearts(h => Math.max(0, h - 1))
    else setCorrectCount(c => c + 1)
    setAnswers(prev => ({ ...prev, [stepIdx]: { sel: selected, ok } }))
  }, [selected, showResult, answers, stepIdx, getAnswerText, shuffledOpts])

  const transitionTo = useCallback((action: () => void) => {
    stopPali() // 다음 화면으로 넘어가면 재생 중인 소리 멈춤
    setPhase('exit')
    setTimeout(() => {
      action()
      setSelected(null)
      setShowResult(false)
      setWritingChecked(false)
      setArrangeOrder([])
    }, 200)
  }, [])

  // 한 단계 이상 진행하면 오늘 공부한 것으로 기록
  const markStudied = useCallback(() => {
    if (studiedRef.current) return
    studiedRef.current = true
    recordStudy()
  }, [recordStudy])

  const finishLesson = useCallback(() => {
    stopPali()
    markStudied()
    if (!isReview) {
      setGlobalProgress(lid, STEPS.length)
      markCompleted(lid)
      saveSession(lid, null)
    }
    addStudyEntry({
      lessonId: lid,
      lessonTitle: lesson?.title || lid,
      minutes: getElapsedMin(),
      score: correctCount,
      totalSteps: quizTotal,
      hearts,
      timestamp: Date.now(),
    })
    setShowCompletion(true)
  }, [isReview, lid, STEPS.length, lesson?.title, getElapsedMin, correctCount, quizTotal, hearts, setGlobalProgress, markCompleted, markStudied])

  const handleNext = useCallback(() => {
    if (phase !== 'stable') return
    const n = nextIdx(stepIdx)
    if (n === -1) { finishLesson(); return }
    markStudied()
    transitionTo(() => setStepIdx(n))
  }, [phase, stepIdx, nextIdx, finishLesson, markStudied, transitionTo, setStepIdx])

  const handlePrev = useCallback(() => {
    const p = prevIdx(stepIdx)
    if (p !== -1 && phase === 'stable') {
      transitionTo(() => setStepIdx(p))
    }
  }, [stepIdx, phase, prevIdx, transitionTo, setStepIdx])

  /** 진도 막대·목차로 원하는 단계로 이동 */
  const seekTo = useCallback((i: number) => {
    const target = resolveIdx(i, i >= stepIdx ? 1 : -1)
    if (target !== stepIdx) transitionTo(() => setStepIdx(target))
  }, [resolveIdx, stepIdx, transitionTo, setStepIdx])

  /** 처음부터 다시 (완료 기록은 그대로) */
  const restart = useCallback((fromIdx = 0) => {
    stopPali()
    setShowCompletion(false)
    setHearts(5)
    setPrevHearts(5)
    setCorrectCount(0)
    setAnswers({})
    setSelected(null)
    setShowResult(false)
    startTimeRef.current = Date.now()
    if (!isReview) saveSession(lid, null)
    setStepIdx(resolveIdx(fromIdx, 1))
  }, [isReview, lid, resolveIdx, setStepIdx])

  const close = useCallback(() => {
    stopPali()
    nav(backTo)
  }, [nav, backTo])

  const isQuizType = isQuizStep(step)
  const isArrangeCorrect = step?.type === 'arrange' &&
    arrangeOrder.length === step.correctOrder.length &&
    arrangeOrder.every((v, i) => v === step.correctOrder[i])

  return {
    nav, lid, lesson, STEPS, stepIdx, setStepIdx, isReview,
    hearts, setHearts, selected, setSelected,
    showResult, setShowResult, writingChecked, setWritingChecked,
    arrangeOrder, setArrangeOrder, phase, setPhase,
    showCompletion, setShowCompletion, correctCount, setCorrectCount, quizTotal,
    showTOC, setShowTOC, showRef, setShowRef,
    heartShakeIdx, refTables, writingEnabled,
    step, progress, speak, shuffledOpts,
    getElapsedMin, handleCheck, handleNext, handlePrev, seekTo, restart, close,
    isLastStep: nextIdx(stepIdx) === -1,
    hasPrev: prevIdx(stepIdx) !== -1,
    isSkipped,
    isQuizType, isArrangeCorrect, transitionTo, startTimeRef
  }
}
