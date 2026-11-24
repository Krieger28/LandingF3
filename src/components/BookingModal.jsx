import { useEffect, useMemo, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { es as dayPickerEs, enUS as dayPickerEn } from 'react-day-picker/locale'
import { differenceInCalendarDays, format, startOfToday } from 'date-fns'
import { es, enUS } from 'date-fns/locale'
import { BedDouble, CalendarDays, CircleCheck, LoaderCircle, X } from 'lucide-react'
import 'react-day-picker/style.css'
import '../styles/booking.css'
import { cabanas } from '../data/cabanas.js'
import { site } from '../data/site.js'
import { WhatsAppIcon } from './BrandIcons.jsx'
import { useLang } from '../i18n/index.jsx'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || site.contact.web3formsKey
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const LOCALES = { es: { date: es, picker: dayPickerEs }, en: { date: enUS, picker: dayPickerEn } }

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
function describe(options, items, or) {
  if (!options.length) return ''
  const names = (set) => set.map((c) => items[c.id].name).join(' + ')
  if (options.length === 1) return names(options[0])
  const common = options[0].filter((c) => options.every((set) => set.includes(c)))
  const alt = options.map((set) => names(set.filter((c) => !common.includes(c)))).join(or)
  return common.length ? `${names(common)} + (${alt})` : alt
}

// Nombres en español para los mensajes que recibe el dueño (siempre en su idioma)
import esDict from '../i18n/es.js'
const ES_ITEMS = esDict.cabins.items

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

/** Desplegable de huéspedes: botón que abre una grilla de 2 columnas × 7 filas. */
function GuestPicker({ value, onChange, people }) {
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
  const { t, lang } = useLang()
  const b = t.booking
  const loc = LOCALES[lang]
  const fmt = (d) => format(d, t.dateFormat, { locale: loc.date })
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
  const cabinLabel = describe(options, t.cabins.items, b.or)
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
    if (!range?.from || !range?.to || nights < 1) er.dates = b.errors.dates
    if (form.name.trim().length < 2) er.name = b.errors.name
    if (!EMAIL_RE.test(form.email.trim())) er.email = b.errors.email
    if (form.phone.replace(/\D/g, '').length < 8) er.phone = b.errors.phone
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

    const describeEs = describe(options, ES_ITEMS, ' o ')
    const fmtEs = (d) => format(d, "EEE d 'de' MMM yyyy", { locale: es })
    const data = {
      'Cantidad de cabañas': count,
      'Cabañas asignadas': byAvailability ? `${describeEs} — según disponibilidad` : describeEs,
      Accesible: accessible ? 'Sí' : 'No',
      Llegada: fmtEs(range.from),
      Salida: fmtEs(range.to),
      Idioma: lang === 'es' ? 'Español' : 'Inglés',
      Noches: nights,
      Huéspedes: guests,
      Nombre: form.name.trim(),
      Email: form.email.trim(),
      Teléfono: form.phone.trim(),
      Mensaje: form.message.trim() || '—',
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
      if (!res.ok || json.success !== true) throw new Error(json.message || 'Error')
      setStatus('sent')
    } catch (err) {
      console.error('No se pudo enviar la consulta:', err)
      setStatus('error')
    }
  }

  const fmtEsDate = (d) => format(d, "EEE d 'de' MMM yyyy", { locale: es })
  const waText = range?.from && range?.to
    ? `Hola! Quería consultar disponibilidad del ${fmtEsDate(range.from)} al ${fmtEsDate(range.to)} para ${guests} personas${count > 1 ? ` en ${count} cabañas` : ''}${accessible ? ' (necesito cabaña accesible)' : ''}.`
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
            <p className="eyebrow">{b.eyebrow}</p>
            <h2 id="booking-title">{b.title}</h2>
          </div>
          <button className="icon-btn" onClick={() => dialogRef.current.close()} aria-label={t.common.close}>
            <X size={22} />
          </button>
        </header>

        {status === 'sent' ? (
          <div className="booking-success">
            <CircleCheck size={56} strokeWidth={1.4} aria-hidden="true" />
            <h3>{b.thanks(form.name.split(' ')[0])}</h3>
            <p>
              {(([a, g, c, d, e, f, h, i, j, k, l]) => (
                <>{a}<strong>{g}</strong>{c}<strong>{d}</strong>{e}<strong>{f}</strong>{h}<strong>{i}</strong>{j}<strong>{k}</strong>{l}</>
              ))(b.successText(b.people(guests), cabinLabel, fmt(range.from), fmt(range.to), form.email))}
            </p>
            <div className="booking-success-actions">
              <button className="btn btn-primary" onClick={() => dialogRef.current.close()}>{b.done}</button>
              <a className="btn btn-outline" href={waLink} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} /> {b.writeWhatsapp}
              </a>
            </div>
          </div>
        ) : (
          <form className="booking-form" onSubmit={onSubmit} noValidate>
            <div className="booking-grid">
              <div className="booking-calendar">
                <fieldset>
                  <legend><CalendarDays size={18} aria-hidden="true" /> {b.dates}</legend>
                  <DayPicker
                    mode="range"
                    locale={loc.picker}
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
                    <div><span>{b.arrival}</span><strong>{range?.from ? fmt(range.from) : '—'}</strong></div>
                    <div><span>{b.departure}</span><strong>{range?.to && nights > 0 ? fmt(range.to) : '—'}</strong></div>
                    <div><span>{b.nights}</span><strong>{nights || '—'}</strong></div>
                  </div>
                  {errors.dates && <p className="field-error">{errors.dates}</p>}
                </fieldset>
              </div>

              <div className="booking-fields">
                <div className="field">
                  <span id="guests-label">{b.guests}</span>
                  <GuestPicker value={guests} onChange={setGuests} people={t.booking.people} />
                </div>

                {HAS_ACCESSIBLE && (
                  <label className="field-check">
                    <input type="checkbox" checked={accessible} onChange={(e) => setAccessible(e.target.checked)} />
                    <span>{b.needAccessible}</span>
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
                      <span>{b.wantMulti}</span>
                    </label>
                    {forcedMulti && (
                      <small className="field-hint">
                        {b.multiHint(guests, minCount)}
                      </small>
                    )}
                    {isMulti && (
                      <label className="field">
                        <span>{b.cabinCount}</span>
                        <select value={String(count)} onChange={(e) => setCabinCount(e.target.value)} disabled={countMin === maxCount}>
                          {Array.from({ length: maxCount - countMin + 1 }, (_, i) => String(countMin + i)).map((n) => (
                            <option key={n} value={n}>{b.cabinsN(n)}</option>
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
                      <span>{count > 1 ? b.assignedMany : b.assignedOne}</span>
                      <strong>{cabinLabel}</strong>
                      {byAvailability && <small>{b.byAvailability}</small>}
                    </div>
                  </div>
                )}

                <label className="field">
                  <span>{b.name}</span>
                  <input type="text" autoComplete="name" value={form.name} onChange={update('name')} aria-invalid={!!errors.name} placeholder={b.namePh} />
                  {errors.name && <small className="field-error">{errors.name}</small>}
                </label>
                <label className="field">
                  <span>{b.email}</span>
                  <input type="email" autoComplete="email" inputMode="email" value={form.email} onChange={update('email')} aria-invalid={!!errors.email} placeholder={b.emailPh} />
                  {errors.email && <small className="field-error">{errors.email}</small>}
                </label>
                <label className="field">
                  <span>{b.whatsapp}</span>
                  <input type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={update('phone')} aria-invalid={!!errors.phone} placeholder={b.phonePh} />
                  {errors.phone && <small className="field-error">{errors.phone}</small>}
                </label>
                <label className="field">
                  <span>{b.message} <em>{b.optional}</em></span>
                  <textarea rows={3} value={form.message} onChange={update('message')} placeholder={b.messagePh} />
                </label>

                {/* Honeypot anti-spam: invisible para personas */}
                <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                {status === 'error' && (
                  <p className="form-alert" role="alert">
                    {b.errorBefore}
                    <a href={waLink} target="_blank" rel="noopener noreferrer">{b.errorLink}</a>.
                  </p>
                )}

                <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={status === 'sending'}>
                  {status === 'sending' ? (<><LoaderCircle size={20} className="spin" aria-hidden="true" /> {b.sending}</>) : b.send}
                </button>
                <p className="form-note">{b.note}</p>
              </div>
            </div>
          </form>
        )}
      </div>
    </dialog>
  )
}
