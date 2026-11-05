import { useEffect, useMemo } from 'react'
import { LESSONS, loadLesson } from '../../grammar/lessons'
import { APP_NAME } from '../../../config/constants'
import { useStore, getDisplayStreak } from '../../../store/useStore'
import { isLessonCompleted, lessonPct } from '../../../utils/lesson-progress'
import { localDateStr } from '../../../utils/date'
import { getMonthStudyDates } from '../../../utils/study-log'
import { estimateMinutes, chunkCount } from '../../../utils/lesson-time'
import { doneMilestones } from '../milestones'
import { suttaLinksFor, type SuttaLink } from '../../reference/sutta-links'

/** 두 날짜(YYYY-MM-DD) 사이 날 수 */
function daysSince(date: string | null): number {
  if (!date) return 0
  const [y, m, d] = date.split('-').map(Number)
  const then = new Date(y, m - 1, d).getTime()
  const [ty, tm, td] = localDateStr().split('-').map(Number)
  return Math.round((new Date(ty, tm - 1, td).getTime() - then) / 86400000)
}

export const QUOTES = [
  { pali: 'Dhammaṃ care sucaritaṃ', ko: '법을 잘 실천하라' },
  { pali: 'Appamādo amatapadaṃ', ko: '방일하지 않음이 불사의 길' },
  { pali: 'Attā hi attano nātho', ko: '자기 자신이 자신의 의지처' },
  { pali: 'Sabbe saṅkhārā aniccā', ko: '모든 형성된 것은 무상하다' },
  { pali: 'Khantī paramaṃ tapo', ko: '인내는 최상의 고행이다' },
  { pali: 'Manoseṭṭhā manomayā', ko: '마음이 앞서고, 마음이 만든다' },
  { pali: 'Saddhā dutiyā purisassa hoti', ko: '믿음은 사람의 동반자이다' },
]

export function getGreetingInfo() {
  const h = new Date().getHours()
  if (h < 6) return { text: '새벽 수행의 시간입니다', emoji: '🌙', period: 'dawn' as const }
  if (h < 12) return { text: '좋은 아침입니다', emoji: '🌅', period: 'morning' as const }
  if (h < 18) return { text: '좋은 오후입니다', emoji: '☀️', period: 'afternoon' as const }
  return { text: '고요한 저녁입니다', emoji: '🌿', period: 'evening' as const }
}

