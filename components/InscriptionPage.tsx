'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, Shield, CheckCircle, AlertCircle, Users, Award, Clock } from 'lucide-react'

const InscriptionPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    level: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalInfo: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentConsent: false,
    termsAccepted: false
  })

  const levels = [
    { value: 'debutant', label: 'Débutant', description: 'Première approche du parkour' },
    { value: 'intermediaire', label: 'Intermédiaire', description: 'Pratique régulière, techniques de base maîtrisées' },
    { value: 'confirme', label: 'Confirmé', description: 'Niveau avancé, techniques complexes' }
  ]

  const benefits = [
    {
      icon: Users,
      title: 'Groupes de Niveaux',
      description: 'Entraînements adaptés à votre progression'
    },
    {
      icon: Award,
      title: 'Coach Professionnel',
      description: 'Encadrement par un coach diplômé et expérimenté'
    },
    {
      icon: Clock,
      title: 'Horaires Flexibles',
      description: 'Séances en semaine et week-end'
    },
    {
      icon: Shield,
      title: 'Sécurité Garantie',
      description: 'Équipements et méthodes sécurisées'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: 'Nouvelle inscription PKBA - Saison 2025/2026',
          level: levels.find(l => l.value === formData.level)?.label || formData.level
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          birthDate: '',
          level: '',
          emergencyContact: '',
          emergencyPhone: '',
          medicalInfo: '',
          parentName: '',
          parentPhone: '',
          parentEmail: '',
          parentConsent: false,
          termsAccepted: false
        })
      } else {
        setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.')
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isMinor = () => {
    if (!formData.birthDate) return false
    const birthDate = new Date(formData.birthDate)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    return age < 18 || (age === 18 && monthDiff < 0)
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
              Inscription Confirmée !
            </h1>
            <p className="text-xl font-montserrat text-gray-600 max-w-2xl mx-auto mb-8">
              Votre inscription pour la saison 2025/2026 a été enregistrée avec succès. 
              Nous vous contacterons dans les plus brefs délais pour confirmer les détails.
            </p>
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
              <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-4">
                Prochaines étapes
              </h3>
              <div className="space-y-3 text-left font-montserrat text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Confirmation par email sous 48h</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Réception du planning d'entraînement</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Premier entraînement en septembre 2025</span>
                </div>
              </div>
            </div>
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
              Inscription Saison 2025/2026
            </h1>
            <p className="text-xl font-montserrat max-w-3xl mx-auto leading-relaxed">
              Rejoignez PKBA et faites partie de notre communauté de passionnés de parkour. 
              Inscriptions ouvertes pour tous les niveaux !
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <benefit.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-cheddar font-bold text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm font-montserrat text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-cheddar font-bold text-gray-900 mb-8 text-center">
              Formulaire d'Inscription
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4">
                  Informations Personnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Téléphone *
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Date de naissance *
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Niveau *
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    >
                      <option value="">Sélectionnez votre niveau</option>
                      {levels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label} - {level.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4">
                  Contact d'Urgence
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Nom du contact *
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Téléphone du contact *
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4">
                  Informations Médicales
                </h3>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Allergies, conditions médicales, etc. (optionnel)
                  </label>
                  <textarea
                    name="medicalInfo"
                    value={formData.medicalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    placeholder="Informations importantes pour votre sécurité..."
                  />
                </div>
              </div>

              {/* Parent Information (if minor) */}
              {isMinor() && (
                <div>
                  <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4">
                    Informations Parentales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                        Nom du parent/tuteur *
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        required={isMinor()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                        Téléphone du parent/tuteur *
                      </label>
                      <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        required={isMinor()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Email du parent/tuteur
                    </label>
                    <input
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                </div>
              )}

              {/* Consent */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="parentConsent"
                    checked={formData.parentConsent}
                    onChange={handleInputChange}
                    required={isMinor()}
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label className="text-sm font-montserrat text-gray-700">
                    {isMinor() 
                      ? "J'autorise mon enfant à participer aux activités du club PKBA et j'accepte les conditions de participation."
                      : "J'accepte de participer aux activités du club PKBA et j'accepte les conditions de participation."
                    }
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label className="text-sm font-montserrat text-gray-700">
                    J'accepte les <a href="/mentions-legales" className="text-primary hover:underline">mentions légales</a> et la <a href="/politique-confidentialite" className="text-primary hover:underline">politique de confidentialité</a>.
                  </label>
                </div>
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
                    <User size={20} />
                    <span>Envoyer l'inscription</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default InscriptionPage 