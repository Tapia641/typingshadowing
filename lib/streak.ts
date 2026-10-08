/** Fecha local en formato YYYY-MM-DD (sin depender de la zona UTC). */
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export interface StreakInfo {
  /** Días consecutivos hasta hoy (o hasta el último día practicado). */
  current: number;
  /** Racha más larga alcanzada. */
  best: number;
  /** Últimos 14 días: true si hubo práctica ese día. */
  calendar: { date: string; active: boolean; isToday: boolean }[];
  /** True si el usuario ya practicó hoy. */
  activeToday: boolean;
}

/**
 * Calcula la racha a partir de las fechas (YYYY-MM-DD) en las que el usuario
 * practicó. La racha actual cuenta hacia atrás desde hoy; si hoy no hay
 * práctica pero sí ayer, la racha sigue viva (aún no está rota).
 */
export function computeStreak(
  practiceDateKeys: string[],
  today: Date = new Date(),
): StreakInfo {
  const unique = Array.from(new Set(practiceDateKeys)).sort();
  const practiced = new Set(unique);

  const todayKey = toDateKey(today);
  const activeToday = practiced.has(todayKey);

  // Fecha de referencia: hoy si practicó, si no ayer (racha aún viva).
  const oneDay = 24 * 60 * 60 * 1000;
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!activeToday) cursor.setTime(cursor.getTime() - oneDay);

  let current = 0;
  while (practiced.has(toDateKey(cursor))) {
    current += 1;
    cursor.setTime(cursor.getTime() - oneDay);
  }

  // Mejor racha histórica.
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const key of unique) {
    const [y, m, d] = key.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    if (prev && date.getTime() - prev.getTime() === oneDay) {
      run += 1;
    } else {
      run = 1;
    }
    best = Math.max(best, run);
    prev = date;
  }

  // Calendario de los últimos 14 días.
  const calendar: StreakInfo["calendar"] = [];
  for (let i = 13; i >= 0; i--) {
    const day = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - i,
    );
    const key = toDateKey(day);
    calendar.push({ date: key, active: practiced.has(key), isToday: key === todayKey });
  }

  return {
    current,
    best: Math.max(best, current),
    calendar,
    activeToday,
  };
}
