// 손글씨 캔버스 컴포넌트 — 되돌리기, 펜 두께, 가이드 그리드
import { useRef, useState, useCallback, useEffect } from 'react'

interface Props {
  width?: number
  height?: number
}

interface Stroke {
  points: { x: number; y: number }[]
  lineWidth: number
}

const PEN_SIZES = [2, 4, 7] as const
const MAX_UNDO = 30

// CSS 변수에서 색상값 가져오기 (Canvas API는 var() 미지원)
function getCSSColor(varName: string, fallback: string): string {
  try {
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
    return val || fallback
  } catch { return fallback }
}

export default function WritingCanvas({ width: propWidth, height: propHeight }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [penSize, setPenSize] = useState<number>(PEN_SIZES[1])
  const [showGrid, setShowGrid] = useState(false)
  const [strokes, setStrokes] = useState<Stroke[]>([])
  // 드로잉 상태를 ref로 관리 (이벤트 핸들러에서 최신 값 접근)
  const drawingRef = useRef(false)
  const currentStroke = useRef<Stroke | null>(null)
  const penSizeRef = useRef(penSize)
  penSizeRef.current = penSize

  const width = propWidth ?? 340
  const height = propHeight ?? 160

  // 안내선 그리기
  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.save()
    ctx.strokeStyle = '#B0A090'
    ctx.lineWidth = 1
    ctx.setLineDash([6, 4])
    ctx.globalAlpha = 0.5

    // 중앙 십자선
    ctx.beginPath()
    ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2)
    ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h)
    ctx.stroke()

    // 1/4, 3/4 보조선
    ctx.globalAlpha = 0.3
    for (const frac of [0.25, 0.75]) {
      ctx.beginPath()
      ctx.moveTo(0, h * frac); ctx.lineTo(w, h * frac)
      ctx.moveTo(w * frac, 0); ctx.lineTo(w * frac, h)
      ctx.stroke()
    }
    ctx.restore()
  }, [])

  // 전체 다시 그리기
  const redraw = useCallback((ctx: CanvasRenderingContext2D, strokeList: Stroke[], grid: boolean, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h)
    if (grid) drawGrid(ctx, w, h)
    const primaryColor = getCSSColor('--color-primary', '#C06B0A')
    for (const s of strokeList) {
      if (!s || s.points.length < 2) continue
      ctx.beginPath()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = s.lineWidth
      ctx.strokeStyle = primaryColor
      ctx.moveTo(s.points[0].x, s.points[0].y)
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x, s.points[i].y)
      }
      ctx.stroke()
    }
  }, [drawGrid])

  // 캔버스 크기 초기화 (크기 변경 시에만)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    redraw(ctx, strokes, showGrid, width, height)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  // 스트로크/그리드 변경 시 다시 그리기 (캔버스 크기 재설정 없이)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    redraw(ctx, strokes, showGrid, width, height)
  }, [strokes, showGrid, redraw, width, height])

  // 좌표 계산 (CSS 좌표 → 캔버스 논리 좌표)
  const getPos = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: (clientX - rect.left) * (width / rect.width),
      y: (clientY - rect.top) * (height / rect.height),
    }
  }, [width, height])

  // 네이티브 이벤트 리스너 등록 ({ passive: false }로 preventDefault 가능)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const startDrawing = (clientX: number, clientY: number) => {
      drawingRef.current = true
      const { x, y } = getPos(clientX, clientY)
      currentStroke.current = { points: [{ x, y }], lineWidth: penSizeRef.current }
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const primaryColor = getCSSColor('--color-primary', '#C06B0A')
      ctx.beginPath()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = penSizeRef.current
      ctx.strokeStyle = primaryColor
      ctx.moveTo(x, y)
    }

    const moveDrawing = (clientX: number, clientY: number) => {
      if (!drawingRef.current) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const { x, y } = getPos(clientX, clientY)
      currentStroke.current?.points.push({ x, y })
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    const stopDrawing = () => {
      if (!drawingRef.current) return
      drawingRef.current = false
      const finished = currentStroke.current
      currentStroke.current = null
      if (finished && finished.points.length > 1) {
        setStrokes(prev => {
          const next = [...prev, finished]
          return next.length > MAX_UNDO ? next.slice(-MAX_UNDO) : next
        })
      }
    }

    // 마우스 이벤트
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      startDrawing(e.clientX, e.clientY)
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!drawingRef.current) return
      e.preventDefault()
      moveDrawing(e.clientX, e.clientY)
    }
    const onMouseUp = (e: MouseEvent) => {
      e.preventDefault()
      stopDrawing()
    }
    const onMouseLeave = () => stopDrawing()

    // 터치 이벤트 (passive: false 필수)
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length > 0) {
        startDrawing(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!drawingRef.current) return
      e.preventDefault()
      if (e.touches.length > 0) {
        moveDrawing(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault()
      stopDrawing()
    }

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd, { passive: false })

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
    }
  }, [getPos])

  const undo = () => setStrokes(prev => prev.slice(0, -1))
  const clear = () => setStrokes([])

  return (
    <div className="flex flex-col items-center gap-2 w-full" style={{ maxWidth: `${width}px` }}>
      {/* 툴바 */}
      <div className="flex items-center justify-between w-full px-1 mb-1">
        <div className="flex items-center gap-2">
          {PEN_SIZES.map(size => (
            <button key={size} onClick={() => setPenSize(size)}
              className="flex items-center justify-center rounded-full transition-all"
              style={{
                width: 28, height: 28,
                backgroundColor: penSize === size ? 'var(--color-primary)' : 'var(--color-surface)',
                border: `1.5px solid ${penSize === size ? 'var(--color-primary)' : 'var(--color-border)'}`,
              }}>
              <span className="rounded-full block" style={{
                width: size + 2, height: size + 2,
                backgroundColor: penSize === size ? '#fff' : 'var(--color-text-secondary)',
              }} />
            </button>
          ))}
        </div>
        <button onClick={() => setShowGrid(v => !v)}
          className="text-xs px-2.5 py-1 rounded-full transition-all"
          style={{
            backgroundColor: showGrid ? 'var(--color-primary)' : 'var(--color-surface)',
            color: showGrid ? '#fff' : 'var(--color-text-secondary)',
            border: `1.5px solid ${showGrid ? 'var(--color-primary)' : 'var(--color-border)'}`,
          }}>
          안내선
        </button>
      </div>

      {/* 캔버스 */}
      <canvas
        ref={canvasRef}
        className="rounded-2xl touch-none"
        style={{
          width: '100%', maxWidth: `${width}px`, height: `${height}px`,
          backgroundColor: 'var(--color-surface)',
          border: '1.5px solid var(--color-border)',
          boxShadow: 'inset 0 2px 6px rgba(30,27,22,0.06)',
        }}
      />

      {/* 버튼 */}
      <div className="flex items-center gap-2">
        <button onClick={undo} disabled={strokes.length === 0}
          className="text-xs px-3 py-1.5 rounded-full transition-all flex items-center gap-1 disabled:opacity-30"
          style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
          되돌리기
        </button>
        <button onClick={clear} disabled={strokes.length === 0}
          className="text-xs px-3 py-1.5 rounded-full transition-all disabled:opacity-30"
          style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
          지우기
        </button>
      </div>
    </div>
  )
}
