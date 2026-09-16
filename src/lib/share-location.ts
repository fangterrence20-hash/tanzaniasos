import { defaultProfile, loadProfile } from "@/lib/profile-storage";

export function mapsLink(lat: number, lng: number) {
  return `https://maps.google.com/?q=${lat.toFixed(6)},${lng.toFixed(6)}`;
}

/** Builds the emergency message shared over WhatsApp or SMS. */
export function emergencyMessage(lat: number, lng: number, words: string | undefined, lang: "en" | "sw") {
  const p = loadProfile() ?? defaultProfile;
  const lines = lang === "sw" ? [
    "DHARURA - Tanzania SOS",
    `${p.name}${p.blood ? ` (${p.blood})` : ""}`,
    p.allergies ? `Mzio: ${p.allergies}` : null,
    p.conditions ? `Magonjwa: ${p.conditions}` : null,
    `Mahali: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    words ? `what3words: ${words}` : null,
    mapsLink(lat, lng),
  ] : [
    "EMERGENCY - Tanzania SOS",
    `${p.name}${p.blood ? ` (${p.blood})` : ""}`,
    p.allergies ? `Allergies: ${p.allergies}` : null,
    p.conditions ? `Conditions: ${p.conditions}` : null,
    `Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    words ? `what3words: ${words}` : null,
    mapsLink(lat, lng),
  ];
  return lines.filter(Boolean).join("\n");
}

export function shareViaWhatsApp(message: string) {
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}

export function shareViaSms(message: string, to?: string) {
  const number = to ? to.replace(/\s+/g, "") : "";
  window.location.href = `sms:${number}?&body=${encodeURIComponent(message)}`;
}

/** First ICE contact number, used for the offline SMS fallback. */
export function primaryIceNumber() {
  const p = loadProfile() ?? defaultProfile;
  return p.contacts[0]?.phone;
}
