// 오늘의 낱말 복습 — 틀린 문제 먼저, 그다음 뜻 고르기·듣고 고르기 (10개씩)
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { speakPali, stopSpeech, ttsAvailable } from '../../utils/pali-tts'
import { getLessonTitle } from '../../utils/lessons-meta'
import { buildSession, getDueSummary, recordAnswer, type ReviewItem } from '../../utils/word-review'

const C = {
  okBg: 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))',
  errBg: 'color-mix(in srgb, var(--color-error) 10%, var(--color-surface))',
}

export default function WordReview() {
  const nav = useNavigate()
  const [queue, setQueue] = useState<ReviewItem[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState({ ok: 0, ng: 0 })
  const graded = useRef(new Set<string>()) // 처음 푼 결과만 기록
  const [round, setRound] = useState(0)
  const soundOn = ttsAvailable() && localStorage.getItem('suttalog-sound') !== 'off'

  useEffect(() => {
    let alive = true
    setQueue(null)
    buildSession({ listenOk: soundOn }).then(items => {
      if (!alive) return
      setQueue(items); setIdx(0); setPicked(null); setScore({ ok: 0, ng: 0 }); graded.current = new Set()
    })
    return () => { alive = false; stopSpeech() }
  }, [round, soundOn])

  const item = queue?.[idx]

  // 듣고 고르기: 문제가 나오면 한 번 읽어 줌
  useEffect(() => {
    if (!item) return
    if (item.kind === 'listen') speakPali(item.word.word)
    else if (item.kind === 'wrong' && item.listen) speakPali(item.listen)
  }, [item])

  const close = () => { stopSpeech(); nav('/review') }

  if (!queue) {
    return (
      <Screen onClose={close} title="낱말 복습">
        <p className="text-sm text-center pt-20" role="status" style={{ color: 'var(--color-text-secondary)' }}>문제를 준비하는 중…</p>
      </Screen>
    )
  }

  // 끝 화면
  if (!item) {
    const left = getDueSummary().total
    const total = score.ok + score.ng
    return (
      <Screen onClose={close} title="낱말 복습">
        <div className="flex flex-col items-center text-center pt-12 px-4">
          <div className="text-6xl mb-4" aria-hidden="true">{total === 0 ? '🪷' : '🪷✨'}</div>
          <h2 className="text-xl font-bold mb-2">{total === 0 ? '오늘 복습할 낱말이 없어요' : 'Sādhu! 복습을 마쳤어요'}</h2>
          {total > 0 && (
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              {total}문제 중 처음에 {score.ok}문제를 맞혔어요.
            </p>
          )}
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            {left > 0 ? `오늘 남은 복습 ${left}개` : '틀린 낱말은 내일 다시 나와요. 맞힌 낱말은 며칠 뒤에 다시 만나요.'}
          </p>
          <div className="w-full max-w-xs space-y-2">
            {left > 0 && (
              <button onClick={() => setRound(r => r + 1)} className="w-full py-3.5 rounded-xl text-white font-bold"
                style={{ background: 'var(--color-primary-gradient)' }}>
                10개 더 하기
              </button>
            )}
            <button onClick={close} className="w-full py-3.5 rounded-xl font-bold"
              style={{ border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)' }}>
              복습 탭으로
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  const answered = picked !== null
  const correct = answered && picked === item.answer

  const choose = (i: number) => {
    if (answered) return
    setPicked(i)
    const ok = i === item.answer
    if (!graded.current.has(item.id)) {
      graded.current.add(item.id)
      recordAnswer(item, ok)
      setScore(s => ok ? { ...s, ok: s.ok + 1 } : { ...s, ng: s.ng + 1 })
      // 틀린 문제는 이번 묶음 끝에 한 번 더
      if (!ok) setQueue(q => q ? [...q, item] : q)
    }
    if (item.kind === 'meaning' || item.kind === 'listen') speakPali(item.word.word)
  }
  const next = () => { stopSpeech(); setPicked(null); setIdx(i => i + 1) }

  const progressPct = Math.round((idx / queue.length) * 100)

  return (
    <Screen onClose={close} title={`낱말 복습 ${idx + 1} / ${queue.length}`}>
      <div className="h-1.5 mx-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border-light)' }}
        role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100} aria-label="복습 진행">
        <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, background: 'var(--color-primary)' }} />
      </div>

      <div className="px-5 pt-6 pb-32 max-w-lg mx-auto">
        {/* 문제 */}
        {item.kind === 'wrong' && (
          <>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-error)' }}>
              <span aria-hidden="true">🔁 </span>전에 틀린 문제 · {getLessonTitle(item.lessonId)}
            </p>
            <p className="text-lg font-bold whitespace-pre-line mb-2">{item.prompt}</p>
            {item.listen && (
              <button onClick={() => speakPali(item.listen!)} className="text-sm font-semibold py-2" style={{ color: 'var(--color-accent)' }}>
                🔊 다시 듣기
              </button>
            )}
          </>
        )}
        {item.kind === 'meaning' && (
          <>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>뜻 고르기</p>
            <p lang="pi" className="pali-text text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{item.word.word}</p>
            <p className="text-sm mt-1 mb-2" style={{ color: 'var(--color-text-secondary)' }}>[{item.word.pronKo}]</p>
            <p className="text-base font-semibold">이 낱말의 뜻은?</p>
          </>
        )}
        {item.kind === 'listen' && (
          <>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>듣고 고르기</p>
            <button onClick={() => speakPali(item.word.word)}
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-3 active:scale-95"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 14%, var(--color-surface))', border: '2px solid var(--color-accent)' }}
              aria-label="다시 듣기">🔊</button>
            <p className="text-base font-semibold">들은 낱말은? <span className="text-sm font-normal" style={{ color: 'var(--color-text-secondary)' }}>(뜻: {item.word.meaning})</span></p>
          </>
        )}

        {/* 보기 */}
        <div className="mt-5 space-y-2.5" role="group" aria-label="보기">
          {item.options.map((o, i) => {
            const isAns = i === item.answer
            const isPicked = i === picked
            const bg = answered && isAns ? C.okBg : answered && isPicked ? C.errBg : 'var(--color-surface)'
            const border = answered && isAns ? '2px solid var(--color-accent)' : answered && isPicked ? '2px solid var(--color-error)' : '1.5px solid var(--color-border)'
            const pali = item.kind === 'listen' || (item.kind === 'wrong' && /[āīūṃṅñṭḍṇḷ]/.test(o))
            return (
              <button key={i} onClick={() => choose(i)} disabled={answered}
                className="w-full rounded-xl px-4 py-3.5 text-left text-base font-medium active:scale-[0.98] transition-transform"
                style={{ backgroundColor: bg, border, color: 'var(--color-text)' }}>
                <span lang={pali ? 'pi' : undefined} className={pali ? 'pali-font' : ''}>{o}</span>
                {answered && isAns && <span className="sr-only"> (정답)</span>}
              </button>
            )
          })}
        </div>

        {/* 채점 결과 */}
        {answered && (
          <div className="mt-5 rounded-xl p-4" role="status"
            style={{ backgroundColor: correct ? C.okBg : C.errBg, border: `1px solid ${correct ? 'var(--color-accent)' : 'var(--color-error)'}` }}>
            <p className="font-bold" style={{ color: correct ? 'var(--color-accent)' : 'var(--color-error)' }}>
              {correct ? '✓ 맞았어요!' : '괜찮아요, 다시 익혀요'}
            </p>
            {(item.kind === 'meaning' || item.kind === 'listen') && (
              <div className="mt-2 text-sm">
                <p><span lang="pi" className="pali-font font-bold" style={{ color: 'var(--color-primary)' }}>{item.word.word}</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}> [{item.word.pronKo}]</span> — {item.word.meaning}</p>
                {item.word.grammar && <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{item.word.grammar} · {getLessonTitle(item.word.lessonId)}</p>}
              </div>
            )}
            {item.kind === 'wrong' && (
              <div className="mt-2 text-sm">
                <p>정답: <b>{item.options[item.answer]}</b></p>
                {item.hint && <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>💡 {item.hint}</p>}
              </div>
            )}
          </div>
        )}
      </div>

      {answered && (
        <div className="fixed bottom-0 left-0 right-0 px-5 pt-3 bottom-bar-frost" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}>
          <button onClick={next} autoFocus className="w-full max-w-lg mx-auto block py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: 'var(--color-primary-gradient)' }}>
            다음 →
          </button>
        </div>
      )}
    </Screen>
  )
}

function Screen({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="min-h-dvh" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="flex items-center gap-2 px-3 pt-3 pb-2 max-w-lg mx-auto">
        <button onClick={onClose} aria-label="복습 닫기" className="w-11 h-11 flex items-center justify-center rounded-full text-xl">✕</button>
        <h1 className="text-sm font-semibold flex-1">{title}</h1>
      </div>
      {children}
    </div>
  )
}
