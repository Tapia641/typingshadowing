"use client";

import { BENEFITS } from "@/lib/landing-content";
import { useI18n } from "@/lib/i18n";
import { AdSlot } from "./AdSlot";
import { Reveal } from "./Reveal";

export function Benefits() {
  const { t, lang } = useI18n();
  const benefits = BENEFITS[lang];

  return (
    <section
      id="beneficios"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6"
    >
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {t("benefits.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("benefits.subtitle")}</p>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
        {benefits.map((benefit, index) => (
          <Reveal key={benefit.title} delay={index * 100}>
            <div className="surface-card h-full rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1">
              <span className="text-3xl" aria-hidden="true">
                {benefit.icon}
              </span>
              <h3 className="mt-3 font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <AdSlot format="rectangle" label="Publicidad" />
      </div>
    </section>
  );
}
