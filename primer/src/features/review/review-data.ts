// 복습에 쓰는 자료 모으기 — 문제(간격 복습), 낱말(단어장), 경전 구절(독송 외우기)
// 과 내용은 필요한 과만 받는다 (loadLessons). 원래 단계 번호·ID는 그대로 쓴다.
import { LESSONS, loadLessons } from '../grammar/lessons'
import type { LessonInfo, StepType, LessonMeta } from '../grammar/types'
import { isLessonCompleted } from '../../utils/lesson-progress'
import { localDateStr } from '../../utils/date'

export interface ProgressState {
  progress: Record<string, number>
  best: Record<string, number>
  completed: Record<string, boolean>
}

/** 과마다 '지나간 단계 수' (완료한 과는 전부) — 0이면 아직 안 본 과 */
export function reachOf(st: ProgressState, l: LessonMeta): number {
  if (isLessonCompleted(st, l.id, l.stepCount)) return l.stepCount
  return Math.min(l.stepCount, Math.max(st.best[l.id] || 0, st.progress[l.id] || 0))
}

/** 공부한 적 있는 과 (완료 + 하던 중) */
export function studiedLessons(st: ProgressState): LessonMeta[] {
  return LESSONS.filter(l => reachOf(st, l) > 0)
}

/** '2과: 목적격' → '2과 목적격' (출처 표시용) */
export function shortTitle(title: string): string {
  return title.replace(/:\s*/, ' ')
}

/** 문제 앞의 번호('11. ') 떼기 */
export function stripNumber(q: string): string {
  return q.replace(/^\s*\d+\s*[.)]\s*/, '')
}

export const isQuiz = (s?: StepType) =>
  s?.type === 'quiz' || s?.type === 'match-listen' || s?.type === 'match-reverse'

export interface PoolItem {
  lesson: LessonInfo
  index: number      // 원래 단계 번호 (해당 단계로 가기)
  step: StepType
}

type QuizRecords = Record<string, { ok: number; ng: number; last: string }>

function daysBetween(a: string, b: string): number {
  const pa = a.split('-').map(Number), pb = b.split('-').map(Number)
  const da = new Date(pa[0], pa[1] - 1, pa[2]).getTime()
  const db = new Date(pb[0], pb[1] - 1, pb[2]).getTime()
  return Math.round((db - da) / 86400000)
}

/**
 * 복습 순서 점수 — 높을수록 먼저
 * 틀린 적이 많을수록, 오래 안 볼수록 먼저. 한 번도 안 푼 문제는 '조금 오래된 것'으로 본다.
 * 오늘 이미 맞힌 문제는 뒤로.
 */
export function reviewScore(rec: QuizRecords[string] | undefined, today = localDateStr()): number {
  if (!rec) return 4
  const age = Math.max(0, daysBetween(rec.last, today))
  const wrongWeight = Math.max(0, rec.ng * 3 - rec.ok)
  return wrongWeight + Math.min(age, 30) / 2 - (age === 0 && rec.ng === 0 ? 3 : 0)
}

/** 지나간 단계 중 문제만 */
export function quizPool(lessons: LessonInfo[], st: ProgressState): PoolItem[] {
  const out: PoolItem[] = []
  for (const lesson of lessons) {
    const meta = LESSONS.find(l => l.id === lesson.id)
    if (!meta) continue
    const reach = reachOf(st, meta)
    lesson.steps.forEach((step, index) => {
      if (index < reach && isQuiz(step)) out.push({ lesson, index, step })
    })
  }
  return out
}

/** 오답·오래된 것 우선으로 n문제 고르기 (같은 점수 안에서는 섞음) */
export function pickReview(pool: PoolItem[], records: QuizRecords, n: number): PoolItem[] {
  const today = localDateStr()
  return pool
    .map(it => ({ it, s: reviewScore(records[it.step.id], today) + Math.random() * 1.5 }))
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map(x => x.it)
}

