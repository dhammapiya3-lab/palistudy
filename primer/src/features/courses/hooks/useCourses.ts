import { useState, useMemo, useCallback } from 'react'
import { LESSONS } from '../../grammar/lessons'
import { useStore } from '../../../store/useStore'
import { isLessonCompleted, lessonPct } from '../../../utils/lesson-progress'
import type { LessonMeta } from '../../grammar/types'

export const CATEGORIES = [
  { key: 'basic', label: '기초', desc: '자모와 발음', range: [0, 1] as const },
  { key: 'masculine', label: '남성명사 -a 격변화', desc: '1~8과', range: [2, 9] as const },
  { key: 'verb', label: '동사 활용', desc: '9~17과', range: [10, 17] as const },
  { key: 'feminine', label: '여성명사 + 분사', desc: '18~23과', range: [18, 23] as const },
  { key: 'advanced', label: '고급 문법', desc: '24~32과', range: [24, 30] as const },
  { key: 'sandhi', label: '연성법', desc: 'Sandhi', range: [31, 31] as const },
] as const

// 검색용 글자 정리 — 대소문자·장음 기호·아래 점을 무시 (kanna 로도 kaññā 를 찾게)
const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

/** 과 제목·부제·배우는 낱말(뜻 포함)에서 찾기 */
function lessonMatches(l: LessonMeta, q: string): boolean {
  if (fold(l.title).includes(q) || fold(l.subtitle).includes(q)) return true
  // l.search: 배우는 낱말·뜻 (미리 fold 해 둠, 줄바꿈으로 구분 — scripts/gen-lesson-meta.mts)
  return l.search.includes(q)
}

export function useCourses() {
  const progress = useStore(state => state.progress)
  const best = useStore(state => state.best)
  const completed = useStore(state => state.completed)

  const [search, setSearch] = useState('')
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const st = useMemo(() => ({ progress, best, completed }), [progress, best, completed])
  const done = useCallback((l: LessonMeta) => isLessonCompleted(st, l.id, l.stepCount), [st])

  // 지금 할 과 = 아직 마치지 않은 첫 과
  const currentLessonIdx = useMemo(() => LESSONS.findIndex(l => !done(l)), [done])

  // 검색: 묶음마다 맞는 과만 남김 (맞는 과가 없는 묶음은 숨김)
  const filteredCategories = useMemo(() => {
    const q = fold(search.trim())
    return CATEGORIES.map(cat => {
      const all = LESSONS.slice(cat.range[0], cat.range[1] + 1)
      return { ...cat, lessons: q ? all.filter(l => lessonMatches(l, q)) : all }
    }).filter(cat => cat.lessons.length > 0)
  }, [search])

  const getLessonState = useCallback((idx: number) => {
    const lesson = LESSONS[idx]
    const isCompleted = done(lesson)
    const isCurrent = idx === currentLessonIdx
    const pct = lessonPct(st, lesson.id, lesson.stepCount)
    return { isCompleted, isLocked: false, isCurrent, pct }
  }, [currentLessonIdx, done, st])

  const getSectionCompletion = useCallback((range: readonly [number, number]) => {
    let d = 0, total = 0
    for (let i = range[0]; i <= Math.min(range[1], LESSONS.length - 1); i++) {
      total++
      if (done(LESSONS[i])) d++
    }
    return { done: d, total }
  }, [done])

  const stats = useMemo(() => {
    return { completed: LESSONS.filter(done).length, total: LESSONS.length }
  }, [done])

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return {
    search, setSearch,
    openSections, toggleSection,
    filteredCategories,
    getLessonState,
    getSectionCompletion,
    stats
  }
}
