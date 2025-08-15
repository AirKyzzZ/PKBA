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
    // Check if required environment variables are set
    if (!process.env.AIRTABLE_API_KEY) {
      console.error('AIRTABLE_API_KEY is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: 'Configuration serveur manquante'
        })
      };
    }

    if (!process.env.AIRTABLE_BASE_ID) {
      console.error('AIRTABLE_BASE_ID is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: 'Configuration serveur manquante'
        })
      };
    }

    if (!process.env.AIRTABLE_TABLE_NAME) {
      console.error('AIRTABLE_TABLE_NAME is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: 'Configuration serveur manquante'
        })
      };
    }

    const body = JSON.parse(event.body);
    console.log('Received form data:', JSON.stringify(body, null, 2));
    
    // Validate required fields based on actual form structure
    const requiredFields = [
      'firstName', 'lastName', 'birthDate', 'gender', 'address', 
      'postalCode', 'city', 'phone', 'email', 'emergencyContact'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        console.error(`Missing required field: ${field}`);
        return {
          statusCode: 400,
          body: JSON.stringify({ 
            success: false,
            error: `Champ requis manquant: ${field}` 
          })
        };
      }
    }
    
    // Validate emergency contact fields
    if (!body.emergencyContact.name || !body.emergencyContact.phone) {
      console.error('Emergency contact fields missing');
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false,
          error: 'Contact d\'urgence requis' 
        })
      };
    }

    console.log('Initializing Airtable with base:', process.env.AIRTABLE_BASE_ID);
    // Initialize Airtable
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
    
    const fieldsToCreate = {
      'Nom': body.lastName,
      'Prénom': body.firstName,
      'Date de naissance': body.birthDate,
      'Sexe': body.gender,
      'Type d\'adhésion': body.adhesionType ? body.adhesionType.join(', ') : '',
      'Club d\'origine': body.otherClub || '',
      'Adresse': body.address,
      'Code postal': body.postalCode,
      'Ville': body.city,
      'Téléphone': body.phone,
      'Email': body.email,
      'Responsable 1 - Civilité': body.legalGuardian1?.title || '',
      'Responsable 1 - Nom': body.legalGuardian1?.lastName || '',
      'Responsable 1 - Prénom': body.legalGuardian1?.firstName || '',
      'Responsable 1 - Téléphone': body.legalGuardian1?.phone || '',
      'Responsable 1 - Email': body.legalGuardian1?.email || '',
      'Responsable 2 - Civilité': body.legalGuardian2?.title || '',
      'Responsable 2 - Nom': body.legalGuardian2?.lastName || '',
      'Responsable 2 - Prénom': body.legalGuardian2?.firstName || '',
      'Responsable 2 - Téléphone': body.legalGuardian2?.phone || '',
      'Responsable 2 - Email': body.legalGuardian2?.email || '',
      'Contact d\'urgence - Nom': body.emergencyContact.name,
      'Contact d\'urgence - Téléphone': body.emergencyContact.phone,
      'Droit à l\'image': body.imageRights ? 'Accepté' : 'Refusé',
      'Règlement intérieur accepté': body.termsAccepted ? 'Oui' : 'Non',
      'Signature': body.signature || '',
      'Date d\'inscription': new Date().toISOString(),
      'Statut': 'En attente',
      'Certificat médical': 'En attente'
    };

    console.log('Creating Airtable record with fields:', JSON.stringify(fieldsToCreate, null, 2));
    
    // Create record with mapped fields
    const record = await base(process.env.AIRTABLE_TABLE_NAME).create([
      {
        fields: fieldsToCreate
      }
    ]);

    console.log('Record created successfully:', record[0].id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Pré-inscription enregistrée avec succès',
        id: record[0].id
      })
    };

  } catch (error) {
    console.error('Error submitting pre-inscription:', error);
    
    // Return more specific error messages
    let errorMessage = 'Erreur lors de l\'enregistrement de la pré-inscription';
    
    if (error.message) {
      if (error.message.includes('AUTHENTICATION_REQUIRED')) {
        errorMessage = 'Erreur d\'authentification Airtable';
      } else if (error.message.includes('NOT_FOUND')) {
        errorMessage = 'Base de données Airtable introuvable';
      } else if (error.message.includes('INVALID_PERMISSIONS')) {
        errorMessage = 'Permissions insuffisantes pour accéder à la base de données';
      } else if (error.message.includes('INVALID_FIELD_NAME')) {
        errorMessage = 'Champ Airtable invalide - vérifiez la configuration';
      }
    }
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};
