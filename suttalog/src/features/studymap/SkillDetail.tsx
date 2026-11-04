// 기초 다지기 — 과(Skill) 상세: 레슨 목록 (실제 내용이 있는 레슨만)
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { BASIC_SKILLS, basicRoute, isBasicDone } from '../lessons/basics'

export default function SkillDetail() {
  const { skillId } = useParams<{ skillId: string }>()
  const nav = useNavigate()
  const location = useLocation()
  const justDone = (location.state as { justDone?: string } | null)?.justDone
  const skill = BASIC_SKILLS.find(s => s.id === skillId)

  if (!skill) {
    return (
      <div className="px-6 pt-20 text-center">
        <p className="text-lg font-bold mb-2">이 과를 찾을 수 없어요</p>
        <button onClick={() => nav('/map', { replace: true })}
          className="mt-4 px-6 py-3 rounded-xl text-white font-bold" style={{ background: 'var(--color-primary-gradient)' }}>
          학습맵으로
        </button>
      </div>
    )
  }

  // 아직 안 끝낸 첫 레슨을 '다음 레슨'으로 표시
  const nextIdx = skill.lessons.findIndex(l => !isBasicDone(l.kind, l.id))

  return (
    <div className="px-4 pt-6 space-y-4">
      <button onClick={() => nav('/map')} className="text-sm py-2 pr-3 font-semibold" style={{ color: 'var(--color-primary)' }}>← 학습맵</button>

      {justDone && (
        <div role="status" className="rounded-xl px-4 py-3 text-sm font-semibold"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 12%, transparent)', color: 'var(--color-accent)' }}>
          🪷 Sādhu! ‘{justDone}’ 레슨을 마쳤어요.
        </div>
      )}

      {/* 과 헤더 */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shrink-0"
          style={{ backgroundColor: 'var(--color-primary)' }} aria-hidden="true">
          {skill.icon}
        </div>
        <div>
          <p className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>기초 다지기 {skill.id}</p>
          <h1 className="text-xl font-bold">{skill.title}</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{skill.desc}</p>
          <p className="text-xs pali-font mt-1" style={{ color: 'var(--color-primary)' }}><span aria-hidden="true">📜 </span>{skill.source}</p>
        </div>
      </div>

      {/* 레슨 목록 */}
      <div className="space-y-3">
        {skill.lessons.map((lesson, i) => {
          const done = isBasicDone(lesson.kind, lesson.id)
          const isNext = i === nextIdx
          return (
            <button
              key={lesson.id}
              onClick={() => nav(basicRoute(lesson))}
              className="w-full rounded-xl p-4 text-left transition-all active:scale-[0.98]"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: isNext ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  aria-hidden="true"
                  style={{
                    backgroundColor: done ? 'var(--color-accent)' : isNext ? 'var(--color-primary)' : 'var(--color-border-light)',
                    color: done || isNext ? '#fff' : 'var(--color-text-secondary)',
                  }}>
                  {done ? '✓' : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{lesson.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                    {lesson.desc}{done ? ' · 완료' : ''}
                  </p>
                </div>
                <span className="text-xs font-bold" style={{ color: 'var(--color-primary)' }} aria-hidden="true">▶</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
