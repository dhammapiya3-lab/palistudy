// 레슨 완료 축하 화면
import { useNavigate } from 'react-router-dom'

export default function LessonComplete() {
  const nav = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>

      {/* 연꽃 축하 */}
      <div className="text-7xl mb-4">🪷✨</div>
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
        Sādhu! Sādhu!
      </h1>
      <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>훌륭합니다!</p>

      {/* 결과 카드 */}
      <div className="w-full mt-8 rounded-2xl p-5 space-y-3"
        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="flex justify-between">
          <span className="text-sm">정확도</span>
          <span className="font-bold" style={{ color: 'var(--color-accent)' }}>87%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">획득 공덕</span>
          <span className="font-bold" style={{ color: 'var(--color-primary)' }}>+15 💎</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">새 단어</span>
          <span className="font-bold">4개</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">소요 시간</span>
          <span className="font-bold">4분 32초</span>
        </div>
      </div>

      {/* 법구경 명언 */}
      <div className="w-full mt-5 rounded-2xl p-4"
        style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}>
        <p className="text-xs mb-2" style={{ color: '#F57F17' }}>📜 법구경 제183게</p>
        <p className="pali-text text-sm" style={{ color: 'var(--color-primary)' }}>
          "Sabbapāpassa akaraṇaṃ,<br/>
          kusalassa upasampadā,<br/>
          sacittapariyodapanaṃ —<br/>
          etaṃ buddhāna sāsanaṃ."
        </p>
        <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          모든 악을 짓지 말고, 선을 받들어 행하며,<br/>
          스스로 마음을 깨끗이 하라 — 이것이 모든 부처님의 가르침이다.
        </p>
      </div>

      {/* 버튼 */}
      <div className="w-full mt-8 space-y-3">
        <button
          onClick={() => nav('/lesson/6')}
          className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97] transition-transform"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          다음 레슨 계속하기
        </button>
        <button
          onClick={() => nav('/')}
          className="w-full py-3 text-sm font-medium"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  )
}
