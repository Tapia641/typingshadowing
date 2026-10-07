"use client";

import { useI18n } from "@/lib/i18n";
import type { AdminState } from "@/lib/admin";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-default bg-surface p-4 text-center">
      <div className="text-3xl font-bold text-accent">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function AdminView({ state }: { state: AdminState }) {
  const { t } = useI18n();

  if (state.status === "unauthorized") {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border-default bg-surface p-6 text-center">
        <h1 className="text-xl font-bold">{t("admin.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("admin.denied")}
        </p>
      </div>
    );
  }

  const { users, totalUsers, totalResults } = state.data;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {t("admin.title")}
      </h1>
      <p className="mt-2 text-muted-foreground">{t("admin.subtitle")}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md">
        <Metric label={t("admin.totalUsers")} value={String(totalUsers)} />
        <Metric label={t("admin.totalResults")} value={String(totalResults)} />
      </div>

      {users.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-border-default bg-surface-muted/50 p-6 text-center text-sm text-muted-foreground">
          {t("admin.noDb")}
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-border-default">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-surface-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">{t("admin.name")}</th>
                <th className="px-4 py-3">{t("admin.email")}</th>
                <th className="px-4 py-3">{t("admin.role")}</th>
                <th className="px-4 py-3">{t("admin.createdAt")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.image}
                          alt=""
                          className="h-7 w-7 rounded-full"
                        />
                      ) : (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-contrast">
                          {user.name?.[0]?.toUpperCase() ?? "?"}
                        </span>
                      )}
                      <span className="font-medium">{user.name ?? "—"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.email ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "rounded-full px-2.5 py-1 text-xs font-semibold " +
                        (user.role === "admin"
                          ? "bg-accent text-white"
                          : "bg-surface-muted text-muted-foreground")
                      }
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
