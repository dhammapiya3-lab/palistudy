// 과(Skill) 상세 - 레슨 목록
import { useParams, useNavigate } from 'react-router-dom'

// 각 과별 레슨 데이터
const SKILL_DATA: Record<string, {
  title: string; icon: string; desc: string; source: string;
  lessons: { id: string; title: string; desc: string; route: string; status: 'done' | 'current' | 'locked' }[]
}> = {
  '1': {
    title: '알파벳/발음', icon: '🔤', desc: '빠알리어 문자와 발음부호',
    source: 'Dhammapada 1~3게',
    lessons: [
      { id: '1-1', title: '모음 (a ā i ī u ū e o)', desc: 'Dhp 1게로 배우는 단모음/장모음', route: '/learn/alphabet/vowels', status: 'done' },
      { id: '1-2', title: '자음 기초 (k~m)', desc: 'Dhp 1게의 자음 분석', route: '/learn/alphabet/consonants1', status: 'done' },
      { id: '1-3', title: '특수 발음부호 (ṃ ṅ ñ ṭ ḍ ṇ ḷ)', desc: 'Dhp 2게로 배우는 반설음/비음', route: '/learn/alphabet/special', status: 'current' },
      { id: '1-4', title: '유기음 (kh gh ch jh th dh ph bh)', desc: 'Dhp 3게 한국어 없는 발음 연습', route: '/learn/alphabet/aspirated', status: 'locked' },
      { id: '1-5', title: '종합 읽기 연습', desc: '1~3게 전체 소리내어 읽기', route: '/learn/alphabet/review', status: 'locked' },
    ],
  },
  '2': {
    title: '기초 단어', icon: '💬', desc: '핵심 100단어',
    source: 'Dhammapada 1~26게',
    lessons: [
      { id: '2-1', title: '삼보 (Buddha, Dhamma, Saṅgha)', desc: 'Dhp 190-192게 삼귀의문', route: '/learn/vocab/refuge', status: 'done' },
      { id: '2-2', title: '마음 (citta, mano, vedanā)', desc: 'Dhp 1-2게 마음 관련 단어', route: '/learn/vocab/mind', status: 'done' },
      { id: '2-3', title: '수사 (eka~dasa)', desc: 'Dhp 속 숫자 표현', route: '/learn/vocab/numbers', status: 'current' },
      { id: '2-4', title: '기본 동사 (gacchati, passati...)', desc: '경전 빈출 동사 20개', route: '/learn/vocab/verbs', status: 'locked' },
      { id: '2-5', title: '불변어 (ca, na, eva, hi)', desc: '접속사/부사', route: '/learn/vocab/particles', status: 'locked' },
    ],
  },
  '3': {
    title: '문장 구조', icon: '📝', desc: 'SOV 어순, 기초 문법',
    source: 'Dhammapada',
    lessons: [
      { id: '3-1', title: '주어-목적어-동사 (SOV)', desc: 'Dhp 1게 문장 구조 분석', route: '/learn/grammar/sov', status: 'done' },
      { id: '3-2', title: '주격과 대격 (-o, -aṃ)', desc: '누가(주격) 무엇을(대격)', route: '/learn/grammar/nom-acc', status: 'current' },
      { id: '3-3', title: '간단한 문장 만들기', desc: '단어 배열로 문장 구성', route: '/learn/grammar/compose', status: 'locked' },
    ],
  },
  '4': {
    title: '격변화', icon: '🔀', desc: '8격 체계',
    source: 'Itivuttaka',
    lessons: [
      { id: '4-1', title: '남성 -a 어간 8격', desc: 'buddha의 격변화표', route: '/learn/grammar/declension-a', status: 'current' },
      { id: '4-2', title: '여성 -ā 어간', desc: 'vedanā의 격변화', route: '/learn/grammar/declension-aa', status: 'locked' },
      { id: '4-3', title: '중성 -a 어간', desc: 'cittaṃ의 격변화', route: '/learn/grammar/declension-n', status: 'locked' },
    ],
  },
  '5': {
    title: '동사 활용', icon: '🏃', desc: '현재/과거/미래',
    source: 'Sutta Nipāta',
    lessons: [
      { id: '5-1', title: '현재시제 활용', desc: 'gacchati, passati, karoti', route: '/learn/grammar/present', status: 'current' },
      { id: '5-2', title: '과거시제', desc: 'agacchi, addasa', route: '/learn/grammar/past', status: 'locked' },
      { id: '5-3', title: '명령형과 원망형', desc: 'gaccha!, gaccheyya', route: '/learn/grammar/imperative', status: 'locked' },
    ],
  },
  '6': {
    title: '산디/합성어', icon: '🔗', desc: '연음 규칙, samāsa',
    source: 'Sutta Nipāta',
    lessons: [
      { id: '6-1', title: '모음 산디', desc: 'a+a→ā, a+i→e 규칙', route: '/learn/grammar/sandhi-vowel', status: 'current' },
      { id: '6-2', title: '자음 산디', desc: 'niggahīta 변화', route: '/learn/grammar/sandhi-cons', status: 'locked' },
      { id: '6-3', title: '합성어 (samāsa)', desc: 'kammadhāraya, tappurisa', route: '/learn/grammar/compound', status: 'locked' },
    ],
  },
  '7': {
    title: '경전 독해', icon: '📖', desc: '정형구/반복공식',
    source: 'SN · AN',
    lessons: [
      { id: '7-1', title: '"Evaṃ me sutaṃ" 공식', desc: '경전 서두 정형구 분석', route: '/learn/reading/evam', status: 'current' },
      { id: '7-2', title: 'SN 56.11 전법륜경', desc: '사성제 첫 설법 독해', route: '/learn/reading/sn56-11', status: 'locked' },
    ],
  },
  '8': {
    title: '원전 해석', icon: '📜', desc: '긴 경전 독해',
    source: 'MN · DN',
    lessons: [
      { id: '8-1', title: 'MN 10 념처경 서론', desc: '사념처의 도입부', route: '/learn/reading/mn10', status: 'locked' },
    ],
  },
  '9': {
    title: '주석서', icon: '📗', desc: 'Aṭṭhakathā 해석학',
    source: 'Aṭṭhakathā',
    lessons: [
      { id: '9-1', title: '주석서 문체 입문', desc: 'Buddhaghosa의 해석 방법', route: '/learn/reading/atthakatha', status: 'locked' },
    ],
  },
  '10': {
    title: '복주석서', icon: '📕', desc: 'Ṭīkā 논증 구조',
    source: 'Ṭīkā',
    lessons: [
      { id: '10-1', title: '복주석서 구조', desc: '주석서에 대한 주석', route: '/learn/reading/tika', status: 'locked' },
    ],
  },
}

