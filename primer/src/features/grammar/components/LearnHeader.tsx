import type { StepType } from '../types'
import ScrubBar from '../../../components/ScrubBar'
import { stepLabel } from './step-label'
import type { DeclensionTable } from '../declension-tables'

interface LearnHeaderProps {
  onClose: () => void
  STEPS: StepType[]
  stepIdx: number
  refTables: DeclensionTable[]
  onShowRef: () => void
  onShowTOC: () => void
  hearts: number
  heartShakeIdx: number | null
  lessonTitle: string
  stepTitle: string
  onSeek: (index: number) => void  // 진도 막대로 단계 이동
  /** 연꽃잎 숨김 (쉬운 화면) */
  hideHearts?: boolean
  /** 마디 표시 (예: '마디 2/3') */
  chunkLabel?: string
  /** 지금 흐름에서 보이는 단계 번호들 (건너뛰는 단계 빼고) — 진도 막대와 'n/전체'를 이것으로 */
  visibleSteps?: number[]
}

// 머리 줄 아이콘 버튼 — 손가락으로 누르기 쉬운 44px
const iconBtn = 'w-11 h-11 flex items-center justify-center rounded-full active:scale-90 transition-transform shrink-0'

export default function LearnHeader({
  onClose,
  STEPS,
  stepIdx,
  refTables,
  onShowRef,
  onShowTOC,
  hearts,
  heartShakeIdx,
  lessonTitle,
  stepTitle,
  onSeek,
  hideHearts,
  chunkLabel,
  visibleSteps,
}: LearnHeaderProps) {
  // 보이는 단계 기준 위치 (건너뛰는 쓰기·더 알아보기 단계는 세지 않음)
  const vis = visibleSteps && visibleSteps.length ? visibleSteps : STEPS.map((_, i) => i)
  let pos = vis.indexOf(stepIdx)
  if (pos < 0) pos = Math.max(0, vis.findIndex(i => i > stepIdx) - 1)
  return (
    <div className="shrink-0 px-2 pt-2 pb-1 min-w-0">
      <div className="flex items-center gap-1 min-w-0">
        {/* 닫기 */}
        <button
          onClick={onClose}
          className={`${iconBtn} text-base`}
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="학습 닫기"
        >
          ✕
        </button>

        {/* 진도 막대 + 단계 수 */}
        <div className="flex-1 min-w-0 flex items-center gap-2 px-1">
          <div className="flex-1 min-w-0">
            <ScrubBar
              total={vis.length}
              current={pos}
              onSeek={i => onSeek(vis[i])}
              getLabel={i => stepLabel(STEPS[vis[i]], vis[i])}
              fillClassName="progress-bar-gradient"
            />
          </div>
          <span
            className="text-[11px] shrink-0 tabular-nums"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {pos + 1}/{vis.length}
          </span>
        </div>

        {/* 격변화 도표 버튼 */}
        {refTables.length > 0 && (
          <button
            onClick={onShowRef}
            className={iconBtn}
            style={{ color: 'var(--color-primary)' }}
            aria-label="격변화 도표"
            title="격변화 도표"
          >
            {/* 표 모양 아이콘 */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="3" y1="15" x2="21" y2="15" />
              <line x1="10" y1="4" x2="10" y2="20" />
            </svg>
          </button>
        )}

        {/* 목차 버튼 */}
        <button
          onClick={onShowTOC}
          className={iconBtn}
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="단계 목차"
          title="단계 목차"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </button>

        {/* 연꽃잎 (남은 기회) — 아이콘 하나 + 숫자 */}
        {!hideHearts && <div
          className={`flex items-center gap-0.5 shrink-0 pr-2 pl-1 ${heartShakeIdx !== null ? 'heart-shake' : ''}`}
          role="img"
          aria-label={`연꽃잎 ${hearts}개 남음 (5개 중)`}
          title={`연꽃잎 ${hearts}/5`}
        >
          <span className={`text-lg ${hearts > 0 ? '' : 'opacity-30 grayscale'}`} aria-hidden="true">🪷</span>
          <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--color-primary)' }} aria-hidden="true">
            {hearts}
          </span>
        </div>}
      </div>

      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 px-3 mt-0.5 text-[11px] leading-tight min-w-0"
        style={{ color: 'var(--color-text-secondary)' }}>
        <span className="font-semibold truncate" style={{ color: 'var(--color-primary)', maxWidth: '50%' }}>
          {lessonTitle}
        </span>
        <span aria-hidden="true" style={{ color: 'var(--color-text-tertiary)' }}>›</span>
        <span className="truncate">{stepTitle}</span>
        {chunkLabel && (
          <span className="ml-auto shrink-0 px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)', color: 'var(--color-primary)' }}>
            {chunkLabel}
          </span>
        )}
      </div>
    </div>
  )
}
