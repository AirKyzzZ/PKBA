import InscriptionPage from '@/components/InscriptionPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stage de Parkour - Vacances de Noël 2024 | PKBA Bassin d\'Arcachon',
  description: 'Inscrivez-vous au stage de parkour pendant les vacances de Noël 2024 ! 4 jours de pratique intensive (22-23 & 29-30 décembre). Groupes adaptés par âge, encadrement professionnel. Places limitées.',
  keywords: 'stage parkour, vacances Noël 2024, stage sportif décembre, parkour Arcachon, activité vacances enfants, stage parkour Noël',
  openGraph: {
    title: 'Stage de Parkour - Vacances de Noël 2024 | PKBA Bassin d\'Arcachon',
    description: 'Inscrivez-vous au stage de parkour pendant les vacances de Noël 2024 ! 4 jours de pratique intensive (22-23 & 29-30 décembre). Groupes adaptés par âge, encadrement professionnel.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inscription`,
    siteName: 'PKBA - Club de Parkour Bassin d\'Arcachon',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stage de Parkour - Vacances de Noël 2024 | PKBA',
    description: 'Stage de parkour intensif pendant les vacances de Noël. 4 jours d\'entraînement : 22-23 & 29-30 décembre 2024. Inscriptions ouvertes !',
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
            name: 'Stage de Parkour - Vacances de Noël 2024 - PKBA',
            description: 'Inscription au stage de parkour PKBA pendant les vacances de Noël 2024',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inscription`,
                          mainEntity: {
                '@type': 'Form',
                name: 'Formulaire d\'Inscription Stage de Noël PKBA',
                description: 'Formulaire d\'inscription pour le stage de parkour des vacances de Noël 2024',
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
                  name: 'Inscription Stage',
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