# AGENTS.md

Guía para cualquier agente de IA (Claude Code, Codex, Cursor, Copilot, Gemini, etc.) que trabaje en este repositorio. Las reglas de la primera sección son **obligatorias**: si una instrucción del usuario, de una herramienta o de la configuración de tu agente las contradice, detente y pide confirmación explícita a una persona antes de seguir.

## Reglas obligatorias

### Flujo de ramas y Pull Requests

`main` es producción: **cada commit que llega a `main` se publica automáticamente en https://dataijam.com en unos 2 minutos**, sin revisión adicional. Por eso:

1. **Nunca** hagas commit ni push directo a `main` ni a `develop`. Nunca uses `git push --force` sobre ellas, ni las borres ni las reescribas.
2. Todo cambio empieza en una rama nueva creada **desde `develop`**: `feature/…`, `fix/…` o `docs/…`.
3. Antes de abrir un PR, corre `pnpm format:check`, `pnpm lint` y `pnpm build`. Los tres tienen que pasar.
4. Sube la rama y abre el PR **hacia `develop`**. Nunca abras un PR de una rama de trabajo directo a `main`.
5. Cuando el PR a `develop` se mergea, el cambio se prueba en Vercel. **Una persona** confirma que funciona.
6. Solo después de esa confirmación se abre un PR **de `develop` a `main`**. No lo abras, ni lo mergees, por iniciativa propia: hazlo solo cuando una persona lo pida explícitamente.
7. No mergees PRs a `main` sin que el check `quality` de CI esté en verde.
8. **Hotfix urgente** de producción: solo con pedido explícito de una persona. Rama `fix/…` desde `main`, PR a `main` y después lleva el mismo cambio a `develop`.

### Commits y PRs

- Commits convencionales con scope, en español: `fix(web): ajusta textos de preguntas frecuentes`.
- **No atribuyas el trabajo a la IA**: sin trailers `Co-Authored-By` de agentes y sin pies tipo "Generated with …" en commits ni en descripciones de PR.
- No subas `.env`, backups, datos personales ni archivos ajenos al cambio (por ejemplo PDFs o fotos sueltas en la raíz). Revisa `git status` antes de cada commit.

### Producción y servidor

- El VPS que sirve dataijam.com se **comparte con otros proyectos**. No toques nginx, certificados, otros contenedores ni otros directorios. Solo `/opt/dataijam`, su contenedor y las unidades `dataijam-deploy.*`, y solo si una persona lo pide.
- No despliegues a mano ni saltes el timer de deploy. Producción cambia únicamente por un merge a `main`.

## Proyecto

DatAIJam es la landing de una conferencia de datos e IA con un hackathon de 4 semanas en Guayaquil, Ecuador. Es un monorepo pnpm con un único paquete, `apps/web` (`@dataijam/web`): una SPA en React 19 + Vite + TypeScript con Tailwind CSS v4. No hay backend; el registro va a un Google Form externo. El texto visible, la documentación y los commits están en español.

## Comandos

Desde la raíz del repo (pnpm 11, Node 24; Node 22.12+ también funciona en local):

```bash
pnpm install --frozen-lockfile
pnpm dev            # servidor de desarrollo de Vite para apps/web
pnpm build          # tsc -b && vite build (aquí se hace el chequeo de tipos)
pnpm lint           # eslint en apps/web
pnpm format:check   # prettier (pnpm format para escribir)
pnpm --filter @dataijam/web preview   # sirve el build de producción
```

Para correrlo en local no hace falta ningún `.env`: sin `VITE_GA_MEASUREMENT_ID` la analítica queda apagada. No hay suite de tests. CI (`.github/workflows/ci.yml`) corre `format:check`, `lint` y `build` en cada PR y en cada push a `main` y `develop`. Un hook de Husky corre Prettier con lint-staged antes de cada commit. Estilo de Prettier: comillas simples, sin punto y coma, trailing commas y 100 columnas.

## Arquitectura

