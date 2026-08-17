import StagePage from '@/components/StagePage'
import { Metadata } from 'next'
import { getUpcomingStages, FORMULES } from '@/content/stages'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pkba.vertiflow.fr'

const upcoming = getUpcomingStages()
const periods = upcoming.map((stage) => stage.period).join(', ')
const hasStage = upcoming.length > 0

const title = hasStage
  ? `Stages de Parkour ${upcoming.map((s) => s.monthLabel).join(' et ')} | PKBA Bassin d'Arcachon`
  : "Stages de Parkour pendant les vacances | PKBA Bassin d'Arcachon"

const description = hasStage
  ? `Inscrivez-vous aux stages de parkour du PKBA. ${periods}. Deux formules au choix : journée complète (${FORMULES[1].time}, ${FORMULES[1].pricePerDay}€/jour) ou séance découverte (${FORMULES[2].time}, ${FORMULES[2].pricePerDay}€). À partir de 6 ans, à Gujan-Mestras.`
  : "Le club PKBA organise des stages de parkour pendant les vacances scolaires à Gujan-Mestras, à partir de 6 ans. Les dates du prochain stage seront annoncées prochainement."

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "stage parkour, stage vacances scolaires, parkour Arcachon, parkour Gujan-Mestras, activité vacances enfants, stage parkour Bassin d'Arcachon",
  openGraph: {
    title,
    description,
    url: `${siteUrl}/stage`,
    siteName: "PKBA - Club de Parkour Bassin d'Arcachon",
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  alternates: {
    canonical: '/stage',
  },
}

export default function Stage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description,
            url: `${siteUrl}/stage`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Accueil',
                  item: `${siteUrl}/`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Stages',
                  item: `${siteUrl}/stage`,
                },
              ],
            },
          }).replace(/</g, '\\u003c'),
        }}
      />
      <StagePage initialStageIds={upcoming.map((stage) => stage.id)} />
    </>
  )
}
