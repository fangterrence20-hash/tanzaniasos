import { ClientOnly } from "@tanstack/react-router";
import { Loader2, MapPinOff } from "lucide-react";
import { Suspense, lazy } from "react";

import type { LocationStatus } from "@/lib/use-live-location";
import { cn } from "@/lib/utils";

const LiveMap = lazy(() => import("@/components/LiveMap"));

type Props = {
  lat?: number;
  lng?: number;
  accuracy?: number;
  status: LocationStatus;
  unit?: { lat: number; lng: number } | null;
  className?: string;
  zoom?: number;
  onRetry?: () => void;
};

function Placeholder({ status, onRetry }: { status: LocationStatus; onRetry?: () => void }) {
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
            ? "Location permission denied"
            : status === "unsupported"
              ? "GPS not supported on this device"
              : status === "error"
                ? "Could not get GPS signal"
                : "Acquiring GPS signal…"}
        </p>
        {denied ? (
          <button
            type="button"
            onClick={onRetry}
            className="min-h-10 rounded-lg border border-border px-3 text-xs font-bold"
          >
            Try again
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
              lat={lat!}
              lng={lng!}
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
