"use client";

import {
  FINGER_COLORS,
  FINGER_LABEL_KEY,
  KEY_ROWS,
  fingerForKey,
  type FingerId,
} from "@/lib/keyboard-layout";
import { useI18n } from "@/lib/i18n";
import { HandsGuide } from "./HandsGuide";

interface VirtualKeyboardProps {
  /** Siguiente tecla sugerida ("Backspace" cuando hay que corregir). */
  nextChar: string | null;
}

const LEFT_FINGERS: FingerId[] = ["lPinky", "lRing", "lMiddle", "lIndex", "thumb"];
const RIGHT_FINGERS: FingerId[] = ["thumb", "rIndex", "rMiddle", "rRing", "rPinky"];

/**
 * Teclado tipo laptop con manos virtuales transparentes que indican el dedo
 * correspondiente a la siguiente tecla.
 */
export function VirtualKeyboard({ nextChar }: VirtualKeyboardProps) {
  const { t } = useI18n();
  const target = nextChar?.toLowerCase() ?? null;
  const activeFinger = fingerForKey(nextChar);
  const leftActive = activeFinger ? LEFT_FINGERS.includes(activeFinger) : false;
  const rightActive = activeFinger ? RIGHT_FINGERS.includes(activeFinger) : false;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-semibold uppercase tracking-wide">
          {t("practice.keyboard")}
        </span>
        {activeFinger ? (
          <span
            className="inline-flex items-center gap-2 rounded-full border border-border-default px-2.5 py-1"
            style={{ color: FINGER_COLORS[activeFinger] }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: FINGER_COLORS[activeFinger] }}
            />
            {t("practice.useFinger")} {t(FINGER_LABEL_KEY[activeFinger])}
          </span>
        ) : null}
      </div>

      {/* Base del portátil */}
      <div className="relative rounded-xl border border-border-default bg-surface-muted/40 p-2 pb-24 shadow-sm">
        <div className="overflow-x-auto">
          <div className="mx-auto min-w-[560px] max-w-2xl">
            {KEY_ROWS.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="mb-1 flex justify-center gap-1"
              >
                {row.map((key, keyIndex) => {
                  const isTarget =
                    key.char !== undefined && target === key.char;
                  const isBackspace =
                    key.label === "⌫" && target === "backspace";
                  const highlighted = isTarget || isBackspace;
                  const color = key.finger ? FINGER_COLORS[key.finger] : undefined;

                  return (
                    <span
                      key={`${rowIndex}-${keyIndex}`}
                      style={{
                        width: `calc(${key.width} * 2.25rem)`,
                        ...(highlighted && color
                          ? { backgroundColor: color, borderColor: color }
                          : {}),
                      }}
                      className={
                        "relative flex h-8 items-center justify-center rounded-md border text-[0.7rem] font-medium transition-all sm:h-9 sm:text-xs " +
                        (highlighted
                          ? "z-10 scale-110 text-white shadow-md"
                          : key.modifier
                            ? "border-border-default bg-surface/70 text-muted-foreground/80"
                            : "border-border-default bg-surface text-foreground/80")
                      }
                    >
                      {key.label}
                      {key.home ? (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-1 h-0.5 w-3 rounded-full bg-muted-foreground/50"
                        />
                      ) : null}
                      {!highlighted && color ? (
                        <span
                          aria-hidden="true"
                          className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full opacity-70"
                          style={{ backgroundColor: color }}
                        />
                      ) : null}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Manos virtuales transparentes sobre el teclado */}
        <HandsGuide
          activeFinger={activeFinger}
          leftActive={leftActive}
          rightActive={rightActive}
        />
      </div>
    </div>
  );
}
