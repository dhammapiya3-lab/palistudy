// 독송문 외우기 — 한 줄씩: ① 듣고 따라 읽기 → ② 첫 글자만 보고 읽기 → ③ 모두 가리고 읽기 → ④ 다음 낱말 고르기
// 레슨 데이터의 구절(verse)을 줄 단위로 나눠 씀(데이터는 바꾸지 않음).
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { loadLesson, hasLessonData } from '../lessons/lesson-registry'
import { speakPali, stopSpeech, ttsAvailable } from '../../utils/pali-tts'
import { bare, buildLines, lineWords, type Line } from './recite-lines'
import { LESSON_META, canonicalLessonId, isReciteLesson } from '../../utils/lessons-meta'

const STAGES = [
  { key: 'listen', label: '듣고 따라 읽기', tip: '🔊를 눌러 듣고, 소리 내어 따라 읽어 보세요.' },
  { key: 'initial', label: '첫 글자만 보고', tip: '첫 글자만 보고 소리 내어 읽어 보세요. 막히면 낱말을 누르면 보여요.' },
  { key: 'hidden', label: '모두 가리고', tip: '모두 가렸어요. 외워서 읽어 보세요. 막히면 낱말을 누르세요.' },
  { key: 'pick', label: '다음 낱말 고르기', tip: '이어지는 낱말을 차례로 골라 보세요.' },
] as const

