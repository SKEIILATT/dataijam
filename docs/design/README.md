# Guia de diseno de DatAIJam

Esta carpeta es la referencia visual para el equipo. Las imagenes aqui incluidas no se publican con la aplicacion: sirven para alinear decisiones de interfaz, contenido y marca antes de implementar cada seccion.

## Estructura

```text
docs/design/
├─ README.md
└─ references/
   ├─ logo.jpeg
   ├─ paleta.jpeg
   ├─ paleta_logo.jpeg
   ├─ ref_page.jpeg
   └─ tipografia.png
```

## Referencias disponibles

| Archivo                                                      | Uso para el equipo                                                                                                |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| [`references/logo.jpeg`](references/logo.jpeg)               | Referencia del logotipo, icono de tortuga y lema `Datos + Personas + Accion`.                                     |
| [`references/paleta_logo.jpeg`](references/paleta_logo.jpeg) | Fuente canonica de los colores y de sus usos sugeridos.                                                           |
| [`references/paleta.jpeg`](references/paleta.jpeg)           | Variaciones tonales complementarias para ilustraciones y acentos.                                                 |
| [`references/ref_page.jpeg`](references/ref_page.jpeg)       | Referencia de jerarquia, ritmo, atmosfera y secciones de la landing. No es una maqueta para copiar pixel a pixel. |
| [`references/tipografia.png`](references/tipografia.png)     | Fuente de verdad para familias, pesos, escalas y jerarquia tipografica.                                           |

## Identidad visual

La identidad debe comunicar tecnologia, movimiento, comunidad y accion. La interfaz combina un fondo oscuro profundo con acentos luminosos azul, cian, turquesa, lima y amarillo.

### Paleta canonica

Tomar `paleta_logo.jpeg` como fuente de verdad para nuevos componentes.

| Token propuesto | Hex       | Uso principal                                                       |
| --------------- | --------- | ------------------------------------------------------------------- |
| Azul marino     | `#031326` | Fondo principal y secciones oscuras.                                |
| Blanco frio     | `#F4F6F8` | Texto principal sobre fondos oscuros y superficies claras.          |
| Gris azulado    | `#8A9BA8` | Texto secundario, metadatos y bordes sutiles.                       |
| Azul intenso    | `#0482EB` | Acentos tecnologicos, enlaces y comienzo de gradientes.             |
| Cian            | `#08CDEF` | Acentos digitales, iconografia y detalles de interfaz.              |
| Turquesa        | `#3ACF98` | Estados positivos, conexion y elementos de apoyo.                   |
| Verde lima      | `#80DF6F` | Llamados a la accion y elementos de crecimiento.                    |
| Amarillo lima   | `#CAEA5F` | Llamados a la accion, indicadores de impacto y final de gradientes. |

El gradiente de marca va de `#0482EB` a `#CAEA5F`. Usarlo con moderacion en CTA destacados, lineas decorativas o recursos graficos; no como reemplazo del texto legible.

`paleta.jpeg` muestra alternativas cercanas (`#087FF2`, `#12D3E3`, `#9BE63C`, `#FFD33D`, `#159FE7` y `#35D7A4`). No incorporarlas como colores nuevos sin una decision de diseno: sirven para elegir tonalidades en ilustraciones cuando la paleta canonica no sea suficiente.

### Modos de color

El sitio ofrece modo oscuro y claro mediante `data-theme` en el elemento `html`. El oscuro mantiene el azul marino como superficie principal y CTA lima; el claro usa azul hielo `#F3FBFF`, titulares azul profundo `#06275D` → azul `#087FF2` → cian `#12D3E3`, y CTA azul `#087FF2` → cian `#12D3E3`. Usar siempre tokens `brand-*`, nunca equivalentes hexadecimales dentro de componentes, para que ambos modos mantengan contraste y se actualicen juntos.

### Tipografia

Usar los tokens de `apps/web/src/index.css`. Space Grotesk es la fuente de titulares H1 (700, 64–80 pt, tracking -1%) y H2 (600, 32–40 pt); Sora se usa en H3 o destacados (600, 24–32 pt); Inter se reserva para H4/informacion (500, 18–24 pt) y parrafos (400, 14–16 pt). No introducir familias ni pesos fuera de este sistema sin aprobacion de marca.

## Direccion de la landing

Usar [`references/ref_page.jpeg`](references/ref_page.jpeg) como guia de composicion:

1. Cabecera limpia con logo, navegacion y un CTA de registro visible.
2. Hero oscuro: propuesta de valor, fechas, ciudades y CTA principal.
3. Bloques de datos o beneficios faciles de escanear.
4. Secciones informativas alternando superficie oscura y clara para dar ritmo.
5. Contenido del evento: sedes, agenda o hackathon, speakers y CTA final.
6. Pie de pagina con navegacion, contacto, redes y enlaces legales.

La informacion real del evento siempre tiene prioridad sobre la imagen de referencia. No inventar fechas, cifras, ponentes, patrocinadores ni funcionalidades a partir de la maqueta.

## Reglas de implementacion

- Antes de crear un componente, revisar esta guia y reutilizar los colores definidos.
- Cuando se creen tokens de Tailwind, centralizar estos colores como tokens de marca; no dispersar valores hexadecimales arbitrarios en componentes.
- Mantener contraste suficiente. El blanco frio funciona para texto principal sobre azul marino; validar CTA y textos pequenos con una herramienta de contraste antes de aprobarlos.
- Reservar lima y amarillo para enfasis y acciones. No usarlos para parrafos largos ni como unico medio para comunicar un estado.
- Usar espaciado amplio, bordes suaves y fondos limpios. El aspecto debe ser tecnologico, accesible y sobrio, no recargado.
- Usar `font-display`, `font-heading` y `font-body`, o los tamanos `text-h1` a `text-h4` y `text-body`, en lugar de crear escalas tipograficas aisladas.
- `ref_page.jpeg` es una referencia de diseno; no debe copiarse a `apps/web/src/assets` ni mostrarse como contenido final.
- Si se aprueba un recurso de marca para produccion, exportarlo en el formato adecuado y guardarlo en `apps/web/src/assets/` con un nombre descriptivo. No usar estas imagenes JPEG de referencia como sustituto automatico de un logo optimizado.

## Proceso para cambios visuales

1. Proponer el cambio con captura, enlace de Figma o una nueva referencia en `references/`.
2. Actualizar esta guia si cambia un color, regla o patron reutilizable.
3. Obtener aprobacion de la persona responsable de marca antes de aplicar el cambio de forma global.
4. Implementar el patron como componente o token reutilizable, no como una solucion aislada en una pagina.
