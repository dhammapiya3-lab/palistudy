
interface HeroCardProps {
  currentLesson: {
    id: string
    title: string
    subtitle: string
  }
  currentPct: number
  onStart: () => void
}

const CR = 24, CC = 2 * Math.PI * CR

export default function HeroCard({ currentLesson, currentPct, onStart }: HeroCardProps) {
  return (
    <button
      onClick={onStart}
      className="w-full rounded-2xl text-left mb-5 intro-fade-up-delay
                 active:scale-[0.98] transition-transform"
      style={{
        background: 'var(--color-primary-gradient)',
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
          <div className="relative flex-shrink-0">
            <svg width="64" height="64">
              <circle cx="32" cy="32" r={CR} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
              <circle cx="32" cy="32" r={CR} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="4"
                strokeLinecap="round" strokeDasharray={CC} strokeDashoffset={CC * (1 - currentPct / 100)}
                className="transition-all duration-700" style={{ transform: 'rotate(-90deg)', transformOrigin: '32px 32px' }} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              {currentPct}%
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-white/60 mb-0.5">
              {currentPct > 0 ? '학습 이어가기' : '학습 시작하기'}
            </p>
            <p className="text-lg font-bold text-white truncate leading-tight">
              {currentLesson.title}
            </p>
            <p className="text-sm text-white/70 mt-0.5 truncate">
              {currentLesson.subtitle}
            </p>
            <div className="mt-2.5 h-1.5 rounded-full overflow-hidden bg-white/20">
              <div className="h-full rounded-full transition-all"
                style={{ width: `${currentPct}%`, background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.95))' }} />
            </div>
          </div>

          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  )
}
