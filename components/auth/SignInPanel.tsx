"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useI18n } from "@/lib/i18n";
import { GoogleIcon } from "./SignInButton";

export function SignInPanel() {
  const { t } = useI18n();
  const { data: session, status } = useSession();

  if (status === "authenticated" && session?.user) {
    return (
      <div className="w-full max-w-sm rounded-2xl border border-border-default bg-surface p-6 text-center">
        <p className="text-sm text-muted-foreground">
          {session.user.email}
        </p>
        <Link
          href="/perfil"
          className="mt-4 inline-block rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-strong"
        >
          {t("nav.profile")}
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-border-default bg-surface p-6 text-center">
      <span
        aria-hidden="true"
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-xl text-white"
      >
        ⌨
      </span>
      <h1 className="mt-4 text-xl font-bold">{t("auth.title")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("auth.subtitle")}</p>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/perfil" })}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <GoogleIcon />
        {t("auth.google")}
      </button>

      <p className="mt-4 text-xs text-muted-foreground">
        {t("auth.unavailable")}
      </p>
      <Link
        href="/practicar"
        className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
      >
        {t("auth.back")}
      </Link>
    </div>
  );
}
