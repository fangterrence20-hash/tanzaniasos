import { CloudDownload, RefreshCw, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

import { useLang } from "@/lib/i18n";

/** Shows whether guides are cached for offline use and syncing when back online. */
export function OfflineStatus() {
  const { t } = useLang();
  const [online, setOnline] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    setOnline(navigator.onLine);
    const goOnline = () => {
      setOnline(true);
      setSyncing(true);
      window.setTimeout(() => setSyncing(false), 2000);
    };
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (!online) {
    return (
      <p className="inline-flex items-center gap-1.5 rounded-full bg-money/15 px-2.5 py-1 text-xs font-bold text-money">
        <WifiOff className="size-3.5" aria-hidden />
        {t("offlineReady")}
      </p>
    );
  }

  return (
    <p className="inline-flex items-center gap-1.5 rounded-full bg-medical/15 px-2.5 py-1 text-xs font-bold text-medical">
      {syncing ? (
        <RefreshCw className="size-3.5 animate-spin" aria-hidden />
      ) : (
        <CloudDownload className="size-3.5" aria-hidden />
      )}
      {syncing ? t("syncing") : t("savedOffline")}
    </p>
  );
}
