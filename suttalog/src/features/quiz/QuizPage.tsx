// 퀴즈 페이지 (빈칸 채우기, 번역 매칭)
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useSutta } from '../../hooks/useSutta'
import Card from '../../components/Card'

interface QuizQuestion {
  type: 'fill-blank' | 'match' | 'multiple-choice'
  question: string
  answer: string
  options?: string[]
  segmentId: string
}

// 세그먼트에서 퀴즈 문제 자동 생성
function generateQuestions(
  rootText: Record<string, string>,
  translationText: Record<string, string>,
  count = 5,
): QuizQuestion[] {
  const segIds = Object.keys(rootText).filter(id =>
    rootText[id]?.trim() && translationText?.[id]?.trim()
  )

  if (segIds.length === 0) return []

  const questions: QuizQuestion[] = []
  const shuffled = [...segIds].sort(() => Math.random() - 0.5).slice(0, count * 2)

  for (const segId of shuffled) {
    if (questions.length >= count) break

    const pali = rootText[segId].trim()
    const translation = translationText[segId]?.trim()
    if (!pali || !translation) continue

    const paliWords = pali.split(/\s+/).filter(w => w.length > 3)
    if (paliWords.length < 2) continue

    // 빈칸 채우기: 빠알리 단어 하나를 빈칸으로
    const blankIndex = Math.floor(Math.random() * paliWords.length)
    const answer = paliWords[blankIndex]
    const blanked = paliWords.map((w, i) => i === blankIndex ? '______' : w).join(' ')

    questions.push({
      type: 'fill-blank',
      question: blanked,
      answer,
      segmentId: segId,
    })
  }

  // 번역 매칭 문제 추가
  const matchSegs = shuffled.slice(0, Math.min(3, shuffled.length))
  for (const segId of matchSegs) {
    if (questions.length >= count) break
    const pali = rootText[segId]?.trim()
    const translation = translationText[segId]?.trim()
    if (!pali || !translation) continue

    // 다른 번역들을 오답으로
    const otherTranslations = segIds
      .filter(id => id !== segId && translationText[id]?.trim())
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(id => translationText[id].trim())

    if (otherTranslations.length < 2) continue

    const options = [translation, ...otherTranslations].sort(() => Math.random() - 0.5)

    questions.push({
      type: 'multiple-choice',
      question: pali,
      answer: translation,
      options,
      segmentId: segId,
    })
  }

  return questions.sort(() => Math.random() - 0.5).slice(0, count)
}

export default function QuizPage() {
  const { uid } = useParams<{ uid: string }>()
  const navigate = useNavigate()
  const { sutta, loading, error } = useSutta(uid)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const questions = useMemo(() => {
    if (!sutta) return []
    return generateQuestions(sutta.root_text, sutta.translation_text)
  }, [sutta])

  const currentQ = questions[currentIndex]

  const checkAnswer = () => {
    if (!currentQ) return
    const isCorrect = currentQ.type === 'fill-blank'
      ? userAnswer.toLowerCase().trim() === currentQ.answer.toLowerCase().trim()
      : userAnswer === currentQ.answer
    if (isCorrect) setScore(s => s + 1)
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setQuizDone(true)
    } else {
      setCurrentIndex(i => i + 1)
      setUserAnswer('')
      setShowResult(false)
    }
  }

  if (loading) {
    return <p style={{ color: 'var(--color-text-secondary)' }}>퀴즈 준비 중...</p>
  }

  if (error) {
    return <p className="text-red-500">오류: {error}</p>
  }

  if (questions.length === 0) {
    return (
      <div className="space-y-4">
        <button onClick={() => navigate(-1)} className="text-sm" style={{ color: 'var(--color-primary)' }}>
          ← 돌아가기
        </button>
        <Card>
          <p className="text-center py-8" style={{ color: 'var(--color-text-secondary)' }}>
            이 경전에서는 퀴즈를 생성할 수 없습니다.
          </p>
        </Card>
      </div>
    )
  }

  if (quizDone) {
    const percent = Math.round((score / questions.length) * 100)
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">📝 퀴즈 결과</h1>
        <Card>
          <div className="text-center py-8">
            <span className="text-4xl">{percent >= 80 ? '🎉' : percent >= 50 ? '👏' : '📚'}</span>
            <p className="text-2xl font-bold mt-4" style={{ color: 'var(--color-primary)' }}>
              {score}/{questions.length}
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
              정답률 {percent}%
            </p>
          </div>
        </Card>
        <button
          onClick={() => navigate(`/read/${uid}`)}
          className="w-full py-3 rounded-lg text-sm text-white font-medium"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          경전으로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-sm" style={{ color: 'var(--color-primary)' }}>
          ← 돌아가기
        </button>
        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      <h1 className="text-lg font-bold">
        📝 {uid?.toUpperCase()} 퀴즈
      </h1>

      <Card>
        <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          {currentQ.type === 'fill-blank' ? '빈칸을 채우세요' : '올바른 번역을 선택하세요'}
        </p>
        <p className="pali-text text-base">{currentQ.question}</p>
      </Card>

      {/* 빈칸 채우기 */}
      {currentQ.type === 'fill-blank' && (
        <div className="space-y-2">
          <input
            type="text"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !showResult && checkAnswer()}
            placeholder="빠알리 단어를 입력하세요"
            className="w-full px-4 py-3 rounded-lg text-sm pali-text"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
            disabled={showResult}
          />
        </div>
      )}

      {/* 객관식 */}
      {currentQ.type === 'multiple-choice' && (
        <div className="space-y-2">
          {currentQ.options?.map((opt, i) => (
            <button
              key={i}
              onClick={() => { setUserAnswer(opt); if (!showResult) { setUserAnswer(opt) } }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm ${
                showResult
                  ? opt === currentQ.answer
                    ? 'ring-2 ring-green-500'
                    : opt === userAnswer && opt !== currentQ.answer
                    ? 'ring-2 ring-red-500'
                    : ''
                  : userAnswer === opt
                  ? 'ring-2'
                  : ''
              }`}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                outlineColor: !showResult ? 'var(--color-primary)' : undefined,
              }}
              disabled={showResult}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* 결과 표시 */}
      {showResult && (
        <Card className={userAnswer.toLowerCase().trim() === currentQ.answer.toLowerCase().trim()
          || userAnswer === currentQ.answer
          ? '!border-green-500' : '!border-red-500'}>
          <p className="text-sm">
            정답: <span className="font-bold pali-text">{currentQ.answer}</span>
          </p>
        </Card>
      )}

      {/* 액션 버튼 */}
      <button
        onClick={showResult ? nextQuestion : checkAnswer}
        disabled={!userAnswer && currentQ.type === 'fill-blank'}
        className="w-full py-3 rounded-lg text-sm text-white font-medium disabled:opacity-50"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {showResult ? '다음 문제' : '확인'}
      </button>
    </div>
  )
}
