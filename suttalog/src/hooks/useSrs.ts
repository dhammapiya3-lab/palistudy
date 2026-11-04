// SRS 플래시카드 훅
import { useState, useEffect, useCallback } from 'react'
import { getDueCards, saveCard, getDueCardCount } from '../db/flashcard-db'
import { calculateSM2 } from '../features/srs/sm2'
import { updateActivity } from '../db/progress-db'
import type { FlashCard } from '../types'

interface UseSrsResult {
  dueCards: FlashCard[]
  dueCount: number
  currentCard: FlashCard | null
  loading: boolean
  reviewCard: (grade: number) => Promise<void>
  refresh: () => void
}

export function useSrs(): UseSrsResult {
  const [dueCards, setDueCards] = useState<FlashCard[]>([])
  const [dueCount, setDueCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  const loadCards = useCallback(async () => {
    setLoading(true)
    try {
      const cards = await getDueCards()
      setDueCards(cards)
      setDueCount(cards.length)
      setCurrentIndex(0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadCards() }, [loadCards])

  const currentCard = dueCards[currentIndex] ?? null

  const reviewCard = useCallback(async (grade: number) => {
    if (!currentCard) return

    const result = calculateSM2({
      interval: currentCard.interval,
      easeFactor: currentCard.easeFactor,
      repetitions: currentCard.repetitions,
      grade,
    })

    await saveCard({
      ...currentCard,
      ...result,
      lastReviewAt: Date.now(),
    })

    await updateActivity({ cardsReviewed: 1 })
    setCurrentIndex(i => i + 1)
  }, [currentCard])

  const refresh = useCallback(() => {
    loadCards()
  }, [loadCards])

  // 주기적으로 대기 카드 수 갱신
  useEffect(() => {
    const interval = setInterval(async () => {
      const count = await getDueCardCount()
      setDueCount(count)
    }, 60000) // 1분마다
    return () => clearInterval(interval)
  }, [])

  return { dueCards, dueCount, currentCard, loading, reviewCard, refresh }
}
