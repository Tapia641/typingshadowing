"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { SignInButton } from "./auth/SignInButton";

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="mx-auto w-full max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-default bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          {t("hero.badge")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          {t("hero.title1")}{" "}
          <span className="text-accent">{t("hero.title2")}</span>{" "}
          {t("hero.title3")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {t("hero.subtitle")}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/practicar"
            className="w-full rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
          >
            {t("hero.ctaPrimary")}
          </Link>
          <a
            href="#como-funciona"
            className="w-full rounded-xl border border-border-default px-6 py-3 font-semibold text-foreground transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
          >
            {t("hero.ctaSecondary")}
          </a>
        </div>
        <dl className="mt-10 grid grid-cols-3 gap-4 text-center">
          <div>
            <dt className="text-2xl font-bold text-accent">6</dt>
            <dd className="text-xs text-muted-foreground sm:text-sm">
              {t("hero.stat.levels")}
            </dd>
          </div>
          <div>
            <dt className="text-2xl font-bold text-accent">2</dt>
            <dd className="text-xs text-muted-foreground sm:text-sm">
              {t("hero.stat.skills")}
            </dd>
          </div>
          <div>
            <dt className="text-2xl font-bold text-accent">0 €</dt>
            <dd className="text-xs text-muted-foreground sm:text-sm">
              {t("hero.stat.cost")}
            </dd>
          </div>
        </dl>

        {/* Recomendación de cuenta */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border-default bg-surface p-5 text-left sm:flex-row">
          <div>
            <h2 className="text-sm font-semibold">{t("hero.accountTitle")}</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              {t("hero.accountText")}
            </p>
          </div>
          <SignInButton className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
        </div>
      </div>
    </section>
  );
}
