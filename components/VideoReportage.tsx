'use client'

import { motion } from 'framer-motion'
import { Tv, Users, Medal, MapPin } from 'lucide-react'

const VideoReportage = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Video - Left Column (3/5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
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
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 order-1 lg:order-2 space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center space-x-2 bg-red-600 rounded-full px-4 py-2 text-white font-montserrat font-bold text-sm shadow-lg">
                <Tv size={16} className="flex-shrink-0" />
                <span>Vu sur France 3</span>
              </span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-cheddar font-bold text-white">
              PKBA dans les médias
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg font-montserrat text-white/90 leading-relaxed">
              France 3 Nouvelle-Aquitaine a consacré un reportage à notre association et à la pratique du parkour sur le Bassin d'Arcachon. Découvrez notre philosophie, nos entraînements et notre communauté à travers les yeux de la télévision régionale.
            </p>

            {/* Blockquote */}
            <blockquote className="border-l-4 border-white/30 pl-4 py-2">
              <p className="text-sm sm:text-base font-montserrat text-white/80 italic leading-relaxed">
                « Le parkour, c'est l'art du déplacement. On apprend à se connaître, à repousser ses limites, tout en respectant son corps et son environnement. »
              </p>
            </blockquote>

            {/* Mini Stats */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-white font-montserrat text-sm border border-white/20">
                <Users size={14} className="flex-shrink-0" />
                <span>65 adhérents</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-white font-montserrat text-sm border border-white/20">
                <Medal size={14} className="flex-shrink-0" />
                <span>Médailles</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-white font-montserrat text-sm border border-white/20">
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
