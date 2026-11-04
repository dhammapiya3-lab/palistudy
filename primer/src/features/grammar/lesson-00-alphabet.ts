// 0과: 자모와 발음 (빠알리 프라이머 1장, p.4~7)
// 8개 모음 + 33개 자음 = 41개 자모 + 발음규칙 + 8격 개요
import type { StepWithoutId } from './types'

export const LESSON_00: StepWithoutId[] = [
  // ── 도입 ──
  {
    type: 'intro',
    title: '자모와 발음',
    subtitle: 'Akkharā ca Uccāraṇā',
    description:
      '빠알리어는 8개의 모음과 33개의 자음,\n총 41개의 자모로 구성됩니다.\n\n경전을 읽기 위한 첫 걸음입니다.',
    icon: '🔤',
  },

  // ── 모음 (8개) ──
  {
    type: 'teach-grammar',
    title: '모음 — 단모음 · 장모음 · 이중모음',
    example:
      '단모음:  a(아)   i(이)   u(우)\n장모음:  ā(아-)  ī(이-)  ū(우-)\n이중모음: e(에)   o(오)',
    exampleKo: '단모음 3 + 장모음 3 + 이중모음 2 = 8개',
    explanation:
      '• 단모음 a, i, u — 짧게 발음\n' +
      '• 장모음 ā, ī, ū — 단모음의 약 2배 길이\n' +
      '• 이중모음 e, o — 중간 정도 길이\n\n' +
      '⚠️ 장모음 위의 가로줄(macron)이 길이 표시입니다.\n' +
      '예) a(아) vs ā(아-), i(이) vs ī(이-)',
  },

  // ── 단어로 모음 확인 ──
  {
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
    type: 'teach',
    word: 'deva',
    pronKo: '데-와',
    meaning: '천인, 신',
    icon: '✨',
    audio: true,
    grammar: '이중모음 e, 단자음 v',
    formNote: 'de(데) + va(와)\n단자음 뒤 모음 e는 길게 발음',
  },

  // ── 자음 (33개) — 후음 ──
  {
    type: 'teach-grammar',
    title: '자음 ① 후음 (喉音, 목구멍소리)',
    example:
      '       무성무기  무성대기  유성무기  유성대기  비음\n' +
      '후음:  ka(까)   kha(카)   ga(가)   gha(그하)  ṅa(응아)',
    exampleKo: '5행 × 5열 자음표의 첫 번째 행',
    explanation:
      '목구멍(후두)에서 나는 소리\n\n' +
      '• ka(까) — 한국어 "가"의 된소리\n' +
      '• kha(카) — 거센소리 (기식 있음)\n' +
      '• ga(가) — 한국어 "가"\n' +
      '• gha(그하/가) — ga에 기식 추가\n' +
      '• ṅa(응아) — 비음 (영어 sing의 ng)',
  },

  // ── 자음 — 구개음 ──
  {
    type: 'teach-grammar',
    title: '자음 ② 구개음 (口蓋音, 입천장소리)',
    example:
      '       무성무기  무성대기  유성무기  유성대기  비음\n' +
      '구개음: ca(짜)   cha(차)   ja(자)   jha(즈하)  ña(냐)',
    exampleKo: '5행 × 5열 자음표의 두 번째 행',
    explanation:
      '입천장(경구개)에 혀를 대고 내는 소리\n\n' +
      '• ca(짜) — 한국어 "자"의 된소리\n' +
      '• cha(차) — 거센소리\n' +
      '• ja(자) — 한국어 "자"\n' +
      '• jha(즈하/자) — ja에 기식 추가\n' +
      '• ña(냐) — 비음 (한국어 "냐")',
  },

  // ── 자음 — 반설음 ──
  {
    type: 'teach-grammar',
    title: '자음 ③ 반설음 (反舌音, 혀 말아서)',
    example:
      '       무성무기  무성대기  유성무기  유성대기  비음\n' +
      '반설음: ṭa(따)   ṭha(타)   ḍa(다)   ḍha(드하)  ṇa(나)',
    exampleKo: '점(.)이 아래 붙은 글자 = 반설음',
    explanation:
      '혀를 뒤로 말아서 입천장에 대고 내는 소리\n\n' +
      '• ṭa(따) — 혀를 말아서 "따"\n' +
      '• ṭha(타) — 혀를 말아서 "타"\n' +
      '• ḍa(다) — 혀를 말아서 "다"\n' +
      '• ḍha(드하/다) — ḍa에 기식 추가\n' +
      '• ṇa(나) — 혀를 말아서 "나"\n\n' +
      '⚠️ ṭ, ḍ, ṇ 아래 점(dot)이 반설음 표시입니다.',
  },

  // ── 자음 — 치음 ──
  {
    type: 'teach-grammar',
    title: '자음 ④ 치음 (齒音, 이소리)',
    example:
      '       무성무기  무성대기  유성무기  유성대기  비음\n' +
      '치음:  ta(따)   tha(타)   da(다)   dha(드하)  na(나)',
    exampleKo: '윗니 뒤에 혀를 대고 내는 소리',
    explanation:
      '윗니 뒤에 혀끝을 대고 내는 소리\n\n' +
      '• ta(따) — 한국어 "다"의 된소리\n' +
      '• tha(타) — 거센소리\n' +
      '• da(다) — 한국어 "다"\n' +
      '• dha(드하/다) — da에 기식 추가\n' +
      '• na(나) — 한국어 "나"\n\n' +
      '치음 t/d vs 반설음 ṭ/ḍ:\n' +
      '반설음은 혀를 말아서, 치음은 이에 대고.',
  },

  // ── 자음 — 순음 ──
  {
    type: 'teach-grammar',
    title: '자음 ⑤ 순음 (脣音, 입술소리)',
    example:
      '       무성무기  무성대기  유성무기  유성대기  비음\n' +
      '순음:  pa(빠)   pha(파)   ba(바)   bha(브하)  ma(마)',
    exampleKo: '두 입술을 모아서 내는 소리',
    explanation:
      '두 입술을 모아서 내는 소리\n\n' +
      '• pa(빠) — 한국어 "바"의 된소리\n' +
      '• pha(파) — 거센소리\n' +
      '• ba(바) — 한국어 "바"\n' +
      '• bha(브하/바) — ba에 기식 추가\n' +
      '• ma(마) — 한국어 "마"',
  },

  // ── 자음 — 기타(반모음, 치찰음, 기음, 억제음) ──
  {
    type: 'teach-grammar',
    title: '자음 ⑥ 반모음 · 치찰음 · 기음 · 억제음',
    example:
      '반모음:  ya(야)  ra(라)  la(라)  va(와)\n' +
      '치찰음:  sa(싸)\n' +
      '기  음:  ha(하)\n' +
      '억제음:  ṃ (아누스와라, ㅁ/응)',
    exampleKo: '반모음 4 + 치찰음 1 + 기음 1 + 억제음 1 = 기타 7',
    explanation:
      '반모음: 모음처럼 부드럽게 나는 자음\n' +
      '• ya(야), ra(라), la/ḷa(라), va(와)\n\n' +
      '치찰음: sa(싸) — 치아 사이 마찰음\n' +
      '기음: ha(하) — 목에서 나는 숨소리\n' +
      '억제음: ṃ (Anusvāra) — 비음으로 끝맺음\n\n' +
      'ṃ은 단어 끝에 자주 등장합니다:\n' +
      '예) dhammaṃ(담망), Buddhaṃ(붓당), Ekaṃ(에깡)',
  },

  // ── 자음 전체 요약 도표 ──
  {
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
      '치찰음: sa | 기음: ha | 억제음: ṃ',
    exampleKo: '25(5×5) + 반모음4 + 치찰음1 + 기음1 + 억제음1 + la = 33',
    explanation:
      '각 행(후음~순음)은 발음 위치가 같고,\n' +
      '각 열(무성무기~비음)은 발음 방법이 같습니다.\n\n' +
      '무성 = 성대 떨림 없음 / 유성 = 성대 떨림\n' +
      '무기 = 기식(숨) 없음 / 대기 = 기식 있음\n' +
      '비음 = 코로 빠져나가는 소리',
  },

  // ── 발음 규칙 ──
  {
    type: 'teach-grammar',
    title: '핵심 발음 규칙',
    example:
      '이중자음 앞 → 짧게:  mettā(멧따-), khetta(켓따)\n' +
      '                     koṭṭha(콧타), sotthi(솟티)\n\n' +
      '단자음 뒤 → 길게:   deva(데-와), senā(세-나-)\n' +
      '                     loka(로-까), odana(오-다나)',
    exampleKo: '복자음(이중자음) 앞: 짧게 / 단자음 뒤: 길게',
    explanation:
      '이 규칙을 알면 경전 발음이 정확해집니다:\n\n' +
      '1. 이중자음(tt, kk, ss 등) 앞 모음 → 짧게\n' +
      '   예) mettā, khetta, koṭṭha, sotthi\n\n' +
      '2. 단자음 뒤 모음 → 길게\n' +
      '   예) deva, senā, loka, odana\n\n' +
      '3. ā, ī, ū는 항상 길게 발음\n' +
      '4. e, o는 중간 정도 길이',
  },

  // ── 8격(八格) 개요 ──
  {
    type: 'teach-grammar',
    title: '명사의 8격(八格) 개요',
    example:
      '빠알리어는 3성(남·여·중) × 2수(단·복) × 8격',
    exampleKo: '격변화를 알아야 경전 문장을 읽을 수 있습니다',
    explanation:
      '1. 주격 (N.)  : ~은, ~는, ~이, ~가\n' +
      '2. 목적격(Ac.) : ~을, ~를, ~으로(방향)\n' +
      '3. 도구격 (Ins.) : ~와 함께, ~에 의해, ~(으)로\n' +
      '4. 여격 (D.)  : ~에게, ~을 위하여\n' +
      '5. 탈격 (Abl.) : ~로부터, ~때문에\n' +
      '6. 소유격(G.)  : ~의\n' +
      '7. 처소격(L.)  : ~에(시간·장소), ~가운데\n' +
      '8. 호격 (V.)  : 감탄, 호칭',
  },

  // ── 8격 상세 설명 ──
  {
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
      '  ~때문에, ~로(방법·방향), ~에 의해(수단),\n' +
      '  ~를 타고(교통), ~에(시간), ~없이(분리)\n\n' +
      '여격(D.): ~에게, ~을 위하여, ~를 목적으로\n\n' +
      '탈격(Abl.): ~로부터(방향·기원·이유), ~때문에\n\n' +
      '소유격(G.): ~의(소유), ~을 위하여 (여격과 유사)\n\n' +
      '처소격(L.): ~에(시간·장소), ~가운데(최상급),\n' +
      '  ~관하여, ~경우에, ~관점에서\n\n' +
      '호격(V.): 감탄이나 사람, 호칭 등을 부를 때',
  },

  // ── 경전에서 확인 1 ──
  {
    type: 'verse',
    pali: 'Ekaṃ samayaṃ bhagavā bārāṇasiyaṃ viharati isipatane migadāye.',
    pronKo:
      '에깡 사마양 바가와- 바-라-나시양 위하라띠 이시빠따네 미가다-예',
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

  // ── 경전에서 확인 2 ──
  {
    type: 'verse',
    pali: 'Namo tassa bhagavato arahato sammāsambuddhassa.',
    pronKo: '나모 땃사 바가와또 아라하또 삼마-삼붓닷사',
    translation:
      '그 세존, 아라한, 정등각에게 귀의합니다.',
    highlight: ['Namo', 'bhagavato', 'arahato', 'sammāsambuddhassa'],
    note:
      '삼귀의 시작 구절. 모든 경전 낭송 전에 3번 읊습니다.\n' +
      '• Namo — 귀의 (목적격/감탄)\n' +
      '• tassa — "그"의 여격/소유격\n' +
      '• bhagavato — 세존의 (소유격)\n' +
      '• sammāsambuddhassa — 정등각의 (소유격)\n' +
      '• 이중자음 mm, ddh 앞 모음은 짧게!',
  },

  // ── 퀴즈: 모음 ──
  {
    type: 'quiz',
    question: '빠알리어 모음은 총 몇 개인가요?',
    options: ['6개', '8개', '10개', '5개'],
    answer: 1,
  },
  {
    type: 'quiz',
    question: '"ā"는 어떻게 발음하나요?',
    options: ['짧은 "아"', '긴 "아-"', '"에"', '"오"'],
    answer: 1,
    hint: '장모음은 단모음의 약 2배 길이',
  },
  {
    type: 'quiz',
    question: '이중모음에 해당하는 것은?',
    options: ['a, i', 'ā, ī', 'e, o', 'u, ū'],
    answer: 2,
    hint: '중간 정도 길이로 발음하는 모음 2개',
  },

  // ── 퀴즈: 발음규칙 ──
  {
    type: 'quiz',
    question: '"mettā"에서 e는 길게? 짧게?',
    options: ['길게 (단자음 뒤)', '짧게 (이중자음 tt 앞)'],
    answer: 1,
    hint: '이중자음 앞 모음 → 짧게',
  },
  {
    type: 'quiz',
    question: '"deva"에서 e는 길게? 짧게?',
    options: ['길게 (단자음 v 뒤)', '짧게 (이중자음 앞)'],
    answer: 0,
    hint: '단자음 뒤 모음 → 길게',
  },
  {
    type: 'quiz',
    question: '다음 중 이중자음 앞이라 짧게 발음하는 것은?',
    options: ['deva(데-와)', 'loka(로-까)', 'khetta(켓따)', 'senā(세-나-)'],
    answer: 2,
    hint: 'kh + e + tt → 이중자음 tt 앞의 e',
  },

  // ── 퀴즈: 8격 ──
  {
    type: 'quiz',
    question: '"~로부터, ~때문에"를 나타내는 격은?',
    options: ['도구격(Ins.)', '여격(D.)', '탈격(Abl.)', '처소격(L.)'],
    answer: 2,
  },
  {
    type: 'quiz',
    question: '"~에(시간, 장소), ~가운데"를 나타내는 격은?',
    options: ['주격(N.)', '목적격(Ac.)', '소유격(G.)', '처소격(L.)'],
    answer: 3,
  },
  {
    type: 'quiz',
    question: '빠알리어 명사의 격은 총 몇 가지인가요?',
    options: ['4격', '6격', '8격', '10격'],
    answer: 2,
    hint: '주격·목적격·도구격·여격·탈격·소유격·처소격·호격',
  },

  // ── 듣기 ──
  {
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

  // ── 쓰기 ──
  {
    type: 'writing',
    instruction: '경전 첫 단어를 써보세요',
    meaning: '하나의 (어떤)',
    pronKo: '에깡',
    answer: 'Ekaṃ',
    hint: '전법륜경 첫 단어. ṃ(억제음)으로 끝남',
  },
  {
    type: 'writing',
    instruction: '삼귀의 첫 단어를 써보세요',
    meaning: '귀의합니다',
    pronKo: '나모',
    answer: 'Namo',
    hint: '경전 시작 전 3번 읊는 구절의 첫 단어',
  },

  // ── 읽기 ──
  {
    type: 'speak',
    pali: 'Namo tassa bhagavato arahato sammāsambuddhassa',
    pronKo: '나모 땃사 바가와또 아라하또 삼마-삼붓닷사',
  },
  {
    type: 'speak',
    pali: 'Ekaṃ samayaṃ bhagavā bārāṇasiyaṃ viharati isipatane migadāye',
    pronKo:
      '에깡 사마양 바가와- 바-라-나시양 위하라띠 이시빠따네 미가다-예',
  },
]
