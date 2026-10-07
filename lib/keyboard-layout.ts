export type FingerId =
  | "lPinky"
  | "lRing"
  | "lMiddle"
  | "lIndex"
  | "thumb"
  | "rIndex"
  | "rMiddle"
  | "rRing"
  | "rPinky";

export interface KeyDef {
  /** Etiqueta visible en la tecla. */
  label: string;
  /** Carácter que produce (minúscula) para casar con la siguiente letra. */
  char?: string;
  finger?: FingerId;
  /** Ancho en unidades (1 = tecla estándar). */
  width: number;
  /** Clase especial para teclas modificadoras. */
  modifier?: boolean;
  /** Tecla de la fila guía (F y J llevan marca táctil). */
  home?: boolean;
}

/** Color por dedo (para el teclado y las manos guía). */
export const FINGER_COLORS: Record<FingerId, string> = {
  lPinky: "#c084fc",
  lRing: "#60a5fa",
  lMiddle: "#34d399",
  lIndex: "#fbbf24",
  thumb: "#fb7185",
  rIndex: "#fb923c",
  rMiddle: "#2dd4bf",
  rRing: "#818cf8",
  rPinky: "#e879f9",
};

export const FINGER_LABEL_KEY: Record<FingerId, string> = {
  lPinky: "finger.lPinky",
  lRing: "finger.lRing",
  lMiddle: "finger.lMiddle",
  lIndex: "finger.lIndex",
  thumb: "finger.thumb",
  rIndex: "finger.rIndex",
  rMiddle: "finger.rMiddle",
  rRing: "finger.rRing",
  rPinky: "finger.rPinky",
};

/**
 * Distribución de un teclado de laptop 13" (sin teclado numérico) con la
 * asignación de dedos de mecanografía estándar.
 */
export const KEY_ROWS: KeyDef[][] = [
  // Fila de números
  [
    { label: "`", char: "`", finger: "lPinky", width: 1 },
    { label: "1", char: "1", finger: "lPinky", width: 1 },
    { label: "2", char: "2", finger: "lRing", width: 1 },
    { label: "3", char: "3", finger: "lMiddle", width: 1 },
    { label: "4", char: "4", finger: "lIndex", width: 1 },
    { label: "5", char: "5", finger: "lIndex", width: 1 },
    { label: "6", char: "6", finger: "rIndex", width: 1 },
    { label: "7", char: "7", finger: "rIndex", width: 1 },
    { label: "8", char: "8", finger: "rMiddle", width: 1 },
    { label: "9", char: "9", finger: "rRing", width: 1 },
    { label: "0", char: "0", finger: "rPinky", width: 1 },
    { label: "-", char: "-", finger: "rPinky", width: 1 },
    { label: "=", char: "=", finger: "rPinky", width: 1 },
    { label: "⌫", finger: "rPinky", width: 2, modifier: true },
  ],
  // Fila QWERTY
  [
    { label: "Tab", width: 1.5, modifier: true, finger: "lPinky" },
    { label: "Q", char: "q", finger: "lPinky", width: 1 },
    { label: "W", char: "w", finger: "lRing", width: 1 },
    { label: "E", char: "e", finger: "lMiddle", width: 1 },
    { label: "R", char: "r", finger: "lIndex", width: 1 },
    { label: "T", char: "t", finger: "lIndex", width: 1 },
    { label: "Y", char: "y", finger: "rIndex", width: 1 },
    { label: "U", char: "u", finger: "rIndex", width: 1 },
    { label: "I", char: "i", finger: "rMiddle", width: 1 },
    { label: "O", char: "o", finger: "rRing", width: 1 },
    { label: "P", char: "p", finger: "rPinky", width: 1 },
    { label: "[", char: "[", finger: "rPinky", width: 1 },
    { label: "]", char: "]", finger: "rPinky", width: 1 },
    { label: "\\", char: "\\", finger: "rPinky", width: 1.5, modifier: true },
  ],
  // Fila home (A S D F)
  [
    { label: "Caps", width: 1.75, modifier: true, finger: "lPinky" },
    { label: "A", char: "a", finger: "lPinky", width: 1, home: true },
    { label: "S", char: "s", finger: "lRing", width: 1, home: true },
    { label: "D", char: "d", finger: "lMiddle", width: 1, home: true },
    { label: "F", char: "f", finger: "lIndex", width: 1, home: true },
    { label: "G", char: "g", finger: "lIndex", width: 1 },
    { label: "H", char: "h", finger: "rIndex", width: 1 },
    { label: "J", char: "j", finger: "rIndex", width: 1, home: true },
    { label: "K", char: "k", finger: "rMiddle", width: 1, home: true },
    { label: "L", char: "l", finger: "rRing", width: 1, home: true },
    { label: ";", char: ";", finger: "rPinky", width: 1, home: true },
    { label: "'", char: "'", finger: "rPinky", width: 1 },
    { label: "Enter", width: 2.25, modifier: true, finger: "rPinky" },
  ],
  // Fila inferior
  [
    { label: "Shift", width: 2.25, modifier: true, finger: "lPinky" },
    { label: "Z", char: "z", finger: "lPinky", width: 1 },
    { label: "X", char: "x", finger: "lRing", width: 1 },
    { label: "C", char: "c", finger: "lMiddle", width: 1 },
    { label: "V", char: "v", finger: "lIndex", width: 1 },
    { label: "B", char: "b", finger: "lIndex", width: 1 },
    { label: "N", char: "n", finger: "rIndex", width: 1 },
    { label: "M", char: "m", finger: "rIndex", width: 1 },
    { label: ",", char: ",", finger: "rMiddle", width: 1 },
    { label: ".", char: ".", finger: "rRing", width: 1 },
    { label: "/", char: "/", finger: "rPinky", width: 1 },
    { label: "Shift", width: 2.75, modifier: true, finger: "rPinky" },
  ],
  // Barra espaciadora
  [
    { label: "Ctrl", width: 1.25, modifier: true, finger: "lPinky" },
    { label: "Fn", width: 1.25, modifier: true, finger: "lPinky" },
    { label: "Alt", width: 1.25, modifier: true, finger: "thumb" },
    { label: "Space", char: " ", finger: "thumb", width: 6.5, modifier: true },
    { label: "Alt", width: 1.25, modifier: true, finger: "thumb" },
    { label: "Fn", width: 1.25, modifier: true, finger: "rPinky" },
    { label: "Ctrl", width: 1.25, modifier: true, finger: "rPinky" },
  ],
];

/** Devuelve el dedo asignado a una tecla objetivo (letra, espacio o Backspace). */
export function fingerForKey(key: string | null): FingerId | null {
  if (!key) return null;
  if (key === "Backspace") return "rPinky";
  const lower = key.toLowerCase();
  for (const row of KEY_ROWS) {
    for (const def of row) {
      if (def.char === lower) return def.finger ?? null;
    }
  }
  return null;
}
