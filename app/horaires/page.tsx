import type { Metadata } from 'next'
import HorairesPage from '@/components/HorairesPage'

export const metadata: Metadata = {
  title: 'Horaires et Tarifs | PKBA - Parkour Bassin d\'Arcachon',
  description: 'Découvrez les horaires d\'entraînement et les tarifs du club PKBA. Groupes loisirs et performance, lieux d\'entraînement, inscriptions ouvertes.',
  keywords: 'horaires parkour, tarifs PKBA, entraînement parkour, groupes loisirs, groupes performance, inscription parkour, Bassin d\'Arcachon',
  openGraph: {
    title: 'Horaires et Tarifs | PKBA - Parkour Bassin d\'Arcachon',
    description: 'Découvrez les horaires d\'entraînement et les tarifs du club PKBA. Groupes loisirs et performance, lieux d\'entraînement.',
  },
}

export default function Horaires() {
  return <HorairesPage />
}
