# 도 분별경 SN 45.8 — VRI 6차 결집본 전문 (Sāvatthinidānaṃ과 …pe… 복원), 문장 단위
EIGHT = 'sammādiṭṭhi sammāsaṅkappo sammāvācā sammākammanto sammāājīvo sammāvāyāmo sammāsati sammāsamādhi'
EFFORT = 'chandaṃ janeti vāyamati vīriyaṃ ārabhati cittaṃ paggaṇhāti padahati'
EFFORT_K = '의욕을 일으키고, 정진하고, 힘을 내고, 마음을 다잡고, 애쓴다'
SATI = 'viharati ātāpī sampajāno satimā, vineyya loke abhijjhādomanassaṃ'
SATI_K = '머문다. 열심히, 분명히 알아차리며, 마음챙기면서 세상에 대한 탐욕과 근심을 버린다'

UNITS = [
    # Sāvatthinidānaṃ — 사왓티 인연담 정형구 복원
    ('Evaṃ me sutaṃ – ekaṃ samayaṃ bhagavā sāvatthiyaṃ viharati jetavane anāthapiṇḍikassa ārāme. Tatra kho bhagavā bhikkhū āmantesi – ‘‘bhikkhavo’’ti. ‘‘Bhadante’’ti te bhikkhū bhagavato paccassosuṃ. Bhagavā etadavoca –',
     '이와 같이 나는 들었다. 한때 세존께서 사왓티의 제따 숲 아나타삔디까 승원에 머무셨다. 거기서 세존께서 “비구들이여” 하고 비구들을 부르셨다. 그 비구들은 “존자시여” 하고 세존께 응답하였다. 세존께서 이렇게 말씀하셨다.', []),
    ('‘‘Ariyaṃ vo, bhikkhave, aṭṭhaṅgikaṃ maggaṃ desessāmi vibhajissāmi. Taṃ suṇātha, sādhukaṃ manasi karotha; bhāsissāmī’’ti.',
     '“비구들이여, 그대들에게 성스러운 팔정도를 설하고 분석해 주겠다. 그것을 듣고 잘 마음에 새겨라. 이제 말하겠다.”', []),
    ('‘‘Evaṃ, bhante’’ti kho te bhikkhū bhagavato paccassosuṃ. Bhagavā etadavoca –',
     '“그렇게 하겠습니다, 세존이시여.” 하고 그 비구들은 세존께 응답하였다. 세존께서 이렇게 말씀하셨다.', []),
    (f'‘‘Katamo ca, bhikkhave, ariyo aṭṭhaṅgiko maggo? Seyyathidaṃ – {EIGHT}.',
     '“비구들이여, 무엇이 성스러운 팔정도인가? 곧 정견·정사유·정어·정업·정명·정정진·정념·정정이다.', []),
    ('‘‘Katamā ca, bhikkhave, sammādiṭṭhi? Yaṃ kho, bhikkhave, dukkhe ñāṇaṃ, dukkhasamudaye ñāṇaṃ, dukkhanirodhe ñāṇaṃ, dukkhanirodhagāminiyā paṭipadāya ñāṇaṃ – ayaṃ vuccati, bhikkhave, sammādiṭṭhi.',
     '“비구들이여, 무엇이 정견인가? 비구들이여, 괴로움에 대한 앎, 괴로움의 일어남에 대한 앎, 괴로움의 소멸에 대한 앎, 괴로움의 소멸로 이끄는 길에 대한 앎 — 비구들이여, 이것을 정견이라 한다.', []),
    ('‘‘Katamo ca, bhikkhave, sammāsaṅkappo? Yo kho, bhikkhave, nekkhammasaṅkappo, abyāpādasaṅkappo, avihiṃsāsaṅkappo – ayaṃ vuccati, bhikkhave, sammāsaṅkappo.',
     '“비구들이여, 무엇이 정사유인가? 비구들이여, 출리의 사유, 악의 없음의 사유, 해코지 않음의 사유 — 비구들이여, 이것을 정사유라 한다.', []),
    ('‘‘Katamā ca, bhikkhave, sammāvācā? Yā kho, bhikkhave, musāvādā veramaṇī, pisuṇāya vācāya veramaṇī, pharusāya vācāya veramaṇī, samphappalāpā veramaṇī – ayaṃ vuccati, bhikkhave, sammāvācā.',
     '“비구들이여, 무엇이 정어인가? 비구들이여, 거짓말을 삼가고, 이간하는 말을 삼가고, 거친 말을 삼가고, 쓸데없는 말을 삼가는 것 — 비구들이여, 이것을 정어라 한다.', []),
    ('‘‘Katamo ca, bhikkhave, sammākammanto? Yā kho, bhikkhave, pāṇātipātā veramaṇī, adinnādānā veramaṇī, abrahmacariyā veramaṇī – ayaṃ vuccati, bhikkhave, sammākammanto.',
     '“비구들이여, 무엇이 정업인가? 비구들이여, 생명을 죽이는 것을 삼가고, 주지 않은 것을 가지는 것을 삼가고, 청정하지 못한 행위를 삼가는 것 — 비구들이여, 이것을 정업이라 한다.', []),
    ('‘‘Katamo ca, bhikkhave, sammāājīvo? Idha, bhikkhave, ariyasāvako micchāājīvaṃ pahāya sammāājīvena jīvitaṃ kappeti – ayaṃ vuccati, bhikkhave, sammāājīvo.',
     '“비구들이여, 무엇이 정명인가? 비구들이여, 여기 성스러운 제자는 그릇된 생계를 버리고 바른 생계로 삶을 꾸려 간다 — 비구들이여, 이것을 정명이라 한다.', []),
    # 바른 정진 (…pe… 복원: 네 가지 노력을 각각 전문으로)
    (f'‘‘Katamo ca, bhikkhave, sammāvāyāmo? Idha, bhikkhave, bhikkhu anuppannānaṃ pāpakānaṃ akusalānaṃ dhammānaṃ anuppādāya {EFFORT},',
     f'“비구들이여, 무엇이 정정진인가? 비구들이여, 여기 비구는 아직 일어나지 않은 악하고 해로운 법들이 일어나지 않도록 {EFFORT_K}.', []),
    (f'uppannānaṃ pāpakānaṃ akusalānaṃ dhammānaṃ pahānāya {EFFORT},',
     f'이미 일어난 악하고 해로운 법들을 버리기 위해 {EFFORT_K}.', []),
    (f'anuppannānaṃ kusalānaṃ dhammānaṃ uppādāya {EFFORT},',
     f'아직 일어나지 않은 유익한 법들을 일으키기 위해 {EFFORT_K}.', []),
    (f'uppannānaṃ kusalānaṃ dhammānaṃ ṭhitiyā asammosāya bhiyyobhāvāya vepullāya bhāvanāya pāripūriyā {EFFORT} – ayaṃ vuccati, bhikkhave, sammāvāyāmo.',
     f'이미 일어난 유익한 법들을 지속시키고, 잊지 않고, 더욱 늘리고, 충만하게 하고, 닦아서 완성하기 위해 {EFFORT_K}. 비구들이여, 이것을 정정진이라 한다.', []),
    # 바른 마음챙김
    (f'‘‘Katamā ca, bhikkhave, sammāsati? Idha, bhikkhave, bhikkhu kāye kāyānupassī {SATI};',
     f'“비구들이여, 무엇이 정념인가? 비구들이여, 여기 비구는 몸에서 몸을 관찰하며 {SATI_K}.', []),
    (f'vedanāsu vedanānupassī {SATI};', f'느낌들에서 느낌을 관찰하며 {SATI_K}.', []),
    (f'citte cittānupassī {SATI};', f'마음에서 마음을 관찰하며 {SATI_K}.', []),
    (f'dhammesu dhammānupassī {SATI} – ayaṃ vuccati, bhikkhave, sammāsati.',
     f'법들에서 법을 관찰하며 {SATI_K}. 비구들이여, 이것을 정념이라 한다.', []),
    # 바른 삼매 (네 가지 선정)
    ('‘‘Katamo ca, bhikkhave, sammāsamādhi? Idha, bhikkhave, bhikkhu vivicceva kāmehi vivicca akusalehi dhammehi savitakkaṃ savicāraṃ vivekajaṃ pītisukhaṃ paṭhamaṃ jhānaṃ upasampajja viharati.',
     '“비구들이여, 무엇이 정정인가? 비구들이여, 여기 비구는 감각적 쾌락들에서 완전히 떨어지고 해로운 법들에서 떨어져, 일으킨 생각과 지속적 고찰이 있고, 떨쳐 버림에서 생긴 희열과 행복이 있는 초선에 들어 머문다.', []),
    ('Vitakkavicārānaṃ vūpasamā ajjhattaṃ sampasādanaṃ cetaso ekodibhāvaṃ avitakkaṃ avicāraṃ samādhijaṃ pītisukhaṃ dutiyaṃ jhānaṃ upasampajja viharati.',
     '일으킨 생각과 지속적 고찰이 가라앉아, 안으로 고요하고 마음이 하나로 모이며, 일으킨 생각도 지속적 고찰도 없고, 삼매에서 생긴 희열과 행복이 있는 제2선에 들어 머문다.', []),
    ('Pītiyā ca virāgā upekkhako ca viharati sato ca sampajāno, sukhañca kāyena paṭisaṃvedeti, yaṃ taṃ ariyā ācikkhanti – ‘upekkhako satimā sukhavihārī’ti tatiyaṃ jhānaṃ upasampajja viharati.',
     '희열이 빛바래어 평정하게 머물고, 마음챙기며 분명히 알아차리고, 몸으로 행복을 경험한다. 성자들이 ‘평정하고 마음챙기며 행복하게 머문다’라고 말하는 제3선에 들어 머문다.', []),
    ('Sukhassa ca pahānā dukkhassa ca pahānā pubbeva somanassadomanassānaṃ atthaṅgamā adukkhamasukhaṃ upekkhāsatipārisuddhiṃ catutthaṃ jhānaṃ upasampajja viharati – ayaṃ vuccati, bhikkhave, sammāsamādhī’’ti.',
     '행복도 버리고 괴로움도 버려, 이전에 이미 기쁨과 근심이 사라졌으므로, 괴롭지도 즐겁지도 않으며 평정으로 마음챙김이 청정한 제4선에 들어 머문다. 비구들이여, 이것을 정정이라 한다.”', []),
]
