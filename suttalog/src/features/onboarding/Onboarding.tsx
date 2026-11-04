// 온보딩 플로우 (2단계): 환영 → 공부 방법 안내
import { useState } from 'react'
import { LESSON_META, LESSON_ORDER } from '../../utils/lessons-meta'

interface Props { onComplete: () => void }

const HOW_TO = [
  { icon: '📖', title: '단어부터 하나씩', desc: '경전 구절에 나오는 낱말의 뜻·발음·문법을 먼저 익혀요.' },
  { icon: '✅', title: '짧은 퀴즈로 확인', desc: '배운 낱말을 바로 퀴즈로 확인해요. 틀려도 괜찮아요.' },
  { icon: '📜', title: '경전 구절 읽기', desc: '익힌 낱말로 실제 경전 구절을 읽고 뜻을 새겨요.' },
  { icon: '💾', title: '자동으로 이어 하기', desc: '진도는 저장되어 다음에 그 자리부터 이어집니다.' },
]

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0)

  const next = () => {
    if (step < 1) setStep(1)
    else onComplete()
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="flex-1 overflow-y-auto">

        {/* 1. 환영 */}
        {step === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
            <div className="text-7xl mb-6" aria-hidden="true">🪷</div>
            <h1 lang="pi" className="text-3xl font-bold pali-text" style={{ color: 'var(--color-primary)' }}>Namo Tassa</h1>
            <p lang="pi" className="text-sm mt-2 pali-text" style={{ color: 'var(--color-text-secondary)' }}>Bhagavato Arahato Sammāsambuddhassa</p>
            <p className="mt-6 text-lg font-medium">빠알리어의 세계에<br/>오신 것을 환영합니다</p>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              초기 불교 경전의 원어를 배우고<br/>붓다의 가르침을 직접 읽어보세요
            </p>
            <p className="mt-4 text-xs px-4 py-2 rounded-xl leading-relaxed" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              ☸️ {LESSON_META[LESSON_ORDER[0]].title} · {LESSON_META[LESSON_ORDER[1]].title} · {LESSON_META[LESSON_ORDER[2]].title}부터
              <br />{LESSON_META[LESSON_ORDER[LESSON_ORDER.length - 1]].title}까지 {LESSON_ORDER.length}과
            </p>
          </div>
        )}

        {/* 2. 공부 방법 */}
        {step === 1 && (
          <div className="px-6 pt-12">
            <h2 className="text-xl font-bold mb-2">이렇게 공부해요</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>하루 몇 분씩, 내 속도에 맞춰 천천히</p>
            <div className="space-y-3">
              {HOW_TO.map(item => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <span className="text-2xl w-9 text-center shrink-0" aria-hidden="true">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 하단 */}
      <div className="shrink-0 px-6 pb-8 pt-3">
        <div className="flex gap-2">
          {step > 0 && (
            <button onClick={() => setStep(0)}
              className="px-5 py-4 rounded-xl font-bold active:scale-[0.97] transition-transform"
              style={{ border: '2px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
              ← 이전
            </button>
          )}
          <button onClick={next}
            className="flex-1 py-4 rounded-xl text-white font-bold text-lg active:scale-[0.97] transition-transform"
            style={{ background: 'var(--color-primary-gradient)' }}>
            {step === 0 ? '다음' : '학습 시작하기'}
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-4" aria-label={`${step + 1} / 2 단계`}>
          {[0, 1].map(i => (
            <div key={i} className="h-2 rounded-full transition-all"
              style={{ backgroundColor: i === step ? 'var(--color-primary)' : 'var(--color-border)', width: i === step ? 20 : 8 }} />
          ))}
        </div>
      </div>
    </div>
  )
}
