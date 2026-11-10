import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const MIN_DONATION_CENTS = 100

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json().catch(() => null)
    const { amount, currency } = (body ?? {}) as { amount?: unknown; currency?: unknown }

    const amountInCents = Math.round(Number(amount))

    if (!Number.isFinite(amountInCents) || amountInCents < MIN_DONATION_CENTS) {
      return NextResponse.json(
        { error: 'Le don minimum est de 1 €' },
        { status: 400 }
      )
    }

    // Normalize and enforce currency to EUR to prevent tampering
    const normalizedCurrency = (currency || 'eur').toString().toLowerCase()
    if (normalizedCurrency !== 'eur') {
      return NextResponse.json(
        { error: 'Devise non prise en charge' },
        { status: 400 }
      )
    }

    // Create a PaymentIntent for donation with enforced currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        type: 'donation',
        description: 'Don à PKBA - Club de parkour associatif',
      },
      description: 'Don à PKBA - Club de parkour associatif au Bassin d\'Arcachon',
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Error creating donation payment intent:', error)
    return NextResponse.json(
      { error: "Le paiement n'a pas pu être préparé, réessayez." },
      { status: 500 }
    )
  }
}
