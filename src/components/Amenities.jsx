import { Car, ChefHat, Flame, HouseHeart, ShieldCheck, ShowerHead, Sparkles, SunSnow, Tv, Utensils, Waves, Wifi } from 'lucide-react'
import Picture from './Picture.jsx'
import { useLang } from '../i18n/index.jsx'
import { getImages } from '../lib/images.js'

// Mismo orden que t.amenities.items en src/i18n/*.js
const icons = [Wifi, SunSnow, Tv, Waves, Flame, ChefHat, Utensils, ShowerHead, Sparkles, HouseHeart, Car, ShieldCheck]

const entorno = getImages('entorno').slice(0, 4)

export default function Amenities() {
  const { t } = useLang()
  return (
    <section className="section section-sand">
      <div className="container">
        <header id="servicios" className="section-head" data-reveal>
          <p className="eyebrow">{t.amenities.eyebrow}</p>
          <h2>{t.amenities.title}</h2>
          <p className="section-lead">{t.amenities.lead}</p>
        </header>

        <ul className="amenity-grid">
          {t.amenities.items.map(([title, text], i) => {
            const Icon = icons[i] || Sparkles
            return (
              <li key={i} className="amenity" data-reveal>
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
              <Picture key={pic.img.src} pic={pic} alt={t.amenities.surroundings(i + 1)} sizes="(min-width: 960px) 25vw, 50vw" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
