'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Euro, Users, Trophy, ArrowRight, Calendar } from 'lucide-react'

const ScheduleHighlight = () => {
  const quickStats = [
    { icon: Calendar, label: 'Dates', value: '7-23 février 2026' },
    { icon: Clock, label: 'Jours', value: 'Lun/Mar/Jeu/Ven' },
    { icon: Users, label: 'Groupes', value: '2 groupes d\'âge' },
    { icon: Trophy, label: 'Places', value: 'Limitées !' }
  ]

  const featuredSessions = [
    { day: 'Moins de 12 ans', time: '14h-16h', groups: 'Lun/Mar/Jeu/Ven', type: 'loisir' },
    { day: 'Plus de 12 ans', time: '16h-18h', groups: 'Lun/Mar/Jeu/Ven', type: 'mixte' }
  ]

  return (
    <section className="py-16 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cheddar font-bold text-gray-900 mb-4 sm:mb-6">
            Stage de Février 2026
          </h2>
          <p className="text-lg sm:text-xl font-montserrat text-gray-600 max-w-3xl mx-auto px-4">
            Profitez des vacances de février pour un stage intensif de parkour ! Cours les lundis, mardis, jeudis et vendredis avec groupes adaptés par âge.
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
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center border border-gray-100"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <stat.icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="text-lg sm:text-xl font-cheddar font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 font-montserrat">
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
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
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
                    session.type === 'loisir'
                      ? 'border-primary bg-primary/5'
                      : 'border-secondary bg-secondary/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{session.day}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      session.type === 'loisir'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/10 text-secondary'
                    }`}>
                      {session.type === 'loisir' ? 'Loisirs' : 'Mixte'}
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

          {/* Pricing & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-cheddar font-bold text-gray-900">
                Avantages du Stage
              </h3>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { text: '2 semaines de stage', sub: 'Progression rapide pendant les vacances' },
                { text: 'Coach professionnel', sub: 'Encadrement diplômé et expérimenté' },
                { text: 'Groupes adaptés', sub: 'Par âge et niveau pour un meilleur apprentissage' },
                { text: 'Activité vacances', sub: 'Une façon sportive et fun d\'occuper les vacances' },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.text}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Euro size={18} className="text-amber-600" />
                <p className="text-amber-900 font-montserrat font-semibold text-sm">
                  Tarifs du stage
                </p>
              </div>
              <div className="text-sm text-amber-800 space-y-1 text-center">
                <p><strong>Non licenciés :</strong> 15€/séance · Pack 4 séances : 10€</p>
                <p><strong>Licenciés :</strong> 10€/séance</p>
              </div>
            </div>

            <Link
              href="/inscription"
              className="group w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-montserrat font-bold text-center transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-md"
            >
              <Calendar size={20} />
              <span>S'inscrire au stage</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ScheduleHighlight
