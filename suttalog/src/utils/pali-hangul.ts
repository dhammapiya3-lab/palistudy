// 빠알리 로마자 → 한글 발음 표기 (scripts/pali_hangul.py 를 그대로 옮김 — 두 파일의 규칙을 함께 고칠 것)
// 내 서재에 붙여넣은 글의 발음을 보여 줄 때 씀

const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
const JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'
const JONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

const CONS = ['kh', 'gh', 'ch', 'jh', 'ṭh', 'ḍh', 'th', 'dh', 'ph', 'bh',
  'k', 'g', 'ṅ', 'c', 'j', 'ñ', 'ṭ', 'ḍ', 'ṇ', 't', 'd', 'n', 'p', 'b', 'm',
  'y', 'r', 'l', 'ḷ', 'v', 's', 'h']
const ONSET: Record<string, string> = {
  k: 'ㄲ', kh: 'ㅋ', g: 'ㄱ', gh: 'ㄱ', c: 'ㅉ', ch: 'ㅊ', j: 'ㅈ', jh: 'ㅈ',
  'ṭ': 'ㄸ', 'ṭh': 'ㅌ', 'ḍ': 'ㄷ', 'ḍh': 'ㄷ', 'ṇ': 'ㄴ', t: 'ㄸ', th: 'ㅌ', d: 'ㄷ', dh: 'ㄷ',
  n: 'ㄴ', p: 'ㅃ', ph: 'ㅍ', b: 'ㅂ', bh: 'ㅂ', m: 'ㅁ', r: 'ㄹ', l: 'ㄹ', 'ḷ': 'ㄹ',
  s: 'ㅅ', h: 'ㅎ', 'ṅ': 'ㅇ', y: 'ㅇ', v: 'ㅇ', 'ñ': 'ㄴ',
}
const CODA: Record<string, string> = {
  k: 'ㄱ', kh: 'ㄱ', g: 'ㄱ', gh: 'ㄱ', c: 'ㅅ', ch: 'ㅅ', j: 'ㅅ', jh: 'ㅅ',
  'ṭ': 'ㅅ', 'ṭh': 'ㅅ', 'ḍ': 'ㅅ', 'ḍh': 'ㅅ', t: 'ㅅ', th: 'ㅅ', d: 'ㅅ', dh: 'ㅅ',
  p: 'ㅂ', ph: 'ㅂ', b: 'ㅂ', bh: 'ㅂ', m: 'ㅁ', n: 'ㄴ', 'ṇ': 'ㄴ', 'ñ': 'ㄴ', 'ṅ': 'ㅇ',
  l: 'ㄹ', 'ḷ': 'ㄹ', s: 'ㅅ', r: 'ㄹ',
}
const BASE_V: Record<string, string> = { a: 'ㅏ', 'ā': 'ㅏ', i: 'ㅣ', 'ī': 'ㅣ', u: 'ㅜ', 'ū': 'ㅜ', e: 'ㅔ', o: 'ㅗ' }
const Y_V: Record<string, string> = { a: 'ㅑ', 'ā': 'ㅑ', i: 'ㅣ', 'ī': 'ㅣ', u: 'ㅠ', 'ū': 'ㅠ', e: 'ㅖ', o: 'ㅛ' }
const W_V: Record<string, string> = { a: 'ㅘ', 'ā': 'ㅘ', i: 'ㅟ', 'ī': 'ㅟ', u: 'ㅜ', 'ū': 'ㅜ', e: 'ㅞ', o: 'ㅗ' }
const VOWELS = 'aāiīuūeo'
const PAIR = new Set(['k|kh', 'g|gh', 'c|ch', 'j|jh', 'ṭ|ṭh', 'ḍ|ḍh', 't|th', 'd|dh', 'p|ph', 'b|bh'])

type Tok = ['C' | 'V' | 'M', string]

function tokenize(w: string): Tok[] {
  const out: Tok[] = []
  let i = 0
  while (i < w.length) {
    const ch = w[i]
    if (ch === 'ṃ' || ch === 'ṁ') { out.push(['M', 'ṃ']); i++; continue }
    if (VOWELS.includes(ch)) { out.push(['V', ch]); i++; continue }
    const c = CONS.find(x => w.startsWith(x, i))
    if (c) { out.push(['C', c]); i += c.length } else i++
  }
  return out
}

function S(cho: string, jung: string, jong = ''): string {
  return String.fromCharCode(0xAC00 + (CHO.indexOf(cho) * 21 + JUNG.indexOf(jung)) * 28 + JONG.indexOf(jong))
}

