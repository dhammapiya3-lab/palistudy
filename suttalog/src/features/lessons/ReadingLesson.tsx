// 경전 독해 학습
import { useNavigate, useParams } from 'react-router-dom'
import { speakPali } from '../../utils/pali-tts'
import { closeBasicLesson, finishBasicLesson } from './basics'
import BasicLessonMissing from './BasicLessonMissing'
import { READING_DATA } from './basics-data/reading'

export default function ReadingLesson() {
  const nav = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? READING_DATA[lessonId] : null

  if (!lesson || !lessonId) return <BasicLessonMissing />

  // 발음: 경전 학습 화면과 같은 빠알리 TTS('발음 소리 끄기' 설정을 따름)
  const speak = (text: string) => speakPali(text)

  return (
    <div className="min-h-screen pb-8" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => closeBasicLesson(nav, 'reading', lessonId)} aria-label="레슨 닫기" className="text-xl w-11 h-11 -ml-2 flex items-center justify-center rounded-full shrink-0">✕</button>
        <span className="text-sm font-semibold flex-1 truncate">{lesson.title}</span>
      </div>

      <div className="px-5 pt-4 space-y-6">
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>📜 {lesson.source}</p>

        {lesson.segments.map((seg, i) => (
          <div key={i} className="space-y-3">
            {/* 빠알리 원문 */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p lang="pi" className="pali-text text-lg font-semibold leading-relaxed" style={{ color: 'var(--color-primary)' }}>
                {seg.pali}
              </p>
              <button onClick={() => speak(seg.pali)}
                className="mt-2 text-sm flex items-center gap-1" style={{ color: 'var(--color-accent)' }}>
                🔊 발음 듣기
              </button>
            </div>

            {/* 단어별 분석 */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>📝 단어별 분석</p>
              <div className="space-y-2">
                {seg.wordByWord.map((w, j) => (
                  <button key={j} onClick={() => speak(w.word)}
                    className="flex items-center gap-3 w-full text-left">
                    <span lang="pi" className="pali-text font-bold text-sm min-w-[100px]" style={{ color: 'var(--color-primary)' }}>
                      {w.word}
                    </span>
                    <span className="text-xs">→</span>
                    <span className="text-sm flex-1">{w.meaning}</span>
                    <span className="text-xs" style={{ color: 'var(--color-accent)' }}>🔊</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 번역 */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'color-mix(in srgb, #F9A825 12%, var(--color-surface))', border: '1px solid color-mix(in srgb, #F9A825 40%, var(--color-surface))' }}>
              <p className="text-xs mb-1" style={{ color: '#F57F17' }}>📖 해석</p>
              <p className="text-sm font-medium">{seg.translation}</p>
            </div>

            {i < lesson.segments.length - 1 && (
              <hr style={{ borderColor: 'var(--color-border)' }} />
            )}
          </div>
        ))}

        <button onClick={() => finishBasicLesson(nav, 'reading', lessonId, lesson.title)}
          className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97]"
          style={{ backgroundColor: 'var(--color-primary)' }}>
          다 읽었어요 · 완료 ✓
        </button>
      </div>
    </div>
  )
}
