// 경전 독해 학습
import { useNavigate, useParams } from 'react-router-dom'
import { speakPali } from '../../utils/pali-tts'
import { closeBasicLesson, finishBasicLesson } from './basics'
import BasicLessonMissing from './BasicLessonMissing'

const READING_DATA: Record<string, {
  title: string; source: string;
  segments: { pali: string; wordByWord: { word: string; meaning: string }[]; translation: string }[];
}> = {
  evam: {
    title: '"Evaṃ me sutaṃ" 경전 서두 정형구',
    source: '모든 경전의 첫 구절',
    segments: [
      {
        pali: 'Evaṃ me sutaṃ —',
        wordByWord: [
          { word: 'Evaṃ', meaning: '이와 같이' },
          { word: 'me', meaning: '나에 의해 (by me) — 단축형 me, 여기서는 구격(행위자) 기능' },
          { word: 'sutaṃ', meaning: '들려진 (heard)' },
        ],
        translation: '이와 같이 나는 들었다 —',
      },
      {
        pali: 'ekaṃ samayaṃ bhagavā',
        wordByWord: [
          { word: 'ekaṃ', meaning: '한 (one)' },
          { word: 'samayaṃ', meaning: '때에 (occasion)' },
          { word: 'bhagavā', meaning: '세존께서 (the Blessed One)' },
        ],
        translation: '한 때 세존께서',
      },
      {
        pali: 'Bārāṇasiyaṃ viharati Isipatane Migadāye.',
        wordByWord: [
          { word: 'Bārāṇasiyaṃ', meaning: '바라나시에서 (7격 처격)' },
          { word: 'viharati', meaning: '머무시다 (dwells)' },
          { word: 'Isipatane', meaning: '이시빠따나에 (7격)' },
          { word: 'Migadāye', meaning: '녹야원에 (7격, Deer Park)' },
        ],
        translation: '바라나시의 녹야원, 이시빠따나에 머무셨다.',
      },
    ],
  },
  'sn56-11': {
    title: 'SN 56.11 전법륜경 (첫 설법)',
    source: 'Saṃyutta Nikāya 56.11 Dhammacakkappavattana',
    segments: [
      {
        pali: '"Dveme, bhikkhave, antā pabbajitena na sevitabbā."',
        wordByWord: [
          { word: 'Dve', meaning: '두 가지 (two)' },
          { word: 'ime', meaning: '이러한 (these)' },
          { word: 'bhikkhave', meaning: '비구들이여 (호격)' },
          { word: 'antā', meaning: '극단들이 (extremes)' },
          { word: 'pabbajitena', meaning: '출가자에 의해 (3격)' },
          { word: 'na', meaning: '~않다 (not)' },
          { word: 'sevitabbā', meaning: '따라야 할 (to be followed)' },
        ],
        translation: '"비구들이여, 출가자가 따르지 말아야 할 두 가지 극단이 있다."',
      },
    ],
  },
}

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
            <div className="rounded-2xl p-4" style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}>
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
