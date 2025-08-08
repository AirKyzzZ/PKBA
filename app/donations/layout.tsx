import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dons PKBA - Soutenez le club',
  description: 'Soutenez PKBA avec un don sécurisé via Stripe. Reçu fiscal envoyé par email.',
  alternates: { canonical: '/donations' },
  robots: {
    index: true,
    follow: true,
  },
}

export default function DonationsLayout({ children }: { children: React.ReactNode }) {
  return children
}


