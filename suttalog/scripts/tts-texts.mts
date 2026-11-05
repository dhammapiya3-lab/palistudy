// 경전으로 배우기 — 발음 녹음(mp3)을 만들 빠알리 글 목록 뽑기
// 실행: (suttalog 폴더에서) npx tsx scripts/tts-texts.mts
// 결과: scripts/tts-texts.json — ttsKey()로 모양을 맞춘 글들의 정렬된 중복 없는 배열
//
// 앱에서 소리를 내는 곳(speakPali / speakSequence)이 넘기는 글을 모두 모음.
// 소리 내기 전에 그 화면이 하는 변환(speakableText, 줄바꿈 → 공백, 하이픈 지우기 등)도 똑같이 적용.
// 알파벳·발음 레슨의 글자 하나(a, ā, k …)는 빠알리 프라이머의 글자 녹음(audio/letters/)을 쓰므로 넣지 않음.

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ttsKey } from '../src/utils/tts-key.ts'
import { LESSON_IDS, loadLesson } from '../src/features/lessons/lesson-registry.ts'
import { speakableText, splitByRanges, verseRanges } from '../src/features/lessons/pali-highlight.ts'
import { buildCheckStep } from '../src/features/lessons/learn-extras.ts'
import { buildLines, lineWords } from '../src/features/recite/recite-lines.ts'
import { isReciteLesson } from '../src/utils/lessons-meta.ts'
import { ALPHABET_DATA } from '../src/features/lessons/basics-data/alphabet.ts'
import { VOCAB_DATA } from '../src/features/lessons/basics-data/vocab.ts'
import { GRAMMAR_DATA } from '../src/features/lessons/basics-data/grammar.ts'
import { READING_DATA } from '../src/features/lessons/basics-data/reading.ts'

const out = new Set<string>()
const add = (text: string | undefined | null) => {
  if (!text) return
  const k = ttsKey(text)
  if (k && /\p{Script=Latin}/u.test(k)) out.add(k)
}
/** ScriptureLearn의 speak(): speakPali(speakableText(text) || text) */
const addSpeak = (text: string) => add(speakableText(text) || text)

// ── 경전 과(ScriptureLearn·Recite·낱말 복습·낱말장) ──
for (const id of LESSON_IDS) {
  const steps = await loadLesson(id)
  steps.forEach((s, raw) => {
    switch (s.type) {
      case 'teach': {
        // 낱말 카드 발음, 확인 문제(듣고 고르기)·낱말 복습·낱말장
        addSpeak(s.word)
        add(s.word)
        const f = s.formInVerse
        if (f) (Array.isArray(f) ? f : [f]).forEach(x => { addSpeak(x); add(x) })
        // 런타임 확인 문제(듣고 고르기) — 화면이 만드는 그대로
        const chk = buildCheckStep(steps, { kind: 'check', teachRaw: raw, mode: 'listen' })
        if (chk && chk.type === 'match-listen') { addSpeak(chk.word); add(chk.word) }
        break
      }
      case 'verse':
        // 전체 듣기·쉬운 화면 자동 재생·이어 듣기(speakSequence)
        add(s.pali)
        // 본문에서 누를 수 있는 칠한 낱말 (누르기·뜻 쪽지의 발음 버튼)
        for (const seg of splitByRanges(s.pali, verseRanges(s.pali, s.highlight))) {
          if (seg.hl) { addSpeak(seg.text); addSpeak(speakableText(seg.text)) }
        }
        break
      case 'speak':
        add(s.pali)
        break
      case 'match-listen':
        // 듣고 고르기 + 낱말 복습의 틀린 문제 다시 듣기
        addSpeak(s.word); add(s.word)
        break
      case 'writing':
        addSpeak(s.answer)
        break
    }
  })
  // 외우기(독송문 과만)
  if (isReciteLesson(id)) {
    for (const line of buildLines(steps)) {
      add(line.pali)
      for (const w of lineWords(line.pali)) add(w)
    }
  }
}

// ── 기초 다지기 ──
for (const l of Object.values(ALPHABET_DATA)) {
  add(l.verse.replace(/\n/g, ' '))
  if (l.roman) add(l.roman.replace(/-/g, ''))
}
for (const l of Object.values(VOCAB_DATA)) {
  add(l.sourceVerse.replace(/\n/g, ' '))
  for (const w of l.words) add(w.pali)
}
for (const l of Object.values(GRAMMAR_DATA)) add(l.verse)
for (const l of Object.values(READING_DATA)) {
  for (const seg of l.segments) {
    add(seg.pali)
    for (const w of seg.wordByWord) add(w.word)
  }
}

const list = [...out].sort()
const file = join(dirname(fileURLToPath(import.meta.url)), 'tts-texts.json')
writeFileSync(file, JSON.stringify(list, null, 1) + '\n')
console.log(`${list.length}개 → ${file}`)
