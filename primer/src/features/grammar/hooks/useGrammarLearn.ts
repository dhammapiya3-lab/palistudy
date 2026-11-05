import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom'
import { speakPali, speakLetter, stopPali } from '../../../utils/pali-tts'
import type { StepType, LessonInfo } from '../types'
import { getTablesForLesson } from '../declension-tables'
import { addStudyEntry } from '../../../utils/study-log'
import { useStore } from '../../../store/useStore'
import { REVIEW_QUIZ_ID, isQuizStep } from './useLessonData'
import { splitChunks } from '../../../utils/lesson-time'
import { LESSONS } from '../lessons'

type TransitionPhase = 'enter' | 'stable' | 'exit'

// ── 과 안에서의 학습 상태 (연꽃잎·정답·푼 문제) — 과를 나갔다 와도 이어짐 ──
const SESSION_KEY = 'pali-lesson-session'
// sel: 고른 보기 번호(섞인 순서, -1이면 모름) / selText: 고른 보기 글 (쉬운 화면 등으로 보기가 바뀌어도 찾을 수 있게)
interface Answer { sel: number; ok: boolean; selText?: string }
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

/** 보기 섞기 — 단계 번호로 정해지는 순서 (다시 와도 같은 순서). 쉬운 화면이면 정답 + 오답 하나만 */
function arrangeOptions(step: StepType | undefined, stepIdx: number, twoChoices: boolean): string[] {
  if (!step || !('options' in step)) return []
  const s = step as { options: string[]; answer: number }
  let opts = [...s.options]
  if (twoChoices && opts.length > 2) {
    const answer = opts[s.answer]
    const wrong = opts.filter((_, i) => i !== s.answer)
    const pick = wrong[(stepIdx * 7 + 3) % wrong.length]
    opts = stepIdx % 2 === 0 ? [answer, pick] : [pick, answer]
    return opts
  }
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.abs(((stepIdx + 1) * 31 + i * 17) % (i + 1))
    ;[opts[i], opts[j]] = [opts[j], opts[i]]
  }
  return opts
}

const answerTextOf = (step: StepType | undefined): string => {
  if (!step || !('answer' in step) || !('options' in step)) return ''
  const s = step as { options: string[]; answer: number }
  return s.options[s.answer]
}

/** 마디를 시작하기 좋은 단계 — 새 설명이 시작되는 곳 */
const isGoodChunkStart = (s?: StepType) =>
  s?.type === 'intro' || s?.type === 'teach-grammar' || s?.type === 'verse'

