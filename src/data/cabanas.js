// ─────────────────────────────────────────────────────────────
//  CABAÑAS — capacidades y datos numéricos.
//  Nombres, descripciones y características (ES/EN) están en src/i18n/
//  bajo cabins.items[id]. Las fotos van en src/assets/images/<imagesFolder>/
// ─────────────────────────────────────────────────────────────

export const cabanas = [
  {
    id: "cabana-1",
    imagesFolder: "cabana-1",
    guests: 5,
    bedrooms: 2,
    bathrooms: 1,
    size: 55,
  },
  {
    id: "cabana-2",
    imagesFolder: "cabana-2",
    guests: 5,
    bedrooms: 2,
    bathrooms: 1,
    size: 55,
  },
  {
    id: "cabana-3",
    imagesFolder: "cabana-3",
    featured: true,
    accessible: true,
    guests: 2,
    bedrooms: 0, // 0 = monoambiente
    bathrooms: 1,
    size: 40,
  },
];
