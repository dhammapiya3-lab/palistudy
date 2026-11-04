// 메모 읽기 스크립트 — Claude가 사용자 피드백을 읽기 위한 도구
// 실행: node read-memos.mjs [--page 홈] [--json] [--since 2026-04-01] [--save-images]

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore'
import { writeFileSync, mkdirSync, existsSync } from 'fs'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDDNRL69ugkKb6mJPnJb2kQud0_3b97viA',
  authDomain: 'panditarama-video.firebaseapp.com',
  projectId: 'panditarama-video',
  storageBucket: 'panditarama-video.firebasestorage.app',
  messagingSenderId: '504794613271',
  appId: '1:504794613271:web:ac565d6c6e82d9b72c7e52',
}

const app = initializeApp(FIREBASE_CONFIG)
const db = getFirestore(app)

// CLI 인자 파싱
const args = process.argv.slice(2)
const pageFilter = args.includes('--page') ? args[args.indexOf('--page') + 1] : null
const jsonMode = args.includes('--json')
const sinceFilter = args.includes('--since') ? args[args.indexOf('--since') + 1] : null
const saveImages = args.includes('--save-images')

async function readMemos() {
  const q = query(collection(db, 'pali-primer-memos'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)

  let memos = snap.docs.map(d => ({ id: d.id, ...d.data() }))

  // 필터 적용
  if (pageFilter) {
    memos = memos.filter(m => m.page?.includes(pageFilter))
  }
  if (sinceFilter) {
    memos = memos.filter(m => m.createdAt >= sinceFilter)
  }

  if (jsonMode) {
    console.log(JSON.stringify(memos, null, 2))
  } else {
    if (memos.length === 0) {
      console.log('메모가 없습니다.')
      return
    }
    console.log(`\n총 ${memos.length}개 메모\n${'='.repeat(50)}`)
    for (const m of memos) {
      console.log(`\n📅 ${m.createdAt}`)
      console.log(`📍 페이지: ${m.page}`)
      console.log(`📝 ${m.text || '(텍스트 없음)'}`)
      if (m.images?.length > 0) {
        console.log(`🖼️  이미지 ${m.images.length}장:`)
        for (const img of m.images.sort((a, b) => a.order - b.order)) {
          // base64 길이만 표시 (전체 출력 방지)
          const size = img.dataUrl ? `${Math.round(img.dataUrl.length / 1024)}KB` : 'N/A'
          console.log(`   [${img.order}] ${img.name} (${size})`)
        }
      }
      // --save-images: base64를 파일로 저장
      if (saveImages && m.images?.length > 0) {
        const dir = `memo-images/${m.id}`
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
        for (const img of m.images) {
          if (!img.dataUrl) continue
          const base64 = img.dataUrl.replace(/^data:image\/\w+;base64,/, '')
          const ext = img.dataUrl.match(/^data:image\/(\w+)/)?.[1] || 'jpg'
          writeFileSync(`${dir}/${img.order}.${ext}`, Buffer.from(base64, 'base64'))
          console.log(`   → 저장: ${dir}/${img.order}.${ext}`)
        }
      }
      console.log('-'.repeat(50))
    }
  }

  process.exit(0)
}

readMemos().catch(e => {
  console.error('메모 읽기 실패:', e.message)
  process.exit(1)
})
