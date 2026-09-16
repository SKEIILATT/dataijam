# Arquitectura

## Aplicaciones

- `apps/web`: landing React/Vite.
- `apps/api`: API NestJS.
- `compose.yaml`: PostgreSQL de desarrollo.

## Desarrollo local

1. Copiar `.env.example` a `.env` y elegir una contrasena local.
2. Copiar `apps/api/.env.example` a `apps/api/.env` y mantener la misma contrasena en `DATABASE_URL`.
3. Ejecutar `docker compose up -d postgres`.
4. Ejecutar `pnpm dev:web` y `pnpm dev:api` en terminales separadas.

Prisma esta preparado en `apps/api/prisma`, pero no contiene modelos ni migraciones. Los modelos se crean solo al aprobar los requisitos de negocio.

## Produccion

Los Dockerfiles construyen web y API. Nginx sirve la SPA y reenvia `/api/` a la API; el fallback a `index.html` permite recargar rutas de React Router. HTTPS, secretos de produccion y backups se configuran en el servidor, nunca en Git.
