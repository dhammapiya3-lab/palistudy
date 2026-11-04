// 1과: 나모땃사 — 세존께 경배 (text/제1과. 나모 땃사.txt 전문 기반)
import type { StepType } from './lesson-data-sn56-11'

const V1 = 'Namo tassa Bhagavato Arahato Sammāsambuddhassa.'
const V1Ko = '나모 땃사 바가와또 아라하또 삼마~삼붓닷사.'
const V1K = '저 세존, 아라한, 완전히 바르게 깨달은 분께 경배드립니다.'

export const LESSON_NAMO: StepType[] = [
  { type: 'intro', icon: '🙏', title: '나모땃사', subtitle: '세존께 경배',
    description: '모든 불교 의식·수행 전에 세 번 독송하는 경배문.\n\n세존(Bhagavā)의 세 가지 호칭으로 부처님을 예경합니다:\n① bhagavā (세존)\n② arahā (아라한)\n③ sammāsambuddha (완전히 깨달은 분)' },

  { type: 'teach', icon: '🙏', word: 'Namo', pronKo: '나모', meaning: '경배, 예경',
    grammar: '불변사 (감탄/경의)', baseForm: 'namo (√nam 절하다)',
    formNote: '√nam(절하다)에서 파생\n"고개를 숙임 = 경배"\n뒤에 여격 또는 속격이 오면 "~께 경배"',
    buddhism: '귀명(歸命)·예경. 모든 불교 예식의 시작.',
    verseLine: V1, verseLineKo: V1K, audio: true },

  { type: 'teach', icon: '👆', word: 'tassa', pronKo: '땃사', meaning: '그분께, 그분의',
    grammar: '대명사, 여격/속격 남성 단수', baseForm: 'ta- (그)',
    formNote: 'ta- → tassa: 남성 여격/속격\n"Namo tassa"의 tassa는 여격: "그분께 경배"\nMN10의 sattānaṃ(중생들의), nibbānassa(열반의)와 같은 -ssa 어미 패턴',
    verseLine: V1, verseLineKo: V1K, audio: true },

  { type: 'teach', icon: '✨', word: 'Bhagavato', pronKo: '바가와또', meaning: '세존께, 복덕 갖춘 분께',
    grammar: '남성명사, 여격/속격 단수', baseForm: 'bhagavant (복덕 갖춘)',
    formNote: 'bhagavant → bhagavato: -ant 어간 여격/속격\nbhaga(복덕) + -vant(가진) = 복덕을 가진 분\nMN10에서 bhagavā(주격)로 등장',
    buddhism: '세존(世尊). 부처님 10대 명호 중 하나.\n복(福) + 덕(德)을 갖춘 분.',
    verseLine: V1, verseLineKo: V1K, audio: true },

  { type: 'teach', icon: '🌟', word: 'Arahato', pronKo: '아라하또', meaning: '아라한께, 공양받을 만한 분께',
    grammar: '남성명사/형용사, 여격/속격 단수', baseForm: 'arahant (아라한)',
    formNote: 'arahant → arahato: -ant 어간 여격/속격\narahati(가치 있다) → arahant = "가치 있는 자, 공양받을 만한 자"',
    buddhism: '아라한(阿羅漢). 번뇌(kilesa)를 완전히 소멸한 분.\n불교 4과 중 최고. "응공(應供)" = 공양받을 가치가 있는 분.',
    verseLine: V1, verseLineKo: V1K, audio: true },

  { type: 'teach', icon: '☸️', word: 'Sammāsambuddhassa', pronKo: '삼마~삼붓닷사', meaning: '완전히 바르게 깨달은 분께',
    grammar: '복합어, 여격/속격 남성 단수', baseForm: 'sammāsambuddha',
    formNote: 'sammā(바르게) + saṃ(완전히) + buddha(깨달은) = 정등각자(正等覺者)\n-a 어간 여격/속격 -assa\n11과 MN10의 nibbānassa, ñāyassa와 같은 패턴',
    buddhism: '정등각자(正等覺者). 스승 없이 스스로 완전한 깨달음을 이룬 분.\n부처(buddha) 중에서도 최고의 분류 = sammāsambuddha.',
    verseLine: V1, verseLineKo: V1K, audio: true },

  { type: 'verse', pali: V1, pronKo: V1Ko, translation: V1K,
    highlight: ['Namo', 'tassa', 'Bhagavato', 'Arahato', 'Sammāsambuddhassa'],
    note: '🙏 수행·예식 전 3회 독송. 부처님의 세 가지 호칭으로 예경.' },

  { type: 'quiz', question: '"Namo"의 뜻은?',
    options: ['경배, 예경', '법, 가르침', '상가, 공동체', '계율'], answer: 0 },
  { type: 'quiz', question: '"sammāsambuddhassa"의 의미는?',
    options: ['번뇌를 소멸한 분', '법을 설하신 분', '완전히 바르게 깨달은 분', '오온을 소멸한 분'], answer: 2 },
  { type: 'quiz', question: '"Arahato"의 뜻은?',
    options: ['아라한께, 공양받을 만한 분께', '왕께', '스승께', '제자께'], answer: 0,
    hint: '√arahati = "가치 있다"' },
  { type: 'quiz', question: '여격 어미 -ssa / -ato 가 의미하는 것?',
    options: ['~께 (격)', '~로부터', '~안에서', '~과 함께'], answer: 0,
    hint: 'Namo는 "~께 경배" — 여격을 받음' },

  { type: 'speak', pali: V1, pronKo: V1Ko },

  { type: 'arrange', instruction: '빠알리 문장을 순서대로 배열하세요.',
    translation: V1K,
    blocks: ['tassa', 'Namo', 'Sammāsambuddhassa.', 'Bhagavato', 'Arahato'],
    correctOrder: [1, 0, 3, 4, 2] },
]
