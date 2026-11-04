
interface GameOverScreenProps {
  stepIdx: number
  totalSteps: number
  onRestart: () => void
  onRestartFromQuiz: () => void
  onHome: () => void
  firstQuizIdx: number
}

export default function GameOverScreen({
  stepIdx,
  totalSteps,
  onRestart,
  onRestartFromQuiz,
  onHome,
  firstQuizIdx
}: GameOverScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      <div className="bounce-in">
        <span className="text-7xl block">🥀</span>
      </div>
      <h2 className="text-xl font-bold mt-6 intro-fade-up-delay">
        연꽃잎을 모두 잃었습니다
      </h2>
      <p
        className="text-sm mt-2 intro-fade-up-delay2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        괜찮아요, 다시 도전하면 됩니다!
      </p>
      <p
        className="text-xs mt-1 intro-fade-up-delay2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {stepIdx + 1}/{totalSteps} 단계까지 진행했습니다
      </p>
      <button
        onClick={onRestart}
        className="mt-8 w-60 py-3.5 rounded-2xl text-white font-bold text-sm
                   active:scale-[0.97] transition-transform"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        처음부터 다시
      </button>
      {firstQuizIdx >= 0 && firstQuizIdx !== 0 && (
        <button
          onClick={onRestartFromQuiz}
          className="mt-3 w-60 py-3.5 rounded-2xl font-bold text-sm
                     active:scale-[0.97] transition-transform"
          style={{
            color: 'var(--color-primary)',
            border: '1.5px solid var(--color-primary)',
          }}
        >
          첫 퀴즈부터 다시
        </button>
      )}
      <button
        onClick={onHome}
        className="mt-3 text-sm font-medium"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        홈으로 돌아가기
      </button>
    </div>
  )
}
