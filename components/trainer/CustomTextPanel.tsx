"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

interface CustomTextPanelProps {
  onLoad: (text: { title: string; body: string }) => void;
  onCancel: () => void;
}

/**
 * Permite pegar un texto propio en inglés y practicarlo. Al cargarlo, se pasa
 * a la herramienta de tipeo como un texto más.
 */
export function CustomTextPanel({ onLoad, onCancel }: CustomTextPanelProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function load() {
    const body = value.trim().replace(/\s+/g, " ");
    if (body.length < 3) {
      setError(true);
      return;
    }
    setError(false);
    const title =
      body.split(" ").slice(0, 6).join(" ") + (body.split(" ").length > 6 ? "…" : "");
    onLoad({ title, body });
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-dashed border-border-default bg-surface px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span aria-hidden="true">＋</span>
        {t("practice.addOwn")}
      </button>
    );
  }

  return (
    <div className="surface-card animate-pop-in rounded-2xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold">{t("practice.addOwnTitle")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("practice.addOwnHint")}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError(false);
            onCancel();
          }}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={t("practice.addOwnCancel")}
        >
          ✕
        </button>
      </div>

      <textarea
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          if (error) setError(false);
        }}
        rows={5}
        placeholder={t("practice.addOwnPlaceholder")}
        className={
          "mt-3 w-full resize-y rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent " +
          (error ? "border-red-400" : "border-border-default")
        }
      />
      {error ? (
        <p role="alert" className="mt-1 text-xs font-medium text-red-500">
          {t("practice.addOwnEmpty")}
        </p>
      ) : null}

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={load}
          className="btn-accent rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {t("practice.addOwnLoad")}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError(false);
            onCancel();
          }}
          className="rounded-lg border border-border-default px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {t("practice.addOwnCancel")}
        </button>
      </div>
    </div>
  );
}
