"use client";

import { signIn } from "next-auth/react";
import { useI18n } from "@/lib/i18n";

export function SignInButton({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/perfil" })}
      className={
        className ||
        "inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      }
    >
      <GoogleIcon />
      {label ?? t("hero.accountCta")}
    </button>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="#fff"
        d="M21.35 11.1h-9.18v2.96h5.27c-.23 1.4-1.65 4.1-5.27 4.1-3.17 0-5.75-2.62-5.75-5.85s2.58-5.85 5.75-5.85c1.8 0 3.01.77 3.7 1.43l2.52-2.43C16.7 3.9 14.63 3 12.17 3 7.08 3 3 7.08 3 12.17s4.08 9.17 9.17 9.17c5.29 0 8.8-3.72 8.8-8.96 0-.6-.06-1.06-.62-1.28z"
      />
    </svg>
  );
}
