// 0과: 자모와 발음 (빠알리 프라이머 1장, p.4~7)
// 8개 모음 + 33개 자음 = 41개 자모 + 발음규칙 (+ 더 알아보기: 자음 도표 · 8격 개요)
//
// ※ 처음 배우는 사람을 위해 순서를 바꿨다 (설명 → 듣고 고르기를 번갈아, 무거운 내용은 '더 알아보기').
//   단계 ID는 fixedId로 예전 것을 그대로 유지 → 메모 위치·문제 기록이 그대로 맞음.
//   예전 진도(단계 번호)는 lesson-00-order.ts의 표로 새 번호로 옮김. 순서를 바꾸면 그 표도 함께 고칠 것.
// ※ more: '더 알아보기' 묶음 — 평소에는 건너뛰고, 사용자가 열었을 때만 보여 줌
import type { StepWithoutId } from './types'

const MORE_CHART = '자음 전체 도표'
const MORE_PRACTICE = '발음 문제 더 풀기'
const MORE_VERSE = '전법륜경 첫 구절'
const MORE_CASES = '명사의 8격 미리 보기'

export const LESSON_00: StepWithoutId[] = [
  // ── 도입 ──
  {
    fixedId: 'lesson-00-intro-1',
    type: 'intro',
    title: '자모와 발음',
    subtitle: 'Akkharā ca Uccāraṇā',
    description:
      '빠알리어는 우리가 아는 로마자(a, b, c…)에\n작은 표시를 더해서 씁니다.\n모음 8개와 자음 33개, 모두 41글자예요.\n\n오늘은 소리를 듣고 고르면서 글자를 익히고,\n예경문 "Namo tassa…"를 읽어 봅니다.',
    icon: '🔤',
  },

  // ── 모음 (8개) ──
  {
    fixedId: 'lesson-00-teach-grammar-1',
    type: 'teach-grammar',
    title: '모음 — 짧은 소리 · 긴 소리 · e와 o',
    example:
      'a(아)   i(이)   u(우)\nā(아-)  ī(이-)  ū(우-)\ne(에-)  o(오-)',
    exampleKo: '짧은 모음 3 + 긴 모음 3 + e·o 2 = 8개',
    explanation:
      '• a, i, u — 짧게 (단모음)\n' +
      '• ā, ī, ū — 두 배쯤 길게 (장모음)\n' +
      '  글자 위의 가로줄(ā)이 "길게" 표시예요.\n' +
      '• e, o — 보통 길게. 뒤에 자음이 두 개 겹치면 짧게 (이중모음)\n' +
      '  ※ 이름은 "이중모음"이지만 소리는 "에-", "오-" 하나예요.\n\n' +
      '예) a(아) ↔ ā(아-),  i(이) ↔ ī(이-)',
  },

  // ── 단어로 모음 확인 ──
  {
    fixedId: 'lesson-00-teach-1',
    type: 'teach',
    word: 'Buddha',
    pronKo: '붓다',
    meaning: '깨달은 자',
    icon: '🙏',
    audio: true,
    grammar: '단모음 u, 이중자음 ddh',
    formNote: 'Bu(부) + ddha(다)\nu는 짧게, a는 짧게',
    buddhism:
      '경전에서 가장 많이 만나는 단어. \'진리를 깨달으신 분\'이라는 뜻.',
  },
  {
    fixedId: 'lesson-00-teach-2',
    type: 'teach',
    word: 'dhamma',
    pronKo: '담마',
    meaning: '법, 진리, 가르침',
    icon: '☸️',
    audio: true,
    grammar: '단모음 a, 이중자음 mm',
    formNote: 'dha(다) + mma(마)\n이중자음 앞 모음은 짧게',
    buddhism: '삼보(三寶)의 하나. 붓다의 가르침이자 우주의 법칙.',
  },
  {
    fixedId: 'lesson-00-teach-3',
    type: 'teach',
    word: 'deva',
    pronKo: '데-와',
    meaning: '천인, 신',
    icon: '✨',
    audio: true,
    grammar: '이중모음 e, 단자음 v',
    formNote: 'de(데-) + va(와)\ne는 단자음 v 앞이라 길게 발음\n(e·o는 본래 길고, 이중자음 앞에서만 짧음)',
  },

  // ── 듣고 고르기 ① ──
  {
    fixedId: 'lesson-00-match-listen-2',
    type: 'match-listen',
    instruction: '듣고 맞는 낱말을 고르세요',
    word: 'deva',
    pronKo: '데-와',
    options: ['Buddha (깨달은 자)', 'dhamma (법)', 'deva (천인)', 'loka (세상)'],
    answer: 2,
  },

  // ── 퀴즈: 모음 ──
  {
    fixedId: 'lesson-00-quiz-2',
    type: 'quiz',
    question: '"ā"는 어떻게 발음하나요?',
    options: ['짧은 "아"', '긴 "아-"', '"에"', '"오"'],
    answer: 1,
    hint: '장모음은 단모음의 약 2배 길이',
    explain: 'ā처럼 글자 위에 가로줄이 있으면 길게 — "아-"',
  },
  {
    fixedId: 'lesson-00-quiz-3',
    type: 'quiz',
    question: '이중모음에 해당하는 것은?',
    options: ['a, i', 'ā, ī', 'e, o', 'u, ū'],
    answer: 2,
    hint: '기본은 길게, 이중자음 앞에서 짧게 발음하는 모음 2개',
    explain: 'e와 o를 "이중모음"이라 부르지만, 소리는 "에-", "오-" 하나예요.',
  },

  // ── 자음 — 목구멍 쪽 소리 ──
  {
    fixedId: 'lesson-00-teach-grammar-2',
    type: 'teach-grammar',
    title: '자음 ① 목구멍 쪽 소리 (후음 喉音)',
    example: 'ka(까)  kha(카)  ga(가)\ngha(그하)  ṅa(응아)',
    exampleKo: '자음은 다섯 글자씩 한 줄 — 그 첫 줄',
    explanation:
      '혀 뒤쪽을 입천장 안쪽(여린입천장)에 대고 내는 소리예요.\n' +
      '(전통 이름은 kaṇṭhaja, "목구멍소리")\n\n' +
      '줄마다 같은 순서로 소리가 바뀝니다:\n' +
      '① 숨 없이 단단하게  ② 숨을 세게  ③ 부드럽게(목이 울림)  ④ 부드럽게 + 숨  ⑤ 콧소리\n\n' +
      '• ka(까) — 된소리 "까"\n' +
      '• kha(카) — 숨을 세게 "카" (h는 "숨을 섞으라"는 표시)\n' +
      '• ga(가) — 부드러운 "가"\n' +
      '• gha(그하) — "가"에 숨을 섞어서\n' +
      '• ṅa(응아) — 콧소리 (영어 sing의 ng)\n\n' +
      '(①~⑤의 문법 이름: 무성무기 · 무성대기 · 유성무기 · 유성대기 · 비음)',
  },

  // ── 자음 — 입천장 소리 ──
  {
    fixedId: 'lesson-00-teach-grammar-3',
    type: 'teach-grammar',
    title: '자음 ② 입천장 소리 (구개음 口蓋音)',
    example: 'ca(짜)  cha(차)  ja(자)\njha(즈하)  ña(냐)',
    exampleKo: '혀를 단단한 입천장에 대고 내는 소리',
    explanation:
      '• ca(짜) — 된소리 "짜" (영어 c의 "ㅋ" 소리가 아니에요)\n' +
      '• cha(차) — 숨을 세게 "차"\n' +
      '• ja(자) — 부드러운 "자"\n' +
      '• jha(즈하) — "자"에 숨을 섞어서\n' +
      '• ña(냐) — 콧소리 "냐"',
  },

  // ── 듣고 고르기 ② ──
  {
    fixedId: 'lesson-00-match-listen-3',
    type: 'match-listen',
    instruction: '듣고 맞는 낱말을 고르세요',
    word: 'kāya',
    pronKo: '까-야',
    options: ['kāya (몸)', 'citta (마음)', 'gacchati (간다)', 'khetta (밭)'],
    answer: 0,
  },

  // ── 자음 — 혀를 말아 내는 소리 ──
  {
    fixedId: 'lesson-00-teach-grammar-4',
    type: 'teach-grammar',
    title: '자음 ③ 혀를 말아 내는 소리 (반설음 反舌音)',
    example: 'ṭa(따)  ṭha(타)  ḍa(다)\nḍha(드하)  ṇa(나)',
    exampleKo: '글자 아래에 점(.)이 있으면 혀를 말아요',
    explanation:
      '혀끝을 뒤로 살짝 말아 입천장에 대고 내는 소리예요.\n\n' +
      '• ṭa(따) — 혀를 말아서 "따"\n' +
      '• ṭha(타) — 혀를 말아서 "타"\n' +
      '• ḍa(다) — 혀를 말아서 "다"\n' +
      '• ḍha(드하) — ḍa에 숨을 섞어서\n' +
      '• ṇa(나) — 혀를 말아서 "나"\n\n' +
      '⚠️ ṭ, ḍ, ṇ 아래의 점이 "혀를 말아라" 표시입니다.',
  },

  // ── 자음 — 이에 대는 소리 ──
  {
    fixedId: 'lesson-00-teach-grammar-5',
    type: 'teach-grammar',
    title: '자음 ④ 이에 대는 소리 (치음 齒音)',
    example: 'ta(따)  tha(타)  da(다)\ndha(드하)  na(나)',
    exampleKo: '혀끝을 윗니 뒤에 대고 내는 소리',
    explanation:
      '• ta(따) — 된소리 "따"\n' +
      '• tha(타) — 숨을 세게 "타" (영어 th 소리가 아니에요)\n' +
      '• da(다) — 부드러운 "다"\n' +
      '• dha(드하) — "다"에 숨을 섞어서\n' +
      '• na(나) — "나"\n\n' +
      '점 없는 t·d·n은 이에 대고, 점 있는 ṭ·ḍ·ṇ은 혀를 말아서.',
  },

  // ── 자음 — 입술 소리 ──
  {
    fixedId: 'lesson-00-teach-grammar-6',
    type: 'teach-grammar',
    title: '자음 ⑤ 입술 소리 (순음 脣音)',
    example: 'pa(빠)  pha(파)  ba(바)\nbha(브하)  ma(마)',
    exampleKo: '두 입술을 모아서 내는 소리',
    explanation:
      '• pa(빠) — 된소리 "빠"\n' +
      '• pha(파) — 숨을 세게 "파" (영어 f 소리가 아니에요)\n' +
      '• ba(바) — 부드러운 "바"\n' +
      '• bha(브하) — "바"에 숨을 섞어서\n' +
      '• ma(마) — "마"',
  },

  // ── 자음 — 나머지 8개 ──
  {
    fixedId: 'lesson-00-teach-grammar-7',
    type: 'teach-grammar',
    title: '자음 ⑥ 나머지 8개',
    example:
      'ya(야)  ra(라)  la(라)  va(와)\n' +
      'sa(싸)  ha(하)  ḷa(ㄹ라)  ṃ(받침 ㅇ·ㅁ)',
    exampleKo: 'ya·ra·la·va + sa + ha + ḷa + ṃ = 8개',
    explanation:
      '• ya, ra, la, va — 모음처럼 부드러운 자음 (반모음)\n' +
      '  va는 "와"에 가까워요.\n' +
      '• sa(싸) — 혀끝을 윗니 뒤에 가까이 대고 내는 "ㅆ" (치찰음)\n' +
      '  실제 소리는 \'싸\'에 가깝지만, 한글 발음 표기는 \'사\'로 적어요 (예: sīla → 실-라).\n' +
      '• ha(하) — 숨소리 (기음)\n' +
      '• ḷa(ㄹ라) — 혀를 말아서 내는 la\n' +
      '• ṃ — 콧소리로 끝맺는 받침 (억제음, Anusvāra · niggahīta)\n\n' +
      'ṃ은 낱말 끝에 자주 나와요:\n' +
      '예) dhammaṃ(담망), Buddhaṃ(붓당), Ekaṃ(에깡)',
  },

  // ── (더 알아보기) 자음 전체 도표 ──
  {
    fixedId: 'lesson-00-teach-grammar-8',
    more: MORE_CHART,
    type: 'teach-grammar',
    title: '자음 전체 도표 (5×5 + 기타 8 = 33개)',
    example:
      '        무성무기  무성대기  유성무기  유성대기  비음\n' +
      '후  음: ka(까)   kha(카)   ga(가)   gha(그하)  ṅa(응아)\n' +
      '구개음: ca(짜)   cha(차)   ja(자)   jha(즈하)  ña(냐)\n' +
      '반설음: ṭa(따)   ṭha(타)   ḍa(다)   ḍha(드하)  ṇa(나)\n' +
      '치  음: ta(따)   tha(타)   da(다)   dha(드하)  na(나)\n' +
      '순  음: pa(빠)   pha(파)   ba(바)   bha(브하)  ma(마)\n' +
      '─────────────────────────\n' +
      '반모음: ya  ra  la  va\n' +
      '치찰음: sa | 기음: ha | 억제음: ṃ | ḷa',
    exampleKo: '25(5×5) + 반모음4 + 치찰음1 + 기음1 + 억제음1 + ḷa1 = 33',
    explanation:
      '각 행(후음~순음)은 발음 위치가 같고,\n' +
      '각 열(무성무기~비음)은 발음 방법이 같습니다.\n\n' +
      '무성 = 성대 떨림 없음 / 유성 = 성대 떨림\n' +
      '무기 = 기식(숨) 없음 / 대기 = 기식 있음\n' +
      '비음 = 코로 빠져나가는 소리',
  },

  // ── 듣고 고르기 ③ ──
  {
    fixedId: 'lesson-00-match-listen-4',
    type: 'match-listen',
    instruction: '듣고 맞는 낱말을 고르세요',
    word: 'paññā',
    pronKo: '빤냐-',
    options: ['paññā (지혜)', 'sīla (계)', 'dāna (보시)', 'bhikkhu (비구)'],
    answer: 0,
  },

  // ── 발음 규칙 ──
  {
    fixedId: 'lesson-00-teach-grammar-9',
    type: 'teach-grammar',
    title: '핵심 발음 규칙',
    example:
      '겹자음 앞 → 짧게:  mettā(멧따-), khetta(켓따)\n' +
      '                  koṭṭha(콧타), sotthi(솟티)\n\n' +
      'e·o + 자음 하나 → 길게: deva(데-와), senā(세-나-)\n' +
      '                     loka(로-까), odana(오-다나)',
    exampleKo: 'e·o는 보통 길게 / 자음이 두 개 겹친 앞에서는 짧게',
    explanation:
      '이것만 알면 경전 발음이 정확해집니다:\n\n' +
      '1. 자음이 두 개 겹치면(tt, kk, ss, ddh 등) 그 앞 모음은 짧게 (이중자음 앞)\n' +
      '   예) mettā, khetta, koṭṭha, sotthi\n\n' +
      '2. e, o는 본래 긴 소리 → 자음 하나 앞에서는 길게\n' +
      '   예) deva, senā, loka, odana\n' +
      '   (deva의 -va, loka의 -ka에 있는 a는 그대로 짧음)\n\n' +
      '3. a, i, u는 늘 짧게\n' +
      '4. ā, ī, ū는 늘 길게\n' +
      '   예) deva 데-와 / mettā 멧따-',
  },

  // ── 퀴즈: 발음규칙 ──
  {
    fixedId: 'lesson-00-quiz-4',
    type: 'quiz',
    question: '"mettā"에서 e는 길게? 짧게?',
    options: ['길게 (e는 본래 장모음)', '짧게 (이중자음 tt 앞)'],
    answer: 1,
    hint: '이중자음 앞 모음 → 짧게',
    explain: 'mettā는 e 뒤에 tt가 겹쳐 있어서 짧게 "멧"이 됩니다.',
  },
  {
    fixedId: 'lesson-00-quiz-5',
    type: 'quiz',
    question: '"deva"에서 e는 길게? 짧게?',
    options: ['길게 (단자음 v 앞)', '짧게 (이중자음 앞)'],
    answer: 0,
    hint: 'e, o는 본래 길고, 이중자음 앞에서만 짧게',
    explain: 'deva는 e 뒤에 v 하나뿐이라 본래대로 길게 "데-"예요.',
  },

  // ── 경전에서 확인: 예경문 ──
  {
    fixedId: 'lesson-00-verse-2',
    type: 'verse',
    pali: 'Namo tassa bhagavato arahato sammāsambuddhassa.',
    pronKo: '나모- 땃사 바가와또- 아라하또- 삼마-삼붓닷사',
    translation:
      '그 세존, 아라한, 정등각에게 귀의합니다.',
    highlight: ['Namo', 'bhagavato', 'arahato', 'sammāsambuddhassa'],
    note:
      '예경문(vandanā). 삼귀의 앞에 3번 읊습니다.\n' +
      '• Namo — 귀의, 예경 (불변화사처럼 쓰임; 대상은 여격)\n' +
      '• tassa — "그분께" (여격; 형태는 소유격과 동일)\n' +
      '• bhagavato — 세존께 (여격; 형태는 소유격과 동일)\n' +
      '• arahato — 아라한께 (여격; 형태는 소유격과 동일)\n' +
      '• sammāsambuddhassa — 정등각께 (여격; 형태는 소유격과 동일)\n' +
      '• 이중자음 mm, ddh 앞 모음은 짧게!',
  },

  // ── 듣기 ──
  {
    fixedId: 'lesson-00-match-listen-1',
    type: 'match-listen',
    instruction: '듣고 맞는 단어를 고르세요',
    word: 'bhagavā',
    pronKo: '바가와-',
    options: [
      'bhagavā (세존)',
      'dhamma (법)',
      'buddha (붓다)',
      'saṅgha (승가)',
    ],
    answer: 0,
  },

  // ── 쓰기 (쓰기 모드를 켰을 때만) ──
  {
    fixedId: 'lesson-00-writing-2',
    type: 'writing',
    instruction: '예경문 첫 단어를 써보세요',
    meaning: '귀의합니다',
    pronKo: '나모-',
    answer: 'Namo',
    hint: '삼귀의 앞에 3번 읊는 예경문(vandanā)의 첫 단어',
  },

  // ── 따라 읽기 ──
  {
    fixedId: 'lesson-00-speak-1',
    type: 'speak',
    pali: 'Namo tassa bhagavato arahato sammāsambuddhassa',
    pronKo: '나모- 땃사 바가와또- 아라하또- 삼마-삼붓닷사',
  },

  // ════════ 더 알아보기 (평소에는 건너뜀 — 과 끝 화면·목차에서 열 수 있음) ════════

  // ── 발음 문제 더 풀기 ──
  {
    fixedId: 'lesson-00-quiz-1',
    more: MORE_PRACTICE,
    type: 'quiz',
    question: '빠알리어 모음은 총 몇 개인가요?',
    options: ['6개', '8개', '10개', '5개'],
    answer: 1,
    explain: 'a·i·u(짧은 모음) + ā·ī·ū(긴 모음) + e·o = 8개',
  },
  {
    fixedId: 'lesson-00-quiz-6',
    more: MORE_PRACTICE,
    type: 'quiz',
    question: '다음 중 이중자음 앞이라 짧게 발음하는 것은?',
    options: ['deva(데-와)', 'loka(로-까)', 'khetta(켓따)', 'senā(세-나-)'],
    answer: 2,
    hint: 'kh + e + tt → 이중자음 tt 앞의 e',
    explain: 'khetta는 e 뒤에 tt가 겹쳐서 짧게 "켓"이 됩니다. 나머지는 뒤에 자음이 하나뿐이라 길게 읽어요.',
  },

  // ── 전법륜경 첫 구절 ──
  {
    fixedId: 'lesson-00-verse-1',
    more: MORE_VERSE,
    type: 'verse',
    pali: 'Ekaṃ samayaṃ bhagavā bārāṇasiyaṃ viharati isipatane migadāye.',
    pronKo:
      '에-깡 사마양 바가와- 바-라-나시양 위하라띠 이시빠따네- 미가다-예-',
    translation:
      '한때 세존께서 바라나시의 이시빠따나 녹야원에 머무셨다.',
    highlight: ['Ekaṃ', 'bhagavā', 'bārāṇasiyaṃ', 'viharati'],
    note:
      '전법륜경(SN 56.11) 첫 구절.\n' +
      '• Ekaṃ — ṃ(억제음)으로 끝남 (목적격)\n' +
      '• bhagavā — ā(장모음) 주격\n' +
      '• bārāṇasiyaṃ — 처소격 (~에)\n' +
      '• viharati — 동사 "머무르다" (현재 3인칭 단수)',
  },
  {
    fixedId: 'lesson-00-writing-1',
    more: MORE_VERSE,
    type: 'writing',
    instruction: '경전 첫 단어를 써보세요',
    meaning: '하나의 (어떤)',
    pronKo: '에-깡',
    answer: 'Ekaṃ',
    hint: '전법륜경 첫 단어. ṃ(억제음)으로 끝남',
  },
  {
    fixedId: 'lesson-00-speak-2',
    more: MORE_VERSE,
    type: 'speak',
    pali: 'Ekaṃ samayaṃ bhagavā bārāṇasiyaṃ viharati isipatane migadāye',
    pronKo:
      '에-깡 사마양 바가와- 바-라-나시양 위하라띠 이시빠따네- 미가다-예-',
  },

  // ── 명사의 8격 미리 보기 ──
  {
    fixedId: 'lesson-00-teach-grammar-10',
    more: MORE_CASES,
    type: 'teach-grammar',
    title: '명사의 8격(八格) 개요',
    example:
      '빠알리어는 3성(남·여·중) × 2수(단·복) × 8격',
    exampleKo: '격변화를 알아야 경전 문장을 읽을 수 있습니다',
    explanation:
      '낱말 끝이 바뀌면서 "~은/는, ~을/를, ~의"처럼 문장 속 역할이 정해져요.\n' +
      '1과부터 한 격씩 배우니 지금 외우지 않아도 괜찮아요.\n\n' +
      '1. 주격 (N.)  : ~은, ~는, ~이, ~가\n' +
      '2. 목적격(Ac.) : ~을, ~를, ~으로(방향)\n' +
      '3. 도구격 (Ins.) : ~와 함께, ~에 의해, ~(으)로\n' +
      '4. 여격 (D.)  : ~에게, ~을 위하여\n' +
      '5. 탈격 (Abl.) : ~로부터, ~때문에\n' +
      '6. 소유격(G.)  : ~의\n' +
      '7. 처소격(L.)  : ~에(시간·장소), ~가운데\n' +
      '8. 호격 (V.)  : 감탄, 호칭',
  },
  {
    fixedId: 'lesson-00-teach-grammar-11',
    more: MORE_CASES,
    type: 'teach-grammar',
    title: '8격 상세 해석 (p.6~7)',
    example:
      '주격(N.)   ~은, 는, 이, 가\n' +
      '목적격(Ac.) ~을, ~를, ~으로(방향), ~에게\n' +
      '도구격(Ins.)  ~와 함께, ~에 의해, ~(으)로\n' +
      '여격(D.)   ~에게, ~을 위하여, ~를 목적으로\n' +
      '탈격(Abl.)  ~로부터, ~때문에\n' +
      '소유격(G.)  ~의, ~을 위하여\n' +
      '처소격(L.)  ~에, ~가운데, ~관하여\n' +
      '호격(V.)   감탄, 호칭',
    exampleKo: '교재 p.6~7의 격 해석 전체',
    explanation:
      '주격(N.): 문장의 주어. "~은, ~는, ~이, ~가"\n\n' +
      '목적격(Ac.): ~을, ~를. 방향(~으로, 동작동사와 사용),\n' +
      '  ~에게(사람, 목적격 요구 동사), 거리·시간 길이\n\n' +
      '도구격(Ins.): ~와 함께(동행), ~를 지닌(소유),\n' +
      '  ~때문에, ~로(방법·경로: maggena 길로), ~에 의해(수단),\n' +
      '  ~를 타고(교통), ~에(시간), ~없이(분리)\n\n' +
      '여격(D.): ~에게, ~을 위하여, ~를 목적으로\n\n' +
      '탈격(Abl.): ~로부터(방향·기원·이유), ~때문에\n\n' +
      '소유격(G.): ~의(소유), ~을 위하여 (여격과 유사)\n\n' +
      '처소격(L.): ~에(시간·장소), ~가운데(최상급),\n' +
      '  ~관하여, ~경우에, ~관점에서\n\n' +
      '호격(V.): 감탄이나 사람, 호칭 등을 부를 때',
  },
  {
    fixedId: 'lesson-00-quiz-7',
    more: MORE_CASES,
    type: 'quiz',
    question: '"~로부터, ~때문에"를 나타내는 격은?',
    options: ['도구격(Ins.)', '여격(D.)', '탈격(Abl.)', '처소격(L.)'],
    answer: 2,
    explain: '탈격(Abl.) — "~로부터, ~때문에". 4과에서 자세히 배워요.',
  },
  {
    fixedId: 'lesson-00-quiz-8',
    more: MORE_CASES,
    type: 'quiz',
    question: '"~에(시간, 장소), ~가운데"를 나타내는 격은?',
    options: ['주격(N.)', '목적격(Ac.)', '소유격(G.)', '처소격(L.)'],
    answer: 3,
    explain: '처소격(L.) — "~에, ~가운데". 7과에서 자세히 배워요.',
  },
  {
    fixedId: 'lesson-00-quiz-9',
    more: MORE_CASES,
    type: 'quiz',
    question: '빠알리어 명사의 격은 총 몇 가지인가요?',
    options: ['4격', '6격', '8격', '10격'],
    answer: 2,
    hint: '주격·목적격·도구격·여격·탈격·소유격·처소격·호격',
    explain: '주격·목적격·도구격·여격·탈격·소유격·처소격·호격 — 모두 8가지예요.',
  },
]
