'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Star, Palette, Ruler } from 'lucide-react'

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

interface ProductCardProps {
  product: Product
  onSelect: () => void
}

const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
          <ShoppingCart size={48} className="text-primary" />
        </div>
        {product.originalPrice > product.price && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-montserrat font-bold">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-cheddar font-bold text-gray-900">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <Star size={16} className="text-yellow-400 fill-current" />
            <Star size={16} className="text-yellow-400 fill-current" />
            <Star size={16} className="text-yellow-400 fill-current" />
            <Star size={16} className="text-yellow-400 fill-current" />
          </div>
        </div>

        <p className="text-gray-600 font-montserrat text-sm mb-4">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl font-cheddar font-bold text-primary">
            {product.price}€
          </span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 line-through font-montserrat">
              {product.originalPrice}€
            </span>
          )}
        </div>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {product.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span className="text-sm font-montserrat text-gray-600">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Colors & Sizes */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2">
            <Palette size={16} className="text-gray-400" />
            <span className="text-sm font-montserrat text-gray-600">
              Couleurs: {product.colors.slice(0, 2).join(', ')}
              {product.colors.length > 2 && '...'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Ruler size={16} className="text-gray-400" />
            <span className="text-sm font-montserrat text-gray-600">
              Tailles: {product.sizes.join(', ')}
            </span>
          </div>
        </div>

        {/* Customization Badge */}
        {product.customization && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-montserrat font-medium bg-green-100 text-green-800">
              ✨ Personnalisable
            </span>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={onSelect}
          className="w-full bg-primary hover:bg-secondary text-white font-montserrat font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform group-hover:scale-105 flex items-center justify-center space-x-2"
        >
          <ShoppingCart size={20} />
          <span>Acheter maintenant</span>
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard 