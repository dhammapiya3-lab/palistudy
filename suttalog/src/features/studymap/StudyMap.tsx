// 학습맵 (보리수 경로 스킬트리)
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// 레벨에 따라 동적으로 상태 결정
const level = Number(localStorage.getItem('suttalog-level') || '0')

const SKILLS = [
  { id: 11, title: '마음챙김 확립의 큰 경', desc: '사념처 전문(全文) 🎯', icon: '🧘', route: '/learn/scripture/mn10', source: 'DN 22' },
  { id: 10, title: '보배경', desc: '삼보의 공덕과 가피', icon: '💎', route: '/learn/scripture/ratana', source: 'Snp 2.1' },
  { id: 9, title: '무아의 특징경', desc: '오온과 무아', icon: '🔍', route: '/learn/scripture/sn22-59', source: 'SN 22.59' },
  { id: 8, title: '자애경', desc: '자애의 마음 수행', icon: '💛', route: '/learn/scripture/metta', source: 'Snp 1.8' },
  { id: 7, title: '초전법륜경', desc: '사성제와 팔정도 · 첫 설법', icon: '☸️', route: '/learn/scripture/sn56-11', source: 'SN 56.11' },
  { id: 6, title: '축복경', desc: '최상의 축복 38가지', icon: '🌸', route: '/learn/scripture/mangala', source: 'Snp 2.4' },
  { id: 5, title: '도분별경', desc: '팔정도 각 항목 분석', icon: '☸️', route: '/learn/scripture/sn45-8', source: 'SN 45.8' },
  { id: 4, title: '삼보공덕', desc: '붓다·담마·상가의 공덕', icon: '🙏', route: '/learn/scripture/tisarana-guna', source: 'AN 11.12' },
  { id: 3, title: '오계', desc: '다섯 가지 수행 규칙', icon: '📿', route: '/learn/scripture/pancasila', source: 'AN 8.39' },
  { id: 2, title: '삼귀의', desc: '붓다·담마·상가에 귀의', icon: '🪷', route: '/learn/scripture/trisarana', source: 'Khp 1' },
  { id: 1, title: '나모땃사', desc: '세존께 경배', icon: '🙏', route: '/learn/scripture/namo', source: '전통 예경문' },
].map(s => ({
  ...s,
  status: (s.id - 1) === level ? 'current' as const : (s.id - 1) < level ? 'skipped' as const : 'locked' as const,
  crown: 0,
}))

function CrownStars({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <span className="text-xs">
      {'⭐'.repeat(count)}{'☆'.repeat(max - count)}
    </span>
  )
}

export default function StudyMap() {
  const nav = useNavigate()
  const currentRef = useRef<HTMLDivElement>(null)

  // 진입 시 진행 중인 과로 자동 스크롤
  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  return (
    <div className="px-4 pt-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">📖 학습맵</h1>
        <span className="text-sm px-3 py-1 rounded-full"
          style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
          {level + 1}과 진행 중
        </span>
      </div>

      {/* 스킬트리 (위→아래, 잠금→현재→완료) */}
      <div className="relative">
        {/* 세로 연결선 */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--color-border)' }} />

        {SKILLS.map((skill) => {
          const isLocked = skill.status === 'locked'
          const isCurrent = skill.status === 'current'
          const isSkipped = skill.status === 'skipped'
          const isDone = false // 아직 실제 완료 추적 없음

          return (
            <div key={skill.id} ref={isCurrent ? currentRef : undefined} className="relative flex items-start gap-4 mb-1">
              {/* 노드 원 */}
              <div
                className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl shrink-0 ${
                  isCurrent ? 'ring-4 ring-offset-2' : ''
                } ${isLocked ? 'opacity-40' : ''}`}
                style={{
                  backgroundColor: isDone ? 'var(--color-accent)' : isCurrent ? 'var(--color-primary)' : isSkipped ? 'var(--color-border)' : 'var(--color-border)',
                  outlineColor: isCurrent ? 'var(--color-primary)' : undefined,
                }}
              >
                {isSkipped ? '✓' : skill.icon}
              </div>

              {/* 스킬 정보 */}
              <button
                onClick={() => nav(skill.route)}
                className="flex-1 rounded-xl p-3 text-left transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: isCurrent ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  opacity: isLocked ? 0.6 : isSkipped ? 0.7 : 1,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-bold text-sm ${isCurrent ? '' : ''}`}
                      style={isCurrent ? { color: 'var(--color-primary)' } : {}}>
                      제{skill.id}과: {skill.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                      {skill.desc}
                    </p>
                    <p className="text-xs mt-1 pali-text" style={{ color: 'var(--color-primary)', opacity: 0.7 }}>
                      📜 {skill.source}
                    </p>
                  </div>
                  <div className="text-right">
                    <CrownStars count={skill.crown} />
                    {isCurrent && (
                      <p className="text-xs mt-1 font-bold" style={{ color: 'var(--color-primary)' }}>진행 중</p>
                    )}
                  </div>
                </div>
              </button>
            </div>
          )
        })}

        {/* 출발점 */}
        <div className="relative flex items-center gap-4">
          <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            🪷
          </div>
          <p className="font-bold" style={{ color: 'var(--color-primary)' }}>시작</p>
        </div>
      </div>
    </div>
  )
}
