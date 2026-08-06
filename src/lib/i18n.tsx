import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "sw";

type Dict = Record<string, { en: string; sw: string }>;

export const dict = {
  appName: { en: "Tanzania SOS", sw: "Tanzania SOS" },
  online: { en: "Online", sw: "Mtandaoni" },
  offline: { en: "Offline mode", sw: "Hali ya nje ya mtandao" },
  holdSos: { en: "HOLD 3 SECONDS FOR SOS", sw: "SHIKILIA SEKUNDE 3 KWA SOS" },
  releaseToCancel: { en: "Release to cancel", sw: "Achia kughairi" },
  sending: { en: "Sending alert…", sw: "Inatuma taarifa…" },
  quickCall: { en: "Quick emergency lines", sw: "Namba za dharura" },
  medical: { en: "Medical / Ambulance", sw: "Matibabu / Ambulensi" },
  police: { en: "Police", sw: "Polisi" },
  fire: { en: "Fire", sw: "Zimamoto" },
  accident: { en: "Road Accident / Towing", sw: "Ajali ya Barabarani / Kuvuta" },
  liveLocation: { en: "Live location", sw: "Mahali ulipo sasa" },
  silentPanic: { en: "Silent Panic", sw: "Tahadhari ya Kimya" },
  silentPanicDesc: {
    en: "Discreet alert to your ICE contacts",
    sw: "Taarifa ya siri kwa watu wako wa dharura",
  },
  home: { en: "Home", sw: "Nyumbani" },
  dispatch: { en: "Dispatch", sw: "Msaada" },
  guides: { en: "First Aid", sw: "Huduma ya Kwanza" },
  profile: { en: "Profile", sw: "Wasifu" },
  searchingProvider: { en: "Searching for nearest provider…", sw: "Tunatafuta msaidizi wa karibu…" },
  dispatched: { en: "Dispatched", sw: "Ametumwa" },
  minsAway: { en: "mins away", sw: "dakika mbali" },
  connectingOperator: { en: "Connecting to Police Operator", sw: "Tunaunganisha na Opereta wa Polisi" },
  yourLocation: { en: "Your location", sw: "Mahali ulipo" },
  respondingUnit: { en: "Responding unit", sw: "Kikosi kinachokuja" },
  emergencyContacts: { en: "Emergency contacts", sw: "Watu wa dharura" },
  call: { en: "Call", sw: "Piga" },
  chat: { en: "Chat", sw: "Ujumbe" },
  authorizePayment: { en: "Authorize dispatch payment", sw: "Idhinisha malipo ya msaada" },
  stkNote: {
    en: "An STK push will be sent to your phone. Approve with your PIN.",
    sw: "Ujumbe wa STK utatumwa kwa simu yako. Thibitisha kwa PIN yako.",
  },
  amount: { en: "Amount", sw: "Kiasi" },
  phoneNumber: { en: "Phone number", sw: "Namba ya simu" },
  payNow: { en: "Send STK Push", sw: "Tuma STK Push" },
  guidesTitle: { en: "Offline First Aid Guides", sw: "Miongozo ya Huduma ya Kwanza" },
  guidesSub: {
    en: "Works without internet. Follow the steps in order.",
    sw: "Inafanya kazi bila intaneti. Fuata hatua kwa mpangilio.",
  },
  search: { en: "Search guides…", sw: "Tafuta miongozo…" },
  playAudio: { en: "Play Swahili Audio Guide", sw: "Sikiliza Mwongozo wa Sauti" },
  step: { en: "Step", sw: "Hatua" },
  back: { en: "Back", sw: "Rudi" },
  profileTitle: { en: "Medical Profile", sw: "Wasifu wa Kiafya" },
  profileSub: {
    en: "Responders see this instantly during an emergency.",
    sw: "Wasaidizi wataona haya mara moja wakati wa dharura.",
  },
  fullName: { en: "Full name", sw: "Jina kamili" },
  bloodType: { en: "Blood type", sw: "Aina ya damu" },
  allergies: { en: "Allergies", sw: "Mzio (Allergies)" },
  conditions: { en: "Chronic conditions", sw: "Magonjwa sugu" },
  iceContacts: { en: "ICE contacts", sw: "Watu wa kupigiwa dharura" },
  addContact: { en: "Add contact", sw: "Ongeza mtu" },
  smsFallback: { en: "Auto-send SMS fallback when offline", sw: "Tuma SMS kiotomatiki bila intaneti" },
  smsFallbackDesc: {
    en: "If there is no data connection, your alert and location are sent by SMS.",
    sw: "Bila intaneti, taarifa na mahali ulipo hutumwa kwa SMS.",
  },
  save: { en: "Save profile", sw: "Hifadhi wasifu" },
  saved: { en: "Profile saved", sw: "Wasifu umehifadhiwa" },
  noResults: { en: "No guides found", sw: "Hakuna mwongozo uliopatikana" },
  cancelEmergency: { en: "Cancel emergency", sw: "Ghairi dharura" },
  callNow: { en: "Call now", sw: "Piga sasa" },
} satisfies Dict;

export type TKey = keyof typeof dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("tz-sos-lang");
    if (stored === "sw" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("tz-sos-lang", l);
  }, []);

  const t = useCallback((k: TKey) => dict[k][lang], [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
