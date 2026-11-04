// 터치 필기 캔버스
import { useRef, useEffect, useState } from 'react'

interface Props {
  width?: number
  height?: number
  onClear?: () => void
}

export default function WritingCanvas({ width = 340, height = 150 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [hasContent, setHasContent] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 고해상도 디스플레이 대응
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // 펜 스타일
    ctx.strokeStyle = '#D4760A'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [width, height])

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
    setHasContent(true)
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
    setHasContent(false)
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="rounded-xl w-full touch-none"
        style={{ backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-border)' }}
        onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
        onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
      />
      {/* 가이드 텍스트 */}
      {!hasContent && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-sm" style={{ color: 'var(--color-border)' }}>여기에 써보세요 ✍️</p>
        </div>
      )}
      {/* 지우기 버튼 */}
      {hasContent && (
        <button onClick={clear}
          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs"
          style={{ backgroundColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
          ✕
        </button>
      )}
    </div>
  )
}
