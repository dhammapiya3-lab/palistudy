// 알파벳 학습 - 경전 기반
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Dhammapada 1게 기반 알파벳 학습 데이터
const LESSON_DATA: Record<string, {
  title: string; verse: string; roman: string; translation: string; translationKo: string;
  source: string; focus: string;
  letters: { char: string; ipa: string; ko: string; type: string; example: string }[];
  steps: { type: string; content: string; options?: string[]; answer?: number }[];
}> = {
  vowels: {
    title: '모음 (Vowels)',
    verse: 'Manopubbaṅgamā dhammā,\nmanoseṭṭhā manomayā;\nmanasā ce paduṭṭhena,\nbhāsati vā karoti vā,\ntato naṃ dukkham anveti,\ncakkaṃ va vahato padaṃ.',
    roman: 'Ma-no-pub-baṅ-ga-mā dham-mā',
    translation: 'Mind is the forerunner of all actions.',
    translationKo: '마음이 모든 법의 선구자이다.\n마음이 으뜸이며, 마음이 만들어낸다.\n더러운 마음으로\n말하거나 행하면,\n괴로움이 그를 따르나니,\n수레바퀴가 끄는 소의 발자국을 따르듯.',
    source: 'Dhammapada 1게 (Yamakavagga)',
    focus: '이 게송에서 모음을 찾아봅시다',
    letters: [
      { char: 'a', ipa: '/ɐ/', ko: '아 (짧게)', type: '단모음', example: 'Ma-na-sā' },
      { char: 'ā', ipa: '/aː/', ko: '아~ (길게)', type: '장모음', example: 'dham-mā' },
      { char: 'i', ipa: '/i/', ko: '이 (짧게)', type: '단모음', example: 'bhās-a-ti' },
      { char: 'ī', ipa: '/iː/', ko: '이~ (길게)', type: '장모음', example: '(이 게송에 없음)' },
      { char: 'u', ipa: '/u/', ko: '우 (짧게)', type: '단모음', example: 'pub-baṅ-ga-mā' },
      { char: 'ū', ipa: '/uː/', ko: '우~ (길게)', type: '장모음', example: '(이 게송에 없음)' },
      { char: 'e', ipa: '/eː/', ko: '에 (항상 장음)', type: '장모음', example: 'se-ṭṭhā' },
      { char: 'o', ipa: '/oː/', ko: '오 (항상 장음)', type: '장모음', example: 'Ma-no' },
    ],
    steps: [
      { type: 'intro', content: '경전의 첫 게송을 통해 빠알리어 모음을 배워봅시다.' },
      { type: 'listen', content: '먼저 게송을 들어보세요.' },
      { type: 'quiz', content: '"dhammā"에서 ā는 어떻게 발음할까요?', options: ['짧은 "아"', '긴 "아~"', '"어"', '"오"'], answer: 1 },
      { type: 'quiz', content: '"Mano"의 "o"는?', options: ['짧은 "오"', '긴 "오~" (항상 장음)', '"우"', '"어"'], answer: 1 },
      { type: 'quiz', content: '빠알리어에서 단모음은 몇 개?', options: ['3개 (a, i, u)', '5개', '8개', '2개'], answer: 0 },
    ],
  },
  consonants1: {
    title: '자음 기초',
    verse: 'Manopubbaṅgamā dhammā,\nmanoseṭṭhā manomayā;',
    roman: 'Ma-no-pub-baṅ-ga-mā dham-mā',
    translation: 'Mind is the forerunner of all actions.',
    translationKo: '마음이 모든 법의 선구자이다.\n마음이 으뜸이며, 마음이 만들어낸다.',
    source: 'Dhammapada 1게',
    focus: '같은 게송에서 자음을 분석합니다',
    letters: [
      { char: 'm', ipa: '/m/', ko: 'ㅁ', type: '순음 비음', example: 'Ma-no' },
      { char: 'n', ipa: '/n/', ko: 'ㄴ', type: '치음 비음', example: 'Ma-no' },
      { char: 'p', ipa: '/p/', ko: 'ㅂ (된소리)', type: '순음 무성무기', example: 'pub-baṅ' },
      { char: 'b', ipa: '/b/', ko: 'ㅂ (부드럽게)', type: '순음 유성무기', example: 'pub-baṅ' },
      { char: 'g', ipa: '/g/', ko: 'ㄱ (부드럽게)', type: '연구개 유성무기', example: 'ga-mā' },
      { char: 'd', ipa: '/d/', ko: 'ㄷ (부드럽게)', type: '치음 유성무기', example: 'dham-mā' },
      { char: 's', ipa: '/s/', ko: 'ㅅ', type: '치음 마찰음', example: 'se-ṭṭhā' },
    ],
    steps: [
      { type: 'intro', content: '같은 Dhammapada 1게에서 자음을 분석합니다.' },
      { type: 'quiz', content: '"Mano"의 M은 어떤 유형?', options: ['순음 비음 (입술)', '치음 (혀끝+이)', '연구개음 (혀뒤)', '경구개음'], answer: 0 },
    ],
  },
  special: {
    title: '특수 발음부호',
    verse: 'Manopubbaṅgamā dhammā,\nmanoseṭṭhā manomayā;\nmanasā ce paduṭṭhena,\nbhāsati vā karoti vā.',
    roman: '',
    translation: '',
    translationKo: '마음이 모든 법의 선구자이다.',
    source: 'Dhammapada 1게',
    focus: '점/꼬리가 붙은 특수 문자들',
    letters: [
      { char: 'ṃ', ipa: '/ŋ/', ko: '"앙"의 받침 ㅇ', type: 'niggahīta', example: 'cakkaṃ' },
      { char: 'ṅ', ipa: '/ŋ/', ko: '"앙"의 ㅇ (k/g 앞)', type: '연구개 비음', example: 'pubb-aṅ-gamā' },
      { char: 'ñ', ipa: '/ɲ/', ko: '"냐"의 초성', type: '경구개 비음', example: '(다음 게송)' },
      { char: 'ṭ', ipa: '/ʈ/', ko: '혀를 말아 ㄷ', type: '반설 무성', example: 'se-ṭṭhā' },
      { char: 'ḍ', ipa: '/ɖ/', ko: '혀를 말아 ㄷ(울림)', type: '반설 유성', example: 'pa-duṭ-ṭhe-na' },
      { char: 'ṇ', ipa: '/ɳ/', ko: '혀를 말아 ㄴ', type: '반설 비음', example: '(다음 과)' },
    ],
    steps: [
      { type: 'intro', content: '빠알리어에만 있는 특수 발음부호를 배웁니다.\n점(.)이 아래에 붙은 문자들입니다.' },
      { type: 'quiz', content: '"seṭṭhā"의 ṭ는 어떻게 발음?', options: ['일반 ㄷ', '혀를 뒤로 말아서 ㄷ', '영어 th처럼', 'ㅌ처럼'], answer: 1 },
      { type: 'quiz', content: '"pubbaṅgamā"의 ṅ은?', options: ['"앙"의 받침 ㅇ 소리', '"능"의 ㄴ', '"밍"의 ㅁ', '묵음'], answer: 0 },
    ],
  },
}

