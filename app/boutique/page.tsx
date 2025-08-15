import BoutiquePage from '@/components/BoutiquePage'
import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Boutique PKBA - T-shirt Officiel | Parkour Bassin d\'Arcachon',
  description: 'Découvrez notre T-shirt officiel PKBA. Personnalisez votre T-shirt avec le nom de l\'athlète. Paiement sécurisé Stripe. Livraison rapide en France.',
  keywords: 't-shirt PKBA, vêtements parkour, boutique officielle, merchandising PKBA, t-shirt personnalisé, parkour Bassin d\'Arcachon',
  openGraph: {
    title: 'Boutique PKBA - T-shirt Officiel | Parkour Bassin d\'Arcachon',
    description: 'T-shirt officiel PKBA. Personnalisation disponible. Paiement sécurisé.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/boutique`,
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
            price: '19.99',
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