'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  User,
  Clock,
  Target,
  Trophy,
  Heart,
  TrendingUp,
  Shield,
  Sparkles,
  CalendarCheck,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react'
import { CLUB } from '@/content/club'

const CONTACT_PHONE_DISPLAY = '06 60 14 71 44'
const CONTACT_PHONE_TEL = '0660147144'
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'parkourBA33@gmail.com'

const useCases = [
  {
    icon: Target,
    title: 'Débloquer une figure',
    description: 'Un saut, un passage de barre, une réception qui coince : on travaille le point précis qui bloque.',
  },
  {
    icon: Trophy,
    title: 'Préparer une échéance',
    description: 'Peaufiner avant une compétition ou un passage de niveau, avec un objectif clair.',
  },
  {
    icon: Heart,
    title: 'Reprendre en confiance',
    description: 'Après une blessure ou une pause, on reprend en douceur et à votre rythme.',
  },
  {
    icon: TrendingUp,
    title: 'Progresser plus vite',
    description: 'Un suivi 100% personnalisé, sans attendre le rythme du groupe.',
  },
]

const included = [
  { icon: Shield, title: 'Coach diplômé', description: 'Encadrement par un coach du club.' },
  { icon: Sparkles, title: '100% personnalisé', description: 'La séance s\'adapte à votre objectif et votre niveau.' },
  { icon: User, title: 'Salle et matériel', description: 'Accès à la salle PKBA et à tous les modules.' },
  { icon: CalendarCheck, title: 'Rythme libre', description: 'Ponctuel ou régulier, comme vous le souhaitez.' },
]

const steps = [
  { number: '1', title: 'Vous appelez', description: `David au ${CONTACT_PHONE_DISPLAY}, on parle de votre objectif.` },
  { number: '2', title: 'On cale un créneau', description: 'Selon vos disponibilités, à la salle de Gujan-Mestras.' },
  { number: '3', title: 'Séance perso', description: 'Coaching individuel, 100% concentré sur vous.' },
]

const CoursPrivePage = () => {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-secondary to-primary text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <User size={56} className="mx-auto mb-6 text-white/90" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-cheddar font-bold mb-4">
              Cours privé
            </h1>
            <p className="text-lg sm:text-xl font-montserrat max-w-2xl mx-auto leading-relaxed text-white/90">
              Du coaching individuel, un à un, pour progresser à votre rythme avec un coach rien que
              pour vous.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 font-montserrat font-semibold">
                <User size={18} />
                <span>Un à un</span>
              </span>
              <span className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 font-montserrat font-semibold">
                <Clock size={18} />
                <span>Séance d&apos;environ 1h</span>
              </span>
              <span className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 font-montserrat font-semibold">
                <CalendarCheck size={18} />
                <span>Sur rendez-vous</span>
              </span>
            </div>
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="inline-flex items-center gap-2 mt-8 bg-white text-primary px-6 py-3 rounded-lg font-montserrat font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              <Phone size={20} />
              Appeler David, {CONTACT_PHONE_DISPLAY}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-cheddar font-bold text-gray-900 mb-3">
              Pour quoi faire ?
            </h2>
            <p className="text-lg font-montserrat text-gray-600 max-w-2xl mx-auto">
              Le cours privé s&apos;adapte à votre objectif, quel que soit votre niveau, dès 6 ans.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <useCase.icon size={26} className="text-primary" />
                </div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-sm font-montserrat text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="py-12 sm:py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-cheddar font-bold text-gray-900 mb-3">
              Ce qui est inclus
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {included.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm"
              >
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={26} className="text-white" />
                </div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm font-montserrat text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-cheddar font-bold text-gray-900 mb-3">
              Comment ça marche
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-primary text-white text-2xl font-cheddar font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="font-montserrat text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center"
          >
            <h2 className="text-3xl font-cheddar font-bold text-gray-900 mb-3">
              Envie d&apos;une séance perso ?
            </h2>
            <p className="font-montserrat text-gray-600 mb-2">
              Appelez ou écrivez à David, on cale ça ensemble.
            </p>
            <p className="font-montserrat text-gray-500 text-sm mb-8">
              Tarif sur demande, on en parle de vive voix selon votre objectif.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-montserrat font-bold transition-all duration-200 transform hover:scale-105"
              >
                <Phone size={20} />
                {CONTACT_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-montserrat font-bold transition-all duration-200"
              >
                <Mail size={20} />
                Nous écrire
              </a>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 mt-6 text-primary hover:text-secondary font-montserrat font-semibold text-sm"
            >
              Page contact
              <ArrowRight size={16} />
            </Link>
            <p className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-2 text-sm font-montserrat text-gray-500">
              <MapPin size={16} className="text-primary" />
              {CLUB.address.full}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export { CoursPrivePage }
