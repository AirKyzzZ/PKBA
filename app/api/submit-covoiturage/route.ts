import { NextRequest, NextResponse } from 'next/server'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = 'Covoiturage'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    if (!formData.prenom || !formData.email || !formData.phone || !formData.type || !formData.ville || !formData.jours) {
      return NextResponse.json(
        { message: 'Champs obligatoires manquants' },
        { status: 400 }
      )
    }

    if (
      formData.prenom.trim() === '' ||
      formData.email.trim() === '' ||
      formData.phone.trim() === '' ||
      formData.ville.trim() === ''
    ) {
      return NextResponse.json(
        { message: 'Champs obligatoires incomplets' },
        { status: 400 }
      )
    }

    const validTypes = ['Propose', 'Cherche']
    if (!validTypes.includes(formData.type)) {
      return NextResponse.json(
        { message: 'Type d\'annonce invalide' },
        { status: 400 }
      )
    }

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { message: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    const airtableData = {
      fields: {
        'Prénom': formData.prenom.trim(),
        'Email': formData.email.trim(),
        'Téléphone': formData.phone.trim(),
        'Type': formData.type,
        'Ville de départ': formData.ville.trim(),
        'Jours disponibles': formData.jours,
        'Nombre de places': formData.places ? String(formData.places) : '',
        'Message': formData.message ? formData.message.trim() : '',
        'Statut': 'Actif',
        'Date': new Date().toISOString().split('T')[0],
      },
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(airtableData),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erreur Airtable:', errorData)
      return NextResponse.json(
        { message: 'Erreur lors de l\'enregistrement de l\'annonce' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Annonce publiée avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur covoiturage:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
