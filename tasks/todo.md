# TODO: Typing Shadowing

## v1
- [x] Landing, herramienta de tipeo, SEO, anuncios, despliegue.

## v2 — Ampliación
- [x] Task 9: Validación dinámica letra por letra (máx. 2 errores/palabra) + texto centrado.
- [x] Task 10: Ruta `/practicar` con niveles; ejercicio fuera de la landing.
- [x] Task 11: Rutas por nivel (`/practicar/[level]`) y banco dividido.
- [x] Task 12: Tema azul + favicon (icon.svg) + manifest.
- [x] Task 13: Auth.js + Drizzle + Neon (código, schema, adaptador, `/api/auth`).
- [x] Task 14: Guardado de resultados + página de perfil.
- [x] Task 15: Recomendación de cuenta + menú de usuario.
- [x] Task 16: Cambio de idioma ES/EN.
- [x] Task 17: Panel de admin (`/admin`) con usuarios registrados.

## Activación (completado)
- [x] Neon Postgres provisionado (`DATABASE_URL`) y schema aplicado
      (tablas: users, accounts, sessions, verification_tokens, results).
- [x] Google OAuth configurado (`AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`).
- [x] `AUTH_SECRET` y `ADMIN_EMAIL` configurados.
- [x] AdSense: cliente `ca-pub-5466102991773001` configurado y script cargando.
- [x] `ads.txt` sirviendo la línea de autorización.
- [x] Redeploy y verificación (login OAuth → redirección a Google OK).

## Correcciones de tipeo (v3)
- [x] Validación dinámica: se bloquea el avance si hay una letra errónea sin
      corregir (hay que borrarla). Sin auto-fallar la palabra.
- [x] Estadísticas por pulsaciones: WPM = (aciertos/5)/min, precisión =
      aciertos/pulsaciones, contador de errores.
- [x] Panel de estadísticas en vivo (WPM, precisión, tiempo, progreso).
- [x] Popup de resultados al terminar un texto.
- [x] Botón "Avanzar sin ver estadísticas" (las muestra al final del nivel).
- [x] Sonidos de tecla (click/acierto y zumbido/error) con Web Audio API.
- [x] Feedback carácter a carácter (verde acierto / rojo error subrayado).
- [x] Teclado virtual resalta "borrar" cuando hay error.
- [x] Banco de textos ampliado con clásicos de dominio público (A1–C2).

## Pendiente (usuario)
- [ ] Rotar el Client Secret de Google (se compartió en texto plano).

## Anuncios AdSense (activado)
- [x] Cliente `ca-pub-5466102991773001` + 4 slots configurados:
  - horizontal `9194032490`
  - rectangular `7110794638`
  - pop-up `1489048276`
  - flotante `5428293284`
- [x] `data-ad-client`, `data-ad-slot` y `adsbygoogle.push` en las 4 posiciones.
- [x] `ads.txt` con la línea de autorización.
- [x] Verificado en producción (HTML + bundle cliente).
