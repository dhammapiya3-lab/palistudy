// 경전 읽기 (핵심 화면)
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import { useSutta } from '../../hooks/useSutta'
import { useSuttaProgress } from '../../hooks/useProgress'
import { useDictionary } from '../../hooks/useDictionary'
import { useStudyStore } from '../../store/study-store'
import BottomSheet from '../../components/BottomSheet'
import ProgressBar from '../../components/ProgressBar'
import { createCard, saveCard } from '../../db/flashcard-db'
import { updateActivity } from '../../db/progress-db'
import type { ReadingMode } from '../../types'

export default function ReaderPage() {
  const { uid } = useParams<{ uid: string }>()
  const navigate = useNavigate()
  const { sutta, loading, error } = useSutta(uid)
  const { progress, updateProgress } = useSuttaProgress(uid)
  const { entries, loading: dictLoading, lookup, clear } = useDictionary()
  const { readingMode, setReadingMode, selectedWord, setSelectedWord, startSession, endSession } = useStudyStore()

  // 세션 시작/종료
  useEffect(() => {
    startSession()
    return () => {
      const minutes = endSession()
      if (minutes > 0) {
        updateActivity({ minutesStudied: minutes })
      }
    }
  }, [uid])

  // 세그먼트 데이터
  const segments = sutta ? Object.keys(sutta.root_text).map(segId => ({
    id: segId,
    pali: sutta.root_text[segId] || '',
    translation: sutta.translation_text?.[segId] || '',
  })) : []

  const totalSegments = segments.length
  const readPercent = progress && totalSegments > 0
    ? Math.round((progress.readSegments / totalSegments) * 100)
    : 0

  // 빠알리 단어 클릭 처리
  const handleWordClick = useCallback((word: string) => {
    // 발음부호 포함 단어 정리
    const cleaned = word.replace(/[.,;:!?'"()]/g, '').trim()
    if (!cleaned) return
    setSelectedWord(cleaned)
    lookup(cleaned)
  }, [lookup, setSelectedWord])

  // 플래시카드 추가
  const handleAddCard = useCallback(async (segId: string, front: string, back: string) => {
    if (!uid) return
    const card = createCard({
      suttaUid: uid,
      segmentId: segId,
      front,
      back,
    })
    await saveCard(card)
  }, [uid])

  // 진도 업데이트 (스크롤 기반)
  const handleSegmentVisible = useCallback((segId: string, index: number) => {
    if (!uid) return
    updateProgress({
      lastSegmentId: segId,
      totalSegments,
      readSegments: Math.max(progress?.readSegments ?? 0, index + 1),
    })
  }, [uid, totalSegments, progress, updateProgress])

  // 읽기 완료
  useEffect(() => {
    if (progress && progress.readSegments >= totalSegments && totalSegments > 0 && !progress.completedAt) {
      updateProgress({ completedAt: Date.now() })
      updateActivity({ suttasRead: 1 })
    }
  }, [progress?.readSegments, totalSegments])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p style={{ color: 'var(--color-text-secondary)' }}>경전 로딩 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <button onClick={() => navigate(-1)} className="text-sm" style={{ color: 'var(--color-primary)' }}>
          ← 돌아가기
        </button>
        <p className="text-red-500">오류: {error}</p>
      </div>
    )
  }

  if (!sutta) return null

  const modeButtons: { mode: ReadingMode; label: string }[] = [
    { mode: 'pali', label: 'Pāli' },
    { mode: 'translation', label: 'English' },
    { mode: 'parallel', label: '병렬' },
  ]

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-sm" style={{ color: 'var(--color-primary)' }}>
          ← 돌아가기
        </button>
        <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
          {uid?.toUpperCase()}
        </span>
      </div>

      {/* 제목 */}
      <div>
        <h1 className="text-lg font-bold pali-text">{sutta.suttaplex?.original_title}</h1>
        {sutta.suttaplex?.translated_title && (
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {sutta.suttaplex.translated_title}
          </p>
        )}
      </div>

      {/* 진도 바 */}
      <ProgressBar value={readPercent} />

      {/* 읽기 모드 전환 */}
      <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: 'var(--color-border)' }}>
        {modeButtons.map(({ mode, label }) => (
          <button
            key={mode}
            onClick={() => setReadingMode(mode)}
            className="flex-1 py-1.5 text-xs rounded-md font-medium transition-colors"
            style={{
              backgroundColor: readingMode === mode ? 'var(--color-surface)' : 'transparent',
              color: readingMode === mode ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 세그먼트 본문 */}
      <div className="space-y-4">
        {segments.map((seg, index) => (
          <div
            key={seg.id}
            className="group"
            ref={el => {
              // 간단한 가시성 추적 (IntersectionObserver 대신)
              if (el && index < (progress?.readSegments ?? 0) + 5) {
                handleSegmentVisible(seg.id, index)
              }
            }}
          >
            {/* 빠알리 텍스트 */}
            {(readingMode === 'pali' || readingMode === 'parallel') && seg.pali && (
              <p className="pali-text text-base leading-relaxed">
                {seg.pali.split(/\s+/).map((word, i) => (
                  <span key={i}>
                    <span
                      className="cursor-pointer hover:underline decoration-dotted"
                      style={{ textDecorationColor: 'var(--color-primary)' }}
                      onClick={() => handleWordClick(word)}
                    >
                      {word}
                    </span>
                    {' '}
                  </span>
                ))}
              </p>
            )}

            {/* 번역 텍스트 */}
            {(readingMode === 'translation' || readingMode === 'parallel') && seg.translation && (
              <p
                className={`text-sm leading-relaxed ${readingMode === 'parallel' ? 'mt-1' : ''}`}
                style={{ color: readingMode === 'parallel' ? 'var(--color-text-secondary)' : 'var(--color-text)' }}
              >
                {seg.translation}
              </p>
            )}

            {/* 플래시카드 추가 버튼 (병렬 모드에서만) */}
            {readingMode === 'parallel' && seg.pali && seg.translation && (
              <button
                onClick={() => handleAddCard(seg.id, seg.pali, seg.translation)}
                className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--color-accent)' }}
              >
                + 카드 추가
              </button>
            )}

            {readingMode === 'parallel' && (
              <hr className="mt-3" style={{ borderColor: 'var(--color-border)', opacity: 0.3 }} />
            )}
          </div>
        ))}
      </div>

      {/* 사전 바텀시트 */}
      <BottomSheet
        isOpen={!!selectedWord}
        onClose={() => { setSelectedWord(null); clear() }}
        title={selectedWord ?? ''}
      >
        {dictLoading && (
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>조회 중...</p>
        )}
        {!dictLoading && entries.length === 0 && selectedWord && (
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            '{selectedWord}'에 대한 사전 항목이 없습니다.
          </p>
        )}
        {entries.map((entry, i) => (
          <div key={i} className="mb-3 last:mb-0">
            <p className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
              {entry.dictname}
            </p>
            {entry.grammar && (
              <p className="text-xs italic" style={{ color: 'var(--color-text-secondary)' }}>
                {entry.grammar}
              </p>
            )}
            <p className="text-sm mt-1">{entry.definition}</p>
          </div>
        ))}
      </BottomSheet>
    </div>
  )
}
