// ─────────────────────────────────────────────────────────────
//  CABAÑAS — editá nombres, capacidades y características.
//  Las fotos de cada una van en src/assets/images/<imagesFolder>/
// ─────────────────────────────────────────────────────────────

const comunes = [
  'Cocina equipada',
  'Parrilla propia',
  'Wi-Fi',
  'Smart TV',
  'Aire acondicionado frío/calor',
  'Ropa blanca incluida',
]

export const cabanas = [
  {
    id: 'cabana-1',
    name: 'Cabaña Nogal',
    imagesFolder: 'cabana-1',
    summary:
      'Cálida y luminosa, ideal para parejas o familias. Galería con vista al jardín y parrilla propia.',
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    size: 55,
    beds: '1 cama matrimonial · 2 camas individuales',
    features: comunes,
  },
  {
    id: 'cabana-2',
    name: 'Cabaña Roble',
    imagesFolder: 'cabana-2',
    summary:
      'Misma comodidad y equipamiento que Nogal: espacios integrados, galería propia y mucha luz natural.',
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    size: 55,
    beds: '1 cama matrimonial · 2 camas individuales',
    features: comunes,
  },
  {
    id: 'cabana-3',
    name: 'Cabaña Arrayán',
    imagesFolder: 'cabana-3',
    featured: true,
    accessible: true,
    summary:
      'Nuestra cabaña más amplia, diseñada para que todos la disfruten: totalmente accesible para personas con movilidad reducida.',
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    size: 85,
    beds: '1 cama matrimonial · 4 camas individuales',
    features: [...comunes, 'Living comedor amplio', 'Galería cubierta'],
    accessibility: [
      'Ingreso con rampa, sin escalones',
      'Puertas de 90 cm y circulación amplia',
      'Baño adaptado con barrales',
      'Ducha a nivel del piso con asiento',
      'Cama con altura adecuada para transferencia',
      'Estacionamiento junto a la puerta',
    ],
  },
]
