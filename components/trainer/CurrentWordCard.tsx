"use client";

import type { WordToken } from "@/lib/text-utils";
import { speak } from "@/lib/speech";

interface CurrentWordCardProps {
  word: WordToken | null;
  typed: string;
  isError: boolean;
  speechSupported: boolean;
  labels: {
    current: string;
    completed: string;
    write: string;
    listen: string;
    wrongLetter: string;
  };
}

/**
 * Tarjeta enfocada con la palabra actual en grande, feedback carácter a
 * carácter y un botón para reescucharla.
 */
export function CurrentWordCard({
  word,
  typed,
  isError,
  speechSupported,
  labels,
}: CurrentWordCardProps) {
  if (!word) {
    return (
      <div
        role="status"
        className="flex min-h-36 flex-col items-center justify-center rounded-2xl border border-border-default bg-surface p-6 text-center"
      >
        <span className="text-3xl" aria-hidden="true">
          🎉
        </span>
        <p className="mt-2 text-sm text-muted-foreground">{labels.completed}</p>
      </div>
    );
  }

  const typedLower = typed.toLowerCase();
  const coreLower = word.core.toLowerCase();

  return (
    <div
      className={
        "flex min-h-36 flex-col items-center justify-center gap-2 rounded-2xl border bg-surface p-6 text-center transition-colors " +
        (isError ? "border-red-400" : "border-border-default")
      }
    >
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {labels.current}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="flex items-baseline text-4xl font-bold tracking-tight sm:text-5xl">
          {word.prefix}
          {word.core.split("").map((char, index) => {
            if (index >= typed.length) {
              return (
                <span key={index} className="text-muted-foreground/40">
                  {char}
                </span>
              );
            }
            const isCorrectChar =
              typedLower[index] === coreLower[index];
            return (
              <span
                key={index}
                className={isCorrectChar ? "text-accent" : "text-red-500 underline"}
              >
                {char}
              </span>
            );
          })}
          {word.suffix}
        </span>
        {speechSupported ? (
          <button
            type="button"
            onClick={() => speak(word.core)}
            aria-label={`${labels.listen} ${word.core}`}
            className="rounded-full border border-border-default p-2 text-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            🔊
          </button>
        ) : null}
      </div>
      <p className="font-mono text-sm text-muted-foreground">
        {labels.write}:{" "}
        <span className="tracking-[0.3em] text-foreground">
          {word.core.split("").join(" ")}
        </span>
      </p>
      {isError ? (
        <p role="alert" className="text-xs font-medium text-red-500">
          {labels.wrongLetter}
        </p>
      ) : null}
    </div>
  );
}
