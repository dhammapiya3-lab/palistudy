// 문법표 — 과 밖에서 언제든 여는 '문법 참고' (명사 격변화 · 동사 활용 · 대명사)
// 아직 배우지 않은 표는 흐리게 'n과에서 배워요'. 표마다 '이 문법이 나오는 경전' 링크.
import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { LESSONS } from '../grammar/lessons'
import { DECLENSION_TABLES } from '../grammar/declension-tables'
import { VERB_TABLES } from './verb-tables'
import { suttaLinksFor, suttaLessonUrl } from './sutta-links'
import { reachOf } from '../review/review-data'
import { speakPali } from '../../utils/pali-tts'

/** 명사·대명사 표를 처음 배우는 과 */
const NOUN_LESSON: Record<string, string> = {
  'a-m': 'lesson-01', 'a-n': 'lesson-08', 'aa-f': 'lesson-17', 'i-f': 'lesson-19', 'ii-f': 'lesson-19',
  'i-m': 'lesson-23', 'ii-m': 'lesson-23', 'u-f': 'lesson-23', 'u-m': 'lesson-24', 'u-n': 'lesson-24',
  'ar-m': 'lesson-25', 'ar-f': 'lesson-25', 'i-n': 'lesson-26', 'vant': 'lesson-27', 'an-m': 'lesson-27',
  'pron-1': 'lesson-28', 'pron-2': 'lesson-28', 'pron-3m': 'lesson-29', 'pron-3f': 'lesson-29',
}

interface Row { label: string; sg: string; pl: string }
interface TableView { id: string; title: string; word: string; meaning: string; lessonId: string; note?: string; head: string; rows: Row[] }

const NOUNS: TableView[] = DECLENSION_TABLES.filter(t => !t.id.startsWith('pron')).map(t => ({
  id: t.id, title: t.title.replace(/^§\d+\s*/, '') + ' 명사', word: t.word, meaning: t.meaning, lessonId: NOUN_LESSON[t.id] || 'lesson-01',
  head: '격', rows: t.rows.map(r => ({ label: r.case, sg: r.sg, pl: r.pl })),
}))
const PRONOUNS: TableView[] = DECLENSION_TABLES.filter(t => t.id.startsWith('pron')).map(t => ({
  id: t.id, title: t.title.replace(/^§\d+\s*/, ''), word: t.word, meaning: t.meaning, lessonId: NOUN_LESSON[t.id] || 'lesson-28',
  head: '격', rows: t.rows.map(r => ({ label: r.case, sg: r.sg, pl: r.pl })),
}))
const VERBS: TableView[] = VERB_TABLES.map(t => ({
  id: t.id, title: t.title, word: t.word, meaning: t.meaning, lessonId: t.lessonId, note: t.note,
  head: '인칭', rows: t.rows.map(r => ({ label: r.person, sg: r.sg, pl: r.pl })),
}))

const TABS = [
  { key: 'noun', label: '명사 격변화', list: NOUNS },
  { key: 'verb', label: '동사 활용', list: VERBS },
  { key: 'pron', label: '대명사', list: PRONOUNS },
] as const

/** '18과: -ā 여성명사' → '18과' */
const lessonNo = (id: string) => (LESSONS.find(l => l.id === id)?.title || '').split(':')[0]

