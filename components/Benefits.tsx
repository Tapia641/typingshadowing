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
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("benefits.title")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t("benefits.subtitle")}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-border-default bg-surface p-5"
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
        </div>

        <div className="lg:pt-14">
          <AdSlot format="rectangle" label="Publicidad" />
        </div>
      </div>
    </section>
  );
}
