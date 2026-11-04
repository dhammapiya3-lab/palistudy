
interface GreetingCardProps {
  greeting: {
    text: string
    emoji: string
    period: 'dawn' | 'morning' | 'afternoon' | 'evening'
  }
  appName: string
  onProfileClick: () => void
}

export default function GreetingCard({ greeting, appName, onProfileClick }: GreetingCardProps) {
  return (
    <div
      className="rounded-2xl p-4 mb-5 intro-fade-up"
      style={{
        background: greeting.period === 'dawn'
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : greeting.period === 'morning'
            ? 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)'
            : greeting.period === 'afternoon'
              ? 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
              : 'linear-gradient(135deg, #2c3e50 0%, #3d5866 50%, #2c3e50 100%)',
        color: greeting.period === 'dawn' || greeting.period === 'evening' ? '#fff' : '#1E1B16',
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">{greeting.emoji}</span>
        <div>
          <p className="text-sm opacity-80 font-medium">{greeting.text}</p>
          <h1 className="text-xl font-bold tracking-tight">{appName}</h1>
        </div>
        <button onClick={onProfileClick} className="ml-auto w-11 h-11 rounded-full flex items-center justify-center
          bg-white/20 active:scale-95 transition-transform" aria-label="설정">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
