"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { UserMenu } from "./auth/UserMenu";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border-default bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm text-white"
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
    </header>
  );
}
