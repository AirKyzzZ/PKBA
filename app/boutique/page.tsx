import BoutiquePage from '@/components/BoutiquePage'
import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Boutique PKBA - Collection Officielle | Parkour Bassin d\'Arcachon',
  description: 'Découvrez notre collection officielle PKBA : T-shirts personnalisables, sweats à capuche et shorts athlétiques. Paiement sécurisé Stripe. Livraison rapide en France.',
  keywords: 't-shirt PKBA, hoodie PKBA, short PKBA, vêtements parkour, boutique officielle, merchandising PKBA, t-shirt personnalisé, parkour Bassin d\'Arcachon',
  openGraph: {
    title: 'Boutique PKBA - Collection Officielle | Parkour Bassin d\'Arcachon',
    description: 'Collection officielle PKBA : T-shirts personnalisables, sweats à capuche et shorts athlétiques. Paiement sécurisé.',
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
          name: 'Collection Vêtements PKBA Officiel',
          description: 'Collection officielle du club de parkour PKBA : T-shirts personnalisables, sweats à capuche et shorts athlétiques',
          brand: 'PKBA',
          category: 'Vêtements de sport',
          offers: [
            {
              '@type': 'Offer',
              name: 'T-shirt PKBA',
              price: '19.99',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'PKBA - Parkour Bassin d\'Arcachon',
              },
            },
            {
              '@type': 'Offer',
              name: 'Sweat à capuche PKBA',
              price: '39.99',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'PKBA - Parkour Bassin d\'Arcachon',
              },
            },
            {
              '@type': 'Offer',
              name: 'Short athlétique PKBA',
              price: '29.99',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'PKBA - Parkour Bassin d\'Arcachon',
              },
            }
          ],
        }}
      />
      <BoutiquePage />
    </>
  )
} 