let audioCtx: AudioContext | null = null;

/**
 * Feedback sonoro ligero (Web Audio API): un "click" al acertar y un zumbido
 * grave al fallar. Silencioso si el navegador no soporta AudioContext.
 */
export function playKeySound(type: "click" | "error" = "click"): void {
  if (typeof window === "undefined") return;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    if (!audioCtx) audioCtx = new Ctor();
    if (audioCtx.state === "suspended") void audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === "error") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.1);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch {
    /* AudioContext no disponible o bloqueado. */
  }
}

/**
 * Devuelve true si la entrada contiene alguna letra incorrecta respecto al
 * núcleo de la palabra objetivo (comparación sin distinguir mayúsculas).
 */
export function hasError(input: string, target: string): boolean {
  const typed = input.toLowerCase();
  const expected = target.toLowerCase();
  for (let i = 0; i < typed.length; i++) {
    if (i >= expected.length || typed[i] !== expected[i]) return true;
  }
  return false;
}
