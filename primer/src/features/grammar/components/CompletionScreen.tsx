
interface CompletionScreenProps {
  correctCount: number
  hearts: number
  elapsed: number
  onHome: () => void
  onRestart: () => void
}

export default function CompletionScreen({
  correctCount,
  hearts,
  elapsed,
  onHome,
  onRestart
}: CompletionScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      <div className="bounce-in">
        <span className="text-7xl block mb-2">🎉</span>
        <span className="text-5xl block">🪷</span>
      </div>
      <h2
        className="text-2xl font-bold mt-6 intro-fade-up-delay"
        style={{ color: 'var(--color-primary)' }}
      >
        수고하셨습니다!
      </h2>
      <p
        className="text-sm mt-2 intro-fade-up-delay2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        이 과를 모두 마쳤습니다
      </p>

      {/* 통계 카드 */}
      <div
        className="mt-6 w-full max-w-xs rounded-2xl p-4 intro-fade-up-delay2"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div className="flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
              {correctCount}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              정답
            </p>
          </div>
          <div
            className="w-px"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
              {hearts}/5
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              연꽃잎
            </p>
          </div>
          <div
            className="w-px"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-primary-light)' }}>
              {elapsed || '<1'}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              분
            </p>
          </div>
        </div>
      </div>

      {/* CTA 버튼 */}
      <button
        onClick={onHome}
        className="mt-8 w-full max-w-xs py-3.5 rounded-2xl text-white font-bold text-sm
                   active:scale-[0.97] transition-transform"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        홈으로 돌아가기
      </button>
      <button
        onClick={onRestart}
        className="mt-3 w-full max-w-xs py-3 rounded-2xl font-bold text-sm
                   active:scale-[0.97] transition-transform"
        style={{
          color: 'var(--color-primary)',
          border: '1.5px solid var(--color-primary)',
        }}
      >
        다시 학습하기
      </button>
    </div>
  )
}
