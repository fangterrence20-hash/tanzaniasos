import { ClientOnly } from "@tanstack/react-router";
import { Loader2, MapPinOff } from "lucide-react";
import { Suspense, lazy } from "react";

import type { LocationStatus } from "@/lib/use-live-location";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LiveMap = lazy(() => import("@/components/LiveMap"));

type Props = {
  lat?: number | undefined;
  lng?: number | undefined;
  accuracy?: number | undefined;

  status: LocationStatus;
  unit?: { lat: number; lng: number } | null | undefined;
  className?: string | undefined;
  zoom?: number | undefined;
  onRetry?: (() => void) | undefined;
};

function Placeholder({ status, onRetry }: { status: LocationStatus; onRetry?: (() => void) | undefined }) {
  const { t } = useLang();
  const denied = status === "denied" || status === "unsupported" || status === "error";
  return (
    <div className="grid size-full place-items-center bg-secondary p-4 text-center">
      <div className="space-y-2">
        {denied ? (
          <MapPinOff className="mx-auto size-6 text-muted-foreground" aria-hidden />
        ) : (
          <Loader2 className="mx-auto size-6 animate-spin text-medical" aria-hidden />
        )}
        <p className="text-sm font-semibold">
          {status === "denied"
            ? t("locationDenied")
            : status === "unsupported"
              ? t("locationUnsupported")
              : status === "error"
                ? t("locationError")
                : t("acquiringGps")}
        </p>
        {denied ? (
          <button
            type="button"
            onClick={onRetry}
            className="min-h-10 rounded-lg border border-border px-3 text-xs font-bold"
          >
            {t("retry")}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function MapPanel({
  lat,
  lng,
  accuracy,
  status,
  unit,
  className,
  zoom,
  onRetry,
}: Props) {
  const ready = lat != null && lng != null;
  return (
    <div
      className={cn(
        "relative isolate h-64 overflow-hidden rounded-xl border border-border",
        className,
      )}
    >
      <ClientOnly fallback={<Placeholder status="locating" />}>
        {ready ? (
          <Suspense fallback={<Placeholder status="locating" />}>
            <LiveMap
              lat={lat}
              lng={lng}
              accuracy={accuracy}
              unit={unit}
              zoom={zoom}
              className="size-full"
            />
          </Suspense>
        ) : (
          <Placeholder status={status} onRetry={onRetry} />
        )}
      </ClientOnly>
    </div>
  );
}
