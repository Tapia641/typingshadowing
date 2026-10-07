import type { Level, LevelMeta } from "./types";

export const LEVELS: LevelMeta[] = [
  {
    id: "A1",
    name: "Principiante",
    cefr: "A1",
    description: "Frases simples y vocabulario cotidiano para empezar.",
  },
  {
    id: "A2",
    name: "Elemental",
    cefr: "A2",
    description: "Oraciones cortas sobre rutinas y situaciones conocidas.",
  },
  {
    id: "B1",
    name: "Intermedio",
    cefr: "B1",
    description: "Párrafos claros sobre temas familiares y de interés.",
  },
  {
    id: "B2",
    name: "Intermedio alto",
    cefr: "B2",
    description: "Textos detallados con ideas y argumentos más variados.",
  },
  {
    id: "C1",
    name: "Avanzado",
    cefr: "C1",
    description: "Prosa fluida con vocabulario rico y estructuras complejas.",
  },
  {
    id: "C2",
    name: "Maestría",
    cefr: "C2",
    description: "Lenguaje literario preciso, sutil y de alta exigencia.",
  },
];

export function isLevel(value: string): value is Level {
  return LEVELS.some((level) => level.id === value);
}

export function getLevelMeta(level: Level): LevelMeta {
  return LEVELS.find((item) => item.id === level) ?? LEVELS[0];
}