function splitCluster(clIn: string[], initial: boolean): [string, string[], string | null, string | null] {
  let coda = ''
  const extra: string[] = []
  let cl = [...clIn]
  if (!cl.length) return [coda, extra, null, null]
  if (!initial && cl.length >= 2) {
    const [a, b] = cl
    if (a === 'y' && b === 'y') { extra.push('이'); cl = cl.slice(1) }
    else if (a === 'v' && b === 'h') { cl = ['v', ...cl.slice(2)] }
    else if (a === b || PAIR.has(`${a}|${b}`) || ('ṅñṇnm'.includes(a) && !'yvr'.includes(b))) { coda = CODA[a] ?? ''; cl = cl.slice(1) }
    else if ((a === 'ṇ' || a === 'n') && b === 'h') { coda = 'ㄴ'; cl = cl.slice(1) }
    else if (a === 'y' && b === 'h') { extra.push('이'); cl = cl.slice(1) }
    else if ((a === 'ḷ' || a === 'l') && b === 'h') { coda = 'ㄹ'; cl = cl.slice(1) }
    else if (a === 's' && (b === 'm' || b === 'n')) { extra.push('스'); cl = cl.slice(1) }
  }
  if (cl.length >= 2 && cl[cl.length - 1] === 'y' && cl[cl.length - 2] !== 'y') {
    let onset = cl[cl.length - 2]
    if (onset === 'v') { extra.push('위'); onset = 'y' }
    for (const c of cl.slice(0, -2)) extra.push(S(ONSET[c], 'ㅡ'))
    return [coda, extra, onset, 'y']
  }
  if (cl.length >= 2 && (cl[cl.length - 1] === 'v' || cl[cl.length - 1] === 'r')) {
    for (const c of cl.slice(0, -1)) extra.push(S(ONSET[c], 'ㅡ'))
    const onset = cl[cl.length - 1]
    return [coda, extra, onset, onset === 'v' ? 'v' : null]
  }
  for (const c of cl.slice(0, -1)) extra.push(S(ONSET[c], 'ㅡ'))
  const onset = cl[cl.length - 1]
  const glide = onset === 'y' || onset === 'ñ' ? 'y' : onset === 'v' ? 'v' : null
  return [coda, extra, onset, glide]
}

type Syl = { cho: string; jung: string; jong: string; long: boolean; raw?: boolean }

function wordToHangul(word: string): string {
  const w = word.toLowerCase().normalize('NFC').replace(/[’'‘]/g, '')
  const t = tokenize(w)
  const sylls: [string[], string, boolean][] = []
  let cur: string[] = []
  let i = 0
  while (i < t.length) {
    const [kind, val] = t[i]
    if (kind === 'C') { cur.push(val); i++ }
    else if (kind === 'V') {
      const nas = i + 1 < t.length && t[i + 1][0] === 'M'
      sylls.push([cur, val, nas]); cur = []
      i += nas ? 2 : 1
    } else i++
  }
  const tail = cur
  const out: Syl[] = []
  sylls.forEach(([cl, v, nas], idx) => {
    const [coda, extra0, onset, glide] = splitCluster(cl, idx === 0)
    let extra = extra0
    if (extra.length === 1 && extra[0] === '이' && onset === 'y' && 'iī'.includes(v)) extra = []
    if (out.length && coda) out[out.length - 1].jong = coda
    if (out.length && cl.length === 1 && (cl[0] === 'l' || cl[0] === 'ḷ') && !out[out.length - 1].jong && !sylls[idx - 1][2]) {
      out[out.length - 1].jong = 'ㄹ'
    }
    for (const e of extra) out.push({ cho: '', jung: e, jong: '', long: false, raw: true })
    const cho = onset === null ? 'ㅇ' : ONSET[onset]
    const jung = (glide === 'y' ? Y_V : glide === 'v' ? W_V : BASE_V)[v]
    const nxt = idx + 1 < sylls.length ? sylls[idx + 1][0] : tail
    const long = 'āīū'.includes(v) || ('eo'.includes(v) && !nas && nxt.length < 2)
    out.push({ cho, jung, jong: nas ? 'ㅇ' : '', long })
  })
  for (const c of tail) {
    if (out.length && CODA[c] && !out[out.length - 1].jong) out[out.length - 1].jong = CODA[c]
    else out.push({ cho: '', jung: S(ONSET[c], 'ㅡ'), jong: '', long: false, raw: true })
  }
  return out.map(s => s.raw ? s.jung : S(s.cho, s.jung, s.jong) + (s.long ? '-' : '')).join('')
}

const PUNCT = /(\s+|[,.;:!?—–"“”‘’()[\]…·/]+)/
/** 빠알리 로마자 글 → 한글 발음 (로마자가 아닌 글자는 건너뜀) */
export function toHangul(text: string): string {
  const t = text.normalize('NFC').replace(/(?<=[a-zāīūṃ])([’”'"]+)nti/g, 'n$1ti')
  return t.split(PUNCT).filter(Boolean).map(tok =>
    /^(\s+|[,.;:!?—–"“”‘’()[\]…·/]+)$/.test(tok)
      ? tok.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
      : wordToHangul(tok),
  ).join('')
}
