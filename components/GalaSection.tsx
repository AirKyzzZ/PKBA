'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Ticket, Sparkles, Gift } from 'lucide-react'
import { CLUB } from '@/content/club'

const GALA_END_DATE = new Date('2026-06-28T00:00:00')

const GalaSection = () => {
  if (new Date() >= GALA_END_DATE) {
    return null
  }

  const lots = [
    { emoji: '🪂', label: 'Saut en parachute tandem', sponsor: 'Vertical T\'Air' },
    { emoji: '🏕️', label: '2 nuits au camping', sponsor: 'Huttopia' },
    { emoji: '🍽️', label: 'Invitations restaurant', sponsor: '' },
    { emoji: '🎁', label: 'Paniers gourmands & bien plus', sponsor: '' },
  ]

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#1d3a8a] via-[#2952c8] to-[#3b6ee0] overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl" />
        <Sparkles className="absolute top-12 right-1/4 text-yellow-300 hidden md:block" size={40} />
        <Sparkles className="absolute bottom-20 left-1/3 text-yellow-200 hidden md:block" size={28} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center space-x-2 bg-yellow-300 text-[#1d3a8a] font-montserrat font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Évènement à ne pas manquer</span>
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cheddar font-bold text-white mb-3 drop-shadow-lg">
            Gala &amp; Tombola
          </h2>
          <p className="text-xl sm:text-2xl font-montserrat font-semibold text-yellow-300">
            Tentez votre chance, repartez avec de superbes lots !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Date / lieu / entrée */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20"
          >
            <h3 className="text-xl sm:text-2xl font-cheddar font-bold text-white mb-5">
              Infos pratiques
            </h3>
            <ul className="space-y-4 font-montserrat text-white">
              <li className="flex items-start space-x-3">
                <Calendar size={20} className="text-yellow-300 flex-shrink-0 mt-1" />
                <span className="text-base sm:text-lg">
                  <strong>Samedi 27 juin 2026</strong>
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={20} className="text-yellow-300 flex-shrink-0 mt-1" />
                <span className="text-base sm:text-lg">De 18h à 20h</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-yellow-300 flex-shrink-0 mt-1" />
                <span className="text-base sm:text-lg">
                  Au club PKBA<br />
                  <span className="text-white/80 text-sm">{CLUB.address.full}</span>
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Ticket size={20} className="text-yellow-300 flex-shrink-0 mt-1" />
                <span className="text-base sm:text-lg">
                  <strong>Entrée gratuite</strong> · Tombola : 3€/ticket
                </span>
              </li>
            </ul>
            <p className="mt-5 text-sm font-montserrat text-white/80 italic">
              Ouvert aux athlètes, familles et au grand public.
            </p>
          </motion.div>

          {/* Lots */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20"
          >
            <h3 className="text-xl sm:text-2xl font-cheddar font-bold text-white mb-2 flex items-center space-x-2">
              <Gift size={24} className="text-yellow-300" />
              <span>Les lots à gagner</span>
            </h3>
            <p className="text-yellow-300 font-montserrat font-bold text-base sm:text-lg mb-5">
              Gros lot : Saut en parachute au-dessus du Bassin !
            </p>
            <ul className="space-y-3 font-montserrat text-white">
              {lots.map((lot) => (
                <li
                  key={lot.label}
                  className="flex items-center space-x-3 bg-white/5 rounded-lg px-3 py-2.5"
                >
                  <span className="text-2xl flex-shrink-0">{lot.emoji}</span>
                  <span className="flex-1 text-sm sm:text-base">
                    {lot.label}
                    {lot.sponsor && (
                      <span className="text-white/70 text-xs block sm:inline sm:ml-2">
                        — offert par {lot.sponsor}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block bg-yellow-300 text-[#1d3a8a] font-cheddar font-bold text-base sm:text-lg px-6 py-3 rounded-xl shadow-lg">
            🎟️ Tickets 3€ — au hangar &amp; auprès des traceurs
          </div>
          <p className="mt-4 text-white/90 font-montserrat text-sm sm:text-base">
            Plus de tickets achetés = plus de chances de gagner !
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default GalaSection