export function loadStudied(st: ProgressState, only?: string): Promise<LessonInfo[]> {
  const ids = only ? [only] : studiedLessons(st).map(l => l.id)
  return loadLessons(ids)
}

// ─── 낱말 ───

export interface WordEntry {
  stepId: string
  lessonId: string
  lessonTitle: string
  index: number    // 원래 단계 번호 (-1: 모름)
  word: string
  meaning: string
  pronKo: string
  grammar?: string
}

type SeenWords = Record<string, { lessonId: string; word: string; meaning: string; pronKo: string }>

/** 글자 하나하나를 배우는 과(자모와 발음 2)와 한두 글자짜리 자모 카드는 단어장에 넣지 않음 */
export const isRealWord = (lessonId: string, word: string) =>
  lessonId !== 'lesson-alphabet-2' && word.normalize('NFD').replace(/\p{M}/gu, '').replace(/[^\p{L}]/gu, '').length >= 3

/** 본 낱말 + 지나간 teach 단계 낱말 (과 순서, 중복 없음) */
export function collectWords(lessons: LessonInfo[], st: ProgressState, seen: SeenWords): WordEntry[] {
  const out: WordEntry[] = []
  const have = new Set<string>()
  for (const lesson of lessons) {
    const meta = LESSONS.find(l => l.id === lesson.id)
    const reach = meta ? reachOf(st, meta) : 0
    lesson.steps.forEach((s, index) => {
      if (s.type !== 'teach' || !isRealWord(lesson.id, s.word)) return
      if (index >= reach && !seen[s.id]) return
      have.add(s.id)
      out.push({ stepId: s.id, lessonId: lesson.id, lessonTitle: lesson.title, index, word: s.word, meaning: s.meaning, pronKo: s.pronKo, grammar: s.grammar })
    })
  }
  // 과 내용을 아직 못 받은 낱말 (본 기록만 있음)
  for (const [stepId, w] of Object.entries(seen)) {
    if (have.has(stepId) || !isRealWord(w.lessonId, w.word)) continue
    const meta = LESSONS.find(l => l.id === w.lessonId)
    out.push({ stepId, lessonId: w.lessonId, lessonTitle: meta?.title || w.lessonId, index: -1, word: w.word, meaning: w.meaning, pronKo: w.pronKo })
  }
  return out
}

// ─── 독송 구절 ───

export interface VerseEntry {
  key: string
  lessonId: string
  lessonTitle: string
  index: number
  pali: string
  pronKo: string
  translation: string
}

/** 예불 구절(나모 땃사·삼귀의) 먼저 — 앱에 실제로 있는 구절 */
const PRIORITY = [/^namo tassa/i, /saraṇaṃ gacchāmi/i]

/** 지나간 경전(verse) 단계 구절 (같은 구절은 한 번만) */
export function collectVerses(lessons: LessonInfo[], st: ProgressState): VerseEntry[] {
  const out: VerseEntry[] = []
  const seen = new Set<string>()
  for (const lesson of lessons) {
    const meta = LESSONS.find(l => l.id === lesson.id)
    const reach = meta ? reachOf(st, meta) : 0
    lesson.steps.forEach((s, index) => {
      if (s.type !== 'verse' || index >= reach) return
      const k = s.pali.normalize('NFC').trim().toLowerCase()
      if (seen.has(k)) return
      seen.add(k)
      out.push({ key: s.id, lessonId: lesson.id, lessonTitle: lesson.title, index, pali: s.pali, pronKo: s.pronKo, translation: s.translation })
    })
  }
  const rank = (v: VerseEntry) => {
    const i = PRIORITY.findIndex(re => re.test(v.pali))
    return i === -1 ? PRIORITY.length : i
  }
  return out.map((v, i) => ({ v, i })).sort((a, b) => rank(a.v) - rank(b.v) || a.i - b.i).map(x => x.v)
}
