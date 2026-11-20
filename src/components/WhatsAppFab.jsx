import { WhatsAppIcon } from './BrandIcons.jsx'
import { site } from '../data/site.js'

export default function WhatsAppFab() {
  const text = encodeURIComponent(`Hola! Quería consultar por las cabañas de ${site.name}.`)
  return (
    <a
      className="wa-fab"
      href={`https://wa.me/${site.contact.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
