// 조건법 (-issa) — '경전 읽기 문법' 묶음 (scripts/reading_lessons.py로 만듦)
import type { StepWithoutId } from './types'

export const LESSON_CONDITIONAL: StepWithoutId[] = [
  {"type": "intro", "title": "조건법", "subtitle": "~했더라면 ~했을 텐데", "description": "사실과 반대되는 가정을 나타냅니다.\n\"만약 ~했더라면 (그러나 실제로는 아니다)\"\n\n무아상경의 핵심 논증이 이 조건법으로 되어 있습니다.", "icon": "🔀"},
  {"type": "teach-grammar", "title": "조건법 만드는 법", "example": "a + bhav + issa → abhavissa\na + kar + issa → akarissa\na + gam + issa → agamissa", "exampleKo": "(그것이) ~였더라면\n(그가) 했더라면\n(그가) 갔더라면", "explanation": "앞에 a- (과거형처럼) + 어간 + -issa\n\n• 3인칭 단수: -issa (-issā)\n• 3인칭 복수: -issaṃsu\n\n미래형 -issati와 모양이 비슷하지만\n앞에 a-가 붙고 어미가 짧습니다."},
  {"type": "teach-grammar", "title": "조건법 문장 읽기", "example": "attā abhavissa, … na saṃvatteyya", "exampleKo": "자아였더라면, … 이끌지 않을 것이다", "explanation": "앞부분 (조건법): 사실과 반대되는 가정\n  \"물질이 자아였더라면\"\n뒷부분 (원망형 -eyya 등): 그 결과\n  \"병으로 이끌지 않을 것이다\"\n\n실제로는 물질이 병으로 이끄므로\n→ 물질은 자아가 아니다 (무아)"},
  {"type": "teach", "word": "abhavissa", "pronKo": "아바윗사", "meaning": "~였더라면", "icon": "🔀", "grammar": "조건법, 3인칭 단수", "baseForm": "bhavati (있다, 되다)"},
  {"type": "teach", "word": "saṃvatteyya", "pronKo": "상왓떼이야", "meaning": "이끌 것이다", "icon": "➡️", "grammar": "원망형, 3인칭 단수", "baseForm": "saṃvattati (이끌다, 되다)", "formNote": "ābādhāya saṃvatteyya = 병으로 이끌 것이다"},
  {"type": "teach", "word": "ābādhāya", "pronKo": "아-바-다-야", "meaning": "병으로, 괴로움으로", "icon": "🤒", "grammar": "남성명사, 여격 단수 (목적)", "baseForm": "ābādha (병, 괴로움)"},
  {"type": "verse", "pali": "Rūpañca hidaṃ, bhikkhave, attā abhavissa, nayidaṃ rūpaṃ ābādhāya saṃvatteyya.", "pronKo": "루-빤짜 히당, 빅카웨-, 앗따- 아바윗사, 나이당 루-빵 아-바-다-야 상왓떼이야.", "translation": "비구들이여, 만약 이 물질이 자아였더라면, 이 물질은 병으로 이끌지 않을 것이다.", "highlight": ["abhavissa", "saṃvatteyya"], "note": "무아상경(SN 22.59)\nabhavissa = 조건법 (사실과 반대되는 가정)\nnayidaṃ = na + idaṃ (연성)"},
  {"type": "quiz", "question": "\"abhavissa\"의 뜻은?", "options": ["~였더라면", "~일 것이다", "~였다", "~이어라"], "answer": 0, "hint": "a- + 어간 + -issa", "explain": "abhavissa는 bhavati의 조건법입니다."},
  {"type": "quiz", "question": "조건법과 미래형의 차이는?", "options": ["조건법은 앞에 a-가 붙고 어미가 -issa", "조건법은 -tvā로 끝남", "둘은 같은 형태", "미래형에 a-가 붙음"], "answer": 0, "hint": "abhavissa / bhavissati", "explain": "조건법: a-bhav-issa / 미래형: bhav-issati"},
  {"type": "quiz", "question": "무아상경의 이 조건법 문장이 말하려는 것은?", "options": ["물질은 자아가 아니다", "물질은 자아이다", "물질은 병이 없다", "물질은 영원하다"], "answer": 0, "hint": "사실과 반대되는 가정", "explain": "\"자아였더라면 병들지 않을 텐데, 병드니 자아가 아니다\"라는 논증입니다."},
  {"type": "speak", "pali": "Rūpañca hidaṃ, bhikkhave, attā abhavissa, nayidaṃ rūpaṃ ābādhāya saṃvatteyya.", "pronKo": "루-빤짜 히당, 빅카웨-, 앗따- 아바윗사, 나이당 루-빵 아-바-다-야 상왓떼이야.", "translation": "비구들이여, 만약 이 물질이 자아였더라면, 이 물질은 병으로 이끌지 않을 것이다."},
]
