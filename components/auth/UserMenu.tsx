"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useI18n } from "@/lib/i18n";
import { SignInButton } from "./SignInButton";

export function UserMenu() {
  const { data: session, status } = useSession();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (status === "loading") {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-surface-muted" />;
  }

  if (!session?.user) {
    return (
      <SignInButton
        className="inline-flex items-center gap-2 rounded-lg border border-border-default bg-surface px-3 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        label={t("nav.signIn")}
      />
    );
  }

  const isAdmin = session.user.role === "admin";
  const initial =
    session.user.name?.[0]?.toUpperCase() ??
    session.user.email?.[0]?.toUpperCase() ??
    "?";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("nav.account")}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border-default bg-accent text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          initial
        )}
      </button>

      {open ? (
        <div
          role="menu"
          className="animate-pop-in absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-border-default bg-surface py-1 shadow-lg"
        >
          <div className="border-b border-border-default px-3 py-2">
            <p className="truncate text-sm font-medium">
              {session.user.name ?? "—"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {session.user.email}
            </p>
          </div>
          <Link
            href="/perfil"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm transition-colors hover:bg-surface-muted"
          >
            {t("nav.profile")}
          </Link>
          {isAdmin ? (
            <Link
              href="/admin"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm transition-colors hover:bg-surface-muted"
            >
              {t("nav.admin")}
            </Link>
          ) : null}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/" });
            }}
            className="block w-full px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-surface-muted"
          >
            {t("nav.signOut")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
