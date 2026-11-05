// 낱말장 — 배운 낱말 목록(찾기, 출처 과, 발음 듣기)
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLessonTitle, lessonNumber } from '../../utils/lessons-meta'
import { speakPali } from '../../utils/pali-tts'
import { backfillSeenWords, readSrs, uniqueSeenWords } from '../../utils/word-review'
import { localDateStr } from '../../utils/local-date'

export default function WordBook() {
  const nav = useNavigate()
  const [ver, setVer] = useState(0)
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    backfillSeenWords().then(added => { if (alive) { setLoading(false); if (added) setVer(v => v + 1) } })
    return () => { alive = false }
  }, [])

  const words = useMemo(() => { void ver; return uniqueSeenWords() }, [ver])
  const srs = readSrs()
  const today = localDateStr()
  const query = q.trim().toLowerCase()
  const shown = query
    ? words.filter(w => w.word.toLowerCase().includes(query) || w.meaning.includes(query) || w.pronKo.includes(query))
    : words

  return (
    <div className="px-4 pt-6 max-w-lg mx-auto">
      <button onClick={() => nav(-1)} className="text-sm py-2 pr-3 font-semibold" style={{ color: 'var(--color-primary)' }}>← 뒤로</button>
      <h1 className="text-xl font-bold mb-1">💬 낱말장</h1>
      <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
        경전에서 배운 낱말 {words.length}개{loading ? ' (예전 기록을 모으는 중…)' : ''}
      </p>

      <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="낱말·뜻·발음으로 찾기"
        aria-label="낱말 찾기"
        className="w-full px-4 py-3 rounded-xl text-base mb-3"
        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />

      {words.length === 0 && !loading && (
        <p className="text-sm text-center py-10" style={{ color: 'var(--color-text-secondary)' }}>
          아직 배운 낱말이 없어요. 경전 과에서 낱말 카드를 보면 여기에 모여요.
        </p>
      )}

      <ul className="space-y-2 pb-4">
        {shown.map(w => {
          const st = srs[`${w.lessonId}:${w.step}`]
          const tag = !st ? '새 낱말' : st.due <= today ? '오늘 복습' : `${st.due.slice(5).replace('-', '/')} 복습`
          return (
            <li key={`${w.lessonId}:${w.step}`} className="rounded-xl p-3 flex items-start gap-3"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <button onClick={() => speakPali(w.word)} aria-label={`${w.word} 발음 듣기`}
                className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 12%, transparent)' }}>🔊</button>
              <div className="flex-1 min-w-0">
                <p>
                  <span lang="pi" className="pali-font font-bold text-base" style={{ color: 'var(--color-primary)' }}>{w.word}</span>
                  <span className="text-xs ml-1.5" style={{ color: 'var(--color-text-secondary)' }}>[{w.pronKo}]</span>
                </p>
                <p className="text-sm">{w.meaning}</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                  {w.grammar ? `${w.grammar} · ` : ''}제{lessonNumber(w.lessonId)}과 {getLessonTitle(w.lessonId)}
                </p>
              </div>
              <span className="text-[10px] shrink-0 px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: 'var(--color-border-light)', color: 'var(--color-text-secondary)' }}>{tag}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
