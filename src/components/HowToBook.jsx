import { CalendarDays, Mail, KeyRound } from 'lucide-react'

import { useLang } from '../i18n/index.jsx'

const icons = [CalendarDays, Mail, KeyRound]

export default function HowToBook() {
  const { t } = useLang()
  return (
    <section className="section section-steps">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">{t.steps.eyebrow}</p>
          <h2>{t.steps.title}</h2>
        </header>
        <ol className="steps">
          {t.steps.items.map(({ title, text }, i) => {
            const Icon = icons[i]
            return (
            <li key={i} className="step" data-reveal>
              <span className="step-num" aria-hidden="true">{i + 1}</span>
              <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
