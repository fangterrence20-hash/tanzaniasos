export type GuideStep = {
  title: { en: string; sw: string };
  body: { en: string; sw: string };
  illustration: string;
};

export type Guide = {
  slug: string;
  title: { en: string; sw: string };
  subtitle: { en: string; sw: string };
  tone: "sos" | "medical" | "money";
  keywords: string;
  steps: GuideStep[];
};

export const guides: Guide[] = [
  {
    slug: "cpr-choking",
    tone: "sos",
    title: { en: "CPR & Choking", sw: "Kurejesha Pumzi na Kukabiliana na Kukwama" },
    subtitle: {
      en: "Person not breathing or food stuck in throat",
      sw: "Mtu hapumui au chakula kimekwama kooni",
    },
    keywords: "cpr choking breath pumzi kukwama moyo heart",
    steps: [
      {
        illustration: "shake-shoulders",
        title: { en: "Check response", sw: "Angalia kama anaitikia" },
        body: {
          en: "Tap the shoulders and shout. If there is no answer, call 115 immediately.",
          sw: "Mgusa begani na piga kelele. Kama haitiki, piga 115 mara moja.",
        },
      },
      {
        illustration: "open-airway",
        title: { en: "Open the airway", sw: "Fungua njia ya hewa" },
        body: {
          en: "Tilt the head back, lift the chin. Look and listen for breathing for 10 seconds.",
          sw: "Inamisha kichwa nyuma, nyanyua kidevu. Sikiliza pumzi kwa sekunde 10.",
        },
      },
      {
        illustration: "chest-compressions",
        title: { en: "30 chest compressions", sw: "Bonyeza kifua mara 30" },
        body: {
          en: "Push hard in the centre of the chest, 5 cm deep, 2 pushes per second.",
          sw: "Bonyeza katikati ya kifua kwa nguvu, sentimita 5, mara 2 kila sekunde.",
        },
      },
      {
        illustration: "rescue-breaths",
        title: { en: "2 rescue breaths", sw: "Pumzi 2 za uokoaji" },
        body: {
          en: "Pinch the nose, seal the mouth, blow until the chest rises. Repeat 30:2.",
          sw: "Ziba pua, funika mdomo, puliza hadi kifua kinyanyuke. Rudia 30:2.",
        },
      },
      {
        illustration: "back-blows",
        title: { en: "Choking: 5 back blows", sw: "Kukwama: pigo 5 mgongoni" },
        body: {
          en: "Lean the person forward. Hit between the shoulder blades, then 5 abdominal thrusts.",
          sw: "Mwinamishe mbele. Piga katikati ya mabega, kisha msukumo 5 tumboni.",
        },
      },
    ],
  },
  {
    slug: "severe-bleeding",
    tone: "sos",
    title: { en: "Severe Bleeding & Tourniquets", sw: "Kuzuia Kuvuja kwa Damu Nyingi" },
    subtitle: { en: "Deep cuts and heavy blood loss", sw: "Majeraha makubwa na damu nyingi" },
    keywords: "bleeding blood damu tourniquet jeraha cut",
    steps: [
      {
        illustration: "gloves",
        title: { en: "Protect yourself", sw: "Jilinde kwanza" },
        body: {
          en: "Use gloves or a plastic bag on your hands before touching blood.",
          sw: "Vaa glavu au mfuko wa plastiki mikononi kabla ya kugusa damu.",
        },
      },
      {
        illustration: "press-wound",
        title: { en: "Press hard on the wound", sw: "Bonyeza jeraha kwa nguvu" },
        body: {
          en: "Place a clean cloth on the wound and press firmly without stopping.",
          sw: "Weka kitambaa safi kwenye jeraha na bonyeza bila kuacha.",
        },
      },
      {
        illustration: "raise-limb",
        title: { en: "Raise the limb", sw: "Nyanyua kiungo" },
        body: {
          en: "Lift the arm or leg above the level of the heart if no bone is broken.",
          sw: "Nyanyua mkono au mguu juu ya kiwango cha moyo kama hakuna mfupa uliovunjika.",
        },
      },
      {
        illustration: "tourniquet",
        title: { en: "Tourniquet as last resort", sw: "Tumia kamba kama njia ya mwisho" },
        body: {
          en: "Tie 5 cm above the wound, tighten until bleeding stops. Write the time on the skin.",
          sw: "Funga sentimita 5 juu ya jeraha, kaza hadi damu ikome. Andika saa kwenye ngozi.",
        },
      },
    ],
  },
  {
    slug: "snake-bites",
    tone: "medical",
    title: { en: "Snake Bites", sw: "Kuumwa na Nyoka" },
    subtitle: { en: "Keep still, move fast to hospital", sw: "Tulia, nenda hospitali haraka" },
    keywords: "snake nyoka bite sumu venom",
    steps: [
      {
        illustration: "stay-calm",
        title: { en: "Keep the person calm", sw: "Mtulize mgonjwa" },
        body: {
          en: "Panic spreads venom faster. Sit them down and keep the bite below the heart.",
          sw: "Hofu husambaza sumu haraka. Mkalishe na weka jeraha chini ya moyo.",
        },
      },
      {
        illustration: "remove-jewellery",
        title: { en: "Remove tight items", sw: "Ondoa vitu vinavyobana" },
        body: {
          en: "Take off rings, watches and tight clothing before swelling starts.",
          sw: "Ondoa pete, saa na nguo zinazobana kabla ya kuvimba.",
        },
      },
      {
        illustration: "immobilise",
        title: { en: "Immobilise the limb", sw: "Zuia kiungo kisonge" },
        body: {
          en: "Splint the limb loosely. Do not cut, suck or wash the wound.",
          sw: "Funga kiungo kwa ubao taratibu. Usikate, usinyonye wala kuosha jeraha.",
        },
      },
      {
        illustration: "hospital",
        title: { en: "Go to hospital now", sw: "Nenda hospitali sasa" },
        body: {
          en: "Antivenom is the only treatment. Photograph the snake only if it is safe.",
          sw: "Dawa ya sumu ndiyo tiba pekee. Piga picha ya nyoka ikiwa ni salama tu.",
        },
      },
    ],
  },
  {
    slug: "road-accident-triage",
    tone: "medical",
    title: { en: "Road Accident Triage", sw: "Msaada wa Kwanza Ajali za Barabarani" },
    subtitle: { en: "Many casualties, decide who is first", sw: "Majeruhi wengi, chagua wa kwanza" },
    keywords: "accident ajali road barabara triage bajaji pikipiki",
    steps: [
      {
        illustration: "secure-scene",
        title: { en: "Make the scene safe", sw: "Fanya eneo liwe salama" },
        body: {
          en: "Switch on hazard lights, place branches or triangles 50 m before the scene.",
          sw: "Washa taa za hatari, weka matawi au pembetatu mita 50 kabla ya eneo.",
        },
      },
      {
        illustration: "count-casualties",
        title: { en: "Count and call", sw: "Hesabu na piga simu" },
        body: {
          en: "Call 115 and say how many people are hurt and the exact location.",
          sw: "Piga 115 useme watu wangapi wameumia na mahali hasa.",
        },
      },
      {
        illustration: "triage-tags",
        title: { en: "Check the quiet ones first", sw: "Anza na waliokimya" },
        body: {
          en: "Those who cannot walk or speak are the most critical. Loud shouting means breathing.",
          sw: "Wasioweza kutembea au kuongea ndio hatarini zaidi. Anayepiga kelele anapumua.",
        },
      },
      {
        illustration: "no-move",
        title: { en: "Do not move the injured", sw: "Usiwasogeze majeruhi" },
        body: {
          en: "Unless there is fire, keep the neck and back still until responders arrive.",
          sw: "Isipokuwa kuna moto, weka shingo na mgongo bila kusogea hadi wasaidizi wafike.",
        },
      },
    ],
  },
  {
    slug: "burns-scalds",
    tone: "sos",
    title: { en: "Burns & Scalds", sw: "Kuungua na Maji ya Moto" },
    subtitle: { en: "Fire, hot oil, boiling water", sw: "Moto, mafuta ya moto, maji yanayochemka" },
    keywords: "burn burns fire moto kuungua scald maji oil charcoal jiko",
    steps: [
      {
        illustration: "stop-burning",
        title: { en: "Stop the burning", sw: "Zima chanzo cha moto" },
        body: {
          en: "Move away from fire or hot liquid. Remove clothes soaked in hot oil, not stuck skin.",
          sw: "Ondoka kwenye moto au maji ya moto. Vua nguo zenye mafuta ya moto, usivute ngozi iliyoshikamana.",
        },
      },
      {
        illustration: "cool-water",
        title: { en: "Cool with clean water", sw: "Poza kwa maji safi" },
        body: {
          en: "Run cool (not icy) water over the burn for 20 minutes. Never use oil, toothpaste or ash.",
          sw: "Mwagia maji ya baridi (si barafu) kwa dakika 20. Usitumie mafuta, dawa ya meno wala majivu.",
        },
      },
      {
        illustration: "cover-burn",
        title: { en: "Cover loosely", sw: "Funika kwa upole" },
        body: {
          en: "Cover with clean plastic wrap or a clean cloth. Do not burst blisters.",
          sw: "Funika kwa plastiki safi au kitambaa safi. Usipasue malengelenge.",
        },
      },
      {
        illustration: "hospital",
        title: { en: "Go to hospital", sw: "Nenda hospitali" },
        body: {
          en: "Go now for burns on face, hands, joints, genitals, or larger than the palm.",
          sw: "Nenda mara moja kama kuungua ni usoni, mikononi, viungoni, sehemu za siri au kubwa kuliko kiganja.",
        },
      },
    ],
  },
  {
    slug: "drowning",
    tone: "sos",
    title: { en: "Drowning Rescue", sw: "Kuokoa Aliyezama Majini" },
    subtitle: { en: "Lake, sea, river or bucket", sw: "Ziwa, bahari, mto au ndoo" },
    keywords: "drowning water maji kuzama swim bahari ziwa mto",
    steps: [
      {
        illustration: "reach-throw",
        title: { en: "Reach or throw, do not swim", sw: "Nyoosha au rusha, usiogelee" },
        body: {
          en: "Use a stick, rope or jerrycan. Entering the water risks two victims.",
          sw: "Tumia fimbo, kamba au dumu. Kuingia majini kunaweza kusababisha wahanga wawili.",
        },
      },
      {
        illustration: "check-breathing",
        title: { en: "Check breathing on land", sw: "Angalia pumzi ukiwa nchi kavu" },
        body: {
          en: "Lay them on their back. Tilt head, lift chin, look for chest movement for 10 seconds.",
          sw: "Mlaze chali. Inamisha kichwa, nyanyua kidevu, angalia kifua kwa sekunde 10.",
        },
      },
      {
        illustration: "rescue-breaths",
        title: { en: "5 rescue breaths first", sw: "Anza na pumzi 5 za uokoaji" },
        body: {
          en: "Drowning needs air first: give 5 breaths, then 30 compressions and 2 breaths.",
          sw: "Aliyezama anahitaji hewa kwanza: toa pumzi 5, kisha mibonyezo 30 na pumzi 2.",
        },
      },
      {
        illustration: "recovery-position",
        title: { en: "Recovery position", sw: "Mlaze ubavu" },
        body: {
          en: "Once breathing, roll onto the side to let water drain. Keep warm and go to hospital.",
          sw: "Akipumua, mgeuze ubavu ili maji yatoke. Mpe joto na nenda hospitali.",
        },
      },
    ],
  },
  {
    slug: "seizures-epilepsy",
    tone: "medical",
    title: { en: "Seizures & Epilepsy", sw: "Kifafa na Degedege" },
    subtitle: { en: "Shaking fits and convulsions", sw: "Kutetemeka na kupoteza fahamu" },
    keywords: "seizure epilepsy kifafa degedege fits convulsion",
    steps: [
      {
        illustration: "clear-space",
        title: { en: "Clear the space", sw: "Ondoa vitu hatari" },
        body: {
          en: "Move fire, water and sharp objects away. Put something soft under the head.",
          sw: "Ondoa moto, maji na vitu vyenye ncha kali. Weka kitu laini chini ya kichwa.",
        },
      },
      {
        illustration: "no-restrain",
        title: { en: "Do not hold them down", sw: "Usimzuie kwa nguvu" },
        body: {
          en: "Never put anything in the mouth. Let the fit finish. Time how long it lasts.",
          sw: "Usiweke kitu chochote mdomoni. Acha kifafa kiishe. Pima muda unaochukua.",
        },
      },
      {
        illustration: "recovery-position",
        title: { en: "Turn on the side after", sw: "Mgeuze ubavu baadaye" },
        body: {
          en: "When shaking stops, roll onto the side so saliva drains and breathing is clear.",
          sw: "Kutetemeka kukiisha, mgeuze ubavu ili mate yatoke na apumue vizuri.",
        },
      },
      {
        illustration: "call-115",
        title: { en: "Call 115 if over 5 minutes", sw: "Piga 115 ikizidi dakika 5" },
        body: {
          en: "Also call if fits repeat, the person is pregnant, injured, or does not wake up.",
          sw: "Piga pia kama kifafa kinarudia, ni mjamzito, ameumia au hapati fahamu.",
        },
      },
    ],
  },
  {
    slug: "child-fever-malaria",
    tone: "medical",
    title: { en: "Child Fever & Malaria", sw: "Homa ya Mtoto na Malaria" },
    subtitle: { en: "High temperature and danger signs", sw: "Joto kali na dalili za hatari" },
    keywords: "fever malaria homa mtoto child temperature degedege mbu",
    steps: [
      {
        illustration: "check-danger",
        title: { en: "Look for danger signs", sw: "Angalia dalili za hatari" },
        body: {
          en: "Fits, vomiting everything, very sleepy, fast breathing, or unable to drink = hospital now.",
          sw: "Degedege, kutapika kila kitu, usingizi mzito, kupumua haraka au kushindwa kunywa = hospitali sasa.",
        },
      },
      {
        illustration: "cool-child",
        title: { en: "Cool the child", sw: "Punguza joto" },
        body: {
          en: "Remove extra clothes and sponge with lukewarm water. Do not use cold water or alcohol.",
          sw: "Vua nguo za ziada na mpangusa kwa maji ya uvuguvugu. Usitumie maji baridi wala pombe.",
        },
      },
      {
        illustration: "give-fluids",
        title: { en: "Give fluids often", sw: "Mpe maji mara kwa mara" },
        body: {
          en: "Small sips of water, ORS or breastmilk every few minutes.",
          sw: "Mpe maji kidogo kidogo, ORS au maziwa ya mama kila baada ya dakika chache.",
        },
      },
      {
        illustration: "test-treat",
        title: { en: "Get a malaria test", sw: "Pima malaria" },
        body: {
          en: "Any fever in a malaria area needs an RDT test within 24 hours. Do not guess the medicine.",
          sw: "Homa yoyote eneo la malaria inahitaji kipimo ndani ya saa 24. Usibahatishe dawa.",
        },
      },
    ],
  },
  {
    slug: "diarrhoea-dehydration",
    tone: "medical",
    title: { en: "Diarrhoea & Dehydration", sw: "Kuharisha na Upungufu wa Maji" },
    subtitle: { en: "Make ORS at home the safe way", sw: "Tengeneza ORS nyumbani kwa usahihi" },
    keywords: "diarrhoea cholera kuharisha ors maji dehydration kipindupindu",
    steps: [
      {
        illustration: "spot-signs",
        title: { en: "Spot dehydration", sw: "Tambua upungufu wa maji" },
        body: {
          en: "Sunken eyes, no tears, dry mouth, little urine, skin slow to spring back.",
          sw: "Macho yaliyodidimia, hakuna machozi, mdomo mkavu, mkojo kidogo, ngozi inarudi polepole.",
        },
      },
      {
        illustration: "make-ors",
        title: { en: "Mix ORS correctly", sw: "Changanya ORS sawasawa" },
        body: {
          en: "One ORS sachet in 1 litre of clean water. At home: 6 level teaspoons sugar + half teaspoon salt.",
          sw: "Paketi moja ya ORS kwenye lita 1 ya maji safi. Nyumbani: vijiko 6 vya sukari + nusu kijiko cha chumvi.",
        },
      },
      {
        illustration: "give-fluids",
        title: { en: "Give after every stool", sw: "Mpe baada ya kila haja" },
        body: {
          en: "Child under 2: quarter to half a cup. Older: half to one cup. Keep feeding as normal.",
          sw: "Mtoto chini ya miaka 2: robo hadi nusu kikombe. Mkubwa: nusu hadi kikombe kimoja. Endelea kulisha.",
        },
      },
      {
        illustration: "hospital",
        title: { en: "Go to hospital if", sw: "Nenda hospitali kama" },
        body: {
          en: "Blood in stool, repeated vomiting, no urine for 6 hours, or the person is very weak.",
          sw: "Damu kwenye haja, kutapika mara kwa mara, hakuna mkojo saa 6, au amedhoofika sana.",
        },
      },
    ],
  },
  {
    slug: "fractures-splints",
    tone: "medical",
    title: { en: "Fractures & Splints", sw: "Mifupa Iliyovunjika na Ubao" },
    subtitle: { en: "Broken bones and bad sprains", sw: "Mifupa iliyovunjika na kuteguka" },
    keywords: "fracture bone mfupa kuvunjika splint sprain kuteguka boda",
    steps: [
      {
        illustration: "do-not-straighten",
        title: { en: "Do not straighten the limb", sw: "Usinyooshe kiungo" },
        body: {
          en: "Support it in the position found. Never let traditional bone setting delay hospital care.",
          sw: "Kishike kilivyo. Usikubali kupiga mifupa kienyeji kuchelewesha matibabu hospitali.",
        },
      },
      {
        illustration: "splint",
        title: { en: "Make a splint", sw: "Tengeneza ubao" },
        body: {
          en: "Use cardboard, wood or a rolled cloth on both sides. Tie above and below the break, not on it.",
          sw: "Tumia karatasi ngumu, ubao au kitambaa pande zote mbili. Funga juu na chini ya sehemu iliyovunjika.",
        },
      },
      {
        illustration: "check-fingers",
        title: { en: "Check fingers and toes", sw: "Angalia vidole" },
        body: {
          en: "If they turn cold, pale or numb, loosen the ties immediately.",
          sw: "Vikigeuka baridi, vyeupe au ganzi, legeza mafundo mara moja.",
        },
      },
      {
        illustration: "open-fracture",
        title: { en: "Bone through skin", sw: "Mfupa umetoka nje" },
        body: {
          en: "Cover with a clean cloth, control bleeding by pressing around, and go to hospital fast.",
          sw: "Funika kwa kitambaa safi, zuia damu kwa kubonyeza kandokando, nenda hospitali haraka.",
        },
      },
    ],
  },
  {
    slug: "poisoning",
    tone: "medical",
    title: { en: "Poisoning & Swallowed Chemicals", sw: "Sumu na Kemikali Zilizomezwa" },
    subtitle: { en: "Pesticides, paraffin, medicines", sw: "Viuatilifu, mafuta ya taa, dawa" },
    keywords: "poison sumu chemical kemikali paraffin pesticide dawa kumeza",
    steps: [
      {
        illustration: "no-vomit",
        title: { en: "Do not force vomiting", sw: "Usimlazimishe kutapika" },
        body: {
          en: "Never make them vomit paraffin, acid or bleach — it burns twice.",
          sw: "Usimfanye atapike mafuta ya taa, asidi au bleach — huunguza mara mbili.",
        },
      },
      {
        illustration: "rinse-mouth",
        title: { en: "Rinse the mouth", sw: "Suuza mdomo" },
        body: {
          en: "Wipe out the mouth and give small sips of water or milk if fully awake.",
          sw: "Futa mdomo na mpe maji au maziwa kidogo kama ana fahamu kamili.",
        },
      },
      {
        illustration: "keep-container",
        title: { en: "Carry the container", sw: "Chukua chombo" },
        body: {
          en: "Take the bottle, packet or plant to hospital so staff know the exact poison.",
          sw: "Peleka chupa, paketi au mmea hospitali ili wajue sumu hasa.",
        },
      },
      {
        illustration: "recovery-position",
        title: { en: "Watch breathing", sw: "Fuatilia pumzi" },
        body: {
          en: "If drowsy, lay on the side. If breathing stops, start CPR and call 115.",
          sw: "Akisinzia, mlaze ubavu. Pumzi zikisimama, anza CPR na piga 115.",
        },
      },
    ],
  },
  {
    slug: "heat-exhaustion",
    tone: "money",
    title: { en: "Heat Exhaustion & Sunstroke", sw: "Uchovu wa Joto na Jua Kali" },
    subtitle: { en: "Working or walking in strong sun", sw: "Kufanya kazi au kutembea juani" },
    keywords: "heat joto jua sunstroke dehydration shamba kazi",
    steps: [
      {
        illustration: "move-shade",
        title: { en: "Move to shade", sw: "Nenda kivulini" },
        body: {
          en: "Stop all work. Sit or lie down in shade with legs slightly raised.",
          sw: "Acha kazi zote. Kaa au lala kivulini na miguu ikiwa juu kidogo.",
        },
      },
      {
        illustration: "cool-body",
        title: { en: "Cool the body", sw: "Poza mwili" },
        body: {
          en: "Loosen clothes, fan the person, wet the skin with water, especially neck and armpits.",
          sw: "Legeza nguo, mpepee, lowanisha ngozi hasa shingoni na kwapani.",
        },
      },
      {
        illustration: "give-fluids",
        title: { en: "Drink slowly", sw: "Kunywa polepole" },
        body: {
          en: "Give water or ORS in small sips. No alcohol or very sugary drinks.",
          sw: "Mpe maji au ORS kidogo kidogo. Hakuna pombe wala vinywaji vya sukari nyingi.",
        },
      },
      {
        illustration: "call-115",
        title: { en: "Confusion means emergency", sw: "Kuchanganyikiwa ni dharura" },
        body: {
          en: "Hot dry skin, confusion or collapse is heatstroke — cool fast and call 115.",
          sw: "Ngozi kavu ya moto, kuchanganyikiwa au kuzimia ni hatari — poza haraka na piga 115.",
        },
      },
    ],
  },
  {
    slug: "anaphylaxis",
    tone: "sos",
    title: { en: "Severe Allergic Reaction", sw: "Mzio Mkali (Anaphylaxis)" },
    subtitle: { en: "Swelling, rash, trouble breathing", sw: "Kuvimba, vipele, kushindwa kupumua" },
    keywords: "allergy mzio anaphylaxis bee nyuki swelling rash pumzi",
    steps: [
      {
        illustration: "spot-signs",
        title: { en: "Recognise it fast", sw: "Itambue haraka" },
        body: {
          en: "Swollen lips or tongue, wheezing, widespread rash, or sudden collapse after food, drug or sting.",
          sw: "Midomo au ulimi kuvimba, kukoroma kifuani, vipele mwilini au kuzimia baada ya chakula, dawa au kuumwa.",
        },
      },
      {
        illustration: "adrenaline",
        title: { en: "Use adrenaline if available", sw: "Tumia adrenaline ikiwepo" },
        body: {
          en: "Inject an auto-injector into the outer thigh, through clothing if needed.",
          sw: "Choma sindano ya adrenaline kwenye paja la nje, hata juu ya nguo.",
        },
      },
      {
        illustration: "sit-upright",
        title: { en: "Sit them upright", sw: "Mketishe wima" },
        body: {
          en: "Sitting helps breathing. If faint, lay flat and raise the legs. Never let them stand and walk.",
          sw: "Kukaa husaidia kupumua. Akizimia, mlaze chali na nyanyua miguu. Asisimame wala kutembea.",
        },
      },
      {
        illustration: "call-115",
        title: { en: "Call 115 immediately", sw: "Piga 115 mara moja" },
        body: {
          en: "Always go to hospital even if symptoms improve — they can return within hours.",
          sw: "Nenda hospitali hata kama hali inaimarika — dalili zaweza kurudi ndani ya masaa.",
        },
      },
    ],
  },
  {
    slug: "unconscious-recovery",
    tone: "sos",
    title: { en: "Unconscious but Breathing", sw: "Amepoteza Fahamu Lakini Anapumua" },
    subtitle: { en: "Recovery position and monitoring", sw: "Kumlaza ubavu na kufuatilia" },
    keywords: "unconscious fahamu recovery position kuzimia faint",
    steps: [
      {
        illustration: "check-response",
        title: { en: "Shout and tap", sw: "Piga kelele na mgusa" },
        body: {
          en: "If there is no response but breathing is normal, do not start CPR.",
          sw: "Kama haitiki lakini anapumua vizuri, usianze CPR.",
        },
      },
      {
        illustration: "recovery-position",
        title: { en: "Roll onto the side", sw: "Mgeuze ubavu" },
        body: {
          en: "Bend the top knee, place the hand under the cheek, tilt the head back slightly.",
          sw: "Kunja goti la juu, weka mkono chini ya shavu, inamisha kichwa nyuma kidogo.",
        },
      },
      {
        illustration: "keep-warm",
        title: { en: "Keep warm and watch", sw: "Mpe joto na fuatilia" },
        body: {
          en: "Cover with a kanga or blanket. Check breathing every minute until help arrives.",
          sw: "Mfunike kwa kanga au blanketi. Angalia pumzi kila dakika hadi msaada ufike.",
        },
      },
      {
        illustration: "call-115",
        title: { en: "Call 115 and share details", sw: "Piga 115 na toa maelezo" },
        body: {
          en: "Say the location, how long they have been unconscious, and any medicines or injuries.",
          sw: "Sema mahali, muda amekaa bila fahamu, na dawa au majeraha yoyote.",
        },
      },
    ],
  },
];
