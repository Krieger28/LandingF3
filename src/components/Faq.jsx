import { faqs } from '../data/site.js'

export default function Faq() {
  return (
    <section className="section section-sand section-faq">
      <div className="container faq">
        <header id="preguntas" className="section-head" data-reveal>
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
