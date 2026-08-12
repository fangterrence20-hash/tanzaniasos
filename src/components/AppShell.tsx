import { Link } from "@tanstack/react-router";
import { BookOpen, Home, Siren, User, Wifi, WifiOff } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import logo from "@/assets/logo.png";
import { useLang } from "@/lib/i18n";
import { defaultProfile, initials, loadProfile } from "@/lib/profile-storage";
import { cn } from "@/lib/utils";

function useProfileInitials() {
  const [value, setValue] = useState(() => initials(defaultProfile.name));

  useEffect(() => {
    const sync = () => setValue(initials((loadProfile() ?? defaultProfile).name));
    sync();
    window.addEventListener("tz-sos-profile-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tz-sos-profile-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return value;
}


function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language"
      className="flex shrink-0 items-center rounded-full border border-border bg-secondary p-1"
    >
      {(["en", "sw"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "min-h-9 rounded-full px-3 text-sm font-bold uppercase transition-colors",
            lang === l
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function ConnectionBadge() {
  const { t } = useLang();
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return (
    <span
      className={cn(
        "flex min-w-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs font-semibold",
        online ? "text-money" : "text-warning",
      )}
    >
      {online ? <Wifi className="size-3.5 shrink-0" /> : <WifiOff className="size-3.5 shrink-0" />}
      <span className="truncate">{online ? t("online") : t("offline")}</span>
    </span>
  );
}

const navItems = [
  { to: "/", icon: Home, key: "home" },
  { to: "/dispatch", icon: Siren, key: "dispatch" },
  { to: "/guides", icon: BookOpen, key: "guides" },
  { to: "/profile", icon: User, key: "profile" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLang();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between gap-3 px-4 pt-3">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img
              src={logo}
              alt="Tanzania SOS logo"
              width={1024}
              height={1024}
              className="size-8 shrink-0 rounded-lg"
            />
            <span className="truncate text-base font-extrabold tracking-tight text-foreground">
              {t("appName")}
            </span>
          </Link>
          <Link
            to="/profile"
            aria-label={t("profile")}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-medical text-medical-foreground text-sm font-bold"
          >
            AM
          </Link>
        </div>
        <div className="flex min-w-0 items-center gap-2 px-4 pt-2 pb-3">
          <LanguageSwitcher />
          <ConnectionBadge />
        </div>
      </header>

      <main className="flex-1 pb-24">{children}</main>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 mx-auto flex w-full max-w-md items-stretch border-t border-border bg-surface"
      >
        {navItems.map(({ to, icon: Icon, key }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex flex-1 flex-col items-center gap-1 py-3 text-[11px] font-semibold text-muted-foreground transition-colors data-[status=active]:text-foreground"
          >
            <Icon className="size-5" />
            <span className="truncate px-1">{t(key)}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
