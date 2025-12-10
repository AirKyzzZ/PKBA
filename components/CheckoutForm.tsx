'use client'

import { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { motion } from 'framer-motion'
import { CreditCard, User, Mail, Phone, MapPin, CheckCircle, AlertCircle, Shield, Home, ShoppingCart } from 'lucide-react'
import { CartItem } from './CartContext'

interface CheckoutFormProps {
  items: CartItem[]
  total: number
  onSuccess: () => void
  onError: (error: any) => void
}

const CheckoutForm = ({
  items,
  total,
  onSuccess,
  onError
}: CheckoutFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [paymentIntentId, setPaymentIntentId] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const sendOrderNotification = async (orderData: any) => {
    try {
      const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ORDER_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          type: 'order_notification',
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_address: formData.address,
          customer_city: formData.city,
          customer_postal_code: formData.postalCode,
          payment_intent_id: orderData.paymentIntentId,
          items_summary: items.map(item => 
            `${item.name} - ${item.color === 'white' ? 'Blanc' : item.color === 'black' ? 'Noir' : item.color} - Taille ${item.size}${item.customization ? ` - Personnalisation: ${item.customization}` : ''} x${item.quantity}`
          ).join('\n'),
          total_amount: total.toString(),
          order_details: JSON.stringify(orderData, null, 2),
          order_date: new Date().toISOString()
        }).toString(),
        redirect: 'manual'
      })

      if (response.status < 200 || response.status >= 400) {
        console.error('Error sending order notification to Formspree')
      }
    } catch (error) {
      console.error('Error sending order notification:', error)
    }
  }

  const sendOrderConfirmationEmail = async (orderData: any) => {
    try {
      const response = await fetch('/api/send-order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error sending confirmation email:', errorData)
        // Don't throw error - email failure shouldn't block the success flow
      } else {
        console.log('Order confirmation email sent successfully')
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error)
      // Don't throw error - email failure shouldn't block the success flow
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      // Create payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: 'eur',
          items: items.map(item => ({
            name: item.name,
            color: item.color,
            size: item.size,
            customization: item.customization,
            quantity: item.quantity,
            price: item.price
          }))
        }),
      })

      const { clientSecret } = await response.json()

      // Confirm payment with Stripe
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.postalCode,
              country: 'FR'
            }
          }
        }
      })

      if (paymentError) {
        setError(paymentError.message || 'Une erreur est survenue lors du paiement.')
      } else if (paymentIntent.status === 'succeeded') {
        setIsSuccess(true)
        setPaymentIntentId(paymentIntent.id)
        
        // Prepare order data
        const orderData = {
          paymentIntentId: paymentIntent.id,
          items: items,
          total: total,
          customer: formData
        }
        
        // Send order notification to admin (Formspree)
        await sendOrderNotification(orderData)
        
        // Send confirmation email to customer
        await sendOrderConfirmationEmail(orderData)
        
        // Clear cart immediately after successful payment
        onSuccess()
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      onError(error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-8"
      >
        {/* Large Success Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-8 mb-6 text-center shadow-2xl">
          <CheckCircle size={100} className="mx-auto mb-4 animate-bounce" />
          <h3 className="text-4xl md:text-5xl font-cheddar font-bold mb-3">
            ✅ PAIEMENT CONFIRMÉ !
          </h3>
          <p className="text-2xl font-montserrat font-bold">
            Votre commande a été payée avec succès
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-white border-4 border-green-500 rounded-xl shadow-lg p-6 mb-6">
          <h4 className="text-2xl font-cheddar font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Shield size={28} className="text-green-600 mr-2" />
            Détails du paiement
          </h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-montserrat font-bold text-gray-700 text-lg">Montant payé:</span>
              <span className="font-cheddar font-bold text-green-600 text-2xl">{total.toFixed(2)}€</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-montserrat font-bold text-gray-700">Articles commandés:</span>
              <span className="font-cheddar font-bold text-gray-900">{items.length} article{items.length > 1 ? 's' : ''}</span>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-montserrat text-sm text-gray-700 mb-2">
                <strong>Numéro de transaction:</strong>
              </p>
              <p className="font-mono text-xs text-gray-600 break-all bg-white p-2 rounded border border-blue-200">
                {paymentIntentId}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-montserrat text-sm text-gray-700">
                <strong>Client:</strong> {formData.firstName} {formData.lastName}
              </p>
              <p className="font-montserrat text-sm text-gray-700">
                <strong>Email:</strong> {formData.email}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-gray-200">
          <h4 className="text-xl font-cheddar font-bold text-gray-900 mb-4">
            📦 Votre commande
          </h4>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-montserrat font-semibold text-gray-900">{item.name}</p>
                  <p className="font-montserrat text-sm text-gray-600">
                    {item.color === 'white' ? 'Blanc' : item.color === 'black' ? 'Noir' : item.color} • Taille {item.size}
                    {item.customization && ` • Perso: ${item.customization}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-cheddar font-bold text-gray-900">
                    {((item.price + (item.customization ? 5 : 0)) * item.quantity).toFixed(2)}€
                  </p>
                  <p className="font-montserrat text-sm text-gray-500">x{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Mail size={32} className="text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-cheddar font-bold text-green-900 mb-2">
                ✉️ Email de confirmation envoyé !
              </h4>
              <p className="text-green-800 font-montserrat mb-2">
                Un email de confirmation détaillé avec tous les détails de votre commande a été envoyé à :
              </p>
              <p className="text-green-900 font-montserrat font-bold text-lg">
                📧 {formData.email}
              </p>
              <p className="text-green-700 font-montserrat text-sm mt-2">
                Vérifiez votre boîte de réception (et vos spams si nécessaire). L'email contient tous les détails de votre commande.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
          <h4 className="text-xl font-cheddar font-bold text-blue-900 mb-4 flex items-center">
            <Mail size={24} className="mr-2" />
            Prochaines étapes
          </h4>
          <div className="space-y-3 text-blue-900 font-montserrat">
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p>Un <strong>email de confirmation HTML</strong> avec tous les détails a été envoyé à <strong>{formData.email}</strong></p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p>Vos produits seront préparés et expédiés sous <strong>2-3 jours ouvrés</strong></p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p>Livraison prévue à votre adresse en <strong>8-10 jours ouvrés</strong></p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p>Vous recevrez un <strong>numéro de suivi</strong> dès l'expédition</p>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-cheddar font-bold text-gray-900 mb-3">
            💬 Besoin d'aide ?
          </h4>
          <p className="font-montserrat text-gray-700 mb-2">
            Pour toute question sur votre commande, contactez-nous :
          </p>
          <p className="font-montserrat text-gray-900">
            📧 <strong>parkourBA33@gmail.com</strong>
          </p>
          <p className="font-montserrat text-sm text-gray-600 mt-2">
            (N'oubliez pas de mentionner votre numéro de transaction)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/"
            className="flex-1 bg-primary hover:bg-secondary text-white px-6 py-4 rounded-lg font-montserrat font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
          >
            <Home size={24} />
            <span>Retour à l'accueil</span>
          </a>
          
          <a
            href="/boutique"
            className="flex-1 bg-white hover:bg-gray-50 text-primary border-2 border-primary px-6 py-4 rounded-lg font-montserrat font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
          >
            <ShoppingCart size={24} />
            <span>Continuer les achats</span>
          </a>
        </div>

        <div className="mt-6 text-center">
          <p className="font-montserrat text-sm text-gray-500">
            Vous pouvez fermer cette page en toute sécurité. Votre paiement a bien été enregistré.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-4">
          Informations de livraison
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
              Prénom *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
                                             placeholder="ex: Martin"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
            />
          </div>
          
          <div>
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
                             placeholder="ex: John"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
                             placeholder="ex: martinjohn@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
            />
          </div>
          
          <div>
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
              Téléphone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
                             placeholder="ex: 06 12 34 56 78"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
            Adresse *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
                           placeholder="ex: 123 Rue de la Paix"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
              Ville *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
                             placeholder="ex: Bordeaux"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
            />
          </div>
          
          <div>
            <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
              Code postal *
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
                             placeholder="ex: 33000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-4">
          Paiement sécurisé
        </h3>
        
        <div className="border border-gray-300 rounded-lg p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#000000',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        
        <div className="flex items-center space-x-2 mt-3 text-sm text-gray-600">
          <Shield size={16} className="text-primary" />
          <span className="font-montserrat">Paiement sécurisé par Stripe</span>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle size={20} className="text-red-500" />
          <span className="text-red-700 font-montserrat">{error}</span>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-primary hover:bg-secondary disabled:bg-gray-400 text-white font-montserrat font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Traitement en cours...</span>
          </>
        ) : (
          <>
            <CreditCard size={20} />
            <span>Payer {total.toFixed(2)}€</span>
          </>
        )}
      </button>
    </form>
  )
}

export default CheckoutForm 