// 공부 시간 기록: 15초마다, 화면이 보이고 최근 2분 안에 손댄 적이 있을 때만
const STUDY_TICK_SEC = 15
const IDLE_LIMIT_MS = 2 * 60 * 1000

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
  const writingSetting = useStore(state => state.writingEnabled)
  const easyMode = useStore(state => state.easyMode)
  const recordStudy = useStore(state => state.recordStudy)
  const recordQuiz = useStore(state => state.recordQuiz)
  const markWordSeen = useStore(state => state.markWordSeen)
  const addStudySeconds = useStore(state => state.addStudySeconds)
  // 쉬운 화면에서는 쓰기를 숨김
  const writingEnabled = writingSetting && !easyMode

  // '더 알아보기' 묶음 중 연 것 — 처음엔 모두 닫힘. 주소(?step=)가 더 알아보기 단계를 가리키면 그 묶음을 염
  const [openMore, setOpenMore] = useState<Set<string>>(() => {
    const t = urlStep !== null ? Number(urlStep) : NaN
    const g = !isNaN(t) ? STEPS[t]?.more : undefined
    return new Set(g ? [g] : [])
  })
  // 틀린 문제 다시 풀기 — 이 번호들만 차례로 (null이면 보통 학습)
  const [retryList, setRetryList] = useState<number[] | null>(null)
  const retryMode = retryList !== null

  // 건너뛰는 단계: 쓰기 꺼짐 / 열지 않은 더 알아보기 / 다시 풀기 중이면 그 목록 밖
  const isSkipped = useCallback((i: number) => {
    const s = STEPS[i]
    if (!s) return true
    if (retryList) return !retryList.includes(i)
    if (!writingEnabled && s.type === 'writing') return true
    if (s.more && !openMore.has(s.more)) return true
    return false
  }, [writingEnabled, STEPS, openMore, retryList])
  /** 목차에 보일 건너뛰는 이유 */
  const skipReason = useCallback((i: number): 'writing' | 'more' | null => {
    const s = STEPS[i]
    if (!s) return null
    if (!writingEnabled && s.type === 'writing') return 'writing'
    if (s.more && !openMore.has(s.more)) return 'more'
    return null
  }, [STEPS, writingEnabled, openMore])
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

  // ── 마디: 보이는 본 흐름 단계(더 알아보기 제외)를 5~10분 묶음으로 화면에서만 나눔 ──
  const chunks = useMemo(() => {
    if (isReview) return [] as number[][]
    const visible: number[] = []
    STEPS.forEach((s, i) => {
      if (s.more) return
      if (!writingEnabled && s.type === 'writing') return
      visible.push(i)
    })
    return splitChunks(visible, i => isGoodChunkStart(STEPS[i]))
  }, [isReview, STEPS, writingEnabled])
  const chunkOf = useCallback((i: number): number => {
    for (let k = 0; k < chunks.length; k++) if (chunks[k].includes(i)) return k
    return -1
  }, [chunks])

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
  // 마디 끝 '오늘 여기까지' 화면 — 다음 마디 첫 단계 번호
  const [chunkBreak, setChunkBreak] = useState<{ next: number; done: number } | null>(null)
  const startTimeRef = useRef(session?.start ?? Date.now())
  const [showTOC, setShowTOC] = useState(false)
  const [showRef, setShowRef] = useState(false)
  const [heartShakeIdx, setHeartShakeIdx] = useState<number | null>(null)
  const studiedRef = useRef(false)
  const entryAddedRef = useRef(false)

  const refTables = isReview ? [] : getTablesForLesson(lid)
  // 정답 수 = 맞힌 문제 수 (푼 기록에서 셈)
  const correctCount = useMemo(() => Object.values(answers).filter(a => a.ok).length, [answers])
  // 문제 수 — 열지 않은 '더 알아보기' 문제는 빼고 셈
  const quizTotal = useMemo(() => STEPS.filter(s => isQuizStep(s) && (!s.more || openMore.has(s.more))).length, [STEPS, openMore])
  // 틀렸거나 건너뛴 문제 (본 흐름 + 연 더 알아보기)
  const wrongIdxs = useMemo(() => STEPS.map((_, i) => i).filter(i => {
    const s = STEPS[i]
    if (!isQuizStep(s)) return false
    if (s.more && !openMore.has(s.more)) return false
    const a = answers[i]
    return !a || !a.ok
  }), [STEPS, answers, openMore])

  // 학습 상태 저장 (연꽃잎·정답·푼 문제)
  useEffect(() => {
    if (isReview || showCompletion) return
    saveSession(lid, { hearts, correct: correctCount, answers, start: startTimeRef.current })
  }, [isReview, lid, hearts, correctCount, answers, showCompletion])

  const stepRef = useRef(stepIdx)
  stepRef.current = stepIdx
  const retryRef = useRef(retryMode)
  retryRef.current = retryMode
  const setStepIdx = useCallback((updater: number | ((prev: number) => number)) => {
    const next = typeof updater === 'function' ? updater(stepRef.current) : updater
    const clamped = Math.max(0, Math.min(next, STEPS.length - 1))
    stepRef.current = clamped
    setStepIdxRaw(clamped)
    // 진도 저장 (지금 위치) — 완료 기록은 따로 있어서 지워지지 않음. 틀린 문제 다시 풀기 중에는 저장하지 않음
    if (!isReview && !retryRef.current) setGlobalProgress(lid, clamped)
    window.currentLessonInfo = { lessonId: lid, stepIndex: clamped }
  }, [lid, isReview, setGlobalProgress, STEPS.length])

  // 주소의 ?step= 은 한 번 적용한 뒤 지움 (새로고침해도 예전 단계로 돌아가지 않게)
  useEffect(() => {
    if (urlStep === null) return
    const target = Number(urlStep)
    if (!isNaN(target) && target >= 0 && target < STEPS.length) {
      // 더 알아보기 단계를 가리키면 그 묶음을 열고 바로 감 (메모 위치로 가기 등)
      const g = STEPS[target].more
      if (g) {
        setOpenMore(prev => (prev.has(g) ? prev : new Set(prev).add(g)))
        setStepIdx(target)
      } else {
        setStepIdx(resolveIdx(target, 1))
      }
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

  const step: StepType = STEPS[stepIdx]
  const progress = ((stepIdx + 1) / Math.max(1, STEPS.length)) * 100
  // '자모와 발음 2'의 글자 단계만 글자별로 고른 목소리 사용
  const isLetterLesson = lid === 'lesson-alphabet-2'
  const say = (text: string) => (isLetterLesson ? speakLetter(text) : speakPali(text))
  const speak = (text: string) => say(text)

  const twoChoices = easyMode
  const shuffledOpts = arrangeOptions(step, stepIdx, twoChoices)
  const getAnswerText = useCallback((): string => answerTextOf(step), [step])

  // 이미 푼 문제로 돌아오면 고른 답과 결과만 보여 줌 (다시 채점하지 않음)
  useEffect(() => {
    const a = answers[stepIdx]
    if (a && isQuizStep(STEPS[stepIdx])) {
      const opts = arrangeOptions(STEPS[stepIdx], stepIdx, twoChoices)
      const byText = a.selText ? opts.indexOf(a.selText) : -1
      const sel = byText >= 0 ? byText : (!a.selText && a.sel >= 0 && a.sel < opts.length ? a.sel : null)
      setSelected(sel)
      setShowResult(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx])

  // 쓰기 모드를 학습 중에 끄면 지금 쓰기 단계에서 벗어남
  useEffect(() => {
    if (STEPS.length && isSkipped(stepIdx)) setStepIdx(resolveIdx(stepIdx, 1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writingEnabled])

  // 낱말 카드를 보면 '본 낱말'로 기록 (한두 글자 자모는 빼고)
  useEffect(() => {
    if (isReview || !step || step.type !== 'teach') return
    const w = step.word.trim()
    if ([...w].length <= 2) return
    markWordSeen(step.id, { lessonId: lid, word: w, meaning: step.meaning, pronKo: step.pronKo })
  }, [isReview, step, lid, markWordSeen])

  // 들어오면 소리 한 번 — 듣기 문제(아직 안 푼 것), 쉬운 화면의 경전·따라 읽기
  useEffect(() => {
    if (!step || showCompletion || chunkBreak) return
    let text = ''
    if (step.type === 'match-listen' && !answers[stepIdx]) text = step.word
    else if (easyMode && (step.type === 'verse' || step.type === 'speak')) text = step.pali
    if (!text) return
    const t = setTimeout(() => say(text), 450)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx, showCompletion, chunkBreak])

  // 공부 시간 기록 — 15초마다 (화면이 보이고, 최근 2분 안에 손댄 적이 있을 때)
  const lastActiveRef = useRef(Date.now())
  useEffect(() => {
    const touch = () => { lastActiveRef.current = Date.now() }
    window.addEventListener('pointerdown', touch)
    window.addEventListener('keydown', touch)
    const t = setInterval(() => {
      if (document.visibilityState !== 'visible') return
      if (Date.now() - lastActiveRef.current > IDLE_LIMIT_MS) return
      addStudySeconds(STUDY_TICK_SEC)
    }, STUDY_TICK_SEC * 1000)
    return () => {
      clearInterval(t)
      window.removeEventListener('pointerdown', touch)
      window.removeEventListener('keydown', touch)
    }
  }, [addStudySeconds])

  const getElapsedMin = useCallback(() =>
    Math.round((Date.now() - startTimeRef.current) / 60000), [])

  const handleCheck = useCallback(() => {
    if (selected === null || showResult || answers[stepIdx]) return
    setShowResult(true)
    const selText = shuffledOpts[selected]
    const ok = selText === getAnswerText()
    // 쉬운 화면·틀린 문제 다시 풀기는 연꽃잎 없이
    if (!ok && !easyMode && !retryMode) setHearts(h => Math.max(0, h - 1))
    setAnswers(prev => ({ ...prev, [stepIdx]: { sel: selected, ok, selText } }))
    if (step?.id) recordQuiz(step.id, ok)
  }, [selected, showResult, answers, stepIdx, getAnswerText, shuffledOpts, easyMode, retryMode, step, recordQuiz])

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
    // 학습 기록은 한 번만 (더 알아보기·틀린 문제 다시 풀기를 마치고 다시 끝 화면이 나와도 겹치지 않게)
    if (!entryAddedRef.current) {
      entryAddedRef.current = true
      addStudyEntry({
        lessonId: lid,
        lessonTitle: lesson?.title || lid,
        minutes: getElapsedMin(),
        score: correctCount,
        totalSteps: quizTotal,
        hearts,
        timestamp: Date.now(),
      })
    }
    setRetryList(null)
    setShowCompletion(true)
  }, [isReview, lid, STEPS.length, lesson?.title, getElapsedMin, correctCount, quizTotal, hearts, setGlobalProgress, markCompleted, markStudied])

  /** 다른 마디로 옮겨 가면 연꽃잎을 다시 채움 */
  const refillIfNewChunk = useCallback((from: number, to: number) => {
    const a = chunkOf(from), b = chunkOf(to)
    if (a !== -1 && b !== -1 && a !== b) { setHearts(5); setPrevHearts(5) }
  }, [chunkOf])

  const handleNext = useCallback(() => {
    if (phase !== 'stable') return
    const n = nextIdx(stepIdx)
    if (n === -1) { finishLesson(); return }
    markStudied()
    // 마디 끝 → '오늘 여기까지' 화면
    const a = chunkOf(stepIdx), b = chunkOf(n)
    if (!retryMode && a !== -1 && b !== -1 && b === a + 1) {
      stopPali()
      setChunkBreak({ next: n, done: a + 1 })
      return
    }
    transitionTo(() => { refillIfNewChunk(stepIdx, n); setStepIdx(n) })
  }, [phase, stepIdx, nextIdx, finishLesson, markStudied, transitionTo, setStepIdx, chunkOf, retryMode, refillIfNewChunk])

  /** 마디 끝 화면에서 '계속하기' — 연꽃잎 다시 채우고 다음 마디로 */
  const continueChunk = useCallback(() => {
    if (!chunkBreak) return
    const n = chunkBreak.next
    setChunkBreak(null)
    setHearts(5); setPrevHearts(5)
    setSelected(null); setShowResult(false); setWritingChecked(false); setArrangeOrder([])
    setStepIdx(n)
  }, [chunkBreak, setStepIdx])

  /** 마디 끝 화면에서 '오늘은 여기까지' — 다음 마디 첫 단계를 진도로 저장하고 나감 */
  const stopAtChunk = useCallback(() => {
    if (!chunkBreak) return
    setHearts(5); setPrevHearts(5)
    setStepIdx(chunkBreak.next)
    if (!isReview) saveSession(lid, { hearts: 5, correct: correctCount, answers, start: startTimeRef.current })
    stopPali()
    nav(backTo)
  }, [chunkBreak, setStepIdx, isReview, lid, correctCount, answers, nav, backTo])

  const handlePrev = useCallback(() => {
    const p = prevIdx(stepIdx)
    if (p !== -1 && phase === 'stable') {
      transitionTo(() => { refillIfNewChunk(stepIdx, p); setStepIdx(p) })
    }
  }, [stepIdx, phase, prevIdx, transitionTo, setStepIdx, refillIfNewChunk])

  /** 진도 막대·목차로 원하는 단계로 이동 — 더 알아보기 단계면 그 묶음을 열고 감 */
  const seekTo = useCallback((i: number) => {
    const g = STEPS[i]?.more
    if (g && !openMore.has(g) && !retryMode) {
      setOpenMore(prev => new Set(prev).add(g))
      if (i !== stepIdx) transitionTo(() => { setStepIdx(i) })
      return
    }
    const target = resolveIdx(i, i >= stepIdx ? 1 : -1)
    if (target !== stepIdx) transitionTo(() => { refillIfNewChunk(stepIdx, target); setStepIdx(target) })
  }, [STEPS, openMore, retryMode, resolveIdx, stepIdx, transitionTo, setStepIdx, refillIfNewChunk])

  /** 더 알아보기 묶음 열기 — 그 묶음 첫 단계로 (과 끝 화면에서 누르면 끝 화면을 닫고 감) */
  const openMoreGroup = useCallback((group: string) => {
    const first = STEPS.findIndex(s => s.more === group)
    if (first < 0) return
    setOpenMore(prev => new Set(prev).add(group))
    setChunkBreak(null)
    if (showCompletion) {
      setShowCompletion(false)
      setSelected(null); setShowResult(false)
      setStepIdx(first)
    } else {
      transitionTo(() => setStepIdx(first))
    }
  }, [STEPS, showCompletion, setStepIdx, transitionTo])

  /** 과 끝 화면에 보여 줄, 아직 열지 않은 더 알아보기 묶음 (끝에 몰려 있는 것) */
  const moreGroups = useMemo(() => {
    const out: string[] = []
    const lastMain = STEPS.map(s => !s.more).lastIndexOf(true)
    STEPS.forEach((s, i) => { if (s.more && i > lastMain && !out.includes(s.more)) out.push(s.more) })
    return out.filter(g => !openMore.has(g))
  }, [STEPS, openMore])

  /** 지금 단계 바로 뒤에 붙은 더 알아보기 묶음 (본 흐름 중간에 있는 것만 — 끝에 있는 것은 과 끝 화면에서) */
  const inlineMore = useMemo(() => {
    const nxt = STEPS[stepIdx + 1]
    if (!step || step.more || !nxt?.more || openMore.has(nxt.more) || retryMode) return null
    const hasMainAfter = STEPS.slice(stepIdx + 1).some(s => !s.more)
    return hasMainAfter ? nxt.more : null
  }, [STEPS, step, stepIdx, openMore, retryMode])

  /** 처음부터 다시 (완료 기록은 그대로) */
  const restart = useCallback((fromIdx = 0) => {
    stopPali()
    setShowCompletion(false)
    setChunkBreak(null)
    setRetryList(null)
    setHearts(5)
    setPrevHearts(5)
    setAnswers({})
    setSelected(null)
    setShowResult(false)
    entryAddedRef.current = false
    startTimeRef.current = Date.now()
    if (!isReview) saveSession(lid, null)
    setStepIdx(resolveIdx(fromIdx, 1))
  }, [isReview, lid, resolveIdx, setStepIdx])

  /** 지금 마디 처음부터 다시 (연꽃잎을 모두 잃었을 때) — 이 마디에서 푼 문제만 지움 */
  const restartChunk = useCallback(() => {
    stopPali()
    const k = chunkOf(stepIdx)
    const list = k >= 0 ? chunks[k] : null
    const start = list ? list[0] : 0
    setAnswers(prev => {
      if (!list) return {}
      const next = { ...prev }
      for (const i of list) delete next[i]
      return next
    })
    setHearts(5)
    setPrevHearts(5)
    setSelected(null)
    setShowResult(false)
    setStepIdx(resolveIdx(start, 1))
  }, [chunkOf, chunks, stepIdx, resolveIdx, setStepIdx])

  /** 틀리거나 건너뛴 문제만 다시 풀기 */
  const retryWrong = useCallback(() => {
    if (!wrongIdxs.length) return
    stopPali()
    const list = [...wrongIdxs]
    setAnswers(prev => {
      const next = { ...prev }
      for (const i of list) delete next[i]
      return next
    })
    retryRef.current = true
    setRetryList(list)
    setHearts(5)
    setPrevHearts(5)
    setSelected(null)
    setShowResult(false)
    setShowCompletion(false)
    setStepIdx(list[0])
  }, [wrongIdxs, setStepIdx])

  const close = useCallback(() => {
    stopPali()
    nav(backTo)
  }, [nav, backTo])

  // 다음 과 (과 목록 순서)
  const nextLesson = useMemo(() => {
    if (isReview) return null
    const i = LESSONS.findIndex(l => l.id === lid)
    return i >= 0 && i + 1 < LESSONS.length ? LESSONS[i + 1] : null
  }, [isReview, lid])
  const goNextLesson = useCallback(() => {
    if (!nextLesson) return
    stopPali()
    nav(`/learn/${nextLesson.id}`, { state: { from: backTo } })
  }, [nextLesson, nav, backTo])

  const isQuizType = isQuizStep(step)
  const isArrangeCorrect = step?.type === 'arrange' &&
    arrangeOrder.length === step.correctOrder.length &&
    arrangeOrder.every((v, i) => v === step.correctOrder[i])

  // 지금 흐름에서 보이는 단계들 (진도 막대·단계 수 표시용)
  const visibleSteps = useMemo(() => STEPS.map((_, i) => i).filter(i => !isSkipped(i)), [STEPS, isSkipped])

  // 마디 표시 (예: 2/3) — 다시 풀기·복습·더 알아보기 단계에서는 없음
  const chunkPos = chunkOf(stepIdx)
  const chunkLabel = !retryMode && chunks.length > 1 && chunkPos >= 0 ? `마디 ${chunkPos + 1}/${chunks.length}` : ''

  return {
    nav, lid, lesson, STEPS, stepIdx, setStepIdx, isReview,
    hearts, setHearts, selected, setSelected,
    showResult, setShowResult, writingChecked, setWritingChecked,
    arrangeOrder, setArrangeOrder, phase, setPhase,
    showCompletion, setShowCompletion, correctCount, quizTotal,
    showTOC, setShowTOC, showRef, setShowRef,
    heartShakeIdx, refTables, writingEnabled, easyMode,
    step, progress, speak, shuffledOpts,
    getElapsedMin, handleCheck, handleNext, handlePrev, seekTo, restart, close,
    isLastStep: nextIdx(stepIdx) === -1,
    hasPrev: prevIdx(stepIdx) !== -1,
    isSkipped, skipReason,
    isQuizType, isArrangeCorrect, transitionTo, startTimeRef,
    // 새 기능
    answers, lastAnswer: answers[stepIdx] as Answer | undefined,
    chunks, chunkLabel, chunkBreak, continueChunk, stopAtChunk, restartChunk,
    retryMode, retryWrong, wrongCount: wrongIdxs.length,
    nextLesson, goNextLesson,
    moreGroups, openMoreGroup, inlineMore, visibleSteps,
  }
}
