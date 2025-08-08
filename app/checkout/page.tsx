'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/components/CartContext'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, Truck, Shield, CreditCard } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '@/components/CheckoutForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const CheckoutPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const shippingCost = 4.99
  const subtotal = getTotalPrice()
  const total = subtotal + shippingCost

  useEffect(() => {
    if (items.length === 0) {
      router.push('/boutique')
    }
  }, [items, router])

  if (items.length === 0) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h1>
          <p className="text-gray-600 font-montserrat mb-6">
            Ajoutez des produits à votre panier pour continuer
          </p>
          <button
            onClick={() => router.push('/boutique')}
            className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-montserrat font-medium transition-all duration-200"
          >
            Retourner à la boutique
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-cheddar font-bold mb-4">
              Finaliser votre commande
            </h1>
            <p className="text-lg font-montserrat max-w-2xl mx-auto">
              Récapitulatif de votre panier et informations de livraison
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cart Review */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-cheddar font-bold text-gray-900">
              Votre panier ({items.length} article{items.length > 1 ? 's' : ''})
            </h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {items.map((item, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 font-montserrat text-sm">
                          T-shirt
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-cheddar font-bold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-montserrat">
                          Couleur: {item.color === 'white' ? 'Blanc' : 'Noir'} | 
                          Taille: {item.size}
                          {item.customization && ` | Personnalisation: ${item.customization}`}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center font-montserrat font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-cheddar font-bold text-gray-900">
                          {((item.price + (item.customization ? 5 : 0)) * item.quantity).toFixed(2)}€
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 mt-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6">
                <h3 className="font-cheddar font-bold text-gray-900 mb-4">
                  Récapitulatif de la commande
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-montserrat text-gray-600">Sous-total:</span>
                    <span className="font-cheddar font-bold">{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-montserrat text-gray-600">Livraison:</span>
                    <span className="font-cheddar font-bold">{shippingCost.toFixed(2)}€</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-cheddar font-bold text-lg">Total:</span>
                    <span className="font-cheddar font-bold text-lg text-primary">
                      {total.toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Truck size={20} className="text-blue-600" />
                <h3 className="font-cheddar font-bold text-blue-900">
                  Informations de livraison
                </h3>
              </div>
              <ul className="space-y-2 text-blue-800 text-sm font-montserrat">
                <li>• Livraison en 5-8 jours ouvrés</li>
                <li>• Frais de livraison: 4.99€ (obligatoire)</li>
                <li>• Suivi de commande par email</li>
                <li>• Retours acceptés sous 30 jours</li>
              </ul>
            </div>
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-cheddar font-bold text-gray-900">
              Informations de livraison
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  items={items}
                  total={total}
                  onSuccess={() => {
                    clearCart()
                    router.push('/checkout/success')
                  }}
                  onError={(error) => {
                    console.error('Payment error:', error)
                    setIsProcessing(false)
                  }}
                />
              </Elements>
            </div>

            {/* Security Info */}
            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Shield size={20} className="text-green-600" />
                <h3 className="font-cheddar font-bold text-green-900">
                  Paiement sécurisé
                </h3>
              </div>
              <ul className="space-y-2 text-green-800 text-sm font-montserrat">
                <li>• Paiement 100% sécurisé avec Stripe</li>
                <li>• Vos données sont protégées</li>
                <li>• Aucune information bancaire stockée</li>
                <li>• Support client disponible</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
