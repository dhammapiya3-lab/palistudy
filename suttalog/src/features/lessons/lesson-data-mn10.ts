// 11과: 마음챙김 확립의 큰 경(Mahāsatipaṭṭhāna Sutta, DN 22) 학습 데이터
// 경전 전문(全文) 빠짐없이 포함 — text/제11과. 마음챙김 확립의 큰 경.txt 기반.
import type { StepType } from './lesson-data-sn56-11'

// ============================================================
// 핵심 정형구(공통 후렴) — 14 kāyānupassanā / vedanā / citta / dhamma 마무리에 반복
// ============================================================
const REF_KAYA =
  'iti ajjhattaṃ vā kāye kāyānupassī viharati, bahiddhā vā kāye kāyānupassī viharati, ajjhattabahiddhā vā kāye kāyānupassī viharati. samudayadhammānupassī vā kāyasmiṃ viharati, vayadhammānupassī vā kāyasmiṃ viharati, samudayavayadhammānupassī vā kāyasmiṃ viharati. ‘atthi kāyo’ti vā panassa sati paccupaṭṭhitā hoti yāvadeva ñāṇamattāya paṭissatimattāya anissito ca viharati, na ca kiñci loke upādiyati. evampi kho, bhikkhave, bhikkhu kāye kāyānupassī viharati.'
const REF_KAYA_K =
  '이와 같이 그는 안으로 몸에서 몸을 관찰하며 머문다, 또는 밖으로 몸에서 몸을 관찰하며 머문다, 또는 안팎으로 몸에서 몸을 관찰하며 머문다. 그는 몸에서 일어남의 현상을 관찰하며 머물고, 사라짐의 현상을 관찰하며 머물고, 일어남과 사라짐의 현상을 관찰하며 머문다. ‘몸이 있다’는 마음챙김이 그에게 확립되니, 이는 단지 앎과 마음챙김의 정도만큼이다. 그는 의지하지 않고 머물며, 세상의 어떤 것에도 집착하지 않는다. 비구들이여, 이와 같이 비구는 몸에서 몸을 관찰하며 머문다.'

const REF_VED =
  'iti ajjhattaṃ vā vedanāsu vedanānupassī viharati, bahiddhā vā vedanāsu vedanānupassī viharati, ajjhattabahiddhā vā vedanāsu vedanānupassī viharati. samudayadhammānupassī vā vedanāsu viharati, vayadhammānupassī vā vedanāsu viharati, samudayavayadhammānupassī vā vedanāsu viharati. ‘atthi vedanā’ti vā panassa sati paccupaṭṭhitā hoti yāvadeva ñāṇamattāya paṭissatimattāya anissito ca viharati, na ca kiñci loke upādiyati. evampi kho, bhikkhave, bhikkhu vedanāsu vedanānupassī viharati.'
const REF_VED_K =
  '이와 같이 안으로 느낌에서 느낌을 관찰하며 머문다, 또는 밖으로 느낌에서 느낌을 관찰하며 머문다, 또는 안팎으로 느낌에서 느낌을 관찰하며 머문다. 일어남·사라짐·일어남과사라짐의 현상을 느낌에서 관찰하며 머문다. ‘느낌이 있다’는 마음챙김이 확립되니, 단지 앎과 마음챙김의 정도만큼이며, 의지하지 않고 머물며 세상의 어떤 것에도 집착하지 않는다. 비구들이여, 이와 같이 비구는 느낌에서 느낌을 관찰하며 머문다.'

const REF_CIT =
  'iti ajjhattaṃ vā citte cittānupassī viharati, bahiddhā vā citte cittānupassī viharati, ajjhattabahiddhā vā citte cittānupassī viharati. samudayadhammānupassī vā cittasmiṃ viharati, vayadhammānupassī vā cittasmiṃ viharati, samudayavayadhammānupassī vā cittasmiṃ viharati, ‘atthi cittan’ti vā panassa sati paccupaṭṭhitā hoti yāvadeva ñāṇamattāya paṭissatimattāya anissito ca viharati, na ca kiñci loke upādiyati. evampi kho, bhikkhave, bhikkhu citte cittānupassī viharati.'
const REF_CIT_K =
  '이와 같이 안으로 마음에서 마음을 관찰하며 머문다, 또는 밖으로, 또는 안팎으로 마음에서 마음을 관찰하며 머문다. 마음에서 일어남·사라짐·일어남과사라짐의 현상을 관찰하며 머문다. ‘마음이 있다’는 마음챙김이 확립되니, 단지 앎과 마음챙김의 정도만큼이며, 의지하지 않고 머물며 세상의 어떤 것에도 집착하지 않는다. 비구들이여, 이와 같이 비구는 마음에서 마음을 관찰하며 머문다.'

const REF_DHM = (suffix: string) =>
  `iti ajjhattaṃ vā dhammesu dhammānupassī viharati, bahiddhā vā dhammesu dhammānupassī viharati, ajjhattabahiddhā vā dhammesu dhammānupassī viharati. samudayadhammānupassī vā dhammesu viharati, vayadhammānupassī vā dhammesu viharati, samudayavayadhammānupassī vā dhammesu viharati. ‘atthi dhammā’ti vā panassa sati paccupaṭṭhitā hoti yāvadeva ñāṇamattāya paṭissatimattāya anissito ca viharati, na ca kiñci loke upādiyati. evampi kho, bhikkhave, bhikkhu dhammesu dhammānupassī viharati ${suffix}.`
const REF_DHM_K = (suffixK: string) =>
  `이와 같이 안으로/밖으로/안팎으로 법에서 법을 관찰하며 머물고, 법에서 일어남·사라짐·일어남과사라짐의 현상을 관찰하며 머문다. ‘법들이 있다’는 마음챙김이 확립되니, 단지 앎과 마음챙김의 정도만큼이며, 의지하지 않고 머물며 세상의 어떤 것에도 집착하지 않는다. 비구들이여, 이와 같이 비구는 ${suffixK} 법에서 법을 관찰하며 머문다.`

// ============================================================
// 서두(uddeso) — 핵심 정형구
// ============================================================
const V1 = 'Ekaṃ samayaṃ bhagavā kurūsu viharati kammāsadhammaṃ nāma kurūnaṃ nigamo.'
const V1K = '한 때 세존께서 꾸루 나라의 깜마사담마라는 꾸루 사람들의 마을에 머무셨다.'
const V1B = 'tatra kho bhagavā bhikkhū āmantesi — “bhikkhavo”ti. “bhaddante”ti te bhikkhū bhagavato paccassosuṃ. bhagavā etadavoca —'
const V1BK = '거기서 세존께서 비구들에게 말씀하셨다 — "비구들이여." "존자시여" 하고 비구들이 세존께 응답하였다. 세존께서 이렇게 말씀하셨다 —'

const V2 = '“ekāyano ayaṃ, bhikkhave, maggo sattānaṃ visuddhiyā, sokaparidevānaṃ samatikkamāya dukkhadomanassānaṃ atthaṅgamāya ñāyassa adhigamāya nibbānassa sacchikiriyāya, yadidaṃ cattāro satipaṭṭhānā.'
const V2K = '"비구들이여, 중생의 청정을 위해, 슬픔과 비탄을 넘기 위해, 괴로움과 근심을 사라지게 하기 위해, 바른 이치를 얻기 위해, 열반을 실현하기 위해 — 이 하나의 길이 있으니, 그것이 네 가지 마음챙김의 확립(四念處)이다."'

const V3 = '“katame cattāro? idha, bhikkhave, bhikkhu kāye kāyānupassī viharati ātāpī sampajāno satimā vineyya loke abhijjhādomanassaṃ, vedanāsu vedanānupassī viharati ātāpī sampajāno satimā, vineyya loke abhijjhādomanassaṃ, citte cittānupassī viharati ātāpī sampajāno satimā vineyya loke abhijjhādomanassaṃ, dhammesu dhammānupassī viharati ātāpī sampajāno satimā vineyya loke abhijjhādomanassaṃ.'
const V3K = '"넷이란 무엇인가? 비구들이여, 여기 비구는 (1) 몸에서 몸을 관찰하며 머문다 — 열심히, 분명히 알며, 마음챙기며, 세상에 대한 탐욕과 근심을 제거하면서. (2) 느낌에서 느낌을 관찰하며 머문다 — 열심히, 분명히 알며, 마음챙기며, 세상에 대한 탐욕과 근심을 제거하면서. (3) 마음에서 마음을 관찰하며 머문다 — 열심히, 분명히 알며, 마음챙기며, 세상에 대한 탐욕과 근심을 제거하면서. (4) 법에서 법을 관찰하며 머문다 — 열심히, 분명히 알며, 마음챙기며, 세상에 대한 탐욕과 근심을 제거하면서."'

// ============================================================
// 1. 신념처(kāyānupassanā) — ① 호흡(ānāpāna)
// ============================================================
const V_ANA1 = '“kathañca pana, bhikkhave, bhikkhu kāye kāyānupassī viharati? idha, bhikkhave, bhikkhu araññagato vā rukkhamūlagato vā suññāgāragato vā nisīdati pallaṅkaṃ ābhujitvā ujuṃ kāyaṃ paṇidhāya parimukhaṃ satiṃ upaṭṭhapetvā. so satova assasati, satova passasati. dīghaṃ vā assasanto ‘dīghaṃ assasāmī’ti pajānāti, dīghaṃ vā passasanto ‘dīghaṃ passasāmī’ti pajānāti. rassaṃ vā assasanto ‘rassaṃ assasāmī’ti pajānāti, rassaṃ vā passasanto ‘rassaṃ passasāmī’ti pajānāti. ‘sabbakāyapaṭisaṃvedī assasissāmī’ti sikkhati, ‘sabbakāyapaṭisaṃvedī passasissāmī’ti sikkhati. ‘passambhayaṃ kāyasaṅkhāraṃ assasissāmī’ti sikkhati, ‘passambhayaṃ kāyasaṅkhāraṃ passasissāmī’ti sikkhati.'
const V_ANA1K = '"비구들이여, 비구가 어떻게 몸에서 몸을 관찰하며 머무는가? 비구들이여, 여기 비구는 숲에 가거나, 나무 아래로 가거나, 빈 집으로 가서, 가부좌를 틀고 몸을 곧게 세우고, 면전에 마음챙김을 확립하여 앉는다. 그는 마음챙기며 들이쉬고, 마음챙기며 내쉰다. 길게 들이쉴 때 ‘길게 들이쉰다’고 알아차리고, 길게 내쉴 때 ‘길게 내쉰다’고 알아차린다. 짧게 들이쉴 때 ‘짧게 들이쉰다’고 알아차리고, 짧게 내쉴 때 ‘짧게 내쉰다’고 알아차린다. ‘온 몸을 체험하며 들이쉬리라’ 익히고, ‘온 몸을 체험하며 내쉬리라’ 익힌다. ‘몸의 작용을 고요히 하며 들이쉬리라’ 익히고, ‘몸의 작용을 고요히 하며 내쉬리라’ 익힌다."'

const V_ANA2 = '“seyyathāpi, bhikkhave, dakkho bhamakāro vā bhamakārantevāsī vā dīghaṃ vā añchanto ‘dīghaṃ añchāmī’ti pajānāti, rassaṃ vā añchanto ‘rassaṃ añchāmī’ti pajānāti evameva kho, bhikkhave, bhikkhu dīghaṃ vā assasanto ‘dīghaṃ assasāmī’ti pajānāti, dīghaṃ vā passasanto ‘dīghaṃ passasāmī’ti pajānāti, rassaṃ vā assasanto ‘rassaṃ assasāmī’ti pajānāti, rassaṃ vā passasanto ‘rassaṃ passasāmī’ti pajānāti. ‘sabbakāyapaṭisaṃvedī assasissāmī’ti sikkhati, ‘sabbakāyapaṭisaṃvedī passasissāmī’ti sikkhati, ‘passambhayaṃ kāyasaṅkhāraṃ assasissāmī’ti sikkhati, ‘passambhayaṃ kāyasaṅkhāraṃ passasissāmī’ti sikkhati.'
const V_ANA2K = '"비구들이여, 마치 솜씨 좋은 녹로공이나 그 제자가 길게 돌릴 때 ‘길게 돌린다’고 알고, 짧게 돌릴 때 ‘짧게 돌린다’고 아는 것과 같다. 비구들이여, 이와 같이 비구는 길게 들이쉴 때 ‘길게 들이쉰다’고, 길게 내쉴 때 ‘길게 내쉰다’고, 짧게 들이쉴 때 ‘짧게 들이쉰다’고, 짧게 내쉴 때 ‘짧게 내쉰다’고 알아차린다. ‘온 몸을 체험하며 들이쉬리라/내쉬리라’ 익히고, ‘몸의 작용을 고요히 하며 들이쉬리라/내쉬리라’ 익힌다."'

// ============================================================
// 2. 신념처 — ② 자세(iriyāpatha)
// ============================================================
const V_IRI = '“puna caparaṃ, bhikkhave, bhikkhu gacchanto vā ‘gacchāmī’ti pajānāti, ṭhito vā ‘ṭhitomhī’ti pajānāti, nisinno vā ‘nisinnomhī’ti pajānāti, sayāno vā ‘sayānomhī’ti pajānāti, yathā yathā vā panassa kāyo paṇihito hoti, tathā tathā naṃ pajānāti.'
const V_IRIK = '"또 다시 비구들이여, 비구는 갈 때 ‘간다’고 알아차리고, 서 있을 때 ‘서 있다’고 알아차리고, 앉아 있을 때 ‘앉아 있다’고 알아차리고, 누워 있을 때 ‘누워 있다’고 알아차린다. 또한 몸이 어떤 자세로 있든 그것을 그대로 알아차린다."'

// ============================================================
// 3. 신념처 — ③ 분명한 앎(sampajāna)
// ============================================================
const V_SAM = '“puna caparaṃ, bhikkhave, bhikkhu abhikkante paṭikkante sampajānakārī hoti, ālokite vilokite sampajānakārī hoti, samiñjite pasārite sampajānakārī hoti, saṅghāṭipattacīvaradhāraṇe sampajānakārī hoti, asite pīte khāyite sāyite sampajānakārī hoti, uccārapassāvakamme sampajānakārī hoti, gate ṭhite nisinne sutte jāgarite bhāsite tuṇhībhāve sampajānakārī hoti.'
const V_SAMK = '"또 다시 비구들이여, 비구는 나아갈 때와 물러설 때 분명히 알아차리며 행하고, 앞을 볼 때와 둘러볼 때 분명히 알아차리며 행하고, 굽힐 때와 펼 때 분명히 알아차리며 행하고, 가사·발우·옷을 지닐 때 분명히 알아차리며 행하고, 먹고 마시고 씹고 맛볼 때 분명히 알아차리며 행하고, 대소변을 볼 때 분명히 알아차리며 행하고, 가고 서고 앉고 자고 깨고 말하고 침묵할 때 분명히 알아차리며 행한다."'

// ============================================================
// 4. 신념처 — ④ 32가지 부정관(paṭikūlamanasikāra)
// ============================================================
const V_PATI1 = '“puna caparaṃ, bhikkhave, bhikkhu imameva kāyaṃ uddhaṃ pādatalā adho kesamatthakā tacapariyantaṃ pūraṃ nānappakārassa asucino paccavekkhati — ‘atthi imasmiṃ kāye kesā lomā nakhā dantā taco, maṃsaṃ nhāru aṭṭhi aṭṭhimiñjaṃ vakkaṃ, hadayaṃ yakanaṃ kilomakaṃ pihakaṃ papphāsaṃ, antaṃ antaguṇaṃ udariyaṃ karīsaṃ, pittaṃ semhaṃ pubbo lohitaṃ sedo medo, assu vasā kheḷo siṅghāṇikā lasikā muttan’ti.'
const V_PATI1K = '"또 다시 비구들이여, 비구는 이 몸을 발바닥에서 위로, 머리카락에서 아래로, 피부로 둘러싸인, 갖가지 부정한 것으로 가득 찬 것으로 관찰한다 — ‘이 몸에는 머리카락, 몸털, 손발톱, 이, 살갗, 살, 힘줄, 뼈, 골수, 콩팥, 심장, 간, 늑막, 비장, 폐, 창자, 장간막, 위장의 내용물, 똥, 담즙, 가래, 고름, 피, 땀, 굳기름, 눈물, 기름기, 침, 콧물, 관절액, 오줌이 있다’고."'

const V_PATI2 = '“seyyathāpi, bhikkhave, ubhatomukhā putoḷi pūrā nānāvihitassa dhaññassa, seyyathidaṃ sālīnaṃ vīhīnaṃ muggānaṃ māsānaṃ tilānaṃ taṇḍulānaṃ. tamenaṃ cakkhumā puriso muñcitvā paccavekkheyya — ‘ime sālī, ime vīhī ime muggā ime māsā ime tilā ime taṇḍulā’ti.'
const V_PATI2K = '"비구들이여, 마치 양쪽 입구가 있는 자루에 여러 가지 곡식 — 산미(흰쌀), 벼, 녹두, 검은콩, 참깨, 도정한 쌀 — 이 가득 들어 있어, 눈 있는 사람이 그것을 풀어 살펴보며 ‘이것은 산미, 이것은 벼, 이것은 녹두, 이것은 검은콩, 이것은 참깨, 이것은 도정한 쌀이다’라고 하는 것과 같다."'

const V_PATI3 = 'evameva kho, bhikkhave, bhikkhu imameva kāyaṃ uddhaṃ pādatalā adho kesamatthakā tacapariyantaṃ pūraṃ nānappakārassa asucino paccavekkhati — ‘atthi imasmiṃ kāye kesā lomā nakhā dantā taco, maṃsaṃ nhāru aṭṭhi aṭṭhimiñjaṃ vakkaṃ, hadayaṃ yakanaṃ kilomakaṃ pihakaṃ papphāsaṃ, antaṃ antaguṇaṃ udariyaṃ karīsaṃ, pittaṃ semhaṃ pubbo lohitaṃ sedo medo, assu vasā kheḷo siṅghāṇikā lasikā muttan’ti.'
const V_PATI3K = '"비구들이여, 이와 같이 비구는 이 몸을 발바닥에서 위로, 머리카락에서 아래로, 피부로 둘러싸인 갖가지 부정한 것들로 가득 찬 것으로 관찰한다 — ‘이 몸에는 머리카락, 몸털, 손발톱, 이, 살갗, 살, 힘줄, 뼈, 골수, 콩팥, 심장, 간, 늑막, 비장, 폐, 창자, 장간막, 위장의 내용물, 똥, 담즙, 가래, 고름, 피, 땀, 굳기름, 눈물, 기름기, 침, 콧물, 관절액, 오줌이 있다’고."'

// ============================================================
// 5. 신념처 — ⑤ 사대 요소(dhātumanasikāra)
// ============================================================
const V_DHA1 = '378. “puna caparaṃ, bhikkhave, bhikkhu imameva kāyaṃ yathāṭhitaṃ yathāpaṇihitaṃ dhātuso paccavekkhati — ‘atthi imasmiṃ kāye pathavīdhātu āpodhātu tejodhātu vāyodhātū’ti.'
const V_DHA1K = '378. "또 다시 비구들이여, 비구는 이 몸을 있는 그대로, 놓여 있는 그대로 요소(界)에 따라 관찰한다 — ‘이 몸에는 땅의 요소, 물의 요소, 불의 요소, 바람의 요소가 있다’고."'

const V_DHA2 = '“seyyathāpi, bhikkhave, dakkho goghātako vā goghātakantevāsī vā gāviṃ vadhitvā catumahāpathe bilaso vibhajitvā nisinno assa, evameva kho, bhikkhave, bhikkhu imameva kāyaṃ yathāṭhitaṃ yathāpaṇihitaṃ dhātuso paccavekkhati — ‘atthi imasmiṃ kāye pathavīdhātu āpodhātu tejodhātu vāyodhātū’ti.'
const V_DHA2K = '"비구들이여, 마치 솜씨 좋은 백정이나 그 제자가 소를 잡아 사거리에서 부위별로 잘라 놓고 앉아 있는 것과 같다. 비구들이여, 이와 같이 비구는 이 몸을 있는 그대로, 놓여 있는 그대로 요소에 따라 관찰한다 — ‘이 몸에는 땅의 요소, 물의 요소, 불의 요소, 바람의 요소가 있다’고."'

// ============================================================
// 6. 신념처 — ⑥ 9가지 묘지관(navasivathika)
// ============================================================
const V_SIV1 = '“puna caparaṃ, bhikkhave, bhikkhu seyyathāpi passeyya sarīraṃ sivathikāya chaḍḍitaṃ ekāhamataṃ vā dvīhamataṃ vā tīhamataṃ vā uddhumātakaṃ vinīlakaṃ vipubbakajātaṃ. so imameva kāyaṃ upasaṃharati — ‘ayampi kho kāyo evaṃdhammo evaṃbhāvī evaṃanatīto’ti.'
const V_SIV1K = '"또 다시 비구들이여, 비구는 마치 묘지에 버려진 시체가 죽은 지 하루, 이틀, 사흘 되어 부풀고 검푸르게 되고 고름이 흐르는 것을 보는 것과 같다. 그는 이 자신의 몸을 그것에 견주어 본다 — ‘이 몸도 이러한 성질이고, 이렇게 될 것이며, 이를 벗어나지 못한다’고."'

const V_SIV2 = '“puna caparaṃ, bhikkhave, bhikkhu seyyathāpi passeyya sarīraṃ sivathikāya chaḍḍitaṃ kākehi vā khajjamānaṃ kulalehi vā khajjamānaṃ gijjhehi vā khajjamānaṃ kaṅkehi vā khajjamānaṃ sunakhehi vā khajjamānaṃ byagghehi vā khajjamānaṃ dīpīhi vā khajjamānaṃ siṅgālehi vā khajjamānaṃ vividhehi vā pāṇakajātehi khajjamānaṃ. so imameva kāyaṃ upasaṃharati — ‘ayampi kho kāyo evaṃdhammo evaṃbhāvī evaṃanatīto’ti.'
const V_SIV2K = '"또 다시 비구들이여, 비구는 마치 묘지에 버려진 시체가 까마귀, 매, 독수리, 백로, 개, 호랑이, 표범, 자칼, 또는 갖가지 벌레들에 의해 뜯어 먹히는 것을 보는 것과 같다. 그는 이 자신의 몸을 그것에 견주어 본다 — ‘이 몸도 이러한 성질이고, 이렇게 될 것이며, 이를 벗어나지 못한다’고."'

const V_SIV3 = '“puna caparaṃ, bhikkhave, bhikkhu seyyathāpi passeyya sarīraṃ sivathikāya chaḍḍitaṃ aṭṭhikasaṅkhalikaṃ samaṃsalohitaṃ nhārusambandhaṃ so imameva kāyaṃ upasaṃharati — ‘ayampi kho kāyo evaṃdhammo evaṃbhāvī evaṃanatīto’ti.'
const V_SIV3K = '"또 다시 비구들이여, 비구는 마치 묘지에 버려진 시체가 살과 피가 붙어 있고 힘줄로 이어진 해골이 된 것을 보는 것과 같다. 그는 이 자신의 몸을 그것에 견주어 본다 — ‘이 몸도 이러한 성질이고, 이렇게 될 것이며, 이를 벗어나지 못한다’고."'

const V_SIV4 = 'puna caparaṃ, bhikkhave, bhikkhu seyyathāpi passeyya sarīraṃ sivathikāya chaḍḍitaṃ aṭṭhikasaṅkhalikaṃ nimaṃsalohitamakkhitaṃ nhārusambandhaṃ so imameva kāyaṃ upasaṃharati — ‘ayampi kho kāyo evaṃdhammo evaṃbhāvī evaṃanatīto’ti.'
const V_SIV4K = '"또 다시 비구들이여, 비구는 마치 묘지에 버려진 시체가 살은 없고 피만 묻어 있으며 힘줄로 이어진 해골이 된 것을 보는 것과 같다. 그는 이 자신의 몸을 그것에 견주어 본다 — ‘이 몸도 이러한 성질이고, 이렇게 될 것이며, 이를 벗어나지 못한다’고."'

const V_SIV5 = 'puna caparaṃ, bhikkhave, bhikkhu seyyathāpi passeyya sarīraṃ sivathikāya chaḍḍitaṃ aṭṭhikasaṅkhalikaṃ apagatamaṃsalohitaṃ nhārusambandhaṃ so imameva kāyaṃ upasaṃharati — ‘ayampi kho kāyo evaṃdhammo evaṃbhāvī evaṃanatīto’ti.'
const V_SIV5K = '"또 다시 비구들이여, 비구는 마치 묘지에 버려진 시체가 살과 피가 사라지고 힘줄로만 이어진 해골이 된 것을 보는 것과 같다. 그는 이 자신의 몸을 그것에 견주어 본다 — ‘이 몸도 이러한 성질이고, 이렇게 될 것이며, 이를 벗어나지 못한다’고."'

const V_SIV6 = 'puna caparaṃ, bhikkhave, bhikkhu seyyathāpi passeyya sarīraṃ sivathikāya chaḍḍitaṃ aṭṭhikāni apagatasambandhāni disā vidisā vikkhittāni, aññena hatthaṭṭhikaṃ aññena pādaṭṭhikaṃ aññena gopphakaṭṭhikaṃ aññena jaṅghaṭṭhikaṃ aññena ūruṭṭhikaṃ aññena kaṭiṭṭhikaṃ aññena phāsukaṭṭhikaṃ aññena piṭṭhiṭṭhikaṃ aññena khandhaṭṭhikaṃ aññena gīvaṭṭhikaṃ aññena hanukaṭṭhikaṃ aññena dantaṭṭhikaṃ aññena sīsakaṭāhaṃ. so imameva kāyaṃ upasaṃharati — ‘ayampi kho kāyo evaṃdhammo evaṃbhāvī evaṃanatīto’ti.'
const V_SIV6K = '"또 다시 비구들이여, 비구는 마치 묘지에 버려진 시체의 뼈들이 연결이 풀려 사방팔방으로 흩어져 — 손뼈는 이쪽에, 발뼈는 저쪽에, 발목뼈·정강이뼈·넙다리뼈·골반뼈·갈비뼈·등뼈·어깨뼈·목뼈·턱뼈·이뼈·두개골이 각각 다른 곳에 있는 것을 보는 것과 같다. 그는 이 자신의 몸을 그것에 견주어 본다 — ‘이 몸도 이러한 성질이고, 이렇게 될 것이며, 이를 벗어나지 못한다’고."'

const V_SIV7 = '“puna caparaṃ, bhikkhave, bhikkhu seyyathāpi passeyya sarīraṃ sivathikāya chaḍḍitaṃ aṭṭhikāni setāni saṅkhavaṇṇapaṭibhāgāni so imameva kāyaṃ upasaṃharati — ‘ayampi kho kāyo evaṃdhammo evaṃbhāvī evaṃanatīto’ti.'
const V_SIV7K = '"또 다시 비구들이여, 비구는 마치 묘지에 버려진 시체의 뼈들이 소라처럼 흰빛인 것을 보는 것과 같다. 그는 이 자신의 몸을 그것에 견주어 본다 — ‘이 몸도 이러한 성질이고, 이렇게 될 것이며, 이를 벗어나지 못한다’고."'

const V_SIV8 = 'puna caparaṃ, bhikkhave, bhikkhu seyyathāpi passeyya sarīraṃ sivathikāya chaḍḍitaṃ aṭṭhikāni puñjakitāni terovassikāni so imameva kāyaṃ upasaṃharati — ‘ayampi kho kāyo evaṃdhammo evaṃbhāvī evaṃanatīto’ti.'
const V_SIV8K = '"또 다시 비구들이여, 비구는 마치 묘지에 버려진 시체의 뼈들이 한 해가 지난 채 무더기로 쌓여 있는 것을 보는 것과 같다. 그는 이 자신의 몸을 그것에 견주어 본다 — ‘이 몸도 이러한 성질이고, 이렇게 될 것이며, 이를 벗어나지 못한다’고."'

const V_SIV9 = 'puna caparaṃ, bhikkhave, bhikkhu seyyathāpi passeyya sarīraṃ sivathikāya chaḍḍitaṃ aṭṭhikāni pūtīni cuṇṇakajātāni. so imameva kāyaṃ upasaṃharati — ‘ayampi kho kāyo evaṃdhammo evaṃbhāvī evaṃanatīto’ti.'
const V_SIV9K = '"또 다시 비구들이여, 비구는 마치 묘지에 버려진 시체의 뼈들이 썩어 가루가 된 것을 보는 것과 같다. 그는 이 자신의 몸을 그것에 견주어 본다 — ‘이 몸도 이러한 성질이고, 이렇게 될 것이며, 이를 벗어나지 못한다’고."'

// ============================================================
// 7. 수념처(vedanānupassanā)
// ============================================================
const V_VED1 = '“kathañca pana, bhikkhave, bhikkhu vedanāsu vedanānupassī viharati? idha, bhikkhave, bhikkhu sukhaṃ vā vedanaṃ vedayamāno ‘sukhaṃ vedanaṃ vedayāmī’ti pajānāti. dukkhaṃ vā vedanaṃ vedayamāno ‘dukkhaṃ vedanaṃ vedayāmī’ti pajānāti. adukkhamasukhaṃ vā vedanaṃ vedayamāno ‘adukkhamasukhaṃ vedanaṃ vedayāmī’ti pajānāti.'
const V_VED1K = '"비구들이여, 비구가 어떻게 느낌에서 느낌을 관찰하며 머무는가? 비구들이여, 여기 비구는 즐거운 느낌을 느낄 때 ‘즐거운 느낌을 느낀다’고 알아차린다. 괴로운 느낌을 느낄 때 ‘괴로운 느낌을 느낀다’고 알아차린다. 즐겁지도 괴롭지도 않은 느낌을 느낄 때 ‘즐겁지도 괴롭지도 않은 느낌을 느낀다’고 알아차린다."'

const V_VED2 = 'sāmisaṃ vā sukhaṃ vedanaṃ vedayamāno ‘sāmisaṃ sukhaṃ vedanaṃ vedayāmī’ti pajānāti, nirāmisaṃ vā sukhaṃ vedanaṃ vedayamāno ‘nirāmisaṃ sukhaṃ vedanaṃ vedayāmī’ti pajānāti. sāmisaṃ vā dukkhaṃ vedanaṃ vedayamāno ‘sāmisaṃ dukkhaṃ vedanaṃ vedayāmī’ti pajānāti, nirāmisaṃ vā dukkhaṃ vedanaṃ vedayamāno ‘nirāmisaṃ dukkhaṃ vedanaṃ vedayāmī’ti pajānāti. sāmisaṃ vā adukkhamasukhaṃ vedanaṃ vedayamāno ‘sāmisaṃ adukkhamasukhaṃ vedanaṃ vedayāmī’ti pajānāti, nirāmisaṃ vā adukkhamasukhaṃ vedanaṃ vedayamāno ‘nirāmisaṃ adukkhamasukhaṃ vedanaṃ vedayāmī’ti pajānāti.'
const V_VED2K = '"세속적인(肉的) 즐거운 느낌을 느낄 때 ‘세속적인 즐거운 느낌을 느낀다’고, 비세속적인(出世間的) 즐거운 느낌을 느낄 때 ‘비세속적인 즐거운 느낌을 느낀다’고 알아차린다. 세속적·비세속적인 괴로운 느낌, 세속적·비세속적인 즐겁지도 괴롭지도 않은 느낌에 대해서도 마찬가지로 그 각각을 그대로 알아차린다."'

// ============================================================
// 8. 심념처(cittānupassanā)
// ============================================================
const V_CIT1 = '“kathañca pana, bhikkhave, bhikkhu citte cittānupassī viharati? idha, bhikkhave, bhikkhu sarāgaṃ vā cittaṃ ‘sarāgaṃ cittan’ti pajānāti, vītarāgaṃ vā cittaṃ ‘vītarāgaṃ cittan’ti pajānāti. sadosaṃ vā cittaṃ ‘sadosaṃ cittan’ti pajānāti, vītadosaṃ vā cittaṃ ‘vītadosaṃ cittan’ti pajānāti. samohaṃ vā cittaṃ ‘samohaṃ cittan’ti pajānāti, vītamohaṃ vā cittaṃ ‘vītamohaṃ cittan’ti pajānāti.'
const V_CIT1K = '"비구들이여, 비구가 어떻게 마음에서 마음을 관찰하며 머무는가? 비구들이여, 여기 비구는 탐욕이 있는 마음을 ‘탐욕이 있는 마음’이라고, 탐욕이 없는 마음을 ‘탐욕이 없는 마음’이라고 알아차린다. 성냄이 있는 마음을 ‘성냄이 있는 마음’이라고, 성냄이 없는 마음을 ‘성냄이 없는 마음’이라고 알아차린다. 어리석음이 있는 마음을 ‘어리석음이 있는 마음’이라고, 어리석음이 없는 마음을 ‘어리석음이 없는 마음’이라고 알아차린다."'

const V_CIT2 = 'saṅkhittaṃ vā cittaṃ ‘saṅkhittaṃ cittan’ti pajānāti, vikkhittaṃ vā cittaṃ ‘vikkhittaṃ cittan’ti pajānāti. mahaggataṃ vā cittaṃ ‘mahaggataṃ cittan’ti pajānāti, amahaggataṃ vā cittaṃ ‘amahaggataṃ cittan’ti pajānāti. sauttaraṃ vā cittaṃ ‘sauttaraṃ cittan’ti pajānāti, anuttaraṃ vā cittaṃ ‘anuttaraṃ cittan’ti pajānāti. samāhitaṃ vā cittaṃ ‘samāhitaṃ cittan’ti pajānāti, asamāhitaṃ vā cittaṃ ‘asamāhitaṃ cittan’ti pajānāti. vimuttaṃ vā cittaṃ ‘vimuttaṃ cittan’ti pajānāti. avimuttaṃ vā cittaṃ ‘avimuttaṃ cittan’ti pajānāti.'
const V_CIT2K = '"위축된 마음을 ‘위축된 마음’이라고, 산란한 마음을 ‘산란한 마음’이라고 알아차린다. 광대한 마음을 ‘광대한 마음’이라고, 광대하지 않은 마음을 ‘광대하지 않은 마음’이라고 알아차린다. 위가 있는 마음을 ‘위가 있는 마음’이라고, 위 없는 마음을 ‘위 없는 마음’이라고 알아차린다. 삼매에 든 마음을 ‘삼매에 든 마음’이라고, 삼매에 들지 않은 마음을 ‘삼매에 들지 않은 마음’이라고 알아차린다. 해탈한 마음을 ‘해탈한 마음’이라고, 해탈하지 못한 마음을 ‘해탈하지 못한 마음’이라고 알아차린다."'

// ============================================================
// 9. 법념처(dhammānupassanā) — ① 다섯 장애(nīvaraṇa)
// ============================================================
const V_NIV0 = '“kathañca pana, bhikkhave, bhikkhu dhammesu dhammānupassī viharati? idha, bhikkhave, bhikkhu dhammesu dhammānupassī viharati pañcasu nīvaraṇesu. kathañca pana, bhikkhave, bhikkhu dhammesu dhammānupassī viharati pañcasu nīvaraṇesu?'
const V_NIV0K = '"비구들이여, 비구가 어떻게 법에서 법을 관찰하며 머무는가? 비구들이여, 여기 비구는 다섯 가지 장애의 법에서 법을 관찰하며 머문다. 비구들이여, 비구가 어떻게 다섯 가지 장애의 법에서 법을 관찰하며 머무는가?"'

const V_NIV1 = '“idha, bhikkhave, bhikkhu santaṃ vā ajjhattaṃ kāmacchandaṃ ‘atthi me ajjhattaṃ kāmacchando’ti pajānāti, asantaṃ vā ajjhattaṃ kāmacchandaṃ ‘natthi me ajjhattaṃ kāmacchando’ti pajānāti, yathā ca anuppannassa kāmacchandassa uppādo hoti tañca pajānāti, yathā ca uppannassa kāmacchandassa pahānaṃ hoti tañca pajānāti, yathā ca pahīnassa kāmacchandassa āyatiṃ anuppādo hoti tañca pajānāti.'
const V_NIV1K = '"비구들이여, 여기 비구는 안에 감각적 욕망이 있을 때 ‘안에 감각적 욕망이 있다’고 알아차리고, 없을 때 ‘안에 감각적 욕망이 없다’고 알아차린다. 그리고 일어나지 않은 감각적 욕망이 어떻게 일어나는지 알아차리고, 일어난 감각적 욕망이 어떻게 끊어지는지 알아차리고, 끊어진 감각적 욕망이 앞으로 어떻게 일어나지 않게 되는지 알아차린다."'

const V_NIV2 = '“santaṃ vā ajjhattaṃ byāpādaṃ ‘atthi me ajjhattaṃ byāpādo’ti pajānāti, asantaṃ vā ajjhattaṃ byāpādaṃ ‘natthi me ajjhattaṃ byāpādo’ti pajānāti, yathā ca anuppannassa byāpādassa uppādo hoti tañca pajānāti, yathā ca uppannassa byāpādassa pahānaṃ hoti tañca pajānāti, yathā ca pahīnassa byāpādassa āyatiṃ anuppādo hoti tañca pajānāti.'
const V_NIV2K = '"안에 악의가 있을 때 ‘안에 악의가 있다’고, 없을 때 ‘안에 악의가 없다’고 알아차린다. 일어나지 않은 악의가 어떻게 일어나는지, 일어난 악의가 어떻게 끊어지는지, 끊어진 악의가 앞으로 어떻게 일어나지 않게 되는지 알아차린다."'

const V_NIV3 = '“santaṃ vā ajjhattaṃ thinamiddhaṃ ‘atthi me ajjhattaṃ thinamiddhan’ti pajānāti, asantaṃ vā ajjhattaṃ thinamiddhaṃ ‘natthi me ajjhattaṃ thinamiddhan’ti pajānāti, yathā ca anuppannassa thinamiddhassa uppādo hoti tañca pajānāti, yathā ca uppannassa thinamiddhassa pahānaṃ hoti tañca pajānāti, yathā ca pahīnassa thinamiddhassa āyatiṃ anuppādo hoti tañca pajānāti.'
const V_NIV3K = '"안에 해태와 혼침이 있을 때 ‘안에 해태와 혼침이 있다’고, 없을 때 ‘안에 해태와 혼침이 없다’고 알아차린다. 일어나지 않은 해태·혼침이 어떻게 일어나는지, 일어난 것이 어떻게 끊어지는지, 끊어진 것이 앞으로 어떻게 일어나지 않게 되는지 알아차린다."'

const V_NIV4 = '“santaṃ vā ajjhattaṃ uddhaccakukkuccaṃ ‘atthi me ajjhattaṃ uddhaccakukkuccan’ti pajānāti, asantaṃ vā ajjhattaṃ uddhaccakukkuccaṃ ‘natthi me ajjhattaṃ uddhaccakukkuccan’ti pajānāti, yathā ca anuppannassa uddhaccakukkuccassa uppādo hoti tañca pajānāti, yathā ca uppannassa uddhaccakukkuccassa pahānaṃ hoti tañca pajānāti, yathā ca pahīnassa uddhaccakukkuccassa āyatiṃ anuppādo hoti tañca pajānāti.'
const V_NIV4K = '"안에 들뜸과 후회가 있을 때 ‘안에 들뜸과 후회가 있다’고, 없을 때 ‘안에 들뜸과 후회가 없다’고 알아차린다. 일어나지 않은 들뜸·후회가 어떻게 일어나는지, 일어난 것이 어떻게 끊어지는지, 끊어진 것이 앞으로 어떻게 일어나지 않게 되는지 알아차린다."'

const V_NIV5 = '“santaṃ vā ajjhattaṃ vicikicchaṃ ‘atthi me ajjhattaṃ vicikicchā’ti pajānāti, asantaṃ vā ajjhattaṃ vicikicchaṃ ‘natthi me ajjhattaṃ vicikicchā’ti pajānāti, yathā ca anuppannāya vicikicchāya uppādo hoti tañca pajānāti, yathā ca uppannāya vicikicchāya pahānaṃ hoti tañca pajānāti, yathā ca pahīnāya vicikicchāya āyatiṃ anuppādo hoti tañca pajānāti.'
const V_NIV5K = '"안에 의심이 있을 때 ‘안에 의심이 있다’고, 없을 때 ‘안에 의심이 없다’고 알아차린다. 일어나지 않은 의심이 어떻게 일어나는지, 일어난 의심이 어떻게 끊어지는지, 끊어진 의심이 앞으로 어떻게 일어나지 않게 되는지 알아차린다."'

// ============================================================
// 10. 법념처 — ② 오취온(khandha)
// ============================================================
const V_KHA = '“puna caparaṃ, bhikkhave, bhikkhu dhammesu dhammānupassī viharati pañcasu upādānakkhandhesu. kathañca pana, bhikkhave, bhikkhu dhammesu dhammānupassī viharati pañcasu upādānakkhandhesu? idha, bhikkhave, bhikkhu — ‘iti rūpaṃ, iti rūpassa samudayo, iti rūpassa atthaṅgamo; iti vedanā, iti vedanāya samudayo, iti vedanāya atthaṅgamo; iti saññā, iti saññāya samudayo, iti saññāya atthaṅgamo; iti saṅkhārā, iti saṅkhārānaṃ samudayo, iti saṅkhārānaṃ atthaṅgamo, iti viññāṇaṃ, iti viññāṇassa samudayo, iti viññāṇassa atthaṅgamo’ti,'
const V_KHAK = '"또 다시 비구들이여, 비구는 다섯 가지 취착의 무더기(五取蘊)의 법에서 법을 관찰하며 머문다. 어떻게 그러한가? 비구들이여, 여기 비구는 — ‘이것이 물질, 이것이 물질의 일어남, 이것이 물질의 사라짐. 이것이 느낌, 이것이 느낌의 일어남, 이것이 느낌의 사라짐. 이것이 인식, 이것이 인식의 일어남, 이것이 인식의 사라짐. 이것이 형성들, 이것이 형성들의 일어남, 이것이 형성들의 사라짐. 이것이 의식, 이것이 의식의 일어남, 이것이 의식의 사라짐이다’라고."'

// ============================================================
// 11. 법념처 — ③ 육내외처(āyatana)
// ============================================================
const V_AYA0 = '“puna caparaṃ, bhikkhave, bhikkhu dhammesu dhammānupassī viharati chasu ajjhattikabāhiresu āyatanesu. kathañca pana, bhikkhave, bhikkhu dhammesu dhammānupassī viharati chasu ajjhattikabāhiresu āyatanesu?'
const V_AYA0K = '"또 다시 비구들이여, 비구는 여섯 가지 안팎의 감각 영역(六內外處)의 법에서 법을 관찰하며 머문다. 어떻게 그러한가?"'

const V_AYA1 = '“idha, bhikkhave, bhikkhu cakkhuñca pajānāti, rūpe ca pajānāti, yañca tadubhayaṃ paṭicca uppajjati saṃyojanaṃ tañca pajānāti, yathā ca anuppannassa saṃyojanassa uppādo hoti tañca pajānāti, yathā ca uppannassa saṃyojanassa pahānaṃ hoti tañca pajānāti, yathā ca pahīnassa saṃyojanassa āyatiṃ anuppādo hoti tañca pajānāti.'
const V_AYA1K = '"비구들이여, 여기 비구는 눈을 알아차리고, 형색을 알아차리고, 그 둘을 의지하여 일어나는 결박을 알아차리고, 일어나지 않은 결박이 어떻게 일어나는지, 일어난 결박이 어떻게 끊어지는지, 끊어진 결박이 앞으로 어떻게 일어나지 않게 되는지 알아차린다."'

const V_AYA2 = '“sotañca pajānāti, sadde ca pajānāti, yañca tadubhayaṃ paṭicca uppajjati saṃyojanaṃ tañca pajānāti, yathā ca anuppannassa saṃyojanassa uppādo hoti tañca pajānāti, yathā ca uppannassa saṃyojanassa pahānaṃ hoti tañca pajānāti, yathā ca pahīnassa saṃyojanassa āyatiṃ anuppādo hoti tañca pajānāti.'
const V_AYA2K = '"귀를 알아차리고, 소리를 알아차리고, 그 둘을 의지하여 일어나는 결박, 일어나지 않은 결박의 일어남, 일어난 결박의 끊어짐, 끊어진 결박이 앞으로 일어나지 않게 됨을 알아차린다."'

const V_AYA3 = '“ghānañca pajānāti, gandhe ca pajānāti, yañca tadubhayaṃ paṭicca uppajjati saṃyojanaṃ tañca pajānāti, yathā ca anuppannassa saṃyojanassa uppādo hoti tañca pajānāti, yathā ca uppannassa saṃyojanassa pahānaṃ hoti tañca pajānāti, yathā ca pahīnassa saṃyojanassa āyatiṃ anuppādo hoti tañca pajānāti.'
const V_AYA3K = '"코를 알아차리고, 냄새를 알아차리고, 그 둘을 의지하여 일어나는 결박, 일어남·끊어짐·앞으로 일어나지 않게 됨을 알아차린다."'

const V_AYA4 = '“jivhañca pajānāti, rase ca pajānāti, yañca tadubhayaṃ paṭicca uppajjati saṃyojanaṃ tañca pajānāti, yathā ca anuppannassa saṃyojanassa uppādo hoti tañca pajānāti, yathā ca uppannassa saṃyojanassa pahānaṃ hoti tañca pajānāti, yathā ca pahīnassa saṃyojanassa āyatiṃ anuppādo hoti tañca pajānāti.'
const V_AYA4K = '"혀를 알아차리고, 맛을 알아차리고, 그 둘을 의지하여 일어나는 결박, 일어남·끊어짐·앞으로 일어나지 않게 됨을 알아차린다."'

const V_AYA5 = '“kāyañca pajānāti, phoṭṭhabbe ca pajānāti, yañca tadubhayaṃ paṭicca uppajjati saṃyojanaṃ tañca pajānāti, yathā ca anuppannassa saṃyojanassa uppādo hoti tañca pajānāti, yathā ca uppannassa saṃyojanassa pahānaṃ hoti tañca pajānāti, yathā ca pahīnassa saṃyojanassa āyatiṃ anuppādo hoti tañca pajānāti.'
const V_AYA5K = '"몸을 알아차리고, 감촉을 알아차리고, 그 둘을 의지하여 일어나는 결박, 일어남·끊어짐·앞으로 일어나지 않게 됨을 알아차린다."'

const V_AYA6 = '“manañca pajānāti, dhamme ca pajānāti, yañca tadubhayaṃ paṭicca uppajjati saṃyojanaṃ tañca pajānāti, yathā ca anuppannassa saṃyojanassa uppādo hoti tañca pajānāti, yathā ca uppannassa saṃyojanassa pahānaṃ hoti tañca pajānāti, yathā ca pahīnassa saṃyojanassa āyatiṃ anuppādo hoti tañca pajānāti.'
const V_AYA6K = '"마노(意)를 알아차리고, 법(法)을 알아차리고, 그 둘을 의지하여 일어나는 결박, 일어남·끊어짐·앞으로 일어나지 않게 됨을 알아차린다."'

// ============================================================
// 12. 법념처 — ④ 칠각지(bojjhaṅga)
// ============================================================
const V_BOJ0 = '“puna caparaṃ, bhikkhave, bhikkhu dhammesu dhammānupassī viharati sattasu bojjhaṅgesu. kathañca pana, bhikkhave, bhikkhu dhammesu dhammānupassī viharati sattasu bojjhaṅgesu?'
const V_BOJ0K = '"또 다시 비구들이여, 비구는 일곱 가지 깨달음의 요소(七覺支)의 법에서 법을 관찰하며 머문다. 어떻게 그러한가?"'

const V_BOJ1 = 'idha, bhikkhave, bhikkhu santaṃ vā ajjhattaṃ satisambojjhaṅgaṃ ‘atthi me ajjhattaṃ satisambojjhaṅgo’ti pajānāti, asantaṃ vā ajjhattaṃ satisambojjhaṅgaṃ ‘natthi me ajjhattaṃ satisambojjhaṅgo’ti pajānāti, yathā ca anuppannassa satisambojjhaṅgassa uppādo hoti tañca pajānāti, yathā ca uppannassa satisambojjhaṅgassa bhāvanāya pāripūrī hoti tañca pajānāti.'
const V_BOJ1K = '"비구들이여, 여기 비구는 안에 마음챙김의 각지가 있을 때 ‘안에 마음챙김의 각지가 있다’고, 없을 때 ‘안에 마음챙김의 각지가 없다’고 알아차린다. 일어나지 않은 마음챙김의 각지가 어떻게 일어나는지, 일어난 마음챙김의 각지가 어떻게 닦아 완성되는지 알아차린다."'

const V_BOJ2 = '“santaṃ vā ajjhattaṃ dhammavicayasambojjhaṅgaṃ ‘atthi me ajjhattaṃ dhammavicayasambojjhaṅgo’ti pajānāti, asantaṃ vā ajjhattaṃ dhammavicayasambojjhaṅgaṃ ‘natthi me ajjhattaṃ dhammavicayasambojjhaṅgo’ti pajānāti, yathā ca anuppannassa dhammavicayasambojjhaṅgassa uppādo hoti tañca pajānāti, yathā ca uppannassa dhammavicayasambojjhaṅgassa bhāvanāya pāripūrī hoti tañca pajānāti.'
const V_BOJ2K = '"법 간택의 각지에 대해서도 마찬가지로 — 있을 때 ‘있다’고, 없을 때 ‘없다’고 알아차리며, 일어나지 않은 것의 일어남과 일어난 것의 닦아 완성됨을 알아차린다."'

const V_BOJ3 = '“santaṃ vā ajjhattaṃ vīriyasambojjhaṅgaṃ ‘atthi me ajjhattaṃ vīriyasambojjhaṅgo’ti pajānāti, asantaṃ vā ajjhattaṃ vīriyasambojjhaṅgaṃ ‘natthi me ajjhattaṃ vīriyasambojjhaṅgo’ti pajānāti, yathā ca anuppannassa vīriyasambojjhaṅgassa uppādo hoti tañca pajānāti, yathā ca uppannassa vīriyasambojjhaṅgassa bhāvanāya pāripūrī hoti tañca pajānāti.'
const V_BOJ3K = '"정진의 각지에 대해서도 — 있을 때 ‘있다’고, 없을 때 ‘없다’고 알아차리며, 일어남과 닦아 완성됨을 알아차린다."'

const V_BOJ4 = '“santaṃ vā ajjhattaṃ pītisambojjhaṅgaṃ ‘atthi me ajjhattaṃ pītisambojjhaṅgo’ti pajānāti, asantaṃ vā ajjhattaṃ pītisambojjhaṅgaṃ ‘natthi me ajjhattaṃ pītisambojjhaṅgo’ti pajānāti, yathā ca anuppannassa pītisambojjhaṅgassa uppādo hoti tañca pajānāti, yathā ca uppannassa pītisambojjhaṅgassa bhāvanāya pāripūrī hoti tañca pajānāti.'
const V_BOJ4K = '"희열의 각지에 대해서도 — 있을 때 ‘있다’고, 없을 때 ‘없다’고 알아차리며, 일어남과 닦아 완성됨을 알아차린다."'

const V_BOJ5 = '“santaṃ vā ajjhattaṃ passaddhisambojjhaṅgaṃ ‘atthi me ajjhattaṃ passaddhisambojjhaṅgo’ti pajānāti, asantaṃ vā ajjhattaṃ passaddhisambojjhaṅgaṃ ‘natthi me ajjhattaṃ passaddhisambojjhaṅgo’ti pajānāti, yathā ca anuppannassa passaddhisambojjhaṅgassa uppādo hoti tañca pajānāti, yathā ca uppannassa passaddhisambojjhaṅgassa bhāvanāya pāripūrī hoti tañca pajānāti.'
const V_BOJ5K = '"고요함의 각지에 대해서도 — 있을 때 ‘있다’고, 없을 때 ‘없다’고 알아차리며, 일어남과 닦아 완성됨을 알아차린다."'

const V_BOJ6 = '“santaṃ vā ajjhattaṃ samādhisambojjhaṅgaṃ ‘atthi me ajjhattaṃ samādhisambojjhaṅgo’ti pajānāti, asantaṃ vā ajjhattaṃ samādhisambojjhaṅgaṃ ‘natthi me ajjhattaṃ samādhisambojjhaṅgo’ti pajānāti, yathā ca anuppannassa samādhisambojjhaṅgassa uppādo hoti tañca pajānāti, yathā ca uppannassa samādhisambojjhaṅgassa bhāvanāya pāripūrī hoti tañca pajānāti.'
const V_BOJ6K = '"삼매의 각지에 대해서도 — 있을 때 ‘있다’고, 없을 때 ‘없다’고 알아차리며, 일어남과 닦아 완성됨을 알아차린다."'

const V_BOJ7 = '“santaṃ vā ajjhattaṃ upekkhāsambojjhaṅgaṃ ‘atthi me ajjhattaṃ upekkhāsambojjhaṅgo’ti pajānāti, asantaṃ vā ajjhattaṃ upekkhāsambojjhaṅgaṃ ‘natthi me ajjhattaṃ upekkhāsambojjhaṅgo’ti pajānāti, yathā ca anuppannassa upekkhāsambojjhaṅgassa uppādo hoti tañca pajānāti, yathā ca uppannassa upekkhāsambojjhaṅgassa bhāvanāya pāripūrī hoti tañca pajānāti.'
const V_BOJ7K = '"평정의 각지에 대해서도 — 있을 때 ‘있다’고, 없을 때 ‘없다’고 알아차리며, 일어남과 닦아 완성됨을 알아차린다."'

// ============================================================
// 13. 법념처 — ⑤ 사성제(catu ariya sacca)
// ============================================================
const V_SAC0 = '“puna caparaṃ, bhikkhave, bhikkhu dhammesu dhammānupassī viharati catūsu ariyasaccesu. kathañca pana, bhikkhave, bhikkhu dhammesu dhammānupassī viharati catūsu ariyasaccesu? idha, bhikkhave, bhikkhu ‘idaṃ dukkhan’ti yathābhūtaṃ pajānāti, ‘ayaṃ dukkhasamudayo’ti yathābhūtaṃ pajānāti, ‘ayaṃ dukkhanirodho’ti yathābhūtaṃ pajānāti, ‘ayaṃ dukkhanirodhagāminī paṭipadā’ti yathābhūtaṃ pajānāti.'
const V_SAC0K = '"또 다시 비구들이여, 비구는 네 가지 성스러운 진리(四聖諦)의 법에서 법을 관찰하며 머문다. 어떻게 그러한가? 비구들이여, 여기 비구는 ‘이것이 괴로움이다’라고 있는 그대로 알고, ‘이것이 괴로움의 일어남이다’라고 있는 그대로 알고, ‘이것이 괴로움의 사라짐이다’라고 있는 그대로 알고, ‘이것이 괴로움의 사라짐에 이르는 길이다’라고 있는 그대로 안다."'

const V_DUK0 = '“katamañca, bhikkhave, dukkhaṃ ariyasaccaṃ? jātipi dukkhā, jarāpi dukkhā, maraṇampi dukkhaṃ, sokaparidevadukkhadomanassupāyāsāpi dukkhā, [appiyehi sampayogopi dukkho, piyehi vippayogopi dukkho], yampicchaṃ na labhati tampi dukkhaṃ, saṅkhittena pañcupādānakkhandhā dukkhā.'
const V_DUK0K = '"비구들이여, 무엇이 괴로움의 성스러운 진리인가? 태어남도 괴로움, 늙음도 괴로움, 죽음도 괴로움, 슬픔·비탄·괴로움·근심·번뇌도 괴로움, [사랑하지 않는 것과 만나는 것도 괴로움, 사랑하는 것과 헤어지는 것도 괴로움], 원하는 것을 얻지 못하는 것도 괴로움이다. 요컨대 다섯 가지 취착의 무더기가 괴로움이다."'

const V_DUK1 = '“katamā ca, bhikkhave, jāti? yā tesaṃ tesaṃ sattānaṃ tamhi tamhi sattanikāye jāti sañjāti okkanti abhinibbatti khandhānaṃ pātubhāvo āyatanānaṃ paṭilābho, ayaṃ vuccati, bhikkhave, jāti.'
const V_DUK1K = '"비구들이여, 무엇이 태어남인가? 이런저런 중생들이 이런저런 중생의 무리 가운데서 태어남, 생겨남, 출현, 발생, 무더기들의 나타남, 감각 영역들의 획득 — 비구들이여, 이를 일러 태어남이라 한다."'

const V_DUK2 = '“katamā ca, bhikkhave, jarā? yā tesaṃ tesaṃ sattānaṃ tamhi tamhi sattanikāye jarā jīraṇatā khaṇḍiccaṃ pāliccaṃ valittacatā āyuno saṃhāni indriyānaṃ paripāko, ayaṃ vuccati, bhikkhave, jarā.'
const V_DUK2K = '"비구들이여, 무엇이 늙음인가? 이런저런 중생들이 이런저런 중생의 무리 가운데서 늙음, 노쇠, 이가 빠짐, 머리가 셈, 살갗에 주름, 수명의 감소, 감각기관들의 쇠퇴 — 비구들이여, 이를 일러 늙음이라 한다."'

const V_DUK3 = '“katamañca, bhikkhave, maraṇaṃ? yaṃ tesaṃ tesaṃ sattānaṃ tamhā tamhā sattanikāyā cuti cavanatā bhedo antaradhānaṃ maccu maraṇaṃ kālakiriyā khandhānaṃ bhedo kaḷevarassa nikkhepo jīvitindriyassupacchedo, idaṃ vuccati, bhikkhave, maraṇaṃ.'
const V_DUK3K = '"비구들이여, 무엇이 죽음인가? 이런저런 중생들이 이런저런 중생의 무리에서 죽음, 떠나감, 무너짐, 사라짐, 명종, 명을 다함, 무더기들의 무너짐, 시체를 내려놓음, 생명 기능의 끊어짐 — 비구들이여, 이를 일러 죽음이라 한다."'

const V_DUK4 = '“katamo ca, bhikkhave, soko? yo kho, bhikkhave, aññataraññatarena byasanena samannāgatassa aññataraññatarena dukkhadhammena phuṭṭhassa soko socanā socitattaṃ antosoko antoparisoko, ayaṃ vuccati, bhikkhave, soko.'
const V_DUK4K = '"비구들이여, 무엇이 슬픔인가? 어떤 재난을 만난 자, 어떤 괴로운 법에 닿은 자에게 일어나는 슬픔, 슬퍼함, 슬퍼하는 상태, 안의 슬픔, 안의 깊은 슬픔 — 이를 일러 슬픔이라 한다."'

const V_DUK5 = '“katamo ca, bhikkhave, paridevo? yo kho, bhikkhave, aññataraññatarena byasanena samannāgatassa aññataraññatarena dukkhadhammena phuṭṭhassa ādevo paridevo ādevanā paridevanā ādevitattaṃ paridevitattaṃ, ayaṃ vuccati, bhikkhave paridevo.'
const V_DUK5K = '"비구들이여, 무엇이 비탄인가? 어떤 재난을 만난 자, 어떤 괴로운 법에 닿은 자에게 일어나는 한탄, 비탄, 한탄함, 비탄함, 한탄하는 상태, 비탄하는 상태 — 이를 일러 비탄이라 한다."'

const V_DUK6 = '“katamañca, bhikkhave, dukkhaṃ? yaṃ kho, bhikkhave, kāyikaṃ dukkhaṃ kāyikaṃ asātaṃ kāyasamphassajaṃ dukkhaṃ asātaṃ vedayitaṃ, idaṃ vuccati, bhikkhave, dukkhaṃ.'
const V_DUK6K = '"비구들이여, 무엇이 (몸의) 괴로움인가? 몸의 괴로움, 몸의 불쾌, 몸의 접촉에서 생긴 괴롭고 불쾌한 느낌 — 이를 일러 (몸의) 괴로움이라 한다."'

const V_DUK7 = '“katamañca, bhikkhave, domanassaṃ? yaṃ kho, bhikkhave, cetasikaṃ dukkhaṃ cetasikaṃ asātaṃ manosamphassajaṃ dukkhaṃ asātaṃ vedayitaṃ, idaṃ vuccati, bhikkhave, domanassaṃ.'
const V_DUK7K = '"비구들이여, 무엇이 근심인가? 마음의 괴로움, 마음의 불쾌, 마노의 접촉에서 생긴 괴롭고 불쾌한 느낌 — 이를 일러 근심이라 한다."'

const V_DUK8 = '“katamo ca, bhikkhave, upāyāso? yo kho, bhikkhave, aññataraññatarena byasanena samannāgatassa aññataraññatarena dukkhadhammena phuṭṭhassa āyāso upāyāso āyāsitattaṃ upāyāsitattaṃ, ayaṃ vuccati, bhikkhave, upāyāso.'
const V_DUK8K = '"비구들이여, 무엇이 번뇌(절망)인가? 어떤 재난을 만난 자, 어떤 괴로운 법에 닿은 자에게 일어나는 고뇌, 절망, 고뇌하는 상태, 절망하는 상태 — 이를 일러 번뇌라 한다."'

const V_DUK9 = '“katamo ca, bhikkhave, appiyehi sampayogo dukkho? idha yassa te honti aniṭṭhā akantā amanāpā rūpā saddā gandhā rasā phoṭṭhabbā dhammā, ye vā panassa te honti anatthakāmā ahitakāmā aphāsukakāmā ayogakkhemakāmā, yā tehi saddhiṃ saṅgati samāgamo samodhānaṃ missībhāvo, ayaṃ vuccati, bhikkhave, appiyehi sampayogo dukkho.'
const V_DUK9K = '"비구들이여, 무엇이 사랑하지 않는 것과 만나는 괴로움인가? 어떤 사람에게 원하지 않고 사랑스럽지 않고 마음에 들지 않는 형색·소리·냄새·맛·감촉·법이 있거나, 또는 그에게 이익을 원하지 않는 자, 행복을 원하지 않는 자, 안락을 원하지 않는 자, 안전을 원하지 않는 자가 있어, 그들과 어울리고 만나고 함께 있고 섞이는 것 — 이를 일러 사랑하지 않는 것과 만나는 괴로움이라 한다."'

const V_DUK10 = '“katamo ca, bhikkhave, piyehi vippayogo dukkho? idha yassa te honti iṭṭhā kantā manāpā rūpā saddā gandhā rasā phoṭṭhabbā dhammā, ye vā panassa te honti atthakāmā hitakāmā phāsukakāmā yogakkhemakāmā mātā vā pitā vā bhātā vā bhaginī vā mittā vā amaccā vā ñātisālohitā vā, yā tehi saddhiṃ asaṅgati asamāgamo asamodhānaṃ amissībhāvo, ayaṃ vuccati, bhikkhave, piyehi vippayogo dukkho.'
const V_DUK10K = '"비구들이여, 무엇이 사랑하는 것과 헤어지는 괴로움인가? 어떤 사람에게 원하고 사랑스럽고 마음에 드는 형색·소리·냄새·맛·감촉·법이 있거나, 그의 이익을 원하는 자, 행복을 원하는 자, 안락을 원하는 자, 안전을 원하는 자, 또는 어머니·아버지·형제·자매·벗·동료·친족·혈족이 있어, 그들과 어울리지 못하고 만나지 못하고 함께 있지 못하고 섞이지 못하는 것 — 이를 일러 사랑하는 것과 헤어지는 괴로움이라 한다."'

const V_DUK11A = '“katamañca, bhikkhave, yampicchaṃ na labhati tampi dukkhaṃ? jātidhammānaṃ, bhikkhave, sattānaṃ evaṃ icchā uppajjati — ‘aho vata mayaṃ na jātidhammā assāma, na ca vata no jāti āgaccheyyā’ti. na kho panetaṃ icchāya pattabbaṃ, idampi yampicchaṃ na labhati tampi dukkhaṃ.'
const V_DUK11AK = '"비구들이여, 무엇이 원하는 것을 얻지 못하는 괴로움인가? 비구들이여, 태어남의 법에 매인 중생들에게 이런 바람이 일어난다 — ‘아, 우리에게 태어남의 법이 없었으면, 아, 태어남이 우리에게 오지 않았으면.’ 그러나 그것은 바람으로 얻을 수 없다. 이 또한 원하는 것을 얻지 못하는 괴로움이다."'

const V_DUK11B = 'jarādhammānaṃ, bhikkhave, sattānaṃ evaṃ icchā uppajjati — ‘aho vata mayaṃ na jarādhammā assāma, na ca vata no jarā āgaccheyyā’ti. na kho panetaṃ icchāya pattabbaṃ, idampi yampicchaṃ na labhati tampi dukkhaṃ.'
const V_DUK11BK = '"비구들이여, 늙음의 법에 매인 중생들에게도 ‘아, 우리에게 늙음이 없었으면, 늙음이 우리에게 오지 않았으면’이라는 바람이 일어난다. 그러나 그것은 바람으로 얻을 수 없다. 이 또한 원하는 것을 얻지 못하는 괴로움이다."'

const V_DUK11C = 'byādhidhammānaṃ, bhikkhave, sattānaṃ evaṃ icchā uppajjati ‘aho vata mayaṃ na byādhidhammā assāma, na ca vata no byādhi āgaccheyyā’ti. na kho panetaṃ icchāya pattabbaṃ, idampi yampicchaṃ na labhati tampi dukkhaṃ.'
const V_DUK11CK = '"비구들이여, 병의 법에 매인 중생들에게도 ‘아, 우리에게 병이 없었으면, 병이 우리에게 오지 않았으면’이라는 바람이 일어난다. 그러나 그것은 바람으로 얻을 수 없다. 이 또한 원하는 것을 얻지 못하는 괴로움이다."'

const V_DUK11D = 'maraṇadhammānaṃ, bhikkhave, sattānaṃ evaṃ icchā uppajjati ‘aho vata mayaṃ na maraṇadhammā assāma, na ca vata no maraṇaṃ āgaccheyyā’ti. na kho panetaṃ icchāya pattabbaṃ, idampi yampicchaṃ na labhati tampi dukkhaṃ.'
const V_DUK11DK = '"비구들이여, 죽음의 법에 매인 중생들에게도 ‘아, 우리에게 죽음이 없었으면, 죽음이 우리에게 오지 않았으면’이라는 바람이 일어난다. 그러나 그것은 바람으로 얻을 수 없다. 이 또한 원하는 것을 얻지 못하는 괴로움이다."'

const V_DUK11E = 'sokaparidevadukkhadomanassupāyāsadhammānaṃ, bhikkhave, sattānaṃ evaṃ icchā uppajjati ‘aho vata mayaṃ na sokaparidevadukkhadomanassupāyāsadhammā assāma, na ca vata no sokaparidevadukkhadomanassupāyāsadhammā āgaccheyyun’ti. na kho panetaṃ icchāya pattabbaṃ, idampi yampicchaṃ na labhati tampi dukkhaṃ.'
const V_DUK11EK = '"비구들이여, 슬픔·비탄·괴로움·근심·번뇌의 법에 매인 중생들에게도 ‘아, 우리에게 슬픔·비탄·괴로움·근심·번뇌가 없었으면, 그것들이 우리에게 오지 않았으면’이라는 바람이 일어난다. 그러나 그것은 바람으로 얻을 수 없다. 이 또한 원하는 것을 얻지 못하는 괴로움이다."'

const V_DUK12 = '“katame ca, bhikkhave, saṅkhittena pañcupādānakkhandhā dukkhā? seyyathidaṃ — rūpupādānakkhandho, vedanupādānakkhandho, saññupādānakkhandho, saṅkhārupādānakkhandho, viññāṇupādānakkhandho. ime vuccanti, bhikkhave, saṅkhittena pañcupādānakkhandhā dukkhā. idaṃ vuccati, bhikkhave, dukkhaṃ ariyasaccaṃ.'
const V_DUK12K = '"비구들이여, 요컨대 다섯 가지 취착의 무더기가 괴로움이란 무엇인가? 곧 — 물질의 취착 무더기, 느낌의 취착 무더기, 인식의 취착 무더기, 형성의 취착 무더기, 의식의 취착 무더기이다. 비구들이여, 이를 일러 요컨대 다섯 가지 취착의 무더기가 괴로움이라 한다. 비구들이여, 이를 일러 괴로움의 성스러운 진리라 한다."'

// 집성제 (samudaya)
const V_SAM_S0 = '“katamañca, bhikkhave, dukkhasamudayaṃ ariyasaccaṃ? yāyaṃ taṇhā ponobbhavikā nandīrāgasahagatā tatratatrābhinandinī, seyyathidaṃ — kāmataṇhā bhavataṇhā vibhavataṇhā.'
const V_SAM_S0K = '"비구들이여, 무엇이 괴로움의 일어남의 성스러운 진리인가? 다시 존재로 이끌고 즐김과 탐욕을 동반하며 여기저기서 즐기는 갈애 — 곧 감각적 욕망의 갈애, 존재의 갈애, 비존재의 갈애이다."'

const V_SAM_S1 = '“sā kho panesā, bhikkhave, taṇhā kattha uppajjamānā uppajjati, kattha nivisamānā nivisati? yaṃ loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati.'
const V_SAM_S1K = '"비구들이여, 그렇다면 이 갈애는 어디서 일어나고, 어디에 자리 잡는가? 세상에서 사랑스러운 모습, 만족스러운 모습이 있는 그곳에서 이 갈애는 일어나고 자리 잡는다."'

const V_SAM_S2 = '“kiñca loke piyarūpaṃ sātarūpaṃ? cakkhu loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati. sotaṃ loke … pe … ghānaṃ loke. jivhā loke. kāyo loke. mano loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati.'
const V_SAM_S2K = '"세상에서 무엇이 사랑스럽고 만족스러운 모습인가? 눈이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 일어나고 자리 잡는다. 귀… 코… 혀… 몸… 마노가 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 일어나고 자리 잡는다."'

const V_SAM_S3 = '“rūpā loke. saddā loke. gandhā loke. rasā loke. phoṭṭhabbā loke. dhammā loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati.'
const V_SAM_S3K = '"형색… 소리… 냄새… 맛… 감촉… 법이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 일어나고 자리 잡는다."'

const V_SAM_S4 = '“cakkhuviññāṇaṃ loke. sotaviññāṇaṃ loke. ghānaviññāṇaṃ loke. jivhāviññāṇaṃ loke. kāyaviññāṇaṃ loke. manoviññāṇaṃ loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati.'
const V_SAM_S4K = '"안식… 이식… 비식… 설식… 신식… 의식이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 일어나고 자리 잡는다."'

const V_SAM_S5 = '“cakkhusamphasso loke. sotasamphasso loke. ghānasamphasso loke. jivhāsamphasso loke. kāyasamphasso loke. manosamphasso loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati.'
const V_SAM_S5K = '"눈의 접촉… 귀의 접촉… 코의 접촉… 혀의 접촉… 몸의 접촉… 마노의 접촉이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 일어나고 자리 잡는다."'

const V_SAM_S6 = '“cakkhusamphassajā vedanā loke. sotasamphassajā vedanā loke. ghānasamphassajā vedanā loke. jivhāsamphassajā vedanā loke. kāyasamphassajā vedanā loke. manosamphassajā vedanā loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati.'
const V_SAM_S6K = '"눈의 접촉에서 생긴 느낌… 귀의 접촉에서 생긴 느낌… 코·혀·몸·마노의 접촉에서 생긴 느낌이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 일어나고 자리 잡는다."'

const V_SAM_S7 = '“rūpasaññā loke. saddasaññā loke. gandhasaññā loke. rasasaññā loke. phoṭṭhabbasaññā loke. dhammasaññā loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati.'
const V_SAM_S7K = '"형색의 인식… 소리의 인식… 냄새·맛·감촉·법의 인식이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 일어나고 자리 잡는다."'

const V_SAM_S8 = '“rūpasañcetanā loke. saddasañcetanā loke. gandhasañcetanā loke. rasasañcetanā loke. phoṭṭhabbasañcetanā loke. dhammasañcetanā loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati.'
const V_SAM_S8K = '"형색의 의도… 소리의 의도… 냄새·맛·감촉·법의 의도가 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 일어나고 자리 잡는다."'

const V_SAM_S9 = '“rūpataṇhā loke. saddataṇhā loke. gandhataṇhā loke. rasataṇhā loke. phoṭṭhabbataṇhā loke. dhammataṇhā loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati.'
const V_SAM_S9K = '"형색의 갈애… 소리의 갈애… 냄새·맛·감촉·법의 갈애가 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 일어나고 자리 잡는다."'

const V_SAM_S10 = '“rūpavitakko loke. saddavitakko loke. gandhavitakko loke. rasavitakko loke. phoṭṭhabbavitakko loke. dhammavitakko loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati.'
const V_SAM_S10K = '"형색의 사유… 소리의 사유… 냄새·맛·감촉·법의 사유가 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 일어나고 자리 잡는다."'

const V_SAM_S11 = '“rūpavicāro loke. saddavicāro loke. gandhavicāro loke. rasavicāro loke. phoṭṭhabbavicāro loke. dhammavicāro loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā uppajjamānā uppajjati, ettha nivisamānā nivisati. idaṃ vuccati, bhikkhave, dukkhasamudayaṃ ariyasaccaṃ.'
const V_SAM_S11K = '"형색의 고찰… 소리의 고찰… 냄새·맛·감촉·법의 고찰이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 일어나고 자리 잡는다. 비구들이여, 이를 일러 괴로움의 일어남의 성스러운 진리라 한다."'

// 멸성제 (nirodha)
const V_NIR0 = '401. “katamañca, bhikkhave, dukkhanirodhaṃ ariyasaccaṃ? yo tassāyeva taṇhāya asesavirāganirodho cāgo paṭinissaggo mutti anālayo.'
const V_NIR0K = '401. "비구들이여, 무엇이 괴로움의 사라짐의 성스러운 진리인가? 그 갈애의 남김 없는 빛바램과 사라짐, 버림, 놓아 버림, 벗어남, 집착 없음 — 그것이다."'

const V_NIR1 = '“sā kho panesā, bhikkhave, taṇhā kattha pahīyamānā pahīyati, kattha nirujjhamānā nirujjhati? yaṃ loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati.'
const V_NIR1K = '"비구들이여, 그렇다면 이 갈애는 어디서 끊어지고, 어디서 사라지는가? 세상에서 사랑스러운 모습, 만족스러운 모습이 있는 그곳에서 이 갈애는 끊어지고 사라진다."'

const V_NIR2 = '“kiñca loke piyarūpaṃ sātarūpaṃ? cakkhu loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati. sotaṃ loke … pe … ghānaṃ loke. jivhā loke. kāyo loke. mano loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati.'
const V_NIR2K = '"세상에서 무엇이 사랑스럽고 만족스러운 모습인가? 눈… 귀… 코… 혀… 몸… 마노가 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 이 갈애는 끊어지고 사라진다."'

const V_NIR3 = '“rūpā loke. saddā loke. gandhā loke. rasā loke. phoṭṭhabbā loke. dhammā loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati.'
const V_NIR3K = '"형색… 소리… 냄새… 맛… 감촉… 법이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 끊어지고 사라진다."'

const V_NIR4 = '“cakkhuviññāṇaṃ loke. sotaviññāṇaṃ loke. ghānaviññāṇaṃ loke. jivhāviññāṇaṃ loke. kāyaviññāṇaṃ loke. manoviññāṇaṃ loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati.'
const V_NIR4K = '"안식… 이식… 비식… 설식… 신식… 의식이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 끊어지고 사라진다."'

const V_NIR5 = '“cakkhusamphasso loke. sotasamphasso loke. ghānasamphasso loke. jivhāsamphasso loke. kāyasamphasso loke. manosamphasso loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati.'
const V_NIR5K = '"눈의 접촉… 귀의 접촉… 코·혀·몸·마노의 접촉이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 끊어지고 사라진다."'

const V_NIR6 = '“cakkhusamphassajā vedanā loke. sotasamphassajā vedanā loke. ghānasamphassajā vedanā loke. jivhāsamphassajā vedanā loke. kāyasamphassajā vedanā loke. manosamphassajā vedanā loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati.'
const V_NIR6K = '"눈의 접촉에서 생긴 느낌… 귀·코·혀·몸·마노의 접촉에서 생긴 느낌이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 끊어지고 사라진다."'

const V_NIR7 = '“rūpasaññā loke. saddasaññā loke. gandhasaññā loke. rasasaññā loke. phoṭṭhabbasaññā loke. dhammasaññā loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati.'
const V_NIR7K = '"형색의 인식… 소리의 인식… 냄새·맛·감촉·법의 인식이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 끊어지고 사라진다."'

const V_NIR8 = '“rūpasañcetanā loke. saddasañcetanā loke. gandhasañcetanā loke. rasasañcetanā loke. phoṭṭhabbasañcetanā loke. dhammasañcetanā loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati.'
const V_NIR8K = '"형색의 의도… 소리의 의도… 냄새·맛·감촉·법의 의도가 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 끊어지고 사라진다."'

const V_NIR9 = '“rūpataṇhā loke. saddataṇhā loke. gandhataṇhā loke. rasataṇhā loke. phoṭṭhabbataṇhā loke. dhammataṇhā loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati.'
const V_NIR9K = '"형색의 갈애… 소리의 갈애… 냄새·맛·감촉·법의 갈애가 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 끊어지고 사라진다."'

const V_NIR10 = '“rūpavitakko loke. saddavitakko loke. gandhavitakko loke. rasavitakko loke. phoṭṭhabbavitakko loke. dhammavitakko loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati.'
const V_NIR10K = '"형색의 사유… 소리의 사유… 냄새·맛·감촉·법의 사유가 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 끊어지고 사라진다."'

const V_NIR11 = '“rūpavicāro loke. saddavicāro loke. gandhavicāro loke. rasavicāro loke. phoṭṭhabbavicāro loke. dhammavicāro loke piyarūpaṃ sātarūpaṃ, etthesā taṇhā pahīyamānā pahīyati, ettha nirujjhamānā nirujjhati. idaṃ vuccati, bhikkhave, dukkhanirodhaṃ ariyasaccaṃ.'
const V_NIR11K = '"형색의 고찰… 소리의 고찰… 냄새·맛·감촉·법의 고찰이 세상에서 사랑스럽고 만족스러운 모습이니, 그곳에서 갈애가 끊어지고 사라진다. 비구들이여, 이를 일러 괴로움의 사라짐의 성스러운 진리라 한다."'

// 도성제 (magga) — 팔정도
const V_MAG0 = '“katamañca, bhikkhave, dukkhanirodhagāminī paṭipadā ariyasaccaṃ? ayameva ariyo aṭṭhaṅgiko maggo seyyathidaṃ — sammādiṭṭhi sammāsaṅkappo sammāvācā sammākammanto sammāājīvo sammāvāyāmo sammāsati sammāsamādhi.'
const V_MAG0K = '"비구들이여, 무엇이 괴로움의 사라짐에 이르는 길의 성스러운 진리인가? 곧 이 성스러운 여덟 갈래의 길이니 — 정견·정사유·정어·정업·정명·정정진·정념·정정이다."'

const V_MAG1 = '“katamā ca, bhikkhave, sammādiṭṭhi? yaṃ kho, bhikkhave, dukkhe ñāṇaṃ, dukkhasamudaye ñāṇaṃ, dukkhanirodhe ñāṇaṃ, dukkhanirodhagāminiyā paṭipadāya ñāṇaṃ, ayaṃ vuccati, bhikkhave, sammādiṭṭhi.'
const V_MAG1K = '"비구들이여, 무엇이 정견인가? 비구들이여, 괴로움에 대한 앎, 괴로움의 일어남에 대한 앎, 괴로움의 사라짐에 대한 앎, 괴로움의 사라짐에 이르는 길에 대한 앎 — 이를 일러 정견이라 한다."'

const V_MAG2 = '“katamo ca, bhikkhave, sammāsaṅkappo? nekkhammasaṅkappo abyāpādasaṅkappo avihiṃsāsaṅkappo, ayaṃ vuccati bhikkhave, sammāsaṅkappo.'
const V_MAG2K = '"비구들이여, 무엇이 정사유인가? 출리의 사유, 악의 없음의 사유, 해치지 않음의 사유 — 이를 일러 정사유라 한다."'

const V_MAG3 = '“katamā ca, bhikkhave, sammāvācā? musāvādā veramaṇī pisuṇāya vācāya veramaṇī pharusāya vācāya veramaṇī samphappalāpā veramaṇī, ayaṃ vuccati, bhikkhave, sammāvācā.'
const V_MAG3K = '"비구들이여, 무엇이 정어인가? 거짓말을 삼가는 것, 이간하는 말을 삼가는 것, 거친 말을 삼가는 것, 잡담을 삼가는 것 — 이를 일러 정어라 한다."'

const V_MAG4 = '“katamo ca, bhikkhave, sammākammanto? pāṇātipātā veramaṇī adinnādānā veramaṇī kāmesumicchācārā veramaṇī, ayaṃ vuccati, bhikkhave, sammākammanto.'
const V_MAG4K = '"비구들이여, 무엇이 정업인가? 살생을 삼가는 것, 주지 않은 것을 갖는 것을 삼가는 것, 삿된 음행을 삼가는 것 — 이를 일러 정업이라 한다."'

const V_MAG5 = '“katamo ca, bhikkhave, sammāājīvo? idha, bhikkhave, ariyasāvako micchāājīvaṃ pahāya sammāājīvena jīvitaṃ kappeti, ayaṃ vuccati, bhikkhave, sammāājīvo.'
const V_MAG5K = '"비구들이여, 무엇이 정명인가? 비구들이여, 여기 성스러운 제자가 그릇된 생계를 버리고 바른 생계로 생활을 영위하는 것 — 이를 일러 정명이라 한다."'

const V_MAG6A = '“katamo ca, bhikkhave, sammāvāyāmo? idha, bhikkhave, bhikkhu anuppannānaṃ pāpakānaṃ akusalānaṃ dhammānaṃ anuppādāya chandaṃ janeti vāyamati vīriyaṃ ārabhati cittaṃ paggaṇhāti padahati;'
const V_MAG6AK = '"비구들이여, 무엇이 정정진인가? 비구들이여, 여기 비구는 (1) 일어나지 않은 악하고 불선한 법들이 일어나지 않도록 의욕을 일으키고, 노력하고, 정진하며, 마음을 다잡고, 힘쓴다."'

const V_MAG6B = 'uppannānaṃ pāpakānaṃ akusalānaṃ dhammānaṃ pahānāya chandaṃ janeti vāyamati vīriyaṃ ārabhati cittaṃ paggaṇhāti padahati;'
const V_MAG6BK = '"(2) 이미 일어난 악하고 불선한 법들을 끊기 위해 의욕을 일으키고, 노력하고, 정진하며, 마음을 다잡고, 힘쓴다."'

const V_MAG6C = 'anuppannānaṃ kusalānaṃ dhammānaṃ uppādāya chandaṃ janeti vāyamati vīriyaṃ ārabhati cittaṃ paggaṇhāti padahati;'
const V_MAG6CK = '"(3) 일어나지 않은 선한 법들을 일어나게 하기 위해 의욕을 일으키고, 노력하고, 정진하며, 마음을 다잡고, 힘쓴다."'

const V_MAG6D = 'uppannānaṃ kusalānaṃ dhammānaṃ ṭhitiyā asammosāya bhiyyobhāvāya vepullāya bhāvanāya pāripūriyā chandaṃ janeti vāyamati vīriyaṃ ārabhati cittaṃ paggaṇhāti padahati. ayaṃ vuccati, bhikkhave, sammāvāyāmo.'
const V_MAG6DK = '"(4) 이미 일어난 선한 법들이 유지되고, 잊혀지지 않고, 더욱 자라고, 충만하고, 닦여 완성되도록 의욕을 일으키고, 노력하고, 정진하며, 마음을 다잡고, 힘쓴다. 비구들이여, 이를 일러 정정진이라 한다."'

const V_MAG7 = '“katamā ca, bhikkhave, sammāsati? idha, bhikkhave, bhikkhu kāye kāyānupassī viharati ātāpī sampajāno satimā vineyya loke abhijjhādomanassaṃ; vedanāsu vedanānupassī viharati ātāpī sampajāno satimā vineyya loke abhijjhādomanassaṃ; citte cittānupassī viharati ātāpī sampajāno satimā vineyya loke abhijjhādomanassaṃ; dhammesu dhammānupassī viharati ātāpī sampajāno satimā vineyya loke abhijjhādomanassaṃ. ayaṃ vuccati, bhikkhave, sammāsati.'
const V_MAG7K = '"비구들이여, 무엇이 정념인가? 비구들이여, 여기 비구는 몸에서 몸을 관찰하며 머문다 — 열심히, 분명히 알며, 마음챙기며, 세상에 대한 탐욕과 근심을 제거하면서. 느낌… 마음… 법에서도 마찬가지로 관찰하며 머문다. 비구들이여, 이를 일러 정념이라 한다."'

const V_MAG8A = '“katamo ca, bhikkhave, sammāsamādhi? idha, bhikkhave, bhikkhu vivicceva kāmehi vivicca akusalehi dhammehi savitakkaṃ savicāraṃ vivekajaṃ pītisukhaṃ paṭhamaṃ jhānaṃ upasampajja viharati.'
const V_MAG8AK = '"비구들이여, 무엇이 정정인가? 비구들이여, 여기 비구는 감각적 욕망을 떨치고, 불선한 법들을 떨쳐, 사유와 고찰이 있고 떨쳐냄에서 생긴 희열과 행복이 있는 초선(初禪)에 들어 머문다."'

const V_MAG8B = 'vitakkavicārānaṃ vūpasamā ajjhattaṃ sampasādanaṃ cetaso ekodibhāvaṃ avitakkaṃ avicāraṃ samādhijaṃ pītisukhaṃ dutiyaṃ jhānaṃ upasampajja viharati.'
const V_MAG8BK = '"사유와 고찰이 가라앉음으로써, 안으로의 청정과 마음의 통일이 있고, 사유와 고찰이 없으며, 삼매에서 생긴 희열과 행복이 있는 제2선(二禪)에 들어 머문다."'

const V_MAG8C = 'pītiyā ca virāgā upekkhako ca viharati, sato ca sampajāno, sukhañca kāyena paṭisaṃvedeti, yaṃ taṃ ariyā ācikkhanti ‘upekkhako satimā sukhavihārī’ti tatiyaṃ jhānaṃ upasampajja viharati.'
const V_MAG8CK = '"희열이 빛바램으로써 평정하게 머물고, 마음챙기고 분명히 알며, 몸으로 행복을 느낀다. 성자들이 ‘평정하고 마음챙기며 행복하게 머문다’고 말하는 제3선(三禪)에 들어 머문다."'

const V_MAG8D = 'sukhassa ca pahānā dukkhassa ca pahānā pubbeva somanassadomanassānaṃ atthaṅgamā adukkhamasukhaṃ upekkhāsatipārisuddhiṃ catutthaṃ jhānaṃ upasampajja viharati. ayaṃ vuccati, bhikkhave, sammāsamādhi. idaṃ vuccati, bhikkhave, dukkhanirodhagāminī paṭipadā ariyasaccaṃ.'
const V_MAG8DK = '"행복을 버리고 괴로움을 버려, 이전에 이미 기쁨과 근심이 사라졌으므로, 괴롭지도 즐겁지도 않으며, 평정과 마음챙김의 청정함이 있는 제4선(四禪)에 들어 머문다. 비구들이여, 이를 일러 정정이라 한다. 비구들이여, 이를 일러 괴로움의 사라짐에 이르는 길의 성스러운 진리라 한다."'

// ============================================================
// 14. 결론 — 수행의 과보와 마무리
// ============================================================
const V_END1 = '“yo hi koci, bhikkhave, ime cattāro satipaṭṭhāne evaṃ bhāveyya sattavassāni, tassa dvinnaṃ phalānaṃ aññataraṃ phalaṃ pāṭikaṅkhaṃ diṭṭheva dhamme aññā; sati vā upādisese anāgāmitā.'
const V_END1K = '"비구들이여, 누구든지 이 네 가지 마음챙김의 확립을 이와 같이 7년간 닦으면, 그에게는 두 가지 결과 중 하나가 기대된다 — 현생에서의 구경의 지혜(아라한), 또는 집착의 남음이 있을 때 불환과(아나함)이다."'

const V_END2 = '“tiṭṭhantu, bhikkhave, sattavassāni. yo hi koci, bhikkhave, ime cattāro satipaṭṭhāne evaṃ bhāveyya cha vassāni . pe . pañca vassāni. cattāri vassāni. tīṇi vassāni. dve vassāni. ekaṃ vassaṃ. tiṭṭhatu, bhikkhave, ekaṃ vassaṃ. yo hi koci, bhikkhave, ime cattāro satipaṭṭhāne evaṃ bhāveyya sattamāsāni, tassa dvinnaṃ phalānaṃ aññataraṃ phalaṃ pāṭikaṅkhaṃ diṭṭheva dhamme aññā; sati vā upādisese anāgāmitā.'
const V_END2K = '"비구들이여, 7년은 그만두고, 6년… 5년… 4년… 3년… 2년… 1년만이라도, 1년은 그만두고 7개월간이라도 이 네 가지 마음챙김의 확립을 이와 같이 닦으면, 두 가지 결과 중 하나가 기대된다 — 현생에서의 구경의 지혜, 또는 집착의 남음이 있을 때 불환과이다."'

const V_END3 = '“tiṭṭhantu, bhikkhave, satta māsāni. yo hi koci, bhikkhave, ime cattāro satipaṭṭhāne evaṃ bhāveyya cha māsāni . pe . pañca māsāni. cattāri māsāni. tīṇi māsāni . dve māsāni. ekaṃ māsaṃ. aḍḍhamāsaṃ. tiṭṭhatu, bhikkhave, aḍḍhamāso. yo hi koci, bhikkhave, ime cattāro satipaṭṭhāne evaṃ bhāveyya sattāhaṃ, tassa dvinnaṃ phalānaṃ aññataraṃ phalaṃ pāṭikaṅkhaṃ diṭṭheva dhamme aññā; sati vā upādisese anāgāmitāti.'
const V_END3K = '"비구들이여, 7개월은 그만두고, 6개월… 5개월… 4개월… 3개월… 2개월… 1개월… 반달이라도, 반달은 그만두고 단 7일이라도 이 네 가지 마음챙김의 확립을 이와 같이 닦으면, 두 가지 결과 중 하나가 기대된다 — 현생에서의 구경의 지혜, 또는 집착의 남음이 있을 때 불환과이다."'

const V_END4 = '“ekāyano ayaṃ, bhikkhave, maggo sattānaṃ visuddhiyā sokaparidevānaṃ samatikkamāya dukkhadomanassānaṃ atthaṅgamāya ñāyassa adhigamāya nibbānassa sacchikiriyāya yadidaṃ cattāro satipaṭṭhānāti. iti yaṃ taṃ vuttaṃ, idametaṃ paṭicca vuttan”ti. idamavoca bhagavā. attamanā te bhikkhū bhagavato bhāsitaṃ abhinandunti.'
const V_END4K = '"비구들이여, 중생의 청정을 위해, 슬픔과 비탄을 넘기 위해, 괴로움과 근심을 사라지게 하기 위해, 바른 이치를 얻기 위해, 열반을 실현하기 위해 — 이 하나의 길이 있으니, 그것이 네 가지 마음챙김의 확립이다. 이렇게 말씀하신 것은 이것을 의지하여 말씀하신 것이다." — 세존께서 이렇게 말씀하셨다. 비구들은 마음이 흡족하여 세존의 말씀을 기뻐하였다.'

const V_END5 = 'mahāsatipaṭṭhānasuttaṃ niṭṭhitaṃ.'
const V_END5K = '마하사띠빳타나 경(마음챙김 확립의 큰 경) 끝.'

// ============================================================
// LESSON_MN10 — 11과: 마음챙김 확립의 큰 경 (DN 22)
// ============================================================
export const LESSON_MN10: StepType[] = [
  // ===== 경전 소개 =====
  { type: 'intro', icon: '🧘', title: '마음챙김 확립의 큰 경', subtitle: 'Mahāsatipaṭṭhāna Sutta (DN 22)',
    description: '사념처(四念處) 수행의 완전한 경전.\n\n신·수·심·법을 관찰하는 길이\n열반에 이르는 유일한 길(ekāyano maggo)이다.\n\n🎯 경전 전문(全文)을 빠짐없이 학습합니다.' },

  // ===== 서두(uddeso) =====
  { type: 'intro', icon: '📜', title: '— uddeso (서문) —', subtitle: '하나의 길, 네 가지 마음챙김의 확립',
    description: '세존께서 꾸루 나라 깜마사담마 마을에서\n비구들에게 사념처를 선언하시다.' },

  // ── V1: Ekaṃ samayaṃ bhagavā kurūsu viharati kammāsadhammaṃ nāma kurūnaṃ nigamo ──
  { type: 'teach', icon: '🔢', word: 'Ekaṃ', pronKo: '에깡', meaning: '한 (번/때)',
    grammar: '수사, 대격 중성 단수', baseForm: 'eka (하나)',
    formNote: 'eka → ekaṃ: -a 어간 중성 대격 -aṃ\n시간 표현에서 부사적: ekaṃ samayaṃ = "한 때에"',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '⏱️', word: 'samayaṃ', pronKo: '사마양', meaning: '때, 시간',
    grammar: '남성명사, 대격 단수', baseForm: 'samaya (때)',
    formNote: 'samaya → samayaṃ: -a 어간 남성 대격 -aṃ\n"ekaṃ samayaṃ" = 모든 경전의 도입 정형구',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🙏', word: 'bhagavā', pronKo: '바가와~', meaning: '세존, 복덕 갖춘 분',
    grammar: '남성명사, 주격 단수', baseForm: 'bhagavant (복덕 갖춘)',
    formNote: 'bhagavant → bhagavā: -ant 어간 남성 주격 -ā\nbhaga(복덕) + -vant(가진)',
    buddhism: '세존(世尊). 부처님 10대 명호 중 하나.', verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '📍', word: 'kurūsu', pronKo: '꾸루~수', meaning: '꾸루 나라에서',
    grammar: '남성명사, 처격 복수', baseForm: 'Kuru (꾸루 나라)',
    formNote: 'Kuru → kurūsu: -u 어간 처격 복수 -ūsu',
    buddhism: '꾸루. 고대 인도 북부 왕국. 마하바라따 무대.', verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🏠', word: 'viharati', pronKo: '위하라띠', meaning: '머문다, 지낸다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'viharati (√har + vi-)',
    formNote: 'vi(분리/멀리) + √har(가져가다) → "(시간을) 보내다, 머물다"\n경전 도입의 정형 동사',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🏷️', word: 'kammāsadhammaṃ', pronKo: '깜마~사담망', meaning: '깜마사담마 (마을 이름)',
    grammar: '중성명사, 주격 단수', baseForm: 'Kammāsadhamma',
    formNote: '-a 어간 중성 주격 -aṃ\n"얼룩진 다르마"로 어원 해석 가능. 꾸루 지역 마을.',
    buddhism: '깜마사담마. 꾸루의 마을. 여러 경전의 설법지.', verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '📛', word: 'nāma', pronKo: '나~마', meaning: '이름하여, ~라는',
    grammar: '불변사 (부사적 용법)', baseForm: 'nāma (이름)',
    formNote: '명사 nāma(이름)의 부사적 사용\n"X nāma Y" = "X라는 이름의 Y"',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🏛️', word: 'kurūnaṃ', pronKo: '꾸루~낭', meaning: '꾸루들의 (꾸루 사람들의)',
    grammar: '남성명사, 속격 복수', baseForm: 'Kuru (꾸루 사람)',
    formNote: 'Kuru → kurūnaṃ: -u 어간 남성 속격 복수 -ūnaṃ\nkurūsu(처격, "꾸루 나라에서")와 비교',
    verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'teach', icon: '🏘️', word: 'nigamo', pronKo: '니가모', meaning: '마을, 시장 마을',
    grammar: '남성명사, 주격 단수', baseForm: 'nigama (마을)',
    formNote: 'nigama → nigamo: -a 어간 남성 주격 -o', verseLine: V1, verseLineKo: V1K, audio: true },
  { type: 'verse', pali: V1, pronKo: '에깡 사마양 바가와~ 꾸루~수 위하라띠 깜마~사담망 나~마 꾸루~낭 니가모.',
    translation: V1K, highlight: ['Ekaṃ','samayaṃ','bhagavā','kurūsu','viharati','kammāsadhammaṃ','nāma','kurūnaṃ','nigamo'] },

  // ── V1B: tatra kho bhagavā bhikkhū āmantesi — "bhikkhavo"ti. "bhaddante"ti te bhikkhū bhagavato paccassosuṃ. bhagavā etadavoca ──
  { type: 'teach', icon: '👉', word: 'tatra', pronKo: '따뜨라', meaning: '거기서',
    grammar: '부사 (지시부사)', baseForm: 'ta- + -tra (장소 접미사)',
    formNote: '"그곳에서, 거기서"\nta-(저, 그) + -tra(처소 접미사)',
    verseLine: V1B, verseLineKo: V1BK, audio: true },
  { type: 'teach', icon: '✨', word: 'kho', pronKo: '코', meaning: '강조 첨사',
    grammar: '불변사 (emphatic particle)',
    formNote: '강조 첨사. 문장 흐름 부드럽게 만듦. 번역에서 종종 생략.',
    verseLine: V1B, verseLineKo: V1BK, audio: true },
  { type: 'teach', icon: '🧘', word: 'bhikkhū', pronKo: '빅쿠~', meaning: '비구들을 (대격 복수)',
    grammar: '남성명사, 대격 복수', baseForm: 'bhikkhu (비구)',
    formNote: 'bhikkhu → bhikkhū: -u 어간 남성 대격 복수\nbhikkhave/bhikkhavo(호격)와 비교',
    buddhism: '비구(比丘). 출가 수행승. "걸식하는 자"',
    verseLine: V1B, verseLineKo: V1BK, audio: true },
  { type: 'teach', icon: '📢', word: 'āmantesi', pronKo: '아~만떼시', meaning: '부르셨다, 말씀하셨다',
    grammar: '동사 3인칭 단수 아오리스트', baseForm: 'āmanteti (ā- + √mant)',
    formNote: 'ā + √mant(상의/말하다) → āmanteti(현재) → āmantesi(아오리스트)',
    verseLine: V1B, verseLineKo: V1BK, audio: true },
  { type: 'teach', icon: '🗣️', word: 'bhikkhavo', pronKo: '빅카오', meaning: '비구들이여! (호격)',
    grammar: '남성명사, 호격 복수', baseForm: 'bhikkhu',
    formNote: '호격 복수 -avo / -ave 둘 다 가능\n부처님이 비구들을 부르실 때 정형',
    verseLine: V1B, verseLineKo: V1BK, audio: true },
  { type: 'teach', icon: '🙇', word: 'bhaddante', pronKo: '받단떼', meaning: '존자시여!',
    grammar: '호격 (인사말)', baseForm: 'bhaddanta (복되신 분)',
    formNote: 'bhadda(축복받은) + anta\n제자가 스승을 부를 때 정형 응답',
    verseLine: V1B, verseLineKo: V1BK, audio: true },
  { type: 'teach', icon: '🙋', word: 'paccassosuṃ', pronKo: '빳짯소숭', meaning: '응답하였다 (복수)',
    grammar: '동사 3인칭 복수 아오리스트', baseForm: 'paṭissuṇāti (paṭi- + √su)',
    formNote: 'paṭi(되돌려) + √su(듣다) → "되받아 듣다 = 응답하다"\n복수 아오리스트 어미 -suṃ',
    verseLine: V1B, verseLineKo: V1BK, audio: true },
  { type: 'teach', icon: '💬', word: 'etadavoca', pronKo: '에따다오짜', meaning: '이렇게 말씀하셨다',
    grammar: '대명사 + 동사 (3인칭 단수 아오리스트)', baseForm: 'etad + avoca (√vac)',
    formNote: 'etad(이것을) + avoca(√vac의 아오리스트)\n경전에서 직접 인용 도입 정형구',
    verseLine: V1B, verseLineKo: V1BK, audio: true },
  { type: 'verse', pali: V1B, pronKo: '따뜨라 코 바가와~ 빅쿠~ 아~만떼시 — "빅카오"띠. "받단떼"띠 떼 빅쿠~ 바가와또 빳짯소숭. 바가와~ 에따다오짜 —',
    translation: V1BK, highlight: ['tatra','bhikkhū','āmantesi','bhikkhavo','bhaddante','paccassosuṃ','etadavoca'] },

  // ── V2: ekāyano ayaṃ, bhikkhave, maggo sattānaṃ visuddhiyā sokaparidevānaṃ samatikkamāya dukkhadomanassānaṃ atthaṅgamāya ñāyassa adhigamāya nibbānassa sacchikiriyāya, yadidaṃ cattāro satipaṭṭhānā ──
  { type: 'teach', icon: '🛤️', word: 'ekāyano', pronKo: '에까~야노', meaning: '하나의 길, 유일한 길',
    grammar: '형용사, 주격 남성 단수', baseForm: 'ekāyana',
    formNote: 'eka(하나) + ayana(가는 길) = 하나로 수렴하는 길',
    buddhism: '일승도(一乘道). 사념처가 유일한 길임을 강조.', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '👇', word: 'ayaṃ', pronKo: '아양', meaning: '이 (것)',
    grammar: '지시대명사, 주격 남성 단수', baseForm: 'ima/idaṃ (이)',
    formNote: '근칭 지시대명사. "ayaṃ maggo" = "이 길"', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🗣️', word: 'bhikkhave', pronKo: '빅카웨', meaning: '비구들이여!',
    grammar: '남성명사, 호격 복수', baseForm: 'bhikkhu',
    formNote: '호격 복수 -ave (bhikkhavo와 같은 의미)', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🛣️', word: 'maggo', pronKo: '막고', meaning: '길',
    grammar: '남성명사, 주격 단수', baseForm: 'magga (길)',
    formNote: 'magga → maggo: -a 어간 남성 주격 -o',
    buddhism: '도(道). 팔정도(aṭṭhaṅgiko maggo)의 magga.', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '👥', word: 'sattānaṃ', pronKo: '삿따~낭', meaning: '중생들의 (위해)',
    grammar: '남성명사, 속격/여격 복수', baseForm: 'satta (중생, 유정)',
    formNote: 'satta → sattānaṃ: -a 어간 남성 속격/여격 복수 -ānaṃ\n여기서는 여격적 의미',
    buddhism: '유정(有情). 의식 있는 모든 존재.', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '✨', word: 'visuddhiyā', pronKo: '위숫디야~', meaning: '청정을 위해',
    grammar: '여성명사, 여격 단수', baseForm: 'visuddhi (청정)',
    formNote: 'visuddhi → visuddhiyā: -i 어간 여격 -iyā\nvi(완전히) + √sudh(깨끗하다)',
    buddhism: '청정(清淨). Visuddhimagga(청정도론) 제목.', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '😢', word: 'sokaparidevānaṃ', pronKo: '소까빠리데와~낭', meaning: '슬픔과 비탄의 (을 넘기 위해)',
    grammar: '복합어, 속격 복수', baseForm: 'soka(슬픔) + parideva(비탄)',
    formNote: 'dvandva 복합어. 속격 복수 -ānaṃ', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '⛵', word: 'samatikkamāya', pronKo: '사마띡까마~야', meaning: '넘기 위해',
    grammar: '남성명사, 여격 단수', baseForm: 'samatikkama (넘음)',
    formNote: 'saṃ(완전히) + ati(넘어) + √kam(가다) = 완전히 넘어감\n여격 -āya = "~위해"',
    verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '😔', word: 'dukkhadomanassānaṃ', pronKo: '둑카도마낫사~낭', meaning: '고통과 근심의',
    grammar: '복합어, 속격 복수', baseForm: 'dukkha(몸 괴로움) + domanassa(마음 근심)',
    formNote: 'dvandva 복합어\ndukkha = 신체적 고통 / domanassa = 정신적 근심',
    verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🌅', word: 'atthaṅgamāya', pronKo: '앗탕가마~야', meaning: '사라짐을 위해',
    grammar: '남성명사, 여격 단수', baseForm: 'atthaṅgama (사라짐)',
    formNote: 'attha(집/끝) + gama(감) = 끝으로 감 = 사라짐', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '📐', word: 'ñāyassa', pronKo: '냐~얏사', meaning: '바른 방법의 (을 얻기 위해)',
    grammar: '남성명사, 속격 단수', baseForm: 'ñāya (바른 이치)',
    formNote: '√ñā(알다) → ñāya = "올바른 이치, 바른 방법"', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🎯', word: 'adhigamāya', pronKo: '아디가마~야', meaning: '얻기 위해 (증득을 위해)',
    grammar: '남성명사, 여격 단수', baseForm: 'adhigama (증득)',
    formNote: 'adhi(위로) + √gam(가다) = "도달, 증득"',
    buddhism: '증득(證得). 수행 성취.', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'nibbānassa', pronKo: '닙바~낫사', meaning: '열반의',
    grammar: '중성명사, 속격 단수', baseForm: 'nibbāna (열반)',
    formNote: 'nibbāna → nibbānassa: -a 어간 속격 -assa\nni(나가는) + √vā(부는) = 불이 꺼짐',
    buddhism: '열반(涅槃). 갈애의 완전한 소멸.', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '👁️', word: 'sacchikiriyāya', pronKo: '삿치끼리야~야', meaning: '실현을 위해',
    grammar: '여성명사, 여격 단수', baseForm: 'sacchikiriyā (실현)',
    formNote: 'sacchi(직접/눈으로) + kiriyā(행위) = "직접 봄/실현"',
    buddhism: '작증(作證). 직접 체험으로 증득.', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '👉', word: 'yadidaṃ', pronKo: '야디당', meaning: '이것이 바로, 즉',
    grammar: '관계대명사 + 지시대명사', baseForm: 'yad + idaṃ',
    formNote: 'yad(어떤것) + idaṃ(이것) = "그것은 곧 이것이다"\n정의/동격 도입 정형구',
    verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '4️⃣', word: 'cattāro', pronKo: '짯따~로', meaning: '네 가지의',
    grammar: '수사, 주격 남성 복수', baseForm: 'catur (넷)',
    formNote: 'catur → cattāro: 남성 주격 복수\ncattāri(중성), catasso(여성)', verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'teach', icon: '🧘', word: 'satipaṭṭhānā', pronKo: '사띠빳타~나~', meaning: '마음챙김의 확립들',
    grammar: '남성명사, 주격 복수', baseForm: 'satipaṭṭhāna',
    formNote: 'sati(마음챙김) + upaṭṭhāna(확립, 가까이 세움)\n복수 -ā',
    buddhism: '사념처(四念處). 몸·느낌·마음·법 네 가지 관찰.\n☸️ 팔정도의 sammāsati(정념)의 구체적 실천법.',
    verseLine: V2, verseLineKo: V2K, audio: true },
  { type: 'verse', pali: V2, pronKo: '에까~야노 아양, 빅카웨, 막고 삿따~낭 위숫디야~, 소까빠리데와~낭 사마띡까마~야 둑카도마낫사~낭 앗탕가마~야 냐~얏사 아디가마~야 닙바~낫사 삿치끼리야~야, 야디당 짯따~로 사띠빳타~나~.',
    translation: V2K, highlight: ['ekāyano','ayaṃ','maggo','visuddhiyā','samatikkamāya','atthaṅgamāya','ñāyassa','adhigamāya','nibbānassa','sacchikiriyāya','cattāro','satipaṭṭhānā'],
    note: '☸️ 경의 핵심 선언: 열반의 유일한 길 = 사념처' },

  // ── V3: katame cattāro? idha bhikkhu kāye kāyānupassī viharati ātāpī sampajāno satimā vineyya loke abhijjhādomanassaṃ; (반복: vedanāsu·citte·dhammesu) ──
  { type: 'teach', icon: '❓', word: 'katame', pronKo: '까따메', meaning: '어떤 것들? 무엇?',
    grammar: '의문대명사, 주격 남성 복수', baseForm: 'katama (어떤)',
    formNote: 'katama → katame: -a 어간 남성 주격 복수\n"katame cattāro?" = "네 가지란 무엇인가?"',
    verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '📌', word: 'idha', pronKo: '이다', meaning: '여기 (이 가르침에서)',
    grammar: '부사', baseForm: 'idha',
    formNote: '"여기서, 이 가르침/이 세상에서"\n경전 정형: "여기 비구는 ~한다"',
    verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🧘', word: 'bhikkhu', pronKo: '빅쿠', meaning: '비구는 (주격 단수)',
    grammar: '남성명사, 주격 단수', baseForm: 'bhikkhu',
    formNote: '-u 어간 남성 주격 -u (무변화)\n복수 bhikkhū(대격), bhikkhave/bhikkhavo(호격)와 구별',
    verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🏋️', word: 'kāye', pronKo: '까~예', meaning: '몸에서',
    grammar: '남성명사, 처격 단수', baseForm: 'kāya (몸)',
    formNote: 'kāya → kāye: -a 어간 처격 -e',
    buddhism: '신(身). 사념처의 첫째 관찰 대상.', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '👁️', word: 'kāyānupassī', pronKo: '까~야~누빳시~', meaning: '몸을 관찰하는 자',
    grammar: '형용사, 주격 남성 단수', baseForm: 'kāya + anupassin',
    formNote: 'kāya(몸) + anu(따라) + √pas(보다) + -in = 몸을 따라 보는 자',
    buddhism: '신수관(身隨觀).', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🔥', word: 'ātāpī', pronKo: '아~따~삐~', meaning: '열심히, 정진하는',
    grammar: '형용사, 주격 남성 단수', baseForm: 'ātāpin',
    formNote: 'ā + √tap(열, 노력) + -in = 열의 있는',
    buddhism: '정진(精進).', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🧠', word: 'sampajāno', pronKo: '삼빠자~노', meaning: '분명히 알아차리는',
    grammar: '형용사, 주격 남성 단수', baseForm: 'sampajāna',
    formNote: 'saṃ(완전히) + pa(앞으로) + √ñā(알다) = 완전히 분명히 아는',
    buddhism: '정지(正知). 상황 맥락을 이해하며 아는 것.', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '💎', word: 'satimā', pronKo: '사띠마~', meaning: '마음챙기는',
    grammar: '형용사, 주격 남성 단수', baseForm: 'sati + -mant',
    formNote: 'sati(마음챙김) + -mant(소유) → satimā(주격)',
    buddhism: '유념(有念). sati = 팔정도 sammāsati의 sati.', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🗑️', word: 'vineyya', pronKo: '위네이야', meaning: '제거하면서',
    grammar: '절대분사 (gerund)', baseForm: 'vineti (제거하다)',
    formNote: 'vi(분리) + √nī(이끌다) → vineti\n절대분사 -ya = "~한 뒤/하면서"',
    verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🌍', word: 'loke', pronKo: '로께', meaning: '세상에 대한',
    grammar: '남성명사, 처격 단수', baseForm: 'loka (세상)',
    formNote: 'loka → loke: -a 어간 처격 -e', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '😈', word: 'abhijjhādomanassaṃ', pronKo: '아빗자~도마낫상', meaning: '탐욕과 근심을',
    grammar: '복합어, 대격 중성 단수', baseForm: 'abhijjhā(탐욕) + domanassa(근심)',
    formNote: 'dvandva 복합어. 대격 -aṃ = vineyya(제거함)의 목적어',
    buddhism: '탐욕과 근심. 수행 방해의 양극단.', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '💭', word: 'vedanāsu', pronKo: '웨다나~수', meaning: '느낌들에서',
    grammar: '여성명사, 처격 복수', baseForm: 'vedanā (느낌)',
    formNote: 'vedanā → vedanāsu: -ā 어간 처격 복수 -āsu',
    buddhism: '수(受). 즐거움·괴로움·중성의 느낌.', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '👁️‍🗨️', word: 'vedanānupassī', pronKo: '웨다나~누빳시~', meaning: '느낌을 관찰하는 자',
    grammar: '형용사, 주격 남성 단수', baseForm: 'vedanā + anupassin',
    buddhism: '수수관(受隨觀).', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🧠', word: 'citte', pronKo: '찟떼', meaning: '마음에서',
    grammar: '중성명사, 처격 단수', baseForm: 'citta (마음)',
    formNote: 'citta → citte: -a 어간 처격 -e',
    buddhism: '심(心). 의식 일반.', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🔍', word: 'cittānupassī', pronKo: '찟따~누빳시~', meaning: '마음을 관찰하는 자',
    grammar: '형용사, 주격 남성 단수', baseForm: 'citta + anupassin',
    buddhism: '심수관(心隨觀).', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '☸️', word: 'dhammesu', pronKo: '담메수', meaning: '법들에서',
    grammar: '남성명사, 처격 복수', baseForm: 'dhamma (법)',
    formNote: 'dhamma → dhammesu: -a 어간 처격 복수 -esu',
    buddhism: '법(法). 정신적 현상·가르침·구성요소.', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'teach', icon: '🔬', word: 'dhammānupassī', pronKo: '담마~누빳시~', meaning: '법을 관찰하는 자',
    grammar: '형용사, 주격 남성 단수', baseForm: 'dhamma + anupassin',
    buddhism: '법수관(法隨觀).', verseLine: V3, verseLineKo: V3K, audio: true },
  { type: 'verse', pali: V3, pronKo: '까따메 짯따~로? 이다, 빅카웨, 빅쿠 까~예 까~야~누빳시~ 위하라띠 아~따~삐~ 삼빠자~노 사띠마~ 위네이야 로께 아빗자~도마낫상; 웨다나~수 웨다나~누빳시~...; 찟떼 찟따~누빳시~...; 담메수 담마~누빳시~ 위하라띠 아~따~삐~ 삼빠자~노 사띠마~ 위네이야 로께 아빗자~도마낫상.',
    translation: V3K, highlight: ['katame','cattāro','idha','bhikkhu','kāye','kāyānupassī','vedanāsu','vedanānupassī','citte','cittānupassī','dhammesu','dhammānupassī','ātāpī','sampajāno','satimā','vineyya','loke','abhijjhādomanassaṃ'] },

  { type: 'quiz', question: '"ekāyano maggo"의 뜻은?', options: ['여러 길', '하나의 길 (유일한 길)', '어려운 길', '긴 길'], answer: 1 },
  { type: 'quiz', question: '사념처의 네 가지는?', options: ['몸·느낌·마음·법', '고·집·멸·도', '계·정·혜·해탈', '색·수·상·행'], answer: 0 },
  { type: 'quiz', question: '"satimā"의 sati는 팔정도의 어떤 항목과 같은 단어?', options: ['sammādiṭṭhi', 'sammāvācā', 'sammāsati', 'sammāsamādhi'], answer: 2, hint: '정념(正念)!' },

  // ===== 신념처 ① 호흡(ānāpāna) =====
  { type: 'intro', icon: '🌬️', title: '— ① ānāpānapabba (호흡) —', subtitle: '신념처 첫 번째',
    description: '들숨과 날숨을 알아차리는 수행.' },

  // ── V_ANA1: 단어 학습 ──
  { type: 'teach', icon: '❓', word: 'kathañca', pronKo: '까탄짜', meaning: '어떻게? + 그리고',
    grammar: '의문부사 + 접속사', baseForm: 'kathaṃ(어떻게) + ca(그리고)',
    formNote: 'kathaṃ + ca → kathañca (산디)\n"그러면 어떻게 ~한가?" — 설명 도입',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🔗', word: 'pana', pronKo: '빠나', meaning: '그러면, 또한',
    grammar: '불변사 (담론 연결)',
    formNote: '담론 연결 첨사. "그런데, 그러면"',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🌲', word: 'araññagato', pronKo: '아란냐~가또', meaning: '숲으로 간',
    grammar: '과거분사, 주격 남성 단수', baseForm: 'arañña(숲) + gata(간)',
    formNote: '복합어. 수행 장소 첫째.',
    buddhism: '한적한 곳. 수행의 외적 조건.',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '✌️', word: 'vā', pronKo: '와~', meaning: '또는',
    grammar: '접속사 (선택)',
    formNote: '"또는, 혹은". 보통 단어 뒤에 위치.',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🌳', word: 'rukkhamūlagato', pronKo: '룩카무~라가또', meaning: '나무 아래로 간',
    grammar: '과거분사, 주격 남성 단수', baseForm: 'rukkha(나무) + mūla(뿌리/아래) + gata',
    formNote: '복합어. 수행 장소 둘째.',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🏚️', word: 'suññāgāragato', pronKo: '순냐~가~라가또', meaning: '빈 처소로 간',
    grammar: '과거분사, 주격 남성 단수', baseForm: 'suñña(빈) + agāra(집) + gata',
    formNote: '복합어. 수행 장소 셋째.',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🪑', word: 'nisīdati', pronKo: '니시~다띠', meaning: '앉는다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'nisīdati (ni- + √sad)',
    formNote: 'ni(아래) + √sad(앉다) → "내려 앉다"',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🧘', word: 'pallaṅkaṃ', pronKo: '빨랑깡', meaning: '가부좌를',
    grammar: '중성명사, 대격 단수', baseForm: 'pallaṅka',
    formNote: '"앉는 의자/가부좌 자세"\npallaṅkaṃ ābhujitvā = 가부좌를 틀고',
    buddhism: '결가부좌(結跏趺坐).',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🔄', word: 'ābhujitvā', pronKo: '아~부지뜨와~', meaning: '틀고, 굽혀',
    grammar: '절대분사 (gerund)', baseForm: 'ābhujati (ā- + √bhuj)',
    formNote: 'ā + √bhuj(굽히다) + -tvā\n"틀고, 굽혀 놓고"',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '📏', word: 'ujuṃ', pronKo: '우중', meaning: '똑바로',
    grammar: '부사', baseForm: 'uju (똑바른)',
    formNote: '형용사 uju의 부사형\n"몸을 똑바로" = 척추 곧게',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🦴', word: 'kāyaṃ', pronKo: '까~양', meaning: '몸을 (대격)',
    grammar: '남성명사, 대격 단수', baseForm: 'kāya',
    formNote: 'kāya → kāyaṃ: -a 어간 대격 -aṃ\nkāye(처격)와 비교',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '⬆️', word: 'paṇidhāya', pronKo: '빠니다~야', meaning: '세우고, 두고',
    grammar: '절대분사 (gerund)', baseForm: 'paṇidahati (pa- + ni- + √dhā)',
    formNote: 'pa + ni(아래) + √dhā(두다) + -ya\n"앞을 향해 둠 = 세움"',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '👀', word: 'parimukhaṃ', pronKo: '빠리무캉', meaning: '면전에, 앞에',
    grammar: '부사 (대격 부사적)', baseForm: 'parimukha (면전)',
    formNote: 'pari(주위) + mukha(얼굴) = "얼굴 주변, 면전"\n호흡 명상에서 코끝/입 근처',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '💎', word: 'satiṃ', pronKo: '사띵', meaning: '마음챙김을 (대격)',
    grammar: '여성명사, 대격 단수', baseForm: 'sati (마음챙김)',
    formNote: 'sati → satiṃ: -i 어간 여성 대격 -iṃ',
    buddhism: '념(念). 팔정도 sammāsati의 sati.',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🏗️', word: 'upaṭṭhapetvā', pronKo: '우빳타뻬뜨와~', meaning: '확립한 뒤',
    grammar: '절대분사 (gerund, 사역형)', baseForm: 'upaṭṭhāpeti (upa- + √ṭhā 사역)',
    formNote: 'upa(가까이) + √ṭhā(서다) 사역형 + -tvā\n"가까이 세워둔 뒤"',
    buddhism: 'sati + upaṭṭhāna = 사념처(satipaṭṭhāna)의 어원!',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '👤', word: 'so', pronKo: '소', meaning: '그는 (3인칭 대명사)',
    grammar: '대명사, 주격 남성 단수', baseForm: 'ta- (그)',
    formNote: 'ta → so: 남성 주격\nsā(여성), taṃ(중성)',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '💎', word: 'satova', pronKo: '사또와', meaning: '마음챙긴 채로',
    grammar: '형용사 + eva 강조', baseForm: 'sato (마음챙긴) + eva (강조)',
    formNote: 'sata + eva = "오직 마음챙긴 채로"\nsata는 satimā의 단축형',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🌬️', word: 'assasati', pronKo: '앗사사띠', meaning: '들이쉰다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'assasati (ā- + √sas)',
    formNote: 'ā(안으로) + √sas(숨쉬다) = 들숨',
    buddhism: '아나빠나사띠(出入息念)의 들숨.',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '💨', word: 'passasati', pronKo: '빳사사띠', meaning: '내쉰다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'passasati (pa- + √sas)',
    formNote: 'pa(밖으로) + √sas(숨쉬다) = 날숨',
    buddhism: '아나빠나사띠의 날숨.',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '📏', word: 'dīghaṃ', pronKo: '디~강', meaning: '길게',
    grammar: '부사 (대격 부사적)', baseForm: 'dīgha (긴)',
    formNote: 'dīgha → dīghaṃ (부사 "길게")',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🌬️', word: 'assasanto', pronKo: '앗사산또', meaning: '들이쉬며',
    grammar: '현재분사, 주격 남성 단수', baseForm: 'assasati의 현재분사',
    formNote: 'assasati + -nta → assasanto\n"~하면서, ~하는 자"',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🗣️', word: 'assasāmī', pronKo: '앗사사~미~', meaning: '"나는 들이쉰다"',
    grammar: '동사 1인칭 단수 현재', baseForm: 'assasati',
    formNote: 'assasati의 1인칭 단수 + 인용 끝 장모음화',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '💬', word: 'ti', pronKo: '띠', meaning: '~라고 (인용 종결)',
    grammar: '인용 첨사', baseForm: 'iti의 축약',
    formNote: 'iti(이렇게) → ti (앞 모음과 결합)\n직접 인용을 닫는 표시',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🎯', word: 'pajānāti', pronKo: '빠자~나~띠', meaning: '분명히 안다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'pajānāti (pa- + √ñā)',
    formNote: 'pa(앞으로/완전히) + √ñā(알다) = "분명히 알다"\n위빠사나 통찰의 핵심 동사',
    buddhism: 'paññā(반야/지혜)와 어근 공유. 통찰지.',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '💨', word: 'passasanto', pronKo: '빳사산또', meaning: '내쉬며',
    grammar: '현재분사, 주격 남성 단수', baseForm: 'passasati의 현재분사',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🗣️', word: 'passasāmī', pronKo: '빳사사~미~', meaning: '"나는 내쉰다"',
    grammar: '동사 1인칭 단수 현재', baseForm: 'passasati',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '📐', word: 'rassaṃ', pronKo: '랏상', meaning: '짧게',
    grammar: '부사 (대격 부사적)', baseForm: 'rassa (짧은)',
    formNote: 'rassa → rassaṃ (부사 "짧게")',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🌐', word: 'sabbakāyapaṭisaṃvedī', pronKo: '삽바까~야빠띠상웨디~', meaning: '온 몸을 경험하는 자',
    grammar: '복합어, 주격 남성 단수', baseForm: 'sabba + kāya + paṭisaṃvedin',
    formNote: 'sabba(모든) + kāya(몸) + paṭi(돌려) + saṃ + √vid(알다) + -in\n"전 신체를 경험하는 자"',
    buddhism: '아나빠나사띠 3단계: 호흡 전체를 몸으로 경험.',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🔮', word: 'assasissāmī', pronKo: '앗사싯사~미~', meaning: '"나는 들이쉬리라" (미래)',
    grammar: '동사 1인칭 단수 미래', baseForm: 'assasati 미래형',
    formNote: '미래 어간 + 1인칭 -mi + 장모음화\n"~하리라"',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '📚', word: 'sikkhati', pronKo: '식카띠', meaning: '익힌다, 수련한다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'sikkhati (√sak/√sikkh)',
    formNote: '√sak(능력)의 의도형 → "능력 갖추려 한다 = 익힌다"\nsikkhāpada(학처)와 어원 공유',
    buddhism: '학(學). 의식적 수련.',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🔮', word: 'passasissāmī', pronKo: '빳사싯사~미~', meaning: '"나는 내쉬리라" (미래)',
    grammar: '동사 1인칭 단수 미래', baseForm: 'passasati 미래형',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🌊', word: 'passambhayaṃ', pronKo: '빳삼바양', meaning: '고요히 하며',
    grammar: '현재분사 (사역형)', baseForm: 'passambheti (고요하게 하다)',
    formNote: 'pa + √sambh의 사역형 + -nta\n"고요하게 만들면서"',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },
  { type: 'teach', icon: '🏗️', word: 'kāyasaṅkhāraṃ', pronKo: '까~야상카~랑', meaning: '몸의 형성을',
    grammar: '복합어, 대격 남성 단수', baseForm: 'kāya(몸) + saṅkhāra(형성)',
    formNote: 'kāya + saṅkhāra = "몸의 형성 작용"\n여기서 saṅkhāra = 호흡 자체 (몸 유지 작용)',
    buddhism: '신행(身行). 호흡 = 몸의 saṅkhāra.\n아나빠나사띠 4단계: 호흡 고요히 → 몸 진정.',
    verseLine: V_ANA1, verseLineKo: V_ANA1K, audio: true },

  { type: 'verse', pali: V_ANA1, pronKo: '까탄짜 빠나, 빅카웨, 빅쿠 까~예 까~야~누빳시~ 위하라띠? 이다, 빅카웨, 빅쿠 아란냐~가또 와~ 룩카무~라가또 와~ 순냐~가~라가또 와~ 니시~다띠 빨랑깡 아~부지뜨와~ 우중 까~양 빠니다~야 빠리무캉 사띵 우빳타뻬뜨와~. 소 사또와 앗사사띠, 사또와 빳사사띠. 디~강 와~ 앗사산또 \'디~강 앗사사~미~\'띠 빠자~나~띠...',
    translation: V_ANA1K, highlight: ['kathañca','araññagato','rukkhamūlagato','suññāgāragato','pallaṅkaṃ','parimukhaṃ','satiṃ','upaṭṭhapetvā','assasati','passasati','dīghaṃ','rassaṃ','pajānāti','sabbakāyapaṭisaṃvedī','sikkhati','passambhayaṃ','kāyasaṅkhāraṃ'],
    note: '🌬️ 16단계 아나빠나사띠의 첫 4단계.' },

  // ── V_ANA2: 녹로공 비유 단어 학습 ──
  { type: 'teach', icon: '🎭', word: 'seyyathāpi', pronKo: '셋야타~삐', meaning: '마치 ~와 같이',
    grammar: '비교 부사', baseForm: 'seyyathā + api',
    formNote: 'seyyathā(어떤 식으로) + api(역시) = "마치 ~와 같이"\n경전 비유 도입 정형구',
    verseLine: V_ANA2, verseLineKo: V_ANA2K, audio: true },
  { type: 'teach', icon: '🏆', word: 'dakkho', pronKo: '닥코', meaning: '숙련된, 능숙한',
    grammar: '형용사, 주격 남성 단수', baseForm: 'dakkha (숙련된)',
    formNote: '-a 어간 남성 주격 -o',
    verseLine: V_ANA2, verseLineKo: V_ANA2K, audio: true },
  { type: 'teach', icon: '⚙️', word: 'bhamakāro', pronKo: '바마까~로', meaning: '녹로공 (선반공)',
    grammar: '남성명사, 주격 단수', baseForm: 'bhamakāra (bhama + kāra)',
    formNote: 'bhama(회전) + kāra(만드는 자) = 회전을 다루는 자 = 녹로공',
    buddhism: '비유: 숙련된 장인 = 마음챙김 수행자.',
    verseLine: V_ANA2, verseLineKo: V_ANA2K, audio: true },
  { type: 'teach', icon: '🎓', word: 'bhamakārantevāsī', pronKo: '바마까~란떼와~시~', meaning: '녹로공의 제자',
    grammar: '복합어, 주격 남성 단수', baseForm: 'bhamakāra + antevāsin',
    formNote: 'bhamakāra(녹로공) + antevāsin(가까이 머무는 자=제자)',
    verseLine: V_ANA2, verseLineKo: V_ANA2K, audio: true },
  { type: 'teach', icon: '🔄', word: 'añchanto', pronKo: '안찬또', meaning: '돌리며, 당기며',
    grammar: '현재분사, 주격 남성 단수', baseForm: 'añchati (당기다, 돌리다)',
    formNote: '√añch(당기다) + -nta\n녹로의 줄을 당겨 회전시킴',
    verseLine: V_ANA2, verseLineKo: V_ANA2K, audio: true },
  { type: 'teach', icon: '🗣️', word: 'añchāmī', pronKo: '안차~미~', meaning: '"나는 돌린다/당긴다"',
    grammar: '동사 1인칭 단수 현재', baseForm: 'añchati',
    formNote: '1인칭 단수 + 인용 장모음화',
    verseLine: V_ANA2, verseLineKo: V_ANA2K, audio: true },
  { type: 'teach', icon: '🟰', word: 'evameva', pronKo: '에와메와', meaning: '이와 같이',
    grammar: '부사 (비유 결론)', baseForm: 'evaṃ(이와같이) + eva(강조)',
    formNote: 'evaṃ + eva = "바로 이와 같이"\n비유의 적용 부분 도입 정형구',
    verseLine: V_ANA2, verseLineKo: V_ANA2K, audio: true },

  { type: 'verse', pali: V_ANA2, pronKo: '셋야타~삐, 빅카웨, 닥코 바마까~로 와~ 바마까~란떼와~시~ 와~ 디~강 와~ 안찬또 \'디~강 안차~미~\'띠 빠자~나~띠... 에와메와 코, 빅카웨, 빅쿠 디~강 와~ 앗사산또 \'디~강 앗사사~미~\'띠 빠자~나~띠...',
    translation: V_ANA2K, highlight: ['seyyathāpi','dakkho','bhamakāro','bhamakārantevāsī','añchanto','añchāmī','evameva'],
    note: '🔄 비유: 솜씨 좋은 녹로공.' },

  // ── 신념처 후렴 단어 학습 ──
  { type: 'teach', icon: '🔁', word: 'iti', pronKo: '이띠', meaning: '이렇게, 이와 같이',
    grammar: '인용/요약 부사', baseForm: 'iti',
    formNote: '인용 종결사 또는 "이렇게/이렇게 해서"의 의미\n후렴 시작 표시',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '🏠', word: 'ajjhattaṃ', pronKo: '앗잣땅', meaning: '안으로, 내적으로',
    grammar: '부사', baseForm: 'ajjhatta (내적인)',
    formNote: 'adhi(위/내부) + atta(자신) = "자기 안에서"\n자기 자신의 몸 관찰',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '🌐', word: 'bahiddhā', pronKo: '바힛다~', meaning: '밖으로, 외적으로',
    grammar: '부사', baseForm: 'bahiddhā',
    formNote: 'bahi(밖) + -ddhā(접미사)\n타인의 몸 관찰',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '🔁', word: 'ajjhattabahiddhā', pronKo: '앗잣따바힛다~', meaning: '안팎으로',
    grammar: '복합어 부사', baseForm: 'ajjhatta + bahiddhā',
    formNote: '자기 몸 + 타인 몸 함께 관찰',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '⬆️', word: 'samudayadhammānupassī', pronKo: '사무다야담마~누빳시~', meaning: '일어남의 법을 관찰하는 자',
    grammar: '복합어, 주격 남성 단수', baseForm: 'samudaya(일어남) + dhamma(법) + anupassin',
    formNote: 'samudaya(일어남, 발생) + dhamma + anupassī\n생멸의 "생(生)"을 관찰',
    buddhism: '집(集). 4성제의 dukkhasamudaya와 같은 단어.',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '⬇️', word: 'vayadhammānupassī', pronKo: '와야담마~누빳시~', meaning: '사라짐의 법을 관찰하는 자',
    grammar: '복합어, 주격 남성 단수', baseForm: 'vaya(사라짐) + dhamma + anupassin',
    formNote: 'vaya(쇠퇴/사라짐) + dhamma + anupassī\n생멸의 "멸(滅)"을 관찰',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '🔄', word: 'samudayavayadhammānupassī', pronKo: '사무다야와야담마~누빳시~', meaning: '일어남과 사라짐의 법을 관찰하는 자',
    grammar: '복합어, 주격 남성 단수', baseForm: 'samudaya + vaya + dhamma + anupassin',
    formNote: '둘을 동시에 보는 단계 — 생멸 통찰 완성',
    buddhism: '생멸수관(生滅隨觀). 무상 통찰의 정점.',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '📍', word: 'kāyasmiṃ', pronKo: '까~야스밍', meaning: '몸에서 (처격, kāye와 동일)',
    grammar: '남성명사, 처격 단수', baseForm: 'kāya',
    formNote: 'kāya → kāyasmiṃ: -a 어간 처격 -smiṃ (kāye의 다른 형태)\n두 처격 형태 병용',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '👁️', word: 'atthi', pronKo: '앗티', meaning: '있다 (3인칭 단수)',
    grammar: '동사 3인칭 단수 현재', baseForm: 'atthi (√as, 존재하다)',
    formNote: '√as(있다)의 3인칭 단수\n"atthi kāyo" = "몸이 있다"',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '🦴', word: 'kāyo', pronKo: '까~요', meaning: '몸이 (주격)',
    grammar: '남성명사, 주격 단수', baseForm: 'kāya',
    formNote: 'kāya → kāyo: -a 어간 주격 -o',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '💎', word: 'paccupaṭṭhitā', pronKo: '빳쭈빳티따~', meaning: '확립된',
    grammar: '과거분사, 주격 여성 단수', baseForm: 'paccupaṭṭhāti (paṭi- + upa- + √ṭhā)',
    formNote: 'paṭi + upa(가까이) + √ṭhā(서다) → "다가가 서다 = 확립되다"\n주어 sati(여성)와 일치',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '⏳', word: 'yāvadeva', pronKo: '야~와데와', meaning: '오직 ~를 위해서만',
    grammar: '부사 (한정)', baseForm: 'yāva + d + eva',
    formNote: 'yāva(~만큼) + eva(강조) = "오직 ~만큼"\n범위 한정',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '🧠', word: 'ñāṇamattāya', pronKo: '냐~나맛따~야', meaning: '앎의 정도를 위해',
    grammar: '복합어, 여격 단수', baseForm: 'ñāṇa(앎) + matta(만큼/정도)',
    formNote: 'ñāṇa(앎/지혜) + matta(정도) + -āya(여격)\n"앎의 정도만큼만"',
    buddhism: '지(智). paññā(반야)의 결과 = ñāṇa.',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '💭', word: 'paṭissatimattāya', pronKo: '빠띳사띠맛따~야', meaning: '마음챙김의 정도를 위해',
    grammar: '복합어, 여격 단수', baseForm: 'paṭissati(반복 기억) + matta',
    formNote: 'paṭissati(거듭 기억) + matta(정도) + -āya\nsati의 다른 표현',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '🆓', word: 'anissito', pronKo: '아닛시또', meaning: '의지하지 않고',
    grammar: '과거분사, 주격 남성 단수', baseForm: 'a-nissita (의지 없는)',
    formNote: 'a(부정) + nissita(의지하는) = 의지하지 않는\n"어디에도 의지하지 않고 머문다"',
    buddhism: '독립(獨立). 어떤 견해/존재에도 매이지 않음.',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '🚫', word: 'upādiyati', pronKo: '우빠~디야띠', meaning: '집착한다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'upādiyati (upa- + ā- + √dā)',
    formNote: 'upa + ā + √dā(주다/잡다) = "잡다, 집착하다"\n"na ca kiñci loke upādiyati" = 세상의 어떤 것도 집착하지 않음',
    buddhism: '취(取). 12연기의 upādāna와 어근 공유.',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },
  { type: 'teach', icon: '🎯', word: 'evampi', pronKo: '에왐삐', meaning: '이와 같이도',
    grammar: '부사', baseForm: 'evaṃ + api',
    formNote: 'evaṃ(이와 같이) + api(역시/도)\n후렴 마무리 정형: "이와 같이도 비구는 ~한다"',
    verseLine: REF_KAYA, verseLineKo: REF_KAYA_K, audio: true },

  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~ 까~예 까~야~누빳시~ 위하라띠, 바힛다~ 와~ 까~예 까~야~누빳시~ 위하라띠, 앗잣따바힛다~ 와~ 까~예 까~야~누빳시~ 위하라띠. 사무다야담마~누빳시~ 와~ 까~야스밍 위하라띠, 와야담마~누빳시~ 와~... 사무다야와야담마~누빳시~ 와~... \'앗티 까~요\'띠 와~ 빠낫사 사띠 빳쭈빳티따~ 호띠 야~와데와 냐~나맛따~야 빠띳사띠맛따~야 아닛시또 짜 위하라띠, 나 짜 낀찌 로께 우빠~디야띠. 에왐삐 코, 빅카웨, 빅쿠 까~예 까~야~누빳시~ 위하라띠.',
    translation: REF_KAYA_K, highlight: ['ajjhattaṃ','bahiddhā','samudayadhammānupassī','vayadhammānupassī','atthi','kāyo','paccupaṭṭhitā','yāvadeva','ñāṇamattāya','anissito','upādiyati','evampi'],
    note: '🔁 신념처 공통 후렴. 모든 14항목 뒤에 반복됨 — 핵심 위빠사나 정형구.' },

  { type: 'verse', pali: 'ānāpānapabbaṃ niṭṭhitaṃ.', pronKo: '아~나~빠~나빱방 닛티땅.',
    translation: '— 호흡 항목 끝 —' },

  { type: 'quiz', question: '아나빠나사띠 첫 4단계는?', options: ['길게·짧게·온몸·몸형성 고요', '집착·갈애·무명·고', '계·정·혜·해탈', '신·구·의·법'], answer: 0 },
  { type: 'quiz', question: '"upaṭṭhāna" 어원은 satipaṭṭhāna의 어디?', options: ['sati 뒤', 'sati 앞', '관계없음', 'paṭṭhāna가 다른 단어'], answer: 0, hint: 'sati + upaṭṭhāna = satipaṭṭhāna' },

  // ===== 신념처 ② 자세(iriyāpatha) =====
  { type: 'intro', icon: '🚶', title: '— ② iriyāpathapabba (자세) —', subtitle: '신념처 두 번째',
    description: '네 가지 자세(걷고·서고·앉고·눕고) 알아차림.' },

  // ── V_IRI 단어 학습 ──
  { type: 'teach', icon: '🔄', word: 'puna', pronKo: '뿌나', meaning: '다시, 또',
    grammar: '부사', baseForm: 'puna',
    formNote: '"다시, 또". puna caparaṃ = "또한, 다시 비구들이여" — 새 항목 도입 정형구',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '➕', word: 'caparaṃ', pronKo: '짜빠랑', meaning: '또한, 그 외에',
    grammar: '부사', baseForm: 'ca + paraṃ',
    formNote: 'ca(그리고) + paraṃ(다른 것) = "또한, 다음으로"',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '🚶', word: 'gacchanto', pronKo: '갓찬또', meaning: '가는, 걷는',
    grammar: '현재분사, 주격 남성 단수', baseForm: 'gacchati (간다)',
    formNote: '√gam(가다) → gacchati → gacchanto (현재분사)\n"가고 있는 자"',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '🗣️', word: 'gacchāmī', pronKo: '갓차~미~', meaning: '"나는 간다"',
    grammar: '동사 1인칭 단수 현재', baseForm: 'gacchati',
    formNote: '1인칭 단수 -mi + 인용 장모음화',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '🧍', word: 'ṭhito', pronKo: '티또', meaning: '서 있는',
    grammar: '과거분사, 주격 남성 단수', baseForm: 'tiṭṭhati (서다)',
    formNote: '√ṭhā(서다)의 과거분사 → ṭhita\n"서 있는 자"',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '🗣️', word: 'ṭhitomhī', pronKo: '티또므히~', meaning: '"나는 서 있다"',
    grammar: '과거분사 + 동사 1인칭', baseForm: 'ṭhito + amhi (나는 ~이다)',
    formNote: 'ṭhito(서 있는) + amhi(나는 ~이다) → ṭhitomhi → 인용 ṭhitomhī',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '🪑', word: 'nisinno', pronKo: '니신노', meaning: '앉아 있는',
    grammar: '과거분사, 주격 남성 단수', baseForm: 'nisīdati (앉다)의 과거분사',
    formNote: 'nisīdati → nisinna → nisinno',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '🗣️', word: 'nisinnomhī', pronKo: '니신노므히~', meaning: '"나는 앉아 있다"',
    grammar: '과거분사 + 동사 1인칭', baseForm: 'nisinno + amhi',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '🛌', word: 'sayāno', pronKo: '사야~노', meaning: '누워 있는',
    grammar: '현재분사 (중간태), 주격 남성 단수', baseForm: 'seti (눕다)',
    formNote: '√sī(눕다)의 중간태 현재분사 → sayāna → sayāno',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '🗣️', word: 'sayānomhī', pronKo: '사야~노므히~', meaning: '"나는 누워 있다"',
    grammar: '현재분사 + 동사 1인칭', baseForm: 'sayāno + amhi',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '🔄', word: 'yathā yathā', pronKo: '야타~ 야타~', meaning: '어떤 식으로든',
    grammar: '상관 부사 반복', baseForm: 'yathā (어떻게)',
    formNote: 'yathā yathā ... tathā tathā = "~하는 그대로, 그렇게 ~한다"\n경전에서 흔한 상관 구문',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '👤', word: 'panassa', pronKo: '빠낫사', meaning: '그러나 그에게',
    grammar: '불변사 + 대명사 속격', baseForm: 'pana + assa (그의/그에게)',
    formNote: 'pana(그러나) + assa(ta의 속격 = 그에게)',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '📐', word: 'paṇihito', pronKo: '빠니히또', meaning: '놓인, 자세 잡힌',
    grammar: '과거분사, 주격 남성 단수', baseForm: 'paṇidahati (놓다)',
    formNote: 'pa + ni + √dhā의 과거분사\n"어떤 자세로 놓인"',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '✅', word: 'hoti', pronKo: '호띠', meaning: '있다, 된다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'bhavati (있다, 되다)',
    formNote: '√bhū(있다/되다) → bhavati → 축약 hoti\natthi(존재 강조)와 미묘 차이',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '↪️', word: 'tathā tathā', pronKo: '따타~ 따타~', meaning: '그렇게, 그대로',
    grammar: '상관 부사 반복', baseForm: 'tathā (그렇게)',
    formNote: 'yathā yathā(~하는 대로) ↔ tathā tathā(그대로)',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },
  { type: 'teach', icon: '👉', word: 'naṃ', pronKo: '낭', meaning: '그것을',
    grammar: '대명사, 대격 단수', baseForm: 'ta- (그)',
    formNote: 'ta- → taṃ → naṃ (음운 변화)\n"그 (자세)를"',
    verseLine: V_IRI, verseLineKo: V_IRIK, audio: true },

  { type: 'verse', pali: V_IRI, pronKo: '뿌나 짜빠랑, 빅카웨, 빅쿠 갓찬또 와~ \'갓차~미~\'띠 빠자~나~띠, 티또 와~ \'티또므히~\'띠 빠자~나~띠, 니신노 와~ \'니신노므히~\'띠 빠자~나~띠, 사야~노 와~ \'사야~노므히~\'띠 빠자~나~띠, 야타~ 야타~ 와~ 빠낫사 까~요 빠니히또 호띠, 따타~ 따타~ 낭 빠자~나~띠.',
    translation: V_IRIK, highlight: ['gacchanto','gacchāmī','ṭhito','ṭhitomhī','nisinno','nisinnomhī','sayāno','sayānomhī','yathā','tathā','paṇihito'] },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K, note: '🔁 후렴.' },
  { type: 'verse', pali: 'iriyāpathapabbaṃ niṭṭhitaṃ.', pronKo: '이리야~빠타빱방 닛티땅.', translation: '— 자세 항목 끝 —' },

  // ===== 신념처 ③ 분명한 앎(sampajāna) =====
  { type: 'intro', icon: '👁️', title: '— ③ sampajānapabba (분명한 앎) —', subtitle: '신념처 세 번째',
    description: '모든 일상 행위에 대한 분명한 앎.' },

  // ── V_SAM 단어 학습 ──
  { type: 'teach', icon: '👁️‍🗨️', word: 'sampajānakārī', pronKo: '삼빠자~나까~리~', meaning: '분명히 알아차리며 행하는 자',
    grammar: '복합어, 주격 남성 단수', baseForm: 'sampajāna + kārin',
    formNote: 'sampajāna(분명한 앎) + kārin(행하는 자) = "분명히 알며 행위하는 자"',
    buddhism: '정지(正知). 동작에 의도·맥락·이익을 알아차림.',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '⏩', word: 'abhikkante', pronKo: '아빅깐떼', meaning: '나아갈 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'abhikkanta (abhi- + √kam)',
    formNote: 'abhi(앞으로) + √kam(가다) → abhikkanta\n처격 -e: "나아감에 있어서"',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '⏪', word: 'paṭikkante', pronKo: '빠띡깐떼', meaning: '물러설 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'paṭikkanta (paṭi- + √kam)',
    formNote: 'paṭi(되돌려) + √kam(가다) → paṭikkanta\n"물러섬에 있어서"',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '👁️', word: 'ālokite', pronKo: '아~로끼떼', meaning: '앞을 볼 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'ālokita (ā + √lok)',
    formNote: 'ā + √lok(보다) → ālokita\n"정면을 봄에 있어서"',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '👀', word: 'vilokite', pronKo: '위로끼떼', meaning: '둘러볼 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'vilokita (vi + √lok)',
    formNote: 'vi(분산해) + √lok(보다) → vilokita\n"옆을/주변을 봄에 있어서"',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '🦾', word: 'samiñjite', pronKo: '사민지떼', meaning: '굽힐 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'samiñjita (saṃ- + √iñj)',
    formNote: 'saṃ + √iñj(굽히다) → samiñjita',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '🤚', word: 'pasārite', pronKo: '빠사~리떼', meaning: '펼 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'pasārita (pa- + √sar)',
    formNote: 'pa + √sar(펴다) → pasārita',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '👘', word: 'saṅghāṭipattacīvaradhāraṇe', pronKo: '상가~띠빳따찌~와라다~라네', meaning: '가사·발우·옷을 지님에',
    grammar: '복합어, 처격 단수', baseForm: 'saṅghāṭi(겉가사) + patta(발우) + cīvara(옷) + dhāraṇa(지님)',
    formNote: '4요소 복합어. 비구 3종 가사+발우 지님의 알아차림',
    buddhism: '가사(袈裟)+발우(鉢). 비구의 4지요.',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '🍽️', word: 'asite', pronKo: '아시떼', meaning: '먹을 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'asita (먹은)',
    formNote: '√as(먹다)의 과거분사',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '🥤', word: 'pīte', pronKo: '삐~떼', meaning: '마실 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'pīta (마신)',
    formNote: '√pā(마시다)의 과거분사',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '🦷', word: 'khāyite', pronKo: '카~이떼', meaning: '씹을 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'khāyita (씹은)',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '👅', word: 'sāyite', pronKo: '사~이떼', meaning: '맛볼 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'sāyita (맛본)',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '🚽', word: 'uccārapassāvakamme', pronKo: '욱짜~라빳사~와깜메', meaning: '대소변을 봄에 (처격)',
    grammar: '복합어, 처격 단수', baseForm: 'uccāra(대변) + passāva(소변) + kamma(행위)',
    formNote: '대변+소변+행위 복합어. 모든 신체 기능에 마음챙김',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '🚶‍♂️', word: 'gate', pronKo: '가떼', meaning: '갈 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'gata (간)',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '🧍‍♂️', word: 'ṭhite', pronKo: '티떼', meaning: '서 있을 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'ṭhita (서 있는)',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '🪑', word: 'nisinne', pronKo: '니신네', meaning: '앉아 있을 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'nisinna (앉은)',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '😴', word: 'sutte', pronKo: '숫떼', meaning: '잠들었을 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'sutta (잠든)',
    formNote: '√supp(자다)의 과거분사. 잠 속에서도 마음챙김 유지',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '☀️', word: 'jāgarite', pronKo: '자~가리떼', meaning: '깨어났을 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'jāgarita (깨어난)',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '🗨️', word: 'bhāsite', pronKo: '바~시떼', meaning: '말할 때 (처격)',
    grammar: '과거분사, 처격 단수', baseForm: 'bhāsita (말한)',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },
  { type: 'teach', icon: '🤐', word: 'tuṇhībhāve', pronKo: '뚠히~바~웨', meaning: '침묵할 때 (처격)',
    grammar: '복합어, 처격 단수', baseForm: 'tuṇhī(조용히) + bhāva(상태)',
    formNote: 'tuṇhī(침묵의) + bhāva(상태) = "침묵 상태"',
    verseLine: V_SAM, verseLineKo: V_SAMK, audio: true },

  { type: 'verse', pali: V_SAM, pronKo: '뿌나 짜빠랑, 빅카웨, 빅쿠 아빅깐떼 빠띡깐떼 삼빠자~나까~리~ 호띠, 아~로끼떼 위로끼떼 삼빠자~나까~리~ 호띠, 사민지떼 빠사~리떼 삼빠자~나까~리~ 호띠, 상가~띠빳따찌~와라다~라네 삼빠자~나까~리~ 호띠, 아시떼 삐~떼 카~이떼 사~이떼 삼빠자~나까~리~ 호띠, 욱짜~라빳사~와깜메 삼빠자~나까~리~ 호띠, 가떼 티떼 니신네 숫떼 자~가리떼 바~시떼 뚠히~바~웨 삼빠자~나까~리~ 호띠.',
    translation: V_SAMK, highlight: ['sampajānakārī','abhikkante','paṭikkante','ālokite','vilokite','samiñjite','pasārite','asite','pīte','sutte','jāgarite','bhāsite','tuṇhībhāve'] },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K, note: '🔁 후렴.' },
  { type: 'verse', pali: 'sampajānapabbaṃ niṭṭhitaṃ.', pronKo: '삼빠자~나빱방 닛티땅.', translation: '— 분명한 앎 항목 끝 —' },

  // ===== 신념처 ④ 32부정관(paṭikūlamanasikāra) =====
  { type: 'intro', icon: '🦴', title: '— ④ paṭikūlamanasikārapabba (32부정관) —', subtitle: '신념처 네 번째',
    description: '31~32가지 몸의 부분에 대한 관찰.' },

  // ── V_PATI1: 구조어 + 32부분 ──
  { type: 'teach', icon: '👇', word: 'imameva', pronKo: '이마메와', meaning: '바로 이것을',
    grammar: '대명사 대격 + 강조', baseForm: 'imaṃ(이것을) + eva(강조)',
    formNote: 'imaṃ + eva = "바로 이것을"\nidaṃ(이)의 대격 + 강조사', verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '⬆️', word: 'uddhaṃ', pronKo: '웃당', meaning: '위로',
    grammar: '부사', baseForm: 'uddhaṃ', verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🦶', word: 'pādatalā', pronKo: '빠~다딸라~', meaning: '발바닥에서 (탈격)',
    grammar: '중성명사, 탈격 단수', baseForm: 'pādatala (발바닥)',
    formNote: 'pāda(발) + tala(바닥) → 탈격 -ā ("~로부터")', verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '⬇️', word: 'adho', pronKo: '아도', meaning: '아래로',
    grammar: '부사', baseForm: 'adho', verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🧑‍🦱', word: 'kesamatthakā', pronKo: '께사맛타까~', meaning: '머리카락 끝에서 (탈격)',
    grammar: '복합어, 탈격 단수', baseForm: 'kesa(머리카락) + matthaka(끝/꼭대기)',
    formNote: 'kesa + matthaka + 탈격 -ā', verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🟫', word: 'tacapariyantaṃ', pronKo: '따짜빠리얀땅', meaning: '살갗까지 (대격 부사적)',
    grammar: '복합어, 대격 부사', baseForm: 'taca(살갗) + pariyanta(끝/경계)',
    formNote: 'taca + pariyanta(경계, 끝) → "살갗을 경계로"', verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🧿', word: 'pūraṃ', pronKo: '뿌~랑', meaning: '가득 찬',
    grammar: '형용사, 대격 중성 단수', baseForm: 'pūra (가득한)',
    formNote: '√pur(가득하다) → pūra → pūraṃ', verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🎨', word: 'nānappakārassa', pronKo: '나~납빠까~랏사', meaning: '갖가지의 (속격)',
    grammar: '복합어, 속격 단수', baseForm: 'nānā(여러) + pakāra(종류)',
    formNote: 'nānā + pakāra + 속격 -assa = "갖가지의"', verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🤢', word: 'asucino', pronKo: '아수찌노', meaning: '부정한 것의 (속격)',
    grammar: '남성명사, 속격 단수', baseForm: 'asuci (부정한 것)',
    formNote: 'a(부정) + suci(깨끗한) → asuci(불결한)\n-i 어간 속격 -ino',
    buddhism: '부정관(不淨觀)의 핵심 단어.', verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🔍', word: 'paccavekkhati', pronKo: '빳짜웩카띠', meaning: '관찰한다, 살핀다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'paccavekkhati (paṭi + ava + √ikkh)',
    formNote: 'paṭi(되돌려) + ava(아래로) + √ikkh(보다) = "되돌아 살펴봄"',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '📍', word: 'imasmiṃ', pronKo: '이마스밍', meaning: '이 (안에) (처격)',
    grammar: '지시대명사, 처격 남성/중성 단수', baseForm: 'idaṃ/ima',
    formNote: 'ima → imasmiṃ: 처격 -smiṃ\n"imasmiṃ kāye" = "이 몸에"', verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },

  // ── 32부분 ──
  { type: 'teach', icon: '🧑‍🦱', word: 'kesā', pronKo: '께사~', meaning: '머리카락 (복수)',
    grammar: '남성명사, 주격 복수', baseForm: 'kesa (머리카락)',
    formNote: '-a 어간 주격 복수 -ā', verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🦱', word: 'lomā', pronKo: '로마~', meaning: '몸털 (복수)',
    grammar: '중성명사, 주격 복수', baseForm: 'loma (몸털)',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '💅', word: 'nakhā', pronKo: '나카~', meaning: '손발톱 (복수)',
    grammar: '남성명사, 주격 복수', baseForm: 'nakha (손발톱)',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🦷', word: 'dantā', pronKo: '단따~', meaning: '이 (복수)',
    grammar: '남성명사, 주격 복수', baseForm: 'danta (이)',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🟫', word: 'taco', pronKo: '따쪼', meaning: '살갗 (주격 단수)',
    grammar: '남성명사, 주격 단수', baseForm: 'taca (살갗)',
    formNote: 'taca → taco: -a 어간 주격 -o',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🥩', word: 'maṃsaṃ', pronKo: '망상', meaning: '살, 살점',
    grammar: '중성명사, 주격 단수', baseForm: 'maṃsa',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🧬', word: 'nhāru', pronKo: '냐~루', meaning: '힘줄',
    grammar: '남성명사, 주격 단수', baseForm: 'nhāru (=nahāru)',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🦴', word: 'aṭṭhi', pronKo: '앗티', meaning: '뼈',
    grammar: '중성명사, 주격 단수', baseForm: 'aṭṭhi',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🦴', word: 'aṭṭhimiñjaṃ', pronKo: '앗티민장', meaning: '골수',
    grammar: '복합어, 주격 중성 단수', baseForm: 'aṭṭhi(뼈) + miñja(고갱이/심)',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🫘', word: 'vakkaṃ', pronKo: '왁깡', meaning: '콩팥',
    grammar: '중성명사, 주격 단수', baseForm: 'vakka',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '❤️', word: 'hadayaṃ', pronKo: '하다양', meaning: '심장',
    grammar: '중성명사, 주격 단수', baseForm: 'hadaya',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🟤', word: 'yakanaṃ', pronKo: '야까낭', meaning: '간',
    grammar: '중성명사, 주격 단수', baseForm: 'yakana',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🎽', word: 'kilomakaṃ', pronKo: '낄로마깡', meaning: '늑막',
    grammar: '중성명사, 주격 단수', baseForm: 'kilomaka',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🫛', word: 'pihakaṃ', pronKo: '삐하깡', meaning: '비장',
    grammar: '중성명사, 주격 단수', baseForm: 'pihaka',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🫁', word: 'papphāsaṃ', pronKo: '빱파~상', meaning: '폐',
    grammar: '중성명사, 주격 단수', baseForm: 'papphāsa',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🌀', word: 'antaṃ', pronKo: '안땅', meaning: '창자',
    grammar: '중성명사, 주격 단수', baseForm: 'anta',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🌀', word: 'antaguṇaṃ', pronKo: '안따구낭', meaning: '장간막',
    grammar: '복합어, 주격 중성 단수', baseForm: 'anta(창자) + guṇa(꼰 것)',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🍚', word: 'udariyaṃ', pronKo: '우다리양', meaning: '위 속의 음식',
    grammar: '중성명사, 주격 단수', baseForm: 'udariya (udara=위)',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '💩', word: 'karīsaṃ', pronKo: '까리~상', meaning: '똥',
    grammar: '중성명사, 주격 단수', baseForm: 'karīsa',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '💚', word: 'pittaṃ', pronKo: '삣땅', meaning: '담즙',
    grammar: '중성명사, 주격 단수', baseForm: 'pitta',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🤧', word: 'semhaṃ', pronKo: '셈항', meaning: '가래',
    grammar: '중성명사, 주격 단수', baseForm: 'semha',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🟡', word: 'pubbo', pronKo: '뿝보', meaning: '고름',
    grammar: '남성명사, 주격 단수', baseForm: 'pubba',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🩸', word: 'lohitaṃ', pronKo: '로히땅', meaning: '피',
    grammar: '중성명사, 주격 단수', baseForm: 'lohita',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '💦', word: 'sedo', pronKo: '세도', meaning: '땀',
    grammar: '남성명사, 주격 단수', baseForm: 'seda',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🟨', word: 'medo', pronKo: '메도', meaning: '굳기름 (지방)',
    grammar: '남성명사, 주격 단수', baseForm: 'meda',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '💧', word: 'assu', pronKo: '앗수', meaning: '눈물',
    grammar: '중성명사, 주격 단수', baseForm: 'assu',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🧈', word: 'vasā', pronKo: '와사~', meaning: '기름 (유동지방)',
    grammar: '여성명사, 주격 단수', baseForm: 'vasā',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '😛', word: 'kheḷo', pronKo: '켈로', meaning: '침',
    grammar: '남성명사, 주격 단수', baseForm: 'kheḷa',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🤧', word: 'siṅghāṇikā', pronKo: '싱가~니까~', meaning: '콧물',
    grammar: '여성명사, 주격 단수', baseForm: 'siṅghāṇikā',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '💧', word: 'lasikā', pronKo: '라시까~', meaning: '관절액',
    grammar: '여성명사, 주격 단수', baseForm: 'lasikā',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },
  { type: 'teach', icon: '🚽', word: 'muttaṃ', pronKo: '뭇땅', meaning: '오줌',
    grammar: '중성명사, 주격 단수', baseForm: 'mutta',
    verseLine: V_PATI1, verseLineKo: V_PATI1K, audio: true },

  { type: 'verse', pali: V_PATI1, pronKo: '뿌나 짜빠랑, 빅카웨, 빅쿠 이마메와 까~양 웃당 빠~다딸라~ 아도 께사맛타까~ 따짜빠리얀땅 뿌~랑 나~납빠까~랏사 아수찌노 빳짜웩카띠 — \'앗티 이마스밍 까~예 께사~ 로마~ 나카~ 단따~ 따쪼...\'',
    translation: V_PATI1K, highlight: ['imameva','paccavekkhati','asucino','kesā','lomā','nakhā','dantā','taco','maṃsaṃ','aṭṭhi','hadayaṃ','lohitaṃ','muttaṃ'],
    note: '🦴 31가지 신체 부위 — kesā(머리카락)부터 muttaṃ(오줌)까지.' },

  // ── V_PATI2: 자루 비유 ──
  { type: 'teach', icon: '👜', word: 'ubhatomukhā', pronKo: '우바또무카~', meaning: '양쪽에 입구 있는',
    grammar: '형용사, 주격 여성 단수', baseForm: 'ubhato(양쪽으로) + mukha(입구)',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '👝', word: 'putoḷi', pronKo: '뿌똘리', meaning: '자루, 주머니',
    grammar: '여성명사, 주격 단수', baseForm: 'putoḷi',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '🌾', word: 'dhaññassa', pronKo: '단냣사', meaning: '곡식의 (속격)',
    grammar: '중성명사, 속격 단수', baseForm: 'dhañña (곡식)',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '👇', word: 'seyyathidaṃ', pronKo: '셋야티당', meaning: '곧, 즉, 다음과 같이',
    grammar: '도입 정형구', baseForm: 'seyyathā(어떻게) + idaṃ(이)',
    formNote: '"즉, 다음과 같이" — 항목 열거 도입',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '🍚', word: 'sālīnaṃ', pronKo: '사~리~낭', meaning: '산미(고급쌀)의 (속격 복수)',
    grammar: '남성명사, 속격 복수', baseForm: 'sāli',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '🌾', word: 'vīhīnaṃ', pronKo: '위~히~낭', meaning: '벼의 (속격 복수)',
    grammar: '남성명사, 속격 복수', baseForm: 'vīhi (벼)',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '🫘', word: 'muggānaṃ', pronKo: '묵가~낭', meaning: '녹두의 (속격 복수)',
    grammar: '남성명사, 속격 복수', baseForm: 'mugga',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '🫛', word: 'māsānaṃ', pronKo: '마~사~낭', meaning: '검은콩의 (속격 복수)',
    grammar: '남성명사, 속격 복수', baseForm: 'māsa',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '🌱', word: 'tilānaṃ', pronKo: '띨라~낭', meaning: '참깨의 (속격 복수)',
    grammar: '중성명사, 속격 복수', baseForm: 'tila',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '🍚', word: 'taṇḍulānaṃ', pronKo: '딴둘라~낭', meaning: '도정한 쌀의 (속격 복수)',
    grammar: '남성명사, 속격 복수', baseForm: 'taṇḍula',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '👉', word: 'tamenaṃ', pronKo: '따메낭', meaning: '그것을',
    grammar: '대명사 복합', baseForm: 'taṃ + enaṃ',
    formNote: 'taṃ(그것) + enaṃ(이것) 강조 결합',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '👁️', word: 'cakkhumā', pronKo: '짝쿠마~', meaning: '눈 있는 자',
    grammar: '형용사, 주격 남성 단수', baseForm: 'cakkhu(눈) + -mant',
    formNote: 'cakkhu + -mant → cakkhumā (주격)',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '🧔', word: 'puriso', pronKo: '뿌리소', meaning: '사람, 사내',
    grammar: '남성명사, 주격 단수', baseForm: 'purisa',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '🪢', word: 'muñcitvā', pronKo: '문찌뜨와~', meaning: '풀어서',
    grammar: '절대분사', baseForm: 'muñcati (풀다)',
    formNote: '√muc(풀다) + -tvā',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '🔍', word: 'paccavekkheyya', pronKo: '빳짜웩케이야', meaning: '관찰한다면 (가능법)',
    grammar: '동사 3인칭 단수 가능법(optative)', baseForm: 'paccavekkhati',
    formNote: '가능법(optative) -eyya = "~한다면, ~할 것이다"',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },
  { type: 'teach', icon: '🔢', word: 'ime', pronKo: '이메', meaning: '이것들 (주격 복수)',
    grammar: '지시대명사, 주격 남성 복수', baseForm: 'ima',
    verseLine: V_PATI2, verseLineKo: V_PATI2K, audio: true },

  { type: 'verse', pali: V_PATI2, pronKo: '셋야타~삐, 빅카웨, 우바또무카~ 뿌똘리 뿌~라~ 나~나~위히땃사 단냣사, 셋야티당 사~리~낭 위~히~낭 묵가~낭 마~사~낭 띨라~낭 딴둘라~낭. 따메낭 짝쿠마~ 뿌리소 문찌뜨와~ 빳짜웩케이야 — \'이메 사~리~, 이메 위~히~ 이메 묵가~ 이메 마~사~ 이메 띨라~ 이메 딴둘라~\'띠.',
    translation: V_PATI2K, highlight: ['ubhatomukhā','putoḷi','dhaññassa','seyyathidaṃ','sālīnaṃ','vīhīnaṃ','muggānaṃ','māsānaṃ','tilānaṃ','taṇḍulānaṃ','cakkhumā','puriso','muñcitvā','paccavekkheyya'],
    note: '🌾 비유: 두 입구 자루에 든 여섯 가지 곡식.' },

  { type: 'teach', icon: '🟰', word: 'evameva kho', pronKo: '에와메와 코', meaning: '바로 이와 같이',
    grammar: '비유 결론 정형구', baseForm: 'evaṃ + eva + kho',
    formNote: '비유 적용 도입. "녹로공처럼, 자루처럼 — 비구도 마찬가지로"',
    verseLine: V_PATI3, verseLineKo: V_PATI3K, audio: true },
  { type: 'verse', pali: V_PATI3, pronKo: '에와메와 코, 빅카웨, 빅쿠 이마메와 까~양 웃당 빠~다딸라~ 아도 께사맛타까~ 따짜빠리얀땅 뿌~랑 나~납빠까~랏사 아수찌노 빳짜웩카띠 — \'앗티 이마스밍 까~예 께사~ 로마~...\'',
    translation: V_PATI3K, note: '🦴 비유 적용: 곡식 자루 살피듯 32부분 살핌.' },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K, note: '🔁 후렴.' },
  { type: 'verse', pali: 'paṭikūlamanasikārapabbaṃ niṭṭhitaṃ.', pronKo: '빠띠꿀~라마나시까~라빱방 닛티땅.', translation: '— 부정관 항목 끝 —' },

  { type: 'quiz', question: '32부정관의 첫 5부분은?', options: ['머리카락·몸털·손발톱·이·살갗', '눈·귀·코·혀·몸', '간·심장·폐·콩팥·비장', '발·다리·배·가슴·머리'], answer: 0 },

  // ===== 신념처 ⑤ 사대 요소(dhātumanasikāra) =====
  { type: 'intro', icon: '🌍', title: '— ⑤ dhātumanasikārapabba (사대) —', subtitle: '신념처 다섯 번째',
    description: '지·수·화·풍 네 가지 요소 관찰.' },

  // ── V_DHA1 단어 학습 ──
  { type: 'teach', icon: '📐', word: 'yathāṭhitaṃ', pronKo: '야타~티땅', meaning: '있는 그대로',
    grammar: '복합어, 대격 부사', baseForm: 'yathā(어떻게) + ṭhita(놓여있는)',
    formNote: 'yathā + ṭhita = "있는 자세 그대로"',
    verseLine: V_DHA1, verseLineKo: V_DHA1K, audio: true },
  { type: 'teach', icon: '📐', word: 'yathāpaṇihitaṃ', pronKo: '야타~빠니히땅', meaning: '놓여 있는 그대로',
    grammar: '복합어, 대격 부사', baseForm: 'yathā + paṇihita(놓인)',
    formNote: 'yathā + paṇihita = "놓인 자세 그대로"',
    verseLine: V_DHA1, verseLineKo: V_DHA1K, audio: true },
  { type: 'teach', icon: '🧩', word: 'dhātuso', pronKo: '다~뚜소', meaning: '요소에 따라',
    grammar: '부사 (탈격적)', baseForm: 'dhātu(요소) + -so',
    formNote: 'dhātu + -so 부사 접미사 = "요소별로"',
    buddhism: '계(界). 물질의 근본 성질.',
    verseLine: V_DHA1, verseLineKo: V_DHA1K, audio: true },
  { type: 'teach', icon: '🌍', word: 'pathavīdhātu', pronKo: '빠타위~다~뚜', meaning: '땅의 요소',
    grammar: '여성명사, 주격 단수', baseForm: 'pathavī(땅) + dhātu',
    formNote: 'pathavī(땅) + dhātu(요소) — 단단함/연함',
    buddhism: '지대(地大). 단단함 성질.',
    verseLine: V_DHA1, verseLineKo: V_DHA1K, audio: true },
  { type: 'teach', icon: '💧', word: 'āpodhātu', pronKo: '아~뽀다~뚜', meaning: '물의 요소',
    grammar: '여성명사, 주격 단수', baseForm: 'āpo(물) + dhātu',
    formNote: 'āpo + dhātu — 응집/유동',
    buddhism: '수대(水大). 응집 성질.',
    verseLine: V_DHA1, verseLineKo: V_DHA1K, audio: true },
  { type: 'teach', icon: '🔥', word: 'tejodhātu', pronKo: '떼조다~뚜', meaning: '불의 요소',
    grammar: '여성명사, 주격 단수', baseForm: 'tejo(불/열) + dhātu',
    formNote: 'tejo + dhātu — 따뜻함/차가움',
    buddhism: '화대(火大). 온도 성질.',
    verseLine: V_DHA1, verseLineKo: V_DHA1K, audio: true },
  { type: 'teach', icon: '💨', word: 'vāyodhātu', pronKo: '와~요다~뚜', meaning: '바람의 요소',
    grammar: '여성명사, 주격 단수', baseForm: 'vāyo(바람) + dhātu',
    formNote: 'vāyo + dhātu — 움직임/지탱',
    buddhism: '풍대(風大). 운동 성질.',
    verseLine: V_DHA1, verseLineKo: V_DHA1K, audio: true },

  { type: 'verse', pali: V_DHA1, pronKo: '378. 뿌나 짜빠랑, 빅카웨, 빅쿠 이마메와 까~양 야타~티땅 야타~빠니히땅 다~뚜소 빳짜웩카띠 — \'앗티 이마스밍 까~예 빠타위~다~뚜 아~뽀다~뚜 떼조다~뚜 와~요다~뚜~\'띠.',
    translation: V_DHA1K, highlight: ['yathāṭhitaṃ','yathāpaṇihitaṃ','dhātuso','pathavīdhātu','āpodhātu','tejodhātu','vāyodhātu'],
    note: '🌍 사대(四大): 땅·물·불·바람.' },

  // ── V_DHA2: 백정 비유 ──
  { type: 'teach', icon: '🥩', word: 'goghātako', pronKo: '고가~따꼬', meaning: '백정 (소 잡는 자)',
    grammar: '남성명사, 주격 단수', baseForm: 'go(소) + ghātaka(살해자)',
    formNote: 'go(소) + ghātaka(죽이는 자) = 백정',
    verseLine: V_DHA2, verseLineKo: V_DHA2K, audio: true },
  { type: 'teach', icon: '🎓', word: 'goghātakantevāsī', pronKo: '고가~따깐떼와~시~', meaning: '백정의 제자',
    grammar: '복합어, 주격 남성 단수', baseForm: 'goghātaka + antevāsin',
    verseLine: V_DHA2, verseLineKo: V_DHA2K, audio: true },
  { type: 'teach', icon: '🐄', word: 'gāviṃ', pronKo: '가~윙', meaning: '소를 (대격)',
    grammar: '여성명사, 대격 단수', baseForm: 'gāvī (암소)',
    verseLine: V_DHA2, verseLineKo: V_DHA2K, audio: true },
  { type: 'teach', icon: '🔪', word: 'vadhitvā', pronKo: '와디뜨와~', meaning: '죽이고서',
    grammar: '절대분사', baseForm: 'vadhati (죽이다)',
    formNote: '√vadh(죽이다) + -tvā',
    verseLine: V_DHA2, verseLineKo: V_DHA2K, audio: true },
  { type: 'teach', icon: '➕', word: 'catumahāpathe', pronKo: '짜뚜마하~빠테', meaning: '사거리에서 (처격)',
    grammar: '복합어, 처격 단수', baseForm: 'catu(넷) + mahā(큰) + patha(길)',
    formNote: '네 큰 길이 만나는 곳 = 사거리',
    verseLine: V_DHA2, verseLineKo: V_DHA2K, audio: true },
  { type: 'teach', icon: '✂️', word: 'bilaso', pronKo: '빌라소', meaning: '부위별로, 조각조각',
    grammar: '부사', baseForm: 'bila(조각) + -so',
    verseLine: V_DHA2, verseLineKo: V_DHA2K, audio: true },
  { type: 'teach', icon: '🪓', word: 'vibhajitvā', pronKo: '위바지뜨와~', meaning: '나누어',
    grammar: '절대분사', baseForm: 'vibhajati (나누다)',
    formNote: 'vi(분리) + √bhaj(나누다) + -tvā',
    verseLine: V_DHA2, verseLineKo: V_DHA2K, audio: true },
  { type: 'teach', icon: '🪑', word: 'assa', pronKo: '앗사', meaning: '될 것이다 / ~의',
    grammar: '동사 가능법 3인칭 단수 OR 속격 대명사', baseForm: 'atthi(있다) 가능법 / ta(그)의 속격',
    formNote: '문맥에 따라:\n• atthi의 optative: "있을 것이다"\n• ta(그)의 속격: "그의"',
    verseLine: V_DHA2, verseLineKo: V_DHA2K, audio: true },

  { type: 'verse', pali: V_DHA2, pronKo: '셋야타~삐, 빅카웨, 닥코 고가~따꼬 와~ 고가~따깐떼와~시~ 와~ 가~윙 와디뜨와~ 짜뚜마하~빠테 빌라소 위바지뜨와~ 니신노 앗사, 에와메와 코, 빅카웨, 빅쿠 이마메와 까~양 야타~티땅 야타~빠니히땅 다~뚜소 빳짜웩카띠...',
    translation: V_DHA2K, highlight: ['goghātako','gāviṃ','vadhitvā','catumahāpathe','bilaso','vibhajitvā'],
    note: '🔪 비유: 백정이 소를 사거리에서 부위별로 가른 것.' },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K, note: '🔁 후렴.' },
  { type: 'verse', pali: 'dhātumanasikārapabbaṃ niṭṭhitaṃ.', pronKo: '다~뚜마나시까~라빱방 닛티땅.', translation: '— 사대 항목 끝 —' },

  { type: 'quiz', question: '4대(catur dhātu)는?', options: ['땅·물·불·바람', '하늘·땅·인간·신', '계·정·혜·해탈', '신·구·의·법'], answer: 0 },

  // ===== 신념처 ⑥ 9가지 묘지관(navasivathika) =====
  { type: 'intro', icon: '⚰️', title: '— ⑥ navasivathikapabba (9가지 묘지관) —', subtitle: '신념처 여섯 번째',
    description: '시체의 9단계 변화 관찰.' },

  // ── 공통 단어 (9단계 모두에 등장) ──
  { type: 'teach', icon: '👁️', word: 'passeyya', pronKo: '빳셰이야', meaning: '본다면 (가능법)',
    grammar: '동사 3인칭 단수 가능법', baseForm: 'passati (보다)',
    formNote: '√pas(보다)의 가능법(optative) -eyya = "본다면"',
    verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '💀', word: 'sarīraṃ', pronKo: '사리~랑', meaning: '시체, 몸',
    grammar: '중성명사, 대격 단수', baseForm: 'sarīra',
    formNote: '"몸"이지만 묘지관 맥락에서 "시체"', verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '🪦', word: 'sivathikāya', pronKo: '시와티까~야', meaning: '묘지에 (처격)',
    grammar: '여성명사, 처격 단수', baseForm: 'sivathikā (묘지)',
    formNote: '-ā 어간 처격 -āya', verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '🗑️', word: 'chaḍḍitaṃ', pronKo: '찻디땅', meaning: '버려진',
    grammar: '과거분사, 대격 중성 단수', baseForm: 'chaḍḍeti (버리다)',
    formNote: '√chaḍḍ(버리다)의 과거분사', verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '🔄', word: 'upasaṃharati', pronKo: '우빠상하라띠', meaning: '견주어 본다, 비교한다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'upasaṃharati (upa- + saṃ- + √har)',
    formNote: 'upa(가까이) + saṃ(함께) + √har(가져가다) = "가까이 가져와 비교"\n묘지관 핵심 동사',
    verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '👉', word: 'ayampi', pronKo: '아얌삐', meaning: '이것도',
    grammar: '대명사 + api', baseForm: 'ayaṃ(이) + api(또한)',
    formNote: 'ayaṃ + api = "이것 또한"', verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '🌀', word: 'evaṃdhammo', pronKo: '에왕담모', meaning: '이런 본성의',
    grammar: '형용사, 주격 남성 단수', baseForm: 'evaṃ(이렇게) + dhamma(법/본성)',
    formNote: 'evaṃ(이렇게) + dhamma(본성)\n"이런 본성을 가진"', verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '🔮', word: 'evaṃbhāvī', pronKo: '에왕바~위~', meaning: '이렇게 될 (운명의)',
    grammar: '형용사, 주격 남성 단수', baseForm: 'evaṃ + bhāvin (될 자)',
    formNote: 'evaṃ + bhāvin(될 자) = "이렇게 될 운명"', verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '🚫', word: 'evaṃanatīto', pronKo: '에왕아나띠~또', meaning: '이를 벗어나지 못하는',
    grammar: '형용사, 주격 남성 단수', baseForm: 'evaṃ + an-atīta (넘지 못한)',
    formNote: 'evaṃ + an(부정) + atīta(넘은) = "이를 벗어날 수 없는"\n묘지관의 핵심 통찰: 누구도 죽음을 피할 수 없음',
    verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },

  // ── V_SIV1: 1-3일 부패 단계 ──
  { type: 'teach', icon: '📅', word: 'ekāhamataṃ', pronKo: '에까~하마땅', meaning: '하루 죽은',
    grammar: '복합어, 대격 중성 단수', baseForm: 'ekāha(하루) + mata(죽은)',
    formNote: 'eka(하나) + aha(날) + mata(죽은)', verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '📅', word: 'dvīhamataṃ', pronKo: '드위~하마땅', meaning: '이틀 죽은',
    grammar: '복합어, 대격 중성 단수', baseForm: 'dvi(둘) + aha + mata',
    verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '📅', word: 'tīhamataṃ', pronKo: '띠~하마땅', meaning: '사흘 죽은',
    grammar: '복합어, 대격 중성 단수', baseForm: 'ti(셋) + aha + mata',
    verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '🎈', word: 'uddhumātakaṃ', pronKo: '웃두마~따깡', meaning: '부푼',
    grammar: '형용사, 대격 중성 단수', baseForm: 'uddhumātaka',
    formNote: '시체가 가스로 팽창한 상태', verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '💜', word: 'vinīlakaṃ', pronKo: '위니~라깡', meaning: '검푸른',
    grammar: '형용사, 대격 중성 단수', baseForm: 'vinīlaka (vi-nīla=짙은 푸른)',
    verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },
  { type: 'teach', icon: '🟢', word: 'vipubbakajātaṃ', pronKo: '위뿝바까자~땅', meaning: '고름이 흐르는',
    grammar: '복합어, 대격 중성 단수', baseForm: 'vipubbaka(고름) + jāta(생긴)',
    verseLine: V_SIV1, verseLineKo: V_SIV1K, audio: true },

  { type: 'verse', pali: V_SIV1, pronKo: '뿌나 짜빠랑, 빅카웨, 빅쿠 셰이야타~삐 빳셰이야 사리~랑 시와티까~야 찻디땅 에까~하마땅 와~ 드위~하마땅 와~ 띠~하마땅 와~ 웃두마~따깡 위니~라깡 위뿝바까자~땅. 소 이마메와 까~양 우빠상하라띠 — \'아얌삐 코 까~요 에왕담모 에왕바~위~ 에왕아나띠~또\'띠.',
    translation: V_SIV1K, highlight: ['passeyya','sarīraṃ','sivathikāya','chaḍḍitaṃ','ekāhamataṃ','uddhumātakaṃ','vinīlakaṃ','vipubbakajātaṃ','upasaṃharati','evaṃdhammo','evaṃbhāvī','evaṃanatīto'],
    note: '⚰️ 묘지관 1: 부풀고 검푸르며 고름 흐르는 시체.' },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K },

  // ── V_SIV2: 짐승에 먹히는 단계 ──
  { type: 'teach', icon: '🦅', word: 'kākehi', pronKo: '까~께히', meaning: '까마귀들에 (의해)',
    grammar: '남성명사, 도구격 복수', baseForm: 'kāka (까마귀)',
    formNote: '-a 어간 도구격 복수 -ehi', verseLine: V_SIV2, verseLineKo: V_SIV2K, audio: true },
  { type: 'teach', icon: '🍽️', word: 'khajjamānaṃ', pronKo: '캇자마~낭', meaning: '먹히는',
    grammar: '수동 현재분사, 대격 중성 단수', baseForm: 'khādati (먹다)의 수동',
    formNote: '√khād(먹다) 수동 현재분사 = "먹히고 있는"', verseLine: V_SIV2, verseLineKo: V_SIV2K, audio: true },
  { type: 'teach', icon: '🦅', word: 'kulalehi', pronKo: '꿀라레히', meaning: '매들에 (도구격)',
    grammar: '남성명사, 도구격 복수', baseForm: 'kulala (매)',
    verseLine: V_SIV2, verseLineKo: V_SIV2K, audio: true },
  { type: 'teach', icon: '🦅', word: 'gijjhehi', pronKo: '깃제히', meaning: '독수리들에 (도구격)',
    grammar: '남성명사, 도구격 복수', baseForm: 'gijjha (독수리)',
    verseLine: V_SIV2, verseLineKo: V_SIV2K, audio: true },
  { type: 'teach', icon: '🦢', word: 'kaṅkehi', pronKo: '깡께히', meaning: '백로들에 (도구격)',
    grammar: '남성명사, 도구격 복수', baseForm: 'kaṅka (백로)',
    verseLine: V_SIV2, verseLineKo: V_SIV2K, audio: true },
  { type: 'teach', icon: '🐕', word: 'sunakhehi', pronKo: '수나케히', meaning: '개들에 (도구격)',
    grammar: '남성명사, 도구격 복수', baseForm: 'sunakha (개)',
    verseLine: V_SIV2, verseLineKo: V_SIV2K, audio: true },
  { type: 'teach', icon: '🐅', word: 'byagghehi', pronKo: '뱍게히', meaning: '호랑이들에 (도구격)',
    grammar: '남성명사, 도구격 복수', baseForm: 'byaggha (호랑이)',
    verseLine: V_SIV2, verseLineKo: V_SIV2K, audio: true },
  { type: 'teach', icon: '🐆', word: 'dīpīhi', pronKo: '디~삐~히', meaning: '표범들에 (도구격)',
    grammar: '남성명사, 도구격 복수', baseForm: 'dīpī (표범)',
    verseLine: V_SIV2, verseLineKo: V_SIV2K, audio: true },
  { type: 'teach', icon: '🐺', word: 'siṅgālehi', pronKo: '싱갈~레히', meaning: '자칼들에 (도구격)',
    grammar: '남성명사, 도구격 복수', baseForm: 'siṅgāla (자칼)',
    verseLine: V_SIV2, verseLineKo: V_SIV2K, audio: true },
  { type: 'teach', icon: '🎨', word: 'vividhehi', pronKo: '위위데히', meaning: '갖가지에 (도구격 복수)',
    grammar: '형용사, 도구격 복수', baseForm: 'vividha (다양한)',
    verseLine: V_SIV2, verseLineKo: V_SIV2K, audio: true },
  { type: 'teach', icon: '🐛', word: 'pāṇakajātehi', pronKo: '빠~나까자~떼히', meaning: '벌레들에 (도구격)',
    grammar: '복합어, 도구격 복수', baseForm: 'pāṇaka(벌레) + jāta(생물)',
    verseLine: V_SIV2, verseLineKo: V_SIV2K, audio: true },

  { type: 'verse', pali: V_SIV2, pronKo: '뿌나 짜빠랑... 사리~랑... 까~께히 와~ 캇자마~낭 꿀라레히 와~... 깃제히 와~... 깡께히 와~... 수나케히 와~... 뱍게히 와~... 디~삐~히 와~... 싱갈~레히 와~... 위위데히 와~ 빠~나까자~떼히 캇자마~낭.',
    translation: V_SIV2K, highlight: ['kākehi','khajjamānaṃ','kulalehi','gijjhehi','sunakhehi','byagghehi','dīpīhi','siṅgālehi','pāṇakajātehi'],
    note: '🦅 묘지관 2: 짐승·새·벌레에 뜯어 먹히는 시체.' },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K },

  // ── V_SIV3-5: 해골 3단계 ──
  { type: 'teach', icon: '💀', word: 'aṭṭhikasaṅkhalikaṃ', pronKo: '앗티까상칼리깡', meaning: '해골, 골격',
    grammar: '복합어, 대격 중성 단수', baseForm: 'aṭṭhika(뼈) + saṅkhalikā(연결체)',
    formNote: 'aṭṭhika + saṅkhalikā(사슬) = 뼈 사슬 = 해골',
    verseLine: V_SIV3, verseLineKo: V_SIV3K, audio: true },
  { type: 'teach', icon: '🥩', word: 'samaṃsalohitaṃ', pronKo: '사망살로히땅', meaning: '살과 피가 붙은',
    grammar: '복합어, 대격 중성 단수', baseForm: 'sa(있는) + maṃsa(살) + lohita(피)',
    verseLine: V_SIV3, verseLineKo: V_SIV3K, audio: true },
  { type: 'teach', icon: '🧬', word: 'nhārusambandhaṃ', pronKo: '나~루삼반당', meaning: '힘줄로 이어진',
    grammar: '복합어, 대격 중성 단수', baseForm: 'nhāru(힘줄) + sambandha(연결)',
    verseLine: V_SIV3, verseLineKo: V_SIV3K, audio: true },

  { type: 'verse', pali: V_SIV3, pronKo: '뿌나 짜빠랑... 앗티까상칼리깡 사망살로히땅 나~루삼반당 소 이마메와 까~양 우빠상하라띠...',
    translation: V_SIV3K, highlight: ['aṭṭhikasaṅkhalikaṃ','samaṃsalohitaṃ','nhārusambandhaṃ'],
    note: '🦴 묘지관 3: 살·피·힘줄이 붙은 해골.' },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K },

  { type: 'teach', icon: '🩸', word: 'nimaṃsalohitamakkhitaṃ', pronKo: '니마살로히따막키땅', meaning: '살은 없고 피만 묻은',
    grammar: '복합어, 대격 중성 단수', baseForm: 'ni(없는) + maṃsa + lohita + makkhita(묻은)',
    verseLine: V_SIV4, verseLineKo: V_SIV4K, audio: true },

  { type: 'verse', pali: V_SIV4, pronKo: '뿌나 짜빠랑... 앗티까상칼리깡 니마살로히따막키땅 나~루삼반당...',
    translation: V_SIV4K, highlight: ['nimaṃsalohitamakkhitaṃ'],
    note: '🦴 묘지관 4: 살 없이 피만 묻은 해골.' },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K },

  { type: 'teach', icon: '🦴', word: 'apagatamaṃsalohitaṃ', pronKo: '아빠가따마살로히땅', meaning: '살과 피가 사라진',
    grammar: '복합어, 대격 중성 단수', baseForm: 'apagata(떠난) + maṃsa + lohita',
    verseLine: V_SIV5, verseLineKo: V_SIV5K, audio: true },

  { type: 'verse', pali: V_SIV5, pronKo: '뿌나 짜빠랑... 앗티까상칼리깡 아빠가따마살로히땅 나~루삼반당...',
    translation: V_SIV5K, highlight: ['apagatamaṃsalohitaṃ'],
    note: '🦴 묘지관 5: 살·피 모두 사라진 해골(힘줄로만 이어진).' },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K },

  // ── V_SIV6: 흩어진 뼈들 ──
  { type: 'teach', icon: '🦴', word: 'aṭṭhikāni', pronKo: '앗티까~니', meaning: '뼈들 (대격 복수)',
    grammar: '중성명사, 대격 복수', baseForm: 'aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🔓', word: 'apagatasambandhāni', pronKo: '아빠가따삼반다~니', meaning: '연결이 풀린',
    grammar: '복합어, 대격 중성 복수', baseForm: 'apagata + sambandha',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🧭', word: 'disā vidisā', pronKo: '디사~ 위디사~', meaning: '사방팔방으로',
    grammar: '부사 (장소)', baseForm: 'disā(방향) + vidisā(중간 방향)',
    formNote: 'disā(동서남북) + vidisā(북동·북서 등) = 모든 방향',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '💨', word: 'vikkhittāni', pronKo: '윅킷따~니', meaning: '흩어진',
    grammar: '과거분사, 대격 중성 복수', baseForm: 'vikkhipati (흩뜨리다)',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🔀', word: 'aññena', pronKo: '안녜나', meaning: '다른 곳에',
    grammar: '대명사, 도구격 단수 (부사적)', baseForm: 'añña (다른)',
    formNote: 'aññena ... aññena = "한쪽에... 다른 쪽에"', verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '✋', word: 'hatthaṭṭhikaṃ', pronKo: '핫탓티깡', meaning: '손뼈',
    grammar: '복합어, 대격', baseForm: 'hattha(손) + aṭṭhika(뼈)',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🦶', word: 'pādaṭṭhikaṃ', pronKo: '빠~닷티깡', meaning: '발뼈',
    grammar: '복합어, 대격', baseForm: 'pāda(발) + aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🦴', word: 'gopphakaṭṭhikaṃ', pronKo: '곱파깟티깡', meaning: '발목뼈',
    grammar: '복합어, 대격', baseForm: 'gopphaka(발목) + aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🦴', word: 'jaṅghaṭṭhikaṃ', pronKo: '장갓티깡', meaning: '정강이뼈',
    grammar: '복합어, 대격', baseForm: 'jaṅgha(정강이) + aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🦴', word: 'ūruṭṭhikaṃ', pronKo: '우~룻티깡', meaning: '넙다리뼈',
    grammar: '복합어, 대격', baseForm: 'ūru(넙다리) + aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🦴', word: 'kaṭiṭṭhikaṃ', pronKo: '까띳티깡', meaning: '골반뼈',
    grammar: '복합어, 대격', baseForm: 'kaṭi(엉덩이) + aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🦴', word: 'phāsukaṭṭhikaṃ', pronKo: '파~수깟티깡', meaning: '갈비뼈',
    grammar: '복합어, 대격', baseForm: 'phāsukā(갈비) + aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🦴', word: 'piṭṭhiṭṭhikaṃ', pronKo: '삣팃티깡', meaning: '등뼈',
    grammar: '복합어, 대격', baseForm: 'piṭṭhi(등) + aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🦴', word: 'khandhaṭṭhikaṃ', pronKo: '칸닷티깡', meaning: '어깨뼈',
    grammar: '복합어, 대격', baseForm: 'khandha(어깨) + aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🦴', word: 'gīvaṭṭhikaṃ', pronKo: '기~왓티깡', meaning: '목뼈',
    grammar: '복합어, 대격', baseForm: 'gīvā(목) + aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🦴', word: 'hanukaṭṭhikaṃ', pronKo: '하누깟티깡', meaning: '턱뼈',
    grammar: '복합어, 대격', baseForm: 'hanuka(턱) + aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '🦷', word: 'dantaṭṭhikaṃ', pronKo: '단땃티깡', meaning: '이뼈',
    grammar: '복합어, 대격', baseForm: 'danta(이) + aṭṭhika',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },
  { type: 'teach', icon: '💀', word: 'sīsakaṭāhaṃ', pronKo: '시~사까따~항', meaning: '두개골',
    grammar: '복합어, 대격', baseForm: 'sīsa(머리) + kaṭāha(그릇/껍데기)',
    verseLine: V_SIV6, verseLineKo: V_SIV6K, audio: true },

  { type: 'verse', pali: V_SIV6, pronKo: '뿌나 짜빠랑... 앗티까~니 아빠가따삼반다~니 디사~ 위디사~ 윅킷따~니, 안녜나 핫탓티깡 안녜나 빠~닷티깡... 안녜나 시~사까따~항.',
    translation: V_SIV6K, highlight: ['aṭṭhikāni','apagatasambandhāni','disā','vidisā','vikkhittāni','hatthaṭṭhikaṃ','pādaṭṭhikaṃ','sīsakaṭāhaṃ'],
    note: '🦴 묘지관 6: 사방팔방 흩어진 뼈들 (13부위 명시).' },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K },

  // ── V_SIV7: 흰 뼈 ──
  { type: 'teach', icon: '⚪', word: 'setāni', pronKo: '세따~니', meaning: '흰 (대격 중성 복수)',
    grammar: '형용사, 대격 중성 복수', baseForm: 'seta (흰)',
    verseLine: V_SIV7, verseLineKo: V_SIV7K, audio: true },
  { type: 'teach', icon: '🐚', word: 'saṅkhavaṇṇapaṭibhāgāni', pronKo: '상카완나빠띠바~가~니', meaning: '소라색과 비슷한',
    grammar: '복합어, 대격 중성 복수', baseForm: 'saṅkha(소라) + vaṇṇa(색) + paṭibhāga(닮은)',
    verseLine: V_SIV7, verseLineKo: V_SIV7K, audio: true },

  { type: 'verse', pali: V_SIV7, pronKo: '뿌나 짜빠랑... 앗티까~니 세따~니 상카완나빠띠바~가~니...',
    translation: V_SIV7K, highlight: ['setāni','saṅkhavaṇṇapaṭibhāgāni'],
    note: '🦴 묘지관 7: 소라처럼 흰 뼈들.' },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K },

  // ── V_SIV8: 1년 묵은 뼈 ──
  { type: 'teach', icon: '🏔️', word: 'puñjakitāni', pronKo: '뿐자끼따~니', meaning: '더미진, 쌓인',
    grammar: '과거분사, 대격 중성 복수', baseForm: 'puñjakita (puñja=더미)',
    verseLine: V_SIV8, verseLineKo: V_SIV8K, audio: true },
  { type: 'teach', icon: '📅', word: 'terovassikāni', pronKo: '떼로왓시까~니', meaning: '1년 이상 묵은',
    grammar: '형용사, 대격 중성 복수', baseForm: 'tero(이상) + vassa(해/年) + -ika',
    verseLine: V_SIV8, verseLineKo: V_SIV8K, audio: true },

  { type: 'verse', pali: V_SIV8, pronKo: '뿌나 짜빠랑... 앗티까~니 뿐자끼따~니 떼로왓시까~니...',
    translation: V_SIV8K, highlight: ['puñjakitāni','terovassikāni'],
    note: '🦴 묘지관 8: 1년이 지나 쌓인 뼈들.' },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K },

  // ── V_SIV9: 가루로 부서진 뼈 ──
  { type: 'teach', icon: '🟫', word: 'pūtīni', pronKo: '뿌~띠~니', meaning: '썩은 (대격 중성 복수)',
    grammar: '형용사, 대격 중성 복수', baseForm: 'pūti (썩은)',
    verseLine: V_SIV9, verseLineKo: V_SIV9K, audio: true },
  { type: 'teach', icon: '🌫️', word: 'cuṇṇakajātāni', pronKo: '쭌나까자~따~니', meaning: '가루가 된',
    grammar: '복합어, 대격 중성 복수', baseForm: 'cuṇṇaka(가루) + jāta(된)',
    verseLine: V_SIV9, verseLineKo: V_SIV9K, audio: true },

  { type: 'verse', pali: V_SIV9, pronKo: '뿌나 짜빠랑... 앗티까~니 뿌~띠~니 쭌나까자~따~니. 소 이마메와 까~양 우빠상하라띠 — \'아얌삐 코 까~요 에왕담모 에왕바~위~ 에왕아나띠~또\'띠.',
    translation: V_SIV9K, highlight: ['pūtīni','cuṇṇakajātāni'],
    note: '🦴 묘지관 9: 썩어 가루가 된 뼈들 — 최종 단계.' },
  { type: 'verse', pali: REF_KAYA, pronKo: '이띠 앗잣땅 와~...', translation: REF_KAYA_K },

  { type: 'verse', pali: 'navasivathikapabbaṃ niṭṭhitaṃ.\ncuddasa kāyānupassanā niṭṭhitā.',
    pronKo: '나와시와티까빱방 닛티땅. 쭛다사 까~야~누빳사나~ 닛티따~.',
    translation: '— 9가지 묘지관 항목 끝. 14가지 신념처 끝. —',
    note: '✅ 신념처 14가지(호흡+자세+분명한앎+부정관+사대+묘지관9) 완료.' },

  { type: 'quiz', question: '14가지 kāyānupassanā에 포함되지 않는 것은?',
    options: ['호흡 관찰', '32가지 부정관', '9가지 묘지관', '7각지'], answer: 3, hint: '7각지는 법념처에 속함.' },
  { type: 'quiz', question: '9묘지관의 핵심 통찰 정형구는?',
    options: ['ayampi kho kāyo evaṃdhammo evaṃbhāvī evaṃanatīto', 'sabbe saṅkhārā aniccā', 'idaṃ dukkhaṃ', 'ekāyano maggo'], answer: 0, hint: '이 몸도 이런 본성, 이렇게 될 것, 벗어날 수 없음.' },

  // ===== 수념처(vedanānupassanā) =====
  { type: 'intro', icon: '💭', title: '— vedanānupassanā (수념처) —', subtitle: '느낌에서 느낌을 관찰',
    description: '즐거운·괴로운·중성 느낌 + 세속적/비세속적 구분.' },

  // ── V_VED1 단어 학습 ──
  { type: 'teach', icon: '😊', word: 'sukhaṃ', pronKo: '수캉', meaning: '즐거운 (대격)',
    grammar: '형용사/명사, 대격 단수', baseForm: 'sukha (즐거움)',
    formNote: 'sukha → sukhaṃ: 대격 -aṃ\nvedanaṃ을 수식', verseLine: V_VED1, verseLineKo: V_VED1K, audio: true },
  { type: 'teach', icon: '💭', word: 'vedanaṃ', pronKo: '웨다낭', meaning: '느낌을 (대격)',
    grammar: '여성명사, 대격 단수', baseForm: 'vedanā',
    formNote: 'vedanā → vedanaṃ: -ā 어간 대격 -aṃ',
    buddhism: '수(受). 12연기의 7번째.', verseLine: V_VED1, verseLineKo: V_VED1K, audio: true },
  { type: 'teach', icon: '🌡️', word: 'vedayamāno', pronKo: '웨다야마~노', meaning: '느끼는 자',
    grammar: '현재분사 (중간태), 주격 남성 단수', baseForm: 'vedeti (느끼다)',
    formNote: '√vid(알다/느끼다) 사역형의 중간태 현재분사\n"느끼며 있는 자"',
    verseLine: V_VED1, verseLineKo: V_VED1K, audio: true },
  { type: 'teach', icon: '🗣️', word: 'vedayāmī', pronKo: '웨다야~미~', meaning: '"나는 느낀다"',
    grammar: '동사 1인칭 단수 현재', baseForm: 'vedeti',
    formNote: '1인칭 단수 -mi + 인용 장모음화', verseLine: V_VED1, verseLineKo: V_VED1K, audio: true },
  { type: 'teach', icon: '😣', word: 'dukkhaṃ', pronKo: '둑캉', meaning: '괴로운 (대격)',
    grammar: '형용사/명사, 대격 단수', baseForm: 'dukkha (괴로움)',
    formNote: 'dukkha → dukkhaṃ: 대격 -aṃ',
    buddhism: '고(苦). 4성제의 첫째.', verseLine: V_VED1, verseLineKo: V_VED1K, audio: true },
  { type: 'teach', icon: '😐', word: 'adukkhamasukhaṃ', pronKo: '아둑카마수캉', meaning: '괴롭지도 즐겁지도 않은',
    grammar: '복합어, 대격 단수', baseForm: 'a(부정) + dukkha + a + sukha',
    formNote: 'a-dukkha(괴롭지 않은) + a-sukha(즐겁지 않은)\n중성 느낌',
    buddhism: '불고불락수(不苦不樂受).',
    verseLine: V_VED1, verseLineKo: V_VED1K, audio: true },

  { type: 'verse', pali: V_VED1, pronKo: '까탄짜 빠나, 빅카웨, 빅쿠 웨다나~수 웨다나~누빳시~ 위하라띠? 이다, 빅카웨, 빅쿠 수캉 와~ 웨다낭 웨다야마~노 \'수캉 웨다낭 웨다야~미~\'띠 빠자~나~띠. 둑캉 와~ 웨다낭 웨다야마~노 \'둑캉 웨다낭 웨다야~미~\'띠 빠자~나~띠. 아둑카마수캉 와~ 웨다낭 웨다야마~노 \'아둑카마수캉 웨다낭 웨다야~미~\'띠 빠자~나~띠.',
    translation: V_VED1K, highlight: ['sukhaṃ','vedanaṃ','vedayamāno','vedayāmī','dukkhaṃ','adukkhamasukhaṃ'],
    note: '💭 세 가지 느낌: 즐거움·괴로움·중성.' },

  // ── V_VED2: sāmisa/nirāmisa ──
  { type: 'teach', icon: '🍖', word: 'sāmisaṃ', pronKo: '사~미상', meaning: '세속적인 (미끼 있는)',
    grammar: '형용사, 대격 단수', baseForm: 'sāmisa (sa+āmisa)',
    formNote: 'sa(있는) + āmisa(미끼/세속) = "세속적, 감각적"\n오감의 즐거움/괴로움',
    verseLine: V_VED2, verseLineKo: V_VED2K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'nirāmisaṃ', pronKo: '니라~미상', meaning: '비세속적인 (미끼 없는)',
    grammar: '형용사, 대격 단수', baseForm: 'nirāmisa (nir+āmisa)',
    formNote: 'nir(없는) + āmisa(미끼) = "비세속적, 정신적"\n선정·통찰의 즐거움/괴로움',
    verseLine: V_VED2, verseLineKo: V_VED2K, audio: true },

  { type: 'verse', pali: V_VED2, pronKo: '사~미상 와~ 수캉 웨다낭 웨다야마~노 \'사~미상 수캉 웨다낭 웨다야~미~\'띠 빠자~나~띠, 니라~미상 와~ 수캉 웨다낭...',
    translation: V_VED2K, highlight: ['sāmisaṃ','nirāmisaṃ'],
    note: '🔄 세속적(sāmisaṃ) vs 비세속적(nirāmisaṃ) 구분 → 총 9가지.' },

  // ── REF_VED 후렴 (특수 단어 vedanā) ──
  { type: 'teach', icon: '📍', word: 'vedanāsu', pronKo: '웨다나~수', meaning: '느낌들에서 (처격 복수)',
    grammar: '여성명사, 처격 복수', baseForm: 'vedanā',
    formNote: 'vedanā → vedanāsu: -ā 어간 처격 복수 -āsu', verseLine: REF_VED, verseLineKo: REF_VED_K, audio: true },
  { type: 'verse', pali: REF_VED, pronKo: '이띠 앗잣땅 와~ 웨다나~수 웨다나~누빳시~ 위하라띠...',
    translation: REF_VED_K, note: '🔁 수념처 공통 후렴 (refrain 구조는 신념처와 동일, 대상만 vedanā로 바뀜).' },
  { type: 'verse', pali: 'vedanānupassanā niṭṭhitā.', pronKo: '웨다나~누빳사나~ 닛티따~.', translation: '— 수념처 끝 —' },

  { type: 'quiz', question: '수념처의 3종 느낌은?', options: ['색·성·향', '즐거움·괴로움·중립', '신·구·의', '과거·현재·미래'], answer: 1 },
  { type: 'quiz', question: '"sāmisaṃ" vs "nirāmisaṃ"의 차이는?', options: ['세속적 vs 비세속적', '큰 vs 작은', '과거 vs 현재', '몸 vs 마음'], answer: 0 },

  // ===== 심념처(cittānupassanā) =====
  { type: 'intro', icon: '🧠', title: '— cittānupassanā (심념처) —', subtitle: '마음에서 마음을 관찰',
    description: '16가지(8쌍) 마음 상태 관찰.' },

  // ── V_CIT1: 3독 ──
  { type: 'teach', icon: '🔥', word: 'sarāgaṃ', pronKo: '사라~강', meaning: '탐욕 있는',
    grammar: '형용사, 대격 중성 단수', baseForm: 'sa(있는) + rāga(탐욕)',
    formNote: 'sa-rāga = "탐욕 있는"\ncittaṃ을 수식',
    buddhism: '탐(貪). 3독의 첫째.', verseLine: V_CIT1, verseLineKo: V_CIT1K, audio: true },
  { type: 'teach', icon: '🧠', word: 'cittaṃ', pronKo: '찟땅', meaning: '마음을 (대격)',
    grammar: '중성명사, 대격 단수', baseForm: 'citta',
    formNote: 'citta → cittaṃ: -a 어간 중성 대격 -aṃ',
    buddhism: '심(心). 의식.', verseLine: V_CIT1, verseLineKo: V_CIT1K, audio: true },
  { type: 'teach', icon: '💬', word: 'cittan', pronKo: '찟딴', meaning: '"마음"이라고 (인용)',
    grammar: '중성명사 대격 + 인용 ti', baseForm: 'cittaṃ + ti',
    formNote: 'cittaṃ + ti → cittan (산디)\n인용 형태', verseLine: V_CIT1, verseLineKo: V_CIT1K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'vītarāgaṃ', pronKo: '위~따라~강', meaning: '탐욕을 떠난',
    grammar: '형용사, 대격 중성 단수', baseForm: 'vīta(떠난) + rāga(탐욕)',
    formNote: 'vīta(떠난, vi-ita) + rāga = "탐욕에서 떠난"', verseLine: V_CIT1, verseLineKo: V_CIT1K, audio: true },
  { type: 'teach', icon: '😡', word: 'sadosaṃ', pronKo: '사도상', meaning: '성냄 있는',
    grammar: '형용사, 대격 중성 단수', baseForm: 'sa + dosa (성냄)',
    buddhism: '진(瞋). 3독의 둘째.', verseLine: V_CIT1, verseLineKo: V_CIT1K, audio: true },
  { type: 'teach', icon: '😌', word: 'vītadosaṃ', pronKo: '위~따도상', meaning: '성냄을 떠난',
    grammar: '형용사, 대격 중성 단수', baseForm: 'vīta + dosa',
    verseLine: V_CIT1, verseLineKo: V_CIT1K, audio: true },
  { type: 'teach', icon: '🌫️', word: 'samohaṃ', pronKo: '사모항', meaning: '어리석음 있는',
    grammar: '형용사, 대격 중성 단수', baseForm: 'sa + moha (어리석음)',
    buddhism: '치(癡). 3독의 셋째. 무명(avijjā)과 가까움.', verseLine: V_CIT1, verseLineKo: V_CIT1K, audio: true },
  { type: 'teach', icon: '💡', word: 'vītamohaṃ', pronKo: '위~따모항', meaning: '어리석음을 떠난',
    grammar: '형용사, 대격 중성 단수', baseForm: 'vīta + moha',
    verseLine: V_CIT1, verseLineKo: V_CIT1K, audio: true },

  { type: 'verse', pali: V_CIT1, pronKo: '까탄짜 빠나, 빅카웨, 빅쿠 찟떼 찟따~누빳시~ 위하라띠? 이다, 빅카웨, 빅쿠 사라~강 와~ 찟땅 \'사라~강 찟딴\'띠 빠자~나~띠, 위~따라~강 와~ 찟땅 \'위~따라~강 찟딴\'띠 빠자~나~띠...',
    translation: V_CIT1K, highlight: ['sarāgaṃ','vītarāgaṃ','sadosaṃ','vītadosaṃ','samohaṃ','vītamohaṃ'],
    note: '🧠 6가지: 탐욕 ↔ 무탐 / 성냄 ↔ 무진 / 어리석음 ↔ 무치.' },

  // ── V_CIT2: 5쌍 추가 ──
  { type: 'teach', icon: '📉', word: 'saṅkhittaṃ', pronKo: '상킷땅', meaning: '위축된, 졸린',
    grammar: '과거분사, 대격 중성 단수', baseForm: 'saṅkhipati (모으다, 좁히다)',
    formNote: '√khip(던지다) + saṃ- 과거분사\n"좁아진, 위축된"',
    verseLine: V_CIT2, verseLineKo: V_CIT2K, audio: true },
  { type: 'teach', icon: '📊', word: 'vikkhittaṃ', pronKo: '윅킷땅', meaning: '산만한',
    grammar: '과거분사, 대격 중성 단수', baseForm: 'vikkhipati (흩뜨리다)',
    formNote: 'vi(분산) + √khip → "흩어진, 산만한"\nsaṅkhittaṃ↔vikkhittaṃ 쌍',
    verseLine: V_CIT2, verseLineKo: V_CIT2K, audio: true },
  { type: 'teach', icon: '🌌', word: 'mahaggataṃ', pronKo: '마학가땅', meaning: '광대한',
    grammar: '과거분사, 대격 중성 단수', baseForm: 'mahā(큰) + gata(된)',
    formNote: 'mahā + gata = "크게 된"\n색계/무색계 마음 (jhāna)',
    buddhism: '대(大). 선정 도달한 마음.', verseLine: V_CIT2, verseLineKo: V_CIT2K, audio: true },
  { type: 'teach', icon: '🪟', word: 'amahaggataṃ', pronKo: '아마학가땅', meaning: '광대하지 않은',
    grammar: '과거분사, 대격 중성 단수', baseForm: 'a + mahaggata',
    formNote: '욕계 마음 — 선정 미도달', verseLine: V_CIT2, verseLineKo: V_CIT2K, audio: true },
  { type: 'teach', icon: '⬆️', word: 'sauttaraṃ', pronKo: '사웃따랑', meaning: '더 높은 것이 있는',
    grammar: '형용사, 대격 중성 단수', baseForm: 'sa(있는) + uttara(더 높은)',
    formNote: '"위가 있는" = 더 높은 단계가 남아 있는', verseLine: V_CIT2, verseLineKo: V_CIT2K, audio: true },
  { type: 'teach', icon: '👑', word: 'anuttaraṃ', pronKo: '아눗따랑', meaning: '위가 없는, 무상',
    grammar: '형용사, 대격 중성 단수', baseForm: 'an + uttara',
    formNote: '"위가 없는" = 가장 높은 경지',
    buddhism: '무상(無上). anuttarā sammāsambodhi(무상정등각).',
    verseLine: V_CIT2, verseLineKo: V_CIT2K, audio: true },
  { type: 'teach', icon: '🎯', word: 'samāhitaṃ', pronKo: '사마~히땅', meaning: '집중된 (삼매에 든)',
    grammar: '과거분사, 대격 중성 단수', baseForm: 'samādahati (집중하다)',
    formNote: 'saṃ(완전히) + ā + √dhā(두다) 과거분사\nsamādhi와 어근 공유',
    buddhism: '정(定). 삼매(samādhi)의 결과 상태.',
    verseLine: V_CIT2, verseLineKo: V_CIT2K, audio: true },
  { type: 'teach', icon: '🌪️', word: 'asamāhitaṃ', pronKo: '아사마~히땅', meaning: '집중되지 않은',
    grammar: '과거분사, 대격 중성 단수', baseForm: 'a + samāhita',
    verseLine: V_CIT2, verseLineKo: V_CIT2K, audio: true },
  { type: 'teach', icon: '🆓', word: 'vimuttaṃ', pronKo: '위뭇땅', meaning: '해탈한',
    grammar: '과거분사, 대격 중성 단수', baseForm: 'vimuñcati (해탈하다)',
    formNote: 'vi(완전히) + √muc(풀다) 과거분사 = "완전히 풀려난"',
    buddhism: '해탈(解脫). vimutti의 형용사형.',
    verseLine: V_CIT2, verseLineKo: V_CIT2K, audio: true },
  { type: 'teach', icon: '⛓️', word: 'avimuttaṃ', pronKo: '아위뭇땅', meaning: '해탈하지 않은',
    grammar: '과거분사, 대격 중성 단수', baseForm: 'a + vimutta',
    verseLine: V_CIT2, verseLineKo: V_CIT2K, audio: true },

  { type: 'verse', pali: V_CIT2, pronKo: '상킷땅 와~ 찟땅... 윅킷땅 와~ 찟땅... 마학가땅 와~... 아마학가땅 와~... 사웃따랑 와~... 아눗따랑 와~... 사마~히땅 와~... 아사마~히땅 와~... 위뭇땅 와~ 찟땅 \'위뭇땅 찟딴\'띠 빠자~나~띠. 아위뭇땅 와~ 찟땅...',
    translation: V_CIT2K, highlight: ['saṅkhittaṃ','vikkhittaṃ','mahaggataṃ','amahaggataṃ','sauttaraṃ','anuttaraṃ','samāhitaṃ','asamāhitaṃ','vimuttaṃ','avimuttaṃ'],
    note: '🧠 10가지 추가: 위축↔산란 / 광대↔비광대 / 위있음↔무위 / 삼매↔비삼매 / 해탈↔비해탈.' },

  // ── REF_CIT 후렴 (citta 처격 cittasmiṃ) ──
  { type: 'teach', icon: '📍', word: 'cittasmiṃ', pronKo: '찟따스밍', meaning: '마음에서 (처격)',
    grammar: '중성명사, 처격 단수', baseForm: 'citta',
    formNote: 'citta → cittasmiṃ: -a 어간 처격 -smiṃ\ncitte와 같은 의미',
    verseLine: REF_CIT, verseLineKo: REF_CIT_K, audio: true },
  { type: 'verse', pali: REF_CIT, pronKo: '이띠 앗잣땅 와~ 찟떼 찟따~누빳시~ 위하라띠...',
    translation: REF_CIT_K, note: '🔁 심념처 공통 후렴.' },
  { type: 'verse', pali: 'cittānupassanā niṭṭhitā.', pronKo: '찟따~누빳사나~ 닛티따~.', translation: '— 심념처 끝 —' },

  { type: 'quiz', question: '3독(三毒)에 해당하는 빠알리어는?', options: ['rāga·dosa·moha (탐·진·치)', 'sati·samādhi·paññā', 'sīla·samādhi·paññā', 'dukkha·anicca·anattā'], answer: 0 },
  { type: 'quiz', question: '심념처는 마음 상태를 총 몇 가지로 관찰?', options: ['8가지', '16가지 (8쌍)', '24가지', '32가지'], answer: 1 },

  // ===== 법념처(dhammānupassanā) ① 다섯 장애 =====
  { type: 'intro', icon: '☸️', title: '— dhammānupassanā ① 5장애 —', subtitle: 'pañca nīvaraṇa',
    description: '감각욕·악의·해태혼침·들뜸후회·의심.' },

  // ── V_NIV0: 도입 ──
  { type: 'teach', icon: '🚧', word: 'nīvaraṇesu', pronKo: '니~와라네수', meaning: '장애들에서 (처격 복수)',
    grammar: '중성명사, 처격 복수', baseForm: 'nīvaraṇa (장애)',
    formNote: 'nīvaraṇa → nīvaraṇesu: -a 어간 처격 복수 -esu',
    buddhism: '오개(五蓋). 선정·통찰을 막는 5가지.',
    verseLine: V_NIV0, verseLineKo: V_NIV0K, audio: true },
  { type: 'verse', pali: V_NIV0, pronKo: '까탄짜 빠나, 빅카웨, 빅쿠 담메수 담마~누빳시~ 위하라띠? 이다, 빅카웨, 빅쿠 담메수 담마~누빳시~ 위하라띠 빤짜수 니~와라네수...',
    translation: V_NIV0K, highlight: ['nīvaraṇesu'] },

  // ── V_NIV1-5 공통 단어 ──
  { type: 'teach', icon: '✅', word: 'santaṃ', pronKo: '산땅', meaning: '있는, 존재하는',
    grammar: '현재분사, 대격 중성 단수', baseForm: 'santa (√as 현재분사)',
    formNote: '√as(있다) → santa(있는) → 대격 santaṃ\n"있을 때, 있는 것을"',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'teach', icon: '❌', word: 'asantaṃ', pronKo: '아산땅', meaning: '없는',
    grammar: '현재분사, 대격 중성 단수', baseForm: 'a-santa (없는)',
    formNote: 'a(부정) + santa(있는) = "없는"',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'teach', icon: '👇', word: 'me', pronKo: '메', meaning: '나에게',
    grammar: '대명사, 여격/속격 (단축형)', baseForm: 'aham (나)',
    formNote: 'aham의 여격/속격 단축형\n"atthi me" = 내게 있다',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'teach', icon: '🚫', word: 'natthi', pronKo: '낫티', meaning: '없다',
    grammar: '동사 3인칭 단수', baseForm: 'na + atthi',
    formNote: 'na(부정) + atthi(있다) = "없다"',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'teach', icon: '🌱', word: 'anuppannassa', pronKo: '아눕빤낫사', meaning: '일어나지 않은 (속격)',
    grammar: '과거분사, 속격 남성 단수', baseForm: 'an + uppanna (일어난)',
    formNote: 'an(부정) + uppanna(생긴) + 속격 -assa\n"아직 일어나지 않은 것의"',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'teach', icon: '🌅', word: 'uppādo', pronKo: '웁빠~도', meaning: '일어남, 발생',
    grammar: '남성명사, 주격 단수', baseForm: 'uppāda',
    formNote: 'ud(위로) + √pad(가다) = 생겨남',
    buddhism: '생(生). 무상의 한 측면.',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'teach', icon: '✅', word: 'uppannassa', pronKo: '웁빤낫사', meaning: '일어난 것의 (속격)',
    grammar: '과거분사, 속격 남성 단수', baseForm: 'uppanna',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'teach', icon: '🗑️', word: 'pahānaṃ', pronKo: '빠하~낭', meaning: '버려짐, 끊음',
    grammar: '중성명사, 주격 단수', baseForm: 'pahāna',
    formNote: 'pa + √hā(버리다) = 버림, 단절',
    buddhism: '단(斷). 번뇌 끊음.',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'teach', icon: '🧹', word: 'pahīnassa', pronKo: '빠히~낫사', meaning: '버려진 것의 (속격)',
    grammar: '과거분사, 속격 남성 단수', baseForm: 'pahīna',
    formNote: 'pahāna의 과거분사 + 속격',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'teach', icon: '⏭️', word: 'āyatiṃ', pronKo: '아~야띵', meaning: '앞으로, 미래에',
    grammar: '부사', baseForm: 'āyati (미래)',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'teach', icon: '🛡️', word: 'anuppādo', pronKo: '아눕빠~도', meaning: '다시 일어나지 않음',
    grammar: '남성명사, 주격 단수', baseForm: 'an + uppāda',
    formNote: 'an(부정) + uppāda(일어남) = "일어나지 않음"',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },

  // ── 5장애 ──
  { type: 'teach', icon: '💋', word: 'kāmacchandaṃ', pronKo: '까~맛찬당', meaning: '감각적 욕망을',
    grammar: '복합어, 대격 중성 단수', baseForm: 'kāma(욕망) + chanda(의욕)',
    formNote: 'kāma(감각욕망) + chanda(의욕) = "감각적 욕망"',
    buddhism: '욕탐(欲貪). 5장애의 첫째.',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'teach', icon: '💋', word: 'kāmacchando', pronKo: '까~맛찬도', meaning: '감각적 욕망이 (주격)',
    grammar: '남성명사, 주격 단수', baseForm: 'kāmacchanda',
    verseLine: V_NIV1, verseLineKo: V_NIV1K, audio: true },
  { type: 'verse', pali: V_NIV1, pronKo: '이다, 빅카웨, 빅쿠 산땅 와~ 앗잣땅 까~맛찬당 \'앗티 메 앗잣땅 까~맛찬도\'띠 빠자~나~띠, 아산땅 와~ 앗잣땅 까~맛찬당 \'낫티 메 앗잣땅 까~맛찬도\'띠 빠자~나~띠...',
    translation: V_NIV1K, highlight: ['santaṃ','asantaṃ','kāmacchandaṃ','kāmacchando','anuppannassa','uppādo','pahānaṃ','anuppādo'],
    note: '⛔ 장애 1: 감각적 욕망(kāmacchanda).' },

  { type: 'teach', icon: '😡', word: 'byāpādaṃ', pronKo: '뱌~빠~당', meaning: '악의를 (대격)',
    grammar: '남성명사, 대격 단수', baseForm: 'byāpāda',
    formNote: 'vi(분리) + ā + √pad → "해치려는 마음"',
    buddhism: '진(瞋). 5장애의 둘째.', verseLine: V_NIV2, verseLineKo: V_NIV2K, audio: true },
  { type: 'teach', icon: '😡', word: 'byāpādo', pronKo: '뱌~빠~도', meaning: '악의가 (주격)',
    grammar: '남성명사, 주격 단수', baseForm: 'byāpāda',
    verseLine: V_NIV2, verseLineKo: V_NIV2K, audio: true },
  { type: 'verse', pali: V_NIV2, pronKo: '산땅 와~ 앗잣땅 뱌~빠~당 \'앗티 메 앗잣땅 뱌~빠~도\'띠 빠자~나~띠...',
    translation: V_NIV2K, highlight: ['byāpādaṃ','byāpādo'], note: '⛔ 장애 2: 악의(byāpāda).' },

  { type: 'teach', icon: '😪', word: 'thinamiddhaṃ', pronKo: '티나밋당', meaning: '해태와 혼침을',
    grammar: '복합어, 대격 중성 단수', baseForm: 'thīna(해태) + middha(혼침)',
    formNote: 'thīna(정신적 게으름) + middha(육체적 둔함) = 해태혼침',
    buddhism: '혼면(昏眠). 5장애의 셋째.', verseLine: V_NIV3, verseLineKo: V_NIV3K, audio: true },
  { type: 'verse', pali: V_NIV3, pronKo: '산땅 와~ 앗잣땅 티나밋당 \'앗티 메 앗잣땅 티나밋단\'띠 빠자~나~띠...',
    translation: V_NIV3K, highlight: ['thinamiddhaṃ'], note: '⛔ 장애 3: 해태와 혼침.' },

  { type: 'teach', icon: '😖', word: 'uddhaccakukkuccaṃ', pronKo: '웃닷짜꾹꿋짱', meaning: '들뜸과 후회를',
    grammar: '복합어, 대격 중성 단수', baseForm: 'uddhacca(들뜸) + kukkucca(후회)',
    formNote: 'uddhacca(흥분/들뜸) + kukkucca(불안한 후회)',
    buddhism: '도회(掉悔). 5장애의 넷째.', verseLine: V_NIV4, verseLineKo: V_NIV4K, audio: true },
  { type: 'verse', pali: V_NIV4, pronKo: '산땅 와~ 앗잣땅 웃닷짜꾹꿋짱 \'앗티 메 앗잣땅 웃닷짜꾹꿋짠\'띠 빠자~나~띠...',
    translation: V_NIV4K, highlight: ['uddhaccakukkuccaṃ'], note: '⛔ 장애 4: 들뜸과 후회.' },

  { type: 'teach', icon: '❓', word: 'vicikicchaṃ', pronKo: '위찌낏찬', meaning: '의심을',
    grammar: '여성명사, 대격 단수', baseForm: 'vicikicchā',
    formNote: 'vi(다르게) + √cit(생각) → "의심, 회의"',
    buddhism: '의(疑). 5장애의 다섯째. 3보·4성제에 대한 의심.',
    verseLine: V_NIV5, verseLineKo: V_NIV5K, audio: true },
  { type: 'teach', icon: '❓', word: 'vicikicchā', pronKo: '위찌낏차~', meaning: '의심이 (주격)',
    grammar: '여성명사, 주격 단수', baseForm: 'vicikicchā',
    verseLine: V_NIV5, verseLineKo: V_NIV5K, audio: true },
  { type: 'verse', pali: V_NIV5, pronKo: '산땅 와~ 앗잣땅 위찌낏찬 \'앗티 메 앗잣땅 위찌낏차~\'띠 빠자~나~띠...',
    translation: V_NIV5K, highlight: ['vicikicchaṃ','vicikicchā'], note: '⛔ 장애 5: 의심.' },

  { type: 'verse', pali: REF_DHM('pañcasu nīvaraṇesu'),
    pronKo: '이띠 앗잣땅 와~ 담메수 담마~누빳시~ ... 빤짜수 니~와라네수.',
    translation: REF_DHM_K('다섯 장애에 대해'), note: '🔁 법념처 후렴(장애).' },
  { type: 'verse', pali: 'nīvaraṇapabbaṃ niṭṭhitaṃ.', pronKo: '니~와라나빱방 닛티땅.', translation: '— 5장애 항목 끝 —' },

  { type: 'quiz', question: '오개(五蓋)에 해당하지 않는 것은?', options: ['감각적 욕망', '악의', '해태와 혼침', '바른 견해'], answer: 3 },

  // ===== 법념처 ② 오취온 =====
  { type: 'intro', icon: '🪨', title: '— dhammānupassanā ② 5취온 —', subtitle: 'pañca upādānakkhandhā',
    description: '색·수·상·행·식의 일어남과 사라짐 관찰.' },

  // ── V_KHA 단어 학습 ──
  { type: 'teach', icon: '📦', word: 'upādānakkhandhesu', pronKo: '우빠~다~낙칸데수', meaning: '취착의 무더기들에서 (처격 복수)',
    grammar: '복합어, 처격 복수', baseForm: 'upādāna(취착) + khandha(무더기)',
    formNote: 'upādāna(취착) + khandha(무더기) + 처격 -esu',
    buddhism: '오취온(五取蘊). 자아라고 착각하는 5묶음.',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '🎨', word: 'rūpaṃ', pronKo: '루~빵', meaning: '물질, 색',
    grammar: '중성명사, 주격 단수', baseForm: 'rūpa',
    formNote: '"색(色)" = 보이는 물질 일반',
    buddhism: '색(色). 오온의 첫째. 사대(四大)와 사대로 만들어진 것.',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '🎨', word: 'rūpassa', pronKo: '루~빳사', meaning: '물질의 (속격)',
    grammar: '중성명사, 속격 단수', baseForm: 'rūpa',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '⬆️', word: 'samudayo', pronKo: '사무다요', meaning: '일어남, 발생',
    grammar: '남성명사, 주격 단수', baseForm: 'samudaya',
    formNote: 'saṃ + ud + aya = "함께 위로 가는 것 = 일어남"\n4성제의 dukkhasamudaya의 samudaya',
    buddhism: '집(集). 4성제 두 번째.',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '⬇️', word: 'atthaṅgamo', pronKo: '앗탕가모', meaning: '사라짐, 끝남',
    grammar: '남성명사, 주격 단수', baseForm: 'atthaṅgama',
    formNote: 'attha(끝/집) + gama(감) = "끝으로 감"',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '💭', word: 'vedanā', pronKo: '웨다나~', meaning: '느낌 (주격 단수)',
    grammar: '여성명사, 주격 단수', baseForm: 'vedanā',
    buddhism: '수(受). 오온의 둘째.',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '💭', word: 'vedanāya', pronKo: '웨다나~야', meaning: '느낌의 (속격)',
    grammar: '여성명사, 속격 단수', baseForm: 'vedanā',
    formNote: 'vedanā → vedanāya: -ā 어간 속격',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '🧠', word: 'saññā', pronKo: '산냐~', meaning: '인식 (주격 단수)',
    grammar: '여성명사, 주격 단수', baseForm: 'saññā',
    formNote: 'saṃ + √ñā(알다) = "함께 앎 = 인식, 지각"',
    buddhism: '상(想). 오온의 셋째. 대상을 식별.',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '🧠', word: 'saññāya', pronKo: '산냐~야', meaning: '인식의 (속격)',
    grammar: '여성명사, 속격 단수', baseForm: 'saññā',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '⚙️', word: 'saṅkhārā', pronKo: '상카~라~', meaning: '형성들 (주격 복수)',
    grammar: '남성명사, 주격 복수', baseForm: 'saṅkhāra',
    formNote: 'saṃ + √kar(만들다) = "함께 만든 것"\n복수로 사용',
    buddhism: '행(行). 오온의 넷째. 의지·심리현상들.',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '⚙️', word: 'saṅkhārānaṃ', pronKo: '상카~라~낭', meaning: '형성들의 (속격 복수)',
    grammar: '남성명사, 속격 복수', baseForm: 'saṅkhāra',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '👁️‍🗨️', word: 'viññāṇaṃ', pronKo: '윈냐~낭', meaning: '의식 (주격 단수)',
    grammar: '중성명사, 주격 단수', baseForm: 'viññāṇa',
    formNote: 'vi(분별) + √ñā(알다) = "분별하는 앎 = 의식"',
    buddhism: '식(識). 오온의 다섯째. 6식 (안·이·비·설·신·의식).',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },
  { type: 'teach', icon: '👁️‍🗨️', word: 'viññāṇassa', pronKo: '윈냐~낫사', meaning: '의식의 (속격)',
    grammar: '중성명사, 속격 단수', baseForm: 'viññāṇa',
    verseLine: V_KHA, verseLineKo: V_KHAK, audio: true },

  { type: 'verse', pali: V_KHA, pronKo: '뿌나 짜빠랑, 빅카웨, 빅쿠 담메수 담마~누빳시~ 위하라띠 빤짜수 우빠~다~낙칸데수... \'이띠 루~빵, 이띠 루~빳사 사무다요, 이띠 루~빳사 앗탕가모; 이띠 웨다나~...; 이띠 산냐~...; 이띠 상카~라~...; 이띠 윈냐~낭, 이띠 윈냐~낫사 사무다요, 이띠 윈냐~낫사 앗탕가모\'띠.',
    translation: V_KHAK, highlight: ['upādānakkhandhesu','rūpaṃ','vedanā','saññā','saṅkhārā','viññāṇaṃ','samudayo','atthaṅgamo'],
    note: '🪨 오취온(色·受·想·行·識)의 samudaya(일어남)·atthaṅgama(사라짐).' },
  { type: 'verse', pali: REF_DHM('pañcasu upādānakkhandhesu'),
    pronKo: '이띠 앗잣땅 와~... 빤짜수 우빠~다~낙칸데수.',
    translation: REF_DHM_K('오취온에 대해'), note: '🔁 후렴(오취온).' },
  { type: 'verse', pali: 'khandhapabbaṃ niṭṭhitaṃ.', pronKo: '칸다빱방 닛티땅.', translation: '— 오취온 항목 끝 —' },

  { type: 'quiz', question: '오취온(五取蘊)은?', options: ['색·수·상·행·식', '지·수·화·풍·공', '안·이·비·설·신', '계·정·혜·해탈·해탈지견'], answer: 0 },

  // ===== 법념처 ③ 육내외처 =====
  { type: 'intro', icon: '👁️', title: '— dhammānupassanā ③ 6내외처 —', subtitle: 'cha ajjhattikabāhirāni āyatanāni',
    description: '6쌍(눈·형색 등)과 그것에서 일어나는 결박(saṃyojana) 관찰.' },

  // ── V_AYA0: 도입 ──
  { type: 'teach', icon: '🔀', word: 'ajjhattikabāhiresu', pronKo: '앗잣띠까바~히레수', meaning: '안과 밖의 (처격 복수)',
    grammar: '복합어, 처격 복수', baseForm: 'ajjhattika(내부의) + bāhira(외부의)',
    formNote: 'ajjhattika(6근) + bāhira(6경)',
    verseLine: V_AYA0, verseLineKo: V_AYA0K, audio: true },
  { type: 'teach', icon: '📍', word: 'āyatanesu', pronKo: '아~야따네수', meaning: '감각장소들에서 (처격 복수)',
    grammar: '중성명사, 처격 복수', baseForm: 'āyatana (감각장소)',
    formNote: 'āyatana → āyatanesu: -a 어간 처격 복수 -esu',
    buddhism: '처(處). 12처 (6내처 + 6외처).',
    verseLine: V_AYA0, verseLineKo: V_AYA0K, audio: true },
  { type: 'verse', pali: V_AYA0, pronKo: '뿌나 짜빠랑, 빅카웨, 빅쿠 담메수 담마~누빳시~ 위하라띠 차수 앗잣띠까바~히레수 아~야따네수. 까탄짜 빠나, 빅카웨...?',
    translation: V_AYA0K, highlight: ['ajjhattikabāhiresu','āyatanesu'] },

  // ── V_AYA1: 눈+형색 (공통 단어 포함) ──
  { type: 'teach', icon: '👁️', word: 'cakkhuñca', pronKo: '짝쿤짜', meaning: '눈을 그리고',
    grammar: '중성명사 대격 + ca', baseForm: 'cakkhu (눈) + ca (그리고)',
    formNote: 'cakkhu + ca → cakkhuñca (산디)\n6근의 첫째',
    buddhism: '안(眼). 6근(六根)의 첫째.',
    verseLine: V_AYA1, verseLineKo: V_AYA1K, audio: true },
  { type: 'teach', icon: '🎨', word: 'rūpe', pronKo: '루~뻬', meaning: '형색들을 (대격 복수)',
    grammar: '중성명사, 대격 복수', baseForm: 'rūpa (형색)',
    formNote: 'rūpa → rūpe: 대격 복수\n안식의 대상',
    buddhism: '색(色, 6경). 눈의 대상.',
    verseLine: V_AYA1, verseLineKo: V_AYA1K, audio: true },
  { type: 'teach', icon: '👉', word: 'tadubhayaṃ', pronKo: '따두바양', meaning: '그 둘을',
    grammar: '대명사 + 수사', baseForm: 'tad(그) + ubhayaṃ(둘)',
    formNote: '"그 둘 (감각기관+대상)을 의지하여"',
    verseLine: V_AYA1, verseLineKo: V_AYA1K, audio: true },
  { type: 'teach', icon: '🔗', word: 'paṭicca', pronKo: '빠띳짜', meaning: '의지하여',
    grammar: '절대분사', baseForm: 'paṭicca (paṭi- + √i)',
    formNote: 'paṭi(돌려) + √i(가다) + -ya = "의지하여, 조건으로"',
    buddhism: '연(緣). paṭiccasamuppāda(연기) 의 paṭicca.',
    verseLine: V_AYA1, verseLineKo: V_AYA1K, audio: true },
  { type: 'teach', icon: '🌀', word: 'uppajjati', pronKo: '웁빳자띠', meaning: '일어난다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'uppajjati (ud- + √pad)',
    formNote: 'ud(위로) + √pad(가다) = "생겨난다"',
    verseLine: V_AYA1, verseLineKo: V_AYA1K, audio: true },
  { type: 'teach', icon: '⛓️', word: 'saṃyojanaṃ', pronKo: '상요자낭', meaning: '결박을',
    grammar: '중성명사, 대격 단수', baseForm: 'saṃyojana',
    formNote: 'saṃ(함께) + yojana(묶음) = "결박, 속박"',
    buddhism: '결(結). 10결박 (10 saṃyojana) — 윤회의 끈.',
    verseLine: V_AYA1, verseLineKo: V_AYA1K, audio: true },
  { type: 'teach', icon: '⛓️', word: 'saṃyojanassa', pronKo: '상요자낫사', meaning: '결박의 (속격)',
    grammar: '중성명사, 속격 단수', baseForm: 'saṃyojana',
    verseLine: V_AYA1, verseLineKo: V_AYA1K, audio: true },

  { type: 'verse', pali: V_AYA1, pronKo: '이다, 빅카웨, 빅쿠 짝쿤짜 빠자~나~띠, 루~뻬 짜 빠자~나~띠, 얀짜 따두바양 빠띳짜 웁빳자띠 상요자낭 딴짜 빠자~나~띠...',
    translation: V_AYA1K, highlight: ['cakkhuñca','rūpe','tadubhayaṃ','paṭicca','uppajjati','saṃyojanaṃ'],
    note: '👁️ ① 눈 + 형색 + 결박.' },

  // ── V_AYA2-6: 5쌍 ──
  { type: 'teach', icon: '👂', word: 'sotañca', pronKo: '소딴짜', meaning: '귀를 그리고',
    grammar: '중성명사 대격 + ca', baseForm: 'sota (귀)',
    buddhism: '이(耳). 6근의 둘째.', verseLine: V_AYA2, verseLineKo: V_AYA2K, audio: true },
  { type: 'teach', icon: '🔊', word: 'sadde', pronKo: '삿데', meaning: '소리들을 (대격 복수)',
    grammar: '남성명사, 대격 복수', baseForm: 'sadda (소리)',
    buddhism: '성(聲, 6경).', verseLine: V_AYA2, verseLineKo: V_AYA2K, audio: true },
  { type: 'verse', pali: V_AYA2, pronKo: '소딴짜 빠자~나~띠, 삿데 짜 빠자~나~띠...',
    translation: V_AYA2K, highlight: ['sotañca','sadde'], note: '👂 ② 귀 + 소리 + 결박.' },

  { type: 'teach', icon: '👃', word: 'ghānañca', pronKo: '가~난짜', meaning: '코를 그리고',
    grammar: '중성명사 대격 + ca', baseForm: 'ghāna (코)',
    buddhism: '비(鼻). 6근의 셋째.', verseLine: V_AYA3, verseLineKo: V_AYA3K, audio: true },
  { type: 'teach', icon: '🌸', word: 'gandhe', pronKo: '간데', meaning: '냄새들을 (대격 복수)',
    grammar: '남성명사, 대격 복수', baseForm: 'gandha (냄새)',
    buddhism: '향(香, 6경).', verseLine: V_AYA3, verseLineKo: V_AYA3K, audio: true },
  { type: 'verse', pali: V_AYA3, pronKo: '가~난짜 빠자~나~띠, 간데 짜 빠자~나~띠...',
    translation: V_AYA3K, highlight: ['ghānañca','gandhe'], note: '👃 ③ 코 + 냄새 + 결박.' },

  { type: 'teach', icon: '👅', word: 'jivhañca', pronKo: '지완짜', meaning: '혀를 그리고',
    grammar: '여성명사 대격 + ca', baseForm: 'jivhā (혀)',
    buddhism: '설(舌). 6근의 넷째.', verseLine: V_AYA4, verseLineKo: V_AYA4K, audio: true },
  { type: 'teach', icon: '🍯', word: 'rase', pronKo: '라세', meaning: '맛들을 (대격 복수)',
    grammar: '남성명사, 대격 복수', baseForm: 'rasa (맛)',
    buddhism: '미(味, 6경).', verseLine: V_AYA4, verseLineKo: V_AYA4K, audio: true },
  { type: 'verse', pali: V_AYA4, pronKo: '지완짜 빠자~나~띠, 라세 짜 빠자~나~띠...',
    translation: V_AYA4K, highlight: ['jivhañca','rase'], note: '👅 ④ 혀 + 맛 + 결박.' },

  { type: 'teach', icon: '🤲', word: 'kāyañca', pronKo: '까~얀짜', meaning: '몸을 그리고 (감각기관)',
    grammar: '남성명사 대격 + ca', baseForm: 'kāya (몸=촉감)',
    formNote: '여기서 kāya = "몸 표면 = 촉각 기관"',
    buddhism: '신(身). 6근의 다섯째 (촉각).', verseLine: V_AYA5, verseLineKo: V_AYA5K, audio: true },
  { type: 'teach', icon: '✋', word: 'phoṭṭhabbe', pronKo: '폿탑베', meaning: '감촉들을 (대격 복수)',
    grammar: '중성명사, 대격 복수', baseForm: 'phoṭṭhabba (감촉)',
    formNote: '√phus(닿다)에서 파생',
    buddhism: '촉(觸, 6경).', verseLine: V_AYA5, verseLineKo: V_AYA5K, audio: true },
  { type: 'verse', pali: V_AYA5, pronKo: '까~얀짜 빠자~나~띠, 폿탑베 짜 빠자~나~띠...',
    translation: V_AYA5K, highlight: ['kāyañca','phoṭṭhabbe'], note: '🤲 ⑤ 몸 + 감촉 + 결박.' },

  { type: 'teach', icon: '🧠', word: 'manañca', pronKo: '마난짜', meaning: '마노를 그리고',
    grammar: '중성명사 대격 + ca', baseForm: 'mano (마노/의)',
    formNote: 'mano(마노) = 의식의 토대',
    buddhism: '의(意). 6근의 여섯째.', verseLine: V_AYA6, verseLineKo: V_AYA6K, audio: true },
  { type: 'teach', icon: '☸️', word: 'dhamme', pronKo: '담메', meaning: '법들을 (대격 복수)',
    grammar: '남성명사, 대격 복수', baseForm: 'dhamma',
    formNote: '여기서 dhamma = 마노의 대상 (정신적 현상)',
    buddhism: '법(法, 6경). 마노가 인식하는 대상.', verseLine: V_AYA6, verseLineKo: V_AYA6K, audio: true },
  { type: 'verse', pali: V_AYA6, pronKo: '마난짜 빠자~나~띠, 담메 짜 빠자~나~띠...',
    translation: V_AYA6K, highlight: ['manañca','dhamme'], note: '🧠 ⑥ 마노 + 법 + 결박.' },

  { type: 'verse', pali: REF_DHM('chasu ajjhattikabāhiresu āyatanesu'),
    pronKo: '이띠 앗잣땅 와~... 차수 앗잣띠까바~히레수 아~야따네수.',
    translation: REF_DHM_K('6내외처에 대해'), note: '🔁 후렴(6처).' },
  { type: 'verse', pali: 'āyatanapabbaṃ niṭṭhitaṃ.', pronKo: '아~야따나빱방 닛티땅.', translation: '— 6처 항목 끝 —' },

  { type: 'quiz', question: '6내처(六內處)는?', options: ['눈·귀·코·혀·몸·마노', '색·성·향·미·촉·법', '안식·이식·비식·설식·신식·의식', '지·수·화·풍·공·식'], answer: 0 },

  // ===== 법념처 ④ 칠각지 =====
  { type: 'intro', icon: '🌟', title: '— dhammānupassanā ④ 7각지 —', subtitle: 'satta bojjhaṅgā',
    description: '념·택법·정진·희·경안·정·사의 7가지 깨달음 요소.' },

  // ── 공통 단어 ──
  { type: 'teach', icon: '✨', word: 'bojjhaṅgesu', pronKo: '봇장게수', meaning: '깨달음 요소들에서 (처격 복수)',
    grammar: '남성명사, 처격 복수', baseForm: 'bojjhaṅga (깨달음 요소)',
    formNote: 'bodhi(깨달음) + aṅga(요소) → bojjhaṅga\n처격 복수 -esu',
    buddhism: '각지(覺支). 7가지 깨달음 요소.',
    verseLine: V_BOJ0, verseLineKo: V_BOJ0K, audio: true },
  { type: 'teach', icon: '🛐', word: 'bhāvanāya', pronKo: '바~와나~야', meaning: '닦음에 의해 (도구격/여격)',
    grammar: '여성명사, 도구격/여격 단수', baseForm: 'bhāvanā (닦음, 수행)',
    formNote: '√bhū(되다) 사역형의 추상명사 = "되게 함 = 수행"',
    buddhism: '수(修). 마음을 닦음.',
    verseLine: V_BOJ1, verseLineKo: V_BOJ1K, audio: true },
  { type: 'teach', icon: '🏆', word: 'pāripūrī', pronKo: '빠~리뿌~리~', meaning: '완성, 충만함',
    grammar: '여성명사, 주격 단수', baseForm: 'pāripūrī',
    formNote: 'pari(완전히) + √pūr(채우다) = "완전히 채워짐"\n각지에서 장애와 달리: "닦음의 완성" 관찰',
    verseLine: V_BOJ1, verseLineKo: V_BOJ1K, audio: true },
  { type: 'verse', pali: V_BOJ0, pronKo: '뿌나 짜빠랑, 빅카웨, 빅쿠 담메수 담마~누빳시~ 위하라띠 삿따수 봇장게수...',
    translation: V_BOJ0K, highlight: ['bojjhaṅgesu'] },

  // ── 7각지 ──
  { type: 'teach', icon: '💎', word: 'satisambojjhaṅgaṃ', pronKo: '사띠삼봇장강', meaning: '마음챙김 각지를',
    grammar: '복합어, 대격', baseForm: 'sati + sambojjhaṅga',
    formNote: 'sati(마음챙김) + saṃ(완전) + bojjhaṅga(각지)',
    buddhism: '념각지(念覺支). 7각지의 첫째 — 모든 수행의 토대.',
    verseLine: V_BOJ1, verseLineKo: V_BOJ1K, audio: true },
  { type: 'verse', pali: V_BOJ1, pronKo: '이다, 빅카웨, 빅쿠 산땅 와~ 앗잣땅 사띠삼봇장강 \'앗티 메 앗잣땅 사띠삼봇장고\'띠 빠자~나~띠... 바~와나~야 빠~리뿌~리~ 호띠 딴짜 빠자~나~띠.',
    translation: V_BOJ1K, highlight: ['satisambojjhaṅgaṃ','bhāvanāya','pāripūrī'], note: '🌟 ① 念覺支 (sati).' },

  { type: 'teach', icon: '🔍', word: 'dhammavicayasambojjhaṅgaṃ', pronKo: '담마위짜야삼봇장강', meaning: '법 간택 각지를',
    grammar: '복합어, 대격', baseForm: 'dhamma + vicaya(조사) + sambojjhaṅga',
    formNote: 'dhamma(법) + vicaya(분석/택법) = "법의 분석"',
    buddhism: '택법각지(擇法覺支). 법을 분석하는 지혜.',
    verseLine: V_BOJ2, verseLineKo: V_BOJ2K, audio: true },
  { type: 'verse', pali: V_BOJ2, pronKo: '산땅 와~ 앗잣땅 담마위짜야삼봇장강...',
    translation: V_BOJ2K, highlight: ['dhammavicayasambojjhaṅgaṃ'], note: '🌟 ② 擇法覺支 (dhammavicaya).' },

  { type: 'teach', icon: '💪', word: 'vīriyasambojjhaṅgaṃ', pronKo: '위~리야삼봇장강', meaning: '정진 각지를',
    grammar: '복합어, 대격', baseForm: 'vīriya(정진) + sambojjhaṅga',
    buddhism: '정진각지(精進覺支).',
    verseLine: V_BOJ3, verseLineKo: V_BOJ3K, audio: true },
  { type: 'verse', pali: V_BOJ3, pronKo: '산땅 와~ 앗잣땅 위~리야삼봇장강...',
    translation: V_BOJ3K, highlight: ['vīriyasambojjhaṅgaṃ'], note: '🌟 ③ 精進覺支 (vīriya).' },

  { type: 'teach', icon: '😄', word: 'pītisambojjhaṅgaṃ', pronKo: '삐~띠삼봇장강', meaning: '희열 각지를',
    grammar: '복합어, 대격', baseForm: 'pīti(희열) + sambojjhaṅga',
    formNote: 'pīti = 정신적 기쁨/희열 (선정 요소이기도)',
    buddhism: '희각지(喜覺支).',
    verseLine: V_BOJ4, verseLineKo: V_BOJ4K, audio: true },
  { type: 'verse', pali: V_BOJ4, pronKo: '산땅 와~ 앗잣땅 삐~띠삼봇장강...',
    translation: V_BOJ4K, highlight: ['pītisambojjhaṅgaṃ'], note: '🌟 ④ 喜覺支 (pīti).' },

  { type: 'teach', icon: '🌊', word: 'passaddhisambojjhaṅgaṃ', pronKo: '빳삿디삼봇장강', meaning: '경안 각지를',
    grammar: '복합어, 대격', baseForm: 'passaddhi(고요함) + sambojjhaṅga',
    formNote: 'pa + √sambh = "완전히 고요해짐"',
    buddhism: '경안각지(輕安覺支). 몸·마음의 고요.',
    verseLine: V_BOJ5, verseLineKo: V_BOJ5K, audio: true },
  { type: 'verse', pali: V_BOJ5, pronKo: '산땅 와~ 앗잣땅 빳삿디삼봇장강...',
    translation: V_BOJ5K, highlight: ['passaddhisambojjhaṅgaṃ'], note: '🌟 ⑤ 輕安覺支 (passaddhi).' },

  { type: 'teach', icon: '🎯', word: 'samādhisambojjhaṅgaṃ', pronKo: '사마~디삼봇장강', meaning: '삼매 각지를',
    grammar: '복합어, 대격', baseForm: 'samādhi(삼매) + sambojjhaṅga',
    buddhism: '정각지(定覺支). 마음의 통일.',
    verseLine: V_BOJ6, verseLineKo: V_BOJ6K, audio: true },
  { type: 'verse', pali: V_BOJ6, pronKo: '산땅 와~ 앗잣땅 사마~디삼봇장강...',
    translation: V_BOJ6K, highlight: ['samādhisambojjhaṅgaṃ'], note: '🌟 ⑥ 定覺支 (samādhi).' },

  { type: 'teach', icon: '⚖️', word: 'upekkhāsambojjhaṅgaṃ', pronKo: '우뻭카~삼봇장강', meaning: '평정 각지를',
    grammar: '복합어, 대격', baseForm: 'upekkhā(평정) + sambojjhaṅga',
    formNote: 'upa(가까이) + √ikkh(보다) = "고요히 바라봄"',
    buddhism: '사각지(捨覺支). 평정. 4선의 핵심.',
    verseLine: V_BOJ7, verseLineKo: V_BOJ7K, audio: true },
  { type: 'verse', pali: V_BOJ7, pronKo: '산땅 와~ 앗잣땅 우뻭카~삼봇장강...',
    translation: V_BOJ7K, highlight: ['upekkhāsambojjhaṅgaṃ'], note: '🌟 ⑦ 捨覺支 (upekkhā).' },

  { type: 'verse', pali: REF_DHM('sattasu bojjhaṅgesu'),
    pronKo: '이띠 앗잣땅 와~... 삿따수 봇장게수.',
    translation: REF_DHM_K('7각지에 대해'), note: '🔁 후렴(7각지).' },
  { type: 'verse', pali: 'bojjhaṅgapabbaṃ niṭṭhitaṃ.', pronKo: '봇장가빱방 닛티땅.', translation: '— 7각지 항목 끝 —' },

  { type: 'quiz', question: '7각지의 첫 번째는?', options: ['sati (마음챙김)', 'samādhi (삼매)', 'paññā (지혜)', 'sīla (계)'], answer: 0 },

  // ===== 법념처 ⑤ 사성제 =====
  { type: 'intro', icon: '☸️', title: '— dhammānupassanā ⑤ 4성제 —', subtitle: 'cattāri ariyasaccāni',
    description: '고·집·멸·도. 사성제의 가장 상세한 해설.' },

  // ── V_SAC0: 4성제 도입 ──
  { type: 'teach', icon: '☸️', word: 'ariyasaccesu', pronKo: '아리야삿쩨수', meaning: '성스러운 진리들에서 (처격 복수)',
    grammar: '복합어, 처격 복수', baseForm: 'ariya(성스러운) + sacca(진리)',
    formNote: 'ariya + sacca + 처격 복수 -esu',
    buddhism: '사성제(四聖諦). 부처님 가르침의 골격.',
    verseLine: V_SAC0, verseLineKo: V_SAC0K, audio: true },
  { type: 'teach', icon: '☸️', word: 'ariyasaccaṃ', pronKo: '아리야삿짱', meaning: '성스러운 진리',
    grammar: '복합어, 주격/대격 중성 단수', baseForm: 'ariyasacca',
    verseLine: V_SAC0, verseLineKo: V_SAC0K, audio: true },
  { type: 'teach', icon: '💬', word: 'dukkhan', pronKo: '둑칸', meaning: '"괴로움"이라고 (인용)',
    grammar: '중성명사 대격 + ti', baseForm: 'dukkhaṃ + ti',
    formNote: 'dukkhaṃ + ti → dukkhan (산디)',
    verseLine: V_SAC0, verseLineKo: V_SAC0K, audio: true },
  { type: 'teach', icon: '🔍', word: 'yathābhūtaṃ', pronKo: '야타~부~땅', meaning: '있는 그대로',
    grammar: '부사', baseForm: 'yathā(어떻게) + bhūta(된)',
    formNote: 'yathā + bhūta = "있는 그대로, 실상대로"',
    buddhism: '여실(如實). 위빠사나 통찰의 핵심.',
    verseLine: V_SAC0, verseLineKo: V_SAC0K, audio: true },
  { type: 'teach', icon: '⬆️', word: 'dukkhasamudayo', pronKo: '둑카사무다요', meaning: '괴로움의 일어남',
    grammar: '복합어, 주격 남성 단수', baseForm: 'dukkha + samudaya',
    buddhism: '집(集). 4성제의 둘째.',
    verseLine: V_SAC0, verseLineKo: V_SAC0K, audio: true },
  { type: 'teach', icon: '⬇️', word: 'dukkhanirodho', pronKo: '둑카니로도', meaning: '괴로움의 사라짐',
    grammar: '복합어, 주격 남성 단수', baseForm: 'dukkha + nirodha (사라짐)',
    formNote: 'ni(아래로) + √rudh(막다) = "막아 멈춤"',
    buddhism: '멸(滅). 4성제의 셋째 = 열반.',
    verseLine: V_SAC0, verseLineKo: V_SAC0K, audio: true },
  { type: 'teach', icon: '🛤️', word: 'dukkhanirodhagāminī', pronKo: '둑카니로다가~미니~', meaning: '괴로움의 사라짐으로 이끄는',
    grammar: '복합어, 주격 여성 단수', baseForm: 'dukkhanirodha + gāminī (이끄는)',
    formNote: 'gāminī = √gam(가다) 의 여성 형용사 = "이르게 하는"',
    verseLine: V_SAC0, verseLineKo: V_SAC0K, audio: true },
  { type: 'teach', icon: '👣', word: 'paṭipadā', pronKo: '빠띠빠다~', meaning: '길, 실천도',
    grammar: '여성명사, 주격 단수', baseForm: 'paṭipadā',
    formNote: 'paṭi(향해) + √pad(가다) = "향해 가는 길"',
    buddhism: '도(道). 4성제 네 번째 = 팔정도.',
    verseLine: V_SAC0, verseLineKo: V_SAC0K, audio: true },
  { type: 'verse', pali: V_SAC0, pronKo: '뿌나 짜빠랑... 빅쿠 담메수 담마~누빳시~ 위하라띠 짜뚜~수 아리야삿쩨수. 이다, 빅카웨, 빅쿠 \'이당 둑칸\'띠 야타~부~땅 빠자~나~띠, \'아양 둑카사무다요\'띠... \'아양 둑카니로도\'띠... \'아양 둑카니로다가~미니~ 빠띠빠다~\'띠 야타~부~땅 빠자~나~띠.',
    translation: V_SAC0K, highlight: ['ariyasaccesu','dukkhan','yathābhūtaṃ','dukkhasamudayo','dukkhanirodho','dukkhanirodhagāminī','paṭipadā'],
    note: '☸️ 사성제 선언: 고·집·멸·도.' },

  // ── 고성제 (V_DUK0-12) ──
  { type: 'intro', icon: '😰', title: '— 苦聖諦 (dukkha) —', subtitle: '괴로움의 성스러운 진리',
    description: '생·노·병·사·슬픔·비탄·근심·번뇌 등.' },

  { type: 'teach', icon: '❓', word: 'katamañca', pronKo: '까따만짜', meaning: '무엇이? + 그리고',
    grammar: '의문대명사 + ca', baseForm: 'katamaṃ(무엇) + ca',
    formNote: '"무엇이 ~인가?" — 정의 도입 정형구',
    verseLine: V_DUK0, verseLineKo: V_DUK0K, audio: true },
  { type: 'teach', icon: '👶', word: 'jātipi', pronKo: '자~띠삐', meaning: '태어남도',
    grammar: '여성명사 주격 + api', baseForm: 'jāti(태어남) + api',
    buddhism: '생(生). 고의 첫 항목.',
    verseLine: V_DUK0, verseLineKo: V_DUK0K, audio: true },
  { type: 'teach', icon: '👴', word: 'jarāpi', pronKo: '자라~삐', meaning: '늙음도',
    grammar: '여성명사 주격 + api', baseForm: 'jarā + api',
    buddhism: '노(老).', verseLine: V_DUK0, verseLineKo: V_DUK0K, audio: true },
  { type: 'teach', icon: '⚰️', word: 'maraṇampi', pronKo: '마라남삐', meaning: '죽음도',
    grammar: '중성명사 주격 + api', baseForm: 'maraṇa + api',
    buddhism: '사(死).', verseLine: V_DUK0, verseLineKo: V_DUK0K, audio: true },
  { type: 'teach', icon: '😢', word: 'sokaparidevadukkhadomanassupāyāsāpi', pronKo: '소까빠리데와둑카도마낫수빠~야~사~삐', meaning: '슬픔·비탄·괴로움·근심·번뇌도',
    grammar: '복합어, 주격 + api', baseForm: 'soka+parideva+dukkha+domanassa+upāyāsa',
    formNote: '5요소 dvandva 복합어 — 내적 고통 분류',
    verseLine: V_DUK0, verseLineKo: V_DUK0K, audio: true },
  { type: 'teach', icon: '💔', word: 'appiyehi sampayogo', pronKo: '압삐예히 삼빠요고', meaning: '사랑하지 않는 자들과 만남',
    grammar: '도구격 + 주격 복합어', baseForm: 'appiya(싫은) + sampayoga(만남)',
    formNote: 'a(부정) + piya(사랑하는) = 싫은\nsampayoga = "함께 만남"',
    verseLine: V_DUK0, verseLineKo: V_DUK0K, audio: true },
  { type: 'teach', icon: '💔', word: 'piyehi vippayogo', pronKo: '삐예히 윕빠요고', meaning: '사랑하는 자들과 이별',
    grammar: '도구격 + 주격 복합어', baseForm: 'piya(사랑하는) + vippayoga(이별)',
    formNote: 'vi(분리) + payoga = "헤어짐"',
    verseLine: V_DUK0, verseLineKo: V_DUK0K, audio: true },
  { type: 'teach', icon: '🚫', word: 'yampicchaṃ na labhati', pronKo: '얌삣창 나 라바띠', meaning: '원하는 것을 얻지 못함',
    grammar: '관계절 구문', baseForm: 'yaṃ + pi + icchaṃ + na + labhati',
    formNote: 'yaṃ(~한 것을) + pi(도) + icchaṃ(원함) + na(아니) + labhati(얻는다)',
    verseLine: V_DUK0, verseLineKo: V_DUK0K, audio: true },
  { type: 'teach', icon: '📝', word: 'saṅkhittena', pronKo: '상킷떼나', meaning: '요컨대, 간추려',
    grammar: '도구격 부사', baseForm: 'saṅkhitta (요약된)',
    verseLine: V_DUK0, verseLineKo: V_DUK0K, audio: true },
  { type: 'teach', icon: '📦', word: 'pañcupādānakkhandhā', pronKo: '빤쭈빠~다~낙칸다~', meaning: '오취온 (주격 복수)',
    grammar: '복합어, 주격 남성 복수', baseForm: 'pañca + upādāna + khandha',
    buddhism: '오취온(五取蘊). 고성제의 결론.',
    verseLine: V_DUK0, verseLineKo: V_DUK0K, audio: true },
  { type: 'verse', pali: V_DUK0, pronKo: '까따만짜, 빅카웨, 둑캉 아리야삿짱? 자~띠삐 둑카~, 자라~삐 둑카~, 마라남삐 둑캉, 소까빠리데와둑카도마낫수빠~야~사~삐 둑카~, 압삐예히 삼빠요고삐 둑코, 삐예히 윕빠요고삐 둑코, 얌삣창 나 라바띠 땀삐 둑캉, 상킷떼나 빤쭈빠~다~낙칸다~ 둑카~.',
    translation: V_DUK0K, highlight: ['katamañca','jātipi','jarāpi','maraṇampi','appiyehi','piyehi','yampicchaṃ','saṅkhittena','pañcupādānakkhandhā'],
    note: '😰 고성제 정의: 8가지 + 오취온.' },

  // V_DUK1 jāti 정의
  { type: 'teach', icon: '🍼', word: 'sañjāti', pronKo: '산자~띠', meaning: '생겨남',
    grammar: '여성명사, 주격 단수', baseForm: 'sañjāti',
    verseLine: V_DUK1, verseLineKo: V_DUK1K, audio: true },
  { type: 'teach', icon: '🌱', word: 'okkanti', pronKo: '옥깐띠', meaning: '출현, 진입',
    grammar: '여성명사, 주격 단수', baseForm: 'okkanti (ava- + √kam)',
    verseLine: V_DUK1, verseLineKo: V_DUK1K, audio: true },
  { type: 'teach', icon: '🌟', word: 'abhinibbatti', pronKo: '아비닙밧띠', meaning: '발생, 발현',
    grammar: '여성명사, 주격 단수', baseForm: 'abhinibbatti (abhi- + nis- + √vat)',
    verseLine: V_DUK1, verseLineKo: V_DUK1K, audio: true },
  { type: 'teach', icon: '📦', word: 'khandhānaṃ', pronKo: '칸다~낭', meaning: '무더기들의 (속격 복수)',
    grammar: '남성명사, 속격 복수', baseForm: 'khandha',
    verseLine: V_DUK1, verseLineKo: V_DUK1K, audio: true },
  { type: 'teach', icon: '👁️‍🗨️', word: 'pātubhāvo', pronKo: '빠~뚜바~오', meaning: '나타남, 출현',
    grammar: '남성명사, 주격 단수', baseForm: 'pātubhāva (pātu + bhāva)',
    verseLine: V_DUK1, verseLineKo: V_DUK1K, audio: true },
  { type: 'teach', icon: '🎁', word: 'paṭilābho', pronKo: '빠띨라~보', meaning: '획득',
    grammar: '남성명사, 주격 단수', baseForm: 'paṭilābha (paṭi- + √labh)',
    verseLine: V_DUK1, verseLineKo: V_DUK1K, audio: true },
  { type: 'teach', icon: '💬', word: 'vuccati', pronKo: '웃짜띠', meaning: '불린다, 일컬어진다',
    grammar: '동사 3인칭 단수 수동 현재', baseForm: 'vuccati (√vac의 수동)',
    formNote: '√vac(말하다) 수동 = "말해지다, 일컬어지다"\n정의 결론 정형구',
    verseLine: V_DUK1, verseLineKo: V_DUK1K, audio: true },
  { type: 'verse', pali: V_DUK1, pronKo: '까따마~ 짜, 빅카웨, 자~띠? 야~ 떼상 떼상 삿따~낭 땀히 땀히 삿따니까~예 자~띠 산자~띠 옥깐띠 아비닙밧띠 칸다~낭 빠~뚜바~오 아~야따나~낭 빠띨라~보, 아양 웃짜띠, 빅카웨, 자~띠.',
    translation: V_DUK1K, highlight: ['sañjāti','okkanti','abhinibbatti','khandhānaṃ','pātubhāvo','paṭilābho','vuccati'], note: '👶 jāti (태어남) 정의.' },

  // V_DUK2 jarā
  { type: 'teach', icon: '🥱', word: 'jīraṇatā', pronKo: '지~라나따~', meaning: '노쇠 (상태)',
    grammar: '여성명사, 주격 단수', baseForm: 'jīraṇa (√jīr 늙다) + -tā',
    verseLine: V_DUK2, verseLineKo: V_DUK2K, audio: true },
  { type: 'teach', icon: '🦷', word: 'khaṇḍiccaṃ', pronKo: '칸딧짱', meaning: '이가 빠짐',
    grammar: '중성명사, 주격 단수', baseForm: 'khaṇḍa(부서진) + -icca',
    verseLine: V_DUK2, verseLineKo: V_DUK2K, audio: true },
  { type: 'teach', icon: '👴', word: 'pāliccaṃ', pronKo: '빨릿짱', meaning: '머리가 셈',
    grammar: '중성명사, 주격 단수', baseForm: 'pālicca (palita=흰)',
    verseLine: V_DUK2, verseLineKo: V_DUK2K, audio: true },
  { type: 'teach', icon: '👵', word: 'valittacatā', pronKo: '왈릿따짜따~', meaning: '살갗 주름',
    grammar: '여성명사, 주격 단수', baseForm: 'valita(주름) + taca(살갗) + -tā',
    verseLine: V_DUK2, verseLineKo: V_DUK2K, audio: true },
  { type: 'teach', icon: '⏳', word: 'āyuno', pronKo: '아~유노', meaning: '수명의 (속격)',
    grammar: '중성명사, 속격 단수', baseForm: 'āyu (수명)',
    verseLine: V_DUK2, verseLineKo: V_DUK2K, audio: true },
  { type: 'teach', icon: '📉', word: 'saṃhāni', pronKo: '상하~니', meaning: '감소',
    grammar: '여성명사, 주격 단수', baseForm: 'saṃhāni (saṃ- + √hā)',
    verseLine: V_DUK2, verseLineKo: V_DUK2K, audio: true },
  { type: 'teach', icon: '👀', word: 'indriyānaṃ', pronKo: '인드리야~낭', meaning: '감각기관들의 (속격 복수)',
    grammar: '중성명사, 속격 복수', baseForm: 'indriya (감각기능)',
    buddhism: '근(根). 안·이·비·설·신·의 6근.',
    verseLine: V_DUK2, verseLineKo: V_DUK2K, audio: true },
  { type: 'teach', icon: '🍂', word: 'paripāko', pronKo: '빠리빠~꼬', meaning: '성숙, 쇠퇴',
    grammar: '남성명사, 주격 단수', baseForm: 'paripāka (pari- + √pac 익다)',
    formNote: '"완전히 익음 = 쇠퇴"',
    verseLine: V_DUK2, verseLineKo: V_DUK2K, audio: true },
  { type: 'verse', pali: V_DUK2, pronKo: '까따마~ 짜, 빅카웨, 자라~? 야~... 자라~ 지~라나따~ 칸딧짱 빨릿짱 왈릿따짜따~ 아~유노 상하~니 인드리야~낭 빠리빠~꼬...',
    translation: V_DUK2K, highlight: ['jīraṇatā','khaṇḍiccaṃ','pāliccaṃ','valittacatā','āyuno','saṃhāni','indriyānaṃ','paripāko'], note: '👴 jarā (늙음) 정의.' },

  // V_DUK3 maraṇa
  { type: 'teach', icon: '💀', word: 'cuti', pronKo: '쭈띠', meaning: '떠나감, 죽음',
    grammar: '여성명사, 주격 단수', baseForm: 'cuti (√cu 떠나다)',
    verseLine: V_DUK3, verseLineKo: V_DUK3K, audio: true },
  { type: 'teach', icon: '💀', word: 'cavanatā', pronKo: '짜와나따~', meaning: '떠남 (상태)',
    grammar: '여성명사, 주격 단수', baseForm: 'cavana(떠남) + -tā',
    verseLine: V_DUK3, verseLineKo: V_DUK3K, audio: true },
  { type: 'teach', icon: '💥', word: 'bhedo', pronKo: '베도', meaning: '무너짐, 깨짐',
    grammar: '남성명사, 주격 단수', baseForm: 'bheda (√bhid 부수다)',
    verseLine: V_DUK3, verseLineKo: V_DUK3K, audio: true },
  { type: 'teach', icon: '🌫️', word: 'antaradhānaṃ', pronKo: '안따라다~낭', meaning: '사라짐',
    grammar: '중성명사, 주격 단수', baseForm: 'antaradhāna',
    verseLine: V_DUK3, verseLineKo: V_DUK3K, audio: true },
  { type: 'teach', icon: '💀', word: 'maccu', pronKo: '맛쭈', meaning: '죽음 (마라)',
    grammar: '남성명사, 주격 단수', baseForm: 'maccu (Skt mṛtyu)',
    buddhism: '마라(Māra)와 관련.', verseLine: V_DUK3, verseLineKo: V_DUK3K, audio: true },
  { type: 'teach', icon: '⏰', word: 'kālakiriyā', pronKo: '깔~라끼리야~', meaning: '시간이 다함, 임종',
    grammar: '여성명사, 주격 단수', baseForm: 'kāla(시간) + kiriyā(행위)',
    formNote: '"시간을 마침 = 임종"', verseLine: V_DUK3, verseLineKo: V_DUK3K, audio: true },
  { type: 'teach', icon: '⚰️', word: 'kaḷevarassa', pronKo: '깔레와랏사', meaning: '시체의 (속격)',
    grammar: '중성명사, 속격 단수', baseForm: 'kaḷevara (시체)',
    verseLine: V_DUK3, verseLineKo: V_DUK3K, audio: true },
  { type: 'teach', icon: '⬇️', word: 'nikkhepo', pronKo: '닉케뽀', meaning: '내려놓음',
    grammar: '남성명사, 주격 단수', baseForm: 'nikkhepa (ni- + √khip)',
    verseLine: V_DUK3, verseLineKo: V_DUK3K, audio: true },
  { type: 'teach', icon: '💔', word: 'jīvitindriyassupacchedo', pronKo: '지~위띤드리얏수빳체도', meaning: '생명 기능의 끊어짐',
    grammar: '복합어, 주격', baseForm: 'jīvita(생명) + indriya(기능) + upaccheda(끊음)',
    formNote: 'jīvitindriya = 명근(命根) / upaccheda = 단절',
    verseLine: V_DUK3, verseLineKo: V_DUK3K, audio: true },
  { type: 'verse', pali: V_DUK3, pronKo: '까따만짜, 빅카웨, 마라낭? 양 떼상 떼상 삿따~낭... 쭈띠 짜와나따~ 베도 안따라다~낭 맛쭈 마라낭 깔~라끼리야~ 칸다~낭 베도 깔레와랏사 닉케뽀 지~위띤드리얏수빳체도...',
    translation: V_DUK3K, highlight: ['cuti','cavanatā','bhedo','antaradhānaṃ','maccu','kālakiriyā','kaḷevarassa','nikkhepo','jīvitindriyassupacchedo'], note: '⚰️ maraṇa (죽음) 정의.' },

  // V_DUK4 soka
  { type: 'teach', icon: '😢', word: 'soko', pronKo: '소꼬', meaning: '슬픔',
    grammar: '남성명사, 주격 단수', baseForm: 'soka',
    verseLine: V_DUK4, verseLineKo: V_DUK4K, audio: true },
  { type: 'teach', icon: '🌑', word: 'aññataraññatarena byasanena', pronKo: '안냐따란냐따레나 뱌사네나', meaning: '어떤 어떤 재난에 (도구격)',
    grammar: '도구격 구문', baseForm: 'aññatara(어떤) 반복 + byasana(재난)',
    verseLine: V_DUK4, verseLineKo: V_DUK4K, audio: true },
  { type: 'teach', icon: '🤝', word: 'samannāgatassa', pronKo: '사만나~가땃사', meaning: '만난 자의 (속격)',
    grammar: '과거분사, 속격', baseForm: 'samannāgata',
    verseLine: V_DUK4, verseLineKo: V_DUK4K, audio: true },
  { type: 'teach', icon: '☔', word: 'dukkhadhammena', pronKo: '둑카담메나', meaning: '괴로운 법에 (도구격)',
    grammar: '복합어, 도구격', baseForm: 'dukkha + dhamma',
    verseLine: V_DUK4, verseLineKo: V_DUK4K, audio: true },
  { type: 'teach', icon: '🎯', word: 'phuṭṭhassa', pronKo: '풋탓사', meaning: '닿은 자의 (속격)',
    grammar: '과거분사, 속격', baseForm: 'phusati (닿다) 과거분사',
    verseLine: V_DUK4, verseLineKo: V_DUK4K, audio: true },
  { type: 'teach', icon: '😢', word: 'socanā', pronKo: '소짜나~', meaning: '슬퍼함',
    grammar: '여성명사, 주격', baseForm: 'socanā (√soc)',
    verseLine: V_DUK4, verseLineKo: V_DUK4K, audio: true },
  { type: 'teach', icon: '😭', word: 'antosoko', pronKo: '안또소꼬', meaning: '안의 슬픔',
    grammar: '복합어, 주격', baseForm: 'anto(안) + soka',
    verseLine: V_DUK4, verseLineKo: V_DUK4K, audio: true },
  { type: 'verse', pali: V_DUK4, pronKo: '까따모 짜, 빅카웨, 소꼬? 요 코, 빅카웨, 안냐따란냐따레나 뱌사네나 사만나~가땃사... 소꼬 소짜나~ 소찌땃땅 안또소꼬 안또빠리소꼬...',
    translation: V_DUK4K, highlight: ['soko','byasanena','samannāgatassa','dukkhadhammena','phuṭṭhassa','socanā','antosoko'], note: '😢 soka (슬픔) 정의.' },

  // V_DUK5 parideva
  { type: 'teach', icon: '😭', word: 'paridevo', pronKo: '빠리데오', meaning: '비탄, 통곡',
    grammar: '남성명사, 주격 단수', baseForm: 'parideva (pari- + √div)',
    verseLine: V_DUK5, verseLineKo: V_DUK5K, audio: true },
  { type: 'teach', icon: '😭', word: 'ādevo', pronKo: '아~데오', meaning: '한탄',
    grammar: '남성명사, 주격 단수', baseForm: 'ādeva',
    verseLine: V_DUK5, verseLineKo: V_DUK5K, audio: true },
  { type: 'verse', pali: V_DUK5, pronKo: '까따모 짜, 빅카웨, 빠리데오? 아~데오 빠리데오 아~데와나~ 빠리데와나~ 아~데위땃땅 빠리데위땃땅...',
    translation: V_DUK5K, highlight: ['paridevo','ādevo'], note: '😭 parideva (비탄) 정의.' },

  // V_DUK6 kāyika dukkha
  { type: 'teach', icon: '🤕', word: 'kāyikaṃ', pronKo: '까~이깡', meaning: '몸의',
    grammar: '형용사, 주격 중성', baseForm: 'kāyika',
    verseLine: V_DUK6, verseLineKo: V_DUK6K, audio: true },
  { type: 'teach', icon: '😖', word: 'asātaṃ', pronKo: '아사~땅', meaning: '불쾌한',
    grammar: '형용사, 주격 중성', baseForm: 'a(부정) + sāta(쾌적)',
    verseLine: V_DUK6, verseLineKo: V_DUK6K, audio: true },
  { type: 'teach', icon: '🤚', word: 'kāyasamphassajaṃ', pronKo: '까~야삼팟사장', meaning: '몸의 접촉에서 생긴',
    grammar: '복합어, 주격 중성', baseForm: 'kāya + samphassa(접촉) + ja(생긴)',
    verseLine: V_DUK6, verseLineKo: V_DUK6K, audio: true },
  { type: 'teach', icon: '💭', word: 'vedayitaṃ', pronKo: '웨다이땅', meaning: '느낌, 느껴진 것',
    grammar: '과거분사, 주격 중성', baseForm: 'vedayita',
    verseLine: V_DUK6, verseLineKo: V_DUK6K, audio: true },
  { type: 'verse', pali: V_DUK6, pronKo: '까따만짜, 빅카웨, 둑캉? 양 코, 빅카웨, 까~이깡 둑캉 까~이깡 아사~땅 까~야삼팟사장 둑캉 아사~땅 웨다이땅...',
    translation: V_DUK6K, highlight: ['kāyikaṃ','asātaṃ','kāyasamphassajaṃ','vedayitaṃ'], note: '🤕 dukkha (몸의 괴로움) 정의.' },

  // V_DUK7 domanassa
  { type: 'teach', icon: '😔', word: 'cetasikaṃ', pronKo: '쩨따시깡', meaning: '마음의, 정신적인',
    grammar: '형용사, 주격 중성', baseForm: 'cetasika (ceto=마음)',
    verseLine: V_DUK7, verseLineKo: V_DUK7K, audio: true },
  { type: 'teach', icon: '🧠', word: 'manosamphassajaṃ', pronKo: '마노삼팟사장', meaning: '마노의 접촉에서 생긴',
    grammar: '복합어, 주격 중성', baseForm: 'mano + samphassa + ja',
    verseLine: V_DUK7, verseLineKo: V_DUK7K, audio: true },
  { type: 'verse', pali: V_DUK7, pronKo: '까따만짜, 빅카웨, 도마낫상? 양 코, 빅카웨, 쩨따시깡 둑캉 쩨따시깡 아사~땅 마노삼팟사장 둑캉 아사~땅 웨다이땅...',
    translation: V_DUK7K, highlight: ['cetasikaṃ','manosamphassajaṃ'], note: '😔 domanassa (근심) 정의.' },

  // V_DUK8 upāyāsa
  { type: 'teach', icon: '😩', word: 'upāyāso', pronKo: '우빠~야~소', meaning: '번뇌, 절망',
    grammar: '남성명사, 주격 단수', baseForm: 'upāyāsa (upa- + āyāsa)',
    verseLine: V_DUK8, verseLineKo: V_DUK8K, audio: true },
  { type: 'teach', icon: '😫', word: 'āyāso', pronKo: '아~야~소', meaning: '고뇌',
    grammar: '남성명사, 주격 단수', baseForm: 'āyāsa',
    verseLine: V_DUK8, verseLineKo: V_DUK8K, audio: true },
  { type: 'verse', pali: V_DUK8, pronKo: '까따모 짜, 빅카웨, 우빠~야~소? 요 코, 빅카웨... 아~야~소 우빠~야~소 아~야~시땃땅 우빠~야~시땃땅...',
    translation: V_DUK8K, highlight: ['upāyāso','āyāso'], note: '😩 upāyāsa (절망) 정의.' },

  // V_DUK9 appiyehi sampayoga
  { type: 'teach', icon: '🚫', word: 'aniṭṭhā', pronKo: '아닛타~', meaning: '원치 않는',
    grammar: '형용사, 주격 복수', baseForm: 'a(부정) + iṭṭha(원하는)',
    verseLine: V_DUK9, verseLineKo: V_DUK9K, audio: true },
  { type: 'teach', icon: '🚫', word: 'akantā', pronKo: '아깐따~', meaning: '사랑스럽지 않은',
    grammar: '형용사, 주격 복수', baseForm: 'a + kanta',
    verseLine: V_DUK9, verseLineKo: V_DUK9K, audio: true },
  { type: 'teach', icon: '🚫', word: 'amanāpā', pronKo: '아마나~빠~', meaning: '마음에 들지 않는',
    grammar: '형용사, 주격 복수', baseForm: 'a + manāpa (만족스러운)',
    verseLine: V_DUK9, verseLineKo: V_DUK9K, audio: true },
  { type: 'teach', icon: '🤝', word: 'saṅgati', pronKo: '상가띠', meaning: '어울림, 모임',
    grammar: '여성명사, 주격 단수', baseForm: 'saṅgati',
    verseLine: V_DUK9, verseLineKo: V_DUK9K, audio: true },
  { type: 'teach', icon: '🫂', word: 'samāgamo', pronKo: '사마~가모', meaning: '만남',
    grammar: '남성명사, 주격 단수', baseForm: 'samāgama',
    verseLine: V_DUK9, verseLineKo: V_DUK9K, audio: true },
  { type: 'teach', icon: '🔀', word: 'missībhāvo', pronKo: '밋시~바~오', meaning: '섞임',
    grammar: '복합어, 주격', baseForm: 'missī(섞인) + bhāva',
    verseLine: V_DUK9, verseLineKo: V_DUK9K, audio: true },
  { type: 'verse', pali: V_DUK9, pronKo: '까따모 짜... 압삐예히 삼빠요고 둑코? 이다 얏사 떼 혼띠 아닛타~ 아깐따~ 아마나~빠~ 루~빠~ 삿다~ 간다~ 라사~ 폿탑바~ 담마~... 상가띠 사마~가모 사모다~낭 밋시~바~오...',
    translation: V_DUK9K, highlight: ['aniṭṭhā','akantā','amanāpā','saṅgati','samāgamo','missībhāvo'], note: '💔 미운 자와 만나는 괴로움.' },

  // V_DUK10 piyehi vippayoga
  { type: 'teach', icon: '💚', word: 'iṭṭhā', pronKo: '잇타~', meaning: '원하는',
    grammar: '형용사, 주격 복수', baseForm: 'iṭṭha',
    verseLine: V_DUK10, verseLineKo: V_DUK10K, audio: true },
  { type: 'teach', icon: '💚', word: 'kantā', pronKo: '깐따~', meaning: '사랑스러운',
    grammar: '형용사, 주격 복수', baseForm: 'kanta',
    verseLine: V_DUK10, verseLineKo: V_DUK10K, audio: true },
  { type: 'teach', icon: '💚', word: 'manāpā', pronKo: '마나~빠~', meaning: '마음에 드는',
    grammar: '형용사, 주격 복수', baseForm: 'manāpa',
    verseLine: V_DUK10, verseLineKo: V_DUK10K, audio: true },
  { type: 'teach', icon: '👩', word: 'mātā', pronKo: '마~따~', meaning: '어머니',
    grammar: '여성명사, 주격 단수', baseForm: 'mātar',
    verseLine: V_DUK10, verseLineKo: V_DUK10K, audio: true },
  { type: 'teach', icon: '👨', word: 'pitā', pronKo: '삐따~', meaning: '아버지',
    grammar: '남성명사, 주격 단수', baseForm: 'pitar',
    verseLine: V_DUK10, verseLineKo: V_DUK10K, audio: true },
  { type: 'teach', icon: '👬', word: 'bhātā', pronKo: '바~따~', meaning: '형제',
    grammar: '남성명사, 주격 단수', baseForm: 'bhātar',
    verseLine: V_DUK10, verseLineKo: V_DUK10K, audio: true },
  { type: 'teach', icon: '👭', word: 'bhaginī', pronKo: '바기니~', meaning: '자매',
    grammar: '여성명사, 주격 단수', baseForm: 'bhaginī',
    verseLine: V_DUK10, verseLineKo: V_DUK10K, audio: true },
  { type: 'teach', icon: '🧑‍🤝‍🧑', word: 'mittā', pronKo: '밋따~', meaning: '벗 (주격 복수)',
    grammar: '남성명사, 주격 복수', baseForm: 'mitta',
    verseLine: V_DUK10, verseLineKo: V_DUK10K, audio: true },
  { type: 'teach', icon: '👥', word: 'amaccā', pronKo: '아맛짜~', meaning: '동료 (주격 복수)',
    grammar: '남성명사, 주격 복수', baseForm: 'amacca',
    verseLine: V_DUK10, verseLineKo: V_DUK10K, audio: true },
  { type: 'teach', icon: '👪', word: 'ñātisālohitā', pronKo: '냐~띠사~로히따~', meaning: '친족·혈족 (주격 복수)',
    grammar: '복합어, 주격 복수', baseForm: 'ñāti(친족) + sālohita(혈족)',
    verseLine: V_DUK10, verseLineKo: V_DUK10K, audio: true },
  { type: 'verse', pali: V_DUK10, pronKo: '까따모 짜... 삐예히 윕빠요고 둑코? 이다 얏사 떼 혼띠 잇타~ 깐따~ 마나~빠~... 마~따~ 와~ 삐따~ 와~ 바~따~ 와~ 바기니~ 와~ 밋따~ 와~ 아맛짜~ 와~ 냐~띠사~로히따~ 와~...',
    translation: V_DUK10K, highlight: ['iṭṭhā','kantā','manāpā','mātā','pitā','bhātā','bhaginī','mittā','amaccā','ñātisālohitā'], note: '💔 사랑하는 자와 헤어지는 괴로움.' },

  // V_DUK11A-E yampicchaṃ
  { type: 'teach', icon: '⏳', word: 'jātidhammānaṃ', pronKo: '자~띠담마~낭', meaning: '태어남의 법에 매인 (속격 복수)',
    grammar: '복합어, 속격 복수', baseForm: 'jāti(태어남) + dhamma(법)',
    formNote: '"태어남이라는 법(본성)을 가진 자들의"',
    verseLine: V_DUK11A, verseLineKo: V_DUK11AK, audio: true },
  { type: 'teach', icon: '💭', word: 'icchā', pronKo: '잇차~', meaning: '바람, 욕구',
    grammar: '여성명사, 주격 단수', baseForm: 'icchā (√iṣ 원하다)',
    verseLine: V_DUK11A, verseLineKo: V_DUK11AK, audio: true },
  { type: 'teach', icon: '😔', word: 'aho vata', pronKo: '아호 와따', meaning: '아! 부디!',
    grammar: '감탄사 결합', baseForm: 'aho + vata',
    formNote: '"아 부디 ~이기를!" — 강한 바람',
    verseLine: V_DUK11A, verseLineKo: V_DUK11AK, audio: true },
  { type: 'teach', icon: '👥', word: 'mayaṃ', pronKo: '마양', meaning: '우리는',
    grammar: '대명사, 주격 복수', baseForm: 'ahaṃ',
    verseLine: V_DUK11A, verseLineKo: V_DUK11AK, audio: true },
  { type: 'teach', icon: '🚫', word: 'assāma', pronKo: '앗사~마', meaning: '우리가 ~이기를 (가능법)',
    grammar: '동사 1인칭 복수 가능법', baseForm: 'atthi 가능법',
    verseLine: V_DUK11A, verseLineKo: V_DUK11AK, audio: true },
  { type: 'teach', icon: '🛑', word: 'āgaccheyya', pronKo: '아~갓체이야', meaning: '오기를 (가능법)',
    grammar: '동사 3인칭 단수 가능법', baseForm: 'āgacchati (오다)',
    verseLine: V_DUK11A, verseLineKo: V_DUK11AK, audio: true },
  { type: 'teach', icon: '🚪', word: 'pattabbaṃ', pronKo: '빳땁방', meaning: '얻을 수 있는',
    grammar: '미래분사', baseForm: 'pattabba (√pā 도달)',
    verseLine: V_DUK11A, verseLineKo: V_DUK11AK, audio: true },
  { type: 'verse', pali: V_DUK11A, pronKo: '까따만짜... 얌삣창 나 라바띠 땀삐 둑캉? 자~띠담마~낭, 빅카웨, 삿따~낭 에왕 잇차~ 웁빳자띠 — \'아호 와따 마양 나 자~띠담마~ 앗사~마, 나 짜 와따 노 자~띠 아~갓체이야~\'띠. 나 코 빠네땅 잇차~야 빳땁방, 이담삐 얌삣창 나 라바띠 땀삐 둑캉.',
    translation: V_DUK11AK, highlight: ['jātidhammānaṃ','icchā','aho vata','mayaṃ','assāma','āgaccheyyā','pattabbaṃ'], note: '🚫 원하는 것 못 얻음 — 태어남.' },

  { type: 'teach', icon: '⏳', word: 'jarādhammānaṃ', pronKo: '자라~담마~낭', meaning: '늙음의 법에 매인 (속격 복수)',
    grammar: '복합어, 속격 복수', baseForm: 'jarā + dhamma',
    verseLine: V_DUK11B, verseLineKo: V_DUK11BK, audio: true },
  { type: 'verse', pali: V_DUK11B, pronKo: '자라~담마~낭, 빅카웨, 삿따~낭 에왕 잇차~ 웁빳자띠 — \'아호 와따 마양 나 자라~담마~ 앗사~마, 나 짜 와따 노 자라~ 아~갓체이야~\'띠...',
    translation: V_DUK11BK, highlight: ['jarādhammānaṃ'], note: '🚫 원하는 것 못 얻음 — 늙음.' },

  { type: 'teach', icon: '🤒', word: 'byādhi', pronKo: '뱌~디', meaning: '병',
    grammar: '남성명사, 주격 단수', baseForm: 'byādhi',
    verseLine: V_DUK11C, verseLineKo: V_DUK11CK, audio: true },
  { type: 'teach', icon: '🤒', word: 'byādhidhammānaṃ', pronKo: '뱌~디담마~낭', meaning: '병의 법에 매인 (속격 복수)',
    grammar: '복합어, 속격 복수', baseForm: 'byādhi + dhamma',
    verseLine: V_DUK11C, verseLineKo: V_DUK11CK, audio: true },
  { type: 'verse', pali: V_DUK11C, pronKo: '뱌~디담마~낭, 빅카웨, 삿따~낭... 아호 와따 마양 나 뱌~디담마~...',
    translation: V_DUK11CK, highlight: ['byādhi','byādhidhammānaṃ'], note: '🚫 원하는 것 못 얻음 — 병.' },

  { type: 'teach', icon: '⚰️', word: 'maraṇadhammānaṃ', pronKo: '마라나담마~낭', meaning: '죽음의 법에 매인 (속격 복수)',
    grammar: '복합어, 속격 복수', baseForm: 'maraṇa + dhamma',
    verseLine: V_DUK11D, verseLineKo: V_DUK11DK, audio: true },
  { type: 'verse', pali: V_DUK11D, pronKo: '마라나담마~낭, 빅카웨, 삿따~낭...',
    translation: V_DUK11DK, highlight: ['maraṇadhammānaṃ'], note: '🚫 원하는 것 못 얻음 — 죽음.' },

  { type: 'teach', icon: '😰', word: 'sokaparidevadukkhadomanassupāyāsadhammānaṃ', pronKo: '소까빠리데와둑카도마낫수빠~야~사담마~낭', meaning: '슬픔·비탄·괴로움·근심·번뇌의 법에 매인 (속격 복수)',
    grammar: '복합어, 속격 복수', baseForm: '5요소 + dhamma',
    verseLine: V_DUK11E, verseLineKo: V_DUK11EK, audio: true },
  { type: 'verse', pali: V_DUK11E, pronKo: '소까빠리데와둑카도마낫수빠~야~사담마~낭, 빅카웨, 삿따~낭...',
    translation: V_DUK11EK, highlight: ['sokaparidevadukkhadomanassupāyāsadhammānaṃ'], note: '🚫 원하는 것 못 얻음 — 슬픔·비탄·괴로움·근심·번뇌.' },

  // V_DUK12 오취온
  { type: 'teach', icon: '📦', word: 'rūpupādānakkhandho', pronKo: '루~뿌빠~다~낙칸도', meaning: '색취온',
    grammar: '복합어, 주격', baseForm: 'rūpa + upādāna + khandha',
    verseLine: V_DUK12, verseLineKo: V_DUK12K, audio: true },
  { type: 'teach', icon: '📦', word: 'vedanupādānakkhandho', pronKo: '웨다누빠~다~낙칸도', meaning: '수취온',
    grammar: '복합어, 주격', baseForm: 'vedanā + upādāna + khandha',
    verseLine: V_DUK12, verseLineKo: V_DUK12K, audio: true },
  { type: 'teach', icon: '📦', word: 'saññupādānakkhandho', pronKo: '산뉴빠~다~낙칸도', meaning: '상취온',
    grammar: '복합어, 주격', baseForm: 'saññā + upādāna + khandha',
    verseLine: V_DUK12, verseLineKo: V_DUK12K, audio: true },
  { type: 'teach', icon: '📦', word: 'saṅkhārupādānakkhandho', pronKo: '상카~루빠~다~낙칸도', meaning: '행취온',
    grammar: '복합어, 주격', baseForm: 'saṅkhāra + upādāna + khandha',
    verseLine: V_DUK12, verseLineKo: V_DUK12K, audio: true },
  { type: 'teach', icon: '📦', word: 'viññāṇupādānakkhandho', pronKo: '윈냐~누빠~다~낙칸도', meaning: '식취온',
    grammar: '복합어, 주격', baseForm: 'viññāṇa + upādāna + khandha',
    verseLine: V_DUK12, verseLineKo: V_DUK12K, audio: true },
  { type: 'verse', pali: V_DUK12, pronKo: '까따메 짜, 빅카웨, 상킷떼나 빤쭈빠~다~낙칸다~ 둑카~? 셋야티당 — 루~뿌빠~다~낙칸도, 웨다누빠~다~낙칸도, 산뉴빠~다~낙칸도, 상카~루빠~다~낙칸도, 윈냐~누빠~다~낙칸도...',
    translation: V_DUK12K, highlight: ['rūpupādānakkhandho','vedanupādānakkhandho','saññupādānakkhandho','saṅkhārupādānakkhandho','viññāṇupādānakkhandho'], note: '🪨 요컨대 오취온이 괴로움 — 고성제 마무리.' },

  // 집성제
  { type: 'intro', icon: '🔥', title: '— 集聖諦 (samudaya) —', subtitle: '괴로움의 일어남의 성스러운 진리',
    description: '갈애(taṇhā) — 욕애·유애·무유애.' },

  // ── V_SAM_S0: 갈애 정의 ──
  { type: 'teach', icon: '🔥', word: 'taṇhā', pronKo: '딴하~', meaning: '갈애, 갈증',
    grammar: '여성명사, 주격 단수', baseForm: 'taṇhā (√tas 목마르다)',
    formNote: '"목마름" → "갈애"',
    buddhism: '애(愛). 4성제 집성제 = taṇhā. 12연기의 8번째.',
    verseLine: V_SAM_S0, verseLineKo: V_SAM_S0K, audio: true },
  { type: 'teach', icon: '🔄', word: 'ponobbhavikā', pronKo: '뽀높바위까~', meaning: '다시 존재로 이끄는',
    grammar: '형용사, 주격 여성 단수', baseForm: 'puna(다시) + bhava(존재) + -ika',
    buddhism: '윤회 재생의 동력.',
    verseLine: V_SAM_S0, verseLineKo: V_SAM_S0K, audio: true },
  { type: 'teach', icon: '😍', word: 'nandīrāgasahagatā', pronKo: '난디~라~가사하가따~', meaning: '즐김과 탐욕을 동반하는',
    grammar: '복합어, 주격 여성 단수', baseForm: 'nandī(즐김) + rāga(탐욕) + sahagata(동반)',
    verseLine: V_SAM_S0, verseLineKo: V_SAM_S0K, audio: true },
  { type: 'teach', icon: '🎢', word: 'tatratatrābhinandinī', pronKo: '따뜨라따뜨라~비난디니~', meaning: '여기저기서 즐기는',
    grammar: '복합어, 주격 여성 단수', baseForm: 'tatra(거기) 반복 + abhinandin(즐기는)',
    verseLine: V_SAM_S0, verseLineKo: V_SAM_S0K, audio: true },
  { type: 'teach', icon: '💋', word: 'kāmataṇhā', pronKo: '까~마딴하~', meaning: '욕애 (감각적 욕망의 갈애)',
    grammar: '복합어, 주격 단수', baseForm: 'kāma(감각욕) + taṇhā',
    buddhism: '욕애(欲愛). 3갈애의 첫째.',
    verseLine: V_SAM_S0, verseLineKo: V_SAM_S0K, audio: true },
  { type: 'teach', icon: '♾️', word: 'bhavataṇhā', pronKo: '바와딴하~', meaning: '유애 (존재의 갈애)',
    grammar: '복합어, 주격 단수', baseForm: 'bhava(존재) + taṇhā',
    buddhism: '유애(有愛). "있고 싶다" — 영원주의.',
    verseLine: V_SAM_S0, verseLineKo: V_SAM_S0K, audio: true },
  { type: 'teach', icon: '🗑️', word: 'vibhavataṇhā', pronKo: '위바와딴하~', meaning: '무유애 (비존재의 갈애)',
    grammar: '복합어, 주격 단수', baseForm: 'vibhava(비존재) + taṇhā',
    buddhism: '무유애(無有愛). "없고 싶다" — 단멸주의.',
    verseLine: V_SAM_S0, verseLineKo: V_SAM_S0K, audio: true },
  { type: 'verse', pali: V_SAM_S0, pronKo: '까따만짜, 빅카웨, 둑카사무다양 아리야삿짱? 야~양 딴하~ 뽀높바위까~ 난디~라~가사하가따~ 따뜨라따뜨라~비난디니~, 셋야티당 — 까~마딴하~ 바와딴하~ 위바와딴하~.',
    translation: V_SAM_S0K, highlight: ['taṇhā','ponobbhavikā','nandīrāgasahagatā','tatratatrābhinandinī','kāmataṇhā','bhavataṇhā','vibhavataṇhā'],
    note: '🔥 세 갈애: kāmataṇhā(욕애)·bhavataṇhā(유애)·vibhavataṇhā(무유애).' },

  // ── V_SAM_S1: 갈애가 일어나는 곳 ──
  { type: 'teach', icon: '❓', word: 'kattha', pronKo: '깟타', meaning: '어디서?',
    grammar: '의문부사 (처격)', baseForm: 'kattha',
    verseLine: V_SAM_S1, verseLineKo: V_SAM_S1K, audio: true },
  { type: 'teach', icon: '🌱', word: 'uppajjamānā', pronKo: '웁빳자마~나~', meaning: '일어나며 (현재분사 중간태)',
    grammar: '현재분사 (중간태), 주격 여성 단수', baseForm: 'uppajjati',
    verseLine: V_SAM_S1, verseLineKo: V_SAM_S1K, audio: true },
  { type: 'teach', icon: '🏠', word: 'nivisamānā', pronKo: '니위사마~나~', meaning: '자리잡으며',
    grammar: '현재분사 (중간태), 주격 여성 단수', baseForm: 'nivisati (ni- + √vis)',
    verseLine: V_SAM_S1, verseLineKo: V_SAM_S1K, audio: true },
  { type: 'teach', icon: '🏠', word: 'nivisati', pronKo: '니위사띠', meaning: '자리잡는다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'nivisati',
    verseLine: V_SAM_S1, verseLineKo: V_SAM_S1K, audio: true },
  { type: 'teach', icon: '🌍', word: 'loke', pronKo: '로께', meaning: '세상에서 (처격)',
    grammar: '남성명사, 처격 단수', baseForm: 'loka',
    verseLine: V_SAM_S1, verseLineKo: V_SAM_S1K, audio: true },
  { type: 'teach', icon: '💖', word: 'piyarūpaṃ', pronKo: '삐야루~빵', meaning: '사랑스러운 모습',
    grammar: '복합어, 주격 중성 단수', baseForm: 'piya(사랑스러운) + rūpa(모습)',
    verseLine: V_SAM_S1, verseLineKo: V_SAM_S1K, audio: true },
  { type: 'teach', icon: '😊', word: 'sātarūpaṃ', pronKo: '사~따루~빵', meaning: '만족스러운 모습',
    grammar: '복합어, 주격 중성 단수', baseForm: 'sāta(만족) + rūpa',
    verseLine: V_SAM_S1, verseLineKo: V_SAM_S1K, audio: true },
  { type: 'teach', icon: '👉', word: 'etthesā', pronKo: '엣테사~', meaning: '여기서 이것이',
    grammar: '부사 + 대명사', baseForm: 'ettha(여기) + esā(이것)',
    verseLine: V_SAM_S1, verseLineKo: V_SAM_S1K, audio: true },
  { type: 'verse', pali: V_SAM_S1, pronKo: '사~ 코 빠네사~, 빅카웨, 딴하~ 깟타 웁빳자마~나~ 웁빳자띠, 깟타 니위사마~나~ 니위사띠? 양 로께 삐야루~빵 사~따루~빵, 엣테사~ 딴하~ 웁빳자마~나~ 웁빳자띠...',
    translation: V_SAM_S1K, highlight: ['kattha','uppajjamānā','nivisamānā','nivisati','piyarūpaṃ','sātarūpaṃ','etthesā'],
    note: '📍 갈애가 일어나는 곳: 사랑스럽고 만족스러운 모습.' },

  // ── V_SAM_S2: 6내처 (cakkhu·sota·ghāna·jivhā·kāya·mano) ──
  { type: 'teach', icon: '❓', word: 'kiñca', pronKo: '낀짜', meaning: '무엇이? + 그리고',
    grammar: '의문대명사 + ca', baseForm: 'kiṃ(무엇) + ca',
    verseLine: V_SAM_S2, verseLineKo: V_SAM_S2K, audio: true },
  { type: 'teach', icon: '👁️', word: 'cakkhu', pronKo: '짝쿠', meaning: '눈 (주격)',
    grammar: '중성명사, 주격 단수', baseForm: 'cakkhu',
    buddhism: '안(眼).', verseLine: V_SAM_S2, verseLineKo: V_SAM_S2K, audio: true },
  { type: 'teach', icon: '👂', word: 'sotaṃ', pronKo: '소땅', meaning: '귀 (주격)',
    grammar: '중성명사, 주격 단수', baseForm: 'sota',
    verseLine: V_SAM_S2, verseLineKo: V_SAM_S2K, audio: true },
  { type: 'teach', icon: '👃', word: 'ghānaṃ', pronKo: '가~낭', meaning: '코 (주격)',
    grammar: '중성명사, 주격 단수', baseForm: 'ghāna',
    verseLine: V_SAM_S2, verseLineKo: V_SAM_S2K, audio: true },
  { type: 'teach', icon: '👅', word: 'jivhā', pronKo: '지와~', meaning: '혀 (주격)',
    grammar: '여성명사, 주격 단수', baseForm: 'jivhā',
    verseLine: V_SAM_S2, verseLineKo: V_SAM_S2K, audio: true },
  { type: 'teach', icon: '🤲', word: 'kāyo', pronKo: '까~요', meaning: '몸 (주격)',
    grammar: '남성명사, 주격 단수', baseForm: 'kāya',
    verseLine: V_SAM_S2, verseLineKo: V_SAM_S2K, audio: true },
  { type: 'teach', icon: '🧠', word: 'mano', pronKo: '마노', meaning: '마노 (주격)',
    grammar: '중성명사, 주격 단수', baseForm: 'mano',
    buddhism: '의(意). 제6근.', verseLine: V_SAM_S2, verseLineKo: V_SAM_S2K, audio: true },
  { type: 'verse', pali: V_SAM_S2, pronKo: '낀짜 로께... 짝쿠 로께 삐야루~빵 사~따루~빵... 소땅 로께... 가~낭 로께. 지와~ 로께. 까~요 로께. 마노 로께...',
    translation: V_SAM_S2K, highlight: ['kiñca','cakkhu','sotaṃ','ghānaṃ','jivhā','kāyo','mano'], note: '👁️ 6내처: 눈·귀·코·혀·몸·마노.' },

  // ── V_SAM_S3: 6외처 (rūpā·saddā·gandhā·rasā·phoṭṭhabbā·dhammā) ──
  { type: 'teach', icon: '🎨', word: 'rūpā', pronKo: '루~빠~', meaning: '형색들 (주격 복수)',
    grammar: '중성명사, 주격 복수', baseForm: 'rūpa',
    verseLine: V_SAM_S3, verseLineKo: V_SAM_S3K, audio: true },
  { type: 'teach', icon: '🔊', word: 'saddā', pronKo: '삿다~', meaning: '소리들 (주격 복수)',
    grammar: '남성명사, 주격 복수', baseForm: 'sadda',
    verseLine: V_SAM_S3, verseLineKo: V_SAM_S3K, audio: true },
  { type: 'teach', icon: '🌸', word: 'gandhā', pronKo: '간다~', meaning: '냄새들 (주격 복수)',
    grammar: '남성명사, 주격 복수', baseForm: 'gandha',
    verseLine: V_SAM_S3, verseLineKo: V_SAM_S3K, audio: true },
  { type: 'teach', icon: '🍯', word: 'rasā', pronKo: '라사~', meaning: '맛들 (주격 복수)',
    grammar: '남성명사, 주격 복수', baseForm: 'rasa',
    verseLine: V_SAM_S3, verseLineKo: V_SAM_S3K, audio: true },
  { type: 'teach', icon: '✋', word: 'phoṭṭhabbā', pronKo: '폿탑바~', meaning: '감촉들 (주격 복수)',
    grammar: '중성명사, 주격 복수', baseForm: 'phoṭṭhabba',
    verseLine: V_SAM_S3, verseLineKo: V_SAM_S3K, audio: true },
  { type: 'teach', icon: '☸️', word: 'dhammā', pronKo: '담마~', meaning: '법들 (주격 복수)',
    grammar: '남성명사, 주격 복수', baseForm: 'dhamma',
    verseLine: V_SAM_S3, verseLineKo: V_SAM_S3K, audio: true },
  { type: 'verse', pali: V_SAM_S3, pronKo: '루~빠~ 로께. 삿다~ 로께. 간다~ 로께. 라사~ 로께. 폿탑바~ 로께. 담마~ 로께...',
    translation: V_SAM_S3K, highlight: ['rūpā','saddā','gandhā','rasā','phoṭṭhabbā','dhammā'], note: '🎨 6외처: 형색·소리·냄새·맛·감촉·법.' },

  // ── V_SAM_S4: 6식 ──
  { type: 'teach', icon: '👁️‍🗨️', word: 'cakkhuviññāṇaṃ', pronKo: '짝쿠윈냐~낭', meaning: '안식 (눈의 의식)',
    grammar: '복합어, 주격 중성', baseForm: 'cakkhu + viññāṇa',
    buddhism: '안식(眼識). 6식의 첫째.',
    verseLine: V_SAM_S4, verseLineKo: V_SAM_S4K, audio: true },
  { type: 'teach', icon: '👂', word: 'sotaviññāṇaṃ', pronKo: '소따윈냐~낭', meaning: '이식 (귀의 의식)',
    grammar: '복합어, 주격 중성', baseForm: 'sota + viññāṇa',
    verseLine: V_SAM_S4, verseLineKo: V_SAM_S4K, audio: true },
  { type: 'teach', icon: '👃', word: 'ghānaviññāṇaṃ', pronKo: '가~나윈냐~낭', meaning: '비식 (코의 의식)',
    grammar: '복합어, 주격 중성', baseForm: 'ghāna + viññāṇa',
    verseLine: V_SAM_S4, verseLineKo: V_SAM_S4K, audio: true },
  { type: 'teach', icon: '👅', word: 'jivhāviññāṇaṃ', pronKo: '지와~윈냐~낭', meaning: '설식 (혀의 의식)',
    grammar: '복합어, 주격 중성', baseForm: 'jivhā + viññāṇa',
    verseLine: V_SAM_S4, verseLineKo: V_SAM_S4K, audio: true },
  { type: 'teach', icon: '🤲', word: 'kāyaviññāṇaṃ', pronKo: '까~야윈냐~낭', meaning: '신식 (몸의 의식)',
    grammar: '복합어, 주격 중성', baseForm: 'kāya + viññāṇa',
    verseLine: V_SAM_S4, verseLineKo: V_SAM_S4K, audio: true },
  { type: 'teach', icon: '🧠', word: 'manoviññāṇaṃ', pronKo: '마노윈냐~낭', meaning: '의식 (마노의 의식)',
    grammar: '복합어, 주격 중성', baseForm: 'mano + viññāṇa',
    verseLine: V_SAM_S4, verseLineKo: V_SAM_S4K, audio: true },
  { type: 'verse', pali: V_SAM_S4, pronKo: '짝쿠윈냐~낭 로께. 소따윈냐~낭 로께. 가~나윈냐~낭 로께. 지와~윈냐~낭 로께. 까~야윈냐~낭 로께. 마노윈냐~낭 로께...',
    translation: V_SAM_S4K, highlight: ['cakkhuviññāṇaṃ','sotaviññāṇaṃ','ghānaviññāṇaṃ','jivhāviññāṇaṃ','kāyaviññāṇaṃ','manoviññāṇaṃ'], note: '👁️ 6식: 안식·이식·비식·설식·신식·의식.' },

  // ── V_SAM_S5: 6촉 ──
  { type: 'teach', icon: '🤝', word: 'samphasso', pronKo: '삼팟소', meaning: '접촉',
    grammar: '남성명사, 주격 단수', baseForm: 'samphassa',
    formNote: 'saṃ(함께) + √phus(닿다) = 접촉',
    buddhism: '촉(觸). 6근+6경+6식의 화합.',
    verseLine: V_SAM_S5, verseLineKo: V_SAM_S5K, audio: true },
  { type: 'teach', icon: '🤝', word: 'cakkhusamphasso', pronKo: '짝쿠삼팟소', meaning: '눈의 접촉',
    grammar: '복합어, 주격', baseForm: 'cakkhu + samphassa',
    verseLine: V_SAM_S5, verseLineKo: V_SAM_S5K, audio: true },
  { type: 'verse', pali: V_SAM_S5, pronKo: '짝쿠삼팟소 로께. 소따삼팟소 로께. 가~나삼팟소 로께. 지와~삼팟소 로께. 까~야삼팟소 로께. 마노삼팟소 로께...',
    translation: V_SAM_S5K, highlight: ['samphasso','cakkhusamphasso'], note: '🤝 6촉(samphassa).' },

  // ── V_SAM_S6: 6수 ──
  { type: 'teach', icon: '💭', word: 'samphassajā vedanā', pronKo: '삼팟사자~ 웨다나~', meaning: '접촉에서 생긴 느낌',
    grammar: '복합어 + 명사', baseForm: 'samphassaja(접촉생) + vedanā',
    formNote: 'samphassa + ja(생긴) + vedanā',
    buddhism: '6수(受). 6촉에서 일어남.',
    verseLine: V_SAM_S6, verseLineKo: V_SAM_S6K, audio: true },
  { type: 'verse', pali: V_SAM_S6, pronKo: '짝쿠삼팟사자~ 웨다나~ 로께... 소따... 가~나... 지와~... 까~야... 마노삼팟사자~ 웨다나~ 로께...',
    translation: V_SAM_S6K, highlight: ['samphassajā'], note: '💭 6수(vedanā) — 촉에서 생긴 느낌.' },

  // ── V_SAM_S7: 6상 ──
  { type: 'teach', icon: '🧠', word: 'rūpasaññā', pronKo: '루~빠산냐~', meaning: '형색의 인식',
    grammar: '복합어, 주격', baseForm: 'rūpa + saññā',
    buddhism: '6상(想).',
    verseLine: V_SAM_S7, verseLineKo: V_SAM_S7K, audio: true },
  { type: 'verse', pali: V_SAM_S7, pronKo: '루~빠산냐~ 로께. 삿다산냐~ 로께. 간다산냐~ 로께. 라사산냐~ 로께. 폿탑바산냐~ 로께. 담마산냐~ 로께...',
    translation: V_SAM_S7K, highlight: ['rūpasaññā'], note: '🧠 6상(saññā).' },

  // ── V_SAM_S8: 6사 ──
  { type: 'teach', icon: '🎯', word: 'sañcetanā', pronKo: '산쩨따나~', meaning: '의도, 의지',
    grammar: '여성명사, 주격 단수', baseForm: 'sañcetanā (saṃ + cetanā)',
    buddhism: '사(思). 의지작용. cetanā와 동의어.',
    verseLine: V_SAM_S8, verseLineKo: V_SAM_S8K, audio: true },
  { type: 'verse', pali: V_SAM_S8, pronKo: '루~빠산쩨따나~ 로께. 삿다산쩨따나~ 로께...',
    translation: V_SAM_S8K, highlight: ['sañcetanā'], note: '🎯 6사(sañcetanā) — 의도.' },

  // ── V_SAM_S9: 6애 ──
  { type: 'teach', icon: '🔥', word: 'rūpataṇhā', pronKo: '루~빠딴하~', meaning: '형색에 대한 갈애',
    grammar: '복합어, 주격', baseForm: 'rūpa + taṇhā',
    verseLine: V_SAM_S9, verseLineKo: V_SAM_S9K, audio: true },
  { type: 'verse', pali: V_SAM_S9, pronKo: '루~빠딴하~ 로께. 삿다딴하~ 로께...',
    translation: V_SAM_S9K, highlight: ['rūpataṇhā'], note: '🔥 6애(taṇhā).' },

  // ── V_SAM_S10: 6사유 ──
  { type: 'teach', icon: '💭', word: 'vitakko', pronKo: '위딱꼬', meaning: '사유, 일으킨 생각',
    grammar: '남성명사, 주격 단수', baseForm: 'vitakka',
    buddhism: '심(尋). 초선의 요소. 거친 생각.',
    verseLine: V_SAM_S10, verseLineKo: V_SAM_S10K, audio: true },
  { type: 'teach', icon: '💭', word: 'rūpavitakko', pronKo: '루~빠위딱꼬', meaning: '형색에 대한 사유',
    grammar: '복합어, 주격', baseForm: 'rūpa + vitakka',
    verseLine: V_SAM_S10, verseLineKo: V_SAM_S10K, audio: true },
  { type: 'verse', pali: V_SAM_S10, pronKo: '루~빠위딱꼬 로께. 삿다위딱꼬 로께...',
    translation: V_SAM_S10K, highlight: ['vitakko','rūpavitakko'], note: '💭 6사유(vitakka).' },

  // ── V_SAM_S11: 6고찰 ──
  { type: 'teach', icon: '🔍', word: 'vicāro', pronKo: '위짜~로', meaning: '고찰, 지속된 생각',
    grammar: '남성명사, 주격 단수', baseForm: 'vicāra',
    buddhism: '사(伺). 초선의 요소. 미세한 생각.',
    verseLine: V_SAM_S11, verseLineKo: V_SAM_S11K, audio: true },
  { type: 'verse', pali: V_SAM_S11, pronKo: '루~빠위짜~로 로께. 삿다위짜~로 로께... 이당 웃짜띠, 빅카웨, 둑카사무다양 아리야삿짱.',
    translation: V_SAM_S11K, highlight: ['vicāro'], note: '🔍 6고찰(vicāra) — 집성제 마무리.' },

  // 멸성제
  { type: 'intro', icon: '🕊️', title: '— 滅聖諦 (nirodha) —', subtitle: '괴로움의 사라짐의 성스러운 진리',
    description: '갈애의 남김 없는 사라짐 = 열반.' },

  // ── V_NIR0: 멸성제 정의 ──
  { type: 'teach', icon: '🌬️', word: 'asesavirāganirodho', pronKo: '아세사위라~가니로도', meaning: '남김 없는 빛바램과 사라짐',
    grammar: '복합어, 주격', baseForm: 'asesa(남김 없는) + virāga(빛바램) + nirodha(사라짐)',
    formNote: 'a(부정) + sesa(남음) + virāga + nirodha',
    buddhism: '잔여 없는 멸. 열반의 핵심 정의.',
    verseLine: V_NIR0, verseLineKo: V_NIR0K, audio: true },
  { type: 'teach', icon: '🎁', word: 'cāgo', pronKo: '짜~고', meaning: '버림, 포기',
    grammar: '남성명사, 주격 단수', baseForm: 'cāga (√tyaj 버리다)',
    verseLine: V_NIR0, verseLineKo: V_NIR0K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'paṭinissaggo', pronKo: '빠띠닛삭고', meaning: '놓아 버림',
    grammar: '남성명사, 주격 단수', baseForm: 'paṭinissagga (paṭi- + nis- + √sajj)',
    verseLine: V_NIR0, verseLineKo: V_NIR0K, audio: true },
  { type: 'teach', icon: '🆓', word: 'mutti', pronKo: '뭇띠', meaning: '벗어남, 해탈',
    grammar: '여성명사, 주격 단수', baseForm: 'mutti (√muc)',
    verseLine: V_NIR0, verseLineKo: V_NIR0K, audio: true },
  { type: 'teach', icon: '✨', word: 'anālayo', pronKo: '아날~라요', meaning: '집착 없음',
    grammar: '남성명사, 주격 단수', baseForm: 'an(부정) + ālaya(집착)',
    formNote: 'ālaya = "거처/집착" → an-ālaya = 집착 없음\n알라야식(ālaya-vijñāna)의 어원',
    verseLine: V_NIR0, verseLineKo: V_NIR0K, audio: true },
  { type: 'verse', pali: V_NIR0, pronKo: '까따만짜, 빅카웨, 둑카니로당 아리야삿짱? 요 땃사~예와 딴하~야 아세사위라~가니로도 짜~고 빠띠닛삭고 뭇띠 아날~라요.',
    translation: V_NIR0K, highlight: ['asesavirāganirodho','cāgo','paṭinissaggo','mutti','anālayo'],
    note: '🕊️ 멸성제 정의: 갈애의 남김 없는 사라짐.' },

  // ── V_NIR1: 갈애가 끊어지는 곳 ──
  { type: 'teach', icon: '🧹', word: 'pahīyamānā', pronKo: '빠히~야마~나~', meaning: '끊어지며 (현재분사 수동)',
    grammar: '수동 현재분사, 주격 여성', baseForm: 'pahīyati (끊어지다)',
    formNote: 'pahāna의 수동 현재분사',
    verseLine: V_NIR1, verseLineKo: V_NIR1K, audio: true },
  { type: 'teach', icon: '🧹', word: 'pahīyati', pronKo: '빠히~야띠', meaning: '끊어진다',
    grammar: '동사 3인칭 단수 수동 현재', baseForm: 'pahīyati',
    verseLine: V_NIR1, verseLineKo: V_NIR1K, audio: true },
  { type: 'teach', icon: '💨', word: 'nirujjhamānā', pronKo: '니룻자마~나~', meaning: '사라지며 (현재분사 수동)',
    grammar: '수동 현재분사, 주격 여성', baseForm: 'nirujjhati (사라지다)',
    verseLine: V_NIR1, verseLineKo: V_NIR1K, audio: true },
  { type: 'teach', icon: '💨', word: 'nirujjhati', pronKo: '니룻자띠', meaning: '사라진다',
    grammar: '동사 3인칭 단수 수동 현재', baseForm: 'nirujjhati (ni- + √rudh)',
    verseLine: V_NIR1, verseLineKo: V_NIR1K, audio: true },
  { type: 'verse', pali: V_NIR1, pronKo: '사~ 코 빠네사~, 빅카웨, 딴하~ 깟타 빠히~야마~나~ 빠히~야띠, 깟타 니룻자마~나~ 니룻자띠? 양 로께 삐야루~빵 사~따루~빵, 엣테사~ 딴하~ 빠히~야마~나~ 빠히~야띠...',
    translation: V_NIR1K, highlight: ['pahīyamānā','pahīyati','nirujjhamānā','nirujjhati'],
    note: '📍 갈애가 끊어지는 곳: 사랑스럽고 만족스러운 모습.' },

  // ── V_NIR2-11: 11 categories (모두 위 단어로 학습 완료) ──
  { type: 'verse', pali: V_NIR2, pronKo: '낀짜 로께... 짝쿠 로께... 마노 로께 삐야루~빵 사~따루~빵, 엣테사~ 딴하~ 빠히~야마~나~ 빠히~야띠...', translation: V_NIR2K, note: '👁️ 6내처에서 갈애 사라짐.' },
  { type: 'verse', pali: V_NIR3, pronKo: '루~빠~ 로께... 담마~ 로께...', translation: V_NIR3K, note: '🎨 6외처에서 갈애 사라짐.' },
  { type: 'verse', pali: V_NIR4, pronKo: '짝쿠윈냐~낭 로께...', translation: V_NIR4K, note: '👁️ 6식에서 갈애 사라짐.' },
  { type: 'verse', pali: V_NIR5, pronKo: '짝쿠삼팟소 로께...', translation: V_NIR5K, note: '🤝 6촉에서 갈애 사라짐.' },
  { type: 'verse', pali: V_NIR6, pronKo: '짝쿠삼팟사자~ 웨다나~ 로께...', translation: V_NIR6K, note: '💭 6수에서 갈애 사라짐.' },
  { type: 'verse', pali: V_NIR7, pronKo: '루~빠산냐~ 로께...', translation: V_NIR7K, note: '🧠 6상에서 갈애 사라짐.' },
  { type: 'verse', pali: V_NIR8, pronKo: '루~빠산쩨따나~ 로께...', translation: V_NIR8K, note: '🎯 6사에서 갈애 사라짐.' },
  { type: 'verse', pali: V_NIR9, pronKo: '루~빠딴하~ 로께...', translation: V_NIR9K, note: '🔥 6애에서 갈애 사라짐.' },
  { type: 'verse', pali: V_NIR10, pronKo: '루~빠위딱꼬 로께...', translation: V_NIR10K, note: '💭 6사유에서 갈애 사라짐.' },
  { type: 'verse', pali: V_NIR11, pronKo: '루~빠위짜~로 로께... 이당 웃짜띠, 빅카웨, 둑카니로당 아리야삿짱.',
    translation: V_NIR11K, note: '🔍 6고찰 — 멸성제 마무리.' },

  // 도성제 — 팔정도
  { type: 'intro', icon: '☸️', title: '— 道聖諦 (magga) — 八正道', subtitle: 'ariyo aṭṭhaṅgiko maggo',
    description: '정견·정사유·정어·정업·정명·정정진·정념·정정.' },

  // ── V_MAG0: 팔정도 선언 ──
  { type: 'teach', icon: '☸️', word: 'ariyo', pronKo: '아리요', meaning: '성스러운',
    grammar: '형용사, 주격 남성 단수', baseForm: 'ariya', verseLine: V_MAG0, verseLineKo: V_MAG0K, audio: true },
  { type: 'teach', icon: '8️⃣', word: 'aṭṭhaṅgiko', pronKo: '앗탕기꼬', meaning: '8개 가지의',
    grammar: '형용사, 주격 남성 단수', baseForm: 'aṭṭhaṅgika (aṭṭha + aṅga)',
    formNote: 'aṭṭha(8) + aṅga(가지) + -ika = 8가지로 된',
    verseLine: V_MAG0, verseLineKo: V_MAG0K, audio: true },
  { type: 'teach', icon: '①', word: 'sammādiṭṭhi', pronKo: '삼마~딧티', meaning: '정견 (바른 견해)',
    grammar: '복합어, 주격 여성', baseForm: 'sammā(바른) + diṭṭhi(견해)',
    buddhism: '정견(正見). 팔정도 첫째. 사성제에 대한 앎.',
    verseLine: V_MAG0, verseLineKo: V_MAG0K, audio: true },
  { type: 'teach', icon: '②', word: 'sammāsaṅkappo', pronKo: '삼마~상깝뽀', meaning: '정사유',
    grammar: '복합어, 주격 남성', baseForm: 'sammā + saṅkappa(사유)',
    buddhism: '정사유(正思惟).', verseLine: V_MAG0, verseLineKo: V_MAG0K, audio: true },
  { type: 'teach', icon: '③', word: 'sammāvācā', pronKo: '삼마~와~짜~', meaning: '정어',
    grammar: '복합어, 주격 여성', baseForm: 'sammā + vācā(말)',
    buddhism: '정어(正語).', verseLine: V_MAG0, verseLineKo: V_MAG0K, audio: true },
  { type: 'teach', icon: '④', word: 'sammākammanto', pronKo: '삼마~깜만또', meaning: '정업',
    grammar: '복합어, 주격 남성', baseForm: 'sammā + kammanta(행위)',
    buddhism: '정업(正業).', verseLine: V_MAG0, verseLineKo: V_MAG0K, audio: true },
  { type: 'teach', icon: '⑤', word: 'sammāājīvo', pronKo: '삼마~아~지~오', meaning: '정명',
    grammar: '복합어, 주격 남성', baseForm: 'sammā + ājīva(생계)',
    buddhism: '정명(正命).', verseLine: V_MAG0, verseLineKo: V_MAG0K, audio: true },
  { type: 'teach', icon: '⑥', word: 'sammāvāyāmo', pronKo: '삼마~와~야~모', meaning: '정정진',
    grammar: '복합어, 주격 남성', baseForm: 'sammā + vāyāma(노력)',
    buddhism: '정정진(正精進).', verseLine: V_MAG0, verseLineKo: V_MAG0K, audio: true },
  { type: 'teach', icon: '⑦', word: 'sammāsati', pronKo: '삼마~사띠', meaning: '정념',
    grammar: '복합어, 주격 여성', baseForm: 'sammā + sati',
    buddhism: '정념(正念) = 사념처(satipaṭṭhāna)!',
    verseLine: V_MAG0, verseLineKo: V_MAG0K, audio: true },
  { type: 'teach', icon: '⑧', word: 'sammāsamādhi', pronKo: '삼마~사마~디', meaning: '정정',
    grammar: '복합어, 주격 남성', baseForm: 'sammā + samādhi',
    buddhism: '정정(正定) = 4선(四禪).',
    verseLine: V_MAG0, verseLineKo: V_MAG0K, audio: true },
  { type: 'verse', pali: V_MAG0, pronKo: '까따만짜... 둑카니로다가~미니~ 빠띠빠다~ 아리야삿짱? 아야메와 아리요 앗탕기꼬 막고 셋야티당 — 삼마~딧티 삼마~상깝뽀 삼마~와~짜~ 삼마~깜만또 삼마~아~지~오 삼마~와~야~모 삼마~사띠 삼마~사마~디.',
    translation: V_MAG0K, highlight: ['ariyo','aṭṭhaṅgiko','sammādiṭṭhi','sammāsaṅkappo','sammāvācā','sammākammanto','sammāājīvo','sammāvāyāmo','sammāsati','sammāsamādhi'],
    note: '☸️ 팔정도 선언.' },

  // ── V_MAG1: 정견 ──
  { type: 'teach', icon: '🧠', word: 'ñāṇaṃ', pronKo: '냐~낭', meaning: '앎, 지혜',
    grammar: '중성명사, 주격 단수', baseForm: 'ñāṇa (√ñā)',
    buddhism: '지(智). 통찰지.',
    verseLine: V_MAG1, verseLineKo: V_MAG1K, audio: true },
  { type: 'verse', pali: V_MAG1, pronKo: '까따마~ 짜, 빅카웨, 삼마~딧티? 양 코, 빅카웨, 둑케 냐~낭, 둑카사무다예 냐~낭, 둑카니로데 냐~낭, 둑카니로다가~미니야~ 빠띠빠다~야 냐~낭, 아양 웃짜띠, 빅카웨, 삼마~딧티.',
    translation: V_MAG1K, highlight: ['ñāṇaṃ'], note: '👁️ ① 정견(sammādiṭṭhi): 사성제에 대한 앎.' },

  // ── V_MAG2: 정사유 ──
  { type: 'teach', icon: '🚪', word: 'nekkhammasaṅkappo', pronKo: '넥캄마상깝뽀', meaning: '출리의 사유',
    grammar: '복합어, 주격', baseForm: 'nekkhamma(출리) + saṅkappa',
    formNote: 'nekkhamma = 욕망에서 떠남',
    verseLine: V_MAG2, verseLineKo: V_MAG2K, audio: true },
  { type: 'teach', icon: '☮️', word: 'abyāpādasaṅkappo', pronKo: '아뱌~빠~다상깝뽀', meaning: '악의 없음의 사유',
    grammar: '복합어, 주격', baseForm: 'a + byāpāda + saṅkappa',
    verseLine: V_MAG2, verseLineKo: V_MAG2K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'avihiṃsāsaṅkappo', pronKo: '아위힝사~상깝뽀', meaning: '해치지 않음의 사유',
    grammar: '복합어, 주격', baseForm: 'a + vihiṃsā(해침) + saṅkappa',
    verseLine: V_MAG2, verseLineKo: V_MAG2K, audio: true },
  { type: 'verse', pali: V_MAG2, pronKo: '까따모 짜, 빅카웨, 삼마~상깝뽀? 넥캄마상깝뽀 아뱌~빠~다상깝뽀 아위힝사~상깝뽀, 아양 웃짜띠 빅카웨, 삼마~상깝뽀.',
    translation: V_MAG2K, highlight: ['nekkhammasaṅkappo','abyāpādasaṅkappo','avihiṃsāsaṅkappo'],
    note: '💭 ② 정사유(sammāsaṅkappa): 출리·무에·무해.' },

  // ── V_MAG3: 정어 ──
  { type: 'teach', icon: '🤥', word: 'musāvādā', pronKo: '무사~와~다~', meaning: '거짓말에서 (탈격)',
    grammar: '복합어, 탈격', baseForm: 'musā(거짓) + vāda(말)',
    verseLine: V_MAG3, verseLineKo: V_MAG3K, audio: true },
  { type: 'teach', icon: '🛑', word: 'veramaṇī', pronKo: '웨라마니~', meaning: '삼감, 멀리함',
    grammar: '여성명사, 주격 단수', baseForm: 'veramaṇī (vi- + √ram)',
    formNote: '"기쁘게 멀리함 = 삼감"', verseLine: V_MAG3, verseLineKo: V_MAG3K, audio: true },
  { type: 'teach', icon: '🗣️', word: 'pisuṇāya vācāya', pronKo: '삐수나~야 와~짜~야', meaning: '이간하는 말에서',
    grammar: '도구격/탈격', baseForm: 'pisuṇa(이간) + vācā',
    verseLine: V_MAG3, verseLineKo: V_MAG3K, audio: true },
  { type: 'teach', icon: '🗣️', word: 'pharusāya vācāya', pronKo: '파루사~야 와~짜~야', meaning: '거친 말에서',
    grammar: '도구격/탈격', baseForm: 'pharusa(거친) + vācā',
    verseLine: V_MAG3, verseLineKo: V_MAG3K, audio: true },
  { type: 'teach', icon: '💬', word: 'samphappalāpā', pronKo: '삼팝빨라~빠~', meaning: '잡담에서',
    grammar: '복합어, 탈격', baseForm: 'samphappalāpa (의미 없는 말)',
    verseLine: V_MAG3, verseLineKo: V_MAG3K, audio: true },
  { type: 'verse', pali: V_MAG3, pronKo: '까따마~ 짜, 빅카웨, 삼마~와~짜~? 무사~와~다~ 웨라마니~ 삐수나~야 와~짜~야 웨라마니~ 파루사~야 와~짜~야 웨라마니~ 삼팝빨라~빠~ 웨라마니~...',
    translation: V_MAG3K, highlight: ['musāvādā','veramaṇī','pisuṇāya','pharusāya','samphappalāpā'],
    note: '🗣️ ③ 정어(sammāvācā): 거짓말·이간·거친말·잡담 삼감.' },

  // ── V_MAG4: 정업 ──
  { type: 'teach', icon: '🛡️', word: 'pāṇātipātā', pronKo: '빠~나~띠빠~따~', meaning: '살생에서 (탈격)',
    grammar: '복합어, 탈격', baseForm: 'pāṇa(생명) + atipāta(해침)',
    verseLine: V_MAG4, verseLineKo: V_MAG4K, audio: true },
  { type: 'teach', icon: '✋', word: 'adinnādānā', pronKo: '아딘나~다~나~', meaning: '도둑질에서 (탈격)',
    grammar: '복합어, 탈격', baseForm: 'adinna(주지않은) + ādāna(가짐)',
    verseLine: V_MAG4, verseLineKo: V_MAG4K, audio: true },
  { type: 'teach', icon: '💔', word: 'kāmesumicchācārā', pronKo: '까~메수밋차~짜~라~', meaning: '삿된 음행에서 (탈격)',
    grammar: '복합어, 탈격', baseForm: 'kāmesu(욕망에서) + micchā(그릇된) + ācāra(행위)',
    verseLine: V_MAG4, verseLineKo: V_MAG4K, audio: true },
  { type: 'verse', pali: V_MAG4, pronKo: '까따모 짜, 빅카웨, 삼마~깜만또? 빠~나~띠빠~따~ 웨라마니~ 아딘나~다~나~ 웨라마니~ 까~메수밋차~짜~라~ 웨라마니~...',
    translation: V_MAG4K, highlight: ['pāṇātipātā','adinnādānā','kāmesumicchācārā'],
    note: '🤲 ④ 정업(sammākammanta): 살생·도둑질·삿된음행 삼감.' },

  // ── V_MAG5: 정명 ──
  { type: 'teach', icon: '🎓', word: 'ariyasāvako', pronKo: '아리야사~와꼬', meaning: '성스러운 제자',
    grammar: '복합어, 주격', baseForm: 'ariya + sāvaka(제자)',
    formNote: 'sāvaka = √su(듣다) → "들은 자 = 제자"',
    verseLine: V_MAG5, verseLineKo: V_MAG5K, audio: true },
  { type: 'teach', icon: '❌', word: 'micchāājīvaṃ', pronKo: '밋차~아~지~왕', meaning: '그릇된 생계를',
    grammar: '복합어, 대격', baseForm: 'micchā(그릇된) + ājīva',
    verseLine: V_MAG5, verseLineKo: V_MAG5K, audio: true },
  { type: 'teach', icon: '🌾', word: 'jīvitaṃ', pronKo: '지~위땅', meaning: '생계를, 삶을',
    grammar: '중성명사, 대격', baseForm: 'jīvita',
    verseLine: V_MAG5, verseLineKo: V_MAG5K, audio: true },
  { type: 'teach', icon: '🛠️', word: 'kappeti', pronKo: '깝뻬띠', meaning: '영위한다, 마련한다',
    grammar: '동사 3인칭 단수 현재 (사역)', baseForm: 'kappeti (√kapp)',
    verseLine: V_MAG5, verseLineKo: V_MAG5K, audio: true },
  { type: 'verse', pali: V_MAG5, pronKo: '까따모 짜... 삼마~아~지~오? 이다, 빅카웨, 아리야사~와꼬 밋차~아~지~왕 빠하~야 삼마~아~지~웨나 지~위땅 깝뻬띠, 아양 웃짜띠, 빅카웨, 삼마~아~지~오.',
    translation: V_MAG5K, highlight: ['ariyasāvako','micchāājīvaṃ','jīvitaṃ','kappeti'],
    note: '🥢 ⑤ 정명(sammāājīva): 바른 생계.' },

  // ── V_MAG6A-D: 정정진 (4정근) ──
  { type: 'teach', icon: '🌱', word: 'anuppannānaṃ', pronKo: '아눕빤나~낭', meaning: '일어나지 않은 (속격 복수)',
    grammar: '과거분사, 속격 복수', baseForm: 'an + uppanna',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'teach', icon: '😈', word: 'pāpakānaṃ', pronKo: '빠~빠까~낭', meaning: '악한 (속격 복수)',
    grammar: '형용사, 속격 복수', baseForm: 'pāpaka',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'teach', icon: '🚫', word: 'akusalānaṃ', pronKo: '아꾸살라~낭', meaning: '불선한 (속격 복수)',
    grammar: '형용사, 속격 복수', baseForm: 'a + kusala',
    buddhism: '불선(不善). 해로운 마음.',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'teach', icon: '☸️', word: 'dhammānaṃ', pronKo: '담마~낭', meaning: '법들의 (속격 복수)',
    grammar: '남성명사, 속격 복수', baseForm: 'dhamma',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'teach', icon: '🛡️', word: 'anuppādāya', pronKo: '아눕빠~다~야', meaning: '일어나지 않게 하기 위해',
    grammar: '여격', baseForm: 'an + uppāda',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'teach', icon: '💭', word: 'chandaṃ', pronKo: '찬당', meaning: '의욕을',
    grammar: '남성명사, 대격', baseForm: 'chanda',
    formNote: '여기서 chanda = 선한 의욕 (kāmacchanda의 chanda와 구분)',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'teach', icon: '🔥', word: 'janeti', pronKo: '자네띠', meaning: '일으킨다 (사역)',
    grammar: '동사 3인칭 단수 사역', baseForm: 'janeti (√jan 사역)',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'teach', icon: '💪', word: 'vāyamati', pronKo: '와~야마띠', meaning: '노력한다',
    grammar: '동사 3인칭 단수 현재', baseForm: 'vāyamati (vi- + ā- + √yam)',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'teach', icon: '⚡', word: 'vīriyaṃ', pronKo: '위~리양', meaning: '정진을',
    grammar: '중성명사, 대격', baseForm: 'vīriya',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'teach', icon: '🏃', word: 'ārabhati', pronKo: '아~라바띠', meaning: '시작한다',
    grammar: '동사 3인칭 단수', baseForm: 'ārabhati (ā- + √rabh)',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'teach', icon: '✊', word: 'paggaṇhāti', pronKo: '빡간하~띠', meaning: '다잡는다, 가다듬는다',
    grammar: '동사 3인칭 단수', baseForm: 'paggaṇhāti (pa- + √gah)',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'teach', icon: '💯', word: 'padahati', pronKo: '빠다하띠', meaning: '힘쓴다, 매진한다',
    grammar: '동사 3인칭 단수', baseForm: 'padahati (pa- + √dhā)',
    verseLine: V_MAG6A, verseLineKo: V_MAG6AK, audio: true },
  { type: 'verse', pali: V_MAG6A, pronKo: '까따모 짜, 빅카웨, 삼마~와~야~모? 이다, 빅카웨, 빅쿠 (1) 아눕빤나~낭 빠~빠까~낭 아꾸살라~낭 담마~낭 아눕빠~다~야 찬당 자네띠 와~야마띠 위~리양 아~라바띠 찟땅 빡간하~띠 빠다하띠;',
    translation: V_MAG6AK, highlight: ['anuppannānaṃ','pāpakānaṃ','akusalānaṃ','dhammānaṃ','anuppādāya','chandaṃ','janeti','vāyamati','vīriyaṃ','ārabhati','paggaṇhāti','padahati'],
    note: '💪 ⑥ 정정진(sammāvāyāma): 4정근 ① 미생악 불생.' },

  { type: 'teach', icon: '🔥', word: 'uppannānaṃ', pronKo: '웁빤나~낭', meaning: '일어난 (속격 복수)',
    grammar: '과거분사, 속격 복수', baseForm: 'uppanna',
    verseLine: V_MAG6B, verseLineKo: V_MAG6BK, audio: true },
  { type: 'teach', icon: '🧹', word: 'pahānāya', pronKo: '빠하~나~야', meaning: '버리기 위해',
    grammar: '여격', baseForm: 'pahāna',
    verseLine: V_MAG6B, verseLineKo: V_MAG6BK, audio: true },
  { type: 'verse', pali: V_MAG6B, pronKo: '(2) 웁빤나~낭 빠~빠까~낭 아꾸살라~낭 담마~낭 빠하~나~야 찬당 자네띠 와~야마띠...',
    translation: V_MAG6BK, highlight: ['uppannānaṃ','pahānāya'], note: '💪 4정근 ② 기생악 단(斷).' },

  { type: 'teach', icon: '✅', word: 'kusalānaṃ', pronKo: '꾸살라~낭', meaning: '선한 (속격 복수)',
    grammar: '형용사, 속격 복수', baseForm: 'kusala',
    buddhism: '선(善). 유익한 마음.',
    verseLine: V_MAG6C, verseLineKo: V_MAG6CK, audio: true },
  { type: 'teach', icon: '🌱', word: 'uppādāya', pronKo: '웁빠~다~야', meaning: '일어나게 하기 위해',
    grammar: '여격', baseForm: 'uppāda',
    verseLine: V_MAG6C, verseLineKo: V_MAG6CK, audio: true },
  { type: 'verse', pali: V_MAG6C, pronKo: '(3) 아눕빤나~낭 꾸살라~낭 담마~낭 웁빠~다~야 찬당 자네띠 와~야마띠...',
    translation: V_MAG6CK, highlight: ['kusalānaṃ','uppādāya'], note: '💪 4정근 ③ 미생선 생(生).' },

  { type: 'teach', icon: '🏠', word: 'ṭhitiyā', pronKo: '티띠야~', meaning: '유지를 위해',
    grammar: '여격', baseForm: 'ṭhiti (머무름)',
    verseLine: V_MAG6D, verseLineKo: V_MAG6DK, audio: true },
  { type: 'teach', icon: '🔍', word: 'asammosāya', pronKo: '아삼모사~야', meaning: '잊어버리지 않게',
    grammar: '여격', baseForm: 'a + sammosa(혼란)',
    verseLine: V_MAG6D, verseLineKo: V_MAG6DK, audio: true },
  { type: 'teach', icon: '📈', word: 'bhiyyobhāvāya', pronKo: '빗요바~와~야', meaning: '더 자라게',
    grammar: '여격', baseForm: 'bhiyyo(더) + bhāva',
    verseLine: V_MAG6D, verseLineKo: V_MAG6DK, audio: true },
  { type: 'teach', icon: '🌊', word: 'vepullāya', pronKo: '웨뿔라~야', meaning: '충만하게',
    grammar: '여격', baseForm: 'vepulla',
    verseLine: V_MAG6D, verseLineKo: V_MAG6DK, audio: true },
  { type: 'teach', icon: '🛐', word: 'bhāvanāya', pronKo: '바~와나~야', meaning: '닦음에 의해',
    grammar: '도구격/여격', baseForm: 'bhāvanā',
    verseLine: V_MAG6D, verseLineKo: V_MAG6DK, audio: true },
  { type: 'teach', icon: '🏆', word: 'pāripūriyā', pronKo: '빠~리뿌~리야~', meaning: '완성을 위해',
    grammar: '여격', baseForm: 'pāripūrī',
    verseLine: V_MAG6D, verseLineKo: V_MAG6DK, audio: true },
  { type: 'verse', pali: V_MAG6D, pronKo: '(4) 웁빤나~낭 꾸살라~낭 담마~낭 티띠야~ 아삼모사~야 빗요바~와~야 웨뿔라~야 바~와나~야 빠~리뿌~리야~ 찬당 자네띠...',
    translation: V_MAG6DK, highlight: ['ṭhitiyā','asammosāya','bhiyyobhāvāya','vepullāya','bhāvanāya','pāripūriyā'],
    note: '💪 4정근 ④ 기생선 증장.' },

  // V_MAG7: 정념 (사념처 정형구) — 단어 이미 다 가르침
  { type: 'verse', pali: V_MAG7, pronKo: '까따마~ 짜, 빅카웨, 삼마~사띠? 이다, 빅카웨, 빅쿠 까~예 까~야~누빳시~ 위하라띠... 웨다나~수... 찟떼... 담메수 담마~누빳시~ 위하라띠 아~따~삐~ 삼빠자~노 사띠마~ 위네이야 로께 아빗자~도마낫상.',
    translation: V_MAG7K, note: '🧘 ⑦ 정념(sammāsati) = 사념처 자체! 모든 단어 앞에서 학습됨.' },

  // ── V_MAG8A-D: 정정 (4선) ──
  { type: 'teach', icon: '🌅', word: 'vivicceva', pronKo: '위윗쩨와', meaning: '떨치고서',
    grammar: '절대분사 + 강조', baseForm: 'vivicca + eva',
    formNote: 'vi(분리) + √vic(가르다) + -ya + eva\n"완전히 떨어져"',
    verseLine: V_MAG8A, verseLineKo: V_MAG8AK, audio: true },
  { type: 'teach', icon: '💋', word: 'kāmehi', pronKo: '까~메히', meaning: '욕망들에서 (탈격 복수)',
    grammar: '남성명사, 탈격 복수', baseForm: 'kāma',
    verseLine: V_MAG8A, verseLineKo: V_MAG8AK, audio: true },
  { type: 'teach', icon: '🌅', word: 'vivicca', pronKo: '위윗짜', meaning: '떨치고',
    grammar: '절대분사', baseForm: 'viviccati',
    verseLine: V_MAG8A, verseLineKo: V_MAG8AK, audio: true },
  { type: 'teach', icon: '🚫', word: 'akusalehi', pronKo: '아꾸살레히', meaning: '불선한 (탈격 복수)',
    grammar: '형용사, 탈격 복수', baseForm: 'akusala',
    verseLine: V_MAG8A, verseLineKo: V_MAG8AK, audio: true },
  { type: 'teach', icon: '💭', word: 'savitakkaṃ', pronKo: '사위딱깡', meaning: '사유 있는',
    grammar: '형용사, 대격 중성', baseForm: 'sa(있는) + vitakka',
    verseLine: V_MAG8A, verseLineKo: V_MAG8AK, audio: true },
  { type: 'teach', icon: '🔍', word: 'savicāraṃ', pronKo: '사위짜~랑', meaning: '고찰 있는',
    grammar: '형용사, 대격 중성', baseForm: 'sa + vicāra',
    verseLine: V_MAG8A, verseLineKo: V_MAG8AK, audio: true },
  { type: 'teach', icon: '🌅', word: 'vivekajaṃ', pronKo: '위웨까장', meaning: '떨침에서 생긴',
    grammar: '복합어, 대격 중성', baseForm: 'viveka(떨침) + ja(생긴)',
    verseLine: V_MAG8A, verseLineKo: V_MAG8AK, audio: true },
  { type: 'teach', icon: '😄', word: 'pītisukhaṃ', pronKo: '삐~띠수캉', meaning: '희열과 행복',
    grammar: '복합어, 대격 중성', baseForm: 'pīti(희열) + sukha(행복)',
    verseLine: V_MAG8A, verseLineKo: V_MAG8AK, audio: true },
  { type: 'teach', icon: '1️⃣', word: 'paṭhamaṃ jhānaṃ', pronKo: '빠타망 자~낭', meaning: '초선 (제1선)',
    grammar: '형용사 + 명사, 대격', baseForm: 'paṭhama(첫째) + jhāna(선)',
    buddhism: '초선(初禪).', verseLine: V_MAG8A, verseLineKo: V_MAG8AK, audio: true },
  { type: 'teach', icon: '🎯', word: 'upasampajja', pronKo: '우빠삼빳자', meaning: '얻어, 들어가서',
    grammar: '절대분사', baseForm: 'upasampajjati',
    formNote: 'upa + saṃ + √pad → "이르러, 얻어"',
    verseLine: V_MAG8A, verseLineKo: V_MAG8AK, audio: true },
  { type: 'verse', pali: V_MAG8A, pronKo: '까따모 짜, 빅카웨, 삼마~사마~디? 이다, 빅카웨, 빅쿠 위윗쩨와 까~메히 위윗짜 아꾸살레히 담메히 사위딱깡 사위짜~랑 위웨까장 삐~띠수캉 빠타망 자~낭 우빠삼빳자 위하라띠.',
    translation: V_MAG8AK, highlight: ['vivicceva','kāmehi','akusalehi','savitakkaṃ','savicāraṃ','vivekajaṃ','pītisukhaṃ','paṭhamaṃ','jhānaṃ','upasampajja'],
    note: '🌟 ⑧ 정정(sammāsamādhi) — 초선(paṭhamaṃ jhānaṃ).' },

  // 2선
  { type: 'teach', icon: '🤐', word: 'vitakkavicārānaṃ', pronKo: '위딱까위짜~라~낭', meaning: '사유와 고찰의 (속격 복수)',
    grammar: '복합어, 속격 복수', baseForm: 'vitakka + vicāra',
    verseLine: V_MAG8B, verseLineKo: V_MAG8BK, audio: true },
  { type: 'teach', icon: '🌊', word: 'vūpasamā', pronKo: '우~빠사마~', meaning: '가라앉음으로 (탈격)',
    grammar: '남성명사, 탈격 단수', baseForm: 'vūpasama (vi- + upa- + √sam)',
    verseLine: V_MAG8B, verseLineKo: V_MAG8BK, audio: true },
  { type: 'teach', icon: '✨', word: 'sampasādanaṃ', pronKo: '삼빠사~다낭', meaning: '청정, 평온',
    grammar: '중성명사, 대격', baseForm: 'sampasādana',
    verseLine: V_MAG8B, verseLineKo: V_MAG8BK, audio: true },
  { type: 'teach', icon: '🧠', word: 'cetaso', pronKo: '쩨따소', meaning: '마음의 (속격)',
    grammar: '중성명사, 속격', baseForm: 'cetas (마음)',
    verseLine: V_MAG8B, verseLineKo: V_MAG8BK, audio: true },
  { type: 'teach', icon: '🎯', word: 'ekodibhāvaṃ', pronKo: '에꼬디바~왕', meaning: '통일된 상태',
    grammar: '복합어, 대격', baseForm: 'ekodi(통일) + bhāva',
    verseLine: V_MAG8B, verseLineKo: V_MAG8BK, audio: true },
  { type: 'teach', icon: '🚫', word: 'avitakkaṃ', pronKo: '아위딱깡', meaning: '사유 없는',
    grammar: '형용사, 대격', baseForm: 'a + vitakka',
    verseLine: V_MAG8B, verseLineKo: V_MAG8BK, audio: true },
  { type: 'teach', icon: '🚫', word: 'avicāraṃ', pronKo: '아위짜~랑', meaning: '고찰 없는',
    grammar: '형용사, 대격', baseForm: 'a + vicāra',
    verseLine: V_MAG8B, verseLineKo: V_MAG8BK, audio: true },
  { type: 'teach', icon: '🎯', word: 'samādhijaṃ', pronKo: '사마~디장', meaning: '삼매에서 생긴',
    grammar: '복합어, 대격', baseForm: 'samādhi + ja',
    verseLine: V_MAG8B, verseLineKo: V_MAG8BK, audio: true },
  { type: 'teach', icon: '2️⃣', word: 'dutiyaṃ jhānaṃ', pronKo: '두띠양 자~낭', meaning: '제2선',
    grammar: '형용사 + 명사', baseForm: 'dutiya(둘째) + jhāna',
    buddhism: '제2선(二禪).', verseLine: V_MAG8B, verseLineKo: V_MAG8BK, audio: true },
  { type: 'verse', pali: V_MAG8B, pronKo: '위딱까위짜~라~낭 우~빠사마~ 앗잣땅 삼빠사~다낭 쩨따소 에꼬디바~왕 아위딱깡 아위짜~랑 사마~디장 삐~띠수캉 두띠양 자~낭 우빠삼빳자 위하라띠.',
    translation: V_MAG8BK, highlight: ['vitakkavicārānaṃ','vūpasamā','sampasādanaṃ','cetaso','ekodibhāvaṃ','avitakkaṃ','avicāraṃ','samādhijaṃ','dutiyaṃ'],
    note: '🌟 2선(dutiyaṃ jhānaṃ).' },

  // 3선
  { type: 'teach', icon: '🌅', word: 'pītiyā', pronKo: '삐~띠야~', meaning: '희열의 (탈격)',
    grammar: '여성명사, 탈격', baseForm: 'pīti',
    verseLine: V_MAG8C, verseLineKo: V_MAG8CK, audio: true },
  { type: 'teach', icon: '🌫️', word: 'virāgā', pronKo: '위라~가~', meaning: '빛바램으로 (탈격)',
    grammar: '남성명사, 탈격', baseForm: 'virāga (vi- + rāga)',
    formNote: '"탐욕에서 떨어짐 = 빛바램"',
    verseLine: V_MAG8C, verseLineKo: V_MAG8CK, audio: true },
  { type: 'teach', icon: '⚖️', word: 'upekkhako', pronKo: '우뻭카꼬', meaning: '평정한',
    grammar: '형용사, 주격 남성', baseForm: 'upekkhaka',
    verseLine: V_MAG8C, verseLineKo: V_MAG8CK, audio: true },
  { type: 'teach', icon: '💎', word: 'sato', pronKo: '사또', meaning: '마음챙긴',
    grammar: '과거분사, 주격 남성', baseForm: 'sata (sati의 형용사)',
    verseLine: V_MAG8C, verseLineKo: V_MAG8CK, audio: true },
  { type: 'teach', icon: '🌡️', word: 'paṭisaṃvedeti', pronKo: '빠띠상웨데띠', meaning: '경험한다, 느낀다',
    grammar: '동사 3인칭 단수 사역', baseForm: 'paṭisaṃvedeti (paṭi- + saṃ- + √vid)',
    verseLine: V_MAG8C, verseLineKo: V_MAG8CK, audio: true },
  { type: 'teach', icon: '🧙', word: 'ariyā', pronKo: '아리야~', meaning: '성자들이',
    grammar: '남성명사, 주격 복수', baseForm: 'ariya',
    verseLine: V_MAG8C, verseLineKo: V_MAG8CK, audio: true },
  { type: 'teach', icon: '📢', word: 'ācikkhanti', pronKo: '아~찍칸띠', meaning: '말한다 (3인칭 복수)',
    grammar: '동사 3인칭 복수 현재', baseForm: 'ācikkhati',
    verseLine: V_MAG8C, verseLineKo: V_MAG8CK, audio: true },
  { type: 'teach', icon: '😊', word: 'sukhavihārī', pronKo: '수카위하~리~', meaning: '행복하게 머무는 자',
    grammar: '복합어, 주격', baseForm: 'sukha(행복) + vihārin(머무는)',
    verseLine: V_MAG8C, verseLineKo: V_MAG8CK, audio: true },
  { type: 'teach', icon: '3️⃣', word: 'tatiyaṃ jhānaṃ', pronKo: '따띠양 자~낭', meaning: '제3선',
    grammar: '형용사 + 명사', baseForm: 'tatiya(셋째) + jhāna',
    buddhism: '제3선(三禪).', verseLine: V_MAG8C, verseLineKo: V_MAG8CK, audio: true },
  { type: 'verse', pali: V_MAG8C, pronKo: '삐~띠야~ 짜 위라~가~ 우뻭카꼬 짜 위하라띠, 사또 짜 삼빠자~노, 수칸짜 까~예나 빠띠상웨데띠, 양 땅 아리야~ 아~찍칸띠 \'우뻭카꼬 사띠마~ 수카위하~리~\'띠 따띠양 자~낭 우빠삼빳자 위하라띠.',
    translation: V_MAG8CK, highlight: ['pītiyā','virāgā','upekkhako','sato','paṭisaṃvedeti','ariyā','ācikkhanti','sukhavihārī','tatiyaṃ'],
    note: '🌟 3선(tatiyaṃ jhānaṃ).' },

  // 4선
  { type: 'teach', icon: '🌙', word: 'sukhassa pahānā', pronKo: '수캇사 빠하~나~', meaning: '행복을 버림으로',
    grammar: '속격 + 탈격', baseForm: 'sukha + pahāna',
    formNote: '제3선의 행복도 놓음', verseLine: V_MAG8D, verseLineKo: V_MAG8DK, audio: true },
  { type: 'teach', icon: '🌙', word: 'dukkhassa pahānā', pronKo: '둑캇사 빠하~나~', meaning: '괴로움을 버림으로',
    grammar: '속격 + 탈격', baseForm: 'dukkha + pahāna',
    verseLine: V_MAG8D, verseLineKo: V_MAG8DK, audio: true },
  { type: 'teach', icon: '⏪', word: 'pubbeva', pronKo: '뿝베와', meaning: '이전에 이미',
    grammar: '부사', baseForm: 'pubbe + eva',
    verseLine: V_MAG8D, verseLineKo: V_MAG8DK, audio: true },
  { type: 'teach', icon: '⚖️', word: 'somanassadomanassānaṃ', pronKo: '소마낫사도마낫사~낭', meaning: '기쁨과 근심의 (속격 복수)',
    grammar: '복합어, 속격 복수', baseForm: 'somanassa(기쁨) + domanassa(근심)',
    verseLine: V_MAG8D, verseLineKo: V_MAG8DK, audio: true },
  { type: 'teach', icon: '🌅', word: 'atthaṅgamā', pronKo: '앗탕가마~', meaning: '사라짐으로 (탈격)',
    grammar: '남성명사, 탈격', baseForm: 'atthaṅgama',
    verseLine: V_MAG8D, verseLineKo: V_MAG8DK, audio: true },
  { type: 'teach', icon: '✨', word: 'upekkhāsatipārisuddhiṃ', pronKo: '우뻭카~사띠빠~리숫딩', meaning: '평정과 마음챙김의 청정을',
    grammar: '복합어, 대격', baseForm: 'upekkhā + sati + pārisuddhi (청정)',
    verseLine: V_MAG8D, verseLineKo: V_MAG8DK, audio: true },
  { type: 'teach', icon: '4️⃣', word: 'catutthaṃ jhānaṃ', pronKo: '짜뚯탕 자~낭', meaning: '제4선',
    grammar: '형용사 + 명사', baseForm: 'catuttha(넷째) + jhāna',
    buddhism: '제4선(四禪). 평정과 마음챙김의 청정.',
    verseLine: V_MAG8D, verseLineKo: V_MAG8DK, audio: true },
  { type: 'verse', pali: V_MAG8D, pronKo: '수캇사 짜 빠하~나~ 둑캇사 짜 빠하~나~ 뿝베와 소마낫사도마낫사~낭 앗탕가마~ 아둑카마수캉 우뻭카~사띠빠~리숫딩 짜뚯탕 자~낭 우빠삼빳자 위하라띠. 아양 웃짜띠, 빅카웨, 삼마~사마~디. 이당 웃짜띠, 빅카웨, 둑카니로다가~미니~ 빠띠빠다~ 아리야삿짱.',
    translation: V_MAG8DK, highlight: ['sukhassa','pahānā','dukkhassa','pubbeva','somanassadomanassānaṃ','atthaṅgamā','upekkhāsatipārisuddhiṃ','catutthaṃ'],
    note: '🌟 4선(catutthaṃ jhānaṃ) — 정정 마무리, 도성제 마무리.' },

  { type: 'verse', pali: REF_DHM('catūsu ariyasaccesu'),
    pronKo: '이띠 앗잣땅 와~... 짜뚜~수 아리야삿쩨수.',
    translation: REF_DHM_K('사성제에 대해'), note: '🔁 후렴(사성제).' },
  { type: 'verse', pali: 'saccapabbaṃ niṭṭhitaṃ.\ndhammānupassanā niṭṭhitā.',
    pronKo: '삿짜빱방 닛티땅. 담마~누빳사나~ 닛티따~.',
    translation: '— 사성제 항목 끝. 법념처 끝. —' },

  // ===== 결론: 수행의 과보 =====
  { type: 'intro', icon: '🏆', title: '— 수행의 과보 —', subtitle: '7년~7일',
    description: '사념처 수행자에게 약속된 두 가지 결과.' },

  // ── V_END1: 7년 보증 ──
  { type: 'teach', icon: '🤷', word: 'yo hi koci', pronKo: '요 히 꼬찌', meaning: '누구든지',
    grammar: '관계대명사 + 강조 + 부정대명사', baseForm: 'yo(누가) + hi(강조) + koci(어떤)',
    formNote: '"누구든지 ~한 자는"',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '🧘', word: 'satipaṭṭhāne', pronKo: '사띠빳타~네', meaning: '사념처들을 (대격 복수)',
    grammar: '남성명사, 대격 복수', baseForm: 'satipaṭṭhāna',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '👁️', word: 'evaṃ', pronKo: '에왕', meaning: '이렇게',
    grammar: '부사', baseForm: 'evaṃ',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '🌱', word: 'bhāveyya', pronKo: '바~웨이야', meaning: '닦으면 (가능법)',
    grammar: '동사 3인칭 단수 가능법', baseForm: 'bhāveti (닦다)',
    formNote: '√bhū 사역형 + 가능법 -eyya\n"닦는다면, 닦을 것이다"',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '📅', word: 'sattavassāni', pronKo: '삿따왓사~니', meaning: '7년간',
    grammar: '복합어, 대격 중성 복수', baseForm: 'satta(7) + vassa(년)',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '👤', word: 'tassa', pronKo: '땃사', meaning: '그에게 (속격)',
    grammar: '대명사, 속격 남성 단수', baseForm: 'ta',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '2️⃣', word: 'dvinnaṃ', pronKo: '드윈낭', meaning: '두 (속격)',
    grammar: '수사, 속격 복수', baseForm: 'dvi (둘)',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '🍇', word: 'phalānaṃ', pronKo: '팔라~낭', meaning: '결실들의 (속격 복수)',
    grammar: '중성명사, 속격 복수', baseForm: 'phala',
    buddhism: '과(果). 수행의 결실.', verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '🎯', word: 'aññataraṃ', pronKo: '안냐따랑', meaning: '둘 중 하나의',
    grammar: '형용사, 대격 중성 단수', baseForm: 'aññatara',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '🍇', word: 'phalaṃ', pronKo: '팔랑', meaning: '결실을 (대격)',
    grammar: '중성명사, 대격', baseForm: 'phala',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '✨', word: 'pāṭikaṅkhaṃ', pronKo: '빠~띠깡캉', meaning: '기대되는',
    grammar: '형용사/미래분사, 대격 중성', baseForm: 'pāṭikaṅkha (paṭi- + √kaṅkh)',
    formNote: '"기대해야 할, 예상되는"',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '👀', word: 'diṭṭheva dhamme', pronKo: '딧테와 담메', meaning: '지금 여기서, 현생에서',
    grammar: '처격 + eva', baseForm: 'diṭṭha(본) + eva + dhamma',
    formNote: '"보인 법에서 (이 생에서)"',
    buddhism: '현법(現法). 현재 이 생.', verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '🏆', word: 'aññā', pronKo: '안냐~', meaning: '구경의 지혜, 아라한과',
    grammar: '여성명사, 주격 단수', baseForm: 'aññā (ā- + √ñā)',
    formNote: '"완전한 앎" = 아라한의 지혜',
    buddhism: '아라한과(阿羅漢果). 최고의 깨달음.',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '🔗', word: 'upādisese', pronKo: '우빠~디세세', meaning: '잡음이 남은 채 (처격)',
    grammar: '복합어, 처격 단수', baseForm: 'upādi(잡음) + sesa(남은)',
    formNote: 'sa-upādisesa = "취착이 남은 상태"',
    buddhism: '유여열반(有餘涅槃). 몸 살아있는 동안의 열반.',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'teach', icon: '🕊️', word: 'anāgāmitā', pronKo: '아나~가~미따~', meaning: '불환과',
    grammar: '여성명사, 주격 단수', baseForm: 'anāgāmin(돌아오지 않는 자) + -tā',
    formNote: 'an + āgāmin(오는) = 돌아오지 않음\n+ -tā(상태) = "불환의 상태"',
    buddhism: '불환과(不還果, 아나함). 욕계로 돌아오지 않음.',
    verseLine: V_END1, verseLineKo: V_END1K, audio: true },
  { type: 'verse', pali: V_END1, pronKo: '요 히 꼬찌, 빅카웨, 이메 짯따~로 사띠빳타~네 에왕 바~웨이야 삿따왓사~니, 땃사 드윈낭 팔라~낭 안냐따랑 팔랑 빠~띠깡캉 — 딧테와 담메 안냐~, 사띠 와~ 우빠~디세세 아나~가~미따~.',
    translation: V_END1K, highlight: ['yo','koci','satipaṭṭhāne','bhāveyya','sattavassāni','dvinnaṃ','phalānaṃ','aññataraṃ','pāṭikaṅkhaṃ','diṭṭheva','aññā','upādisese','anāgāmitā'],
    note: '🏆 7년 → 아라한 or 아나함.' },

  // ── V_END2: 기간 단축 (7년 → 7개월) ──
  { type: 'teach', icon: '🛑', word: 'tiṭṭhantu', pronKo: '띳탄뚜', meaning: '그만두라 (복수 명령)',
    grammar: '동사 3인칭 복수 명령형', baseForm: 'tiṭṭhati (서다, 멈추다)',
    formNote: '"머무를지어다, 그만두라" — 화법 전환 정형구',
    verseLine: V_END2, verseLineKo: V_END2K, audio: true },
  { type: 'teach', icon: '6️⃣', word: 'cha vassāni', pronKo: '차 왓사~니', meaning: '6년',
    grammar: '수사 + 명사', baseForm: 'cha(6) + vassa',
    verseLine: V_END2, verseLineKo: V_END2K, audio: true },
  { type: 'teach', icon: '⋯', word: 'pe', pronKo: '뻬', meaning: '(생략 표시)',
    grammar: '약어', baseForm: 'peyyāla (생략)',
    formNote: '경전 반복 구조의 생략 표시',
    verseLine: V_END2, verseLineKo: V_END2K, audio: true },
  { type: 'teach', icon: '5️⃣', word: 'pañca vassāni', pronKo: '빤짜 왓사~니', meaning: '5년',
    grammar: '수사 + 명사', baseForm: 'pañca(5) + vassa',
    verseLine: V_END2, verseLineKo: V_END2K, audio: true },
  { type: 'teach', icon: '4️⃣', word: 'cattāri vassāni', pronKo: '짯따~리 왓사~니', meaning: '4년',
    grammar: '수사 + 명사', baseForm: 'cattāri(4중성) + vassa',
    verseLine: V_END2, verseLineKo: V_END2K, audio: true },
  { type: 'teach', icon: '3️⃣', word: 'tīṇi vassāni', pronKo: '띠~니 왓사~니', meaning: '3년',
    grammar: '수사 + 명사', baseForm: 'tīṇi(3중성) + vassa',
    verseLine: V_END2, verseLineKo: V_END2K, audio: true },
  { type: 'teach', icon: '2️⃣', word: 'dve vassāni', pronKo: '드웨 왓사~니', meaning: '2년',
    grammar: '수사 + 명사', baseForm: 'dve(2) + vassa',
    verseLine: V_END2, verseLineKo: V_END2K, audio: true },
  { type: 'teach', icon: '1️⃣', word: 'ekaṃ vassaṃ', pronKo: '에깡 왓상', meaning: '1년',
    grammar: '수사 + 명사', baseForm: 'eka(1) + vassa',
    verseLine: V_END2, verseLineKo: V_END2K, audio: true },
  { type: 'teach', icon: '🛑', word: 'tiṭṭhatu', pronKo: '띳타뚜', meaning: '그만두라 (단수 명령)',
    grammar: '동사 3인칭 단수 명령형', baseForm: 'tiṭṭhati',
    verseLine: V_END2, verseLineKo: V_END2K, audio: true },
  { type: 'teach', icon: '7️⃣', word: 'sattamāsāni', pronKo: '삿따마~사~니', meaning: '7개월',
    grammar: '복합어, 대격 중성 복수', baseForm: 'satta(7) + māsa(개월)',
    verseLine: V_END2, verseLineKo: V_END2K, audio: true },
  { type: 'verse', pali: V_END2, pronKo: '띳탄뚜, 빅카웨, 삿따왓사~니. ... 차 왓사~니, ... 빤짜 왓사~니, 짯따~리 왓사~니, 띠~니 왓사~니, 드웨 왓사~니, 에깡 왓상. 띳타뚜, 빅카웨, 에깡 왓상. ... 삿따마~사~니, 땃사 드윈낭 팔라~낭 안냐따랑 팔랑 빠~띠깡캉...',
    translation: V_END2K, highlight: ['tiṭṭhantu','cha','pañca','cattāri','tīṇi','dve','ekaṃ','tiṭṭhatu','sattamāsāni'],
    note: '⏳ 6년~1년 → 7개월.' },

  // ── V_END3: 7개월 → 7일 ──
  { type: 'teach', icon: '📆', word: 'satta māsāni', pronKo: '삿따 마~사~니', meaning: '7개월',
    grammar: '수사 + 명사 (분리)', baseForm: 'satta + māsa',
    verseLine: V_END3, verseLineKo: V_END3K, audio: true },
  { type: 'teach', icon: '🌗', word: 'aḍḍhamāsaṃ', pronKo: '앗다마~상', meaning: '반달, 보름',
    grammar: '복합어, 대격', baseForm: 'aḍḍha(반) + māsa(달)',
    verseLine: V_END3, verseLineKo: V_END3K, audio: true },
  { type: 'teach', icon: '7️⃣', word: 'sattāhaṃ', pronKo: '삿따~항', meaning: '7일 (일주일)',
    grammar: '복합어, 대격', baseForm: 'satta(7) + aha(일)',
    formNote: '경의 마지막 보증: "단 7일이라도"',
    verseLine: V_END3, verseLineKo: V_END3K, audio: true },
  { type: 'verse', pali: V_END3, pronKo: '띳탄뚜, 빅카웨, 삿따 마~사~니. ... 차 마~사~니, 빤짜 마~사~니, 짯따~리 마~사~니, 띠~니 마~사~니, 드웨 마~사~니, 에깡 마~상, 앗다마~상. 띳타뚜, 빅카웨, 앗다마~소. ... 삿따~항, 땃사 드윈낭 팔라~낭 안냐따랑 팔랑 빠~띠깡캉 — 딧테와 담메 안냐~, 사띠 와~ 우빠~디세세 아나~가~미따~띠.',
    translation: V_END3K, highlight: ['satta','māsāni','aḍḍhamāsaṃ','sattāhaṃ'],
    note: '⏳ 6개월~반달 → 단 7일에도 결과 가능!' },

  // ── V_END4: 결론 정형구 ──
  { type: 'teach', icon: '↩️', word: 'iti yaṃ taṃ vuttaṃ', pronKo: '이띠 양 땅 웃땅', meaning: '이렇게 말씀하신 것은',
    grammar: '인용 + 관계대명사 + 지시대명사 + 과거분사', baseForm: 'iti + yaṃ + taṃ + vutta',
    formNote: '경 결론 정형구',
    verseLine: V_END4, verseLineKo: V_END4K, audio: true },
  { type: 'teach', icon: '🔗', word: 'idametaṃ paṭicca', pronKo: '이다메땅 빠띳짜', meaning: '이것을 의지하여',
    grammar: '대명사 + 절대분사', baseForm: 'idaṃ(이) + etaṃ(이것) + paṭicca',
    verseLine: V_END4, verseLineKo: V_END4K, audio: true },
  { type: 'teach', icon: '💬', word: 'vuttan', pronKo: '웃딴', meaning: '말씀하신 것 (인용)',
    grammar: '과거분사, 주격 중성 + ti', baseForm: 'vutta + ti',
    formNote: 'vuttaṃ + ti → vuttan (산디)',
    verseLine: V_END4, verseLineKo: V_END4K, audio: true },
  { type: 'teach', icon: '🗣️', word: 'idamavoca', pronKo: '이다마오짜', meaning: '이렇게 말씀하셨다',
    grammar: '대명사 + 동사 (아오리스트)', baseForm: 'idaṃ + avoca',
    formNote: 'idaṃ(이것을) + avoca(√vac의 아오리스트)\n경전 끝 정형구',
    verseLine: V_END4, verseLineKo: V_END4K, audio: true },
  { type: 'teach', icon: '😊', word: 'attamanā', pronKo: '앗따마나~', meaning: '흡족한 마음의 (주격 복수)',
    grammar: '형용사, 주격 남성 복수', baseForm: 'attamana (atta-mana)',
    formNote: 'atta(자기) + mana(마음) = "자기 마음에 든"',
    verseLine: V_END4, verseLineKo: V_END4K, audio: true },
  { type: 'teach', icon: '🧘', word: 'te bhikkhū', pronKo: '떼 빅쿠~', meaning: '그 비구들',
    grammar: '대명사 + 명사 (주격 복수)', baseForm: 'ta + bhikkhu',
    verseLine: V_END4, verseLineKo: V_END4K, audio: true },
  { type: 'teach', icon: '💬', word: 'bhāsitaṃ', pronKo: '바~시땅', meaning: '말씀을 (대격)',
    grammar: '과거분사, 대격 중성', baseForm: 'bhāsita (√bhās 말하다)',
    verseLine: V_END4, verseLineKo: V_END4K, audio: true },
  { type: 'teach', icon: '🎉', word: 'abhinandunti', pronKo: '아비난둔띠', meaning: '기뻐하였다',
    grammar: '동사 3인칭 복수 아오리스트 + ti', baseForm: 'abhinandati (기뻐하다)',
    formNote: 'abhi + √nand(기뻐하다) → abhinandati 아오리스트 abhinanduṃ + ti\n경전 마지막 정형구: "비구들이 기뻐하였다"',
    verseLine: V_END4, verseLineKo: V_END4K, audio: true },
  { type: 'verse', pali: V_END4, pronKo: '에까~야노 아양, 빅카웨, 막고 삿따~낭 위숫디야~... 야디당 짯따~로 사띠빳타~나~띠. 이띠 양 땅 웃땅, 이다메땅 빠띳짜 웃딴띠. 이다마오짜 바가와~. 앗따마나~ 떼 빅쿠~ 바가와또 바~시땅 아비난둔띠.',
    translation: V_END4K, highlight: ['iti','yaṃ','taṃ','vuttaṃ','idametaṃ','paṭicca','idamavoca','attamanā','bhāsitaṃ','abhinandunti'],
    note: '🎯 결론: 사념처 = 유일한 길. 세존의 말씀에 비구들이 환희하다.' },

  // ── V_END5: 경전 종결 ──
  { type: 'teach', icon: '📜', word: 'mahāsatipaṭṭhānasuttaṃ', pronKo: '마하~사띠빳타~나숫땅', meaning: '마하사띠빳타나경',
    grammar: '복합어, 주격 중성', baseForm: 'mahā(큰) + satipaṭṭhāna + sutta(경)',
    buddhism: '대념처경(大念處經) — 경의 이름.',
    verseLine: V_END5, verseLineKo: V_END5K, audio: true },
  { type: 'teach', icon: '🏁', word: 'niṭṭhitaṃ', pronKo: '닛티땅', meaning: '끝났다, 완결되었다',
    grammar: '과거분사, 주격 중성', baseForm: 'niṭṭhita (ni- + √ṭhā)',
    formNote: '"세워져 완성됨 = 끝남"\n경전 종결 정형구',
    verseLine: V_END5, verseLineKo: V_END5K, audio: true },
  { type: 'verse', pali: V_END5, pronKo: '마하~사띠빳타~나숫땅 닛티땅.',
    translation: V_END5K, highlight: ['mahāsatipaṭṭhānasuttaṃ','niṭṭhitaṃ'], note: '✅ 경전 끝.' },

  // ===== 종합 퀴즈 =====
  { type: 'quiz', question: 'Mahāsatipaṭṭhāna Sutta의 핵심 가르침은?',
    options: ['신·수·심·법을 관찰하라', '고행으로 해탈하라', '의례를 지키라', '책을 외우라'], answer: 0 },
  { type: 'quiz', question: '사념처를 닦으면 약속된 최소 기간은?',
    options: ['7년', '1년', '7개월', '7일'], answer: 3, hint: '경 마지막의 약속!' },
  { type: 'quiz', question: '법념처(dhammānupassanā)에 속하지 않는 항목은?',
    options: ['5장애', '5취온', '6내외처', '9가지 묘지관'], answer: 3, hint: '묘지관은 신념처.' },
  { type: 'quiz', question: '도성제 = 무엇?', options: ['갈애', '오취온', '팔정도', '12연기'], answer: 2 },

  { type: 'writing', instruction: '"마음챙김 확립"을 빠알리어로 써보세요',
    meaning: '사념처', pronKo: '사띠빳타~나', answer: 'satipaṭṭhāna', hint: 'sati + paṭṭhāna' },
  { type: 'speak', pali: 'ekāyano ayaṃ, bhikkhave, maggo ... yadidaṃ cattāro satipaṭṭhānā.',
    pronKo: '에까~야노 아양, 빅카웨, 막고 ... 야디당 짯따~로 사띠빳타~나~.' },
]
