"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useI18n } from "@/lib/i18n";
import { formatDuration } from "@/lib/text-utils";
import type { ProfileData } from "@/lib/profile";

type ProfileState =
  | { status: "unauthenticated" }
  | { status: "ready"; data: ProfileData };

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-default bg-surface p-4 text-center">
      <div className="text-2xl font-bold text-accent">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function ProfileView({ state }: { state: ProfileState }) {
  const { t } = useI18n();

  if (state.status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-sm rounded-2xl border border-border-default bg-surface p-6 text-center">
        <h1 className="text-xl font-bold">{t("profile.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("auth.subtitle")}
        </p>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/perfil" })}
          className="mt-5 w-full rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-strong"
        >
          {t("auth.google")}
        </button>
      </div>
    );
  }

  const { results, totals } = state.data;

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("profile.title")}
          </h1>
          <p className="mt-2 text-muted-foreground">{t("profile.subtitle")}</p>
        </div>
        <Link
          href="/practicar"
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
        >
          {t("profile.practice")}
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label={t("profile.sessions")} value={String(totals.sessions)} />
        <Metric label={t("profile.bestWpm")} value={String(totals.bestWpm)} />
        <Metric label={t("profile.avgWpm")} value={String(totals.avgWpm)} />
        <Metric
          label={t("profile.avgAccuracy")}
          value={`${totals.avgAccuracy}%`}
        />
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">{t("profile.history")}</h2>
        {results.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-border-default bg-surface-muted/50 p-6 text-center text-sm text-muted-foreground">
            {t("profile.empty")}
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-xl border border-border-default">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-surface-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">{t("profile.date")}</th>
                  <th className="px-4 py-3">{t("profile.level")}</th>
                  <th className="px-4 py-3">{t("profile.text")}</th>
                  <th className="px-4 py-3 text-right">WPM</th>
                  <th className="px-4 py-3 text-right">{t("results.accuracy")}</th>
                  <th className="px-4 py-3 text-right">{t("results.errors")}</th>
                  <th className="px-4 py-3 text-right">{t("results.time")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {results.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-medium">{row.level}</td>
                    <td className="px-4 py-3">{row.title}</td>
                    <td className="px-4 py-3 text-right font-semibold text-accent">
                      {row.wpm}
                    </td>
                    <td className="px-4 py-3 text-right">{row.accuracy}%</td>
                    <td className="px-4 py-3 text-right">{row.errors}</td>
                    <td className="px-4 py-3 text-right">
                      {formatDuration(row.seconds)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
