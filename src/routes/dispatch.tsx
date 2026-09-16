import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Navigation, Phone, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { MapPanel } from "@/components/MapPanel";
import { useLang } from "@/lib/i18n";
import { threeWords, useLiveLocation } from "@/lib/use-live-location";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dispatch")({
  head: () => ({
    meta: [
      { title: "Active Dispatch — Tanzania SOS" },
      {
        name: "description",
        content:
          "Track the nearest responding ambulance or police unit in real time and authorize dispatch payment with M-Pesa, Airtel Money or Tigo Pesa.",
      },
      { property: "og:title", content: "Active Dispatch — Tanzania SOS" },
      {
        property: "og:description",
        content: "Live responder tracking and mobile money dispatch authorization in TZS.",
      },
    ],
  }),
  component: DispatchScreen,
});

const providers = [
  { id: "mpesa", name: "Vodacom M-Pesa", prefix: "+255 75" },
  { id: "airtel", name: "Airtel Money", prefix: "+255 78" },
  { id: "tigo", name: "Mixx by Yas (Tigo Pesa)", prefix: "+255 71" },
] as const;

/** Simulated responder that closes in on the user's real GPS position. */
function useApproachingUnit(lat?: number, lng?: number) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => Math.min(1, v + 0.02)), 700);
    return () => clearInterval(id);
  }, []);
  if (lat == null || lng == null) return null;
  const startLat = lat + 0.018;
  const startLng = lng - 0.014;
  return { lat: startLat + (lat - startLat) * t, lng: startLng + (lng - startLng) * t };
}


function DispatchScreen() {
  const { t } = useLang();
  const [stage, setStage] = useState(0);
  const [provider, setProvider] = useState<string>("mpesa");
  const [amount, setAmount] = useState("35000");
  const [phone, setPhone] = useState("0754 123 456");
  const { location, status, place, retry } = useLiveLocation();
  const unit = useApproachingUnit(location?.lat, location?.lng);

  useEffect(() => {
    const a = setTimeout(() => setStage(1), 2600);
    const b = setTimeout(() => setStage(2), 6000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  const statusTitle =
    stage === 0
      ? t("searchingProvider")
      : stage === 1
        ? `${t("dispatched")}: E-Plus Ambulance`
        : t("connectingOperator");

  return (
    <AppShell>
      <div className="space-y-4 px-4 py-5">
        <MapPanel
          lat={location?.lat}
          lng={location?.lng}
          accuracy={location?.accuracy}
          status={status}
          unit={stage >= 1 ? unit : null}
          onRetry={retry}
          zoom={15}
          className="h-72"
        />

        <section
          className={cn(
            "surface-card p-4",
            stage === 1 && "border-money/40",
            stage === 0 && "border-warning/40",
          )}
          aria-live="polite"
        >
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
            <span
              className={cn(
                "mt-1 size-3 shrink-0 rounded-full",
                stage === 0 ? "bg-warning animate-pulse" : stage === 1 ? "bg-money" : "bg-medical",
              )}
            />
            <div className="min-w-0">
              <p className="text-base font-bold leading-tight">{statusTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stage === 1
                  ? `5 ${t("minsAway")} · ${place ?? t("enRoute")}`
                  : (place ?? t("locatingYou"))}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full bg-secondary px-2.5 py-1">
                  {t("yourLocation")}: {location ? threeWords(location.lat, location.lng) : "///…"}
                </span>
                <span className="rounded-full bg-secondary px-2.5 py-1">
                  {t("respondingUnit")}: TZ-AMB-114
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("emergencyContacts")}
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <a
              href="tel:115"
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-sos px-2 text-sm font-bold text-sos-foreground"
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              115
            </a>
            <button
              type="button"
              onClick={() => toast.success("Asha Mwinyi")}
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-medical px-2 text-sm font-bold text-medical-foreground"
            >
              <MessageSquare className="size-4 shrink-0" aria-hidden />
              {t("chat")}
            </button>
            <button
              type="button"
              onClick={() =>
                location
                  ? window.open(
                      `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
                      "_blank",
                      "noopener",
                    )
                  : toast.error(t("noGpsYet"))
              }
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-2 text-sm font-bold"
            >
              <Navigation className="size-4 shrink-0" aria-hidden />
              GPS
            </button>
          </div>
        </section>

        <section className="surface-card space-y-3 border-money/30 p-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <h2 className="truncate text-sm font-bold">{t("authorizePayment")}</h2>
            <Smartphone className="size-5 shrink-0 text-money" aria-hidden />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {providers.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProvider(p.id)}
                aria-pressed={provider === p.id}
                className={cn(
                  "min-h-16 rounded-lg border p-2 text-[11px] font-bold leading-tight transition-colors",
                  provider === p.id
                    ? "border-money bg-money/15 text-money"
                    : "border-border bg-secondary text-muted-foreground",
                )}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-semibold text-muted-foreground" htmlFor="pay-amount">
              {t("amount")}
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3">
              <span className="text-sm font-bold text-money">TZS</span>
              <input
                id="pay-amount"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="min-h-11 w-full bg-transparent text-base font-bold outline-none placeholder:text-muted-foreground"
              />
            </div>

            <label className="text-xs font-semibold text-muted-foreground" htmlFor="pay-phone">
              {t("phoneNumber")}
            </label>
            <input
              id="pay-phone"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="min-h-11 rounded-lg border border-input bg-background px-3 text-base outline-none placeholder:text-muted-foreground"
            />
          </div>

          <p className="text-xs text-muted-foreground">{t("stkNote")}</p>

          <button
            type="button"
            onClick={() => toast.success(`${t("payNow")} · TZS ${amount}`)}
            className="min-h-12 w-full rounded-xl bg-money text-sm font-black uppercase tracking-wide text-money-foreground"
          >
            {t("payNow")}
          </button>
        </section>

        <button
          type="button"
          onClick={() => toast(t("cancelEmergency"))}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-bold text-muted-foreground"
        >
          <X className="size-4" aria-hidden />
          {t("cancelEmergency")}
        </button>
      </div>
    </AppShell>
  );
}
