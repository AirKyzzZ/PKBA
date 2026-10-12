import {
  FORMULES,
  STAGES,
  getStageLastDay,
  type FormuleId,
  type StageConfig,
  type StageDay,
  type StageId,
} from '@/content/stages'
import {
  ageOn,
  isNonEmpty,
  isValidEmail,
  isValidFrenchPhone,
  isValidIsoDate,
} from '@/lib/validation'

const VALID_GENDERS: readonly string[] = ['Masculin', 'Féminin', 'Autre']
const SIGNATURE_MAX_LEN = 200_000
const ADULT_AGE = 18
const FORMULE_VALUE_RE = /^formule(\d+)$/
const DAY_ABBREVIATIONS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
const WEEKDAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

export type LegalGuardian = {
  title?: string
  lastName?: string
  firstName?: string
  phone?: string
  email?: string
}

export type EmergencyContact = {
  name?: string
  phone?: string
}

export type StageInscriptionPayload = {
  selectedStage?: string
  selectedFormule?: string
  firstName?: string
  lastName?: string
  birthDate?: string
  gender?: string
  adhesionType?: string[]
  otherClub?: string
  address?: string
  postalCode?: string
  city?: string
  phone?: string
  email?: string
  legalGuardian1?: LegalGuardian
  legalGuardian2?: LegalGuardian
  emergencyContact?: EmergencyContact
  imageRights?: boolean
  termsAccepted?: boolean
  selectedDates?: string[]
  signature?: string
  signatureDate?: string
}

export type StageInscriptionCheck =
  | { ok: false; message: string }
  | {
      ok: true
      stage: StageConfig
      formuleId: FormuleId
      selectedDates: string[]
      adhesionTypes: string[]
      signatureDate: string
    }

export const parseFormuleId = (value: unknown): FormuleId | null => {
  if (typeof value !== 'string') return null
  const match = FORMULE_VALUE_RE.exec(value)
  if (!match || !Object.prototype.hasOwnProperty.call(FORMULES, match[1])) return null
  return Number(match[1]) as FormuleId
}

export const isMinorOn = (birthIso: string, today: string): boolean =>
  ageOn(birthIso, today) < ADULT_AGE

const invalid = (message: string): StageInscriptionCheck => ({ ok: false, message })

