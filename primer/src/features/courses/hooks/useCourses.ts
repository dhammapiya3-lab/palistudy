import { useState, useMemo, useCallback } from 'react'
import { LESSONS } from '../../grammar/lessons'
import { useStore } from '../../../store/useStore'

export const CATEGORIES = [
  { key: 'basic', label: '기초', desc: '자모와 발음', range: [0, 1] as const },
  { key: 'masculine', label: '남성명사 -a 격변화', desc: '1~8과', range: [2, 9] as const },
  { key: 'verb', label: '동사 활용', desc: '9~17과', range: [10, 17] as const },
  { key: 'feminine', label: '여성명사 + 분사', desc: '18~23과', range: [18, 23] as const },
  { key: 'advanced', label: '고급 문법', desc: '24~32과', range: [24, 30] as const },
  { key: 'sandhi', label: '연성법', desc: 'Sandhi', range: [31, 31] as const },
] as const

export function useCourses() {
  const progress = useStore(state => state.progress)
  const recordStudy = useStore(state => state.recordStudy)
  
  const [search, setSearch] = useState('')
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const currentLessonIdx = useMemo(() => 
    LESSONS.findIndex((lesson, idx) => {
      const prog = Math.min(progress[lesson.id] || 0, lesson.steps.length)
      return prog < lesson.steps.length && (idx === 0 ||
        (progress[LESSONS[idx - 1].id] || 0) >= LESSONS[idx - 1].steps.length)
    }), [progress])

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return CATEGORIES
    const q = search.toLowerCase()
    return CATEGORIES.filter(cat => {
      const catLessons = LESSONS.slice(cat.range[0], cat.range[1] + 1)
      return catLessons.some(l =>
        l.title.toLowerCase().includes(q) ||
        l.subtitle.toLowerCase().includes(q)
      )
    })
  }, [search])

  const getLessonState = useCallback((idx: number) => {
    const lesson = LESSONS[idx]
    const prog = Math.min(progress[lesson.id] || 0, lesson.steps.length)
    const isCompleted = prog >= lesson.steps.length
    const isCurrent = idx === currentLessonIdx
    const pct = Math.round((prog / lesson.steps.length) * 100)
    return { isCompleted, isLocked: false, isCurrent, pct }
  }, [currentLessonIdx, progress])

  const getSectionCompletion = useCallback((range: readonly [number, number]) => {
    let done = 0, total = 0
    for (let i = range[0]; i <= Math.min(range[1], LESSONS.length - 1); i++) {
      total++
      if ((progress[LESSONS[i].id] || 0) >= LESSONS[i].steps.length) done++
    }
    return { done, total }
  }, [progress])

  const stats = useMemo(() => {
    let completed = 0
    LESSONS.forEach(l => {
      if ((progress[l.id] || 0) >= l.steps.length) completed++
    })
    return { completed, total: LESSONS.length }
  }, [progress])

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return {
    search, setSearch,
    openSections, toggleSection,
    recordStudy,
    filteredCategories,
    getLessonState,
    getSectionCompletion,
    stats
  }
}
