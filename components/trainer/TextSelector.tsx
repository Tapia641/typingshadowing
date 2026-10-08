"use client";

import { useState } from "react";
import type { TypingText } from "@/lib/types";

interface TextSelectorProps {
  label: string;
  texts: TypingText[];
  value: string;
  onChange: (id: string) => void;
}

/**
 * Selector de texto por título dentro del nivel actual. En pantallas grandes
 * muestra una lista desplegable; el índice se conserva al cambiar de nivel.
 */
export function TextSelector({
  label,
  texts,
  value,
  onChange,
}: TextSelectorProps) {
  const [open, setOpen] = useState(false);
  const active = texts.find((text) => text.id === value) ?? texts[0];

  return (
    <div className="relative mb-3">
      <label className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-border-default bg-surface px-4 py-2.5 text-left text-sm transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="truncate font-medium">{active?.title}</span>
        <span aria-hidden="true" className="text-muted-foreground">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open ? (
        <ul
          role="listbox"
          className="animate-pop-in absolute z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-xl border border-border-default bg-surface py-1 shadow-lg"
        >
          {texts.map((text, index) => {
            const isActive = text.id === value;
            return (
              <li key={text.id} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(text.id);
                    setOpen(false);
                  }}
                  className={
                    "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors " +
                    (isActive
                      ? "bg-accent-soft font-medium text-accent-contrast"
                      : "hover:bg-surface-muted")
                  }
                >
                  <span className="w-5 shrink-0 text-right text-xs text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="truncate">{text.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
