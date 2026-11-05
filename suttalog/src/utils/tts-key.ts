// 발음 녹음(mp3) 찾기용 열쇠 — 앱(pali-tts.ts)과 녹음 목록 만들기(scripts/tts-texts.mts)가 함께 씀.
// 같은 글이 따옴표·문장부호·대소문자·줄바꿈만 다르면 같은 녹음을 쓰도록 모양을 맞춤.

const QUOTES = /[‘’“”"'`]/g
const DASHES = /[—–…]/g

export function ttsKey(text: string): string {
  return text
    .normalize('NFC')
    .replace(/\r?\n/g, ' ')
    .replace(QUOTES, '')
    .replace(DASHES, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[\p{P}\s]+|[\p{P}\s]+$/gu, '')
    .toLowerCase()
}
