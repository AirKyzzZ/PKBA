export type EventType = 'stage' | 'competition' | 'entrainement' | 'sortie' | 'autre'

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
  autre: { label: 'Autre', color: 'text-gray-700', bgColor: 'bg-gray-100', borderColor: 'border-gray-300' },
}

export const events: ClubEvent[] = [
  {
    id: 1,
    title: 'Stage de Parkour - Vacances d\'Avril',
    type: 'stage',
    startDate: '2026-04-06',
    endDate: '2026-04-17',
    time: 'Formule 1 : 10h-16h / Formule 2 : 16h-18h',
    location: 'Bassin d\'Arcachon',
    description: 'Stage de parkour pendant les vacances de printemps. Deux formules au choix : journée complète (25€/jour ou 100€/semaine) ou séance courte (15€). À partir de 6 ans.',
    link: '/inscription',
  },
  {
    id: 2,
    title: 'Entraînements réguliers - Saison 2025/2026',
    type: 'entrainement',
    startDate: '2025-09-16',
    endDate: '2026-06-30',
    time: 'Voir horaires détaillés',
    location: 'Bassin d\'Arcachon',
    description: 'Entraînements hebdomadaires pour tous les niveaux et tous les âges. Encadrement professionnel par coach diplômé.',
    link: '/horaires',
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
