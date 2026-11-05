// 따라 외우기(Recite) — 경전 구절을 외울 줄 단위로 나누는 함수 (발음 녹음 목록 scripts/tts-texts.mts도 이 파일을 씀)
import type { StepType } from '../lessons/lesson-data-sn56-11'

export type Line = { pali: string; ko: string; pronKo: string }

/** 문장부호를 뺀 비교용 형태 */
export const bare = (w: string) => w.toLowerCase().replace(/[.,;:!?'"‘’“”—–()]/g, '')

/** 긴 줄(12낱말 넘음)은 쉼표에서 나눠 8낱말 안팎으로 */
function splitLong(line: string): string[] {
  const words = line.split(/\s+/).filter(Boolean)
  if (words.length <= 12) return [line]
  const out: string[] = []
  let cur: string[] = []
  for (const w of words) {
    cur.push(w)
    if (cur.length >= 6 && /[,;.]$/.test(w)) { out.push(cur.join(' ')); cur = [] }
  }
  if (cur.length) {
    if (cur.length < 3 && out.length) out[out.length - 1] += ' ' + cur.join(' ')
    else out.push(cur.join(' '))
  }
  return out
}

export function buildLines(steps: StepType[]): Line[] {
  const out: Line[] = []
  const seen = new Set<string>()
  for (const s of steps) {
    if (s.type !== 'verse') continue
    const lines = s.pali.split('\n').map(l => l.trim()).filter(Boolean)
    const kos = s.translation.split('\n').map(l => l.trim()).filter(Boolean)
    const prons = s.pronKo.split('\n').map(l => l.trim()).filter(Boolean)
    lines.forEach((l, i) => {
      if (/niṭṭhit/i.test(l)) return // '…경 끝' 맺음말은 빼고
      const key = bare(l).replace(/\s+/g, ' ')
      if (seen.has(key)) return // 반복되는 줄(후렴·모아 읽기)은 한 번만
      seen.add(key)
      const ko = kos.length === lines.length ? kos[i] : s.translation
      const pron = prons.length === lines.length ? prons[i] : ''
      for (const part of splitLong(l)) out.push({ pali: part, ko, pronKo: part === l ? pron : '' })
    })
  }
  return out
}

/** 낱말 누르기용: 화면과 같은 방식으로 줄을 낱말로 나눔 */
export const lineWords = (pali: string): string[] => pali.split(/\s+/).filter(Boolean)
