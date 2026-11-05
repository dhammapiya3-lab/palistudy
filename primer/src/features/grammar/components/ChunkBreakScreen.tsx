interface ChunkBreakScreenProps {
  /** 마친 마디 수 (1부터) */
  done: number
  total: number
  lessonTitle: string
  /** 다음 마디 예상 시간(분) */
  nextMinutes: number
  /** 쉬운 화면 — 연꽃잎 문구 없음 */
  easyMode?: boolean
  onContinue: () => void
  onStop: () => void
}

/** 마디 끝 — "오늘 여기까지 해도 좋아요" */
export default function ChunkBreakScreen({ done, total, lessonTitle, nextMinutes, easyMode, onContinue, onStop }: ChunkBreakScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
      role="dialog"
      aria-labelledby="chunk-break-title"
    >
      <div className="bounce-in">
        <span className="text-6xl block" aria-hidden="true">🪷</span>
      </div>
      <p className="text-xs mt-5 font-semibold intro-fade-up-delay" style={{ color: 'var(--color-primary)' }}>
        {lessonTitle}
      </p>
      <h2 id="chunk-break-title" className="text-xl font-bold mt-1 intro-fade-up-delay">
        마디 {done}/{total} 끝! ✓
      </h2>
      <p className="text-sm mt-2 intro-fade-up-delay2" style={{ color: 'var(--color-text-secondary)' }}>
        오늘 여기까지 해도 좋아요.<br />
        다음에 들어오면 이 자리부터 이어서 해요.
      </p>

      {/* 마디 점 */}
      <div className="flex gap-1.5 mt-5 intro-fade-up-delay2" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: i < done ? 'var(--color-primary)' : 'var(--color-border)' }} />
        ))}
      </div>

      <button
        onClick={onContinue}
        autoFocus
        className="mt-8 w-full max-w-xs py-3.5 rounded-2xl text-white font-bold text-sm active:scale-[0.97] transition-transform"
        style={{ backgroundColor: 'var(--color-primary-dark)', minHeight: 48 }}
      >
        다음 마디 계속하기{nextMinutes ? ` (약 ${nextMinutes}분)` : ''}
      </button>
      {!easyMode && (
        <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          새 마디를 시작하면 연꽃잎 5개가 다시 채워져요
        </p>
      )}
      <button
        onClick={onStop}
        className="mt-3 w-full max-w-xs py-3 rounded-2xl font-bold text-sm active:scale-[0.97] transition-transform"
        style={{ color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', minHeight: 48 }}
      >
        오늘은 여기까지
      </button>
    </div>
  )
}
