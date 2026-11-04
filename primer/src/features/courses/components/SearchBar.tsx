
interface SearchBarProps {
  value: string
  onChange: (val: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="px-5 mb-4 animate-slideUp">
      <div className="relative">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="var(--color-text-tertiary)" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="과목 검색..."
          className="w-full rounded-2xl py-3 pl-12 pr-4 text-sm outline-none
            transition-all duration-200
            focus:ring-2 focus:ring-[var(--color-primary-light)]"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1.5px solid var(--color-border)',
            color: 'var(--color-text)',
          }}
        />
      </div>
    </div>
  )
}
