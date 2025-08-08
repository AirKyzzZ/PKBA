'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, ShoppingBag, Users } from 'lucide-react'

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-cheddar font-bold text-white mb-6">
            Prêt à Rejoindre PKBA ?
          </h2>
          <p className="text-xl font-montserrat text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ne manquez pas l'opportunité de faire partie de cette aventure exceptionnelle. 
            Les inscriptions pour la saison 2025/2026 sont maintenant ouvertes !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Users,
              title: 'Rejoindre le Club',
              description: 'Inscription pour la saison 2025/2026',
              href: '/inscription',
              color: 'bg-primary hover:bg-secondary',
              delay: 0.2
            },
            {
              icon: ShoppingBag,
              title: 'Boutique Officielle',
              description: 'T-shirts et goodies PKBA',
              href: '/boutique',
              color: 'bg-white text-primary hover:bg-gray-100',
              delay: 0.4
            },
            {
              icon: Calendar,
              title: 'Découvrir le Planning',
              description: 'Horaires et lieux d\'entraînement',
              href: '/actualites',
              color: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary',
              delay: 0.6
            }
          ].map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: action.delay }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                href={action.href}
                className={`block p-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${action.color}`}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200">
                    <action.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-cheddar font-bold">
                    {action.title}
                  </h3>
                  <p className="font-montserrat text-sm opacity-90">
                    {action.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm font-montserrat font-medium">
                    <span>En savoir plus</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-cheddar font-bold text-white mb-4">
                Questions Fréquentes
              </h3>
              <div className="space-y-4 font-montserrat text-gray-300">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Quel âge pour commencer ?</strong>
                    <p className="text-sm mt-1">À partir de 6 ans avec autorisation parentale</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Équipement nécessaire ?</strong>
                    <p className="text-sm mt-1">Tenue sportive confortable, nous fournissons le reste</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Niveau requis ?</strong>
                    <p className="text-sm mt-1">Tous niveaux acceptés, groupes adaptés</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-primary rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Calendar size={40} className="text-white" />
              </div>
              <h4 className="text-xl font-cheddar font-bold text-white mb-2">
                Lancement Septembre 2025
              </h4>
              <p className="font-montserrat text-gray-300">
                Inscrivez-vous dès maintenant pour être parmi les premiers !
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA 