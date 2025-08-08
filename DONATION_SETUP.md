# Configuration du Système de Don - PKBA

## Configuration EmailJS

### 1. Créer un compte EmailJS
- Allez sur [EmailJS.com](https://www.emailjs.com/)
- Créez un compte gratuit
- Ajoutez votre service email (Gmail, Outlook, etc.)

### 2. Créer un template EmailJS
Créez un template avec les variables suivantes :

```html
<!DOCTYPE html>
<html>
<head>
    <title>Reçu de Don - PKBA</title>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1>PKBA - Parkour Bassin d'Arcachon</h1>
            <h2>Reçu de Don</h2>
        </div>
        
        <div style="padding: 20px; background-color: #f9fafb;">
            <p>Bonjour {{to_name}},</p>
            
            <p>Nous vous remercions pour votre don de {{montant}}€ en faveur de PKBA.</p>
            
            <div style="background-color: white; padding: 20px; margin: 20px 0; border-left: 4px solid #1e40af;">
                <h3>Détails du don :</h3>
                <p><strong>Nom :</strong> {{nom}} {{prenom}}</p>
                <p><strong>Raison sociale :</strong> {{raison_sociale}}</p>
                <p><strong>Adresse :</strong> {{adresse}}</p>
                <p><strong>Code postal :</strong> {{code_postal}}</p>
                <p><strong>Ville :</strong> {{ville}}</p>
                <p><strong>Téléphone :</strong> {{telephone}}</p>
                <p><strong>Email :</strong> {{email}}</p>
                <p><strong>Montant :</strong> {{montant}}€</p>
                <p><strong>Date :</strong> {{date}}</p>
            </div>
            
            <p><strong>Avantages fiscaux :</strong></p>
            <p>Votre don est déductible de vos impôts selon les articles 200, 200 bis et 238 bis du code des Impôts.</p>
            
            <p>Ce reçu vous permettra de bénéficier d'une réduction d'impôt de 66% du montant de votre don, dans la limite de 20% de votre revenu imposable.</p>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                <p><strong>Informations légales :</strong></p>
                <p>PKBA - Parkour Bassin d'Arcachon<br>
                Association loi 1901<br>
                SIREN : 990115685<br>
                Bassin d'Arcachon, France</p>
            </div>
            
            <p>Merci de votre soutien pour le développement du parkour au Bassin d'Arcachon !</p>
            
            <p>Cordialement,<br>
            L'équipe PKBA</p>
        </div>
        
        <div style="background-color: #374151; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p>PKBA - Parkour Bassin d'Arcachon<br>
            Email : parkourBA33@gmail.com<br>
            Téléphone : 06 60 14 71 44</p>
        </div>
    </div>
</body>
</html>
```

### 3. Configuration dans le code
Remplacez les valeurs suivantes dans `components/DonationForm.tsx` :

```typescript
await emailjs.send(
  'YOUR_SERVICE_ID', // Remplacez par votre Service ID EmailJS
  'YOUR_TEMPLATE_ID', // Remplacez par votre Template ID
  templateParams,
  'YOUR_PUBLIC_KEY' // Remplacez par votre Public Key EmailJS
)
```

## Variables d'environnement

Ajoutez ces variables dans votre fichier `.env.local` :

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Fonctionnalités

### Formulaire de don
- ✅ Tous les champs requis (Nom, Prénom, Raison sociale, Adresse, CP, Ville, Tél, Email, Montant)
- ✅ Signature électronique avec canvas
- ✅ Date automatique
- ✅ Validation des champs
- ✅ Intégration Stripe pour le paiement

### Aspects légaux
- ✅ Mention des articles 200, 200 bis et 238 bis du code des Impôts
- ✅ Informations sur la déductibilité fiscale
- ✅ Mise à jour des mentions légales
- ✅ Mise à jour de la politique de confidentialité

### EmailJS
- ✅ Envoi automatique du reçu par email
- ✅ Template professionnel avec toutes les informations
- ✅ Signature incluse dans l'email

### Sécurité
- ✅ Paiement sécurisé via Stripe
- ✅ Validation côté client et serveur
- ✅ Protection des données personnelles

## Test

1. Remplissez le formulaire avec des données de test
2. Utilisez une carte de test Stripe (4242 4242 4242 4242)
3. Vérifiez que l'email est envoyé avec le reçu
4. Vérifiez que le paiement apparaît dans votre dashboard Stripe

## Support

Pour toute question technique, contactez : parkourBA33@gmail.com
