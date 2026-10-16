import { NextRequest, NextResponse } from 'next/server'
import { buildAgFields, describeAgResponse, validateAg, type AgPayload } from '@/lib/ag'
import { notifySignup } from '@/lib/notifications'
import { isJsonObject } from '@/lib/validation'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Inscriptions'

const fail = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status })

export async function POST(request: NextRequest) {
  try {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Configuration Airtable manquante')
      return fail('Configuration serveur manquante', 500)
    }

    const parsed: unknown = await request.json().catch(() => null)
    if (!isJsonObject(parsed)) return fail('Requête invalide')
    const body = parsed as AgPayload
    const validationError = validateAg(body)
    if (validationError) return fail(validationError)

    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: buildAgFields(body), typecast: true }),
      },
    )

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json().catch(() => ({}))
      console.error('Erreur Airtable:', airtableResponse.status, errorData)
      return fail("Erreur lors de l'enregistrement de votre réponse", 500)
    }

    const result = await airtableResponse.json()

    const notifications = await notifySignup({
      kind: 'ag',
      recordId: result.id,
      firstName: body.firstName!.trim(),
      lastName: body.lastName!.trim(),
      email: body.email!.trim(),
      phone: '',
      lines: [
        ['Réponse', describeAgResponse(body)],
        ['Adhérents', body.members!.trim()],
        ['Message', body.message?.trim() ?? ''],
      ],
    })

    return NextResponse.json(
      { success: true, message: 'Réponse enregistrée', id: result.id, notifications },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erreur lors du traitement de la réponse à l'AG:", error)
    return fail('Erreur interne du serveur', 500)
  }
}
