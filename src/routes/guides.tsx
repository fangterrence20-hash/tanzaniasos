import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search, Volume2, WifiOff } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { guides, type Guide } from "@/lib/guides";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "Offline Swahili First Aid Guides — Tanzania SOS" },
      {
        name: "description",
        content:
          "Step-by-step Swahili and English first aid guides for CPR, choking, severe bleeding, snake bites and road accident triage. Works offline.",
      },
      { property: "og:title", content: "Offline Swahili First Aid Guides — Tanzania SOS" },
      {
        property: "og:description",
        content: "Visual, low-literacy first aid steps in Kiswahili that work without internet.",
      },
    ],
  }),
  component: GuidesScreen,
});

const toneClass = {
  sos: "bg-sos/15 text-sos",
  medical: "bg-medical/15 text-medical",
  money: "bg-money/15 text-money",
} as const;

function Illustration({ name, tone }: { name: string; tone: Guide["tone"] }) {
  return (
    <div
      role="img"
      aria-label={name.replace(/-/g, " ")}
      className={cn(
        "grid h-32 w-full place-items-center rounded-lg border border-dashed border-border",
        toneClass[tone],
      )}
    >
      <span className="text-[11px] font-bold uppercase tracking-widest">
        {name.replace(/-/g, " ")}
      </span>
    </div>
  );
}

function GuideDetail({ guide, onBack }: { guide: Guide; onBack: () => void }) {
  const { lang, t } = useLang();

  return (
    <div className="space-y-4 px-4 py-5">
      <button
        type="button"
        onClick={onBack}
        className="flex min-h-11 items-center gap-1 text-sm font-bold text-muted-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden />
        {t("back")}
      </button>

      <header>
        <h1 className="text-2xl font-black leading-tight">{guide.title[lang]}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{guide.subtitle[lang]}</p>
      </header>

      <button
        type="button"
        onClick={() => toast.success(t("playAudio"))}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-medical text-sm font-bold text-medical-foreground"
      >
        <Volume2 className="size-5" aria-hidden />
        {t("playAudio")}
      </button>

      <ol className="space-y-3">
        {guide.steps.map((step, i) => (
          <li key={step.illustration} className="surface-card space-y-3 p-4">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full text-base font-black",
                  toneClass[guide.tone],
                )}
              >
                {i + 1}
              </span>
              <h2 className="min-w-0 text-base font-bold leading-tight">{step.title[lang]}</h2>
            </div>
            <Illustration name={step.illustration} tone={guide.tone} />
            <p className="text-sm leading-relaxed text-muted-foreground">{step.body[lang]}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function GuidesScreen() {
  const { lang, t } = useLang();
  const [query, setQuery] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return guides;
    return guides.filter((g) =>
      `${g.title.en} ${g.title.sw} ${g.keywords}`.toLowerCase().includes(q),
    );
  }, [query]);

  const open = guides.find((g) => g.slug === openSlug);

  if (open) {
    return (
      <AppShell>
        <GuideDetail guide={open} onBack={() => setOpenSlug(null)} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-4 px-4 py-5">
        <header>
          <h1 className="text-2xl font-black leading-tight">{t("guidesTitle")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("guidesSub")}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-money/15 px-2.5 py-1 text-xs font-bold text-money">
            <WifiOff className="size-3.5" aria-hidden />
            {t("offline")}
          </p>
        </header>

        <div className="flex items-center gap-2 rounded-xl border border-input bg-secondary px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
            aria-label={t("search")}
            className="min-h-12 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
        </div>

        {results.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">{t("noResults")}</p>
        ) : (
          <ul className="space-y-3">
            {results.map((g) => (
              <li key={g.slug}>
                <button
                  type="button"
                  onClick={() => setOpenSlug(g.slug)}
                  className="surface-card grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 text-left"
                >
                  <span className="min-w-0">
                    <span className="block text-base font-bold leading-tight">
                      {g.title[lang]}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {g.subtitle[lang]}
                    </span>
                    <span
                      className={cn(
                        "mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold",
                        toneClass[g.tone],
                      )}
                    >
                      {g.steps.length} {t("step")}
                    </span>
                  </span>
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
