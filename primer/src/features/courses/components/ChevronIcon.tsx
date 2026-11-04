
export default function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      className="transition-transform duration-300 shrink-0"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        color: 'var(--color-text-secondary)',
      }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
