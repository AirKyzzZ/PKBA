'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Euro, MapPin, Users, Trophy, ArrowRight, Calendar } from 'lucide-react'

const ScheduleHighlight = () => {
  const quickStats = [
    { icon: Calendar, label: 'Dates', value: '22-23 & 29-30 déc.', color: 'text-red-600' },
    { icon: Clock, label: 'Durée', value: '4 jours de stage', color: 'text-blue-600' },
    { icon: Users, label: 'Groupes', value: '3 groupes d\'âge', color: 'text-green-600' },
    { icon: Trophy, label: 'Places', value: 'Limitées !', color: 'text-orange-600' }
  ]

  const featuredSessions = [
    { day: 'Moins de 12 ans', time: '10h30-12h30', groups: '22-23 & 29-30 déc.', type: 'loisir' },
    { day: 'Plus de 12 ans', time: '14h-16h', groups: '22-23 & 29-30 déc.', type: 'mixte' },
    { day: 'Groupe Compétition', time: '16h-18h', groups: '22-23 & 29-30 déc.', type: 'performance' }
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
            🎄 Stage de Noël 2025
          </h2>
                     <p className="text-lg sm:text-xl font-montserrat text-gray-600 max-w-3xl mx-auto px-4">
             Profitez des vacances de Noël pour un stage intensif de parkour ! 4 jours d'entraînement avec groupes adaptés par âge et niveau.
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
                Horaires du Stage
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
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-cheddar font-bold text-gray-900">
                Avantages du Stage
              </h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">4 jours intensifs</div>
                    <div className="text-sm text-gray-600 mt-1">Progression rapide pendant les vacances</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Coach professionnel</div>
                    <div className="text-sm text-gray-600 mt-1">Encadrement diplômé et expérimenté</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Groupes adaptés</div>
                    <div className="text-sm text-gray-600 mt-1">Par âge et niveau pour un meilleur apprentissage</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Activité vacances</div>
                    <div className="text-sm text-gray-600 mt-1">Une façon sportive et fun d'occuper les vacances</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-300 rounded-lg p-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Euro size={20} className="text-orange-600" />
                  <p className="text-orange-900 font-montserrat font-semibold">
                    Stage payant
                  </p>
                </div>
                <div className="text-sm text-orange-900 space-y-1 text-center">
                  <p><strong>Non licenciés :</strong> 15€/séance • Pack 4 séances : 10€</p>
                  <p><strong>Licenciés :</strong> 10€/séance</p>
                </div>
              </div>
            </div>

            <Link
              href="/inscription"
              className="group w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-montserrat font-bold text-center transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Calendar size={20} />
              <span>S'inscrire au stage</span>
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
              Inscrivez-vous au stage de Noël !
            </h3>
            <p className="text-lg mb-6 opacity-90">
              4 jours de parkour intensif pendant les vacances - Places limitées, inscrivez-vous rapidement !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inscription"
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105 shadow-lg"
              >
                S'inscrire au stage
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ScheduleHighlight
