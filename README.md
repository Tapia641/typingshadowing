# Typing Shadowing

Aprende inglés **tipeando y escuchando** (typing + shadowing) con textos
adaptados a los niveles MCER **A1, A2, B1, B2, C1 y C2**. Gratis, sin registro.

🔗 **Demo en vivo:** https://www.typingshadowing.online

## Características

- **Niveles MCER (A1–C2):** pestañas para cambiar de dificultad, con banco de
  textos precargados por nivel.
- **Tema claro/oscuro:** toggle persistente en `localStorage`, sin parpadeo al
  cargar.
- **Validación estricta por palabra:** no avanzas hasta escribir bien la palabra
  actual y pulsar espacio.
- **Feedback auditivo (TTS):** al completar cada palabra se pronuncia en inglés
  con la Web Speech API nativa del navegador.
- **Tarjeta de palabra actual** + **teclado virtual** que resalta la siguiente
  tecla.
- **Estadísticas:** WPM, precisión, errores y tiempo; botón *Continuar* y toggle
  *Continuar automáticamente*.
- **Espacios publicitarios** placeholder ("ANUNCIO"): banner horizontal,
  rectangular, pop-up en resultados y banner flotante.
- **SEO:** metadata, Open Graph, JSON-LD (WebApplication + FAQPage), `sitemap.xml`
  y `robots.txt`.
- **Accesible y responsive** (320 / 768 / 1024 / 1440).

## Estructura

```
app/                 Rutas, layout, metadata, sitemap, robots
components/          Landing (Hero, HowItWorks, Benefits, FAQ, ads…)
components/trainer/  Herramienta de tipeo
lib/                 Contenido por nivel, utilidades y TTS
```

## Desarrollo

```bash
npm run dev        # servidor de desarrollo
npm run lint       # ESLint
npm run build      # build de producción
npm run start      # servir el build
npm run db:push    # aplicar el schema a la base de datos (Drizzle)
```

## Cuenta y base de datos (opcional)

Sin las variables de entorno, la app funciona igual y el login queda
deshabilitado. Para activar Google, estadísticas guardadas y el panel de admin:

1. **Postgres (Neon / Vercel Postgres):** crea la base de datos y copia su
   cadena de conexión en `DATABASE_URL`.
2. **Auth.js:** define `AUTH_SECRET` (`npx auth secret`).
3. **Google OAuth:** crea credenciales en
   <https://console.cloud.google.com/apis/credentials> con el redirect
   `https://TU_DOMINIO/api/auth/callback/google` y define `AUTH_GOOGLE_ID` y
   `AUTH_GOOGLE_SECRET`.
4. **Admin:** define `ADMIN_EMAIL` con tu correo para obtener el rol `admin`.
5. Aplica el schema: `npm run db:push`.

Copia `.env.example` a `.env.local` para desarrollo.

## Contenido

Los textos provienen de obras de **dominio público** adaptadas por nivel o son
textos originales escritos para esta aplicación. No se reproduce material con
copyright.
