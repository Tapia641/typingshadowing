"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useSession } from "next-auth/react";
import type { Level, TypingText } from "@/lib/types";
import type { ComputedStats } from "@/lib/text-utils";
import { useI18n } from "@/lib/i18n";
import { TypingTrainer } from "@/components/trainer/TypingTrainer";
import { CustomTextPanel } from "@/components/trainer/CustomTextPanel";
import {
  addCompleted,
  getCompletedServerSnapshot,
  getCompletedSnapshot,
  subscribeCompleted,
} from "@/lib/completed-store";

/**
 * Experiencia de práctica de un nivel: lista de textos seleccionable,
 * seguimiento de completados, texto personalizado y la herramienta de tipeo.
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

  // Texto activo: seleccionado explícitamente, personalizado o el siguiente.
  const activeSimple: TypingText | null = useMemo(() => {
    if (customText) return customText;
    if (selectedId) return texts.find((text) => text.id === selectedId) ?? null;
    return firstAvailable ?? null;
  }, [customText, selectedId, texts, firstAvailable]);

  const activeIndex = activeSimple
    ? texts.findIndex((text) => text.id === activeSimple.id)
    : -1;
  const isLastText = activeIndex === texts.length - 1;

  const markCompleted = useCallback((id: string) => {
    addCompleted(id);
  }, []);

  const goToText = useCallback((text: TypingText) => {
    setCustomText(null);
    setSelectedId(text.id);
    requestAnimationFrame(() => {
      practiceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const goToNext = useCallback(() => {
    if (activeIndex < 0 || activeIndex >= texts.length - 1) return;
    goToText(texts[activeIndex + 1]);
  }, [activeIndex, texts, goToText]);

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
      {/* Selector de texto + texto propio */}
      <div className="mx-auto w-full max-w-3xl">
        <CustomTextPanel
          onLoad={(text) => {
            setSelectedId(null);
            setCustomText({
              id: `custom-${Date.now()}`,
              level,
              title: text.title,
              source: t("practice.customSource"),
              body: text.body,
            });
            requestAnimationFrame(() =>
              practiceRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              }),
            );
          }}
          onCancel={() => setCustomText(null)}
        />

        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {texts.map((text, index) => {
            const isActive = activeSimple?.id === text.id;
            const isDone = completed.includes(text.id);
            return (
              <li key={text.id}>
                <button
                  type="button"
                  onClick={() => goToText(text)}
                  className={
                    "flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition-colors " +
                    (isActive
                      ? "border-accent bg-accent-soft font-medium text-accent-contrast"
                      : "border-border-default bg-surface hover:border-accent hover:text-accent")
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
      </div>

      {/* Herramienta de práctica (solo lo esencial) */}
      <div ref={practiceRef} className="scroll-mt-28">
        {activeSimple ? (
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
              key={activeSimple.id}
              text={activeSimple}
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
