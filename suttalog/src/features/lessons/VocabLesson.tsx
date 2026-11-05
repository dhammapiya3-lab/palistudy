// 단어 학습 - 경전 기반
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { speakPali } from '../../utils/pali-tts'
import { closeBasicLesson, finishBasicLesson } from './basics'
import BasicLessonMissing from './BasicLessonMissing'

const VOCAB_DATA: Record<string, {
  title: string; source: string; sourceVerse: string; sourceKo: string;
  words: { pali: string; ko: string; grammar: string; ipa: string; root?: string }[];
}> = {
  refuge: {
    title: '삼보 (Buddha, Dhamma, Saṅgha)',
    source: 'Khuddakapāṭha 1 삼귀의 (Saraṇattaya) — Dhp 190–192 귀의 게송 참조',
    sourceVerse: 'Buddhaṃ saraṇaṃ gacchāmi.\nDhammaṃ saraṇaṃ gacchāmi.\nSaṅghaṃ saraṇaṃ gacchāmi.',
    sourceKo: '부처님께 귀의합니다.\n법에 귀의합니다.\n승가에 귀의합니다.',
    words: [
      { pali: 'Buddha', ko: '깨달은 자, 부처', grammar: '남성명사', ipa: '/bud.dʰɐ/', root: '√budh (깨닫다)' },
      { pali: 'Dhamma', ko: '법, 가르침, 진리', grammar: '남성명사', ipa: '/dʰɐm.mɐ/', root: '√dhar (지탱하다)' },
      { pali: 'Saṅgha', ko: '승가, 공동체', grammar: '남성명사', ipa: '/sɐŋ.gʰɐ/', root: 'saṃ + √han (함께 모이다)' },
      { pali: 'saraṇaṃ', ko: '귀의처, 보호처', grammar: '중성명사 대격', ipa: '/sɐ.rɐ.ɳɐṃ/', root: '√sar (보호하다; 주석서: hiṃsā "부수다")' },
      { pali: 'gacchāmi', ko: '(나는) 갑니다', grammar: '동사 1인칭 단수 현재', ipa: '/gɐt.tɕʰaː.mi/', root: '√gam (가다)' },
    ],
  },
  mind: {
    title: '마음 (citta, mano, vedanā)',
    source: 'Dhammapada 1-2게',
    sourceVerse: 'Manopubbaṅgamā dhammā,\nmanoseṭṭhā manomayā.',
    sourceKo: '마음이 모든 법의 선구자이다.\n마음이 으뜸이며, 마음이 만들어낸다.',
    words: [
      { pali: 'mano', ko: '마음, 의(意)', grammar: '중성명사', ipa: '/mɐ.no/', root: '√man (생각하다)' },
      { pali: 'citta', ko: '마음, 심(心)', grammar: '중성명사', ipa: '/tɕit.tɐ/', root: '√cit (알다)' },
      { pali: 'vedanā', ko: '느낌, 수(受)', grammar: '여성명사', ipa: '/ʋe.dɐ.naː/', root: '√vid (알다)' },
      { pali: 'saññā', ko: '인식, 상(想)', grammar: '여성명사', ipa: '/sɐɲ.ɲaː/', root: 'saṃ+√ñā (알다)' },
      { pali: 'dukkha', ko: '괴로움, 고(苦)', grammar: '중성명사/형용사', ipa: '/duk.kʰɐ/', root: 'du(나쁜) + kha(공간) — 전통적 어원 풀이(Vism)' },
      { pali: 'sukha', ko: '행복, 즐거움', grammar: '중성명사/형용사', ipa: '/su.kʰɐ/', root: 'su(좋은) + kha(공간) — 전통적 어원 풀이(Vism)' },
    ],
  },
  numbers: {
    title: '수사 (eka~dasa)',
    source: 'Aṅguttara Nikāya 분류 기준',
    sourceVerse: 'Ekañca, bhikkhave, dhammaṃ\nbhāvayato bahulīkaroto...',
    sourceKo: '비구들이여, 이 하나의 법을\n닦고 많이 행하면...',
    words: [
      { pali: 'eka', ko: '하나, 1', grammar: '수사', ipa: '/e.kɐ/' },
      { pali: 'dvi (dve)', ko: '둘, 2', grammar: '수사', ipa: '/dʋi/' },
      { pali: 'ti (tayo)', ko: '셋, 3', grammar: '수사', ipa: '/ti/' },
      { pali: 'catu (cattāro)', ko: '넷, 4', grammar: '수사', ipa: '/tɕɐ.tu/' },
      { pali: 'pañca', ko: '다섯, 5', grammar: '수사', ipa: '/pɐɲ.tɕɐ/' },
      { pali: 'cha', ko: '여섯, 6', grammar: '수사', ipa: '/tɕʰɐ/' },
      { pali: 'satta', ko: '일곱, 7', grammar: '수사', ipa: '/sɐt.tɐ/' },
      { pali: 'aṭṭha', ko: '여덟, 8', grammar: '수사', ipa: '/ɐʈ.ʈʰɐ/' },
      { pali: 'nava', ko: '아홉, 9', grammar: '수사', ipa: '/nɐ.ʋɐ/' },
      { pali: 'dasa', ko: '열, 10', grammar: '수사', ipa: '/dɐ.sɐ/' },
    ],
  },
}

