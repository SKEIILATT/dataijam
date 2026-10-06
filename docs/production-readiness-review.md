# Revisión previa a producción — DatAIJam

Fecha: 5 de octubre de 2026. Base revisada: `f223733` más los cambios de esta revisión.

## Dictamen

**Pendiente de aprobación para publicar.** El frontend y el contenedor funcionan en las pruebas locales. Quedan verificaciones que no pueden hacerse desde el repositorio: completar y aprobar el aviso de privacidad con los datos reales del responsable, validar el dominio con HTTPS y el correo en el servidor de producción y, si se activa GA4, configurar la propiedad y comprobar el consentimiento en ese dominio. El rendimiento móvil mejoró, aunque el pintado del elemento principal todavía tiene margen de mejora.

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

Tras incorporar la agenda y la foto de Fabricio, una ejecución sobre `vite preview` local obtuvo rendimiento 69 en móvil y 92 en escritorio. Después de optimizar la carga móvil, una ejecución obtuvo 80 en móvil y 96 en escritorio. Tras ajustar las animaciones, las dos últimas ejecuciones obtuvieron 79 y 80 en móvil, y 96 en escritorio; accesibilidad, prácticas recomendadas y SEO quedaron en 100 en ambos. Las mediciones locales pueden variar entre ejecuciones.

| Métrica móvil tras actualizar la agenda | Antes de optimizar | Versión actual |
| --------------------------------------- | -----------------: | -------------: |
| Rendimiento                             |                 69 |             80 |
| Primer contenido (FCP)                  |              2,1 s |          2,0 s |
| Elemento principal (LCP)                |              5,8 s |          4,9 s |
| Bloqueo total (TBT)                     |             330 ms |          96 ms |
| Movimiento de diseño (CLS)              |                  0 |              0 |
| Transferencia total                     |          1.491 KiB |        943 KiB |

Capturas del contenedor final: [móvil de 320 px](review/production-mobile.png) y [escritorio de 1440 px](review/production-desktop.png).

Capturas de la agenda y Fabricio tras la actualización: [agenda móvil](review/agenda-mobile.png), [agenda de escritorio](review/agenda-desktop.png), [tarjeta móvil](review/fabricio-mobile.png) y [tarjeta de escritorio](review/fabricio-desktop.png).

Captura del tramo de experiencia optimizado en [móvil](review/mobile-experience-optimized.png).

Captura del selector de semanas del hackathon en [móvil](review/hackathon-mobile-smooth.png).

Captura de la tarjeta de registro con el adorno estático en [móvil](review/registration-mobile-static.png).

Captura de las opciones de consentimiento de analítica en [móvil](review/analytics-consent-mobile.png).

## Cambios aplicados

- Imágenes editoriales y textura del globo convertidas a WebP; póster móvil más ligero y precargado. Se mantiene el material original en el repositorio.
- Fuentes Inter, Sora y Space Grotesk servidas por la propia web, con licencias incluidas. El globo deja de procesarse continuamente en pantallas pequeñas y cuando se solicita movimiento reducido.
- Eliminada la dependencia de React Query, que no tenía consultas en la aplicación.
- `robots.txt`, caché de recursos con versión, cabeceras de seguridad y errores 404 para recursos ausentes. El contenedor escucha por defecto solo en la interfaz local para usar un proxy HTTPS delante.
- Configuración de Vercel en `apps/web/vercel.json` con cabeceras de seguridad y rutas directas para la SPA. La vista previa requiere inicio de sesión, por lo que sus respuestas de la aplicación no pudieron auditarse desde fuera.
- Política de privacidad actualizada para describir las fuentes locales y los campos observados en el formulario de inscripción.
- Agenda actualizada con los ocho horarios facilitados por la organización; perfiles ordenados según las charlas. Se añadió la foto y trayectoria de Fabricio Layedra, y George Guerrero aparece con el cargo indicado en la agenda mientras se completa su perfil.
- El renderizador WebGL del globo y las páginas legales se cargan en módulos separados; los teléfonos omiten los paneles decorativos animados del corredor. Las secciones móviles fuera de pantalla conservan su espacio mientras se aplaza su pintado. Se verificó navegación, desplazamiento a registro y ausencia de saltos relevantes en 320, 390, 768 y 1440 px.
- El hackathon muestra sus semanas en flujo normal en teléfonos y cambia el detalle en 240 ms sin esperar la salida del anterior. En tableta y escritorio mantiene el recorrido fijado y evita que un clic en una semana pase visualmente por las intermedias durante el desplazamiento. La rúbrica se monta oculta desde el inicio y aparece con una transición de opacidad y posición, sin animar la altura de toda la tabla. Se comprobaron interacciones a 320, 390, 768 y 1440 px, teclado y movimiento reducido. Con CPU simulada cuatro veces más lenta, la apertura de la rúbrica pasó de aproximadamente 50 a 22 ms en el percentil 95 de tiempo entre fotogramas en escritorio; todavía hubo un fotograma lento al mostrarla por primera vez.
- En teléfonos, la tarjeta de registro usa el adorno estático existente en lugar de cargar y reproducir la animación Lottie en canvas. En tres desplazamientos simulados a 390 px con CPU cuatro veces más lenta, el peor intervalo entre fotogramas bajó de 78 a 17 ms y desaparecieron las tareas largas observadas; a partir de 768 px se conserva la animación.
- Integración opcional de GA4 preparada con consentimiento previo, opción de rechazo y retiro, vistas de página por ruta, evento `registration_form_open` y política de privacidad actualizada. Sin `VITE_GA_MEASUREMENT_ID` no aparece el aviso ni se carga Google. Con un ID ficticio y la etiqueta simulada, se verificó que rechazar no solicita recursos de Google, aceptar configura una sola vista inicial, cambiar a `/privacidad` registra otra, cambiar solo el fragmento no duplica la vista, el evento de apertura del formulario solo se emite tras aceptar y retirar el consentimiento detiene la medición y elimina las cookies `_ga*`. La prueba no demuestra recepción de datos en una propiedad GA4 real. Lighthouse móvil con el aviso visible y sin aceptar: 79 en rendimiento, 100 en accesibilidad, buenas prácticas y SEO.

