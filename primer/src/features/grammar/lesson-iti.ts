// 인용 표시 iti (’ti) — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_ITI: StepWithoutId[] = [
  {"type": "intro", "title": "인용 표시 iti", "subtitle": "\"~라고\" — 말과 생각을 닫는 표시", "description": "경전에서 대화·생각·이름은 iti(\"~라고\")로 닫습니다.\n\n연성 때문에 앞말에 붙어 'ti, -nti 로\n짧아지는 경우가 많아 처음에는 알아보기 어렵습니다.", "icon": "💬"},
  {"type": "teach-grammar", "title": "iti가 붙는 모양", "example": "bhikkhavo + iti → bhikkhavo’ti\nariyasaccaṃ + iti → ariyasacca’nti\ngacchāmi + iti → gacchāmī’ti", "exampleKo": "\"비구들이여\"라고\n\"성스러운 진리\"라고\n\"나는 간다\"라고", "explanation": "iti의 i가 앞말과 합쳐집니다.\n\n• 모음 뒤: 'ti (앞 모음 a·i·u는 길어지기도 함)\n  gacchāmi → gacchāmī'ti\n• ṃ 뒤: 'nti (ṃ이 n으로 바뀜)\n  saccaṃ → sacca'nti\n\n따옴표(‘ ’ 또는 “ ”) 바로 뒤의 ti / nti를 찾으면 됩니다."},
  {"type": "teach-grammar", "title": "iti의 쓰임", "example": "“Bhikkhavo”ti.\n‘gacchāmī’ti pajānāti\nItipi so bhagavā …", "exampleKo": "\"비구들이여\"라고 (부르셨다)\n\"나는 간다\"라고 분명히 안다\n이렇게 그분 세존께서는 …", "explanation": "① 말 인용: 누가 한 말의 끝\n② 생각·앎의 내용: pajānāti(분명히 안다), maññati(여긴다) 앞\n③ 문장 처음의 iti: \"이와 같이, 이렇게\"\n  (Itipi so bhagavā = 이렇게 그분 세존께서는)"},
  {"type": "teach", "word": "iti", "pronKo": "이띠", "meaning": "~라고, 이와 같이", "icon": "💬", "grammar": "불변화사 (인용)", "formNote": "모음 뒤에서 'ti, ṃ 뒤에서 'nti로 줄어듦"},
  {"type": "teach", "word": "pajānāti", "pronKo": "빠자-나-띠", "meaning": "분명히 안다", "icon": "💡", "grammar": "동사, 현재 3인칭 단수", "baseForm": "pa (앞으로·분명히) + jānāti (안다)", "formNote": "‘…’ti pajānāti = '…'라고 분명히 안다"},
  {"type": "verse", "pali": "“Bhikkhavo”ti. “Bhadante”ti te bhikkhū bhagavato paccassosuṃ.", "pronKo": "\"빅카오-\"띠. \"바단떼-\"띠 떼- 빅쿠- 바가와또- 빳짯소-숭.", "translation": "\"비구들이여\"라고 (세존께서 부르셨다). \"존자시여\"라고 그 비구들은 세존께 대답하였다.", "highlight": ["Bhikkhavo", "Bhadante", "paccassosuṃ"], "note": "경의 첫머리마다 나오는 정형구입니다.\n“…”ti 가 두 번: 세존의 말 / 비구들의 대답"},
  {"type": "verse", "pali": "Gacchanto vā ‘gacchāmī’ti pajānāti.", "pronKo": "갓찬또- 와- '갓차-미-'띠 빠자-나-띠.", "translation": "걸어갈 때는 \"나는 걷는다\"라고 분명히 안다.", "highlight": ["gacchāmī", "pajānāti"], "note": "대념처경(MN 10)의 한 구절입니다.\ngacchāmi + iti → gacchāmī'ti (i가 길어짐)"},
  {"type": "verse", "pali": "‘Idaṃ dukkhaṃ ariyasacca’nti me, bhikkhave, pubbe ananussutesu dhammesu cakkhuṃ udapādi.", "pronKo": "'이당 둑캉 아리야삿짜'느띠 메-, 빅카웨-, 뿝베- 아나눗수떼-수 담메-수 짝쿵 우다빠-디.", "translation": "비구들이여, '이것이 괴로움의 성스러운 진리이다'라고, 전에 들어 보지 못한 법들에 대해 나에게 눈이 생겨났다.", "highlight": ["ariyasacca"], "note": "초전법륜경(SN 56.11)\nariyasaccaṃ + iti → ariyasacca'nti (ṃ → n)"},
  {"type": "quiz", "question": "\"ariyasacca'nti\"에서 'nti는?", "options": ["ariyasaccaṃ + iti (인용 표시)", "동사 3인칭 복수 어미", "부정어", "처소격 어미"], "answer": 0, "hint": "ṃ + iti → nti", "explain": "ṃ으로 끝나는 말에 iti가 붙으면 'nti가 됩니다. 동사 어미 -nti와 헷갈리지 마세요."},
  {"type": "quiz", "question": "\"‘gacchāmī’ti pajānāti\"의 뜻은?", "options": ["\"나는 간다\"라고 분명히 안다", "가면서 분명히 안다", "나는 가서 안다", "\"그는 간다\"라고 말한다"], "answer": 0, "hint": "따옴표 안 = 생각의 내용", "explain": "'…'ti 안의 gacchāmi(나는 간다)가 아는 내용입니다."},
  {"type": "quiz", "question": "문장 처음의 \"Itipi so bhagavā\"에서 iti의 뜻은?", "options": ["이와 같이, 이렇게", "~라고 말했다", "그러므로", "만약"], "answer": 0, "hint": "문장 처음의 iti", "explain": "문장 처음에 오면 \"이와 같이\"의 뜻입니다."},
  {"type": "speak", "pali": "Gacchanto vā ‘gacchāmī’ti pajānāti.", "pronKo": "갓찬또- 와- '갓차-미-'띠 빠자-나-띠."},
]
