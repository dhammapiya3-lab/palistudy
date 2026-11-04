// Playwright 필기 캔버스 테스트 — 터치 + 마우스 + 엣지 케이스
import { chromium } from 'playwright'

const BASE = 'http://localhost:3023/SuttaLog2/'

async function test() {
  const browser = await chromium.launch({ headless: false })
  // 아이폰 SE 사이즈 + 터치 지원
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  })
  const page = await context.newPage()

  // 에러 캡처
  const errors = []
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text())
      console.log(`[에러] ${msg.text()}`)
    }
  })
  page.on('pageerror', err => {
    errors.push(err.message)
    console.log(`[크래시] ${err.message}`)
  })

  // 1. 홈으로 이동
  await page.goto(BASE)
  await page.waitForTimeout(1500)
  console.log('1. 홈 화면 로드')

  // 2. 학습 시작
  const studyBtn = page.locator('button').filter({ hasText: /학습하기|학습 시작/ }).first()
  await studyBtn.click()
  await page.waitForTimeout(1000)
  console.log('2. 학습 진입')

  // 3. 쓰기 스텝까지 이동
  let foundWriting = false
  for (let i = 0; i < 50; i++) {
    if (await page.locator('canvas').count() > 0) {
      foundWriting = true
      console.log(`3. 쓰기 스텝 (${i}번 다음 후)`)
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

  // === 테스트 A: 터치 필기 ===
  console.log('\n=== 테스트 A: 터치 필기 ===')
  const canvas = page.locator('canvas').first()
  const box = await canvas.boundingBox()
  if (!box) { console.log('캔버스 없음'); await browser.close(); return }

  console.log(`캔버스: x=${box.x.toFixed(0)}, y=${box.y.toFixed(0)}, w=${box.width.toFixed(0)}, h=${box.height.toFixed(0)}`)

  // 터치로 대각선 그리기
  const t1Start = { x: box.x + box.width * 0.2, y: box.y + box.height * 0.3 }
  const t1End = { x: box.x + box.width * 0.8, y: box.y + box.height * 0.7 }

  await page.touchscreen.tap(t1Start.x, t1Start.y) // 짧은 탭 먼저
  await page.waitForTimeout(200)

  // 스와이프 터치 (touchstart → touchmove... → touchend)
  // Playwright의 touchscreen은 tap만 지원하므로 CDP로 직접 터치 이벤트 발생
  const client = await page.context().newCDPSession(page)

  // 터치 획 1: 대각선
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: t1Start.x, y: t1Start.y }],
  })
  for (let step = 1; step <= 15; step++) {
    const t = step / 15
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{
        x: t1Start.x + (t1End.x - t1Start.x) * t,
        y: t1Start.y + (t1End.y - t1Start.y) * t,
      }],
    })
    await page.waitForTimeout(20)
  }
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  })
  await page.waitForTimeout(500)

  let canvasCount = await page.locator('canvas').count()
  console.log(`터치 획 1 후 캔버스: ${canvasCount > 0 ? '✅' : '❌ 사라짐'}`)
  if (canvasCount === 0) {
    await page.screenshot({ path: 'test2-touch-crash.png', fullPage: true })
    console.log('터치 필기에서 크래시!')
    await browser.close()
    process.exit(1)
  }

  // 터치 획 2: 반대 대각선
  const t2Start = { x: box.x + box.width * 0.8, y: box.y + box.height * 0.2 }
  const t2End = { x: box.x + box.width * 0.2, y: box.y + box.height * 0.8 }

  await client.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: t2Start.x, y: t2Start.y }],
  })
  for (let step = 1; step <= 15; step++) {
    const t = step / 15
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{
        x: t2Start.x + (t2End.x - t2Start.x) * t,
        y: t2Start.y + (t2End.y - t2Start.y) * t,
      }],
    })
    await page.waitForTimeout(20)
  }
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  })
  await page.waitForTimeout(500)

  canvasCount = await page.locator('canvas').count()
  console.log(`터치 획 2 후 캔버스: ${canvasCount > 0 ? '✅' : '❌ 사라짐'}`)
  await page.screenshot({ path: 'test2-touch-result.png', fullPage: true })

  // === 테스트 B: 빠른 연속 터치 (탭-탭-탭) ===
  console.log('\n=== 테스트 B: 빠른 연속 탭 ===')
  for (let i = 0; i < 5; i++) {
    const tx = box.x + box.width * (0.2 + Math.random() * 0.6)
    const ty = box.y + box.height * (0.2 + Math.random() * 0.6)
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchStart', touchPoints: [{ x: tx, y: ty }],
    })
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchEnd', touchPoints: [],
    })
    await page.waitForTimeout(50)
  }
  await page.waitForTimeout(500)
  canvasCount = await page.locator('canvas').count()
  console.log(`빠른 탭 후 캔버스: ${canvasCount > 0 ? '✅' : '❌ 사라짐'}`)

  // === 테스트 C: 캔버스 밖으로 나가는 터치 ===
  console.log('\n=== 테스트 C: 캔버스 밖으로 나가는 스와이프 ===')
  const tcStart = { x: box.x + box.width * 0.5, y: box.y + box.height * 0.5 }
  const tcEnd = { x: box.x + box.width * 0.5, y: box.y + box.height + 100 } // 캔버스 아래로

  await client.send('Input.dispatchTouchEvent', {
    type: 'touchStart', touchPoints: [{ x: tcStart.x, y: tcStart.y }],
  })
  for (let step = 1; step <= 10; step++) {
    const t = step / 10
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{
        x: tcStart.x + (tcEnd.x - tcStart.x) * t,
        y: tcStart.y + (tcEnd.y - tcStart.y) * t,
      }],
    })
    await page.waitForTimeout(20)
  }
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchEnd', touchPoints: [],
  })
  await page.waitForTimeout(500)
  canvasCount = await page.locator('canvas').count()
  console.log(`밖으로 나간 후 캔버스: ${canvasCount > 0 ? '✅' : '❌ 사라짐'}`)

  // === 테스트 D: 되돌리기 + 지우기 ===
  console.log('\n=== 테스트 D: 되돌리기/지우기 ===')
  const undoBtn = page.locator('button:has-text("되돌리기")').first()
  const clearBtn = page.locator('button:has-text("지우기")').first()
  if (await undoBtn.isVisible()) {
    await undoBtn.click()
    await page.waitForTimeout(300)
    console.log('되돌리기 클릭 ✅')
  }
  if (await clearBtn.isVisible()) {
    await clearBtn.click()
    await page.waitForTimeout(300)
    console.log('지우기 클릭 ✅')
  }
  canvasCount = await page.locator('canvas').count()
  console.log(`되돌리기/지우기 후 캔버스: ${canvasCount > 0 ? '✅' : '❌ 사라짐'}`)

  // 최종 결과
  await page.screenshot({ path: 'test2-final.png', fullPage: true })

  console.log(`\n========================================`)
  if (errors.length > 0) {
    console.log(`❌ 에러 ${errors.length}개 발생:`)
    errors.forEach(e => console.log(`  - ${e}`))
    console.log(`========================================\n`)
    await browser.close()
    process.exit(1)
  } else {
    console.log(`✅ 모든 테스트 통과 (에러 0개)`)
    console.log(`========================================\n`)
    await browser.close()
  }
}

test().catch(e => { console.error(e); process.exit(1) })
