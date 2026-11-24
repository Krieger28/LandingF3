// ─────────────────────────────────────────────────────────────
//  DATOS GENERALES DEL SITIO — editá este archivo con tu info.
//  Los textos (en español e inglés) están en src/i18n/
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "La Posta del Trapiche",
  shortName: "La Posta",

  location: {
    city: "El Trapiche",
    province: "San Luis",
    address: "Pampa Rodriguez Saá 1913, El Trapiche, San Luis",
    // Google Maps → Compartir → Incorporar un mapa → copiá solo la URL del "src"
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3342.2505312211943!2d-66.0600326!3d-33.1024968!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d46d0aaae17a93%3A0xc3e42107ea4d1d79!2sLa%20Posta%20del%20Trapiche!5e0!3m2!1ses-419!2sar!4v1795489260619!5m2!1ses-419!2sar",
    // Botón "Cómo llegar": abre Google Maps con la ruta hasta la dirección (el origen es la ubicación del visitante)
    mapLink:
      "https://www.google.com/maps/dir/?api=1&destination=VWWV%2BX2%20Trapiche%2C%20San%20Luis",
    // Las etiquetas están en src/i18n/*.js (location.nearby), en el mismo orden
    nearbyTimes: ["2 min", "5 min", "10 min"],
  },

  contact: {
    email: "lapostadeltrapiche@gmail.com",
    // Cómo se muestra el número en la página
    phone: "+54 9 266 527-3559",
    // Mismo número para los links de WhatsApp. Solo números, con código de país: 549 + característica + número
    whatsapp: "5492665273559",
    instagram: "lapostadeltrapiche",
    // Clave de Web3Forms (web3forms.com): las consultas del formulario llegan al mail con el que se creó.
    // Es pública por diseño (viaja en el navegador), no es secreta.
    web3formsKey: "f54d0b38-1208-4dd7-a0fa-9c9dfa263d30",
  },

};
