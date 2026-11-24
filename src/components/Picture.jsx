import { ImageIcon } from 'lucide-react'
import { useLang } from '../i18n/index.jsx'

/**
 * Imagen responsive optimizada (AVIF/WebP en varios tamaños).
 * Si todavía no hay foto, muestra un placeholder elegante.
 */
export default function Picture({ pic, alt = '', sizes = '100vw', priority = false, className = '', label }) {
  const { t } = useLang()
  if (!pic) {
    return (
      <div className={`img-placeholder ${className}`} role="img" aria-label={alt || t.common.photoSoon}>
        <ImageIcon aria-hidden="true" size={28} strokeWidth={1.4} />
        <span>{label || t.common.photoSoon}</span>
      </div>
    )
  }

  return (
    <picture className={className}>
      {Object.entries(pic.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={pic.img.src}
        width={pic.img.w}
        height={pic.img.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}
