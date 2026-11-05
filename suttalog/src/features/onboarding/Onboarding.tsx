// 온보딩 플로우 (3단계): 환영 → 공부 방법 안내 → 하루 목표 고르기
import { useState } from 'react'
import { LESSON_META, LESSON_ORDER } from '../../utils/lessons-meta'
import { GOAL_OPTIONS, getDailyGoal, setDailyGoal, type DailyGoal } from '../../utils/study-time'

interface Props { onComplete: () => void }

const HOW_TO = [
  { icon: '📖', title: '단어부터 하나씩', desc: '경전 구절에 나오는 낱말의 뜻·발음·문법을 먼저 익혀요.' },
  { icon: '✅', title: '짧은 퀴즈로 확인', desc: '배운 낱말을 바로 퀴즈로 확인해요. 틀려도 괜찮아요.' },
  { icon: '📜', title: '경전 구절 읽기', desc: '익힌 낱말로 실제 경전 구절을 읽고 뜻을 새겨요.' },
  { icon: '💾', title: '자동으로 이어 하기', desc: '진도는 저장되어 다음에 그 자리부터 이어집니다.' },
]

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState<DailyGoal>(getDailyGoal())
  const LAST = 2

  const next = () => {
    if (step < LAST) setStep(step + 1)
    else { setDailyGoal(goal); onComplete() }
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

        {/* 3. 하루 목표 */}
        {step === 2 && (
          <div className="px-6 pt-12">
            <h2 className="text-xl font-bold mb-2">하루에 얼마나 공부할까요?</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>짧아도 날마다 하는 것이 가장 좋아요. 설정에서 언제든 바꿀 수 있어요.</p>
            <div className="space-y-3" role="radiogroup" aria-label="하루 목표">
              {GOAL_OPTIONS.map(g => {
                const on = goal === g
                const desc = g === 5 ? '가볍게 — 낱말 몇 개와 구절 하나' : g === 10 ? '알맞게 — 처음 배우는 분께 권해요' : '꾸준히 — 짧은 과는 하루에 한 과'
                return (
                  <button key={g} role="radio" aria-checked={on} onClick={() => setGoal(g)}
                    className="w-full flex items-center gap-3 p-4 rounded-xl text-left"
                    style={{
                      backgroundColor: on ? 'color-mix(in srgb, var(--color-primary) 10%, var(--color-surface))' : 'var(--color-surface)',
                      border: on ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    }}>
                    <span className="text-2xl w-9 text-center shrink-0" aria-hidden="true">{g === 5 ? '🌱' : g === 10 ? '🪷' : '🌳'}</span>
                    <span className="flex-1">
                      <span className="block font-bold" style={{ color: on ? 'var(--color-primary)' : 'var(--color-text)' }}>하루 {g}분</span>
                      <span className="block text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{desc}</span>
                    </span>
                    <span aria-hidden="true" className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                      style={{ border: `2px solid ${on ? 'var(--color-primary)' : 'var(--color-border)'}`, backgroundColor: on ? 'var(--color-primary)' : 'transparent' }}>
                      {on && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="mt-6 p-4 rounded-xl text-sm leading-relaxed"
              style={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px dashed var(--color-border)' }}>
              <p><span aria-hidden="true">🙏 </span>제1과 <b>나모땃사</b>(약 3분)부터 시작해요.</p>
              <p className="mt-1"><span aria-hidden="true">📿 </span>문법이 막히면 <b>빠알리 프라이머</b>로 이어서 배울 수 있어요.</p>
            </div>
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
            <button onClick={() => setStep(step - 1)}
              className="px-5 py-4 rounded-xl font-bold active:scale-[0.97] transition-transform"
              style={{ border: '2px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
              ← 이전
            </button>
          )}
          <button onClick={next}
            className="flex-1 py-4 rounded-xl text-white font-bold text-lg active:scale-[0.97] transition-transform"
            style={{ background: 'var(--color-primary-gradient)' }}>
            {step < LAST ? '다음' : '학습 시작하기'}
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-4" aria-label={`${step + 1} / ${LAST + 1} 단계`}>
          {[0, 1, 2].map(i => (
            <div key={i} className="h-2 rounded-full transition-all"
              style={{ backgroundColor: i === step ? 'var(--color-primary)' : 'var(--color-border)', width: i === step ? 20 : 8 }} />
          ))}
        </div>
      </div>
    </div>
  )
}