export default function AlphabetLesson() {
  const nav = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? LESSON_DATA[lessonId] : null
  const [phase, setPhase] = useState<'verse' | 'letters' | 'quiz'>('verse')
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  if (!lesson) return <div className="p-4">레슨을 찾을 수 없습니다.</div>

  const quizSteps = lesson.steps.filter(s => s.type === 'quiz')
  const currentQuiz = quizSteps[quizIndex]

  // TTS 발음 (이탈리아어 엔진으로 근사)
  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'it-IT'
    u.rate = 0.7
    speechSynthesis.speak(u)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* 상단바 */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => nav(-1)} className="text-xl">✕</button>
        <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
          <div className="h-full rounded-full transition-all" style={{
            width: phase === 'verse' ? '10%' : phase === 'letters' ? '40%' : `${40 + (quizIndex / Math.max(quizSteps.length, 1)) * 60}%`,
            backgroundColor: 'var(--color-primary)',
          }} />
        </div>
        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{lesson.title}</span>
      </div>

      {/* === 1단계: 경전 제시 + 발음 + 해석 === */}
      {phase === 'verse' && (
        <div className="px-5 pt-4 space-y-5">
          <div>
            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
              📜 {lesson.source}
            </span>
            <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>{lesson.focus}</p>
          </div>

          {/* 경전 원문 */}
          <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="pali-text text-lg leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-primary)' }}>
              {lesson.verse}
            </p>

            {/* TTS 버튼 */}
            <button onClick={() => speak(lesson.verse.replace(/\n/g, ' '))}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white active:scale-95 transition-transform"
              style={{ backgroundColor: 'var(--color-accent)' }}>
              🔊 전체 발음 듣기
            </button>
          </div>

          {/* 한국어 해석 */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: '#F57F17' }}>📖 해석</p>
            <p className="text-sm whitespace-pre-line leading-relaxed">{lesson.translationKo}</p>
          </div>

          {/* 로마자 읽기 가이드 */}
          {lesson.roman && (
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>🗣️ 읽기 가이드 (음절 분리)</p>
              <p className="pali-text text-base">{lesson.roman}</p>
              <button onClick={() => speak(lesson.roman.replace(/-/g, ''))}
                className="mt-2 text-xs flex items-center gap-1" style={{ color: 'var(--color-accent)' }}>
                🔊 천천히 듣기
              </button>
            </div>
          )}

          <button onClick={() => setPhase('letters')}
            className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97] transition-transform"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            글자 분석하기 →
          </button>
        </div>
      )}

      {/* === 2단계: 글자별 학습 === */}
      {phase === 'letters' && (
        <div className="px-5 pt-4 space-y-4">
          <h2 className="text-lg font-bold">글자별 발음 학습</h2>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            각 글자를 탭하여 발음을 들어보세요
          </p>

          <div className="space-y-3">
            {lesson.letters.map((l, i) => (
              <button key={i} onClick={() => speak(l.char === 'ā' ? 'aaa' : l.char === 'ī' ? 'iii' : l.char === 'ū' ? 'uuu' : l.char)}
                className="w-full rounded-xl p-4 text-left active:scale-[0.98] transition-all"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center gap-4">
                  {/* 글자 */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold pali-text"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                    {l.char}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>{l.type}</span>
                      <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>{l.ipa}</span>
                    </div>
                    <p className="font-semibold text-sm mt-1">🇰🇷 {l.ko}</p>
                    <p className="text-xs mt-0.5 pali-text" style={{ color: 'var(--color-text-secondary)' }}>
                      예: {l.example}
                    </p>
                  </div>
                  <span style={{ color: 'var(--color-accent)' }}>🔊</span>
                </div>
              </button>
            ))}
          </div>

          <button onClick={() => { setPhase('quiz'); setQuizIndex(0) }}
            className="w-full py-4 rounded-xl text-white font-bold active:scale-[0.97] transition-transform"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            퀴즈로 확인하기 →
          </button>
        </div>
      )}

      {/* === 3단계: 퀴즈 === */}
      {phase === 'quiz' && currentQuiz && (
        <div className="px-5 pt-4 space-y-5">
          <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
            퀴즈 {quizIndex + 1}/{quizSteps.length}
          </span>

          <h2 className="text-lg font-bold">{currentQuiz.content}</h2>

          <div className="space-y-3">
            {currentQuiz.options?.map((opt, i) => {
              const isAnswer = showResult && i === currentQuiz.answer
              const isWrong = showResult && selected === i && i !== currentQuiz.answer
              return (
                <button key={i} onClick={() => !showResult && setSelected(i)}
                  disabled={showResult}
                  className="w-full p-4 rounded-xl text-left text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isAnswer ? '#E8F5E9' : isWrong ? '#FFEBEE' : 'var(--color-surface)',
                    border: isAnswer ? '2px solid #4CAF50' : isWrong ? '2px solid #F44336' : selected === i ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                  }}>
                  {isAnswer && '✅ '}{isWrong && '❌ '}{opt}
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className="rounded-xl p-3" style={{ backgroundColor: selected === currentQuiz.answer ? '#E8F5E9' : '#FFEBEE' }}>
              <p className="text-sm font-bold">{selected === currentQuiz.answer ? '✅ Sādhu! 정답!' : '❌ 오답'}</p>
            </div>
          )}

          <button
            onClick={() => {
              if (!showResult) {
                setShowResult(true)
              } else if (quizIndex + 1 < quizSteps.length) {
                setQuizIndex(i => i + 1)
                setSelected(null)
                setShowResult(false)
              } else {
                nav('/lesson-complete')
              }
            }}
            disabled={selected === null && !showResult}
            className="w-full py-4 rounded-xl text-white font-bold disabled:opacity-40 active:scale-[0.97] transition-transform"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            {showResult ? (quizIndex + 1 < quizSteps.length ? '다음 문제' : '완료!') : '확인'}
          </button>
        </div>
      )}

      {/* 퀴즈 끝 */}
      {phase === 'quiz' && !currentQuiz && (
        <div className="px-5 pt-20 text-center">
          <p className="text-5xl">🪷✨</p>
          <p className="text-xl font-bold mt-4" style={{ color: 'var(--color-primary)' }}>Sādhu!</p>
          <button onClick={() => nav('/lesson-complete')}
            className="mt-8 px-8 py-4 rounded-xl text-white font-bold"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            완료
          </button>
        </div>
      )}
    </div>
  )
}
