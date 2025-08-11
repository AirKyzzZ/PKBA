# Système d'Inscription PKBA

## 🎯 Vue d'ensemble

Ce système remplace l'ancien formulaire Formspree par une solution complète avec base de données Airtable, conforme aux nouvelles exigences du conseil de l'association.

## ✨ Fonctionnalités

### Formulaire d'Inscription Complet
- **Informations personnelles** : Nom, prénom, date de naissance, sexe
- **Type d'adhésion** : Ancien adhérent, nouvel adhérent, en provenance d'un autre club
- **Adresse complète** : Adresse, code postal, ville
- **Coordonnées** : Téléphone, email
- **Responsables légaux** : Pour les mineurs (2 responsables possibles)
- **Contact d'urgence** : Personne disponible sur les horaires d'entraînement
- **Consentements** : Droit à l'image, règlement intérieur
- **Signature numérique** : Canvas pour signature manuscrite
- **Date d'inscription** : Automatique

### Base de Données Airtable
- **Stockage en temps réel** : Toutes les données sont synchronisées
- **Accès multi-utilisateurs** : Plusieurs administrateurs peuvent y accéder
- **Interface intuitive** : Similaire à Google Sheets
- **Export facile** : CSV, Excel, etc.
- **Gratuit** : Jusqu'à 1200 enregistrements

### Interface d'Administration
- **Liste des inscriptions** : Vue complète de tous les adhérents
- **Filtres avancés** : Par statut, certificat médical, recherche
- **Mise à jour en temps réel** : Statuts et certificats médicaux
- **Export CSV** : Pour traitement externe
- **Détails complets** : Modal avec toutes les informations

## 🚀 Installation et Configuration

### 1. Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Configuration Airtable
AIRTABLE_API_KEY=votre_cle_api_ici
AIRTABLE_BASE_ID=votre_base_id_ici
AIRTABLE_TABLE_NAME=Inscriptions
```

### 2. Configuration Airtable

Suivez le guide complet dans `AIRTABLE_SETUP.md` pour :
- Créer votre compte Airtable
- Configurer la table "Inscriptions"
- Obtenir les clés d'API
- Partager l'accès avec votre équipe

### 3. Démarrage

```bash
npm run dev
```

## 📱 Utilisation

### Pour les Adhérents
1. Aller sur `/inscription`
2. Remplir le formulaire complet
3. Signer numériquement
4. Soumettre l'inscription

### Pour les Administrateurs
1. Aller sur `/admin/inscriptions`
2. Consulter la liste des inscriptions
3. Filtrer et rechercher
4. Mettre à jour les statuts
5. Exporter les données

## 🔧 Structure Technique

### Composants
- `InscriptionPage.tsx` : Formulaire principal
- `InscriptionsList.tsx` : Interface d'administration
- `ReglementInterieurPage.tsx` : Page du règlement

### API Routes
- `/api/submit-inscription` : Soumission d'inscription
- `/api/get-inscriptions` : Récupération des inscriptions
- `/api/update-inscription-status` : Mise à jour du statut
- `/api/update-inscription-medical` : Mise à jour du certificat médical

### Base de Données
- **Airtable** : Stockage principal
- **Structure** : 30+ champs organisés logiquement
- **Validation** : Côté client et serveur
- **Sécurité** : API key sécurisée

## 📊 Champs de la Base de Données

| Groupe | Champs |
|--------|--------|
| **Personnel** | Prénom, Nom, Date de naissance, Sexe |
| **Adhésion** | Type d'adhésion, Club d'origine |
| **Adresse** | Adresse, Code postal, Ville |
| **Contact** | Téléphone, Email |
| **Responsables** | 2 responsables légaux (si mineur) |
| **Urgence** | Contact d'urgence (nom + téléphone) |
| **Consentements** | Droit à l'image, Règlement intérieur |
| **Administratif** | Signature, Dates, Statut, Certificat médical |

## 🔒 Sécurité et Conformité

### RGPD
- Consentements explicites
- Droit à l'image claire
- Règlement intérieur accessible

### Sécurité Technique
- API key côté serveur uniquement
- Validation des données
- HTTPS obligatoire

## 📈 Avantages vs Ancien Système

| Aspect | Ancien (Formspree) | Nouveau (Airtable) |
|--------|-------------------|-------------------|
| **Stockage** | Emails non organisés | Base de données structurée |
| **Accès** | Seul le président | Équipe complète |
| **Temps réel** | Non | Oui |
| **Recherche** | Difficile | Facile et rapide |
| **Export** | Manuel | Automatique |
| **Gestion** | Complexe | Simple et intuitive |
| **Coût** | Gratuit | Gratuit (1200 enregistrements) |

## 🚨 Points d'Attention

### Limites Airtable Gratuit
- 1200 enregistrements maximum
- 1200 appels API par mois
- 5 bases maximum

### Maintenance
- Vérifier régulièrement les certificats médicaux
- Mettre à jour les statuts des inscriptions
- Exporter les données périodiquement

## 🆘 Support et Dépannage

### Problèmes Courants
1. **Configuration manquante** : Vérifier `.env.local`
2. **Erreur API** : Vérifier les clés Airtable
3. **Signature** : Utiliser un navigateur moderne

### Logs
- Console navigateur pour les erreurs client
- Logs serveur pour les erreurs API
- Airtable pour les erreurs de base de données

### Contact
- Consulter `AIRTABLE_SETUP.md` pour la configuration
- Vérifier les variables d'environnement
- Tester l'API Airtable directement

## 🔄 Mises à Jour Futures

### Fonctionnalités Prévues
- Notifications email automatiques
- Intégration avec d'autres outils
- Tableau de bord avec statistiques
- Gestion des paiements

### Maintenance
- Mise à jour des dépendances
- Optimisation des performances
- Amélioration de l'interface

---

**Note** : Ce système est conçu pour être robuste et évolutif. En cas de problème, consultez d'abord la documentation Airtable et vérifiez la configuration.
