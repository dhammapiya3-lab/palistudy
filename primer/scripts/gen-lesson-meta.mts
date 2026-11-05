// 과 목록 요약(단계 수·검색용 낱말) 만들기 → src/features/grammar/lessons-meta.generated.ts
// 처음 여는 화면(홈·과목·복습)은 이 요약만 쓰고, 과 내용은 과를 열 때 받음
// 실행: npm run gen:meta  (npm run build 할 때 자동으로 먼저 실행됨)
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { LESSON_SOURCES } from '../src/features/grammar/lesson-sources.ts'
import { assignStepIds } from '../src/utils/step-id-generator.ts'

const here = dirname(fileURLToPath(import.meta.url))
const out = resolve(here, '../src/features/grammar/lessons-meta.generated.ts')

// useCourses의 검색과 같은 방식 — 대소문자·장음 기호·아래 점을 무시
const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

const ids = new Set<string>()
const lines: string[] = []
for (const src of LESSON_SOURCES) {
  if (ids.has(src.id)) throw new Error(`과 ID 중복: ${src.id}`)
  ids.add(src.id)
  const steps = assignStepIds(src.id, await src.load())
  const words: string[] = []
  for (const s of steps) {
    if (s.type === 'teach') words.push(fold(s.word), fold(s.meaning))
  }
  // 낱말·뜻을 줄바꿈으로 이어 붙임 (검색어에는 줄바꿈이 들어갈 수 없어 낱말 경계를 넘어 맞지 않음)
  lines.push(`  ${JSON.stringify(src.id)}: { stepCount: ${steps.length}, search: ${JSON.stringify(words.join('\n'))} },`)
}

const content = `// 자동 생성 파일 — 직접 고치지 마세요 (scripts/gen-lesson-meta.mts, npm run gen:meta)
// 과마다 단계 수 + 과목 검색용 낱말·뜻(검색용으로 정리된 글자)
export interface GeneratedLessonMeta { stepCount: number; search: string }

export const LESSON_META: Record<string, GeneratedLessonMeta> = {
${lines.join('\n')}
}
`

if (!existsSync(out) || readFileSync(out, 'utf8') !== content) {
  writeFileSync(out, content)
  console.log(`lessons-meta.generated.ts 갱신 (${LESSON_SOURCES.length}과)`)
} else {
  console.log(`lessons-meta.generated.ts 변경 없음 (${LESSON_SOURCES.length}과)`)
}
