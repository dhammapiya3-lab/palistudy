import type { TeachGrammarStep as TeachGrammarStepType } from '../../types'

interface TeachGrammarStepProps {
  step: TeachGrammarStepType
}

export default function TeachGrammarStep({ step }: TeachGrammarStepProps) {
  return (
    <div className="flex-1 flex flex-col pt-2">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl">📐</span>
        <h2 className="text-lg font-bold">{step.title}</h2>
      </div>

      {/* 예문 하이라이트 박스 */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 8%, white), color-mix(in srgb, var(--color-accent) 6%, white))',
          border: '1.5px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
        }}
      >
        <p
          className="pali-text text-lg font-bold text-center whitespace-pre-line"
          style={{ color: 'var(--color-primary)' }}
        >
          {step.example}
        </p>
        <p className="text-center mt-2 font-semibold text-sm whitespace-pre-line">
          {step.exampleKo}
        </p>
      </div>

      {/* 설명 */}
      <div
        className="mt-4 rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line"
        style={{
          backgroundColor: '#E3F2FD',
          border: '1px solid #BBDEFB',
        }}
      >
        {step.explanation.split('\n').map((line, i) => (
          <p key={i} className={`${i > 0 ? 'mt-2' : ''} flex gap-2`}>
            {line.startsWith('-') || line.startsWith('•') ? (
              <>
                <span
                  className="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
                <span>{line.replace(/^[-•]\s*/, '')}</span>
              </>
            ) : (
              <span>{line}</span>
            )}
          </p>
        ))}
      </div>
    </div>
  )
}
