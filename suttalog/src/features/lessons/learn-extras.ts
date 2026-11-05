// 경전 학습 화면 보조 기능 — 데이터는 바꾸지 않고 화면에서만 계산(원본 단계 번호·ID 그대로)
// - 마디: 긴 과를 하루 분량(20~30단계)으로 가상 분할 (소단원 경계 존중)
// - 확인 문제: 구절이 끝날 때 방금 배운 낱말 2~3개로 뜻 고르기/듣고 고르기를 만듦
// - 낱말 찾기: 구절 속 낱말 → 같은 과의 낱말 카드(teach)
// - 기록: 배운 낱말, 틀린 문제, 마지막 학습, 공부 시간 (localStorage 공용 약속 형식)
import type { StepType } from './lesson-data-sn56-11'
import { normPali } from './pali-highlight'
import { localDateStr } from '../../utils/local-date'

type Step = StepType
type Teach = Extract<Step, { type: 'teach' }>

// ───────────────────────── 마디 ─────────────────────────

/** 원본 단계 번호 기준 범위(끝 포함) */
export type Madi = { start: number; end: number }

const MADI_MIN_LESSON = 40 // 이보다 긴 과만 마디로 나눔
const MADI_TARGET = 25
const MADI_MAX = 30

/** 긴 과를 마디로 나눔. 짧은 과는 마디 하나. */
export function computeMadis(steps: Step[]): Madi[] {
  const n = steps.length
  if (n <= MADI_MIN_LESSON) return [{ start: 0, end: n - 1 }]

  // 소단원(intro) 경계
  const secs: Madi[] = []
  steps.forEach((s, i) => {
    if (i === 0 || s.type === 'intro') secs.push({ start: i, end: i })
    secs[secs.length - 1].end = i
  })

  // 긴 소단원은 20~30단계로 자름 — 되도록 낱말 묶음(새 문장)이 시작하는 곳에서
  const isGroupStart = (i: number) =>
    i > 0 && ((steps[i].type === 'teach' && steps[i - 1].type !== 'teach') || steps[i].type === 'teach-grammar')
  const pieces: Madi[] = []
  for (const sec of secs) {
    const len = sec.end - sec.start + 1
    const k = Math.max(1, Math.round(len / MADI_TARGET))
    if (k === 1) { pieces.push({ ...sec }); continue }
    let s = sec.start
    for (let j = 1; j < k; j++) {
      const ideal = sec.start + Math.round((j * len) / k)
      let cut = ideal
      for (let d = 0; d <= 6; d++) {
        if (ideal - d > s + 10 && isGroupStart(ideal - d)) { cut = ideal - d; break }
        if (ideal + d < sec.end - 5 && isGroupStart(ideal + d)) { cut = ideal + d; break }
      }
      if (cut <= s) continue
      pieces.push({ start: s, end: cut - 1 })
      s = cut
    }
    pieces.push({ start: s, end: sec.end })
  }

  // 짧은 조각은 다음 조각과 합침(30단계까지)
  const out: Madi[] = []
  for (const p of pieces) {
    const last = out[out.length - 1]
    if (last && (last.end - last.start + 1) + (p.end - p.start + 1) <= MADI_MAX) last.end = p.end
    else out.push({ ...p })
  }
  // 끝에 아주 짧은 마디가 남으면 앞 마디에 붙임
  if (out.length > 1 && out[out.length - 1].end - out[out.length - 1].start + 1 < 8) {
    const tail = out.pop()!
    out[out.length - 1].end = tail.end
  }
  return out
}

