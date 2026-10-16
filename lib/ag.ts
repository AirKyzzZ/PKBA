import { isNonEmpty, isValidEmail } from '@/lib/validation'

export const AG_TYPE = 'AG 6 novembre 2026'
export const AG_DATE = '2026-11-06'
export const AG_DATE_LABEL = 'vendredi 6 novembre 2026 à 19h'
export const AG_REPLY_BY_LABEL = 'lundi 2 novembre'
export const MESSAGE_MAX_LEN = 1000

const TEXT_MAX_LEN = 200

export const AG_RESPONSES = ['present', 'pouvoir', 'absent'] as const
export type AgResponse = (typeof AG_RESPONSES)[number]

export type AgPayload = {
  firstName?: string
  lastName?: string
  email?: string
  members?: string
  response?: string
  proxyName?: string
  message?: string
}

const isAgResponse = (value: unknown): value is AgResponse =>
  typeof value === 'string' && (AG_RESPONSES as readonly string[]).includes(value)

export function validateAg(
  body: AgPayload,
  today: string = new Date().toISOString().slice(0, 10),
): string | null {
  if (today > AG_DATE) return "Les réponses sont closes, l'assemblée générale a eu lieu"
  for (const optional of [body.proxyName, body.message]) {
    if (optional !== undefined && optional !== null && typeof optional !== 'string') {
      return 'Requête invalide'
    }
  }
  if (!isNonEmpty(body.firstName) || !isNonEmpty(body.lastName)) return 'Nom et prénom requis'
  if (!isNonEmpty(body.email) || !isValidEmail(body.email)) return 'Email invalide'
  if (!isNonEmpty(body.members)) return 'Indiquez le ou les adhérents concernés'
  if (!isAgResponse(body.response)) return 'Choisissez une réponse'
  if (body.response === 'pouvoir' && !isNonEmpty(body.proxyName)) {
    return 'Indiquez qui votera pour vous'
  }
  const tooLong = [body.firstName, body.lastName, body.members, body.proxyName].some(
    (v) => typeof v === 'string' && v.trim().length > TEXT_MAX_LEN,
  )
  if (tooLong) return 'Un des champs est trop long'
  if (typeof body.message === 'string' && body.message.trim().length > MESSAGE_MAX_LEN) {
    return `Message trop long (${MESSAGE_MAX_LEN} caractères maximum)`
  }
  return null
}

export function describeAgResponse(body: AgPayload): string {
  if (body.response === 'pouvoir') return `Pouvoir donné à ${body.proxyName!.trim()}`
  if (body.response === 'absent') return 'Absent, sans pouvoir'
  return 'Présent'
}

export function buildAgFields(
  body: AgPayload,
  today: string = new Date().toISOString().slice(0, 10),
): Record<string, unknown> {
  const message = isNonEmpty(body.message) ? body.message.trim() : ''
  const summary = [
    describeAgResponse(body),
    `Adhérents : ${body.members!.trim()}`,
    ...(message ? [`Message : ${message}`] : []),
  ].join(' · ')

  return {
    Nom: body.lastName!.trim(),
    Prénom: body.firstName!.trim(),
    Email: body.email!.trim(),
    "Type d'inscription": AG_TYPE,
    "Date d'inscription": today,
    'Jours sélectionnés': summary,
  }
}
