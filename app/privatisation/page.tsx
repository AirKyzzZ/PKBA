import { PrivatisationPage } from '@/components/PrivatisationPage'

export const metadata = {
  title: 'Privatiser la salle PKBA - Parkour à Gujan-Mestras',
  description: 'Privatisez la salle PKBA pour votre évènement à Gujan-Mestras. Séminaires, team building, EVG, anniversaires adultes : 20€/personne, 2h, jusqu\'à 20 personnes, coach et matériel inclus.',
  keywords: 'privatisation salle parkour, team building parkour Arcachon, séminaire entreprise parkour, EVG EVJF Gujan-Mestras, location salle parkour, activité originale entreprise',
  openGraph: {
    title: 'Privatiser la salle PKBA - Parkour à Gujan-Mestras',
    description: 'Privatisez la salle PKBA pour votre évènement : séminaires, team building, EVG/EVJF. 20€/personne, 2h, coach et matériel inclus.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/privatisation`,
    siteName: 'PKBA - Club de Parkour Bassin d\'Arcachon',
    type: 'website',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: '/privatisation',
  },
}

export default function Privatisation() {
  return <PrivatisationPage />
}
