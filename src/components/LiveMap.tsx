import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useRef } from "react";

type Props = {
  lat: number;
  lng: number;
  accuracy?: number;
  /** Optional second marker (responding unit). */
  unit?: { lat: number; lng: number } | null;
  className?: string;
  zoom?: number;
};

const userIcon = L.divIcon({
  className: "",
  html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#1976D2;box-shadow:0 0 0 6px rgba(25,118,210,.28),0 0 0 1px rgba(255,255,255,.7)"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const unitIcon = L.divIcon({
  className: "",
  html: `<span style="display:grid;place-items:center;width:30px;height:30px;border-radius:9999px;background:#E53935;color:#fff;font-size:15px;box-shadow:0 2px 8px rgba(0,0,0,.5)">🚑</span>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export default function LiveMap({ lat, lng, accuracy, unit, className, zoom = 16 }: Props) {
  const el = useRef<HTMLDivElement | null>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);
  const circle = useRef<L.Circle | null>(null);
  const unitMarker = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, {
      center: [lat, lng],
      zoom,
      zoomControl: false,
      attributionControl: true,
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap &copy; CARTO",
    }).addTo(m);
    L.control.zoom({ position: "bottomright" }).addTo(m);
    marker.current = L.marker([lat, lng], { icon: userIcon }).addTo(m);
    circle.current = L.circle([lat, lng], {
      radius: accuracy ?? 0,
      color: "#1976D2",
      weight: 1,
      fillOpacity: 0.08,
    }).addTo(m);
    map.current = m;
    setTimeout(() => m.invalidateSize(), 150);
    return () => {
      m.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const m = map.current;
    if (!m) return;
    marker.current?.setLatLng([lat, lng]);
    circle.current?.setLatLng([lat, lng]);
    if (accuracy != null) circle.current?.setRadius(accuracy);
    m.panTo([lat, lng], { animate: true });
  }, [lat, lng, accuracy]);

  useEffect(() => {
    const m = map.current;
    if (!m) return;
    if (!unit) {
      unitMarker.current?.remove();
      unitMarker.current = null;
      return;
    }
    if (!unitMarker.current) {
      unitMarker.current = L.marker([unit.lat, unit.lng], { icon: unitIcon }).addTo(m);
    } else {
      unitMarker.current.setLatLng([unit.lat, unit.lng]);
    }
  }, [unit]);

  return <div ref={el} className={className} style={{ background: "#1a1a1a" }} />;
}
