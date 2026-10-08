"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useSession } from "next-auth/react";
import type { Level, TypingText } from "@/lib/types";
import type { ComputedStats } from "@/lib/text-utils";
import { useI18n } from "@/lib/i18n";
import { TypingTrainer } from "@/components/trainer/TypingTrainer";
import { TextPicker } from "@/components/trainer/TextPicker";
import {
  addCompleted,
  getCompletedServerSnapshot,
  getCompletedSnapshot,
  subscribeCompleted,
} from "@/lib/completed-store";

/**
 * Experiencia de práctica de un nivel: una única lista comprimida (textos del
 * nivel + "Agregar mi texto") y la herramienta de tipeo del ejercicio elegido.
 */
export function PracticeBoard({
  level,
  texts,
  initialTextId,
}: {
  level: Level;
  texts: TypingText[];
  initialTextId?: string;
}) {
  const { t } = useI18n();
  const { data: session } = useSession();
  const localCompleted = useSyncExternalStore(
    subscribeCompleted,
    getCompletedSnapshot,
    getCompletedServerSnapshot,
  );
  const [serverCompleted, setServerCompleted] = useState<string[]>([]);
  const completed = useMemo(
    () => Array.from(new Set([...localCompleted, ...serverCompleted])),
    [localCompleted, serverCompleted],
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    initialTextId ?? null,
  );
  const [customText, setCustomText] = useState<TypingText | null>(null);
  const [autoContinue, setAutoContinue] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const practiceRef = useRef<HTMLDivElement>(null);

  // Sincronizar completados desde el servidor si hay sesión.
  useEffect(() => {
    if (!session?.user) return;
    let active = true;
    fetch("/api/completed")
      .then((res) => (res.ok ? res.json() : { textIds: [] }))
      .then((data: { textIds: string[] }) => {
        if (active) setServerCompleted(data.textIds ?? []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [session]);

  // Primer texto no completado (o el pedido por URL).
  const firstAvailable = useMemo(() => {
    const pending = texts.find((text) => !completed.includes(text.id));
    return pending ?? texts[0];
  }, [texts, completed]);

  // Texto activo: personalizado o el seleccionado (o el siguiente pendiente).
  const activeText: TypingText | null = useMemo(() => {
    if (customText) return customText;
    if (selectedId) return texts.find((text) => text.id === selectedId) ?? null;
    return firstAvailable ?? null;
  }, [customText, selectedId, texts, firstAvailable]);

  const activeIndex = activeText
    ? texts.findIndex((text) => text.id === activeText.id)
    : -1;
  const isLastText = activeIndex === texts.length - 1;

  const markCompleted = useCallback((id: string) => {
    addCompleted(id);
  }, []);

  const scrollToPractice = useCallback(() => {
    requestAnimationFrame(() => {
      practiceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const selectText = useCallback(
    (text: TypingText) => {
      setCustomText(null);
      setSelectedId(text.id);
      scrollToPractice();
    },
    [scrollToPractice],
  );

  const loadCustom = useCallback(
    (text: { title: string; body: string }) => {
      setSelectedId(null);
      setCustomText({
        id: `custom-${Date.now()}`,
        level,
        title: text.title,
        source: t("practice.customSource"),
        body: text.body,
      });
      scrollToPractice();
    },
    [level, scrollToPractice, t],
  );

  const goToNext = useCallback(() => {
    if (activeIndex < 0 || activeIndex >= texts.length - 1) return;
    selectText(texts[activeIndex + 1]);
  }, [activeIndex, texts, selectText]);

  const handleFinish = useCallback(
    async (stats: ComputedStats, text: TypingText) => {
      markCompleted(text.id);
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
    [markCompleted, session],
  );

  return (
    <div className="space-y-6">
      {/* Única lista comprimida: textos + agregar mi texto */}
      <div className="mx-auto w-full max-w-3xl">
        <TextPicker
          level={level}
          texts={texts}
          completed={completed}
          activeId={customText ? null : (activeText?.id ?? null)}
          isCustomActive={customText !== null}
          onSelect={selectText}
          onLoadCustom={loadCustom}
        />
      </div>

      {/* Herramienta de práctica del ejercicio seleccionado */}
      <div ref={practiceRef} className="scroll-mt-28">
        {activeText ? (
          <>
            {session?.user && saveState !== "idle" ? (
              <p
                role="status"
                className={
                  "mb-3 text-center text-xs " +
                  (saveState === "error" ? "text-red-500" : "text-muted-foreground")
                }
              >
                {saveState === "saving"
                  ? t("practice.loading")
                  : saveState === "saved"
                    ? t("results.saved")
                    : t("results.saveError")}
              </p>
            ) : null}
            <TypingTrainer
              key={activeText.id}
              text={activeText}
              isLastText={isLastText}
              autoContinue={autoContinue}
              onToggleAutoContinue={setAutoContinue}
              onFinish={handleFinish}
              onContinue={goToNext}
              onSkipStats={goToNext}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
