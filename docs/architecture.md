# Arquitectura

## Aplicaciones

- `apps/web`: landing React/Vite. Es la unica aplicacion del workspace; no hay backend propio.
- El registro al evento se maneja con un formulario externo de Google Forms.

## Desarrollo local

Ejecutar `pnpm install` y `pnpm dev` para levantar el frontend. No hace falta ningún `.env`: sin `VITE_GA_MEASUREMENT_ID` la analítica queda apagada.

## Produccion

El Dockerfile construye el frontend y Nginx sirve la SPA, con fallback a `index.html` para las rutas de React Router. Cada merge a `main` se despliega automáticamente en el VPS y `develop` se prueba en Vercel (ver `docs/operations.md`). HTTPS y secretos de produccion se configuran en el servidor, nunca en Git.
