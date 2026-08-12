import { useCallback, useEffect, useRef, useState } from "react";

export type LiveLocation = {
  lat: number;
  lng: number;
  accuracy: number;
  heading: number | null;
  speed: number | null;
  timestamp: number;
};

export type LocationStatus = "idle" | "locating" | "active" | "denied" | "error" | "unsupported";

const WORDS = [
  "filled",
  "count",
  "soap",
  "mango",
  "river",
  "coral",
  "lantern",
  "zebra",
  "cedar",
  "harbor",
  "ember",
  "cotton",
  "pepper",
  "orbit",
  "market",
  "palm",
];

/** Deterministic 3-word identifier derived from coordinates (what3words-style placeholder). */
export function threeWords(lat: number, lng: number) {
  const seed = Math.abs(Math.round(lat * 1e5) * 31 + Math.round(lng * 1e5) * 17);
  const a = WORDS[seed % WORDS.length];
  const b = WORDS[Math.floor(seed / 7) % WORDS.length];
  const c = WORDS[Math.floor(seed / 53) % WORDS.length];
  return `///${a}.${b}.${c}`;
}

export function useLiveLocation() {
  const [location, setLocation] = useState<LiveLocation | null>(null);
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [place, setPlace] = useState<string | null>(null);
  const watchId = useRef<number | null>(null);
  const lastGeocode = useRef(0);

  const start = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    if (watchId.current !== null) return;
    setStatus("locating");
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        setStatus("active");
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          heading: pos.coords.heading,
          speed: pos.coords.speed,
          timestamp: pos.timestamp,
        });
      },
      (err) => {
        setStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 },
    );
  }, []);

  useEffect(() => {
    start();
    return () => {
      if (watchId.current !== null && typeof navigator !== "undefined") {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
  }, [start]);

  // Reverse geocode (throttled, best-effort — silently ignored offline).
  useEffect(() => {
    if (!location) return;
    const now = Date.now();
    if (now - lastGeocode.current < 30000) return;
    lastGeocode.current = now;
    const ctrl = new AbortController();
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=14&lat=${location.lat}&lon=${location.lng}`,
      { signal: ctrl.signal, headers: { Accept: "application/json" } },
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const a = data?.address;
        if (!a) return;
        const city = a.city ?? a.town ?? a.village ?? a.county ?? a.state;
        const local = a.suburb ?? a.neighbourhood ?? a.road;
        setPlace([local, city].filter(Boolean).join(", ") || data.display_name || null);
      })
      .catch(() => undefined);
    return () => ctrl.abort();
  }, [location]);

  return { location, status, place, retry: start };
}
