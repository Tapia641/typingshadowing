"use client";

import {
  FINGER_COLORS,
  FINGER_LABEL_KEY,
  fingerForKey,
  keyPosition,
  layoutKeys,
  type FingerId,
} from "@/lib/keyboard-layout";
import { useI18n } from "@/lib/i18n";

interface VirtualKeyboardProps {
  /** Siguiente tecla sugerida ("Backspace" cuando hay que corregir). */
  nextChar: string | null;
}

interface FingerShape {
  id: FingerId;
  /** Centro de la yema en reposo [x, y]. */
  rest: [number, number];
  /** Punto donde el dedo nace de la palma. */
  base: [number, number];
  bow: number;
}

const LEFT_FINGERS: FingerShape[] = [
  { id: "lPinky", rest: [22.5, 40], base: [16, 76], bow: -3 },
  { id: "lRing", rest: [32.5, 40], base: [28, 72], bow: -1 },
  { id: "lMiddle", rest: [42.5, 40], base: [41, 71], bow: 0 },
  { id: "lIndex", rest: [52.5, 40], base: [54, 72], bow: 1 },
  { id: "thumb", rest: [63, 60], base: [60, 92], bow: -8 },
];

const RIGHT_FINGERS: FingerShape[] = [
  { id: "rIndex", rest: [82.5, 40], base: [81, 72], bow: -1 },
  { id: "rMiddle", rest: [92.5, 40], base: [94, 71], bow: 0 },
  { id: "rRing", rest: [102.5, 40], base: [107, 72], bow: 1 },
  { id: "rPinky", rest: [112.5, 40], base: [119, 76], bow: 3 },
  { id: "thumb", rest: [72, 60], base: [75, 92], bow: 8 },
];

const ACTIVE_BLUE = "#3b82f6";
const HAND_STROKE = "#a3adbd";

function fingerPath(finger: FingerShape, tip: [number, number]): string {
  const [bx, by] = finger.base;
  const [tx, ty] = tip;
  const mx = (bx + tx) / 2;
  const my = (by + ty) / 2;
  const dx = tx - bx;
  const dy = ty - by;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * finger.bow;
  const cy = my + (dx / len) * finger.bow;
  return `M ${bx} ${by} Q ${cx} ${cy} ${tx} ${ty}`;
}

/**
 * Teclado de portátil con manos guía en el mismo lienzo SVG. Cada dedo nace de
 * la palma y apunta a la tecla que le corresponde; el dedo y la tecla activos
 * se resaltan en azul (estilo guía de mecanografía).
 */
export function VirtualKeyboard({ nextChar }: VirtualKeyboardProps) {
  const { t } = useI18n();
  const keys = layoutKeys();
  const activeFinger = fingerForKey(nextChar);
  const target = keyPosition(nextChar);
  const targetLower = nextChar?.toLowerCase() ?? null;

  const activeTip: [number, number] | null = target
    ? [target.cx, target.cy]
    : null;

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

      <div className="overflow-x-auto">
        <div className="mx-auto min-w-[560px]">
          <svg
            viewBox="0 0 150 122"
            className="h-auto w-full select-none"
            role="img"
            aria-label={t("practice.keyboard")}
          >
            {/* Base del portátil */}
            <rect
              x="1"
              y="2"
              width="148"
              height="66"
              rx="4"
              fill="var(--surface-muted)"
              stroke="var(--border-default)"
            />

            {/* Manos (detrás de las teclas altas pero sobre la base) */}
            <g>
              <Palm base={[16, 76]} width={46} side="left" />
              <Palm base={[81, 76]} width={46} side="right" />
              {[...LEFT_FINGERS, ...RIGHT_FINGERS].map((finger) => {
                const active = activeFinger === finger.id;
                const tip: [number, number] =
                  active && activeTip ? activeTip : finger.rest;
                return (
                  <g key={finger.id}>
                    <path
                      d={fingerPath(finger, tip)}
                      fill="none"
                      stroke={active ? ACTIVE_BLUE : HAND_STROKE}
                      strokeWidth={active ? 5.4 : 5}
                      strokeLinecap="round"
                      opacity={active ? 1 : 0.55}
                      style={{ transition: "all 140ms ease-out" }}
                    />
                    <circle
                      cx={tip[0]}
                      cy={tip[1]}
                      r={active ? 2.4 : 2.1}
                      fill={active ? ACTIVE_BLUE : HAND_STROKE}
                      opacity={active ? 1 : 0.5}
                      style={{ transition: "all 140ms ease-out" }}
                    />
                  </g>
                );
              })}
            </g>

            {/* Teclas */}
            {keys.map((key, index) => {
              const highlighted =
                (key.char !== undefined && targetLower === key.char) ||
                (key.label === "⌫" && targetLower === "backspace");
              return (
                <g key={index}>
                  {highlighted ? (
                    <>
                      <circle cx={key.cx} cy={key.cy} r="9" fill={ACTIVE_BLUE} opacity="0.15" />
                      <circle cx={key.cx} cy={key.cy} r="6.5" fill={ACTIVE_BLUE} opacity="0.25" />
                    </>
                  ) : null}
                  <rect
                    x={key.x + 0.4}
                    y={key.cy - 5 + 0.4}
                    width={key.w - 0.8}
                    height={9.2}
                    rx="1.4"
                    fill={highlighted ? ACTIVE_BLUE : "var(--surface)"}
                    stroke={highlighted ? ACTIVE_BLUE : "var(--border-default)"}
                    style={{ transition: "fill 120ms ease-out" }}
                  />
                  {key.home ? (
                    <line
                      x1={key.cx - 1.6}
                      y1={key.cy + 3}
                      x2={key.cx + 1.6}
                      y2={key.cy + 3}
                      stroke={highlighted ? "#ffffff" : "var(--muted-foreground)"}
                      strokeWidth="0.5"
                      opacity="0.7"
                    />
                  ) : null}
                  <text
                    x={key.cx}
                    y={key.cy + 1.6}
                    textAnchor="middle"
                    fontSize={key.width >= 2 ? 3.4 : 4.2}
                    fill={
                      highlighted
                        ? "#ffffff"
                        : key.modifier
                          ? "var(--muted-foreground)"
                          : "var(--foreground)"
                    }
                    opacity={key.modifier && !highlighted ? 0.7 : 1}
                  >
                    {key.label === "Space"
                      ? ""
                      : key.width >= 2
                        ? key.label.toUpperCase()
                        : key.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Silueta de la palma de la mano (transparente, con contorno). */
function Palm({
  base,
  width,
  side,
}: {
  base: [number, number];
  width: number;
  side: "left" | "right";
}) {
  const [x, y] = base;
  const d =
    side === "left"
      ? `M ${x - 4} ${y + 30}
         C ${x - 10} ${y + 6}, ${x - 4} ${y - 6}, ${x + 6} ${y - 6}
         L ${x + width - 6} ${y - 6}
         C ${x + width + 4} ${y - 4}, ${x + width + 2} ${y + 20}, ${x + width - 8} ${y + 34} Z`
      : `M ${x + width + 4} ${y + 30}
         C ${x + width + 10} ${y + 6}, ${x + width + 4} ${y - 6}, ${x + width - 6} ${y - 6}
         L ${x + 6} ${y - 6}
         C ${x - 4} ${y - 4}, ${x - 2} ${y + 20}, ${x + 8} ${y + 34} Z`;
  return (
    <path
      d={d}
      fill={HAND_STROKE}
      fillOpacity="0.12"
      stroke={HAND_STROKE}
      strokeWidth="1.1"
      opacity="0.7"
    />
  );
}
