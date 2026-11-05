// 줄임 표시와 정형구 — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_PEYYALA: StepWithoutId[] = [
  {"type": "intro", "title": "줄임 표시와 정형구", "subtitle": "pe · 처음과 끝의 정형구", "description": "경전은 같은 말을 여러 번 되풀이합니다.\n그래서 반복되는 부분은 pe(…)로 줄여 적습니다.\n\n또 경의 처음과 끝에는 늘 같은 정형구가 옵니다.", "icon": "📜"},
  {"type": "teach-grammar", "title": "줄임 표시 pe (peyyāla)", "example": "… pe …\n…pa…", "exampleKo": "이하 같음 (앞에 나온 대로 되풀이)", "explanation": "pe = peyyāla (반복 생략)\n\n앞에 나온 문장을 그대로 넣어 읽으면 됩니다.\n예) 네 가지 마음챙김 각각에 같은 문장이 되풀이될 때\n두 번째부터 \"… pe …\"로 줄여 적음\n\n※ 이 앱의 경전 과는 줄이지 않고 다 풀어 적었습니다."},
  {"type": "teach-grammar", "title": "경의 처음 — 이와 같이 나는 들었다", "example": "Evaṃ me sutaṃ — ekaṃ samayaṃ bhagavā … viharati …", "exampleKo": "이와 같이 나는 들었다. 한때 세존께서는 …에 머무셨다.", "explanation": "거의 모든 경이 이 말로 시작합니다.\n아난다 존자가 1차 결집에서 경을 외우며 한 말입니다.\n\n• evaṃ = 이와 같이\n• me = 나에 의해 / 나의 (도구격/소유격)\n• sutaṃ = 들은 (과거분사)\n• ekaṃ samayaṃ = 한때 (때의 목적격)"},
  {"type": "teach-grammar", "title": "경의 끝 — 비구들은 기뻐하였다", "example": "Idamavoca bhagavā. Attamanā te bhikkhū bhagavato bhāsitaṃ abhinandunti.", "exampleKo": "세존께서 이렇게 말씀하셨다. 그 비구들은 흡족한 마음으로 세존의 말씀을 기뻐하였다.", "explanation": "• Idamavoca = idaṃ + avoca (이것을 말씀하셨다)\n• attamanā = 흡족한 마음인 (소유 복합어)\n• bhagavato bhāsitaṃ = 세존의 말씀 (소유격)\n• abhinanduṃ + iti → abhinandunti"},
  {"type": "teach", "word": "pe", "pronKo": "뻬-", "meaning": "이하 같음 (반복 생략)", "icon": "✂️", "grammar": "줄임 표시", "baseForm": "peyyāla"},
  {"type": "teach", "word": "sutaṃ", "pronKo": "수땅", "meaning": "들은 (것)", "icon": "👂", "grammar": "과거분사, 중성 주격 단수", "baseForm": "suṇāti (듣다) → suta"},
  {"type": "teach", "word": "abhinanduṃ", "pronKo": "아비난둥", "meaning": "기뻐하였다", "icon": "😊", "grammar": "동사 과거형, 3인칭 복수", "baseForm": "abhi + nandati (기뻐하다)"},
  {"type": "verse", "pali": "Evaṃ me sutaṃ — ekaṃ samayaṃ bhagavā sāvatthiyaṃ viharati jetavane anāthapiṇḍikassa ārāme.", "pronKo": "에-왕 메- 수땅 — 에-깡 사마양 바가와- 사-왓티양 위하라띠 제-따와네- 아나-타삔디깟사 아-라-메-.", "translation": "이와 같이 나는 들었다. 한때 세존께서는 사왓티의 제따 숲, 아나타삔디까의 동산에 머무셨다.", "highlight": ["Evaṃ", "me", "sutaṃ"], "note": "경의 처음 정형구"},
  {"type": "verse", "pali": "Idamavoca bhagavā. Attamanā te bhikkhū bhagavato bhāsitaṃ abhinandunti.", "pronKo": "이다마오-짜 바가와-. 앗따마나- 떼- 빅쿠- 바가와또- 바-시땅 아비난둔띠.", "translation": "세존께서 이렇게 말씀하셨다. 그 비구들은 흡족한 마음으로 세존의 말씀을 기뻐하였다.", "highlight": ["Idamavoca", "abhinandunti"], "note": "대념처경(MN 10)의 끝맺음\nabhinandunti = abhinanduṃ + iti"},
  {"type": "quiz", "question": "경전의 \"… pe …\"는?", "options": ["앞에 나온 말을 되풀이한다는 줄임 표시", "\"~라고\"", "부정어", "문장의 끝"], "answer": 0, "hint": "peyyāla", "explain": "pe는 반복되는 부분을 줄였다는 표시입니다."},
  {"type": "quiz", "question": "\"abhinandunti\"를 풀면?", "options": ["abhinanduṃ + iti", "abhinandati + nti", "abhi + nandunti (현재)", "abhinanda + unti"], "answer": 0, "hint": "ṃ + iti → nti", "explain": "과거형 abhinanduṃ(기뻐하였다)에 인용 표시 iti가 붙었습니다."},
  {"type": "quiz", "question": "\"Evaṃ me sutaṃ\"의 sutaṃ은?", "options": ["과거분사 (들은)", "동사 현재형", "명령형", "부사"], "answer": 0, "hint": "suṇāti → suta", "explain": "sutaṃ은 suṇāti(듣다)의 과거분사입니다."},
  {"type": "speak", "pali": "Evaṃ me sutaṃ — ekaṃ samayaṃ bhagavā sāvatthiyaṃ viharati jetavane anāthapiṇḍikassa ārāme.", "pronKo": "에-왕 메- 수땅 — 에-깡 사마양 바가와- 사-왓티양 위하라띠 제-따와네- 아나-타삔디깟사 아-라-메-.", "translation": "이와 같이 나는 들었다. 한때 세존께서는 사왓티의 제따 숲, 아나타삔디까의 동산에 머무셨다."},
]
