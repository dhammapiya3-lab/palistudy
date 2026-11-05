// 문법 학습 데이터 — GrammarLesson.tsx에서 씀 (발음 녹음 목록 scripts/tts-texts.mts도 이 파일을 읽음)
export type CheckQ = { q: string; options: string[]; answer: number; explain: string }

export const GRAMMAR_DATA: Record<string, {
  title: string; source: string; verse: string; verseKo: string;
  explanation: { title: string; content: string }[];
  table?: { headers: string[]; rows: string[][]; paliCols: number[] };  // paliCols: 빠알리 낱말이 든 열(강조 표시)
  /** 레슨 끝 확인 문제 */
  check?: CheckQ[];
}> = {
  sov: {
    title: 'SOV 어순 (주어-목적어-동사)',
    source: '예문',
    verse: 'Bhikkhu vihāraṃ gacchati',
    verseKo: '비구가 승원으로 간다',
    explanation: [
      { title: '문장 구조 분석', content: 'Bhikkhu (비구가, 주격) + vihāraṃ (승원으로, 대격) + gacchati (간다, 동사)\n\n빠알리어는 한국어처럼 SOV(주어-목적어-동사) 어순이 기본입니다. (격어미가 역할을 나타내므로 어순은 비교적 자유롭습니다)' },
      { title: '참고: 동사 없는 문장 (Dhp 1)', content: 'Manopubbaṅgamā dhammā\n= manopubbaṅgamā (소유복합어 bahubbīhi, 주격 복수: "마음을 앞세운") + dhammā (법들은, 주격 복수)\n\n"법들은 마음을 앞세운다" — 동사도 목적어도 없는 명사문이라 SOV 예시는 아닙니다. mano는 독립된 주어가 아니라 복합어의 앞부분입니다.' },
      { title: '한국어와의 유사성', content: '한국어: "나는 법을 배운다"\n빠알리어: "Ahaṃ dhammaṃ sikkhāmi"\n(나는) (법을) (배운다)\n\n어순이 같습니다!' },
    ],
    check: [
      { q: 'Bhikkhu vihāraṃ gacchati 에서 ‘승원으로’에 해당하는 낱말은?', options: ['bhikkhu', 'vihāraṃ', 'gacchati'], answer: 1,
        explain: 'vihāraṃ은 vihāra(승원)의 대격(=목적격). 가는 곳을 나타내 ‘승원으로’가 됩니다.' },
      { q: '빠알리어에서 주어·목적어 같은 낱말의 역할을 알려 주는 것은?', options: ['낱말의 순서만', '낱말 끝의 격어미', '띄어쓰기'], answer: 1,
        explain: '격어미(-o, -aṃ 등)가 역할을 나타냅니다. 그래서 어순을 바꿔도 뜻이 크게 달라지지 않아요.' },
      { q: 'Ahaṃ dhammaṃ sikkhāmi 에서 동사(서술어)는?', options: ['ahaṃ', 'dhammaṃ', 'sikkhāmi'], answer: 2,
        explain: 'sikkhāmi = (내가) 배운다. 1인칭 단수 현재 어미 -āmi. 한국어처럼 동사가 끝에 왔어요.' },
    ],
  },
  'nom-acc': {
    title: '주격과 대격',
    source: '삼귀의문',
    verse: 'Buddhaṃ saraṇaṃ gacchāmi',
    verseKo: '부처님께 귀의합니다',
    explanation: [
      { title: '주격 (-o): "~이/가"', content: 'Buddho deseti = 부처님이 설하신다\n-o 어미가 붙으면 주어가 됩니다' },
      { title: '대격 (-aṃ): "~을/를"', content: 'Buddhaṃ saraṇaṃ gacchāmi\n= 부처님(을) 귀의처(를) 갑니다\n(남성 -a 어간에서) -aṃ 어미는 대격 = 목적어입니다.\n단, 중성 -a 어간은 주격도 -aṃ이므로(cittaṃ, sutaṃ 등) 문장 안의 기능으로 판단합니다' },
    ],
    table: {
      headers: ['격', '어미 (남성 -a 어간)', '기능', '예시'],
      rows: [
        ['주격', '-o (단), -ā (복)', '~이/가', 'Buddho'],
        ['대격(=목적격)', '-aṃ (단), -e (복)', '~을/를', 'Buddhaṃ'],
      ],
      paliCols: [3],
    },
    check: [
      { q: 'Buddho deseti(부처님이 설하신다)에서 Buddho는 몇 격?', options: ['주격', '대격(=목적격)', '속격(=소유격)'], answer: 0,
        explain: '-o는 남성 -a 어간의 주격 단수 어미 — ‘~이/가’, 문장의 주어입니다.' },
      { q: 'Dhammaṃ saraṇaṃ gacchāmi 에서 Dhammaṃ은 몇 격?', options: ['주격', '대격(=목적격)', '호격'], answer: 1,
        explain: 'dhamma(남성 -a 어간)의 대격 단수 -aṃ. ‘담마를 (귀의처로 하여) 갑니다’ — 가는 대상이에요.' },
      { q: '남성 -a 어간의 주격 복수 어미는?', options: ['-ā (buddhā)', '-aṃ (buddhaṃ)', '-assa (buddhassa)'], answer: 0,
        explain: '주격 복수는 -ā: buddhā(부처님들이). -aṃ은 대격 단수, -assa는 여격·속격 단수입니다.' },
    ],
  },
  'declension-a': {
    title: '남성 -a 어간 8격',
    source: 'buddha의 격변화',
    verse: 'Buddhassa sāsanaṃ',
    verseKo: '부처님의 가르침',
    explanation: [
      { title: '8격이란?', content: '빠알리어 명사는 8가지 형태로 변합니다.\n한국어의 조사(이/가, 을/를, 에서, 의...)와 같은 역할입니다.' },
    ],
    table: {
      headers: ['격', '명칭', '기능', '단수', '복수'],
      rows: [
        ['1격', '주격', '~이/가', 'buddho', 'buddhā'],
        ['2격', '대격(=목적격)', '~을/를', 'buddhaṃ', 'buddhe'],
        ['3격', '구격(=도구격)', '~에 의해', 'buddhena', 'buddhehi'],
        ['4격', '여격', '~에게', 'buddhassa', 'buddhānaṃ'],
        ['5격', '탈격', '~로부터', 'buddhasmā', 'buddhehi'],
        ['6격', '속격(=소유격)', '~의', 'buddhassa', 'buddhānaṃ'],
        ['7격', '처격(=처소격)', '~에서', 'buddhasmiṃ', 'buddhesu'],
        ['8격', '호격', '~이여!', 'buddha!', 'buddhā!'],
      ],
      paliCols: [3, 4],
    },
    check: [
      { q: 'buddhena 는 몇 격?', options: ['주격', '구격(=도구격)', '처격(=처소격)', '여격'], answer: 1,
        explain: '-ena는 구격 단수 어미 — ‘부처님에 의해, 부처님과 함께’.' },
      { q: 'buddhassa 가 될 수 있는 격 두 가지는?', options: ['주격·대격', '여격·속격', '탈격·처격', '구격·탈격'], answer: 1,
        explain: '-assa는 여격(~에게)과 속격(~의) 단수가 모양이 같아요. 나모땃사의 Sammāsambuddhassa는 Namo와 함께 ‘~께’(여격)로 읽습니다.' },
      { q: 'buddhesu 의 뜻으로 알맞은 것은?', options: ['부처님들을', '부처님들의', '부처님들 가운데(에서)', '부처님들에 의해'], answer: 2,
        explain: '-esu는 처격 복수 — ‘~들 안에서, ~들 가운데’.' },
      { q: 'buddhehi 가 나타낼 수 있는 것은?', options: ['구격·탈격 복수', '주격 복수', '대격 복수', '처격 복수'], answer: 0,
        explain: '-ehi는 구격 복수(~들에 의해)와 탈격 복수(~들로부터)가 같은 모양입니다.' },
    ],
  },
  present: {
    title: '현재시제 활용',
    source: '경전 빈출 동사',
    verse: 'Bhikkhu gacchati vihāraṃ',
    verseKo: '비구가 정사(精舍)로 간다',
    explanation: [
      { title: '현재시제 어미', content: '빠알리어 동사는 인칭과 수에 따라 어미가 변합니다.' },
    ],
    table: {
      headers: ['인칭', '단수', '복수', '뜻'],
      rows: [
        ['3인칭', 'gacchati', 'gacchanti', '(그가) 간다 / (그들이) 간다'],
        ['2인칭', 'gacchasi', 'gacchatha', '(네가) 간다 / (너희가) 간다'],
        ['1인칭', 'gacchāmi', 'gacchāma', '(내가) 간다 / (우리가) 간다'],
      ],
      paliCols: [1, 2],
    },
    check: [
      { q: 'gacchāmi 의 뜻은?', options: ['(내가) 간다', '(그가) 간다', '(우리가) 간다'], answer: 0,
        explain: '-āmi는 1인칭 단수 현재 어미. 삼귀의의 saraṇaṃ gacchāmi(귀의합니다)도 같은 꼴이에요.' },
      { q: '‘(그들이) 본다’를 빠알리어로?', options: ['passati', 'passanti', 'passāmi'], answer: 1,
        explain: '3인칭 복수 현재 어미 -anti: passanti. passati는 3인칭 단수, passāmi는 1인칭 단수입니다.' },
      { q: 'gacchatha 의 인칭과 수는?', options: ['3인칭 단수', '2인칭 복수 (너희가)', '1인칭 복수 (우리가)'], answer: 1,
        explain: '-atha는 2인칭 복수 현재 어미 — ‘(너희가) 간다’.' },
    ],
  },
}
