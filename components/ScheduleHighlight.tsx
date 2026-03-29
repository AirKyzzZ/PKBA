'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Euro, Users, Trophy, ArrowRight, Calendar, Sun, Zap } from 'lucide-react'

const ScheduleHighlight = () => {
  const quickStats = [
    { icon: Calendar, label: 'Dates', value: '6-17 avril 2026' },
    { icon: Clock, label: 'Jours', value: 'Lundi au Vendredi' },
    { icon: Users, label: 'Places', value: '20 places (Formule 1)' },
    { icon: Sun, label: 'Âge', value: 'À partir de 8 ans' }
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
            Stage d'Avril 2026
          </h2>
          <p className="text-lg sm:text-xl font-montserrat text-gray-600 max-w-3xl mx-auto px-4">
            Profitez des vacances de printemps pour un stage de parkour ! Deux formules au choix pour s'adapter à tous, à partir de 6 ans.
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
          {/* Formule 1 - Journée */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-cheddar font-bold text-gray-900">
                  Formule 1 — Journée
                </h3>
                <span className="text-sm font-montserrat text-primary font-semibold">Niveau confirmé</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-lg border-l-4 border-primary bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Lundi au Vendredi</h4>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    Confirmé · 20 places
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>10h - 16h</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Users className="w-4 h-4" />
                  <span>À partir de 8 ans</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6 text-sm font-montserrat text-gray-600">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Pique-nique à ramener par l'enfant</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Goûter offert par le club</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Encadrement professionnel toute la journée</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2">
                <Euro size={20} className="text-amber-600" />
                <p className="text-amber-900 font-montserrat font-bold text-lg">
                  25€ / jour — 100€ / semaine
                </p>
              </div>
            </div>
          </motion.div>

          {/* Formule 2 - Après-midi court */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-cheddar font-bold text-gray-900">
                  Formule 2 — Après-midi
                </h3>
                <span className="text-sm font-montserrat text-primary font-semibold">Découverte / Débutant</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-lg border-l-4 border-primary bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Lundi au Vendredi</h4>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Débutant
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>16h - 18h</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Users className="w-4 h-4" />
                  <span>À partir de 6 ans</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6 text-sm font-montserrat text-gray-600">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Idéal pour découvrir le parkour</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Pour ceux qui préfèrent une séance courte</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Encadrement professionnel</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2">
                <Euro size={20} className="text-amber-600" />
                <p className="text-amber-900 font-montserrat font-bold text-lg">
                  15€ / séance
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/inscription"
            className="group inline-flex items-center space-x-2 bg-primary hover:bg-secondary text-white px-8 py-4 rounded-xl font-montserrat font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
          >
            <Calendar size={22} />
            <span>S'inscrire au stage</span>
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ScheduleHighlight
