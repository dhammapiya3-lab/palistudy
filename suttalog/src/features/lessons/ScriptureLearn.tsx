// 경전 중심 Duolingo식 학습 UI (데이터는 별도 파일)
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { speakPali } from '../../utils/pali-tts'
import { getMemo, hasMemo, pageIdOf, type StepSnapshot } from '../../utils/memo'
import { getLessonTitle } from '../../utils/lessons-meta'
import WritingCanvas from '../../components/WritingCanvas'
import LotusHeart from '../../components/LotusHeart'
import MemoSheet from '../../components/MemoSheet'
import { LESSON_SN56_11, type StepType } from './lesson-data-sn56-11'
import { LESSON_SN22_59 } from './lesson-data-sn22-59'
import { LESSON_SN45_8 } from './lesson-data-sn45-8'
import { LESSON_MN10 } from './lesson-data-mn10'
import { LESSON_NAMO } from './lesson-data-namo'
import { LESSON_TRISARANA } from './lesson-data-trisarana'
import { LESSON_PANCASILA } from './lesson-data-pancasila'
import { LESSON_TISARANA_GUNA } from './lesson-data-tisarana-guna'
import { LESSON_MANGALA } from './lesson-data-mangala'
import { LESSON_METTA } from './lesson-data-metta'
import { LESSON_RATANA } from './lesson-data-ratana'

type Step = StepType

const LESSON_MAP: Record<string, Step[]> = {
  'dhp1-alphabet': LESSON_SN56_11,
  'sn56-11': LESSON_SN56_11,
  'sn22-59': LESSON_SN22_59,
  'sn45-8': LESSON_SN45_8,
  'mn10': LESSON_MN10,
  'namo': LESSON_NAMO,
  'trisarana': LESSON_TRISARANA,
  'pancasila': LESSON_PANCASILA,
  'tisarana-guna': LESSON_TISARANA_GUNA,
  'mangala': LESSON_MANGALA,
  'metta': LESSON_METTA,
  'ratana': LESSON_RATANA,
}

// 단어 설명 단계 설정에 따라 스텝 필터링
function filterStepsByWordMode(steps: Step[]): Step[] {
  const mode = localStorage.getItem('suttalog-word-mode') || 'all'
  if (mode === 'all') return steps

  const limit = Number(localStorage.getItem('suttalog-word-limit') || '3')
  const globalCounts: Record<string, number> = JSON.parse(
    localStorage.getItem('suttalog-word-counts') || '{}'
  )
  const seenInLesson = new Set<string>()

  return steps.filter(step => {
    if (step.type !== 'teach') return true
    const word = step.word.toLowerCase().trim()

    if (mode === 'first') {
      if (seenInLesson.has(word)) return false
      seenInLesson.add(word)
      return true
    }

    if (mode === 'limit') {
      return (globalCounts[word] || 0) < limit
    }

    return true
  })
}

