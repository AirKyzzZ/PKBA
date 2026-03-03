import { NextResponse } from 'next/server'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = 'Covoiturage'

export async function GET() {
  try {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { message: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    const filterFormula = encodeURIComponent("AND({Statut} = 'Actif')")
    const sortField = encodeURIComponent('Date')

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula=${filterFormula}&sort%5B0%5D%5Bfield%5D=${sortField}&sort%5B0%5D%5Bdirection%5D=desc`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      console.error('Erreur Airtable:', await response.text())
      return NextResponse.json(
        { message: 'Erreur lors de la récupération des annonces' },
        { status: 500 }
      )
    }

    const data = await response.json()

    const annonces = data.records.map((record: { id: string; fields: Record<string, unknown> }) => ({
      id: record.id,
      prenom: record.fields['Prénom'] || '',
      type: record.fields['Type'] || '',
      ville: record.fields['Ville de départ'] || '',
      jours: record.fields['Jours disponibles'] || '',
      places: record.fields['Nombre de places'] || '',
      message: record.fields['Message'] || '',
      date: record.fields['Date'] || '',
    }))

    return NextResponse.json({ annonces })
  } catch (error) {
    console.error('Erreur covoiturage:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
