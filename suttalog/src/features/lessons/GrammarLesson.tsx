// 문법 학습 - 경전 기반
import { useNavigate, useParams } from 'react-router-dom'
import { speakPali } from '../../utils/pali-tts'
import { closeBasicLesson, finishBasicLesson } from './basics'
import BasicLessonMissing from './BasicLessonMissing'

const GRAMMAR_DATA: Record<string, {
  title: string; source: string; verse: string; verseKo: string;
  explanation: { title: string; content: string }[];
  table?: { headers: string[]; rows: string[][]; paliCols: number[] };  // paliCols: 빠알리 낱말이 든 열(강조 표시)
}> = {
  sov: {
    title: 'SOV 어순 (주어-목적어-동사)',
    source: '예문',
    verse: 'Bhikkhu vihāraṃ gacchati',
    verseKo: '비구가 승원으로 간다',
    explanation: [
      { title: '문장 구조 분석', content: 'Bhikkhu (비구가, 주격) + vihāraṃ (승원으로, 대격) + gacchati (간다, 동사)\n\n빠알리어는 한국어처럼 SOV(주어-목적어-동사) 어순이 기본입니다. (격어미가 역할을 나타내므로 어순은 비교적 자유롭습니다)' },
      { title: '참고: 동사 없는 문장 (Dhp 1)', content: 'Manopubbaṅgamā dhammā\n= manopubbaṅgamā (소유복합어 bahubbīhi, 주격 복수: "마음을 앞세운") + dhammā (법들은, 주격 복수)\n\n"법들은 마음을 앞세운다" — 동사도 목적어도 없는 명사문이라 SOV 예시는 아닙니다. mano는 독립된 주어가 아니라 복합어의 앞부분입니다.' },
      { title: '한국어와의 유사성', content: '한국어: "나는 법을 배운다"\n빠알리어: "Ahaṃ dhammaṃ sikkhāmi"\n(나는) (법을) (배운다)\n\n어순이 같습니다!' },
    ],
  },
  'nom-acc': {
    title: '주격과 대격',
    source: '삼귀의문',
    verse: 'Buddhaṃ saraṇaṃ gacchāmi',
    verseKo: '부처님께 귀의합니다',
    explanation: [
      { title: '주격 (-o): "~이/가"', content: 'Buddho deseti = 부처님이 설하신다\n-o 어미가 붙으면 주어가 됩니다' },
      { title: '대격 (-aṃ): "~을/를"', content: 'Buddhaṃ saraṇaṃ gacchāmi\n= 부처님(을) 귀의처(를) 갑니다\n(남성 -a 어간에서) -aṃ 어미는 대격 = 목적어입니다.\n단, 중성 -a 어간은 주격도 -aṃ이므로(cittaṃ, sutaṃ 등) 문장 안의 기능으로 판단합니다' },
    ],
    table: {
      headers: ['격', '어미 (남성 -a 어간)', '기능', '예시'],
      rows: [
        ['주격', '-o (단), -ā (복)', '~이/가', 'Buddho'],
        ['대격', '-aṃ (단), -e (복)', '~을/를', 'Buddhaṃ'],
      ],
      paliCols: [3],
    },
  },
  'declension-a': {
    title: '남성 -a 어간 8격',
    source: 'buddha의 격변화',
    verse: 'Buddhassa sāsanaṃ',
    verseKo: '부처님의 가르침',
    explanation: [
      { title: '8격이란?', content: '빠알리어 명사는 8가지 형태로 변합니다.\n한국어의 조사(이/가, 을/를, 에서, 의...)와 같은 역할입니다.' },
    ],
    table: {
      headers: ['격', '명칭', '기능', '단수', '복수'],
      rows: [
        ['1격', '주격', '~이/가', 'buddho', 'buddhā'],
        ['2격', '대격', '~을/를', 'buddhaṃ', 'buddhe'],
        ['3격', '구격', '~에 의해', 'buddhena', 'buddhehi'],
        ['4격', '여격', '~에게', 'buddhassa', 'buddhānaṃ'],
        ['5격', '탈격', '~로부터', 'buddhasmā', 'buddhehi'],
        ['6격', '속격', '~의', 'buddhassa', 'buddhānaṃ'],
        ['7격', '처격', '~에서', 'buddhasmiṃ', 'buddhesu'],
        ['8격', '호격', '~이여!', 'buddha!', 'buddhā!'],
      ],
      paliCols: [3, 4],
    },
  },
  present: {
    title: '현재시제 활용',
    source: '경전 빈출 동사',
    verse: 'Bhikkhu gacchati vihāraṃ',
    verseKo: '비구가 정사(精舍)로 간다',
    explanation: [
      { title: '현재시제 어미', content: '빠알리어 동사는 인칭과 수에 따라 어미가 변합니다.' },
    ],
    table: {
      headers: ['인칭', '단수', '복수', '뜻'],
      rows: [
        ['3인칭', 'gacchati', 'gacchanti', '(그가) 간다 / (그들이) 간다'],
        ['2인칭', 'gacchasi', 'gacchatha', '(네가) 간다 / (너희가) 간다'],
        ['1인칭', 'gacchāmi', 'gacchāma', '(내가) 간다 / (우리가) 간다'],
      ],
      paliCols: [1, 2],
    },
  },
}

export default function GrammarLesson() {
  const nav = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? GRAMMAR_DATA[lessonId] : null

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
          <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}>
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

        <button onClick={() => finishBasicLesson(nav, 'grammar', lessonId, lesson.title)}
          className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97]"
          style={{ backgroundColor: 'var(--color-primary)' }}>
          다 읽었어요 · 완료 ✓
        </button>
      </div>
    </div>
  )
}
