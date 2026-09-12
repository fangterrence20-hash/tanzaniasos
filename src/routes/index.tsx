import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Ambulance,
  Car,
  Copy,
  Flame,
  MapPin,
  MessageSquare,
  Phone,
  Share2,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { MapPanel } from "@/components/MapPanel";
import { useLang } from "@/lib/i18n";
import { threeWords, useLiveLocation } from "@/lib/use-live-location";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tanzania SOS — Emergency & First Aid Response" },
      {
        name: "description",
        content:
          "One-touch emergency SOS for Tanzania: ambulance, police, fire and road accident dispatch with offline Swahili first aid guides.",
      },
      { property: "og:title", content: "Tanzania SOS — Emergency & First Aid Response" },
      {
        property: "og:description",
        content:
          "Hold for SOS, share your live location and reach ambulance, police or fire services across Tanzania.",
      },
    ],
  }),
  component: HomeScreen,
});

const categories = [
  { key: "medical", number: "115", icon: Ambulance, tone: "sos" },
  { key: "police", number: "112 / 113", icon: Shield, tone: "medical" },
  { key: "fire", number: "114", icon: Flame, tone: "sos" },
  { key: "accident", number: "0800 11 0000", icon: Car, tone: "money" },
] as const;

const toneClass = {
  sos: "bg-sos/15 text-sos border-sos/30",
  medical: "bg-medical/15 text-medical border-medical/30",
  money: "bg-money/15 text-money border-money/30",
} as const;

function HomeScreen() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { location, status, place, retry } = useLiveLocation();
  const words = location ? threeWords(location.lat, location.lng) : "///…";
  const holding = useRef(false);
  const raf = useRef<number | null>(null);


  const stop = useCallback(() => {
    holding.current = false;
    if (raf.current) cancelAnimationFrame(raf.current);
    setProgress(0);
  }, []);

  useEffect(() => () => stop(), [stop]);

  const start = useCallback(() => {
    if (holding.current) return;
    holding.current = true;
    const started = performance.now();
    const tick = (now: number) => {
      if (!holding.current) return;
      const pct = Math.min(1, (now - started) / 3000);
      setProgress(pct);
      if (pct >= 1) {
        holding.current = false;
        setProgress(0);
        navigate({ to: "/dispatch" });
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [navigate]);

  return (
    <AppShell>
      <div className="space-y-6 px-4 py-5">
        <section className="flex flex-col items-center">
          <button
            type="button"
            aria-label={t("holdSos")}
            onPointerDown={start}
            onPointerUp={stop}
            onPointerLeave={stop}
            onPointerCancel={stop}
            className={cn(
              "relative grid size-64 select-none place-items-center rounded-full bg-sos text-sos-foreground transition-transform active:scale-[0.97]",
              progress === 0 && "sos-pulse",
            )}
            style={{
              backgroundImage: `conic-gradient(color-mix(in oklab, var(--sos-foreground) 35%, transparent) ${progress * 360}deg, transparent 0deg)`,
            }}
          >
            <span className="grid size-56 place-items-center rounded-full bg-sos px-6 text-center">
              <ShieldAlert className="mx-auto size-12" aria-hidden />
              <span className="mt-2 block text-xl font-black leading-tight tracking-tight">
                SOS
              </span>
              <span className="mt-1 block text-[11px] font-bold uppercase leading-snug tracking-wide">
                {progress > 0 ? t("releaseToCancel") : t("holdSos")}
              </span>
            </span>
          </button>
        </section>

        <section aria-labelledby="quick-lines" className="space-y-3">
          <h2
            id="quick-lines"
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
          >
            {t("quickCall")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(({ key, number, icon: Icon, tone }) => (
              <a
                key={key}
                href={`tel:${number.split(" ")[0]}`}
                className={cn(
                  "flex min-h-24 flex-col justify-between rounded-xl border p-3 transition-colors",
                  toneClass[tone],
                )}
              >
                <Icon className="size-6 shrink-0" aria-hidden />
                <span>
                  <span className="block text-sm font-bold leading-tight text-foreground">
                    {t(key)}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1 text-xs font-semibold">
                    <Phone className="size-3" aria-hidden />
                    {number}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="surface-card space-y-3 p-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {t("liveLocation")}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                <MapPin className="size-4 shrink-0 text-money" aria-hidden />
                <span className="truncate">
                  {place ?? (location ? "Locating address…" : "Waiting for GPS…")}
                </span>
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {location
                  ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)} · ±${Math.round(location.accuracy)} m`
                  : status === "denied"
                    ? "Location permission denied"
                    : "Acquiring signal…"}
              </p>
              <p className="mt-2 font-mono text-base font-bold text-medical">{words}</p>
            </div>
            <button
              type="button"
              aria-label="Copy location"
              onClick={() =>
                location
                  ? toast.success(`${words} · ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`)
                  : toast.error("No GPS fix yet")
              }
              className="grid min-h-11 min-w-11 place-items-center rounded-lg border border-border bg-secondary text-foreground"
            >
              <Copy className="size-4" aria-hidden />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => share("whatsapp")}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-money text-sm font-bold text-background"
            >
              <Share2 className="size-4" aria-hidden />
              {t("shareWhatsapp")}
            </button>
            <button
              type="button"
              onClick={() => share("sms")}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-secondary text-sm font-bold text-foreground"
            >
              <MessageSquare className="size-4" aria-hidden />
              {t("shareSms")}
            </button>
          </div>
          <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {t("shareLocation")}
          </p>
          <MapPanel
            lat={location?.lat}
            lng={location?.lng}
            accuracy={location?.accuracy}
            status={status}
            onRetry={retry}
            className="h-56"
          />
        </section>


        <button
          type="button"
          onClick={() => {
            toast.success(t("silentPanic"));
            navigate({ to: "/dispatch" });
          }}
          className="flex w-full items-center gap-3 rounded-xl border border-border bg-secondary p-4 text-left transition-colors hover:bg-accent"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-background text-foreground">
            <ShieldAlert className="size-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold">{t("silentPanic")}</span>
            <span className="block text-xs text-muted-foreground">{t("silentPanicDesc")}</span>
          </span>
        </button>
      </div>
    </AppShell>
  );
}
