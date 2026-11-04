// Playwright 필기 디버그 — PC 마우스 환경 재현, 모든 콘솔 캡처
import { chromium } from 'playwright'

const BASE = 'http://localhost:3023/SuttaLog2/'

async function test() {
  const browser = await chromium.launch({ headless: false })
  // PC 환경 (터치 없음)
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

  // 모든 콘솔 메시지 캡처
  page.on('console', msg => {
    console.log(`[콘솔:${msg.type()}] ${msg.text()}`)
  })
  page.on('pageerror', err => {
    console.log(`[💥크래시] ${err.message}`)
    console.log(`[💥스택] ${err.stack}`)
  })

  // 1. 홈으로 이동
  await page.goto(BASE)
  await page.waitForTimeout(1500)

  // 2. 학습 시작
  const studyBtn = page.locator('button').filter({ hasText: /학습하기|학습 시작/ }).first()
  await studyBtn.click()
  await page.waitForTimeout(1000)

  // 3. 쓰기 스텝까지 이동
  let foundWriting = false
  for (let i = 0; i < 50; i++) {
    if (await page.locator('canvas').count() > 0) {
      foundWriting = true
      console.log(`쓰기 스텝 도달 (${i}번 다음 후)`)
      break
    }
    const nextBtn = page.locator('button:has-text("다음")').first()
    const checkBtn = page.locator('button:has-text("확인")').first()
    const skipBtn = page.locator('text=건너뛰기').first()
    if (await nextBtn.isVisible()) {
      await nextBtn.click()
    } else if (await skipBtn.isVisible()) {
      await skipBtn.click()
    } else if (await checkBtn.isVisible()) {
      const option = page.locator('button').filter({ hasText: /^[^✕다음확인건너뛰기←]/ }).first()
      if (await option.isVisible()) await option.click()
      await page.waitForTimeout(200)
      if (await checkBtn.isVisible()) await checkBtn.click()
      await page.waitForTimeout(200)
      const nextAfter = page.locator('button:has-text("다음")').first()
      if (await nextAfter.isVisible()) await nextAfter.click()
    }
    await page.waitForTimeout(300)
  }

  if (!foundWriting) {
    console.log('쓰기 스텝 못 찾음')
    await browser.close()
    return
  }

  await page.waitForTimeout(500)

  // 디버그: 캔버스에 이벤트 리스너 상태 확인
  const listenerInfo = await page.evaluate(() => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return 'canvas not found'
    return {
      touchNone: getComputedStyle(canvas).touchAction,
      width: canvas.width,
      height: canvas.height,
      cssWidth: canvas.style.width,
      cssHeight: canvas.style.height,
      parentTag: canvas.parentElement?.tagName,
      parentClass: canvas.parentElement?.className,
    }
  })
  console.log('캔버스 정보:', JSON.stringify(listenerInfo, null, 2))

  // 캔버스 위치
  const canvas = page.locator('canvas').first()
  const box = await canvas.boundingBox()
  console.log(`캔버스 위치: x=${box.x.toFixed(0)}, y=${box.y.toFixed(0)}, w=${box.width.toFixed(0)}, h=${box.height.toFixed(0)}`)

  // React 에러 감지 주입
  await page.evaluate(() => {
    window.__writingErrors = []
    window.addEventListener('error', (e) => {
      window.__writingErrors.push({ msg: e.message, stack: e.error?.stack })
      console.error('[window.error]', e.message)
    })
    window.addEventListener('unhandledrejection', (e) => {
      window.__writingErrors.push({ msg: String(e.reason) })
      console.error('[unhandledrejection]', e.reason)
    })
  })

  // === 획 그리기 (천천히, 실제 사용자처럼) ===
  console.log('\n--- 획 1 시작 (대각선 ↘) ---')
  const sx = box.x + box.width * 0.2
  const sy = box.y + box.height * 0.3
  const ex = box.x + box.width * 0.8
  const ey = box.y + box.height * 0.7

  await page.mouse.move(sx, sy)
  console.log('mouse.move → 시작점')
  await page.waitForTimeout(100)

  await page.mouse.down()
  console.log('mouse.down')
  await page.waitForTimeout(50)

  // 20 단계로 부드럽게
  for (let step = 1; step <= 20; step++) {
    const t = step / 20
    await page.mouse.move(
      sx + (ex - sx) * t,
      sy + (ey - sy) * t
    )
    await page.waitForTimeout(16) // ~60fps
  }
  console.log('mouse.move 완료 (20 단계)')

  // mouseup 직전 상태 확인
  const beforeUp = await page.locator('canvas').count()
  console.log(`mouseup 직전 캔버스 수: ${beforeUp}`)

  await page.mouse.up()
  console.log('mouse.up 완료')

  // 즉시 확인
  await page.waitForTimeout(50)
  const afterUp50 = await page.locator('canvas').count()
  console.log(`mouseup 50ms 후 캔버스 수: ${afterUp50}`)

  await page.waitForTimeout(200)
  const afterUp250 = await page.locator('canvas').count()
  console.log(`mouseup 250ms 후 캔버스 수: ${afterUp250}`)

  await page.waitForTimeout(500)
  const afterUp750 = await page.locator('canvas').count()
  console.log(`mouseup 750ms 후 캔버스 수: ${afterUp750}`)

  // 에러 확인
  const errors = await page.evaluate(() => window.__writingErrors)
  if (errors.length > 0) {
    console.log(`\n❌ 에러 ${errors.length}개:`)
    errors.forEach(e => {
      console.log(`  메시지: ${e.msg}`)
      if (e.stack) console.log(`  스택: ${e.stack.split('\n').slice(0, 3).join('\n  ')}`)
    })
  }

  await page.screenshot({ path: 'test3-after-stroke.png', fullPage: true })
  console.log('스크린샷 저장: test3-after-stroke.png')

  // DOM 상태 확인
  const domState = await page.evaluate(() => {
    const root = document.getElementById('root')
    return {
      rootChildren: root?.children.length,
      rootHTML: root?.innerHTML.substring(0, 200),
      bodyChildren: document.body.children.length,
    }
  })
  console.log('DOM 상태:', JSON.stringify(domState, null, 2))

  // 결과
  console.log(`\n========================================`)
  if (afterUp750 === 0) {
    console.log('❌ 캔버스 사라짐 — 화면 크래시 확인')
  } else {
    console.log('✅ 캔버스 정상 유지')
  }
  console.log(`========================================\n`)

  await browser.close()
  if (afterUp750 === 0) process.exit(1)
}

test().catch(e => { console.error(e); process.exit(1) })
