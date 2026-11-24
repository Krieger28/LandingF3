import { useEffect, useState } from 'react'
import { Languages, Menu, X } from 'lucide-react'
import { site } from '../data/site.js'
import { useLang } from '../i18n/index.jsx'
import isotipo from '../assets/images/logos/la-posta-isotipo-verde.svg'

const hrefs = ['#cabanas', '#accesibilidad', '#servicios', '#ubicacion', '#preguntas']

export default function Header({ onBook, onIntent }) {
  const { t, toggleLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`site-header ${scrolled || open ? 'is-solid' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="brand" onClick={close}>
          <span className="brand-mark" aria-hidden="true">
            <img src={isotipo} alt="" width="53" height="30" />
          </span>
          <span className="brand-text">
              {site.shortName}
            <small>DEL TRAPICHE</small>
          </span>
        </a>

        <nav id="main-nav" className={`main-nav ${open ? 'is-open' : ''}`} aria-label={t.nav.label}>
          <ul>
            {hrefs.map((href, i) => (
              <li key={href}>
                <a href={href} onClick={close}>{t.nav.links[i]}</a>
              </li>
            ))}
          </ul>
          <button type="button" className="lang-toggle" onClick={toggleLang} aria-label={t.nav.langLabel} lang={t.code === 'es' ? 'en' : 'es'}>
            <Languages size={16} aria-hidden="true" /> {t.nav.langButton}
          </button>
          <button
            className="btn btn-primary nav-cta"
            onMouseEnter={onIntent}
            onFocus={onIntent}
            onClick={() => { close(); onBook() }}
          >
            {t.nav.book}
          </button>
        </nav>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}
