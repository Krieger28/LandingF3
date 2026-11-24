import { useEffect, useRef, useState } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { useLang } from '../i18n/index.jsx'
import { site } from '../data/site.js'

export default function Location() {
  const { t } = useLang()
  const mapRef = useRef(null)
  const [showMap, setShowMap] = useState(false)

  // El mapa de Google pesa bastante: lo cargamos solo cuando el usuario llega a esta sección.
  useEffect(() => {
    const el = mapRef.current
    if (!el || !('IntersectionObserver' in window)) return setShowMap(true)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShowMap(true); io.disconnect() }
    }, { rootMargin: '300px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="section">
      <div className="container location">
        <div id="ubicacion" className="location-copy" data-reveal>
          <p className="eyebrow">{t.location.eyebrow}</p>
          <h2>{t.location.title}</h2>
          <p className="location-address">
            <MapPin size={20} aria-hidden="true" /> {site.location.address}
          </p>
          <ul className="nearby">
            {t.location.nearby.map((label, i) => (
              <li key={label}><span>{label}</span><strong>{site.location.nearbyTimes[i]}</strong></li>
            ))}
          </ul>
          <p className="location-hours">
            <Clock size={18} aria-hidden="true" /> {t.location.hours}
          </p>
          <a className="btn btn-outline" href={site.location.mapLink} target="_blank" rel="noopener noreferrer">
            {t.location.directions}
          </a>
        </div>

        <div className="map-frame" ref={mapRef} data-reveal>
          {showMap && (
            <iframe
              title={t.location.mapTitle(site.name)}
              src={site.location.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  )
}
