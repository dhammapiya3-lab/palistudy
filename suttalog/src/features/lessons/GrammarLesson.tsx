// 문법 학습 - 경전 기반
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { speakPali } from '../../utils/pali-tts'
import { closeBasicLesson, finishBasicLesson } from './basics'
import BasicLessonMissing from './BasicLessonMissing'
import { GRAMMAR_DATA, type CheckQ } from './basics-data/grammar'

export default function GrammarLesson() {
  const nav = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? GRAMMAR_DATA[lessonId] : null
  const [checked, setChecked] = useState(false)

  if (!lesson || !lessonId) return <BasicLessonMissing />

  // 발음: 경전 학습 화면과 같은 빠알리 TTS('발음 소리 끄기' 설정을 따름)
  const speak = (text: string) => speakPali(text)

  return (
    <div className="min-h-screen pb-8" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* 상단바 */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => closeBasicLesson(nav, 'grammar', lessonId)} aria-label="레슨 닫기" className="text-xl w-11 h-11 -ml-2 flex items-center justify-center rounded-full shrink-0">✕</button>
        <span className="text-sm font-semibold flex-1">{lesson.title}</span>
      </div>

      <div className="px-5 pt-4 space-y-5">
        {/* 경전 원문 */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}><span aria-hidden="true">📜 </span>{lesson.source}</p>
          <p lang="pi" className="pali-text text-xl font-bold" style={{ color: 'var(--color-primary)' }}>{lesson.verse}</p>
          <p className="text-sm mt-2">{lesson.verseKo}</p>
          <button onClick={() => speak(lesson.verse)}
            className="mt-3 flex items-center gap-2 text-sm" style={{ color: 'var(--color-accent)' }}>
            🔊 발음 듣기
          </button>
        </div>

        {/* 설명 */}
        {lesson.explanation.map((exp, i) => (
          <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: 'color-mix(in srgb, #F9A825 12%, var(--color-surface))', border: '1px solid color-mix(in srgb, #F9A825 40%, var(--color-surface))' }}>
            <p className="font-bold text-sm mb-2">{exp.title}</p>
            <p className="text-sm whitespace-pre-line leading-relaxed">{exp.content}</p>
          </div>
        ))}

        {/* 변화표 */}
        {lesson.table && (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                  {lesson.table.headers.map((h, i) => (
                    <th key={i} className="px-2 py-2 text-left font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lesson.table.rows.map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-bg)' }}>
                    {row.map((cell, j) => {
                      const isPali = lesson.table!.paliCols.includes(j)
                      return (
                        <td key={j} lang={isPali ? 'pi' : undefined}
                          className={`px-2 py-2 ${isPali ? 'pali-font text-sm font-semibold' : ''} ${j === 0 ? 'whitespace-nowrap' : ''}`}
                          style={isPali ? { color: 'var(--color-primary)' } : {}}>
                          {cell}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {lesson.check && <CheckQuiz key={lessonId} questions={lesson.check} onAllAnswered={() => setChecked(true)} />}

        <button onClick={() => finishBasicLesson(nav, 'grammar', lessonId, lesson.title)}
          disabled={!!lesson.check && !checked}
          className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97] disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-primary)' }}>
          {lesson.check && !checked ? '확인 문제를 풀면 완료할 수 있어요' : '다 했어요 · 완료 ✓'}
        </button>
      </div>
    </div>
  )
}

/** 레슨 끝 확인 문제 — 고르면 바로 맞았는지와 풀이를 보여 줌(틀려도 다시 고를 수 있음) */
function CheckQuiz({ questions, onAllAnswered }: { questions: CheckQ[]; onAllAnswered: () => void }) {
  const [picks, setPicks] = useState<(number | null)[]>(() => questions.map(() => null))
  const [solved, setSolved] = useState<boolean[]>(() => questions.map(() => false))

  const pick = (qi: number, oi: number) => {
    if (solved[qi]) return
    const nextPicks = picks.map((p, i) => i === qi ? oi : p)
    setPicks(nextPicks)
    if (oi === questions[qi].answer) {
      const nextSolved = solved.map((s, i) => i === qi ? true : s)
      setSolved(nextSolved)
      if (nextSolved.every(Boolean)) onAllAnswered()
    }
  }

  return (
    <section aria-labelledby="check-title" className="space-y-4">
      <h2 id="check-title" className="font-bold text-base">✅ 확인 문제 <span className="text-xs font-normal" style={{ color: 'var(--color-text-secondary)' }}>({solved.filter(Boolean).length}/{questions.length})</span></h2>
      {questions.map((q, qi) => {
        const p = picks[qi]
        const ok = solved[qi]
        return (
          <div key={qi} className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-sm font-semibold mb-3">{qi + 1}. {q.q}</p>
            <div className="space-y-2" role="group" aria-label={`${qi + 1}번 보기`}>
              {q.options.map((o, oi) => {
                const isAns = ok && oi === q.answer
                const isWrong = !ok && p === oi
                return (
                  <button key={oi} onClick={() => pick(qi, oi)} disabled={ok}
                    className="w-full text-left px-3 py-3 rounded-xl text-sm active:scale-[0.98]"
                    style={{
                      backgroundColor: isAns ? 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))' : isWrong ? 'color-mix(in srgb, var(--color-error) 10%, var(--color-surface))' : 'var(--color-bg)',
                      border: isAns ? '2px solid var(--color-accent)' : isWrong ? '2px solid var(--color-error)' : '1.5px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}>
                    <span lang={/[a-zāīūṃṅñṭḍṇḷ]/.test(o) && !/[가-힣]/.test(o) ? 'pi' : undefined}>{o}</span>
                  </button>
                )
              })}
            </div>
            {p !== null && (
              <p role="status" className="text-xs mt-3 leading-relaxed" style={{ color: ok ? 'var(--color-accent)' : 'var(--color-error)' }}>
                {ok ? '✓ 맞았어요. ' : '다시 골라 보세요. '}
                {ok && <span style={{ color: 'var(--color-text-secondary)' }}>{q.explain}</span>}
              </p>
            )}
          </div>
        )
      })}
    </section>
  )
}
