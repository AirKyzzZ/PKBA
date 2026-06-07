import { CoursPrivePage } from '@/components/CoursPrivePage'
import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Cours privé de parkour, coaching individuel | PKBA Bassin d\'Arcachon',
  description: 'Cours privé de parkour au PKBA : coaching individuel un à un, sur rendez-vous à Gujan-Mestras. Débloquer une figure, préparer une compétition, reprendre en confiance ou progresser plus vite, à votre rythme et dès 6 ans.',
  keywords: 'cours privé parkour, coaching parkour individuel, cours particulier parkour, parkour Gujan-Mestras, parkour Bassin d\'Arcachon, coach parkour, progression parkour',
  openGraph: {
    title: 'Cours privé de parkour, coaching individuel | PKBA',
    description: 'Coaching individuel un à un, sur rendez-vous à Gujan-Mestras. Une séance 100% personnalisée avec un coach diplômé du club.',
    url: `${siteUrl}/cours-prive`,
    siteName: 'PKBA - Club de Parkour Bassin d\'Arcachon',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cours privé de parkour, coaching individuel | PKBA',
    description: 'Coaching individuel un à un, sur rendez-vous à Gujan-Mestras. Séance 100% personnalisée avec un coach du club.',
  },
  alternates: {
    canonical: '/cours-prive',
  },
}

export default function CoursPrive() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Cours privé de parkour, coaching individuel',
            serviceType: 'Coaching individuel de parkour',
            description: 'Coaching individuel un à un de parkour, sur rendez-vous, encadré par un coach diplômé du club PKBA à Gujan-Mestras.',
            url: `${siteUrl}/cours-prive`,
            areaServed: 'Bassin d\'Arcachon',
            provider: {
              '@type': 'SportsClub',
              name: 'PKBA - Parkour Bassin d\'Arcachon',
              telephone: '+33660147144',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '4 Av. de L\'actipôle',
                postalCode: '33470',
                addressLocality: 'Gujan-Mestras',
                addressCountry: 'FR',
              },
            },
          }),
        }}
      />
      <CoursPrivePage />
    </>
  )
}
