import type { WritingStep as WritingStepType } from '../../types'
import WritingCanvas from '../../../../components/WritingCanvas'

interface WritingStepProps {
  step: WritingStepType
  writingEnabled: boolean
  writingChecked: boolean
  onSetWritingChecked: (val: boolean) => void
  onSpeak: (text: string) => void
  onNext: () => void
}

export default function WritingStep({
  step,
  writingEnabled,
  writingChecked,
  onSetWritingChecked,
  onSpeak,
  onNext
}: WritingStepProps) {
  if (!writingEnabled) {
    onNext()
    return null
  }

  return (
    <div className="flex-1 flex flex-col">
      <p className="text-lg font-bold mb-2">✍️ {step.instruction}</p>
      <div
        className="flex items-center gap-3 mb-3 px-3 py-2 rounded-xl"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        <span className="text-sm">
          <span style={{ color: 'var(--color-text-secondary)' }}>뜻:</span> {step.meaning}
        </span>
        <span
          className="w-px h-4"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
        <span className="text-sm">
          <span style={{ color: 'var(--color-text-secondary)' }}>발음:</span> {step.pronKo}
        </span>
      </div>

      <button
        onClick={() => onSpeak(step.answer)}
        className="audio-ripple text-xs mb-4 flex items-center gap-1
                   self-start px-3 py-1.5 rounded-full active:scale-95 transition-transform"
        style={{
          color: 'var(--color-accent)',
          backgroundColor: 'color-mix(in srgb, var(--color-accent) 8%, transparent)',
        }}
      >
        🔊 발음 듣기
      </button>

      {/* 캔버스 영역 */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: '1.5px solid var(--color-border)',
          minHeight: '200px',
        }}
      >
        <WritingCanvas />
      </div>

      {/* 정답 보기 토글 */}
      {!writingChecked ? (
        <button
          onClick={() => onSetWritingChecked(true)}
          className="mt-4 text-sm self-center py-2 px-4 rounded-xl
                     active:scale-95 transition-all"
          style={{
            color: 'var(--color-text-secondary)',
            border: '1px dashed var(--color-border)',
          }}
        >
          정답 확인하기
        </button>
      ) : (
        <div
          className="mt-4 rounded-2xl p-4 text-center reveal-down"
          style={{
            backgroundColor: '#E8F5E9',
            border: '1px solid #C8E6C9',
          }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>정답</p>
          <p
            className="pali-text text-2xl font-bold mt-1"
            style={{ color: 'var(--color-primary)' }}
          >
            {step.answer}
          </p>
          {step.hint && (
            <p
              className="text-xs mt-2 flex items-center justify-center gap-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              💡 {step.hint}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
