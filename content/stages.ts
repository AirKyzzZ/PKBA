export type StageId = 'juillet-2026' | 'aout-2026'

export type StageDay = {
  date: string
  label: string
  weekIndex: number
}

export type StageConfig = {
  id: StageId
  airtableType: string
  shortLabel: string
  fullLabel: string
  badgeLabel: string
  emoji: string
  period: string
  monthLabel: string
  weekDiscount: boolean
  days: StageDay[]
  metadataTitle: string
  metadataDescription: string
}

const FORMULE_1_TIME = '10h-16h'
const FORMULE_2_TIME = '16h-17h30'

export const FORMULES = {
  1: {
    id: 1 as const,
    label: 'Formule 1 — Licenciés / Initiés',
    shortLabel: 'Formule 1',
    time: FORMULE_1_TIME,
    audience: 'Licenciés ou initiés au parkour',
    description: 'Journée complète encadrée pour pratiquants ayant déjà des bases.',
    pricePerDay: 25,
    priceWeek: 100,
    minAge: 8,
  },
  2: {
    id: 2 as const,
    label: 'Formule 2 — Découverte',
    shortLabel: 'Formule 2',
    time: FORMULE_2_TIME,
    audience: 'Non-licenciés / découverte',
    description: 'Séance courte pour découvrir le parkour en toute sécurité.',
    pricePerDay: 15,
    priceWeek: null as number | null,
    minAge: 6,
  },
} as const

export type FormuleId = keyof typeof FORMULES

const buildDays = (datesIso: string[], weekBoundaries: number[]): StageDay[] => {
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
  const monthNames = [
    'janv.', 'févr.', 'mars', 'avril', 'mai', 'juin',
    'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
  ]
  return datesIso.map((iso, idx) => {
    const d = new Date(iso + 'T12:00:00')
    const weekIndex = weekBoundaries.findIndex((boundary) => idx < boundary)
    return {
      date: iso,
      label: `${dayNames[d.getUTCDay()]} ${d.getUTCDate()} ${monthNames[d.getUTCMonth()]}`,
      weekIndex: weekIndex === -1 ? weekBoundaries.length : weekIndex,
    }
  })
}

export const STAGES: Record<StageId, StageConfig> = {
  'juillet-2026': {
    id: 'juillet-2026',
    airtableType: 'Stage Vacances Juillet 2026',
    shortLabel: 'Juillet',
    fullLabel: 'Stage Juillet 2026',
    badgeLabel: 'Stage de Juillet',
    emoji: '☀️',
    period: 'Du 6 au 16 juillet 2026',
    monthLabel: 'juillet 2026',
    weekDiscount: false,
    days: buildDays(
      [
        '2026-07-06', '2026-07-07', '2026-07-08', '2026-07-09',
        '2026-07-13', '2026-07-14', '2026-07-15', '2026-07-16',
      ],
      [4, 8],
    ),
    metadataTitle: 'Stage de Parkour - Vacances de Juillet 2026 | PKBA Bassin d\'Arcachon',
    metadataDescription:
      'Inscrivez-vous au stage de parkour des vacances de juillet 2026 ! Du lundi au jeudi, du 6 au 16 juillet, deux formules au choix. À partir de 6 ans, encadrement professionnel.',
  },
  'aout-2026': {
    id: 'aout-2026',
    airtableType: 'Stage Vacances Août 2026',
    shortLabel: 'Août',
    fullLabel: 'Stage Août 2026',
    badgeLabel: 'Stage d\'Août',
    emoji: '🏖️',
    period: 'Du 17 au 28 août 2026',
    monthLabel: 'août 2026',
    weekDiscount: true,
    days: buildDays(
      [
        '2026-08-17', '2026-08-18', '2026-08-19', '2026-08-20', '2026-08-21',
        '2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28',
      ],
      [5, 10],
    ),
    metadataTitle: 'Stage de Parkour - Vacances d\'Août 2026 | PKBA Bassin d\'Arcachon',
    metadataDescription:
      'Inscrivez-vous au stage de parkour des vacances d\'août 2026 ! Du lundi au vendredi, du 17 au 28 août, deux formules au choix avec tarif semaine. À partir de 6 ans.',
  },
} as const

export const STAGE_ORDER: StageId[] = ['juillet-2026', 'aout-2026']

export const DEFAULT_STAGE_ID: StageId = 'juillet-2026'

export const getStageById = (id: string | null | undefined): StageConfig => {
  if (id && id in STAGES) return STAGES[id as StageId]
  return STAGES[DEFAULT_STAGE_ID]
}

export const ALL_AIRTABLE_TYPES: readonly string[] = STAGE_ORDER.map(
  (id) => STAGES[id].airtableType,
)
