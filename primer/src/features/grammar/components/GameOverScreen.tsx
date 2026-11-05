
interface GameOverScreenProps {
  stepIdx: number
  totalSteps: number
  onRestart: () => void
  onRestartFromQuiz: () => void
  onHome: () => void
  firstQuizIdx: number
  /** 마디로 나뉜 과면 — 이 마디만 다시 */
  onRestartChunk?: () => void
  chunkLabel?: string
}

export default function GameOverScreen({
  stepIdx,
  totalSteps,
  onRestart,
  onRestartFromQuiz,
  onHome,
  firstQuizIdx,
  onRestartChunk,
  chunkLabel,
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
      {onRestartChunk && (
        <p className="text-xs mt-1 intro-fade-up-delay2" style={{ color: 'var(--color-text-secondary)' }}>
          앞에서 마친 마디는 그대로 남아 있어요.
        </p>
      )}
      <p
        className="text-xs mt-1 intro-fade-up-delay2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {stepIdx + 1}/{totalSteps} 단계까지 진행했습니다
      </p>
      {onRestartChunk && (
        <button
          onClick={onRestartChunk}
          autoFocus
          className="mt-8 w-60 py-3.5 rounded-2xl text-white font-bold text-sm
                     active:scale-[0.97] transition-transform"
          style={{ backgroundColor: 'var(--color-primary-dark)' }}
        >
          이 마디만 다시{chunkLabel ? ` (${chunkLabel})` : ''}
        </button>
      )}
      <button
        onClick={onRestart}
        className={`${onRestartChunk ? 'mt-3' : 'mt-8'} w-60 py-3.5 rounded-2xl font-bold text-sm
                   active:scale-[0.97] transition-transform`}
        style={onRestartChunk
          ? { color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)' }
          : { backgroundColor: 'var(--color-primary-dark)', color: 'white' }}
      >
        처음부터 다시
      </button>
      {!onRestartChunk && firstQuizIdx >= 0 && firstQuizIdx !== 0 && (
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
        className="mt-3 text-sm font-medium px-4"
        style={{ color: 'var(--color-text-secondary)', minHeight: 44 }}
      >
        나가기
      </button>
    </div>
  )
}
