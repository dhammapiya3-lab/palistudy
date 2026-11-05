// 레슨 완료 축하 화면 — 방금 마친 레슨의 실제 기록과 학습맵 순서상 다음 레슨을 보여 줌
import { useLocation, useNavigate } from 'react-router-dom'
import { LESSON_ORDER, canonicalLessonId, getLessonTitle } from '../../utils/lessons-meta'
import type { PracticeRef } from '../lessons/learn-extras'

/** ScriptureLearn이 완료 화면으로 넘겨주는 이번 학습 기록 */
export type LessonResult = {
  lid: string
  correct: number     // 이번에 맞힌 문제 수(퀴즈·배열)
  wrong: number       // 이번에 틀린 문제 수
  newWords: number    // 이번에 처음 배운 단어 수
  elapsedMs: number   // 이번 학습 시간(앱을 연 뒤부터)
  steps: number       // 레슨 전체 단계 수
  retry?: PracticeRef[] // 이번에 틀린 문제(원본 단계 번호) — '틀린 n문제 다시 풀기'
}

function formatElapsed(ms: number): string {
  const sec = Math.max(0, Math.round(ms / 1000))
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  if (h > 0) return `${h}시간 ${m}분`
  if (m > 0) return `${m}분 ${s}초`
  return `${s}초`
}

/** 받침에 따라 '을/를' */
function eulReul(word: string): string {
  const c = word.charCodeAt(word.length - 1)
  if (c >= 0xac00 && c <= 0xd7a3) return (c - 0xac00) % 28 ? '을' : '를'
  return '을(를)'
}

function isResult(v: unknown): v is LessonResult {
  return !!v && typeof v === 'object' && typeof (v as LessonResult).lid === 'string'
}

export default function LessonComplete() {
  const nav = useNavigate()
  const { state } = useLocation()
  const result = isResult(state) ? state : null
  const lid = result ? canonicalLessonId(result.lid) : null

  const order = LESSON_ORDER as readonly string[]
  const idx = lid ? order.indexOf(lid) : -1
  const nextId = idx >= 0 && idx + 1 < order.length ? order[idx + 1] : null
  const answered = result ? result.correct + result.wrong : 0

  const rows: { label: string; value: string }[] = []
  if (result) {
    rows.push({ label: '전체 단계', value: `${result.steps}단계` })
    if (answered > 0) rows.push({ label: '정답', value: `${result.correct} / ${answered}문제 (${Math.round((result.correct / answered) * 100)}%)` })
    rows.push({ label: '처음 배운 단어', value: `${result.newWords}개` })
    rows.push({ label: '이번 학습 시간', value: formatElapsed(result.elapsedMs) })
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 pt-8 text-center max-w-[430px] mx-auto"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 32px)' }}>

      {/* 연꽃 축하 */}
      <div className="text-7xl mb-4" aria-hidden="true">🪷✨</div>
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
        Sādhu! Sādhu!
      </h1>
      <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
        {lid ? `${getLessonTitle(lid)}${eulReul(getLessonTitle(lid))} 끝까지 마쳤습니다.` : '레슨을 마쳤습니다.'}
      </p>

      {/* 결과 카드 — 실제 기록만 */}
      {rows.length > 0 && (
        <div className="w-full mt-8 rounded-2xl p-5 space-y-3"
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          {rows.map(r => (
            <div key={r.label} className="flex justify-between gap-3">
              <span className="text-sm">{r.label}</span>
              <span className="font-bold text-right">{r.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* 법구경 게송 */}
      <div className="w-full mt-5 rounded-2xl p-4"
        style={{ backgroundColor: 'color-mix(in srgb, #F9A825 12%, var(--color-surface))', border: '1px solid color-mix(in srgb, #F9A825 40%, var(--color-surface))' }}>
        <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>📜 법구경 제183게</p>
        <p className="text-sm" lang="pi" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-pali)' }}>
          "Sabbapāpassa akaraṇaṃ,<br/>
          kusalassa upasampadā,<br/>
          sacittapariyodapanaṃ —<br/>
          etaṃ buddhāna sāsanaṃ."
        </p>
        <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          모든 악을 짓지 말고, 선을 받들어 행하며,<br/>
          스스로 마음을 깨끗이 하라 — 이것이 모든 부처님의 가르침이다.
        </p>
      </div>

      {/* 버튼 */}
      <div className="w-full mt-8 space-y-3">
        {lid && result?.retry && result.retry.length > 0 && (
          <button
            onClick={() => nav(`/learn/scripture/${lid}`, { state: { retry: result.retry } })}
            className="w-full py-3.5 rounded-xl font-bold active:scale-[0.97] transition-transform"
            style={{ border: '2px solid var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'var(--color-surface)' }}
          >
            🔁 틀린 {result.retry.length}문제 다시 풀기
          </button>
        )}
        {nextId ? (
          <button
            onClick={() => nav(`/learn/scripture/${nextId}`)}
            className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97] transition-transform"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            다음 레슨: {getLessonTitle(nextId)} →
          </button>
        ) : (
          <button
            onClick={() => nav('/map')}
            className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97] transition-transform"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {lid ? '모든 레슨을 마쳤습니다 · 학습맵 보기' : '학습맵 보기'}
          </button>
        )}
        <button
          onClick={() => nav('/')}
          className="w-full py-3 text-sm font-medium"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  )
}
