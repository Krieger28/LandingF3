import { Mail, MapPin, Phone } from 'lucide-react'
import { InstagramIcon, WhatsAppIcon } from './BrandIcons.jsx'
import { useLang } from '../i18n/index.jsx'
import { site } from '../data/site.js'
import isotipo from '../assets/images/logos/la-posta-isotipo-verde.svg'

export default function Footer({ onBook }) {
  const { t } = useLang()
  const { contact, location } = site
  const year = new Date().getFullYear()

  return (
    <footer id="contacto" className="site-footer">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>{t.footer.ctaTitle}</h2>
            <p>{t.footer.ctaText}</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => onBook()}>
            {t.common.checkAvailability}
          </button>
        </div>

        <div className="footer-grid">
          <div>
            {/* Mismo logo que el header (isotipo en blanco + nombre) */}
            <a href="#top" className="brand footer-brand" aria-label={site.name}>
              <span className="brand-mark" aria-hidden="true">
                <img src={isotipo} alt="" width="53" height="30" />
              </span>
              <span className="brand-text" aria-hidden="true">
                {site.shortName}
                <small>DEL TRAPICHE</small>
              </span>
            </a>
            <p className="footer-tag">{t.footer.tagline}</p>
          </div>
          <ul className="footer-contact">
            <li><MapPin size={18} aria-hidden="true" /> {location.address}</li>
            <li><Mail size={18} aria-hidden="true" /> <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          </ul>
          <ul className="footer-social">
            <li>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon size={20} /> {contact.phone}
              </a>
            </li>
            {contact.instagram && (
              <li>
                <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon size={20} /> @{contact.instagram}
                </a>
              </li>
            )}
          </ul>
        </div>

        <p className="footer-legal">{t.footer.legal(year, site.name)[0]}<a href="https://levelear.com" target="_blank">Levelear</a></p>
      </div>
    </footer>
  )
}
