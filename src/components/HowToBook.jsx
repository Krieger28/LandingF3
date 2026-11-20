import { CalendarDays, Mail, KeyRound } from 'lucide-react'

const steps = [
  { icon: CalendarDays, title: 'Elegí fechas y cabaña', text: 'Tocá "Consultar disponibilidad" y marcá en el calendario los días que te interesan.' },
  { icon: Mail, title: 'Te respondemos', text: 'Recibimos tu consulta al instante y te confirmamos disponibilidad y precio final.' },
  { icon: KeyRound, title: 'Reservá y disfrutá', text: 'Con la seña confirmás tu estadía. Te esperamos con la cabaña lista.' },
]

export default function HowToBook() {
  return (
    <section className="section">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Cómo reservar</p>
          <h2>Simple, en tres pasos</h2>
        </header>
        <ol className="steps">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="step" data-reveal>
              <span className="step-num" aria-hidden="true">{i + 1}</span>
              <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