export function validateStageInscription(
  body: StageInscriptionPayload,
  today: string,
): StageInscriptionCheck {
  if (!isNonEmpty(body.firstName) || !isNonEmpty(body.lastName)) {
    return invalid('Informations personnelles incomplètes')
  }

  if (!isNonEmpty(body.birthDate)) return invalid('Date de naissance requise')
  if (!isValidIsoDate(body.birthDate)) return invalid('Date de naissance invalide')
  if (body.birthDate > today) {
    return invalid('La date de naissance ne peut pas être dans le futur')
  }

  if (!isNonEmpty(body.gender) || !VALID_GENDERS.includes(body.gender)) {
    return invalid('Sexe requis')
  }

  if (
    !isNonEmpty(body.address) ||
    !isNonEmpty(body.postalCode) ||
    !isNonEmpty(body.city) ||
    !isNonEmpty(body.phone) ||
    !isNonEmpty(body.email)
  ) {
    return invalid('Adresse et coordonnées incomplètes')
  }
  if (!isValidFrenchPhone(body.phone)) return invalid('Numéro de téléphone invalide')
  if (!isValidEmail(body.email)) return invalid('Email invalide')

  const emergency = body.emergencyContact
  if (!emergency || !isNonEmpty(emergency.name) || !isNonEmpty(emergency.phone)) {
    return invalid("Contact d'urgence incomplet")
  }
  if (!isValidFrenchPhone(emergency.phone)) {
    return invalid("Téléphone du contact d'urgence invalide")
  }

  if (typeof body.imageRights !== 'boolean') {
    return invalid("Consentement droit à l'image invalide")
  }
  if (body.termsAccepted !== true) return invalid('Acceptation du règlement intérieur requise')

  const adhesionTypes = (Array.isArray(body.adhesionType) ? body.adhesionType : []).filter(
    (t): t is string => typeof t === 'string' && t.trim() !== '' && t !== 'undefined' && t !== 'null',
  )
  if (adhesionTypes.length === 0) return invalid("Type d'adhésion requis")

  if (
    !isNonEmpty(body.selectedStage) ||
    !Object.prototype.hasOwnProperty.call(STAGES, body.selectedStage)
  ) {
    return invalid('Stage invalide ou manquant')
  }
  const stage = STAGES[body.selectedStage as StageId]
  if (getStageLastDay(stage) < today) {
    return invalid('Ce stage est terminé, les inscriptions sont closes')
  }

  const formuleId = parseFormuleId(body.selectedFormule)
  if (!formuleId) return invalid('Formule invalide ou manquante')

  const rawDates: unknown[] = Array.isArray(body.selectedDates) ? body.selectedDates : []
  if (rawDates.length === 0) return invalid('Au moins une journée doit être sélectionnée')
  const stageDates = stage.days.map((d) => d.date)
  if (!rawDates.every((d): d is string => typeof d === 'string' && stageDates.includes(d))) {
    return invalid('Jours sélectionnés invalides pour ce stage')
  }
  const selectedDates = Array.from(new Set(rawDates as string[])).sort()

  const { minAge, shortLabel } = FORMULES[formuleId]
  if (ageOn(body.birthDate, selectedDates[0]) < minAge) {
    return invalid(`Âge minimum de ${minAge} ans requis pour la ${shortLabel}`)
  }

  const guardian1 = body.legalGuardian1 ?? {}
  const guardian2 = body.legalGuardian2 ?? {}
  if (
    isMinorOn(body.birthDate, today) &&
    (!isNonEmpty(guardian1.firstName) || !isNonEmpty(guardian1.lastName) || !isNonEmpty(guardian1.phone))
  ) {
    return invalid('Informations du responsable légal 1 incomplètes')
  }
  if (isNonEmpty(guardian1.phone) && !isValidFrenchPhone(guardian1.phone)) {
    return invalid('Téléphone du responsable légal 1 invalide')
  }
  if (isNonEmpty(guardian2.phone) && !isValidFrenchPhone(guardian2.phone)) {
    return invalid('Téléphone du responsable légal 2 invalide')
  }

  if (!isNonEmpty(body.signature) || body.signature.length > SIGNATURE_MAX_LEN) {
    return invalid('Signature manquante ou invalide')
  }

  const signatureDate = isNonEmpty(body.signatureDate) ? body.signatureDate.slice(0, 10) : today
  if (!isValidIsoDate(signatureDate)) return invalid("Date d'inscription invalide")

  return { ok: true, stage, formuleId, selectedDates, adhesionTypes, signatureDate }
}

export const formatFormuleLabel = (formuleId: FormuleId): string =>
  `${FORMULES[formuleId].shortLabel} (${FORMULES[formuleId].time})`

export const formatDaysSelected = (dates: string[]): string =>
  [...dates]
    .sort()
    .map((iso) => {
      const d = new Date(`${iso}T12:00:00Z`)
      const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
      return `${DAY_ABBREVIATIONS[d.getUTCDay()]} ${d.getUTCDate()}/${mm}`
    })
    .join(', ')

const dayAndMonth = (day: StageDay): string => day.label.replace(/^\S+\s/, '')

export function formatWeekLabel(weekDays: StageDay[]): string {
  const first = weekDays[0]
  const last = weekDays[weekDays.length - 1]
  if (!first || !last) return ''
  if (first.date === last.date) {
    const weekday = WEEKDAY_NAMES[new Date(`${first.date}T12:00:00Z`).getUTCDay()]
    return `${weekday} ${dayAndMonth(first)}`
  }
  const sameMonth = first.date.slice(0, 7) === last.date.slice(0, 7)
  const start = sameMonth ? String(Number(first.date.slice(8, 10))) : dayAndMonth(first)
  return `du ${start} au ${dayAndMonth(last)}`
}
