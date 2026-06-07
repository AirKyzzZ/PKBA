export type ScheduleCategory = 'loisir' | 'prepa' | 'compet' | 'anniv'

export type ScheduleSlot = {
  time: string
  group: string
  coach: string
  category: ScheduleCategory
}

export type ScheduleDay = {
  day: string
  slots: ScheduleSlot[]
}

export type CategoryConfig = {
  label: string
  color: string
  selection: boolean
  note?: string
}

export const SEASON_LABEL = '2026 / 2027'

export const SCHEDULE_CATEGORIES: Record<ScheduleCategory, CategoryConfig> = {
  loisir: { label: 'Loisir', color: '#16a34a', selection: false, note: 'ouvert à tous' },
  prepa: { label: 'Prépa compét', color: '#f59e0b', selection: true },
  compet: { label: 'Compétition', color: '#dc2626', selection: true },
  anniv: { label: 'Anniversaire / cours privés', color: '#64748b', selection: false },
}

export const SELECTION_NOTE =
  'Prépa compét et Compétition : sur sélection, pas ouvert aux nouveaux.'

export const WEEKLY_SCHEDULE: ScheduleDay[] = [
  {
    day: 'Lundi',
    slots: [
      { time: '18h30 / 20h00', group: 'Prépa compét +12 ans', coach: 'Victor', category: 'prepa' },
    ],
  },
  {
    day: 'Mardi',
    slots: [
      { time: '17h00 / 18h30', group: 'Prépa compét 8/12 ans', coach: 'David', category: 'prepa' },
      { time: '18h30 / 20h00', group: 'Compétition', coach: 'David', category: 'compet' },
    ],
  },
  {
    day: 'Mercredi',
    slots: [
      { time: '11h00 / 11h45', group: 'Loisir 3/5 ans', coach: 'David', category: 'loisir' },
      { time: '13h00 / 14h00', group: 'Loisir 6/8 ans', coach: 'Antoine', category: 'loisir' },
      { time: '14h00 / 15h30', group: 'Loisir 8/12 ans', coach: 'Antoine', category: 'loisir' },
      { time: '15h30 / 17h30', group: 'Compétition', coach: 'David', category: 'compet' },
      { time: '17h30 / 19h00', group: 'Loisir +12 ans', coach: 'Victor/Antoine', category: 'loisir' },
    ],
  },
  {
    day: 'Jeudi',
    slots: [
      { time: '17h00 / 18h30', group: 'Prépa compét 8/12 ans', coach: 'David', category: 'prepa' },
      { time: '18h30 / 20h00', group: 'Prépa compét +12 ans', coach: 'David', category: 'prepa' },
    ],
  },
  {
    day: 'Vendredi',
    slots: [
      { time: '17h30 / 19h30', group: 'Compétition', coach: 'David', category: 'compet' },
    ],
  },
  {
    day: 'Samedi',
    slots: [
      { time: '13h00 / 15h00', group: 'Anniversaire / cours privés', coach: 'David', category: 'anniv' },
      { time: '15h00 / 17h00', group: 'Anniversaire / cours privés', coach: 'David', category: 'anniv' },
    ],
  },
]

export type GroupOption = { value: string; label: string }

export const PREINSCRIPTION_GROUP_OPTIONS: GroupOption[] = [
  { value: 'Loisir 3-5 ans', label: 'Loisir 3-5 ans (le mercredi)' },
  { value: 'Loisir 6-8 ans', label: 'Loisir 6-8 ans (le mercredi)' },
  { value: 'Loisir 8-12 ans', label: 'Loisir 8-12 ans (le mercredi)' },
  { value: 'Loisir +12 ans', label: 'Loisir +12 ans (le mercredi)' },
  { value: 'Prépa compétition', label: 'Prépa compétition (sur sélection)' },
  { value: 'Compétition', label: 'Compétition (sur sélection)' },
  { value: 'À conseiller', label: 'Je ne sais pas encore, à conseiller' },
]

export const PREINSCRIPTION_GROUP_VALUES: readonly string[] =
  PREINSCRIPTION_GROUP_OPTIONS.map((o) => o.value)
