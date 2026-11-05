
interface CompletionScreenProps {
  correctCount: number
  quizTotal: number
  isReview?: boolean
  hearts: number
  elapsed: number
  onHome: () => void
  onRestart: () => void
  /** 다음 과 제목 (없으면 버튼 없음) */
  nextLessonTitle?: string
  onNextLesson?: () => void
  /** 틀리거나 건너뛴 문제 수 */
  wrongCount?: number
  onRetryWrong?: () => void
  /** 아직 열지 않은 '더 알아보기' 묶음 */
  moreGroups?: string[]
  onOpenMore?: (group: string) => void
  /** 1과를 마친 뒤 '글자 쓰기도 해 볼까요?' */
  writingOffer?: boolean
  onWritingOffer?: (accept: boolean) => void
  /** 쉬운 화면 — 연꽃잎 칸 없음 */
  easyMode?: boolean
}

export default function CompletionScreen({
  correctCount,
  quizTotal,
  isReview,
  hearts,
  elapsed,
  onHome,
  onRestart,
  nextLessonTitle,
  onNextLesson,
  wrongCount = 0,
  onRetryWrong,
  moreGroups = [],
  onOpenMore,
  writingOffer,
  onWritingOffer,
  easyMode,
}: CompletionScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center"
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
        {isReview ? '복습을 마쳤습니다' : '이 과를 모두 마쳤습니다'}
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
              {correctCount}<span className="text-base font-semibold opacity-70">/{quizTotal}</span>
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              정답
            </p>
          </div>
          {!easyMode && (
            <>
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
            </>
          )}
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

      {/* 1과를 마친 뒤 — 글자 쓰기 권유 */}
      {writingOffer && onWritingOffer && (
        <div className="mt-5 w-full max-w-xs rounded-2xl p-4 text-left intro-fade-up-delay2"
          style={{ backgroundColor: 'var(--color-info-bg)', border: '1px solid var(--color-info-border)' }}>
          <p className="text-sm font-bold">✍️ 글자 쓰기도 해 볼까요?</p>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            손가락으로 낱말을 따라 써 보는 단계가 과마다 몇 개 들어가요. 흐린 글자를 따라 쓰면 돼요. (설정에서 언제든 끌 수 있어요)
          </p>
          <div className="flex gap-2 mt-3">
            <button onClick={() => onWritingOffer(true)}
              className="flex-1 py-2.5 rounded-xl text-white font-bold text-xs active:scale-[0.97] transition-transform"
              style={{ backgroundColor: 'var(--color-primary-dark)', minHeight: 44 }}>쓰기 켜기</button>
            <button onClick={() => onWritingOffer(false)}
              className="flex-1 py-2.5 rounded-xl font-bold text-xs active:scale-[0.97] transition-transform"
              style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', minHeight: 44 }}>괜찮아요</button>
          </div>
        </div>
      )}

      {/* CTA 버튼 — 다음 과로 이어 가기가 먼저 */}
      {nextLessonTitle && onNextLesson ? (
        <button
          onClick={onNextLesson}
          autoFocus
          className="mt-8 w-full max-w-xs py-3.5 rounded-2xl text-white font-bold text-sm
                     active:scale-[0.97] transition-transform"
          style={{ backgroundColor: 'var(--color-primary-dark)', minHeight: 48 }}
        >
          다음: {nextLessonTitle} →
        </button>
      ) : (
        <button
          onClick={onHome}
          className="mt-8 w-full max-w-xs py-3.5 rounded-2xl text-white font-bold text-sm
                     active:scale-[0.97] transition-transform"
          style={{ backgroundColor: 'var(--color-primary-dark)', minHeight: 48 }}
        >
          돌아가기
        </button>
      )}

      {/* 틀리거나 건너뛴 문제 다시 풀기 */}
      {wrongCount > 0 && onRetryWrong && (
        <button
          onClick={onRetryWrong}
          className="mt-3 w-full max-w-xs py-3 rounded-2xl font-bold text-sm
                     active:scale-[0.97] transition-transform"
          style={{ color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', minHeight: 48 }}
        >
          틀리거나 건너뛴 문제 {wrongCount}개 다시 풀기
        </button>
      )}

      {/* 더 알아보기 */}
      {moreGroups.length > 0 && onOpenMore && (
        <div className="mt-5 w-full max-w-xs text-left">
          <p className="text-xs font-bold mb-2" style={{ color: 'var(--color-text-secondary)' }}>더 알아보기 (원하면)</p>
          <div className="space-y-2">
            {moreGroups.map(g => (
              <button key={g} onClick={() => onOpenMore(g)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium active:scale-[0.98] transition-transform"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', minHeight: 48 }}>
                <span>📖 {g}</span>
                <span aria-hidden="true" style={{ color: 'var(--color-text-secondary)' }}>›</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 보조 버튼 */}
      <div className="mt-5 flex items-center gap-4">
        {nextLessonTitle && onNextLesson && (
          <button onClick={onHome} className="text-sm font-medium px-2"
            style={{ color: 'var(--color-text-secondary)', minHeight: 44 }}>
            돌아가기
          </button>
        )}
        <button onClick={onRestart} className="text-sm font-medium px-2"
          style={{ color: 'var(--color-text-secondary)', minHeight: 44 }}>
          {isReview ? '다른 문제로 다시' : '처음부터 다시 보기'}
        </button>
      </div>
    </div>
  )
}
