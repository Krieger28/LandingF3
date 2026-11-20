import { Mail, MapPin, Phone } from 'lucide-react'
import { InstagramIcon, WhatsAppIcon } from './BrandIcons.jsx'
import { site } from '../data/site.js'

export default function Footer({ onBook }) {
  const { contact, location } = site
  const year = new Date().getFullYear()

  return (
    <footer id="contacto" className="site-footer">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>¿Listo para tu próxima escapada?</h2>
            <p>Consultá disponibilidad en un minuto. Te respondemos a la brevedad.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => onBook()}>
            Consultar disponibilidad
          </button>
        </div>

        <div className="footer-grid">
          <div>
            <p className="footer-brand">{site.name}</p>
            <p className="footer-tag">{site.tagline}</p>
          </div>
          <ul className="footer-contact">
            <li><MapPin size={18} aria-hidden="true" /> {location.address}</li>
            <li><Phone size={18} aria-hidden="true" /> <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a></li>
            <li><Mail size={18} aria-hidden="true" /> <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          </ul>
          <ul className="footer-social">
            <li>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon size={20} /> WhatsApp
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

        <p className="footer-legal">© {year} {site.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
