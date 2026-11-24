import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { site } from '../data/site.js'
import isotipo from '../assets/images/logos/la-posta-isotipo-verde.svg'

const links = [
  { href: '#cabanas', label: 'Cabañas' },
  { href: '#accesibilidad', label: 'Accesibilidad' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#preguntas', label: 'Preguntas' },
]

export default function Header({ onBook, onIntent }) {
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
            <small>   DEL TRAPICHE</small>
          
          </span>
        </a>

        <nav id="main-nav" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Principal">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={close}>{l.label}</a>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-primary nav-cta"
            onMouseEnter={onIntent}
            onFocus={onIntent}
            onClick={() => { close(); onBook() }}
          >
            Reservar
          </button>
        </nav>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}
