import { Accessibility, Car, DoorOpen, ShowerHead } from 'lucide-react'
import { cabanas } from '../data/cabanas.js'

const accessible = cabanas.find((c) => c.accessible)

const points = [
  { icon: DoorOpen, title: 'Sin escalones', text: 'Ingreso con rampa y puertas anchas en todos los ambientes.' },
  { icon: ShowerHead, title: 'Baño adaptado', text: 'Barrales de apoyo y ducha a nivel del piso con asiento.' },
  { icon: Car, title: 'Llegada cómoda', text: 'Estacionamiento junto a la entrada de la cabaña.' },
]

export default function Accesibilidad({ onBook }) {
  if (!accessible) return null
  return (
    <section className="section section-access">
      <div className="container access-inner">
        <div id="accesibilidad" className="access-copy" data-reveal>
          <span className="access-icon" aria-hidden="true"><Accessibility size={34} strokeWidth={1.6} /></span>
          <p className="eyebrow eyebrow-light">Turismo accesible</p>
          <h2>Un lugar pensado para todos</h2>
          <p>
            La cabaña <strong>{accessible.name.replace('Cabaña ', '')}</strong> fue diseñada para personas con
            movilidad reducida, adultos mayores y familias que necesitan más espacio, sin resignar comodidad ni estética.
          </p>
          <button className="btn btn-light" onClick={() => onBook({ accessible: true })}>
            Consultar disponibilidad accesible
          </button>
        </div>

        <ul className="access-points">
          {points.map(({ icon: Icon, title, text }) => (
            <li key={title} data-reveal>
              <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
