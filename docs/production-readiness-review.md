# Revisión previa a producción — DatAIJam

Fecha: 5 de octubre de 2026. Base revisada: `f223733` más los cambios de esta revisión.

## Dictamen

**Pendiente de aprobación para publicar.** El frontend y el contenedor funcionan en las pruebas locales. Quedan dos verificaciones necesarias que no pueden hacerse desde el repositorio: completar y aprobar el aviso de privacidad con los datos reales del responsable, y validar el dominio con HTTPS y el correo en el servidor de producción. El rendimiento móvil también merece una mejora posterior, aunque no se detectó un fallo funcional.

## Pruebas realizadas

| Área                                                                             | Resultado                                                                                                                                       |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile`, `pnpm format:check`, `pnpm lint`, `pnpm build` | Pasan                                                                                                                                           |
| `pnpm audit --prod --audit-level moderate`                                       | Sin vulnerabilidades conocidas reportadas                                                                                                       |
| Imagen Docker y `nginx -t`                                                       | Construyen y validan                                                                                                                            |
| Escritorio, tableta y móvil                                                      | Sin desplazamiento horizontal a 320, 390, 768 y 1440 px; sin errores de consola ni peticiones fallidas                                          |
| Interacciones                                                                    | Menú móvil, agenda, preguntas frecuentes, tema claro/oscuro, registro y páginas legales funcionan                                               |
| Formulario de Google                                                             | La URL abre el formulario y muestra campos; no se envió una inscripción real                                                                    |
| HTTP del contenedor                                                              | `robots.txt` devuelve texto y 200; los archivos inexistentes en `/assets/` devuelven 404; la SPA sirve las rutas legales                        |
| Seguridad HTTP                                                                   | CSP, `nosniff`, protección contra marcos, política de referencia y permisos presentes; el puerto de Compose se enlaza a `127.0.0.1` por defecto |

Lighthouse 13.5, Chromium/Edge sin caché, sobre el contenedor local:

| Métrica                                      |  Móvil simulado |      Escritorio |
| -------------------------------------------- | --------------: | --------------: |
| Rendimiento                                  |          70/100 |          84/100 |
| Accesibilidad / prácticas recomendadas / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| Primer contenido (FCP)                       |           2,3 s |           0,5 s |
| Elemento principal (LCP)                     |           6,0 s |           1,4 s |
| Bloqueo total (TBT)                          |          220 ms |          280 ms |
| Movimiento de diseño (CLS)                   |               0 |               0 |
| Transferencia total                          |       1.539 KiB |       1.881 KiB |

Son mediciones de laboratorio sobre un servidor local y pueden variar entre ejecuciones. No representan la latencia de usuarios reales ni sustituyen una medición tras publicar el sitio. La versión inicial transfería aproximadamente 2.933 KiB en la prueba móvil comparable; las imágenes optimizadas, las fuentes locales y la eliminación de una dependencia sin uso redujeron esa carga.

Capturas del contenedor final: [móvil de 320 px](review/production-mobile.png) y [escritorio de 1440 px](review/production-desktop.png).

## Cambios aplicados

- Imágenes editoriales y textura del globo convertidas a WebP; póster móvil más ligero y precargado. Se mantiene el material original en el repositorio.
- Fuentes Inter, Sora y Space Grotesk servidas por la propia web, con licencias incluidas. El globo deja de procesarse continuamente en pantallas pequeñas y cuando se solicita movimiento reducido.
- Eliminada la dependencia de React Query, que no tenía consultas en la aplicación.
- `robots.txt`, caché de recursos con versión, cabeceras de seguridad y errores 404 para recursos ausentes. El contenedor escucha por defecto solo en la interfaz local para usar un proxy HTTPS delante.
- Configuración de Vercel en `apps/web/vercel.json` con cabeceras de seguridad y rutas directas para la SPA. La vista previa requiere inicio de sesión, por lo que sus respuestas de la aplicación no pudieron auditarse desde fuera.
- Política de privacidad actualizada para describir las fuentes locales y los campos observados en el formulario de inscripción.

## Pendiente antes de publicar

1. **Aviso de privacidad.** Identificar a la persona o entidad responsable con nombre legal, domicilio, teléfono y correo; especificar la base jurídica y el plazo de conservación aplicables; revisar que el aviso mostrado al recopilar datos en Google Forms coincida con la política. El formulario pide cédula. El [artículo 12 de la Ley Orgánica de Protección de Datos Personales](https://spdp.gob.ec/wp-content/uploads/2024/12/03.pdf.pdf) enumera la información que debe recibir la persona titular. Estos datos y decisiones no se pueden inventar desde el código; requieren confirmación del organizador y revisión jurídica.
2. **Infraestructura real.** Confirmar si se publicará con Vercel o Docker. En Docker, configurar DNS, certificado TLS, redirección HTTP→HTTPS y proxy hacia `127.0.0.1:8080`; habilitar HSTS cuando HTTPS esté validado. En Vercel, validar que el dominio final aplique `apps/web/vercel.json`. En ambos casos, probar las rutas, las cabeceras y el botón de inscripción en el dominio final. La vista previa de Vercel está protegida por inicio de sesión, así que no confirma estas respuestas públicas.
3. **Canal de contacto.** Se encontró registro MX para `dataijam.com`, pero eso no prueba que `registros@dataijam.com` reciba y responda mensajes. Hacer una prueba de envío y respuesta.
4. **Contenido del evento.** Hay cinco ponentes aún ocultos, patrocinadores sin confirmar, asistentes estimados marcados como «Pronto» y premios pendientes. Confirmar que este estado sea el que se desea mostrar el día del lanzamiento. La agenda nombra a Pablo Estrada, mientras que Josue Davalos figura entre los ponentes anunciados sin aparecer aún por nombre en esa agenda.

## Mejoras posteriores recomendadas

- Reducir el JavaScript inicial (aprox. 586 KiB minificados, 186 KiB con gzip) separando código de secciones que no se ven al abrir la página. Repetir la prueba móvil tras el cambio.
- Servir variantes de menor resolución para la fotografía de Guayaquil y otras imágenes decorativas; Lighthouse aún estima ahorro de imágenes.
- Configurar las URL absolutas de metadatos sociales cuando se conozca el dominio definitivo. Verificar cómo se comparte la página en redes.

No se ejecutó una prueba de penetración ni se comprobó la entrega de correo, una inscripción real o la configuración HTTPS de un servidor público. Esta revisión cubre el código, las dependencias, el contenedor y el comportamiento local.
