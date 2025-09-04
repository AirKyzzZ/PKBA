'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Euro, MapPin, Users, Trophy, ArrowRight, Calendar } from 'lucide-react'

const ScheduleHighlight = () => {
  const quickStats = [
    { icon: Clock, label: 'Horaires', value: '4 jours/semaine', color: 'text-blue-600' },
    { icon: Users, label: 'Groupes', value: 'Par âge & niveau', color: 'text-green-600' },
    { icon: Calendar, label: 'Saison', value: '2025/2026', color: 'text-purple-600' },
    { icon: Euro, label: 'Tarifs', value: 'À partir de 250€', color: 'text-orange-600' }
  ]

  const featuredSessions = [
    { day: 'Mercredi', time: '13h-20h30', groups: 'Tous âges', type: 'loisir' },
    { day: 'Samedi', time: '13h30-17h', groups: '6-8 ans + Perf', type: 'mixte' },
    { day: 'Mardi/Vendredi', time: '17h-20h30', groups: 'Performance', type: 'performance' }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cheddar font-bold text-gray-900 mb-4 sm:mb-6">
            Horaires & Tarifs
          </h2>
                     <p className="text-lg sm:text-xl font-montserrat text-gray-600 max-w-3xl mx-auto px-4">
             Découvrez nos créneaux d'entraînement et nos tarifs transparents pour la saison 2025/2026. Lieux d'entraînement à définir.
           </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-lg bg-gray-100 flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="text-lg sm:text-xl font-cheddar font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-montserrat">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Featured Sessions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-cheddar font-bold text-gray-900">
                Créneaux Populaires
              </h3>
            </div>
            
            <div className="space-y-4">
              {featuredSessions.map((session, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-4 rounded-lg border-l-4 ${
                    session.type === 'performance' 
                      ? 'border-red-500 bg-red-50' 
                      : session.type === 'loisir'
                      ? 'border-green-500 bg-green-50'
                      : 'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{session.day}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      session.type === 'performance' 
                        ? 'bg-red-100 text-red-700' 
                        : session.type === 'loisir'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {session.type === 'performance' ? 'Performance' : session.type === 'loisir' ? 'Loisirs' : 'Mixte'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Users className="w-4 h-4" />
                    <span>{session.groups}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Euro className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-cheddar font-bold text-gray-900">
                Tarifs Transparents
              </h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">6-8 ans</div>
                  <div className="text-sm text-gray-600">1h par semaine</div>
                </div>
                <div className="text-2xl font-bold text-green-600">250€</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">8-12 ans</div>
                  <div className="text-sm text-gray-600">1h30 par semaine</div>
                </div>
                <div className="text-2xl font-bold text-blue-600">265€</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Performance</div>
                  <div className="text-sm text-gray-600">2-3 séances/semaine</div>
                </div>
                <div className="text-2xl font-bold text-red-600">365€</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Tout inclus :</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• Assurance (17,19€)</div>
                <div>• Part FFGYM (26,50€)</div>
                <div>• Part comité régional (17€)</div>
                <div>• Part comité départemental (4,50€)</div>
              </div>
            </div>

            <Link
              href="/horaires"
              className="group w-full bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-montserrat font-semibold text-center transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Voir tous les horaires</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-cheddar font-bold mb-4">
              Prêt à commencer votre aventure ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Rejoignez PKBA et découvrez le parkour dans un cadre sécurisé et professionnel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inscription"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
              >
                S'inscrire maintenant
              </Link>
              <Link
                href="/horaires"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
              >
                Voir les horaires complets
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ScheduleHighlight
