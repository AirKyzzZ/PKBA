'use client'

import { useState, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import DonationForm from '@/components/DonationForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function DonationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 pt-16 lg:pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Soutenez PKBA
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Votre don nous aide à continuer notre mission de promouvoir le parkour 
              au Bassin d'Arcachon et à développer notre club associatif.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Avantages fiscaux
              </h2>
              <p className="text-gray-300">
                Votre don est déductible de vos impôts selon les articles 200, 200 bis 
                et 238 bis du code des Impôts. Un reçu vous sera adressé par PKBA.
              </p>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <DonationForm />
          </Elements>
        </div>
      </div>
    </div>
  )
}
