"use client";

import { BENEFITS } from "@/lib/landing-content";
import { useI18n } from "@/lib/i18n";
import { AdSlot } from "./AdSlot";

export function Benefits() {
  const { t, lang } = useI18n();
  const benefits = BENEFITS[lang];

  return (
    <section
      id="beneficios"
      className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("benefits.title")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("benefits.subtitle")}</p>
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl gap-6 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border border-border-default bg-surface p-5 text-center"
          >
            <span className="text-2xl" aria-hidden="true">
              {benefit.icon}
            </span>
            <h3 className="mt-3 font-semibold">{benefit.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <AdSlot format="rectangle" label="Publicidad" />
      </div>
    </section>
  );
}
