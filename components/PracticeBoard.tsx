"use client";

import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import type { Level, TypingText } from "@/lib/types";
import type { ComputedStats } from "@/lib/text-utils";
import { TypingTrainer } from "@/components/trainer/TypingTrainer";

/**
 * Envuelve la herramienta de tipeo y persiste el resultado en el perfil del
 * usuario autenticado (si hay sesión y base de datos).
 */
export function PracticeBoard({ level }: { level: Level }) {
  const { data: session } = useSession();
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const handleFinish = useCallback(
    async (stats: ComputedStats, text: TypingText) => {
      if (!session?.user) {
        setSaveState("idle");
        return;
      }
      setSaveState("saving");
      try {
        const res = await fetch("/api/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            level: text.level,
            textId: text.id,
            title: text.title,
            wpm: stats.wpm,
            accuracy: stats.accuracy,
            errors: stats.errors,
            seconds: stats.elapsedSeconds,
          }),
        });
        setSaveState(res.ok ? "saved" : "error");
      } catch {
        setSaveState("error");
      }
    },
    [session],
  );

  return (
    <div>
      {session?.user && saveState !== "idle" ? (
        <p
          className={
            "mb-4 text-center text-xs " +
            (saveState === "error" ? "text-red-500" : "text-muted-foreground")
          }
          role="status"
        >
          {saveState === "saving"
            ? "Guardando…"
            : saveState === "saved"
              ? "Guardado en tu perfil"
              : "No se pudo guardar el resultado"}
        </p>
      ) : null}
      <TypingTrainer initialLevel={level} onFinish={handleFinish} />
    </div>
  );
}
