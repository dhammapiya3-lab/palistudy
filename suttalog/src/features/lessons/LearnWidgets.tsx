// 경전 학습 화면의 작은 부품들 — 문법 칩 쪽지, 구절 낱말 쪽지, 오답 설명, 마디 마침 화면
import { useId, useState } from 'react'
import type { StepType } from './lesson-data-sn56-11'
import { grammarTermsIn } from '../../utils/primer-links'

type Teach = Extract<StepType, { type: 'teach' }>

const BOX = {
  bg: 'color-mix(in srgb, var(--color-primary) 6%, var(--color-surface))',
  border: 'color-mix(in srgb, var(--color-primary) 25%, var(--color-surface))',
}

/** 프라이머 과 주소 + 돌아올 주소(프라이머가 '← 경전으로 돌아가기'에 쓸 수 있게) */
function withBack(url: string): string {
  try {
    const back = window.location.pathname + window.location.search + window.location.hash
    return `${url}?back=${encodeURIComponent(back)}`
  } catch { return url }
}

/**
 * 문법 칩 — 누르면 작은 쪽지: 한 줄 설명 + 격 이름 병기 + '📿 프라이머 n과에서 배우기 ›'
 * 알아볼 수 있는 문법 용어가 없으면 그냥 글자 칩
 */
