"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

export function getThemeSnapshot(): Theme {
  const stored = window.localStorage.getItem("ts-theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function setTheme(next: Theme): void {
  window.localStorage.setItem("ts-theme", next);
  document.documentElement.classList.toggle("dark", next === "dark");
  emit();
}

/** Lee el tema sin provocar errores de hidratación (snapshot servidor = claro). */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getThemeSnapshot, () => "light");
}