/** 소단원 제목을 알림용 짧은 이름으로: '— ① ānāpānapabba (호흡) —' → '① 호흡' */
export function sectionShortName(title: string): string {
  const t = title.replace(/^[\s—–-]+|[\s—–-]+$/g, '').trim()
  const hangul = /[가-힣]/
  const circled = (t.match(/[①-⑳]/) || [''])[0]
  const paren = (t.match(/\(([^)]+)\)/) || ['', ''])[1].trim()
  const outside = t.replace(/\([^)]*\)/g, '').replace(/[①-⑳]/g, '').replace(/\s+/g, ' ').trim()
  let name = t
  if (paren && hangul.test(paren)) name = paren
  else if (outside && hangul.test(outside)) name = outside
  else return t
  return circled && !name.includes(circled) ? `${circled} ${name}` : name
}

// ───────────────────────── 낱말 카드 찾기 ─────────────────────────

export type TeachIndex = Map<string, number[]>

/** 같은 과의 낱말 카드 색인: 정규화한 word·formInVerse → 원본 단계 번호들 */
export function buildTeachIndex(steps: Step[]): TeachIndex {
  const idx: TeachIndex = new Map()
  const add = (k: string, raw: number) => {
    if (!k) return
    const arr = idx.get(k)
    if (arr) { if (!arr.includes(raw)) arr.push(raw) } else idx.set(k, [raw])
  }
  steps.forEach((s, raw) => {
    if (s.type !== 'teach') return
    add(normPali(s.word), raw)
    const f = s.formInVerse
    if (f) (Array.isArray(f) ? f : [f]).forEach(x => add(normPali(x), raw))
  })
  return idx
}

/** 글자(낱말)에 맞는 낱말 카드 — near 이전의 가장 가까운 카드, 없으면 처음 나오는 카드 */
export function findTeach(idx: TeachIndex, text: string, near: number): number | null {
  const arr = idx.get(normPali(text))
  if (!arr?.length) return null
  let best: number | null = null
  for (const r of arr) if (r <= near && (best === null || r > best)) best = r
  return best ?? arr[0]
}

/** 퀴즈와 관련된 낱말 카드(정답 설명용) */
export function teachForStep(steps: Step[], idx: TeachIndex, step: Step, raw: number, answerText: string): number | null {
  const tryText = (t: string | undefined) => (t ? findTeach(idx, t, raw) : null)
  if (step.type === 'match-listen') return tryText(step.word)
  if (step.type === 'match-reverse') return tryText(answerText)
  if (step.type === 'quiz') {
    const quoted = [...step.question.matchAll(/["“”‘’']([^"“”‘’']+)["“”‘’']/g)].map(m => m[1])
    for (const q of quoted) {
      const r = tryText(q) ?? tryText(q.split(/\s+/)[0])
      if (r !== null) return r
    }
    return tryText(answerText)
  }
  void steps
  return null
}

// ───────────────────────── 확인 문제 (런타임 생성) ─────────────────────────

export type CheckMode = 'meaning' | 'listen' | 'reverse'
/** 다시 풀 문제/확인 문제 하나 — 원본 단계 번호로만 가리킴 */
export type PracticeRef =
  | { kind: 'step'; raw: number }                          // 원래 있던 퀴즈·배열 문제
  | { kind: 'check'; teachRaw: number; mode: CheckMode }   // 낱말 카드로 만든 확인 문제

const PRACTICE_TYPES = new Set(['quiz', 'match-listen', 'match-reverse', 'arrange', 'writing'])

function eligible(s: Step): s is Teach {
  return s.type === 'teach' && !/\s/.test(s.word.trim()) && s.word.length <= 30
    && !!s.meaning && s.meaning.length <= 40
}

const normMeaning = (m: string) => m.replace(/\s+/g, '').replace(/[.,·]/g, '')

/**
 * 구절(verse) 뒤에 넣을 확인 문제 낱말들. 뒤에 이미 연습 문제가 있으면 빈 목록.
 * 구절 바로 앞 낱말 묶음에서 최대 3개(2개 미만이면 만들지 않음).
 */
