// 진도 막대 — 누르거나 끌어서 원하는 단계로 바로 이동 (마우스·터치·키보드)
// 끄는 동안 말풍선으로 "12/31 · 단계 이름"을 미리 보여주고, 손을 떼면 이동
import { useRef, useState } from 'react'

interface ScrubBarProps {
  total: number                       // 전체 단계 수
  current: number                     // 지금 단계 (0부터)
  onSeek: (index: number) => void     // 선택한 단계로 이동
  getLabel?: (index: number) => string // 말풍선에 보일 단계 이름
  fillClassName?: string              // 채움 막대 꾸밈 (앱별)
  fillColor?: string
  marks?: number[]                    // 소단원 시작 위치 눈금 (단계 번호)
}

export default function ScrubBar({
  total, current, onSeek, getLabel, fillClassName = '', fillColor, marks,
}: ScrubBarProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [preview, setPreview] = useState<number | null>(null) // 끄는 중 가리키는 단계
  const dragging = useRef(false)

  // 손가락·마우스 위치 → 단계 번호
  const indexAt = (clientX: number): number => {
    const el = trackRef.current
    if (!el || total <= 1) return 0
    const r = el.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width))
    return Math.round(ratio * (total - 1))
  }

  const finish = () => {
    if (!dragging.current) return
    dragging.current = false
    const target = preview
    setPreview(null)
    if (target !== null && target !== current) onSeek(target)
  }

  const shown = preview ?? current
  // 손잡이와 채움이 같은 위치를 가리키도록 같은 식을 씀
  const pctOf = (i: number) => (total <= 1 ? 100 : (i / (total - 1)) * 100)
  const pct = pctOf(shown)
  const fillPct = pct

  return (
    <div
      className="relative py-2 -my-2 cursor-pointer select-none"
      style={{ touchAction: 'none' }}
      role="slider"
      aria-label="진도 — 끌어서 단계 이동"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-valuetext={`${current + 1} / ${total} 단계`}
      tabIndex={0}
      onPointerDown={e => {
        if (e.pointerType === 'mouse' && e.button !== 0) return
        try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* 무시 */ }
        dragging.current = true
        setPreview(indexAt(e.clientX))
      }}
      onPointerMove={e => { if (dragging.current) setPreview(indexAt(e.clientX)) }}
      onPointerUp={finish}
      onPointerCancel={() => { dragging.current = false; setPreview(null) }}
      onKeyDown={e => {
        // 키보드: ← → 로 한 단계씩
        if (e.key === 'ArrowRight' && current + 1 < total) { e.preventDefault(); onSeek(current + 1) }
        if (e.key === 'ArrowLeft' && current > 0) { e.preventDefault(); onSeek(current - 1) }
        if (e.key === 'Home' && current > 0) { e.preventDefault(); onSeek(0) }
        if (e.key === 'End' && current < total - 1) { e.preventDefault(); onSeek(total - 1) }
      }}
    >
      {/* 막대 */}
      <div ref={trackRef} className="relative h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
        <div
          className={`h-full rounded-full ${preview === null ? 'transition-all duration-500 ease-out' : ''} ${fillClassName}`}
          style={{ width: `${fillPct}%`, backgroundColor: fillColor }}
        />
        {/* 소단원 눈금 — 긴 레슨에서 위치를 가늠하기 쉽게 */}
        {marks && total > 1 && marks.filter(m => m > 0).map(m => (
          <span key={m} aria-hidden="true" className="absolute top-0 bottom-0 pointer-events-none"
            style={{ left: `${pctOf(m)}%`, width: 2, marginLeft: -1, backgroundColor: 'var(--color-surface, #fff)', opacity: 0.85 }} />
        ))}
        {/* 손잡이 — 끌 수 있다는 표시 */}
        <div
          className="absolute top-1/2 rounded-full shadow"
          style={{
            left: `${pct}%`,
            width: preview === null ? 14 : 20,
            height: preview === null ? 14 : 20,
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--color-surface, #fff)',
            border: '3px solid var(--color-primary)',
            transition: preview === null ? 'left 0.5s ease-out, width .15s, height .15s' : 'width .15s, height .15s',
          }}
        />
      </div>

      {/* 끄는 동안 말풍선 */}
      {preview !== null && (
        <div
          className="absolute z-50 mt-2 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap pointer-events-none shadow-lg"
          style={{
            top: '100%',
            left: `${pct}%`,
            transform: `translateX(-${Math.min(90, Math.max(10, pct))}%)`,
            maxWidth: '78vw',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            backgroundColor: 'var(--color-text, #222)',
            color: 'var(--color-bg, #fff)',
          }}
        >
          <b>{preview + 1}/{total}</b>
          {getLabel && <span className="opacity-80"> · {getLabel(preview)}</span>}
        </div>
      )}
    </div>
  )
}
