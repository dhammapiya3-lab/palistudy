// 경전 중심 Duolingo식 학습 UI (데이터는 레슨별 파일을 필요할 때만 불러옴)
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { soundOff, speakPali, speakSequence, stopSpeech, ttsAvailable } from '../../utils/pali-tts'
import { pageIdOf, relocateLessonMemos, type StepSnapshot } from '../../utils/memo'
import { setMemoContext, stepLabel as memoStepLabel, type Memo as CloudMemo } from '../../utils/memo-cloud'
import { canonicalLessonId, getLessonTitle } from '../../utils/lessons-meta'
import { localDateStr } from '../../utils/local-date'
import WritingCanvas from '../../components/WritingCanvas'
import LotusHeart from '../../components/LotusHeart'
import ScrubBar from '../../components/ScrubBar'
import MemoModal from '../../components/memo/MemoModal'
import type { StepType } from './lesson-data-sn56-11'
import { getCachedLesson, hasLessonData, loadLesson, LESSON_IDS } from './lesson-registry'
import { normPali, splitByRanges, speakableText, teachRanges, verseRanges, type Range } from './pali-highlight'
import { lookupGloss } from './word-gloss'
import type { LessonResult } from '../lesson/LessonComplete'
import {
  addStudySeconds, buildCheckStep, buildTeachIndex, checkQuizEnabled, checkWordsAfterVerse, computeMadis,
  explainDepth, findTeach, learnedFromProgress, learnedFromSeen, lessonStarted, recordSeenWord, recordWrong,
  sectionShortName, skipLearnedEnabled, teachForStep, touchLastStudied,
  type CheckMode, type PracticeRef,
} from './learn-extras'
import { isEasyMode, twoChoices } from '../../utils/easy-mode'
import { FoldToggle, GrammarChip, MadiDoneScreen, WordNote, WrongExplain } from './LearnWidgets'

type Step = StepType
type Entry = { step: Step; raw: number } // raw = 원본 데이터(필터 전) 기준 번호

// 테마(밝게/어둡게)를 따라가는 상자 색 — 고정 색 대신 테마 변수와 섞어서 씀
const C = {
  infoBg: 'color-mix(in srgb, #1E88E5 10%, var(--color-surface))',
  infoBorder: 'color-mix(in srgb, #1E88E5 30%, var(--color-surface))',
  okBg: 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))',
  okBorder: 'color-mix(in srgb, var(--color-accent) 35%, var(--color-surface))',
  okStrong: 'var(--color-accent)',
  noteBg: 'color-mix(in srgb, #F9A825 12%, var(--color-surface))',
  noteBorder: 'color-mix(in srgb, #F9A825 40%, var(--color-surface))',
  errBg: 'color-mix(in srgb, var(--color-error) 10%, var(--color-surface))',
  errStrong: 'var(--color-error)',
}

// ───────────────────────── 저장 키 ─────────────────────────
// suttalog-progress-<id> : 지금 단계 — 원본 데이터 기준 번호(설정을 바꿔도 같은 단계)
// suttalog-total-<id>    : 원본 전체 단계 수 (progress와 같은 기준)
// suttalog-done-<id>     : 'true' = 끝까지 마침
// suttalog-hearts-<id>   : 남은 연꽃잎 수 (새로고침해도 유지)
// suttalog-rawidx-<id>   : 예전(걸러진 번호) 진도를 원본 번호로 한 번 옮겼다는 표시
const K = {
  progress: (id: string) => `suttalog-progress-${id}`,
  total: (id: string) => `suttalog-total-${id}`,
  done: (id: string) => `suttalog-done-${id}`,
  hearts: (id: string) => `suttalog-hearts-${id}`,
  rawMigrated: (id: string) => `suttalog-rawidx-${id}`,
  session: (id: string) => `suttalog-session-${id}`,
}

// 단어 설명 단계 설정에 따라 스텝 필터링 — 레슨에 들어올 때 한 번만 계산해 고정
// learned: '한 번 학습한 단어는 건너뛰기'가 켜졌을 때 이미 배운 낱말(normPali 형태), 꺼져 있으면 null
function buildEntries(steps: Step[], easy: boolean, learned: Set<string> | null): { entries: Entry[]; skippedLearned: number } {
  const mode = localStorage.getItem('suttalog-word-mode') || 'all'
  // 쉬운 화면에서는 쓰기 문제를 숨김(프라이머와 같음)
  const writingEnabled = localStorage.getItem('suttalog-writing') !== 'off' && !easy
  const limit = Number(localStorage.getItem('suttalog-word-limit') || '3')
  let globalCounts: Record<string, number> = {}
  try { globalCounts = JSON.parse(localStorage.getItem('suttalog-word-counts') || '{}') } catch { /* 무시 */ }
  const seenInLesson = new Set<string>()
  const shownInLesson = new Set<string>() // 건너뛰기 켬: 이 과에서 이미 한 번 보여 준 낱말
  let skippedLearned = 0

  const out: Entry[] = []
  steps.forEach((step, raw) => {
    // 쓰기 끔 설정이면 쓰기 단계는 목록에서 뺌(빈 화면이 잠깐 보이거나 뒤로 못 가는 문제 방지)
    if (step.type === 'writing' && !writingEnabled) return
    // 한 번 학습한 단어는 건너뛰기 — 다른 과에서 배웠거나, 이 과 앞에서 이미 나온 낱말
    if (step.type === 'teach' && learned) {
      const w = normPali(step.word)
      if (w && (learned.has(w) || shownInLesson.has(w))) { skippedLearned++; return }
      if (w) shownInLesson.add(w)
    }
    if (step.type === 'teach' && mode !== 'all') {
      const word = step.word.toLowerCase().trim()
      if (mode === 'first') {
        if (seenInLesson.has(word)) return
        seenInLesson.add(word)
      } else if (mode === 'limit') {
        if ((globalCounts[word] || 0) >= limit) return
      }
    }
    out.push({ step, raw })
  })
  // 모두 걸러져 비는 일은 없게
  return out.length ? { entries: out, skippedLearned } : { entries: steps.map((step, raw) => ({ step, raw })), skippedLearned: 0 }
}

// 이미 배운 낱말 모으기 — 배운 낱말 기록 + 진도(이 과·시작한 다른 과). 다른 과 데이터는 필요할 때만 받음
async function collectLearned(lid: string, steps: Step[]): Promise<Set<string>> {
  const learned = learnedFromSeen()
  learnedFromProgress(lid, steps, learned)
  const others = LESSON_IDS.filter(id => id !== lid && lessonStarted(id))
  await Promise.all(others.map(id =>
    loadLesson(id).then(st => { learnedFromProgress(id, st, learned) }).catch(() => { /* 못 받으면 기록만으로 */ })))
  return learned
}

// 원본 번호 → 걸러진 목록 안의 위치(같은 단계가 없으면 그 다음 단계)
function positionOf(entries: Entry[], raw: number): number {
  const i = entries.findIndex(e => e.raw >= raw)
  return i < 0 ? entries.length - 1 : i
}

// 실제로 잘렸을 때만 '…'
function ellipsize(s: string, n: number): string {
  const t = s.replace(/\s+/g, ' ').trim()
  return t.length > n ? t.slice(0, n).trimEnd() + '…' : t
}

// 단계 이름 (목차·진도 막대 말풍선에서 같이 사용)
function stepLabel(s: Step, i: number): string {
  const N = 30
  return s.type === 'intro' ? s.title
    : s.type === 'teach' ? `${s.word}${s.label ? ` (${s.label})` : ''} — ${s.meaning}`
    : s.type === 'teach-grammar' ? s.title
    : s.type === 'quiz' ? `퀴즈: ${ellipsize(s.question, N)}`
    : s.type === 'match-listen' ? `듣기: ${ellipsize(s.instruction, N)}`
    : s.type === 'match-reverse' ? `뜻 맞추기: ${s.meaning}`
    : s.type === 'writing' ? `쓰기: ${s.answer}`
    : s.type === 'speak' ? `따라 읽기: ${ellipsize(s.pali, N)}`
    : s.type === 'arrange' ? `배열: ${ellipsize(s.instruction, N)}`
    : s.type === 'verse' ? `경전: ${ellipsize(s.pali, N)}`
    : `단계 ${i + 1}`
}

/** 받침에 따라 '을/를' */
function eulReul(word: string): string {
  const c = word.charCodeAt(word.length - 1)
  if (c >= 0xac00 && c <= 0xd7a3) return (c - 0xac00) % 28 ? '을' : '를'
  return '을(를)'
}

function typeIcon(s: Step): string {
  return s.type === 'intro' ? '📖'
    : s.type === 'teach' ? '📝'
    : s.type === 'teach-grammar' ? '📐'
    : s.type === 'quiz' ? '❓'
    : s.type === 'match-listen' ? '🔊'
    : s.type === 'match-reverse' ? '🎯'
    : s.type === 'writing' ? '✍️'
    : s.type === 'speak' ? '🗣️'
    : s.type === 'arrange' ? '🧩'
    : s.type === 'verse' ? '☸️' : '•'
}

