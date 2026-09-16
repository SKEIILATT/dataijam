# Operacion

## Produccion

1. Copia `.env.production.example` a `.env.production` en el servidor y define secretos fuertes.
2. Despliega con `docker compose -f compose.production.yaml --env-file .env.production up -d --build`.
3. Verifica `https://tu-dominio/api/health`.

## Backups

Ejecuta `infra/scripts/backup-postgres.sh` desde la raiz del repositorio. Por defecto conserva 14 dias y guarda los archivos en `backups/postgres/`, ruta ignorada por Git.

En el servidor, programa una ejecucion diaria con cron y prueba restauraciones antes del lanzamiento.
