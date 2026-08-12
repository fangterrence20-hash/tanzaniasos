export type Contact = { id: number; name: string; phone: string };

export type MedicalProfile = {
  name: string;
  blood: string;
  allergies: string;
  conditions: string;
  sms: boolean;
  contacts: Contact[];
};

const KEY = "tz-sos-profile";

export const defaultProfile: MedicalProfile = {
  name: "Asha Mwinyi",
  blood: "O+",
  allergies: "Penicillin",
  conditions: "Asthma",
  sms: true,
  contacts: [
    { id: 1, name: "Juma Mwinyi", phone: "+255 754 000 111" },
    { id: 2, name: "Dr. Neema", phone: "+255 713 222 333" },
  ],
};

export function loadProfile(): MedicalProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<MedicalProfile>;
    return {
      ...defaultProfile,
      ...parsed,
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : defaultProfile.contacts,
    };
  } catch {
    return null;
  }
}

export function saveProfile(profile: MedicalProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(profile));
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "TZ";
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}
