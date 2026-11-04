// 진도 바 컴포넌트
interface ProgressBarProps {
  value: number // 0~100
  className?: string
  color?: string
}

export default function ProgressBar({
  value,
  className = '',
  color = 'var(--color-primary)',
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div
      className={`h-2 rounded-full overflow-hidden ${className}`}
      style={{ backgroundColor: 'var(--color-border)' }}
    >
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${clamped}%`,
          backgroundColor: color,
        }}
      />
    </div>
  )
}
