"use client";

import { useEffect, useRef } from "react";
import type { ComputedStats } from "@/lib/text-utils";
import { formatDuration } from "@/lib/text-utils";
import { useI18n } from "@/lib/i18n";
import { AdSlot } from "@/components/AdSlot";

interface ResultsModalProps {
  open: boolean;
  stats: ComputedStats;
  isLastText: boolean;
  autoContinue: boolean;
  onToggleAutoContinue: (value: boolean) => void;
  onContinue: () => void;
  onSkipStats: () => void;
  onClose: () => void;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-default bg-surface-muted/50 p-3 text-center">
      <div className="text-2xl font-bold text-accent">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function ResultsModal({
  open,
  stats,
  isLastText,
  autoContinue,
  onToggleAutoContinue,
  onContinue,
  onSkipStats,
  onClose,
}: ResultsModalProps) {
  const { t } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isFinal = isLastText;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="results-title"
    >
      <div className="animate-pop-in w-full max-w-md rounded-2xl border border-border-default bg-surface p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="results-title" className="text-lg font-semibold">
              {isFinal ? t("results.titleFinal") : t("results.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isFinal ? t("results.subtitleFinal") : t("results.subtitle")}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("results.close")}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric label={t("results.wpm")} value={String(stats.wpm)} />
          <Metric label={t("results.accuracy")} value={`${stats.accuracy}%`} />
          <Metric label={t("results.errors")} value={String(stats.errors)} />
          <Metric
            label={t("results.time")}
            value={formatDuration(stats.elapsedSeconds)}
          />
        </div>

        <div className="mt-5">
          <AdSlot format="popup" label="Sigue practicando gratis" />
        </div>

        <label className="mt-5 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border-default bg-surface-muted/50 p-3">
          <span className="text-sm">{t("results.auto")}</span>
          <input
            type="checkbox"
            checked={autoContinue}
            onChange={(event) => onToggleAutoContinue(event.target.checked)}
            className="h-5 w-9 cursor-pointer appearance-none rounded-full bg-border-default transition-colors checked:bg-accent"
          />
        </label>

        <button
          type="button"
          onClick={onContinue}
          className="btn-accent mt-4 w-full rounded-lg px-5 py-3 font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {t("results.continue")}
        </button>

        {!isFinal ? (
          <button
            type="button"
            onClick={onSkipStats}
            className="mt-2 w-full rounded-xl border border-border-default px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {t("results.skipStats")}
          </button>
        ) : null}
      </div>
    </div>
  );
}
