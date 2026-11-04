import { useMemo } from 'react'
import { LESSONS } from '../../grammar/lessons'
import { APP_NAME } from '../../../config/constants'
import { useStore } from '../../../store/useStore'

export const QUOTES = [
  { pali: 'Dhammaṃ care sucaritaṃ', ko: '법을 잘 실천하라' },
  { pali: 'Appamādo amatapadaṃ', ko: '방일하지 않음이 불사의 길' },
  { pali: 'Attā hi attano nātho', ko: '자기 자신이 자신의 의지처' },
  { pali: 'Sabbe saṅkhārā aniccā', ko: '모든 형성된 것은 무상하다' },
  { pali: 'Khanti paramaṃ tapo', ko: '인내는 최상의 고행이다' },
  { pali: 'Manosetṭhā manomayā', ko: '마음이 앞서고, 마음이 만든다' },
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
  const streak = useStore(state => state.streak)
  const recordStudy = useStore(state => state.recordStudy)
  const progress = useStore(state => state.progress)

  const stats = useMemo(() => {
    let totalSteps = 0, doneSteps = 0, completed = 0
    LESSONS.forEach(l => {
      const p = Math.min(progress[l.id] || 0, l.steps.length)
      totalSteps += l.steps.length; doneSteps += p
      if (p >= l.steps.length) completed++
    })
    return { 
      completed, 
      total: LESSONS.length, 
      pct: totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0 
    }
  }, [progress])

  const currentLesson = useMemo(() => 
    LESSONS.find(l => (progress[l.id] || 0) < l.steps.length) ?? LESSONS[0]
  , [progress])

  const currentPct = useMemo(() => {
    if (!currentLesson) return 0
    const p = Math.min(progress[currentLesson.id] || 0, currentLesson.steps.length)
    return Math.round((p / currentLesson.steps.length) * 100)
  }, [currentLesson, progress])

  const todayQuote = useMemo(() => QUOTES[new Date().getDate() % QUOTES.length], [])
  const greeting = useMemo(() => getGreetingInfo(), [])

  return {
    streak,
    recordStudy,
    stats,
    currentLesson,
    currentPct,
    todayQuote,
    greeting,
    APP_NAME
  }
}