export default function SkillDetail() {
  const { skillId } = useParams<{ skillId: string }>()
  const nav = useNavigate()
  const skill = skillId ? SKILL_DATA[skillId] : null

  if (!skill) return <div className="p-4">과를 찾을 수 없습니다.</div>

  return (
    <div className="px-4 pt-6 space-y-4">
      <button onClick={() => nav('/map')} className="text-sm" style={{ color: 'var(--color-primary)' }}>← 학습맵</button>

      {/* 과 헤더 */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{ backgroundColor: 'var(--color-primary)' }}>
          {skill.icon}
        </div>
        <div>
          <h1 className="text-xl font-bold">제{skillId}과: {skill.title}</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{skill.desc}</p>
          <p className="text-xs pali-text mt-1" style={{ color: 'var(--color-primary)' }}>📜 {skill.source}</p>
        </div>
      </div>

      {/* 레슨 목록 */}
      <div className="space-y-3">
        {skill.lessons.map((lesson, i) => {
          const isLocked = lesson.status === 'locked'
          const isCurrent = lesson.status === 'current'

          return (
            <button
              key={lesson.id}
              onClick={() => !isLocked && nav(lesson.route)}
              disabled={isLocked}
              className="w-full rounded-xl p-4 text-left transition-all active:scale-[0.98]"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: isCurrent ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                opacity: isLocked ? 0.5 : 1,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: lesson.status === 'done' ? 'var(--color-accent)' : isCurrent ? 'var(--color-primary)' : 'var(--color-border)' }}>
                  {lesson.status === 'done' ? '✓' : isLocked ? '🔒' : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{lesson.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{lesson.desc}</p>
                </div>
                {isCurrent && <span className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>▶</span>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
