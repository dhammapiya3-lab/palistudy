// 뜻 깊이 이해하기 — 출처 약어 → 한글 이름 (모두 VRI 6차 결집본, 쪽수는 미얀마본)
const NAMES: Record<string, string> = {
  KhpA: '쿳다까빠타 주석서',
  AA: '앙굿따라 니까야 주석서',
  UdA: '우다나 주석서',
  VibhA: '위방가 주석서',
  SnA: '숫따니빠따 주석서',
  DṬ: '디가 니까야 복주석서',
  MA: '맛지마 니까야 주석서',
  'MṬ': '맛지마 니까야 복주석서',
  SA: '상윳따 니까야 주석서',
  'SṬ': '상윳따 니까야 복주석서',
  Vism: '청정도론',
  'VismṬ': '청정도론 복주석서',
}

/** 'MA 1.247' → '맛지마 니까야 주석서 1권 247쪽' / 'KhpA 0.17' → '쿳다까빠타 주석서 17쪽' */
export function commentarySource(src: string): string {
  const m = src.match(/^(\S+)\s+(.+)$/)
  if (!m) return NAMES[src] ?? src
  const name = NAMES[m[1]] ?? m[1]
  const pages = m[2].replace(/(\d+)\.(\d+)(?:[–-](\d+))?/g, (_, v: string, p: string, q?: string) => {
    const pg = q ? `${Number(p)}–${Number(q)}쪽` : `${Number(p)}쪽`
    return v === '0' ? pg : `${v}권 ${pg}`
  })
  return `${name} ${pages}`
}
