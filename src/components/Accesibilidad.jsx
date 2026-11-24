import { Accessibility, Car, DoorOpen, ShowerHead } from 'lucide-react'
import { useLang } from '../i18n/index.jsx'
import { cabanas } from '../data/cabanas.js'

const accessible = cabanas.find((c) => c.accessible)

const icons = [DoorOpen, ShowerHead, Car]

export default function Accesibilidad({ onBook }) {
  const { t } = useLang()
  if (!accessible) return null
  const [before, name, after] = t.access.text(t.cabins.items[accessible.id].short)
  return (
    <section className="section section-access">
      <div className="container access-inner">
        <div id="accesibilidad" className="access-copy" data-reveal>
          <span className="access-icon" aria-hidden="true"><Accessibility size={34} strokeWidth={1.6} /></span>
          <p className="eyebrow eyebrow-light">{t.access.eyebrow}</p>
          <h2>{t.access.title}</h2>
          <p>
            {before}<strong>{name}</strong>{after}
          </p>
          <button className="btn btn-light" onClick={() => onBook({ accessible: true })}>
            {t.access.cta}
          </button>
        </div>

        <ul className="access-points">
          {t.access.points.map(({ title, text }, i) => {
            const Icon = icons[i]
            return (
            <li key={i} data-reveal>
              <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
