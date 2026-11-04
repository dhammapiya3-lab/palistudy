// SRS 복습 화면 — 학습 전 안내
import { useNavigate } from 'react-router-dom'

export default function Review() {
  const nav = useNavigate()

  return (
    <div className="px-4 pt-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">🔄 복습</h1>
      </div>

      {/* 학습 전 안내 */}
      <div className="flex flex-col items-center justify-center text-center mt-16">
        <div className="text-6xl mb-6">📚</div>
        <h2 className="text-lg font-bold mb-2">아직 복습할 단어가 없습니다</h2>
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          학습을 시작하면 복습할 단어가 여기에 나타납니다
        </p>
        <button
          onClick={() => nav('/learn/scripture/dhp1-alphabet')}
          className="rounded-2xl px-6 py-3 text-white font-semibold active:scale-[0.98] transition-transform"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          경전 학습 시작하기
        </button>
      </div>
    </div>
  )
}
