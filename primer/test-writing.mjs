// Playwright 필기 캔버스 테스트
import { chromium } from 'playwright'

const BASE = 'http://localhost:3023/SuttaLog2/'

async function test() {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })

  // 콘솔 에러 캡처
  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`[브라우저 에러] ${msg.text()}`)
  })
  page.on('pageerror', err => console.log(`[페이지 에러] ${err.message}`))

  // 1. 홈으로 이동
  await page.goto(BASE)
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'test-01-home.png' })
  console.log('1. 홈 화면 로드 완료')

  // 2. "이어서 학습하기" 또는 "학습 시작하기" 클릭
  const studyBtn = page.locator('button').filter({ hasText: /학습하기|학습 시작/ }).first()
  await studyBtn.click()
  await page.waitForTimeout(1000)
  console.log('2. 학습 화면 진입')

  // 3. 쓰기(writing) 스텝까지 "다음" 버튼으로 이동
  let foundWriting = false
  for (let i = 0; i < 50; i++) {
    const hasCanvas = await page.locator('canvas').count()
    if (hasCanvas > 0) {
      foundWriting = true
      console.log(`3. 쓰기 스텝 발견 (${i}번째 다음 클릭 후)`)
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
    console.log('쓰기 스텝을 찾지 못했습니다.')
    await page.screenshot({ path: 'test-no-writing.png', fullPage: true })
    await browser.close()
    return
  }

  // 캔버스 확인 후 추가 대기
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'test-04-writing-before.png', fullPage: true })
  console.log('4. 필기 전 스크린샷')

  // URL과 페이지 상태 확인
  console.log(`현재 URL: ${page.url()}`)

  // 4. 캔버스에 필기 시뮬레이션
  const canvas = page.locator('canvas').first()
  const box = await canvas.boundingBox()
  if (!box) {
    console.log('캔버스 boundingBox 없음')
    await browser.close()
    return
  }

  console.log(`캔버스 위치: x=${box.x}, y=${box.y}, w=${box.width}, h=${box.height}`)

  // 첫 번째 획 (대각선 ↘)
  const startX = box.x + box.width * 0.2
  const startY = box.y + box.height * 0.3
  const endX = box.x + box.width * 0.8
  const endY = box.y + box.height * 0.7

  await page.mouse.move(startX, startY)
  await page.mouse.down()
  for (let step = 1; step <= 10; step++) {
    const t = step / 10
    await page.mouse.move(
      startX + (endX - startX) * t,
      startY + (endY - startY) * t
    )
    await page.waitForTimeout(30)
  }
  await page.mouse.up()
  await page.waitForTimeout(500)

  // 디버깅: URL과 캔버스 상태 확인
  console.log(`획 1 후 URL: ${page.url()}`)
  const canvasCount1 = await page.locator('canvas').count()
  console.log(`획 1 후 캔버스 수: ${canvasCount1}`)
  await page.screenshot({ path: 'test-05-after-stroke1.png', fullPage: true })
  console.log('5. 첫 획 후 스크린샷')

  // 두 번째 획 (대각선 ↙)
  if (canvasCount1 === 0) {
    console.log('❌ 캔버스가 사라졌습니다!')
    await browser.close()
    return
  }

  const box2 = await canvas.boundingBox()
  if (!box2) {
    console.log('❌ 캔버스 boundingBox 없음 (두 번째 획)')
    await browser.close()
    return
  }

  const s2x = box2.x + box2.width * 0.8
  const s2y = box2.y + box2.height * 0.3
  const e2x = box2.x + box2.width * 0.2
  const e2y = box2.y + box2.height * 0.7

  await page.mouse.move(s2x, s2y)
  await page.mouse.down()
  for (let step = 1; step <= 10; step++) {
    const t = step / 10
    await page.mouse.move(
      s2x + (e2x - s2x) * t,
      s2y + (e2y - s2y) * t
    )
    await page.waitForTimeout(30)
  }
  await page.mouse.up()
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'test-06-after-stroke2.png', fullPage: true })
  console.log('6. 두 번째 획 후 스크린샷')

  // 세 번째 획 (수직선 ↓)
  const box3 = await canvas.boundingBox()
  if (!box3) {
    console.log('❌ 캔버스 boundingBox 없음 (세 번째 획)')
    await browser.close()
    return
  }

  const s3x = box3.x + box3.width * 0.5
  const s3y = box3.y + box3.height * 0.15
  const e3x = box3.x + box3.width * 0.5
  const e3y = box3.y + box3.height * 0.85

  await page.mouse.move(s3x, s3y)
  await page.mouse.down()
  for (let step = 1; step <= 10; step++) {
    const t = step / 10
    await page.mouse.move(
      s3x + (e3x - s3x) * t,
      s3y + (e3y - s3y) * t
    )
    await page.waitForTimeout(30)
  }
  await page.mouse.up()
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'test-07-after-stroke3.png', fullPage: true })
  console.log('7. 세 번째 획 후 스크린샷')

  // 5. 캔버스가 공백인지 검증 (픽셀 분석)
  const canvasCount = await page.locator('canvas').count()
  if (canvasCount === 0) {
    console.log('\n========================================')
    console.log('❌ 캔버스가 페이지에서 사라짐!')
    console.log('========================================\n')
    await browser.close()
    process.exit(1)
    return
  }

  const isBlank = await canvas.evaluate((el) => {
    const ctx = el.getContext('2d')
    if (!ctx) return true
    const data = ctx.getImageData(0, 0, el.width, el.height).data
    let nonEmpty = 0
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 0) nonEmpty++
    }
    return nonEmpty < 10
  })

  console.log(`\n========================================`)
  console.log(`결과: ${isBlank ? '❌ 공백 (버그!)' : '✅ 정상 (내용 있음)'}`)
  console.log(`========================================\n`)

  await browser.close()

  if (isBlank) {
    process.exit(1)
  }
}

test().catch(e => { console.error(e); process.exit(1) })
