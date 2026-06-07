import { NextRequest, NextResponse } from 'next/server'
import {
  buildPreinscriptionFields,
  validatePreinscription,
  type PreinscriptionPayload,
} from '@/lib/preinscription'

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

    const body = (await request.json()) as PreinscriptionPayload
    const validationError = validatePreinscription(body)
    if (validationError) return fail(validationError)

    const fields = buildPreinscriptionFields(body)

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
      return fail("Erreur lors de l'enregistrement de la préinscription", 500)
    }

    const result = await airtableResponse.json()
    return NextResponse.json(
      { success: true, message: 'Préinscription enregistrée avec succès', id: result.id },
      { status: 200 },
    )
  } catch (error) {
    console.error('Erreur lors du traitement de la préinscription:', error)
    return fail('Erreur interne du serveur', 500)
  }
}
