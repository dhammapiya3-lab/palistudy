// 온보딩 플로우 (2단계): 환영 → 일일 목표
import { useState } from 'react'

interface Props { onComplete: () => void }

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(1)

  const next = () => {
    if (step < 1) setStep(1)
    else {
      localStorage.setItem('suttalog-daily-goal', String([5, 10, 15, 20][dailyGoal]))
      onComplete()
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="flex-1 overflow-y-auto">

        {/* 1. 환영 */}
        {step === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
            <div className="text-7xl mb-6">🪷</div>
            <h1 className="text-3xl font-bold pali-text" style={{ color: 'var(--color-primary)' }}>Namo Tassa</h1>
            <p className="text-sm mt-2 pali-text" style={{ color: 'var(--color-text-secondary)' }}>Bhagavato Arahato Sammāsambuddhassa</p>
            <p className="mt-6 text-lg font-medium">빠알리어의 세계에<br/>오신 것을 환영합니다</p>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              초기 불교 경전의 원어를 배우고<br/>붓다의 가르침을 직접 읽어보세요
            </p>
            <p className="mt-4 text-xs px-4 py-2 rounded-xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              ☸️ 전법륜경 → 무아경 → 팔정도경 → 사념처경
            </p>
          </div>
        )}

        {/* 2. 일일 목표 */}
        {step === 1 && (
          <div className="px-6 pt-12">
            <h2 className="text-xl font-bold mb-2">하루 학습 목표를<br/>설정해주세요</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>목표 달성 시 알려드립니다 · 나중에 변경 가능</p>
            {[
              { min: 5, label: '가볍게', desc: '하루 1~2 레슨' },
              { min: 10, label: '꾸준히', desc: '하루 3~4 레슨', recommended: true },
              { min: 15, label: '집중해서', desc: '하루 5~6 레슨' },
              { min: 20, label: '몰입해서', desc: '하루 7~8 레슨' },
            ].map((item, i) => (
              <button key={i} onClick={() => setDailyGoal(i)}
                className="w-full flex items-center justify-between p-4 mb-3 rounded-xl transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: dailyGoal === i ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                }}>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>{item.min}분</span>
                  <div className="text-left">
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                  </div>
                </div>
                {dailyGoal === i && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
                {item.recommended && dailyGoal !== i && (
                  <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: 'var(--color-primary)' }}>추천</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 하단 */}
      <div className="shrink-0 px-6 pb-8 pt-3">
        <button onClick={next}
          className="w-full py-4 rounded-xl text-white font-bold text-lg active:scale-[0.97] transition-transform"
          style={{ backgroundColor: 'var(--color-primary)' }}>
          {step === 0 ? '시작하기' : '학습 시작하기'}
        </button>
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1].map(i => (
            <div key={i} className="h-2 rounded-full transition-all"
              style={{ backgroundColor: i === step ? 'var(--color-primary)' : 'var(--color-border)', width: i === step ? 20 : 8 }} />
          ))}
        </div>
      </div>
    </div>
  )
}
