import type { TeachStep as TeachStepType } from '../../types'

interface TeachStepProps {
  step: TeachStepType
  lid: string
  onSpeak: (text: string) => void
}

export default function TeachStep({ step, lid, onSpeak }: TeachStepProps) {
  return (
    <div className="flex-1 flex flex-col pt-1">
      {/* 게송 문맥 */}
      {step.verseLine && (
        <div
          className="rounded-2xl p-4 mb-4"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <p className="pali-text text-xs leading-relaxed">
            {step.verseLine
              .split(
                new RegExp(
                  `(${step.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
                  'i'
                )
              )
              .map((part, i) =>
                part.toLowerCase() === step.word.toLowerCase() ? (
                  <span
                    key={i}
                    className="font-bold px-1 py-0.5 rounded text-sm"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                    }}
                  >
                    {part}
                  </span>
                ) : (
                  <span
                    key={i}
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {part}
                  </span>
                )
              )}
          </p>
          {step.verseLineKo && (
            <p
              className="text-xs mt-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {step.verseLineKo}
            </p>
          )}
        </div>
      )}

      {/* 메인 단어 카드 */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '2px solid var(--color-primary)',
          boxShadow: '0 4px 16px rgba(212,118,10,0.08)',
        }}
      >
        <span className="text-4xl block">{step.icon}</span>
        <p
          className={`pali-text text-3xl font-bold mt-3 ${lid !== 'lesson-00' ? 'cursor-pointer active:opacity-60' : ''} transition-opacity`}
          style={{
            fontFamily: 'var(--font-pali)',
            color: 'var(--color-primary)',
          }}
          onClick={lid !== 'lesson-00' ? () => onSpeak(step.word) : undefined}
        >
          {step.word} {lid !== 'lesson-00' && <span className="text-base align-middle opacity-40">🔊</span>}
        </p>
        {/* 발음 필 배지 */}
        <span
          className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
            color: 'var(--color-primary)',
          }}
        >
          {step.pronKo}
        </span>

        <hr
          className="my-4"
          style={{ borderColor: 'var(--color-border)' }}
        />
        <p className="text-xl font-bold">{step.meaning}</p>

        {/* 문법 태그 */}
        {step.grammar && (
          <span
            className="inline-block mt-2 px-3 py-1 rounded-full text-xs"
            style={{
              backgroundColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {step.grammar}
          </span>
        )}
      </div>

      {/* 원형/형태 정보 */}
      {(step.baseForm || step.formNote) && (
        <div
          className="mt-3 rounded-2xl overflow-hidden"
          style={{
            backgroundColor: '#E3F2FD',
            border: '1px solid #BBDEFB',
          }}
        >
          <div className="px-4 py-3">
            <p className="text-xs font-bold flex items-center gap-1 mb-1">
              📐 문법 상세
              {step.baseForm && (
                <span className="font-normal ml-1">
                  (원형: {step.baseForm})
                </span>
              )}
            </p>
            {step.formNote && (
              <p
                className="text-xs whitespace-pre-line leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {step.formNote}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 불교 맥락 */}
      {step.buddhism && (
        <div
          className="mt-3 rounded-2xl p-4 text-xs flex items-start gap-2"
          style={{
            backgroundColor: '#E8F5E9',
            border: '1px solid #C8E6C9',
          }}
        >
          <span className="text-base">☸️</span>
          <span>{step.buddhism}</span>
        </div>
      )}
    </div>
  )
}
