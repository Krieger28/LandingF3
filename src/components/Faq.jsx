import { useLang } from '../i18n/index.jsx'

export default function Faq() {
  const { t } = useLang()
  return (
    <section className="section section-sand section-faq">
      <div className="container faq">
        <header id="preguntas" className="section-head" data-reveal>
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2>{t.faq.title}</h2>
        </header>
        <div className="faq-list">
          {t.faq.items.map((f, i) => (
            <details key={i} className="faq-item" data-reveal>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
