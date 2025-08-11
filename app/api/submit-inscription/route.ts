import { NextRequest, NextResponse } from 'next/server'

// Configuration Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Inscriptions'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    

    // Validation des données requises
    if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.gender) {
      return NextResponse.json(
        { message: 'Informations personnelles manquantes' },
        { status: 400 }
      )
    }

    // Validation que les champs ne sont pas des chaînes vides
    if (formData.firstName.trim() === '' || formData.lastName.trim() === '' || formData.birthDate.trim() === '') {
      return NextResponse.json(
        { message: 'Informations personnelles incomplètes' },
        { status: 400 }
      )
    }

    if (!formData.address || !formData.postalCode || !formData.city || !formData.phone || !formData.email) {
      return NextResponse.json(
        { message: 'Adresse et coordonnées manquantes' },
        { status: 400 }
      )
    }

    // Validation que les champs d'adresse ne sont pas des chaînes vides
    if (formData.address.trim() === '' || formData.postalCode.trim() === '' || formData.city.trim() === '' || formData.phone.trim() === '' || formData.email.trim() === '') {
      return NextResponse.json(
        { message: 'Adresse et coordonnées incomplètes' },
        { status: 400 }
      )
    }

    if (!formData.emergencyContact.name || !formData.emergencyContact.phone) {
      return NextResponse.json(
        { message: 'Contact d\'urgence manquant' },
        { status: 400 }
      )
    }

    // Validation que les champs de contact d'urgence ne sont pas des chaînes vides
    if (formData.emergencyContact.name.trim() === '' || formData.emergencyContact.phone.trim() === '') {
      return NextResponse.json(
        { message: 'Contact d\'urgence incomplet' },
        { status: 400 }
      )
    }

    if (!formData.signature || !formData.signatureDate) {
      return NextResponse.json(
        { message: 'Signature et date requises' },
        { status: 400 }
      )
    }

    // Validation que les champs de signature ne sont pas des chaînes vides
    if (formData.signature.trim() === '' || formData.signatureDate.trim() === '') {
      return NextResponse.json(
        { message: 'Signature et date incomplètes' },
        { status: 400 }
      )
    }

    if (!formData.imageRights || !formData.termsAccepted) {
      return NextResponse.json(
        { message: 'Consentements requis' },
        { status: 400 }
      )
    }

    // Validation que les consentements sont des booléens
    if (typeof formData.imageRights !== 'boolean' || typeof formData.termsAccepted !== 'boolean') {
      return NextResponse.json(
        { message: 'Consentements invalides' },
        { status: 400 }
      )
    }

    // Validation des champs de sélection
    if (!formData.gender || formData.gender.trim() === '') {
      return NextResponse.json(
        { message: 'Sexe requis' },
        { status: 400 }
      )
    }

    // Validation des valeurs de sexe
    const validGenders = ['Masculin', 'Féminin', 'Autre']
    if (!validGenders.includes(formData.gender)) {
      return NextResponse.json(
        { message: 'Valeur de sexe invalide' },
        { status: 400 }
      )
    }

    if (!formData.adhesionType || formData.adhesionType.length === 0) {
      return NextResponse.json(
        { message: 'Type d\'adhésion requis' },
        { status: 400 }
      )
    }

    // Vérification supplémentaire pour éviter les valeurs vides
    const validAdhesionTypes = formData.adhesionType.filter((type: string) => 
      type && type.trim() !== '' && type !== 'undefined' && type !== 'null'
    )
    
    if (validAdhesionTypes.length === 0) {
      return NextResponse.json(
        { message: 'Type d\'adhésion invalide' },
        { status: 400 }
      )
    }

    // Vérification de l'âge
    const birthDate = new Date(formData.birthDate)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const isMinor = age < 18 || (age === 18 && monthDiff < 0)

    if (isMinor) {
      if (!formData.legalGuardian1.lastName || !formData.legalGuardian1.firstName || !formData.legalGuardian1.phone) {
        return NextResponse.json(
          { message: 'Informations du responsable légal 1 manquantes' },
          { status: 400 }
        )
      }
      
      // Validation que les champs du responsable légal ne sont pas des chaînes vides
      if (formData.legalGuardian1.lastName.trim() === '' || formData.legalGuardian1.firstName.trim() === '' || formData.legalGuardian1.phone.trim() === '') {
        return NextResponse.json(
          { message: 'Informations du responsable légal 1 incomplètes' },
          { status: 400 }
        )
      }
    }

    // Préparation des données pour Airtable
    const airtableData = {
      fields: {
        'Nom': formData.lastName,
        'Prénom': formData.firstName,
        'Date de naissance': formData.birthDate,
        'Sexe': formData.gender,
        'Type d\'adhésion': validAdhesionTypes,
        'Club d\'origine': formData.otherClub && formData.otherClub.trim() !== '' ? formData.otherClub : undefined,
        'Adresse': formData.address,
        'Code postal': formData.postalCode,
        'Ville': formData.city,
        'Téléphone': formData.phone,
        'Email': formData.email,
        'Responsable 1 - Civilité': formData.legalGuardian1.title && formData.legalGuardian1.title.trim() !== '' ? formData.legalGuardian1.title : undefined,
        'Responsable 1 - Nom': formData.legalGuardian1.lastName && formData.legalGuardian1.lastName.trim() !== '' ? formData.legalGuardian1.lastName : undefined,
        'Responsable 1 - Prénom': formData.legalGuardian1.firstName && formData.legalGuardian1.firstName.trim() !== '' ? formData.legalGuardian1.firstName : undefined,
        'Responsable 1 - Téléphone': formData.legalGuardian1.phone && formData.legalGuardian1.phone.trim() !== '' ? formData.legalGuardian1.phone : undefined,
        'Responsable 1 - Email': formData.legalGuardian1.email && formData.legalGuardian1.email.trim() !== '' ? formData.legalGuardian1.email : undefined,
        'Responsable 2 - Civilité': formData.legalGuardian2.title && formData.legalGuardian2.title.trim() !== '' ? formData.legalGuardian2.title : undefined,
        'Responsable 2 - Nom': formData.legalGuardian2.lastName && formData.legalGuardian2.lastName.trim() !== '' ? formData.legalGuardian2.lastName : undefined,
        'Responsable 2 - Prénom': formData.legalGuardian2.firstName && formData.legalGuardian2.firstName.trim() !== '' ? formData.legalGuardian2.firstName : undefined,
        'Responsable 2 - Téléphone': formData.legalGuardian2.phone && formData.legalGuardian2.phone.trim() !== '' ? formData.legalGuardian2.phone : undefined,
        'Responsable 2 - Email': formData.legalGuardian2.email && formData.legalGuardian2.email.trim() !== '' ? formData.legalGuardian2.email : undefined,
        'Contact d\'urgence - Nom': formData.emergencyContact.name,
        'Contact d\'urgence - Téléphone': formData.emergencyContact.phone,
                       'Droit à l\'image': formData.imageRights,
               'Règlement intérieur accepté': formData.termsAccepted,
        'Signature': formData.signature,
        'Date d\'inscription': formData.signatureDate,
        // Note: These values must exist in your Airtable base as Single Select options
        'Statut': 'En attente', // Options: 'En attente', 'Validée', 'Refusée'
        'Certificat médical': 'Non vérifié' // Options: 'Non vérifié', 'Vérifié', 'Manquant'
      }
    }

    // Filtrer les champs undefined avant l'envoi
    const cleanFields = Object.fromEntries(
      Object.entries(airtableData.fields).filter(([_, value]) => value !== undefined)
    )
    
    const finalAirtableData = {
      fields: cleanFields
    }

    // Envoi vers Airtable
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Configuration Airtable manquante')
      return NextResponse.json(
        { message: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalAirtableData)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erreur Airtable:', errorData)
      return NextResponse.json(
        { message: 'Erreur lors de l\'enregistrement en base de données' },
        { status: 500 }
      )
    }

    const result = await response.json()
    console.log('Inscription enregistrée avec succès:', result.id)

    return NextResponse.json(
      { 
        message: 'Inscription enregistrée avec succès',
        recordId: result.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur lors du traitement de l\'inscription:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
