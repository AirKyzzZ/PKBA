export const CLUB = {
  name: 'Parkour Bassin d\'Arcachon',
  shortName: 'PKBA',
  address: {
    street: '4 Av. de L\'actipôle',
    postalCode: '33470',
    city: 'Gujan-Mestras',
    country: 'FR',
    full: '4 Av. de L\'actipôle, 33470 Gujan-Mestras',
    geo: {
      latitude: 44.6092918,
      longitude: -1.0725013,
    },
  },
  google: {
    mapsUrl: 'https://share.google/UrLrtmfeh45d819kt',
    reviewUrl: 'https://g.page/r/CdKrCf5LnFWiEBM/review',
    embedSrc:
      'https://www.google.com/maps?q=Parkour+Bassin+d%27Arcachon%2C+4+Av.+de+L%27actipole%2C+33470+Gujan-Mestras&output=embed',
  },
  travelTime: {
    arcachon: '15 min',
    laTeste: '10 min',
    bordeaux: '50 min',
  },
} as const
