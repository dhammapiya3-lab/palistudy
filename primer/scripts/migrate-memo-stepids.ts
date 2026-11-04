// 기존 메모에 stepId 추가하는 마이그레이션 스크립트
// 저장된 스텝 번호 → stepId 직접 변환 (내용 검색 X)

import { getMemos, updateMemo } from '../src/utils/memo'
import { LESSONS } from '../src/features/grammar/lessons'

async function migrateMemos(dryRun: boolean = true) {
  console.log(`\n=== 메모 stepId 마이그레이션 ${dryRun ? '(DRY RUN)' : '(LIVE)'} ===\n`)

  const memos = await getMemos()
  console.log(`전체 메모: ${memos.length}개`)

  let updated = 0
  let skipped = 0
  let failed = 0

  for (const memo of memos) {
    // stepId가 이미 있으면 스킵
    if (memo.stepId) {
      skipped++
      continue
    }

    // page에서 lessonId와 stepIndex 추출
    const match = memo.page.match(/학습:\s*([^#]+)(?:#(\d+))?/)
    if (!match) {
      console.warn(`⚠ ${memo.id}: page 파싱 실패 - "${memo.page}"`)
      failed++
      continue
    }

    const lessonId = match[1].trim()
    const stepIndex = match[2] ? Number(match[2]) : null

    if (stepIndex === null) {
      console.warn(`⚠ ${memo.id}: stepIndex 없음 - "${memo.page}"`)
      failed++
      continue
    }

    // lesson 찾기
    const lesson = LESSONS.find(l => l.id === lessonId)
    if (!lesson) {
      console.warn(`⚠ ${memo.id}: lesson 없음 - "${lessonId}"`)
      failed++
      continue
    }

    // stepIndex로 step 찾기
    const step = lesson.steps[stepIndex]
    if (!step || !step.id) {
      console.warn(`⚠ ${memo.id}: step[${stepIndex}] 없음 - "${lessonId}"`)
      failed++
      continue
    }

    // stepId 업데이트
    const stepId = step.id
    console.log(`✓ ${memo.id}: ${memo.page} → ${stepId}`)

    if (!dryRun) {
      try {
        await updateMemo(memo.id!, memo.text, memo.images, stepId)
      } catch (e) {
        console.error(`✗ ${memo.id}: 업데이트 실패 -`, e)
        failed++
        continue
      }
    }

    updated++
  }

  console.log(`\n=== 마이그레이션 결과 ===`)
  console.log(`업데이트: ${updated}개`)
  console.log(`스킵 (이미 stepId 있음): ${skipped}개`)
  console.log(`실패: ${failed}개`)
  console.log(`\n총: ${memos.length}개`)

  if (dryRun) {
    console.log(`\n📌 실제 적용하려면: npm run migrate:memos`)
  }
}

// CLI 실행
const dryRun = !process.argv.includes('--live')
migrateMemos(dryRun).catch(console.error)
