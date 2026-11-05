// 간격 복습 퀴즈 — 틀린 문제·오래 안 본 문제부터 (주소: /review/quiz, /review/quiz?lesson=lesson-09&n=5)
// 문제 위에 출처('2과 목적격에서'), 틀리면 힌트와 '이 과 해당 단계로 가기'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { speakPali, stopPali } from '../../utils/pali-tts'
import type { StepType } from '../grammar/types'
import SubHeader from './SubHeader'
import { useStudyTimer } from './useStudyTimer'
import { loadStudied, quizPool, pickReview, shortTitle, stripNumber, type PoolItem } from './review-data'

type Q = Extract<StepType, { type: 'quiz' | 'match-listen' | 'match-reverse' }>

/** 보기 섞기 (쉬운 화면이면 정답 + 하나만) */
function makeOptions(step: Q, easy: boolean): string[] {
  const answer = step.options[step.answer]
  let opts = [...step.options]
  if (easy && opts.length > 2) {
    const others = opts.filter((_, i) => i !== step.answer)
    opts = [answer, others[Math.floor(Math.random() * others.length)]]
  }
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[opts[i], opts[j]] = [opts[j], opts[i]]
  }
  return opts
}

export default function ReviewQuiz() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const only = params.get('lesson') || undefined
  const count = Math.max(1, Math.min(20, Number(params.get('n')) || 10))

  const progress = useStore(s => s.progress)
  const best = useStore(s => s.best)
  const completed = useStore(s => s.completed)
  const easyMode = useStore(s => s.easyMode)
  const recordQuiz = useStore(s => s.recordQuiz)
  const recordStudy = useStore(s => s.recordStudy)
  useStudyTimer()

  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [items, setItems] = useState<PoolItem[]>([])
  const [i, setI] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState<boolean[]>([])
  const [round, setRound] = useState(0)

  // 처음 한 번 문제 고르기 (푸는 동안 기록이 바뀌어도 문제는 그대로)
  useEffect(() => {
    let alive = true
    const st = { progress, best, completed }
    loadStudied(st, only).then(lessons => {
      if (!alive) return
      const pool = quizPool(lessons, st)
      setItems(pickReview(pool, useStore.getState().quizRecords, count))
      setStatus('ready')
    }, () => alive && setStatus('error'))
    return () => { alive = false; stopPali() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cur = items[i]
  const step = cur?.step as Q | undefined
  const options = useMemo(() => (step ? makeOptions(step, easyMode) : []),
    // 문제마다 한 번만 섞음
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step?.id, round, i])
  const answerText = step ? step.options[step.answer] : ''
  const isOk = checked && selected !== null && options[selected] === answerText
  const done = status === 'ready' && i >= items.length

  // 듣기 문제는 화면에 들어오면 한 번 들려줌
  useEffect(() => {
    if (step?.type === 'match-listen') {
      const t = setTimeout(() => speakPali(step.word), 350)
      return () => clearTimeout(t)
    }
  }, [step])

  const check = () => {
    if (selected === null || checked || !step) return
    const ok = options[selected] === answerText
    setChecked(true)
    setResults(r => [...r, ok])
    recordQuiz(step.id, ok)
    recordStudy()
  }
  const next = () => {
    stopPali()
    setSelected(null)
    setChecked(false)
    setI(n => n + 1)
  }
  const retryWrong = () => {
    const wrong = items.filter((_, k) => results[k] === false)
    setItems(wrong)
    setResults([])
    setI(0)
    setSelected(null)
    setChecked(false)
    setRound(r => r + 1)
  }
  const goStep = () => {
    if (!cur) return
    stopPali()
    nav(`/learn/${cur.lesson.id}?step=${cur.index}`, { state: { from: '/review' } })
  }

  const title = only ? '2분 복습' : '복습 퀴즈'
  const sub = only ? '지난번에 공부한 과에서 몇 문제만' : '틀린 문제·오래된 문제부터'

  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="max-w-lg mx-auto px-4">
        <SubHeader title={title} sub={sub}
          right={status === 'ready' && !done ? <span className="badge text-[11px] shrink-0">{i + 1}/{items.length}</span> : undefined} />

        {status === 'loading' && <p className="text-center text-sm py-16" role="status" style={{ color: 'var(--color-text-secondary)' }}>문제를 고르고 있어요…</p>}
        {status === 'error' && (
          <div className="text-center py-16" role="alert">
            <p className="text-sm font-bold">문제를 불러오지 못했어요</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>인터넷 연결을 확인하고 다시 열어 주세요.</p>
          </div>
        )}
        {status === 'ready' && items.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm font-bold">아직 복습할 문제가 없어요</p>
            <p className="text-xs mt-1 mb-6" style={{ color: 'var(--color-text-secondary)' }}>과에서 문제를 풀고 나면 여기서 다시 풀 수 있어요.</p>
            <button className="btn-primary px-6 py-3 text-sm" onClick={() => nav('/courses')}>과목으로 가기</button>
          </div>
        )}

        {/* 문제 */}
        {step && !done && (
          <div key={`${round}-${i}`} className="animate-fadeIn">
            <p className="text-[11px] font-semibold mb-2 inline-block px-2 py-0.5 rounded-full"
              style={{ color: 'var(--color-primary)', backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}>
              {shortTitle(cur.lesson.title)}에서
            </p>

            {step.type === 'quiz' && <p className="text-lg font-bold mb-4" lang="pi">{stripNumber(step.question)}</p>}
            {step.type === 'match-reverse' && (
              <>
                <p className="text-sm font-bold mb-2">{step.instruction}</p>
                <div className="rounded-2xl p-4 mb-4 text-center" style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-primary)' }}>
                  <p className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>{step.meaning}</p>
                </div>
              </>
            )}
            {step.type === 'match-listen' && (
              <>
                <p className="text-sm font-bold mb-4">{step.instruction}</p>
                <button onClick={() => speakPali(step.word)} aria-label="소리 다시 듣기"
                  className="w-20 h-20 mx-auto mb-2 rounded-full flex items-center justify-center text-3xl active:scale-90 transition-transform"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>🔊</button>
                <p className="text-center text-sm mb-4 min-h-[1.25rem]" style={{ color: 'var(--color-text-secondary)' }}>
                  {checked ? <><span lang="pi">{step.word}</span> · {step.pronKo}</> : '눌러서 다시 들을 수 있어요'}
                </p>
              </>
            )}

            <div className="space-y-3" role="radiogroup" aria-label="보기">
              {options.map((opt, k) => {
                const isAns = checked && opt === answerText
                const isWrong = checked && selected === k && opt !== answerText
                const isSel = !checked && selected === k
                return (
                  <button key={k} role="radio" aria-checked={selected === k} disabled={checked}
                    onClick={() => setSelected(k)}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl text-left text-sm font-medium transition-all active:scale-[0.98]"
                    style={{
                      backgroundColor: isAns ? 'var(--color-success-bg)' : isWrong ? 'var(--color-wrong-bg)' : 'var(--color-surface)',
                      border: isAns ? '2px solid var(--color-success-strong)' : isWrong ? '2px solid var(--color-wrong-strong)' : isSel ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                      minHeight: 48,
                    }}>
                    <span className="flex-1">{opt}</span>
                    {isAns && <span className="font-bold" style={{ color: 'var(--color-success-strong)' }} aria-label="정답">✓</span>}
                    {isWrong && <span className="font-bold" style={{ color: 'var(--color-wrong-strong)' }} aria-label="고른 답">✕</span>}
                  </button>
                )
              })}
            </div>

            {/* 결과 */}
            {checked && (
              <div className="mt-4 rounded-2xl p-4 animate-fadeIn" role="status"
                style={{ backgroundColor: isOk ? 'var(--color-success-bg)' : 'var(--color-warn-bg)', border: `1px solid ${isOk ? 'var(--color-success-strong)' : 'var(--color-warn-border)'}` }}>
                <p className="text-sm font-bold">{isOk ? '맞았어요 🪷' : `정답: ${answerText}`}</p>
                {!isOk && step.type === 'quiz' && step.hint && (
                  <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-secondary)' }}><span aria-hidden="true">💡 </span>{step.hint}</p>
                )}
                {!isOk && (
                  <button onClick={goStep} className="mt-3 text-xs font-bold underline underline-offset-2 py-1.5"
                    style={{ color: 'var(--color-primary)' }}>
                    {shortTitle(cur.lesson.title)} 해당 단계로 가서 다시 보기 →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* 끝 */}
        {done && items.length > 0 && (
          <div className="text-center pt-10 animate-fadeIn">
            <div className="text-5xl mb-3" aria-hidden="true">🪷</div>
            <h2 className="text-xl font-bold">복습을 마쳤어요</h2>
            <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
              {items.length}문제 중 {results.filter(Boolean).length}문제를 맞혔어요
            </p>
            <div className="mt-8 space-y-3">
              {results.some(r => !r) && (
                <button onClick={retryWrong} className="btn-primary w-full py-3.5 text-sm">
                  틀린 문제 {results.filter(r => !r).length}개 다시 풀기
                </button>
              )}
              {only ? (
                <button onClick={() => nav('/')} className="w-full py-3.5 rounded-2xl text-sm font-bold"
                  style={{ border: '1.5px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                  홈으로 — 이어서 공부하기
                </button>
              ) : (
                <button onClick={() => nav('/review')} className="w-full py-3.5 rounded-2xl text-sm font-bold"
                  style={{ border: '1.5px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                  복습으로 돌아가기
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 아래 버튼 */}
      {step && !done && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bottom-bar-frost" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="max-w-lg mx-auto px-4 py-3 flex gap-3">
            {!checked ? (
              <>
                <button onClick={() => { setResults(r => [...r, false]); next() }}
                  className="px-4 rounded-2xl text-sm font-semibold" style={{ color: 'var(--color-text-secondary)', border: '1.5px solid var(--color-border)', minHeight: 48 }}>
                  건너뛰기
                </button>
                <button onClick={check} disabled={selected === null}
                  className="flex-1 py-3.5 rounded-2xl font-bold text-sm"
                  style={{ backgroundColor: selected !== null ? 'var(--color-primary-dark)' : 'var(--color-border)', color: selected !== null ? 'white' : 'var(--color-text-secondary)', minHeight: 48 }}>
                  확인
                </button>
              </>
            ) : (
              <button onClick={next} className="flex-1 py-3.5 rounded-2xl text-white font-bold text-sm"
                style={{ backgroundColor: 'var(--color-primary-dark)', minHeight: 48 }}>
                {i + 1 >= items.length ? '🪷 마치기' : '다음'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
