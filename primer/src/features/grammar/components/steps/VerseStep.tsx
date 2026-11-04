import type { VerseStep as VerseStepType } from '../../types'

interface VerseStepProps {
  step: VerseStepType
  onSpeak: (text: string) => void
}

// 낱말 = 글자(빠알리 확장 라틴 문자 ā ṃ ṭ ḍ ṇ ñ ṅ ḷ 포함)와 결합 부호가 이어진 덩어리
const WORD_RE = /([\p{L}\p{M}]+)/u
const norm = (s: string) => s.normalize('NFC').toLowerCase()
const stripPunct = (s: string) => s.replace(/^[\p{P}\s]+|[\p{P}\s]+$/gu, '')

export default function VerseStep({ step, onSpeak }: VerseStepProps) {
  // 강조할 낱말 — 낱말 전체가 똑같을 때만 강조 (다른 낱말 속에 들어 있는 것은 강조하지 않음)
  const highlights = new Set((step.highlight || []).map(h => norm(stripPunct(h))).filter(Boolean))
  const lines = step.pali.normalize('NFC').split(/\r?\n/)

  return (
    <div className="flex-1 flex flex-col">
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* 장식 상단 */}
        <div
          className="text-center text-xs mb-3 tracking-widest"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-hidden="true"
        >
          ─── ☸ ───
        </div>

        <p
          lang="pi"
          className="pali-text text-base leading-loose"
          style={{ fontFamily: 'var(--font-pali)' }}
        >
          {lines.map((line, li) => (
            <span key={li}>
              {li > 0 && <br />}
              {line.split(WORD_RE).map((part, i) => {
                // 홀수 칸이 낱말, 짝수 칸은 띄어쓰기·문장부호 (그냥 글자로)
                if (i % 2 === 0) return part ? <span key={i}>{part}</span> : null
                const isHL = highlights.has(norm(part))
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onSpeak(part)}
                    className={`verse-word ${isHL ? 'font-bold px-1 py-0.5' : ''}`}
                    style={{
                      backgroundColor: isHL
                        ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)'
                        : undefined,
                      color: 'var(--color-primary)',
                    }}
                  >
                    {part}
                  </button>
                )
              })}
            </span>
          ))}
        </p>

        {/* 전체 듣기 */}
        <button
          onClick={() => onSpeak(step.pali)}
          className="audio-ripple mt-3 px-4 py-2 rounded-full text-xs font-medium
                     active:scale-95 transition-transform"
          style={{
            color: 'var(--color-accent)',
            backgroundColor:
              'color-mix(in srgb, var(--color-accent) 8%, transparent)',
            minHeight: 36,
          }}
        >
          🔊 전체 듣기
        </button>

        {/* 발음 */}
        <p
          className="text-xs mt-3 whitespace-pre-line"
          style={{ color: 'var(--color-primary)' }}
        >
          🗣️ {step.pronKo}
        </p>

        {/* 번역 */}
        <div
          className="mt-3 rounded-xl p-3 text-sm whitespace-pre-line"
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
            backgroundColor: 'var(--color-warn-bg)',
            border: '1px solid var(--color-warn-border)',
          }}
        >
          <span aria-hidden="true">📝</span>
          <span className="whitespace-pre-line">{step.note}</span>
        </div>
      )}
    </div>
  )
}
