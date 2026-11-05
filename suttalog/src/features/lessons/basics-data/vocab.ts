// 기초 단어 학습 데이터 — VocabLesson.tsx에서 씀 (발음 녹음 목록 scripts/tts-texts.mts도 이 파일을 읽음)
export const VOCAB_DATA: Record<string, {
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
      { pali: 'saraṇaṃ', ko: '귀의처, 보호처', grammar: '중성명사 목적격', ipa: '/sɐ.rɐ.ɳɐṃ/', root: '√sar (보호하다; 주석서: hiṃsā "부수다")' },
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
