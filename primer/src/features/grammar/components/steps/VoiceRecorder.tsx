import { useEffect, useRef, useState } from 'react'
import { speakSequence, stopPali } from '../../../../utils/pali-tts'

interface VoiceRecorderProps {
  /** 원음으로 들려줄 구절 */
  text: string
}

type RecState = 'idle' | 'asking' | 'recording' | 'ready' | 'denied'

const canRecord = () =>
  typeof window !== 'undefined' &&
  typeof MediaRecorder !== 'undefined' &&
  !!navigator.mediaDevices?.getUserMedia

/**
 * 내 목소리 녹음 → 원음과 번갈아 듣기
 * 녹음은 이 화면의 메모리에만 두고 저장·전송하지 않음 (다른 단계로 가면 사라짐)
 */
export default function VoiceRecorder({ text }: VoiceRecorderProps) {
  const [state, setState] = useState<RecState>('idle')
  const [url, setUrl] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const recRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const urlRef = useRef<string | null>(null)

  // 화면을 떠나면 마이크 끄고 녹음 지움
  useEffect(() => () => {
    try { if (recRef.current?.state === 'recording') recRef.current.stop() } catch { /* 무시 */ }
    streamRef.current?.getTracks().forEach(t => t.stop())
    audioRef.current?.pause()
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
  }, [])

  if (!canRecord()) return null

  const start = async () => {
    stopPali()
    audioRef.current?.pause()
    setState('asking')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const rec = new MediaRecorder(stream)
      const chunks: Blob[] = []
      rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data) }
      rec.onstop = () => {
        stream.getTracks().forEach(t => t.stop())
        streamRef.current = null
        if (!chunks.length) { setState('idle'); return }
        const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' })
        if (urlRef.current) URL.revokeObjectURL(urlRef.current)
        const u = URL.createObjectURL(blob)
        urlRef.current = u
        setUrl(u)
        setState('ready')
      }
      recRef.current = rec
      rec.start()
      setState('recording')
    } catch {
      setState('denied')
    }
  }

  const stop = () => {
    try { recRef.current?.stop() } catch { setState('idle') }
  }

  /** 내 녹음 재생 — 끝나면 resolve */
  const playMine = () => new Promise<void>(resolve => {
    if (!url) { resolve(); return }
    audioRef.current?.pause()
    const a = new Audio(url)
    audioRef.current = a
    a.onended = () => resolve()
    a.onerror = () => resolve()
    a.onpause = () => resolve()
    a.play().catch(() => resolve())
  })

  const mine = async () => {
    stopPali()
    setPlaying(true)
    await playMine()
    setPlaying(false)
  }

  /** 원음 → 내 목소리 → 원음 */
  const alternate = async () => {
    setPlaying(true)
    const ok = await speakSequence([text])
    if (ok) await playMine()
    if (ok) await speakSequence([text])
    setPlaying(false)
  }

  const btn = 'px-3 py-2 rounded-full text-xs font-medium active:scale-95 transition-transform'
  const style = { border: '1.5px solid var(--color-border)', color: 'var(--color-text)', backgroundColor: 'var(--color-surface)', minHeight: 36 }

  return (
    <div className="w-full max-w-sm mt-5 rounded-2xl p-4 text-left"
      style={{ backgroundColor: 'var(--color-surface)', border: '1px dashed var(--color-border)' }}>
      <p className="text-xs font-bold mb-2">🎙️ 내 목소리로 따라 하기</p>
      <div className="flex flex-wrap gap-2">
        {state === 'recording' ? (
          <button type="button" onClick={stop} className={btn}
            style={{ ...style, color: 'white', backgroundColor: 'var(--color-wrong-strong)', border: 'none' }}>
            ■ 녹음 끝내기
          </button>
        ) : (
          <button type="button" onClick={start} disabled={state === 'asking' || playing} className={`${btn} disabled:opacity-50`} style={style}>
            ● {url ? '다시 녹음' : '녹음하기'}
          </button>
        )}
        {url && state !== 'recording' && (
          <>
            <button type="button" onClick={mine} disabled={playing} className={`${btn} disabled:opacity-50`} style={style}>▶ 내 목소리</button>
            <button type="button" onClick={alternate} disabled={playing} className={`${btn} disabled:opacity-50`} style={style}>⇄ 원음과 번갈아</button>
          </>
        )}
      </div>
      <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-secondary)' }}>
        {state === 'recording' ? '녹음 중… 구절을 소리 내어 읽어 보세요.'
          : state === 'denied' ? '마이크를 쓸 수 없어요. 브라우저에서 마이크 사용을 허용해 주세요.'
          : '녹음은 이 기기 화면에서만 듣고, 저장하거나 보내지 않아요.'}
      </p>
    </div>
  )
}
