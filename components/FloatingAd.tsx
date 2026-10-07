"use client";

import { useEffect, useState } from "react";
import { AdSlot } from "./AdSlot";

/** Banner flotante en la esquina inferior, descartable. */
export function FloatingAd() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden sm:block">
      <div className="relative">
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Cerrar anuncio flotante"
          className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border-default bg-surface text-xs text-muted-foreground shadow-sm transition-colors hover:text-foreground"
        >
          ✕
        </button>
        <AdSlot format="floating" label="Publicidad" />
      </div>
    </div>
  );
}
