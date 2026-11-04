import type { VerseStep as VerseStepType } from '../../types'

interface VerseStepProps {
  step: VerseStepType
  onSpeak: (text: string) => void
}

export default function VerseStep({ step, onSpeak }: VerseStepProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        {/* 장식 상단 */}
        <div
          className="text-center text-xs mb-3 tracking-widest"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          ─── ☸ ───
        </div>

        <p
          className="pali-text text-base leading-loose"
          style={{ fontFamily: 'var(--font-pali)' }}
        >
          {step.pali.split(/(\s+)/).map((token, i) => {
            const clean = token
              .replace(/[,.:;—""\n]/g, '')
              .toLowerCase()
            const isHL = step.highlight?.some(h =>
              clean.includes(h.toLowerCase())
            )
            return (
              <span key={i}>
                {isHL ? (
                  <button
                    onClick={() => onSpeak(token)}
                    className="verse-word-dot font-bold px-1 py-0.5 rounded"
                    style={{
                      backgroundColor:
                        'color-mix(in srgb, var(--color-primary) 15%, transparent)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {token}
                  </button>
                ) : (
                  <span
                    className="verse-word-dot"
                    onClick={() => onSpeak(token.trim())}
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {token}
                  </span>
                )}
              </span>
            )
          })}
        </p>

        {/* 전체 듣기 */}
        <button
          onClick={() => onSpeak(step.pali)}
          className="audio-ripple mt-3 px-4 py-1.5 rounded-full text-xs font-medium
                     active:scale-95 transition-transform"
          style={{
            color: 'var(--color-accent)',
            backgroundColor:
              'color-mix(in srgb, var(--color-accent) 8%, transparent)',
          }}
        >
          🔊 전체 듣기
        </button>

        {/* 발음 */}
        <p
          className="text-xs mt-3"
          style={{
            color: 'var(--color-primary)',
            opacity: 0.7,
          }}
        >
          🗣️ {step.pronKo}
        </p>

        {/* 번역 오버레이 */}
        <div
          className="mt-3 rounded-xl p-3 text-sm"
          style={{
            backgroundColor:
              'color-mix(in srgb, var(--color-border) 30%, transparent)',
          }}
        >
          {step.translation}
        </div>
      </div>

      {/* 노트 */}
      {step.note && (
        <div
          className="mt-3 rounded-2xl p-4 text-xs flex items-start gap-2"
          style={{
            backgroundColor: '#FFF8E1',
            border: '1px solid #FFE082',
          }}
        >
          <span>📝</span>
          <span>{step.note}</span>
        </div>
      )}
    </div>
  )
}
