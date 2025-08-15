import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/CartContext'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PKBA - Parkour Bassin d\'Arcachon | Club de Parkour Associatif',
  description: 'Club de parkour associatif au Bassin d\'Arcachon. Encadrement professionnel, progression et sécurité. Inscriptions ouvertes pour la saison 2025/2026. Découvrez nos cours, événements et boutique officielle.',
  keywords: 'parkour, Arcachon, Bassin d\'Arcachon, sport, encadrement, sécurité, progression, club associatif, cours parkour, événements parkour, boutique PKBA',
  authors: [{ name: 'PKBA - Parkour Bassin d\'Arcachon' }],
  creator: 'PKBA - Parkour Bassin d\'Arcachon',
  publisher: 'PKBA - Parkour Bassin d\'Arcachon',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pkba.vertiflow.fr'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/images/full_white.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/full_white.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/images/full_white.png',
    shortcut: '/images/full_white.png',
  },
  openGraph: {
    title: 'PKBA - Parkour Bassin d\'Arcachon | Club de Parkour Associatif',
    description: 'Club de parkour associatif au Bassin d\'Arcachon. Encadrement professionnel, progression et sécurité. Inscriptions ouvertes pour la saison 2025/2026.',
    url: 'https://pkba.vertiflow.fr',
    siteName: 'PKBA - Parkour Bassin d\'Arcachon',
    images: [
      {
        url: '/images/text_white.png',
        width: 1200,
        height: 630,
        alt: 'PKBA - Parkour Bassin d\'Arcachon - Club de Parkour Associatif',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PKBA - Parkour Bassin d\'Arcachon | Club de Parkour Associatif',
    description: 'Club de parkour associatif au Bassin d\'Arcachon. Encadrement professionnel, progression et sécurité.',
    images: ['/images/text_white.png'],
    site: '@pkba_arcachon',
    creator: '@pkba_arcachon',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code-here',
    yandex: 'your-yandex-verification-code-here',
    yahoo: 'your-yahoo-verification-code-here',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'PKBA',
    'application-name': 'PKBA',
    'msapplication-TileColor': '#0ea5e9',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/images/full_white.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/full_white.png" />
        <link rel="manifest" href="/manifest.json" />
        <StructuredData 
          type="localSportsOrganization" 
          data={{
            foundingDate: '2025',
            sport: 'Parkour',
            areaServed: 'Bassin d\'Arcachon',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              availableLanguage: 'French',
            },
          }}
        />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
} 