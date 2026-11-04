// 일반 레슨 주소가 틀렸을 때(데이터 없음) 보여 주는 화면
import { useNavigate } from 'react-router-dom'

export default function BasicLessonMissing() {
  const nav = useNavigate()
  return (
    <div className="min-h-dvh px-6 pt-24 text-center" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <p className="text-5xl mb-4" aria-hidden="true">🪷</p>
      <p className="text-lg font-bold mb-2">레슨을 찾을 수 없어요</p>
      <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>주소가 바뀌었거나 아직 준비 중인 레슨입니다.</p>
      <button onClick={() => nav('/map', { replace: true })}
        className="w-full max-w-xs py-3.5 rounded-xl text-white font-bold" style={{ background: 'var(--color-primary-gradient)' }}>
        학습맵으로 돌아가기
      </button>
    </div>
  )
}