export default function Recite() {
  const { lessonId = '' } = useParams<{ lessonId: string }>()
  const lid = canonicalLessonId(lessonId)
  const nav = useNavigate()
  const [lines, setLines] = useState<Line[] | null>(null)
  const [error, setError] = useState(false)
  const [lineIdx, setLineIdx] = useState(0)
  const [stage, setStage] = useState(0)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [picked, setPicked] = useState(0) // 고르기 단계에서 맞힌 낱말 수
  const [wrongPick, setWrongPick] = useState<string | null>(null)
  const canSpeak = ttsAvailable()
  const valid = hasLessonData(lid) && isReciteLesson(lid)

  useEffect(() => {
    if (!valid) return
    let alive = true
    loadLesson(lid).then(steps => { if (alive) setLines(buildLines(steps)) }).catch(() => alive && setError(true))
    return () => { alive = false; stopSpeech() }
  }, [lid, valid])

  const line = lines?.[lineIdx]
  const words = useMemo(() => line ? lineWords(line.pali) : [], [line])

  // 고르기 단계 보기: 정답 + 이 과의 다른 낱말 2개
  const pool = useMemo(() => {
    const all = new Map<string, string>()
    for (const l of lines ?? []) for (const w of l.pali.split(/\s+/)) if (bare(w)) all.set(bare(w), w.replace(/[.,;:!?'"‘’“”—–()]/g, ''))
    return [...all.values()]
  }, [lines])
  const options = useMemo(() => {
    if (stage !== 3 || picked >= words.length) return []
    const ans = words[picked].replace(/[.,;:!?'"‘’“”—–()]/g, '')
    const others = pool.filter(w => bare(w) !== bare(ans))
    const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 2)
    return [ans, ...shuffled].sort(() => Math.random() - 0.5)
  }, [stage, picked, words, pool])

  const close = () => {
    stopSpeech()
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (idx > 0) nav(-1)
    else nav('/review', { replace: true })
  }

  if (!valid || error) {
    return (
      <Frame title="독송문 외우기" onClose={() => nav('/review', { replace: true })}>
        <div className="text-center pt-20 px-6">
          <p className="text-lg font-bold mb-2">{error ? '불러오지 못했어요' : '외우기를 할 수 없는 과예요'}</p>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            {error ? '인터넷 연결을 확인한 뒤 다시 열어 주세요.' : '독송문 과(나모땃사·삼귀의·오계·삼보공덕·자애경·축복경·보배경)에서 쓸 수 있어요.'}
          </p>
          <button onClick={() => nav('/review', { replace: true })} className="px-6 py-3 rounded-xl text-white font-bold"
            style={{ background: 'var(--color-primary-gradient)' }}>복습 탭으로</button>
        </div>
      </Frame>
    )
  }

  const meta = LESSON_META[lid]
  if (!lines || !line) {
    return <Frame title={`${meta.title} 외우기`} onClose={close}><p className="text-sm text-center pt-20" role="status" style={{ color: 'var(--color-text-secondary)' }}>불러오는 중…</p></Frame>
  }

  const resetLineState = () => { setRevealed(new Set()); setPicked(0); setWrongPick(null) }
  const goStage = (s: number) => { stopSpeech(); setStage(s); resetLineState() }
  const goLine = (i: number) => { stopSpeech(); setLineIdx(i); setStage(0); resetLineState() }
  const isLast = lineIdx === lines.length - 1
  const lineDone = stage === 3 && picked >= words.length

  const choose = (w: string) => {
    if (bare(w) === bare(words[picked])) {
      setPicked(p => p + 1); setWrongPick(null)
    } else {
      setWrongPick(w)
    }
  }

  // 낱말 하나 그리기 (단계에 따라 가림)
  const renderWord = (w: string, i: number) => {
    const shown = stage === 0 || revealed.has(i) || (stage === 3 && i < picked)
    if (stage === 3 && i >= picked) {
      return <span key={i} className="inline-block rounded px-1.5 mx-0.5 my-1 align-middle" aria-label="가린 낱말"
        style={{ backgroundColor: i === picked ? 'color-mix(in srgb, var(--color-primary) 18%, transparent)' : 'var(--color-border-light)', minWidth: '2.5em', height: '1.4em' }} />
    }
    if (shown) return <span key={i} className="mx-0.5">{w}</span>
    const masked = stage === 1 ? w[0] + '‧'.repeat(Math.max(1, bare(w).length - 1)) : '‧'.repeat(Math.max(2, bare(w).length))
    return (
      <button key={i} onClick={() => { setRevealed(r => new Set(r).add(i)); speakPali(w) }}
        className="mx-0.5 rounded px-1 underline decoration-dotted underline-offset-4"
        aria-label={`가린 낱말 ${i + 1} 보기`} style={{ color: 'var(--color-primary)' }}>
        {masked}
      </button>
    )
  }

  return (
    <Frame title={`${meta.icon} ${meta.title} 외우기`} onClose={close}>
      {/* 줄 진행 */}
      <div className="px-4 max-w-lg mx-auto">
        <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
          <span>{lineIdx + 1} / {lines.length}줄</span>
          <span>{STAGES[stage].label} ({stage + 1}/4)</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border-light)' }} aria-hidden="true">
          <div className="h-full rounded-full" style={{ width: `${((lineIdx * 4 + stage + (lineDone ? 1 : 0)) / (lines.length * 4)) * 100}%`, background: 'var(--color-primary)' }} />
        </div>

        {/* 단계 고르기 */}
        <div className="grid grid-cols-4 gap-1.5 mt-3" role="tablist" aria-label="외우기 단계">
          {STAGES.map((s, i) => (
            <button key={s.key} role="tab" aria-selected={stage === i} onClick={() => goStage(i)}
              className="py-2 rounded-lg text-[11px] font-semibold leading-tight"
              style={{
                backgroundColor: stage === i ? 'var(--color-primary)' : 'var(--color-surface)',
                color: stage === i ? '#fff' : 'var(--color-text-secondary)',
                border: stage === i ? 'none' : '1px solid var(--color-border)',
              }}>
              {i + 1}. {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5 pb-36 max-w-lg mx-auto">
        <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>{STAGES[stage].tip}</p>

        <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p lang="pi" className="pali-text text-xl font-semibold leading-loose" style={{ color: 'var(--color-text)' }}>
            {words.map(renderWord)}
          </p>
          {stage === 0 && line.pronKo && <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>[{line.pronKo}]</p>}
          {(stage === 0 || lineDone) && <p className="text-sm mt-3 pt-3" style={{ borderTop: '1px solid var(--color-border-light)' }}>{line.ko}</p>}
          {canSpeak && (
            <button onClick={() => speakPali(line.pali)} className="mt-3 text-sm font-semibold py-1.5" style={{ color: 'var(--color-accent)' }}>
              🔊 이 줄 듣기
            </button>
          )}
        </div>

        {/* 다음 낱말 고르기 */}
        {stage === 3 && !lineDone && (
          <div className="mt-5">
            <p className="text-sm font-semibold mb-2">{picked + 1}번째 낱말은?</p>
            <div className="grid grid-cols-1 gap-2">
              {options.map(o => (
                <button key={o} onClick={() => choose(o)} lang="pi"
                  className="w-full py-3.5 rounded-xl pali-font text-lg font-semibold active:scale-[0.98]"
                  style={{
                    backgroundColor: wrongPick === o ? 'color-mix(in srgb, var(--color-error) 10%, var(--color-surface))' : 'var(--color-surface)',
                    border: wrongPick === o ? '2px solid var(--color-error)' : '1.5px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}>
                  {o}
                </button>
              ))}
            </div>
            {wrongPick && <p className="text-xs mt-2" role="status" style={{ color: 'var(--color-error)' }}>다른 낱말이에요. 🔊 줄을 다시 들어 보세요.</p>}
          </div>
        )}
        {lineDone && (
          <p className="mt-4 text-center font-bold" role="status" style={{ color: 'var(--color-accent)' }}>🪷 이 줄을 다 외웠어요!</p>
        )}
      </div>

      {/* 아래 단추 */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pt-3 bottom-bar-frost" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 14px)' }}>
        <div className="flex gap-2 max-w-lg mx-auto">
          <button onClick={() => stage > 0 ? goStage(stage - 1) : lineIdx > 0 && goLine(lineIdx - 1)}
            disabled={stage === 0 && lineIdx === 0}
            className="px-4 py-3.5 rounded-xl font-bold disabled:opacity-40"
            style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
            ← 이전
          </button>
          {stage < 3 ? (
            <button onClick={() => goStage(stage + 1)} className="flex-1 py-3.5 rounded-xl text-white font-bold"
              style={{ background: 'var(--color-primary-gradient)' }}>
              다음: {STAGES[stage + 1].label} →
            </button>
          ) : isLast ? (
            <button onClick={close} disabled={!lineDone} className="flex-1 py-3.5 rounded-xl text-white font-bold disabled:opacity-50"
              style={{ background: 'var(--color-primary-gradient)' }}>
              {lineDone ? '🪷 다 외웠어요 · 마치기' : '낱말을 끝까지 골라 주세요'}
            </button>
          ) : (
            <button onClick={() => goLine(lineIdx + 1)} className="flex-1 py-3.5 rounded-xl text-white font-bold"
              style={{ background: lineDone ? 'var(--color-primary-gradient)' : 'var(--color-primary)', opacity: lineDone ? 1 : 0.85 }}>
              {lineDone ? '다음 줄 →' : '이 줄 건너뛰기 →'}
            </button>
          )}
        </div>
      </div>
    </Frame>
  )
}

function Frame({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="min-h-dvh" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="flex items-center gap-2 px-3 pt-3 pb-2 max-w-lg mx-auto">
        <button onClick={onClose} aria-label="외우기 닫기" className="w-11 h-11 flex items-center justify-center rounded-full text-xl">✕</button>
        <h1 className="text-sm font-semibold flex-1 truncate">{title}</h1>
      </div>
      {children}
    </div>
  )
}
