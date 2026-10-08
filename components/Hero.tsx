"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SignInButton } from "./auth/SignInButton";

/** Avatares placeholder generados como iniciales de colores. */
const AVATARS = [
  { bg: "#60a5fa", label: "A" },
  { bg: "#34d399", label: "M" },
  { bg: "#fbbf24", label: "L" },
  { bg: "#f472b6", label: "S" },
  { bg: "#a78bfa", label: "J" },
  { bg: "#22d3ee", label: "R" },
];

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Fondos con glow (inspirados en la referencia) */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="glow absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full" />
        <div className="glow absolute left-1/2 top-64 ml-[320px] h-72 w-72 -translate-x-1/2 rounded-full" />
        <div className="glow absolute left-1/2 top-72 -ml-[340px] h-72 w-72 -translate-x-1/2 rounded-full" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 md:pb-20 md:pt-16">
        <div className="pb-12 text-center md:pb-16">
          {/* Avatares */}
          <Reveal>
            <div className="mb-6 flex justify-center">
              <div className="flex -space-x-3 border-y border-border-default py-3">
                {AVATARS.map((avatar) => (
                  <span
                    key={avatar.label}
                    style={{ backgroundColor: avatar.bg }}
                    className="box-content flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-xs font-semibold text-white"
                    aria-hidden="true"
                  >
                    {avatar.label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t("hero.title1")}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>{" "}
              {t("hero.title3")}
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mx-auto mb-8 max-w-3xl text-base text-muted-foreground sm:text-lg">
              {t("hero.subtitle")}
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mx-auto mb-10 flex max-w-xs flex-col justify-center gap-3 border-y border-border-default py-6 sm:max-w-none sm:flex-row">
              <Link
                href="/practicar"
                className="btn-accent group mb-0 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold shadow-sm sm:w-auto"
              >
                <span className="relative inline-flex items-center">
                  {t("hero.ctaPrimary")}
                  <span
                    aria-hidden="true"
                    className="ml-1 tracking-normal text-blue-200 transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex w-full items-center justify-center rounded-lg border border-border-default bg-surface px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-surface-muted sm:ml-4 sm:w-auto"
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <dl className="mx-auto grid max-w-2xl grid-cols-3 gap-4 text-center">
              <div>
                <dt className="text-2xl font-bold text-accent sm:text-3xl">6</dt>
                <dd className="text-xs text-muted-foreground sm:text-sm">
                  {t("hero.stat.levels")}
                </dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-accent sm:text-3xl">2</dt>
                <dd className="text-xs text-muted-foreground sm:text-sm">
                  {t("hero.stat.skills")}
                </dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-accent sm:text-3xl">0 €</dt>
                <dd className="text-xs text-muted-foreground sm:text-sm">
                  {t("hero.stat.cost")}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Tarjeta de racha + cuenta */}
        <Reveal delay={600}>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="surface-card rounded-2xl p-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-contrast">
                <span className="text-base" aria-hidden="true">
                  🔥
                </span>
                {t("hero.streakBadge")}
              </span>
              <h2 className="mt-3 text-lg font-semibold">
                {t("hero.streakTitle")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("hero.streakText")}
              </p>
              <StreakPreview />
            </div>

            <div className="surface-card flex flex-col justify-center rounded-2xl p-6 text-left">
              <h2 className="text-lg font-semibold">{t("hero.accountTitle")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("hero.accountText")}
              </p>
              <div className="mt-4">
                <SignInButton
                  className="btn-accent inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm"
                  label={t("hero.streakCta")}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Vista previa decorativa de la racha (7 días). */
function StreakPreview() {
  const { t } = useI18n();
  const days = [true, true, true, false, true, true, false];
  const active = days.filter(Boolean).length;

  return (
    <div className="mt-4 rounded-xl border border-border-default bg-surface-muted/50 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {t("hero.streakDays")}
        </span>
        <span className="text-xl font-bold text-accent">{active} 🔥</span>
      </div>
      <div className="mt-3 flex justify-between gap-1.5">
        {days.map((on, index) => (
          <span
            key={index}
            className={
              "flex h-8 flex-1 items-center justify-center rounded-md text-xs font-semibold transition-colors " +
              (on
                ? "bg-gradient-to-t from-blue-600 to-blue-500 text-white"
                : "border border-dashed border-border-default text-muted-foreground/50")
            }
            aria-hidden="true"
          >
            {on ? "✓" : "·"}
          </span>
        ))}
      </div>
    </div>
  );
}
