# DatAIJam

Landing oficial de **DatAIJam**, la conferencia de datos e inteligencia artificial con un hackathon de 4 semanas en Guayaquil, Ecuador.

- Producción: https://dataijam.com
- Registro: formulario externo de Google Forms (no hay backend propio).

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) + [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) con tokens de marca propios
- [React Router](https://reactrouter.com), [Motion](https://motion.dev) y [Lenis](https://lenis.darkroom.engineering) para las animaciones y el scroll suave
- Monorepo con [pnpm](https://pnpm.io) workspaces; el único paquete es `apps/web` (`@dataijam/web`)

## Requisitos

- Node 24 (Node 22.12+ también funciona en local)
- pnpm 11 (`corepack enable` instala la versión fijada en `package.json`)

## Empezar

```bash
git clone https://github.com/SKEIILATT/dataijam.git
cd dataijam
pnpm install --frozen-lockfile
pnpm dev
```

No hace falta ningún `.env` para desarrollar: sin `VITE_GA_MEASUREMENT_ID` la analítica queda apagada.

## Comandos

| Comando                               | Qué hace                                          |
| ------------------------------------- | ------------------------------------------------- |
| `pnpm dev`                            | Servidor de desarrollo de Vite                    |
| `pnpm build`                          | Chequeo de tipos (`tsc -b`) y build de producción |
| `pnpm lint`                           | ESLint sobre `apps/web`                           |
| `pnpm format:check`                   | Verifica el formato con Prettier                  |
| `pnpm format`                         | Aplica el formato con Prettier                    |
| `pnpm --filter @dataijam/web preview` | Sirve localmente el build de producción           |

## Estructura

```text
apps/web/
  src/
    app/              # router y layout raíz
    components/       # UI compartida (ui/) y layout (header, footer)
    features/
      landing/        # una carpeta por sección: componente + *.data.ts + types.ts
      legal/          # términos y privacidad
      analytics/      # GA4 con banner de consentimiento
    pages/            # home-page.tsx arma las secciones y sus anchors
    index.css         # tokens de marca y temas claro/oscuro
  Dockerfile          # imagen de producción
  vercel.json         # configuración de Vercel (entorno de pruebas)
infra/
  nginx/              # nginx del contenedor de producción
  deploy/             # script y timer de systemd del deploy automático
docs/                 # arquitectura, operaciones y guía de marca
```

### Editar contenido

El contenido del evento (speakers, agenda, FAQ, sponsors, sedes, semanas del hackathon) vive en los archivos `*.data.ts` de cada sección dentro de `apps/web/src/features/landing/`. Para cambiar textos o datos, edita esos archivos y no los componentes.

Nunca inventes datos del evento: lo que no está confirmado lleva un placeholder explícito.

## Flujo de trabajo

`main` es producción: cada commit que llega a `main` se publica automáticamente en dataijam.com.

1. Crea una rama desde `develop`: `feature/…`, `fix/…` o `docs/…`.
2. Usa commits convencionales en español, por ejemplo `fix(web): ajusta textos de preguntas frecuentes`.
3. Antes de abrir el PR, corre `pnpm format:check`, `pnpm lint` y `pnpm build`.
4. Abre el PR **hacia `develop`**. Al mergearse, el cambio se prueba en Vercel.
5. Cuando alguien confirma que funciona, se abre un PR de `develop` a `main` para publicarlo.

CI corre formato, lint y build en cada PR. Detalles en [CONTRIBUTING.md](CONTRIBUTING.md) y [AGENTS.md](AGENTS.md).

## Despliegue

| Rama        | Destino                                         |
| ----------- | ----------------------------------------------- |
| `feature/*` | URL de preview en Vercel                        |
| `develop`   | Entorno de pruebas en Vercel                    |
| `main`      | Producción en el VPS (dataijam.com), automático |

Si agregas un origen externo (script, imagen, fuente, API), actualiza la CSP en **ambos** destinos: `infra/nginx/default.conf` y `apps/web/vercel.json`.

## Documentación

- [docs/architecture.md](docs/architecture.md): visión general de la arquitectura
- [docs/operations.md](docs/operations.md): logs, deploy, rollback y configuración de GA4
- [docs/design/README.md](docs/design/README.md): guía de marca (paleta, tipografía, logos, temas)
- [docs/production-readiness-review.md](docs/production-readiness-review.md): seguimiento de rendimiento móvil
