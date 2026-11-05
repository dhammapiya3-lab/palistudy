// 동사 접두사 (upasagga) — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_PREFIX: StepWithoutId[] = [
  {"type": "intro", "title": "동사 접두사 (Upasagga)", "subtitle": "앞에 붙어 뜻을 바꾸는 말", "description": "같은 동사라도 앞에 무엇이 붙느냐에 따라\n뜻이 달라집니다.\n\ngacchati (가다) → āgacchati (오다)\njānāti (알다) → pajānāti (분명히 알다)\n\n접두사 뜻을 알면 처음 보는 동사도 짐작할 수 있습니다.", "icon": "➕"},
  {"type": "teach-grammar", "title": "자주 나오는 접두사 ①", "example": "ā-   āgacchati\nupa- upagacchati\npa-  pajānāti\nabhi- abhijānāti\nsaṃ- saṃvattati", "exampleKo": "이쪽으로 → 오다\n가까이 → 다가가다\n앞으로·분명히 → 분명히 알다\n뛰어나게·향하여 → 철저히 알다\n함께·완전히 → (함께) 일어나다, 이끌다", "explanation": "접두사 끝소리와 동사 첫소리가 만나\n소리가 바뀌기도 합니다 (연성).\n  saṃ + vattati → saṃvattati\n  ud + gacchati → uggacchati"},
  {"type": "teach-grammar", "title": "자주 나오는 접두사 ②", "example": "vi-  viharati\nni-  nisīdati\npari- parinibbāyati\nanu- anupassati\nud-  uggacchati\npaṭi- paṭipajjati", "exampleKo": "나누어·떨어져 → 머물다\n아래로 → 앉다\n둘레·완전히 → 완전한 열반에 들다\n따라 → 따라 관찰하다\n위로 → 떠오르다\n거슬러·향하여 → 실천하다", "explanation": "명사에도 같은 접두사가 붙습니다.\n  anupassī (따라 관찰하는 이)\n  paṭipadā (실천, 길)\n  sampajāno (분명히 아는)"},
  {"type": "teach", "word": "anupassī", "pronKo": "아누빳시-", "meaning": "따라 관찰하는 이", "icon": "👀", "grammar": "형용사(명사적), 남성 주격 단수", "baseForm": "anu (따라) + passati (보다)", "formNote": "kāye kāyānupassī = 몸에서 몸을 따라 관찰하는"},
  {"type": "teach", "word": "viharati", "pronKo": "위하라띠", "meaning": "머문다, 지낸다", "icon": "🏡", "grammar": "동사, 현재 3인칭 단수", "baseForm": "vi + harati (가져가다)"},
  {"type": "teach", "word": "nisīdati", "pronKo": "니시-다띠", "meaning": "앉는다", "icon": "🪑", "grammar": "동사, 현재 3인칭 단수", "baseForm": "ni (아래로) + sīdati (가라앉다)"},
  {"type": "teach", "word": "sampajāno", "pronKo": "삼빠자-노-", "meaning": "분명히 알아차리는", "icon": "🔆", "grammar": "형용사, 남성 주격 단수", "baseForm": "saṃ + pa + jānāti"},
  {"type": "verse", "pali": "Kāye kāyānupassī viharati ātāpī sampajāno satimā.", "pronKo": "까-예- 까-야-누빳시- 위하라띠 아-따-삐- 삼빠자-노- 사띠마-.", "translation": "몸에서 몸을 따라 관찰하며 머문다, 열심히, 분명히 알아차리며, 마음챙기며.", "highlight": ["kāyānupassī", "viharati", "sampajāno"], "note": "대념처경(MN 10)\nanu-passī, vi-harati, saṃ-pa-jāno — 접두사 셋"},
  {"type": "verse", "pali": "Nisīdati pallaṅkaṃ ābhujitvā, ujuṃ kāyaṃ paṇidhāya.", "pronKo": "니시-다띠 빨랑깡 아-부지뜨와-, 우중 까-양 빠니다-야.", "translation": "가부좌를 틀고, 몸을 곧게 세우고 앉는다.", "highlight": ["Nisīdati", "ābhujitvā", "paṇidhāya"], "note": "대념처경(MN 10)\nā-bhujitvā (구부려서), pa-ṇidhāya (향하여 두고)"},
  {"type": "quiz", "question": "\"āgacchati\"의 뜻은?", "options": ["오다", "가다", "떠나다", "앉다"], "answer": 0, "hint": "ā = 이쪽으로", "explain": "ā(이쪽으로) + gacchati(가다) = 오다"},
  {"type": "quiz", "question": "\"anupassī\"의 anu-는 무슨 뜻?", "options": ["따라", "아래로", "위로", "함께"], "answer": 0, "hint": "anu-passati", "explain": "anu(따라) + passati(보다) = 따라 관찰하다"},
  {"type": "quiz", "question": "\"uggacchati\"는 어떻게 만들어졌나?", "options": ["ud(위로) + gacchati", "ug + acchati", "u + gacchati", "uggha + cchati"], "answer": 0, "hint": "연성 d + g → gg", "explain": "ud + gacchati → uggacchati (떠오르다)"},
  {"type": "speak", "pali": "Kāye kāyānupassī viharati ātāpī sampajāno satimā.", "pronKo": "까-예- 까-야-누빳시- 위하라띠 아-따-삐- 삼빠자-노- 사띠마-."},
]
