const Airtable = require('airtable');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    
    // Validate required fields based on actual form structure
    const requiredFields = [
      'firstName', 'lastName', 'birthDate', 'gender', 'address', 
      'postalCode', 'city', 'phone', 'email', 'emergencyContact'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: `Field ${field} is required` })
        };
      }
    }
    
    // Validate emergency contact fields
    if (!body.emergencyContact.name || !body.emergencyContact.phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Emergency contact name and phone are required' })
      };
    }

    // Initialize Airtable
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
    
    // Create record with mapped fields
    const record = await base(process.env.AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          'Nom': body.lastName,
          'Prénom': body.firstName,
          'Email': body.email,
          'Téléphone': body.phone,
          'Date de naissance': body.birthDate,
          'Sexe': body.gender,
          'Adresse': body.address,
          'Code postal': body.postalCode,
          'Ville': body.city,
          'Type d\'adhésion': body.adhesionType ? body.adhesionType.join(', ') : '',
          'Club d\'origine': body.otherClub || '',
          'Contact d\'urgence - Nom': body.emergencyContact.name,
          'Contact d\'urgence - Téléphone': body.emergencyContact.phone,
          'Responsable légal 1 - Civilité': body.legalGuardian1?.title || '',
          'Responsable légal 1 - Nom': body.legalGuardian1?.lastName || '',
          'Responsable légal 1 - Prénom': body.legalGuardian1?.firstName || '',
          'Responsable légal 1 - Téléphone': body.legalGuardian1?.phone || '',
          'Responsable légal 1 - Email': body.legalGuardian1?.email || '',
          'Responsable légal 2 - Civilité': body.legalGuardian2?.title || '',
          'Responsable légal 2 - Nom': body.legalGuardian2?.lastName || '',
          'Responsable légal 2 - Prénom': body.legalGuardian2?.firstName || '',
          'Responsable légal 2 - Téléphone': body.legalGuardian2?.phone || '',
          'Responsable légal 2 - Email': body.legalGuardian2?.email || '',
          'Droit à l\'image': body.imageRights ? 'Accepté' : 'Refusé',
          'Règlement intérieur accepté': body.termsAccepted ? 'Oui' : 'Non',
          'Signature': body.signature || '',
          'Date signature': body.signatureDate || '',
          'Statut': 'en_attente',
          'Date inscription': new Date().toISOString()
        }
      }
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Inscription enregistrée avec succès',
        id: record[0].id
      })
    };

  } catch (error) {
    console.error('Error submitting inscription:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Erreur lors de l\'enregistrement de l\'inscription'
      })
    };
  }
};
