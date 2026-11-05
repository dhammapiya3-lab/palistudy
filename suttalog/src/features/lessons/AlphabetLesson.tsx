// 알파벳 학습 - 경전 기반
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { preloadLetters, speakLetter, speakPali } from '../../utils/pali-tts'
import { closeBasicLesson, finishBasicLesson } from './basics'
import BasicLessonMissing from './BasicLessonMissing'
import { ALPHABET_DATA } from './basics-data/alphabet'

export default function AlphabetLesson() {
  const nav = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? ALPHABET_DATA[lessonId] : null
  const [phase, setPhase] = useState<'verse' | 'letters' | 'quiz'>('verse')
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  useEffect(() => { preloadLetters() }, [])

  if (!lesson || !lessonId) return <BasicLessonMissing />

  const quizSteps = lesson.steps.filter(s => s.type === 'quiz')
  const currentQuiz = quizSteps[quizIndex]

  // 발음: 경전 학습 화면과 같은 빠알리 목소리('발음 소리 끄기' 설정을 따름)
  // 글자 하나는 빠알리 프라이머 '자모와 발음 2'에서 고른 글자 목소리(speakLetter)로
  const speak = (text: string) => speakPali(text)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* 상단바 */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => closeBasicLesson(nav, 'alphabet', lessonId)} aria-label="레슨 닫기" className="text-xl w-11 h-11 -ml-2 flex items-center justify-center rounded-full shrink-0">✕</button>
        <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
          <div className="h-full rounded-full transition-all" style={{
            width: phase === 'verse' ? '10%' : phase === 'letters' ? '40%' : `${40 + (quizIndex / Math.max(quizSteps.length, 1)) * 60}%`,
            backgroundColor: 'var(--color-primary)',
          }} />
        </div>
        <span className="text-xs max-w-[40%] truncate" style={{ color: 'var(--color-text-secondary)' }}>{lesson.title}</span>
      </div>

      {/* === 1단계: 경전 제시 + 발음 + 해석 === */}
      {phase === 'verse' && (
        <div className="px-5 pt-4 space-y-5">
          <div>
            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
              📜 {lesson.source}
            </span>
            <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>{lesson.focus}</p>
          </div>

          {/* 경전 원문 */}
          <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p lang="pi" className="pali-text text-lg leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-primary)' }}>
              {lesson.verse}
            </p>

            {/* TTS 버튼 */}
            <button onClick={() => speak(lesson.verse.replace(/\n/g, ' '))}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white active:scale-95 transition-transform"
              style={{ backgroundColor: 'var(--color-accent)' }}>
              🔊 전체 발음 듣기
            </button>
          </div>

          {/* 한국어 해석 */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: 'color-mix(in srgb, #F9A825 12%, var(--color-surface))', border: '1px solid color-mix(in srgb, #F9A825 40%, var(--color-surface))' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: '#F57F17' }}>📖 해석</p>
            <p className="text-sm whitespace-pre-line leading-relaxed">{lesson.translationKo}</p>
          </div>

          {/* 로마자 읽기 가이드 */}
          {lesson.roman && (
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>🗣️ 읽기 가이드 (음절 분리)</p>
              <p lang="pi" className="pali-text text-base">{lesson.roman}</p>
              <button onClick={() => speak(lesson.roman.replace(/-/g, ''))}
                className="mt-2 text-xs flex items-center gap-1" style={{ color: 'var(--color-accent)' }}>
                🔊 천천히 듣기
              </button>
            </div>
          )}

          <button onClick={() => setPhase('letters')}
            className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97] transition-transform"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            글자 분석하기 →
          </button>
        </div>
      )}

      {/* === 2단계: 글자별 학습 === */}
      {phase === 'letters' && (
        <div className="px-5 pt-4 space-y-4">
          <h2 className="text-lg font-bold">글자별 발음 학습</h2>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            각 글자를 탭하여 발음을 들어보세요
          </p>

          <div className="space-y-3">
            {lesson.letters.map((l, i) => (
              <button key={i} onClick={() => speakLetter(l.char)}
                className="w-full rounded-xl p-4 text-left active:scale-[0.98] transition-all"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center gap-4">
                  {/* 글자 */}
                  <div lang="pi" className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold pali-text"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                    {l.char}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>{l.type}</span>
                      <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>{l.ipa}</span>
                    </div>
                    <p className="font-semibold text-sm mt-1">🇰🇷 {l.ko}</p>
                    <p className="text-xs mt-0.5 pali-font" style={{ color: 'var(--color-text-secondary)' }}>
                      예: {l.example}
                    </p>
                  </div>
                  <span style={{ color: 'var(--color-accent)' }}>🔊</span>
                </div>
              </button>
            ))}
          </div>

          <button onClick={() => { setPhase('quiz'); setQuizIndex(0) }}
            className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97] transition-transform"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            퀴즈로 확인하기 →
          </button>
        </div>
      )}

      {/* === 3단계: 퀴즈 === */}
      {phase === 'quiz' && currentQuiz && (
        <div className="px-5 pt-4 space-y-5">
          <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
            퀴즈 {quizIndex + 1}/{quizSteps.length}
          </span>

          <h2 className="text-lg font-bold">{currentQuiz.content}</h2>

          <div className="space-y-3">
            {currentQuiz.options?.map((opt, i) => {
              const isAnswer = showResult && i === currentQuiz.answer
              const isWrong = showResult && selected === i && i !== currentQuiz.answer
              return (
                <button key={i} onClick={() => !showResult && setSelected(i)}
                  disabled={showResult}
                  className="w-full p-4 rounded-xl text-left text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isAnswer ? 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))' : isWrong ? 'color-mix(in srgb, var(--color-error) 10%, var(--color-surface))' : 'var(--color-surface)',
                    border: isAnswer ? '2px solid #4CAF50' : isWrong ? '2px solid #F44336' : selected === i ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                  }}>
                  {isAnswer && '✅ '}{isWrong && '❌ '}{opt}
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className="rounded-xl p-3" style={{ backgroundColor: selected === currentQuiz.answer ? 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))' : 'color-mix(in srgb, var(--color-error) 10%, var(--color-surface))' }}>
              <p className="text-sm font-bold">{selected === currentQuiz.answer ? '✅ Sādhu! 정답!' : '❌ 오답'}</p>
            </div>
          )}

          <button
            onClick={() => {
              if (!showResult) {
                setShowResult(true)
              } else if (quizIndex + 1 < quizSteps.length) {
                setQuizIndex(i => i + 1)
                setSelected(null)
                setShowResult(false)
              } else {
                finishBasicLesson(nav, 'alphabet', lessonId, lesson.title)
              }
            }}
            disabled={selected === null && !showResult}
            className="w-full py-4 rounded-xl text-white font-bold disabled:opacity-40 active:scale-[0.97] transition-transform"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            {showResult ? (quizIndex + 1 < quizSteps.length ? '다음 문제' : '완료!') : '확인'}
          </button>
        </div>
      )}

      {/* 퀴즈 끝 */}
      {phase === 'quiz' && !currentQuiz && (
        <div className="px-5 pt-20 text-center">
          <p className="text-5xl">🪷✨</p>
          <p className="text-xl font-bold mt-4" style={{ color: 'var(--color-primary)' }}>Sādhu!</p>
          <button onClick={() => finishBasicLesson(nav, 'alphabet', lessonId, lesson.title)}
            className="mt-8 px-8 py-4 rounded-xl text-white font-bold"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            완료
          </button>
        </div>
      )}
    </div>
  )
}
