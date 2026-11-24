// ─────────────────────────────────────────────────────────────
//  ENGLISH TEXTS. Same structure as es.js (if you add a key there,
//  add it here too).
// ─────────────────────────────────────────────────────────────

const checkIn = '2:00 PM'
const checkOut = '10:00 AM'

export default {
  code: 'en',
  htmlLang: 'en',
  dateFormat: 'EEE, MMM d, yyyy',
  metaTitle: 'La Posta del Trapiche · Cabin rentals',
  metaDescription:
    'Three fully equipped cabins to rest surrounded by nature. One of them is fully accessible. Check availability online.',

  common: {
    skip: 'Skip to content',
    close: 'Close',
    prevPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    photoSoon: 'Photo coming soon',
    checkAvailability: 'Check availability',
  },

  nav: {
    label: 'Main',
    links: ['Cabins', 'Accessibility', 'Amenities', 'Location', 'FAQ'],
    book: 'Book now',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    langButton: 'ES',
    langLabel: 'Cambiar a español',
  },

  hero: {
    tagline: 'Rest, nature and tranquility',
    // \n = salto de línea forzado (3 renglones como en español)
    title: ['Your refuge\nto ', 'unplug', '\nand enjoy'],
    lead: 'Three fully equipped cabins surrounded by greenery, made for you to disconnect. One of them is fully accessible.',
    seeCabins: 'See the cabins',
    facts: {
      cabins: (n) => [`${n} cabins`, ' in nature'],
      guests: (n) => [`Up to ${n}`, ' guests in total'],
      accessible: ['Accessible cabin', ' for everyone'],
      linen: ['Linens', ' included'],
    },
  },

  cabins: {
    eyebrow: 'Our cabins',
    title: 'Choose where to rest',
    lead: 'Two twin cabins, comfortable and bright, and one accessible cabin designed so that no one is left out.',
    specsLabel: 'Main features',
    accessibleBadge: 'Accessible',
    accessibilityTitle: 'Accessibility',
    guests: (n) => `${n} guests`,
    studio: 'Studio',
    bedrooms: (n) => `${n} ${n > 1 ? 'bedrooms' : 'bedroom'}`,
    bathrooms: (n) => `${n} ${n > 1 ? 'bathrooms' : 'bathroom'}`,
    photosOf: (name) => `Photos of ${name}`,
    photosSoon: (name) => `Photos of ${name} coming soon`,
    photoOf: (name) => `Photo of ${name}`,
    openPhoto: (name, i, total) => `View ${name} — photo ${i} of ${total} full screen`,
    photoCaption: (name, i, total) => `${name} — photo ${i} of ${total}`,
    commonFeatures: [
      'Equipped kitchen',
      'Private grill',
      'Wi-Fi',
      'Smart TV',
      'Air conditioning',
      'Linens included',
    ],
    items: {
      'cabana-1': {
        name: 'Nogal Cabin',
        short: 'Nogal',
        summary: 'Warm and bright, ideal for couples or families. Porch overlooking the garden and private grill.',
        beds: 'Bedroom 1: double bed · Bedroom 2: bunk bed + single bed',
      },
      'cabana-2': {
        name: 'Roble Cabin',
        short: 'Roble',
        summary: 'Same comfort and equipment as Nogal: open-plan spaces, private porch and plenty of natural light.',
        beds: 'Bedroom 1: double bed · Bedroom 2: bunk bed + single bed',
      },
      'cabana-3': {
        name: 'Arrayán Cabin',
        short: 'Arrayán',
        summary: 'Designed for everyone to enjoy: fully accessible for people with reduced mobility.',
        beds: '1 double bed',
        accessibility: [
          'Ramp entrance',
          '1-meter (3 ft) wide doorways',
          'Adapted bathroom with grab-bar toilet and sink',
          'Shower with seat and handrails',
          'Bed at a suitable height for transfers',
        ],
      },
    },
  },

  access: {
    eyebrow: 'Accessible tourism',
    title: 'A place designed for everyone',
    text: (name) => [
      'The ',
      name,
      ' cabin was designed for people with reduced mobility, older adults and families who need more space, without giving up comfort or style.',
    ],
    cta: 'Check accessible availability',
    points: [
      { title: 'Step-free', text: 'Ramp entrance and wide doors in every room.' },
      { title: 'Adapted bathroom', text: 'Support bars and a level-access shower with seat.' },
      { title: 'Easy arrival', text: 'Parking right next to the cabin entrance.' },
    ],
  },

  amenities: {
    eyebrow: 'Amenities',
    title: 'Everything you need, already here',
    lead: 'Arrive and enjoy: every cabin is fully equipped.',
    surroundings: (i) => `The surroundings — photo ${i}`,
    items: [
      ['Wi-Fi', 'Fast connection in all cabins.'],
      ['A/C', 'Heating/cooling in every room.'],
      ['Smart TV', 'With access to your favorite streaming platforms.'],
      ['Shared pool', 'Spacious, with a fenced sun deck.'],
      ['Grill', 'Private grill, usable all year round.'],
      ['Kitchen', 'Stove, fridge, tableware, microwave and more.'],
      ['Dining room', 'Seats up to six.'],
      ['Full bathroom', 'Includes toiletries and a hair dryer.'],
      ['Linens', 'Sheets and towels included.'],
      ['Covered porch', 'With table and chairs.'],
      ['Parking', 'Covered, inside the property.'],
      ['Gated property', 'A safe and quiet setting for the whole family.'],
    ],
  },

  steps: {
    eyebrow: 'How to book',
    title: 'Simple, in three steps',
    items: [
      { title: 'Pick dates and cabin', text: 'Tap "Check availability" and mark the days you want on the calendar.' },
      { title: 'We get back to you', text: 'We receive your inquiry instantly and confirm availability and the final price.' },
      { title: 'Book and enjoy', text: 'Pay the deposit to confirm your stay. We\'ll have the cabin ready for you.' },
    ],
  },

  location: {
    eyebrow: 'Location',
    title: 'Close to everything, far from the noise',
    nearby: ['Town center', 'Siete Cajones', 'La Florida Reservoir'],
    hours: `Check-in from ${checkIn} · Check-out by ${checkOut}`,
    directions: 'Get directions',
    mapTitle: (name) => `Map of ${name}`,
  },

  faq: {
    eyebrow: 'Frequently asked questions',
    title: 'Before you travel',
    items: [
      {
        q: 'What are the check-in and check-out times?',
        a: `Check-in is from ${checkIn} and check-out is until ${checkOut}. If you need a different time, just ask.`,
      },
      {
        q: 'How do I book?',
        a: 'Choose your cabin, tap "Check availability", and fill in your dates and details. We\'ll reply shortly with the final price and deposit information.',
      },
      { q: 'Are pets allowed?', a: 'Ask us — it depends on the cabin and the season.' },
      {
        q: 'What does the stay include?',
        a: 'Linens, Wi-Fi, parking, use of the grill and a fully equipped kitchen.',
      },
      {
        q: 'Is the accessible cabin wheelchair-friendly?',
        a: 'Yes. It has a ramp entrance, wide doors, step-free circulation and an adapted bathroom with grab bars and a level-access shower.',
      },
    ],
  },

  footer: {
    ctaTitle: 'Ready for your next getaway?',
    ctaText: 'Check availability in a minute. We\'ll reply shortly.',
    tagline: 'Rest, nature and tranquility',
    legal: (year, name) => [`© ${year} ${name}. All rights reserved. Developed by `, ''],
  },

  whatsapp: {
    label: 'Message us on WhatsApp',
  },

  booking: {
    eyebrow: 'Check availability',
    title: 'Choose your dates and guests',
    dates: 'Dates of your stay',
    arrival: 'Check-in',
    departure: 'Check-out',
    nights: 'Nights',
    guests: 'Guests',
    people: (n) => `${n} ${n === '1' ? 'guest' : 'guests'}`,
    needAccessible: 'I need an accessible cabin (reduced mobility)',
    wantMulti: 'I want to rent more than one cabin',
    multiHint: (guests, min) => `For ${guests} guests you need at least ${min} cabins.`,
    cabinCount: 'Number of cabins',
    cabinsN: (n) => `${n} cabins`,
    assignedOne: 'Assigned cabin',
    assignedMany: 'Assigned cabins',
    byAvailability: 'The final one is confirmed based on availability.',
    name: 'Full name',
    namePh: 'E.g. Jane Smith',
    email: 'Email',
    emailPh: 'you@email.com',
    whatsapp: 'WhatsApp',
    phonePh: 'E.g. +1 555 123 4567',
    message: 'Message',
    optional: '(optional)',
    messagePh: 'Traveling with pets, kids, or need anything special?',
    send: 'Send inquiry',
    sending: 'Sending…',
    note: 'This is just an inquiry: no payment is made. We\'ll confirm availability and price.',
    errorBefore: 'We couldn\'t send your inquiry. Try again or ',
    errorLink: 'message us on WhatsApp',
    errors: {
      dates: 'Select your check-in and check-out dates (minimum 1 night).',
      name: 'Enter your name.',
      email: 'Enter a valid email.',
      phone: 'Enter a valid phone number (with area code).',
    },
    thanks: (name) => `Thank you, ${name}!`,
    successText: (guests, cabins, from, to, email) => [
      'We received your inquiry for ',
      guests,
      ' in ',
      cabins,
      ' from ',
      from,
      ' to ',
      to,
      '. We\'ll reply to ',
      email,
      ' shortly.',
    ],
    done: 'Done',
    writeWhatsapp: 'Message on WhatsApp',
    or: ' or ',
  },
}
