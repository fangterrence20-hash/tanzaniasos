export type FacilityKind = "hospital" | "police" | "pharmacy";

export type Facility = {
  id: string;
  name: string;
  kind: FacilityKind;
  region: string;
  phone: string;
  lat: number;
  lng: number;
};

/** Offline directory of Tanzanian emergency resources, bundled with the app. */
export const facilities: Facility[] = [
  // Dar es Salaam
  { id: "mnh", name: "Muhimbili National Hospital", kind: "hospital", region: "Dar es Salaam", phone: "+255222151367", lat: -6.8043, lng: 39.2712 },
  { id: "moi", name: "Muhimbili Orthopaedic Institute (MOI)", kind: "hospital", region: "Dar es Salaam", phone: "+255222151599", lat: -6.8036, lng: 39.2726 },
  { id: "akh-dar", name: "Aga Khan Hospital Dar es Salaam", kind: "hospital", region: "Dar es Salaam", phone: "+255222115151", lat: -6.7996, lng: 39.2872 },
  { id: "regency", name: "Regency Medical Centre", kind: "hospital", region: "Dar es Salaam", phone: "+255222150500", lat: -6.8117, lng: 39.2833 },
  { id: "amana", name: "Amana Regional Referral Hospital", kind: "hospital", region: "Dar es Salaam", phone: "+255222863425", lat: -6.8365, lng: 39.2519 },
  { id: "central-police-dar", name: "Central Police Station, Sokoine Dr", kind: "police", region: "Dar es Salaam", phone: "112", lat: -6.8185, lng: 39.2914 },
  { id: "oysterbay-police", name: "Oysterbay Police Station", kind: "police", region: "Dar es Salaam", phone: "112", lat: -6.7736, lng: 39.2807 },
  { id: "kinondoni-police", name: "Kinondoni Police Station", kind: "police", region: "Dar es Salaam", phone: "112", lat: -6.7857, lng: 39.2585 },
  { id: "shoppers-pharm", name: "Shoppers Pharmacy, Masaki", kind: "pharmacy", region: "Dar es Salaam", phone: "+255222600141", lat: -6.7452, lng: 39.2769 },
  { id: "mansoor-pharm", name: "Mansoor Daya Chemists", kind: "pharmacy", region: "Dar es Salaam", phone: "+255222110458", lat: -6.8162, lng: 39.2893 },

  // Arusha
  { id: "mount-meru", name: "Mount Meru Regional Hospital", kind: "hospital", region: "Arusha", phone: "+255272503451", lat: -3.3674, lng: 36.6889 },
  { id: "alma", name: "Arusha Lutheran Medical Centre", kind: "hospital", region: "Arusha", phone: "+255272548030", lat: -3.3762, lng: 36.6825 },
  { id: "arusha-central-police", name: "Arusha Central Police Station", kind: "police", region: "Arusha", phone: "112", lat: -3.3706, lng: 36.6828 },
  { id: "arusha-pharm", name: "Moona's Pharmacy, Arusha", kind: "pharmacy", region: "Arusha", phone: "+255272508081", lat: -3.3712, lng: 36.6871 },

  // Dodoma
  { id: "benjamin-mkapa", name: "Benjamin Mkapa Hospital", kind: "hospital", region: "Dodoma", phone: "+255262963111", lat: -6.2133, lng: 35.7681 },
  { id: "dodoma-rrh", name: "Dodoma Regional Referral Hospital", kind: "hospital", region: "Dodoma", phone: "+255262322014", lat: -6.1776, lng: 35.7419 },
  { id: "dodoma-police", name: "Dodoma Central Police Station", kind: "police", region: "Dodoma", phone: "112", lat: -6.1732, lng: 35.7469 },
  { id: "dodoma-pharm", name: "Kilimani Pharmacy, Dodoma", kind: "pharmacy", region: "Dodoma", phone: "+255262321100", lat: -6.1801, lng: 35.7452 },

  // Mwanza
  { id: "bugando", name: "Bugando Medical Centre", kind: "hospital", region: "Mwanza", phone: "+255282500513", lat: -2.5308, lng: 32.9036 },
  { id: "sekou-toure", name: "Sekou Toure Regional Hospital", kind: "hospital", region: "Mwanza", phone: "+255282500207", lat: -2.5183, lng: 32.9078 },
  { id: "mwanza-police", name: "Mwanza Central Police Station", kind: "police", region: "Mwanza", phone: "112", lat: -2.5164, lng: 32.9006 },

  // Zanzibar
  { id: "mnazi-mmoja", name: "Mnazi Mmoja Hospital", kind: "hospital", region: "Zanzibar", phone: "+255242231071", lat: -6.1667, lng: 39.1932 },
  { id: "zanzibar-police", name: "Zanzibar Central Police, Malindi", kind: "police", region: "Zanzibar", phone: "112", lat: -6.1587, lng: 39.1912 },

  // Mbeya / Kilimanjaro / Tanga
  { id: "mzrh", name: "Mbeya Zonal Referral Hospital", kind: "hospital", region: "Mbeya", phone: "+255252502043", lat: -8.9098, lng: 33.4503 },
  { id: "kcmc", name: "Kilimanjaro Christian Medical Centre", kind: "hospital", region: "Kilimanjaro", phone: "+255272754377", lat: -3.3585, lng: 37.3336 },
  { id: "bombo", name: "Bombo Regional Referral Hospital", kind: "hospital", region: "Tanga", phone: "+255272643271", lat: -5.0717, lng: 39.1005 },
];

export const regions = Array.from(new Set(facilities.map((f) => f.region))).sort();

/** Great-circle distance in kilometres. */
export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const r = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(s));
}
