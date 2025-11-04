'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Truck, Shield, Star, Ruler, CheckCircle } from 'lucide-react'
import { useCart } from '@/components/CartContext'
import ImageGallery from '@/components/ImageGallery'

type ColorName = 'white'

const ShortsPage = () => {
  const [selectedColor, setSelectedColor] = useState<ColorName>('white')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const { addToCart } = useCart()

  const product = {
    id: 'pkba-shorts-2025',
    name: 'Short athlétique PKBA',
    price: 29.99,
    description: 'Le short officiel du club PKBA, spécialement conçu pour la performance. Offrant une liberté de mouvement maximale, il est parfait pour vos entraînements de parkour les plus intenses sur le Bassin d\'Arcachon. Tissu technique respirant et séchage rapide pour rester au top de votre forme. Affichez fièrement vos couleurs pendant vos sessions !',
    features: [
      '91% polyester recyclé, 9% élasthanne',
      'Poids du tissu : 174 g/m² (5,13 oz/yd²)',
      'Tissu microfibre extensible dans les quatre sens',
      'Matériau respirant et à séchage rapide',
      'Protection SPF : 50+',
      'Ceinture élastique avec cordon plat blanc',
      'Poches latérales en maille'
    ],
    colors: [
      { name: 'white', label: 'Blanc', hex: '#FFFFFF' }
    ],
    sizes: [
      { value: '2XS', label: '2XS - Double Extra Small' },
      { value: 'XS', label: 'XS - Extra Small' },
      { value: 'S', label: 'S - Small' },
      { value: 'M', label: 'M - Medium' },
      { value: 'L', label: 'L - Large' },
      { value: 'XL', label: 'XL - Extra Large' },
      { value: '2XL', label: '2XL - Double Extra Large' },
      { value: '3XL', label: '3XL - Triple Extra Large' },
      { value: '4XL', label: '4XL - Quadruple Extra Large' },
      { value: '5XL', label: '5XL - Quintuple Extra Large' },
      { value: '6XL', label: '6XL - Sextuple Extra Large' }
    ]
  }

  // Multiple images for white shorts
  const productImages = [
    { id: 'white-front', src: '/images/mockups/shorts/shorts-front.png', alt: 'Short PKBA Blanc - Vue de face', color: 'white' as const },
    { id: 'white-back', src: '/images/mockups/shorts/shorts-back.png', alt: 'Short PKBA Blanc - Vue de dos', color: 'white' as const },
    { id: 'white-men-front', src: '/images/mockups/shorts/men-front.png', alt: 'Short PKBA Blanc - Porté homme face', color: 'white' as const },
    { id: 'white-men-back', src: '/images/mockups/shorts/men-back.png', alt: 'Short PKBA Blanc - Porté homme dos', color: 'white' as const },
    { id: 'white-women-front', src: '/images/mockups/shorts/women-front.png', alt: 'Short PKBA Blanc - Porté femme face', color: 'white' as const },
    { id: 'white-women-back', src: '/images/mockups/shorts/women-back.png', alt: 'Short PKBA Blanc - Porté femme dos', color: 'white' as const },
    { id: 'white-women-side', src: '/images/mockups/shorts/women-side.png', alt: 'Short PKBA Blanc - Porté femme côté', color: 'white' as const }
  ]

  const sizeGuide = [
    { size: '2XS', waist: '66-71', length: '41' },
    { size: 'XS', waist: '71-76', length: '43' },
    { size: 'S', waist: '76-81', length: '44' },
    { size: 'M', waist: '81-86', length: '46' },
    { size: 'L', waist: '86-91', length: '48' },
    { size: 'XL', waist: '91-97', length: '50' },
    { size: '2XL', waist: '97-102', length: '51' },
    { size: '3XL', waist: '102-107', length: '53' },
    { size: '4XL', waist: '107-112', length: '55' },
    { size: '5XL', waist: '112-117', length: '56' },
    { size: '6XL', waist: '117-122', length: '58' }
  ]

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille')
      return
    }

    const cartItem = {
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
      image: '/images/mockups/shorts/shorts-front.png'
    }

    addToCart(cartItem)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const totalPrice = product.price * quantity

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
              Short athlétique officiel PKBA - Performance et confort
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
                    <div className="text-center">
                      <div className="font-medium">{size.value}</div>
                    </div>
                  </button>
                ))}
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
                Livraison en 8-10 jours ouvrés. Frais de livraison: 4.99€
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
                      Tour de taille (cm)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Longueur (cm)
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
                        {size.waist}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {size.length}
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
              Livraison en 8-10 jours ouvrés
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

export default ShortsPage