export function checkWordsAfterVerse(steps: Step[], verseRaw: number): number[] {
  for (let k = 1; k <= 2; k++) {
    const nx = steps[verseRaw + k]
    if (nx && PRACTICE_TYPES.has(nx.type)) return []
    if (nx && nx.type !== 'speak') break
  }
  const group: number[] = []
  const seen = new Set<string>()
  for (let r = verseRaw - 1; r >= 0; r--) {
    const s = steps[r]
    if (s.type === 'verse' || s.type === 'intro') break
    if (!eligible(s)) continue
    const w = normPali(s.word)
    if (seen.has(w)) continue
    seen.add(w)
    group.unshift(r)
  }
  if (group.length < 2) return []
  if (group.length <= 3) return group
  // 고르게 셋: 앞·가운데·끝
  return [group[0], group[Math.floor(group.length / 2)], group[group.length - 1]]
}

// 결정적 의사 난수(같은 문제는 늘 같은 보기)
function rng(seed: number) {
  let x = (seed * 2654435761) >>> 0 || 1
  return () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296 }
}

/** 확인 문제를 화면용 단계(quiz / match-listen / match-reverse) 모양으로 만듦 */
export function buildCheckStep(steps: Step[], ref: Extract<PracticeRef, { kind: 'check' }>): Step | null {
  const t = steps[ref.teachRaw]
  if (!t || t.type !== 'teach') return null
  const rand = rng(ref.teachRaw * 7 + (ref.mode === 'meaning' ? 1 : ref.mode === 'listen' ? 2 : 3))
  const myWord = normPali(t.word)
  const myMeaning = normMeaning(t.meaning)
  const pool: Teach[] = []
  const usedW = new Set([myWord])
  const usedM = new Set([myMeaning])
  steps.forEach(s => {
    if (!eligible(s)) return
    const w = normPali(s.word), m = normMeaning(s.meaning)
    if (usedW.has(w) || usedM.has(m)) return
    usedW.add(w); usedM.add(m)
    pool.push(s)
  })
  // 섞어서 3개
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  const others = pool.slice(0, 3)
  if (!others.length) return null
  const answer = Math.floor(rand() * (others.length + 1))
  if (ref.mode === 'reverse') {
    const opts = others.map(o => o.word).filter(w => normPali(w) !== normPali(t.quizWord || t.word))
    const at = Math.min(answer, opts.length)
    opts.splice(at, 0, t.quizWord || t.word)
    return { type: 'match-reverse', instruction: `‘${t.meaning}’에 알맞은 낱말은?`, meaning: t.meaning, options: opts, answer: at }
  }
  const opts = others.map(o => o.meaning)
  opts.splice(answer, 0, t.meaning)
  if (ref.mode === 'listen') {
    return { type: 'match-listen', instruction: '🔊 소리를 듣고 알맞은 뜻을 고르세요', word: t.word, pronKo: t.pronKo, options: opts, answer }
  }
  return { type: 'quiz', question: `“${t.word}”의 뜻은?`, options: opts, answer }
}

// ───────────────────────── 기록 (공용 약속 형식) ─────────────────────────

function readJson<T>(key: string, fallback: T): T {
  try {
    const v = JSON.parse(localStorage.getItem(key) || 'null')
    return v ?? fallback
  } catch { return fallback }
}

/** 배운 낱말 기록 — suttalog-seen-words: [{ lessonId, step, word, meaning, grammar, pronKo }] */
export function recordSeenWord(lessonId: string, step: number, t: Teach) {
  const key = 'suttalog-seen-words'
  type SeenWord = { lessonId: string; step: number; word: string; meaning: string; grammar: string; pronKo: string }
  const arr = readJson<SeenWord[]>(key, [])
  if (!Array.isArray(arr)) return
  if (arr.some(x => x && x.lessonId === lessonId && x.step === step)) return
  arr.push({ lessonId, step, word: t.word, meaning: t.meaning, grammar: t.grammar || '', pronKo: t.pronKo })
  localStorage.setItem(key, JSON.stringify(arr))
}

