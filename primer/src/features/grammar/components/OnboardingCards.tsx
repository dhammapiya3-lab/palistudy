import { useState } from 'react'

interface OnboardingCardsProps {
  /** 하루 목표(분) */
  goalMin: number
  /** 쉬운 화면 — 연꽃잎·메모 안내는 빼고 */
  easyMode?: boolean
  onDone: () => void
}

interface Card { icon: string; title: string; body: string }

/** 처음 공부할 때 30초 안내 (3장) — 연꽃잎 · 소리/건너뛰기 · 메모/하루 목표 */
export default function OnboardingCards({ goalMin, easyMode, onDone }: OnboardingCardsProps) {
  const cards: Card[] = [
    ...(easyMode ? [] : [{
      icon: '🪷',
      title: '연꽃잎',
      body: '오른쪽 위 🪷 숫자는 남은 기회예요.\n문제를 틀리면 하나씩 줄어요.\n\n한 과는 짧은 "마디"로 나뉘어 있고,\n새 마디가 시작되면 다시 5개로 채워져요.',
    }]),
    {
      icon: '🔊',
      title: '소리 듣기 · 건너뛰기',
      body: '빠알리 낱말이나 🔊를 누르면 발음이 나와요.\n\n어려운 문제는 아래 "건너뛰기"로 넘어가도 괜찮아요.\n점수에 넣지 않고, 과가 끝난 뒤 다시 풀 수 있어요.',
    },
    {
      icon: easyMode ? '🙏' : '✏️',
      title: easyMode ? '하루 조금씩' : '메모 · 하루 조금씩',
      body: (easyMode ? '' : '오른쪽 아래 주황색 연필은 메모예요.\n궁금한 점을 적어 두세요.\n\n') +
        `하루 ${goalMin}분이면 충분해요.\n마디가 끝날 때마다 "오늘은 여기까지"를 눌러도 됩니다.`,
    },
  ]
  const [i, setI] = useState(0)
  const c = cards[i]
  const last = i === cards.length - 1

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: 'var(--color-overlay)' }}
      role="dialog" aria-modal="true" aria-labelledby="onb-title">
      <div className="w-full max-w-sm rounded-3xl p-6 text-center animate-slideUp"
        style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', boxShadow: 'var(--shadow-sm)' }}>
        <p className="text-[11px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
          처음 오셨네요 · {i + 1}/{cards.length}
        </p>
        <span key={i} className="text-5xl block mt-3 bounce-in" aria-hidden="true">{c.icon}</span>
        <h2 id="onb-title" className="text-lg font-bold mt-3" style={{ color: 'var(--color-primary)' }}>{c.title}</h2>
        <p className="text-sm mt-3 whitespace-pre-line leading-relaxed">{c.body}</p>

        <div className="flex justify-center gap-1.5 mt-5" aria-hidden="true">
          {cards.map((_, k) => (
            <span key={k} className="w-2 h-2 rounded-full"
              style={{ backgroundColor: k === i ? 'var(--color-primary)' : 'var(--color-border)' }} />
          ))}
        </div>

        <button
          onClick={() => (last ? onDone() : setI(i + 1))}
          autoFocus
          className="mt-5 w-full py-3.5 rounded-2xl text-white font-bold text-sm active:scale-[0.97] transition-transform"
          style={{ backgroundColor: 'var(--color-primary-dark)', minHeight: 48 }}
        >
          {last ? '시작하기' : '다음'}
        </button>
        {!last && (
          <button onClick={onDone} className="mt-2 text-xs font-medium px-4"
            style={{ color: 'var(--color-text-secondary)', minHeight: 44 }}>
            건너뛰기
          </button>
        )}
      </div>
    </div>
  )
}
