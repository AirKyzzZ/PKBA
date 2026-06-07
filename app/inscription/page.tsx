import { PreinscriptionPage } from '@/components/PreinscriptionPage'
import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Préinscription saison 2026/2027 | PKBA Parkour Bassin d\'Arcachon',
  description: 'Préinscrivez votre enfant pour la saison 2026/2027 au PKBA. Cours loisir dès 3 ans, prépa compétition et compétition sur sélection. Horaires et tarifs prévisionnels, préinscription rapide et sans engagement à Gujan-Mestras.',
  keywords: 'préinscription parkour, saison 2026 2027, inscription club parkour, parkour Gujan-Mestras, parkour Bassin d\'Arcachon, cours parkour enfant, tarifs parkour, horaires parkour',
  openGraph: {
    title: 'Préinscription saison 2026/2027 | PKBA',
    description: 'Réservez votre place pour la saison 2026/2027 au club de parkour du Bassin d\'Arcachon. Horaires et tarifs prévisionnels, préinscription rapide et sans engagement.',
    url: `${siteUrl}/inscription`,
    siteName: 'PKBA - Club de Parkour Bassin d\'Arcachon',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Préinscription saison 2026/2027 | PKBA',
    description: 'Réservez votre place pour la saison prochaine au club de parkour du Bassin d\'Arcachon. Préinscription rapide et sans engagement.',
  },
  alternates: {
    canonical: '/inscription',
  },
}

export default function Inscription() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Préinscription saison 2026/2027 - PKBA',
            description: 'Préinscription pour la saison 2026/2027 au club de parkour PKBA',
            url: `${siteUrl}/inscription`,
            mainEntity: {
              '@type': 'Form',
              name: 'Formulaire de préinscription PKBA',
              description: 'Formulaire de préinscription pour la saison 2026/2027',
              url: `${siteUrl}/inscription`,
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Accueil',
                  item: `${siteUrl}/`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Préinscription',
                  item: `${siteUrl}/inscription`,
                },
              ],
            },
          }),
        }}
      />
      <PreinscriptionPage />
    </>
  )
}
