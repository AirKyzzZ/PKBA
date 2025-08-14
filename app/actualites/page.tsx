import ActualitesPage from '@/components/ActualitesPage'

export const metadata = {
  title: 'Nouveau Site Web PKBA - Lancement 15 Août 2025 | Actualités PKBA',
  description: 'Découvrez le nouveau site web PKBA - Parkour Bassin d\'Arcachon ! Lancement officiel le 15 août 2025 avec inscriptions en ligne, boutique intégrée et fonctionnalités modernes pour la communauté parkour.',
  keywords: 'PKBA, Parkour Bassin d\'Arcachon, nouveau site web, lancement 2025, inscriptions en ligne, boutique parkour, communauté parkour, actualités PKBA',
  openGraph: {
    title: 'Nouveau Site Web PKBA - Lancement 15 Août 2025',
    description: 'Le club PKBA lance son nouveau site web moderne et interactif pour connecter la communauté parkour du Bassin d\'Arcachon.',
    type: 'article',
    publishedTime: '2025-08-15T00:00:00.000Z',
    authors: ['Équipe PKBA'],
    images: [
      {
        url: '/images/hero_background.webp',
        width: 1200,
        height: 630,
        alt: 'Nouveau site web PKBA - Parkour Bassin d\'Arcachon'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nouveau Site Web PKBA - Lancement 15 Août 2025',
    description: 'Le club PKBA lance son nouveau site web moderne et interactif pour connecter la communauté parkour.',
    images: ['/images/hero_background.webp']
  }
}

export default function Actualites() {
  return <ActualitesPage />
} 