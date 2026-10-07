"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSenseUnitProps {
  /** ID del bloque creado en AdSense (data-ad-slot). */
  slot: string;
  /** Formato responsive por defecto. */
  format?: string;
  layout?: string;
  className?: string;
}

/**
 * Anuncio real de Google AdSense. Solo se renderiza si el cliente
 * (`NEXT_PUBLIC_ADSENSE_CLIENT`) y el slot están configurados.
 */
export function AdSenseUnit({
  slot,
  format = "auto",
  layout,
  className = "",
}: AdSenseUnitProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* El script aún no cargó; se reintentará en el siguiente montaje. */
    }
  }, [client]);

  if (!client) return null;

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
      {...(layout ? { "data-ad-layout": layout } : {})}
    />
  );
}

export function isAdSenseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT);
}
