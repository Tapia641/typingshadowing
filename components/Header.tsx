"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { UserMenu } from "./auth/UserMenu";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t } = useI18n();

  return (
    <>
      {/* Espaciador para el header fijo */}
      <div className="h-16 md:h-24" aria-hidden="true" />
      <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl border border-border-default bg-surface/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-blue-500 text-sm text-white"
            >
              ⌨
            </span>
            <span className="hidden text-base tracking-tight sm:inline">
              Typing<span className="text-accent">Shadowing</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-3" aria-label="Principal">
            <Link
              href="/practicar"
              className="rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:px-3"
            >
              {t("nav.practice")}
            </Link>
            <Link
              href="/#beneficios"
              className="hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-block"
            >
              {t("nav.benefits")}
            </Link>
            <Link
              href="/#faq"
              className="hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-block"
            >
              {t("nav.faq")}
            </Link>
            <LanguageToggle />
            <ThemeToggle />
            <UserMenu />
          </nav>
        </div>
      </div>
    </header>
    </>
  );
}
