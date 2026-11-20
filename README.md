# Landing de cabañas — Vite + React

Página de una sola pantalla (landing) para alquiler de 3 cabañas: dos iguales y una grande totalmente accesible.
Cada cabaña tiene un botón **"Consultar disponibilidad"** que abre un formulario con calendario de fechas, nombre, email y teléfono. La consulta llega por mail.

## Comandos

```bash
npm install        # instalar dependencias (una sola vez)
npm run dev        # ver la página en http://localhost:5173
npm run build      # generar la versión final en /dist
npm run preview    # probar la versión final localmente
```

Requiere Node.js 20 o superior.

## Qué editar

| Qué | Dónde |
| --- | --- |
| Nombre, ubicación, teléfono, WhatsApp, email, Instagram, mapa, servicios, preguntas frecuentes | `src/data/site.js` |
| Nombres, capacidad, camas, m² y características de cada cabaña | `src/data/cabanas.js` |
| Título y descripción para Google / WhatsApp | `index.html` |
| Colores y tipografías | `src/styles/global.css` (variables al principio) |

## Fotos

Copiá las fotos en estas carpetas (jpg, png o webp):

```
src/assets/images/hero/       → foto grande de portada (se usa la primera)
src/assets/images/cabana-1/   → galería de la Cabaña 1
src/assets/images/cabana-2/   → galería de la Cabaña 2
src/assets/images/cabana-3/   → galería de la cabaña grande / accesible
src/assets/images/entorno/    → hasta 4 fotos del predio (opcional)
```

Se ordenan por nombre: `01.jpg`, `02.jpg`, `03.jpg`…
**No hace falta achicarlas.** Al hacer `npm run build`, cada foto se:

- redimensiona a 640, 1024 y 1600 px de ancho (nunca se agranda),
- convierte a **AVIF** y **WebP** comprimidos (calidad 72),
- limpia de metadatos (EXIF / GPS).

El navegador descarga solo el tamaño que necesita según la pantalla, y las fotos fuera de la vista se cargan recién al hacer scroll (`loading="lazy"`). Una foto de 12 MB del celular termina pesando entre ~40 KB y ~300 KB.

## Recibir las consultas por mail (Web3Forms, gratis)

1. Entrá a <https://web3forms.com>, poné el mail donde querés recibir las consultas y te llega una **Access Key**.
2. Copiá `.env.example` como `.env` y pegá la clave:
   ```
   VITE_WEB3FORMS_KEY=tu-clave-aca
   ```
3. En el hosting (Vercel / Netlify) cargá la misma variable `VITE_WEB3FORMS_KEY` en *Environment Variables* y volvé a desplegar.

Cada consulta llega con: cabaña, llegada, salida, cantidad de noches, huéspedes, nombre, email, teléfono y mensaje. Podés responder directo desde el mail (el "responder a" es el email del cliente).

> Sin la clave configurada, el formulario abre el programa de correo del visitante con la consulta ya escrita (alternativa de emergencia).

## Publicar con tu dominio

### Opción A — Vercel o Netlify (recomendado, gratis)
1. Entrá a vercel.com o netlify.com con tu cuenta de GitHub e importá este repositorio.
2. Se detecta Vite solo: comando `npm run build`, carpeta `dist`.
3. Agregá la variable `VITE_WEB3FORMS_KEY`.
4. En *Domains* agregá tu dominio y configurá los DNS que te indiquen en donde lo compraste (por ej. NIC.ar).

Ya están incluidos `vercel.json` y `netlify.toml` con caché optimizada.

### Opción B — Hosting tradicional (cPanel, Hostinger, DonWeb…)
1. Ejecutá `npm run build` en tu PC (con el `.env` configurado).
2. Subí **el contenido** de la carpeta `dist/` a `public_html/`.
3. El `.htaccess` incluido activa compresión y caché. Cuando tengas SSL, descomentá la parte de HTTPS.

### Antes de publicar
- En `index.html` descomentá y completá `og:image` y `canonical` con tu dominio.
- Poné una imagen 1200×630 en `public/og-image.jpg` (es la que se ve al compartir el link por WhatsApp).

## Rendimiento

- El formulario y el calendario se descargan **solo cuando alguien abre el formulario** (carga diferida).
- El mapa de Google se carga recién al llegar a la sección Ubicación.
- Tipografías alojadas en el propio sitio (sin pedidos a Google Fonts).
- Íconos SVG incluidos solo los que se usan.
