import InscriptionPage from '@/components/InscriptionPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stage de Parkour - Vacances d\'Avril 2026 | PKBA Bassin d\'Arcachon',
  description: 'Inscrivez-vous au stage de parkour pendant les vacances d\'avril 2026 ! Du 14 au 25 avril, 2 formules au choix : journée (10h-16h, 30€) ou après-midi (16h-18h, 15€). À partir de 6 ans.',
  keywords: 'stage parkour, vacances avril 2026, stage sportif printemps, parkour Arcachon, activité vacances enfants, stage parkour printemps',
  openGraph: {
    title: 'Stage de Parkour - Vacances d\'Avril 2026 | PKBA Bassin d\'Arcachon',
    description: 'Inscrivez-vous au stage de parkour pendant les vacances d\'avril 2026 ! Du 14 au 25 avril, 2 formules au choix. Encadrement professionnel.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inscription`,
    siteName: 'PKBA - Club de Parkour Bassin d\'Arcachon',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stage de Parkour - Vacances d\'Avril 2026 | PKBA',
    description: 'Stage de parkour pendant les vacances de printemps. Du 14 au 25 avril 2026, 2 formules au choix. Inscriptions ouvertes !',
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
            name: 'Stage de Parkour - Vacances d\'Avril 2026 - PKBA',
            description: 'Inscription au stage de parkour PKBA pendant les vacances d\'avril 2026',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inscription`,
                          mainEntity: {
                '@type': 'Form',
                name: 'Formulaire d\'Inscription Stage d\'Avril PKBA',
                description: 'Formulaire d\'inscription pour le stage de parkour des vacances d\'avril 2026',
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