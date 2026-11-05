// 자음 어간 명사 (-an, -as) — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_CONSONANT_STEM: StepWithoutId[] = [
  {"type": "intro", "title": "자음 어간 명사", "subtitle": "-an (attā, rājā) · -as (mano, ceto)", "description": "어간이 자음으로 끝나는 명사는\n격변화가 -a 명사와 조금 다릅니다.\n\n• -an 남성: attan(자아), rājan(왕), brahman(범천)\n• -as 중성: manas(마음), cetas(마음), vacas(말)", "icon": "🧱"},
  {"type": "teach-grammar", "title": "-an 남성명사: attan (자아)", "example": "주격  attā\n목적격 attānaṃ\n도구격 attanā\n여격·소유격 attano\n처소격 attani", "exampleKo": "자아는\n자아를\n자아에 의해, 스스로\n자아의, 자기의\n자아에", "explanation": "어간 attan-의 n이 격에 따라 나타났다 사라집니다.\n\n같은 무리: rājan (왕)\n  rājā (주격), rājānaṃ (목적격)\n  raññā (도구격), rañño (여격·소유격)\nbrahman (범천)\n  brahmā (주격), brahmunā (도구격), brahmuno (소유격)"},
  {"type": "teach-grammar", "title": "-as 중성명사: manas (마음)", "example": "주격·목적격 mano\n도구격 manasā\n여격·소유격 manaso\n처소격 manasi", "exampleKo": "마음은, 마음을\n마음으로\n마음의\n마음에", "explanation": "주격은 -o로 끝나 남성명사처럼 보이지만\n중성명사입니다.\n\n도구격 -asā가 특징:\n  manasā (마음으로), cetasā (마음으로), vacasā (말로)\n\n복합어 앞에서는 mano-:\n  manoseṭṭhā, manomayā"},
  {"type": "teach", "word": "attā", "pronKo": "앗따-", "meaning": "자아, 자기", "icon": "🪞", "grammar": "-an 남성명사, 주격 단수", "baseForm": "attan", "formNote": "무아(anattā) = an(아님) + attā"},
  {"type": "teach", "word": "attano", "pronKo": "앗따노-", "meaning": "자기의, 자신에게", "icon": "👤", "grammar": "-an 남성명사, 소유격 단수", "baseForm": "attan"},
  {"type": "teach", "word": "rañño", "pronKo": "란뇨-", "meaning": "왕의, 왕에게", "icon": "👑", "grammar": "-an 남성명사, 소유격 단수", "baseForm": "rājan (왕)", "formNote": "주격 rājā"},
  {"type": "teach", "word": "manasā", "pronKo": "마나사-", "meaning": "마음으로", "icon": "🧠", "grammar": "-as 중성명사, 도구격 단수", "baseForm": "manas (마음)"},
  {"type": "teach", "word": "cetasā", "pronKo": "쩨-따사-", "meaning": "마음으로", "icon": "💭", "grammar": "-as 중성명사, 도구격 단수", "baseForm": "cetas (마음)"},
  {"type": "verse", "pali": "Manasā ce paduṭṭhena, bhāsati vā karoti vā.", "pronKo": "마나사- 쩨- 빠둣테-나, 바-사띠 와- 까로-띠 와-.", "translation": "만일 더러워진 마음으로 말하거나 행하면,", "highlight": ["Manasā"], "note": "법구경 1게\nmanasā paduṭṭhena = 더러워진 마음으로 (도구격 + 도구격 과거분사)"},
  {"type": "verse", "pali": "Attā hi attano nātho, ko hi nātho paro siyā.", "pronKo": "앗따- 히 앗따노- 나-토-, 꼬- 히 나-토- 빠로- 시야-.", "translation": "자기야말로 자기의 의지처이니, 다른 누가 의지처가 되겠는가.", "highlight": ["Attā", "attano"], "note": "법구경 160게\nattā (주격) / attano (소유격)"},
  {"type": "quiz", "question": "\"attano\"는 무슨 격?", "options": ["소유격 (자기의)", "주격", "목적격", "처소격"], "answer": 0, "hint": "attan의 -o 꼴", "explain": "attano는 attan의 여격·소유격 꼴이며, 여기서는 \"자기의\"입니다."},
  {"type": "quiz", "question": "\"manasā\"의 뜻은?", "options": ["마음으로", "마음은", "마음의", "마음에"], "answer": 0, "hint": "-as 중성의 도구격 -asā", "explain": "manasā는 manas(마음)의 도구격입니다."},
  {"type": "quiz", "question": "\"mano\"는 무슨 성(性)의 명사?", "options": ["중성", "남성", "여성", "성이 없음"], "answer": 0, "hint": "-as 어간", "explain": "-o로 끝나지만 -as 어간 중성명사입니다."},
  {"type": "speak", "pali": "Attā hi attano nātho, ko hi nātho paro siyā.", "pronKo": "앗따- 히 앗따노- 나-토-, 꼬- 히 나-토- 빠로- 시야-."},
]
