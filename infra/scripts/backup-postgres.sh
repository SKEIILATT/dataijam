#!/usr/bin/env sh
set -eu

ENV_FILE=${ENV_FILE:-.env.production}
BACKUP_DIR=${BACKUP_DIR:-./backups/postgres}
BACKUP_RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-14}

set -a
. "$ENV_FILE"
set +a

mkdir -p "$BACKUP_DIR"
timestamp=$(date -u +%Y%m%dT%H%M%SZ)
backup_file="$BACKUP_DIR/dataijam-$timestamp.sql.gz"

docker compose -f compose.production.yaml --env-file "$ENV_FILE" exec -T postgres \
  pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" | gzip > "$backup_file"

find "$BACKUP_DIR" -type f -name '*.sql.gz' -mtime +"$BACKUP_RETENTION_DAYS" -delete
echo "Backup created: $backup_file"
