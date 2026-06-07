'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Euro, Users, ArrowRight, Calendar, Sun, Zap } from 'lucide-react'
import { STAGES, FORMULES } from '@/content/stages'

const ScheduleHighlight = () => {
  const juillet = STAGES['juillet-2026']
  const aout = STAGES['aout-2026']
  const stageCards = [
    {
      stage: juillet,
      headline: 'Lundi → Jeudi',
      sub: '8 jours',
      note: 'Pas de tarif semaine (vendredis indisponibles)',
    },
    {
      stage: aout,
      headline: 'Lundi → Vendredi',
      sub: '10 jours',
      note: 'Tarif semaine 100€ disponible (Formule 1)',
    },
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
            Stages d'Été 2026
          </h2>
          <p className="text-lg sm:text-xl font-montserrat text-gray-600 max-w-3xl mx-auto px-4">
            Deux sessions pendant les vacances d'été. Choisissez vos dates et votre formule, pour tous à partir de 6 ans.
          </p>
        </motion.div>

        {/* Stage selector cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto"
        >
          {stageCards.map((card, index) => (
            <motion.div
              key={card.stage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-montserrat text-gray-500 uppercase tracking-wide mb-1">
                    Session
                  </p>
                  <h3 className="text-xl sm:text-2xl font-cheddar font-bold text-gray-900">
                    {card.stage.shortLabel} {card.stage.emoji}
                  </h3>
                </div>
                <span className="bg-primary/10 text-primary text-xs font-montserrat font-bold px-3 py-1 rounded-full">
                  {card.sub}
                </span>
              </div>
              <div className="space-y-2 text-sm font-montserrat text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span>{card.stage.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span>{card.headline}</span>
                </div>
              </div>
              <p className="mt-4 text-xs font-montserrat italic text-gray-500">
                {card.note}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Formule 1 */}
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
                  {FORMULES[1].shortLabel} — Journée
                </h3>
                <span className="text-sm font-montserrat text-primary font-semibold">
                  Licenciés / Initiés
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-lg border-l-4 border-primary bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">10h - 16h</h4>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    20 places
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>À partir de {FORMULES[1].minAge} ans</span>
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
                  {FORMULES[1].pricePerDay}€ / jour — {FORMULES[1].priceWeek}€ / semaine *
                </p>
              </div>
              <p className="text-center text-xs text-amber-800 font-montserrat mt-2">
                * Tarif semaine uniquement applicable en août (lundi-vendredi complet)
              </p>
            </div>
          </motion.div>

          {/* Formule 2 */}
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
                  {FORMULES[2].shortLabel} — Découverte
                </h3>
                <span className="text-sm font-montserrat text-primary font-semibold">
                  Non-licenciés / Débutants
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-lg border-l-4 border-primary bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{FORMULES[2].time}</h4>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Débutant
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>À partir de {FORMULES[2].minAge} ans</span>
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
                <span>Séance courte d'1h30, format dynamique</span>
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
                  {FORMULES[2].pricePerDay}€ / séance
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
            href="/stage"
            className="group inline-flex items-center space-x-2 bg-primary hover:bg-secondary text-white px-8 py-4 rounded-xl font-montserrat font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
          >
            <Calendar size={22} />
            <span>S'inscrire à un stage</span>
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ScheduleHighlight
