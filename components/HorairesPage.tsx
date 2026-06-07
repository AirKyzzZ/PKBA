'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Users, Euro, CalendarClock } from 'lucide-react'
import { WeeklySchedule } from '@/components/WeeklySchedule'
import { TarifsTable } from '@/components/TarifsTable'
import { SEASON_LABEL } from '@/content/schedule'

export default function HorairesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-cheddar font-bold mb-6">Horaires &amp; Tarifs</h1>
            <p className="text-xl md:text-2xl font-montserrat mb-8 opacity-90">
              Le planning et les tarifs prévisionnels pour la saison {SEASON_LABEL}.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base font-montserrat">
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <Calendar className="w-4 h-4" />
                <span>Loisir, prépa compét, compétition</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <Users className="w-4 h-4" />
                <span>Dès 3 ans</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <Euro className="w-4 h-4" />
                <span>Tarifs transparents</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 text-primary font-montserrat font-semibold mb-2">
              <CalendarClock size={20} />
              <span>Le planning</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-cheddar font-bold text-gray-900 mb-3">
              Planning des entraînements
            </h2>
            <p className="text-lg text-gray-600 font-montserrat max-w-2xl mx-auto">
              Planning prévisionnel, susceptible d&apos;évoluer d&apos;ici la rentrée.
            </p>
          </motion.div>
          <WeeklySchedule />
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 text-primary font-montserrat font-semibold mb-2">
              <Euro size={20} />
              <span>Les tarifs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-cheddar font-bold text-gray-900 mb-3">
              Tarifs de la saison {SEASON_LABEL}
            </h2>
          </motion.div>
          <TarifsTable />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-cheddar font-bold mb-6">
              Prêt à rejoindre l&apos;aventure PKBA ?
            </h2>
            <p className="text-xl font-montserrat mb-8 opacity-90">
              Préinscrivez-vous pour la saison {SEASON_LABEL}, c&apos;est rapide et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inscription"
                className="bg-white text-primary px-8 py-4 rounded-lg font-montserrat font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
              >
                Se préinscrire
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-montserrat font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