export default function VocabLesson() {
  const nav = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? VOCAB_DATA[lessonId] : null
  const [phase, setPhase] = useState<'verse' | 'words'>('verse')
  const [wordIndex, setWordIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (!lesson || !lessonId) return <BasicLessonMissing />

  // 발음: 경전 학습 화면과 같은 빠알리 TTS('발음 소리 끄기' 설정을 따름)
  const speak = (text: string) => speakPali(text)

  const word = lesson.words[wordIndex]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* 상단바 */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => closeBasicLesson(nav, 'vocab', lessonId)} aria-label="레슨 닫기" className="text-xl w-11 h-11 -ml-2 flex items-center justify-center rounded-full shrink-0">✕</button>
        <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
          <div className="h-full rounded-full transition-all" style={{
            width: phase === 'verse' ? '10%' : `${10 + (wordIndex / lesson.words.length) * 90}%`,
            backgroundColor: 'var(--color-primary)',
          }} />
        </div>
      </div>

      {/* 1단계: 경전 문맥 */}
      {phase === 'verse' && (
        <div className="px-5 pt-4 space-y-5">
          <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
            💬 {lesson.title}
          </span>
          <h2 className="text-lg font-bold">경전에서 만나는 단어</h2>

          <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>📜 {lesson.source}</p>
            <p lang="pi" className="pali-text text-lg leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-primary)' }}>
              {lesson.sourceVerse}
            </p>
            <button onClick={() => speak(lesson.sourceVerse.replace(/\n/g, ' '))}
              className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white"
              style={{ backgroundColor: 'var(--color-accent)' }}>
              🔊 발음 듣기
            </button>
          </div>

          <div className="rounded-2xl p-4" style={{ backgroundColor: 'color-mix(in srgb, #F9A825 12%, var(--color-surface))', border: '1px solid color-mix(in srgb, #F9A825 40%, var(--color-surface))' }}>
            <p className="text-sm whitespace-pre-line">{lesson.sourceKo}</p>
          </div>

          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            이 구절에서 {lesson.words.length}개의 핵심 단어를 배웁니다
          </p>

          <button onClick={() => setPhase('words')}
            className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97]"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            단어 학습 시작 →
          </button>
        </div>
      )}

      {/* 2단계: 단어 카드 */}
      {phase === 'words' && word && (
        <div className="px-5 pt-4 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{wordIndex + 1} / {lesson.words.length}</span>
            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>‘뜻 보기’를 눌러 확인</span>
          </div>

          {/* 단어 카드 — 카드(뜻 보기)와 발음 버튼을 겹치지 않게 분리(버튼 안 버튼 금지) */}
          <div className="w-full rounded-2xl p-6 min-h-[300px] flex flex-col justify-center items-center text-center"
            style={{ backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-border)' }}>

            <p lang="pi" className="pali-text text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{word.pali}</p>

            <button onClick={() => speak(word.pali)}
              className="mt-3 text-sm flex items-center gap-1 px-3 py-2 rounded-full" style={{ color: 'var(--color-accent)' }}>
              🔊 발음 듣기
            </button>

            <p className="text-xs font-mono mt-2" style={{ color: 'var(--color-text-secondary)' }}>{word.ipa}</p>

            {flipped ? (
              <>
                <hr className="w-full my-4" style={{ borderColor: 'var(--color-border)' }} />
                <p className="text-xl font-bold">{word.ko}</p>
                <p className="text-xs mt-2 px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
                  {word.grammar}
                </p>
                {word.root && (
                  <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                    어근: {word.root}
                  </p>
                )}
              </>
            ) : (
              <button onClick={() => setFlipped(true)}
                className="mt-5 px-5 py-2.5 rounded-full text-sm font-semibold active:scale-95 transition-transform"
                style={{ border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)' }}>
                뜻 보기
              </button>
            )}
          </div>

          {/* 다음/이전 */}
          <div className="flex gap-3">
            {wordIndex > 0 && (
              <button onClick={() => { setWordIndex(i => i - 1); setFlipped(false) }}
                className="flex-1 py-3 rounded-xl font-medium text-sm"
                style={{ border: '2px solid var(--color-border)' }}>
                ← 이전
              </button>
            )}
            <button onClick={() => {
              if (wordIndex + 1 < lesson.words.length) {
                setWordIndex(i => i + 1); setFlipped(false)
              } else {
                finishBasicLesson(nav, 'vocab', lessonId, lesson.title)
              }
            }}
              className="flex-1 py-3 rounded-xl text-white font-bold active:scale-[0.97]"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              {wordIndex + 1 < lesson.words.length ? '다음 단어 →' : '완료! 🪷'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
