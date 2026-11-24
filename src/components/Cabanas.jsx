import { useRef, useState } from 'react'
import { Accessibility, Bath, BedDouble, Check, ChevronLeft, ChevronRight, Ruler, Users } from 'lucide-react'
import Picture from './Picture.jsx'
import Lightbox from './Lightbox.jsx'
import { getImages } from '../lib/images.js'
import { cabanas } from '../data/cabanas.js'

export default function Cabanas({ onBook, onIntent }) {
  return (
    <section className="section">
      {/* El ancla va en el contenedor (empieza justo en el título) y no en la sección,
          para que el link del header no deje a la vista el padding superior. */}
      <div id="cabanas" className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Nuestras cabañas</p>
          <h2>Elegí dónde descansar</h2>
          <p className="section-lead">
            Dos cabañas gemelas, cómodas y luminosas, y una cabaña accesible pensada para que nadie quede afuera.
          </p>
        </header>

        <div className="cabin-grid">
          {cabanas.map((cabin) => (
            <CabinCard key={cabin.id} cabin={cabin} onBook={onBook} onIntent={onIntent} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CabinCard({ cabin, onBook, onIntent }) {
  const images = getImages(cabin.imagesFolder)
  const featured = cabin.featured

  return (
    <article className={`cabin-card ${featured ? 'is-featured' : ''}`} data-reveal>
      <Gallery
        images={images}
        name={cabin.name}
        sizes={featured ? '(min-width: 960px) 55vw, 100vw' : '(min-width: 960px) 45vw, (min-width: 640px) 50vw, 100vw'}
        badge={cabin.accessible ? (
          <span className="badge badge-access"><Accessibility size={16} aria-hidden="true" /> Accesible</span>
        ) : null}
      />

      <div className="cabin-body">
        <div className="cabin-title">
          <h3>{cabin.name}</h3>
        </div>
        <p className="cabin-summary">{cabin.summary}</p>

        <ul className="cabin-specs" aria-label="Características principales">
          <li><Users size={18} aria-hidden="true" /> {cabin.guests} huéspedes</li>
          <li>
            <BedDouble size={18} aria-hidden="true" />{' '}
            {cabin.bedrooms === 0 ? 'Monoambiente' : `${cabin.bedrooms} ${cabin.bedrooms > 1 ? 'dormitorios' : 'dormitorio'}`}
          </li>
          <li><Bath size={18} aria-hidden="true" /> {cabin.bathrooms} {cabin.bathrooms > 1 ? 'baños' : 'baño'}</li>
          <li><Ruler size={18} aria-hidden="true" /> {cabin.size} m²</li>
        </ul>
        <p className="cabin-beds">{cabin.beds}</p>

        <ul className="cabin-features">
          {cabin.features.map((f) => (
            <li key={f}><Check size={16} aria-hidden="true" /> {f}</li>
          ))}
        </ul>

        {cabin.accessibility && (
          <div className="cabin-access">
            <p><Accessibility size={18} aria-hidden="true" /> <strong>Accesibilidad</strong></p>
            <ul>
              {cabin.accessibility.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        )}

        <button
          className="btn btn-primary btn-block"
          onMouseEnter={onIntent}
          onFocus={onIntent}
          onClick={() => onBook()}
        >
          Consultar disponibilidad
        </button>
      </div>
    </article>
  )
}

/** Galería liviana con scroll-snap nativo (sin librerías). */
function Gallery({ images, name, sizes, badge }) {
  const track = useRef(null)
  const [index, setIndex] = useState(0)
  const [viewer, setViewer] = useState(null) // índice de la foto abierta a pantalla completa
  const count = Math.max(images.length, 1)

  // Al cerrar el visor, la galería queda en la última foto que se vio.
  const closeViewer = (i) => {
    setViewer(null)
    const el = track.current
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'instant' })
  }

  const go = (dir) => {
    const el = track.current
    if (!el) return
    const next = (index + dir + count) % count
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = track.current
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <div className="gallery">
      <div className="gallery-track" ref={track} onScroll={onScroll} tabIndex={images.length > 1 ? 0 : -1} aria-label={`Fotos de ${name}`}>
        {images.length === 0 ? (
          <div className="gallery-slide">
            <Picture pic={null} alt={`Foto de ${name}`} label={`Fotos de ${name} próximamente`} />
          </div>
        ) : (
          images.map((pic, i) => (
            <div className="gallery-slide" key={pic.img.src}>
              <button className="gallery-open" onClick={() => setViewer(i)} aria-label={`Ver ${name} — foto ${i + 1} de ${images.length} en pantalla completa`}>
                <Picture pic={pic} alt="" sizes={sizes} />
              </button>
            </div>
          ))
        )}
      </div>

      {badge && <div className="gallery-badge">{badge}</div>}

      {images.length > 1 && (
        <>
          <button className="gallery-btn prev" onClick={() => go(-1)} aria-label="Foto anterior">
            <ChevronLeft size={20} />
          </button>
          <button className="gallery-btn next" onClick={() => go(1)} aria-label="Foto siguiente">
            <ChevronRight size={20} />
          </button>
          <div className="gallery-count" aria-live="polite">{index + 1} / {images.length}</div>
        </>
      )}

      {viewer !== null && <Lightbox images={images} name={name} start={viewer} onClose={closeViewer} />}
    </div>
  )
}
