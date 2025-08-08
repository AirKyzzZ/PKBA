'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Truck, Shield, Star, Ruler, CheckCircle } from 'lucide-react'
import { useCart } from '@/components/CartContext'
import ImageGallery from '@/components/ImageGallery'

const TshirtPage = () => {
  const [selectedColor, setSelectedColor] = useState('white')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [customization, setCustomization] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  
  const { addToCart } = useCart()

  const product = {
    id: 'pkba-tshirt-2024',
    name: 'T-shirt Officiel PKBA',
    price: 19.99,
    description: 'T-shirt officiel du club PKBA, design exclusif haute qualité pour les performances sportives et le confort. Parfait pour afficher fièrement vos couleurs et faire partie de l\'équipe.',
    features: [
      '100% coton premium',
      'Design exclusif PKBA',
      'Haute qualité pour performances sportives',
      'Confort optimal pour l\'entraînement',
      'Fabrication durable'
    ],
    colors: [
      { name: 'white', label: 'Blanc', hex: '#FFFFFF' },
      { name: 'black', label: 'Noir', hex: '#000000' }
    ],
    sizes: [
      { value: 'S', label: 'S - Small' },
      { value: 'M', label: 'M - Medium' },
      { value: 'L', label: 'L - Large' },
      { value: 'XL', label: 'XL - Extra Large' },
      { value: '2XL', label: '2XL - Double Extra Large' }
    ]
  }

  // Multiple images for each color
  const productImages = [
    // White T-shirt images
    { id: 'white-front', src: '/images/tshirt-white-front.jpg', alt: 'T-shirt PKBA Blanc - Vue de face', color: 'white' as const },
    { id: 'white-back', src: '/images/tshirt-white-back.jpg', alt: 'T-shirt PKBA Blanc - Vue de dos', color: 'white' as const },
    { id: 'white-side', src: '/images/tshirt-white-side.jpg', alt: 'T-shirt PKBA Blanc - Vue de côté', color: 'white' as const },
    { id: 'white-detail', src: '/images/tshirt-white-detail.jpg', alt: 'T-shirt PKBA Blanc - Détail du logo', color: 'white' as const },
    { id: 'white-wear', src: '/images/tshirt-white-wear.jpg', alt: 'T-shirt PKBA Blanc - Porté', color: 'white' as const },
    
    // Black T-shirt images
    { id: 'black-front', src: '/images/tshirt-black-front.jpg', alt: 'T-shirt PKBA Noir - Vue de face', color: 'black' as const },
    { id: 'black-back', src: '/images/tshirt-black-back.jpg', alt: 'T-shirt PKBA Noir - Vue de dos', color: 'black' as const },
    { id: 'black-side', src: '/images/tshirt-black-side.jpg', alt: 'T-shirt PKBA Noir - Vue de côté', color: 'black' as const },
    { id: 'black-detail', src: '/images/tshirt-black-detail.jpg', alt: 'T-shirt PKBA Noir - Détail du logo', color: 'black' as const },
    { id: 'black-wear', src: '/images/tshirt-black-wear.jpg', alt: 'T-shirt PKBA Noir - Porté', color: 'black' as const }
  ]

  const sizeGuide = [
    { size: 'S', chest: '86-91', length: '66', shoulders: '43' },
    { size: 'M', chest: '91-96', length: '68', shoulders: '45' },
    { size: 'L', chest: '96-101', length: '70', shoulders: '47' },
    { size: 'XL', chest: '101-106', length: '72', shoulders: '49' },
    { size: '2XL', chest: '106-111', length: '74', shoulders: '51' }
  ]

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille')
      return
    }

    const cartItem = {
      id: `${product.id}-${selectedColor}-${selectedSize}${customization ? `-${customization}` : ''}`,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
      customization: customization || undefined,
      image: `/images/tshirt-${selectedColor}.jpg`
    }

    addToCart(cartItem)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const totalPrice = (product.price + (customization ? 5 : 0)) * quantity

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-white">
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
              {product.name}
            </h1>
            <p className="text-lg font-montserrat max-w-2xl mx-auto">
              T-shirt officiel du club PKBA - Qualité premium et design exclusif
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <ImageGallery 
              images={productImages}
              selectedColor={selectedColor}
            />
            
            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-cheddar font-bold mb-3 text-gray-900">Couleur</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color.name
                        ? 'border-primary scale-110 shadow-lg'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Price and Description */}
            <div>
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-3xl font-cheddar font-bold text-gray-900">
                  {product.price.toFixed(2)}€
                </span>
                <span className="text-lg text-gray-500 line-through">
                  24.99€
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  -20%
                </span>
              </div>
              
              <p className="text-gray-700 font-montserrat leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-montserrat">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-cheddar font-bold mb-3 text-gray-900">Taille</h3>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`py-3 px-4 rounded-lg border-2 transition-all duration-200 font-montserrat ${
                      selectedSize === size.value
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700'
                    }`}
                  >
                    {size.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization */}
            <div>
              <h3 className="text-lg font-cheddar font-bold mb-3 text-gray-900">
                Personnalisation <span className="text-sm text-gray-500">(+5€)</span>
              </h3>
              <input
                type="text"
                placeholder="Nom de l'athlète (optionnel)"
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat bg-white text-gray-900 placeholder-gray-500"
                maxLength={20}
              />
              <p className="text-sm text-gray-600 mt-2">
                Ajoutez le nom de l'athlète sur le T-shirt pour un look unique
              </p>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-cheddar font-bold mb-3 text-gray-900">Quantité</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 bg-white text-gray-700"
                >
                  -
                </button>
                <span className="w-16 text-center font-montserrat font-medium text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 bg-white text-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-montserrat text-gray-700">Prix unitaire:</span>
                <span className="font-cheddar font-bold text-gray-900">{product.price.toFixed(2)}€</span>
              </div>
              {customization && (
                <div className="flex justify-between items-center mb-2">
                  <span className="font-montserrat text-gray-700">Personnalisation:</span>
                  <span className="font-cheddar font-bold text-gray-900">+5.00€</span>
                </div>
              )}
              <div className="flex justify-between items-center mb-2">
                <span className="font-montserrat text-gray-700">Quantité:</span>
                <span className="font-cheddar font-bold text-gray-900">{quantity}</span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between items-center">
                <span className="font-cheddar font-bold text-lg text-gray-900">Total:</span>
                <span className="font-cheddar font-bold text-lg text-primary">
                  {totalPrice.toFixed(2)}€
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full py-4 rounded-lg font-montserrat font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                selectedSize
                  ? 'bg-primary hover:bg-secondary text-white transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={20} />
              <span>Ajouter au panier</span>
            </button>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"
              >
                Produit ajouté au panier !
              </motion.div>
            )}

            {/* Shipping Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Truck size={20} className="text-blue-600" />
                <span className="font-cheddar font-bold text-blue-900">Livraison rapide</span>
              </div>
              <p className="text-blue-800 text-sm font-montserrat">
                Livraison en 5-8 jours ouvrés. Frais de livraison: 4.99€
              </p>
            </div>
          </motion.div>
        </div>

        {/* Size Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-cheddar font-bold text-center mb-8">
            Guide des Tailles
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taille
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Poitrine (cm)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Longueur (cm)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Épaules (cm)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sizeGuide.map((size) => (
                    <tr key={size.size}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {size.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {size.chest}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {size.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {size.shoulders}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-primary" />
            </div>
            <h3 className="font-cheddar font-bold text-gray-900 mb-2">
              Paiement Sécurisé
            </h3>
            <p className="text-gray-600 font-montserrat">
              Paiement 100% sécurisé avec Stripe
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck size={24} className="text-primary" />
            </div>
            <h3 className="font-cheddar font-bold text-gray-900 mb-2">
              Livraison Rapide
            </h3>
            <p className="text-gray-600 font-montserrat">
              Livraison en 5-8 jours ouvrés
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={24} className="text-primary" />
            </div>
            <h3 className="font-cheddar font-bold text-gray-900 mb-2">
              Qualité Garantie
            </h3>
            <p className="text-gray-600 font-montserrat">
              Produits officiels PKBA de qualité premium
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TshirtPage
