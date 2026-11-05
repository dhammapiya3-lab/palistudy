// 낱말 복습(간격 반복) — 배운 낱말·틀린 문제 기록을 읽어 '오늘 복습' 문제를 만듦.
//   suttalog-seen-words  : [{ lessonId, step, word, meaning, grammar, pronKo }] — 학습 화면이 낱말 카드를 볼 때 추가
//   suttalog-wrong-items : [{ lessonId, step, at }] — 학습 화면이 틀린 문제를 기록, 복습에서 맞히면 지움
//   suttalog-srs         : { "<lessonId>:<step>": { due, interval, ease, reps } } — 이 파일이 관리
//   suttalog-srs-new     : { date, n } — 오늘 처음 복습에 넣은 새 낱말 수
import { calculateSM2, defaultSM2 } from '../features/srs/sm2'
import { loadLesson, hasLessonData } from '../features/lessons/lesson-registry'
import { getAllProgress } from './lesson-progress'
import { localDateStr } from './local-date'

export type SeenWord = { lessonId: string; step: number; word: string; meaning: string; grammar: string; pronKo: string }
export type WrongItem = { lessonId: string; step: number; at: number }
export type SrsState = { due: string; interval: number; ease: number; reps: number }

/** 하루에 새로 복습에 넣는 낱말 수 */
export const DAILY_NEW_WORDS = 10
/** 한 번에 푸는 문제 수 */
export const SESSION_SIZE = 10
/** 문제 하나에 드는 어림 시간(초) */
const SECONDS_PER_ITEM = 15

function readJson<T>(key: string, fallback: T): T {
  try {
    const v = JSON.parse(localStorage.getItem(key) || 'null')
    return v ?? fallback
  } catch { return fallback }
}

export function readSeenWords(): SeenWord[] {
  const v = readJson<unknown>('suttalog-seen-words', [])
  return Array.isArray(v) ? (v as SeenWord[]).filter(w => w && typeof w.word === 'string' && typeof w.lessonId === 'string') : []
}

export function readWrongItems(): WrongItem[] {
  const v = readJson<unknown>('suttalog-wrong-items', [])
  return Array.isArray(v) ? (v as WrongItem[]).filter(w => w && typeof w.lessonId === 'string' && Number.isFinite(w.step)) : []
}

function writeWrongItems(items: WrongItem[]): void {
  localStorage.setItem('suttalog-wrong-items', JSON.stringify(items))
}

export function readSrs(): Record<string, SrsState> {
  const v = readJson<unknown>('suttalog-srs', {})
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, SrsState>) : {}
}

