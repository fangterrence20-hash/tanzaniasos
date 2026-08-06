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
];
