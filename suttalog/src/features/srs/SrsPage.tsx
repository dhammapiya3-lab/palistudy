// SRS 플래시카드 복습
import { useState } from 'react'
import Card from '../../components/Card'
import { useSrs } from '../../hooks/useSrs'
import { SRS_CONFIG } from '../../config/srs'

export default function SrsPage() {
  const { dueCards, dueCount, currentCard, loading, reviewCard, refresh } = useSrs()
  const [showAnswer, setShowAnswer] = useState(false)

  const handleGrade = async (grade: number) => {
    await reviewCard(grade)
    setShowAnswer(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p style={{ color: 'var(--color-text-secondary)' }}>카드 로딩 중...</p>
      </div>
    )
  }

  if (!currentCard) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">🔄 플래시카드</h1>
        <Card>
          <div className="text-center py-8">
            <span className="text-4xl">🎉</span>
            <p className="mt-4 font-semibold">
              {dueCount === 0 ? '모든 복습을 완료했습니다!' : '복습할 카드가 없습니다.'}
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
              경전을 읽으면서 새 카드를 추가해보세요.
            </p>
            <button
              onClick={refresh}
              className="mt-4 px-4 py-2 rounded-lg text-sm text-white"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              새로고침
            </button>
          </div>
        </Card>
      </div>
    )
  }

  const remaining = dueCards.length - dueCards.indexOf(currentCard)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">🔄 플래시카드</h1>
        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          남은 {remaining}장
        </span>
      </div>

      {/* 카드 */}
      <Card
        onClick={() => !showAnswer && setShowAnswer(true)}
        className="min-h-[200px] flex flex-col justify-center"
      >
        {/* 앞면: 빠알리 */}
        <div className="text-center">
          <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            {currentCard.suttaUid.toUpperCase()}
          </p>
          <p className="pali-text text-lg">{currentCard.front}</p>
        </div>

        {/* 뒷면: 번역 */}
        {showAnswer && (
          <div className="mt-6 pt-4 border-t text-center" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-sm">{currentCard.back}</p>
          </div>
        )}

        {!showAnswer && (
          <p className="text-xs text-center mt-6" style={{ color: 'var(--color-text-secondary)' }}>
            탭하여 번역 보기
          </p>
        )}
      </Card>

      {/* 난이도 버튼 */}
      {showAnswer && (
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map(grade => (
            <button
              key={grade}
              onClick={() => handleGrade(grade)}
              className="py-3 rounded-lg text-sm font-medium text-white"
              style={{
                backgroundColor: grade === 0 ? '#EF4444'
                  : grade === 1 ? '#F59E0B'
                  : grade === 2 ? '#10B981'
                  : '#3B82F6',
              }}
            >
              {SRS_CONFIG.GRADE_LABELS[grade]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
