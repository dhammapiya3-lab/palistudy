// 4과: 삼보공덕 (Tisaraṇaguṇa) — text/제4과. 삼보 공덕.txt 전문 기반
import type { StepType } from './lesson-data-sn56-11'

// 1. 붓다눗사띠 (붓다 9덕)
const V_BUDDHA =
  'Itipi so Bhagavā, Arahaṃ, Sammāsambuddho, Vijjācaraṇasampanno, Sugato, Lokavidū, ' +
  'Anuttaro Purisadammasārathi, Satthā devamanussānaṃ, Buddho, Bhagavā\'ti.'
const V_BUDDHAK =
  '그러므로 그 세존께서는: 아라한이시고, 완전히 바르게 깨달은 분이시고, ' +
  '명지와 실천을 갖춘 분이시고, 피안에 잘 가신 분이시고, 세상을 아는 분이시고, ' +
  '위 없는 조어장부이시고, 신과 인간의 스승이시고, 붓다이시고, 세존이시다.'

// 2. 담마눗사띠 (담마 6덕)
const V_DHAMMA =
  'Svākkhāto Bhagavatā Dhammo, sandiṭṭhiko, akāliko, ehipassiko, opaneyyiko, paccattaṃ veditabbo viññūhī\'ti.'
const V_DHAMMAK =
  '세존께서 잘 설하신 법은: 직접 볼 수 있고, 시간을 초월하며, "와서 보라"고 할 만하고, ' +
  '향상으로 이끌며, 지혜로운 이들이 각자 스스로 알아야 하는 것이다.'

// 3. 상가눗사띠 (상가 9덕)
const V_SANGHA_A =
  'Suppaṭipanno Bhagavato sāvakasaṅgho, ujuppaṭipanno Bhagavato sāvakasaṅgho, ' +
  'ñāyappaṭipanno Bhagavato sāvakasaṅgho, sāmīcippaṭipanno Bhagavato sāvakasaṅgho,'
const V_SANGHA_AK =
  '세존의 제자 승가는: 잘 수행하고, 바르게 수행하고, 올바른 이치대로 수행하고, 화합하여 수행하는 이들이다.'

const V_SANGHA_B =
  'yadidaṃ cattāri purisayugāni aṭṭha purisapuggalā, esa Bhagavato sāvakasaṅgho, ' +
  'āhuneyyo pāhuneyyo dakkhiṇeyyo, añjalikaraṇīyo anuttaraṃ puññakkhettaṃ lokassā\'ti.'
const V_SANGHA_BK =
  '즉 네 쌍의 사람(四雙) 여덟 분(八輩)이니, 이분들이 세존의 제자 승가이다. ' +
  '공양받을 만하고, 환대받을 만하고, 보시받을 만하고, 합장받을 만하고, 세상의 위 없는 복전(福田)이다.'

