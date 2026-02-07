'use client'

import { motion } from 'framer-motion'
import { Tv, Users, Medal, MapPin } from 'lucide-react'

const VideoReportage = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-flex items-center space-x-2 bg-red-600 rounded-full px-4 py-2 text-white font-montserrat font-bold text-sm shadow-md">
              <Tv size={16} className="flex-shrink-0" />
              <span>Vu sur France 3</span>
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cheddar font-bold text-gray-900 mb-4">
            PKBA dans les médias
          </h2>
          <p className="text-lg sm:text-xl font-montserrat text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            France 3 Nouvelle-Aquitaine a consacré un reportage à notre association et à la pratique du parkour sur le Bassin d'Arcachon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Video - Left Column (3/5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/Pkow2GmHfCk"
                  title="Reportage France 3 - PKBA Parkour Bassin d'Arcachon"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </motion.div>

          {/* Content - Right Column (2/5) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Blockquote */}
            <blockquote className="border-l-4 border-primary pl-4 py-2">
              <p className="text-base sm:text-lg font-montserrat text-gray-700 italic leading-relaxed">
                « Le parkour, c'est l'art du déplacement. On apprend à se connaître, à repousser ses limites, tout en respectant son corps et son environnement. »
              </p>
            </blockquote>

            {/* Description */}
            <p className="text-sm sm:text-base font-montserrat text-gray-600 leading-relaxed">
              Découvrez notre philosophie, nos entraînements et notre communauté à travers les yeux de la télévision régionale.
            </p>

            {/* Mini Stats */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center space-x-1.5 bg-primary/10 rounded-full px-3 py-1.5 text-primary font-montserrat text-sm font-medium">
                <Users size={14} className="flex-shrink-0" />
                <span>65 adhérents</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-red-50 rounded-full px-3 py-1.5 text-red-600 font-montserrat text-sm font-medium">
                <Medal size={14} className="flex-shrink-0" />
                <span>Médailles</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-secondary/10 rounded-full px-3 py-1.5 text-secondary font-montserrat text-sm font-medium">
                <MapPin size={14} className="flex-shrink-0" />
                <span>Bassin d'Arcachon</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default VideoReportage
