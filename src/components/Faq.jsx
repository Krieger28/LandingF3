import { faqs } from '../data/site.js'

export default function Faq() {
  return (
    <section id="preguntas" className="section section-sand">
      <div className="container faq">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2>Antes de viajar</h2>
        </header>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item" data-reveal>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