export function useHome() {
  const rawStreak = useStore(state => state.streak)
  const lastStudyDate = useStore(state => state.lastStudyDate)
  const progress = useStore(state => state.progress)
  const best = useStore(state => state.best)
  const completed = useStore(state => state.completed)
  // 어제·오늘 공부하지 않았으면 연속 학습은 0일
  const streak = getDisplayStreak(rawStreak, lastStudyDate)

  const stats = useMemo(() => {
    const st = { progress, best, completed }
    let totalSteps = 0, doneSteps = 0, done = 0
    LESSONS.forEach(l => {
      const isDone = isLessonCompleted(st, l.id, l.stepCount)
      const reached = isDone ? l.stepCount : Math.min(Math.max(best[l.id] || 0, progress[l.id] || 0), l.stepCount)
      totalSteps += l.stepCount; doneSteps += reached
      if (isDone) done++
    })
    return {
      completed: done,
      total: LESSONS.length,
      pct: totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0
    }
  }, [progress, best, completed])

  // 이어서 할 과 = 아직 마치지 않은 첫 과
  const currentLesson = useMemo(() =>
    LESSONS.find(l => !isLessonCompleted({ progress, best, completed }, l.id, l.stepCount)) ?? LESSONS[0]
  , [progress, best, completed])

  // '이어서 학습'할 과 내용을 미리 받아 둠 (눌렀을 때 바로 열리게) — 화면이 다 뜬 뒤 잠깐 있다가
  useEffect(() => {
    const t = setTimeout(() => { loadLesson(currentLesson.id).catch(() => { /* 열 때 다시 시도 */ }) }, 1500)
    return () => clearTimeout(t)
  }, [currentLesson.id])

  const currentPct = useMemo(() => {
    if (!currentLesson) return 0
    return lessonPct({ progress, best, completed }, currentLesson.id, currentLesson.stepCount)
  }, [currentLesson, progress, best, completed])

  // 하루 목표 — 오늘 공부한 시간(분)
  const studySeconds = useStore(state => state.studySeconds)
  const goalMin = useStore(state => state.dailyGoalMin)
  const todayMin = Math.floor((studySeconds[localDateStr()] || 0) / 60)

  // 이번 달 공부한 날 (연속이 끊겨도 쌓인 것)
  const monthDays = useMemo(() => {
    const now = new Date()
    return getMonthStudyDates(now.getFullYear(), now.getMonth()).size
    // 공부 기록이 바뀌면 다시 셈
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastStudyDate, studySeconds])

  // 지금까지 공부한 날 (이번 달 기록이 아직 없을 때 보여 줌)
  const totalDays = useMemo(() => {
    try {
      const a = JSON.parse(localStorage.getItem('pali-study-dates') || '[]')
      const b = Object.keys(JSON.parse(localStorage.getItem('pali-study-log') || '{}'))
      return new Set([...(Array.isArray(a) ? a : []), ...b]).size
    } catch { return 0 }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastStudyDate])

  // 3일 넘게 쉬었다가 돌아왔는지 (마지막 공부가 4일 이상 전)
  const daysAway = daysSince(lastStudyDate)
  const isReturning = !!lastStudyDate && daysAway >= 4

  // 2분 복습에 쓸 과 — 하던 과(문제를 좀 풀었으면), 아니면 마지막으로 마친 과
  const reviewLesson = useMemo(() => {
    const st = { progress, best, completed }
    const reach = (id: string) => Math.max(best[id] || 0, progress[id] || 0)
    if (reach(currentLesson.id) >= 8 && !isLessonCompleted(st, currentLesson.id, currentLesson.stepCount)) return currentLesson
    const idx = LESSONS.findIndex(l => l.id === currentLesson.id)
    for (let i = idx - 1; i >= 0; i--) if (isLessonCompleted(st, LESSONS[i].id, LESSONS[i].stepCount)) return LESSONS[i]
    return reach(currentLesson.id) > 0 ? currentLesson : null
  }, [currentLesson, progress, best, completed])

  // 마친 묶음 (이정표)
  const milestones = useMemo(() => doneMilestones({ progress, best, completed }), [progress, best, completed])

  // 경전 앱 추천 구절 — 가장 최근에 배운 문법 (지금 과 또는 바로 앞 과)
  const suttaSuggestion: SuttaLink | null = useMemo(() => {
    const idx = LESSONS.findIndex(l => l.id === currentLesson.id)
    const st = { progress, best, completed }
    for (let i = idx; i >= 0; i--) {
      const l = LESSONS[i]
      const started = isLessonCompleted(st, l.id, l.stepCount) || Math.max(best[l.id] || 0, progress[l.id] || 0) > 0
      if (!started) continue
      const links = suttaLinksFor(l.id)
      if (links.length) return links[0]
    }
    return null
  }, [currentLesson, progress, best, completed])

  const heroMeta = useMemo(() => {
    const min = estimateMinutes(currentLesson.stepCount)
    const chunks = chunkCount(currentLesson.stepCount)
    if (!min) return undefined
    return currentPct > 0 ? `과 전체 약 ${min}분 · ${chunks}마디` : `약 ${min}분 · ${chunks}마디 — 한 마디씩 나눠 해도 좋아요`
  }, [currentLesson.stepCount, currentPct])

  // 대문(/palistudy/)의 '이어 하기' 표시용 — 같은 사이트라 대문이 읽음
  useEffect(() => {
    const any = Object.keys(progress).length > 0 || Object.keys(completed).length > 0
    try {
      if (any) localStorage.setItem('primer-resume', JSON.stringify({ id: currentLesson.id, title: currentLesson.title, pct: currentPct, at: Date.now() }))
    } catch { /* 무시 */ }
  }, [currentLesson.id, currentLesson.title, currentPct, progress, completed])

  const todayQuote = useMemo(() => QUOTES[new Date().getDate() % QUOTES.length], [])
  const greeting = useMemo(() => getGreetingInfo(), [])

  return {
    streak,
    stats,
    currentLesson,
    currentPct,
    todayQuote,
    greeting,
    APP_NAME,
    todayMin,
    goalMin,
    monthDays,
    totalDays,
    daysAway,
    isReturning,
    reviewLesson,
    milestones,
    suttaSuggestion,
    heroMeta,
  }
}
