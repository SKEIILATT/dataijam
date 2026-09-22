# Arquitectura

## Aplicaciones

- `apps/web`: landing React/Vite. Es la unica aplicacion del workspace; no hay backend propio.
- El registro al evento se maneja con un formulario externo de Google Forms.

## Desarrollo local

Ejecutar `pnpm dev` para levantar el frontend.

## Produccion

El Dockerfile construye el frontend y Nginx sirve la SPA, con fallback a `index.html` para las rutas de React Router. HTTPS y secretos de produccion se configuran en el servidor, nunca en Git.
