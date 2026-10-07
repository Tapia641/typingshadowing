import type { WordToken } from "@/lib/text-utils";

interface WordsDisplayProps {
  words: WordToken[];
  currentIndex: number;
  status: "idle" | "running" | "finished";
  variant?: "preview" | "shadowing";
}

/**
 * Renderiza el texto con tres estados visuales:
 * - completadas: resaltadas
 * - actual: en negrita y destacada
 * - restantes: en gris tenue
 */
export function WordsDisplay({
  words,
  currentIndex,
  status,
  variant = "preview",
}: WordsDisplayProps) {
  return (
    <p
      className={
        variant === "shadowing"
          ? "text-lg leading-relaxed sm:text-xl sm:leading-relaxed"
          : "text-base leading-relaxed sm:text-lg"
      }
      aria-live="polite"
    >
      {words.map((word, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex && status !== "finished";
        const isPending = index > currentIndex;

        return (
          <span key={`${word.display}-${index}`}>
            <span
              className={
                isDone
                  ? "text-accent"
                  : isCurrent
                    ? "rounded bg-accent-soft px-1 font-bold text-accent-contrast ring-2 ring-accent"
                    : isPending
                      ? "text-muted-foreground/60"
                      : ""
              }
            >
              {word.prefix}
              {word.core}
              {word.suffix}
            </span>{" "}
          </span>
        );
      })}
    </p>
  );
}
