'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, Truck, Shield, CreditCard } from 'lucide-react'
import ProductCard from './ProductCard'

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

const BoutiquePage = () => {

  const products = [
    {
      id: 1,
      name: 'T-shirt officiel PKBA',
      price: 19.99,
      originalPrice: 24.99,
      image: '/images/mockups/tshirt/front_white.png',
      description: 'T-shirt officiel du club PKBA, design exclusif haute qualité pour les performances sportives et le confort.',
      features: ['100% coton premium', 'Design exclusif PKBA', 'Haute qualité pour performances sportives', 'Confort optimal'],
      colors: ['Blanc', 'Noir'],
      sizes: ['5-6', '7-8', '9-11', '12-13', 'S', 'M', 'L', 'XL', '2XL'],
      customization: true,
      available: true
    },
    {
      id: 2,
      name: 'Sweat à capuche PKBA',
      price: 49.99,
      originalPrice: 49.99,
      image: '/images/mockups/hoodie/front-black.png',
      description: 'Le sweat à capuche officiel PKBA, parfait pour vos entraînements et vos moments de détente. Confort absolu et style unique pour représenter fièrement votre club.',
      features: ['Design exclusif PKBA', 'Confort optimal toute saison', '100% coton extérieur', 'Idéal entraînement et quotidien'],
      colors: ['Noir', 'Blanc'],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      customization: false,
      available: true
    },
    {
      id: 3,
      name: 'Short athlétique PKBA',
      price: 34.99,
      originalPrice: 34.99,
      image: '/images/mockups/shorts/shorts-front.png',
      description: 'Le short officiel PKBA conçu pour la performance. Liberté de mouvement maximale pour vos entraînements de parkour les plus intenses sur le Bassin d\'Arcachon.',
      features: ['Design exclusif PKBA', 'Polyester recyclé écoresponsable', 'Séchage ultra-rapide', 'Parfait pour le parkour'],
      colors: ['Blanc'],
      sizes: ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'],
      customization: false,
      available: true
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Paiement sécurisé',
      description: 'Stripe - Protection des données'
    },
    {
      icon: Star,
      title: 'Qualité garantie',
      description: 'Produits officiels PKBA'
    },
    {
      icon: CreditCard,
      title: 'Retours faciles',
      description: '30 jours pour changer d\'avis'
    },
    {
      icon: Truck,
      title: 'Livraison rapide',
      description: '8-10 jours ouvrés'
    }
  ]

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-cheddar font-bold mb-6">
              Boutique officielle PKBA
            </h1>
            <p className="text-xl font-montserrat max-w-3xl mx-auto leading-relaxed">
              Découvrez notre collection officielle PKBA : T-shirts personnalisables, sweats à capuche et shorts athlétiques. 
              Affichez fièrement vos couleurs !
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <benefit.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-cheddar font-bold text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm font-montserrat text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-cheddar font-bold text-gray-900 mb-4">
              Nos produits
            </h2>
            <p className="text-lg font-montserrat text-gray-600 max-w-2xl mx-auto">
              Collection officielle PKBA - Qualité premium et design exclusif
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <ProductCard
                  product={product}
                  onSelect={() => {
                    if (product.available) {
                      if (product.id === 1) {
                        window.location.href = '/boutique/tshirt'
                      } else if (product.id === 2) {
                        window.location.href = '/boutique/hoodie'
                      } else if (product.id === 3) {
                        window.location.href = '/boutique/shorts'
                      }
                    } else {
                      alert('Ce produit sera bientôt disponible !')
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Info */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-cheddar font-bold text-gray-900 mb-6">
              Personnalisation disponible
            </h2>
            <p className="text-lg font-montserrat text-gray-600 max-w-3xl mx-auto">
              Ajoutez le nom de l'athlète sur votre T-shirt pour un look unique et personnalisé ! 
              (Personnalisation disponible uniquement pour le T-shirt)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
                Comment ça marche ?
              </h3>
              <div className="space-y-4 font-montserrat text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <strong>Choisissez votre T-shirt</strong>
                    <p className="text-sm mt-1">Sélectionnez la couleur qui vous plaît</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <strong>Personnalisez</strong>
                    <p className="text-sm mt-1">Ajoutez le nom de l'athlète (optionnel)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <strong>Commande sécurisée</strong>
                    <p className="text-sm mt-1">Paiement Stripe et livraison rapide</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <h4 className="text-xl font-cheddar font-bold text-gray-900 mb-4">
                Informations de Livraison
              </h4>
              <div className="space-y-3 font-montserrat text-gray-600">
                <div className="flex items-center space-x-3">
                  <Truck size={20} className="text-primary" />
                  <span>Livraison 3-5 jours ouvrés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield size={20} className="text-primary" />
                  <span>Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star size={20} className="text-primary" />
                  <span>Qualité premium garantie</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default BoutiquePage 