## Pendiente antes de publicar

1. **Aviso de privacidad.** Identificar a la persona o entidad responsable con nombre legal, domicilio, teléfono y correo; especificar la base jurídica y el plazo de conservación aplicables; revisar que el aviso mostrado al recopilar datos en Google Forms coincida con la política. El formulario pide cédula. Para activar GA4, definir además la retención de datos de la propiedad, aprobar la descripción de cookies y verificar el mecanismo de retiro. El [artículo 12 de la Ley Orgánica de Protección de Datos Personales](https://spdp.gob.ec/wp-content/uploads/2024/12/03.pdf.pdf) enumera la información que debe recibir la persona titular. Estos datos y decisiones no se pueden inventar desde el código; requieren confirmación del organizador y revisión jurídica.
2. **Infraestructura real.** Confirmar si se publicará con Vercel o Docker. En Docker, configurar DNS, certificado TLS, redirección HTTP→HTTPS y proxy hacia `127.0.0.1:8080`; habilitar HSTS cuando HTTPS esté validado. En Vercel, validar que el dominio final aplique `apps/web/vercel.json`. En ambos casos, probar las rutas, las cabeceras y el botón de inscripción en el dominio final. La vista previa de Vercel está protegida por inicio de sesión, así que no confirma estas respuestas públicas.
3. **Canal de contacto.** Se encontró registro MX para `dataijam.com`, pero eso no prueba que `registros@dataijam.com` reciba y responda mensajes. Hacer una prueba de envío y respuesta.
4. **Contenido del evento.** Los cuatro ponentes de la agenda ya aparecen por nombre; el retrato y la biografía de George Guerrero siguen pendientes. Hay patrocinadores sin confirmar, asistentes estimados marcados como «Pronto» y premios pendientes. La agenda facilitada presenta a Fabricio Layedra como «Gerente de experimentos de datos · Rappi · LATAM», mientras que su ficha actual indica «Consultor Senior en Nuevos Negocios e Inteligencia Artificial · Zererbralab»; confirmar qué cargo debe comunicarse en la agenda antes de publicar. La línea de Pablo en la imagen contiene una grafía confusa, por lo que la web usa el cargo ya documentado en su perfil: «Quantitative Modeler en Capital One».
5. **Activación de GA4.** Falta el ID real `G-...`, desactivar en el flujo GA4 las vistas automáticas por cambios del historial para evitar duplicados y comprobar peticiones, consentimiento y vistas en el dominio final. La [guía de operación](operations.md#google-analytics-4) explica los pasos. La medición sigue inactiva sin ese ID.

## Mejoras posteriores recomendadas

- Seguir reduciendo el JavaScript inicial (ahora aprox. 570 KiB minificados, 181 KiB con gzip) y el LCP móvil de 4,9 s. Los módulos del globo y de páginas legales ya se cargan por separado; las secciones de la portada aún comparten el archivo inicial.
- Servir variantes de menor resolución para la fotografía de Guayaquil y otras imágenes decorativas; Lighthouse aún estima ahorro de imágenes.
- Configurar las URL absolutas de metadatos sociales cuando se conozca el dominio definitivo. Verificar cómo se comparte la página en redes.

No se ejecutó una prueba de penetración ni se comprobó la entrega de correo, una inscripción real o la configuración HTTPS de un servidor público. Esta revisión cubre el código, las dependencias, el contenedor y el comportamiento local.