const keyOf = (w: { lessonId: string; step: number }) => `${w.lessonId}:${w.step}`
const norm = (s: string) => s.toLowerCase().replace(/[.,;:!?'"‘’“”—–-]/g, '').trim()

/** 같은 낱말은 하나로(처음 배운 것을 대표로) */
export function uniqueSeenWords(): SeenWord[] {
  const seen = new Set<string>()
  const out: SeenWord[] = []
  for (const w of readSeenWords()) {
    const n = norm(w.word)
    if (!n || seen.has(n)) continue
    seen.add(n)
    out.push(w)
  }
  return out
}

function newToday(): number {
  const v = readJson<{ date?: string; n?: number }>('suttalog-srs-new', {})
  return v.date === localDateStr() ? Number(v.n) || 0 : 0
}

function addNewToday(k: number): void {
  localStorage.setItem('suttalog-srs-new', JSON.stringify({ date: localDateStr(), n: newToday() + k }))
}

/** 오늘 복습할 것: 틀린 문제, 때가 된 낱말, 새 낱말(하루 한도 안에서) */
export function getDueSummary(): { wrong: WrongItem[]; due: SeenWord[]; fresh: SeenWord[]; total: number; minutes: number } {
  const today = localDateStr()
  const srs = readSrs()
  const words = uniqueSeenWords()
  const due = words.filter(w => srs[keyOf(w)] && srs[keyOf(w)].due <= today)
    .sort((a, b) => srs[keyOf(a)].due.localeCompare(srs[keyOf(b)].due))
  const freshAll = words.filter(w => !srs[keyOf(w)])
  const fresh = freshAll.slice(0, Math.max(0, DAILY_NEW_WORDS - newToday()))
  // 같은 문제가 여러 번 기록됐으면 하나로
  const wrongMap = new Map<string, WrongItem>()
  for (const w of readWrongItems()) if (hasLessonData(w.lessonId)) wrongMap.set(keyOf(w), w)
  const wrong = [...wrongMap.values()]
  const total = wrong.length + due.length + fresh.length
  return { wrong, due, fresh, total, minutes: Math.max(1, Math.round((total * SECONDS_PER_ITEM) / 60)) }
}

// ───────── 문제 만들기 ─────────

export type ReviewItem =
  | { kind: 'wrong'; id: string; lessonId: string; step: number; prompt: string; listen?: string; options: string[]; answer: number; hint?: string }
  | { kind: 'meaning'; id: string; word: SeenWord; options: string[]; answer: number }
  | { kind: 'listen'; id: string; word: SeenWord; options: string[]; answer: number }

const FALLBACK_MEANINGS = ['법, 가르침', '마음', '괴로움', '비구', '세존', '행복', '계율', '지혜']

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickOptions(correct: string, pool: string[], n = 4): { options: string[]; answer: number } {
  const c = correct.trim()
  const others = shuffle([...new Set(pool.map(s => s.trim()).filter(s => s && norm(s) !== norm(c)))]).slice(0, n - 1)
  const options = shuffle([c, ...others])
  return { options, answer: options.indexOf(c) }
}

/** 한 번 풀 문제 묶음(최대 10개) — 틀린 문제를 먼저, 그다음 때가 된 낱말, 새 낱말 */
export async function buildSession(opts: { listenOk: boolean }): Promise<ReviewItem[]> {
  const { wrong, due, fresh } = getDueSummary()
  const items: ReviewItem[] = []

  // 1) 틀린 문제 — 원래 문제를 그대로 다시 냄(최대 4개)
  for (const w of wrong.slice(0, 4)) {
    try {
      const steps = await loadLesson(w.lessonId)
      const s = steps[w.step]
      if (!s) { removeWrong(w); continue }
      if (s.type === 'quiz') items.push({ kind: 'wrong', id: keyOf(w), lessonId: w.lessonId, step: w.step, prompt: s.question, options: s.options, answer: s.answer, hint: s.hint })
      else if (s.type === 'match-reverse') items.push({ kind: 'wrong', id: keyOf(w), lessonId: w.lessonId, step: w.step, prompt: `${s.instruction}\n“${s.meaning}”`, options: s.options, answer: s.answer })
      else if (s.type === 'match-listen') items.push({ kind: 'wrong', id: keyOf(w), lessonId: w.lessonId, step: w.step, prompt: s.instruction, listen: s.word, options: s.options, answer: s.answer })
      else removeWrong(w) // 배열·쓰기 문제는 여기서 다시 낼 수 없음 → 목록에서 뺌
    } catch { /* 불러오기 실패: 다음에 다시 */ }
  }

  // 2) 낱말 — 뜻 고르기 / 듣고 고르기를 번갈아
  const allWords = uniqueSeenWords()
  const meaningPool = [...allWords.map(w => w.meaning), ...FALLBACK_MEANINGS]
  const wordPool = allWords.map(w => w.word)
  const words = [...due, ...fresh].slice(0, Math.max(0, SESSION_SIZE - items.length))
  words.forEach((w, i) => {
    const listen = opts.listenOk && wordPool.length >= 3 && i % 2 === 1
    if (listen) {
      const { options, answer } = pickOptions(w.word, wordPool)
      items.push({ kind: 'listen', id: keyOf(w), word: w, options, answer })
    } else {
      const { options, answer } = pickOptions(w.meaning, meaningPool)
      items.push({ kind: 'meaning', id: keyOf(w), word: w, options, answer })
    }
  })
  return items
}

function removeWrong(w: { lessonId: string; step: number }): void {
  writeWrongItems(readWrongItems().filter(x => !(x.lessonId === w.lessonId && x.step === w.step)))
}

/** 답을 채점해 기록 — 낱말은 SM-2 간격, 틀린 문제는 맞히면 목록에서 뺌 */
export function recordAnswer(item: ReviewItem, correct: boolean): void {
  if (item.kind === 'wrong') {
    if (correct) removeWrong(item)
    return
  }
  const srs = readSrs()
  const k = item.id
  const prev = srs[k]
  if (!prev) addNewToday(1)
  const base = prev ? { interval: prev.interval, easeFactor: prev.ease, repetitions: prev.reps } : defaultSM2()
  const r = calculateSM2({ ...base, grade: correct ? 2 : 0 })
  const d = new Date()
  d.setDate(d.getDate() + r.interval)
  srs[k] = { due: localDateStr(d), interval: r.interval, ease: Math.round(r.easeFactor * 100) / 100, reps: r.repetitions }
  localStorage.setItem('suttalog-srs', JSON.stringify(srs))
}

// ───────── 예전 기록 채우기 ─────────

const BACKFILL_KEY = 'suttalog-seen-backfill'

/**
 * '배운 낱말' 기록(suttalog-seen-words)이 생기기 전에 공부한 과의 낱말을 한 번 채워 넣음.
 * 진도(원본 단계 번호)보다 앞에 있는 낱말 카드만 넣음. 이미 있는 lessonId+step은 건너뜀.
 */
export async function backfillSeenWords(): Promise<boolean> {
  if (localStorage.getItem(BACKFILL_KEY) === '1') return false
  const started = getAllProgress().filter(p => p.started)
  let added = 0
  for (const p of started) {
    if (!hasLessonData(p.id)) continue
    try {
      const steps = await loadLesson(p.id)
      const list = readSeenWords()
      const have = new Set(list.map(keyOf))
      const limit = p.done ? steps.length : Math.min(p.step, steps.length)
      for (let i = 0; i < limit; i++) {
        const s = steps[i]
        if (s.type !== 'teach' || have.has(`${p.id}:${i}`)) continue
        list.push({ lessonId: p.id, step: i, word: s.word, meaning: s.meaning, grammar: s.grammar ?? '', pronKo: s.pronKo })
        added++
      }
      localStorage.setItem('suttalog-seen-words', JSON.stringify(list))
    } catch { return false } // 네트워크 문제 등: 다음에 다시 시도
  }
  localStorage.setItem(BACKFILL_KEY, '1')
  return added > 0
}
