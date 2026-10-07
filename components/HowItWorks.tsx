"use client";

import { STEPS } from "@/lib/landing-content";
import { useI18n } from "@/lib/i18n";

export function HowItWorks() {
  const { t, lang } = useI18n();
  const steps = STEPS[lang];

  return (
    <section
      id="como-funciona"
      className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("steps.title")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("steps.subtitle")}</p>
      </div>

      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <li
            key={step.number}
            className="rounded-2xl border border-border-default bg-surface p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-lg font-bold text-accent-contrast">
              {step.number}
            </span>
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
