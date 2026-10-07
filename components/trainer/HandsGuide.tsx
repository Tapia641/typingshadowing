"use client";

import { FINGER_COLORS, type FingerId } from "@/lib/keyboard-layout";

interface HandsGuideProps {
  activeFinger: FingerId | null;
  leftActive: boolean;
  rightActive: boolean;
}

interface FingerShape {
  id: FingerId;
  /** Posición y tamaño en el viewBox 0..100. */
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
}

/** Mano izquierda: meñique → índice, de izquierda a derecha. */
const LEFT_FINGERS: FingerShape[] = [
  { id: "lPinky", x: 6, y: 34, w: 13, h: 40, rotate: -6 },
  { id: "lRing", x: 21, y: 26, w: 13, h: 50, rotate: -3 },
  { id: "lMiddle", x: 36, y: 22, w: 13, h: 55, rotate: 0 },
  { id: "lIndex", x: 51, y: 28, w: 13, h: 48, rotate: 3 },
  { id: "thumb", x: 64, y: 52, w: 12, h: 30, rotate: 38 },
];

/** Mano derecha: índice → meñique, de izquierda a derecha. */
const RIGHT_FINGERS: FingerShape[] = [
  { id: "thumb", x: 24, y: 52, w: 12, h: 30, rotate: -38 },
  { id: "rIndex", x: 36, y: 28, w: 13, h: 48, rotate: -3 },
  { id: "rMiddle", x: 51, y: 22, w: 13, h: 55, rotate: 0 },
  { id: "rRing", x: 66, y: 26, w: 13, h: 50, rotate: 3 },
  { id: "rPinky", x: 81, y: 34, w: 13, h: 40, rotate: 6 },
];

function Hand({
  fingers,
  activeFinger,
  dimmed,
}: {
  fingers: FingerShape[];
  activeFinger: FingerId | null;
  dimmed: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={
        "h-full w-full transition-opacity duration-200 " +
        (dimmed ? "opacity-30" : "opacity-95")
      }
      aria-hidden="true"
    >
      {/* Palma */}
      <path
        d="M8 96 Q4 64 16 56 L84 56 Q96 64 92 96 Z"
        fill="currentColor"
        className="text-muted-foreground/15"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {fingers.map((finger) => {
        const active = activeFinger === finger.id;
        const color = FINGER_COLORS[finger.id];
        return (
          <g
            key={finger.id}
            transform={`rotate(${finger.rotate} ${finger.x + finger.w / 2} ${finger.y + finger.h})`}
          >
            <rect
              x={finger.x}
              y={finger.y}
              width={finger.w}
              height={finger.h}
              rx={finger.w / 2}
              fill={active ? color : "currentColor"}
              className={active ? "" : "text-muted-foreground/20"}
              stroke={active ? color : "currentColor"}
              strokeWidth={active ? 0 : 1.2}
              opacity={active ? 0.95 : 1}
              style={{ transition: "all 150ms ease-out" }}
            />
            {active ? (
              <circle
                cx={finger.x + finger.w / 2}
                cy={finger.y + finger.h / 2}
                r={3}
                fill="#ffffff"
                opacity="0.9"
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Manos virtuales transparentes que indican qué dedo usar sobre el teclado.
 */
export function HandsGuide({
  activeFinger,
  leftActive,
  rightActive,
}: HandsGuideProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-20 w-full max-w-3xl">
      <div className="grid h-full grid-cols-2 gap-2">
        <div className="h-full">
          <Hand
            fingers={LEFT_FINGERS}
            activeFinger={leftActive ? activeFinger : null}
            dimmed={!leftActive}
          />
        </div>
        <div className="h-full">
          <Hand
            fingers={RIGHT_FINGERS}
            activeFinger={rightActive ? activeFinger : null}
            dimmed={!rightActive}
          />
        </div>
      </div>
    </div>
  );
}
