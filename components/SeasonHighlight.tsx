'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, Euro, Gift, ArrowRight, Users } from 'lucide-react'
import { WEEKLY_SCHEDULE, SEASON_LABEL, SEASON_START, SELECTION_NOTE } from '@/content/schedule'
import { SEASON_TARIFS, TARIFS_PROVISIONAL, TARIFS_DISCLAIMER } from '@/content/tarifs'

const formatSeasonStart = (iso: string): string =>
  new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

const SeasonHighlight = () => {
  const loisirSlots = WEEKLY_SCHEDULE.flatMap((day) =>
    day.slots
      .filter((slot) => slot.category === 'loisir')
      .map((slot) => ({ day: day.day, ...slot })),
  )

  const prices = SEASON_TARIFS.map((t) => t.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

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
            Rentrée {SEASON_LABEL}
          </h2>
          <p className="text-lg sm:text-xl font-montserrat text-gray-600 max-w-3xl mx-auto px-4">
            Reprise des cours le {formatSeasonStart(SEASON_START)}. Le parkour est ouvert à tous dès
            3 ans, sans niveau requis.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-10 bg-primary rounded-2xl p-6 sm:p-7 text-white flex items-start gap-4"
        >
          <Gift className="w-8 h-8 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl sm:text-2xl font-cheddar font-bold mb-1">
              Première séance offerte
            </h3>
            <p className="font-montserrat text-white/90 text-sm sm:text-base">
              Venez essayer sans engagement et sans condition. Il suffit de nous prévenir avant de
              passer.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-cheddar font-bold text-gray-900">Groupes loisir</h3>
                <span className="text-sm font-montserrat text-primary font-semibold">
                  Ouverts à tous, sans sélection
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {loisirSlots.map((slot) => (
                <div
                  key={`${slot.day}-${slot.time}-${slot.group}`}
                  className="p-4 rounded-lg border-l-4 border-primary bg-primary/5"
                >
                  <div className="flex items-center justify-between mb-2 gap-3">
                    <h4 className="font-semibold text-gray-900 font-montserrat">{slot.group}</h4>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary whitespace-nowrap">
                      {slot.day}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-montserrat">
                    <Clock className="w-4 h-4" />
                    <span>{slot.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs font-montserrat italic text-gray-500">{SELECTION_NOTE}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Euro className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-cheddar font-bold text-gray-900">Tarifs annuels</h3>
                <span className="text-sm font-montserrat text-primary font-semibold">
                  Licence et assurance comprises
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {SEASON_TARIFS.map((tarif) => (
                <div
                  key={tarif.group}
                  className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="font-montserrat font-medium text-gray-900 text-sm truncate">
                      {tarif.group}
                    </p>
                    <p className="font-montserrat text-xs text-gray-500">{tarif.duration}</p>
                  </div>
                  <span className="font-montserrat font-bold text-primary whitespace-nowrap">
                    {tarif.price} €
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2">
                <Calendar size={20} className="text-amber-600" />
                <p className="text-amber-900 font-montserrat font-bold text-base">
                  De {minPrice} € à {maxPrice} € l'année
                </p>
              </div>
              {TARIFS_PROVISIONAL && (
                <p className="text-center text-xs text-amber-800 font-montserrat mt-2">
                  {TARIFS_DISCLAIMER}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/inscription"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-montserrat font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
          >
            <span>Préinscription {SEASON_LABEL}</span>
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/horaires"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-montserrat font-semibold px-8 py-4 rounded-lg border border-gray-200 transition-colors duration-200"
          >
            <span>Voir tous les horaires</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default SeasonHighlight
