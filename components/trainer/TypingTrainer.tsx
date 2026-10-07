"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { LEVELS } from "@/lib/levels";
import { getTextsByLevel } from "@/lib/texts";
import type { Level, TypingText } from "@/lib/types";
import {
  computeKeystrokeStats,
  formatDuration,
  tokenize,
  type ComputedStats,
} from "@/lib/text-utils";
import { isSpeechSupported, primeVoices, speak, stopSpeaking } from "@/lib/speech";
import { hasError, playKeySound } from "@/lib/typing-sound";
import { useI18n } from "@/lib/i18n";
import { AdSlot } from "@/components/AdSlot";
import { WordsDisplay } from "./WordsDisplay";
import { CurrentWordCard } from "./CurrentWordCard";
import { VirtualKeyboard } from "./VirtualKeyboard";
import { ResultsModal } from "./ResultsModal";

type Status = "idle" | "running" | "finished";

const noopSubscribe = () => () => {};

function useSpeechSupported(): boolean {
  return useSyncExternalStore(noopSubscribe, isSpeechSupported, () => false);
}

interface TypingTrainerProps {
  initialLevel?: Level;
  /** Se llama al completar un texto, con las estadísticas finales. */
  onFinish?: (stats: ComputedStats, text: TypingText) => void;
}

