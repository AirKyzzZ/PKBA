import Script from 'next/script'

interface StructuredDataProps {
  type: 'organization' | 'sportsOrganization' | 'product' | 'event' | 'localBusiness'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'SportsOrganization',
          name: 'PKBA - Parkour Bassin d\'Arcachon',
          alternateName: 'PKBA',
          description: 'Club de parkour associatif au Bassin d\'Arcachon. Encadrement professionnel, progression et sécurité.',
          url: 'https://pkba.vertiflow.fr',
          logo: 'https://pkba.vertiflow.fr/images/full_white.png',
          image: 'https://pkba.vertiflow.fr/images/text_white.png',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Arcachon',
            addressRegion: 'Nouvelle-Aquitaine',
            addressCountry: 'FR',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: 'French',
          },
          sameAs: [
            'https://www.facebook.com/pkba.arcachon',
            'https://www.instagram.com/pkba.arcachon',
          ],
          foundingDate: '2025',
          sport: 'Parkour',
          areaServed: 'Bassin d\'Arcachon',
          ...data,
        }
      
      case 'sportsOrganization':
        return {
          '@context': 'https://schema.org',
          '@type': 'SportsOrganization',
          name: 'PKBA - Parkour Bassin d\'Arcachon',
          sport: 'Parkour',
          description: 'Club de parkour associatif proposant des cours, événements et compétitions.',
          url: 'https://pkba.vertiflow.fr',
          ...data,
        }
      
      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name || 'T-shirt PKBA Officiel',
          description: data.description || 'T-shirt officiel du club de parkour PKBA',
          brand: {
            '@type': 'Brand',
            name: 'PKBA',
          },
          category: 'Vêtements de sport',
          ...data,
        }
      
      case 'event':
        return {
          '@context': 'https://schema.org',
          '@type': 'SportsEvent',
          name: data.name || 'Cours de Parkour PKBA',
          description: data.description || 'Cours de parkour encadrés par des professionnels',
          organizer: {
            '@type': 'Organization',
            name: 'PKBA - Parkour Bassin d\'Arcachon',
          },
          ...data,
        }
      
      case 'localBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'PKBA - Parkour Bassin d\'Arcachon',
          description: 'Club de parkour associatif au Bassin d\'Arcachon',
          url: 'https://pkba.vertiflow.fr',
          telephone: data.telephone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Arcachon',
            addressRegion: 'Nouvelle-Aquitaine',
            addressCountry: 'FR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.latitude || 44.6588,
            longitude: data.longitude || -1.1689,
          },
          openingHours: data.openingHours || 'Mo-Fr 09:00-18:00',
          ...data,
        }
      
      default:
        return data
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}
