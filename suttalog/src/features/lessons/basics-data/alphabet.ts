// Dhammapada 1게 기반 알파벳 학습 데이터 — AlphabetLesson.tsx에서 씀 (발음 녹음 목록 scripts/tts-texts.mts도 이 파일을 읽음)
export const ALPHABET_DATA: Record<string, {
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
      { char: 'ā', ipa: '/aː/', ko: '아- (길게)', type: '장모음', example: 'dham-mā' },
      { char: 'i', ipa: '/i/', ko: '이 (짧게)', type: '단모음', example: 'bhā-sa-ti' },
      { char: 'ī', ipa: '/iː/', ko: '이- (길게)', type: '장모음', example: '(이 게송에 없음)' },
      { char: 'u', ipa: '/u/', ko: '우 (짧게)', type: '단모음', example: 'pub-baṅ-ga-mā' },
      { char: 'ū', ipa: '/uː/', ko: '우- (길게)', type: '장모음', example: '(이 게송에 없음)' },
      { char: 'e', ipa: '/eː/', ko: '에- (원칙상 장음, 겹자음 앞에서는 짧게)', type: '장모음', example: 'ce (장음) / seṭ-ṭhā (겹자음 앞 단음)' },
      { char: 'o', ipa: '/oː/', ko: '오- (원칙상 장음, 겹자음 앞에서는 짧게)', type: '장모음', example: 'Ma-no' },
    ],
    steps: [
      { type: 'intro', content: '경전의 첫 게송을 통해 빠알리어 모음을 배워봅시다.' },
      { type: 'listen', content: '먼저 게송을 들어보세요.' },
      { type: 'quiz', content: '"dhammā"에서 ā는 어떻게 발음할까요?', options: ['짧은 "아"', '긴 "아-"', '"어"', '"오"'], answer: 1 },
      { type: 'quiz', content: '"Mano"의 "o"는?', options: ['짧은 "오"', '긴 "오-" (겹자음 앞이 아니므로 장음)', '"우"', '"어"'], answer: 1 },
      { type: 'quiz', content: '빠알리어에서 단모음은 몇 개?', options: ['3개 (a, i, u)', '5개', '8개', '2개'], answer: 0 },
    ],
  },
  consonants1: {
    title: '자음 기초 (m n p b g d s)',
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
      { char: 's', ipa: '/s/', ko: 'ㅅ', type: '치음 마찰음', example: 'seṭ-ṭhā' },
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
      { char: 'ṅ', ipa: '/ŋ/', ko: '"앙"의 ㅇ (k/g 앞)', type: '연구개 비음', example: 'pub-baṅ-ga-mā' },
      { char: 'ñ', ipa: '/ɲ/', ko: '"냐"의 초성', type: '경구개 비음', example: '(이 게송에 없음) 예: saññā, ñāṇa' },
      { char: 'ṭ', ipa: '/ʈ/', ko: '혀를 말아 ㄷ', type: '반설 무성', example: 'seṭ-ṭhā / pa-duṭ-ṭhe-na' },
      { char: 'ḍ', ipa: '/ɖ/', ko: '혀를 말아 ㄷ(울림)', type: '반설 유성', example: '(이 게송에 없음)' },
      { char: 'ṇ', ipa: '/ɳ/', ko: '혀를 말아 ㄴ', type: '반설 비음', example: '(다음 과)' },
    ],
    steps: [
      { type: 'intro', content: '빠알리어에만 있는 특수 발음부호를 배웁니다.\n점·물결표 같은 부호가 붙은 문자들입니다 (ṭ ḍ ṇ ṃ: 아래 점, ṅ: 위 점, ñ: 물결표).' },
      { type: 'quiz', content: '"seṭṭhā"의 ṭ는 어떻게 발음?', options: ['일반 ㄷ', '혀를 뒤로 말아서 ㄷ', '영어 th처럼', 'ㅌ처럼'], answer: 1 },
      { type: 'quiz', content: '"pubbaṅgamā"의 ṅ은?', options: ['"앙"의 받침 ㅇ 소리', '"능"의 ㄴ', '"밍"의 ㅁ', '묵음'], answer: 0 },
    ],
  },
}
