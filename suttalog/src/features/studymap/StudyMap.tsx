// 학습맵 — 기초 다지기 + 경전 과정 두 갈래('독송문 먼저' → '경전 읽기')
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LESSON_GROUPS, LESSON_META, LESSON_PREREQ, isReciteLesson, lessonNumber } from '../../utils/lessons-meta'
import { SECONDS_PER_STEP, daysAtGoal, formatDuration, getAllProgress, getCurrentLessonId, type LessonProgress } from '../../utils/lesson-progress'
import { getSections } from '../../utils/lesson-sections'
import { getDailyGoal } from '../../utils/study-time'
import { BASIC_SKILLS, isBasicDone } from '../lessons/basics'

export default function StudyMap() {
  const nav = useNavigate()
  const currentRef = useRef<HTMLDivElement>(null)

  // 진도는 화면을 열 때마다 새로 읽음
  const progress = getAllProgress()
  const byId = Object.fromEntries(progress.map(p => [p.id, p])) as Record<string, LessonProgress>
  const currentId = getCurrentLessonId()
  const doneCount = progress.filter(p => p.done).length
  const goal = getDailyGoal()

  // 진입 시 지금 배울 과로 자동 스크롤(첫 과면 맨 위 그대로)
  useEffect(() => {
    if (lessonNumber(currentId) > 1) currentRef.current?.scrollIntoView({ block: 'center' })
  }, [currentId])

  return (
    <div className="px-4 pt-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4 gap-2">
        <h1 className="text-xl font-bold">📖 학습맵</h1>
        <span className="text-sm px-3 py-1 rounded-full text-white shrink-0"
          style={{ background: 'var(--color-primary-gradient)' }}>
          {doneCount === progress.length ? '모든 과 완료' : `제${lessonNumber(currentId)}과 학습 중`}
        </span>
      </div>

      {/* 기초 다지기 — 일반 레슨 진입점 */}
      <section className="mb-6" aria-labelledby="basics-title">
        <h2 id="basics-title" className="text-sm font-bold mb-1">🌱 기초 다지기</h2>
        <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          발음·단어·문법을 짧게 익혀요. 경전 과 카드에 ‘이 과 전에 보면 좋은 기초’가 있으면 그것부터 보셔도 좋아요.
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

      {LESSON_GROUPS.map((g, gi) => (
        <section key={g.key} className="mb-6" aria-labelledby={`grp-${g.key}`}>
          <h2 id={`grp-${g.key}`} className="text-sm font-bold">
            <span aria-hidden="true">{g.icon} </span>{gi + 1}. {g.title}
            <span className="text-xs font-normal ml-1" style={{ color: 'var(--color-text-secondary)' }}>
              (제{lessonNumber(g.ids[0])}~{lessonNumber(g.ids[g.ids.length - 1])}과)
            </span>
          </h2>
          <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>{g.desc}</p>

          <div className="relative">
            {/* 세로 연결선 */}
            <div className="absolute left-7 top-2 bottom-2 w-0.5" style={{ backgroundColor: 'var(--color-border)' }} aria-hidden="true" />
            {g.ids.map(id => (
              <LessonCard key={id} id={id} p={byId[id]} isCurrent={id === currentId && !byId[id].done}
                cardRef={id === currentId ? currentRef : undefined} goal={goal} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function LessonCard({ id, p, isCurrent, cardRef, goal }: {
  id: string; p: LessonProgress; isCurrent: boolean; cardRef?: React.Ref<HTMLDivElement>; goal: number
}) {
  const nav = useNavigate()
  const meta = LESSON_META[id]
  const no = lessonNumber(id)
  const pct = Math.round(p.ratio * 100)
  const status = p.done ? '완료' : isCurrent ? (p.started ? `${pct}% 진행 중` : '이번에 배울 과') : p.started ? `${pct}%` : ''
  const minutes = (p.total * SECONDS_PER_STEP) / 60
  const amount = `${p.total}단계 · ${formatDuration(p.total)}${minutes > goal * 2 ? ` · 하루 ${goal}분이면 약 ${daysAtGoal(p.total, goal)}일` : ''}`
  const sections = p.started && !p.done ? getSections(id) : []
  const sectionsDone = sections.filter(s => s.done).length
  const curSection = sections.find(s => s.current)
  const prereq = LESSON_PREREQ[id]
  const showPrereq = prereq && !p.done && !isBasicDone(prereq.kind, prereq.id)

  return (
    <div ref={cardRef} className="relative flex items-start gap-3 mb-2">
      {/* 노드 원 */}
      <div aria-hidden="true"
        className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-xl shrink-0 ${
          isCurrent ? 'ring-4 ring-offset-2 ring-[var(--color-primary-light)] ring-offset-[var(--color-bg)]' : ''
        }`}
        style={{
          backgroundColor: p.done ? 'var(--color-accent)' : isCurrent ? 'var(--color-primary)' : 'var(--color-surface)',
          border: p.done || isCurrent ? 'none' : '2px solid var(--color-border)',
          color: p.done ? '#fff' : undefined,
        }}>
        {p.done ? '✓' : meta.icon}
      </div>

      <div className="flex-1 min-w-0 rounded-xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface)', border: isCurrent ? '2px solid var(--color-primary)' : '1px solid var(--color-border)' }}>
        <button onClick={() => nav(`/learn/scripture/${id}`)} className="w-full p-3 text-left active:opacity-80">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-bold text-sm" style={isCurrent ? { color: 'var(--color-primary)' } : {}}>제{no}과: {meta.title}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{meta.subtitle}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                <span className="pali-font" style={{ color: 'var(--color-primary)' }}><span aria-hidden="true">📜 </span>{meta.source}</span>
                <span> · {amount}</span>
              </p>
            </div>
            {status && (
              <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: p.done ? 'var(--color-accent)' : 'var(--color-primary)' }}>{status}</span>
            )}
          </div>
          {p.started && !p.done && (
            <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border-light)' }}
              role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${meta.title} 진도`}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--color-primary)' }} />
            </div>
          )}
          {sections.length > 1 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1" aria-hidden="true">
                {sections.map((s, i) => (
                  <span key={i} title={s.title} className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: s.done ? 'var(--color-primary)' : 'transparent',
                      border: `1.5px solid ${s.current ? 'var(--color-primary)' : s.done ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    }} />
                ))}
              </div>
              <p className="text-[11px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                소단원 {sectionsDone}/{sections.length} 마침{curSection ? ` · 지금: ${curSection.title}` : ''}
              </p>
            </div>
          )}
        </button>

        {(showPrereq || (p.done && isReciteLesson(id))) && (
          <div className="flex flex-wrap gap-x-3 px-3 pb-2.5 -mt-1">
            {showPrereq && (
              <button onClick={() => nav(`/learn/${prereq.kind}/${prereq.id}`)} className="text-[11px] py-1 text-left"
                style={{ color: 'var(--color-text-secondary)' }}>
                <span aria-hidden="true">🌱 </span>이 과 전에 보면 좋은 기초: <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>{prereq.label} ›</span>
              </button>
            )}
            {p.done && isReciteLesson(id) && (
              <button onClick={() => nav(`/recite/${id}`)} className="text-xs font-semibold py-1" style={{ color: 'var(--color-primary)' }}>
                <span aria-hidden="true">🗣️ </span>외우기 ›
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
