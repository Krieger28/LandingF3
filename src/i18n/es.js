// ─────────────────────────────────────────────────────────────
//  TEXTOS EN ESPAÑOL. Misma estructura que en.js (si agregás una
//  clave acá, agregala también allá).
// ─────────────────────────────────────────────────────────────

const checkIn = '14:00'
const checkOut = '10:00'

export default {
  code: 'es',
  htmlLang: 'es-AR',
  dateFormat: "EEE d 'de' MMM yyyy",
  metaTitle: 'La Posta del Trapiche · Alquiler de cabañas',
  metaDescription:
    'Tres cabañas equipadas para descansar rodeado de naturaleza. Una de ellas totalmente accesible. Consultá disponibilidad online.',

  common: {
    skip: 'Saltar al contenido',
    close: 'Cerrar',
    prevPhoto: 'Foto anterior',
    nextPhoto: 'Foto siguiente',
    photoSoon: 'Foto próximamente',
    checkAvailability: 'Consultar disponibilidad',
  },

  nav: {
    label: 'Principal',
    links: ['Cabañas', 'Accesibilidad', 'Servicios', 'Ubicación', 'Preguntas'],
    book: 'Reservar',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    langButton: 'EN',
    langLabel: 'Switch to English',
  },

  hero: {
    tagline: 'Descanso, naturaleza y tranquilidad',
    title: ['Tu refugio para ', 'desconectar', ' y disfrutar'],
    lead: 'Tres cabañas equipadas, rodeadas de verde, pensadas para desconectarte. Una de ellas totalmente accesible.',
    seeCabins: 'Ver las cabañas',
    facts: {
      cabins: (n) => [`${n} cabañas`, ' rodeadas de verde'],
      guests: (n) => [`Hasta ${n}`, ' huéspedes en total'],
      accessible: ['Cabaña accesible', ' para todos'],
      linen: ['Ropa blanca', ' incluida'],
    },
  },

  cabins: {
    eyebrow: 'Nuestras cabañas',
    title: 'Elegí dónde descansar',
    lead: 'Dos cabañas gemelas, cómodas y luminosas, y una cabaña accesible pensada para que nadie quede afuera.',
    specsLabel: 'Características principales',
    accessibleBadge: 'Accesible',
    accessibilityTitle: 'Accesibilidad',
    guests: (n) => `${n} huéspedes`,
    studio: 'Monoambiente',
    bedrooms: (n) => `${n} ${n > 1 ? 'dormitorios' : 'dormitorio'}`,
    bathrooms: (n) => `${n} ${n > 1 ? 'baños' : 'baño'}`,
    photosOf: (name) => `Fotos de ${name}`,
    photosSoon: (name) => `Fotos de ${name} próximamente`,
    photoOf: (name) => `Foto de ${name}`,
    openPhoto: (name, i, total) => `Ver ${name} — foto ${i} de ${total} en pantalla completa`,
    photoCaption: (name, i, total) => `${name} — foto ${i} de ${total}`,
    commonFeatures: [
      'Cocina equipada',
      'Parrilla propia',
      'Wi-Fi',
      'Smart TV',
      'Aire acondicionado frío/calor',
      'Ropa blanca incluida',
    ],
    items: {
      'cabana-1': {
        name: 'Cabaña Nogal',
        short: 'Nogal',
        summary: 'Cálida y luminosa, ideal para parejas o familias. Galería con vista al jardín y parrilla propia.',
        beds: 'Habitación 1: cama matrimonial · Habitación 2: litera + cama individual',
      },
      'cabana-2': {
        name: 'Cabaña Roble',
        short: 'Roble',
        summary: 'Misma comodidad y equipamiento que Nogal: espacios integrados, galería propia y mucha luz natural.',
        beds: 'Habitación 1: cama matrimonial · Habitación 2: litera + cama individual',
      },
      'cabana-3': {
        name: 'Cabaña Arrayán',
        short: 'Arrayán',
        summary: 'Diseñada para que todos la disfruten: totalmente accesible para personas con movilidad reducida.',
        beds: '1 cama matrimonial',
        accessibility: [
          'Ingreso con rampa',
          'Aberturas de 1 metro',
          'Baño adaptado con inodoro y bacha con barrales',
          'Ducha con asiento y agarraderas',
          'Cama con altura adecuada para transferencia',
        ],
      },
    },
  },

  access: {
    eyebrow: 'Turismo accesible',
    title: 'Un lugar pensado para todos',
    text: (name) => [
      'La cabaña ',
      name,
      ' fue diseñada para personas con movilidad reducida, adultos mayores y familias que necesitan más espacio, sin resignar comodidad ni estética.',
    ],
    cta: 'Consultar disponibilidad accesible',
    points: [
      { title: 'Sin escalones', text: 'Ingreso con rampa y puertas anchas en todos los ambientes.' },
      { title: 'Baño adaptado', text: 'Barrales de apoyo y ducha a nivel del piso con asiento.' },
      { title: 'Llegada cómoda', text: 'Estacionamiento junto a la entrada de la cabaña.' },
    ],
  },

  amenities: {
    eyebrow: 'Servicios',
    title: 'Todo lo que necesitás, ya está',
    lead: 'Llegá y disfrutá: cada cabaña está completamente equipada.',
    surroundings: (i) => `El entorno — foto ${i}`,
    // Mismo orden que los íconos en Amenities.jsx
    items: [
      ['Wi-Fi', 'Conexión rápida en todas las cabañas.'],
      ['Aire acondicionado', 'Frío/calor en todos los ambientes.'],
      ['Smart TV', 'Con acceso a tus plataformas favoritas.'],
      ['Piscina compartida', 'Amplia y con solárium cercado.'],
      ['Parrilla', 'Parrilla propia para todo el año.'],
      ['Cocina', 'Hornallas, heladera, vajilla, microondas y más.'],
      ['Comedor', 'Con capacidad para seis comensales.'],
      ['Baño completo', 'Incluye amenities y secador de pelo.'],
      ['Ropa blanca', 'Sábanas y toallas incluidas.'],
      ['Porche cubierto', 'Con juego de sillas y mesa.'],
      ['Parking', 'Techado dentro del predio.'],
      ['Predio cerrado', 'Entorno seguro y tranquilo para toda la familia.'],
    ],
  },

  steps: {
    eyebrow: 'Cómo reservar',
    title: 'Simple, en tres pasos',
    items: [
      { title: 'Elegí fechas y cabaña', text: 'Tocá "Consultar disponibilidad" y marcá en el calendario los días que te interesan.' },
      { title: 'Te respondemos', text: 'Recibimos tu consulta al instante y te confirmamos disponibilidad y precio final.' },
      { title: 'Reservá y disfrutá', text: 'Con la seña confirmás tu estadía. Te esperamos con la cabaña lista.' },
    ],
  },

  location: {
    eyebrow: 'Ubicación',
    title: 'Cerca de todo, lejos del ruido',
    nearby: ['Centro', 'Siete Cajones', 'Embalse La Florida'],
    hours: `Check-in desde las ${checkIn} · Check-out hasta las ${checkOut}`,
    directions: 'Cómo llegar',
    mapTitle: (name) => `Mapa de ${name}`,
  },

  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Antes de viajar',
    items: [
      {
        q: '¿Cuál es el horario de ingreso y salida?',
        a: `El check-in es a partir de las ${checkIn} y el check-out hasta las ${checkOut}. Si necesitás otro horario, consultanos.`,
      },
      {
        q: '¿Cómo reservo?',
        a: 'Elegí tu cabaña, tocá "Consultar disponibilidad", completá las fechas y tus datos. Te respondemos a la brevedad con el precio final y los datos para la seña.',
      },
      { q: '¿Se aceptan mascotas?', a: 'Consultanos según la cabaña y la temporada.' },
      {
        q: '¿Qué incluye la estadía?',
        a: 'Ropa blanca, Wi-Fi, estacionamiento, uso de parrilla y cocina totalmente equipada.',
      },
      {
        q: '¿La cabaña accesible está adaptada para silla de ruedas?',
        a: 'Sí. Tiene ingreso con rampa, puertas anchas, circulación sin escalones y baño adaptado con barrales y ducha a nivel del piso.',
      },
    ],
  },

  footer: {
    ctaTitle: '¿Listo para tu próxima escapada?',
    ctaText: 'Consultá disponibilidad en un minuto. Te respondemos a la brevedad.',
    tagline: 'Descanso, naturaleza y tranquilidad',
    legal: (year, name) => [`© ${year} ${name}. Todos los derechos reservados. Desarrollado por `, ''],
  },

  whatsapp: {
    label: 'Escribinos por WhatsApp',
  },

  booking: {
    eyebrow: 'Consultar disponibilidad',
    title: 'Elegí tus fechas y huéspedes',
    dates: 'Fechas de la estadía',
    arrival: 'Llegada',
    departure: 'Salida',
    nights: 'Noches',
    guests: 'Huéspedes',
    people: (n) => `${n} ${n === '1' ? 'persona' : 'personas'}`,
    needAccessible: 'Necesito una cabaña accesible (movilidad reducida)',
    wantMulti: 'Quiero alquilar más de una cabaña',
    multiHint: (guests, min) => `Para ${guests} personas se necesitan al menos ${min} cabañas.`,
    cabinCount: 'Cantidad de cabañas',
    cabinsN: (n) => `${n} cabañas`,
    assignedOne: 'Cabaña asignada',
    assignedMany: 'Cabañas asignadas',
    byAvailability: 'La definitiva se confirma según disponibilidad.',
    name: 'Nombre y apellido',
    namePh: 'Ej: María González',
    email: 'Email',
    emailPh: 'tu@email.com',
    whatsapp: 'WhatsApp',
    phonePh: 'Ej: 11 2345 6789',
    message: 'Mensaje',
    optional: '(opcional)',
    messagePh: '¿Viajás con mascotas, niños o necesitás algo especial?',
    send: 'Enviar consulta',
    sending: 'Enviando…',
    note: 'Es solo una consulta: no se realiza ningún cobro. Te confirmamos disponibilidad y precio.',
    errorBefore: 'No pudimos enviar tu consulta. Probá de nuevo o ',
    errorLink: 'escribinos por WhatsApp',
    errors: {
      dates: 'Marcá la fecha de llegada y la de salida (mínimo 1 noche).',
      name: 'Ingresá tu nombre.',
      email: 'Ingresá un email válido.',
      phone: 'Ingresá un teléfono válido (con código de área).',
    },
    thanks: (name) => `¡Gracias, ${name}!`,
    successText: (guests, cabins, from, to, email) => [
      'Recibimos tu consulta para ',
      guests,
      ' en ',
      cabins,
      ' del ',
      from,
      ' al ',
      to,
      '. Te vamos a responder a ',
      email,
      ' a la brevedad.',
    ],
    done: 'Listo',
    writeWhatsapp: 'Escribir por WhatsApp',
    or: ' o ',
  },
}
