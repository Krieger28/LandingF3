import { useEffect, useMemo, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { es as dayPickerEs } from 'react-day-picker/locale'
import { differenceInCalendarDays, format, startOfToday } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarDays, CircleCheck, LoaderCircle, X } from 'lucide-react'
import 'react-day-picker/style.css'
import '../styles/booking.css'
import { cabanas } from '../data/cabanas.js'
import { site } from '../data/site.js'
import { WhatsAppIcon } from './BrandIcons.jsx'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const fmt = (d) => format(d, "EEE d 'de' MMM yyyy", { locale: es })

function useIsWide() {
  const query = '(min-width: 760px)'
  const [wide, setWide] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setWide(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return wide
}

export default function BookingModal({ initialCabin = '', onClose }) {
  const dialogRef = useRef(null)
  const wide = useIsWide()
  const today = useMemo(() => startOfToday(), [])

  const [cabinId, setCabinId] = useState(initialCabin)
  const [range, setRange] = useState()
  const [guests, setGuests] = useState('2')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const cabin = cabanas.find((c) => c.id === cabinId)
  const maxGuests = cabin ? cabin.guests : Math.max(...cabanas.map((c) => c.guests))
  const nights = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0

  // Abrir como modal nativo (maneja foco, tecla Esc y accesibilidad)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  useEffect(() => {
    if (Number(guests) > maxGuests) setGuests(String(maxGuests))
  }, [maxGuests, guests])

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!cabinId) er.cabin = 'Elegí una cabaña.'
    if (!range?.from || !range?.to || nights < 1) er.dates = 'Marcá la fecha de llegada y la de salida (mínimo 1 noche).'
    if (form.name.trim().length < 2) er.name = 'Ingresá tu nombre.'
    if (!EMAIL_RE.test(form.email.trim())) er.email = 'Ingresá un email válido.'
    if (form.phone.replace(/\D/g, '').length < 8) er.phone = 'Ingresá un teléfono válido (con código de área).'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (e.target.botcheck?.checked) return // anti-spam
    if (!validate()) {
      dialogRef.current?.querySelector('[aria-invalid="true"], .field-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const data = {
      Cabaña: cabin.name,
      Llegada: fmt(range.from),
      Salida: fmt(range.to),
      Noches: nights,
      Huéspedes: guests,
      Nombre: form.name.trim(),
      Email: form.email.trim(),
      Teléfono: form.phone.trim(),
      Mensaje: form.message.trim() || '—',
    }

    // Sin clave configurada: abrimos el cliente de correo como alternativa.
    if (!WEB3FORMS_KEY) {
      const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n')
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Consulta de disponibilidad – ${cabin.name}`)}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nueva consulta: ${cabin.name} · ${format(range.from, 'dd/MM')} al ${format(range.to, 'dd/MM/yyyy')}`,
          from_name: site.name,
          replyto: form.email.trim(),
          ...data,
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.success === false) throw new Error(json.message || 'Error')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const waText = cabin && range?.from && range?.to
    ? `Hola! Quería consultar por ${cabin.name} del ${fmt(range.from)} al ${fmt(range.to)} para ${guests} personas.`
    : `Hola! Quería consultar por las cabañas de ${site.name}.`
  const waLink = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(waText)}`

  return (
    <dialog
      ref={dialogRef}
      className="booking"
      aria-labelledby="booking-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === dialogRef.current) dialogRef.current.close() }}
    >
      <div className="booking-panel">
        <header className="booking-head">
          <div>
            <p className="eyebrow">Consultar disponibilidad</p>
            <h2 id="booking-title">{cabin ? cabin.name : 'Elegí tu cabaña y tus fechas'}</h2>
          </div>
          <button className="icon-btn" onClick={() => dialogRef.current.close()} aria-label="Cerrar">
            <X size={22} />
          </button>
        </header>

        {status === 'sent' ? (
          <div className="booking-success">
            <CircleCheck size={56} strokeWidth={1.4} aria-hidden="true" />
            <h3>¡Gracias, {form.name.split(' ')[0]}!</h3>
            <p>
              Recibimos tu consulta por <strong>{cabin?.name}</strong> del <strong>{fmt(range.from)}</strong> al{' '}
              <strong>{fmt(range.to)}</strong>. Te vamos a responder a <strong>{form.email}</strong> a la brevedad.
            </p>
            <div className="booking-success-actions">
              <button className="btn btn-primary" onClick={() => dialogRef.current.close()}>Listo</button>
              <a className="btn btn-outline" href={waLink} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} /> Escribir por WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <form className="booking-form" onSubmit={onSubmit} noValidate>
            <div className="booking-grid">
              <div className="booking-calendar">
                <fieldset>
                  <legend><CalendarDays size={18} aria-hidden="true" /> Fechas de la estadía</legend>
                  <DayPicker
                    mode="range"
                    locale={dayPickerEs}
                    selected={range}
                    onSelect={(r) => { setRange(r); if (errors.dates) setErrors((er) => ({ ...er, dates: undefined })) }}
                    disabled={{ before: today }}
                    excludeDisabled
                    startMonth={today}
                    numberOfMonths={wide ? 2 : 1}
                    pagedNavigation
                    showOutsideDays={false}
                  />
                  <div className="range-summary" aria-live="polite">
                    <div><span>Llegada</span><strong>{range?.from ? fmt(range.from) : '—'}</strong></div>
                    <div><span>Salida</span><strong>{range?.to && nights > 0 ? fmt(range.to) : '—'}</strong></div>
                    <div><span>Noches</span><strong>{nights || '—'}</strong></div>
                  </div>
                  {errors.dates && <p className="field-error">{errors.dates}</p>}
                </fieldset>
              </div>

              <div className="booking-fields">
                <div className="field-row">
                  <label className="field">
                    <span>Cabaña</span>
                    <select value={cabinId} onChange={(e) => { setCabinId(e.target.value); setErrors((er) => ({ ...er, cabin: undefined })) }} aria-invalid={!!errors.cabin}>
                      <option value="" disabled>Seleccioná…</option>
                      {cabanas.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} · hasta {c.guests}{c.accessible ? ' · accesible' : ''}
                        </option>
                      ))}
                    </select>
                    {errors.cabin && <small className="field-error">{errors.cabin}</small>}
                  </label>
                  <label className="field field-sm">
                    <span>Huéspedes</span>
                    <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                      {Array.from({ length: maxGuests }, (_, i) => String(i + 1)).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="field">
                  <span>Nombre y apellido</span>
                  <input type="text" autoComplete="name" value={form.name} onChange={update('name')} aria-invalid={!!errors.name} placeholder="Ej: María González" />
                  {errors.name && <small className="field-error">{errors.name}</small>}
                </label>
                <label className="field">
                  <span>Email</span>
                  <input type="email" autoComplete="email" inputMode="email" value={form.email} onChange={update('email')} aria-invalid={!!errors.email} placeholder="tu@email.com" />
                  {errors.email && <small className="field-error">{errors.email}</small>}
                </label>
                <label className="field">
                  <span>Teléfono / WhatsApp</span>
                  <input type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={update('phone')} aria-invalid={!!errors.phone} placeholder="Ej: 11 2345 6789" />
                  {errors.phone && <small className="field-error">{errors.phone}</small>}
                </label>
                <label className="field">
                  <span>Mensaje <em>(opcional)</em></span>
                  <textarea rows={3} value={form.message} onChange={update('message')} placeholder="¿Viajás con mascotas, niños o necesitás algo especial?" />
                </label>

                {/* Honeypot anti-spam: invisible para personas */}
                <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                {status === 'error' && (
                  <p className="form-alert" role="alert">
                    No pudimos enviar tu consulta. Probá de nuevo o{' '}
                    <a href={waLink} target="_blank" rel="noopener noreferrer">escribinos por WhatsApp</a>.
                  </p>
                )}

                <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={status === 'sending'}>
                  {status === 'sending' ? (<><LoaderCircle size={20} className="spin" aria-hidden="true" /> Enviando…</>) : 'Enviar consulta'}
                </button>
                <p className="form-note">Es solo una consulta: no se realiza ningún cobro. Te confirmamos disponibilidad y precio.</p>
              </div>
            </div>
          </form>
        )}
      </div>
    </dialog>
  )
}
