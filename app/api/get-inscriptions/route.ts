import { NextRequest, NextResponse } from 'next/server'

// Configuration Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Inscriptions'

// Helper pour formater un record Airtable
const formatRecord = (record: any) => ({
  id: record.id,
  fields: {
    'Prénom': record.fields['Prénom'] || '',
    'Nom': record.fields['Nom'] || '',
    'Date de naissance': record.fields['Date de naissance'] || '',
    'Sexe': record.fields['Sexe'] || '',
    'Type d\'adhésion': record.fields['Type d\'adhésion'] || [],
    'Club d\'origine': record.fields['Club d\'origine'] || '',
    'Adresse': record.fields['Adresse'] || '',
    'Code postal': record.fields['Code postal'] || '',
    'Ville': record.fields['Ville'] || '',
    'Téléphone': record.fields['Téléphone'] || '',
    'Email': record.fields['Email'] || '',
    'Responsable 1 - Civilité': record.fields['Responsable 1 - Civilité'] || '',
    'Responsable 1 - Nom': record.fields['Responsable 1 - Nom'] || '',
    'Responsable 1 - Prénom': record.fields['Responsable 1 - Prénom'] || '',
    'Responsable 1 - Téléphone': record.fields['Responsable 1 - Téléphone'] || '',
    'Responsable 1 - Email': record.fields['Responsable 1 - Email'] || '',
    'Responsable 2 - Civilité': record.fields['Responsable 2 - Civilité'] || '',
    'Responsable 2 - Nom': record.fields['Responsable 2 - Nom'] || '',
    'Responsable 2 - Prénom': record.fields['Responsable 2 - Prénom'] || '',
    'Responsable 2 - Téléphone': record.fields['Responsable 2 - Téléphone'] || '',
    'Responsable 2 - Email': record.fields['Responsable 2 - Email'] || '',
    'Contact d\'urgence - Nom': record.fields['Contact d\'urgence - Nom'] || '',
    'Contact d\'urgence - Téléphone': record.fields['Contact d\'urgence - Téléphone'] || '',
    'Droit à l\'image': record.fields['Droit à l\'image'] || false,
    'Règlement intérieur accepté': record.fields['Règlement intérieur accepté'] || false,
    'Signature': record.fields['Signature'] || '',
    'Date d\'inscription': record.fields['Date d\'inscription'] || '',
    'Statut': record.fields['Statut'] || 'En attente',
    'Certificat médical': record.fields['Certificat médical'] || 'Non vérifié',
    'Type d\'inscription': record.fields['Type d\'inscription'] || '',
    'Nombre de séances': record.fields['Nombre de séances'] || null,
    'Jours sélectionnés': record.fields['Jours sélectionnés'] || null
  }
})

export async function GET(request: NextRequest) {
  try {
    // Vérification de la configuration
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Configuration Airtable manquante')
      return NextResponse.json(
        { message: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    // Récupération de TOUTES les inscriptions avec pagination
    const allRecords: any[] = []
    let offset: string | undefined = undefined

    do {
      // Construire l'URL avec les paramètres
      const airtableUrl = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`)
      airtableUrl.searchParams.set('view', 'Grid view')
      airtableUrl.searchParams.set('sort[0][field]', 'Date d\'inscription')
      airtableUrl.searchParams.set('sort[0][direction]', 'desc')
      
      // Ajouter l'offset si on pagine
      if (offset) {
        airtableUrl.searchParams.set('offset', offset)
      }

      const airtableResponse = await fetch(
        airtableUrl.toString(),
        {
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!airtableResponse.ok) {
        const errorData = await airtableResponse.json()
        console.error('Erreur Airtable:', errorData)
        return NextResponse.json(
          { message: 'Erreur lors de la récupération des inscriptions' },
          { status: 500 }
        )
      }

      const data = await airtableResponse.json()
      
      // Ajouter les records à la liste
      allRecords.push(...data.records)
      
      // Récupérer l'offset pour la page suivante (undefined si c'est la dernière page)
      offset = data.offset

    } while (offset) // Continuer tant qu'il y a des pages

    // Formatage des données
    const inscriptions = allRecords.map(formatRecord)

    const response = NextResponse.json(
      { 
        inscriptions,
        total: inscriptions.length
      },
      { status: 200 }
    )
    
    // Add cache control headers to prevent caching
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response

  } catch (error) {
    console.error('Erreur lors de la récupération des inscriptions:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
