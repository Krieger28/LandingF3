import { Accessibility, BedDouble, Trees, Users } from 'lucide-react'
import Picture from './Picture.jsx'
import { getImages } from '../lib/images.js'
import { site } from '../data/site.js'
import { cabanas } from '../data/cabanas.js'

const heroPic = getImages('hero')[0]
const totalGuests = cabanas.reduce((n, c) => n + c.guests, 0)

export default function Hero({ onBook, onIntent }) {
  return (
    <section id="top" className={`hero ${heroPic ? 'has-image' : ''}`}>
      <div className="hero-media" aria-hidden="true">
        {heroPic ? (
          <Picture pic={heroPic} alt="" priority sizes="100vw" />
        ) : (
          <div className="hero-fallback">
            <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice">
              <path d="M0 420 160 330l140 60 180-150 170 120 150-90 190 130 160-80 290 140V600H0Z" fill="#ffffff" opacity=".05" />
              <path d="M0 480 220 380l160 70 210-120 200 130 180-70 230 110 240-90v190H0Z" fill="#ffffff" opacity=".07" />
            </svg>
          </div>
        )}
      </div>

      <div className="container hero-content">
        <p className="eyebrow eyebrow-light">{site.location.city}, {site.location.province}</p>
        <h1>
          Tu refugio para <em>desconectar</em> y disfrutar
        </h1>
        <p className="hero-lead">{site.description}</p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-lg" onMouseEnter={onIntent} onFocus={onIntent} onClick={() => onBook()}>
            Consultar disponibilidad
          </button>
          <a className="btn btn-ghost-light btn-lg" href="#cabanas">Ver las cabañas</a>
        </div>
      </div>

      <div className="container">
        <ul className="hero-facts">
          <li><Trees size={22} strokeWidth={1.6} aria-hidden="true" /> <span><strong>{cabanas.length} cabañas</strong> rodeadas de verde</span></li>
          <li><Users size={22} strokeWidth={1.6} aria-hidden="true" /> <span><strong>Hasta {totalGuests}</strong> huéspedes en total</span></li>
          <li><Accessibility size={22} strokeWidth={1.6} aria-hidden="true" /> <span><strong>Cabaña accesible</strong> para todos</span></li>
          <li><BedDouble size={22} strokeWidth={1.6} aria-hidden="true" /> <span><strong>Ropa blanca</strong> incluida</span></li>
        </ul>
      </div>
    </section>
  )
}
