
interface StatCardProps {
  icon: string
  label: string
  value: string
  iconBg: string
  sub?: string
}

function StatCard({ icon, label, value, iconBg, sub }: StatCardProps) {
  return (
    <div className="p-3.5 rounded-xl text-center"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-2"
        style={{ background: iconBg }}>
        <span className="text-lg" aria-hidden="true">{icon}</span>
      </div>
      <p className="text-xl font-bold leading-tight" style={{ color: 'var(--color-text)' }}>{value}</p>
      <p className="text-[0.7rem] font-medium mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>{label}</p>
      {sub && <p className="text-[0.65rem] font-semibold mt-0.5" style={{ color: 'var(--color-accent)' }}>{sub}</p>}
    </div>
  )
}

interface StatCardsProps {
  completed: number
  streak: number
  pct: number
  /** 이번 달 공부한 날 수 (연속이 끊겨도 쌓인 것을 보여 줌) */
  monthDays: number
  totalDays: number
}

export default function StatCards({ completed, streak, pct, monthDays, totalDays }: StatCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-5">
      <StatCard icon="📚" label="완료 단원" value={`${completed}`} iconBg="rgba(192,107,10,0.1)" />
      {streak > 0
        ? <StatCard icon="🔥" label="연속 학습" value={`${streak}일`} iconBg="rgba(239,83,80,0.1)" sub={monthDays > streak ? `이번 달 ${monthDays}일` : undefined} />
        : monthDays > 0 || totalDays === 0
          ? <StatCard icon="📅" label="이번 달 공부" value={`${monthDays}일`} iconBg="rgba(239,83,80,0.1)" />
          : <StatCard icon="📅" label="지금까지 공부" value={`${totalDays}일`} iconBg="rgba(239,83,80,0.1)" />}
      <StatCard icon="📖" label="전체 진도" value={`${pct}%`} iconBg="rgba(46,125,50,0.1)" />
    </div>
  )
}
