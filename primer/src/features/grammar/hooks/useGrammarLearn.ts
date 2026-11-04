import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { speakPali } from '../../../utils/pali-tts'
import { getLessonById } from '../lessons'
import type { StepType } from '../types'
import { debouncedPush, isSyncLoggedIn } from '../../../utils/sync'
import { getTablesForLesson } from '../declension-tables'
import { addStudyEntry } from '../../../utils/study-log'
import { useStore } from '../../../store/useStore'

type TransitionPhase = 'enter' | 'stable' | 'exit'

export function useGrammarLearn() {
  const nav = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()
  const lid = lessonId || 'lesson-01'
  const lesson = getLessonById(lid)
  const STEPS = lesson?.steps || []

  const [searchParams] = useSearchParams()
  const urlStep = searchParams.get('step')

  // --- 스토어 구독 ---
  const globalProgress = useStore(state => state.progress)
  const setGlobalProgress = useStore(state => state.setProgress)
  const writingEnabled = useStore(state => state.writingEnabled)
  const recordStudy = useStore(state => state.recordStudy)

  const savedStep = globalProgress[lid] || 0
  const initialStep = urlStep ? Number(urlStep) : savedStep
  const clampedStep = initialStep >= STEPS.length ? 0 : Math.max(0, initialStep)
  const [stepIdx, setStepIdxRaw] = useState(clampedStep)

  const [hearts, setHearts] = useState(5)
  const [prevHearts, setPrevHearts] = useState(5)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [writingChecked, setWritingChecked] = useState(false)
  const [arrangeOrder, setArrangeOrder] = useState<number[]>([])
  const [phase, setPhase] = useState<TransitionPhase>('enter')
  const [showCompletion, setShowCompletion] = useState(false)
  const startTimeRef = useRef(Date.now())
  const [correctCount, setCorrectCount] = useState(0)
  const [showTOC, setShowTOC] = useState(false)
  const [showRef, setShowRef] = useState(false)
  const [heartShakeIdx, setHeartShakeIdx] = useState<number | null>(null)

  const refTables = getTablesForLesson(lid)

  useEffect(() => {
    if (urlStep !== null) {
      const target = Number(urlStep)
      if (!isNaN(target) && target >= 0 && target < STEPS.length) {
        setStepIdxRaw(target)
      }
    }
  }, [urlStep, STEPS.length])

  useEffect(() => {
    window.currentLessonInfo = { lessonId: lid, stepIndex: stepIdx }
  }, [lid, stepIdx])

  const setStepIdx = useCallback((updater: number | ((prev: number) => number)) => {
    setStepIdxRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      const clamped = Math.max(0, Math.min(next, STEPS.length - 1))
      
      // 스토어 업데이트 (진도 저장)
      setGlobalProgress(lid, clamped)
      
      window.currentLessonInfo = { lessonId: lid, stepIndex: clamped }
      if (isSyncLoggedIn()) debouncedPush()
      return clamped
    })
  }, [lid, setGlobalProgress])

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

  const step: StepType = STEPS[stepIdx]
  const progress = ((stepIdx + 1) / STEPS.length) * 100
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
    if (selected === null) return
    setShowResult(true)
    const answerText = getAnswerText()
    if (shuffledOpts[selected] !== answerText) {
      setHearts(h => Math.max(0, h - 1))
    } else {
      setCorrectCount(c => c + 1)
    }
  }, [selected, getAnswerText, shuffledOpts])

  const transitionTo = useCallback((action: () => void) => {
    setPhase('exit')
    setTimeout(() => {
      action()
      setSelected(null)
      setShowResult(false)
      setWritingChecked(false)
      setArrangeOrder([])
    }, 200)
  }, [])

  const handleNext = useCallback(() => {
    speechSynthesis.cancel()
    if (phase !== 'stable') return
    if (stepIdx + 1 >= STEPS.length) {
      // 완료 시 진도를 끝까지 설정
      setGlobalProgress(lid, STEPS.length)
      recordStudy() // 오늘 학습 기록 업데이트
      
      addStudyEntry({
        lessonId: lid,
        lessonTitle: lesson?.title || lid,
        minutes: getElapsedMin(),
        score: correctCount,
        totalSteps: STEPS.length,
        hearts,
        timestamp: Date.now(),
      })
      setShowCompletion(true)
      return
    }
    transitionTo(() => setStepIdx(i => i + 1))
  }, [phase, stepIdx, STEPS.length, lid, lesson?.title, getElapsedMin, correctCount, hearts, transitionTo, setStepIdx, setGlobalProgress, recordStudy])

  const handlePrev = useCallback(() => {
    speechSynthesis.cancel()
    if (stepIdx > 0 && phase === 'stable') {
      transitionTo(() => setStepIdx(i => i - 1))
    }
  }, [stepIdx, phase, transitionTo, setStepIdx])

  const isQuizType = step?.type === 'quiz' || step?.type === 'match-listen' || step?.type === 'match-reverse'
  const isArrangeCorrect = step?.type === 'arrange' &&
    arrangeOrder.length === step.correctOrder.length &&
    arrangeOrder.every((v, i) => v === step.correctOrder[i])

  return {
    nav, lid, lesson, STEPS, stepIdx, setStepIdx,
    hearts, setHearts, selected, setSelected,
    showResult, setShowResult, writingChecked, setWritingChecked,
    arrangeOrder, setArrangeOrder, phase, setPhase,
    showCompletion, setShowCompletion, correctCount, setCorrectCount,
    showTOC, setShowTOC, showRef, setShowRef,
    heartShakeIdx, refTables, writingEnabled,
    step, progress, speak, shuffledOpts,
    getElapsedMin, handleCheck, handleNext, handlePrev,
    isQuizType, isArrangeCorrect, transitionTo, startTimeRef
  }
}
