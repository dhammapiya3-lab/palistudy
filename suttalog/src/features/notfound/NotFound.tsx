// 없는 주소로 들어왔을 때 보여 주는 화면
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const nav = useNavigate()
  return (
    <div className="px-6 pt-20 flex flex-col items-center text-center">
      <div className="text-6xl mb-4" aria-hidden="true">🪷</div>
      <h1 className="text-xl font-bold mb-2">찾는 화면이 없어요</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
        주소가 바뀌었거나 잘못 입력된 것 같습니다.<br />아래 버튼으로 돌아가 주세요.
      </p>
      <button onClick={() => nav('/', { replace: true })}
        className="w-full max-w-xs py-3.5 rounded-xl text-white font-bold active:scale-[0.97] transition-transform"
        style={{ background: 'var(--color-primary-gradient)' }}>
        홈으로 가기
      </button>
      <button onClick={() => nav('/map', { replace: true })}
        className="w-full max-w-xs py-3 mt-2 text-sm font-semibold"
        style={{ color: 'var(--color-primary)' }}>
        학습맵 보기
      </button>
    </div>
  )
}
