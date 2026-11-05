// 홈 아래쪽 — '경전으로 배우기'로 가는 길 (경전 앱 홈의 프라이머 바로가기와 같은 모양)
// 지금 배운 문법이 나오는 경전 구절을 하나 추천
import { SUTTA_APP, suttaLessonUrl, type SuttaLink } from '../../reference/sutta-links'

export default function SuttaShortcuts({ suggestion }: { suggestion: SuttaLink | null }) {
  const cell = 'rounded-xl px-3 py-2.5 text-xs font-semibold flex items-center justify-between'
  const cellStyle = { background: 'var(--color-surface)', border: '1px solid var(--color-border-light, var(--color-border))', color: 'var(--color-text)', minHeight: 44 }
  return (
    <section aria-label="경전으로 배우기 연결" className="mt-5">
      {suggestion && (
        <a href={suttaLessonUrl(suggestion.sutta)} className="block rounded-2xl p-4 mb-2"
          style={{ background: 'color-mix(in srgb, var(--color-primary) 6%, var(--color-surface))', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
          <p className="text-[11px] font-semibold" style={{ color: 'var(--color-primary)' }}>🪷 배운 문법을 경전에서 만나 보세요 · {suggestion.title}</p>
          <p lang="pi" className="pali-text text-sm font-bold mt-1.5">{suggestion.pali}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{suggestion.note}</p>
          <p className="text-xs font-bold mt-2" style={{ color: 'var(--color-primary)' }}>경전으로 배우기에서 한 낱말씩 읽기 →</p>
        </a>
      )}
      <div className="grid grid-cols-2 gap-2">
        <a href={SUTTA_APP} className={cell} style={cellStyle}>
          <span><span aria-hidden="true">🪷 </span>경전으로 배우기</span><span aria-hidden="true" style={{ color: 'var(--color-text-tertiary)' }}>›</span>
        </a>
        <a href="/palistudy/" className={cell} style={cellStyle}>
          <span><span aria-hidden="true">🏠 </span>빠알리어 공부 대문</span><span aria-hidden="true" style={{ color: 'var(--color-text-tertiary)' }}>›</span>
        </a>
      </div>
    </section>
  )
}
