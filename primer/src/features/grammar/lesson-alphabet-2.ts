// 자모와 발음 2 — SuttaLog3 alphabet 기반, 행복경 예시
// 모음8 + 자음33 개별 teach + quiz
import type { StepWithoutId } from './types'

export const LESSON_ALPHABET_2: StepWithoutId[] = [
  {
    "type": "intro",
    "title": "자모와 발음 2",
    "subtitle": "모음 8자 · 자음 33자 — 행복경 예시",
    "description": "빠알리 알파벳 41자를 하나씩 익힙니다. 각 글자의 발음을 행복경(Maṅgala Sutta) 실제 단어로 확인합니다.",
    "icon": "🔡"
  },
  {
    "type": "teach-grammar",
    "title": "모음 8자 (a ā i ī u ū e o)",
    "example": "a=아, ā=아-, i=이, ī=이-, u=우, ū=우-, e=에, o=오",
    "exampleKo": "ā ī ū는 장모음(두 배 길게). e o는 항상 길게.",
    "explanation": "빠알리 모음은 8개. 위에 줄(ā)이 있으면 길게, 없으면 짧게 발음합니다."
  },
  {
    "type": "teach",
    "word": "a",
    "pronKo": "아",
    "meaning": "짧은 \"아\"",
    "icon": "🔊",
    "verseLine": "acintayuṃ [아찐따융]",
    "verseLineKo": "생각했다 (행복경)"
  },
  {
    "type": "teach",
    "word": "ā",
    "pronKo": "아-",
    "meaning": "긴 \"아\" (두 배 길게)",
    "icon": "🔊",
    "verseLine": "ārāme [아-라-메]",
    "verseLineKo": "동산에서 (행복경)"
  },
  {
    "type": "teach",
    "word": "i",
    "pronKo": "이",
    "meaning": "짧은 \"이\"",
    "icon": "🔊",
    "verseLine": "iti [이띠]",
    "verseLineKo": "이와 같이"
  },
  {
    "type": "teach",
    "word": "ī",
    "pronKo": "이-",
    "meaning": "긴 \"이\" (두 배 길게)",
    "icon": "🔊",
    "verseLine": "sīla [시-라]",
    "verseLineKo": "계율"
  },
  {
    "type": "teach",
    "word": "u",
    "pronKo": "우",
    "meaning": "짧은 \"우\"",
    "icon": "🔊",
    "verseLine": "uttamaṃ [욷따망]",
    "verseLineKo": "최상의 (행복경)"
  },
  {
    "type": "teach",
    "word": "ū",
    "pronKo": "우-",
    "meaning": "긴 \"우\" (두 배 길게)",
    "icon": "🔊",
    "verseLine": "pūjā [뿌-자-]",
    "verseLineKo": "공양 (행복경)"
  },
  {
    "type": "teach",
    "word": "e",
    "pronKo": "에",
    "meaning": "항상 긴 \"에\"",
    "icon": "🔊",
    "verseLine": "evaṃ [에왕]",
    "verseLineKo": "이와 같이 (행복경)"
  },
  {
    "type": "teach",
    "word": "o",
    "pronKo": "오",
    "meaning": "항상 긴 \"오\"",
    "icon": "🔊",
    "verseLine": "okāsa [오까-사]",
    "verseLineKo": "기회/허락"
  },
  {
    "type": "quiz",
    "question": "\"a\" 의 발음은?",
    "options": [
      "아-",
      "이",
      "아",
      "이-"
    ],
    "answer": 2,
    "hint": "짧은 \"아\""
  },
  {
    "type": "quiz",
    "question": "\"ā\" 의 발음은?",
    "options": [
      "아",
      "이",
      "아-",
      "이-"
    ],
    "answer": 2,
    "hint": "긴 \"아\" (두 배 길게)"
  },
  {
    "type": "quiz",
    "question": "\"i\" 의 발음은?",
    "options": [
      "아",
      "아-",
      "이",
      "이-"
    ],
    "answer": 2,
    "hint": "짧은 \"이\""
  },
  {
    "type": "quiz",
    "question": "\"ī\" 의 발음은?",
    "options": [
      "아",
      "아-",
      "이-",
      "이"
    ],
    "answer": 2,
    "hint": "긴 \"이\" (두 배 길게)"
  },
  {
    "type": "quiz",
    "question": "\"u\" 의 발음은?",
    "options": [
      "아",
      "아-",
      "우",
      "이"
    ],
    "answer": 2,
    "hint": "짧은 \"우\""
  },
  {
    "type": "quiz",
    "question": "\"ū\" 의 발음은?",
    "options": [
      "아",
      "아-",
      "우-",
      "이"
    ],
    "answer": 2,
    "hint": "긴 \"우\" (두 배 길게)"
  },
  {
    "type": "quiz",
    "question": "\"e\" 의 발음은?",
    "options": [
      "아",
      "아-",
      "에",
      "이"
    ],
    "answer": 2,
    "hint": "항상 긴 \"에\""
  },
  {
    "type": "quiz",
    "question": "\"o\" 의 발음은?",
    "options": [
      "아",
      "아-",
      "오",
      "이"
    ],
    "answer": 2,
    "hint": "항상 긴 \"오\""
  },
  {
    "type": "teach-grammar",
    "title": "후음 (k kh g gh ṅ) — 목구멍",
    "example": "k=까, kh=카, g=가",
    "exampleKo": "k · kh · g · gh · ṅ",
    "explanation": "후음 계열 자음 5개."
  },
  {
    "type": "teach",
    "word": "k",
    "pronKo": "까",
    "meaning": "된소리 \"까\"",
    "icon": "🔊",
    "verseLine": "kammantā [깜만따-]",
    "verseLineKo": "생업들 (행복경)"
  },
  {
    "type": "teach",
    "word": "kh",
    "pronKo": "카",
    "meaning": "거센소리 \"카\"",
    "icon": "🔊",
    "verseLine": "khantī [칸띠-]",
    "verseLineKo": "인내 (행복경)"
  },
  {
    "type": "teach",
    "word": "g",
    "pronKo": "가",
    "meaning": "\"가\"",
    "icon": "🔊",
    "verseLine": "gacchanti [갓찬띠]",
    "verseLineKo": "간다 (행복경)"
  },
  {
    "type": "teach",
    "word": "gh",
    "pronKo": "가(h)",
    "meaning": "숨 섞인 \"가\"",
    "icon": "🔊",
    "verseLine": "saṅgaho [상가호]",
    "verseLineKo": "보살핌 (행복경)"
  },
  {
    "type": "teach",
    "word": "ṅ",
    "pronKo": "응아",
    "meaning": "ng 소리",
    "icon": "🔊",
    "verseLine": "maṅgala [망갈라]",
    "verseLineKo": "행복 (행복경)"
  },
  {
    "type": "quiz",
    "question": "\"k\" 의 발음은?",
    "options": [
      "카",
      "가",
      "까",
      "가(h)"
    ],
    "answer": 2,
    "hint": "된소리 \"까\""
  },
  {
    "type": "quiz",
    "question": "\"kh\" 의 발음은?",
    "options": [
      "까",
      "가",
      "카",
      "가(h)"
    ],
    "answer": 2,
    "hint": "거센소리 \"카\""
  },
  {
    "type": "quiz",
    "question": "\"g\" 의 발음은?",
    "options": [
      "까",
      "카",
      "가",
      "가(h)"
    ],
    "answer": 2,
    "hint": "\"가\""
  },
  {
    "type": "quiz",
    "question": "\"gh\" 의 발음은?",
    "options": [
      "까",
      "카",
      "가(h)",
      "가"
    ],
    "answer": 2,
    "hint": "숨 섞인 \"가\""
  },
  {
    "type": "quiz",
    "question": "\"ṅ\" 의 발음은?",
    "options": [
      "까",
      "카",
      "응아",
      "가"
    ],
    "answer": 2,
    "hint": "ng 소리"
  },
  {
    "type": "teach-grammar",
    "title": "구개음 (c ch j jh ñ) — 입천장",
    "example": "c=짜, ch=차, j=자",
    "exampleKo": "c · ch · j · jh · ñ",
    "explanation": "구개음 계열 자음 5개."
  },
  {
    "type": "teach",
    "word": "c",
    "pronKo": "짜",
    "meaning": "된소리 \"짜\"",
    "icon": "🔊",
    "verseLine": "ca [짜]",
    "verseLineKo": "그리고 (행복경)"
  },
  {
    "type": "teach",
    "word": "ch",
    "pronKo": "차",
    "meaning": "거센소리 \"차\"",
    "icon": "🔊",
    "verseLine": "dhammasākacchā [담마사-깟차-]",
    "verseLineKo": "법담을 나눔 (행복경)"
  },
  {
    "type": "teach",
    "word": "j",
    "pronKo": "자",
    "meaning": "\"자\"",
    "icon": "🔊",
    "verseLine": "Jetavane [제따와네]",
    "verseLineKo": "제따와나에서 (행복경)"
  },
  {
    "type": "teach",
    "word": "jh",
    "pronKo": "자(h)",
    "meaning": "숨 섞인 \"자\"",
    "icon": "🔊",
    "verseLine": "jhāna [자-나]",
    "verseLineKo": "선정"
  },
  {
    "type": "teach",
    "word": "ñ",
    "pronKo": "냐",
    "meaning": "\"냐\"",
    "icon": "🔊",
    "verseLine": "kataññutā [까딴뉴따-]",
    "verseLineKo": "감사함 (행복경)"
  },
  {
    "type": "quiz",
    "question": "\"c\" 의 발음은?",
    "options": [
      "까",
      "카",
      "짜",
      "가"
    ],
    "answer": 2,
    "hint": "된소리 \"짜\""
  },
  {
    "type": "quiz",
    "question": "\"ch\" 의 발음은?",
    "options": [
      "까",
      "카",
      "차",
      "가"
    ],
    "answer": 2,
    "hint": "거센소리 \"차\""
  },
  {
    "type": "quiz",
    "question": "\"j\" 의 발음은?",
    "options": [
      "까",
      "카",
      "자",
      "가"
    ],
    "answer": 2,
    "hint": "\"자\""
  },
  {
    "type": "quiz",
    "question": "\"jh\" 의 발음은?",
    "options": [
      "까",
      "카",
      "자(h)",
      "가"
    ],
    "answer": 2,
    "hint": "숨 섞인 \"자\""
  },
  {
    "type": "quiz",
    "question": "\"ñ\" 의 발음은?",
    "options": [
      "까",
      "카",
      "냐",
      "가"
    ],
    "answer": 2,
    "hint": "\"냐\""
  },
  {
    "type": "teach-grammar",
    "title": "권설음 (ṭ ṭh ḍ ḍh ṇ) — 혀를 말아",
    "example": "ṭ=따(권), ṭh=타(권), ḍ=다(권)",
    "exampleKo": "ṭ · ṭh · ḍ · ḍh · ṇ",
    "explanation": "점이 아래 붙은 글자(ṭ ḍ ṇ). 혀끝을 위로 말아 발음합니다."
  },
  {
    "type": "teach",
    "word": "ṭ",
    "pronKo": "따(권)",
    "meaning": "혀를 말아 \"따\"",
    "icon": "🔊",
    "verseLine": "upaṭṭhānaṃ [우빳타-낭]",
    "verseLineKo": "봉양 (행복경)"
  },
  {
    "type": "teach",
    "word": "ṭh",
    "pronKo": "타(권)",
    "meaning": "혀를 말아 \"타\"",
    "icon": "🔊",
    "verseLine": "santuṭṭhī [산뚯티-]",
    "verseLineKo": "만족 (행복경)"
  },
  {
    "type": "teach",
    "word": "ḍ",
    "pronKo": "다(권)",
    "meaning": "혀를 말아 \"다\"",
    "icon": "🔊",
    "verseLine": "paṇḍitānaṃ [빤디따-낭]",
    "verseLineKo": "현명한 이들의 (행복경)"
  },
  {
    "type": "teach",
    "word": "ḍh",
    "pronKo": "다(권h)",
    "meaning": "혀를 말아 숨 섞인 \"다\"",
    "icon": "🔊",
    "verseLine": "viḍḍha [윋다]",
    "verseLineKo": "꿰뚫린"
  },
  {
    "type": "teach",
    "word": "ṇ",
    "pronKo": "나(권)",
    "meaning": "혀를 말아 \"나\"",
    "icon": "🔊",
    "verseLine": "piṇḍikassa [삔디깟사]",
    "verseLineKo": "핀디까의 (행복경)"
  },
  {
    "type": "quiz",
    "question": "\"ṭ\" 의 발음은?",
    "options": [
      "까",
      "카",
      "따(권)",
      "가"
    ],
    "answer": 2,
    "hint": "혀를 말아 \"따\""
  },
  {
    "type": "quiz",
    "question": "\"ṭh\" 의 발음은?",
    "options": [
      "까",
      "카",
      "타(권)",
      "가"
    ],
    "answer": 2,
    "hint": "혀를 말아 \"타\""
  },
  {
    "type": "quiz",
    "question": "\"ḍ\" 의 발음은?",
    "options": [
      "까",
      "카",
      "다(권)",
      "가"
    ],
    "answer": 2,
    "hint": "혀를 말아 \"다\""
  },
  {
    "type": "quiz",
    "question": "\"ḍh\" 의 발음은?",
    "options": [
      "까",
      "카",
      "다(권h)",
      "가"
    ],
    "answer": 2,
    "hint": "혀를 말아 숨 섞인 \"다\""
  },
  {
    "type": "quiz",
    "question": "\"ṇ\" 의 발음은?",
    "options": [
      "까",
      "카",
      "나(권)",
      "가"
    ],
    "answer": 2,
    "hint": "혀를 말아 \"나\""
  },
  {
    "type": "teach-grammar",
    "title": "치음 (t th d dh n) — 이에 혀",
    "example": "t=따, th=타, d=다",
    "exampleKo": "t · th · d · dh · n",
    "explanation": "치음 계열 자음 5개."
  },
  {
    "type": "teach",
    "word": "t",
    "pronKo": "따",
    "meaning": "이에 혀 대고 \"따\"",
    "icon": "🔊",
    "verseLine": "tapo [따뽀]",
    "verseLineKo": "고행 (행복경)"
  },
  {
    "type": "teach",
    "word": "th",
    "pronKo": "타",
    "meaning": "이에 혀 대고 \"타\"",
    "icon": "🔊",
    "verseLine": "sotthānaṃ [솟타-낭]",
    "verseLineKo": "안녕을 (행복경)"
  },
  {
    "type": "teach",
    "word": "d",
    "pronKo": "다",
    "meaning": "이에 혀 대고 \"다\"",
    "icon": "🔊",
    "verseLine": "dānañca [다-난짜]",
    "verseLineKo": "보시 (행복경)"
  },
  {
    "type": "teach",
    "word": "dh",
    "pronKo": "다(h)",
    "meaning": "이에 혀 대고 숨 섞인 \"다\"",
    "icon": "🔊",
    "verseLine": "dhammesu [담메수]",
    "verseLineKo": "법들에서 (행복경)"
  },
  {
    "type": "teach",
    "word": "n",
    "pronKo": "나",
    "meaning": "\"나\"",
    "icon": "🔊",
    "verseLine": "nivāto [니와-또]",
    "verseLineKo": "겸손 (행복경)"
  },
  {
    "type": "quiz",
    "question": "\"t\" 의 발음은?",
    "options": [
      "까",
      "카",
      "따",
      "가"
    ],
    "answer": 2,
    "hint": "이에 혀 대고 \"따\""
  },
  {
    "type": "quiz",
    "question": "\"th\" 의 발음은?",
    "options": [
      "까",
      "카",
      "타",
      "가"
    ],
    "answer": 2,
    "hint": "이에 혀 대고 \"타\""
  },
  {
    "type": "quiz",
    "question": "\"d\" 의 발음은?",
    "options": [
      "까",
      "카",
      "다",
      "가"
    ],
    "answer": 2,
    "hint": "이에 혀 대고 \"다\""
  },
  {
    "type": "quiz",
    "question": "\"dh\" 의 발음은?",
    "options": [
      "까",
      "카",
      "다(h)",
      "가"
    ],
    "answer": 2,
    "hint": "이에 혀 대고 숨 섞인 \"다\""
  },
  {
    "type": "quiz",
    "question": "\"n\" 의 발음은?",
    "options": [
      "까",
      "카",
      "나",
      "가"
    ],
    "answer": 2,
    "hint": "\"나\""
  },
  {
    "type": "teach-grammar",
    "title": "순음 (p ph b bh m) — 입술",
    "example": "p=빠, ph=파, b=바",
    "exampleKo": "p · ph · b · bh · m",
    "explanation": "순음 계열 자음 5개."
  },
  {
    "type": "teach",
    "word": "p",
    "pronKo": "빠",
    "meaning": "된소리 \"빠\"",
    "icon": "🔊",
    "verseLine": "pūjā [뿌-자-]",
    "verseLineKo": "공양 (행복경)"
  },
  {
    "type": "teach",
    "word": "ph",
    "pronKo": "파",
    "meaning": "거센소리 \"파\"",
    "icon": "🔊",
    "verseLine": "phuṭṭhassa [풋탓사]",
    "verseLineKo": "부딪힌 자의 (행복경)"
  },
  {
    "type": "teach",
    "word": "b",
    "pronKo": "바",
    "meaning": "\"바\"",
    "icon": "🔊",
    "verseLine": "bahū [바후-]",
    "verseLineKo": "많은 (행복경)"
  },
  {
    "type": "teach",
    "word": "bh",
    "pronKo": "바(h)",
    "meaning": "숨 섞인 \"바\"",
    "icon": "🔊",
    "verseLine": "bhagavā [바가와-]",
    "verseLineKo": "세존 (행복경)"
  },
  {
    "type": "teach",
    "word": "m",
    "pronKo": "마",
    "meaning": "\"마\"",
    "icon": "🔊",
    "verseLine": "maṅgala [망갈라]",
    "verseLineKo": "행복 (행복경)"
  },
  {
    "type": "quiz",
    "question": "\"p\" 의 발음은?",
    "options": [
      "까",
      "카",
      "빠",
      "가"
    ],
    "answer": 2,
    "hint": "된소리 \"빠\""
  },
  {
    "type": "quiz",
    "question": "\"ph\" 의 발음은?",
    "options": [
      "까",
      "카",
      "파",
      "가"
    ],
    "answer": 2,
    "hint": "거센소리 \"파\""
  },
  {
    "type": "quiz",
    "question": "\"b\" 의 발음은?",
    "options": [
      "까",
      "카",
      "바",
      "가"
    ],
    "answer": 2,
    "hint": "\"바\""
  },
  {
    "type": "quiz",
    "question": "\"bh\" 의 발음은?",
    "options": [
      "까",
      "카",
      "바(h)",
      "가"
    ],
    "answer": 2,
    "hint": "숨 섞인 \"바\""
  },
  {
    "type": "quiz",
    "question": "\"m\" 의 발음은?",
    "options": [
      "까",
      "카",
      "마",
      "가"
    ],
    "answer": 2,
    "hint": "\"마\""
  },
  {
    "type": "teach-grammar",
    "title": "기타 자음 (y r l v s h ḷ ṃ)",
    "example": "y=야, r=라, l=라(l)",
    "exampleKo": "y · r · l · v · s · h · ḷ · ṃ",
    "explanation": "반모음(y r l v), 치찰음(s), 기음(h), 특수음(ḷ ṃ)."
  },
  {
    "type": "teach",
    "word": "y",
    "pronKo": "야",
    "meaning": "\"야\"",
    "icon": "🔊",
    "verseLine": "yassa [얏사]",
    "verseLineKo": "~의 (행복경)"
  },
  {
    "type": "teach",
    "word": "r",
    "pronKo": "라",
    "meaning": "혀 굴리지 않는 \"라\"",
    "icon": "🔊",
    "verseLine": "virajaṃ [위라장]",
    "verseLineKo": "티끌 없는 (행복경)"
  },
  {
    "type": "teach",
    "word": "l",
    "pronKo": "라(l)",
    "meaning": "혀끝 윗잇몸 \"라\"",
    "icon": "🔊",
    "verseLine": "lokadhammehi [로까담메히]",
    "verseLineKo": "세상의 법으로 (행복경)"
  },
  {
    "type": "teach",
    "word": "v",
    "pronKo": "와",
    "meaning": "\"와\" (w에 가까움)",
    "icon": "🔊",
    "verseLine": "viharati [위하라띠]",
    "verseLineKo": "머무시다 (행복경)"
  },
  {
    "type": "teach",
    "word": "s",
    "pronKo": "사(싸)",
    "meaning": "\"사(싸)\"",
    "icon": "🔊",
    "verseLine": "sevanā [세와나-]",
    "verseLineKo": "가까이함 (행복경)"
  },
  {
    "type": "teach",
    "word": "h",
    "pronKo": "하",
    "meaning": "\"하\"",
    "icon": "🔊",
    "verseLine": "brūhi [브루-히]",
    "verseLineKo": "말씀해 주소서 (행복경)"
  },
  {
    "type": "teach",
    "word": "ḷ",
    "pronKo": "라(ḷ)",
    "meaning": "혀를 말아 \"라\"",
    "icon": "🔊",
    "verseLine": "bāḷhaṃ [바-랑]",
    "verseLineKo": "강하게"
  },
  {
    "type": "teach",
    "word": "ṃ",
    "pronKo": "(ṃ)→ㅇ",
    "meaning": "콧소리 받침 (니가히따)",
    "icon": "🔊",
    "verseLine": "evaṃ [에왕]",
    "verseLineKo": "이와 같이 (행복경)"
  },
  {
    "type": "quiz",
    "question": "\"y\" 의 발음은?",
    "options": [
      "까",
      "카",
      "야",
      "가"
    ],
    "answer": 2,
    "hint": "\"야\""
  },
  {
    "type": "quiz",
    "question": "\"r\" 의 발음은?",
    "options": [
      "까",
      "카",
      "라",
      "가"
    ],
    "answer": 2,
    "hint": "혀 굴리지 않는 \"라\""
  },
  {
    "type": "quiz",
    "question": "\"l\" 의 발음은?",
    "options": [
      "까",
      "카",
      "라(l)",
      "가"
    ],
    "answer": 2,
    "hint": "혀끝 윗잇몸 \"라\""
  },
  {
    "type": "quiz",
    "question": "\"v\" 의 발음은?",
    "options": [
      "까",
      "카",
      "와",
      "가"
    ],
    "answer": 2,
    "hint": "\"와\" (w에 가까움)"
  },
  {
    "type": "quiz",
    "question": "\"s\" 의 발음은?",
    "options": [
      "까",
      "카",
      "사",
      "가"
    ],
    "answer": 2,
    "hint": "\"사\""
  },
  {
    "type": "quiz",
    "question": "\"h\" 의 발음은?",
    "options": [
      "까",
      "카",
      "하",
      "가"
    ],
    "answer": 2,
    "hint": "\"하\""
  },
  {
    "type": "quiz",
    "question": "\"ḷ\" 의 발음은?",
    "options": [
      "까",
      "카",
      "라(ḷ)",
      "가"
    ],
    "answer": 2,
    "hint": "혀를 말아 \"라\""
  },
  {
    "type": "quiz",
    "question": "\"ṃ\" 의 발음은?",
    "options": [
      "까",
      "카",
      "(ṃ)→ㅇ",
      "가"
    ],
    "answer": 2,
    "hint": "콧소리 받침 (니가히따)"
  }
]
