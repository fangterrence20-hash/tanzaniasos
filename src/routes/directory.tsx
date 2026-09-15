import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Camera,
  Check,
  Clock3,
  Droplets,
  LocateFixed,
  MapPin,
  Plus,
  Share2,
  ShieldAlert,
} from "lucide-react";
import { lazy, Suspense, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { distanceKm } from "@/lib/facilities";
import {
  categoryCopy,
  hazardShareMessage,
  initialHazards,
  relativeTimeSw,
  type HazardCategory,
  type HazardReport,
} from "@/lib/hazards";
import { useLiveLocation } from "@/lib/use-live-location";
import { cn } from "@/lib/utils";

const HazardMap = lazy(() => import("@/components/HazardMap"));

export const Route = createFileRoute("/directory")({
  head: () => ({
    meta: [
      { title: "Karibu: Ripoti za Hatari — Tanzania SOS" },
      {
        name: "description",
        content:
          "Tazama ajali, mafuriko na tahadhari za usalama zilizo karibu nawe kwenye ramani ya Tanzania SOS.",
      },
      { property: "og:title", content: "Karibu: Ripoti za Hatari — Tanzania SOS" },
      {
        property: "og:description",
        content: "Nearby community hazard reports, mapped and verified in real time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HazardDirectory,
});

const iconByCategory = {
  accident: AlertTriangle,
  flood: Droplets,
  security: ShieldAlert,
} as const;

const toneByCategory = {
  accident: "border-sos/30 bg-sos/15 text-sos",
  flood: "border-medical/30 bg-medical/15 text-medical",
  security: "border-warning/30 bg-warning/15 text-warning",
} as const;

const filters: Array<{ key: HazardCategory | "all"; sw: string; en: string }> = [
  { key: "all", sw: "Zote", en: "All" },
  { key: "accident", sw: "Ajali", en: "Accidents" },
  { key: "flood", sw: "Mafuriko", en: "Flooding" },
  { key: "security", sw: "Usalama", en: "Security" },
];

function MapLoading() {
  return (
    <div className="grid h-[19rem] place-items-center bg-secondary text-center">
      <div>
        <LocateFixed className="mx-auto size-6 animate-pulse text-money" aria-hidden />
        <p className="mt-2 text-sm font-bold">Inapakia ramani</p>
        <p className="text-xs text-muted-foreground">Loading map</p>
      </div>
    </div>
  );
}

function HazardDirectory() {
  const { location, status } = useLiveLocation();
  const [reports, setReports] = useState(initialHazards);
  const [filter, setFilter] = useState<HazardCategory | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(initialHazards[0]?.id ?? null);
  const [verified, setVerified] = useState<Set<string>>(() => new Set());
  const [reportOpen, setReportOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<HazardCategory>("accident");
  const [landmark, setLandmark] = useState("");
  const [detail, setDetail] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const visibleReports = useMemo(() => {
    return reports
      .filter((report) => filter === "all" || report.category === filter)
      .map((report) => ({
        ...report,
        distance: location
          ? distanceKm(location.lat, location.lng, report.lat, report.lng)
          : null,
      }))
      .sort((a, b) => {
        if (a.distance !== null && b.distance !== null) return a.distance - b.distance;
        return b.reportedAt - a.reportedAt;
      });
  }, [filter, location, reports]);

  const verify = (id: string) => {
    if (verified.has(id)) return;
    setVerified((current) => new Set(current).add(id));
    setReports((current) =>
      current.map((report) =>
        report.id === id ? { ...report, confirmations: report.confirmations + 1 } : report,
      ),
    );
    toast.success("Asante — umethibitisha kuwa hatari bado ipo.");
  };

  const share = (report: HazardReport) => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(hazardShareMessage(report))}`,
      "_blank",
      "noopener",
    );
  };

  const submitReport = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!landmark.trim() || !detail.trim()) return;
    const fallback = initialHazards[0];
    const lat = location?.lat ?? fallback?.lat ?? -6.806;
    const lng = location?.lng ?? fallback?.lng ?? 39.258;
    const report: HazardReport = {
      id: `local-${Date.now()}`,
      category: newCategory,
      landmark: landmark.trim(),
      detail: detail.trim(),
      lat,
      lng,
      reportedAt: Date.now(),
      confirmations: 1,
      ...(imageUrl ? { imageUrl } : {}),
    };
    setReports((current) => [report, ...current]);
    setSelectedId(report.id);
    setFilter("all");
    setReportOpen(false);
    setLandmark("");
    setDetail("");
    setImageUrl(undefined);
    toast.success("Ripoti imeongezwa kwenye ramani.");
  };

  return (
    <AppShell>
      <div className="pb-6">
        <header className="px-4 pb-4 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-money">Karibu</p>
              <h1 className="mt-1 text-2xl font-extrabold leading-tight">
                Ripoti za Hatari Karibu
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">Nearby hazard reports</p>
            </div>
            <div className="shrink-0 text-right">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-money/30 bg-money/10 px-2.5 py-1.5 text-xs font-bold text-money">
                <span className="size-2 rounded-full bg-money" aria-hidden />
                {visibleReports.length} hai
              </span>
              <p className="mt-1 text-[10px] text-muted-foreground">active</p>
            </div>
          </div>
        </header>

        <section aria-label="Ramani ya hatari" className="relative border-y border-border">
          <ClientOnly fallback={<MapLoading />}>
            <Suspense fallback={<MapLoading />}>
              <HazardMap
                hazards={visibleReports}
                userLocation={location ? { lat: location.lat, lng: location.lng } : undefined}
                selectedId={selectedId}
                onSelect={setSelectedId}
                className="h-[19rem] w-full"
              />
            </Suspense>
          </ClientOnly>
          <div className="pointer-events-none absolute left-3 top-3 z-[500] flex flex-col gap-1.5 rounded-md border border-border bg-background/90 p-2 shadow-card backdrop-blur">
            {filters.slice(1).map((item) => (
              <span key={item.key} className="flex items-center gap-2 text-[10px] font-bold">
                <span
                  className={cn(
                    "size-2.5 rounded-full",
                    item.key === "accident" && "bg-sos",
                    item.key === "flood" && "bg-medical",
                    item.key === "security" && "bg-warning",
                  )}
                />
                {item.sw}
              </span>
            ))}
          </div>
          {status !== "active" && (
            <p className="absolute bottom-3 left-3 z-[500] max-w-[13rem] rounded-md bg-background/90 px-2.5 py-2 text-[11px] font-semibold text-muted-foreground shadow-card">
              Washa GPS kupanga kwa umbali / Enable GPS for proximity
            </p>
          )}
        </section>

        <div className="space-y-5 px-4 pt-4">
          <Button
            type="button"
            onClick={() => setReportOpen(true)}
            className="min-h-12 w-full rounded-lg bg-sos text-base font-extrabold text-sos-foreground"
          >
            <Plus className="size-5" aria-hidden />
            Ripoti Dharura <span className="font-medium opacity-80">/ Report Emergency</span>
          </Button>

          <div
            role="group"
            aria-label="Chuja aina za hatari"
            className="flex gap-2 overflow-x-auto pb-1"
          >
            {filters.map((item) => (
              <Button
                key={item.key}
                type="button"
                variant="outline"
                aria-pressed={filter === item.key}
                onClick={() => {
                  setFilter(item.key);
                  setSelectedId(null);
                }}
                className={cn(
                  "min-h-11 shrink-0 rounded-full px-4",
                  filter === item.key && "border-foreground bg-foreground text-background",
                )}
              >
                {item.sw} <span className="text-xs opacity-65">/ {item.en}</span>
              </Button>
            ))}
          </div>

          <section aria-labelledby="recent-hazards">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <h2 id="recent-hazards" className="text-base font-extrabold">
                  Ripoti za Hivi Karibuni
                </h2>
                <p className="text-xs text-muted-foreground">Recent reports · zilizo karibu kwanza</p>
              </div>
              <LocateFixed className="size-5 text-money" aria-hidden />
            </div>

            {visibleReports.length === 0 ? (
              <div className="border-y border-border py-10 text-center">
                <p className="font-bold">Hakuna ripoti katika aina hii.</p>
                <p className="mt-1 text-sm text-muted-foreground">No reports in this category.</p>
              </div>
            ) : (
              <ul className="divide-y divide-border border-y border-border">
                {visibleReports.map((report) => {
                  const Icon = iconByCategory[report.category];
                  const copy = categoryCopy[report.category];
                  const isVerified = verified.has(report.id);
                  return (
                    <li key={report.id}>
                      <article
                        className={cn(
                          "py-4 transition-colors",
                          selectedId === report.id && "bg-secondary/45",
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedId(report.id)}
                          className="w-full px-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={cn(
                                "grid size-10 shrink-0 place-items-center rounded-md border",
                                toneByCategory[report.category],
                              )}
                            >
                              <Icon className="size-5" aria-hidden />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span
                                  className={cn(
                                    "rounded-full border px-2 py-1 text-[11px] font-extrabold",
                                    toneByCategory[report.category],
                                  )}
                                >
                                  {copy.sw} / {copy.en}
                                </span>
                                {report.distance !== null && (
                                  <span className="text-xs font-bold text-money">
                                    {report.distance < 10
                                      ? report.distance.toFixed(1)
                                      : Math.round(report.distance)}{" "}
                                    km
                                  </span>
                                )}
                              </div>
                              <h3 className="mt-2 text-sm font-extrabold leading-snug">
                                {report.landmark}
                              </h3>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                {report.detail}
                              </p>
                              <p
                                className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"
                                suppressHydrationWarning
                              >
                                <Clock3 className="size-3.5" aria-hidden />
                                {relativeTimeSw(report.reportedAt)}
                              </p>
                            </div>
                          </div>
                          {report.imageUrl && (
                            <img
                              src={report.imageUrl}
                              alt={`Picha ya ripoti karibu na ${report.landmark}`}
                              className="mt-3 aspect-[16/7] w-full rounded-md object-cover"
                            />
                          )}
                        </button>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <Button
                            type="button"
                            variant={isVerified ? "secondary" : "outline"}
                            disabled={isVerified}
                            onClick={() => verify(report.id)}
                            className="min-h-12 whitespace-normal rounded-md px-2 text-xs font-extrabold"
                          >
                            {isVerified ? <Check aria-hidden /> : <MapPin aria-hidden />}
                            <span>
                              Bado Ipo <span className="block font-medium opacity-65">Still there</span>
                            </span>
                            <span className="tabular-nums">{report.confirmations}</span>
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => share(report)}
                            className="min-h-12 whitespace-normal rounded-md px-2 text-xs font-extrabold"
                          >
                            <Share2 aria-hidden />
                            <span>
                              Shiriki <span className="block font-medium opacity-65">Share</span>
                            </span>
                          </Button>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg p-5">
          <DialogHeader className="pr-8 text-left">
            <DialogTitle>Ripoti Dharura</DialogTitle>
            <DialogDescription>Report a nearby hazard. Maelezo yako yataonekana kwenye ramani.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitReport} className="space-y-4">
            <fieldset>
              <legend className="mb-2 text-sm font-bold">Aina ya hatari / Category</legend>
              <div className="grid grid-cols-3 gap-2">
                {filters.slice(1).map((item) => {
                  const Icon = iconByCategory[item.key as HazardCategory];
                  return (
                    <Button
                      key={item.key}
                      type="button"
                      variant="outline"
                      aria-pressed={newCategory === item.key}
                      onClick={() => setNewCategory(item.key as HazardCategory)}
                      className={cn(
                        "min-h-16 flex-col gap-1 whitespace-normal px-1 text-xs",
                        newCategory === item.key && toneByCategory[item.key as HazardCategory],
                      )}
                    >
                      <Icon aria-hidden />
                      {item.sw}
                    </Button>
                  );
                })}
              </div>
            </fieldset>
            <div className="space-y-2">
              <Label htmlFor="hazard-landmark">Alama ya karibu / Nearest landmark</Label>
              <Input
                id="hazard-landmark"
                value={landmark}
                onChange={(event) => setLandmark(event.target.value)}
                placeholder="Mf. Daraja la Jangwani"
                required
                className="min-h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hazard-detail">Maelezo / What is happening?</Label>
              <Textarea
                id="hazard-detail"
                value={detail}
                onChange={(event) => setDetail(event.target.value)}
                placeholder="Eleza hatari kwa ufupi..."
                required
                className="min-h-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hazard-photo">Picha / Photo (optional)</Label>
              <label
                htmlFor="hazard-photo"
                className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-input bg-secondary text-sm font-bold"
              >
                <Camera className="size-4" aria-hidden />
                {imageUrl ? "Picha imechaguliwa" : "Chagua picha / Add photo"}
              </label>
              <input
                id="hazard-photo"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) setImageUrl(URL.createObjectURL(file));
                }}
              />
            </div>
            <DialogFooter className="gap-2 sm:space-x-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setReportOpen(false)}
                className="min-h-12"
              >
                Ghairi / Cancel
              </Button>
              <Button type="submit" className="min-h-12 bg-sos font-extrabold text-sos-foreground">
                <AlertTriangle aria-hidden />
                Tuma Ripoti / Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}