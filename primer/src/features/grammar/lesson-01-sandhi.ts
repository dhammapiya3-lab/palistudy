// 연성법 (빠알리 프라이머 2장) — 경전 실례 포함
import type { StepWithoutId } from './types'

export const LESSON_01_SANDHI: StepWithoutId[] = [
  // ─── 도입 ───
  {
    type: 'intro',
    title: '연성법 (Sandhi)',
    subtitle: '단어 연결 규칙 — 빠알리 프라이머 2장',
    description:
      '빠알리어에서 두 단어가 만날 때\n소리가 변하는 규칙입니다.\n\n' +
      '(1) 모음의 연성법 ①~⑨\n(2) 자음의 연성법 ⑩~⑬\n(3) 억제음(ṃ)의 연성법\n\n' +
      '경전을 읽을 때 단어 경계를 파악하는\n핵심 열쇠입니다.',
    icon: '🔗',
  },

  // ═══════════════════════════════════════
  //  (1) 모음의 연성법
  // ═══════════════════════════════════════

  // ① 앞 모음 탈락 (삭제)
  {
    type: 'teach-grammar',
    title: '① 앞 모음 탈락 (삭제)',
    example:
      'na + atthi → natthi\neva + idaṃ → evidaṃ\n' +
      'saññā + uppādo → saññuppādo\naṭṭhikāni + eva → aṭṭhikāneva',
    exampleKo:
      '없다 (na + 있다)\n바로 이것 (eva + 이것)\n' +
      '인식의 생겨남\n뼈들만',
    explanation:
      '앞 단어의 끝 모음이 탈락하고\n뒷 단어와 바로 붙습니다.\n\n' +
      '경전에서 가장 흔한 패턴:\n' +
      '• natthi = na(아니다) + atthi(있다) → "없다"\n' +
      '• saññuppādo = saññā + uppādo → ā 탈락',
  },
  {
    type: 'verse',
    pali: '"Dveme, bhikkhave, antā pabbajitena na sevitabbā."',
    pronKo: '드웨메 빅카웨 안따- 빱바지떼나 나 세위땁바-',
    translation:
      '"비구들이여, 출가자가 따르지 말아야 할 두 극단이 있다."',
    highlight: ['Dveme'],
    note:
      'Dveme = dve(둘) + ime(이것들) — 앞 모음 e 탈락\n' +
      '전법륜경(SN 56.11)',
  },

  // ② 앞 모음 탈락 + 뒷 모음 장음화
  {
    type: 'teach-grammar',
    title: '② 앞 모음 탈락 + 뒷 모음 장음화',
    example:
      'idha + upapanno → idhūpapanno\n' +
      'upahato + ayaṃ → upahatāyaṃ\n' +
      'sace + ayaṃ → sacāyaṃ',
    exampleKo:
      '여기에 태어난 (idha + 태어난)\n' +
      '파괴된 이것 (upahato + 이것)\n' +
      '만약 이것이 (sace + 이것)',
    explanation:
      '앞 모음이 탈락한 후, 뒷 모음이\n보상적으로 장음화됩니다.\n\n' +
      '삭제(omission) + 보상(compensation):\n' +
      '• idha + upapanno: a 탈락 → u가 ū로\n' +
      '• sace + ayaṃ: e 탈락 → a가 ā로',
  },

  // ③ 혼유 (결합)
  {
    type: 'teach-grammar',
    title: '③ 혼유 — 서로 결합 (contamination)',
    example:
      'na + assa → nāssa\nsu + akkhāto → svakkhāto\n' +
      'kaṭṭha + udakaṃ → kaṭṭhodakaṃ\n' +
      'vi + ākaroti → vyākaroti\nanu + āgacchati → annāgacchati',
    exampleKo:
      '그의 ~않다\n잘 설해진\n' +
      '장작과 물\n분별하다\n따라오다',
    explanation:
      '두 모음이 합쳐서 새로운 소리가 됩니다.\n\n' +
      '• a + a → ā: na + assa → nāssa\n' +
      '• u + a → va: su + akkhāto → svakkhāto\n' +
      '• a + u → o: kaṭṭha + udakaṃ → kaṭṭhodakaṃ\n' +
      '• i + ā → yā: vi + ākaroti → vyākaroti',
  },

  // ④ 자음 삽입
  {
    type: 'teach-grammar',
    title: '④ 자음 삽입 (insertion)',
    example:
      'na + idaṃ → nayidaṃ\nsammā + aññā → sammādaññā\n' +
      'tasmā + iha → tasmātiha\nyathā + iva → yathāriva',
    exampleKo:
      '이것이 아닌\n바른 앎\n' +
      '그러므로 여기서\n마치 ~처럼',
    explanation:
      '두 모음 사이에 자음이 삽입됩니다.\n\n' +
      '삽입 자음의 종류:\n' +
      '• t, d, n, m\n• y, r, ḷ, v, g, h\n\n' +
      '예: tasmā + iha → tasmā-t-iha\n' +
      '    na + idaṃ → na-y-idaṃ',
  },

  // ⑤ 뒷 모음 탈락
  {
    type: 'teach-grammar',
    title: '⑤ 뒷 모음 탈락 (삭제)',
    example:
      'ko + asi → kosi\nkilanto + asmi → kilantosmi\n' +
      'te + ahaṃ → tehaṃ\npi + assa → pissa',
    exampleKo:
      '너는 누구인가\n나는 지쳤다\n' +
      '그대에게 나는\n그의 ~도',
    explanation:
      '뒷 단어의 첫 모음이 탈락합니다.\n\n' +
      '①번(앞 모음 탈락)과 반대 방향:\n' +
      '• ko + asi → ko-si (a 탈락)\n' +
      '• te + ahaṃ → te-haṃ (a 탈락)',
  },

  // ⑥ 뒷 모음 탈락 + 앞 모음 장음화
  {
    type: 'teach-grammar',
    title: '⑥ 뒷 모음 탈락 + 앞 모음 장음화',
    example: 'vi + ati → vīti',
    exampleKo: '지나가다 (vi + ati)',
    explanation:
      '뒷 모음이 탈락한 후, 앞 모음이\n보상적으로 장음화됩니다.\n\n' +
      '②번의 반대 방향:\n' +
      '• vi + ati: a 탈락 → i가 ī로 장음화\n' +
      '→ vīti (지나가다)',
  },

  // ⑦ i/e→y, u/o→v 변화
  {
    type: 'teach-grammar',
    title: '⑦ i/e → y, u/o → v 변화',
    example:
      'te + ahaṃ → tyāhaṃ\nme + ayaṃ → myāyaṃ\n' +
      'yesu + ahaṃ → yesvāhaṃ\nso + ahaṃ → svāhaṃ\n' +
      'kho + ettha → khvettha\nso + eva → sveva',
    exampleKo:
      '그대에게 나는\n나에게 이것이\n' +
      '그것들에서 나는\n그가 나를\n' +
      '참으로 거기서\n그가 바로',
    explanation:
      '특히 k/kh/t/s 다음에서:\n' +
      '• i, e → y로 변하고 뒤 a가 장음화\n' +
      '• u, o → v로 변하고 뒤 a가 장음화\n\n' +
      '장모음과 이중모음은 변하지 않습니다.\n\n' +
      '예: te(e→y) + ahaṃ(a→ā) → tyāhaṃ\n' +
      '    so(o→v) + ahaṃ(a→ā) → svāhaṃ',
  },

  // ⑧ 모음충돌 그대로
  {
    type: 'teach-grammar',
    title: '⑧ 모음충돌(Hiatus) 유지',
    example: 'anu + esi → anuesi\nsa + upapāda → saupapāda',
    exampleKo: '따라간다\n태어나는 것이 있는',
    explanation:
      '모음이 충돌해도 아무 변화 없이\n그대로 유지되는 경우입니다.\n\n' +
      '이런 경우를 Hiatus(모음충돌)라 합니다.\n' +
      '모든 모음이 항상 변하는 것은 아닙니다.',
  },

  // ⑨ 모음 + 자음 결합 (ti/pi 앞 장음화)
  {
    type: 'teach-grammar',
    title: '⑨ 모음 + 자음 결합 (ti/pi 장음화)',
    example:
      'bhikkhu + ti → bhikkhūti\nasmi + ti → asmīti\n' +
      'tatra + pi → tatrāpi',
    exampleKo:
      '비구가 ~라고 말하다\n나는 ~이다 라고\n' +
      '거기서도',
    explanation:
      '모음과 자음이 결합할 때 기본적으로\n변화가 없지만:\n\n' +
      '• -ti("라고") 앞에서 단모음은 항상 장음화\n' +
      '  bhikkhu → bhikkhū-ti\n' +
      '  asmi → asmī-ti\n\n' +
      '• -pi("~도") 앞에서는 때때로 장음화\n' +
      '  tatra → tatrā-pi',
  },

  // ─── 모음 연성법 퀴즈 ───
  {
    type: 'quiz',
    question: '"na + atthi"가 연성되면? (① 앞 모음 탈락)',
    options: ['naatthi', 'natthi', 'nātthi', 'natthī'],
    answer: 1,
    hint: '앞 모음 a가 탈락 → n + atthi',
  },
  {
    type: 'quiz',
    question: '"idha + upapanno"가 연성되면? (② 탈락+장음화)',
    options: ['idhupapanno', 'idhāpapanno', 'idhūpapanno', 'idhaupapanno'],
    answer: 2,
    hint: 'a 탈락 후 u가 장음 ū로 보상',
  },
  {
    type: 'quiz',
    question: '"su + akkhāto"가 연성되면? (③ 혼유)',
    options: ['sākkhāto', 'svakkhāto', 'suakkhāto', 'sokkhāto'],
    answer: 1,
    hint: 'u + a → va: s-v-akkhāto',
  },
  {
    type: 'quiz',
    question: '"tasmā + iha"가 연성되면? (④ 자음 삽입)',
    options: ['tasmāiha', 'tasmātiha', 'tasmāriha', 'tasmāyiha'],
    answer: 1,
    hint: '두 모음 사이에 t가 삽입',
  },
  {
    type: 'quiz',
    question: '"ko + asi"가 연성되면? (⑤ 뒷 모음 탈락)',
    options: ['koasi', 'kosi', 'kāsi', 'kvāsi'],
    answer: 1,
    hint: '뒷 단어 a가 탈락 → ko + si',
  },
  {
    type: 'quiz',
    question: '"so + ahaṃ"이 ⑦번 규칙으로 연성되면?',
    options: ['sohaṃ', 'svāhaṃ', 'sāhaṃ', 'sovāhaṃ'],
    answer: 1,
    hint: 'o → v, a → ā: sv-āhaṃ',
  },
  {
    type: 'quiz',
    question: '"bhikkhu + ti"가 연성되면? (⑨ ti 앞 장음화)',
    options: ['bhikkhuti', 'bhikkhūti', 'bhikkhutti', 'bhikkhoti'],
    answer: 1,
    hint: 'ti 앞에서 단모음 u가 장음 ū로',
  },

  // ═══════════════════════════════════════
  //  (2) 자음의 연성법
  // ═══════════════════════════════════════

  // ⑩ 장모음 + 이중자음 → 단모음 + 이중자음
  {
    type: 'teach-grammar',
    title: '⑩ 장모음 + 이중자음 → 단모음 + 이중자음',
    example: 'ā + (k)khāti → akkhāti',
    exampleKo: '말하다, 설하다',
    explanation:
      '장모음 뒤에 이중자음이 오면\n장모음이 단모음으로 줄어듭니다.\n\n' +
      '• ā + kkhāti → a + kkhāti = akkhāti\n\n' +
      '빠알리어에서 장모음 + 이중자음은\n음절 무게가 너무 무거워지므로\n장모음이 단축됩니다.',
  },

  // ⑪ r 관련 자음 변화
  {
    type: 'teach-grammar',
    title: '⑪ r+k→kkh, r+t→tth, d+h→ddh',
    example:
      'ni(r) + (k)kamati → nikkhamati\n' +
      'ni(r) + tarati → nittharati\n' +
      'u(d) + harati → uddharati',
    exampleKo: '떠나다, 나오다\n건너다\n꺼내다, 들어올리다',
    explanation:
      '접두사의 r이나 d가 뒷 자음과\n결합하여 이중자음이 됩니다.\n\n' +
      '• r + k → kkh: nir + kamati → nikkhamati\n' +
      '• r + t → tth: nir + tarati → nittharati\n' +
      '• d + h → ddh: ud + harati → uddharati\n\n' +
      '경전에서 nikkhamati(떠나다)는\n출가 장면에서 자주 등장합니다.',
  },

  // ⑫ ti/ṭi + 모음 → cc + 모음
  {
    type: 'teach-grammar',
    title: '⑫ ti/ṭi+모음→cc, dhi+모음→jjh',
    example:
      'iti + alaṃ → iccalaṃ / iccālaṃ\n' +
      'paṭi + assosi → paccassosi\n' +
      'abhi + u(d) + kirati → abbhukkirati',
    exampleKo:
      '~라고 충분하다\n대답하다\n뿌리다, 흩뿌리다',
    explanation:
      '접미/접두의 특정 조합에서:\n\n' +
      '• ti/ṭi + 모음 → cc + 모음\n' +
      '  iti + alaṃ → icc-alaṃ\n' +
      '  paṭi + assosi → pacc-assosi\n\n' +
      '• dhi + 모음 → jjh + 모음\n' +
      '• bhi + 모음 → bbh + 모음\n' +
      '  abhi + ukkirati → abbh-ukkirati',
  },

  // ⑬ r+v / v+r → vv → bb
  {
    type: 'teach-grammar',
    title: '⑬ r+v / v+r → vv → bb',
    example:
      'ni(r) + veṭheti → nibbeṭheti\n' +
      '(p)pa + (v)vajati → pabbajati',
    exampleKo: '풀다, 해석하다\n출가하다',
    explanation:
      '• r + v → vv → bb\n' +
      '  nir + veṭheti → nivveṭheti → nibbeṭheti\n\n' +
      '• v + r (또는 유사 조합) → bb\n' +
      '  pa + vajati → pabbajati\n\n' +
      '경전에서 pabbajati(출가하다)는\n매우 자주 나오는 단어입니다.\n' +
      '전법륜경: "pabbajitena na sevitabbā"',
  },

  // ─── 자음 연성법 퀴즈 ───
  {
    type: 'quiz',
    question: '"ni(r) + kamati"가 연성되면? (⑪ r+k→kkh)',
    options: ['nirkamati', 'nikamati', 'nikkhamati', 'nikhkamati'],
    answer: 2,
    hint: 'r + k → kkh',
  },
  {
    type: 'quiz',
    question: '"iti + alaṃ"이 연성되면? (⑫ ti+모음→cc)',
    options: ['itialaṃ', 'iccalaṃ', 'itcalaṃ', 'ityalaṃ'],
    answer: 1,
    hint: 'ti + 모음 → cc + 모음',
  },
  {
    type: 'quiz',
    question: '"pa + vajati"가 연성되면? (⑬ v→bb)',
    options: ['pavajati', 'pabbajati', 'pavvajati', 'pajjati'],
    answer: 1,
    hint: 'pa + va → pabba (v→bb)',
  },

  // ═══════════════════════════════════════
  //  (3) 억제음(ṃ)의 연성법
  // ═══════════════════════════════════════

  // 억제음 → 동일계 비음
  {
    type: 'teach-grammar',
    title: '억제음(ṃ) → 동일계 비음으로 변화',
    example:
      'saṃ + kamati → saṅkamati\n' +
      'dhammaṃ + ca → dhammañca\n' +
      'saṃ + nisīdati → sannisīdati',
    exampleKo:
      '함께 걷다 (saṃ + 걷다)\n' +
      '법과 (dhammaṃ + ~와)\n' +
      '함께 앉다 (saṃ + 앉다)',
    explanation:
      '끝의 ṃ은 뒤에 오는 자음의 계열에 따라\n같은 계열의 비음으로 변합니다:\n\n' +
      '• ṃ + k/kh/g/gh → ṅ (후음)\n' +
      '  saṃ + kamati → saṅkamati\n\n' +
      '• ṃ + c/ch/j/jh → ñ (구개음)\n' +
      '  dhammaṃ + ca → dhammañca\n\n' +
      '• ṃ + t/th/d/dh → n (치음)\n' +
      '  saṃ + nisīdati → sannisīdati\n' +
      '  kusalaṃ + ti → kusalanti\n\n' +
      '• ṃ + p/ph/b/bh → m (순음)\n' +
      '  alaṃ + me → alamme',
  },

  // 억제음 + 모음 → m
  {
    type: 'teach-grammar',
    title: '억제음(ṃ) + 모음 → m으로 변화',
    example:
      'idaṃ + āsanaṃ → idamāsanaṃ\n' +
      'idaṃ + ahaṃ → idāhaṃ\n' +
      'maraṇaṃ + pi → maraṇampi',
    exampleKo:
      '이 자리 (이것 + 자리)\n' +
      '이것을 나는\n죽음도 (죽음 + ~도)',
    explanation:
      '모음 앞에서 ṃ은 m으로 변합니다.\n' +
      '드물게 탈락하는 경우도 있습니다.\n\n' +
      '• idaṃ + āsanaṃ → idam-āsanaṃ\n' +
      '• maraṇaṃ + pi → maraṇam-pi\n\n' +
      '전법륜경(SN 56.11)에서:\n' +
      'maraṇampi dukkhā = 죽음도 괴로움이다',
  },

  // 억제음 + eva → yeva
  {
    type: 'teach-grammar',
    title: '억제음(ṃ) + eva → ṃyeva',
    example: 'ekaṃ + eva → ekaṃ yeva',
    exampleKo: '오직 하나',
    explanation:
      'ṃ + eva는 특별히 ṃ + yeva로 변합니다.\n\n' +
      '• ekaṃ + eva → ekaṃ yeva\n' +
      '  (y가 삽입됨)\n\n' +
      'eva(바로, ~만)는 경전에서 매우\n자주 나오는 불변사입니다.',
  },

  // ─── 경전 실례: 전법륜경 ───
  {
    type: 'teach-grammar',
    title: '경전 실례: 전법륜경 사성제',
    example:
      'jātipi dukkhā = jāti + pi\n' +
      'jarāpi dukkhā = jarā + pi\n' +
      'maraṇampi = maraṇaṃ + pi',
    exampleKo:
      '태어남도 괴로움이다\n' +
      '늙음도 괴로움이다\n' +
      '죽음도 괴로움이다',
    explanation:
      '전법륜경(SN 56.11) 사성제 구절:\n\n' +
      '• jātipi = jāti + pi → 변화 없이 연결\n' +
      '  (자음 + 자음이므로 연성 불필요)\n\n' +
      '• maraṇampi = maraṇaṃ + pi\n' +
      '  → ṃ + p: 순음 앞에서 ṃ이 m으로\n\n' +
      '• Dveme = dve + ime\n' +
      '  → 앞 모음 e 탈락 (①번 규칙)',
  },
  {
    type: 'verse',
    pali: 'jātipi dukkhā, jarāpi dukkhā,\nbyādhipi dukkho, maraṇampi dukkhaṃ',
    pronKo: '자-띠삐 둑카-, 자라-삐 둑카-,\n뱌-디삐 둑코, 마라남삐 둑캉',
    translation:
      '태어남도 괴로움, 늙음도 괴로움,\n병듦도 괴로움, 죽음도 괴로움이다',
    highlight: ['jātipi', 'jarāpi', 'maraṇampi'],
    note:
      'pi(~도)가 반복 — maraṇampi에서 ṃ→m 연성\n' +
      '전법륜경(SN 56.11) 괴로움의 성스러운 진리',
  },
  {
    type: 'verse',
    pali: 'Idaṃ kho pana, bhikkhave,\ndukkhaṃ ariyasaccaṃ—',
    pronKo: '이당 코 빠나 빅카웨\n둑캉 아리야삿짱—',
    translation: '비구들이여, 이것이 괴로움의 성스러운 진리이다—',
    highlight: ['dukkhaṃ', 'ariyasaccaṃ'],
    note:
      'dukkhaṃ ariyasaccaṃ: ṃ이 모음 a 앞에서도\n' +
      '유지되는 예 (연성이 일어나지 않는 경우도 있음)',
  },

  // ─── 억제음 연성법 퀴즈 ───
  {
    type: 'quiz',
    question: '"dhammaṃ + ca"가 연성되면?',
    options: ['dhammamca', 'dhammañca', 'dhammaṃca', 'dhammanca'],
    answer: 1,
    hint: 'ṃ + c → ñ (구개음 비음)',
  },
  {
    type: 'quiz',
    question: '"saṃ + kamati"가 연성되면?',
    options: ['samkamati', 'saṅkamati', 'sankamati', 'saṃkamati'],
    answer: 1,
    hint: 'ṃ + k → ṅ (후음 비음)',
  },
  {
    type: 'quiz',
    question: '"maraṇampi"를 분리하면?',
    options: ['maraṇa + mpi', 'maraṇaṃ + pi', 'maraṇam + pi', 'maraṇā + pi'],
    answer: 1,
    hint: 'ṃ + p → m: 억제음이 순음 비음으로',
  },
  {
    type: 'quiz',
    question: '"ekaṃ + eva"가 연성되면?',
    options: ['ekameva', 'ekaṃ yeva', 'ekaṃeva', 'ekañeva'],
    answer: 1,
    hint: 'ṃ + eva → ṃ + yeva (특수 규칙)',
  },

  // ─── 종합 복습 ───
  {
    type: 'match-reverse',
    instruction: '연성법의 종류를 맞추세요',
    meaning: 'su + akkhāto → svakkhāto (두 모음이 합침)',
    options: ['① 삭제 (탈락)', '③ 혼유 (결합)', '④ 삽입', '⑩ 자음 변화'],
    answer: 1,
  },
  {
    type: 'match-reverse',
    instruction: '연성법의 종류를 맞추세요',
    meaning: 'tasmā + iha → tasmātiha (t가 끼어듦)',
    options: ['① 삭제 (탈락)', '③ 혼유 (결합)', '④ 삽입', '⑫ ti→cc'],
    answer: 2,
  },
  {
    type: 'match-reverse',
    instruction: '연성법의 종류를 맞추세요',
    meaning: 'ni(r) + kamati → nikkhamati (r+k)',
    options: ['⑩ 장모음 단축', '⑪ r+k→kkh', '⑫ ti→cc', '⑬ r+v→bb'],
    answer: 1,
  },
  {
    type: 'match-reverse',
    instruction: '연성법의 종류를 맞추세요',
    meaning: 'saṃ + kamati → saṅkamati (ṃ→ṅ)',
    options: ['① 앞 모음 탈락', '④ 자음 삽입', '억제음 비음화', '⑬ v→bb'],
    answer: 2,
  },

  // ─── 마무리 낭송 ───
  {
    type: 'speak',
    pali: 'jātipi dukkhā, jarāpi dukkhā, maraṇampi dukkhaṃ',
    pronKo: '자-띠삐 둑카-, 자라-삐 둑카-, 마라남삐 둑캉',
  },
  {
    type: 'speak',
    pali: 'Dveme bhikkhave antā pabbajitena na sevitabbā',
    pronKo: '드웨메 빅카웨 안따- 빱바지떼나 나 세위땁바-',
  },
]
