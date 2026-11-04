
interface QuoteCardProps {
  quote: {
    pali: string
    ko: string
  }
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden mt-5"
      style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border)' }}>
      <div className="flex">
        <div className="w-1 flex-shrink-0"
          style={{ background: 'linear-gradient(180deg, var(--color-primary-light), var(--color-primary-dark))' }} />
        <div className="p-4 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🪷</span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-wider"
              style={{ color: 'var(--color-primary)' }}>오늘의 게송</span>
          </div>
          <p className="text-base leading-relaxed mb-1 pali-text"
            style={{ fontFamily: 'var(--font-pali)', fontStyle: 'italic', color: 'var(--color-text)' }}>
            &ldquo;{quote.pali}&rdquo;
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{quote.ko}</p>
        </div>
      </div>
    </div>
  )
}
