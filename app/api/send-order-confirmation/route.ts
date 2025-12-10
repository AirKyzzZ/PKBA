import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface OrderItem {
  name: string
  color: string
  size: string
  quantity: number
  price: number
  customization?: string
}

interface OrderData {
  paymentIntentId: string
  items: OrderItem[]
  total: number
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
}

function generateOrderConfirmationEmail(orderData: OrderData): string {
  const { customer, items, total, paymentIntentId } = orderData
  const orderDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const shippingCost = 4.99
  const subtotal = total - shippingCost

  const itemsHTML = items.map(item => {
    const itemTotal = (item.price + (item.customization ? 5 : 0)) * item.quantity
    const colorName = item.color === 'white' ? 'Blanc' : item.color === 'black' ? 'Noir' : item.color
    return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
          <strong>${item.name}</strong><br>
          <span style="color: #6b7280; font-size: 14px;">
            Couleur: ${colorName} | Taille: ${item.size}
            ${item.customization ? ` | Personnalisation: ${item.customization}` : ''}
          </span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
          <strong>${itemTotal.toFixed(2)}€</strong>
        </td>
      </tr>
    `
  }).join('')

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de commande - PKBA</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                ✅ Commande Confirmée !
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                Merci pour votre commande, ${customer.firstName} !
              </p>
            </td>
          </tr>

          <!-- Success Message -->
          <tr>
            <td style="padding: 30px; background-color: #f0fdf4; border-bottom: 2px solid #22c55e;">
              <p style="margin: 0; color: #166534; font-size: 16px; font-weight: 600; text-align: center;">
                🎉 Votre paiement a été traité avec succès !
              </p>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 22px; font-weight: bold;">
                📦 Détails de votre commande
              </h2>
              
              <div style="background-color: #f9fafb; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                  <strong style="color: #111827;">Numéro de commande:</strong>
                </p>
                <p style="margin: 0; color: #111827; font-family: monospace; font-size: 12px; word-break: break-all;">
                  ${paymentIntentId}
                </p>
              </div>

              <div style="background-color: #f9fafb; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                  <strong style="color: #111827;">Date de commande:</strong>
                </p>
                <p style="margin: 0; color: #111827; font-size: 14px;">
                  ${orderDate}
                </p>
              </div>

              <!-- Items Table -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; font-weight: 600; color: #111827; border-bottom: 2px solid #e5e7eb;">Article</th>
                    <th style="padding: 12px; text-align: center; font-weight: 600; color: #111827; border-bottom: 2px solid #e5e7eb;">Quantité</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #111827; border-bottom: 2px solid #e5e7eb;">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>

              <!-- Order Summary -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                    Sous-total:
                  </td>
                  <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">
                    ${subtotal.toFixed(2)}€
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                    Frais de livraison:
                  </td>
                  <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px; font-weight: 600;">
                    ${shippingCost.toFixed(2)}€
                  </td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #111827; font-size: 18px; font-weight: bold;">
                    Total:
                  </td>
                  <td style="padding: 12px 0; text-align: right; color: #667eea; font-size: 20px; font-weight: bold;">
                    ${total.toFixed(2)}€
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Information -->
          <tr>
            <td style="padding: 30px; background-color: #eff6ff; border-top: 1px solid #dbeafe;">
              <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px; font-weight: bold;">
                🚚 Informations de livraison
              </h3>
              <div style="color: #1e3a8a; font-size: 14px; line-height: 1.6;">
                <p style="margin: 0 0 8px 0;">
                  <strong>${customer.firstName} ${customer.lastName}</strong>
                </p>
                <p style="margin: 0 0 8px 0;">
                  ${customer.address}
                </p>
                <p style="margin: 0 0 8px 0;">
                  ${customer.postalCode} ${customer.city}
                </p>
                <p style="margin: 0;">
                  📞 ${customer.phone}
                </p>
              </div>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding: 30px;">
              <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px; font-weight: bold;">
                📋 Prochaines étapes
              </h3>
              <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 1.8;">
                <li style="margin-bottom: 8px;">
                  Vos produits seront préparés et expédiés sous <strong>2-3 jours ouvrés</strong>
                </li>
                <li style="margin-bottom: 8px;">
                  Livraison prévue à votre adresse en <strong>8-10 jours ouvrés</strong>
                </li>
                <li style="margin-bottom: 8px;">
                  Vous recevrez un <strong>numéro de suivi</strong> dès l'expédition
                </li>
                <li>
                  Pour toute question, contactez-nous à <strong>parkourBA33@gmail.com</strong>
                </li>
              </ul>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                Merci d'avoir choisi <strong style="color: #111827;">PKBA - Parkour Bassin d'Arcachon</strong>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Cet email est une confirmation automatique. Veuillez le conserver pour vos archives.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json()

    // Validate required fields
    if (!orderData.customer?.email || !orderData.paymentIntentId || !orderData.items?.length) {
      return NextResponse.json(
        { error: 'Missing required order data' },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Get the sender email from environment
    // In production, RESEND_FROM_EMAIL should be set to a verified domain
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(orderData.customer.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    // Send the confirmation email
    const { data, error } = await resend.emails.send({
      from: `PKBA <${fromEmail}>`,
      to: orderData.customer.email,
      subject: `✅ Confirmation de commande #${orderData.paymentIntentId.slice(-8)} - PKBA`,
      html: generateOrderConfirmationEmail(orderData),
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id 
    })
  } catch (error) {
    console.error('Error in send-order-confirmation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

