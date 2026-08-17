import { PlanningPage } from '@/components/PlanningPage'
import { getEventsJsonLd } from '@/content/events'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pkba.vertiflow.fr'

export const metadata = {
  title: 'Calendrier et événements 2026/2027 | PKBA Parkour Bassin d\'Arcachon',
  description: 'Tous les événements du club de parkour PKBA à Gujan-Mestras : reprise des cours le 7 septembre 2026, forums des associations, stages pendant les vacances, compétitions FFGYM et gala de fin d\'année.',
  keywords: 'calendrier parkour, événements parkour Bassin d\'Arcachon, stage parkour Gujan-Mestras, compétition parkour FFGYM, reprise des cours parkour, forum des associations La Teste, gala PKBA',
  alternates: {
    canonical: `${SITE_URL}/planning`,
  },
  openGraph: {
    title: 'Calendrier et événements 2026/2027 | PKBA',
    description: 'Reprise des cours le 7 septembre 2026, forums des associations, stages, compétitions FFGYM et gala. Tout le calendrier du club de parkour du Bassin d\'Arcachon.',
    url: `${SITE_URL}/planning`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calendrier et événements 2026/2027 | PKBA',
    description: 'Tout le calendrier du club de parkour du Bassin d\'Arcachon.',
  },
}

export default function Planning() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getEventsJsonLd(SITE_URL)).replace(/</g, '\\u003c'),
        }}
      />
      <PlanningPage />
    </>
  )
}
