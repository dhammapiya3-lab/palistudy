// SRS 플래시카드 CRUD
import { getDB } from './index'
import type { FlashCard } from '../types'

export async function getCard(id: string): Promise<FlashCard | undefined> {
  const db = await getDB()
  return db.get('flashcards', id)
}

export async function saveCard(card: FlashCard): Promise<void> {
  const db = await getDB()
  await db.put('flashcards', card)
}

export async function deleteCard(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('flashcards', id)
}

// 오늘 복습 대기 카드
export async function getDueCards(limit = 100): Promise<FlashCard[]> {
  const db = await getDB()
  const now = Date.now()
  const all = await db.getAllFromIndex('flashcards', 'by-nextReview')
  return all.filter(card => card.nextReviewAt <= now).slice(0, limit)
}

// 특정 경전의 카드
export async function getCardsBySutta(suttaUid: string): Promise<FlashCard[]> {
  const db = await getDB()
  return db.getAllFromIndex('flashcards', 'by-sutta', suttaUid)
}

// 전체 카드 수
export async function getTotalCardCount(): Promise<number> {
  const db = await getDB()
  return db.count('flashcards')
}

// 오늘 복습 대기 카드 수
export async function getDueCardCount(): Promise<number> {
  const cards = await getDueCards(Infinity)
  return cards.length
}

// 새 카드 생성 헬퍼
export function createCard(params: {
  suttaUid: string
  segmentId: string
  front: string
  back: string
  context?: string
}): FlashCard {
  return {
    id: `${params.suttaUid}:${params.segmentId}:${Date.now()}`,
    ...params,
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewAt: Date.now(), // 즉시 복습 가능
    createdAt: Date.now(),
  }
}
