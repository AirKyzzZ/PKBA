'use client'

import { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { motion } from 'framer-motion'
import { CreditCard, User, Mail, Phone, MapPin, CheckCircle, AlertCircle, Shield } from 'lucide-react'
import emailjs from '@emailjs/browser'
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
      await emailjs.send(
        'service_pkba', // Replace with your EmailJS service ID
        'template_pkba_order', // Replace with your EmailJS template ID
        {
          to_email: 'maxime.mansiet@gmail.com',
          order_details: JSON.stringify(orderData, null, 2),
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          items_summary: items.map(item => 
            `${item.name} - ${item.color === 'white' ? 'Blanc' : 'Noir'} - Taille ${item.size}${item.customization ? ` - Personnalisation: ${item.customization}` : ''} x${item.quantity}`
          ).join('\n'),
          total_amount: total
        },
        'your_user_id' // Replace with your EmailJS user ID
      )
    } catch (error) {
      console.error('Error sending email notification:', error)
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
          amount: total * 100, // Convert to cents
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
        
        // Send order notification
        const orderData = {
          paymentIntentId: paymentIntent.id,
          items: items,
          total: total,
          customer: formData
        }
        
        await sendOrderNotification(orderData)
        
        // Call success callback
        setTimeout(() => {
          onSuccess()
        }, 3000)
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-cheddar font-bold text-gray-900 mb-2">
          Commande confirmée !
        </h3>
        <p className="text-gray-600 font-montserrat">
          Votre commande a été traitée avec succès. Vous recevrez un email de confirmation dans quelques minutes.
        </p>
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
            <span>Payer {total}€</span>
          </>
        )}
      </button>
    </form>
  )
}

export default CheckoutForm 