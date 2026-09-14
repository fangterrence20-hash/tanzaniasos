export type HazardCategory = "accident" | "flood" | "security";

export type HazardReport = {
  id: string;
  category: HazardCategory;
  landmark: string;
  detail: string;
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
    detail: "Magari mawili yamegongana; njia ya kushoto imefungwa.",
    lat: -6.8032,
    lng: 39.2194,
    reportedAt: now - 10 * 60_000,
    confirmations: 24,
  },
  {
    id: "jangwani-flood",
    category: "flood",
    landmark: "Daraja la Jangwani",
    detail: "Maji yamepanda barabarani. Epuka njia ya chini.",
    lat: -6.8131,
    lng: 39.2637,
    reportedAt: now - 18 * 60_000,
    confirmations: 17,
  },
  {
    id: "kariakoo-security",
    category: "security",
    landmark: "Soko la Kariakoo, Mtaa wa Msimbazi",
    detail: "Msongamano na tukio la kiusalama limeripotiwa karibu na soko.",
    lat: -6.823,
    lng: 39.271,
    reportedAt: now - 31 * 60_000,
    confirmations: 9,
  },
  {
    id: "selander-crash",
    category: "accident",
    landmark: "Daraja la Selander",
    detail: "Pikipiki imeanguka; waokoaji wako njiani.",
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

export function relativeTimeSw(timestamp: number, currentTime = Date.now()) {
  const minutes = Math.max(1, Math.round((currentTime - timestamp) / 60_000));
  if (minutes < 60) return `dakika ${minutes} zilizopita`;
  const hours = Math.round(minutes / 60);
  return `saa ${hours} zilizopita`;
}

export function hazardShareMessage(report: HazardReport) {
  const category = categoryCopy[report.category];
  return [
    `TAHADHARI / HAZARD ALERT — ${category.sw} / ${category.en}`,
    `Karibu na / Near: ${report.landmark}`,
    report.detail,
    `Imethibitishwa / Confirmed: ${report.confirmations}`,
    `Ramani / Map: https://maps.google.com/?q=${report.lat.toFixed(6)},${report.lng.toFixed(6)}`,
    "Tanzania SOS — tafadhali tumia njia mbadala ikiwa ni salama.",
  ].join("\n");
}