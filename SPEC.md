# Spec: Typing Shadowing — aprender inglés tipeando y escuchando

## Objective
Web app 100% gratuita, sin registro, para practicar inglés con la técnica
**typing + shadowing**: el usuario tipea palabra por palabra un texto adaptado a
su nivel MCER (A1–C2) y, al completar cada palabra correctamente, escucha su
pronunciación en inglés (Text-to-Speech del navegador). Mejora escritura,
ortografía y comprensión auditiva. Monetizada con espacios publicitarios
placeholder etiquetados "ANUNCIO".

Éxito =
- Landing clara + herramienta usable al instante.
- Navegación por niveles A1–C2 y toggle de tema claro/oscuro.
- Validación estricta por palabra + TTS al completar palabra.
- Tarjeta de palabra actual con teclado virtual guía.
- Estadísticas (WPM, accuracy %, errores, tiempo) y continuar/auto-continuar.
- SEO (metadata, JSON-LD FAQ, sitemap, robots).
- Responsive 320/768/1024/1440, accesible (teclado, ARIA, contraste).
- Publicada en un dominio temporal.

## Tech Stack
- Next.js 16.4 (App Router), React 19.3, TypeScript 5
- Tailwind CSS v4 (`@tailwindcss/turbopack`)
- Web Speech API (TTS) nativa del navegador
- Sin backend, sin base de datos (100% cliente)

## Commands
```
Dev:   npm run dev
Build: npm run build
Start: npm run start
Lint:  npm run lint
```

## Project Structure
```
app/                 → Rutas, layout, metadata, sitemap, robots
app/page.tsx         → Landing page (composición)
components/          → UI de landing (Hero, HowItWorks, Benefits, FAQ, Ads…)
components/trainer/  → Herramienta de tipeo (TypingTrainer y subcomponentes)
lib/                 → Contenido (textos por nivel) y utilidades (TTS, texto)
```

## Code Style
- Componentes de función, TypeScript estricto, props tipadas.
- Componentes enfocados (<200 líneas); composición sobre configuración.
- Tailwind utility-first, paleta neutra + acento esmeralda (sin morado AI).
- `"use client"` solo donde se necesita estado/DOM.

## Testing Strategy
Sin framework de test en el proyecto. Verificación = `npm run build` + `npm run
lint` sin errores + comprobación manual en navegador (flujo de tipeo, TTS,
stats, temas, responsive).

## Boundaries
- Always: `npm run build` y `npm run lint` antes de publicar; accesibilidad
  básica; textos originales/dominio público.
- Ask first: añadir dependencias nuevas, cambiar config de despliegue.
- Never: incluir contenido con copyright, romper build, enviar claves/secretos.

## Success Criteria
- [ ] Niveles A1–C2 con banco de textos precargados.
- [ ] Toggle tema oscuro/claro persistente.
- [ ] Validación estricta por palabra + TTS en palabra correcta.
- [ ] Tarjeta de palabra actual + teclado virtual interactivo.
- [ ] Modal de resultados con WPM, accuracy, errores, tiempo, continuar y
      auto-continuar.
- [ ] 4 bloques "ANUNCIO": banner bajo herramienta, rectangular, pop-up en
      resultados, flotante en esquina.
- [ ] Secciones Hero, 3 pasos, Beneficios, FAQ acordeón.
- [ ] SEO: title/description/keywords, OG, JSON-LD FAQ, sitemap, robots.
- [ ] Responsive y navegable por teclado.
- [ ] Desplegada con enlace público.

## v2 — Ampliación de alcance (aprobada)

### Nuevos requisitos
1. **Validación dinámica letra por letra:** no se puede escribir una letra si la
   anterior es incorrecta. Máximo 2 errores por palabra; al tercero, la palabra
   se marca como fallida y avanza.
2. **Favicon** del sitio.
3. **Texto tipeado centrado.**
4. **"Empezar a practicar ahora"** lleva a una página dedicada de niveles y
   ejercicios, no a la landing.
5. **Niveles separados por nivel** (rutas por nivel MCER).
6. **Cambio de idioma de la interfaz** (ES/EN).
7. **Login con Google** (Auth.js) para guardar estadísticas y ver perfil.
   Recomendación de cuenta en la landing.
8. **Color de acento azul** (en lugar del verde).
9. **Panel de administración** para ver usuarios registrados.

### Tech Stack añadido
- `next-auth@beta` (Auth.js v5) + `@auth/drizzle-adapter`
- `drizzle-orm` + `@neondatabase/serverless` (Vercel Postgres / Neon)
- i18n propio (contexto + diccionarios ES/EN en cliente)

### Modelo de datos (Drizzle)
- `users` — id, name, email, image, role ('user'|'admin'), createdAt
- `accounts`, `sessions`, `verificationTokens` — tablas del adapter
- `results` — id, userId, level, textId, wpm, accuracy, errors, seconds, createdAt

### Boundaries añadidas
- Never: exponer `AUTH_SECRET`, `DATABASE_URL` ni credenciales OAuth al cliente.
- Ask first: aplicar migraciones sobre una base de datos con datos existentes.
