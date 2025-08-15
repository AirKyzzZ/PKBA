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
    
    // Validate required fields
    const requiredFields = ['nom', 'prenom', 'email', 'telephone', 'dateNaissance', 'adresse', 'codePostal', 'ville', 'licence', 'niveau'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: `Field ${field} is required` })
        };
      }
    }

    // Initialize Airtable
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
    
    // Create record
    const record = await base(process.env.AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          'Nom': body.nom,
          'Prénom': body.prenom,
          'Email': body.email,
          'Téléphone': body.telephone,
          'Date de naissance': body.dateNaissance,
          'Adresse': body.adresse,
          'Code postal': body.codePostal,
          'Ville': body.ville,
          'Licence': body.licence,
          'Niveau': body.niveau,
          'Commentaires': body.commentaires || '',
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
