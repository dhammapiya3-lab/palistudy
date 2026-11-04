// 27과: -u/-ū 남성명사 격변화
import type { StepWithoutId } from './types'

export const LESSON_24: StepWithoutId[] = [
  // === 도입 ===
  { type: 'intro', title: '27과: -u/-ū 남성명사', subtitle: 'Puliṅga -u/-ū nāma', description: '-u 남성명사 (garu 기준) 격변화\n-ū 남성명사 (vidū 기준) 격변화\n\nbhikkhu 호격 특수형 학습', icon: '📖' },

  // === -u 남성명사 격변화표 (garu 스승) ===
  { type: 'teach-grammar', title: '-u 남성명사 격변화 (garu 스승)', example: '주격: garu / garū,garuyo\n목적격: garuṃ / garū,garuyo\n도구격: garunā / garūhi\n여격: garuno,garussa / garūnaṃ\n탈격: garunā,garumhā / garūhi\n소유격: garuno,garussa / garūnaṃ\n처소격: garumhi,garusmiṃ / garūsu\n호격: garu / garū,garuyo', exampleKo: '단수: -unā(도구격), -uno/-ussa(여/소유)\n복수: -ū/-ūhi/-ūnaṃ/-ūsu', explanation: '-u 남성명사 핵심:\n• 도구격 단수: -unā\n• 여격/소유격 단수: -uno 또는 -ussa\n• 탈격: -unā 또는 -umhā\n• 처소격: -umhi 또는 -usmiṃ\n• 복수: -ū/-ūhi/-ūnaṃ/-ūsu' },

  // === -u 남성명사 단어 ===
  { type: 'teach', word: 'garu', pronKo: '가루', meaning: '스승', icon: '🧑‍🏫', grammar: '-u 남성명사', formNote: '주격: garu / garū' },
  { type: 'teach', word: 'bhikkhu', pronKo: '빅쿠', meaning: '비구(승려)', icon: '🧘', grammar: '-u 남성명사', formNote: '호격: bhikkhu(단) / bhikkhave,bhikkhavo(복)', buddhism: '붓다의 제자. 호격 복수 bhikkhave는 경전 서두 상투어' },
  { type: 'teach', word: 'bandhu', pronKo: '반두', meaning: '친척', icon: '👨‍👩‍👦', grammar: '-u 남성명사', formNote: '주격: bandhu / bandhū' },
  { type: 'teach', word: 'taru', pronKo: '따루', meaning: '나무', icon: '🌳', grammar: '-u 남성명사', formNote: '주격: taru / tarū,taruyo' },
  { type: 'teach', word: 'sindhu', pronKo: '신두', meaning: '바다', icon: '🌊', grammar: '-u 남성명사', formNote: '주격: sindhu / sindhū' },
  { type: 'teach', word: 'pharasu', pronKo: '파라수', meaning: '도끼', icon: '🪓', grammar: '-u 남성명사', formNote: '주격: pharasu / pharasū' },
  { type: 'teach', word: 'pasu', pronKo: '빠수', meaning: '짐승', icon: '🐂', grammar: '-u 남성명사', formNote: '주격: pasu / pasū,pasuyo' },
  { type: 'teach', word: 'ākhu', pronKo: '아-쿠', meaning: '쥐', icon: '🐀', grammar: '-u 남성명사', formNote: '주격: ākhu / ākhū' },
  { type: 'teach', word: 'ucchu', pronKo: '웃추', meaning: '사탕수수', icon: '🎋', grammar: '-u 남성명사', formNote: '주격: ucchu / ucchū' },
  { type: 'teach', word: 'veḷu', pronKo: '웰루', meaning: '대나무', icon: '🎍', grammar: '-u 남성명사', formNote: '주격: veḷu / veḷū', buddhism: 'Veḷuvana = 죽림정사(대나무 숲 정원)' },
  { type: 'teach', word: 'kaṭacchu', pronKo: '까땃추', meaning: '숟가락', icon: '🥄', grammar: '-u 남성명사', formNote: '주격: kaṭacchu / kaṭacchū' },
  { type: 'teach', word: 'sattu', pronKo: '삿뚜', meaning: '적(敵)', icon: '⚔️', grammar: '-u 남성명사', formNote: '주격: sattu / sattū' },
  { type: 'teach', word: 'setu', pronKo: '세뚜', meaning: '다리(橋)', icon: '🌉', grammar: '-u 남성명사', formNote: '주격: setu / setū' },
  { type: 'teach', word: 'ketu', pronKo: '게뚜', meaning: '깃발', icon: '🚩', grammar: '-u 남성명사', formNote: '주격: ketu / ketū' },
  { type: 'teach', word: 'susu', pronKo: '수수', meaning: '청년', icon: '👦', grammar: '-u 남성명사', formNote: '주격: susu / susū' },

  // === -ū 남성명사 격변화표 (vidū 현자) ===
  { type: 'teach-grammar', title: '-ū 남성명사 격변화 (vidū 현자)', example: '주격: vidū / vidū,viduno\n목적격: viduṃ,vidunaṃ / vidū,viduno\n도구격: vidunā / vidūhi\n여격: viduno,vidussa / vidūnaṃ\n탈격: vidunā,vidumhā / vidūhi\n소유격: viduno,vidussa / vidūnaṃ\n처소격: vidumhi,vidusmiṃ / vidūsu\n호격: vidu / vidū,viduno', exampleKo: '-u 남성과 유사, 주격이 -ū(장음)', explanation: '-ū 남성명사는 -u 남성과 거의 동일:\n• 주격 단수: -ū (장음)\n• 나머지 격변화는 -u 남성과 같은 패턴\n\n복수 주격/목적격에 -uno 형태 추가' },

  // === -ū 남성명사 단어 ===
  { type: 'teach', word: 'vidū', pronKo: '위두-', meaning: '현자', icon: '🦉', grammar: '-ū 남성명사', formNote: '주격: vidū / vidū,viduno' },
  { type: 'teach', word: 'pabhū', pronKo: '빠부-', meaning: '군주', icon: '👑', grammar: '-ū 남성명사', formNote: '주격: pabhū / pabhū,pabhuno' },
  { type: 'teach', word: 'sabbaññū', pronKo: '삽반뉴-', meaning: '일체지자(一切智者)', icon: '☀️', grammar: '-ū 남성명사', formNote: '주격: sabbaññū / sabbaññū', buddhism: '붓다의 칭호. 모든 것을 아는 분' },
  { type: 'teach', word: 'viññū', pronKo: '윈뉴-', meaning: '지혜로운 자', icon: '🧠', grammar: '-ū 남성명사', formNote: '주격: viññū / viññū,viññuno' },
  { type: 'teach', word: 'vadaññū', pronKo: '와단뉴-', meaning: '너그러운 자, 잘 베푸는 자', icon: '🤝', grammar: '-ū 남성명사', formNote: '주격: vadaññū / vadaññū' },
  { type: 'teach', word: 'atthaññū', pronKo: '앗탄뉴-', meaning: '이치를 아는 자', icon: '🎯', grammar: '-ū 남성명사', formNote: '주격: atthaññū / atthaññū' },
  { type: 'teach', word: 'mattaññū', pronKo: '맛딴뉴-', meaning: '양(분량)을 아는 자', icon: '⚖️', grammar: '-ū 남성명사', formNote: '주격: mattaññū / mattaññū' },

  // === 연습문제 10개 ===
  { type: 'quiz', question: '1. Bhikkhavo Tathāgatassa sāvakā honti.', options: ['비구들은 여래의 제자들이다', '비구는 여래의 제자이다', '비구들은 여래에게 예배한다', '비구들은 여래의 법을 듣는다'], answer: 0, hint: 'bhikkhavo = 비구들(호격/주격), sāvakā = 제자들' },
  { type: 'quiz', question: '2. Bandhavo ammaṃ passituṃ nagaramhā gāmaṃ āgamiṃsu.', options: ['친척들은 어머니를 보러 도시에서 마을로 왔다', '친척들은 어머니를 보러 마을에서 도시로 갔다', '친척은 어머니를 보러 도시에서 마을로 왔다', '친척들은 아버지를 보러 도시에서 마을로 왔다'], answer: 0, hint: 'bandhavo = 친척들, passituṃ = 보기 위해, āgamiṃsu = 왔다' },
  { type: 'quiz', question: '3. Coro āraññe taravo chindituṃ pharasuṃ ādāya gacchi.', options: ['도둑은 숲에서 나무들을 베려고 도끼를 가지고 갔다', '도둑은 숲에서 나무를 베려고 칼을 가지고 갔다', '도둑들은 숲에서 나무들을 베려고 도끼를 가지고 갔다', '도둑은 마을에서 나무들을 베려고 도끼를 가지고 갔다'], answer: 0, hint: 'taravo = 나무들, chindituṃ = 베기 위해, pharasuṃ = 도끼를' },
  { type: 'quiz', question: '4. Sīhā ca dīpayo ca aṭaviyaṃ vasante pasavo māretvā khādanti.', options: ['사자들과 표범들은 숲에 살면서 짐승들을 죽여 먹는다', '사자와 표범은 숲에 살면서 짐승을 죽여 먹는다', '사자들과 표범들은 마을에서 짐승들을 죽여 먹는다', '사자들과 표범들은 숲에 살면서 풀을 먹는다'], answer: 0, hint: 'pasavo = 짐승들, māretvā = 죽이고, khādanti = 먹는다' },
  { type: 'quiz', question: '5. Sappurisā viññuno bhavanti.', options: ['선인들은 지혜로운 자들이다', '선인은 지혜로운 자이다', '선인들은 지혜로운 자들이었다', '선인들은 현자를 존경한다'], answer: 0, hint: 'sappurisā = 선인들, viññuno = 지혜로운 자들' },
  { type: 'quiz', question: '6. Bhūpati mantīhi saddhiṃ sindhuṃ taritvā sattavo paharitvā jinituṃ ussahi.', options: ['왕은 대신들과 함께 바다를 건너 적들을 쳐서 이기려고 노력했다', '왕은 혼자 바다를 건너 적들을 쳐서 이겼다', '대신들은 왕과 함께 바다를 건너 적들을 쳤다', '왕은 대신들과 함께 강을 건너 적들과 싸웠다'], answer: 0, hint: 'sindhuṃ = 바다를, taritvā = 건너서, sattavo = 적들을' },
  { type: 'quiz', question: '7. Ammā kaṭacchunā dārikaṃ odanaṃ bhojāpesi.', options: ['어머니는 숟가락으로 소녀에게 밥을 먹게 했다', '어머니는 숟가락으로 소년에게 밥을 먹게 했다', '어머니는 손으로 소녀에게 밥을 먹게 했다', '소녀는 숟가락으로 어머니에게 밥을 드렸다'], answer: 0, hint: 'kaṭacchunā = 숟가락으로(도구격), bhojāpesi = 먹게 했다' },
  { type: 'quiz', question: '8. Hatthino ca kaṇeruyo ca ucchavo ākaḍḍhitvā khādiṃsu.', options: ['수코끼리들과 암코끼리들은 사탕수수를 뽑아 먹었다', '코끼리는 사탕수수를 뽑아 먹었다', '수코끼리들은 대나무를 뽑아 먹었다', '수코끼리들과 암코끼리들은 풀을 뽑아 먹었다'], answer: 0, hint: 'ucchavo = 사탕수수들, ākaḍḍhitvā = 뽑아서' },
  { type: 'quiz', question: '9. Bhūpatissa mantino sattūnaṃ ketavo āhariṃsu.', options: ['왕의 대신들은 적들의 깃발들을 가져왔다', '왕의 대신은 적의 깃발을 가져왔다', '왕은 대신들에게 적들의 깃발들을 가져오게 했다', '대신들은 왕의 깃발들을 적들에게 가져갔다'], answer: 0, hint: 'sattūnaṃ = 적들의(소유격), ketavo = 깃발들' },
  { type: 'quiz', question: '10. Setumhi nisinno bandhu taruno sākhaṃ hatthena ākaḍḍhi.', options: ['다리에 앉은 친척은 나무의 가지를 손으로 끌어당겼다', '다리에 앉은 친척들은 나무의 가지를 손으로 끌어당겼다', '다리 위의 친척은 나무의 가지를 도끼로 잘랐다', '다리에 앉은 친척은 나무의 열매를 손으로 땄다'], answer: 0, hint: 'setumhi = 다리에(처소격), nisinno = 앉은, sākhaṃ = 가지를' },

  // === 경전 구절 ===
  { type: 'verse', pali: 'Bhikkhavo Tathāgatassa sāvakā honti', pronKo: '빅카워 따타-가땃사 사-와까- 혼띠', translation: '비구들은 여래의 제자들이다', highlight: ['Bhikkhavo'], note: 'bhikkhu 호격 복수 = bhikkhave / bhikkhavo. 경전에서 붓다가 제자들을 부를 때 사용' },

  // === 마무리 ===
  { type: 'speak', pali: 'Bhikkhavo Tathāgatassa sāvakā honti', pronKo: '빅카워 따타-가땃사 사-와까- 혼띠' },
]
