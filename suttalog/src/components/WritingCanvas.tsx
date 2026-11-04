// 터치 필기 캔버스
import { useRef, useEffect, useState } from 'react'

interface Props {
  width?: number   // 주지 않으면 부모 폭에 맞춤
  height?: number
  onClear?: () => void
}

export default function WritingCanvas({ width, height = 150, onClear }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [autoWidth, setAutoWidth] = useState<number>(width ?? 300)
  const w = width ?? autoWidth
  // 캔버스 크기가 바뀌면 그림이 지워지므로, 어느 크기에서 그렸는지로 '그린 내용 있음'을 판단
  const sizeKey = `${w}x${height}`
  const [drawnAt, setDrawnAt] = useState<string | null>(null)
  const hasContent = drawnAt === sizeKey

  // 부모 폭에 맞추기 (작은 휴대폰에서도 넘치지 않게)
  useEffect(() => {
    if (width !== undefined) return
    const el = wrapRef.current
    if (!el) return
    const update = () => {
      const next = Math.max(160, Math.floor(el.clientWidth))
      setAutoWidth(prev => (Math.abs(prev - next) > 1 ? next : prev))
    }
    update()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 고해상도 디스플레이 대응 (크기를 바꾸면 그림이 지워지므로 안내 문구도 다시 보이게)
    const dpr = window.devicePixelRatio || 1
    canvas.width = w * dpr
    canvas.height = height * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // 펜 스타일
    ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue('--color-primary').trim() || '#D4760A'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [w, height])

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top }
  }

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    setDrawing(true)
    setDrawnAt(sizeKey)
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!drawing) return
    e.preventDefault()
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const pos = getPos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const endDraw = () => setDrawing(false)

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
    setDrawnAt(null)
    onClear?.()
  }

  return (
    <div ref={wrapRef} className="relative w-full">
      <canvas
        ref={canvasRef}
        className="rounded-xl block touch-none"
        aria-label="손글씨 연습 칸"
        style={{ backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-border)' }}
        onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
        onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
      />
      {/* 가이드 텍스트 */}
      {!hasContent && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>여기에 써 보세요 ✍️</p>
        </div>
      )}
      {/* 지우기 버튼 */}
      {hasContent && (
        <button onClick={clear} aria-label="지우기"
          className="absolute top-1 right-1 w-10 h-10 rounded-full flex items-center justify-center text-xs"
          style={{ backgroundColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
          ✕
        </button>
      )}
    </div>
  )
}
