# PKBA - Parkour Bassin d'Arcachon

Site web officiel du club de parkour PKBA - Parkour Bassin d'Arcachon. Une plateforme moderne et responsive pour présenter le club, gérer les inscriptions et vendre des produits officiels.

## 🚀 Fonctionnalités

### Pages Principales
- **Accueil** : Landing page avec présentation du club et call-to-action
- **Boutique** : E-commerce avec T-shirts personnalisables et paiement Stripe
- **Inscription** : Formulaire d'inscription pour la saison 2025/2026
- **Actualités** : Blog avec annonces et événements du club
- **Contact** : Formulaire de contact et informations

### Fonctionnalités Techniques
- ✅ Design responsive et moderne
- ✅ Animations fluides avec Framer Motion
- ✅ Intégration Stripe pour les paiements
- ✅ EmailJS pour les notifications
- ✅ Formspree pour les formulaires
- ✅ SEO optimisé
- ✅ Accessibilité
- ✅ Performance optimisée

## 🛠️ Technologies

- **Framework** : Next.js 14 avec App Router
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Paiements** : Stripe
- **Emails** : EmailJS
- **Formulaires** : Formspree
- **Déploiement** : Netlify

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation des dépendances
```bash
npm install
# ou
yarn install
```

### Configuration des variables d'environnement
Créez un fichier `.env.local` à la racine du projet :

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id

# Formspree
NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID=your_contact_form_id
NEXT_PUBLIC_FORMSPREE_REGISTRATION_FORM_ID=your_registration_form_id
```

### Démarrage en développement
```bash
npm run dev
# ou
yarn dev
```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## 🚀 Déploiement

### Netlify (Recommandé)

1. **Connectez votre repository GitHub à Netlify**
2. **Configurez les variables d'environnement** dans les paramètres Netlify
3. **Déployez automatiquement** à chaque push sur la branche main

### Configuration Netlify

Variables d'environnement à configurer dans Netlify :
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_USER_ID`
- `NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID`
- `NEXT_PUBLIC_FORMSPREE_REGISTRATION_FORM_ID`

### Build Command
```bash
npm run build
```

### Publish Directory
```
.next
```

## 📁 Structure du Projet

```
PKBA/
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   ├── boutique/          # Page boutique
│   ├── inscription/       # Page inscription
│   ├── actualites/        # Page actualités
│   ├── contact/           # Page contact
│   ├── mentions-legales/  # Mentions légales
│   ├── politique-confidentialite/ # Politique de confidentialité
│   ├── cgv/              # Conditions générales de vente
│   ├── globals.css       # Styles globaux
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Page d'accueil
├── components/            # Composants React
│   ├── Header.tsx        # Navigation
│   ├── Footer.tsx        # Pied de page
│   ├── Hero.tsx          # Section héro
│   ├── Mission.tsx       # Section mission
│   ├── Features.tsx      # Section fonctionnalités
│   ├── CTA.tsx           # Call-to-action
│   ├── BoutiquePage.tsx  # Page boutique
│   ├── ProductCard.tsx   # Carte produit
│   ├── CheckoutModal.tsx # Modal de paiement
│   ├── CheckoutForm.tsx  # Formulaire de paiement
│   ├── InscriptionPage.tsx # Page inscription
│   ├── ContactPage.tsx   # Page contact
│   └── ActualitesPage.tsx # Page actualités
├── public/               # Assets statiques
├── tailwind.config.js    # Configuration Tailwind
├── next.config.js        # Configuration Next.js
├── package.json          # Dépendances
└── README.md            # Documentation
```

## 🎨 Design System

### Couleurs
- **Primary** : #006AFF (Bleu principal)
- **Secondary** : #127bcb (Bleu secondaire)
- **Accent** : #F4F2E7 (Accent de fond)
- **Background** : #FFFFFF (Blanc)

### Typographie
- **Titres** : Cheddar Gothic Stencil
- **Corps** : Montserrat

### Animations
- Transitions fluides avec Framer Motion
- Hover effects sur les boutons et cartes
- Animations d'entrée pour les sections

## 🔧 Configuration

### Stripe
1. Créez un compte Stripe
2. Récupérez vos clés API (test et production)
3. Configurez les webhooks si nécessaire

### EmailJS
1. Créez un compte EmailJS
2. Configurez un service email
3. Créez un template pour les notifications de commande
4. Récupérez les IDs de service, template et utilisateur

### Formspree
1. Créez un compte Formspree
2. Créez deux formulaires (contact et inscription)
3. Récupérez les IDs des formulaires

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints :
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

## 🔍 SEO

- Métadonnées optimisées pour chaque page
- Structure HTML sémantique
- Open Graph tags
- Twitter Cards
- Sitemap automatique

## ♿ Accessibilité

- Navigation au clavier
- Contraste des couleurs respecté
- Alt text pour les images
- Structure HTML sémantique
- ARIA labels

## 🚀 Performance

- Images optimisées
- Lazy loading
- Code splitting automatique
- Compression des assets
- Cache optimisé

## 📞 Support

Pour toute question ou problème :
- Email : parkourBA33@gmail.com
- Téléphone : 06 60 14 71 44

## 📄 Licence

Ce projet est développé pour PKBA - Parkour Bassin d'Arcachon. Tous droits réservés.

---

**Développé avec ❤️ pour la communauté PKBA** 