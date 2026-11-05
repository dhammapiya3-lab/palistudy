import { useMemo, useState } from 'react'
import type { VerseStep as VerseStepType } from '../../types'
import { glossKey, noteGlossary, type Gloss } from '../../verse-gloss'
import AudioPractice from './AudioPractice'

interface VerseStepProps {
  step: VerseStepType
  onSpeak: (text: string) => void
  /** 같은 과 낱말 카드에서 만든 풀이 사전 — 낱말을 누르면 뜻 풍선 */
  glossary?: Map<string, Gloss>
}

// 낱말 = 글자(빠알리 확장 라틴 문자 ā ṃ ṭ ḍ ṇ ñ ṅ ḷ 포함)와 결합 부호가 이어진 덩어리
const WORD_RE = /([\p{L}\p{M}]+)/u
const norm = (s: string) => s.normalize('NFC').toLowerCase()
const stripPunct = (s: string) => s.replace(/^[\p{P}\s]+|[\p{P}\s]+$/gu, '')

export default function VerseStep({ step, onSpeak, glossary }: VerseStepProps) {
  // 강조할 낱말 — 낱말 전체가 똑같을 때만 강조 (다른 낱말 속에 들어 있는 것은 강조하지 않음)
  const highlights = new Set((step.highlight || []).map(h => norm(stripPunct(h))).filter(Boolean))
  const lines = step.pali.normalize('NFC').split(/\r?\n/)
  // 누른 낱말 (풍선) — 줄·칸 위치로 기억
  const [active, setActive] = useState<{ key: string; word: string } | null>(null)
  // 한 낱말씩 이어 듣기 중인 낱말 순번 (구절 전체에서 몇 번째 낱말인지)
  const [playingWord, setPlayingWord] = useState(-1)

  // 이 구절 노트의 '낱말 — 풀이'로 보충
  const fromNote = useMemo(() => noteGlossary(step.note), [step.note])
  const lookup = (w: string): Gloss | undefined => {
    const k = glossKey(w)
    return glossary?.get(k) || fromNote.get(k)
  }
  const activeGloss = active ? lookup(active.word) : undefined

  let wordNo = -1 // 구절 전체 낱말 순번

  return (
    <div className="flex-1 flex flex-col">
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* 장식 상단 */}
        <div
          className="text-center text-xs mb-3 tracking-widest"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-hidden="true"
        >
          ─── ☸ ───
        </div>

        <p
          lang="pi"
          className="pali-text text-base leading-loose"
          style={{ fontFamily: 'var(--font-pali)' }}
        >
          {lines.map((line, li) => (
            <span key={li}>
              {li > 0 && <br />}
              {line.split(WORD_RE).map((part, i) => {
                // 홀수 칸이 낱말, 짝수 칸은 띄어쓰기·문장부호 (그냥 글자로)
                if (i % 2 === 0) return part ? <span key={i}>{part}</span> : null
                wordNo++
                const isHL = highlights.has(norm(part))
                const key = `${li}:${i}`
                const isActive = active?.key === key
                const isPlaying = playingWord === wordNo
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { onSpeak(part); setActive(isActive ? null : { key, word: part }) }}
                    className={`verse-word ${isHL ? 'font-bold px-1 py-0.5' : ''}`}
                    aria-expanded={isActive}
                    style={{
                      backgroundColor: isPlaying || isActive
                        ? 'color-mix(in srgb, var(--color-accent) 22%, transparent)'
                        : isHL
                          ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)'
                          : undefined,
                      color: 'var(--color-primary)',
                      textDecoration: isActive ? 'underline' : undefined,
                      textUnderlineOffset: 4,
                    }}
                  >
                    {part}
                  </button>
                )
              })}
            </span>
          ))}
        </p>

        {/* 낱말 뜻 풍선 */}
        {active && (
          <div
            className="relative mt-2 rounded-xl px-3 py-2 text-sm reveal-down"
            role="status"
            style={{
              backgroundColor: 'var(--color-info-bg)',
              border: '1px solid var(--color-info-border)',
            }}
          >
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-5 w-3 h-3 rotate-45"
              style={{ backgroundColor: 'var(--color-info-bg)', borderLeft: '1px solid var(--color-info-border)', borderTop: '1px solid var(--color-info-border)' }}
            />
            <div className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <p>
                  <span lang="pi" className="pali-text font-bold" style={{ color: 'var(--color-primary)' }}>{activeGloss?.word || active.word}</span>
                  {activeGloss?.pronKo && <span className="text-xs ml-1.5" style={{ color: 'var(--color-text-secondary)' }}>[{activeGloss.pronKo}]</span>}
                </p>
                {activeGloss ? (
                  <p className="mt-0.5">
                    {activeGloss.meaning}
                    {activeGloss.grammar && (
                      <span className="text-xs ml-1.5" style={{ color: 'var(--color-text-secondary)' }}>· {activeGloss.grammar}</span>
                    )}
                  </p>
                ) : (
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                    이 낱말 풀이는 아직 없어요. 아래 번역을 함께 보세요.
                  </p>
                )}
              </div>
              <button type="button" onClick={() => setActive(null)} aria-label="풀이 닫기"
                className="w-8 h-8 -mr-1 -mt-1 shrink-0 flex items-center justify-center rounded-full text-xs"
                style={{ color: 'var(--color-text-secondary)' }}>✕</button>
            </div>
          </div>
        )}

        {/* 듣기: 전체 · 한 낱말씩 · 3번 반복 */}
        <AudioPractice text={step.pali} onActiveWord={setPlayingWord} />

        <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-tertiary, var(--color-text-secondary))' }}>
          낱말을 누르면 소리와 뜻이 나와요
        </p>

        {/* 발음 */}
        <p
          className="text-xs mt-3 whitespace-pre-line"
          style={{ color: 'var(--color-primary)' }}
        >
          🗣️ {step.pronKo}
        </p>

        {/* 번역 */}
        <div
          className="mt-3 rounded-xl p-3 text-sm whitespace-pre-line"
          style={{
            backgroundColor:
              'color-mix(in srgb, var(--color-border) 30%, transparent)',
          }}
        >
          {step.translation}
        </div>
      </div>

      {/* 노트 */}
      {step.note && (
        <div
          className="mt-3 rounded-2xl p-4 text-xs flex items-start gap-2"
          style={{
            backgroundColor: 'var(--color-warn-bg)',
            border: '1px solid var(--color-warn-border)',
          }}
        >
          <span aria-hidden="true">📝</span>
          <span className="whitespace-pre-line">{step.note}</span>
        </div>
      )}
    </div>
  )
}
