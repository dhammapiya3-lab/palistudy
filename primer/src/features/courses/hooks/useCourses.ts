import { useState, useMemo, useCallback, useEffect } from 'react'
import { LESSONS, loadAllLessons } from '../../grammar/lessons'
import { useStore } from '../../../store/useStore'
import { isLessonCompleted, lessonPct } from '../../../utils/lesson-progress'
import type { LessonMeta, LessonInfo } from '../../grammar/types'

/** 검색 결과 낱말 줄 — 뜻 + 그 낱말을 배우는 단계로 가기 */
export interface WordHit {
  stepId: string
  lessonId: string
  lessonTitle: string
  index: number
  word: string
  meaning: string
  pronKo: string
}

export const CATEGORIES = [
  { key: 'basic', label: '기초', desc: '자모와 발음', range: [0, 1] as const },
  { key: 'masculine', label: '남성명사 -a 격변화', desc: '1~8과', range: [2, 9] as const },
  { key: 'verb', label: '동사 활용', desc: '9~17과', range: [10, 17] as const },
  { key: 'feminine', label: '여성명사 + 분사', desc: '18~23과', range: [18, 23] as const },
  { key: 'advanced', label: '고급 문법', desc: '24~32과', range: [24, 30] as const },
  { key: 'sandhi', label: '연성법', desc: 'Sandhi', range: [31, 31] as const },
  { key: 'reading', label: '경전 읽기 문법', desc: '절대 구문 · 복합어 · iti · 수동태 …', range: [32, 46] as const },
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

  const st = useMemo(() => ({ progress, best, completed }), [progress, best, completed])
  const done = useCallback((l: LessonMeta) => isLessonCompleted(st, l.id, l.stepCount), [st])

  // 지금 할 과 = 아직 마치지 않은 첫 과
  const currentLessonIdx = useMemo(() => LESSONS.findIndex(l => !done(l)), [done])

  // 처음에는 지금 공부하는 묶음만 펼침 (나머지는 접어 두어 화면을 단순하게)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const idx = currentLessonIdx === -1 ? 0 : currentLessonIdx
    const cat = CATEGORIES.find(c => idx >= c.range[0] && idx <= c.range[1])
    return cat ? { [cat.key]: true } : {}
  })

  // 낱말 검색 — 검색을 시작하면 과 내용을 받아 낱말·뜻을 찾음
  const [allLessons, setAllLessons] = useState<LessonInfo[] | null>(null)
  const searching = !!search.trim()
  useEffect(() => {
    if (!searching || allLessons) return
    let alive = true
    loadAllLessons().then(ls => { if (alive) setAllLessons(ls) }, () => { /* 인터넷이 없으면 과 이름으로만 찾음 */ })
    return () => { alive = false }
  }, [searching, allLessons])

  const wordHits = useMemo<WordHit[]>(() => {
    const q = fold(search.trim())
    if (!q || !allLessons) return []
    const out: WordHit[] = []
    const seen = new Set<string>()
    for (const l of allLessons) {
      l.steps.forEach((s, index) => {
        if (s.type !== 'teach' || out.length >= 8) return
        const w = fold(s.word), m = fold(s.meaning)
        if (!(w.includes(q) || m.includes(q))) return
        const key = w + '|' + m
        if (seen.has(key)) return
        seen.add(key)
        out.push({ stepId: s.id, lessonId: l.id, lessonTitle: l.title, index, word: s.word, meaning: s.meaning, pronKo: s.pronKo })
      })
    }
    // 낱말이 바로 맞는 것 먼저
    return out.sort((a, b) => Number(fold(b.word).startsWith(q)) - Number(fold(a.word).startsWith(q)))
  }, [search, allLessons])

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
    stats,
    wordHits,
  }
}
