export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface LevelMeta {
  id: Level;
  name: string;
  cefr: string;
  description: string;
}

export interface TypingText {
  id: string;
  level: Level;
  title: string;
  source: string;
  /** Texto completo que el usuario debe tipear. */
  body: string;
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctWords: number;
  errors: number;
  elapsedSeconds: number;
}
