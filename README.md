# PKBA — Parkour Bassin d'Arcachon

![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-API_2023--10--16-635BFF?logo=stripe&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18-green?logo=node.js&logoColor=white)
![Netlify](https://img.shields.io/badge/Deploys%20to-Netlify-00C7B7?logo=netlify&logoColor=white)

Plateforme web officielle du club PKBA, conçue avec un focus sur performance, accessibilité et conversion. Elle présente le club, gère les inscriptions, collecte des dons, et vend des produits officiels avec paiement sécurisé.

- **Production**: [`https://pkba.vertiflow.fr`](https://pkba.vertiflow.fr)

## Présentation

PKBA (Parkour Bassin d’Arcachon) est un club associatif dédié à la pratique du parkour sur le Bassin d’Arcachon. Le site a pour objectifs de:

- Présenter le club, ses valeurs et ses actualités
- Faciliter les inscriptions à la saison 2025/2026 (lancement Septembre 2025)
- Permettre les dons en ligne de manière simple et sécurisée
- Proposer une boutique de produits officiels (T‑shirts) avec paiement Stripe
- Centraliser les informations pratiques et la prise de contact

L’accent est mis sur l’encadrement professionnel, la progression et la sécurité à chaque étape du parcours des adhérents.

## Sommaire

- **[Présentation](#présentation)**
- **[Fonctionnalités](#fonctionnalités)**
- **[Pile technique](#pile-technique)**
- **[Démarrage rapide](#démarrage-rapide)**
- **[Variables d'environnement](#variables-denvironnement)**
- **[Scripts NPM](#scripts-npm)**
- **[API Routes](#api-routes)**
- **[Structure du projet](#structure-du-projet)**
- **[Paiements et Dons](#paiements-et-dons)**
- **[SEO, PWA et Accessibilité](#seo-pwa-et-accessibilité)**
- **[Déploiement (Netlify)](#déploiement-netlify)**
- **[Support](#support)**
- **[Licence](#licence)**

## Fonctionnalités

- **Pages clés**
  - Accueil, Actualités, Inscription, Contact, Mentions légales, CGV, Politique de confidentialité
  - Boutique: vente de T‑shirts (personnalisation, tailles, couleurs), panier et checkout
  - Dons: formulaire avec signature et reçu par email

- **Technique**
  - Design responsive (Tailwind), animations (Framer Motion)
  - Paiements sécurisés avec Stripe (PaymentIntent, EUR uniquement)
  - Emails transactionnels via EmailJS et notifications d'order via Formspree
  - SEO, Open Graph/Twitter Cards, sitemap et robots configurés
  - En-têtes de sécurité et caching configurés pour l’hébergement

## Pile technique

- **Framework**: Next.js 14 (App Router)
- **Langage**: TypeScript
- **UI**: Tailwind CSS, Framer Motion, Lucide Icons
- **Paiements**: Stripe (`stripe` SDK Node et `@stripe/react-stripe-js`)
- **Emails**: EmailJS (@emailjs/browser)
- **Formulaires**: Formspree
- **Hébergement**: Netlify (voir `netlify.toml`)

## Démarrage rapide

### Prérequis

- Node.js 18+
- npm (ou yarn/pnpm)

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Site accessible sur [`http://localhost:3000`](http://localhost:3000)

## Variables d'environnement

Créez un fichier `.env.local` à la racine avec les clés suivantes:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...

# Formspree
NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID=...
NEXT_PUBLIC_FORMSPREE_REGISTRATION_FORM_ID=...
NEXT_PUBLIC_FORMSPREE_ORDER_FORM_ID=...

# SEO / Vérifications (optionnel)
NEXT_PUBLIC_SITE_NAME=PKBA
NEXT_PUBLIC_SITE_URL=https://pkba.vertiflow.fr
```

Sur Netlify, définissez les mêmes variables dans l’onglet Environment. Le fichier `netlify.toml` expose également des en-têtes de sécurité et la version Node.

## Scripts NPM

```bash
npm run dev        # Démarrage en développement
npm run build      # Build de production
npm run start      # Démarrage du serveur Next en mode prod
npm run lint       # Linting via ESLint
npm run test:backend # Outil de test des endpoints backend (si clés valides)
```

## API Routes

- `POST /api/create-payment-intent`
  - Entrée: `{ amount: number (cents), currency: 'eur', items: { name, color, size, customization?, quantity, price }[] }`
  - Sortie: `{ clientSecret: string }`
  - Particularités: vérifie un montant valide, impose la devise `eur`, et renseigne des métadonnées d’items.

- `POST /api/create-donation-intent`
  - Entrée: `{ amount: number (cents), currency: 'eur' }`
  - Sortie: `{ clientSecret: string }`
  - Particularités: impose `eur`, ajoute des métadonnées de type `donation`.

## Structure du projet

```text
PKBA/
├─ app/
│  ├─ api/
│  │  ├─ create-payment-intent/
│  │  │  └─ route.ts
│  │  └─ create-donation-intent/
│  │     └─ route.ts
│  ├─ boutique/
│  ├─ donations/
│  ├─ inscription/
│  ├─ actualites/
│  ├─ contact/
│  ├─ cgv/
│  ├─ mentions-legales/
│  ├─ politique-confidentialite/
│  ├─ checkout/
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ CartContext.tsx
│  ├─ CheckoutForm.tsx
│  ├─ DonationForm.tsx
│  ├─ ...
├─ public/
├─ netlify.toml
├─ tailwind.config.js
├─ next.config.js
├─ package.json
└─ README.md
```

## Paiements et Dons

- **Checkout boutique** (`components/CheckoutForm.tsx`)
  - Crée un PaymentIntent via `/api/create-payment-intent`, puis confirme le paiement côté client via Stripe Elements.
  - Envoie une notification de commande à Formspree après succès.

- **Formulaire de don** (`components/DonationForm.tsx`)
  - Signature manuscrite sur canvas (obligatoire), création de PaymentIntent via `/api/create-donation-intent` puis confirmation Stripe.
  - Envoi d’un reçu/confirmation via EmailJS.

### Bonnes pratiques Stripe

- Montants envoyés en centimes, validés et arrondis côté serveur
- Devise normalisée et imposée à `EUR`
- Clé secrète Stripe utilisée côté serveur uniquement (`STRIPE_SECRET_KEY`)

## SEO, PWA et Accessibilité

- Métadonnées globales dans `app/layout.tsx` (Open Graph/Twitter, robots, canonical)
- Manifest disponible: `public/manifest.json`
- Sitemap et robots gérés par `app/sitemap.ts` et `app/robots.ts`
- En‑têtes de sécurité et stratégies de cache définies dans `netlify.toml`
- Accessibilité: navigation clavier, contrastes, textes alternatifs et structure sémantique

## Déploiement (Netlify)

1. Connectez le repository à Netlify
2. Définissez les variables d’environnement (voir plus haut)
3. Build command: `npm run build`
4. Publish directory: `.next`

Le fichier `netlify.toml` fixe Node 18 et ajoute des en‑têtes de sécurité (X-Frame-Options, X-XSS-Protection, etc.) et un cache agressif pour les assets.

## Support

- Email: `parkourBA33@gmail.com`
- Téléphone: `06 60 14 71 44`

## Licence

Projet propriétaire réalisé pour PKBA — Parkour Bassin d’Arcachon. Tous droits réservés.

— Développé avec ❤️ pour la communauté PKBA
