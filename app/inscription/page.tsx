import InscriptionPage from '@/components/InscriptionPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Préinscription PKBA - Saison 2025/2026 | Club de Parkour Bassin d\'Arcachon',
  description: 'Préinscrivez-vous au club de parkour PKBA pour la saison 2025/2026. Formulaire de préinscription sécurisé avec informations de base et autorisation parentale. Encadrement professionnel garanti.',
  keywords: 'préinscription parkour, club PKBA, saison 2025/2026, cours parkour Arcachon, adhésion association, encadrement professionnel',
  openGraph: {
    title: 'Préinscription PKBA - Saison 2025/2026 | Club de Parkour Bassin d\'Arcachon',
    description: 'Préinscrivez-vous au club de parkour PKBA pour la saison 2025/2026. Formulaire de préinscription sécurisé avec informations de base et autorisation parentale. Encadrement professionnel garanti.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inscription`,
    siteName: 'PKBA - Club de Parkour Bassin d\'Arcachon',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Préinscription PKBA - Saison 2025/2026 | Club de Parkour Bassin d\'Arcachon',
    description: 'Préinscrivez-vous au club de parkour PKBA pour la saison 2025/2026. Formulaire de préinscription sécurisé avec informations de base et autorisation parentale. Encadrement professionnel garanti.',
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
            name: 'Préinscription Saison 2025/2026 - PKBA',
            description: 'Préinscription au club de parkour PKBA pour la saison 2025/2026',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inscription`,
                          mainEntity: {
                '@type': 'Form',
                name: 'Formulaire de Préinscription PKBA',
                description: 'Formulaire de préinscription pour rejoindre le club de parkour PKBA',
              url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inscription`,
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Accueil',
                  item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Préinscription',
                  item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inscription`,
                },
              ],
            },
          }),
        }}
      />
      <InscriptionPage />
    </>
  )
} 