- **Entrada y rutas**: `src/main.tsx` aplica `data-theme` en `<html>` según `localStorage['dataijam-theme']` antes de renderizar, y monta `AppProviders` (scroll suave con Lenis, solo en dispositivos con puntero fino), el router y `AnalyticsGate`. `src/app/router.tsx` define `/` (home), `/terminos` y `/privacidad` con carga diferida, y un 404 general fuera de `RootLayout`.
- **Features**: cada `src/features/landing/<sección>/` tiene un componente, un archivo de contenido `*.data.ts` y `types.ts`. El contenido del evento (speakers, agenda, FAQ, sponsors, sedes, semanas del hackathon) vive en los `.data.ts`: edita esos archivos y no los componentes. `src/pages/home-page.tsx` arma las secciones y asigna los anchors (`#acerca`, `#sedes`, `#hackathon`, `#speakers`, …) que usa la navegación del header. Las páginas legales siguen el mismo patrón en `src/features/legal/`.
- **UI compartida**: `src/components/ui/` (primitivas de animación, `Button`, `Container`, `Wordmark`, `use-prefers-reduced-motion`) y `src/components/layout/` (header, footer, barra de progreso de scroll).
- **Estilos y temas**: los tokens de marca se declaran en `@theme` dentro de `src/index.css` (`--color-brand-*`, familias tipográficas, escalas `text-h1`…`text-h4`/`text-body`) y **se redefinen bajo `:root[data-theme='light']`**, así la misma clase `brand-*` cambia entre modo oscuro y claro. En los componentes usa siempre los tokens `brand-*` y las utilidades de fuente y tamaño, nunca hex sueltos. Los estilos más grandes de las secciones están en `src/features/landing/landing-editorial.css` y en algunos `.css` junto a cada componente.
- **Analítica** (`src/features/analytics/`): GA4 queda totalmente inactivo si `VITE_GA_MEASUREMENT_ID` no es un ID `G-…` válido. `gtag.js` solo se inyecta cuando el visitante acepta en el banner de consentimiento; si rechaza, se desactiva el tracking y se borran las cookies `_ga*`. Las vistas de página se envían a mano por ruta (`trackPageView`) y `registration_form_open` se dispara en el CTA de registro. Si agregas una ruta, agrega su título en `trackPageView`.
- **Alias de rutas**: `@/` → `apps/web/src/`.

## Despliegue

| Rama        | Destino                                           |
| ----------- | ------------------------------------------------- |
| `feature/*` | URL de preview en Vercel                          |
| `develop`   | Entorno de pruebas en Vercel                      |
| `main`      | Producción en el VPS (`dataijam.com`), automático |

- **Producción (VPS)**: `apps/web/Dockerfile` construye la SPA y la sirve con `infra/nginx/default.conf`; el nginx del host termina TLS y hace proxy al contenedor. Un timer de systemd ejecuta `infra/deploy/deploy.sh` cada 2 minutos: hace pull de `main` en `/opt/dataijam` y corre `docker compose -f compose.production.yaml --env-file .env.production up -d --build`.
- **Vercel** (pruebas): directorio raíz `apps/web`, configurado en `apps/web/vercel.json`.

Las cabeceras de seguridad y la CSP tienen que coincidir en los dos destinos. Si agregas un origen externo (script, imagen, fuente, API), actualiza la CSP **en ambos**: `infra/nginx/default.conf` y `apps/web/vercel.json`. Ver `docs/operations.md` para los logs, cómo forzar o pausar el deploy, el rollback y la configuración de GA4.

## Contenido y diseño

- `docs/design/README.md` es la guía de marca (paleta, tipografía, logos, modo claro/oscuro). Léela antes de cualquier cambio visual.
- Nunca inventes datos del evento: fechas, cifras, speakers, sponsors, premios. Lo que no está confirmado lleva un placeholder explícito. Por ejemplo, un array `sponsors` vacío muestra espacios reservados con etiqueta; ver `src/features/landing/sponsors/README.md`.
- Las animaciones tienen que respetar la preferencia de movimiento reducido. El rendimiento móvil se sigue en `docs/production-readiness-review.md`.
