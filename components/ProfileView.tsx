"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useI18n } from "@/lib/i18n";
import { formatDuration } from "@/lib/text-utils";
import type { ProfileData } from "@/lib/profile";
import type { StreakInfo } from "@/lib/streak";

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

  const { results, totals, streak } = state.data;

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
          className="btn-accent rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm"
        >
          {t("profile.practice")}
        </Link>
      </div>

      <div className="mt-6">
        <StreakCard streak={streak} />
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

function StreakCard({ streak }: { streak: StreakInfo }) {
  const { t } = useI18n();
  const { current, best, calendar, activeToday } = streak;

  return (
    <div className="surface-card rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 text-xl text-white">
            🔥
          </span>
          <div>
            <h2 className="font-semibold">{t("profile.streak")}</h2>
            <p className="text-xs text-muted-foreground">
              {activeToday ? t("profile.streakActive") : t("profile.streakEmpty")}
            </p>
          </div>
        </div>
        <div className="flex gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent">{current}</div>
            <div className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
              {t("profile.streakCurrent")}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">{best}</div>
            <div className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
              {t("profile.streakBest")}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[0.65rem] uppercase tracking-wide text-muted-foreground">
        {t("profile.streakCalendar")}
      </p>
      <div className="mt-2 flex justify-between gap-1">
        {calendar.map((day) => (
          <span
            key={day.date}
            title={day.date}
            className={
              "flex h-8 flex-1 items-center justify-center rounded-md text-[0.65rem] font-semibold transition-colors " +
              (day.active
                ? "bg-gradient-to-t from-blue-600 to-blue-500 text-white"
                : "border border-dashed border-border-default text-muted-foreground/40") +
              (day.isToday ? " ring-2 ring-ring ring-offset-1 ring-offset-surface" : "")
            }
          >
            {new Date(day.date + "T00:00:00").getDate()}
          </span>
        ))}
      </div>
    </div>
  );
}
