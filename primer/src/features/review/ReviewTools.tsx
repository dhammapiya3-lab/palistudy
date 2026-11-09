// 복습 탭 위쪽 — 간격 복습 퀴즈 · 내 단어장 · 독송 외우기 · 문법표
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { useWordSrs, isWordDue } from '../../store/useWordSrs'
import { LESSONS } from '../grammar/lessons'
import { reachOf, isRealWord } from './review-data'

function Tool({ icon, title, desc, onClick, disabled }: { icon: string; title: string; desc: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="rounded-2xl p-3.5 text-left card-shadow transition-all active:scale-[0.98] disabled:opacity-50"
      style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border)', minHeight: 96 }}>
      <span className="text-2xl" aria-hidden="true">{icon}</span>
      <p className="font-bold text-sm mt-1.5" style={{ wordBreak: 'keep-all' }}>{title}</p>
      <p className="text-[11px] mt-0.5 leading-snug" style={{ color: 'var(--color-text-secondary)', wordBreak: 'keep-all' }}>{desc}</p>
    </button>
  )
}

export default function ReviewTools() {
  const nav = useNavigate()
  const progress = useStore(s => s.progress)
  const best = useStore(s => s.best)
  const completed = useStore(s => s.completed)
  const quizRecords = useStore(s => s.quizRecords)
  const seenWords = useStore(s => s.seenWords)
  const cards = useWordSrs(s => s.cards)

  const studied = useMemo(() => LESSONS.filter(l => reachOf({ progress, best, completed }, l) > 0).length, [progress, best, completed])
  const wrongCount = useMemo(() => Object.values(quizRecords).filter(r => r.ng > r.ok).length, [quizRecords])
  const dueWords = useMemo(() => Object.entries(seenWords).filter(([id, w]) => isRealWord(w.lessonId, w.word) && isWordDue(cards[id])).length, [seenWords, cards])

  return (
    <div className="mb-5 animate-slideUp">
      <button
        onClick={() => nav('/review/quiz', { state: { from: '/review' } })}
        disabled={studied === 0}
        className="w-full rounded-2xl p-5 text-left card-shadow transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60"
        style={{ background: 'var(--color-cta-gradient)', minHeight: 48 }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/20 text-2xl" aria-hidden="true">🔁</div>
          <div>
            <p className="text-white font-bold text-base">오늘의 복습 10문제</p>
            <p className="text-white/90 text-xs mt-0.5">
              {studied === 0 ? '과에서 문제를 풀면 여기서 다시 풀 수 있어요'
                : wrongCount > 0 ? `틀렸던 문제 ${wrongCount}개와 오래된 문제부터` : '오래 안 본 문제부터 골라 드려요'}
            </p>
          </div>
        </div>
      </button>

      <div className="grid grid-cols-3 gap-2.5 mt-3">
        <Tool icon="🃏" title="내 단어장" desc={dueWords ? `오늘 볼 낱말 ${dueWords}개` : '배운 낱말 카드'} onClick={() => nav('/review/words')} />
        <Tool icon="🙏" title="독송 외우기" desc="가려 가며 외우기" onClick={() => nav('/review/recite')} />
        <Tool icon="📊" title="문법표" desc="격변화·동사 활용" onClick={() => nav('/tables')} />
      </div>
    </div>
  )
}
