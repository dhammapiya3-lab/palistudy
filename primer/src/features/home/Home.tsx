// 홈 화면 — SuttaLog3 스타일 콤팩트 디자인
import { useNavigate } from 'react-router-dom'
import { useHome } from './hooks/useHome'
import GreetingCard from './components/GreetingCard'
import HeroCard from './components/HeroCard'
import StatCards from './components/StatCards'
import StudyCalendar from './components/StudyCalendar'
import QuoteCard from './components/QuoteCard'

export default function Home() {
  const nav = useNavigate()
  const {
    streak,
    recordStudy,
    stats,
    currentLesson,
    currentPct,
    todayQuote,
    greeting,
    APP_NAME
  } = useHome()

  const handleCTA = () => {
    recordStudy()
    nav(`/learn/${currentLesson.id}`)
  }

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">
      
      <GreetingCard 
        greeting={greeting} 
        appName={APP_NAME} 
        onProfileClick={() => nav('/profile')}
      />

      <HeroCard 
        currentLesson={currentLesson} 
        currentPct={currentPct} 
        onStart={handleCTA}
      />

      <StatCards 
        completed={stats.completed} 
        streak={streak} 
        pct={stats.pct} 
      />

      <StudyCalendar />

      <QuoteCard 
        quote={todayQuote} 
      />

      {/* ── 푸터 ── */}
      <div className="pt-6 pb-4 text-center">
        <p className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
          제작: 혜통 · De Silva&apos;s Pali Primer 기반
        </p>
      </div>
    </div>
  )
}
