import { NextRequest, NextResponse } from 'next/server'
import { STAGES, type StageId } from '@/content/stages'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Inscriptions'

const VALID_GENDERS = ['Masculin', 'Féminin', 'Autre'] as const
const VALID_GUARDIAN_TITLES = ['Mme', 'Mr'] as const
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const SIGNATURE_MAX_LEN = 200_000
const STATUS_PENDING = 'En attente'
const MEDICAL_DEFAULT = 'Non vérifié'

type LegalGuardian = {
  title?: string
  lastName?: string
  firstName?: string
  phone?: string
  email?: string
}

type EmergencyContact = {
  name?: string
  phone?: string
}

type InscriptionPayload = {
  selectedStage?: string
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

const fail = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status })

const isNonEmpty = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0

const parseIsoDate = (value: string): Date | null => {
  if (!ISO_DATE_RE.test(value)) return null
  const d = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return null
  const roundtrip = d.toISOString().slice(0, 10)
  return roundtrip === value ? d : null
}

const formatDaysSelected = (dates: string[]): string => {
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
  return [...dates]
    .sort()
    .map((iso) => {
      const d = new Date(`${iso}T12:00:00Z`)
      const dd = String(d.getUTCDate())
      const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
      return `${dayNames[d.getUTCDay()]} ${dd}/${mm}`
    })
    .join(', ')
}

const computeIsMinor = (birth: Date): boolean => {
  const today = new Date()
  const todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
  const eighteenthBirthday = new Date(
    Date.UTC(birth.getUTCFullYear() + 18, birth.getUTCMonth(), birth.getUTCDate()),
  )
  return todayUtc < eighteenthBirthday
}

const collectGuardianFields = (
  guardian: LegalGuardian,
  prefix: 'Responsable 1' | 'Responsable 2',
): Record<string, string> => {
  const out: Record<string, string> = {}
  if (isNonEmpty(guardian.title) && VALID_GUARDIAN_TITLES.includes(guardian.title.trim() as typeof VALID_GUARDIAN_TITLES[number])) {
    out[`${prefix} - Civilité`] = guardian.title.trim()
  }
  if (isNonEmpty(guardian.lastName)) out[`${prefix} - Nom`] = guardian.lastName.trim()
  if (isNonEmpty(guardian.firstName)) out[`${prefix} - Prénom`] = guardian.firstName.trim()
  if (isNonEmpty(guardian.phone)) out[`${prefix} - Téléphone`] = guardian.phone.trim()
  if (isNonEmpty(guardian.email)) out[`${prefix} - Email`] = guardian.email.trim()
  return out
}

export async function POST(request: NextRequest) {
  try {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Configuration Airtable manquante')
      return fail('Configuration serveur manquante', 500)
    }

    const body = (await request.json()) as InscriptionPayload

    if (!isNonEmpty(body.firstName) || !isNonEmpty(body.lastName)) {
      return fail('Informations personnelles incomplètes')
    }

    if (!isNonEmpty(body.birthDate)) return fail('Date de naissance requise')
    const birth = parseIsoDate(body.birthDate)
    if (!birth) return fail('Date de naissance invalide')

    if (!isNonEmpty(body.gender) || !VALID_GENDERS.includes(body.gender as typeof VALID_GENDERS[number])) {
      return fail('Sexe requis')
    }

    if (
      !isNonEmpty(body.address) ||
      !isNonEmpty(body.postalCode) ||
      !isNonEmpty(body.city) ||
      !isNonEmpty(body.phone) ||
      !isNonEmpty(body.email)
    ) {
      return fail('Adresse et coordonnées incomplètes')
    }

    const emergency = body.emergencyContact
    if (!emergency || !isNonEmpty(emergency.name) || !isNonEmpty(emergency.phone)) {
      return fail("Contact d'urgence incomplet")
    }

    if (typeof body.imageRights !== 'boolean') return fail("Consentement droit à l'image invalide")
    if (body.termsAccepted !== true) return fail('Acceptation du règlement intérieur requise')

    const adhesionTypes = (body.adhesionType ?? []).filter(
      (t): t is string => typeof t === 'string' && t.trim() !== '' && t !== 'undefined' && t !== 'null',
    )
    if (adhesionTypes.length === 0) {
      return fail("Type d'adhésion requis")
    }

    if (!isNonEmpty(body.selectedStage) || !Object.hasOwn(STAGES, body.selectedStage)) {
      return fail('Stage invalide ou manquant')
    }
    const stage = STAGES[body.selectedStage as StageId]
    const validStageDates = new Set(stage.days.map((d) => d.date))

    const selectedDates = Array.isArray(body.selectedDates)
      ? Array.from(new Set(body.selectedDates.filter((d): d is string => isNonEmpty(d) && validStageDates.has(d))))
      : []
    if (selectedDates.length === 0) {
      return fail('Au moins une journée doit être sélectionnée')
    }

    const guardian1 = body.legalGuardian1 ?? {}
    const guardian2 = body.legalGuardian2 ?? {}
    if (computeIsMinor(birth)) {
      if (!isNonEmpty(guardian1.firstName) || !isNonEmpty(guardian1.lastName) || !isNonEmpty(guardian1.phone)) {
        return fail('Informations du responsable légal 1 incomplètes')
      }
    }

    if (!isNonEmpty(body.signature) || body.signature.length > SIGNATURE_MAX_LEN) {
      return fail('Signature manquante ou invalide')
    }

    const signatureDate = isNonEmpty(body.signatureDate)
      ? body.signatureDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10)
    if (!ISO_DATE_RE.test(signatureDate)) {
      return fail("Date d'inscription invalide")
    }

    const fields: Record<string, unknown> = {
      Nom: body.lastName.trim(),
      Prénom: body.firstName.trim(),
      'Date de naissance': body.birthDate,
      Sexe: body.gender,
      "Type d'adhésion": adhesionTypes,
      Adresse: body.address.trim(),
      'Code postal': body.postalCode.trim(),
      Ville: body.city.trim(),
      Téléphone: body.phone.trim(),
      Email: body.email.trim(),
      "Contact d'urgence - Nom": emergency.name!.trim(),
      "Contact d'urgence - Téléphone": emergency.phone!.trim(),
      "Droit à l'image": body.imageRights,
      'Règlement intérieur accepté': true,
      Signature: body.signature,
      "Date d'inscription": signatureDate,
      Statut: STATUS_PENDING,
      'Certificat médical': MEDICAL_DEFAULT,
      "Type d'inscription": stage.airtableType,
      'Nombre de séances': selectedDates.length,
      'Jours sélectionnés': formatDaysSelected(selectedDates),
      ...collectGuardianFields(guardian1, 'Responsable 1'),
      ...collectGuardianFields(guardian2, 'Responsable 2'),
    }

    if (isNonEmpty(body.otherClub)) {
      fields["Club d'origine"] = body.otherClub.trim()
    }

    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields, typecast: true }),
      },
    )

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json().catch(() => ({}))
      console.error('Erreur Airtable:', airtableResponse.status, errorData)
      return fail("Erreur lors de l'enregistrement en base de données", 500)
    }

    const result = await airtableResponse.json()
    return NextResponse.json(
      {
        success: true,
        message: 'Inscription enregistrée avec succès',
        id: result.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erreur lors du traitement de l'inscription:", error)
    return fail('Erreur interne du serveur', 500)
  }
}
