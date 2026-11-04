// 모든 lesson에서 TTS가 필요한 텍스트 추출 → JSON 출력
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// lesson 파일들을 동적으로 읽을 수 없으므로, 빌드된 lessons.ts를 파싱
// 대신 각 lesson 파일에서 직접 텍스트 추출

const lessonsDir = join(__dirname, 'src/features/grammar')
const lessonFiles = [
  'lesson-00-alphabet', 'lesson-01-sandhi',
  ...Array.from({ length: 29 }, (_, i) => `lesson-${String(i + 1).padStart(2, '0')}`)
]

const texts = new Set()

for (const file of lessonFiles) {
  try {
    const content = readFileSync(join(lessonsDir, `${file}.ts`), 'utf8')

    // teach 스텝: word 필드
    const wordMatches = content.matchAll(/type:\s*'teach'[^}]*?word:\s*'([^']+)'/g)
    for (const m of wordMatches) texts.add(m[1])

    // speak 스텝: pali 필드
    const speakMatches = content.matchAll(/type:\s*'speak'[^}]*?pali:\s*'([^']+)'/g)
    for (const m of speakMatches) texts.add(m[1])

    // verse 스텝: pali 필드 (여러 줄 가능) + 개별 토큰
    const verseMatches = content.matchAll(/type:\s*'verse'[^}]*?pali:\s*'([^']+)'/g)
    for (const m of verseMatches) {
      texts.add(m[1])
      // verse 개별 단어 클릭 시 speakPali(token) 호출됨
      const tokens = m[1].replace(/\\n/g, ' ').split(/\s+/)
      for (const token of tokens) {
        const clean = token.trim().replace(/[,.;:!?"'()""'']/g, '')
        if (clean.length > 0) texts.add(clean)
      }
    }

    // match-listen 스텝: word 필드
    const listenMatches = content.matchAll(/type:\s*'match-listen'[^}]*?word:\s*'([^']+)'/g)
    for (const m of listenMatches) texts.add(m[1])

    // writing 스텝: answer 필드
    const writingMatches = content.matchAll(/type:\s*'writing'[^}]*?answer:\s*'([^']+)'/g)
    for (const m of writingMatches) texts.add(m[1])

  } catch (e) {
    // 파일 없으면 무시
  }
}

const sorted = [...texts].sort()
console.log(`추출된 텍스트: ${sorted.length}개`)

// JSON 파일로 저장
writeFileSync(
  join(__dirname, 'tts-texts.json'),
  JSON.stringify(sorted, null, 2),
  'utf8'
)
console.log('tts-texts.json 저장 완료')

// 미리보기
sorted.slice(0, 20).forEach(t => console.log(`  ${t}`))
if (sorted.length > 20) console.log(`  ... 외 ${sorted.length - 20}개`)
