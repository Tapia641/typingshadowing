"use client";

import { useState } from "react";
import type { Level, TypingText } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

interface TextPickerProps {
  level: Level;
  texts: TypingText[];
  completed: string[];
  activeId: string | null;
  isCustomActive: boolean;
  onSelect: (text: TypingText) => void;
  onLoadCustom: (text: { title: string; body: string }) => void;
}

/**
 * Lista comprimida de ejercicios: un desplegable que agrupa "Agregar mi texto"
 * y los textos del nivel. La selección define el ejercicio que se muestra.
 */
export function TextPicker({
  level,
  texts,
  completed,
  activeId,
  isCustomActive,
  onSelect,
  onLoadCustom,
}: TextPickerProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [customError, setCustomError] = useState(false);

  const active = texts.find((text) => text.id === activeId) ?? null;
  const activeLabel = isCustomActive
    ? t("practice.customTitle")
    : (active?.title ?? t("practice.selectText"));

  function loadCustom() {
    const body = customValue.trim().replace(/\s+/g, " ");
    if (body.length < 3) {
      setCustomError(true);
      return;
    }
    setCustomError(false);
    const shortTitle =
      body.split(" ").slice(0, 6).join(" ") +
      (body.split(" ").length > 6 ? "…" : "");
    onLoadCustom({ title: shortTitle, body });
    setShowCustom(false);
    setCustomValue("");
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-border-default bg-surface px-4 py-3 text-left text-sm transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-contrast">
            {level}
          </span>
          <span className="truncate font-medium">{activeLabel}</span>
        </span>
        <span aria-hidden="true" className="shrink-0 text-muted-foreground">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open ? (
        <div className="animate-pop-in absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-border-default bg-surface shadow-lg">
          <ul
            role="listbox"
            className="max-h-72 overflow-y-auto py-1"
            aria-label={t("practice.selectText")}
          >
            {texts.map((text, index) => {
              const isActive = text.id === activeId;
              const isDone = completed.includes(text.id);
              return (
                <li key={text.id} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(text);
                      setShowCustom(false);
                      setOpen(false);
                    }}
                    className={
                      "flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors " +
                      (isActive
                        ? "bg-accent-soft font-medium text-accent-contrast"
                        : "hover:bg-surface-muted")
                    }
                  >
                    <span
                      className={
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
                        (isDone
                          ? "bg-accent text-white"
                          : "bg-surface-muted text-muted-foreground")
                      }
                      aria-hidden="true"
                    >
                      {isDone ? "✓" : index + 1}
                    </span>
                    <span className="truncate">{text.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Agregar mi texto, en la misma lista */}
          <div className="border-t border-border-default">
            {!showCustom ? (
              <button
                type="button"
                onClick={() => setShowCustom(true)}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-dashed border-accent text-xs"
                  aria-hidden="true"
                >
                  ＋
                </span>
                {t("practice.addOwn")}
              </button>
            ) : (
              <div className="p-3">
                <label className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("practice.addOwnTitle")}
                </label>
                <textarea
                  value={customValue}
                  onChange={(event) => {
                    setCustomValue(event.target.value);
                    if (customError) setCustomError(false);
                  }}
                  rows={4}
                  placeholder={t("practice.addOwnPlaceholder")}
                  className={
                    "w-full resize-y rounded-xl border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent " +
                    (customError ? "border-red-400" : "border-border-default")
                  }
                />
                {customError ? (
                  <p role="alert" className="mt-1 text-xs font-medium text-red-500">
                    {t("practice.addOwnEmpty")}
                  </p>
                ) : null}
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={loadCustom}
                    className="btn-accent rounded-lg px-4 py-2 text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {t("practice.addOwnLoad")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustom(false);
                      setCustomError(false);
                    }}
                    className="rounded-lg border border-border-default px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {t("practice.addOwnCancel")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
