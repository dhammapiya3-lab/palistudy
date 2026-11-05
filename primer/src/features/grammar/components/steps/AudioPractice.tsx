import { useEffect, useRef, useState } from 'react'
import { speakPali, speakSequence, stopPali } from '../../../../utils/pali-tts'

// 낱말 = 글자(빠알리 확장 라틴 문자 포함)와 결합 부호가 이어진 덩어리
const WORD_G = /[\p{L}\p{M}]+/gu

/** 구절을 낱말 목록으로 */
function splitWords(text: string): string[] {
  return text.normalize('NFC').match(WORD_G) || []
}

interface AudioPracticeProps {
  /** 구절 전체 (빠알리) */
  text: string
  /** 지금 재생 중인 낱말 순번 알림 (-1 = 없음) — 낱말 강조용 */
  onActiveWord?: (i: number) => void
  /** '전체 듣기' 버튼도 보일지 */
  showWhole?: boolean
}

type Mode = 'idle' | 'words' | 'repeat'

/** 독송 연습 버튼 — 전체 듣기 · 한 낱말씩 이어 듣기 · 3번 반복 (재생 중에는 '멈춤') */
export default function AudioPractice({ text, onActiveWord, showWhole = true }: AudioPracticeProps) {
  const [mode, setMode] = useState<Mode>('idle')
  const [count, setCount] = useState(0)
  const alive = useRef(true)
  useEffect(() => {
    alive.current = true
    return () => { alive.current = false }
  }, [])

  const words = splitWords(text)

  const runWords = async () => {
    setMode('words')
    await speakSequence(words, { gapMs: 450, onItem: i => { if (alive.current) onActiveWord?.(i) } })
    if (alive.current) { setMode('idle'); onActiveWord?.(-1) }
  }
  const runRepeat = async () => {
    setMode('repeat')
    await speakSequence([text, text, text], { gapMs: 900, onItem: i => { if (alive.current) setCount(i + 1) } })
    if (alive.current) { setMode('idle'); setCount(0) }
  }
  const stop = () => {
    stopPali()
    setMode('idle'); setCount(0); onActiveWord?.(-1)
  }

  const chip = 'audio-ripple px-3 py-2 rounded-full text-xs font-medium active:scale-95 transition-transform'
  const chipStyle = {
    color: 'var(--color-accent)',
    backgroundColor: 'color-mix(in srgb, var(--color-accent) 8%, transparent)',
    minHeight: 36,
  }

  if (mode !== 'idle') {
    return (
      <div className="flex flex-wrap items-center gap-2 mt-3" aria-live="polite">
        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          {mode === 'words' ? '한 낱말씩 듣는 중…' : `${Math.max(1, count)}/3번째 듣는 중…`}
        </span>
        <button type="button" onClick={stop} className={chip} style={chipStyle}>■ 멈춤</button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {showWhole && (
        <button type="button" onClick={() => speakPali(text)} className={chip} style={chipStyle}>🔊 전체 듣기</button>
      )}
      {words.length > 1 && (
        <button type="button" onClick={runWords} className={chip} style={chipStyle}>👆 한 낱말씩 이어 듣기</button>
      )}
      <button type="button" onClick={runRepeat} className={chip} style={chipStyle}>🔁 3번 반복</button>
    </div>
  )
}
