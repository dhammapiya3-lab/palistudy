// 내 단어장 — 지금까지 본 낱말 목록 + 낱말 카드 넘기기 (앞: 빠알리어 / 뒤: 뜻), '모름'만 다시
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { useWordSrs, isWordDue } from '../../store/useWordSrs'
import { speakPali, stopPali } from '../../utils/pali-tts'
import SubHeader from './SubHeader'
import { useStudyTimer } from './useStudyTimer'
import { collectWords, loadStudied, shortTitle, type WordEntry } from './review-data'

const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

export default function WordBook() {
  const nav = useNavigate()
  const progress = useStore(s => s.progress)
  const best = useStore(s => s.best)
  const completed = useStore(s => s.completed)
  const seenWords = useStore(s => s.seenWords)
  const cards = useWordSrs(s => s.cards)
  const grade = useWordSrs(s => s.grade)

  const [words, setWords] = useState<WordEntry[] | null>(null)
  const [q, setQ] = useState('')
  const [deck, setDeck] = useState<WordEntry[] | null>(null)   // 카드 넘기는 중
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [unknown, setUnknown] = useState<WordEntry[]>([])
  useStudyTimer(!!deck)

  useEffect(() => {
    let alive = true
    const st = { progress, best, completed }
    loadStudied(st).then(ls => { if (alive) setWords(collectWords(ls, st, seenWords)) }, () => alive && setWords(collectWords([], st, seenWords)))
    return () => { alive = false; stopPali() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const due = useMemo(() => (words || []).filter(w => isWordDue(cards[w.stepId])), [words, cards])
  const filtered = useMemo(() => {
    const f = fold(q.trim())
    if (!f) return words || []
    return (words || []).filter(w => fold(w.word).includes(f) || fold(w.meaning).includes(f) || w.pronKo.includes(q.trim()))
  }, [words, q])

  // 과별로 묶어 보여 줌
  const groups = useMemo(() => {
    const out: { lessonId: string; title: string; items: WordEntry[] }[] = []
    for (const w of filtered) {
      let g = out.find(x => x.lessonId === w.lessonId)
      if (!g) { g = { lessonId: w.lessonId, title: shortTitle(w.lessonTitle), items: [] }; out.push(g) }
      g.items.push(w)
    }
    return out
  }, [filtered])

  const start = (list: WordEntry[]) => {
    const d = [...list]
    for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [d[i], d[j]] = [d[j], d[i]] }
    setDeck(d.slice(0, 20))
    setPos(0)
    setFlipped(false)
    setUnknown([])
  }
  const answer = (known: boolean) => {
    if (!deck) return
    const w = deck[pos]
    grade(w.stepId, known)
    if (!known) setUnknown(u => [...u, w])
    setFlipped(false)
    setPos(p => p + 1)
  }

  // ── 카드 넘기기 ──
  if (deck) {
    const w = deck[pos]
    const finished = pos >= deck.length
    return (
      <div className="min-h-screen pb-28" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <div className="max-w-lg mx-auto px-4">
          <SubHeader title="낱말 카드" sub="눌러서 뒤집기 · 아는지 스스로 골라요" onBack={() => { stopPali(); setDeck(null) }}
            right={!finished ? <span className="badge text-[11px] shrink-0">{pos + 1}/{deck.length}</span> : undefined} />
          {!finished ? (
            <>
              <button key={w.stepId + pos} onClick={() => { setFlipped(f => !f); if (!flipped) speakPali(w.word) }}
                aria-label={flipped ? '앞면 보기' : '뒤집어서 뜻 보기'}
                className="w-full rounded-3xl p-6 mt-4 flex flex-col items-center justify-center text-center card-shadow active:scale-[0.99] transition-transform animate-fadeIn"
                style={{ minHeight: 260, backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}>
                <p className="text-[11px] mb-4" style={{ color: 'var(--color-text-tertiary)' }}>{shortTitle(w.lessonTitle)}</p>
                <p lang="pi" className="pali-text font-bold" style={{ color: 'var(--color-primary)', fontSize: '2rem', lineHeight: 1.3 }}>{w.word}</p>
                {flipped ? (
                  <div className="mt-4 animate-fadeIn">
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{w.pronKo}</p>
                    <p className="text-lg font-bold mt-2">{w.meaning}</p>
                  </div>
                ) : (
                  <p className="text-xs mt-6" style={{ color: 'var(--color-text-tertiary)' }}>눌러서 뜻 보기</p>
                )}
              </button>
              <div className="flex justify-center mt-3">
                <button onClick={() => speakPali(w.word)} className="px-4 py-2 rounded-full text-sm" aria-label={`${w.word} 소리 듣기`}
                  style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>🔊 소리</button>
              </div>
              <div className="fixed bottom-0 left-0 right-0 z-40 bottom-bar-frost" style={{ borderTop: '1px solid var(--color-border)' }}>
                <div className="max-w-lg mx-auto px-4 py-3 flex gap-3">
                  <button onClick={() => answer(false)} className="flex-1 py-3.5 rounded-2xl font-bold text-sm"
                    style={{ minHeight: 48, border: '1.5px solid var(--color-wrong-strong)', color: 'var(--color-wrong-strong)', backgroundColor: 'var(--color-surface)' }}>
                    모름
                  </button>
                  <button onClick={() => answer(true)} className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white"
                    style={{ minHeight: 48, backgroundColor: 'var(--color-primary-dark)' }}>
                    알아요
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center pt-12 animate-fadeIn">
              <div className="text-5xl mb-3" aria-hidden="true">🪷</div>
              <h2 className="text-xl font-bold">카드를 다 넘겼어요</h2>
              <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                {deck.length}개 중 {deck.length - unknown.length}개를 알았어요
              </p>
              <div className="mt-8 space-y-3">
                {unknown.length > 0 && (
                  <button onClick={() => start(unknown)} className="btn-primary w-full py-3.5 text-sm">
                    &lsquo;모름&rsquo; {unknown.length}개만 다시 보기
                  </button>
                )}
                <button onClick={() => setDeck(null)} className="w-full py-3.5 rounded-2xl text-sm font-bold"
                  style={{ border: '1.5px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                  단어장으로 돌아가기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── 목록 ──
  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="max-w-lg mx-auto px-4">
        <SubHeader title="내 단어장" sub={words ? `지금까지 본 낱말 ${words.length}개` : '낱말을 모으는 중…'} />

        {words && words.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm font-bold">아직 모은 낱말이 없어요</p>
            <p className="text-xs mt-1 mb-6" style={{ color: 'var(--color-text-secondary)' }}>1과부터 낱말 카드를 보면 여기에 차곡차곡 모여요.</p>
            <button className="btn-primary px-6 py-3 text-sm" onClick={() => nav('/courses')}>과목으로 가기</button>
          </div>
        )}

        {words && words.length > 0 && (
          <>
            <button onClick={() => start(due.length ? due : words)}
              className="w-full rounded-2xl p-4 text-left mb-4 active:scale-[0.98] transition-transform"
              style={{ background: 'var(--color-cta-gradient)', minHeight: 48 }}>
              <p className="text-white font-bold">🃏 낱말 카드 넘기기</p>
              <p className="text-white/90 text-xs mt-0.5">
                {due.length ? `오늘 볼 낱말 ${due.length}개 (한 번에 20개까지)` : '오늘 볼 낱말을 다 봤어요 — 전체에서 다시 보기'}
              </p>
            </button>

            <input type="search" value={q} onChange={e => setQ(e.target.value)} aria-label="단어장에서 찾기"
              placeholder="낱말이나 뜻으로 찾기"
              className="w-full rounded-2xl py-3 px-4 text-sm outline-none mb-3"
              style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }} />

            {groups.map(g => (
              <section key={g.lessonId} className="mb-4">
                <h2 className="text-xs font-bold px-1 mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                  {g.title}<span className="font-normal">{g.items.length}개</span>
                </h2>
                <ul className="space-y-2">
                  {g.items.map(w => (
                    <li key={w.stepId} className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                      style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <button onClick={() => speakPali(w.word)} aria-label={`${w.word} 소리 듣기`}
                        className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-surface-elevated)' }}>🔊</button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold"><span lang="pi" style={{ color: 'var(--color-primary)' }}>{w.word}</span>
                          <span className="font-normal text-xs ml-1.5" style={{ color: 'var(--color-text-tertiary)' }}>{w.pronKo}</span></p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{w.meaning}</p>
                      </div>
                      {w.index >= 0 && (
                        <button onClick={() => nav(`/learn/${w.lessonId}?step=${w.index}`, { state: { from: '/review/words' } })}
                          className="shrink-0 text-[11px] font-semibold px-2 py-2" style={{ color: 'var(--color-primary)' }}
                          aria-label={`${shortTitle(w.lessonTitle)} ${w.index + 1}단계로 가기`}>
                          {w.index + 1}단계 ›
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
