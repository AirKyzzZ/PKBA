'use client'

import { motion } from 'framer-motion'
import { Users, Clock, MapPin, Award, Calendar, Zap } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Users,
      title: 'Groupes de Niveaux',
      description: 'Débutant, intermédiaire et confirmé pour progresser à votre rythme.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Clock,
      title: 'Horaires Flexibles',
      description: 'Séances en semaine et week-end pour s\'adapter à tous les emplois du temps.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MapPin,
      title: 'Lieux Variés',
      description: 'Entraînements en salle et en extérieur pour découvrir différents environnements.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Award,
      title: 'Coach Professionnel',
      description: 'Encadrement par un coach diplômé et expérimenté en parkour.',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Calendar,
      title: 'Événements Réguliers',
      description: 'Compétitions, sorties et rencontres avec d\'autres clubs.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Zap,
      title: 'Progression Garantie',
      description: 'Méthodes d\'apprentissage éprouvées pour des résultats rapides.',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cheddar font-bold text-gray-900 mb-6">
            Nos Atouts
          </h2>
          <p className="text-xl font-montserrat text-gray-600 max-w-3xl mx-auto">
            Découvrez ce qui fait la force de PKBA et pourquoi nous sommes le choix idéal 
            pour votre progression en parkour.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-montserrat leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-cheddar font-bold mb-4">
              PKBA en Chiffres
            </h3>
            <p className="text-xl font-montserrat text-white/90">
              Une communauté qui grandit et progresse ensemble
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '3', label: 'Niveaux' },
              { number: '12+', label: 'Heures/semaine' },
               { number: '2', label: 'Lieux d\'entraînement' },
              { number: '∞', label: 'Possibilités' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-cheddar font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-montserrat font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features 