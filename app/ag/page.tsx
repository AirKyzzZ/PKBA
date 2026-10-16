import { AgPage } from '@/components/AgPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Assemblée générale 2026 | PKBA Parkour Bassin d\'Arcachon',
  description: 'Assemblée générale du PKBA le vendredi 6 novembre 2026 à 19h, au local du club à Gujan-Mestras. Confirmez votre présence ou donnez votre pouvoir.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/ag',
  },
}

export default function Ag() {
  return <AgPage />
}
