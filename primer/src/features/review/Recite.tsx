// 독송 외우기 — 배운 경전 구절을 낱말을 점점 가리며 외우기 (예불 구절부터)
// 단계: 전부 보기 → 낱말 몇 개 빈칸 → 앞 글자만 → 전부 가림. 가린 낱말은 누르면 잠깐 보임.
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { speakPali, stopPali } from '../../utils/pali-tts'
import SubHeader from './SubHeader'
import { useStudyTimer } from './useStudyTimer'
import { collectVerses, loadStudied, shortTitle, type VerseEntry } from './review-data'

const LEVELS = [
  { label: '전부 보기', desc: '소리를 들으며 따라 읽어요' },
  { label: '몇 낱말 가림', desc: '빈칸을 떠올리며 읽어요' },
  { label: '앞 글자만', desc: '첫 글자를 보고 이어 말해요' },
  { label: '전부 가림', desc: '보지 않고 외워 말해요' },
]

/** 낱말 → [앞 문장부호, 낱말, 뒤 문장부호] */
function splitToken(t: string): [string, string, string] {
  const m = t.match(/^([^\p{L}]*)(.*?)([^\p{L}]*)$/u)
  return m ? [m[1], m[2], m[3]] : ['', t, '']
}

function maskWord(core: string, level: number, k: number): string | null {
  if (!core || level === 0) return null
  if (level === 1) return k % 3 === 1 ? '＿'.repeat(Math.min(6, Math.max(2, Math.ceil(core.length / 2)))) : null
  if (level === 2) return core.length <= 1 ? core : core[0] + '…'
  return '＿'.repeat(Math.min(6, Math.max(2, Math.ceil(core.length / 2))))
}

function Line({ text, level }: { text: string; level: number }) {
  const [shown, setShown] = useState<Record<number, boolean>>({})
  useEffect(() => { setShown({}) }, [level])
  let k = 0
  const tokens = text.split(/\s+/).filter(Boolean)
  return (
    <p lang="pi" className="pali-text text-xl leading-loose">
      {tokens.map((t, i) => {
        const [pre, core, post] = splitToken(t)
        const mask = core ? maskWord(core, level, k++) : null
        const hidden = mask !== null && !shown[i]
        return (
          <span key={i}>
            {pre}
            {hidden ? (
              <button onClick={() => setShown(s => ({ ...s, [i]: true }))} aria-label="가린 낱말 보기"
                className="px-1 rounded-md font-semibold"
                style={{ color: 'var(--color-text-tertiary)', backgroundColor: 'var(--color-surface-elevated)' }}>{mask}</button>
            ) : (
              <span className="font-semibold" style={{ color: mask !== null ? 'var(--color-accent)' : 'var(--color-primary)' }}>{core}</span>
            )}
            {post}{' '}
          </span>
        )
      })}
    </p>
  )
}

