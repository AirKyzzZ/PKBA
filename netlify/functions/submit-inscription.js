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
    console.log('Using table:', process.env.AIRTABLE_TABLE_NAME);
    console.log('API Key length:', process.env.AIRTABLE_API_KEY ? process.env.AIRTABLE_API_KEY.length : 'NOT SET');
    
    // Initialize Airtable
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
    
    console.log('Airtable base initialized successfully');
    
    // Map form data to exact Airtable field names from your table
    const fieldsToCreate = {
      'Prénom': body.firstName,
      'Nom': body.lastName,
      'Date de naissance': body.birthDate,
      'Sexe': body.gender,
      'Type d\'adhésion': body.adhesionType && body.adhesionType.length > 0 ? body.adhesionType : [],
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
      'Statut': 'En attente'
    };

    // Add club d'origine if specified
    if (body.otherClub) {
      fieldsToCreate['Club d\'origine'] = body.otherClub;
    }

    console.log('Creating Airtable record with fields:', JSON.stringify(fieldsToCreate, null, 2));
    console.log('Attempting to create record in table:', process.env.AIRTABLE_TABLE_NAME);
    
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
    console.error('=== ERROR SUBMITTING PRE-INSCRIPTION ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error object:', JSON.stringify(error, null, 2));
    
    // Return more specific error messages
    let errorMessage = 'Erreur lors de l\'enregistrement de la pré-inscription';
    let errorDetails = '';
    
    if (error.message) {
      const errorMsg = error.message.toLowerCase();
      if (errorMsg.includes('authentication_required') || errorMsg.includes('unauthorized')) {
        errorMessage = 'Erreur d\'authentification Airtable - Vérifiez votre clé API';
        errorDetails = 'Vérifiez que AIRTABLE_API_KEY est correct dans Netlify';
      } else if (errorMsg.includes('not_found') || errorMsg.includes('base not found')) {
        errorMessage = 'Base de données Airtable introuvable - Vérifiez votre Base ID';
        errorDetails = 'Vérifiez que AIRTABLE_BASE_ID est correct dans Netlify';
      } else if (errorMsg.includes('invalid_permissions') || errorMsg.includes('forbidden')) {
        errorMessage = 'Permissions insuffisantes pour accéder à la base de données';
        errorDetails = 'Vérifiez que votre clé API a accès à cette base';
      } else if (errorMsg.includes('invalid_field_name') || errorMsg.includes('field not found')) {
        errorMessage = 'Champ Airtable invalide - Vérifiez la configuration des champs';
        errorDetails = 'Vérifiez que tous les noms de champs correspondent à votre table Airtable';
      } else if (errorMsg.includes('rate limit') || errorMsg.includes('too many requests')) {
        errorMessage = 'Limite de taux Airtable dépassée - Réessayez plus tard';
        errorDetails = 'Airtable limite les requêtes, attendez quelques minutes';
      } else if (errorMsg.includes('network') || errorMsg.includes('timeout')) {
        errorMessage = 'Erreur de connexion réseau - Vérifiez votre connexion';
        errorDetails = 'Problème de connectivité avec Airtable';
      } else {
        errorMessage = `Erreur Airtable: ${error.message}`;
        errorDetails = 'Erreur technique lors de la communication avec Airtable';
      }
    } else if (error.code) {
      errorMessage = `Erreur Airtable (Code: ${error.code})`;
      errorDetails = error.code;
    }
    
    console.error('Final error message:', errorMessage);
    console.error('Error details:', errorDetails);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: errorMessage,
        details: errorDetails,
        debug: process.env.NODE_ENV === 'development' ? {
          errorType: typeof error,
          errorMessage: error.message,
          errorCode: error.code,
          timestamp: new Date().toISOString()
        } : undefined
      })
    };
  }
};
