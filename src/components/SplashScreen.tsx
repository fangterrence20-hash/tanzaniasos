import { useEffect, useState } from "react";

import logo from "@/assets/logo.png";

/**
 * Branded startup overlay. Renders above the app for a short beat on first
 * load, then fades out. Client-only so SSR never ships a hidden overlay.
 */
export function SplashScreen({ duration = 1400 }: { duration?: number }) {
  const [phase, setPhase] = useState<"visible" | "leaving" | "gone">("visible");

  useEffect(() => {
    const leave = window.setTimeout(() => setPhase("leaving"), duration);
    const done = window.setTimeout(() => setPhase("gone"), duration + 450);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, [duration]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden={phase === "leaving"}
      role="status"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="sos-pulse rounded-3xl">
        <img
          src={logo}
          alt="Tanzania SOS"
          width={1024}
          height={1024}
          className="size-24 rounded-3xl"
        />
      </div>
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-foreground">Tanzania SOS</h1>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Emergency &amp; First Aid
      </p>
      <div className="mt-8 h-1 w-28 overflow-hidden rounded-full bg-secondary">
        <div className="h-full w-1/3 animate-[splash-slide_1.1s_ease-in-out_infinite] rounded-full bg-sos" />
      </div>
    </div>
  );
}
