"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

type Dict = Record<string, string>;

/* ------------------------------------------------------------------ */
/* Store de idioma (fuera de React) para leer localStorage sin efectos */
/* ------------------------------------------------------------------ */

const langListeners = new Set<() => void>();
let currentLang: Lang = "es";

function langSubscribe(callback: () => void): () => void {
  langListeners.add(callback);
  return () => langListeners.delete(callback);
}

function langSnapshot(): Lang {
  const stored = window.localStorage.getItem("ts-lang");
  currentLang = stored === "en" ? "en" : "es";
  return currentLang;
}

function langServerSnapshot(): Lang {
  return "es";
}

function applyLang(next: Lang): void {
  currentLang = next;
  window.localStorage.setItem("ts-lang", next);
  document.documentElement.lang = next;
  langListeners.forEach((listener) => listener());
}

const ES: Dict = {
  "nav.practice": "Practicar",
  "nav.levels": "Niveles",
  "nav.benefits": "Beneficios",
  "nav.faq": "FAQ",
  "nav.signIn": "Iniciar sesión",
  "nav.profile": "Mi perfil",
  "nav.admin": "Administración",
  "nav.signOut": "Cerrar sesión",
  "nav.account": "Cuenta",
  "brand.tagline": "aprender inglés tipeando y escuchando",

  "hero.badge": "Gratis · Sin registro · A1 a C2",
  "hero.title1": "Aprende inglés",
  "hero.title2": "tipeando y escuchando",
  "hero.title3": "a la vez",
  "hero.subtitle":
    "Typing Shadowing combina mecanografía y shadowing: escribes textos adaptados a tu nivel MCER y escuchas la pronunciación de cada palabra en el instante en que la completas. Entrena oído, ortografía y escritura en una sola práctica.",
  "hero.ctaPrimary": "Empezar a practicar ahora",
  "hero.ctaSecondary": "Cómo funciona",
  "hero.stat.levels": "Niveles MCER",
  "hero.stat.skills": "Habilidades (oído + typing)",
  "hero.stat.cost": "Coste, siempre",
  "hero.accountTitle": "¿Quieres guardar tu progreso?",
  "hero.accountText":
    "Crea una cuenta gratis con Google para guardar tus estadísticas, ver tu evolución y acceder a tu perfil. Practicar sin cuenta también es posible.",
  "hero.accountCta": "Entrar con Google",
  "hero.streakBadge": "Nueva función",
  "hero.streakTitle": "Crea tu racha de práctica",
  "hero.streakText":
    "Inicia sesión y practica cada día para encender tu racha. Verás los días seguidos en tu perfil y te mantendrás constante hasta dominar el inglés.",
  "hero.streakCta": "Empezar mi racha",
  "hero.streakDays": "días seguidos",
  "hero.streakToday": "Día listo para empezar",
  "hero.streakCtaDays": "Empieza tu racha hoy",

  "levels.title": "Elige tu nivel",
  "levels.subtitle":
    "Cada nivel MCER tiene sus propios textos. Elige dónde quieres practicar.",
  "levels.texts": "textos",
  "levels.start": "Ver textos",
  "levels.backHome": "Volver al inicio",
  "levels.all": "Todos los niveles",

  "practice.title": "Practica ahora",
  "practice.subtitle":
    "Elige tu nivel y empieza a tipear. Escucharás cada palabra al completarla correctamente.",
  "practice.text": "Texto",
  "practice.current": "Palabra actual",
  "practice.write": "Escribe",
  "practice.wrongWord": "Palabra incorrecta. Bórrala para continuar.",
  "practice.wrongLetter": "Letra incorrecta. Corrígela para seguir.",
  "practice.locked": "Letra incorrecta bloqueada",
  "practice.placeholder": "Escribe la palabra y pulsa espacio…",
  "practice.strict":
    "Validación estricta: no avanzas hasta escribir bien la palabra y pulsar espacio.",
  "practice.reset": "Reiniciar",
  "practice.showStats": "Mostrar estadísticas",
  "practice.keyboard": "Teclado de práctica",
  "practice.useFinger": "Usa",
  "practice.sentence": "Oración",
  "practice.playSentence": "Reproducir la oración",
  "practice.replaySentence": "Escuchar oración",
  "practice.selectText": "Elige el texto",
  "practice.sentenceDone": "¡Oración completada!",
  "practice.nextSentence": "Siguiente oración",
  "practice.fullSentence": "Frase completa",
  "practice.textFinished": "¡Texto completado! Revisa tus estadísticas.",
  "finger.lPinky": "meñique izquierdo",
  "finger.lRing": "anular izquierdo",
  "finger.lMiddle": "dedo medio izquierdo",
  "finger.lIndex": "índice izquierdo",
  "finger.thumb": "pulgar",
  "finger.rIndex": "índice derecho",
  "finger.rMiddle": "dedo medio derecho",
  "finger.rRing": "anular derecho",
  "finger.rPinky": "meñique derecho",
  "practice.listen": "Escuchar pronunciación",
  "practice.completed": "Texto completado. Revisa tus estadísticas.",
  "practice.progress": "Progreso del texto",
  "practice.errorsInWord": "Errores en esta palabra",
  "practice.copySource": "Texto adaptado",

  "results.title": "¡Texto completado!",
  "results.subtitle": "Estas son tus estadísticas.",
  "results.titleFinal": "¡Nivel completado!",
  "results.subtitleFinal": "Has terminado todos los textos de este nivel.",
  "results.skipStats":
    "Avanzar sin ver estadísticas (verlas al final)",
  "results.wpm": "WPM",
  "results.accuracy": "Precisión",
  "results.errors": "Errores",
  "results.time": "Tiempo",
  "results.auto": "Continuar automáticamente con el siguiente texto",
  "results.continue": "Continuar al siguiente texto",
  "results.saved": "Guardado en tu perfil",
  "results.saving": "Guardando…",
  "results.saveError": "No se pudo guardar el resultado",
  "results.close": "Cerrar resultados",

  "steps.title": "Cómo funciona en 3 pasos",
  "steps.subtitle": "Sin instalar nada, sin crear cuentas. Entras y practicas.",

  "benefits.title": "Por qué el typing shadowing funciona",
  "benefits.subtitle":
    "Escribir y escuchar al mismo tiempo activa dos vías de memoria: la muscular de tus dedos y la auditiva de tu oído. Cuando ambas coinciden, el vocabulario se fija de forma mucho más duradera que leyendo o escuchando por separado.",

  "faq.title": "Preguntas frecuentes",
  "faq.subtitle": "Todo lo que necesitas saber antes de empezar.",

  "footer.rights":
    "Gratis y sin registro · Contenido de dominio público y textos originales",

  "auth.title": "Inicia sesión",
  "auth.subtitle":
    "Entra con Google para guardar tus estadísticas y ver tu perfil. Es gratis.",
  "auth.google": "Continuar con Google",
  "auth.unavailable":
    "El inicio de sesión no está configurado todavía. Puedes practicar sin cuenta.",
  "auth.back": "Volver a practicar",

  "profile.title": "Mi perfil",
  "profile.subtitle": "Tu progreso y tus estadísticas guardadas.",
  "profile.sessions": "Textos practicados",
  "profile.bestWpm": "Mejor WPM",
  "profile.avgAccuracy": "Precisión media",
  "profile.avgWpm": "WPM medio",
  "profile.history": "Historial reciente",
  "profile.empty":
    "Todavía no tienes resultados guardados. ¡Empieza a practicar!",
  "profile.date": "Fecha",
  "profile.level": "Nivel",
  "profile.text": "Texto",
  "profile.practice": "Practicar",
  "profile.signOut": "Cerrar sesión",
  "profile.streak": "Racha de práctica",
  "profile.streakCurrent": "Racha actual",
  "profile.streakBest": "Mejor racha",
  "profile.streakDays": "días",
  "profile.streakCalendar": "Últimos 14 días",
  "profile.streakEmpty":
    "Practica un texto hoy para encender tu racha. ¡Vuelve mañana para mantenerla!",
  "profile.streakActive":
    "¡Racha activa! Practica de nuevo mañana para no perderla.",

  "admin.title": "Administración",
  "admin.subtitle": "Usuarios registrados",
  "admin.users": "Usuarios",
  "admin.totalUsers": "Usuarios totales",
  "admin.totalResults": "Resultados guardados",
  "admin.name": "Nombre",
  "admin.email": "Correo",
  "admin.role": "Rol",
  "admin.createdAt": "Registro",
  "admin.denied": "No tienes permiso para ver esta página.",
  "admin.noDb": "La base de datos no está configurada.",
};

