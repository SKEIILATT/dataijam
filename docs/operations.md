# Operacion

## Produccion

1. Configura un proxy HTTPS en el servidor con certificado válido y redirección de HTTP a HTTPS. La aplicación escucha por defecto solo en `127.0.0.1:8080` para que el proxy la publique.
2. Copia `.env.production.example` a `.env.production` en el servidor. Ajusta `HTTP_BIND_ADDRESS` y `HTTP_PORT` si tu proxy usa otra conexión.
3. Despliega con `docker compose -f compose.production.yaml --env-file .env.production up -d --build`.
4. Verifica `https://tu-dominio`, `https://tu-dominio/terminos`, `https://tu-dominio/privacidad` y `https://tu-dominio/robots.txt`. Comprueba que el botón de inscripción abra el formulario oficial y que `registros@dataijam.com` reciba mensajes.
5. Comprueba que el proxy preserve las cabeceras de seguridad, redirija HTTP a HTTPS y emita HSTS solo después de validar el certificado y las rutas HTTPS.

HTTPS y secretos de producción se configuran en el servidor, nunca en Git.
