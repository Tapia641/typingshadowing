# Implementation Plan: Typing Shadowing

## Overview
Construir una app Next.js 100% cliente que combine mecanografía y shadowing:
el usuario tipea textos adaptados por nivel MCER y escucha cada palabra por TTS.
Landing informativa + herramienta + monetización placeholder + SEO + despliegue.

## Architecture Decisions
- **Sin backend**: todo el estado vive en el cliente (useState/useReducer).
- **TTS nativo** (`window.speechSynthesis`) en lugar de audio externo: sin
  dependencias ni coste, pronuncia cualquier texto.
- **Módulo de contenido** (`lib/texts.ts`) con textos de dominio público
  adaptados por nivel, tipados.
- **Utilidad de tokenización** (`lib/text-utils.ts`): separa signos de
  puntuación del núcleo de cada palabra para validar solo el núcleo (evita
  obligar a teclear comas/comillas).
- **Tema con clase `.dark`** (`@custom-variant dark` en Tailwind v4) + script
  inline anti-flash.
- **Todo en una sola ruta** (`/`) para landing + herramienta; SEO por metadata.

## Task List

### Phase 1: Foundation
- [ ] Task 1: Tema global, CSS, layout con SEO/metadata/JSON-LD.
- [ ] Task 2: Contenido por nivel + utilidades (tokenizar, TTS, stats).

### Checkpoint: Foundation
- [ ] `npm run build` y `npm run lint` limpios.

### Phase 2: Core Features
- [ ] Task 3: Tipos y AdSlot + Header + ThemeToggle.
- [ ] Task 4: TypingTrainer (validación estricta, TTS, stats, nivel).
- [ ] Task 5: CurrentWordCard + VirtualKeyboard + ResultsModal.

### Checkpoint: Core Features
- [ ] Flujo completo: elegir nivel → tipear → TTS → resultados → continuar.

### Phase 3: Landing + Polish
- [ ] Task 6: Hero, HowItWorks, Benefits, FAQ, Footer.
- [ ] Task 7: Posiciones de anuncios + sitemap/robots + responsable.
- [ ] Task 8: Verificación responsive/accesibilidad y build final.

### Checkpoint: Complete
- [ ] Criterios de éxito cumplidos.
- [ ] Desplegada con enlace.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Voces TTS no cargan al inicio | Medio | `onvoiceschanged` + fallback `lang="en-US"` |
| Despliegue requiere login | Alto | Pedir al usuario autenticar Vercel o dar alternativa |
| React 19 / Next 16 tipos nuevos | Bajo | Usar patrones del layout existente |

## Open Questions
- ¿Vercel con cuenta del usuario u otro hosting?

## v2 Task List (ampliación aprobada)

### Phase 4: Reescritura de la práctica
- [ ] Task 9: Validación dinámica letra por letra (máx. 2 errores/palabra) + texto centrado.
- [ ] Task 10: Ruta `/practicar` con niveles; mover ejercicio fuera de la landing.
- [ ] Task 11: Rutas por nivel (`/practicar/[level]`) y banco dividido.
- [ ] Task 12: Tema azul + favicon.

### Phase 5: Cuenta y datos
- [ ] Task 13: Auth.js + Drizzle + Neon (schema, adaptador, `/api/auth`).
- [ ] Task 14: Guardado de resultados + página de perfil.
- [ ] Task 15: Recomendación de cuenta en la landing + menú de usuario.

### Phase 6: i18n y admin
- [ ] Task 16: Cambio de idioma ES/EN.
- [ ] Task 17: Panel de admin (`/admin`) con usuarios registrados.

### Checkpoint v2
- [ ] Build + lint limpios; flujo completo; despliegue actualizado.
