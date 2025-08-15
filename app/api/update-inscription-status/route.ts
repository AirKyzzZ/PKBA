import { NextRequest, NextResponse } from 'next/server'

// Configuration Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Inscriptions'

export async function POST(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    // Validation des données
    if (!id || !status) {
      return NextResponse.json(
        { message: 'ID de la préinscription et statut requis' },
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
          }
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erreur Airtable:', errorData)
      return NextResponse.json(
        { message: 'Erreur lors de la mise à jour du statut' },
        { status: 500 }
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
