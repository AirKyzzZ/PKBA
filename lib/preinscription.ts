import { PREINSCRIPTION_GROUP_VALUES } from '@/content/schedule'
import {
  ageOn,
  isNonEmpty,
  isValidEmail,
  isValidFrenchPhone,
  isValidIsoDate,
} from '@/lib/validation'

export const PREINSCRIPTION_TYPE = 'Saison 2026/2027'
export const MESSAGE_MAX_LEN = 1000

const MIN_AGE = 3
const MAX_AGE = 100
const AGE_REFERENCE_DATE = '2026-09-01'
const STATUS_PENDING = 'En attente'
const MEDICAL_DEFAULT = 'Non vérifié'

export type PreinscriptionPayload = {
  firstName?: string
  lastName?: string
  birthDate?: string
  groupeSouhaite?: string
  parentName?: string
  phone?: string
  email?: string
  message?: string
  consent?: boolean
}

export function validatePreinscription(
  body: PreinscriptionPayload,
  today: string = new Date().toISOString().slice(0, 10),
): string | null {
  if (!isNonEmpty(body.firstName) || !isNonEmpty(body.lastName)) return 'Nom et prénom requis'
  if (!isNonEmpty(body.birthDate) || !isValidIsoDate(body.birthDate)) {
    return 'Date de naissance invalide'
  }
  if (body.birthDate > today) return 'La date de naissance ne peut pas être dans le futur'
  const age = ageOn(body.birthDate, AGE_REFERENCE_DATE)
  if (age < MIN_AGE) return `L'enfant doit avoir au moins ${MIN_AGE} ans au 1er septembre 2026`
  if (age > MAX_AGE) return 'Date de naissance invalide'
  if (
    !isNonEmpty(body.groupeSouhaite) ||
    !PREINSCRIPTION_GROUP_VALUES.includes(body.groupeSouhaite.trim())
  ) {
    return 'Groupe souhaité invalide'
  }
  if (!isNonEmpty(body.phone)) return 'Téléphone requis'
  if (!isValidFrenchPhone(body.phone)) return 'Numéro de téléphone invalide'
  if (!isNonEmpty(body.email) || !isValidEmail(body.email)) return 'Email invalide'
  for (const optional of [body.message, body.parentName]) {
    if (optional !== undefined && optional !== null && typeof optional !== 'string') {
      return 'Requête invalide'
    }
  }
  if (typeof body.message === 'string' && body.message.trim().length > MESSAGE_MAX_LEN) {
    return `Message trop long (${MESSAGE_MAX_LEN} caractères maximum)`
  }
  if (body.consent !== true) return 'Consentement requis'
  return null
}

export function buildPreinscriptionFields(
  body: PreinscriptionPayload,
  today: string = new Date().toISOString().slice(0, 10),
): Record<string, unknown> {
  const groupe = body.groupeSouhaite!.trim()
  const message = isNonEmpty(body.message) ? body.message.trim() : ''
  const wish = message
    ? `Groupe souhaité : ${groupe} · Note : ${message}`
    : `Groupe souhaité : ${groupe}`

  const fields: Record<string, unknown> = {
    Nom: body.lastName!.trim(),
    Prénom: body.firstName!.trim(),
    'Date de naissance': body.birthDate,
    Téléphone: body.phone!.trim(),
    Email: body.email!.trim(),
    "Type d'inscription": PREINSCRIPTION_TYPE,
    Statut: STATUS_PENDING,
    'Certificat médical': MEDICAL_DEFAULT,
    "Date d'inscription": today,
    'Jours sélectionnés': wish,
  }
  if (isNonEmpty(body.parentName)) {
    fields['Responsable 1 - Nom'] = body.parentName.trim()
  }
  return fields
}