export default function Recite() {
  const nav = useNavigate()
  const progress = useStore(s => s.progress)
  const best = useStore(s => s.best)
  const completed = useStore(s => s.completed)
  const [verses, setVerses] = useState<VerseEntry[] | null>(null)
  const [cur, setCur] = useState<VerseEntry | null>(null)
  const [level, setLevel] = useState(0)
  const [showKo, setShowKo] = useState(true)
  useStudyTimer(!!cur)

  useEffect(() => {
    let alive = true
    const st = { progress, best, completed }
    loadStudied(st).then(ls => { if (alive) setVerses(collectVerses(ls, st)) }, () => alive && setVerses([]))
    return () => { alive = false; stopPali() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (cur) {
    const lines = cur.pali.split(/\n+/).filter(Boolean)
    const pron = cur.pronKo.split(/\n+/)
    return (
      <div className="min-h-screen pb-28" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <div className="max-w-lg mx-auto px-4">
          <SubHeader title="독송 외우기" sub={shortTitle(cur.lessonTitle)} onBack={() => { stopPali(); setCur(null); setLevel(0) }} />

          <div className="rounded-2xl p-5 card-shadow" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {lines.map((ln, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <Line text={ln} level={level} />
                {showKo && level === 0 && pron[i] && <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{pron[i]}</p>}
              </div>
            ))}
            {level === 0 && <p className="text-sm mt-3 pt-3" style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>{cur.translation}</p>}
          </div>

          <div className="flex gap-2 mt-3">
            <button onClick={() => speakPali(cur.pali)} className="flex-1 py-3 rounded-xl text-sm font-bold"
              style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border)', minHeight: 48 }}>🔊 듣고 따라 말하기</button>
            {level === 0 && (
              <button onClick={() => setShowKo(v => !v)} aria-pressed={showKo} className="px-4 rounded-xl text-xs font-semibold"
                style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border)', minHeight: 48 }}>한글 발음 {showKo ? '숨기기' : '보기'}</button>
            )}
          </div>

          <p className="text-xs mt-5 mb-2 font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
            {level + 1}/4단계 · {LEVELS[level].desc}
          </p>
          <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="가리는 정도">
            {LEVELS.map((l, i) => (
              <button key={i} onClick={() => setLevel(i)} aria-pressed={level === i}
                className="py-2 rounded-xl text-[11px] font-semibold"
                style={{
                  backgroundColor: level === i ? 'var(--color-primary-dark)' : 'var(--color-surface)',
                  color: level === i ? 'white' : 'var(--color-text)',
                  border: '1.5px solid ' + (level === i ? 'var(--color-primary-dark)' : 'var(--color-border)'),
                  minHeight: 44,
                }}>{l.label}</button>
            ))}
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-40 bottom-bar-frost" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="max-w-lg mx-auto px-4 py-3 flex gap-3">
              <button onClick={() => { stopPali(); setCur(null); setLevel(0) }} className="px-4 rounded-2xl text-sm font-semibold"
                style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-text-secondary)', minHeight: 48 }}>목록</button>
              <button onClick={() => { stopPali(); if (level < 3) setLevel(level + 1); else { setCur(null); setLevel(0) } }}
                className="flex-1 py-3.5 rounded-2xl text-white font-bold text-sm" style={{ backgroundColor: 'var(--color-primary-dark)', minHeight: 48 }}>
                {level < 3 ? `더 가리기 (${LEVELS[level + 1].label})` : '🪷 다 외웠어요'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="max-w-lg mx-auto px-4">
        <SubHeader title="독송 외우기" sub="배운 경전 구절을 가려 가며 외워요" />
        {verses === null && <p className="text-center text-sm py-16" role="status" style={{ color: 'var(--color-text-secondary)' }}>구절을 모으는 중…</p>}
        {verses && verses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm font-bold">아직 배운 경전 구절이 없어요</p>
            <p className="text-xs mt-1 mb-6" style={{ color: 'var(--color-text-secondary)' }}>자모와 발음(0과)에서 Namo tassa…를 읽고 나면 여기서 외울 수 있어요.</p>
            <button className="btn-primary px-6 py-3 text-sm" onClick={() => nav('/courses')}>과목으로 가기</button>
          </div>
        )}
        <ul className="space-y-2">
          {(verses || []).map(v => (
            <li key={v.key}>
              <button onClick={() => { setCur(v); setLevel(0) }} className="w-full text-left rounded-2xl px-4 py-3 active:scale-[0.98] transition-transform"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', minHeight: 48 }}>
                <p lang="pi" className="pali-text text-sm font-bold line-clamp-2" style={{ color: 'var(--color-primary)' }}>{v.pali.split('\n')[0]}</p>
                <p className="text-xs mt-1 line-clamp-1" style={{ color: 'var(--color-text-secondary)' }}>{v.translation}</p>
                <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-tertiary)' }}>{shortTitle(v.lessonTitle)}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