// ───────────────────────── 이번 학습 기록(완료 화면용) ─────────────────────────
type Session = { startedAt: number; correct: number; wrong: number; words: string[]; wrongs?: PracticeRef[] }
function readSession(lid: string): Session {
  try {
    const s = JSON.parse(sessionStorage.getItem(K.session(lid)) || 'null')
    if (s && typeof s.startedAt === 'number') return s
  } catch { /* 무시 */ }
  const fresh: Session = { startedAt: Date.now(), correct: 0, wrong: 0, words: [] }
  sessionStorage.setItem(K.session(lid), JSON.stringify(fresh))
  return fresh
}
function elapsedSince(t: number): number { return Date.now() - t }
const refKey = (r: PracticeRef) => (r.kind === 'step' ? `s${r.raw}` : `c${r.teachRaw}:${r.mode}`)
function pushUnique(list: PracticeRef[], r: PracticeRef) {
  if (!list.some(x => refKey(x) === refKey(r))) list.push(r)
}

// 화면에서만 끼워 넣는 문제(확인 문제·다시 풀기) — 원래 단계 번호는 그대로
type Virtual = {
  purpose: 'check' | 'retry-madi' | 'retry-lesson'
  items: PracticeRef[]
  idx: number
  correct: number
  wrong: number
}
type MadiDone = {
  madiNo: number; words: number; correct: number; wrong: number
  sectionDone: string | null; wrongs: PracticeRef[]; isRetryResult: boolean
}
const SCORED = new Set(['quiz', 'match-listen', 'match-reverse', 'arrange'])
function updateSession(lid: string, f: (s: Session) => void) {
  const s = readSession(lid)
  f(s)
  sessionStorage.setItem(K.session(lid), JSON.stringify(s))
}

// ───────────────────────── 화면 바깥 틀 ─────────────────────────

function CenterScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {children}
    </div>
  )
}

export default function ScriptureLearn() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const nav = useNavigate()
  const requested = lessonId || 'sn56-11'
  const lid = canonicalLessonId(requested)

  // 예전 별칭(dhp1-alphabet 등) → 정식 ID 주소로
  if (lid !== requested) return <Navigate to={`/learn/scripture/${lid}`} replace />

  // 없는 레슨 주소
  if (!hasLessonData(lid)) {
    return (
      <CenterScreen>
        <span className="text-5xl" aria-hidden="true">🔍</span>
        <h1 className="text-xl font-bold mt-4">레슨을 찾을 수 없습니다</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>주소가 바뀌었거나 없는 경전입니다.</p>
        <button onClick={() => nav('/map')} className="mt-6 w-full max-w-xs py-3 rounded-xl text-white font-bold"
          style={{ backgroundColor: 'var(--color-primary)' }}>학습맵에서 고르기</button>
        <button onClick={() => nav('/')} className="mt-3 w-full max-w-xs py-3 rounded-xl font-bold"
          style={{ border: '1px solid var(--color-border)' }}>홈으로</button>
      </CenterScreen>
    )
  }

  return <LessonLoader key={lid} lid={lid} />
}

function LessonLoader({ lid }: { lid: string }) {
  const [steps, setSteps] = useState<Step[] | undefined>(() => getCachedLesson(lid))
  const [failed, setFailed] = useState(false)
  // '한 번 학습한 단어는 건너뛰기' — 꺼져 있으면 null(기본: 모든 낱말을 빠짐없이 배움)
  const [skipOn] = useState(skipLearnedEnabled)
  const [learned, setLearned] = useState<Set<string> | null | undefined>(() => (skipOn ? undefined : null))

  useEffect(() => {
    if (steps) return
    let alive = true
    loadLesson(lid).then(s => { if (alive) setSteps(s) }).catch(() => { if (alive) setFailed(true) })
    return () => { alive = false }
  }, [lid, steps])

  useEffect(() => {
    if (!steps || learned !== undefined) return
    let alive = true
    collectLearned(lid, steps).then(l => { if (alive) setLearned(l) }).catch(() => { if (alive) setLearned(learnedFromSeen()) })
    return () => { alive = false }
  }, [lid, steps, learned])

  if (failed) {
    return (
      <CenterScreen>
        <span className="text-5xl" aria-hidden="true">📶</span>
        <h1 className="text-lg font-bold mt-4">레슨을 불러오지 못했습니다</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>인터넷 연결을 확인한 뒤 다시 시도해 주세요.</p>
        <button onClick={() => window.location.reload()} className="mt-6 w-full max-w-xs py-3 rounded-xl text-white font-bold"
          style={{ backgroundColor: 'var(--color-primary)' }}>다시 시도</button>
      </CenterScreen>
    )
  }
  if (!steps || learned === undefined) {
    return (
      <CenterScreen>
        <div className="w-10 h-10 rounded-full border-4 animate-spin"
          style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-primary)' }} aria-hidden="true" />
        <p className="text-sm mt-4" style={{ color: 'var(--color-text-secondary)' }} role="status">
          {getLessonTitle(lid)} 불러오는 중…
        </p>
      </CenterScreen>
    )
  }
  return <LessonPlayer lid={lid} rawSteps={steps} learned={learned} />
}

// ───────────────────────── 레슨 진행 ─────────────────────────

