import InscriptionPage from '@/components/InscriptionPage'
import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Inscription PKBA - Saison 2025/2026 | Club de Parkour Bassin d\'Arcachon',
  description: 'Inscrivez-vous au club de parkour PKBA pour la saison 2025/2026. Formulaire d\'inscription sécurisé avec informations de base et autorisation parentale. Encadrement professionnel garanti.',
  keywords: 'inscription parkour, club PKBA, saison 2025/2026, cours parkour Arcachon, adhésion association, encadrement professionnel',
  openGraph: {
    title: 'Inscription PKBA - Saison 2025/2026 | Club de Parkour Bassin d\'Arcachon',
    description: 'Inscrivez-vous au club de parkour PKBA. Formulaire sécurisé et encadrement professionnel.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/inscription`,
    images: ['/images/text_white.png'],
  },
  alternates: {
    canonical: '/inscription',
  },
}

export default function Inscription() {
  return (
    <>
      <StructuredData 
        type="event" 
        data={{
          name: 'Inscription Saison 2025/2026 - PKBA',
          description: 'Inscription au club de parkour PKBA pour la saison 2025/2026',
          startDate: '2025-09-01',
          endDate: '2026-06-30',
          location: {
            '@type': 'Place',
            name: 'Bassin d\'Arcachon',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Arcachon',
              addressRegion: 'Nouvelle-Aquitaine',
              addressCountry: 'FR',
            },
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
          },
        }}
      />
      <InscriptionPage />
    </>
  )
} 