function TableCard({ t, learned, open, onToggle }: { t: TableView; learned: boolean; open: boolean; onToggle: () => void }) {
  const nav = useNavigate()
  const links = suttaLinksFor(t.lessonId)
  return (
    <div className="rounded-2xl overflow-hidden" style={{
      backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border)', opacity: learned ? 1 : 0.6,
    }}>
      <button onClick={onToggle} aria-expanded={open} className="w-full flex items-center gap-3 px-4 py-3 text-left" style={{ minHeight: 52 }}>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm">{t.title}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
            <span lang="pi" className="font-semibold" style={{ color: 'var(--color-primary)' }}>{t.word}</span> · {t.meaning}
          </p>
        </div>
        {!learned && (
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full shrink-0"
            style={{ backgroundColor: 'var(--color-surface-elevated)', color: 'var(--color-text-secondary)' }}>
            {lessonNo(t.lessonId)}에서 배워요
          </span>
        )}
        <span aria-hidden="true" className="shrink-0 transition-transform" style={{ transform: open ? 'rotate(90deg)' : 'none', color: 'var(--color-text-tertiary)' }}>›</span>
      </button>
      {open && (
        <div className="px-3 pb-4 animate-fadeIn">
          {t.note && <p className="text-xs px-1 mb-2" style={{ color: 'var(--color-text-secondary)' }}>{t.note}</p>}
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ color: 'var(--color-text-tertiary)' }}>
                <th scope="col" className="text-left text-[11px] font-semibold py-1.5 px-1">{t.head}</th>
                <th scope="col" className="text-left text-[11px] font-semibold py-1.5 px-1">단수</th>
                <th scope="col" className="text-left text-[11px] font-semibold py-1.5 px-1">복수</th>
              </tr>
            </thead>
            <tbody>
              {t.rows.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--color-border)' }}>
                  <th scope="row" className="text-left text-[11px] font-medium py-2 px-1 align-top" style={{ color: 'var(--color-text-secondary)', width: '30%' }}>{r.label}</th>
                  <td lang="pi" className="py-2 px-1 align-top font-semibold"><button onClick={() => speakPali(r.sg.split(' / ')[0])} className="text-left">{r.sg}</button></td>
                  <td lang="pi" className="py-2 px-1 align-top font-semibold"><button onClick={() => speakPali(r.pl.split(' / ')[0])} className="text-left">{r.pl}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-wrap gap-2 mt-3 px-1">
            <button onClick={() => nav(`/learn/${t.lessonId}`, { state: { from: '/tables' } })}
              className="text-xs font-semibold px-3 py-2 rounded-xl"
              style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-elevated)' }}>
              📖 {lessonNo(t.lessonId)}에서 배우기
            </button>
          </div>
          {links.map((l, i) => (
            <a key={i} href={suttaLessonUrl(l.sutta)} className="block mt-2 mx-1 rounded-xl px-3 py-2.5"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 6%, var(--color-surface))', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
              <p className="text-[11px] font-semibold" style={{ color: 'var(--color-primary)' }}>🪷 이 문법이 나오는 경전 · {l.title} ›</p>
              <p lang="pi" className="pali-text text-xs mt-1">{l.pali}</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{l.note}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function GrammarTables() {
  const nav = useNavigate()
  const [params, setParams] = useSearchParams()
  const tab = (TABS.find(t => t.key === params.get('tab'))?.key) || 'noun'
  const progress = useStore(s => s.progress)
  const best = useStore(s => s.best)
  const completed = useStore(s => s.completed)
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const learned = useMemo(() => {
    const st = { progress, best, completed }
    const out: Record<string, boolean> = {}
    for (const l of LESSONS) out[l.id] = reachOf(st, l) > 0
    return out
  }, [progress, best, completed])

  const list = TABS.find(t => t.key === tab)!.list
  // 배운 표 먼저, 같은 쪽은 원래 순서
  const sorted = [...list].map((t, i) => ({ t, i })).sort((a, b) => (Number(learned[b.t.lessonId]) - Number(learned[a.t.lessonId])) || a.i - b.i).map(x => x.t)

  const goBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (idx > 0) nav(-1)
    else nav('/review')
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center gap-3 pt-[max(env(safe-area-inset-top),16px)] pb-3">
          <button onClick={goBack} aria-label="뒤로" className="flex items-center justify-center w-11 h-11 rounded-full active:scale-90 transition-transform shrink-0"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold">문법표</h1>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>어미가 헷갈릴 때 언제든 찾아보세요 · 형태를 누르면 소리</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 mb-4 p-1 rounded-2xl" role="tablist" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
          {TABS.map(t => (
            <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setParams({ tab: t.key }, { replace: true })}
              className="py-2.5 rounded-xl text-xs font-bold"
              style={{ backgroundColor: tab === t.key ? 'var(--color-surface)' : 'transparent', color: tab === t.key ? 'var(--color-primary)' : 'var(--color-text-secondary)', boxShadow: tab === t.key ? 'var(--shadow-sm)' : 'none', minHeight: 44 }}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-2.5" role="tabpanel">
          {sorted.map(t => (
            <TableCard key={t.id} t={t} learned={!!learned[t.lessonId]}
              open={open[t.id] ?? false} onToggle={() => setOpen(o => ({ ...o, [t.id]: !o[t.id] }))} />
          ))}
        </div>
      </div>
    </div>
  )
}
