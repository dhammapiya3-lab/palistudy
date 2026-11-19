// 공용 코드(/shared)를 앱의 src/shared/ 로 복사 — 두 앱(경전으로 배우기·빠알리 프라이머)이 같은 코드를 쓰게 함.
// 앱 폴더에서 실행: node ../scripts/sync-shared.mjs  (npm run dev / build 가 먼저 부름)
// src/shared/ 는 복사본이라 git에 올리지 않음 — 고칠 때는 언제나 /shared 의 원본을 고칠 것.
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync, mkdirSync, statSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const here = dirname(fileURLToPath(import.meta.url))
const from = resolve(here, '..', 'shared')
const to = resolve(process.cwd(), 'src', 'shared')
const NOTE = '// ⚠️ 자동 복사본 — 여기를 고치지 말고 저장소 맨 위 /shared 의 원본을 고치세요 (scripts/sync-shared.mjs)\n'

if (existsSync(to)) rmSync(to, { recursive: true, force: true })
mkdirSync(to, { recursive: true })
function copy(dir, out) {
  for (const name of readdirSync(dir)) {
    const src = join(dir, name), dst = join(out, name)
    if (statSync(src).isDirectory()) { mkdirSync(dst, { recursive: true }); copy(src, dst); continue }
    if (/\.(ts|tsx)$/.test(name)) writeFileSync(dst, NOTE + readFileSync(src, 'utf8'))
    else if (name !== 'README.md') cpSync(src, dst)
  }
}
copy(from, to)
console.log(`공용 코드 복사: ${from} → ${to}`)
