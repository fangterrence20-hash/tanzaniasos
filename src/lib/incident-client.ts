import { reportIncident, type IncidentInput } from "@/lib/incidents.functions";
import { defaultProfile, loadProfile } from "@/lib/profile-storage";

const QUEUE_KEY = "tz-sos-incident-queue";

type Coords = { lat: number; lng: number; accuracy?: number } | null | undefined;

/** Builds the payload sent to responder networks from the stored medical profile. */
export function buildIncident(
  kind: IncidentInput["kind"],
  location: Coords,
  words?: string,
  place?: string | null,
  language: "en" | "sw" = "sw",
): IncidentInput {
  const p = loadProfile() ?? defaultProfile;
  return {
    kind,
    lat: location?.lat ?? null,
    lng: location?.lng ?? null,
    accuracy: location?.accuracy ?? null,
    what3words: words ?? null,
    place: place ?? null,
    patientName: p.name,
    bloodType: p.blood,
    allergies: p.allergies,
    conditions: p.conditions,
    iceContact: p.contacts[0]?.phone ?? null,
    language,
  };
}

function readQueue(): IncidentInput[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as IncidentInput[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(items: IncidentInput[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(QUEUE_KEY, JSON.stringify(items.slice(-20)));
}

/** Sends an incident now, or stores it locally until the phone is back online. */
export async function sendIncident(incident: IncidentInput): Promise<"sent" | "queued"> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    writeQueue([...readQueue(), incident]);
    return "queued";
  }
  try {
    await reportIncident({ data: incident });
    return "sent";
  } catch {
    writeQueue([...readQueue(), incident]);
    return "queued";
  }
}

/** Retries any incidents stored while offline. */
export async function flushIncidentQueue(): Promise<number> {
  const queue = readQueue();
  if (queue.length === 0) return 0;
  const remaining: IncidentInput[] = [];
  let sent = 0;
  for (const incident of queue) {
    try {
      await reportIncident({ data: incident });
      sent += 1;
    } catch {
      remaining.push(incident);
    }
  }
  writeQueue(remaining);
  return sent;
}
