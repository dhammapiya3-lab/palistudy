
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
        <span className="text-3xl">{greeting.emoji}</span>
        <div>
          <p className="text-sm opacity-80 font-medium">{greeting.text}</p>
          <h1 className="text-xl font-bold tracking-tight">{appName}</h1>
        </div>
        <button onClick={onProfileClick} className="ml-auto w-9 h-9 rounded-full flex items-center justify-center
          bg-white/20 active:scale-95 transition-transform" aria-label="설정">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>
    </div>
  )
}
