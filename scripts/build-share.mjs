// 공개 폴더 share/pali-tts 를 앱의 원본에서 다시 만들고, Python·JS 규칙이 같은지 확인
//   - pali-voice.js  ← shared/pali-voice.ts (앱이 쓰는 원본)을 JS로 옮김
//   - pali_tts.py    ← 원본 그대로 (앱의 녹음 스크립트 primer/scripts/tts 가 이 파일을 가져다 씀)
//   - 확인: 앱 문장들을 두 규칙(Python to_telugu · JS textForVoice)으로 바꿔 결과가 같은지
// 실행: node scripts/build-share.mjs        (GitHub Actions 'share-sync'가 main에 올릴 때마다 자동 실행)
import { execFileSync, execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'share', 'pali-tts', 'pali-voice.js')
const HEADER = `// 브라우저(기기 목소리)로 빠알리어를 읽을 때 쓰는 규칙 — palistudy 앱의 shared/pali-voice.ts 를 JS로 옮긴 것. MIT License.
// ⚠️ 자동으로 만든 파일 — 고칠 때는 shared/pali-voice.ts 를 고치세요 (scripts/build-share.mjs)
// 사용 예: const v = pickPaliVoice(speechSynthesis.getVoices()); const u = new SpeechSynthesisUtterance(textForVoice("Buddhaṃ saraṇaṃ gacchāmi", v.lang)); u.voice = v; u.lang = v.lang; speechSynthesis.speak(u)
`

// 1) JS 만들기
const local = ['primer', 'suttalog'].map(a => join(root, a, 'node_modules', '.bin', 'esbuild')).find(existsSync)
const args = [join(root, 'shared', 'pali-voice.ts'), '--format=esm', '--charset=utf8', '--log-level=error']
const js = local
  ? execFileSync(local, args, { encoding: 'utf8' })
  : execSync(`npx --yes esbuild@0.25.0 ${args.map(a => JSON.stringify(a)).join(' ')}`, { encoding: 'utf8' })
writeFileSync(out, HEADER + js)
console.log('만듦:', out)

// 2) 확인할 문장: 앱 과 자료의 빠알리어 + 까다로운 낱말
const texts = new Set(['cakkaṃva vahato padaṃ', 'puñña', 'sabbaññū', 'pañca', 'pañha', 'ñāṇa', 'phala', 'Buddhaṃ saraṇaṃ gacchāmi'])
const lessonDir = join(root, 'suttalog', 'src', 'features', 'lessons')
for (const f of readdirSync(lessonDir).filter(f => f.startsWith('lesson-data-'))) {
  for (const m of readFileSync(join(lessonDir, f), 'utf8').matchAll(/"(?:pali|word)": "((?:[^"\\]|\\.)*)"/g)) texts.add(JSON.parse(`"${m[1]}"`))
}
const list = [...texts]
const { textForVoice } = await import(pathToFileURL(out).href)
const jsOut = list.map(t => textForVoice(t, 'te-IN'))
const py = execFileSync('python3', ['-c', `
import json, sys
sys.path.insert(0, ${JSON.stringify(join(root, 'share', 'pali-tts'))})
from pali_tts import to_telugu
print(json.dumps([to_telugu(t) for t in json.load(sys.stdin)], ensure_ascii=False))
`], { input: JSON.stringify(list), encoding: 'utf8', maxBuffer: 64 << 20 })
const pyOut = JSON.parse(py)
const bad = list.filter((t, i) => jsOut[i] !== pyOut[i])
if (bad.length) {
  console.error(`❌ Python(pali_tts.py)과 JS(shared/pali-voice.ts) 규칙이 ${bad.length}곳에서 다름:`)
  for (const t of bad.slice(0, 10)) console.error('  ', t)
  console.error('두 파일의 규칙을 같게 고친 뒤 다시 올려 주세요.')
  process.exit(1)
}
console.log(`✓ 문장 ${list.length}개: Python·JS 규칙 결과가 같음`)
