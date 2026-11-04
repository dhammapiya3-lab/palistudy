import type { SpeakStep as SpeakStepType } from '../../types'

interface SpeakStepProps {
  step: SpeakStepType
  onSpeak: (text: string) => void
}

export default function SpeakStep({ step, onSpeak }: SpeakStepProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
      {/* 장식 프레임 */}
      <div
        className="rounded-2xl p-6 w-full max-w-sm mb-8"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1.5px solid var(--color-border)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div
          className="text-center text-xs mb-2 tracking-widest"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          ─── 따라 읽기 ───
        </div>
        <p
          className="pali-text text-lg font-semibold"
          style={{ color: 'var(--color-primary)' }}
        >
          {step.pali}
        </p>
        <p className="text-sm mt-2 font-medium">{step.pronKo}</p>
      </div>

      {/* 마이크 버튼 */}
      <button
        onClick={() => onSpeak(step.pali)}
        className="w-20 h-20 rounded-full flex items-center justify-center
                   text-3xl active:scale-90 transition-transform mic-pulse"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
        }}
      >
        🎤
      </button>
      <p
        className="text-xs mt-3"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        탭하면 발음을 들을 수 있습니다
      </p>
    </div>
  )
}
