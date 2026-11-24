// ─────────────────────────────────────────────────────────────
//  CABAÑAS — editá nombres, capacidades y características.
//  Las fotos de cada una van en src/assets/images/<imagesFolder>/
// ─────────────────────────────────────────────────────────────

const comunes = [
  "Cocina equipada",
  "Parrilla propia",
  "Wi-Fi",
  "Smart TV",
  "Aire acondicionado frío/calor",
  "Ropa blanca incluida",
];

export const cabanas = [
  {
    id: "cabana-1",
    name: "Cabaña Nogal",
    imagesFolder: "cabana-1",
    summary:
      "Cálida y luminosa, ideal para parejas o familias. Galería con vista al jardín y parrilla propia.",
    guests: 5,
    bedrooms: 2,
    bathrooms: 1,
    size: 55,
    beds: "Habitación 1: cama matrimonial · Habitación 2: litera + cama individual",
    features: comunes,
  },
  {
    id: "cabana-2",
    name: "Cabaña Roble",
    imagesFolder: "cabana-2",
    summary:
      "Misma comodidad y equipamiento que Nogal: espacios integrados, galería propia y mucha luz natural.",
    guests: 5,
    bedrooms: 2,
    bathrooms: 1,
    size: 55,
    beds: "Habitación 1: cama matrimonial · Habitación 2: litera + cama individual",
    features: comunes,
  },
  {
    id: "cabana-3",
    name: "Cabaña Arrayán",
    imagesFolder: "cabana-3",
    featured: true,
    accessible: true,
    summary:
      "Diseñada para que todos la disfruten: totalmente accesible para personas con movilidad reducida.",
    guests: 2,
    bedrooms: 0, // 0 = monoambiente
    bathrooms: 1,
    size: 40,
    beds: "1 cama matrimonial",
    features: [...comunes],
    accessibility: [
      "Ingreso con rampa",
      "Aberturas de 1 metro",
      "Baño adaptado con inodoro y bacha con barrales",
      "Ducha con asiento y agarraderas",
      "Cama con altura adecuada para transferencia",
    ],
  },
];
