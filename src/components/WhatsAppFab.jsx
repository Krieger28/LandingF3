import { WhatsAppIcon } from './BrandIcons.jsx'
import { useLang } from '../i18n/index.jsx'
import { site } from '../data/site.js'

export default function WhatsAppFab() {
  const { t } = useLang()
  const text = encodeURIComponent(`Hola! Quería consultar por las cabañas de ${site.name}.`)
  return (
    <a
      className="wa-fab"
      href={`https://wa.me/${site.contact.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
