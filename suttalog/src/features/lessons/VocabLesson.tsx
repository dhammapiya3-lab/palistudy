// 단어 학습 - 경전 기반
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { speakPali } from '../../utils/pali-tts'
import { closeBasicLesson, finishBasicLesson } from './basics'
import BasicLessonMissing from './BasicLessonMissing'
import { VOCAB_DATA } from './basics-data/vocab'

export default function VocabLesson() {
  const nav = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? VOCAB_DATA[lessonId] : null
  const [phase, setPhase] = useState<'verse' | 'words'>('verse')
  const [wordIndex, setWordIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (!lesson || !lessonId) return <BasicLessonMissing />

  // 발음: 경전 학습 화면과 같은 빠알리 TTS('발음 소리 끄기' 설정을 따름)
  const speak = (text: string) => speakPali(text)

  const word = lesson.words[wordIndex]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* 상단바 */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => closeBasicLesson(nav, 'vocab', lessonId)} aria-label="레슨 닫기" className="text-xl w-11 h-11 -ml-2 flex items-center justify-center rounded-full shrink-0">✕</button>
        <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
          <div className="h-full rounded-full transition-all" style={{
            width: phase === 'verse' ? '10%' : `${10 + (wordIndex / lesson.words.length) * 90}%`,
            backgroundColor: 'var(--color-primary)',
          }} />
        </div>
      </div>

      {/* 1단계: 경전 문맥 */}
      {phase === 'verse' && (
        <div className="px-5 pt-4 space-y-5">
          <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
            💬 {lesson.title}
          </span>
          <h2 className="text-lg font-bold">경전에서 만나는 단어</h2>

          <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>📜 {lesson.source}</p>
            <p lang="pi" className="pali-text text-lg leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-primary)' }}>
              {lesson.sourceVerse}
            </p>
            <button onClick={() => speak(lesson.sourceVerse.replace(/\n/g, ' '))}
              className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white"
              style={{ backgroundColor: 'var(--color-accent)' }}>
              🔊 발음 듣기
            </button>
          </div>

          <div className="rounded-2xl p-4" style={{ backgroundColor: 'color-mix(in srgb, #F9A825 12%, var(--color-surface))', border: '1px solid color-mix(in srgb, #F9A825 40%, var(--color-surface))' }}>
            <p className="text-sm whitespace-pre-line">{lesson.sourceKo}</p>
          </div>

          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            이 구절에서 {lesson.words.length}개의 핵심 단어를 배웁니다
          </p>

          <button onClick={() => setPhase('words')}
            className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97]"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            단어 학습 시작 →
          </button>
        </div>
      )}

      {/* 2단계: 단어 카드 */}
      {phase === 'words' && word && (
        <div className="px-5 pt-4 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{wordIndex + 1} / {lesson.words.length}</span>
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>‘뜻 보기’를 눌러 확인</span>
          </div>

          {/* 단어 카드 — 카드(뜻 보기)와 발음 버튼을 겹치지 않게 분리(버튼 안 버튼 금지) */}
          <div className="w-full rounded-2xl p-6 min-h-[300px] flex flex-col justify-center items-center text-center"
            style={{ backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-border)' }}>

            <p lang="pi" className="pali-text text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{word.pali}</p>

            <button onClick={() => speak(word.pali)}
              className="mt-3 text-sm flex items-center gap-1 px-3 py-2 rounded-full" style={{ color: 'var(--color-accent)' }}>
              🔊 발음 듣기
            </button>

            <p className="text-xs font-mono mt-2" style={{ color: 'var(--color-text-secondary)' }}>{word.ipa}</p>

            {flipped ? (
              <>
                <hr className="w-full my-4" style={{ borderColor: 'var(--color-border)' }} />
                <p className="text-xl font-bold">{word.ko}</p>
                <p className="text-xs mt-2 px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
                  {word.grammar}
                </p>
                {word.root && (
                  <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                    어근: {word.root}
                  </p>
                )}
              </>
            ) : (
              <button onClick={() => setFlipped(true)}
                className="mt-5 px-5 py-2.5 rounded-full text-sm font-semibold active:scale-95 transition-transform"
                style={{ border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)' }}>
                뜻 보기
              </button>
            )}
          </div>

          {/* 다음/이전 */}
          <div className="flex gap-3">
            {wordIndex > 0 && (
              <button onClick={() => { setWordIndex(i => i - 1); setFlipped(false) }}
                className="flex-1 py-3 rounded-xl font-medium text-sm"
                style={{ border: '2px solid var(--color-border)' }}>
                ← 이전
              </button>
            )}
            <button onClick={() => {
              if (wordIndex + 1 < lesson.words.length) {
                setWordIndex(i => i + 1); setFlipped(false)
              } else {
                finishBasicLesson(nav, 'vocab', lessonId, lesson.title)
              }
            }}
              className="flex-1 py-3 rounded-xl text-white font-bold active:scale-[0.97]"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              {wordIndex + 1 < lesson.words.length ? '다음 단어 →' : '완료! 🪷'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
