"use client";

import { STEPS } from "@/lib/landing-content";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function HowItWorks() {
  const { t, lang } = useI18n();
  const steps = STEPS[lang];

  return (
    <section
      id="como-funciona"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {t("steps.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("steps.subtitle")}</p>
        </div>
      </Reveal>

      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 120}>
            <li className="surface-card h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 text-lg font-bold text-white">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
