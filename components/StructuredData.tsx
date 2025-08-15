import Script from 'next/script'

interface StructuredDataProps {
  type: 'organization' | 'sportsOrganization' | 'product' | 'event' | 'localBusiness' | 'localSportsOrganization'
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
          alternateName: ['PKBA', 'Parkour Bassin d\'Arcachon', 'Club Parkour Arcachon', 'Club Parkour La Teste'],
          description: 'Club de parkour associatif au Bassin d\'Arcachon. Encadrement professionnel, progression et sécurité. Cours, événements et compétitions de parkour.',
          url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/full_white.png`,
          image: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/text_white.png`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Bassin d\'Arcachon',
            addressLocality: 'Arcachon',
            addressRegion: 'Nouvelle-Aquitaine',
            postalCode: '33120',
            addressCountry: 'FR',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: 'French',
            areaServed: 'FR',
          },
          sameAs: [
            'https://www.facebook.com/pkba.arcachon',
            'https://www.instagram.com/pkba.arcachon',
          ],
          foundingDate: '2025',
          sport: 'Parkour',
          areaServed: {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: 44.6588,
              longitude: -1.1689,
            },
            geoRadius: '50000',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Services PKBA',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Cours de Parkour',
                  description: 'Cours de parkour encadrés par des professionnels',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Événements de Parkour',
                  description: 'Compétitions et événements de parkour',
                },
              },
            ],
          },
          ...data,
        }
      
      case 'localSportsOrganization':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': 'https://pkba.vertiflow.fr/#organization',
          name: 'PKBA - Parkour Bassin d\'Arcachon',
          alternateName: ['PKBA', 'Parkour Bassin d\'Arcachon', 'Club Parkour Arcachon', 'Club Parkour La Teste'],
          description: 'Club de parkour associatif au Bassin d\'Arcachon. Encadrement professionnel, progression et sécurité.',
          url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          telephone: '+33 6 12 34 56 78',
          email: 'contact@pkba.vertiflow.fr',
          logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/full_white.png`,
          image: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/text_white.png`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Bassin d\'Arcachon',
            addressLocality: 'Arcachon',
            addressRegion: 'Nouvelle-Aquitaine',
            postalCode: '33120',
            addressCountry: 'FR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 44.6588,
            longitude: -1.1689,
          },
          openingHours: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '18:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Saturday'],
              opens: '09:00',
              closes: '17:00',
            },
          ],
          priceRange: '€€',
          paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
          areaServed: [
            {
              '@type': 'City',
              name: 'Arcachon',
            },
            {
              '@type': 'City',
              name: 'La Teste-de-Buch',
            },
            {
              '@type': 'City',
              name: 'Gujan-Mestras',
            },
            {
              '@type': 'City',
              name: 'Le Teich',
            },
            {
              '@type': 'City',
              name: 'Biganos',
            },
            {
              '@type': 'City',
              name: 'Audenge',
            },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Services PKBA',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Cours de Parkour Débutants',
                  description: 'Cours d\'initiation au parkour pour débutants',
                  provider: {
                    '@type': 'Organization',
                    name: 'PKBA - Parkour Bassin d\'Arcachon',
                  },
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Cours de Parkour Avancés',
                  description: 'Cours de perfectionnement en parkour',
                  provider: {
                    '@type': 'Organization',
                    name: 'PKBA - Parkour Bassin d\'Arcachon',
                  },
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Événements de Parkour',
                  description: 'Compétitions et événements de parkour',
                  provider: {
                    '@type': 'Organization',
                    name: 'PKBA - Parkour Bassin d\'Arcachon',
                  },
                },
              },
            ],
          },
          ...data,
        }
      
      case 'sportsOrganization':
        return {
          '@context': 'https://schema.org',
          '@type': 'SportsOrganization',
          name: 'PKBA - Parkour Bassin d\'Arcachon',
          sport: 'Parkour',
          description: 'Club de parkour associatif proposant des cours, événements et compétitions.',
          url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          ...data,
        }
      
      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name || 'T-shirt PKBA Officiel',
          description: data.description || 'T-shirt officiel du club de parkour PKBA - Parkour Bassin d\'Arcachon',
          brand: {
            '@type': 'Brand',
            name: 'PKBA',
            description: 'Parkour Bassin d\'Arcachon',
          },
          category: 'Vêtements de sport',
          manufacturer: {
            '@type': 'Organization',
            name: 'PKBA - Parkour Bassin d\'Arcachon',
          },
          ...data,
        }
      
      case 'event':
        return {
          '@context': 'https://schema.org',
          '@type': 'SportsEvent',
          name: data.name || 'Cours de Parkour PKBA',
          description: data.description || 'Cours de parkour encadrés par des professionnels du club PKBA',
          organizer: {
            '@type': 'Organization',
            name: 'PKBA - Parkour Bassin d\'Arcachon',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          },
          location: {
            '@type': 'Place',
            name: 'Bassin d\'Arcachon',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Arcachon',
              addressRegion: 'Nouvelle-Aquitaine',
              addressCountry: 'FR',
            },
          },
          ...data,
        }
      
      case 'localBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'PKBA - Parkour Bassin d\'Arcachon',
          description: 'Club de parkour associatif au Bassin d\'Arcachon',
          url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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
