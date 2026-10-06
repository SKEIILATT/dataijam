#!/usr/bin/env bash
# Despliega dataijam.com cuando `main` tiene un commit nuevo.
# Lo ejecuta dataijam-deploy.timer en el VPS; tambien se puede correr a mano:
#   sudo systemctl start dataijam-deploy
#
# Todo vive dentro de main() para que bash lea el script completo antes de
# ejecutarlo: `git reset` puede reescribir este mismo archivo durante el deploy.
set -euo pipefail

main() {
  local repo_dir="${DATAIJAM_DIR:-/opt/dataijam}"
  local branch="${DATAIJAM_BRANCH:-main}"
  local env_file="$repo_dir/.env.production"
  local compose=(docker compose -f "$repo_dir/compose.production.yaml" --env-file "$env_file")

  # Evita dos deploys a la vez (timer + ejecucion manual).
  exec 9>"${TMPDIR:-/tmp}/dataijam-deploy.lock"
  if ! flock -n 9; then
    echo "Otro deploy esta en curso; se omite esta ejecucion."
    return 0
  fi

  cd "$repo_dir"
  git fetch --quiet --prune origin "$branch"

  # Se compara contra el ultimo commit desplegado (no contra HEAD) para que un
  # build fallido no quede marcado como desplegado.
  local deployed_file="$repo_dir/.git/dataijam-deployed"
  local failed_file="$repo_dir/.git/dataijam-failed"
  local deployed target
  deployed="$(cat "$deployed_file" 2>/dev/null || git rev-parse HEAD)"
  target="$(git rev-parse "origin/$branch")"
  if [[ "${FORCE_DEPLOY:-0}" != "1" ]]; then
    if [[ "$deployed" == "$target" ]]; then
      echo "Sin cambios en $branch (${target:0:7})."
      return 0
    fi
    # No reintenta cada 2 minutos un commit que ya fallo; espera uno nuevo.
    if [[ "$(cat "$failed_file" 2>/dev/null)" == "$target" ]]; then
      echo "${target:0:7} ya fallo antes; esperando un commit nuevo o FORCE_DEPLOY=1."
      return 0
    fi
  fi

  echo "Desplegando $branch: ${deployed:0:7} -> ${target:0:7}"
  echo "$target" >"$failed_file"
  git reset --hard --quiet "$target"

  # Si el build falla, compose no reemplaza el contenedor y el sitio sigue
  # sirviendo la version anterior.
  "${compose[@]}" up -d --build --remove-orphans
  docker image prune -f >/dev/null

  local port
  port="$(sed -n 's/^HTTP_PORT=//p' "$env_file" | tail -n 1)"
  port="${port:-8080}"
  local path
  for path in / /terminos; do
    if ! curl -fsS --retry 10 --retry-delay 3 --retry-all-errors -o /dev/null \
      "http://127.0.0.1:${port}${path}"; then
      echo "Health check fallido en ${path} tras desplegar ${target:0:7}." >&2
      return 1
    fi
  done

  echo "$target" >"$deployed_file"
  rm -f "$failed_file"
  echo "Deploy completado: ${target:0:7} $(git log -1 --format=%s)"
}

main "$@"
exit
