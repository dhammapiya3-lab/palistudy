// 복습 — 공부한(완료·진행 중) 경전과 기초 레슨을 다시 학습하는 목록
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LESSON_META } from '../../utils/lessons-meta'
import { getAllProgress } from '../../utils/lesson-progress'
import { BASIC_SKILLS, basicRoute, isBasicDone } from '../lessons/basics'

export default function Review() {
  const nav = useNavigate()
  const [, setVer] = useState(0)
  const studied = getAllProgress().filter(p => p.started)
  const basicsDone = BASIC_SKILLS.flatMap(s => s.lessons.filter(l => isBasicDone(l.kind, l.id)).map(l => ({ ...l, icon: s.icon })))

  const restart = (id: string) => {
    localStorage.setItem(`suttalog-progress-${id}`, '0')
    setVer(v => v + 1)
    nav(`/learn/scripture/${id}`)
  }

  if (studied.length === 0 && basicsDone.length === 0) {
    return (
      <div className="px-4 pt-6">
        <h1 className="text-xl font-bold mb-6">🔄 복습</h1>
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <div className="text-6xl mb-6" aria-hidden="true">📚</div>
          <h2 className="text-lg font-bold mb-2">아직 복습할 과가 없어요</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            경전 학습을 시작하면 공부한 과가 여기에 모여요.<br />언제든 다시 열어 복습할 수 있습니다.
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
      <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>공부한 과를 다시 열어 복습해 보세요.</p>

      {studied.length > 0 && (
        <section className="mb-6" aria-labelledby="rv-sutta">
          <h2 id="rv-sutta" className="text-sm font-bold mb-2">📜 경전 과정</h2>
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
                      <p className="font-bold text-sm">{m.title}</p>
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
                    <button onClick={() => restart(p.id)}
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
    </div>
  )
}
