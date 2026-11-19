// 내 서재 — 책갈피한 경전 구절과 직접 붙여넣은 빠알리어 글을 모아 보고, 발음을 들음
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLessonTitle, lessonNumber } from '../../utils/lessons-meta'
import { hasRecording, speakPali, speakSequence, stopSpeech, ttsAvailable } from '../../utils/pali-tts'
import { toHangul } from '../../utils/pali-hangul'
import {
  addMine, onBookmarksChange, readBookmarks, removeBookmark, restoreBookmark, updateBookmark, type Bookmark,
} from '../../utils/bookmarks'

type Filter = 'all' | 'sutta' | 'mine'

const box = { backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }
const soft = { backgroundColor: 'color-mix(in srgb, var(--color-accent) 12%, transparent)' }

/** 붙여넣은 글 다듬기 — 줄 끝 공백·빈 줄 정리, ṁ → ṃ */
function cleanPali(s: string): string {
  return s.normalize('NFC').replace(/ṁ/g, 'ṃ').replace(/Ṁ/g, 'Ṃ')
    .split(/\r?\n/).map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n')
}
const hasRoman = (s: string) => /[a-zāīūṃṅñṭḍṇḷ]/i.test(s)
const linesOf = (s: string) => s.split('\n').map(l => l.trim()).filter(Boolean)
const wordsOf = (s: string) => s.split(/[\s,.;:!?—–“”‘’"()[\]…]+/).map(w => w.replace(/^['’]+|['’]+$/g, '')).filter(w => hasRoman(w))
const pronOf = (b: Bookmark) => b.pronKo || toHangul(b.pali)

export default function Library() {
  const nav = useNavigate()
  const [items, setItems] = useState<Bookmark[]>(readBookmarks)
  const [filter, setFilter] = useState<Filter>('all')
  const [q, setQ] = useState('')
  const [adding, setAdding] = useState(false)
  const [playing, setPlaying] = useState<string | null>(null)   // 이어 듣기 중인 항목 id
  const [undo, setUndo] = useState<Bookmark | null>(null)
  const canSpeak = ttsAvailable()

  useEffect(() => onBookmarksChange(() => setItems(readBookmarks())), [])
  useEffect(() => () => stopSpeech(), [])
  useEffect(() => {
    if (!undo) return
    const t = window.setTimeout(() => setUndo(null), 6000)
    return () => window.clearTimeout(t)
  }, [undo])

  const counts = { all: items.length, sutta: items.filter(b => b.kind === 'sutta').length, mine: items.filter(b => b.kind === 'mine').length }
  const query = q.trim().toLowerCase()
  const shown = items.filter(b => (filter === 'all' || b.kind === filter)
    && (!query || b.pali.toLowerCase().includes(query) || (b.translation || '').includes(query) || (b.note || '').includes(query) || pronOf(b).includes(query)))

  const playAll = () => {
    if (playing) { stopSpeech(); setPlaying(null); return }
    const list = shown
    speakSequence(list.map(b => b.pali), {
      onIndex: i => setPlaying(list[i]?.id ?? null),
      onDone: () => setPlaying(null),
    })
  }

  const remove = (id: string) => {
    const gone = removeBookmark(id)
    if (gone) setUndo(gone)
  }

  return (
    <div className="px-4 pt-6 pb-8 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-1">📚 내 서재</h1>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        공부하다 🔖 책갈피한 구절과, 직접 붙여넣은 빠알리어 글을 모아 두고 몇 번이고 들어 보세요.
      </p>

      {adding
        ? <AddBox onClose={() => setAdding(false)} canSpeak={canSpeak} />
        : (
          <button onClick={() => setAdding(true)}
            className="w-full py-3 rounded-xl text-sm font-bold mb-4 active:scale-[0.98]"
            style={{ border: '2px dashed var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'var(--color-surface)' }}>
            ＋ 빠알리어 글 붙여넣어 저장하기
          </button>
        )}

      {items.length > 0 && (
        <>
          <div className="flex gap-1.5 mb-3" role="tablist" aria-label="보기">
            {([['all', '전체'], ['sutta', '🔖 경전 책갈피'], ['mine', '✏️ 내가 넣은 글']] as const).map(([k, label]) => (
              <button key={k} role="tab" aria-selected={filter === k} onClick={() => setFilter(k)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={filter === k
                  ? { backgroundColor: 'var(--color-primary)', color: '#fff' }
                  : { backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                {label} {counts[k]}
              </button>
            ))}
          </div>

          {items.length > 5 && (
            <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="빠알리어·뜻·발음으로 찾기"
              aria-label="내 서재에서 찾기" className="w-full px-4 py-3 rounded-xl text-base mb-3"
              style={{ ...box, color: 'var(--color-text)' }} />
          )}

          {canSpeak && shown.length > 1 && (
            <button onClick={playAll} aria-pressed={!!playing}
              className="w-full py-2.5 rounded-xl text-sm font-bold mb-3 text-white active:scale-[0.98]"
              style={{ backgroundColor: 'var(--color-accent)' }}>
              {playing ? '■ 이어 듣기 멈춤' : `🎧 보이는 ${shown.length}개 이어 듣기`}
            </button>
          )}
        </>
      )}

      {items.length === 0 && !adding && (
        <div className="text-center py-10 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          <p className="text-4xl mb-3" aria-hidden="true">🔖</p>
          아직 저장한 글이 없어요.<br />
          경전 공부 화면의 구절 카드에서 <b>🔖 책갈피</b>를 누르거나,<br />
          위의 ‘붙여넣어 저장하기’로 직접 넣어 보세요.
        </div>
      )}
      {items.length > 0 && shown.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: 'var(--color-text-secondary)' }}>맞는 글이 없어요.</p>
      )}

      <ul className="space-y-3">
        {shown.map(b => (
          <ItemCard key={b.id} b={b} canSpeak={canSpeak} active={playing === b.id}
            onOpen={b.kind === 'sutta' && b.lessonId != null && b.raw != null
              ? () => nav(`/learn/scripture/${b.lessonId}?step=${b.raw}`) : undefined}
            onRemove={() => remove(b.id)} />
        ))}
      </ul>

      {undo && (
        <div role="status" className="fixed left-1/2 z-50 px-4 py-2.5 rounded-full text-sm shadow-lg flex items-center gap-3"
          style={{ bottom: 84, transform: 'translateX(-50%)', backgroundColor: 'var(--color-text)', color: 'var(--color-surface)', maxWidth: '92vw' }}>
          <span>지웠어요</span>
          <button onClick={() => { restoreBookmark(undo); setUndo(null) }} className="font-bold underline">되돌리기</button>
        </div>
      )}
    </div>
  )
}

/** 붙여넣기 상자 — 발음 미리 보기·듣기 후 저장 */
function AddBox({ onClose, canSpeak }: { onClose: () => void; canSpeak: boolean }) {
  const [text, setText] = useState('')
  const [meaning, setMeaning] = useState('')
  const [saved, setSaved] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => { ref.current?.focus() }, [])
  const clean = cleanPali(text)
  const ok = clean.length > 0 && hasRoman(clean)

  const paste = async () => {
    try { const t = await navigator.clipboard.readText(); if (t) setText(t) } catch { ref.current?.focus() }
  }
  const save = () => {
    if (!ok) return
    addMine(clean, meaning)
    setText(''); setMeaning(''); setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
    ref.current?.focus()
  }

  return (
    <div className="rounded-2xl p-4 mb-4" style={box}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-bold">빠알리어 글 넣기</p>
        <button onClick={onClose} className="text-xs py-1 px-2" style={{ color: 'var(--color-text-secondary)' }}>닫기</button>
      </div>
      <textarea ref={ref} value={text} onChange={e => setText(e.target.value)} rows={3}
        placeholder="여기에 빠알리어 낱말이나 문장을 붙여넣으세요 (로마자)"
        aria-label="빠알리어 글" lang="pi"
        className="w-full px-3 py-2.5 rounded-xl text-base pali-font resize-y"
        style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
      {typeof navigator !== 'undefined' && navigator.clipboard && 'readText' in navigator.clipboard && (
        <button onClick={paste} className="text-xs py-1 mb-1" style={{ color: 'var(--color-accent)' }}>📋 복사한 글 붙여넣기</button>
      )}
      <input value={meaning} onChange={e => setMeaning(e.target.value)} placeholder="뜻이나 메모 (적지 않아도 돼요)"
        aria-label="뜻이나 메모" className="w-full px-3 py-2.5 rounded-xl text-sm mt-1"
        style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />

      {clean && !ok && (
        <p className="text-xs mt-2" style={{ color: 'var(--color-error)' }}>로마자로 적은 빠알리어(예: Namo tassa)만 발음을 들을 수 있어요.</p>
      )}
      {ok && (
        <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: 'var(--color-bg)' }}>
          <p className="text-[11px] mb-1" style={{ color: 'var(--color-text-tertiary)' }}>발음 미리 보기</p>
          <p className="text-sm whitespace-pre-line" style={{ color: 'var(--color-primary)' }}>🗣️ {toHangul(clean)}</p>
          {canSpeak && (
            <button onClick={() => speakPali(clean)} className="mt-2 text-xs font-semibold py-1" style={{ color: 'var(--color-accent)' }}>🔊 들어 보기</button>
          )}
        </div>
      )}
      <button onClick={save} disabled={!ok}
        className="w-full mt-3 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40"
        style={{ backgroundColor: 'var(--color-primary)' }}>
        {saved ? '✓ 저장했어요 — 또 넣을 수 있어요' : '내 서재에 저장'}
      </button>
    </div>
  )
}

function ItemCard({ b, canSpeak, active, onOpen, onRemove }: {
  b: Bookmark; canSpeak: boolean; active: boolean; onOpen?: () => void; onRemove: () => void
}) {
  const [open, setOpen] = useState<'none' | 'lines' | 'words' | 'edit'>('none')
  const [recorded, setRecorded] = useState<boolean | null>(null)
  const lines = useMemo(() => linesOf(b.pali), [b.pali])
  const words = useMemo(() => wordsOf(b.pali), [b.pali])
  useEffect(() => { let alive = true; hasRecording(b.pali).then(r => { if (alive) setRecorded(r) }); return () => { alive = false } }, [b.pali])

  const pronLines = linesOf(pronOf(b))
  const toggle = (k: typeof open) => setOpen(o => o === k ? 'none' : k)

  return (
    <li className="rounded-2xl p-4" style={{ ...box, ...(active ? { outline: '2px solid var(--color-accent)' } : {}) }}>
      <div className="flex items-start gap-3">
        {canSpeak && (
          <button onClick={() => speakPali(b.pali)} aria-label="발음 듣기"
            className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-lg" style={soft}>🔊</button>
        )}
        <div className="flex-1 min-w-0">
          <p lang="pi" className="pali-font font-semibold whitespace-pre-line leading-relaxed"
            style={{ color: 'var(--color-primary)', fontSize: 'var(--pali-fontsize, 18px)' }}>{b.pali}</p>
          <p className="text-xs mt-1 whitespace-pre-line" style={{ color: 'var(--color-primary)', opacity: 0.8 }}>🗣️ {pronOf(b)}</p>
          {b.translation && <p className="text-sm mt-1.5" style={{ color: 'var(--color-text-secondary)' }}>{b.translation}</p>}
          {b.note && <p className="text-xs mt-1.5 rounded-lg px-2 py-1" style={{ backgroundColor: 'var(--color-bg)' }}>📝 {b.note}</p>}
          <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-tertiary)' }}>
            {b.kind === 'sutta' && b.lessonId ? `🔖 제${lessonNumber(b.lessonId)}과 ${getLessonTitle(b.lessonId)}` : '✏️ 내가 넣은 글'}
            {canSpeak && recorded !== null && ` · ${recorded ? '🎙 녹음 목소리' : '기기 목소리로 읽어요'}`}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 pl-0 text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
        {canSpeak && lines.length > 1 && <button className="py-1" onClick={() => toggle('lines')} aria-expanded={open === 'lines'}>한 줄씩 듣기</button>}
        {canSpeak && words.length > 1 && <button className="py-1" onClick={() => toggle('words')} aria-expanded={open === 'words'}>낱말씩 듣기</button>}
        {onOpen && <button className="py-1" onClick={onOpen}>공부하던 자리로 →</button>}
        <button className="py-1" onClick={() => toggle('edit')} aria-expanded={open === 'edit'} style={{ color: 'var(--color-text-secondary)' }}>
          {b.kind === 'mine' ? '고치기' : '메모'}
        </button>
        <button className="py-1" onClick={onRemove} style={{ color: 'var(--color-text-tertiary)' }}>지우기</button>
      </div>

      {open === 'lines' && (
        <ul className="mt-2 space-y-1.5">
          {lines.map((l, i) => (
            <li key={i}>
              <button onClick={() => speakPali(l)} className="w-full text-left rounded-lg px-3 py-2 flex gap-2 items-start" style={{ backgroundColor: 'var(--color-bg)' }}>
                <span aria-hidden="true">🔊</span>
                <span className="min-w-0">
                  <span lang="pi" className="pali-font block text-sm">{l}</span>
                  {pronLines[i] && <span className="block text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>{pronLines[i]}</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open === 'words' && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {words.map((w, i) => (
            <button key={i} onClick={() => speakPali(w)} className="rounded-full px-3 py-1.5 text-sm" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <span lang="pi" className="pali-font">{w}</span>
              <span className="text-[10px] ml-1" style={{ color: 'var(--color-text-tertiary)' }}>{toHangul(w)}</span>
            </button>
          ))}
        </div>
      )}
      {open === 'edit' && <EditBox b={b} onDone={() => setOpen('none')} />}
    </li>
  )
}

function EditBox({ b, onDone }: { b: Bookmark; onDone: () => void }) {
  const [pali, setPali] = useState(b.pali)
  const [tr, setTr] = useState(b.translation || '')
  const [note, setNote] = useState(b.note || '')
  const field = { backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }
  const save = () => {
    const clean = cleanPali(pali)
    if (b.kind === 'mine' && !hasRoman(clean)) return
    updateBookmark(b.id, b.kind === 'mine'
      ? { pali: clean, translation: tr.trim() || undefined, note: note.trim() || undefined }
      : { note: note.trim() || undefined })
    onDone()
  }
  return (
    <div className="mt-3 space-y-2">
      {b.kind === 'mine' && (
        <>
          <textarea value={pali} onChange={e => setPali(e.target.value)} rows={2} lang="pi" aria-label="빠알리어 글"
            className="w-full px-3 py-2 rounded-lg text-base pali-font" style={field} />
          <input value={tr} onChange={e => setTr(e.target.value)} placeholder="뜻" aria-label="뜻"
            className="w-full px-3 py-2 rounded-lg text-sm" style={field} />
        </>
      )}
      <input value={note} onChange={e => setNote(e.target.value)} placeholder="내 메모 (예: 외울 것, 다시 볼 이유)" aria-label="내 메모"
        className="w-full px-3 py-2 rounded-lg text-sm" style={field} />
      <div className="flex gap-2">
        <button onClick={save} className="flex-1 py-2 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: 'var(--color-primary)' }}>저장</button>
        <button onClick={onDone} className="flex-1 py-2 rounded-lg text-sm" style={{ border: '1px solid var(--color-border)' }}>취소</button>
      </div>
    </div>
  )
}
