import type { SpeakStep as SpeakStepType } from '../../types'
import AudioPractice from './AudioPractice'
import VoiceRecorder from './VoiceRecorder'

interface SpeakStepProps {
  step: SpeakStepType
  onSpeak: (text: string) => void
  /** 쉬운 화면 — 녹음 기능은 숨김 */
  easyMode?: boolean
}

export default function SpeakStep({ step, onSpeak, easyMode }: SpeakStepProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
      {/* 장식 프레임 */}
      <div
        className="rounded-2xl p-6 w-full max-w-sm mb-6"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1.5px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          className="text-center text-xs mb-2 tracking-widest"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          ─── 따라 읽기 ───
        </div>
        <p
          lang="pi"
          className="pali-text text-lg font-semibold"
          style={{ color: 'var(--color-primary)' }}
        >
          {step.pali}
        </p>
        <p className="text-sm mt-2 font-medium">{step.pronKo}</p>
        <div className="flex justify-center">
          <AudioPractice text={step.pali} showWhole={false} />
        </div>
      </div>

      {/* 마이크 버튼 */}
      <button
        onClick={() => onSpeak(step.pali)}
        aria-label="발음 듣기"
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
        누르면 발음을 들을 수 있어요. 듣고 소리 내어 따라 읽어 보세요.
      </p>
      {!easyMode && <VoiceRecorder text={step.pali} />}
    </div>
  )
}
