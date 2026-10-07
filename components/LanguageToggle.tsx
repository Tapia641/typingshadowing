"use client";

import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang: set } = useI18n();

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className="inline-flex items-center rounded-full border border-border-default bg-surface p-0.5 text-xs font-semibold"
    >
      {(["es", "en"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => set(code)}
            aria-pressed={active}
            className={
              "rounded-full px-2.5 py-1 uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring " +
              (active
                ? "bg-accent text-white"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
