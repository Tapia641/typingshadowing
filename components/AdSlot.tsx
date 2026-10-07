import type { ReactNode } from "react";
import { AdSenseUnit } from "./AdSenseUnit";

/**
 * Espacio publicitario. Si AdSense está configurado (NEXT_PUBLIC_ADSENSE_CLIENT
 * y el slot correspondiente), muestra el anuncio real; en caso contrario,
 * muestra un bloque placeholder etiquetado como "ANUNCIO".
 */
type AdFormat = "horizontal" | "rectangle" | "popup" | "floating";

const FORMAT_CLASSES: Record<AdFormat, string> = {
  horizontal: "h-24 w-full sm:h-28",
  rectangle: "h-64 w-full sm:h-72",
  popup: "h-40 w-full",
  floating: "h-20 w-64",
};

const FORMAT_LABEL: Record<AdFormat, string> = {
  horizontal: "Banner horizontal",
  rectangle: "Banner rectangular",
  popup: "Anuncio",
  floating: "Banner flotante",
};

/** Slots de AdSense por posición (se configuran con variables NEXT_PUBLIC_*). */
const FORMAT_SLOT_ENV: Record<AdFormat, string | undefined> = {
  horizontal: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL,
  rectangle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE,
  popup: process.env.NEXT_PUBLIC_ADSENSE_SLOT_POPUP,
  floating: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FLOATING,
};

const FORMAT_ADSENSE_FORMAT: Record<AdFormat, string> = {
  horizontal: "horizontal",
  rectangle: "rectangle",
  popup: "rectangle",
  floating: "auto",
};

export function AdSlot({
  format,
  className = "",
  label,
}: {
  format: AdFormat;
  className?: string;
  label?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = FORMAT_SLOT_ENV[format];

  if (client && slot) {
    return (
      <aside
        aria-label={`Espacio publicitario: ${label ?? FORMAT_LABEL[format]}`}
        data-ad-slot={format}
        className={`flex items-center justify-center overflow-hidden ${FORMAT_CLASSES[format]} ${className}`}
      >
        <AdSenseUnit slot={slot} format={FORMAT_ADSENSE_FORMAT[format]} />
      </aside>
    );
  }

  return (
    <aside
      aria-label={`Espacio publicitario: ${label ?? FORMAT_LABEL[format]}`}
      data-ad-slot={format}
      className={`flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border-default bg-surface-muted/60 text-center ${FORMAT_CLASSES[format]} ${className}`}
    >
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Anuncio
      </span>
      {label ? (
        <span className="px-3 text-xs text-muted-foreground">{label}</span>
      ) : null}
    </aside>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`w-full ${className}`}>
      {children}
    </section>
  );
}
