"use client";

/**
 * Envoltorio alrededor de la Web Speech API (Text-to-Speech) del navegador.
 * Pronuncia en inglés de forma clara y cancela cualquier audio previo para que
 * la respuesta sea inmediata al completar cada palabra.
 */

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const preferred =
    voices.find((v) => v.lang === "en-US" && v.localService) ??
    voices.find((v) => v.lang === "en-US") ??
    voices.find((v) => v.lang.startsWith("en")) ??
    null;
  return preferred;
}

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Debe llamarse una vez en el cliente para precargar la lista de voces. */
export function primeVoices(): void {
  if (!isSpeechSupported()) return;
  cachedVoice = pickEnglishVoice();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = pickEnglishVoice();
  };
}

export function speak(text: string, rate = 0.95): void {
  if (!isSpeechSupported() || !text) return;
  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voice = cachedVoice ?? pickEnglishVoice();
  if (voice) {
    cachedVoice = voice;
    utterance.voice = voice;
  }

  synth.speak(utterance);
}

export function stopSpeaking(): void {
  if (isSpeechSupported()) window.speechSynthesis.cancel();
}
