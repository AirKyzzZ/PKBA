'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Building2,
  Users,
  Clock,
  Euro,
  Briefcase,
  Heart,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Send,
  ArrowRight,
  Shield,
  Sparkles,
} from 'lucide-react'
import { CLUB } from '@/content/club'

const PrivatisationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    eventType: '',
    groupSize: '',
    preferredDate: '',
    message: '',
  })

  const features = [
    {
      icon: Building2,
      title: 'Salle privée 2h',
      description: 'Toute la salle PKBA pour vous et votre groupe',
    },
    {
      icon: Shield,
      title: 'Coach pro',
      description: 'Animation par un coach diplômé du club',
    },
    {
      icon: Sparkles,
      title: 'Matériel inclus',
      description: 'Modules, parcours et équipements de sécurité',
    },
    {
      icon: Users,
      title: 'Jusqu\'à 20 personnes',
      description: 'Idéal pour groupes, entreprises et évènements',
    },
  ]

  const useCases = [
    {
      icon: Briefcase,
      title: 'Séminaires d\'entreprise',
      description: 'Cohésion d\'équipe et team building original autour du parkour.',
    },
    {
      icon: Heart,
      title: 'EVG / EVJF',
      description: 'Une activité qui change pour un enterrement de vie originale et fun.',
    },
    {
      icon: Users,
      title: 'Groupes d\'amis & familles',
      description: 'Adultes, ados ou enfants : tout le monde y trouve son compte.',
    },
  ]

  const steps = [
    { number: '1', title: 'Demande', description: 'Remplissez le formulaire ou appelez-nous au 06 60 14 71 44' },
    { number: '2', title: 'Confirmation', description: 'On valide ensemble la date, le format et les détails' },
    { number: '3', title: 'Le jour J', description: 'Vous arrivez, on s\'occupe du reste pendant 2h' },
  ]

  const eventTypes = [
    'Séminaire d\'entreprise',
    'Team building',
    'EVG / EVJF',
    'Anniversaire adulte',
    'Réunion de famille',
    'Groupe d\'amis',
    'Autre',
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            _subject: `Demande privatisation salle - ${formData.contactName}`,
            'Nom du contact': formData.contactName,
            Email: formData.email,
            'Téléphone': formData.phone,
            'Type d\'évènement': formData.eventType,
            'Taille du groupe': formData.groupSize,
            'Date souhaitée': formData.preferredDate,
            Message: formData.message,
          }).toString(),
        },
      )

      if (response.ok || response.status === 302 || response.status === 0) {
        setIsSuccess(true)
        setFormData({
          contactName: '',
          email: '',
          phone: '',
          eventType: '',
          groupSize: '',
          preferredDate: '',
          message: '',
        })
      } else {
        setError('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.')
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white rounded-2xl shadow-lg p-10"
          >
            <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-cheddar font-bold text-gray-900 mb-4">
              Demande envoyée !
            </h1>
            <p className="text-lg font-montserrat text-gray-600 max-w-2xl mx-auto mb-6">
              Merci pour votre demande de privatisation. Nous revenons vers vous sous 24-48h pour confirmer la date et les détails.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-montserrat font-semibold"
            >
              <ArrowRight size={18} />
              <span>Retour à l'accueil</span>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

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
            <Building2 size={56} className="mx-auto mb-6 text-white/90" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-cheddar font-bold mb-4">
              Privatisez la salle
            </h1>
            <p className="text-lg sm:text-xl font-montserrat max-w-2xl mx-auto leading-relaxed text-white/90">
              Réservez la salle PKBA le samedi ou le dimanche après-midi pour votre évènement. Coach inclus, matériel complet, ambiance unique.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 font-montserrat font-semibold">
                <Euro size={18} />
                <span>20€ / personne</span>
              </span>
              <span className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 font-montserrat font-semibold">
                <Clock size={18} />
                <span>Session de 2h</span>
              </span>
              <span className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 font-montserrat font-semibold">
                <Users size={18} />
                <span>Jusqu'à 20 pers.</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-cheddar font-bold text-gray-900 mb-3">
              Ce qui est inclus
            </h2>
            <p className="text-lg font-montserrat text-gray-600 max-w-2xl mx-auto">
              Une formule clé-en-main pensée pour les groupes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 text-center border border-primary/10"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={26} className="text-primary" />
                </div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm font-montserrat text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-12 sm:py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-cheddar font-bold text-gray-900 mb-3">
              Pour qui ?
            </h2>
            <p className="text-lg font-montserrat text-gray-600 max-w-2xl mx-auto">
              Que vous soyez en groupe d'amis, en entreprise ou en famille, on s'adapte.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                  <useCase.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="font-montserrat text-gray-600 leading-relaxed">
                  {useCase.description}
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
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="font-montserrat text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16 bg-accent" id="formulaire">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-10"
          >
            <h2 className="text-3xl font-cheddar font-bold text-gray-900 mb-2 text-center">
              Demande de privatisation
            </h2>
            <p className="text-center font-montserrat text-gray-600 mb-8">
              Remplissez ce formulaire, on revient vers vous sous 24-48h.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Nom &amp; Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    placeholder="ex: Sophie Martin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="ex: 06 12 34 56 78"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="ex: sophie.martin@gmail.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Type d'évènement <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  >
                    <option value="">Sélectionnez</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Nombre de personnes <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleInputChange}
                    required
                    min={1}
                    max={20}
                    placeholder="ex: 12"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                  Date souhaitée <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                />
                <p className="text-xs text-gray-500 mt-1 font-montserrat">
                  Privatisations possibles le samedi ou dimanche après-midi.
                </p>
              </div>

              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Précisez le contexte (entreprise, occasion, attentes spécifiques...)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                  <span className="text-red-700 font-montserrat text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-secondary disabled:bg-gray-400 text-white font-montserrat font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Envoyer ma demande</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <a
                href="tel:0660147144"
                className="flex items-center justify-center space-x-2 text-gray-700 hover:text-primary font-montserrat transition-colors"
              >
                <Phone size={18} />
                <span>06 60 14 71 44</span>
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'parkourBA33@gmail.com'}`}
                className="flex items-center justify-center space-x-2 text-gray-700 hover:text-primary font-montserrat transition-colors"
              >
                <Mail size={18} />
                <span>Nous écrire</span>
              </a>
            </div>
            <p className="mt-4 text-center text-xs font-montserrat text-gray-500">
              Salle située au {CLUB.address.full}.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export { PrivatisationPage }