export function TypingTrainer({
  initialLevel = "A1",
  onFinish,
}: TypingTrainerProps) {
  const { t } = useI18n();
  const [level, setLevel] = useState<Level>(initialLevel);
  const [textIndex, setTextIndex] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [totalKeys, setTotalKeys] = useState(0);
  const [correctKeys, setCorrectKeys] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [autoContinue, setAutoContinue] = useState(false);
  const [hideStats, setHideStats] = useState(false);
  const speechSupported = useSpeechSupported();

  const inputRef = useRef<HTMLInputElement>(null);
  const startedAtRef = useRef<number | null>(null);
  const totalKeysRef = useRef(0);
  const correctKeysRef = useRef(0);
  const errorsRef = useRef(0);
  const levelTexts = useMemo(() => getTextsByLevel(level), [level]);
  const activeText = levelTexts[textIndex] ?? levelTexts[0];
  const words = useMemo(() => tokenize(activeText.body), [activeText]);
  const isLastText = textIndex === levelTexts.length - 1;
  const targetWord = words[currentIndex]?.core ?? "";
  const locked = status !== "finished" && hasError(typed, targetWord);

  useEffect(() => {
    primeVoices();
    return () => stopSpeaking();
  }, []);

  useEffect(() => {
    if (status !== "running" || startedAt === null) return;
    const id = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 500);
    return () => window.clearInterval(id);
  }, [status, startedAt]);

  const resetRun = useCallback(() => {
    stopSpeaking();
    setStatus("idle");
    setCurrentIndex(0);
    setTyped("");
    setTotalKeys(0);
    setCorrectKeys(0);
    setErrors(0);
    totalKeysRef.current = 0;
    correctKeysRef.current = 0;
    errorsRef.current = 0;
    setStartedAt(null);
    startedAtRef.current = null;
    setElapsedSeconds(0);
    setShowResults(false);
    inputRef.current?.focus();
  }, []);

  const loadText = useCallback(
    (index: number) => {
      const count = levelTexts.length;
      const safeIndex = ((index % count) + count) % count;
      setTextIndex(safeIndex);
      resetRun();
    },
    [levelTexts.length, resetRun],
  );

  const goToLevel = useCallback(
    (next: Level) => {
      setLevel(next);
      setTextIndex(0);
      resetRun();
    },
    [resetRun],
  );

  const finish = useCallback(() => {
    setStatus("finished");
    stopSpeaking();
    const elapsed =
      startedAtRef.current === null
        ? 1
        : Math.max(Date.now() - startedAtRef.current, 1);
    onFinish?.(
      computeKeystrokeStats({
        totalKeystrokes: totalKeysRef.current,
        correctKeystrokes: correctKeysRef.current,
        errors: errorsRef.current,
        elapsedMs: elapsed,
      }),
      activeText,
    );

    // Si el usuario pidió no ver estadísticas, se avanza directo al siguiente
    // texto; las estadísticas se muestran siempre en el último texto.
    if (hideStats && !isLastText) {
      window.setTimeout(() => loadText(textIndex + 1), 500);
    } else {
      setShowResults(true);
    }
  }, [activeText, hideStats, isLastText, loadText, onFinish, textIndex]);

  const completeCurrentWord = useCallback(() => {
    setTyped("");
    if (currentIndex >= words.length - 1) {
      finish();
    } else {
      setCurrentIndex((index) => index + 1);
    }
  }, [currentIndex, finish, words.length]);

  const attemptAdvanceWord = useCallback(() => {
    if (typed.toLowerCase() === targetWord.toLowerCase() && targetWord) {
      completeCurrentWord();
    } else {
      playKeySound("error");
    }
  }, [completeCurrentWord, targetWord, typed]);

  const registerKeystroke = useCallback(
    (typedChar: string, expectedChar: string | undefined) => {
      totalKeysRef.current += 1;
      setTotalKeys(totalKeysRef.current);
      if (expectedChar && typedChar.toLowerCase() === expectedChar.toLowerCase()) {
        correctKeysRef.current += 1;
        setCorrectKeys(correctKeysRef.current);
        playKeySound("click");
        return true;
      }
      errorsRef.current += 1;
      setErrors(errorsRef.current);
      playKeySound("error");
      return false;
    },
    [],
  );

  const handleChange = useCallback(
    (raw: string) => {
      if (status === "finished") return;
      const target = words[currentIndex]?.core ?? "";
      if (!target) return;

      if (status === "idle" && raw.length > 0) {
        setStatus("running");
        startedAtRef.current = Date.now();
        setStartedAt(startedAtRef.current);
      }

      // Confirmar con espacio.
      if (/\s$/.test(raw)) {
        attemptAdvanceWord();
        return;
      }

      // Borrar (permite corregir la letra errónea).
      if (raw.length < typed.length) {
        setTyped(raw);
        return;
      }

      // Bloqueo: si ya hay un error sin corregir, no se admite más texto.
      if (locked && raw.length > typed.length) {
        playKeySound("error");
        return;
      }

      if (raw.length > typed.length) {
        // Solo un carácter nuevo por evento.
        const next = typed + raw.slice(typed.length, typed.length + 1);
        const expectedChar = target[next.length - 1];
        const typedChar = next[next.length - 1];
        registerKeystroke(typedChar, expectedChar);
        setTyped(next);

        // Pronunciación en el instante en que la palabra queda completa.
        if (
          next.toLowerCase() === target.toLowerCase() &&
          currentIndex === words.length - 1
        ) {
          speak(target);
          finish();
        } else if (next.toLowerCase() === target.toLowerCase()) {
          speak(target);
        }
      }
    },
    [
      attemptAdvanceWord,
      currentIndex,
      finish,
      locked,
      registerKeystroke,
      status,
      typed,
      words,
    ],
  );

  // Auto-continuar tras finalizar, para el flujo sin pausas.
  useEffect(() => {
    if (!showResults || !autoContinue) return;
    const id = window.setTimeout(() => loadText(textIndex + 1), 2500);
    return () => window.clearTimeout(id);
  }, [showResults, autoContinue, loadText, textIndex]);

  const stats: ComputedStats = useMemo(
    () =>
      computeKeystrokeStats({
        totalKeystrokes: totalKeys,
        correctKeystrokes: correctKeys,
        errors,
        elapsedMs: Math.max(elapsedSeconds * 1000, 1000),
      }),
    [totalKeys, correctKeys, errors, elapsedSeconds],
  );

  const nextChar =
    status === "finished"
      ? null
      : locked
        ? "Backspace"
        : typed.length < words[currentIndex]?.core.length
          ? (words[currentIndex]?.core[typed.length] ?? null)
          : typed.toLowerCase() === targetWord.toLowerCase() && targetWord
            ? " "
            : null;

  return (
    <div className="w-full">
      {/* Pestañas de nivel MCER */}
      <div
        role="tablist"
        aria-label="Selecciona tu nivel MCER"
        className="mx-auto mb-6 flex max-w-2xl flex-wrap justify-center gap-1.5 rounded-2xl border border-border-default bg-surface p-1.5"
      >
        {LEVELS.map((item) => {
          const active = item.id === level;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={active}
              onClick={() => goToLevel(item.id)}
              title={item.description}
              className={
                "flex flex-1 flex-col items-center rounded-xl px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring " +
                (active
                  ? "bg-accent text-white"
                  : "text-muted-foreground hover:bg-surface-muted hover:text-foreground")
              }
            >
              <span className="font-semibold">{item.id}</span>
              <span className="hidden text-[0.65rem] sm:block">{item.name}</span>
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-3xl">
        {/* Barra de contexto + estadísticas en vivo */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{activeText.title}</span>
          <span>
            {t("practice.text")} {textIndex + 1}/{levelTexts.length} ·{" "}
            {activeText.source}
          </span>
        </div>

        <div className="mb-4 grid grid-cols-4 gap-2 text-center">
          <LiveStat label="WPM" value={String(stats.wpm)} />
          <LiveStat label={t("results.accuracy")} value={`${stats.accuracy}%`} />
          <LiveStat
            label={t("results.time")}
            value={formatDuration(elapsedSeconds)}
          />
          <LiveStat
            label={t("practice.text")}
            value={`${Math.min(currentIndex, words.length)}/${words.length}`}
          />
        </div>

        <CurrentWordCard
          word={status === "finished" ? null : words[currentIndex]}
          typed={typed}
          isError={locked}
          speechSupported={speechSupported}
          labels={{
            current: t("practice.current"),
            completed: t("practice.completed"),
            write: t("practice.write"),
            listen: t("practice.listen"),
            wrongLetter: t("practice.wrongLetter"),
          }}
        />

        {/* Área de texto para shadowing, centrada */}
        <div className="mt-4 rounded-2xl border border-border-default bg-surface p-4 text-center sm:p-6">
          <WordsDisplay
            words={words}
            currentIndex={currentIndex}
            status={status}
            variant="shadowing"
          />
        </div>

        {/* Entrada estricta */}
        <div className="mt-4">
          <label htmlFor="typing-input" className="sr-only">
            {t("practice.current")}
          </label>
          <input
            id="typing-input"
            ref={inputRef}
            value={typed}
            onChange={(event) => handleChange(event.target.value)}
            onBlur={(event) => event.currentTarget.focus()}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            inputMode="text"
            disabled={status === "finished"}
            placeholder={t("practice.placeholder")}
            aria-label={t("practice.current")}
            className={
              "w-full rounded-xl border bg-surface px-4 py-3 text-center font-mono text-lg outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent " +
              (locked ? "border-red-400 text-red-500" : "border-border-default")
            }
          />
          {locked ? (
            <p role="alert" className="mt-2 text-center text-xs font-medium text-red-500">
              {t("practice.wrongLetter")}
            </p>
          ) : (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {t("practice.strict")}
            </p>
          )}
        </div>

        {/* Teclado virtual guía */}
        <div className="mt-5 hidden sm:block">
          <VirtualKeyboard nextChar={nextChar} />
        </div>

        {/* Progreso + controles */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={words.length}
            aria-valuenow={currentIndex}
            aria-label={t("practice.progress")}
          >
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{
                width: `${words.length ? (currentIndex / words.length) * 100 : 0}%`,
              }}
            />
          </div>
          {hideStats ? (
            <button
              type="button"
              onClick={() => setHideStats(false)}
              className="rounded-lg border border-border-default px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t("practice.showStats")}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => loadText(textIndex)}
            className="rounded-lg border border-border-default px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {t("practice.reset")}
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <AdSlot format="horizontal" label="Publicidad" />
      </div>

      <ResultsModal
        open={showResults}
        stats={stats}
        isLastText={isLastText}
        autoContinue={autoContinue}
        onToggleAutoContinue={setAutoContinue}
        onContinue={() => loadText(textIndex + 1)}
        onSkipStats={() => {
          setHideStats(true);
          setShowResults(false);
          loadText(textIndex + 1);
        }}
        onClose={() => setShowResults(false)}
      />
    </div>
  );
}

function LiveStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-default bg-surface px-2 py-2">
      <div className="text-lg font-bold text-accent sm:text-xl">{value}</div>
      <div className="text-[0.6rem] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
