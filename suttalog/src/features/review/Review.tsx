// 복습 — 맨 위 '오늘 복습할 낱말', 독송문 외우기, 공부한(완료·진행 중) 경전과 기초 레슨 다시 보기
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LESSON_META, isReciteLesson, lessonNumber } from '../../utils/lessons-meta'
import { getAllProgress } from '../../utils/lesson-progress'
import { BASIC_SKILLS, basicRoute, isBasicDone } from '../lessons/basics'
import { backfillSeenWords, getDueSummary, uniqueSeenWords } from '../../utils/word-review'

export default function Review() {
  const nav = useNavigate()
  const [, setVer] = useState(0)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const all = getAllProgress()
  const studied = all.filter(p => p.started)
  const reciteReady = all.filter(p => p.done && isReciteLesson(p.id))
  const basicsDone = BASIC_SKILLS.flatMap(s => s.lessons.filter(l => isBasicDone(l.kind, l.id)).map(l => ({ ...l, icon: s.icon })))
  const due = getDueSummary()
  const wordCount = uniqueSeenWords().length

  // 예전에 공부한 과의 낱말을 복습 목록에 한 번 채워 넣음(채웠으면 다시 그림)
  useEffect(() => {
    let alive = true
    backfillSeenWords().then(added => { if (alive && added) setVer(v => v + 1) })
    return () => { alive = false }
  }, [])

  const restart = (id: string) => {
    localStorage.setItem(`suttalog-progress-${id}`, '0')
    setConfirmId(null)
    setVer(v => v + 1)
    nav(`/learn/scripture/${id}`)
  }
  const askRestart = (id: string, done: boolean) => {
    if (done) restart(id) // 마친 과: 완료 기록은 그대로 남음
    else setConfirmId(id)
  }
  const confirming = confirmId ? all.find(p => p.id === confirmId) : null

  if (studied.length === 0 && basicsDone.length === 0 && wordCount === 0) {
    return (
      <div className="px-4 pt-6">
        <h1 className="text-xl font-bold mb-6">🔄 복습</h1>
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <div className="text-6xl mb-6" aria-hidden="true">📚</div>
          <h2 className="text-lg font-bold mb-2">아직 복습할 것이 없어요</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            경전 학습을 시작하면 배운 낱말과 공부한 과가 여기에 모여요.<br />날마다 몇 분씩 다시 보면 오래 기억에 남아요.
          </p>
          <button
            onClick={() => nav('/learn/scripture/namo')}
            className="rounded-2xl px-6 py-3 text-white font-semibold active:scale-[0.98] transition-transform"
            style={{ background: 'var(--color-primary-gradient)' }}
          >
            제1과 나모땃사 시작하기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-1">🔄 복습</h1>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>배운 낱말을 다시 떠올리고, 공부한 과를 다시 열어 보세요.</p>

      {/* ── 오늘 복습할 낱말 ── */}
      <section className="mb-6" aria-labelledby="rv-words">
        <h2 id="rv-words" className="sr-only">오늘 낱말 복습</h2>
        {due.total > 0 ? (
          <button onClick={() => nav('/review/words')}
            className="w-full rounded-2xl p-4 text-left active:scale-[0.98] transition-transform"
            style={{ background: 'var(--color-primary-gradient)', color: '#fff', boxShadow: '0 4px 16px rgba(192,107,10,0.25)' }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">🧠</span>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold">오늘 복습할 낱말 {due.total}개 · 약 {due.minutes}분</p>
                <p className="text-xs mt-0.5 text-white/90">
                  {due.wrong.length > 0 ? `틀린 문제 ${due.wrong.length}개부터 · ` : ''}뜻 고르기·듣고 고르기로 10개씩
                </p>
              </div>
              <span aria-hidden="true" className="text-xl">›</span>
            </div>
          </button>
        ) : (
          <div className="rounded-2xl p-4 flex items-center gap-3"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <span className="text-3xl" aria-hidden="true">{wordCount > 0 ? '🪷' : '🧠'}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold">{wordCount > 0 ? '오늘 낱말 복습을 다 했어요' : '낱말 복습'}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                {wordCount > 0 ? '다음 복습할 낱말은 때가 되면 여기에 나타나요.' : '경전 과에서 낱말 카드를 보면 복습할 낱말이 여기에 모여요.'}
              </p>
            </div>
          </div>
        )}
        {wordCount > 0 && (
          <button onClick={() => nav('/words')} className="mt-2 w-full text-right text-xs font-semibold py-2"
            style={{ color: 'var(--color-primary)' }}>
            배운 낱말 {wordCount}개 · 낱말장 보기 ›
          </button>
        )}
      </section>

      {/* ── 독송문 외우기 ── */}
      <section className="mb-6" aria-labelledby="rv-recite">
        <h2 id="rv-recite" className="text-sm font-bold mb-2">🗣️ 독송문 외우기</h2>
        {reciteReady.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {reciteReady.map(p => {
              const m = LESSON_META[p.id]
              return (
                <button key={p.id} onClick={() => nav(`/recite/${p.id}`)}
                  className="rounded-xl p-3 text-left flex items-center gap-2 active:scale-[0.98]"
                  style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <span className="text-xl" aria-hidden="true">{m.icon}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold truncate">{m.title}</span>
                    <span className="block text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>한 줄씩 외우기 ›</span>
                  </span>
                </button>
              )
            })}
          </div>
        ) : (
          <p className="text-xs rounded-xl p-3" style={{ backgroundColor: 'var(--color-surface)', border: '1px dashed var(--color-border)', color: 'var(--color-text-secondary)' }}>
            독송문 과(제1~7과: 나모땃사, 삼귀의, 오계 …)를 끝까지 마치면 한 줄씩 듣고 가리며 외우는 연습을 할 수 있어요.
          </p>
        )}
      </section>

      {studied.length > 0 && (
        <section className="mb-6" aria-labelledby="rv-sutta">
          <h2 id="rv-sutta" className="text-sm font-bold mb-2">📜 공부한 과</h2>
          <div className="space-y-2.5">
            {studied.map(p => {
              const m = LESSON_META[p.id]
              const pct = Math.round(p.ratio * 100)
              return (
                <div key={p.id} className="rounded-xl p-3.5"
                  style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">{m.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm">제{lessonNumber(p.id)}과 {m.title}</p>
                      <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        <span className="pali-font">{m.source}</span> · {p.done ? '완료' : `${pct}% 진행`}
                      </p>
                    </div>
                    {p.done && <span className="text-xs font-bold" style={{ color: 'var(--color-accent)' }}>✓ 완료</span>}
                  </div>
                  <div className="flex gap-2 mt-3">
                    {!p.done && (
                      <button onClick={() => nav(`/learn/scripture/${p.id}`)}
                        className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white active:scale-[0.98]"
                        style={{ background: 'var(--color-primary-gradient)' }}>
                        이어서 학습
                      </button>
                    )}
                    <button onClick={() => askRestart(p.id, p.done)}
                      className="flex-1 py-2.5 rounded-lg text-sm font-semibold active:scale-[0.98]"
                      style={{ border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)' }}>
                      처음부터 다시
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {basicsDone.length > 0 && (
        <section aria-labelledby="rv-basic">
          <h2 id="rv-basic" className="text-sm font-bold mb-2">🌱 기초 다지기</h2>
          <div className="space-y-2">
            {basicsDone.map(l => (
              <button key={`${l.kind}/${l.id}`} onClick={() => nav(basicRoute(l))}
                className="w-full rounded-xl p-3 text-left flex items-center gap-3 active:scale-[0.98]"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <span className="text-xl" aria-hidden="true">{l.icon}</span>
                <span className="flex-1 min-w-0 text-sm font-semibold">{l.title}</span>
                <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>다시 보기 ›</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 진행 중인 과를 처음으로 되돌리기 전에 확인 */}
      {confirming && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4"
          style={{ backgroundColor: 'var(--color-overlay)' }} onClick={() => setConfirmId(null)}>
          <div role="alertdialog" aria-modal="true" aria-labelledby="rv-confirm-title"
            className="w-full max-w-sm rounded-2xl p-5" onClick={e => e.stopPropagation()}
            style={{ backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-xl)' }}>
            <p id="rv-confirm-title" className="font-bold text-base mb-2">처음부터 다시 할까요?</p>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              ‘{LESSON_META[confirming.id].title}’을(를) 지금 {confirming.step + 1}단계까지 공부했어요.
              처음부터 다시 하면 이 진도가 첫 단계로 돌아갑니다.
            </p>
            <div className="flex flex-col gap-2">
              <button onClick={() => { setConfirmId(null); nav(`/learn/scripture/${confirming.id}`) }}
                className="w-full py-3 rounded-xl text-white font-bold" style={{ background: 'var(--color-primary-gradient)' }}>
                진도 그대로 두고 이어서 하기
              </button>
              <button onClick={() => restart(confirming.id)}
                className="w-full py-3 rounded-xl font-semibold" style={{ border: '1.5px solid var(--color-error)', color: 'var(--color-error)' }}>
                네, 처음부터 다시
              </button>
              <button onClick={() => setConfirmId(null)} className="w-full py-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
