import { useMemo } from 'react'
import { LESSONS } from '../../grammar/lessons'
import { APP_NAME } from '../../../config/constants'
import { useStore, getDisplayStreak } from '../../../store/useStore'
import { isLessonCompleted, lessonPct } from '../../../utils/lesson-progress'

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
      const isDone = isLessonCompleted(st, l.id, l.steps.length)
      const reached = isDone ? l.steps.length : Math.min(Math.max(best[l.id] || 0, progress[l.id] || 0), l.steps.length)
      totalSteps += l.steps.length; doneSteps += reached
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
    LESSONS.find(l => !isLessonCompleted({ progress, best, completed }, l.id, l.steps.length)) ?? LESSONS[0]
  , [progress, best, completed])

  const currentPct = useMemo(() => {
    if (!currentLesson) return 0
    return lessonPct({ progress, best, completed }, currentLesson.id, currentLesson.steps.length)
  }, [currentLesson, progress, best, completed])

  const todayQuote = useMemo(() => QUOTES[new Date().getDate() % QUOTES.length], [])
  const greeting = useMemo(() => getGreetingInfo(), [])

  return {
    streak,
    stats,
    currentLesson,
    currentPct,
    todayQuote,
    greeting,
    APP_NAME
  }
}
