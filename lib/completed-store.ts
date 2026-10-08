"use client";

/**
 * Store ligero (fuera de React) de los IDs de textos completados guardados en
 * localStorage. Se usa con useSyncExternalStore para evitar setState en efectos
 * y desajustes de hidratación.
 */

const STORAGE_KEY = "ts-completed";
const listeners = new Set<() => void>();
let cache: string[] = [];
let hydrated = false;

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeCompleted(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getCompletedSnapshot(): string[] {
  if (!hydrated) {
    cache = read();
    hydrated = true;
  }
  return cache;
}

export function getCompletedServerSnapshot(): string[] {
  return cache;
}

export function setCompleted(ids: string[]): void {
  cache = ids;
  hydrated = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* almacenamiento no disponible */
  }
  emit();
}

export function addCompleted(id: string): void {
  const current = getCompletedSnapshot();
  if (current.includes(id)) return;
  setCompleted([...current, id]);
}
