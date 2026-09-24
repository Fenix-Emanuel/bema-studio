# BEMA Studio · Sitio web

Sitio bilingüe (español / inglés) de BEMA Studio. *Build & Evolve.*

Es un sitio estático: HTML, CSS y JavaScript puros, sin nada que instalar ni compilar.

## Estructura

```
bema-studio/
├── index.html          → estructura de la página (encabezado, menú, pie)
├── css/
│   └── styles.css      → todo el diseño: colores, tipografías, responsive, modo oscuro
├── js/
│   ├── content.js      → TODOS los textos del sitio en español e inglés
│   └── app.js          → navegación, selector de idioma, menú móvil y formulario
├── assets/
│   ├── favicon.svg          → ícono de la pestaña del navegador
│   ├── apple-touch-icon.png → ícono al guardar el sitio en un iPhone
│   ├── og-image.png         → imagen que aparece al compartir el link (WhatsApp, redes)
│   ├── bema-icon.svg        → ícono del logo para fondos claros
│   └── bema-icon-light.svg  → ícono del logo para fondos oscuros
├── robots.txt
└── README.md
```

## Ver el sitio en tu computadora

Haz doble clic en `index.html` y se abre en el navegador.

## Editar textos

Abre `js/content.js`. Cada texto está en `es` (español) y `en` (inglés).
Si cambias uno, cambia también el otro.

Pendientes de completar (búscalos con Ctrl+F / Cmd+F):

- `[PRECIO]` / `[PRICE]`
- `[X]` (semanas, opciones, horas)
- `[TU EMAIL]` / `[YOUR EMAIL]`
- `[TU TELÉFONO]` / `[YOUR PHONE]`
- `[DEFINIR CONDICIONES]` / `[SET TERMS]`

## Cambiar colores

Al inicio de `css/styles.css`, en la sección **1. Tokens**:

| Variable     | Color     | Uso                          |
|--------------|-----------|------------------------------|
| `--ink`      | `#0F1B33` | Azul noche: textos y fondos  |
| `--accent`   | `#F29E38` | Amarillo sol: acentos        |
| `--bg`       | `#F3EFE6` | Hueso: fondo general         |
| `--sand`     | `#E4DDCD` | Arena: bloques secundarios   |

Justo debajo están los mismos tokens para el modo oscuro.

## Idioma

- El sitio elige el idioma según el navegador del visitante y recuerda su elección.
- Links directos: `tudominio.com/?lang=es` o `tudominio.com/?lang=en`.

## Páginas

| Ruta            | Página       |
|-----------------|--------------|
| `#/`            | Inicio       |
| `#/sitios-web`  | Sitios web   |
| `#/branding`    | Branding     |
| `#/marketing`   | Marketing    |
| `#/proceso`     | Proceso      |
| `#/contacto`    | Contacto     |

## Formulario de contacto

Hoy el formulario valida los datos y muestra el mensaje de agradecimiento,
pero **todavía no envía los mensajes**. El lugar para conectarlo está marcado
en `js/app.js` con el comentario `AQUÍ se conectará el envío real`.
Opciones simples: Formspree, Netlify Forms o Web3Forms.

## Publicar

Sube la carpeta completa (manteniendo la estructura) a cualquier hosting
de sitios estáticos, por ejemplo Netlify, Vercel, Cloudflare Pages o GitHub Pages.
Después conecta tu dominio desde el panel del hosting.

Antes de publicar, en `index.html` conviene cambiar `assets/og-image.png`
por la dirección completa (`https://tudominio.com/assets/og-image.png`)
para que la imagen aparezca bien al compartir el link.
