'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PartyPopper, Shield, Users, Star, CheckCircle, AlertCircle, Phone, Mail, ArrowRight } from 'lucide-react'

const AnniversairesPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    preferredDate: '',
    numberOfChildren: '',
    message: '',
  })

  const features = [
    {
      icon: PartyPopper,
      title: 'Animations parkour',
      description: 'Jeux et parcours ludiques adaptés à l\'âge des enfants',
    },
    {
      icon: Shield,
      title: 'Encadrement pro',
      description: 'Animé par nos coachs diplômés et expérimentés',
    },
    {
      icon: Users,
      title: 'Parcours adaptés',
      description: 'Obstacles et défis conçus pour chaque tranche d\'âge',
    },
    {
      icon: Star,
      title: 'Moment inoubliable',
      description: 'Un anniversaire original qui sort de l\'ordinaire',
    },
  ]

  const steps = [
    { number: '1', title: 'Contact', description: 'Remplissez le formulaire ci-dessous ou appelez-nous' },
    { number: '2', title: 'Organisation', description: 'On définit ensemble la date, le format et les détails' },
    { number: '3', title: 'Fête !', description: 'Votre enfant et ses amis profitent d\'un anniversaire unique' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          _subject: `Demande anniversaire parkour - ${formData.childName}`,
          'Nom du parent': formData.parentName,
          Email: formData.email,
          'Téléphone': formData.phone,
          'Nom de l\'enfant': formData.childName,
          'Âge de l\'enfant': formData.childAge,
          'Date souhaitée': formData.preferredDate,
          'Nombre d\'enfants': formData.numberOfChildren,
          Message: formData.message,
        }).toString(),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        setError('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.')
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-cheddar font-bold text-gray-900 mb-4">
              Demande envoyée !
            </h1>
            <p className="text-xl font-montserrat text-gray-600 max-w-2xl mx-auto mb-8">
              Nous avons bien reçu votre demande d'anniversaire parkour.
              Nous vous recontacterons rapidement pour organiser la fête !
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-cheddar font-bold mb-6">
              Anniversaires Parkour
            </h1>
            <p className="text-xl font-montserrat max-w-3xl mx-auto leading-relaxed">
              Offrez à votre enfant un anniversaire unique et sportif !
              Animations parkour encadrées par nos coachs professionnels, à partir de 6 ans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-cheddar font-bold text-gray-900 mb-4">
              Ce qu'on propose
            </h2>
            <p className="text-lg font-montserrat text-gray-600 max-w-2xl mx-auto">
              Un anniversaire parkour, c'est bien plus qu'une fête — c'est une aventure !
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-cheddar font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm font-montserrat text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-cheddar font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-cheddar font-bold text-xl">
                  {step.number}
                </div>
                <h3 className="font-cheddar font-bold text-gray-900 text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-sm font-montserrat text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-5 py-2.5">
              <Users size={18} className="text-primary" />
              <span className="font-montserrat font-medium text-primary text-sm">
                À partir de 6 ans
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16" id="formulaire">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-cheddar font-bold text-gray-900 mb-2 text-center">
              Faire une demande
            </h2>
            <p className="text-sm font-montserrat text-gray-600 mb-8 text-center">
              Remplissez ce formulaire et nous vous recontacterons pour organiser la fête.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-2">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 font-montserrat text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Nom du parent <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Prénom de l'enfant <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Âge de l'enfant <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="childAge"
                    min="6"
                    value={formData.childAge}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Nombre d'enfants <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="numberOfChildren"
                    min="1"
                    value={formData.numberOfChildren}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Précisions, souhaits particuliers..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-secondary text-white font-montserrat font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Envoi en cours...</span>
                ) : (
                  <>
                    <span>Envoyer la demande</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm font-montserrat text-gray-500">
                Vous pouvez aussi nous contacter directement :
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-3">
                <a
                  href="tel:0660147144"
                  className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-montserrat font-medium text-sm transition-colors"
                >
                  <Phone size={16} />
                  <span>06 60 14 71 44</span>
                </a>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                  className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-montserrat font-medium text-sm transition-colors"
                >
                  <Mail size={16} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export { AnniversairesPage }