function LessonPlayer({ lid, rawSteps, learned }: { lid: string; rawSteps: Step[]; learned: Set<string> | null }) {
  const nav = useNavigate()
  const location = useLocation()
  const canSpeak = ttsAvailable()
  // 쉬운 화면(설정) — 레슨에 들어올 때 한 번 읽음
  const [easy] = useState(isEasyMode)

  // 걸러진 단계 목록 — 레슨에 들어올 때 한 번만 계산(학습 중 단어 횟수가 늘어도 목록이 당겨지지 않게)
  const [{ entries, skippedLearned }] = useState(() => buildEntries(rawSteps, easy, learned))
  const lastRaw = rawSteps.length - 1

  // 저장된 진도(원본 번호) 읽기 — 예전 '걸러진 번호' 진도는 한 번만 원본 번호로 옮김
  const [initial] = useState(() => {
    let saved = Math.max(0, Number(localStorage.getItem(K.progress(lid)) || '0') || 0)
    if (localStorage.getItem(K.rawMigrated(lid)) !== '1') {
      const mode = localStorage.getItem('suttalog-word-mode') || 'all'
      const writingOff = localStorage.getItem('suttalog-writing') === 'off'
      if ((mode !== 'all' || writingOff) && saved > 0 && saved < entries.length) {
        saved = entries[saved].raw
        localStorage.setItem(K.progress(lid), String(saved))
      }
      localStorage.setItem(K.rawMigrated(lid), '1')
    }
    // 메모의 '이동'으로 들어온 경우(?step=원본 단계 번호) — 그 단계부터 보여 줌
    const q = Number(new URLSearchParams(location.search).get('step'))
    if (location.search.includes('step=') && Number.isInteger(q) && q >= 0 && q <= lastRaw) {
      return { pos: positionOf(entries, q), finishedBefore: false }
    }
    const done = localStorage.getItem(K.done(lid)) === 'true'
    return { pos: positionOf(entries, Math.min(saved, lastRaw)), finishedBefore: done && saved >= lastRaw }
  })

  // 완료 화면의 '틀린 문제 다시 풀기'로 들어온 경우 — 그 문제들만 다시 풂(진도는 그대로)
  const [retryInit] = useState<PracticeRef[] | null>(() => {
    const st = location.state as { retry?: unknown } | null
    if (!st || !Array.isArray(st.retry)) return null
    const ok = (st.retry as PracticeRef[]).filter(r =>
      r && (r.kind === 'step'
        ? Number.isInteger(r.raw) && !!rawSteps[r.raw] && SCORED.has(rawSteps[r.raw].type)
        : r.kind === 'check' && Number.isInteger(r.teachRaw) && !!buildCheckStep(rawSteps, r)))
    return ok.length ? ok : null
  })
  useEffect(() => {
    // 새로고침했을 때 다시 풀기가 또 시작되지 않게 주소의 상태를 지움
    if (location.state) nav(location.pathname, { replace: true, state: null })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [stepIdx, setStepIdxRaw] = useState(initial.pos)
  const [showDoneChoice, setShowDoneChoice] = useState(initial.finishedBefore && !retryInit)
  const setStepIdx = useCallback((next: number) => {
    setStepIdxRaw(next)
    localStorage.setItem(K.progress(lid), String(entries[next].raw))
  }, [entries, lid])

  // 전체 단계 수 기록(홈·학습맵 진도 계산용, progress와 같은 원본 기준) + 메모 위치 바로잡기
  // (첫 화면을 그리기 전에 한 번 — 여러 번 실행돼도 결과가 같음)
  const [memoVer, setMemoVer] = useState(() => {
    localStorage.setItem(K.total(lid), String(rawSteps.length))
    relocateLessonMemos(lid, rawSteps.map(buildSnapshot))
    readSession(lid)
    return 0
  })

  // 연꽃잎 — 설정의 개수(기본 5), 남은 수는 레슨별로 저장
  const MAX_HEARTS = Math.max(1, Number(localStorage.getItem('suttalog-hearts-count') || '5') || 5)
  const [hearts, setHeartsRaw] = useState(() => {
    const v = localStorage.getItem(K.hearts(lid))
    const n = v === null ? MAX_HEARTS : Number(v)
    return Number.isFinite(n) ? Math.min(MAX_HEARTS, Math.max(0, n)) : MAX_HEARTS
  })
  const [heartShake, setHeartShake] = useState(false)
  const setHearts = (n: number) => {
    const v = Math.min(MAX_HEARTS, Math.max(0, n))
    setHeartsRaw(v)
    localStorage.setItem(K.hearts(lid), String(v))
  }
  const loseHeart = () => {
    if (easy) return // 쉬운 화면: 연꽃잎 없이 공부
    setHearts(hearts - 1)
    setHeartShake(true)
    window.setTimeout(() => setHeartShake(false), 600)
  }

  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [writingChecked, setWritingChecked] = useState(false)
  const [arrangeOrder, setArrangeOrder] = useState<number[]>([])
  const [contextOpen, setContextOpen] = useState(false)
  const [showTOC, setShowTOC] = useState(false)
  const [showMemo, setShowMemo] = useState(false)

  // 해설 깊이: 'easy'(기본)면 원형·형태·불교 해설을 접어 둠. 한 번 펼치면 이번 학습 동안 펼친 채로
  const [depth] = useState(explainDepth)
  const [foldOpen, setFoldOpen] = useState(false)

  // 화면에서만 끼워 넣는 문제(확인 문제·다시 풀기)
  const [virtual, setVirtual] = useState<Virtual | null>(() =>
    retryInit ? { purpose: 'retry-lesson', items: retryInit, idx: 0, correct: 0, wrong: 0 } : null)
  const [retryDone, setRetryDone] = useState<{ correct: number; wrong: number } | null>(null)
  const [madiDone, setMadiDone] = useState<MadiDone | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [wordNote, setWordNote] = useState<{ text: string; teachRaw: number | null } | null>(null)
  const [seq, setSeq] = useState<{ idx: number; total: number } | null>(null)
  const checkedVerses = useRef(new Set<number>())
  const advanced = useRef(0) // 이번에 '다음'으로 실제로 넘긴 단계 수
  const lastActive = useRef(Date.now())
  const pendingMadiDone = useRef<MadiDone | null>(null)

  const entry = entries[stepIdx]
  const vItem = virtual ? virtual.items[virtual.idx] : null
  const vStep = useMemo<Step | null>(() => {
    if (!vItem) return null
    return vItem.kind === 'step' ? rawSteps[vItem.raw] : buildCheckStep(rawSteps, vItem)
  }, [vItem, rawSteps])
  const step: Step = vStep ?? entry.step
  // 지금 문제의 원본 단계 번호(확인 문제는 낱말 카드 번호)
  const curRaw = vItem ? (vItem.kind === 'step' ? vItem.raw : vItem.teachRaw) : entry.raw
  const optSeed = vItem ? (vItem.kind === 'step' ? vItem.raw : 5000 + vItem.teachRaw * 3) : entry.raw

  // 낱말 카드 색인(구절 낱말 쪽지·오답 설명용)
  const teachIdx = useMemo(() => buildTeachIndex(rawSteps), [rawSteps])

  // 마디 — 긴 과를 20~30단계씩 화면에서만 나눔(원본 단계 번호 기준이라 설정을 바꿔도 경계가 같음)
  const madi = useMemo(() => {
    const ms = computeMadis(rawSteps)
    const raw = entries.map(e => { let k = 0; while (k + 1 < ms.length && ms[k + 1].start <= e.raw) k++; return k })
    const uniq = [...new Set(raw)]
    const remap = new Map(uniq.map((m, i) => [m, i]))
    const of = raw.map(m => remap.get(m)!)
    const ranges = uniq.map((_, i) => ({ first: of.indexOf(i), last: of.lastIndexOf(i) }))
    return { of, ranges }
  }, [rawSteps, entries])
  const useMadi = madi.ranges.length > 1
  const curMadi = madi.of[stepIdx]
  const madiRange = madi.ranges[curMadi]
  const madiStats = useRef({ madi: curMadi, correct: 0, wrong: 0, wrongs: [] as PracticeRef[] })
  const statsFor = (m: number) => {
    if (madiStats.current.madi !== m) madiStats.current = { madi: m, correct: 0, wrong: 0, wrongs: [] }
    return madiStats.current
  }

  // 배운 낱말 기록 — 낱말 카드를 볼 때
  useEffect(() => {
    if (!virtual && entry.step.type === 'teach') recordSeenWord(lid, entry.raw, entry.step)
  }, [lid, entry, virtual])

  // 공부 시간 — 화면이 보이고 최근 2분 안에 손을 댔으면(또는 이어 듣는 중이면) 15초마다 더함
  useEffect(() => {
    const mark = () => { lastActive.current = Date.now() }
    window.addEventListener('pointerdown', mark)
    window.addEventListener('keydown', mark)
    const t = window.setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - lastActive.current < 120_000) addStudySeconds(15)
    }, 15_000)
    return () => {
      window.removeEventListener('pointerdown', mark)
      window.removeEventListener('keydown', mark)
      window.clearInterval(t)
    }
  }, [])

  // 화면을 떠나면 소리 멈춤
  useEffect(() => () => stopSpeech(), [])

  // 쉬운 화면: 학습 화면에서 글씨를 더 크게(프라이머와 같이 화면 전체 + 빠알리 글자) — 나가면 되돌림
  useEffect(() => {
    if (!easy) return
    const el = document.documentElement
    const beforeFs = el.style.fontSize
    const beforePali = el.style.getPropertyValue('--pali-fontsize')
    const pali = Number(localStorage.getItem('suttalog-fontsize')) || 18
    el.style.fontSize = '18px'
    el.style.setProperty('--pali-fontsize', `${Math.max(pali, 22)}px`)
    return () => {
      el.style.fontSize = beforeFs
      if (beforePali) el.style.setProperty('--pali-fontsize', beforePali)
      else el.style.removeProperty('--pali-fontsize')
    }
  }, [easy])

  // 이미 배운 낱말을 건너뛴 경우 처음에 한 번 알림
  useEffect(() => {
    if (skippedLearned > 0) setToast(`이미 배운 낱말 카드 ${skippedLearned}개는 건너뜁니다 (설정에서 바꿀 수 있어요)`)
  }, [skippedLearned])

  // 알림(소단원 완료 등)
  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(t)
  }, [toast])
  // 쉬운 화면: 경전 구절·따라 읽기 단계에 들어오면 소리를 한 번 자동으로 들려줌(프라이머와 같음)
  useEffect(() => {
    if (!easy || !canSpeak || madiDone || showDoneChoice || retryDone) return
    if (step.type !== 'verse' && step.type !== 'speak') return
    const text = step.pali
    const t = window.setTimeout(() => speakPali(text), 450)
    return () => window.clearTimeout(t)
  }, [easy, canSpeak, step, madiDone, showDoneChoice, retryDone])

  const isQuizType = step.type === 'match-listen' || step.type === 'match-reverse' || step.type === 'quiz'
  const isWriting = step.type === 'writing'
  const isArrange = step.type === 'arrange'
  const speak = (text: string) => speakPali(speakableText(text) || text)

  // 아래 막대 높이를 재서 본문 여백과 메모 버튼 위치를 맞춤
  const barRef = useRef<HTMLDivElement>(null)
  const [barH, setBarH] = useState(88)
  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const update = () => setBarH(Math.ceil(el.getBoundingClientRect().height))
    update()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // 퀴즈 보기 섞기 (단계마다 고정)
  const shuffledOpts = useMemo(() => {
    if (!('options' in step)) return [] as string[]
    const opts = [...step.options]
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.abs(((optSeed + 1) * 31 + i * 17) % (i + 1))
      ;[opts[i], opts[j]] = [opts[j], opts[i]]
    }
    // 쉬운 화면: 보기 2개(정답 + 오답 하나)
    if (easy && 'answer' in step && typeof step.answer === 'number') return twoChoices(opts, step.options[step.answer], optSeed)
    return opts
  }, [step, optSeed, easy])
  const answerText = 'options' in step && 'answer' in step && typeof step.answer === 'number' ? step.options[step.answer] : ''
  const isCorrectAnswer = selected !== null && shuffledOpts[selected] === answerText
  const arrangeCorrect = isArrange && JSON.stringify(arrangeOrder) === JSON.stringify(step.correctOrder)

  const resetStepState = () => {
    setSelected(null); setShowResult(false); setWritingChecked(false); setArrangeOrder([]); setContextOpen(false)
    setWordNote(null)
  }

  // 원하는 단계로 바로 이동 (목차·진도 막대 공용)
  const goToStep = (i: number) => {
    if (i < 0 || i >= entries.length) return
    stopSpeech()
    setVirtual(null)
    if (i !== stepIdx) setStepIdx(i)
    resetStepState()
  }

  const finishLesson = () => {
    const s = readSession(lid)
    if (advanced.current >= 5) touchLastStudied(lid)
    const result: LessonResult = {
      lid,
      correct: s.correct,
      wrong: s.wrong,
      newWords: s.words.length,
      elapsedMs: elapsedSince(s.startedAt),
      steps: entries.length,
      retry: s.wrongs && s.wrongs.length ? s.wrongs : undefined,
    }
    localStorage.setItem(K.done(lid), 'true')
    localStorage.setItem(K.progress(lid), String(lastRaw))
    localStorage.setItem(K.hearts(lid), String(MAX_HEARTS))
    sessionStorage.removeItem(K.session(lid))
    nav('/lesson-complete', { state: result })
  }

  // 다음 단계로 — 마디가 바뀌면 마디 마침 화면, 소단원이 끝나면 알림
  const advanceFrom = (i: number) => {
    if (i + 1 >= entries.length) { finishLesson(); return }
    const next = i + 1
    let sectionDone: string | null = null
    if (entries.length > 40 && entries[next].step.type === 'intro') {
      const sec = sections.find(x => i >= x.start && i <= x.end)
      if (sec && sec.start > 0) sectionDone = sectionShortName(sec.title)
    }
    setStepIdx(next)
    resetStepState()
    if (useMadi && madi.of[next] !== madi.of[i]) {
      const m = madi.of[i]
      const r = madi.ranges[m]
      const words = new Set<string>()
      for (let k = r.first; k <= r.last; k++) {
        const st = entries[k].step
        if (st.type === 'teach') words.add(st.word.toLowerCase().trim())
      }
      const ms = statsFor(m)
      setMadiDone({ madiNo: m + 1, words: words.size, correct: ms.correct, wrong: ms.wrong, sectionDone, wrongs: [...ms.wrongs], isRetryResult: false })
      madiStats.current = { madi: madi.of[next], correct: 0, wrong: 0, wrongs: [] }
      window.scrollTo(0, 0)
      return
    }
    if (sectionDone) setToast(`${sectionDone} 편 완료 🪷`)
  }

  const handleNext = () => {
    stopSpeech()
    // 끼워 넣은 문제 진행
    if (virtual) {
      if (virtual.idx + 1 < virtual.items.length) {
        setVirtual({ ...virtual, idx: virtual.idx + 1 })
        resetStepState()
        return
      }
      const v = virtual
      setVirtual(null)
      resetStepState()
      if (v.purpose === 'check') advanceFrom(stepIdx)
      else if (v.purpose === 'retry-madi') {
        const p = pendingMadiDone.current
        pendingMadiDone.current = null
        if (p) setMadiDone({ ...p, wrongs: [], isRetryResult: true })
      }
      else setRetryDone({ correct: v.correct, wrong: v.wrong })
      return
    }
    // teach 스텝 완료 시 전역 단어 학습 횟수 기록 (처음 배운 단어는 '새 단어'로 셈)
    if (step.type === 'teach') {
      const word = step.word.toLowerCase().trim()
      let counts: Record<string, number> = {}
      try { counts = JSON.parse(localStorage.getItem('suttalog-word-counts') || '{}') } catch { /* 무시 */ }
      if (!counts[word]) updateSession(lid, s => { if (!s.words.includes(word)) s.words.push(word) })
      counts[word] = (counts[word] || 0) + 1
      localStorage.setItem('suttalog-word-counts', JSON.stringify(counts))
    }
    // 캘린더에 오늘 학습 기록 (기기 현지 날짜 기준)
    const today = localDateStr()
    let dates: string[] = []
    try { dates = JSON.parse(localStorage.getItem('suttalog-study-dates') || '[]') } catch { /* 무시 */ }
    if (!dates.includes(today)) { dates.push(today); localStorage.setItem('suttalog-study-dates', JSON.stringify(dates)) }

    // 마지막 학습 과 — 5단계 이상 실제로 넘겼을 때만(잠깐 열어 본 과는 '이어서 학습하기'를 바꾸지 않음)
    advanced.current++
    if (advanced.current >= 5) touchLastStudied(lid)

    // 구절이 끝나면 방금 배운 낱말 2~3개로 확인 문제(뒤에 연습 문제가 이미 있으면 생략)
    if (step.type === 'verse' && checkQuizEnabled() && !checkedVerses.current.has(entry.raw)) {
      checkedVerses.current.add(entry.raw)
      const listenOk = canSpeak && !soundOff()
      const modes: CheckMode[] = listenOk ? ['meaning', 'listen', 'reverse'] : ['meaning', 'reverse', 'meaning']
      const items: PracticeRef[] = checkWordsAfterVerse(rawSteps, entry.raw)
        .map((r, i) => ({ kind: 'check' as const, teachRaw: r, mode: modes[i % modes.length] }))
        .filter(it => buildCheckStep(rawSteps, it))
      if (items.length >= 2) {
        setVirtual({ purpose: 'check', items, idx: 0, correct: 0, wrong: 0 })
        resetStepState()
        window.scrollTo(0, 0)
        return
      }
    }
    advanceFrom(stepIdx)
  }
  const handlePrev = () => {
    stopSpeech()
    if (stepIdx > 0) { setStepIdx(stepIdx - 1); resetStepState() }
  }

  // 채점 기록 — 확인 문제·다시 풀기는 연꽃잎을 잃지 않음
  const score = (ok: boolean) => {
    if (virtual && vItem) {
      setVirtual({ ...virtual, correct: virtual.correct + (ok ? 1 : 0), wrong: virtual.wrong + (ok ? 0 : 1) })
      if (!ok) recordWrong(lid, curRaw)
      if (virtual.purpose === 'check') {
        const ms = statsFor(curMadi)
        if (ok) { ms.correct++; updateSession(lid, s => { s.correct++ }) }
        else {
          ms.wrong++; pushUnique(ms.wrongs, vItem)
          updateSession(lid, s => { s.wrong++; s.wrongs = s.wrongs || []; pushUnique(s.wrongs, vItem) })
        }
      }
      return
    }
    const ms = statsFor(curMadi)
    if (ok) { ms.correct++; updateSession(lid, s => { s.correct++ }) }
    else {
      const ref: PracticeRef = { kind: 'step', raw: entry.raw }
      ms.wrong++; pushUnique(ms.wrongs, ref)
      updateSession(lid, s => { s.wrong++; s.wrongs = s.wrongs || []; pushUnique(s.wrongs, ref) })
      recordWrong(lid, entry.raw)
      loseHeart()
    }
  }
  const handleCheckQuiz = () => {
    if (selected === null) return
    setShowResult(true)
    score(isCorrectAnswer)
  }
  const handleCheckArrange = () => {
    if (!isArrange || arrangeOrder.length < step.blocks.length) return
    setShowResult(true)
    score(arrangeCorrect)
  }

  // 이 과 전체 이어 듣기 — 구절을 차례로 읽음(녹음이 있으면 녹음, 없으면 기기 목소리)
  const verseTexts = useMemo(() => {
    const out: string[] = []
    rawSteps.forEach(s => { if (s.type === 'verse' && out[out.length - 1] !== s.pali) out.push(s.pali) })
    return out
  }, [rawSteps])
  const playAll = () => {
    if (seq) { stopSpeech(); return }
    speakSequence(verseTexts, {
      onIndex: i => { lastActive.current = Date.now(); setSeq({ idx: i, total: verseTexts.length }) },
      onDone: () => setSeq(null),
    })
  }

  // 틀렸을 때 보여 줄 정답 낱말 카드
  const wrongTeach = (() => {
    if (!showResult || isCorrectAnswer || !isQuizType) return null
    const r = vItem?.kind === 'check' ? vItem.teachRaw : teachForStep(rawSteps, teachIdx, step, curRaw, answerText)
    const t = r !== null ? rawSteps[r] : null
    return t && t.type === 'teach' ? t : null
  })()
  // 손글씨는 채점할 수 없으므로 정답만 보여 줌(감점 없음)
  const handleRevealWriting = () => setWritingChecked(true)

  const pageId = pageIdOf(lid, entry.raw)
  void memoVer
  // 피드백 메모 — 빠알리 프라이머와 같은 온라인 저장소 (화면에는 따로 보이지 않고 메모 창에서만 봄)
  const [editMemo, setEditMemo] = useState<CloudMemo | null>(null)
  // 메모 창이 '지금 위치'를 알 수 있게 알려 줌
  useEffect(() => {
    setMemoContext({
      stepId: pageId,
      page: memoStepLabel(getLessonTitle(lid) || lid, entry.raw),
      snapshot: JSON.stringify(buildSnapshot(entry.step)),
      lessonId: lid,
    })
  }, [pageId, lid, entry])
  useEffect(() => () => setMemoContext(null), [])

  // 소단원(intro) 시작 위치 — 진도 막대 눈금·목차 묶음에 사용
  const sections = useMemo(() => {
    const out: { start: number; end: number; title: string }[] = []
    entries.forEach((e, i) => {
      if (i === 0 || e.step.type === 'intro') {
        out.push({ start: i, end: i, title: e.step.type === 'intro' ? e.step.title : '시작' })
      }
      out[out.length - 1].end = i
    })
    return out
  }, [entries])

  // ── 연꽃잎을 모두 잃음: 진도는 그대로, 지금 단계에서 다시 도전 ──
  if (hearts <= 0 && !easy) {
    return (
      <CenterScreen>
        <span className="text-6xl" aria-hidden="true">🥀</span>
        <h2 className="text-xl font-bold mt-4">연꽃잎을 모두 잃었습니다</h2>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          괜찮습니다. 진도는 그대로 남아 있어요.<br />연꽃잎을 다시 채우고 지금 단계({stepIdx + 1}/{entries.length})부터 이어서 도전해 보세요 🙏
        </p>
        <button
          onClick={() => { setHearts(MAX_HEARTS); resetStepState() }}
          className="mt-6 w-full max-w-xs px-6 py-3 rounded-xl text-white font-bold"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >🪷 연꽃잎 채우고 다시 도전</button>
        <button onClick={() => nav('/')} className="mt-3 w-full max-w-xs px-6 py-3 rounded-xl font-bold"
          style={{ border: '1px solid var(--color-border)' }}>홈으로</button>
      </CenterScreen>
    )
  }

  // ── 마디 마침 ──
  if (madiDone) {
    return (
      <MadiDoneScreen
        madiNo={madiDone.madiNo}
        madiCount={madi.ranges.length}
        words={madiDone.words}
        correct={madiDone.correct}
        wrong={madiDone.wrong}
        sectionDone={madiDone.sectionDone}
        retryCount={madiDone.wrongs.length}
        isRetryResult={madiDone.isRetryResult}
        onMore={() => { setMadiDone(null); window.scrollTo(0, 0) }}
        onStop={() => { stopSpeech(); nav('/') }}
        onRetry={() => {
          // 다시 풀기가 끝나면 마디 마침 화면으로 돌아옴
          pendingMadiDone.current = madiDone
          setMadiDone(null)
          setVirtual({ purpose: 'retry-madi', items: madiDone.wrongs, idx: 0, correct: 0, wrong: 0 })
          resetStepState()
        }}
      />
    )
  }

  // ── 완료 화면에서 고른 '틀린 문제 다시 풀기'를 마침 ──
  if (retryDone) {
    const n = retryDone.correct + retryDone.wrong
    return (
      <CenterScreen>
        <span className="text-6xl" aria-hidden="true">🪷</span>
        <h2 className="text-xl font-bold mt-4">다시 풀기를 마쳤습니다</h2>
        <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          {n > 0 ? `${n}문제 중 ${retryDone.correct}문제를 맞혔어요.` : '수고하셨습니다.'} 틀린 낱말은 복습에서 다시 나옵니다 🙏
        </p>
        <button onClick={() => nav('/review')} className="mt-6 w-full max-w-xs py-3 rounded-xl text-white font-bold"
          style={{ backgroundColor: 'var(--color-primary)' }}>복습하러 가기</button>
        <button onClick={() => nav('/')} className="mt-3 w-full max-w-xs py-3 rounded-xl font-bold"
          style={{ border: '1px solid var(--color-border)' }}>홈으로</button>
      </CenterScreen>
    )
  }

  // ── 이미 끝까지 마친 레슨에 다시 들어옴 ──
  if (showDoneChoice) {
    return (
      <CenterScreen>
        <span className="text-6xl" aria-hidden="true">🪷</span>
        <h2 className="text-xl font-bold mt-4">{getLessonTitle(lid)}{eulReul(getLessonTitle(lid))} 모두 마쳤습니다</h2>
        <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>복습할 방법을 골라 주세요.</p>
        <button onClick={() => { setShowDoneChoice(false); goToStep(0) }}
          className="mt-6 w-full max-w-xs py-3 rounded-xl text-white font-bold" style={{ backgroundColor: 'var(--color-primary)' }}>
          처음부터 다시 배우기
        </button>
        <button onClick={() => { setShowDoneChoice(false); setShowTOC(true) }}
          className="mt-3 w-full max-w-xs py-3 rounded-xl font-bold" style={{ border: '1px solid var(--color-border)' }}>
          목차에서 단계 고르기
        </button>
        <button onClick={() => nav('/')} className="mt-3 w-full max-w-xs py-3 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          홈으로
        </button>
      </CenterScreen>
    )
  }

  // layout='fill': 선택지가 세로 공간을 균등 분할 (퀴즈 화면)
  const renderOptions = () => (
    <div className="flex flex-col gap-3 pb-1">
      {shuffledOpts.map((opt, i) => {
        const isAns = showResult && opt === answerText
        const isWrn = showResult && selected === i && opt !== answerText
        const isSelected = selected === i && !showResult
        return (
          <button key={i} onClick={() => !showResult && setSelected(i)} disabled={showResult}
            aria-pressed={selected === i}
            className="w-full px-5 py-4 rounded-2xl text-left text-base font-medium transition-all active:scale-[0.98] flex items-center min-h-[60px]"
            style={{
              backgroundColor: isAns ? C.okBg : isWrn ? C.errBg : isSelected ? 'color-mix(in srgb, var(--color-primary) 8%, var(--color-surface))' : 'var(--color-surface)',
              border: isAns ? `2px solid ${C.okStrong}` : isWrn ? `2px solid ${C.errStrong}` : isSelected ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
              color: 'var(--color-text)',
            }}>
            {isAns && '✅ '}{isWrn && '❌ '}{opt}
          </button>
        )
      })}
    </div>
  )

  // 칠한 글자 조각 그리기
  const renderSegments = (text: string, ranges: Range[], mode: 'context' | 'verse') =>
    splitByRanges(text, ranges).map((seg, i) => {
      if (!seg.hl) {
        return <span key={i} style={{ color: mode === 'context' ? 'var(--color-text-secondary)' : 'var(--color-primary)' }}>{seg.text}</span>
      }
      if (mode === 'verse') {
        // 누르면 소리 + 아래에 뜻 쪽지(같은 과 낱말 카드에서 찾음)
        const open = wordNote?.text === speakableText(seg.text)
        return (
          <button key={i} lang="pi"
            onClick={() => {
              if (canSpeak) speak(seg.text)
              setWordNote(open ? null : { text: speakableText(seg.text), teachRaw: findTeach(teachIdx, seg.text, entry.raw) })
            }}
            className="font-bold px-0.5 rounded"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white', font: 'inherit', fontWeight: 700,
              outline: open ? '2px solid var(--color-accent)' : undefined, outlineOffset: 1 }}
            aria-expanded={open}
            aria-label={`${seg.text} 뜻 보기${canSpeak ? '·발음 듣기' : ''}`}>{seg.text}</button>
        )
      }
      return <mark key={i} className="font-bold px-0.5 rounded" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>{seg.text}</mark>
    })

  // 긴 문맥 줄은 배우는 단어 앞뒤만 잘라 보여 줌(‘전체 보기’로 펼침)
  const renderContextLine = (line: string, ranges: Range[]) => {
    const LONG = 180
    if (line.length <= LONG || contextOpen || !ranges.length) {
      return (
        <>
          {renderSegments(line, ranges, 'context')}
          {line.length > LONG && contextOpen && (
            <button onClick={() => setContextOpen(false)} className="ml-1 text-xs underline" style={{ color: 'var(--color-text-tertiary)' }}>접기</button>
          )}
        </>
      )
    }
    const first = ranges[0]
    let start = Math.max(0, first.start - 70)
    if (start > 0) { const sp = line.lastIndexOf(' ', start); start = sp < 0 ? 0 : sp + 1 }
    let end = Math.min(line.length, first.end + 90)
    if (end < line.length) { const sp = line.indexOf(' ', end); end = sp < 0 ? line.length : sp }
    const part = line.slice(start, end)
    const partRanges = ranges.filter(r => r.start >= start && r.end <= end).map(r => ({ start: r.start - start, end: r.end - start }))
    return (
      <>
        {start > 0 && <span style={{ color: 'var(--color-text-tertiary)' }}>… </span>}
        {renderSegments(part, partRanges, 'context')}
        {end < line.length && <span style={{ color: 'var(--color-text-tertiary)' }}> …</span>}
        <button onClick={() => setContextOpen(true)} className="ml-1 text-xs underline whitespace-nowrap" style={{ color: 'var(--color-text-tertiary)' }}>전체 문장 보기</button>
      </>
    )
  }

  const primaryAction =
    isQuizType && !showResult ? { label: '확인', onClick: handleCheckQuiz, disabled: selected === null }
    : isArrange && !showResult ? { label: '확인', onClick: handleCheckArrange, disabled: arrangeOrder.length < (isArrange ? step.blocks.length : 0) }
    : isWriting && !writingChecked ? { label: '정답 확인', onClick: handleRevealWriting, disabled: false }
    : { label: !virtual && stepIdx + 1 >= entries.length ? '완료 🪷' : '다음 →', onClick: handleNext, disabled: false }
  const showSkip = (isQuizType || isArrange) ? !showResult : isWriting ? !writingChecked : false
  const disabledHint =
    primaryAction.disabled && isQuizType ? '보기를 하나 고른 뒤 확인을 눌러 주세요'
    : primaryAction.disabled && isArrange ? '블록을 모두 놓은 뒤 확인을 눌러 주세요'
    : ''

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* === 머리줄 === */}
      <header className="sticky top-0 z-30 shrink-0 px-2 pt-2 pb-2" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex items-center gap-1 min-w-0">
          <button onClick={() => { stopSpeech(); nav('/') }} aria-label="레슨 나가기"
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full text-lg active:scale-90 transition-transform"
            style={{ color: 'var(--color-text-secondary)' }}>✕</button>
          <span className="min-w-0 truncate text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, var(--color-surface))', color: 'var(--color-primary)', border: '1px solid var(--color-border-light)' }}>
            {getLessonTitle(lid)}
          </span>
          <span className="ml-auto shrink-0 text-xs tabular-nums px-1" style={{ color: 'var(--color-text-tertiary)' }}>
            {/* 긴 과는 진도 막대 아래에 '마디' 기준으로 보여 줌 */}
            {!useMadi && <>{stepIdx + 1} / {entries.length}</>}
          </span>
          <button onClick={() => setShowTOC(true)} aria-label="단계 목차 열기" aria-haspopup="dialog"
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full active:scale-90 transition-transform"
            style={{ color: 'var(--color-text-secondary)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          {!easy && (
          <span className="shrink-0 flex items-center gap-0.5 pr-1" role="img" aria-label={`연꽃잎 ${hearts}개 남음 (최대 ${MAX_HEARTS}개)`}>
            <LotusHeart active shake={heartShake} size={22} />
            <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--color-primary)' }}>×{hearts}</span>
          </span>
          )}
        </div>
        {/* 진도 막대 — 머리줄 아래 전체 폭. 누르거나 끌어서 원하는 단계로 이동 */}
        <div className="px-2 pt-1.5">
          {useMadi && (
            // 마디 안에서의 진도 — 다른 마디로는 목차에서 이동
            <ScrubBar
              total={madiRange.last - madiRange.first + 1}
              current={stepIdx - madiRange.first}
              onSeek={i => goToStep(madiRange.first + i)}
              getLabel={i => stepLabel(entries[madiRange.first + i].step, madiRange.first + i)}
              fillColor="var(--color-primary)"
              unitLabel={`${curMadi + 1}마디`}
            />
          )}
          {useMadi ? (
            <p className="text-xs mt-1.5 text-center tabular-nums" style={{ color: 'var(--color-text-tertiary)' }}>
              {madi.ranges.length}마디 중 {curMadi + 1} · 이 마디 {stepIdx - madiRange.first + 1}/{madiRange.last - madiRange.first + 1}
              <span className="sr-only"> (전체 {stepIdx + 1}/{entries.length}단계)</span>
            </p>
          ) : (
            <ScrubBar
              total={entries.length}
              current={stepIdx}
              onSeek={goToStep}
              getLabel={i => stepLabel(entries[i].step, i)}
              fillColor="var(--color-primary)"
              marks={entries.length > 40 ? sections.map(s => s.start) : undefined}
            />
          )}
        </div>
      </header>

      {showTOC && (
        <StepTOC
          entries={entries}
          sections={sections}
          current={stepIdx}
          onPick={i => { goToStep(i); setShowTOC(false) }}
          onClose={() => setShowTOC(false)}
        />
      )}

      {/* 소단원 완료 등 짧은 알림 */}
      {toast && (
        <div role="status" className="fixed left-1/2 z-40 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
          style={{ top: 76, transform: 'translateX(-50%)', backgroundColor: 'var(--color-accent)', color: '#fff', maxWidth: '90vw' }}>
          {toast}
        </div>
      )}

      <main className="flex-1 flex flex-col px-4 pt-2">
        {virtual && (
          <p className="self-start text-xs font-bold mb-3 px-3 py-1 rounded-full"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))', color: 'var(--color-accent)' }}>
            {virtual.purpose === 'check'
              ? `🌱 방금 배운 낱말 확인 ${virtual.idx + 1}/${virtual.items.length}`
              : `🔁 틀린 문제 다시 풀기 ${virtual.idx + 1}/${virtual.items.length}`}
            <span className="font-normal" style={{ color: 'var(--color-text-tertiary)' }}> · 연꽃잎은 줄지 않아요</span>
          </p>
        )}
        {step.type === 'intro' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
            <span className="text-6xl mb-4" aria-hidden="true">{step.icon}</span>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{step.title}</h1>
            <p className="pali-font mt-1" lang="pi" style={{ color: 'var(--color-text-secondary)', fontSize: 'calc(var(--pali-fontsize, 18px) * 0.8)' }}>{step.subtitle}</p>
            <p className="text-sm mt-6 whitespace-pre-line leading-relaxed">{step.description}</p>
          </div>
        )}

        {step.type === 'teach' && (() => {
          const ranges = step.verseLine && !step.noVerseHighlight
            ? teachRanges(step.verseLine, step.formInVerse ?? step.word, step.occurrence) : []
          const hasGrammarNote = !!(step.baseForm || step.formNote)
          const hasExtra = hasGrammarNote || !!step.buddhism
          const showExtra = depth === 'detail' || foldOpen
          return (
            <div className="flex-1 flex flex-col pt-1">
              <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-primary)' }}>
                <span className="text-3xl" aria-hidden="true">{step.icon}</span>
                <p className="pali-font font-bold mt-2 break-words" lang="pi" style={{ color: 'var(--color-primary)', fontSize: 'calc(var(--pali-fontsize, 18px) * 1.65)' }}>{step.word}</p>
                {step.label && <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>{step.label}</p>}
                <p className="text-sm mt-1 font-medium">{step.pronKo}</p>
                {step.audio && canSpeak && (
                  <button onClick={() => speak(step.word)} className="mt-2 px-4 py-2 rounded-full text-xs text-white" style={{ backgroundColor: 'var(--color-accent)' }}>🔊 발음</button>
                )}
                <hr className="my-3" style={{ borderColor: 'var(--color-border)' }} />
                <p className="text-lg font-bold">{step.meaning}</p>
                {step.grammar && <GrammarChip grammar={step.grammar} />}
              </div>
              {step.verseLine && (
                <div className="rounded-xl p-3 mt-3" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <p className="text-[10px] font-semibold mb-1" style={{ color: 'var(--color-text-tertiary)' }}>경전 속 문장</p>
                  <p className="pali-font leading-relaxed whitespace-pre-line" lang="pi" style={{ fontSize: 'calc(var(--pali-fontsize, 18px) * 0.85)' }}>
                    {renderContextLine(step.verseLine, ranges)}
                  </p>
                  {step.verseLineKo && <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{step.verseLineKo}</p>}
                </div>
              )}
              {/* 원형·형태·불교 해설 — '쉽게'(기본)에서는 접어 둠 */}
              {hasExtra && depth === 'easy' && (
                <FoldToggle open={foldOpen} onToggle={() => setFoldOpen(o => !o)}
                  label={hasGrammarNote && step.buddhism ? '📐 문법·해설 더 보기' : hasGrammarNote ? '📐 문법 더 보기' : '☸️ 해설 더 보기'} />
              )}
              {showExtra && hasGrammarNote && (
                <div className="mt-2 rounded-xl p-3 text-xs" style={{ backgroundColor: C.infoBg, border: `1px solid ${C.infoBorder}` }}>
                  {step.baseForm && <p className="font-bold">📐 원형: {step.baseForm}</p>}
                  {step.formNote && <p className="mt-1 whitespace-pre-line" style={{ color: 'var(--color-text-secondary)' }}>{step.formNote}</p>}
                </div>
              )}
              {showExtra && step.buddhism && <div className="mt-2 rounded-xl p-3 text-xs" style={{ backgroundColor: C.okBg, border: `1px solid ${C.okBorder}` }}>☸️ {step.buddhism}</div>}
            </div>
          )
        })()}

        {step.type === 'match-listen' && (
          <div className="flex-1 flex flex-col">
            <p className="text-sm font-bold mb-3">{step.instruction}</p>
            {canSpeak ? (
              <button onClick={() => speak(step.word)} aria-label="소리 듣기"
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl active:scale-95 mb-4"
                style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>🔊</button>
            ) : (
              <p className="text-center text-2xl font-bold mb-4" lang="pi" style={{ color: 'var(--color-primary)', fontSize: 'calc(var(--pali-fontsize, 18px) * 1.35)' }}>{step.word}</p>
            )}
            {renderOptions()}
          </div>
        )}

        {step.type === 'match-reverse' && (
          <div className="flex-1 flex flex-col">
            <p className="text-sm font-bold mb-4">{step.instruction}</p>
            {renderOptions()}
          </div>
        )}

        {step.type === 'quiz' && (
          <div className="flex-1 flex flex-col">
            <p className="text-base font-bold mb-4">{step.question}</p>
            {step.hint && !showResult && <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>💡 {step.hint}</p>}
            {renderOptions()}
          </div>
        )}

        {step.type === 'verse' && (
          <div className="flex-1 flex flex-col">
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="pali-font leading-relaxed whitespace-pre-line" lang="pi" style={{ fontSize: 'calc(var(--pali-fontsize, 18px) * 1.0)' }}>
                {renderSegments(step.pali, verseRanges(step.pali, step.highlight), 'verse')}
              </p>
              {canSpeak && (
                <div className="mt-2 flex flex-wrap gap-x-4">
                  <button onClick={() => speakPali(step.pali)} className="py-1 text-xs" style={{ color: 'var(--color-accent)' }}>🔊 전체 듣기</button>
                  {verseTexts.length > 1 && (
                    <button onClick={playAll} className="py-1 text-xs font-medium" style={{ color: 'var(--color-accent)' }} aria-pressed={!!seq}>
                      {seq ? '■ 이어 듣기 멈춤' : '🎧 이 과 전체 이어 듣기'}
                    </button>
                  )}
                </div>
              )}
              {seq && (
                <div className="mt-2 rounded-lg px-3 py-2 text-xs" role="status"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, var(--color-surface))' }}>
                  <p className="font-bold" style={{ color: 'var(--color-accent)' }}>🎧 이어 듣는 중 · 구절 {seq.idx + 1}/{seq.total}</p>
                  <p className="pali-font mt-0.5 truncate" lang="pi" style={{ color: 'var(--color-text-secondary)' }}>{verseTexts[seq.idx]}</p>
                </div>
              )}
              <p className="text-xs mt-2" style={{ color: 'var(--color-primary)', opacity: 0.8 }}>🗣️ {step.pronKo}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{step.translation}</p>
              {!wordNote && verseRanges(step.pali, step.highlight).length > 0 && (
                <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-tertiary)' }}>💡 색칠된 낱말을 누르면 뜻을 다시 볼 수 있어요</p>
              )}
            </div>
            {wordNote && (() => {
              const t = wordNote.teachRaw !== null ? rawSteps[wordNote.teachRaw] : lookupGloss(wordNote.text)
              return (
                <WordNote text={wordNote.text} teach={t && t.type === 'teach' ? t : null} canSpeak={canSpeak}
                  onSpeak={() => speak(wordNote.text)} onClose={() => setWordNote(null)} />
              )
            })()}
            {step.note && <div className="mt-2 rounded-xl p-3 text-xs" style={{ backgroundColor: C.noteBg, border: `1px solid ${C.noteBorder}` }}>{step.note}</div>}
          </div>
        )}

        {/* 따라 읽기 — 녹음·인식은 하지 않음. 듣고, 소리 내어 읽고, '다 읽었어요'를 누름 */}
        {step.type === 'speak' && (
          <div className="flex-1 flex flex-col items-center text-center pt-6">
            <p className="text-sm mb-4">🗣️ 소리 내어 따라 읽어 보세요</p>
            <div className="rounded-2xl p-5 w-full" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="pali-font font-semibold whitespace-pre-line" lang="pi" style={{ color: 'var(--color-primary)', fontSize: 'calc(var(--pali-fontsize, 18px) * 0.95)' }}>{step.pali}</p>
              <p className="text-sm mt-2 font-medium">{step.pronKo}</p>
            </div>
            <div className="mt-5 flex gap-3 w-full">
              {canSpeak && (
                <button onClick={() => speakPali(step.pali)}
                  className="flex-1 py-3 rounded-xl text-white text-sm font-bold active:scale-[0.97]" style={{ backgroundColor: 'var(--color-accent)' }}>
                  🔊 전체 듣기
                </button>
              )}
              <button onClick={handleNext}
                className="flex-1 py-3 rounded-xl text-sm font-bold active:scale-[0.97]"
                style={{ border: '2px solid var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'var(--color-surface)' }}>
                ✓ 다 읽었어요
              </button>
            </div>
            <p className="text-xs mt-3" style={{ color: 'var(--color-text-secondary)' }}>
              {canSpeak ? '먼저 듣고, 소리 내어 읽은 뒤 ‘다 읽었어요’를 누르세요.' : '소리 내어 읽은 뒤 ‘다 읽었어요’를 누르세요. (이 기기에서는 소리 듣기를 쓸 수 없습니다)'}
            </p>
          </div>
        )}

        {step.type === 'teach-grammar' && (
          <div className="flex-1 flex flex-col items-center px-2 pt-4">
            <span className="text-4xl mb-3" aria-hidden="true">📐</span>
            <h2 className="text-lg font-bold">{step.title}</h2>
            <div className="mt-4 rounded-2xl p-4 w-full" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="pali-font font-bold text-center whitespace-pre-line" lang="pi" style={{ color: 'var(--color-primary)', fontSize: 'calc(var(--pali-fontsize, 18px) * 1.0)' }}>{step.example}</p>
              <p className="text-center mt-1 font-semibold whitespace-pre-line">{step.exampleKo}</p>
            </div>
            <div className="mt-3 rounded-xl p-3 w-full text-sm whitespace-pre-line" style={{ backgroundColor: C.infoBg, border: `1px solid ${C.infoBorder}` }}>{step.explanation}</div>
          </div>
        )}

        {/* 쓰기 — 손글씨는 채점하지 않음. '정답 확인'으로 정답과 비교(감점 없음) */}
        {step.type === 'writing' && (
          <div className="flex-1 flex flex-col">
            <p className="text-base font-bold mb-2">✍️ {step.instruction}</p>
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              뜻: {step.meaning} · 발음: {step.pronKo}
            </p>
            {canSpeak && (
              <button onClick={() => speak(step.answer)}
                className="text-xs mb-2 py-1 flex items-center gap-1 self-start" style={{ color: 'var(--color-accent)' }}>
                🔊 발음 듣기
              </button>
            )}
            {step.hint && !writingChecked && (
              <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>💡 힌트: {step.hint}</p>
            )}

            {/* 손글씨 캔버스 — 단계마다 새로 그림 */}
            <WritingCanvas key={entry.raw} />

            {writingChecked ? (
              <div className="mt-3 rounded-xl p-3 text-center" style={{ backgroundColor: C.okBg, border: `1px solid ${C.okBorder}` }}>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>정답 — 내 글씨와 비교해 보세요</p>
                <p className="pali-font font-bold mt-1" lang="pi" style={{ color: 'var(--color-primary)', fontSize: 'calc(var(--pali-fontsize, 18px) * 1.35)' }}>{step.answer}</p>
              </div>
            ) : (
              <p className="mt-2 text-xs text-center" style={{ color: 'var(--color-text-tertiary)' }}>다 쓰면 아래 ‘정답 확인’을 눌러 비교해 보세요.</p>
            )}
          </div>
        )}

        {/* 문장 배열 */}
        {step.type === 'arrange' && (
          <div className="flex-1 flex flex-col">
            <p className="text-base font-bold mb-2">🧩 {step.instruction}</p>
            <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>{step.translation}</p>

            {/* 배치 슬롯 — 결과가 나온 뒤에는 빼지 못함 */}
            <div className="flex flex-wrap gap-2 p-3 min-h-14 rounded-xl mb-4"
              style={{ backgroundColor: 'var(--color-surface)', border: '2px dashed var(--color-border)' }}>
              {arrangeOrder.map((idx, i) => (
                <button key={i} onClick={() => !showResult && setArrangeOrder(o => o.filter((_, j) => j !== i))}
                  disabled={showResult}
                  className="pali-font px-3 py-2 rounded-lg font-medium active:scale-95"
                  lang="pi"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'calc(var(--pali-fontsize, 18px) * 0.8)' }}>
                  {step.blocks[idx]}
                </button>
              ))}
              {arrangeOrder.length === 0 && (
                <p className="text-xs self-center mx-auto" style={{ color: 'var(--color-text-tertiary)' }}>아래 블록을 차례로 눌러 배열하세요</p>
              )}
            </div>

            {/* 블록 */}
            <div className="flex flex-wrap gap-2">
              {step.blocks.map((block, i) => (
                <button key={i}
                  onClick={() => !arrangeOrder.includes(i) && !showResult && setArrangeOrder(o => [...o, i])}
                  disabled={arrangeOrder.includes(i) || showResult}
                  className="pali-font px-3 py-2 rounded-lg font-medium transition-all active:scale-95"
                  lang="pi"
                  style={{
                    backgroundColor: arrangeOrder.includes(i) ? 'var(--color-border)' : 'var(--color-surface)',
                    border: '2px solid var(--color-border)',
                    opacity: arrangeOrder.includes(i) ? 0.3 : 1,
                    fontSize: 'calc(var(--pali-fontsize, 18px) * 0.8)',
                    color: 'var(--color-text)',
                  }}>
                  {block}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mt-3 rounded-xl p-3" role="status" style={{ backgroundColor: arrangeCorrect ? C.okBg : C.errBg }}>
                <p className="text-sm font-bold">
                  {arrangeCorrect ? '✅ Sādhu! 정확합니다!' : `❌ 정답: ${step.correctOrder.map(i => step.blocks[i]).join(' ')}`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 아래 막대·메모 버튼에 가리지 않도록 여백 */}
        <div aria-hidden="true" style={{ minHeight: barH + 72 }} />
      </main>

      {/* === 아래 막대 (레슨 화면에서는 하단 메뉴가 숨겨지므로 바닥에 붙임) === */}
      <div ref={barRef} className="fixed bottom-0 left-0 right-0 z-30 px-4 pt-2 max-w-[430px] mx-auto"
        style={{ backgroundColor: 'var(--color-bg)', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)', borderTop: '1px solid var(--color-border-light)' }}>
        {showResult && isQuizType && (
          <div className="rounded-xl p-2.5 mb-2 overflow-y-auto" role="status" style={{ backgroundColor: isCorrectAnswer ? C.okBg : C.errBg, maxHeight: '32vh' }}>
            <p className="text-sm font-bold">{isCorrectAnswer ? '✅ Sādhu! 정답!' : '❌ 틀렸습니다 — 괜찮아요, 정답을 함께 볼까요?'}</p>
            {!isCorrectAnswer && (
              <WrongExplain teach={wrongTeach} hint={step.type === 'quiz' ? step.hint : undefined}
                answer={wrongTeach && (normPali(wrongTeach.word) === normPali(answerText) || wrongTeach.meaning === answerText) ? undefined : answerText} />
            )}
          </div>
        )}
        {disabledHint && (
          <p className="text-[11px] text-center mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>{disabledHint}</p>
        )}
        <div className="flex gap-2">
          {stepIdx > 0 && !virtual && (
            <button onClick={handlePrev} className="px-4 py-3.5 rounded-xl font-bold text-sm active:scale-[0.97]"
              style={{ border: '2px solid var(--color-border)' }}>← 이전</button>
          )}
          <button onClick={primaryAction.onClick} disabled={primaryAction.disabled}
            className="flex-1 py-3.5 rounded-xl text-white font-bold text-base active:scale-[0.97] disabled:active:scale-100"
            style={{ backgroundColor: 'var(--color-primary)', opacity: primaryAction.disabled ? 0.45 : 1, cursor: primaryAction.disabled ? 'not-allowed' : undefined }}>
            {primaryAction.label}
          </button>
          {showSkip && (
            <button onClick={handleNext} className="px-3 py-3.5 rounded-xl text-xs"
              style={{ color: 'var(--color-text-secondary)' }}>건너뛰기</button>
          )}
        </div>
      </div>

      {/* 메모 버튼 — 아래 막대 바로 위, 학습 칸(430px) 오른쪽 (쉬운 화면에서는 숨김) */}
      {!easy && <button
        onClick={() => { setEditMemo(null); setShowMemo(true) }}
        className="fixed rounded-full flex items-center justify-center active:scale-90 z-40"
        style={{
          bottom: barH + 12,
          right: 'max(16px, calc((100vw - 430px) / 2 + 16px))',
          width: 48, height: 48,
          backgroundColor: 'var(--color-primary)', color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.28)',
        }}
        aria-label="메모"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      </button>}

      {/* 메모 창 — 빠알리 프라이머와 같은 모양 (위치는 원본 데이터 기준 단계 번호) */}
      <MemoModal
        open={showMemo}
        onClose={() => { setShowMemo(false); setEditMemo(null); setMemoVer(v => v + 1) }}
        editMemo={editMemo}
      />
    </div>
  )
}

// ───────────────────────── 단계 목차 ─────────────────────────

function StepTOC({ entries, sections, current, onPick, onClose }: {
  entries: Entry[]
  sections: { start: number; end: number; title: string }[]
  current: number
  onPick: (i: number) => void
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const currentRef = useRef<HTMLButtonElement>(null)
  const grouped = entries.length > 60 && sections.length > 1
  const curSection = sections.findIndex(s => current >= s.start && current <= s.end)
  const [open, setOpen] = useState<Set<number>>(() => new Set([curSection]))

  const onCloseRef = useRef(onClose)
  useEffect(() => { onCloseRef.current = onClose }, [onClose])
  useEffect(() => {
    const onClose = () => onCloseRef.current()
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    // 열릴 때 현재 단계가 가운데 오도록
    requestAnimationFrame(() => currentRef.current?.scrollIntoView({ block: 'center' }))
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
      if (e.key === 'Tab' && dialogRef.current) {
        // 포커스를 목차 안에 가둠
        const f = dialogRef.current.querySelectorAll<HTMLElement>('button')
        if (!f.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.() }
  }, [])

  const item = (i: number) => {
    const s = entries[i].step
    const isCur = i === current
    return (
      <button key={i} ref={isCur ? currentRef : undefined}
        onClick={() => onPick(i)}
        aria-current={isCur ? 'step' : undefined}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 active:scale-[0.98]"
        style={{
          backgroundColor: isCur ? 'color-mix(in srgb, var(--color-primary) 10%, var(--color-surface))' : 'transparent',
          border: isCur ? '1px solid var(--color-primary)' : '1px solid transparent',
        }}>
        <span className="text-sm shrink-0" aria-hidden="true">{typeIcon(s)}</span>
        <span className="text-xs font-medium truncate flex-1" style={{ color: isCur ? 'var(--color-primary)' : 'var(--color-text)' }}>
          {i + 1}. {stepLabel(s, i)}
        </span>
        {isCur && <span className="text-[10px] font-bold shrink-0" style={{ color: 'var(--color-primary)' }}>현재</span>}
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="toc-title"
        className="w-full max-w-lg rounded-t-3xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)', maxHeight: '75vh' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h3 id="toc-title" className="text-base font-bold">단계 목차 <span className="text-xs font-normal" style={{ color: 'var(--color-text-tertiary)' }}>{current + 1} / {entries.length}</span></h3>
          <button ref={closeRef} onClick={onClose} aria-label="목차 닫기"
            className="w-11 h-11 flex items-center justify-center rounded-full active:scale-90 transition-transform"
            style={{ color: 'var(--color-text-secondary)' }}>✕</button>
        </div>
        <div className="overflow-y-auto px-3" style={{ maxHeight: 'calc(75vh - 64px)', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}>
          {!grouped && entries.map((_, i) => item(i))}
          {grouped && sections.map((sec, si) => {
            const isOpen = open.has(si)
            return (
              <div key={si} className="mb-1">
                <button
                  onClick={() => setOpen(o => { const n = new Set(o); if (n.has(si)) n.delete(si); else n.add(si); return n })}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left"
                  style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border-light)' }}>
                  <span className="text-xs shrink-0" aria-hidden="true">{isOpen ? '▾' : '▸'}</span>
                  <span className="text-xs font-bold truncate flex-1" style={{ color: si === curSection ? 'var(--color-primary)' : 'var(--color-text)' }}>{sec.title}</span>
                  <span className="text-[10px] shrink-0 tabular-nums" style={{ color: 'var(--color-text-tertiary)' }}>{sec.start + 1}–{sec.end + 1}</span>
                </button>
                {isOpen && (
                  <div className="pl-2 pt-1">
                    {Array.from({ length: sec.end - sec.start + 1 }, (_, k) => item(sec.start + k))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// 현재 step에서 메모 anchor용 식별 정보 추출
function buildSnapshot(step: Step): StepSnapshot {
  const snap: StepSnapshot = { stepType: step.type }
  if ('word' in step) snap.word = step.word
  if ('pali' in step) snap.pali = step.pali
  if ('question' in step) snap.question = step.question
  if ('title' in step) snap.title = step.title
  if ('instruction' in step) snap.instruction = step.instruction
  return snap
}
