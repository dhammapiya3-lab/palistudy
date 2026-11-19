// 내 서재 (빠알리 프라이머) — 화면은 공용 코드 shared/Library.tsx, 이 앱의 소리·과 이름만 넘겨줌
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Library, { type LibraryTts } from '../../shared/Library'
import { library } from '../../utils/library'
import { getLessonMeta } from '../grammar/lessons'
import { hasRecording, speakPali, speakSequence, stopPali } from '../../utils/pali-tts'

const tts: LibraryTts = {
  speak: speakPali,
  sequence: (texts, onIndex, onDone) => { void speakSequence(texts, { gapMs: 600, onItem: i => (i < 0 ? onDone() : onIndex(i)) }) },
  stop: stopPali,
  available: () => typeof window !== 'undefined' && (typeof Audio !== 'undefined' || 'speechSynthesis' in window),
  hasRecording,
}

export default function LibraryPage() {
  const nav = useNavigate()
  const sourceOf = useMemo(() => (b: { lessonId?: string; raw?: number }) => ({
    label: (b.lessonId && getLessonMeta(b.lessonId)?.title) || '공부 책갈피',
    open: b.lessonId && b.raw != null ? () => nav(`/learn/${b.lessonId}?step=${b.raw}`) : undefined,
  }), [nav])
  return (
    <div className="pb-24 min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Library store={library} tts={tts} sourceOf={sourceOf}
        lessonTabLabel="공부 책갈피" bookmarkWhere="공부 화면의 예문·따라 읽기 카드" />
    </div>
  )
}
