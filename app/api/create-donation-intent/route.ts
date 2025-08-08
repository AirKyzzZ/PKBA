import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency } = body

    // Create a PaymentIntent for donation
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
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
      { error: 'Error creating donation payment intent' },
      { status: 500 }
    )
  }
}
