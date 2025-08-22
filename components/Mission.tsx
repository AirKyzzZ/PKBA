'use client'

import { motion } from 'framer-motion'
import { Shield, TrendingUp, Heart } from 'lucide-react'

const Mission = () => {
  const missionPoints = [
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Encadrement professionnel et équipements adaptés pour une pratique en toute sécurité.',
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Progression',
      description: 'Méthodes d\'apprentissage structurées pour évoluer à votre rythme.',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Fun & Communauté',
      description: 'Ambiance conviviale et bienveillante pour partager votre passion du parkour.',
      color: 'text-red-600'
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cheddar font-bold text-gray-900 mb-4 sm:mb-6">
            Notre mission
          </h2>
          <p className="text-lg sm:text-xl font-montserrat text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Promouvoir la pratique du parkour au Bassin d'Arcachon avec un encadrement professionnel, 
            en privilégiant le plaisir, la progression et la sécurité de tous nos adhérents.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {missionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center ${point.color}`}>
                  <point.icon size={28} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-cheddar font-bold text-gray-900">
                  {point.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-montserrat leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 bg-white rounded-xl p-6 sm:p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-cheddar font-bold text-gray-900 mb-4">
                Pourquoi choisir PKBA ?
              </h3>
              <ul className="space-y-2 sm:space-y-3 font-montserrat text-gray-600 text-sm sm:text-base">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Coach professionnel diplômé et expérimenté</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Groupes de niveaux adaptés (débutant à confirmé)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Équipements de sécurité fournis</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Lieux d'entraînement variés et sécurisés</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Communauté bienveillante et motivante</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-6 sm:p-8 text-white">
              <h4 className="text-xl sm:text-2xl font-cheddar font-bold mb-4">
                Saison 2025/2026
              </h4>
              <p className="font-montserrat text-white/90 leading-relaxed text-sm sm:text-base">
                Rejoignez-nous dès septembre 2025 pour une saison exceptionnelle ! 
                Préinscriptions ouvertes pour tous les niveaux, à partir de 6 ans (avec autorisation parentale pour les mineurs).
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Mission 