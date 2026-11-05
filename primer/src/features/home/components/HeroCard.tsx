// 이어서 학습 카드 — 왼쪽 링은 '오늘 공부한 시간 / 하루 목표', 아래 막대는 지금 과의 진도
// 목표를 채운 날은 링 가운데에 연꽃이 핌 (그날 처음 볼 때 한 번 피어나는 움직임)
import { useEffect, useState } from 'react'
import { localDateStr } from '../../../utils/date'

interface HeroCardProps {
  currentLesson: {
    id: string
    title: string
    subtitle: string
  }
  currentPct: number
  todayMin: number
  goalMin: number
  /** 카드 아래 한 줄 (예: 약 12분 · 3마디) */
  meta?: string
  onStart: () => void
}

const CR = 24, CC = 2 * Math.PI * CR
const BLOOM_KEY = 'primer-goal-bloomed'

export default function HeroCard({ currentLesson, currentPct, todayMin, goalMin, meta, onStart }: HeroCardProps) {
  const reached = todayMin >= goalMin
  const goalPct = Math.min(100, Math.round((todayMin / Math.max(1, goalMin)) * 100))
  const today = localDateStr()
  // 오늘 처음 목표를 채운 것을 보는 순간에만 피어나는 움직임
  const [bloom, setBloom] = useState(false)
  useEffect(() => {
    if (!reached) return
    try {
      if (localStorage.getItem(BLOOM_KEY) === today) return
      localStorage.setItem(BLOOM_KEY, today)
    } catch { /* 무시 */ }
    setBloom(true)
    const t = setTimeout(() => setBloom(false), 2600)
    return () => clearTimeout(t)
  }, [reached, today])

  return (
    <>
    <button
      onClick={onStart}
      aria-label={`${currentPct > 0 ? '학습 이어가기' : '학습 시작하기'}: ${currentLesson.title}. 오늘 ${todayMin}분 공부, 하루 목표 ${goalMin}분${reached ? ' 달성' : ''}`}
      className="w-full rounded-2xl text-left mb-5 intro-fade-up-delay
                 active:scale-[0.98] transition-transform"
      style={{
        background: 'var(--color-cta-gradient)',
        boxShadow: '0 4px 20px rgba(192, 107, 10, 0.35)',
        border: 'none', padding: 0,
      }}
    >
      <div className="relative overflow-hidden rounded-2xl p-5">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />

        <div className="flex items-center gap-4 relative z-10">
          {/* 오늘 목표 링 */}
          <div className="relative flex-shrink-0 flex flex-col items-center" aria-hidden="true">
            <div className="relative">
              <svg width="64" height="64">
                <circle cx="32" cy="32" r={CR} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                <circle cx="32" cy="32" r={CR} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="4"
                  strokeLinecap="round" strokeDasharray={CC} strokeDashoffset={CC * (1 - goalPct / 100)}
                  className="transition-all duration-700" style={{ transform: 'rotate(-90deg)', transformOrigin: '32px 32px' }} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold leading-none">
                {reached
                  ? <span className={`text-2xl ${bloom ? 'lotus-bloom' : ''}`}>🪷</span>
                  : <span className="text-[15px]">{Math.min(todayMin, 99)}<span className="text-[9px] font-semibold">분</span></span>}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-white/90 mt-1 whitespace-nowrap">
              {reached ? '오늘 목표 달성' : `오늘 ${todayMin}/${goalMin}분`}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[0.75rem] font-semibold tracking-wider text-white/90 mb-0.5">
              {currentPct > 0 ? '학습 이어가기' : '학습 시작하기'}
            </p>
            <p className="text-lg font-bold text-white truncate leading-tight">
              {currentLesson.title}
            </p>
            <p className="text-sm text-white/90 mt-0.5 line-clamp-2">
              {currentLesson.subtitle}
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/20">
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${currentPct}%`, background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.95))' }} />
              </div>
              <span className="text-[11px] font-bold text-white/95">{currentPct}%</span>
            </div>
            {meta && <p className="text-[11px] text-white/85 mt-1">{meta}</p>}
          </div>

          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {bloom && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20" aria-hidden="true">
            <span className="lotus-burst text-6xl">🪷</span>
          </div>
        )}
      </div>
    </button>
    {bloom && <span className="sr-only" role="status">오늘 목표를 채웠어요!</span>}
    </>
  )
}
