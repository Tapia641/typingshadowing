import type { Lang } from "./i18n";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

interface Localized<T> {
  es: T;
  en: T;
}

export const FAQ_ITEMS: Localized<FaqItem[]> = {
  es: [
    {
      question: "¿Qué es exactamente la técnica Shadowing?",
      answer:
        "Shadowing significa 'hacer sombra': imitar un modelo de habla casi al mismo tiempo que lo escuchas. En Typing Shadowing escuchas la pronunciación de cada palabra justo después de escribirla, de modo que tu oído y tus dedos entrenan el mismo vocabulario a la vez.",
    },
    {
      question: "¿Cómo se calcula el WPM (palabras por minuto)?",
      answer:
        "Contamos las palabras que completaste correctamente y lo dividimos entre el tiempo real que estuviste escribiendo, expresado en minutos. Una palabra cuenta solo cuando pasa la validación estricta, así que el WPM refleja tu ritmo real.",
    },
    {
      question: "¿Qué significa el porcentaje de precisión (Accuracy)?",
      answer:
        "Es la proporción de palabras correctas sobre el total de intentos (correctas + errores). Si escribes 100 palabras y te equivocas 5 veces, tu precisión es del 95 %.",
    },
    {
      question: "¿Qué es el nivel MCER A1–C2?",
      answer:
        "Es el Marco Común Europeo de Referencia: seis niveles que van de A1 (principiante) a C2 (maestría). Cada texto de la web está adaptado a uno de esos niveles para que practiques con dificultad progresiva.",
    },
    {
      question: "¿Necesito crear una cuenta o pagar algo?",
      answer:
        "No. Typing Shadowing es 100 % gratis y se puede usar al instante, sin registro. Crear una cuenta es opcional: solo sirve para guardar tus estadísticas y ver tu perfil.",
    },
    {
      question: "¿La pronunciación funciona en todos los navegadores?",
      answer:
        "Usamos la API nativa de síntesis de voz del navegador, disponible en Chrome, Edge, Safari y Firefox modernos. La calidad de la voz depende de las voces instaladas en tu sistema; el texto suena con pronunciación en inglés (en-US).",
    },
  ],
  en: [
    {
      question: "What exactly is the Shadowing technique?",
      answer:
        "Shadowing means imitating a speech model almost at the same time as you hear it. In Typing Shadowing you hear the pronunciation of every word right after typing it, so your ear and your fingers train the same vocabulary together.",
    },
    {
      question: "How is WPM (words per minute) calculated?",
      answer:
        "We count the words you completed correctly and divide that by the real time you spent typing, expressed in minutes. A word only counts once it passes strict validation, so WPM reflects your true pace.",
    },
    {
      question: "What does the accuracy percentage mean?",
      answer:
        "It's the ratio of correct words to total attempts (correct + errors). If you type 100 words and make 5 mistakes, your accuracy is 95%.",
    },
    {
      question: "What is the CEFR A1–C2 level?",
      answer:
        "It's the Common European Framework of Reference: six levels from A1 (beginner) to C2 (mastery). Every text on the site is matched to one of those levels so you practise with progressive difficulty.",
    },
    {
      question: "Do I need to create an account or pay anything?",
      answer:
        "No. Typing Shadowing is 100% free and can be used instantly, without signing up. Creating an account is optional: it only lets you save your stats and view your profile.",
    },
    {
      question: "Does pronunciation work in every browser?",
      answer:
        "We use the browser's native speech synthesis API, available in modern Chrome, Edge, Safari, and Firefox. Voice quality depends on the voices installed on your system; text is spoken with English pronunciation (en-US).",
    },
  ],
};

export const BENEFITS: Localized<Benefit[]> = {
  es: [
    {
      icon: "✍️",
      title: "Memoria muscular",
      description:
        "Teclear cada palabra una y otra vez fija la ortografía en tus dedos. Escribir se vuelve automático y dejas de dudar entre 'because' y 'becouse'.",
    },
    {
      icon: "👂",
      title: "Oído activo",
      description:
        "Escuchar la pronunciación en el instante en que completas la palabra conecta el sonido con su forma escrita, el vínculo que cuesta más construir.",
    },
    {
      icon: "🧠",
      title: "Vocabulario en contexto",
      description:
        "Aprendes palabras dentro de textos reales adaptados a tu nivel, no en listas aisladas. El contexto le da significado y hace que se retengan mejor.",
    },
    {
      icon: "📈",
      title: "Progreso medible",
      description:
        "Cada texto termina con tus métricas de WPM, precisión y errores. Ver la mejora semana a semana mantiene la motivación alta.",
    },
  ],
  en: [
    {
      icon: "✍️",
      title: "Muscle memory",
      description:
        "Typing each word over and over locks spelling into your fingers. Writing becomes automatic and you stop second-guessing 'because' vs 'becouse'.",
    },
    {
      icon: "👂",
      title: "An active ear",
      description:
        "Hearing the pronunciation the moment you complete the word links the sound to its written form — the connection that's hardest to build.",
    },
    {
      icon: "🧠",
      title: "Vocabulary in context",
      description:
        "You learn words inside real texts matched to your level, not in isolated lists. Context gives them meaning and makes them stick.",
    },
    {
      icon: "📈",
      title: "Measurable progress",
      description:
        "Every text ends with your WPM, accuracy, and error metrics. Watching the improvement week after week keeps motivation high.",
    },
  ],
};

export const STEPS: Localized<Step[]> = {
  es: [
    {
      number: "1",
      title: "Selecciona tu nivel",
      description:
        "Elige entre A1 y C2. Cada nivel tiene textos pensados para esa etapa, así que siempre practicas en tu zona de desarrollo.",
    },
    {
      number: "2",
      title: "Tipea y escucha",
      description:
        "Escribe palabra por palabra. En el momento en que aciertas, la web pronuncia la palabra en inglés con su acento correcto.",
    },
    {
      number: "3",
      title: "Revisa y sube de nivel",
      description:
        "Al terminar ves tu WPM, precisión, errores y tiempo. Cuando mejoras, pasas al siguiente nivel MCER.",
    },
  ],
  en: [
    {
      number: "1",
      title: "Pick your level",
      description:
        "Choose between A1 and C2. Each level has texts designed for that stage, so you always practise in your zone of development.",
    },
    {
      number: "2",
      title: "Type and listen",
      description:
        "Type word by word. The moment you get it right, the site pronounces the word in English with the correct accent.",
    },
    {
      number: "3",
      title: "Review and level up",
      description:
        "When you finish you see your WPM, accuracy, errors, and time. As you improve, you move up to the next CEFR level.",
    },
  ],
};

export function pickLocalized<T>(value: Localized<T>, lang: Lang): T {
  return value[lang];
}
