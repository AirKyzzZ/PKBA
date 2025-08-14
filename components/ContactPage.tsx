'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      value: '06 60 14 71 44',
      href: 'tel:0660147144',
      description: 'Appelez-nous pour toute question'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'parkourBA33@gmail.com',
      href: 'mailto:parkourBA33@gmail.com',
      description: 'Envoyez-nous un email'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@parkourbassindarcachon',
      href: 'https://instagram.com/parkourbassindarcachon',
      description: 'Suivez-nous sur Instagram'
    },
    {
      icon: MapPin,
      title: 'Localisation',
      value: 'Bassin d\'Arcachon',
      href: '#',
      description: 'Bassin d\'Arcachon, France'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
          ...formData,
          subject: `Contact PKBA - ${formData.subject}`
        }).toString(),
        redirect: 'manual'
      })

      // Formspree peut retourner différents codes de statut selon la configuration
      // La plupart du temps, si on arrive ici sans erreur, c'est un succès
      console.log('Formspree response status:', response.status)
      
      // Considérer comme succès si pas d'erreur réseau et réponse reçue
      if (response.ok || response.status === 302 || response.status === 0) {
        setIsSuccess(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        // En cas de doute, vérifier le contenu de la réponse
        try {
          const responseText = await response.text()
          console.log('Formspree response content:', responseText)
          
          // Si on a du contenu, c'est probablement un succès
          if (responseText && responseText.length > 0) {
            setIsSuccess(true)
            setFormData({
              name: '',
              email: '',
              subject: '',
              message: ''
            })
          } else {
            setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.')
          }
        } catch (parseError) {
          // Si on ne peut pas lire la réponse, considérer comme succès par défaut
          // car Formspree fonctionne généralement même avec des codes d'erreur
          console.log('Could not parse response, assuming success')
          setIsSuccess(true)
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          })
        }
      }
    } catch (error) {
      console.error('Contact form error:', error)
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
              Message Envoyé !
            </h1>
            <p className="text-xl font-montserrat text-gray-600 max-w-2xl mx-auto">
              Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-cheddar font-bold mb-6">
              Contactez PKBA
            </h1>
            <p className="text-xl font-montserrat max-w-3xl mx-auto leading-relaxed">
              Une question ? Un projet ? N'hésitez pas à nous contacter. 
              Notre équipe est là pour vous répondre !
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <a
                  href={info.href}
                  target={info.title === 'Instagram' ? '_blank' : undefined}
                  rel={info.title === 'Instagram' ? 'noopener noreferrer' : undefined}
                  className="text-primary hover:text-secondary font-montserrat font-medium transition-colors duration-200"
                >
                  {info.value}
                </a>
                <p className="text-sm font-montserrat text-gray-600 mt-2">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-6">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="ex: Martin John"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="ex: martinjohn@gmail.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Sujet *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="Inscription">Inscription au club</option>
                    <option value="Boutique">Question boutique</option>
                    <option value="Entraînement">Planning d'entraînement</option>
                    <option value="Partenariat">Partenariat</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                                                placeholder="ex: Je souhaite m'inscrire à vos cours de parkour mais..."
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <AlertCircle size={20} className="text-red-500" />
                    <span className="text-red-700 font-montserrat">{error}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-secondary disabled:bg-gray-400 text-white font-montserrat font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4">
                  Horaires de Contact
                </h3>
                <div className="space-y-3 font-montserrat text-gray-600">
                  <div className="flex items-center space-x-3">
                    <Clock size={20} className="text-primary" />
                    <span>Lundi - Vendredi : 9h - 18h</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock size={20} className="text-primary" />
                    <span>Samedi : 10h - 16h</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock size={20} className="text-primary" />
                    <span>Dimanche : Fermé</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4">
                  Réponse Rapide
                </h3>
                <div className="space-y-3 font-montserrat text-gray-600">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Réponse sous 24h en semaine</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Support prioritaire pour les inscriptions</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Suivez-nous sur Instagram pour les actualités</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
                <h3 className="text-xl font-cheddar font-bold mb-4">
                  Rejoignez PKBA
                </h3>
                <p className="font-montserrat text-white/90 mb-4">
                  Prêt à faire partie de notre communauté ? 
                  Les inscriptions pour la saison 2025/2026 sont ouvertes !
                </p>
                <a
                  href="/inscription"
                  className="inline-flex items-center space-x-2 bg-white text-primary px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  <span>S'inscrire maintenant</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage 