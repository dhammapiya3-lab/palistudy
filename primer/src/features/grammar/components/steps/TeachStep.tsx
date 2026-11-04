import type { ReactNode } from 'react'
import type { TeachStep as TeachStepType } from '../../types'

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
// 유기음 짝이 있는 자음 (뒤에 h가 오면 다른 글자: kh, gh, ch, jh, ṭh, ḍh, th, dh, ph, bh, ḷh)
const ASPIRABLE = 'kgcjṭḍtdpbḷ'

/**
 * 문맥 줄에서 단어 강조 위치 찾기
 * - 보통 단어: 앞뒤가 다른 글자가 아닌 '낱말 전체'만 (짧은 ca·va·na가 다른 낱말 속에서 강조되지 않게)
 * - 자모 단계(한두 글자): 낱말 속 글자를 강조하되, 유기음(ṭh 등)의 일부는 강조하지 않음
 */
function highlightLine(line: string, word: string): ReactNode[] {
  const text = line.normalize('NFC')
  const w = word.normalize('NFC').trim()
  if (!w) return [text]
  const isLetter = [...w].length <= 2 && !/\s/.test(w)
  let re: RegExp
  if (isLetter) {
    const last = w[w.length - 1].toLowerCase()
    const notAspirate = w.length === 1 && ASPIRABLE.includes(last) ? '(?!h)' : ''
    const notAfterConsonant = w.toLowerCase() === 'h' ? `(?<![${ASPIRABLE}])` : ''
    re = new RegExp(`${notAfterConsonant}${esc(w)}${notAspirate}`, 'giu')
  } else {
    re = new RegExp(`(?<![\\p{L}\\p{M}])${esc(w)}(?![\\p{L}\\p{M}])`, 'giu')
  }
  // 자모 단계의 문맥 줄은 '낱말 [한글 발음]' 꼴 → 한글 발음 부분은 강조하지 않음
  const cut = isLetter && text.indexOf('[') > 0 ? text.indexOf('[') : text.length
  const head = text.slice(0, cut)
  const tail = text.slice(cut)
  const out: ReactNode[] = []
  let pos = 0
  for (const m of head.matchAll(re)) {
    const at = m.index ?? 0
    if (at > pos) out.push(<span key={`t${pos}`} style={{ color: 'var(--color-text-secondary)' }}>{head.slice(pos, at)}</span>)
    out.push(
      <span key={`h${at}`} className="font-bold px-1 py-0.5 rounded text-sm"
        style={{ backgroundColor: 'var(--color-primary-dark)', color: 'white' }}>
        {m[0]}
      </span>
    )
    pos = at + m[0].length
  }
  const rest = head.slice(pos) + tail
  if (rest) out.push(<span key={`t${pos}`} style={{ color: 'var(--color-text-secondary)' }}>{rest}</span>)
  return out
}

interface TeachStepProps {
  step: TeachStepType
  lid: string
  onSpeak: (text: string) => void
}

export default function TeachStep({ step, onSpeak }: TeachStepProps) {
  return (
    <div className="flex-1 flex flex-col pt-1">
      {/* 게송 문맥 */}
      {step.verseLine && (
        <div
          className="rounded-2xl p-4 mb-4"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <p lang="pi" className="pali-text text-xs leading-relaxed">
            {highlightLine(step.verseLine, step.word)}
          </p>
          {step.verseLineKo && (
            <p
              className="text-xs mt-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {step.verseLineKo}
            </p>
          )}
        </div>
      )}

      {/* 메인 단어 카드 */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '2px solid var(--color-primary)',
          boxShadow: '0 4px 16px rgba(212,118,10,0.08)',
        }}
      >
        <span className="text-4xl block">{step.icon}</span>
        <button
          type="button"
          lang="pi"
          className="pali-text text-3xl font-bold mt-3 cursor-pointer active:opacity-60 transition-opacity block mx-auto"
          style={{
            fontFamily: 'var(--font-pali)',
            color: 'var(--color-primary)',
          }}
          onClick={() => onSpeak(step.word)}
          aria-label={`${step.word} 발음 듣기`}
        >
          {step.word} <span className="text-base align-middle opacity-60" aria-hidden="true">🔊</span>
        </button>
        {/* 발음 필 배지 */}
        <span
          className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
            color: 'var(--color-primary)',
          }}
        >
          {step.pronKo}
        </span>

        <hr
          className="my-4"
          style={{ borderColor: 'var(--color-border)' }}
        />
        <p className="text-xl font-bold">{step.meaning}</p>

        {/* 문법 태그 */}
        {step.grammar && (
          <span
            className="inline-block mt-2 px-3 py-1 rounded-full text-xs"
            style={{
              backgroundColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {step.grammar}
          </span>
        )}
      </div>

      {/* 원형/형태 정보 */}
      {(step.baseForm || step.formNote) && (
        <div
          className="mt-3 rounded-2xl overflow-hidden"
          style={{
            backgroundColor: 'var(--color-info-bg)',
            border: '1px solid var(--color-info-border)',
          }}
        >
          <div className="px-4 py-3">
            <p className="text-xs font-bold flex items-center gap-1 mb-1">
              📐 문법 상세
              {step.baseForm && (
                <span className="font-normal ml-1">
                  (원형: <span lang="pi">{step.baseForm}</span>)
                </span>
              )}
            </p>
            {step.formNote && (
              <p
                className="text-xs whitespace-pre-line leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {step.formNote}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 불교 맥락 */}
      {step.buddhism && (
        <div
          className="mt-3 rounded-2xl p-4 text-xs flex items-start gap-2"
          style={{
            backgroundColor: 'var(--color-success-bg)',
            border: '1px solid var(--color-success-border)',
          }}
        >
          <span className="text-base">☸️</span>
          <span>{step.buddhism}</span>
        </div>
      )}
    </div>
  )
}
