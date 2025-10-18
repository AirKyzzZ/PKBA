import ActualitesPage from '@/components/ActualitesPage'

export const metadata = {
  title: 'Actualités PKBA — Club de Parkour Bassin d\'Arcachon',
  description:
    'Suivez les actualités du club PKBA : annonces, bilans, événements et projets. Découvrez nos réussites et la vie du club sur le Bassin d\'Arcachon.',
  keywords:
    'PKBA, Parkour Bassin d\'Arcachon, actualités parkour, club parkour Arcachon, nouvelles PKBA, bilans, événements',
  openGraph: {
    title: 'Actualités PKBA — Club de Parkour Bassin d\'Arcachon',
    description:
      'Annonces, bilans et événements du club PKBA. Suivez nos dernières nouvelles.',
    type: 'website',
    images: [
      {
        url: '/images/hero_background.webp',
        width: 1200,
        height: 630,
        alt: 'Actualités PKBA — Parkour Bassin d\'Arcachon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Actualités PKBA',
    description: 'Les dernières nouvelles du club PKBA sur le Bassin d\'Arcachon.',
    images: ['/images/hero_background.webp'],
  },
}

export default function Actualites() {
  return <ActualitesPage />
}