# Configuration Airtable pour le Formulaire d'Inscription

## 1. Créer un compte Airtable

1. Allez sur [airtable.com](https://airtable.com)
2. Créez un compte gratuit (limite : 1200 enregistrements par base)
3. Créez une nouvelle base de données

## 2. Créer la table "Inscriptions"

Créez une table avec les colonnes suivantes :

| Nom de la colonne | Type | Description |
|-------------------|------|-------------|
| Prénom | Single line text | Prénom de l'adhérent |
| Nom | Single line text | Nom de l'adhérent |
| Date de naissance | Date | Date de naissance |
| Sexe | Single select | M, F, A |
| Type d'adhésion | Long text | Types cochés séparés par des virgules |
| Club d'origine | Single line text | Si en provenance d'un autre club |
| Adresse | Long text | Adresse complète |
| Code postal | Single line text | Code postal |
| Ville | Single line text | Ville |
| Téléphone | Phone number | Téléphone principal |
| Email | Email | Email principal |
| Mineur | Checkbox | Si l'adhérent est mineur |
| Responsable 1 - Civilité | Single select | Mme, Mr |
| Responsable 1 - Nom | Single line text | Nom du responsable 1 |
| Responsable 1 - Prénom | Single line text | Prénom du responsable 1 |
| Responsable 1 - Téléphone | Phone number | Téléphone du responsable 1 |
| Responsable 1 - Email | Email | Email du responsable 1 |
| Responsable 2 - Civilité | Single select | Mme, Mr |
| Responsable 2 - Nom | Single line text | Nom du responsable 2 |
| Responsable 2 - Prénom | Single line text | Prénom du responsable 2 |
| Responsable 2 - Téléphone | Phone number | Téléphone du responsable 2 |
| Responsable 2 - Email | Email | Email du responsable 2 |
| Contact d'urgence - Nom | Single line text | Nom du contact d'urgence |
| Contact d'urgence - Téléphone | Phone number | Téléphone du contact d'urgence |
| Droit à l'image accepté | Checkbox | Consentement droit à l'image |
| Règlement intérieur accepté | Checkbox | Acceptation du règlement |
| Signature | Long text | Signature numérique (base64) |
| Date d'inscription | Date | Date de signature |
| Date de soumission | Date | Date de soumission du formulaire |
| Statut | Single select | Nouvelle inscription, Validée, etc. |
| Certificat médical | Single select | Non vérifié, Vérifié, Manquant |

## 3. Obtenir les informations de connexion

### API Key
1. Allez dans votre compte Airtable
2. Cliquez sur votre avatar → Account
3. Onglet "API" → "Generate API key"
4. Copiez la clé générée

### Base ID
1. Dans votre base de données
2. Cliquez sur "Help" → "API Documentation"
3. Copiez le "Base ID" (commence par "app...")

### Table Name
- Utilisez le nom exact de votre table (par défaut : "Inscriptions")

## 4. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine de votre projet :

```bash
# Configuration Airtable
AIRTABLE_API_KEY=votre_cle_api_ici
AIRTABLE_BASE_ID=votre_base_id_ici
AIRTABLE_TABLE_NAME=Inscriptions
```

## 5. Permissions et partage

### Partager la base
1. Cliquez sur "Share" en haut à droite
2. Ajoutez les membres de votre équipe par email
3. Donnez-leur les permissions "Editor" ou "Commenter"

### Accès en temps réel
- Tous les membres avec accès verront les modifications en temps réel
- Vous pouvez créer des vues personnalisées (par statut, par date, etc.)
- Exportez facilement en Excel/CSV

## 6. Fonctionnalités utiles

### Vues personnalisées
- **Nouvelles inscriptions** : Filtrer par statut "Nouvelle inscription"
- **Mineurs** : Filtrer par "Mineur" = true
- **Par ville** : Grouper par ville pour voir la répartition géographique

### Notifications
- Configurez des notifications email pour les nouvelles inscriptions
- Créez des rappels pour vérifier les certificats médicaux

### Intégrations
- Connectez Airtable à Google Sheets pour plus de flexibilité
- Utilisez Zapier pour automatiser des tâches (envoi d'emails, etc.)

## 7. Limites de la version gratuite

- **1200 enregistrements** par base (suffisant pour plusieurs saisons)
- **5 bases** maximum
- **1200 API calls** par mois (plus que suffisant pour un club)

## 8. Sécurité

- L'API key est stockée côté serveur uniquement
- Les données sont transmises en HTTPS
- Seuls les membres autorisés ont accès à la base

## 9. Support

- [Documentation Airtable API](https://airtable.com/api)
- [Forum communautaire](https://community.airtable.com/)
- [Support officiel](https://support.airtable.com/)