export default function ScriptureLearn() {
  const nav = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()
  const lid = lessonId || 'dhp1-alphabet'
  const RAW_STEPS = LESSON_MAP[lid] || LESSON_SN56_11
  const STEPS = filterStepsByWordMode(RAW_STEPS)

  // 이어 학습: localStorage에서 진도 복원
  const savedStep = Number(localStorage.getItem(`suttalog-progress-${lid}`) || '0')
  const [stepIdx, setStepIdxRaw] = useState(Math.min(savedStep, STEPS.length - 1))

  // stepIdx 변경 시 자동 저장
  const setStepIdx = (updater: number | ((prev: number) => number)) => {
    setStepIdxRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      localStorage.setItem(`suttalog-progress-${lid}`, String(next))
      return next
    })
  }
  // SSOT: 연꽃 개수는 설정에서 읽음 (기본 5)
  const MAX_HEARTS = Number(localStorage.getItem('suttalog-hearts-count') || '5')
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [prevHearts, setPrevHearts] = useState(MAX_HEARTS)
  const [heartShakeIdx, setHeartShakeIdx] = useState<number | null>(null)

  useEffect(() => {
    if (hearts < prevHearts) {
      setHeartShakeIdx(hearts)
      const t = setTimeout(() => setHeartShakeIdx(null), 600)
      return () => clearTimeout(t)
    }
    setPrevHearts(hearts)
  }, [hearts, prevHearts])
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [writingInput, setWritingInput] = useState('')
  const [writingChecked, setWritingChecked] = useState(false)
  const [showTOC, setShowTOC] = useState(false)
  const [showMemo, setShowMemo] = useState(false)
  const [memoVer, setMemoVer] = useState(0)
  const writingEnabled = localStorage.getItem('suttalog-writing') !== 'off'

  const step = STEPS[stepIdx]
  const progress = ((stepIdx + 1) / STEPS.length) * 100
  const speak = (text: string) => speakPali(text)
  const isQuizType = step.type === 'match-listen' || step.type === 'match-reverse' || step.type === 'quiz'
  const isWriting = step.type === 'writing'
  const isArrange = step.type === 'arrange'
  const [arrangeOrder, setArrangeOrder] = useState<number[]>([])

  // writing 비활성화 모드 자동 스킵 — 렌더 중 setState 금지를 위해 useEffect로.
  useEffect(() => {
    if (step?.type === 'writing' && !writingEnabled) {
      if (stepIdx + 1 >= STEPS.length) nav('/lesson-complete')
      else {
        setStepIdx(i => i + 1)
        setSelected(null); setShowResult(false); setWritingInput(''); setWritingChecked(false); setArrangeOrder([])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx, step?.type])

  // 특수문자 (차후 타이핑 모드에서 사용)
  // const SPECIAL_CHARS = ['ā', 'ī', 'ū', 'ṃ', 'ṅ', 'ñ', 'ṭ', 'ḍ', 'ṇ', 'ḷ']

  const getAnswerText = (): string => {
    if (!('answer' in step) || !('options' in step)) return ''
    const s = step as { options: string[]; answer: number }
    return s.options[s.answer]
  }

  const shuffledOpts = (() => {
    if (!('options' in step)) return []
    const opts = [...(step as { options: string[] }).options]
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.abs(((stepIdx + 1) * 31 + i * 17) % (i + 1))
      ;[opts[i], opts[j]] = [opts[j], opts[i]]
    }
    return opts
  })()

  const stopAudio = () => speechSynthesis.cancel()

  const handleCheck = () => {
    if (selected === null) return
    setShowResult(true)
    if (shuffledOpts[selected] !== getAnswerText()) setHearts(h => Math.max(0, h - 1))
  }
  const handleNext = () => {
    stopAudio()
    // teach 스텝 완료 시 전역 단어 학습 횟수 기록
    if (step.type === 'teach') {
      const word = step.word.toLowerCase().trim()
      const counts: Record<string, number> = JSON.parse(
        localStorage.getItem('suttalog-word-counts') || '{}'
      )
      counts[word] = (counts[word] || 0) + 1
      localStorage.setItem('suttalog-word-counts', JSON.stringify(counts))
    }
    // 캘린더에 오늘 학습 기록
    const today = new Date().toISOString().slice(0, 10)
    const dates: string[] = JSON.parse(localStorage.getItem('suttalog-study-dates') || '[]')
    if (!dates.includes(today)) { dates.push(today); localStorage.setItem('suttalog-study-dates', JSON.stringify(dates)) }
    if (stepIdx + 1 >= STEPS.length) { nav('/lesson-complete'); return }
    setStepIdx(i => i + 1); setSelected(null); setShowResult(false); setWritingInput(''); setWritingChecked(false); setArrangeOrder([])
  }
  const handlePrev = () => {
    stopAudio()
    if (stepIdx > 0) { setStepIdx(i => i - 1); setSelected(null); setShowResult(false); setWritingInput(''); setWritingChecked(false); setArrangeOrder([]) }
  }
  const checkWriting = () => {
    setWritingChecked(true)
    const correct = 'answer' in step ? (step as { answer: string }).answer : ''
    if (writingInput.trim().toLowerCase() !== correct.toLowerCase()) setHearts(h => Math.max(0, h - 1))
  }
  const isCorrectAnswer = selected !== null && shuffledOpts[selected] === getAnswerText()
  const pageId = pageIdOf(lid, stepIdx)
  const currentMemo = hasMemo(pageId) ? getMemo(pageId) : null

  if (hearts <= 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <span className="text-6xl">🥀</span>
        <h2 className="text-xl font-bold mt-4">연꽃잎을 모두 잃었습니다</h2>
        <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>다시 도전해 보세요 🙏</p>
        <button
          onClick={() => { setStepIdx(0); setHearts(MAX_HEARTS); setPrevHearts(MAX_HEARTS); setSelected(null); setShowResult(false) }}
          className="mt-6 w-full px-6 py-3 rounded-xl text-white font-bold"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >처음부터 다시</button>
        <button onClick={() => nav('/')} className="mt-3 w-full px-6 py-3 rounded-xl font-bold" style={{ border: '1px solid var(--color-border)' }}>홈으로</button>
      </div>
    )
  }

  // layout='fill': 선택지가 세로 공간을 균등 분할 (퀴즈 화면)
  // layout='stack': 고정 높이로 위에서 쌓기
  const renderOptions = (layout: 'fill' | 'stack' = 'stack') => {
    const answerText = getAnswerText()
    return (
      <div className={layout === 'fill' ? 'flex flex-col gap-3 pb-1' : 'space-y-3'}>
        {shuffledOpts.map((opt, i) => {
          const isAns = showResult && opt === answerText
          const isWrn = showResult && selected === i && opt !== answerText
          const isSelected = selected === i && !showResult
          return (
            <button key={i} onClick={() => !showResult && setSelected(i)} disabled={showResult}
              className={[
                layout === 'fill'
                  ? 'w-full px-5 py-4 rounded-2xl text-left text-base font-medium transition-all active:scale-[0.98] flex items-center min-h-[60px]'
                  : 'w-full p-4 rounded-2xl text-left text-base font-medium transition-all active:scale-[0.98]',
              ].join(' ')}
              style={{
                backgroundColor: isAns ? '#E8F5E9' : isWrn ? '#FFEBEE' : isSelected ? 'color-mix(in srgb, var(--color-primary) 8%, var(--color-surface))' : 'var(--color-surface)',
                border: isAns ? '2px solid #4CAF50' : isWrn ? '2px solid #F44336' : isSelected ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
              }}>
              {isAns && '✅ '}{isWrn && '❌ '}{opt}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="shrink-0 flex items-center gap-2 px-4 pt-3 pb-2">
        <button onClick={() => nav('/')} className="text-lg">✕</button>
        <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: 'var(--color-primary)' }} />
        </div>
        {/* 목차 버튼 */}
        <button
          onClick={() => setShowTOC(true)}
          className="w-8 h-8 flex items-center justify-center rounded-full active:scale-90 transition-transform shrink-0"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="목차"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </button>
        <div className="flex gap-0.5 shrink-0">
          {Array.from({ length: MAX_HEARTS }, (_, i) => (
            <LotusHeart
              key={i}
              active={i < hearts}
              shake={heartShakeIdx === i}
              delay={i * 0.2}
              size={24}
            />
          ))}
        </div>
      </div>

      {/* === 페이지 고유 ID 뱃지 === */}
      <div className="shrink-0 px-4 pb-1.5 flex items-center gap-1.5">
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, var(--color-surface))', color: 'var(--color-primary)', border: '1px solid var(--color-border-light)' }}>
          {getLessonTitle(lid)}
        </span>
        <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-tertiary)' }}>📍 {pageId}</span>
        <span className="ml-auto text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>{stepIdx + 1} / {STEPS.length}</span>
      </div>

      {/* === 스텝 목차 오버레이 === */}
      {showTOC && (
        <div className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setShowTOC(false)}>
          <div className="w-full max-w-lg rounded-t-3xl overflow-hidden"
            style={{ backgroundColor: 'var(--color-bg)', maxHeight: '70vh' }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h3 className="text-base font-bold">스텝 목차</h3>
              <button onClick={() => setShowTOC(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full active:scale-90 transition-transform"
                style={{ color: 'var(--color-text-secondary)' }}>✕</button>
            </div>
            <div className="overflow-y-auto px-3 pb-6" style={{ maxHeight: 'calc(70vh - 60px)' }}>
              {STEPS.map((s, i) => {
                const typeIcon = s.type === 'intro' ? '📖'
                  : s.type === 'teach' ? '📝'
                  : s.type === 'teach-grammar' ? '📐'
                  : s.type === 'quiz' ? '❓'
                  : s.type === 'match-listen' ? '🔊'
                  : s.type === 'match-reverse' ? '🎯'
                  : s.type === 'writing' ? '✍️'
                  : s.type === 'speak' ? '🎤'
                  : s.type === 'arrange' ? '🧩'
                  : s.type === 'verse' ? '☸️' : '•'
                const label = s.type === 'intro' ? s.title
                  : s.type === 'teach' ? `${s.word} — ${s.meaning}`
                  : s.type === 'teach-grammar' ? s.title
                  : s.type === 'quiz' ? `퀴즈: ${s.question.slice(0, 28)}…`
                  : s.type === 'match-listen' ? `듣기: ${s.instruction.slice(0, 28)}`
                  : s.type === 'match-reverse' ? `뜻맞추기: ${s.meaning}`
                  : s.type === 'writing' ? `쓰기: ${s.answer}`
                  : s.type === 'speak' ? `따라읽기: ${s.pali.slice(0, 28)}`
                  : s.type === 'arrange' ? `배열: ${s.instruction.slice(0, 28)}`
                  : s.type === 'verse' ? `경전: ${s.pali.slice(0, 28)}…`
                  : `스텝 ${i + 1}`
                const isCur = i === stepIdx
                return (
                  <button key={i}
                    onClick={() => {
                      stopAudio()
                      setStepIdx(i)
                      setSelected(null)
                      setShowResult(false)
                      setWritingInput('')
                      setWritingChecked(false)
                      setArrangeOrder([])
                      setShowTOC(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 active:scale-[0.98]"
                    style={{
                      backgroundColor: isCur ? 'color-mix(in srgb, var(--color-primary) 10%, var(--color-surface))' : 'transparent',
                      border: isCur ? '1px solid var(--color-primary)' : '1px solid transparent',
                    }}>
                    <span className="text-sm shrink-0">{typeIcon}</span>
                    <span className="text-xs font-medium truncate flex-1"
                      style={{ color: isCur ? 'var(--color-primary)' : 'var(--color-text)' }}>
                      {i + 1}. {label}
                    </span>
                    {isCur && (
                      <span className="text-[10px] font-bold shrink-0" style={{ color: 'var(--color-primary)' }}>현재</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-y-auto px-4 pt-2">
        {step.type === 'intro' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
            <span className="text-6xl mb-4">{step.icon}</span>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{step.title}</h1>
            <p className="text-sm pali-text mt-1" style={{ color: 'var(--color-text-secondary)' }}>{step.subtitle}</p>
            <p className="text-sm mt-6 whitespace-pre-line leading-relaxed">{step.description}</p>
          </div>
        )}

        {step.type === 'teach' && (
          <div className="flex-1 flex flex-col pt-1">
            {step.verseLine && (
              <div className="rounded-xl p-3 mb-3" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <p className="pali-text text-xs leading-relaxed">
                  {step.verseLine.split(new RegExp(`(${step.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i')).map((part, i) =>
                    part.toLowerCase() === step.word.toLowerCase()
                      ? <span key={i} className="font-bold px-0.5 rounded text-sm" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>{part}</span>
                      : <span key={i} style={{ color: 'var(--color-text-secondary)' }}>{part}</span>
                  )}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{step.verseLineKo}</p>
              </div>
            )}
            <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-primary)' }}>
              <span className="text-3xl">{step.icon}</span>
              <p className="pali-text text-2xl font-bold mt-2" style={{ color: 'var(--color-primary)' }}>{step.word}</p>
              <p className="text-sm mt-1 font-medium">{step.pronKo}</p>
              {step.audio && <button onClick={() => speak(step.word)} className="mt-2 px-4 py-1.5 rounded-full text-xs text-white" style={{ backgroundColor: 'var(--color-accent)' }}>🔊 발음</button>}
              <hr className="my-3" style={{ borderColor: 'var(--color-border)' }} />
              <p className="text-lg font-bold">{step.meaning}</p>
              {step.grammar && <p className="text-xs mt-1 px-2 py-0.5 rounded-full inline-block" style={{ backgroundColor: 'var(--color-border)' }}>{step.grammar}</p>}
            </div>
            {(step.baseForm || step.formNote) && (
              <div className="mt-2 rounded-xl p-3 text-xs" style={{ backgroundColor: '#E3F2FD', border: '1px solid #BBDEFB' }}>
                {step.baseForm && <p className="font-bold">📐 원형: {step.baseForm}</p>}
                {step.formNote && <p className="mt-1 whitespace-pre-line" style={{ color: 'var(--color-text-secondary)' }}>{step.formNote}</p>}
              </div>
            )}
            {step.buddhism && <div className="mt-2 rounded-xl p-3 text-xs" style={{ backgroundColor: '#E8F5E9', border: '1px solid #C8E6C9' }}>☸️ {step.buddhism}</div>}
          </div>
        )}

        {step.type === 'match-listen' && (
          <div className="flex-1 flex flex-col">
            <p className="text-sm font-bold mb-3">{step.instruction}</p>
            <button onClick={() => speak(step.word)} className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl active:scale-95 mb-4" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>🔊</button>
            {renderOptions('fill')}
          </div>
        )}

        {step.type === 'match-reverse' && (
          <div className="flex-1 flex flex-col">
            <p className="text-sm font-bold mb-4">{step.instruction}</p>
            {renderOptions('fill')}
          </div>
        )}

        {step.type === 'quiz' && (
          <div className="flex-1 flex flex-col">
            <p className="text-base font-bold mb-4">{step.question}</p>
            {step.hint && !showResult && <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>💡 {step.hint}</p>}
            {renderOptions('fill')}
          </div>
        )}

        {step.type === 'verse' && (
          <div className="flex-1 flex flex-col">
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="pali-text text-[15px] leading-relaxed">
                {step.pali.split(/(\s+)/).map((token, i) => {
                  const clean = token.replace(/[,.:;—""\n]/g, '').toLowerCase()
                  const isHL = step.highlight?.some(h => clean.includes(h.toLowerCase()))
                  return <span key={i}>{isHL
                    ? <button onClick={() => speak(token)} className="font-bold px-0.5 rounded" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>{token}</button>
                    : <span style={{ color: 'var(--color-primary)' }}>{token}</span>
                  }</span>
                })}
              </p>
              <button onClick={() => speak(step.pali)} className="mt-2 text-xs" style={{ color: 'var(--color-accent)' }}>🔊 전체</button>
              <p className="text-xs mt-2" style={{ color: 'var(--color-primary)', opacity: 0.7 }}>🗣️ {step.pronKo}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{step.translation}</p>
            </div>
            {step.note && <div className="mt-2 rounded-xl p-3 text-xs" style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}>{step.note}</div>}
          </div>
        )}

        {step.type === 'speak' && (
          <div className="flex-1 flex flex-col items-center text-center pt-6">
            <p className="text-sm mb-4">🎤 따라 읽어보세요</p>
            <div className="rounded-2xl p-5 w-full" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="pali-text text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>{step.pali}</p>
              <p className="text-sm mt-2 font-medium">{step.pronKo}</p>
              <button onClick={() => speak(step.pali)} className="mt-3 px-5 py-2 rounded-full text-white text-sm" style={{ backgroundColor: 'var(--color-accent)' }}>🔊 먼저 듣기</button>
            </div>
            <button className="mt-6 w-16 h-16 rounded-full flex items-center justify-center text-3xl active:scale-90" style={{ backgroundColor: '#EF5350', color: 'white' }}>🎤</button>
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>버튼을 누르고 따라 읽으세요</p>
          </div>
        )}

        {step.type === 'teach-grammar' && (
          <div className="flex-1 flex flex-col items-center px-2 pt-4">
            <span className="text-4xl mb-3">📐</span>
            <h2 className="text-lg font-bold">{step.title}</h2>
            <div className="mt-4 rounded-2xl p-4 w-full" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="pali-text text-base font-bold text-center whitespace-pre-line" style={{ color: 'var(--color-primary)' }}>{step.example}</p>
              <p className="text-center mt-1 font-semibold whitespace-pre-line">{step.exampleKo}</p>
            </div>
            <div className="mt-3 rounded-xl p-3 w-full text-sm whitespace-pre-line" style={{ backgroundColor: '#E3F2FD', border: '1px solid #BBDEFB' }}>{step.explanation}</div>
          </div>
        )}

        {/* 쓰기 — writing 모드 on일 때만 표시. off면 useEffect에서 자동 스킵. */}
        {step.type === 'writing' && writingEnabled && (
          <div className="flex-1 flex flex-col">
            <p className="text-base font-bold mb-2">✍️ {step.instruction}</p>
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              뜻: {step.meaning} · 발음: {step.pronKo}
            </p>
            <button onClick={() => speak((step as { answer: string }).answer)}
              className="text-xs mb-3 flex items-center gap-1 self-start" style={{ color: 'var(--color-accent)' }}>
              🔊 발음 듣기
            </button>

            {/* 손글씨 캔버스 */}
            <WritingCanvas />

            {/* 정답 보기 */}
            {!writingChecked ? (
              <button onClick={() => setWritingChecked(true)}
                className="mt-3 text-xs self-center underline" style={{ color: 'var(--color-text-secondary)' }}>
                정답 보기
              </button>
            ) : (
              <div className="mt-3 rounded-xl p-3 text-center" style={{ backgroundColor: '#E8F5E9', border: '1px solid #C8E6C9' }}>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>정답</p>
                <p className="pali-text text-xl font-bold mt-1" style={{ color: 'var(--color-primary)' }}>
                  {(step as { answer: string }).answer}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 문장 배열 */}
        {step.type === 'arrange' && (
          <div className="flex-1 flex flex-col">
            <p className="text-base font-bold mb-2">🧩 {step.instruction}</p>
            <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>{step.translation}</p>

            {/* 배치 슬롯 */}
            <div className="flex flex-wrap gap-2 p-3 min-h-14 rounded-xl mb-4"
              style={{ backgroundColor: 'var(--color-surface)', border: '2px dashed var(--color-border)' }}>
              {arrangeOrder.map((idx, i) => (
                <button key={i} onClick={() => setArrangeOrder(o => o.filter((_, j) => j !== i))}
                  className="px-3 py-2 rounded-lg text-sm font-medium pali-text active:scale-95"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                  {step.blocks[idx]}
                </button>
              ))}
              {arrangeOrder.length === 0 && (
                <p className="text-xs self-center mx-auto" style={{ color: 'var(--color-border)' }}>아래 블록을 탭하여 배열하세요</p>
              )}
            </div>

            {/* 블록 */}
            <div className="flex flex-wrap gap-2">
              {step.blocks.map((block, i) => (
                <button key={i}
                  onClick={() => !arrangeOrder.includes(i) && !showResult && setArrangeOrder(o => [...o, i])}
                  disabled={arrangeOrder.includes(i) || showResult}
                  className="px-3 py-2 rounded-lg text-sm font-medium pali-text transition-all active:scale-95"
                  style={{
                    backgroundColor: arrangeOrder.includes(i) ? 'var(--color-border)' : 'var(--color-surface)',
                    border: '2px solid var(--color-border)',
                    opacity: arrangeOrder.includes(i) ? 0.3 : 1,
                  }}>
                  {block}
                </button>
              ))}
            </div>

            {/* 결과 */}
            {showResult && (
              <div className="mt-3 rounded-xl p-3" style={{
                backgroundColor: JSON.stringify(arrangeOrder) === JSON.stringify(step.correctOrder) ? '#E8F5E9' : '#FFEBEE',
              }}>
                <p className="text-sm font-bold">
                  {JSON.stringify(arrangeOrder) === JSON.stringify(step.correctOrder)
                    ? '✅ Sādhu! 정확합니다!'
                    : `❌ 정답: ${step.correctOrder.map(i => step.blocks[i]).join(' ')}`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* === 메모 미리보기 카드 — 현재 단계에 메모가 있으면 노출 === */}
        {currentMemo && (
          <button key={memoVer} onClick={() => setShowMemo(true)}
            className="rounded-xl p-3 text-left w-full mt-4 active:scale-[0.98]"
            style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>📝 내 메모</span>
              <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-tertiary)' }}>{currentMemo.memoId.slice(0, 8)}</span>
              <span className="ml-auto text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>탭하여 편집</span>
            </div>
            <p className="text-xs whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--color-text)' }}>{currentMemo.body}</p>
            {currentMemo.patch && (
              <p className="text-[10px] mt-2 px-2 py-1 rounded-full inline-block" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
                AI 제안 · {currentMemo.patch.status === 'proposed' ? '검토 대기' : currentMemo.patch.status}
              </p>
            )}
          </button>
        )}

        <div className="min-h-32" />
      </div>

      <div className="fixed bottom-14 left-0 right-0 px-4 pb-3 pt-2 max-w-[430px] mx-auto" style={{ backgroundColor: 'var(--color-bg)' }}>
        {showResult && (isQuizType || isArrange) && (
          <div className="rounded-xl p-2.5 mb-2" style={{ backgroundColor: isCorrectAnswer ? '#E8F5E9' : '#FFEBEE' }}>
            <p className="text-sm font-bold">{isCorrectAnswer ? '✅ Sādhu! 정답!' : '❌ 틀렸습니다'}</p>
          </div>
        )}
        <div className="flex gap-2">
          {stepIdx > 0 && (
            <button onClick={handlePrev} className="px-4 py-3.5 rounded-xl font-bold text-sm active:scale-[0.97]"
              style={{ border: '2px solid var(--color-border)' }}>← 이전</button>
          )}
          <button onClick={
              isArrange && !showResult ? () => { setShowResult(true); if (JSON.stringify(arrangeOrder) !== JSON.stringify((step as { correctOrder: number[] }).correctOrder)) setHearts(h => Math.max(0, h - 1)) }
              : isWriting && !writingChecked ? checkWriting
              : isQuizType && !showResult ? handleCheck
              : handleNext
            }
            className="flex-1 py-3.5 rounded-xl text-white font-bold text-base active:scale-[0.97]"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            {isArrange && !showResult ? '확인' : isWriting && !writingChecked ? '확인' : isQuizType && !showResult ? '확인' : '다음 →'}
          </button>
          {/* 스킵 버튼 — 항상 */}
          {(isQuizType || isWriting || isArrange) && !showResult && !writingChecked && (
            <button onClick={handleNext} className="px-3 py-3.5 rounded-xl text-xs"
              style={{ color: 'var(--color-text-secondary)' }}>건너뛰기</button>
          )}
        </div>
      </div>

      {/* 메모 FAB — 학습 화면 우하단 floating */}
      <button
        onClick={() => setShowMemo(true)}
        className="fixed right-4 rounded-full flex items-center justify-center active:scale-90 z-40"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)', width: 52, height: 52, backgroundColor: 'var(--color-primary)', color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.28)' }}
        aria-label="메모 작성"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
        {hasMemo(pageIdOf(lid, stepIdx)) && (
          <span
            key={memoVer}
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: '#EF5350', border: '2px solid var(--color-bg)' }}
          />
        )}
      </button>

      {/* 메모 시트 */}
      <MemoSheet
        open={showMemo}
        onClose={() => setShowMemo(false)}
        lessonId={lid}
        stepIdx={stepIdx}
        snapshot={buildSnapshot(step)}
        onSaved={() => setMemoVer(v => v + 1)}
      />
    </div>
  )
}

// 현재 step에서 메모 anchor용 식별 정보 추출
function buildSnapshot(step: Step): StepSnapshot {
  const snap: StepSnapshot = { stepType: step.type }
  if ('word' in step) snap.word = step.word
  if ('pali' in step) snap.pali = step.pali
  if ('question' in step) snap.question = step.question
  if ('title' in step) snap.title = step.title
  if ('instruction' in step) snap.instruction = step.instruction
  return snap
}
