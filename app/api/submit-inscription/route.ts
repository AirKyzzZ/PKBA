import { NextRequest, NextResponse } from 'next/server'
import { today } from '@/content/stages'
import { notifySignup } from '@/lib/notifications'
import { computeStageTotals } from '@/lib/stage-pricing'
import {
  formatDaysSelected,
  formatFormuleLabel,
  validateStageInscription,
  type LegalGuardian,
  type StageInscriptionPayload,
} from '@/lib/stage-inscription'
import { isJsonObject, isNonEmpty } from '@/lib/validation'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Inscriptions'

const VALID_GUARDIAN_TITLES = ['Mme', 'Mr'] as const
const STATUS_PENDING = 'En attente'
const MEDICAL_DEFAULT = 'Non vérifié'

const fail = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status })

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

    const parsed: unknown = await request.json().catch(() => null)
    if (!isJsonObject(parsed)) return fail('Requête invalide')
    const body = parsed as StageInscriptionPayload

    const check = validateStageInscription(body, today())
    if (!check.ok) return fail(check.message)
    const { stage, formuleId, selectedDates, adhesionTypes, signatureDate } = check
    const emergency = body.emergencyContact!
    const daysLabel = formatDaysSelected(selectedDates)
    const totals = computeStageTotals(stage, selectedDates)
    const total = formuleId === 1 ? totals.f1 : totals.f2

    const fields: Record<string, unknown> = {
      Nom: body.lastName!.trim(),
      Prénom: body.firstName!.trim(),
      'Date de naissance': body.birthDate,
      Sexe: body.gender,
      "Type d'adhésion": adhesionTypes,
      Adresse: body.address!.trim(),
      'Code postal': body.postalCode!.trim(),
      Ville: body.city!.trim(),
      Téléphone: body.phone!.trim(),
      Email: body.email!.trim(),
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
      'Jours sélectionnés': `${formatFormuleLabel(formuleId)} · ${daysLabel}`,
      ...collectGuardianFields(body.legalGuardian1 ?? {}, 'Responsable 1'),
      ...collectGuardianFields(body.legalGuardian2 ?? {}, 'Responsable 2'),
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

    const notifications = await notifySignup({
      kind: 'stage',
      recordId: result.id,
      firstName: body.firstName!.trim(),
      lastName: body.lastName!.trim(),
      email: body.email!.trim(),
      phone: body.phone!.trim(),
      lines: [
        ['Stage', stage.fullLabel],
        ['Formule', formatFormuleLabel(formuleId)],
        ['Jours', daysLabel],
        ['Nombre de séances', String(selectedDates.length)],
        ['Total', `${total}€`],
        ['Date de naissance', body.birthDate!],
      ],
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Inscription enregistrée avec succès',
        id: result.id,
        notifications,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erreur lors du traitement de l'inscription:", error)
    return fail('Erreur interne du serveur', 500)
  }
}