export function GrammarChip({ grammar, small = false }: { grammar: string; small?: boolean }) {
  const terms = grammarTermsIn(grammar).slice(0, 3)
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const chipCls = `${small ? 'text-[11px]' : 'text-xs'} mt-1 px-2 py-0.5 rounded-full inline-block`
  if (!terms.length) {
    return <p className={chipCls} style={{ backgroundColor: 'var(--color-border)' }}>{grammar}</p>
  }
  return (
    <div className="mt-1">
      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls={panelId}
        className={`${chipCls} mt-0 active:scale-95`}
        style={{ backgroundColor: 'var(--color-border)', color: 'var(--color-text)', border: '1px dashed color-mix(in srgb, var(--color-primary) 45%, transparent)' }}>
        {grammar} <span aria-hidden="true" style={{ color: 'var(--color-primary)' }}>{open ? '▴' : 'ⓘ'}</span>
        <span className="sr-only">{open ? ' 설명 닫기' : ' 문법 설명 보기'}</span>
      </button>
      {open && (
        <div id={panelId} className="mt-2 rounded-xl p-3 text-left space-y-2"
          style={{ backgroundColor: BOX.bg, border: `1px solid ${BOX.border}` }}>
          {terms.map(t => (
            <div key={t.name}>
              <p className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{t.name}</p>
              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{t.desc}</p>
              {t.link && (
                <a href={withBack(t.link.url)} className="inline-block text-xs font-bold mt-1 py-1"
                  style={{ color: 'var(--color-accent)' }}>
                  📿 프라이머 {t.link.label}에서 배우기 ›
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/** 접는 해설 — '📐 문법 더 보기 ▸' */
export function FoldToggle({ open, onToggle, label }: { open: boolean; onToggle: () => void; label: string }) {
  return (
    <button type="button" onClick={onToggle} aria-expanded={open}
      className="mt-2 self-start text-xs font-bold px-3 py-2 rounded-full active:scale-95"
      style={{ color: 'var(--color-primary)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
      {label} {open ? '▾' : '▸'}
    </button>
  )
}

/** 구절 속 낱말을 눌렀을 때 뜨는 뜻 쪽지 */
export function WordNote({ text, teach, canSpeak, onSpeak, onClose }: {
  text: string
  teach: Teach | null
  canSpeak: boolean
  onSpeak: () => void
  onClose: () => void
}) {
  return (
    <div className="mt-3 rounded-xl p-3 relative" role="status"
      style={{ backgroundColor: BOX.bg, border: `1px solid ${BOX.border}` }}>
      <button type="button" onClick={onClose} aria-label="쪽지 닫기"
        className="absolute top-1 right-1 w-9 h-9 flex items-center justify-center rounded-full"
        style={{ color: 'var(--color-text-tertiary)' }}>✕</button>
      <div className="flex items-center gap-2 pr-8">
        <span className="pali-font font-bold" lang="pi" style={{ color: 'var(--color-primary)', fontSize: 'calc(var(--pali-fontsize, 18px) * 1.05)' }}>{text}</span>
        {canSpeak && (
          <button type="button" onClick={onSpeak} aria-label={`${text} 발음 듣기`}
            className="text-sm px-2 py-1 rounded-full" style={{ color: 'var(--color-accent)' }}>🔊</button>
        )}
      </div>
      {teach ? (
        <>
          {teach.pronKo && <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{teach.pronKo}</p>}
          <p className="text-base font-bold mt-1">{teach.meaning}</p>
          {teach.grammar && <GrammarChip grammar={teach.grammar} small />}
        </>
      ) : (
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>이 과의 낱말 카드에서 찾지 못했습니다.</p>
      )}
    </div>
  )
}

/** 틀렸을 때: 정답 낱말 카드 요약 + 💡 힌트 */
export function WrongExplain({ teach, hint, answer }: { teach: Teach | null; hint?: string; answer?: string }) {
  if (!teach && !hint && !answer) return null
  return (
    <div className="mt-1.5 text-xs leading-relaxed space-y-0.5" style={{ color: 'var(--color-text)' }}>
      {answer && <p>정답: <b>{answer}</b></p>}
      {teach && (
        <p>
          📝 <b className="pali-font" lang="pi">{teach.word}</b>
          {teach.pronKo && <span style={{ color: 'var(--color-text-secondary)' }}> ({teach.pronKo})</span>}
          {' '}= {teach.meaning}
          {teach.grammar && <span style={{ color: 'var(--color-text-secondary)' }}> · {teach.grammar}</span>}
        </p>
      )}
      {hint && <p>💡 {hint}</p>}
    </div>
  )
}

/** 마디를 마쳤을 때의 작은 완료 화면 */
export function MadiDoneScreen({ madiNo, madiCount, words, correct, wrong, sectionDone, retryCount, isRetryResult, onMore, onStop, onRetry }: {
  madiNo: number
  madiCount: number
  words: number
  correct: number
  wrong: number
  sectionDone: string | null
  retryCount: number
  isRetryResult: boolean
  onMore: () => void
  onStop: () => void
  onRetry: () => void
}) {
  const answered = correct + wrong
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center max-w-[430px] mx-auto"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}>
      <span className="text-6xl" aria-hidden="true">🪷</span>
      <h2 className="text-xl font-bold mt-3" style={{ color: 'var(--color-primary)' }}>
        {isRetryResult ? '다시 풀기를 마쳤습니다' : `${madiNo}마디를 마쳤습니다`}
      </h2>
      <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
        {madiCount}마디 중 {madiNo}마디 · 남은 마디 {Math.max(0, madiCount - madiNo)}개
      </p>
      {sectionDone && (
        <p className="mt-3 text-sm font-bold px-3 py-1.5 rounded-full"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))', color: 'var(--color-accent)' }}>
          {sectionDone} 편 완료 🪷
        </p>
      )}
      <div className="w-full mt-6 rounded-2xl p-4 space-y-2"
        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="flex justify-between"><span className="text-sm">이 마디에서 배운 낱말</span><b>{words}개</b></div>
        <div className="flex justify-between">
          <span className="text-sm">정답률</span>
          <b>{answered > 0 ? `${Math.round((correct / answered) * 100)}% (${correct}/${answered})` : '—'}</b>
        </div>
      </div>
      <div className="w-full mt-6 space-y-3">
        {retryCount > 0 && (
          <button onClick={onRetry} className="w-full py-3 rounded-xl font-bold"
            style={{ border: '2px solid var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'var(--color-surface)' }}>
            🔁 틀린 {retryCount}문제 다시 풀기
          </button>
        )}
        <button onClick={onMore} className="w-full py-3.5 rounded-xl text-white font-bold active:scale-[0.97]"
          style={{ backgroundColor: 'var(--color-primary)' }}>한 마디 더 →</button>
        <button onClick={onStop} className="w-full py-3 rounded-xl font-bold"
          style={{ border: '1px solid var(--color-border)' }}>오늘은 여기까지 🙏</button>
        <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>진도는 저장되었어요. 다음에 {Math.min(madiNo + 1, madiCount)}마디부터 이어집니다.</p>
      </div>
    </div>
  )
}
