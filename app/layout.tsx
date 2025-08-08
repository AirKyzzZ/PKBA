import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PKBA - Parkour Bassin d\'Arcachon',
  description: 'Club de parkour associatif au Bassin d\'Arcachon. Encadrement professionnel, progression et sécurité. Lancement Septembre 2025.',
  keywords: 'parkour, Arcachon, sport, encadrement, sécurité, progression, club associatif',
  authors: [{ name: 'PKBA' }],
  creator: 'PKBA',
  publisher: 'PKBA',
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
    title: 'PKBA - Parkour Bassin d\'Arcachon',
    description: 'Club de parkour associatif au Bassin d\'Arcachon. Encadrement professionnel, progression et sécurité.',
    url: 'https://pkba.vertiflow.fr',
    siteName: 'PKBA',
    images: [
      {
        url: '/images/text_white.png',
        width: 1200,
        height: 630,
        alt: 'PKBA - Parkour Bassin d\'Arcachon',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PKBA - Parkour Bassin d\'Arcachon',
    description: 'Club de parkour associatif au Bassin d\'Arcachon. Encadrement professionnel, progression et sécurité.',
    images: ['/images/text_white.png'],
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
    google: 'your-google-verification-code',
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