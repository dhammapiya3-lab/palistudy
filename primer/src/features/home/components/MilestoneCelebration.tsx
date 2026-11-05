// 이정표 축하 — 묶음을 다 마쳤을 때 한 번 (이제 읽을 수 있는 구절 + 경전 앱으로)
// + 홈에 쌓이는 이정표 배지
import { useEffect, useRef } from 'react'
import type { Milestone } from '../milestones'
import { speakPali, stopPali } from '../../../utils/pali-tts'

export function MilestoneCelebration({ m, onClose }: { m: Milestone; onClose: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    btnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); stopPali() }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="ms-title" onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl p-6 text-center animate-slideUp"
        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="text-5xl lotus-bloom" aria-hidden="true">🪷</div>
        <p className="text-xs font-semibold mt-2" style={{ color: 'var(--color-accent)' }}>이정표 달성 {m.badge}</p>
        <h2 id="ms-title" className="text-xl font-bold mt-1">{m.title}</h2>

        <p className="text-xs mt-4 mb-1.5 font-semibold" style={{ color: 'var(--color-text-secondary)' }}>이제 읽을 수 있는 구절</p>
        <button onClick={() => speakPali(m.pali)} className="w-full rounded-2xl px-4 py-3 text-left"
          style={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)' }} aria-label={`${m.pali} 소리 듣기`}>
          <p lang="pi" className="pali-text font-bold" style={{ color: 'var(--color-primary)' }}>{m.pali} <span aria-hidden="true">🔊</span></p>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{m.ko}</p>
        </button>
        <p className="text-sm mt-3 text-left leading-relaxed">{m.explain}</p>

        <div className="mt-5 space-y-2">
          <a href={m.sutta.url} className="block w-full py-3.5 rounded-2xl text-sm font-bold text-white"
            style={{ backgroundColor: 'var(--color-primary-dark)' }}>
            경전으로 배우기 &lsquo;{m.sutta.title}&rsquo;에서 읽어 보기 →
          </a>
          <button ref={btnRef} onClick={onClose} className="w-full py-3 rounded-2xl text-sm font-semibold"
            style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
            고마워요, 계속 공부할게요
          </button>
        </div>
      </div>
    </div>
  )
}

export function MilestoneBadges({ list, onOpen }: { list: Milestone[]; onOpen: (m: Milestone) => void }) {
  if (list.length === 0) return null
  return (
    <section aria-label="이정표 배지" className="mb-5">
      <p className="text-xs font-semibold mb-2 px-1" style={{ color: 'var(--color-text-secondary)' }}>내 이정표</p>
      <div className="flex flex-wrap gap-2">
        {list.map(m => (
          <button key={m.key} onClick={() => onOpen(m)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold active:scale-95 transition-transform"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, var(--color-surface))', border: '1px solid color-mix(in srgb, var(--color-accent) 30%, var(--color-border))', minHeight: 40 }}>
            <span aria-hidden="true">{m.badge}</span>{m.short}
          </button>
        ))}
      </div>
    </section>
  )
}
