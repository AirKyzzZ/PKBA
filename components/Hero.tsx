"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden px-4 sm:px-6 lg:px-8">
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

      {/* Readability Overlay */}
      <div className="absolute inset-0 z-10 bg-black/60 sm:bg-black/55" />

      <div className="relative z-20 max-w-7xl mx-auto text-center py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-5 sm:space-y-6 lg:space-y-8"
        >
          {/* Stage Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/stage"
              className="inline-flex items-center space-x-2 bg-primary/90 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 text-white font-montserrat font-semibold text-sm shadow-lg hover:bg-primary transition-colors duration-200"
            >
              <Calendar size={16} className="flex-shrink-0" />
              <span className="whitespace-nowrap">
                Stages d'Été — Inscriptions ouvertes
              </span>
            </Link>
          </motion.div>

          {/* Main Title (Brand Logo) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center px-2"
          >
            <span className="sr-only">PKBA</span>
            <Image
              src="/images/herotext.png"
              alt="PKBA"
              width={1100}
              height={320}
              priority
              className="w-[75%] sm:w-[65%] md:w-[55%] lg:w-[50%] max-w-[700px] h-auto"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-white max-w-4xl mx-auto tracking-tight"
          >
            Parkour Bassin d'Arcachon
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-base sm:text-lg font-montserrat text-white/80 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Club associatif de parkour avec encadrement professionnel.
            <br className="hidden sm:block" />
            Tous niveaux, à partir de 6 ans.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6 px-4"
          >
            <Link
              href="/stage"
              className="group bg-primary text-white hover:bg-secondary px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-montserrat font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2 w-full sm:w-auto justify-center shadow-lg"
            >
              <Calendar size={22} className="flex-shrink-0" />
              <span>S'inscrire au stage</span>
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0"
              />
            </Link>

            <Link
              href="/horaires"
              className="group bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-gray-900 px-6 py-3.5 rounded-xl font-montserrat font-semibold text-base transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <Clock size={18} className="flex-shrink-0" />
              <span>Horaires & Tarifs</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
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
  );
};

export default Hero;
