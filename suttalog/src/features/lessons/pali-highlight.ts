// 경전 본문에서 배우는 단어를 '단어 경계' 기준으로 찾아 칠하는 함수 모음
// - 본문은 공백으로 나눈 덩어리(토큰) 단위로 비교합니다.
// - 비교할 때는 대소문자, ṁ/ṃ, 문장부호·인용부호를 모두 지운 '정규화' 형태끼리 같아야 칠합니다.
//   (그래서 'va'가 bhavantu 안에서 칠해지는 일이 없습니다)
// - “bhikkhavo”ti 처럼 따옴표로 붙은 덩어리는 덩어리 전체(bhikkhavoti)와
//   따옴표로 나뉜 조각(bhikkhavo, ti) 모두와 비교합니다.
// - 여러 단어 카드(공백 포함)는 연속된 토큰이 차례로 같을 때 칠합니다.
// - 칠하는 범위는 글자 부분만이고, 앞뒤 문장부호는 상자 밖에 둡니다.

const LETTER = /[\p{L}\p{M}]/u
const NON_LETTERS = /[^\p{L}\p{M}]+/gu

/** 비교용 정규화: NFC, 소문자, ṁ→ṃ, 글자 아닌 것(문장부호·따옴표·숫자·하이픈) 제거 */
export function normPali(s: string): string {
  return s.normalize('NFC').toLowerCase().replace(/ṁ/g, 'ṃ').replace(NON_LETTERS, '')
}

/** 소리 재생용: 앞뒤 문장부호를 떼고 글자만 남긴 형태 */
export function speakableText(s: string): string {
  return s.replace(/^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu, '')
}

type Piece = { start: number; end: number; norm: string }
type Token = Piece & { subs: Piece[] }

// 공백 단위 토큰 + 토큰 안의 글자 조각(따옴표·하이픈 등으로 나뉜 부분)
function tokenize(line: string): Token[] {
  const tokens: Token[] = []
  const re = /\S+/g
  let m: RegExpExecArray | null
  while ((m = re.exec(line))) {
    const raw = m[0]
    const base = m.index
    const subs: Piece[] = []
    const sre = /[\p{L}\p{M}]+/gu
    let sm: RegExpExecArray | null
    while ((sm = sre.exec(raw))) {
      subs.push({ start: base + sm.index, end: base + sm.index + sm[0].length, norm: normPali(sm[0]) })
    }
    if (!subs.length) continue // 문장부호만 있는 덩어리(–, — 등)
    tokens.push({ start: subs[0].start, end: subs[subs.length - 1].end, norm: normPali(raw), subs })
  }
  return tokens
}

export type Range = { start: number; end: number }

/**
 * 본문(line)에서 form과 일치하는 글자 범위들을 찾습니다.
 * form이 여러 단어면 연속 토큰 일치로 찾습니다.
 */
export function findRanges(line: string, form: string): Range[] {
  const words = form.trim().split(/\s+/).map(normPali).filter(Boolean)
  if (!words.length) return []
  const tokens = tokenize(line)
  const out: Range[] = []
  if (words.length === 1) {
    const w = words[0]
    for (const t of tokens) {
      if (t.norm === w) { out.push({ start: t.start, end: t.end }); continue }
      if (t.subs.length > 1) {
        for (const s of t.subs) if (s.norm === w) out.push({ start: s.start, end: s.end })
      }
    }
    return out
  }
  // 여러 단어: 연속 토큰이 차례로 같아야 함
  for (let i = 0; i + words.length <= tokens.length; i++) {
    let ok = true
    for (let k = 0; k < words.length; k++) {
      const t = tokens[i + k]
      const w = words[k]
      // 첫 토큰은 뒤쪽 조각, 마지막 토큰은 앞쪽 조각만 맞아도 됨 (“Evaṃ ... sutaṃ” 같은 인용부호)
      const okTok = t.norm === w
        || (k === 0 && t.subs.length > 1 && t.subs[t.subs.length - 1].norm === w)
        || (k === words.length - 1 && t.subs.length > 1 && t.subs[0].norm === w)
      if (!okTok) { ok = false; break }
    }
    if (ok) {
      const first = tokens[i]
      const last = tokens[i + words.length - 1]
      const start = first.norm === words[0] ? first.start : first.subs[first.subs.length - 1].start
      const end = last.norm === words[words.length - 1] ? last.end : last.subs[0].end
      out.push({ start, end })
      i += words.length - 1
    }
  }
  return out
}

export type Segment = { text: string; hl: boolean }

/** 범위 목록을 이용해 본문을 칠할 조각/안 칠할 조각으로 나눕니다. */
export function splitByRanges(line: string, ranges: Range[]): Segment[] {
  const sorted = [...ranges].sort((a, b) => a.start - b.start)
  const segs: Segment[] = []
  let pos = 0
  for (const r of sorted) {
    if (r.start < pos) continue // 겹치는 범위는 건너뜀
    if (r.start > pos) segs.push({ text: line.slice(pos, r.start), hl: false })
    segs.push({ text: line.slice(r.start, r.end), hl: true })
    pos = r.end
  }
  if (pos < line.length) segs.push({ text: line.slice(pos), hl: false })
  return segs
}

/**
 * 단어 카드(teach)의 본문 하이라이트.
 * - form: 본문 속 실제 형태 (formInVerse가 있으면 그것, 없으면 word)
 * - occurrence: 같은 형태가 여러 번 나올 때 몇 번째(1부터)만 칠할지
 */
export function teachRanges(line: string, form: string | string[], occurrence?: number): Range[] {
  const all = (Array.isArray(form) ? form : [form])
    .flatMap(f => findRanges(line, f))
    .sort((a, b) => a.start - b.start)
  if (occurrence && occurrence >= 1) return all[occurrence - 1] ? [all[occurrence - 1]] : all.slice(0, 1)
  return all
}

/** 경전(verse) 단계 하이라이트: 목록의 각 형태와 일치하는 범위 전체 */
export function verseRanges(pali: string, highlight: string[] | undefined): Range[] {
  if (!highlight?.length) return []
  return highlight.flatMap(h => findRanges(pali, h))
}

export const isLetter = (ch: string) => LETTER.test(ch)
