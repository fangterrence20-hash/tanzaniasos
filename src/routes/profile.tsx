import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Switch } from "@/components/ui/switch";
import { useLang } from "@/lib/i18n";
import {
  defaultProfile,
  loadProfile,
  saveProfile,
  type Contact,
} from "@/lib/profile-storage";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Medical Profile & ICE Contacts — Tanzania SOS" },
      {
        name: "description",
        content:
          "Store your blood type, allergies, chronic conditions and in-case-of-emergency contacts so responders act fast.",
      },
      { property: "og:title", content: "Medical Profile & ICE Contacts — Tanzania SOS" },
      {
        property: "og:description",
        content: "Blood type, allergies, conditions and ICE contacts shared instantly with responders.",
      },
    ],
  }),
  component: ProfileScreen,
});

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];



function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-input bg-secondary p-3 text-base outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
      ) : (
        <input
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-12 w-full rounded-xl border border-input bg-secondary px-3 text-base outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
      )}
    </div>
  );
}

function ProfileScreen() {
  const { t } = useLang();
  const [name, setName] = useState("Asha Mwinyi");
  const [blood, setBlood] = useState("O+");
  const [allergies, setAllergies] = useState("Penicillin");
  const [conditions, setConditions] = useState("Asthma");
  const [sms, setSms] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "Juma Mwinyi", phone: "+255 754 000 111" },
    { id: 2, name: "Dr. Neema", phone: "+255 713 222 333" },
  ]);

  const updateContact = (id: number, patch: Partial<Contact>) =>
    setContacts((c) => c.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  return (
    <AppShell>
      <form
        className="space-y-5 px-4 py-5"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success(t("saved"));
        }}
      >
        <header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-medical text-medical-foreground">
            <User className="size-6" aria-hidden />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-black leading-tight">{t("profileTitle")}</h1>
            <p className="text-xs text-muted-foreground">{t("profileSub")}</p>
          </div>
        </header>

        <div className="surface-card space-y-4 p-4">
          <Field id="name" label={t("fullName")} value={name} onChange={setName} />

          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {t("bloodType")}
            </span>
            <div className="grid grid-cols-4 gap-2">
              {bloodTypes.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBlood(b)}
                  aria-pressed={blood === b}
                  className={
                    "min-h-11 rounded-lg border text-sm font-bold transition-colors " +
                    (blood === b
                      ? "border-sos bg-sos/15 text-sos"
                      : "border-border bg-secondary text-muted-foreground")
                  }
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <Field
            id="allergies"
            label={t("allergies")}
            value={allergies}
            onChange={setAllergies}
            multiline
          />
          <Field
            id="conditions"
            label={t("conditions")}
            value={conditions}
            onChange={setConditions}
            multiline
          />
        </div>

        <section className="surface-card space-y-3 p-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("iceContacts")}
          </h2>
          <ul className="space-y-3">
            {contacts.map((c) => (
              <li key={c.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                <div className="min-w-0 space-y-2">
                  <input
                    aria-label={`${t("iceContacts")} name`}
                    value={c.name}
                    onChange={(e) => updateContact(c.id, { name: e.target.value })}
                    className="min-h-11 w-full rounded-lg border border-input bg-secondary px-3 text-sm font-semibold outline-none"
                  />
                  <input
                    aria-label={`${t("iceContacts")} phone`}
                    inputMode="tel"
                    value={c.phone}
                    onChange={(e) => updateContact(c.id, { phone: e.target.value })}
                    className="min-h-11 w-full rounded-lg border border-input bg-secondary px-3 text-sm outline-none"
                  />
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${c.name}`}
                  onClick={() => setContacts((list) => list.filter((x) => x.id !== c.id))}
                  className="grid min-h-11 min-w-11 place-items-center rounded-lg border border-border text-sos"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() =>
              setContacts((list) => [...list, { id: Date.now(), name: "", phone: "" }])
            }
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border text-sm font-bold text-muted-foreground"
          >
            <Plus className="size-4" aria-hidden />
            {t("addContact")}
          </button>
        </section>

        <section className="surface-card grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight">{t("smsFallback")}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t("smsFallbackDesc")}</p>
          </div>
          <Switch checked={sms} onCheckedChange={setSms} aria-label={t("smsFallback")} />
        </section>

        <button
          type="submit"
          className="min-h-12 w-full rounded-xl bg-sos text-sm font-black uppercase tracking-wide text-sos-foreground"
        >
          {t("save")}
        </button>
      </form>
    </AppShell>
  );
}
