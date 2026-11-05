// 파생 접미사 (taddhita) — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_TADDHITA: StepWithoutId[] = [
  {"type": "intro", "title": "파생 접미사 (Taddhita)", "subtitle": "명사에서 새 낱말 만들기", "description": "명사·형용사 뒤에 접미사를 붙여\n\"~에 속한\", \"~함(추상명사)\" 같은 새 낱말을 만듭니다.\n\nkāyika (몸의), kataññutā (은혜를 앎)처럼\n경전에 자주 나옵니다.", "icon": "🌱"},
  {"type": "teach-grammar", "title": "-ika: ~에 속한, ~와 관련된", "example": "kāya → kāyika\ncetas → cetasika\ndhamma → dhammika", "exampleKo": "몸 → 몸의, 육체적인\n마음 → 마음의, 정신적인\n법 → 법다운, 여법한", "explanation": "첫 모음이 길어지기도 합니다 (vuddhi).\n  puthujjana → pothujjanika (범부에 속한)"},
  {"type": "teach-grammar", "title": "-tā / -tta / -ya: 추상명사 (~함, ~임)", "example": "kataññu → kataññutā\nmanussa → manussatta\npaṇḍita → paṇḍicca", "exampleKo": "은혜를 아는 이 → 은혜를 앎\n사람 → 사람임\n현명한 이 → 현명함", "explanation": "• -tā: 여성명사 (kataññutā)\n• -tta: 중성명사 (manussatta)\n• -ya: 중성명사, 앞 자음과 닮기도 함\n  paṇḍita + ya → paṇḍicca"},
  {"type": "teach", "word": "kāyika", "pronKo": "까-이까", "meaning": "몸의, 육체적인", "icon": "🧍", "grammar": "형용사 (taddhita -ika)", "baseForm": "kāya (몸) + -ika"},
  {"type": "teach", "word": "cetasika", "pronKo": "쩨-따시까", "meaning": "마음의, 정신적인", "icon": "💭", "grammar": "형용사 (taddhita -ika)", "baseForm": "cetas (마음) + -ika"},
  {"type": "teach", "word": "kataññutā", "pronKo": "까딴뉴따-", "meaning": "은혜를 앎, 감사함", "icon": "🙏", "grammar": "여성명사 (taddhita -tā)", "baseForm": "kataññu (은혜를 아는 이) + -tā"},
  {"type": "verse", "pali": "Gāravo ca nivāto ca, santuṭṭhi ca kataññutā; Kālena dhammassavanaṃ, etaṃ maṅgalamuttamaṃ.", "pronKo": "가-라오- 짜 니와-또- 짜, 산뚯티 짜 까딴뉴따-; 깔-레-나 담맛사와낭, 에-땅 망갈라뭇따망.", "translation": "공경과 겸손, 만족과 은혜를 앎, 알맞은 때에 법을 듣는 것, 이것이 최상의 축복이다.", "highlight": ["kataññutā"], "note": "축복경\nkataññutā = kataññu + tā (추상명사)"},
  {"type": "verse", "pali": "Yaṃ kho, bhikkhave, kāyikaṃ dukkhaṃ kāyikaṃ asātaṃ, idaṃ vuccati, bhikkhave, dukkhaṃ.", "pronKo": "양 코-, 빅카웨-, 까-이깡 둑캉 까-이깡 아사-땅, 이당 웃짜띠, 빅카웨-, 둑캉.", "translation": "비구들이여, 몸의 괴로움, 몸의 불쾌함, 이것을 괴로움이라고 한다.", "highlight": ["kāyikaṃ"], "note": "대념처경(MN 10)의 괴로움 정의 (줄임)\nkāyika = kāya + ika"},
  {"type": "quiz", "question": "\"cetasika\"의 뜻은?", "options": ["마음의, 정신적인", "마음을 가진 이", "마음이 없는", "마음으로"], "answer": 0, "hint": "cetas + ika", "explain": "-ika는 \"~에 속한, ~와 관련된\"을 뜻합니다."},
  {"type": "quiz", "question": "\"kataññutā\"는 어떤 낱말?", "options": ["추상명사 (은혜를 앎)", "동사", "소유격", "부사"], "answer": 0, "hint": "-tā", "explain": "-tā는 \"~함, ~임\"을 뜻하는 추상명사를 만듭니다."},
  {"type": "quiz", "question": "\"paṇḍicca\"는 어떻게 만들어졌나?", "options": ["paṇḍita + ya", "paṇḍi + cca", "paṇḍa + icca", "paṇḍita + ika"], "answer": 0, "hint": "-ya가 앞 자음과 닮음", "explain": "paṇḍita + ya → paṇḍicca (현명함)"},
  {"type": "speak", "pali": "Gāravo ca nivāto ca, santuṭṭhi ca kataññutā.", "pronKo": "가-라오- 짜 니와-또- 짜, 산뚯티 짜 까딴뉴따-."},
]
