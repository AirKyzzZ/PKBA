'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Truck, Shield, Star, Ruler, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useCart } from '@/components/CartContext'
import ImageGallery from '@/components/ImageGallery'

type ColorName = 'white' | 'black'

const TshirtPage = () => {
  const [selectedColor, setSelectedColor] = useState<ColorName>('white')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [customization, setCustomization] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [customizationError, setCustomizationError] = useState('')
  
  const { addToCart } = useCart()

  const MAX_CUSTOMIZATION_LENGTH = 7

  // Fonction pour vérifier si la taille sélectionnée est une taille enfant
  const isChildSize = (size: string) => {
    return ['5-6', '7-8', '9-11', '12-13'].includes(size)
  }

  const handleCustomizationChange = (value: string) => {
    if (value.length <= MAX_CUSTOMIZATION_LENGTH) {
      setCustomization(value)
      setCustomizationError('')
    } else {
      setCustomizationError(`La personnalisation ne peut pas dépasser ${MAX_CUSTOMIZATION_LENGTH} caractères`)
    }
  }

  const product = {
    id: 'pkba-tshirt-2025',
    name: 'T-shirt Officiel PKBA',
    price: 19.99, // Reverted to original price
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
      // Tailles enfants
      { value: '5-6', label: '5-6 ans', isChild: true },
      { value: '7-8', label: '7-8 ans', isChild: true },
      { value: '9-11', label: '9-11 ans', isChild: true },
      { value: '12-13', label: '12-13 ans', isChild: true },
      // Tailles adultes
      { value: 'S', label: 'S - Small', isChild: false },
      { value: 'M', label: 'M - Medium', isChild: false },
      { value: 'L', label: 'L - Large', isChild: false },
      { value: 'XL', label: 'XL - Extra Large', isChild: false },
      { value: '2XL', label: '2XL - Double Extra Large', isChild: false }
    ]
  }

  // Multiple images for each color
  const productImages = [
    // White T-shirt images
    { id: 'white-front', src: '/images/mockups/front_white.png', alt: 'T-shirt PKBA Blanc - Vue de face', color: 'white' as const },
    { id: 'white-back', src: '/images/mockups/back_white.png', alt: 'T-shirt PKBA Blanc - Vue de dos', color: 'white' as const },
    { id: 'white-side', src: '/images/mockups/men_side_white.png', alt: 'T-shirt PKBA Blanc - Vue de côté', color: 'white' as const },
    { id: 'white-detail', src: '/images/mockups/front_and_back_white.png', alt: 'T-shirt PKBA Blanc - Vue avant et arrière', color: 'white' as const },
    { id: 'white-wear', src: '/images/mockups/men_front_white.png', alt: 'T-shirt PKBA Blanc - Porté', color: 'white' as const },
    
    // Black T-shirt images
    { id: 'black-front', src: '/images/mockups/front_black.png', alt: 'T-shirt PKBA Noir - Vue de face', color: 'black' as const },
    { id: 'black-back', src: '/images/mockups/back_black.png', alt: 'T-shirt PKBA Noir - Vue de dos', color: 'black' as const },
    { id: 'black-side', src: '/images/mockups/men_side_black.png', alt: 'T-shirt PKBA Noir - Vue de côté', color: 'black' as const },
    { id: 'black-detail', src: '/images/mockups/front_and_back_black.png', alt: 'T-shirt PKBA Noir - Vue avant et arrière', color: 'black' as const },
    { id: 'black-wear', src: '/images/mockups/men_front_black.png', alt: 'T-shirt PKBA Noir - Porté', color: 'black' as const }
  ]

  const sizeGuide = [
    // Tailles enfants
    { size: '5-6', chest: '58-63', length: '42', shoulders: '28', isChild: true },
    { size: '7-8', chest: '63-68', length: '46', shoulders: '30', isChild: true },
    { size: '9-11', chest: '68-73', length: '50', shoulders: '32', isChild: true },
    { size: '12-13', chest: '73-78', length: '54', shoulders: '34', isChild: true },
    // Tailles adultes
    { size: 'S', chest: '86-91', length: '66', shoulders: '43', isChild: false },
    { size: 'M', chest: '91-96', length: '68', shoulders: '45', isChild: false },
    { size: 'L', chest: '96-101', length: '70', shoulders: '47', isChild: false },
    { size: 'XL', chest: '101-106', length: '72', shoulders: '49', isChild: false },
    { size: '2XL', chest: '106-111', length: '74', shoulders: '51', isChild: false }
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
      image: `/images/mockups/front_${selectedColor}.png`
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
                    onClick={() => setSelectedColor(color.name as ColorName)}
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
              
              {/* Warning pour les tailles enfants */}
              {selectedSize && isChildSize(selectedSize) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                >
                  <div className="flex items-start space-x-2">
                    <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-amber-800 text-sm">
                      <p className="font-medium">Attention : Taille enfant sélectionnée</p>
                      <p>Les T-shirts en tailles enfants n'ont pas de logo sur les manches pour un confort optimal.</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
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
                    <div className="text-center">
                      <div className="font-medium">{size.value}</div>
                      {size.isChild && (
                        <div className="text-xs opacity-75">Enfant</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization */}
            <div>
              <h3 className="text-lg font-cheddar font-bold mb-3 text-gray-900">
                Personnalisation <span className="text-sm text-gray-500">(+5€)</span>
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nom de l'athlète (optionnel)"
                  value={customization}
                  onChange={(e) => handleCustomizationChange(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat bg-white text-gray-900 placeholder-gray-500 ${
                    customizationError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  maxLength={MAX_CUSTOMIZATION_LENGTH}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-600">
                    Ajoutez le nom de l'athlète sur le T-shirt pour un look unique
                  </p>
                  <span className={`text-sm font-medium ${
                    customization.length === MAX_CUSTOMIZATION_LENGTH ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {customization.length}/{MAX_CUSTOMIZATION_LENGTH}
                  </span>
                </div>
                {customizationError && (
                  <div className="flex items-center space-x-2 mt-2 text-red-600">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span className="text-sm font-medium">{customizationError}</span>
                  </div>
                )}
              </div>
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
          
          {/* Warning pour les tailles enfants */}
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <Info size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-amber-800">
                <p className="font-medium">Information importante sur les tailles enfants</p>
                <p className="text-sm mt-1">Les T-shirts en tailles enfants (5-6, 7-8, 9-11, 12-13) n'ont pas de logo sur les manches pour garantir un confort optimal et éviter toute irritation.</p>
              </div>
            </div>
          </div>
          
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sizeGuide.map((size) => (
                    <tr key={size.size} className={size.isChild ? 'bg-amber-50' : ''}>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {size.isChild ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Enfant
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Adulte
                          </span>
                        )}
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
