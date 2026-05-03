'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation, Star, Clock } from 'lucide-react'
import { CLUB } from '@/content/club'

const Location = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cheddar font-bold text-gray-900 mb-4">
            Notre local
          </h2>
          <p className="text-lg sm:text-xl font-montserrat text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Retrouvez-nous au cœur de Gujan-Mestras, à {CLUB.travelTime.arcachon} d'Arcachon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-6 sm:space-y-8 order-2 lg:order-1"
          >
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 sm:p-8 border border-primary/10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-cheddar font-bold text-gray-900 mb-2">
                    Adresse
                  </h3>
                  <p className="font-montserrat text-gray-700 text-base sm:text-lg leading-relaxed">
                    {CLUB.address.street}
                    <br />
                    {CLUB.address.postalCode} {CLUB.address.city}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center">
                <Clock size={18} className="text-primary mx-auto mb-2" />
                <p className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Arcachon</p>
                <p className="font-cheddar font-bold text-gray-900 text-sm sm:text-base">{CLUB.travelTime.arcachon}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center">
                <Clock size={18} className="text-primary mx-auto mb-2" />
                <p className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">La Teste</p>
                <p className="font-cheddar font-bold text-gray-900 text-sm sm:text-base">{CLUB.travelTime.laTeste}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center">
                <Clock size={18} className="text-primary mx-auto mb-2" />
                <p className="text-xs font-montserrat text-gray-500 uppercase tracking-wide">Bordeaux</p>
                <p className="font-cheddar font-bold text-gray-900 text-sm sm:text-base">{CLUB.travelTime.bordeaux}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={CLUB.google.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 inline-flex items-center justify-center space-x-2 bg-primary hover:bg-secondary text-white font-montserrat font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <Navigation size={20} className="flex-shrink-0" />
                <span>Itinéraire</span>
              </a>
              <a
                href={CLUB.google.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 inline-flex items-center justify-center space-x-2 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-montserrat font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
              >
                <Star size={20} className="flex-shrink-0" />
                <span>Laisser un avis</span>
              </a>
            </div>
          </motion.div>

          {/* Map column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-gray-200 h-[300px] sm:h-[400px] lg:h-full lg:min-h-[420px]">
              <iframe
                title="Localisation PKBA - 4 Av. de L'actipôle, Gujan-Mestras"
                src={CLUB.google.embedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Location
