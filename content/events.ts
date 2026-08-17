export type EventType = 'stage' | 'competition' | 'entrainement' | 'sortie' | 'gala' | 'autre'

export type ClubEvent = {
  id: number
  title: string
  type: EventType
  startDate: string
  endDate?: string
  time?: string
  location: string
  description: string
  link?: string
}

export const eventTypeConfig: Record<EventType, { label: string; color: string; bgColor: string; borderColor: string }> = {
  stage: { label: 'Stage', color: 'text-red-700', bgColor: 'bg-red-100', borderColor: 'border-red-300' },
  competition: { label: 'Compétition', color: 'text-amber-700', bgColor: 'bg-amber-100', borderColor: 'border-amber-300' },
  entrainement: { label: 'Entraînement', color: 'text-blue-700', bgColor: 'bg-blue-100', borderColor: 'border-blue-300' },
  sortie: { label: 'Sortie', color: 'text-green-700', bgColor: 'bg-green-100', borderColor: 'border-green-300' },
  gala: { label: 'Gala', color: 'text-purple-700', bgColor: 'bg-purple-100', borderColor: 'border-purple-300' },
  autre: { label: 'Autre', color: 'text-gray-700', bgColor: 'bg-gray-100', borderColor: 'border-gray-300' },
}

export const events: ClubEvent[] = [
  {
    id: 1,
    title: 'Stage de Parkour - Vacances d\'Août',
    type: 'stage',
    startDate: '2026-08-17',
    endDate: '2026-08-28',
    time: 'Formule 1 : 10h-16h / Formule 2 : 16h-17h30',
    location: '4 Av. de L\'actipôle, Gujan-Mestras',
    description: 'Stage de parkour pendant les vacances d\'été (2nde session). Du lundi au vendredi, deux formules au choix : journée complète (25€/jour ou 100€/semaine) pour licenciés/initiés, ou séance découverte (15€) pour non-licenciés.',
    link: '/stage',
  },
  {
    id: 2,
    title: 'Forum des associations de La Teste-de-Buch',
    type: 'autre',
    startDate: '2026-09-05',
    time: 'Journée',
    location: 'La Teste-de-Buch',
    description: 'Le club PKBA tient un stand au forum des associations de La Teste-de-Buch. Venez découvrir le parkour, rencontrer les coachs, poser vos questions sur les groupes et les horaires, et repartir avec une séance d\'essai gratuite.',
    link: '/inscription',
  },
  {
    id: 3,
    title: 'Forum des associations de Gujan-Mestras',
    type: 'autre',
    startDate: '2026-09-06',
    time: 'Journée',
    location: 'Gujan-Mestras',
    description: 'Le club PKBA tient un stand au forum des associations de Gujan-Mestras. Venez découvrir le parkour, rencontrer les coachs, poser vos questions sur les groupes et les horaires, et repartir avec une séance d\'essai gratuite.',
    link: '/inscription',
  },
  {
    id: 4,
    title: 'Reprise des cours et entraînements - Saison 2026/2027',
    type: 'entrainement',
    startDate: '2026-09-07',
    endDate: '2027-06-30',
    time: 'Voir horaires détaillés',
    location: '4 Av. de L\'actipôle, Gujan-Mestras',
    description: 'Reprise des cours le lundi 7 septembre 2026. Entraînements hebdomadaires de parkour à Gujan-Mestras pour tous les âges à partir de 3 ans, du loisir ouvert à tous à la filière compétition. Encadrement par des coachs diplômés, club affilié à la FFGYM.',
    link: '/horaires',
  },
  {
    id: 5,
    title: 'Challenge interne PKBA et fête de Noël',
    type: 'autre',
    startDate: '2026-12-05',
    location: '4 Av. de L\'actipôle, Gujan-Mestras',
    description: 'Événement de fin d\'année du club, groupe par groupe : challenge interne PKBA suivi de la fête de Noël. Ouvert aux adhérents et à leurs familles.',
    link: '/planning',
  },
  {
    id: 6,
    title: 'Finale du Championnat de France de Parkour',
    type: 'competition',
    startDate: '2027-06-05',
    endDate: '2027-06-06',
    location: 'Lieu à confirmer',
    description: 'Finale du Championnat de France de Parkour FFGYM. Les traceurs du PKBA qualifiés sur le circuit national y représentent le Bassin d\'Arcachon.',
    link: '/actualites',
  },
  {
    id: 7,
    title: 'Gala de fin d\'année PKBA',
    type: 'gala',
    startDate: '2027-06-12',
    location: '4 Av. de L\'actipôle, Gujan-Mestras',
    description: 'Gala de fin de saison du club, ouvert aux athlètes, aux familles et au grand public. Démonstrations des groupes et temps fort de la vie associative du PKBA.',
    link: '/',
  },
]

export function getUpcomingEvents(limit?: number): ClubEvent[] {
  const today = new Date().toISOString().split('T')[0]
  const upcoming = events
    .filter((e) => (e.endDate || e.startDate) >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
  return limit ? upcoming.slice(0, limit) : upcoming
}

export function getEventsByType(type: EventType): ClubEvent[] {
  return events.filter((e) => e.type === type)
}

export function getEventsJsonLd(baseUrl: string) {
  const origin = baseUrl.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Calendrier des événements du PKBA',
    itemListElement: getUpcomingEvents().map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': event.type === 'competition' ? 'SportsEvent' : 'Event',
        name: event.title,
        startDate: event.startDate,
        ...(event.endDate ? { endDate: event.endDate } : {}),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        description: event.description,
        location: {
          '@type': 'Place',
          name: event.location,
          address: event.location,
        },
        organizer: {
          '@type': 'SportsOrganization',
          name: 'Parkour Bassin d\'Arcachon',
          url: origin,
        },
        ...(event.link ? { url: `${origin}${event.link}` } : {}),
      },
    })),
  }
}
