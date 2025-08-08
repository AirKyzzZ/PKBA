'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Mail, Truck, Home } from 'lucide-react'
import Link from 'next/link'

const SuccessPage = () => {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle size={80} className="text-green-500 mx-auto" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-cheddar font-bold text-gray-900 mb-6">
            Commande confirmée !
          </h1>
          
          <p className="text-xl font-montserrat text-gray-600 mb-8 max-w-2xl mx-auto">
            Merci pour votre commande ! Votre T-shirt officiel PKBA sera bientôt entre vos mains.
          </p>

          {/* Order Details */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-6">
              Détails de votre commande
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-primary" />
                  <div>
                    <h3 className="font-cheddar font-bold text-gray-900">Email de confirmation</h3>
                    <p className="text-gray-600 font-montserrat">Vous recevrez un email de confirmation dans quelques minutes</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Truck size={20} className="text-primary" />
                  <div>
                    <h3 className="font-cheddar font-bold text-gray-900">Livraison</h3>
                    <p className="text-gray-600 font-montserrat">Livraison en 5-8 jours ouvrés</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-cheddar font-bold text-gray-900 mb-2">Suivi de commande</h3>
                  <p className="text-gray-600 font-montserrat">
                    Vous recevrez un email avec le numéro de suivi dès que votre commande sera expédiée.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-cheddar font-bold text-gray-900 mb-2">Support client</h3>
                  <p className="text-gray-600 font-montserrat">
                    Pour toute question, contactez-nous à contact@pkba.fr
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-cheddar font-bold text-blue-900 mb-4">
              Prochaines étapes
            </h3>
            <div className="space-y-3 text-blue-800 font-montserrat">
              <p>• Vous recevrez un email de confirmation avec les détails de votre commande</p>
              <p>• Votre T-shirt sera personnalisé selon vos spécifications</p>
              <p>• Vous recevrez un email de suivi dès l'expédition</p>
              <p>• Livraison à votre adresse en 5-8 jours ouvrés</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-montserrat font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Home size={20} />
              <span>Retour à l'accueil</span>
            </Link>
            
            <Link
              href="/boutique"
              className="bg-white hover:bg-gray-50 text-primary border-2 border-primary px-8 py-3 rounded-lg font-montserrat font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Continuer les achats</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SuccessPage
