// ─────────────────────────────────────────────────────────────
//  DATOS GENERALES DEL SITIO — editá este archivo con tu info.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Cabañas del Bosque',
  shortName: 'del Bosque',
  tagline: 'Descanso, naturaleza y tranquilidad',
  description:
    'Tres cabañas equipadas, rodeadas de verde, pensadas para desconectarte. Una de ellas es amplia y totalmente accesible.',

  location: {
    city: 'Tu ciudad',
    province: 'Provincia',
    address: 'Calle 123, Tu ciudad, Provincia',
    // Google Maps → Compartir → Incorporar un mapa → copiá solo la URL del "src"
    mapEmbedUrl:
      'https://www.google.com/maps?q=Argentina&z=4&output=embed',
    mapLink: 'https://maps.google.com/?q=Argentina',
    nearby: [
      { label: 'Centro', value: '5 min' },
      { label: 'Playa / río', value: '10 min' },
      { label: 'Supermercado', value: '3 min' },
    ],
  },

  contact: {
    email: 'reservas@tudominio.com',
    phone: '+54 9 11 0000-0000',
    // Solo números, con código de país: 549 + característica + número
    whatsapp: '5491100000000',
    instagram: 'tu_usuario',
  },

  checkIn: '14:00',
  checkOut: '10:00',
}

export const amenities = [
  { icon: 'Wifi', title: 'Wi-Fi', text: 'Conexión rápida en todas las cabañas.' },
  { icon: 'Flame', title: 'Parrilla y calefacción', text: 'Parrilla propia y calefacción para todo el año.' },
  { icon: 'Snowflake', title: 'Aire acondicionado', text: 'Frío/calor en todos los ambientes.' },
  { icon: 'Utensils', title: 'Cocina equipada', text: 'Vajilla, heladera, microondas y cafetera.' },
  { icon: 'Car', title: 'Estacionamiento', text: 'Cochera privada dentro del predio.' },
  { icon: 'Sparkles', title: 'Ropa blanca', text: 'Sábanas y toallas incluidas.' },
  { icon: 'Tv', title: 'Smart TV', text: 'Con acceso a tus plataformas favoritas.' },
  { icon: 'ShieldCheck', title: 'Predio cerrado', text: 'Entorno seguro y tranquilo para toda la familia.' },
]

export const faqs = [
  {
    q: '¿Cuál es el horario de ingreso y salida?',
    a: `El check-in es a partir de las ${site.checkIn} y el check-out hasta las ${site.checkOut}. Si necesitás otro horario, consultanos.`,
  },
  {
    q: '¿Cómo reservo?',
    a: 'Elegí tu cabaña, tocá "Consultar disponibilidad", completá las fechas y tus datos. Te respondemos a la brevedad con el precio final y los datos para la seña.',
  },
  {
    q: '¿Se aceptan mascotas?',
    a: 'Consultanos según la cabaña y la temporada.',
  },
  {
    q: '¿Qué incluye la estadía?',
    a: 'Ropa blanca, Wi-Fi, estacionamiento, uso de parrilla y cocina totalmente equipada.',
  },
  {
    q: '¿La cabaña accesible está adaptada para silla de ruedas?',
    a: 'Sí. Tiene ingreso con rampa, puertas anchas, circulación sin escalones y baño adaptado con barrales y ducha a nivel del piso.',
  },
]
