import BoutiquePage from '@/components/BoutiquePage'
import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Boutique PKBA - T-shirts Officiels | Parkour Bassin d\'Arcachon',
  description: 'Découvrez notre collection exclusive de T-shirts officiels PKBA. Personnalisez votre T-shirt avec le nom de l\'athlète. Paiement sécurisé Stripe. Livraison rapide en France.',
  keywords: 't-shirt PKBA, vêtements parkour, boutique officielle, merchandising PKBA, t-shirt personnalisé, parkour Bassin d\'Arcachon',
  openGraph: {
    title: 'Boutique PKBA - T-shirts Officiels | Parkour Bassin d\'Arcachon',
    description: 'Collection exclusive de T-shirts officiels PKBA. Personnalisation disponible. Paiement sécurisé.',
    url: 'https://pkba.vertiflow.fr/boutique',
    images: ['/images/text_white.png'],
  },
  alternates: {
    canonical: '/boutique',
  },
}

export default function Boutique() {
  return (
    <>
      <StructuredData 
        type="product" 
        data={{
          name: 'T-shirt PKBA Officiel',
          description: 'T-shirt officiel du club de parkour PKBA avec personnalisation disponible',
          brand: 'PKBA',
          category: 'Vêtements de sport',
          offers: {
            '@type': 'Offer',
            price: '25.00',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'PKBA - Parkour Bassin d\'Arcachon',
            },
          },
        }}
      />
      <BoutiquePage />
    </>
  )
} 