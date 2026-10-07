"use client";

import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border-default">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>
          <span className="font-semibold text-foreground">
            Typing<span className="text-accent">Shadowing</span>
          </span>{" "}
          — {t("brand.tagline")}.
        </p>
        <p className="text-center sm:text-right">{t("footer.rights")}</p>
      </div>
    </footer>
  );
}
