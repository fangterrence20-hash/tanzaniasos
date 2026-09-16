export type HazardCategory = "accident" | "flood" | "security";

export type HazardReport = {
  id: string;
  category: HazardCategory;
  landmark: string;
  detail: string | { en: string; sw: string };
  lat: number;
  lng: number;
  reportedAt: number;
  confirmations: number;
  imageUrl?: string;
};

const now = Date.now();

export const initialHazards: HazardReport[] = [
  {
    id: "morogoro-crash",
    category: "accident",
    landmark: "Makutano ya Morogoro Rd na Mandela Rd",
    detail: { sw: "Magari mawili yamegongana; njia ya kushoto imefungwa.", en: "Two vehicles have collided; the left lane is closed." },
    lat: -6.8032,
    lng: 39.2194,
    reportedAt: now - 10 * 60_000,
    confirmations: 24,
  },
  {
    id: "jangwani-flood",
    category: "flood",
    landmark: "Daraja la Jangwani",
    detail: { sw: "Maji yamepanda barabarani. Epuka njia ya chini.", en: "Water has risen over the road. Avoid the underpass." },
    lat: -6.8131,
    lng: 39.2637,
    reportedAt: now - 18 * 60_000,
    confirmations: 17,
  },
  {
    id: "kariakoo-security",
    category: "security",
    landmark: "Soko la Kariakoo, Mtaa wa Msimbazi",
    detail: { sw: "Msongamano na tukio la kiusalama limeripotiwa karibu na soko.", en: "Crowding and a security incident have been reported near the market." },
    lat: -6.823,
    lng: 39.271,
    reportedAt: now - 31 * 60_000,
    confirmations: 9,
  },
  {
    id: "selander-crash",
    category: "accident",
    landmark: "Daraja la Selander",
    detail: { sw: "Pikipiki imeanguka; waokoaji wako njiani.", en: "A motorcycle has crashed; responders are on their way." },
    lat: -6.7917,
    lng: 39.2835,
    reportedAt: now - 46 * 60_000,
    confirmations: 12,
  },
];

export const categoryCopy = {
  accident: { sw: "Ajali", en: "Accident" },
  flood: { sw: "Mafuriko", en: "Flooding" },
  security: { sw: "Usalama", en: "Security" },
} satisfies Record<HazardCategory, { sw: string; en: string }>;

export function relativeTime(timestamp: number, lang: "en" | "sw", currentTime = Date.now()) {
  const minutes = Math.max(1, Math.round((currentTime - timestamp) / 60_000));
  if (minutes < 60) return lang === "sw" ? `dakika ${minutes} zilizopita` : `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  return lang === "sw" ? `saa ${hours} zilizopita` : `${hours} hr ago`;
}

export function hazardShareMessage(report: HazardReport, lang: "en" | "sw") {
  const category = categoryCopy[report.category];
  const detail = typeof report.detail === "string" ? report.detail : report.detail[lang];
  if (lang === "sw") return [
    `TAHADHARI YA HATARI — ${category.sw}`,
    `Karibu na: ${report.landmark}`,
    detail,
    `Imethibitishwa: ${report.confirmations}`,
    `Ramani: https://maps.google.com/?q=${report.lat.toFixed(6)},${report.lng.toFixed(6)}`,
    "Tanzania SOS — tafadhali tumia njia mbadala ikiwa ni salama.",
  ].join("\n");
  return [
    `HAZARD ALERT — ${category.en}`,
    `Near: ${report.landmark}`,
    detail,
    `Confirmed: ${report.confirmations}`,
    `Map: https://maps.google.com/?q=${report.lat.toFixed(6)},${report.lng.toFixed(6)}`,
    "Tanzania SOS — please use an alternative route if safe.",
  ].join("\n");
}