/** 틀린 문제 기록 — suttalog-wrong-items: [{ lessonId, step, at }] (같은 문제는 시각만 새로) */
export function recordWrong(lessonId: string, step: number) {
  const key = 'suttalog-wrong-items'
  let arr = readJson<{ lessonId: string; step: number; at: number }[]>(key, [])
  if (!Array.isArray(arr)) arr = []
  const found = arr.find(x => x && x.lessonId === lessonId && x.step === step)
  if (found) found.at = Date.now()
  else arr.push({ lessonId, step, at: Date.now() })
  localStorage.setItem(key, JSON.stringify(arr))
}

/** 마지막으로 공부한 과 — suttalog-last-studied: { id, at } */
export function touchLastStudied(lessonId: string) {
  localStorage.setItem('suttalog-last-studied', JSON.stringify({ id: lessonId, at: Date.now() }))
}

/** 오늘 공부 시간(초) 더하기 — suttalog-study-seconds-<YYYY-MM-DD> */
export function addStudySeconds(sec: number) {
  const key = `suttalog-study-seconds-${localDateStr()}`
  const cur = Number(localStorage.getItem(key) || '0') || 0
  localStorage.setItem(key, String(cur + sec))
}

/** 해설 깊이 — 'easy'(기본: 문법 해설 접음) | 'detail' */
export function explainDepth(): 'easy' | 'detail' {
  return localStorage.getItem('suttalog-explain-depth') === 'detail' ? 'detail' : 'easy'
}

/** 구절 뒤 확인 문제 — 기본 켜짐 ('suttalog-check-quiz' = 'off'면 끔) */
export function checkQuizEnabled(): boolean {
  return localStorage.getItem('suttalog-check-quiz') !== 'off'
}

// ───────────────────────── 한 번 학습한 단어는 건너뛰기 ─────────────────────────
// 설정 'suttalog-skip-learned-words' = 'on' | 'off'(기본: 모든 낱말 카드를 빠짐없이 배움)
// 켜면 이미 배운 낱말(낱말 카드 word를 normPali로 맞춘 형태 기준, 다른 과에서 배웠어도 포함)의
// 낱말 카드(teach)를 화면에서만 건너뜀 — 원본 단계 번호·진도·메모 위치는 그대로

export function skipLearnedEnabled(): boolean {
  return localStorage.getItem('suttalog-skip-learned-words') === 'on'
}

/** 배운 낱말 기록(suttalog-seen-words)에 있는 낱말 */
export function learnedFromSeen(): Set<string> {
  const out = new Set<string>()
  const arr = readJson<{ word?: string }[]>('suttalog-seen-words', [])
  if (Array.isArray(arr)) arr.forEach(x => { if (x && typeof x.word === 'string') { const w = normPali(x.word); if (w) out.add(w) } })
  return out
}

/** 진도로 본 배운 낱말 — 지금 단계(원본 번호)보다 앞의 낱말 카드, 끝까지 마친 과는 전부 */
export function learnedFromProgress(lessonId: string, steps: Step[], into: Set<string> = new Set()): Set<string> {
  const done = localStorage.getItem(`suttalog-done-${lessonId}`) === 'true'
  const prog = Math.max(0, Number(localStorage.getItem(`suttalog-progress-${lessonId}`) || '0') || 0)
  const upto = done ? steps.length : Math.min(prog, steps.length)
  for (let r = 0; r < upto; r++) {
    const s = steps[r]
    if (s.type === 'teach') { const w = normPali(s.word); if (w) into.add(w) }
  }
  return into
}

/** 이 과를 시작한 적이 있는지(진도가 있거나 끝까지 마침) */
export function lessonStarted(lessonId: string): boolean {
  return localStorage.getItem(`suttalog-done-${lessonId}`) === 'true'
    || (Number(localStorage.getItem(`suttalog-progress-${lessonId}`) || '0') || 0) > 0
}
