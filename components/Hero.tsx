'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, ShoppingBag } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Background Pattern (subtle, behind overlay) */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-4 h-4 bg-white rounded-full opacity-20 z-0"
      />
      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-20 w-6 h-6 bg-white rounded-full opacity-30 z-0"
      />
      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-20 w-3 h-3 bg-white rounded-full opacity-25 z-0"
      />

      {/* Readability Overlay */}
      <div className="absolute inset-0 z-10 bg-black/60 sm:bg-black/50" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Launch Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-montserrat font-medium"
          >
            <Calendar size={16} />
            <span>Lancement Septembre 2025</span>
          </motion.div>

          {/* Main Title (Image) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <span className="sr-only">PKBA</span>
            <Image
              src="/images/herotext.png"
              alt="PKBA"
              width={1100}
              height={320}
              priority
              className="w-[70%] max-w-[900px] h-auto"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl font-montserrat font-medium text-white/90 max-w-4xl mx-auto"
          >
            Parkour Bassin d'Arcachon
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl font-montserrat text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez l'art du déplacement dans un cadre sécurisé et professionnel. 
            Rejoignez notre communauté de passionnés au cœur du Bassin d'Arcachon.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link
              href="/inscription"
              className="group bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-montserrat font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
            >
              <span>Rejoindre le club</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link
              href="/boutique"
              className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-montserrat font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <ShoppingBag size={20} />
              <span>Boutique</span>
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero 