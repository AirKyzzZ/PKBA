import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { INSCRIPTION_STATUSES, isOneOf, isRecordId } from '@/lib/admin-statuses'

// Configuration Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Inscriptions'

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const body: unknown = await request.json().catch(() => null)
    const { id, status } = (body ?? {}) as { id?: unknown; status?: unknown }

    if (!isRecordId(id) || !isOneOf(INSCRIPTION_STATUSES, status)) {
      return NextResponse.json(
        { message: 'Identifiant ou statut invalide' },
        { status: 400 }
      )
    }

    // Vérification de la configuration
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Configuration Airtable manquante')
      return NextResponse.json(
        { message: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    // Mise à jour du statut dans Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            'Statut': status
          },
          typecast: true
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erreur Airtable:', errorData)
      return NextResponse.json(
        { message: response.status === 404 ? 'Préinscription introuvable' : 'Erreur lors de la mise à jour du statut' },
        { status: response.status === 404 ? 404 : 502 }
      )
    }

    const result = await response.json()
    console.log('Statut mis à jour avec succès:', result.id)

    return NextResponse.json(
      { 
        message: 'Statut mis à jour avec succès',
        recordId: result.id,
        newStatus: status
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