const EN: Dict = {
  "nav.practice": "Practice",
  "nav.levels": "Levels",
  "nav.benefits": "Benefits",
  "nav.faq": "FAQ",
  "nav.signIn": "Sign in",
  "nav.profile": "My profile",
  "nav.admin": "Admin",
  "nav.signOut": "Sign out",
  "nav.account": "Account",
  "brand.tagline": "learn English by typing and listening",

  "hero.badge": "Free · No sign-up · A1 to C2",
  "hero.title1": "Learn English",
  "hero.title2": "by typing and listening",
  "hero.title3": "at the same time",
  "hero.subtitle":
    "Typing Shadowing combines typing and shadowing: you type texts matched to your CEFR level and hear the pronunciation of every word the moment you complete it. Train your ear, spelling, and writing in a single practice.",
  "hero.ctaPrimary": "Start practising now",
  "hero.ctaSecondary": "How it works",
  "hero.stat.levels": "CEFR levels",
  "hero.stat.skills": "Skills (ear + typing)",
  "hero.stat.cost": "Cost, ever",
  "hero.accountTitle": "Want to save your progress?",
  "hero.accountText":
    "Create a free account with Google to save your stats, track your progress, and access your profile. You can also practise without an account.",
  "hero.accountCta": "Continue with Google",
  "hero.streakBadge": "New feature",
  "hero.streakTitle": "Build your practice streak",
  "hero.streakText":
    "Sign in and practise every day to light up your streak. You'll see consecutive days on your profile and stay consistent until you master English.",
  "hero.streakCta": "Start my streak",
  "hero.streakDays": "days in a row",
  "hero.streakToday": "Ready to start your streak",
  "hero.streakCtaDays": "Start your streak today",

  "levels.title": "Choose your level",
  "levels.subtitle":
    "Each CEFR level has its own texts. Choose where to practise.",
  "levels.texts": "texts",
  "levels.start": "View texts",
  "levels.backHome": "Back to home",
  "levels.all": "All levels",

  "practice.title": "Practise now",
  "practice.subtitle":
    "Pick your level and start typing. You'll hear each word once you complete it correctly.",
  "practice.text": "Text",
  "practice.current": "Current word",
  "practice.write": "Type",
  "practice.wrongWord": "Wrong word. Delete it to continue.",
  "practice.wrongLetter": "Wrong letter. Fix it to continue.",
  "practice.locked": "Wrong letter locked",
  "practice.placeholder": "Type the word and press space…",
  "practice.strict":
    "Strict validation: you can't move on until the word is correct and you press space.",
  "practice.reset": "Restart",
  "practice.showStats": "Show stats",
  "practice.keyboard": "Practice keyboard",
  "practice.useFinger": "Use",
  "practice.sentence": "Sentence",
  "practice.playSentence": "Play the sentence",
  "practice.replaySentence": "Hear sentence",
  "practice.selectText": "Choose the text",
  "practice.sentenceDone": "Sentence completed!",
  "practice.nextSentence": "Next sentence",
  "practice.fullSentence": "Full sentence",
  "practice.textFinished": "Text completed! Check your stats.",
  "finger.lPinky": "left pinky",
  "finger.lRing": "left ring",
  "finger.lMiddle": "left middle",
  "finger.lIndex": "left index",
  "finger.thumb": "thumb",
  "finger.rIndex": "right index",
  "finger.rMiddle": "right middle",
  "finger.rRing": "right ring",
  "finger.rPinky": "right pinky",
  "practice.listen": "Hear pronunciation",
  "practice.completed": "Text completed. Check your stats.",
  "practice.progress": "Text progress",
  "practice.errorsInWord": "Errors in this word",
  "practice.copySource": "Adapted text",

  "results.title": "Text completed!",
  "results.subtitle": "Here are your stats.",
  "results.titleFinal": "Level completed!",
  "results.subtitleFinal": "You've finished every text in this level.",
  "results.skipStats": "Continue without stats (see them at the end)",
  "results.wpm": "WPM",
  "results.accuracy": "Accuracy",
  "results.errors": "Errors",
  "results.time": "Time",
  "results.auto": "Automatically continue to the next text",
  "results.continue": "Continue to next text",
  "results.saved": "Saved to your profile",
  "results.saving": "Saving…",
  "results.saveError": "Could not save the result",
  "results.close": "Close results",

  "steps.title": "How it works in 3 steps",
  "steps.subtitle": "No installs, no sign-up. Jump in and practise.",

  "benefits.title": "Why typing shadowing works",
  "benefits.subtitle":
    "Writing and listening at the same time activates two memory pathways: the muscle memory in your fingers and the auditory memory in your ear. When both align, vocabulary sticks far longer than reading or listening alone.",

  "faq.title": "Frequently asked questions",
  "faq.subtitle": "Everything you need to know before you start.",

  "footer.rights":
    "Free, no sign-up · Public-domain content and original texts",

  "auth.title": "Sign in",
  "auth.subtitle":
    "Continue with Google to save your stats and view your profile. It's free.",
  "auth.google": "Continue with Google",
  "auth.unavailable":
    "Sign-in isn't configured yet. You can still practise without an account.",
  "auth.back": "Back to practising",

  "profile.title": "My profile",
  "profile.subtitle": "Your progress and saved stats.",
  "profile.sessions": "Texts practised",
  "profile.bestWpm": "Best WPM",
  "profile.avgAccuracy": "Average accuracy",
  "profile.avgWpm": "Average WPM",
  "profile.history": "Recent history",
  "profile.empty": "No saved results yet. Start practising!",
  "profile.date": "Date",
  "profile.level": "Level",
  "profile.text": "Text",
  "profile.practice": "Practise",
  "profile.signOut": "Sign out",
  "profile.streak": "Practice streak",
  "profile.streakCurrent": "Current streak",
  "profile.streakBest": "Best streak",
  "profile.streakDays": "days",
  "profile.streakCalendar": "Last 14 days",
  "profile.streakEmpty":
    "Practise a text today to light up your streak. Come back tomorrow to keep it!",
  "profile.streakActive":
    "Streak active! Practise again tomorrow to keep it alive.",

  "admin.title": "Admin",
  "admin.subtitle": "Registered users",
  "admin.users": "Users",
  "admin.totalUsers": "Total users",
  "admin.totalResults": "Saved results",
  "admin.name": "Name",
  "admin.email": "Email",
  "admin.role": "Role",
  "admin.createdAt": "Joined",
  "admin.denied": "You don't have permission to view this page.",
  "admin.noDb": "The database isn't configured.",
};

const DICTS: Record<Lang, Dict> = { es: ES, en: EN };

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(
    langSubscribe,
    langSnapshot,
    langServerSnapshot,
  );

  const t = useCallback(
    (key: string) => DICTS[lang][key] ?? DICTS.es[key] ?? key,
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, setLang: applyLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return { lang: "es", setLang: applyLang, t: (key) => ES[key] ?? key };
  }
  return ctx;
}
