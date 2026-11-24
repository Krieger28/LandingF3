import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Cabanas from './components/Cabanas.jsx'
import Accesibilidad from './components/Accesibilidad.jsx'
import Amenities from './components/Amenities.jsx'
import HowToBook from './components/HowToBook.jsx'
import Location from './components/Location.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'
import { useLang } from './i18n/index.jsx'

// El formulario + calendario se descarga recién cuando alguien lo abre,
// así la carga inicial de la página es mínima.
const loadBooking = () => import('./components/BookingModal.jsx')
const BookingModal = lazy(loadBooking)

export default function App() {
  const { t } = useLang()
  const [bookingFor, setBookingFor] = useState(null) // { accessible } = abierto, null = cerrado

  const openBooking = useCallback((opts) => setBookingFor({ accessible: !!opts?.accessible }), [])
  const closeBooking = useCallback(() => setBookingFor(null), [])

  useReveal()

  return (
    <>
      <a className="skip-link" href="#contenido">{t.common.skip}</a>
      <Header onBook={openBooking} onIntent={loadBooking} />
      <main id="contenido">
        <Hero onBook={openBooking} onIntent={loadBooking} />
        <Cabanas onBook={openBooking} onIntent={loadBooking} />
        <Accesibilidad onBook={openBooking} />
        <Amenities />
        <HowToBook />
        <Location />
        <Faq />
      </main>
      <Footer onBook={openBooking} />
      <WhatsAppFab />

      {bookingFor !== null && (
        <Suspense fallback={null}>
          <BookingModal initialAccessible={bookingFor.accessible} onClose={closeBooking} />
        </Suspense>
      )}
    </>
  )
}

/** Animación suave de aparición al hacer scroll (respeta "reducir movimiento"). */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
