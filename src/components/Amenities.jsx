import { Car, Flame, ShieldCheck, Snowflake, Sparkles, Tv, Utensils, Wifi } from 'lucide-react'
import Picture from './Picture.jsx'
import { amenities } from '../data/site.js'
import { getImages } from '../lib/images.js'

// Íconos disponibles para usar en site.js → amenities[].icon
const icons = { Car, Flame, ShieldCheck, Snowflake, Sparkles, Tv, Utensils, Wifi }

const entorno = getImages('entorno').slice(0, 4)

export default function Amenities() {
  return (
    <section id="servicios" className="section section-sand">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Servicios</p>
          <h2>Todo lo que necesitás, ya está</h2>
          <p className="section-lead">Llegá y disfrutá: cada cabaña está completamente equipada.</p>
        </header>

        <ul className="amenity-grid">
          {amenities.map(({ icon, title, text }) => {
            const Icon = icons[icon] || Sparkles
            return (
              <li key={title} className="amenity" data-reveal>
                <span className="amenity-icon"><Icon size={24} strokeWidth={1.6} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            )
          })}
        </ul>

        {entorno.length > 0 && (
          <div className="entorno-grid" data-reveal>
            {entorno.map((pic, i) => (
              <Picture key={pic.img.src} pic={pic} alt={`El entorno — foto ${i + 1}`} sizes="(min-width: 960px) 25vw, 50vw" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
