import { createFileRoute } from "@tanstack/react-router";
import { Building2, MapPin, Navigation, Phone, Pill, Shield } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { distanceKm, facilities, type FacilityKind } from "@/lib/facilities";
import { useLang } from "@/lib/i18n";
import { useLiveLocation } from "@/lib/use-live-location";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/directory")({
  head: () => ({
    meta: [
      { title: "Nearby Hospitals, Police & Pharmacies — Tanzania SOS" },
      {
        name: "description",
        content:
          "Offline directory of Tanzanian hospitals, police posts and pharmacies across Dar es Salaam, Arusha, Dodoma, Mwanza and more, sorted by distance.",
      },
      { property: "og:title", content: "Nearby Hospitals, Police & Pharmacies — Tanzania SOS" },
      {
        property: "og:description",
        content: "Find the closest hospital, police post or pharmacy — works without internet.",
      },
    ],
  }),
  component: DirectoryScreen,
});

const kindIcon = { hospital: Building2, police: Shield, pharmacy: Pill } as const;
const kindTone = {
  hospital: "bg-medical/15 text-medical border-medical/30",
  police: "bg-sos/15 text-sos border-sos/30",
  pharmacy: "bg-money/15 text-money border-money/30",
} as const;

function DirectoryScreen() {
  const { t } = useLang();
  const { location } = useLiveLocation();
  const [filter, setFilter] = useState<FacilityKind | "all">("all");

  const items = useMemo(() => {
    const list = facilities
      .filter((f) => filter === "all" || f.kind === filter)
      .map((f) => ({
        ...f,
        km: location ? distanceKm(location.lat, location.lng, f.lat, f.lng) : null,
      }));
    list.sort((a, b) =>
      a.km !== null && b.km !== null ? a.km - b.km : a.region.localeCompare(b.region),
    );
    return list;
  }, [filter, location]);

  const filters = [
    { key: "all" as const, label: t("allTypes") },
    { key: "hospital" as const, label: t("hospitals") },
    { key: "police" as const, label: t("policePosts") },
    { key: "pharmacy" as const, label: t("pharmacies") },
  ];

  return (
    <AppShell>
      <div className="space-y-4 px-4 py-5">
        <header>
          <h1 className="text-xl font-extrabold tracking-tight">{t("directoryTitle")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("directorySub")}</p>
          {!location && (
            <p className="mt-2 text-xs font-semibold text-warning">{t("sortedByRegion")}</p>
          )}
        </header>

        <div role="group" aria-label={t("directoryTitle")} className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={cn(
                "min-h-9 rounded-full border border-border px-3 text-sm font-bold transition-colors",
                filter === f.key
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          {items.map((f) => {
            const Icon = kindIcon[f.kind];
            return (
              <li key={f.id} className="surface-card p-4">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-full border",
                      kindTone[f.kind],
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold leading-tight">{f.name}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" aria-hidden />
                      <span className="truncate">{f.region}</span>
                      {f.km !== null && (
                        <span className="shrink-0 font-semibold text-foreground">
                          · {f.km < 10 ? f.km.toFixed(1) : Math.round(f.km)} {t("awayKm")}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${f.phone}`}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-sos text-sm font-bold text-sos-foreground"
                  >
                    <Phone className="size-4" aria-hidden />
                    {t("call")}
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${f.lat},${f.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-secondary text-sm font-bold text-foreground"
                  >
                    <Navigation className="size-4" aria-hidden />
                    {t("directions")}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </AppShell>
  );
}