export const LESSON_TISARANA_GUNA: StepType[] = [
  { type: 'intro', icon: '🙏', title: '삼보공덕 (Tisaraṇaguṇa)', subtitle: '붓다눗사띠·담마눗사띠·상가눗사띠',
    description: '삼보의 공덕을 기억하는 수행(隨念, Anussati).\n\n• 붓다 9덕 (buddhānussati)\n• 담마 6덕 (dhammānussati)\n• 상가 9덕 (saṅghānussati)' },

  // ===== 1. 붓다눗사띠 =====
  { type: 'intro', icon: '☸️', title: '— 붓다 9덕 (buddhānussati) —', subtitle: '아홉 가지 공덕',
    description: '아라한·정등각·명행족·선서·세간해·무상사조어장부·천인사·붓다·세존' },

  { type: 'teach', icon: '👉', word: 'Itipi so', pronKo: '이띠삐 소', meaning: '그러므로 그분께서는',
    grammar: '부사 + 강조 + 대명사', baseForm: 'iti + api + so',
    formNote: 'iti(이렇게) + pi(또한) + so(그분) — 정형 도입구',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },
  { type: 'teach', icon: '✨', word: 'Bhagavā', pronKo: '바가와~', meaning: '세존 (주격)',
    grammar: '남성명사, 주격 단수', baseForm: 'bhagavant',
    formNote: '11과 MN10 V1의 bhagavā와 동일',
    buddhism: '세존(世尊). 9덕 마지막 단어로 다시 등장 (강조).',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },
  { type: 'teach', icon: '🌟', word: 'Arahaṃ', pronKo: '아라항', meaning: '아라한 (주격)',
    grammar: '남성명사, 주격 단수', baseForm: 'arahant',
    formNote: '1과 namo의 arahato(여격)와 같은 단어 — 여기는 주격 -aṃ',
    buddhism: '응공(應供). 9덕의 첫째. 번뇌 소멸.',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },
  { type: 'teach', icon: '☸️', word: 'Sammāsambuddho', pronKo: '삼마~삼붓도', meaning: '완전히 바르게 깨달은 분',
    grammar: '복합어, 주격 남성', baseForm: 'sammāsambuddha',
    formNote: '1과 namo의 sammāsambuddhassa(여격)와 같음 — 주격 -o',
    buddhism: '정등각(正等覺). 9덕의 둘째.',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },
  { type: 'teach', icon: '🎓', word: 'Vijjācaraṇasampanno', pronKo: '윗자~짜라나삼빤노', meaning: '명지와 실천을 갖춘 분',
    grammar: '복합어, 주격 남성', baseForm: 'vijjā(명지) + caraṇa(실천) + sampanna(갖춘)',
    buddhism: '명행족(明行足). 9덕의 셋째. 삼명(三明) + 15계행.',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },
  { type: 'teach', icon: '🚢', word: 'Sugato', pronKo: '수가또', meaning: '피안에 잘 가신 분',
    grammar: '과거분사, 주격 남성', baseForm: 'sugata (su + gata)',
    formNote: 'su(잘) + gata(간) = "잘 가신 분"',
    buddhism: '선서(善逝). 9덕의 넷째.',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },
  { type: 'teach', icon: '🌍', word: 'Lokavidū', pronKo: '로까위두~', meaning: '세상을 아는 분',
    grammar: '복합어, 주격 남성', baseForm: 'loka(세상) + vidū(아는 자)',
    formNote: 'loka + √vid(알다) → "세간을 아는 자"',
    buddhism: '세간해(世間解). 9덕의 다섯째.',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },
  { type: 'teach', icon: '👑', word: 'Anuttaro', pronKo: '아눗따로', meaning: '위가 없는, 최상의',
    grammar: '형용사, 주격 남성', baseForm: 'anuttara',
    formNote: 'an(부정) + uttara(더 높은)\n11과 MN10 V_CIT2의 anuttaraṃ과 같은 단어',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },
  { type: 'teach', icon: '🎯', word: 'Purisadammasārathi', pronKo: '뿌리사담마사~라티', meaning: '사람을 길들이는 조어사',
    grammar: '복합어, 주격 남성', baseForm: 'purisa(사람) + damma(길들일) + sārathi(마부)',
    formNote: '"길들여야 할 사람의 마부"',
    buddhism: '조어장부(調御丈夫). 9덕의 여섯째. anuttaro + 결합 = "위 없는 조어사".',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },
  { type: 'teach', icon: '👨‍🏫', word: 'Satthā', pronKo: '삿타~', meaning: '스승',
    grammar: '남성명사, 주격 단수', baseForm: 'satthar (스승)',
    formNote: '-ar 어간 주격 -ā',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },
  { type: 'teach', icon: '👥', word: 'devamanussānaṃ', pronKo: '데와마눗사~낭', meaning: '신과 인간들의 (속격 복수)',
    grammar: '복합어, 속격 복수', baseForm: 'deva(신) + manussa(인간)',
    buddhism: '천인사(天人師). 9덕의 일곱째.',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },
  { type: 'teach', icon: '🧘', word: 'Buddho', pronKo: '붓도', meaning: '깨달은 분 (주격)',
    grammar: '남성명사, 주격 단수', baseForm: 'buddha',
    formNote: '2과 Buddhaṃ(대격)과 같은 단어',
    buddhism: '불(佛). 9덕의 여덟째. 그 자체로 깨달은 분.',
    verseLine: V_BUDDHA, verseLineKo: V_BUDDHAK, audio: true },

  { type: 'verse', pali: V_BUDDHA, pronKo: '이띠삐 소 바가와~, 아라항, 삼마~삼붓도, 윗자~짜라나삼빤노, 수가또, 로까위두~, 아눗따로 뿌리사담마사~라티, 삿타~ 데와마눗사~낭, 붓도, 바가와~띠.',
    translation: V_BUDDHAK, highlight: ['Bhagavā','Arahaṃ','Sammāsambuddho','Vijjācaraṇasampanno','Sugato','Lokavidū','Anuttaro','Purisadammasārathi','Satthā','Buddho'],
    note: '☸️ 붓다 9덕. anuttaro + purisadammasārathi가 한 항목 = 9덕.' },

  // ===== 2. 담마눗사띠 =====
  { type: 'intro', icon: '📜', title: '— 담마 6덕 (dhammānussati) —', subtitle: '여섯 가지 공덕',
    description: '잘설된법·자신통견·시간초월·와서보라·향상·각자증득' },

  { type: 'teach', icon: '📖', word: 'Svākkhāto', pronKo: '스왁~카~또', meaning: '잘 설해진',
    grammar: '과거분사, 주격 남성', baseForm: 'su(잘) + ākkhāta(설해진)',
    buddhism: '선설(善說). 담마 6덕의 첫째.',
    verseLine: V_DHAMMA, verseLineKo: V_DHAMMAK, audio: true },
  { type: 'teach', icon: '🤝', word: 'Bhagavatā', pronKo: '바가와따~', meaning: '세존에 의해 (도구격)',
    grammar: '남성명사, 도구격 단수', baseForm: 'bhagavant',
    formNote: 'bhagavant → bhagavatā: -ant 어간 도구격 -ā',
    verseLine: V_DHAMMA, verseLineKo: V_DHAMMAK, audio: true },
  { type: 'teach', icon: '📜', word: 'Dhammo', pronKo: '담모', meaning: '법 (주격)',
    grammar: '남성명사, 주격 단수', baseForm: 'dhamma',
    formNote: '2과 Dhammaṃ(대격)과 같은 단어 — 주격 -o',
    verseLine: V_DHAMMA, verseLineKo: V_DHAMMAK, audio: true },
  { type: 'teach', icon: '👁️', word: 'sandiṭṭhiko', pronKo: '산딧티꼬', meaning: '직접 볼 수 있는',
    grammar: '형용사, 주격 남성', baseForm: 'sandiṭṭhika (saṃ + diṭṭha)',
    formNote: 'saṃ(완전히) + diṭṭha(본) = "직접 보는"',
    buddhism: '현증(現證). 담마 6덕의 둘째.',
    verseLine: V_DHAMMA, verseLineKo: V_DHAMMAK, audio: true },
  { type: 'teach', icon: '⏳', word: 'akāliko', pronKo: '아까~리꼬', meaning: '시간을 초월한',
    grammar: '형용사, 주격 남성', baseForm: 'a + kālika',
    formNote: 'a(부정) + kāla(시간) + -ika = 시간에 매이지 않는',
    buddhism: '비시(非時). 담마 6덕의 셋째.',
    verseLine: V_DHAMMA, verseLineKo: V_DHAMMAK, audio: true },
  { type: 'teach', icon: '👀', word: 'ehipassiko', pronKo: '에히빳시꼬', meaning: '"와서 보라"고 할 만한',
    grammar: '형용사, 주격 남성', baseForm: 'ehi(오라) + passa(보라) + -ika',
    formNote: 'ehi(2인칭 명령 "오라") + passa("보라") + -ika = "와서 보라할 만한"',
    buddhism: '내견(來見). 담마 6덕의 넷째. 검증 가능성.',
    verseLine: V_DHAMMA, verseLineKo: V_DHAMMAK, audio: true },
  { type: 'teach', icon: '⬆️', word: 'opaneyyiko', pronKo: '오빠네이이꼬', meaning: '향상으로 이끄는',
    grammar: '형용사, 주격 남성', baseForm: 'opaneyyika (upa + √nī)',
    buddhism: '인도(引導). 담마 6덕의 다섯째.',
    verseLine: V_DHAMMA, verseLineKo: V_DHAMMAK, audio: true },
  { type: 'teach', icon: '🧠', word: 'paccattaṃ', pronKo: '빳짯땅', meaning: '각자, 스스로',
    grammar: '부사', baseForm: 'paccatta',
    formNote: 'paṭi + atta(자기) → "각자, 스스로"',
    verseLine: V_DHAMMA, verseLineKo: V_DHAMMAK, audio: true },
  { type: 'teach', icon: '💡', word: 'veditabbo', pronKo: '웨디땁보', meaning: '알아야 할',
    grammar: '미래분사, 주격 남성', baseForm: 'vedeti의 미래분사',
    formNote: '√vid(알다) 미래분사 = "알아야 할"',
    verseLine: V_DHAMMA, verseLineKo: V_DHAMMAK, audio: true },
  { type: 'teach', icon: '🧙', word: 'viññūhi', pronKo: '윈뉴~히', meaning: '지혜로운 자들에 의해 (도구격 복수)',
    grammar: '남성명사, 도구격 복수', baseForm: 'viññū (지혜로운)',
    formNote: '-ū 어간 도구격 복수 -hi',
    buddhism: '담마 6덕의 여섯째.',
    verseLine: V_DHAMMA, verseLineKo: V_DHAMMAK, audio: true },

  { type: 'verse', pali: V_DHAMMA, pronKo: '스왁~카~또 바가와따~ 담모, 산딧티꼬, 아까~리꼬, 에히빳시꼬, 오빠네이이꼬, 빳짯땅 웨디땁보 윈뉴~히~띠.',
    translation: V_DHAMMAK, highlight: ['Svākkhāto','sandiṭṭhiko','akāliko','ehipassiko','opaneyyiko','paccattaṃ','veditabbo','viññūhi'],
    note: '📜 담마 6덕.' },

  // ===== 3. 상가눗사띠 =====
  { type: 'intro', icon: '🧘', title: '— 상가 9덕 (saṅghānussati) —', subtitle: '4수행·4쌍8배·5보시',
    description: '4가지 수행 + 4쌍 8배(四雙八輩) + 응공·환대·보시·합장·복전' },

  { type: 'teach', icon: '✅', word: 'Suppaṭipanno', pronKo: '숩빠띠빤노', meaning: '잘 수행한 자',
    grammar: '과거분사, 주격 남성', baseForm: 'su(잘) + paṭipanna(수행한)',
    buddhism: '선행(善行). 상가 4수행의 첫째.',
    verseLine: V_SANGHA_A, verseLineKo: V_SANGHA_AK, audio: true },
  { type: 'teach', icon: '🙏', word: 'Bhagavato', pronKo: '바가와또', meaning: '세존의 (속격)',
    grammar: '남성명사, 속격 단수', baseForm: 'bhagavant',
    formNote: '1과 namo의 bhagavato(여격)와 동형 — 여기는 속격: "세존의"',
    verseLine: V_SANGHA_A, verseLineKo: V_SANGHA_AK, audio: true },
  { type: 'teach', icon: '👥', word: 'sāvakasaṅgho', pronKo: '사~와까상고', meaning: '제자 승가',
    grammar: '복합어, 주격 남성', baseForm: 'sāvaka(제자) + saṅgha',
    formNote: 'sāvaka = √su(듣다) → "들은 자 = 제자"',
    buddhism: '성문승가(聲聞僧伽).',
    verseLine: V_SANGHA_A, verseLineKo: V_SANGHA_AK, audio: true },
  { type: 'teach', icon: '📏', word: 'ujuppaṭipanno', pronKo: '우주빠띠빤노', meaning: '바르게 수행한 자',
    grammar: '과거분사, 주격 남성', baseForm: 'uju(곧은) + paṭipanna',
    buddhism: '직행(直行). 상가 4수행의 둘째.',
    verseLine: V_SANGHA_A, verseLineKo: V_SANGHA_AK, audio: true },
  { type: 'teach', icon: '📐', word: 'ñāyappaṭipanno', pronKo: '냐~얍빠띠빤노', meaning: '올바른 이치대로 수행한 자',
    grammar: '과거분사, 주격 남성', baseForm: 'ñāya(이치) + paṭipanna',
    formNote: '11과 MN10 V2의 ñāyassa와 같은 어원',
    buddhism: '여행(如行). 상가 4수행의 셋째.',
    verseLine: V_SANGHA_A, verseLineKo: V_SANGHA_AK, audio: true },
  { type: 'teach', icon: '🤝', word: 'sāmīcippaṭipanno', pronKo: '사~미~찝빠띠빤노', meaning: '화합하여 수행한 자',
    grammar: '과거분사, 주격 남성', baseForm: 'sāmīci(화합) + paṭipanna',
    buddhism: '화행(和行). 상가 4수행의 넷째.',
    verseLine: V_SANGHA_A, verseLineKo: V_SANGHA_AK, audio: true },

  { type: 'verse', pali: V_SANGHA_A, pronKo: '숩빠띠빤노 바가와또 사~와까상고, 우주빠띠빤노 바가와또 사~와까상고, 냐~얍빠띠빤노 바가와또 사~와까상고, 사~미~찝빠띠빤노 바가와또 사~와까상고,',
    translation: V_SANGHA_AK, highlight: ['Suppaṭipanno','ujuppaṭipanno','ñāyappaṭipanno','sāmīcippaṭipanno','sāvakasaṅgho'],
    note: '🧘 상가 4수행.' },

  // ── 상가 후반: 4쌍 8배 + 5공덕 ──
  { type: 'teach', icon: '👉', word: 'yadidaṃ', pronKo: '야디당', meaning: '즉, 곧',
    grammar: '관계대명사 + 지시대명사', baseForm: 'yad + idaṃ',
    formNote: '11과 MN10 V2의 yadidaṃ과 같은 단어 — 정의 도입',
    verseLine: V_SANGHA_B, verseLineKo: V_SANGHA_BK, audio: true },
  { type: 'teach', icon: '4️⃣', word: 'cattāri purisayugāni', pronKo: '짯따~리 뿌리사유가~니', meaning: '네 쌍의 사람들',
    grammar: '수사 + 중성명사 주격 복수', baseForm: 'cattāri(4중성) + purisa(사람) + yuga(쌍)',
    buddhism: '사쌍(四雙). 예류·일래·불환·아라한의 4과(果) 각각 도(道)+과(果) = 4쌍.',
    verseLine: V_SANGHA_B, verseLineKo: V_SANGHA_BK, audio: true },
  { type: 'teach', icon: '8️⃣', word: 'aṭṭha purisapuggalā', pronKo: '앗타 뿌리사뿍갈라~', meaning: '여덟 분의 사람들',
    grammar: '수사 + 남성명사 주격 복수', baseForm: 'aṭṭha(8) + purisa + puggala(개인)',
    buddhism: '팔배(八輩). 4쌍을 펴면 8성인 = 사향사과(四向四果).',
    verseLine: V_SANGHA_B, verseLineKo: V_SANGHA_BK, audio: true },
  { type: 'teach', icon: '👉', word: 'esa', pronKo: '에사', meaning: '이분이',
    grammar: '지시대명사, 주격 남성 단수', baseForm: 'eta',
    verseLine: V_SANGHA_B, verseLineKo: V_SANGHA_BK, audio: true },
  { type: 'teach', icon: '🍚', word: 'āhuneyyo', pronKo: '아~후네이요', meaning: '공양받을 만한',
    grammar: '미래분사/형용사, 주격', baseForm: 'āhuneyya (ā- + √hu)',
    buddhism: '응공양(應供養). 상가 5공덕의 첫째. 멀리서 가져온 공양도 받을 자격.',
    verseLine: V_SANGHA_B, verseLineKo: V_SANGHA_BK, audio: true },
  { type: 'teach', icon: '🏠', word: 'pāhuneyyo', pronKo: '빠~후네이요', meaning: '환대받을 만한',
    grammar: '미래분사/형용사, 주격', baseForm: 'pāhuneyya',
    buddhism: '응환대(應歡待). 상가 5공덕의 둘째.',
    verseLine: V_SANGHA_B, verseLineKo: V_SANGHA_BK, audio: true },
  { type: 'teach', icon: '🎁', word: 'dakkhiṇeyyo', pronKo: '닥키네이요', meaning: '보시받을 만한',
    grammar: '미래분사/형용사, 주격', baseForm: 'dakkhiṇeyya (dakkhiṇā=보시)',
    buddhism: '응시(應施). 상가 5공덕의 셋째.',
    verseLine: V_SANGHA_B, verseLineKo: V_SANGHA_BK, audio: true },
  { type: 'teach', icon: '🙏', word: 'añjalikaraṇīyo', pronKo: '안잘리까라니~요', meaning: '합장받을 만한',
    grammar: '미래분사/형용사, 주격', baseForm: 'añjali(합장) + karaṇīya(해야 할)',
    buddhism: '응합장(應合掌). 상가 5공덕의 넷째.',
    verseLine: V_SANGHA_B, verseLineKo: V_SANGHA_BK, audio: true },
  { type: 'teach', icon: '🌾', word: 'puññakkhettaṃ', pronKo: '뿐냑켓땅', meaning: '복전 (복의 밭)',
    grammar: '복합어, 주격 중성', baseForm: 'puñña(공덕) + khetta(밭)',
    formNote: 'puñña(복덕) + khetta(밭) = "복덕을 자라게 하는 밭"\nanuttaraṃ + puññakkhettaṃ = 위 없는 복전',
    buddhism: '복전(福田). 상가 5공덕의 다섯째. 보시·공양의 최고 대상.',
    verseLine: V_SANGHA_B, verseLineKo: V_SANGHA_BK, audio: true },
  { type: 'teach', icon: '🌍', word: 'lokassa', pronKo: '로깟사', meaning: '세상의 (속격)',
    grammar: '남성명사, 속격 단수', baseForm: 'loka',
    verseLine: V_SANGHA_B, verseLineKo: V_SANGHA_BK, audio: true },

  { type: 'verse', pali: V_SANGHA_B, pronKo: '야디당 짯따~리 뿌리사유가~니 앗타 뿌리사뿍갈라~, 에사 바가와또 사~와까상고, 아~후네이요 빠~후네이요 닥키네이요, 안잘리까라니~요 아눗따랑 뿐냑켓땅 로깟사~띠.',
    translation: V_SANGHA_BK, highlight: ['yadidaṃ','cattāri','purisayugāni','aṭṭha','purisapuggalā','āhuneyyo','pāhuneyyo','dakkhiṇeyyo','añjalikaraṇīyo','puññakkhettaṃ','lokassa'],
    note: '🌾 상가 후반: 4쌍8배 + 5공덕(응공·환대·보시·합장·복전).' },

  { type: 'quiz', question: '붓다 9덕의 첫째는?',
    options: ['Sugato', 'Arahaṃ', 'Bhagavā', 'Sammāsambuddho'], answer: 1 },
  { type: 'quiz', question: '"sandiṭṭhiko"는?',
    options: ['시간 초월', '와서 보라', '직접 볼 수 있음', '향상으로 이끎'], answer: 2 },
  { type: 'quiz', question: '"Suppaṭipanno"는 어느 삼보 덕목?',
    options: ['붓다', '담마', '상가', '계'], answer: 2 },
  { type: 'quiz', question: '4쌍 8배(cattāri purisayugāni aṭṭha purisapuggalā)는?',
    options: ['사향사과(四向四果)의 성인', '4섭법', '8정도', '4선'], answer: 0,
    hint: '예류·일래·불환·아라한 각각 도+과' },
  { type: 'quiz', question: '"puññakkhettaṃ"의 뜻은?',
    options: ['복전(福田)', '계율', '예경', '명상'], answer: 0 },

  { type: 'speak', pali: V_BUDDHA, pronKo: '이띠삐 소 바가와~ 아라항 삼마~삼붓도...' },
  { type: 'speak', pali: V_DHAMMA, pronKo: '스왁~카~또 바가와따~ 담모...' },
  { type: 'speak', pali: V_SANGHA_A, pronKo: '숩빠띠빤노 바가와또 사~와까상고...' },
]
