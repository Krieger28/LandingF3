import { useEffect, useMemo, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { es as dayPickerEs } from 'react-day-picker/locale'
import { differenceInCalendarDays, format, startOfToday } from 'date-fns'
import { es } from 'date-fns/locale'
import { BedDouble, CalendarDays, CircleCheck, LoaderCircle, X } from 'lucide-react'
import 'react-day-picker/style.css'
import '../styles/booking.css'
import { cabanas } from '../data/cabanas.js'
import { site } from '../data/site.js'
import { WhatsAppIcon } from './BrandIcons.jsx'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const fmt = (d) => format(d, "EEE d 'de' MMM yyyy", { locale: es })

const capacity = (set) => set.reduce((sum, c) => sum + c.guests, 0)
const MAX_GUESTS = capacity(cabanas)
const HAS_ACCESSIBLE = cabanas.some((c) => c.accessible)

// Todas las combinaciones posibles de cabañas (son pocas, se calculan una vez).
const COMBOS = Array.from({ length: 2 ** cabanas.length - 1 }, (_, i) =>
  cabanas.filter((_, j) => (i + 1) & (1 << j)),
)

/** Cuántas cabañas accesibles usa la combinación (se reservan para quien las necesita). */
const accessibleCount = (set) => set.filter((c) => c.accessible).length

/**
 * Asigna cabañas según huéspedes y cantidad de cabañas: entre las combinaciones
 * de `count` cabañas donde entran todos (con una accesible, si se pidió), prioriza
 * las gemelas (las que usan menos cabañas accesibles), aunque tengan más lugar
 * del necesario; a igualdad, la de menor capacidad total. Si hay varias
 * equivalentes se devuelven todas y la definitiva se confirma según disponibilidad.
 */
function assignCabins(guests, accessible, count) {
  let fits = COMBOS.filter((set) =>
    set.length === count && capacity(set) >= guests && (!accessible || set.some((c) => c.accessible)))
  if (!fits.length) return []
  const fewestAccessible = Math.min(...fits.map(accessibleCount))
  fits = fits.filter((set) => accessibleCount(set) === fewestAccessible)
  const min = Math.min(...fits.map(capacity))
  return fits.filter((set) => capacity(set) === min)
}

/** Mínima cantidad de cabañas necesaria para ese grupo. */
function minCabins(guests, accessible) {
  for (let k = 1; k <= cabanas.length; k++) if (assignCabins(guests, accessible, k).length) return k
  return cabanas.length
}

/** "Cabaña Arrayán + (Cabaña Nogal o Cabaña Roble)" */
function describe(options) {
  if (!options.length) return ''
  const names = (set) => set.map((c) => c.name).join(' + ')
  if (options.length === 1) return names(options[0])
  const common = options[0].filter((c) => options.every((set) => set.includes(c)))
  const alt = options.map((set) => names(set.filter((c) => !common.includes(c)))).join(' o ')
  return common.length ? `${names(common)} + (${alt})` : alt
}

const clamp = (n, lo, hi) => Math.min(Math.max(n, lo), hi)

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

const people = (n) => `${n} ${n === '1' ? 'persona' : 'personas'}`

/** Desplegable de huéspedes: botón que abre una grilla de 2 columnas × 7 filas. */
function GuestPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    rootRef.current?.querySelector('[aria-pressed="true"]')?.focus()
    const onDown = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const close = () => { setOpen(false); triggerRef.current?.focus() }

  return (
    <div
      className="guest-picker"
      ref={rootRef}
      onKeyDown={(e) => {
        // Esc cierra solo el desplegable, no todo el modal
        if (e.key === 'Escape' && open) { e.preventDefault(); e.stopPropagation(); close() }
      }}
    >
      <button
        type="button"
        ref={triggerRef}
        className="guest-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        aria-labelledby="guests-label guests-value"
        onClick={() => setOpen((o) => !o)}
      >
        <span id="guests-value">{people(value)}</span>
      </button>
      {open && (
        <div className="guest-panel" role="group" aria-labelledby="guests-label">
          <div className="guest-grid">
            {Array.from({ length: MAX_GUESTS }, (_, i) => String(i + 1)).map((n) => (
              <button
                key={n}
                type="button"
                className="guest-option"
                aria-pressed={value === n}
                aria-label={people(n)}
                onClick={() => { onChange(n); close() }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function BookingModal({ initialAccessible = false, onClose }) {
  const dialogRef = useRef(null)
  const wide = useIsWide()
  const today = useMemo(() => startOfToday(), [])

  const [accessible, setAccessible] = useState(initialAccessible)
  const [range, setRange] = useState()
  const [guests, setGuests] = useState('2')
  const [multi, setMulti] = useState(false)
  const [cabinCount, setCabinCount] = useState('2')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const guestCount = Number(guests)
  const minCount = minCabins(guestCount, accessible)
  const maxCount = Math.min(cabanas.length, guestCount) // al menos 1 persona por cabaña
  const forcedMulti = minCount > 1
  const isMulti = forcedMulti || (multi && maxCount > 1)
  const countMin = Math.max(2, minCount)
  const count = isMulti ? clamp(Number(cabinCount), countMin, maxCount) : 1
  const options = assignCabins(guestCount, accessible, count)
  const cabinLabel = describe(options)
  const byAvailability = options.length > 1
  const nights = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0

  // Abrir como modal nativo (maneja foco, tecla Esc y accesibilidad)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const validate = () => {
    const er = {}
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
      'Cantidad de cabañas': count,
      'Cabañas asignadas': byAvailability ? `${cabinLabel} — según disponibilidad` : cabinLabel,
      Accesible: accessible ? 'Sí' : 'No',
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
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Consulta de disponibilidad – ${guests} huéspedes, ${count} ${count > 1 ? 'cabañas' : 'cabaña'}`)}&body=${encodeURIComponent(body)}`
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
          subject: `Nueva consulta: ${guests} huésp. · ${count} cab. · ${format(range.from, 'dd/MM')} al ${format(range.to, 'dd/MM/yyyy')}`,
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

  const waText = range?.from && range?.to
    ? `Hola! Quería consultar disponibilidad del ${fmt(range.from)} al ${fmt(range.to)} para ${guests} personas${count > 1 ? ` en ${count} cabañas` : ''}${accessible ? ' (necesito cabaña accesible)' : ''}.`
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
            <h2 id="booking-title">Elegí tus fechas y huéspedes</h2>
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
              Recibimos tu consulta para <strong>{guests} {guests === '1' ? 'persona' : 'personas'}</strong> en <strong>{cabinLabel}</strong> del <strong>{fmt(range.from)}</strong> al{' '}
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
                <div className="field">
                  <span id="guests-label">Huéspedes</span>
                  <GuestPicker value={guests} onChange={setGuests} />
                </div>

                {HAS_ACCESSIBLE && (
                  <label className="field-check">
                    <input type="checkbox" checked={accessible} onChange={(e) => setAccessible(e.target.checked)} />
                    <span>Necesito una cabaña accesible (movilidad reducida)</span>
                  </label>
                )}

                {maxCount > 1 && (
                  <div className="field-multi">
                    <label className="field-check">
                      <input
                        type="checkbox"
                        checked={isMulti}
                        disabled={forcedMulti}
                        onChange={(e) => setMulti(e.target.checked)}
                      />
                      <span>Quiero alquilar más de una cabaña</span>
                    </label>
                    {forcedMulti && (
                      <small className="field-hint">
                        Para {guests} personas se necesitan al menos {minCount} cabañas.
                      </small>
                    )}
                    {isMulti && (
                      <label className="field">
                        <span>Cantidad de cabañas</span>
                        <select value={String(count)} onChange={(e) => setCabinCount(e.target.value)} disabled={countMin === maxCount}>
                          {Array.from({ length: maxCount - countMin + 1 }, (_, i) => String(countMin + i)).map((n) => (
                            <option key={n} value={n}>{n} cabañas</option>
                          ))}
                        </select>
                      </label>
                    )}
                  </div>
                )}

                {cabinLabel && (
                  <div className="assigned-cabin" aria-live="polite">
                    <BedDouble size={20} aria-hidden="true" />
                    <div>
                      <span>{count > 1 ? 'Cabañas asignadas' : 'Cabaña asignada'}</span>
                      <strong>{cabinLabel}</strong>
                      {byAvailability && <small>La definitiva se confirma según disponibilidad.</small>}
                    </div>
                  </div>
                )}

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
                  <span>WhatsApp</span>
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
