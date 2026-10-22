import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { computeOrderAmount } from '@/lib/shop-pricing'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { currency, items } = body

    const amountInCents = computeOrderAmount(items)

    if (amountInCents === null) {
      return NextResponse.json(
        { error: 'Invalid order' },
        { status: 400 }
      )
    }

    // Normalize and enforce currency to EUR to prevent tampering
    const normalizedCurrency = (currency || 'eur').toString().toLowerCase()
    if (normalizedCurrency !== 'eur') {
      return NextResponse.json(
        { error: 'Unsupported currency' },
        { status: 400 }
      )
    }

    // Create a PaymentIntent with the order amount and enforced currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        type: 'shop_order',
        items_count: items.length.toString(),
        items_summary: items.map((item: any) => 
          `${item.name}-${item.color}-${item.size}${item.customization ? `-${item.customization}` : ''}-x${item.quantity}`
        ).join('|'),
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    )
  }
} 