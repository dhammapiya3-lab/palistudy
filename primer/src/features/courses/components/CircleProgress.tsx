
interface CircleProgressProps {
  pct: number
  size?: number
  stroke?: number
}

export default function CircleProgress({ pct, size = 36, stroke = 3 }: CircleProgressProps) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  const color = pct >= 100 ? 'var(--color-accent)' : 'var(--color-primary)'

  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="var(--color-border)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        className="transition-all duration-700" />
    </svg>
  )
}
