// ─────────────────────────────────────────────────────────────
//  DATOS GENERALES DEL SITIO — editá este archivo con tu info.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "La Posta del Trapiche",
  shortName: "La Posta",
  tagline: "Descanso, naturaleza y tranquilidad",
  description:
    "Tres cabañas equipadas, rodeadas de verde, pensadas para desconectarte. Una de ellas totalmente accesible.",

  location: {
    city: "Tu ciudad",
    province: "Provincia",
    address: "Pampa Rodriguez Saá 1913, El Trapiche, San Luis",
    // Google Maps → Compartir → Incorporar un mapa → copiá solo la URL del "src"
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3342.2505312211943!2d-66.0600326!3d-33.1024968!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d46d0aaae17a93%3A0xc3e42107ea4d1d79!2sLa%20Posta%20del%20Trapiche!5e0!3m2!1ses-419!2sar!4v1795489260619!5m2!1ses-419!2sar",
    // Botón "Cómo llegar": abre Google Maps con la ruta hasta la dirección (el origen es la ubicación del visitante)
    mapLink:
      "https://www.google.com/maps/dir/?api=1&destination=VWWV%2BX2%20Trapiche%2C%20San%20Luis",
    nearby: [
      { label: "Centro", value: "2 min" },
      { label: "Siete Cajones", value: "5 min" },
      { label: "Embalse La Florida", value: "10 min" },
    ],
  },

  contact: {
    email: "lapostadeltrapiche@gmail.com",
    // Cómo se muestra el número en la página
    phone: "+54 9 266 527-3559",
    // Mismo número para los links de WhatsApp. Solo números, con código de país: 549 + característica + número
    whatsapp: "5492665273559",
    instagram: "lapostadeltrapiche",
  },

  checkIn: "14:00",
  checkOut: "10:00",
};

export const amenities = [
  {
    icon: "Wifi",
    title: "Wi-Fi",
    text: "Conexión rápida en todas las cabañas.",
  },
  {
    icon: "SunSnow",
    title: "Aire acondicionado",
    text: "Frío/calor en todos los ambientes.",
  },
  {
    icon: "Tv",
    title: "Smart TV",
    text: "Con acceso a tus plataformas favoritas.",
  },
  {
    icon: "Waves",
    title: "Piscina compartida",
    text: "Amplia y con solárium cercado.",
  },
  {
    icon: "Flame",
    title: "Parrilla",
    text: "Parrilla propia para todo el año.",
  },
  {
    icon: "ChefHat",
    title: "Cocina",
    text: "Hornallas, heladera, vajilla, microondas y más.",
  },
  {
    icon: "Utensils",
    title: "Comedor",
    text: "Con capacidad para seis comensales.",
  },
  {
    icon: "ShowerHead",
    title: "Baño completo",
    text: "Incluye amenities y secador de pelo.",
  },
  {
    icon: "Sparkles",
    title: "Ropa blanca",
    text: "Sábanas y toallas incluidas.",
  },
  {
    icon: "HouseHeart",
    title: "Porche cubierto",
    text: "Con juego de sillas y mesa.",
  },
  {
    icon: "Car",
    title: "Parking",
    text: "Techado dentro del predio.",
  },
  {
    icon: "ShieldCheck",
    title: "Predio cerrado",
    text: "Entorno seguro y tranquilo para toda la familia.",
  },
];

export const faqs = [
  {
    q: "¿Cuál es el horario de ingreso y salida?",
    a: `El check-in es a partir de las ${site.checkIn} y el check-out hasta las ${site.checkOut}. Si necesitás otro horario, consultanos.`,
  },
  {
    q: "¿Cómo reservo?",
    a: 'Elegí tu cabaña, tocá "Consultar disponibilidad", completá las fechas y tus datos. Te respondemos a la brevedad con el precio final y los datos para la seña.',
  },
  {
    q: "¿Se aceptan mascotas?",
    a: "Consultanos según la cabaña y la temporada.",
  },
  {
    q: "¿Qué incluye la estadía?",
    a: "Ropa blanca, Wi-Fi, estacionamiento, uso de parrilla y cocina totalmente equipada.",
  },
  {
    q: "¿La cabaña accesible está adaptada para silla de ruedas?",
    a: "Sí. Tiene ingreso con rampa, puertas anchas, circulación sin escalones y baño adaptado con barrales y ducha a nivel del piso.",
  },
];
