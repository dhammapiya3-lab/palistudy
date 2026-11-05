// 홈 화면 — SuttaLog3 스타일 콤팩트 디자인
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHome } from './hooks/useHome'
import GreetingCard from './components/GreetingCard'
import HeroCard from './components/HeroCard'
import StatCards from './components/StatCards'
import StudyCalendar from './components/StudyCalendar'
import QuoteCard from './components/QuoteCard'
import ReturnCard from './components/ReturnCard'
import SuttaShortcuts from './components/SuttaShortcuts'
import { MilestoneBadges, MilestoneCelebration } from './components/MilestoneCelebration'
import { getSeenMilestones, markMilestoneSeen, type Milestone } from './milestones'
import { friendlySubtitle } from '../courses/subtitles'

// 연꽃이 피는 움직임 (하루 목표 달성·이정표) — 움직임 줄이기 설정이면 멈춤
const LOTUS_CSS = `
@keyframes lotusBloom { 0% { transform: scale(0.2) rotate(-20deg); opacity: 0 } 55% { transform: scale(1.35) rotate(6deg); opacity: 1 } 100% { transform: scale(1) rotate(0) } }
@keyframes lotusBurst { 0% { transform: scale(0.3); opacity: 0 } 30% { opacity: 1 } 70% { transform: scale(1.6); opacity: 0.9 } 100% { transform: scale(2.2); opacity: 0 } }
.lotus-bloom { display: inline-block; animation: lotusBloom 0.9s cubic-bezier(0.34,1.56,0.64,1) both }
.lotus-burst { display: inline-block; animation: lotusBurst 2.4s ease-out both }
@media (prefers-reduced-motion: reduce) { .lotus-bloom, .lotus-burst { animation: none } .lotus-burst { display: none } }
`

export default function Home() {
  const nav = useNavigate()
  const {
    streak,
    stats,
    currentLesson,
    currentPct,
    todayQuote,
    greeting,
    APP_NAME,
    todayMin,
    goalMin,
    monthDays,
    totalDays,
    daysAway,
    isReturning,
    reviewLesson,
    milestones,
    suttaSuggestion,
    heroMeta,
  } = useHome()

  // 새로 마친 묶음이 있으면 한 번 축하 (여러 개면 가장 나중 것만, 나머지는 배지로)
  const [celebrate, setCelebrate] = useState<Milestone | null>(null)
  useEffect(() => {
    const seen = getSeenMilestones()
    const fresh = milestones.filter(m => !seen.includes(m.key))
    if (fresh.length) setCelebrate(fresh[fresh.length - 1])
  }, [milestones])
  const closeCelebrate = useCallback(() => {
    milestones.forEach(m => markMilestoneSeen(m.key))
    setCelebrate(null)
  }, [milestones])

  const handleCTA = () => {
    nav(`/learn/${currentLesson.id}`, { state: { from: '/' } })
  }

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">
      <style>{LOTUS_CSS}</style>

      <GreetingCard
        greeting={greeting}
        appName={APP_NAME}
        onProfileClick={() => nav('/profile')}
      />

      {isReturning && (
        <ReturnCard daysAway={daysAway} lesson={reviewLesson} monthDays={monthDays} />
      )}

      <HeroCard
        currentLesson={{ ...currentLesson, subtitle: friendlySubtitle(currentLesson.id, currentLesson.subtitle) }}
        currentPct={currentPct}
        todayMin={todayMin}
        goalMin={goalMin}
        meta={heroMeta}
        onStart={handleCTA}
      />

      <StatCards
        completed={stats.completed}
        streak={streak}
        pct={stats.pct}
        monthDays={monthDays}
        totalDays={totalDays}
      />

      <MilestoneBadges list={milestones} onOpen={setCelebrate} />

      <StudyCalendar />

      <QuoteCard
        quote={todayQuote}
      />

      <SuttaShortcuts suggestion={suttaSuggestion} />

      {/* ── 푸터 ── */}
      <div className="pt-6 pb-4 text-center">
        <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
          제작: 혜통 · De Silva&apos;s Pali Primer 기반
        </p>
      </div>

      {celebrate && <MilestoneCelebration m={celebrate} onClose={closeCelebrate} />}
    </div>
  )
}
