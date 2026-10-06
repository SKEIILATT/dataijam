# Contribuir

1. Crea una rama desde `develop` con formato `feature/nombre`, `fix/nombre` o `docs/nombre`.
2. Usa commits como `feat: agrega agenda` o `fix: corrige validacion`.
3. Antes de abrir un Pull Request, ejecuta `pnpm format:check`, `pnpm lint` y `pnpm build`.
4. No subas archivos `.env`, backups ni datos personales.
5. Los Pull Requests de trabajo van a `develop`, que se prueba en Vercel. `main` es producción: solo recibe Pull Requests desde `develop` (o hotfix) y cada merge se despliega automáticamente en `dataijam.com`.
