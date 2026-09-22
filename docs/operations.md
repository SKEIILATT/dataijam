# Operacion

## Produccion

1. Copia `.env.production.example` a `.env.production` en el servidor y ajusta `HTTP_PORT` si el default no aplica.
2. Despliega con `docker compose -f compose.production.yaml --env-file .env.production up -d --build`.
3. Verifica que `https://tu-dominio` cargue correctamente.

HTTPS y secretos de produccion se configuran en el servidor, nunca en Git.
