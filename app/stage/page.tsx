import StagePage from '@/components/StagePage'
import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Stages de Parkour - Été 2026 (Juillet & Août) | PKBA Bassin d\'Arcachon',
  description: 'Inscrivez-vous aux stages de parkour des vacances d\'été 2026 ! Sessions de juillet (6 au 16) et août (17 au 28), 2 formules au choix : journée (10h-16h, 25€/jour) ou découverte (16h-17h30, 15€). À partir de 6 ans.',
  keywords: 'stage parkour, vacances été 2026, stage juillet 2026, stage août 2026, parkour Arcachon, parkour Gujan-Mestras, activité vacances enfants, stage parkour été',
  openGraph: {
    title: 'Stages de Parkour - Été 2026 | PKBA Bassin d\'Arcachon',
    description: 'Inscrivez-vous aux stages de parkour des vacances d\'été 2026 ! Sessions juillet et août, 2 formules au choix. Encadrement professionnel à Gujan-Mestras.',
    url: `${siteUrl}/stage`,
    siteName: 'PKBA - Club de Parkour Bassin d\'Arcachon',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stages de Parkour - Été 2026 | PKBA',
    description: 'Stages de parkour pendant les vacances d\'été. Sessions juillet et août 2026, 2 formules au choix. Inscriptions ouvertes !',
  },
  alternates: {
    canonical: '/stage',
  },
}

export default function Stage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Stages de Parkour - Été 2026 - PKBA',
            description: 'Inscription aux stages de parkour PKBA pendant les vacances d\'été 2026',
            url: `${siteUrl}/stage`,
            mainEntity: {
              '@type': 'Form',
              name: 'Formulaire d\'Inscription Stages d\'Été PKBA',
              description: 'Formulaire d\'inscription pour les stages de parkour des vacances d\'été 2026',
              url: `${siteUrl}/stage`,
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
                  name: 'Stages d\'Été',
                  item: `${siteUrl}/stage`,
                },
              ],
            },
          }),
        }}
      />
      <StagePage />
    </>
  )
}
