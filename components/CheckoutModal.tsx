'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Truck, Shield, User, Mail, Phone } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { CartItem } from './CartContext'

// Initialize Stripe (replace with your actual publishable key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here')

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  description: string
  features: string[]
  colors: string[]
  sizes: string[]
  customization: boolean
}

interface CheckoutModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

const CheckoutModal = ({ product, isOpen, onClose }: CheckoutModalProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [customName, setCustomName] = useState('')
  const [quantity, setQuantity] = useState(1)

  const totalPrice = product.price * quantity

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative inline-block w-full max-w-4xl bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-cheddar font-bold">
                    Finaliser votre commande
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-white hover:text-gray-200 transition-colors duration-200"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Product Details */}
                <div className="p-6 bg-gray-50">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 font-montserrat">
                        {product.description}
                      </p>
                    </div>

                    {/* Product Options */}
                    <div className="space-y-4">
                      {/* Color Selection */}
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Couleur
                        </label>
                        <div className="flex space-x-2">
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                                selectedColor === color
                                  ? 'border-primary bg-primary text-white'
                                  : 'border-gray-300 hover:border-primary'
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Size Selection */}
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Taille
                        </label>
                        <div className="flex space-x-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                                selectedSize === size
                                  ? 'border-primary bg-primary text-white'
                                  : 'border-gray-300 hover:border-primary'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Customization */}
                      {product.customization && (
                        <div>
                          <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                            Nom de l'athlète (optionnel)
                          </label>
                          <input
                            type="text"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            placeholder="Votre nom ou surnom"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                          />
                        </div>
                      )}

                      {/* Quantity */}
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Quantité
                        </label>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-montserrat font-medium">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-montserrat text-gray-600">
                          Prix unitaire
                        </span>
                        <span className="font-cheddar font-bold text-gray-900">
                          {product.price}€
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-montserrat text-gray-600">
                          Quantité
                        </span>
                        <span className="font-montserrat font-medium text-gray-900">
                          {quantity}
                        </span>
                      </div>
                      {product.customization && customName && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-montserrat text-gray-600">
                            Personnalisation
                          </span>
                          <span className="font-montserrat font-medium text-gray-900">
                            +5€
                          </span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-cheddar font-bold text-lg text-gray-900">
                            Total
                          </span>
                          <span className="font-cheddar font-bold text-xl text-primary">
                            {totalPrice + (product.customization && customName ? 5 : 0)}€
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout Form */}
                <div className="p-6">
                  <Elements stripe={stripePromise}>
                    {(() => {
                      const cartItems: CartItem[] = [
                        {
                          id: `${product.id}-${selectedColor}-${selectedSize}-${customName || 'std'}`,
                          name: product.name,
                          price: product.price,
                          color: selectedColor,
                          size: selectedSize,
                          quantity: quantity,
                          customization: product.customization && customName ? customName : undefined,
                          image: product.image,
                        },
                      ]
                      const total = totalPrice + (product.customization && customName ? 5 : 0)
                      return (
                        <CheckoutForm
                          items={cartItems}
                          total={total}
                          onSuccess={onClose}
                          onError={(e) => {
                            console.error('Checkout error in modal:', e)
                          }}
                        />
                      )
                    })()}
                  </Elements>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CheckoutModal 