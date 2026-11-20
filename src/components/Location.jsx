import { useEffect, useRef, useState } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { site } from '../data/site.js'

export default function Location() {
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
    <section id="ubicacion" className="section">
      <div className="container location">
        <div className="location-copy" data-reveal>
          <p className="eyebrow">Ubicación</p>
          <h2>Cerca de todo, lejos del ruido</h2>
          <p className="location-address">
            <MapPin size={20} aria-hidden="true" /> {site.location.address}
          </p>
          <ul className="nearby">
            {site.location.nearby.map((n) => (
              <li key={n.label}><span>{n.label}</span><strong>{n.value}</strong></li>
            ))}
          </ul>
          <p className="location-hours">
            <Clock size={18} aria-hidden="true" /> Check-in desde las {site.checkIn} · Check-out hasta las {site.checkOut}
          </p>
          <a className="btn btn-outline" href={site.location.mapLink} target="_blank" rel="noopener noreferrer">
            Cómo llegar
          </a>
        </div>

        <div className="map-frame" ref={mapRef} data-reveal>
          {showMap && (
            <iframe
              title={`Mapa de ${site.name}`}
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
