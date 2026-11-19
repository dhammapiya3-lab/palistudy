// 내 서재 (경전으로 배우기) — 화면은 공용 코드 shared/Library.tsx, 이 앱의 소리·과 이름만 넘겨줌
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Library, { type LibraryTts } from '../../shared/Library'
import { library } from '../../utils/library'
import { getLessonTitle, lessonNumber } from '../../utils/lessons-meta'
import { hasRecording, setVoiceGender, speakPali, speakSequence, stopSpeech, ttsAvailable } from '../../utils/pali-tts'

const tts: LibraryTts = {
  speak: speakPali,
  sequence: (texts, onIndex, onDone) => speakSequence(texts, { onIndex, onDone: () => onDone() }),
  stop: stopSpeech,
  available: ttsAvailable,
  hasRecording,
  setGender: setVoiceGender,
}

export default function LibraryPage() {
  const nav = useNavigate()
  const sourceOf = useMemo(() => (b: { lessonId?: string; raw?: number }) => ({
    label: b.lessonId ? `제${lessonNumber(b.lessonId)}과 ${getLessonTitle(b.lessonId)}` : '경전 책갈피',
    open: b.lessonId && b.raw != null ? () => nav(`/learn/scripture/${b.lessonId}?step=${b.raw}`) : undefined,
  }), [nav])
  return (
    <Library store={library} tts={tts} sourceOf={sourceOf}
      lessonTabLabel="경전 책갈피" bookmarkWhere="경전 공부 화면의 구절 카드" />
  )
}
