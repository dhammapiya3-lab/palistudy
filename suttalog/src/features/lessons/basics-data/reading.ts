// 경전 독해 학습 데이터 — ReadingLesson.tsx에서 씀 (발음 녹음 목록 scripts/tts-texts.mts도 이 파일을 읽음)
export const READING_DATA: Record<string, {
  title: string; source: string;
  segments: { pali: string; wordByWord: { word: string; meaning: string }[]; translation: string }[];
}> = {
  evam: {
    title: '"Evaṃ me sutaṃ" 경전 서두 정형구',
    source: '모든 경전의 첫 구절',
    segments: [
      {
        pali: 'Evaṃ me sutaṃ —',
        wordByWord: [
          { word: 'Evaṃ', meaning: '이와 같이' },
          { word: 'me', meaning: '나에 의해 / 나의 (by me / my) — 단축형 me, 도구격/소유격' },
          { word: 'sutaṃ', meaning: '들려진 (heard)' },
        ],
        translation: '이와 같이 나는 들었다 —',
      },
      {
        pali: 'ekaṃ samayaṃ bhagavā',
        wordByWord: [
          { word: 'ekaṃ', meaning: '한 (one)' },
          { word: 'samayaṃ', meaning: '때에 (occasion)' },
          { word: 'bhagavā', meaning: '세존께서 (the Blessed One)' },
        ],
        translation: '한때 세존께서',
      },
      {
        pali: 'Bārāṇasiyaṃ viharati Isipatane Migadāye.',
        wordByWord: [
          { word: 'Bārāṇasiyaṃ', meaning: '바라나시에서 (7격 처소격)' },
          { word: 'viharati', meaning: '머무시다 (dwells)' },
          { word: 'Isipatane', meaning: '이시빠따나에 (7격)' },
          { word: 'Migadāye', meaning: '녹야원에 (7격, Deer Park)' },
        ],
        translation: '바라나시의 녹야원, 이시빠따나에 머무셨다.',
      },
    ],
  },
  'sn56-11': {
    title: 'SN 56.11 전법륜경 (첫 설법)',
    source: 'Saṃyutta Nikāya 56.11 Dhammacakkappavattana',
    segments: [
      {
        pali: '"Dveme, bhikkhave, antā pabbajitena na sevitabbā."',
        wordByWord: [
          { word: 'Dve', meaning: '두 가지 (two)' },
          { word: 'ime', meaning: '이러한 (these)' },
          { word: 'bhikkhave', meaning: '비구들이여 (호격)' },
          { word: 'antā', meaning: '극단들이 (extremes)' },
          { word: 'pabbajitena', meaning: '출가자에 의해 (3격)' },
          { word: 'na', meaning: '~않다 (not)' },
          { word: 'sevitabbā', meaning: '따라야 할 (to be followed)' },
        ],
        translation: '"비구들이여, 출가자가 따르지 말아야 할 두 가지 극단이 있다."',
      },
    ],
  },
}
