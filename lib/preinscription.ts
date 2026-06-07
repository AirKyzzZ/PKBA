import { PREINSCRIPTION_GROUP_VALUES } from '@/content/schedule'

export const PREINSCRIPTION_TYPE = 'Saison 2026/2027'

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MESSAGE_MAX_LEN = 1000
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

const isNonEmpty = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0

export const isValidIsoDate = (value: string): boolean => {
  if (!ISO_DATE_RE.test(value)) return false
  const d = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value
}

export function validatePreinscription(body: PreinscriptionPayload): string | null {
  if (!isNonEmpty(body.firstName) || !isNonEmpty(body.lastName)) return 'Nom et prénom requis'
  if (!isNonEmpty(body.birthDate) || !isValidIsoDate(body.birthDate)) {
    return 'Date de naissance invalide'
  }
  if (
    !isNonEmpty(body.groupeSouhaite) ||
    !PREINSCRIPTION_GROUP_VALUES.includes(body.groupeSouhaite.trim())
  ) {
    return 'Groupe souhaité invalide'
  }
  if (!isNonEmpty(body.phone)) return 'Téléphone requis'
  if (!isNonEmpty(body.email) || !EMAIL_RE.test(body.email.trim())) return 'Email invalide'
  if (body.consent !== true) return 'Consentement requis'
  return null
}

export function buildPreinscriptionFields(
  body: PreinscriptionPayload,
  today: string = new Date().toISOString().slice(0, 10),
): Record<string, unknown> {
  const groupe = body.groupeSouhaite!.trim()
  const message = isNonEmpty(body.message) ? body.message.trim().slice(0, MESSAGE_MAX_LEN) : ''
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
