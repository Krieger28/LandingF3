// Carga automática de fotos desde src/assets/images/<carpeta>/.
//
// Cada foto se procesa al compilar (vite-imagetools + sharp):
//   • se generan 3 anchos (640, 1024 y 1600 px) — nunca se agranda,
//   • se convierte a AVIF y WebP con calidad 72,
//   • se eliminan los metadatos (EXIF, GPS).
// El navegador descarga solo el tamaño que necesita según la pantalla,
// así que aunque subas fotos de 10 MB la página sigue siendo liviana.

const pictures = import.meta.glob(
  '../assets/images/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  {
    eager: true,
    import: 'default',
    query: {
      w: '640;1024;1600',
      format: 'avif;webp',
      quality: '72',
      as: 'picture',
    },
  },
)

const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true })

/** Devuelve las fotos de una carpeta, ordenadas por nombre de archivo. */
export function getImages(folder) {
  return Object.keys(pictures)
    .filter((path) => path.includes(`/images/${folder}/`))
    .sort(byName)
    .map((path) => pictures[path])
}
