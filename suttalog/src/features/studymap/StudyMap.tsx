// 학습맵 (보리수 경로) — 경전 과 11개 + 기초 다지기(발음·단어·문법·독해)
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LESSON_META, LESSON_ORDER } from '../../utils/lessons-meta'
import { getAllProgress, getCurrentLessonId } from '../../utils/lesson-progress'
import { BASIC_SKILLS, isBasicDone } from '../lessons/basics'

export default function StudyMap() {
  const nav = useNavigate()
  const currentRef = useRef<HTMLDivElement>(null)

  // 진도는 화면을 열 때마다 새로 읽음
  const progress = getAllProgress()
  const currentId = getCurrentLessonId()
  const currentNo = (LESSON_ORDER as readonly string[]).indexOf(currentId) + 1
  const doneCount = progress.filter(p => p.done).length

  // 진입 시 진행 중인 과로 자동 스크롤
  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  // 위에서 아래로: 제11과 → 제1과 (보리수 아래 '시작'에서 위로 올라가는 길)
  const items = LESSON_ORDER.map((id, i) => ({ id, no: i + 1, meta: LESSON_META[id], p: progress[i] })).reverse()

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between mb-4 gap-2">
        <h1 className="text-xl font-bold">📖 학습맵</h1>
        <span className="text-sm px-3 py-1 rounded-full text-white shrink-0"
          style={{ background: 'var(--color-primary-gradient)' }}>
          {doneCount === LESSON_ORDER.length ? '모든 과 완료' : `제${currentNo}과 학습 중`}
        </span>
      </div>

      {/* 기초 다지기 — 일반 레슨 진입점 */}
      <section className="mb-6" aria-labelledby="basics-title">
        <h2 id="basics-title" className="text-sm font-bold mb-1">🌱 기초 다지기</h2>
        <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          경전을 읽기 전에 발음·단어·문법을 짧게 익혀요 (원하는 것부터 골라 들으셔도 됩니다)
        </p>
        <div className="grid grid-cols-3 gap-2">
          {BASIC_SKILLS.map(s => {
            const done = s.lessons.filter(l => isBasicDone(l.kind, l.id)).length
            const all = done === s.lessons.length
            return (
              <button key={s.id} onClick={() => nav(`/skill/${s.id}`)}
                className="rounded-xl p-2.5 text-center active:scale-[0.97] transition-transform"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: all ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                }}>
                <span className="block text-xl" aria-hidden="true">{s.icon}</span>
                <span className="block text-xs font-semibold mt-0.5">{s.title}</span>
                <span className="block text-[11px] mt-0.5" style={{ color: all ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                  {all ? '✓ 완료' : `${done}/${s.lessons.length}`}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <h2 className="text-sm font-bold mb-3">📜 경전 과정</h2>
      <div className="relative">
        {/* 세로 연결선 */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--color-border)' }} aria-hidden="true" />

        {items.map(({ id, no, meta, p }) => {
          const isCurrent = id === currentId && !p.done
          const pct = Math.round(p.ratio * 100)
          const status = p.done ? '완료' : isCurrent ? (p.started ? `${pct}% 진행 중` : '이번에 배울 과') : p.started ? `${pct}%` : ''

          return (
            <div key={id} ref={isCurrent ? currentRef : undefined} className="relative flex items-start gap-4 mb-1">
              {/* 노드 원 */}
              <div
                aria-hidden="true"
                className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl shrink-0 ${
                  isCurrent ? 'ring-4 ring-offset-2 ring-[var(--color-primary-light)] ring-offset-[var(--color-bg)]' : ''
                }`}
                style={{
                  backgroundColor: p.done ? 'var(--color-accent)' : isCurrent ? 'var(--color-primary)' : 'var(--color-surface)',
                  border: p.done || isCurrent ? 'none' : '2px solid var(--color-border)',
                  color: p.done ? '#fff' : undefined,
                }}
              >
                {p.done ? '✓' : meta.icon}
              </div>

              <button
                onClick={() => nav(`/learn/scripture/${id}`)}
                className="flex-1 min-w-0 rounded-xl p-3 text-left transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: isCurrent ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-sm" style={isCurrent ? { color: 'var(--color-primary)' } : {}}>
                      제{no}과: {meta.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{meta.subtitle}</p>
                    <p className="text-xs mt-1 pali-font" style={{ color: 'var(--color-primary)' }}>
                      <span aria-hidden="true">📜 </span>{meta.source}
                    </p>
                  </div>
                  {status && (
                    <span className="text-xs font-bold shrink-0 mt-0.5"
                      style={{ color: p.done ? 'var(--color-accent)' : 'var(--color-primary)' }}>
                      {status}
                    </span>
                  )}
                </div>
                {p.started && !p.done && (
                  <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border-light)' }}
                    role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${meta.title} 진도`}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--color-primary)' }} />
                  </div>
                )}
              </button>
            </div>
          )
        })}

        {/* 출발점 */}
        <div className="relative flex items-center gap-4">
          <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: 'var(--color-primary)' }} aria-hidden="true">
            🪷
          </div>
          <p className="font-bold" style={{ color: 'var(--color-primary)' }}>시작</p>
        </div>
      </div>
    </div>
  )
}
