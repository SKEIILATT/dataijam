# Operacion

## Produccion

1. Configura un proxy HTTPS en el servidor con certificado válido y redirección de HTTP a HTTPS. La aplicación escucha por defecto solo en `127.0.0.1:8080` para que el proxy la publique.
2. Copia `.env.production.example` a `.env.production` en el servidor. Ajusta `HTTP_BIND_ADDRESS` y `HTTP_PORT` si tu proxy usa otra conexión.
3. Despliega con `docker compose -f compose.production.yaml --env-file .env.production up -d --build`.
4. Verifica `https://tu-dominio`, `https://tu-dominio/terminos`, `https://tu-dominio/privacidad` y `https://tu-dominio/robots.txt`. Comprueba que el botón de inscripción abra el formulario oficial y que `registros@dataijam.com` reciba mensajes.
5. Comprueba que el proxy preserve las cabeceras de seguridad, redirija HTTP a HTTPS y emita HSTS solo después de validar el certificado y las rutas HTTPS.

HTTPS y secretos de producción se configuran en el servidor, nunca en Git.

## Vercel

El proyecto de vista previa de Vercel usa `apps/web` como directorio raíz. Su `vercel.json` aplica las mismas cabeceras de seguridad y permite abrir directamente las rutas de la SPA. Antes de promover una versión a producción, comprueba las rutas, el formulario y las cabeceras en el dominio final; las vistas previas pueden estar protegidas por inicio de sesión.

## Google Analytics 4

La analítica permanece apagada si no se configura `VITE_GA_MEASUREMENT_ID`. El ID de medición es público y tiene el formato `G-XXXXXXXXXX`; no es una clave secreta. La etiqueta de Google solo se descarga después de que una persona acepte la analítica en la web.

1. En Google Analytics, crea una propiedad GA4 y un flujo de datos **Web** para el dominio final. Copia el **ID de medición** desde Administrar → Flujos de datos → Web. [Guía oficial para localizarlo](https://support.google.com/analytics/answer/9311124/ga4-common-mistakes-with-tag-setup).
2. En el flujo, entra en Medición mejorada → Vistas de página → Configuración avanzada y desactiva **Cambios de página basados en eventos del historial**. La web envía manualmente una vista al abrir o cambiar entre `/`, `/terminos` y `/privacidad`; este ajuste evita duplicados. Los enlaces `#seccion` no cuentan como páginas nuevas. [Guía oficial de vistas de página en SPA](https://developers.google.com/analytics/devguides/collection/ga4/views).
3. Completa y aprueba antes de activar la medición los datos del responsable, la base jurídica y el plazo de conservación en la política de privacidad. Configura la retención de datos en la propiedad GA4 según esa decisión.
4. En Vercel, agrega `VITE_GA_MEASUREMENT_ID` a las variables de entorno del proyecto y vuelve a desplegar. Con Docker, agrégala al archivo local `.env.production` antes de ejecutar `docker compose -f compose.production.yaml --env-file .env.production up -d --build`; Compose la pasa al build. No incluyas ese archivo en Git.
5. Comprueba en el dominio final que **Rechazar** no carga `gtag.js` ni envía peticiones a Google; **Aceptar analítica** debe registrar una vista por ruta en Tiempo real o DebugView. El botón **Quiero participar** debe registrar `registration_form_open` solo después de aceptar. Verifica que cambiar a **Rechazar** desde el pie de página detenga nuevas peticiones y elimine las cookies `_ga*`.

El evento `registration_form_open` mide aperturas del formulario externo, no inscripciones completadas. Esa conversión requeriría acceso y configuración del formulario o un flujo de registro propio.
