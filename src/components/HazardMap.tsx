import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useRef } from "react";

import type { HazardCategory, HazardReport } from "@/lib/hazards";

type Props = {
  hazards: HazardReport[];
  userLocation?: { lat: number; lng: number } | undefined;
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string | undefined;
  mapLabel: string;
  userLocationLabel: string;
};

const iconByCategory: Record<HazardCategory, L.DivIcon> = {
  accident: L.divIcon({
    className: "hazard-marker-shell",
    html: '<span class="hazard-marker hazard-marker--accident" aria-hidden="true">!</span>',
    iconSize: [34, 42],
    iconAnchor: [17, 42],
  }),
  flood: L.divIcon({
    className: "hazard-marker-shell",
    html: '<span class="hazard-marker hazard-marker--flood" aria-hidden="true">≈</span>',
    iconSize: [34, 42],
    iconAnchor: [17, 42],
  }),
  security: L.divIcon({
    className: "hazard-marker-shell",
    html: '<span class="hazard-marker hazard-marker--security" aria-hidden="true">!</span>',
    iconSize: [34, 42],
    iconAnchor: [17, 42],
  }),
};

const userIcon = L.divIcon({
  className: "hazard-marker-shell",
  html: '<span class="hazard-user-marker" aria-hidden="true"></span>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function HazardMap({ hazards, userLocation, selectedId, onSelect, className, mapLabel, userLocationLabel }: Props) {
  const element = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const markersRef = useRef(new Map<string, L.Marker>());
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (!element.current || mapRef.current) return;
    const initialCenter: L.LatLngExpression = userLocation
      ? [userLocation.lat, userLocation.lng]
      : [-6.806, 39.258];
    const map = L.map(element.current, {
      center: initialCenter,
      zoom: 13,
      zoomControl: false,
      attributionControl: true,
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap &copy; CARTO",
    }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    window.setTimeout(() => map.invalidateSize(), 120);
    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    markersRef.current.clear();
    hazards.forEach((hazard) => {
      const marker = L.marker([hazard.lat, hazard.lng], {
        icon: iconByCategory[hazard.category],
        title: hazard.landmark,
        keyboard: true,
        zIndexOffset: hazard.id === selectedId ? 500 : 0,
      })
        .addTo(layer)
        .bindTooltip(hazard.landmark, { direction: "top", offset: [0, -36] })
        .on("click", () => onSelectRef.current(hazard.id));
      markersRef.current.set(hazard.id, marker);
    });
    if (hazards.length > 0 && !userLocation) {
      map.fitBounds(L.latLngBounds(hazards.map((hazard) => [hazard.lat, hazard.lng])), {
        padding: [34, 34],
        maxZoom: 14,
      });
    }
  }, [hazards, selectedId, userLocation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userLocation) return;
    if (!userMarkerRef.current) {
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        title: userLocationLabel,
        zIndexOffset: 1000,
      }).addTo(map);
    } else {
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation, userLocationLabel]);

  useEffect(() => {
    const marker = selectedId ? markersRef.current.get(selectedId) : undefined;
    const map = mapRef.current;
    if (!marker || !map) return;
    map.panTo(marker.getLatLng(), { animate: true });
    marker.openTooltip();
  }, [selectedId]);

  return <div ref={element} className={className} aria-label={mapLabel} />;
}