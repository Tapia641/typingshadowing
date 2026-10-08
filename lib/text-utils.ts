export interface WordToken {
  /** Texto tal cual se muestra (conserva puntuación: "milk.", "home,"). */
  display: string;
  /** Núcleo que el usuario debe teclear: "milk", "home". */
  core: string;
  /** Puntuación inicial que no se teclea. */
  prefix: string;
  /** Puntuación final que no se teclea. */
  suffix: string;
}

const EDGE_PUNCTUATION = /^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g;

/**
 * Divide un texto en tokens de palabra. La puntuación se separa del núcleo
 * para que la validación estricta solo exija el núcleo de la palabra.
 */
export function tokenize(text: string): WordToken[] {
  return text
    .split(/\s+/)
    .filter((piece) => piece.length > 0)
    .map((piece) => {
      const trimmedStart = piece.replace(/^[^A-Za-z0-9']+/, "");
      const prefix = piece.slice(0, piece.length - trimmedStart.length);
      const coreOnly = trimmedStart.replace(/[^A-Za-z0-9']+$/, "");
      const suffix = trimmedStart.slice(coreOnly.length);
      return { display: piece, core: coreOnly, prefix, suffix };
    });
}

export function normalizeInput(value: string): string {
  return value.trim().toLowerCase().replace(EDGE_PUNCTUATION, "");
}

/**
 * Divide un texto en oraciones. Conserva la puntuación final (. ! ? …) y une
 * fragmentos que empiezan en minúscula o dígito con la oración anterior para
 * no cortar abreviaturas sencillas.
 */
export function splitSentences(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const parts = trimmed.match(/[^.!?…]+[.!?…]+(\s+|$)|[^.!?…]+$/g) ?? [trimmed];
  const sentences: string[] = [];

  for (const part of parts) {
    const clean = part.trim();
    if (!clean) continue;
    const startsLower = /^[a-z0-9]/.test(clean);
    if (sentences.length > 0 && startsLower) {
      sentences[sentences.length - 1] += " " + clean;
    } else {
      sentences.push(clean);
    }
  }

  return sentences.length > 0 ? sentences : [trimmed];
}

export interface TypingStatsInput {
  correctWords: number;
  errors: number;
  elapsedMs: number;
}

export interface ComputedStats {
  wpm: number;
  accuracy: number;
  correctWords: number;
  errors: number;
  elapsedSeconds: number;
}

/**
 * Estadísticas estilo mecanografía: WPM derivado de pulsaciones correctas
 * (1 palabra = 5 caracteres) y precisión = correctas / totales.
 */
export interface KeystrokeStatsInput {
  totalKeystrokes: number;
  correctKeystrokes: number;
  errors: number;
  elapsedMs: number;
}

export function computeKeystrokeStats({
  totalKeystrokes,
  correctKeystrokes,
  errors,
  elapsedMs,
}: KeystrokeStatsInput): ComputedStats {
  const seconds = Math.max(Math.round(elapsedMs / 1000), 0);
  const minutes = Math.max(elapsedMs, 1) / 60000;
  const words = correctKeystrokes / 5;
  const wpm = Math.max(0, Math.round(words / minutes));
  const accuracy =
    totalKeystrokes === 0
      ? 100
      : Math.min(
          100,
          Math.max(0, Math.round((correctKeystrokes / totalKeystrokes) * 100)),
        );
  return {
    wpm,
    accuracy,
    correctWords: correctKeystrokes,
    errors,
    elapsedSeconds: seconds,
  };
}

export function computeStats({
  correctWords,
  errors,
  elapsedMs,
}: TypingStatsInput): ComputedStats {
  const minutes = Math.max(elapsedMs, 1) / 60000;
  const wpm = Math.round(correctWords / minutes);
  const attempts = correctWords + errors;
  const accuracy =
    attempts === 0 ? 100 : Math.round((correctWords / attempts) * 100);
  return {
    wpm,
    accuracy,
    correctWords,
    errors,
    elapsedSeconds: Math.round(elapsedMs / 1000),
  };
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
