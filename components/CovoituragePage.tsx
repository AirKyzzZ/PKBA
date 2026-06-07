'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Car, Shield, Users, MapPin, Calendar, CheckCircle, AlertCircle, ArrowRight, Phone, Mail, RefreshCw } from 'lucide-react'

type Annonce = {
  id: string
  prenom: string
  type: string
  ville: string
  jours: string
  places: string
  message: string
  date: string
}

const JOURS_OPTIONS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

const CovoituragePage = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    prenom: '',
    email: '',
    phone: '',
    type: '' as 'Propose' | 'Cherche' | '',
    ville: '',
    jours: [] as string[],
    places: '',
    message: '',
  })

  const fetchAnnonces = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/get-covoiturage')
      if (response.ok) {
        const data = await response.json()
        setAnnonces(data.annonces)
      }
    } catch {
      console.error('Erreur lors du chargement des annonces')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAnnonces()
  }, [fetchAnnonces])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleJourToggle = (jour: string) => {
    setFormData((prev) => ({
      ...prev,
      jours: prev.jours.includes(jour)
        ? prev.jours.filter((j) => j !== jour)
        : [...prev.jours, jour],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (formData.jours.length === 0) {
      setError('Sélectionnez au moins un jour de disponibilité.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/submit-covoiturage/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          jours: formData.jours.join(', '),
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          prenom: '',
          email: '',
          phone: '',
          type: '',
          ville: '',
          jours: [],
          places: '',
          message: '',
        })
        fetchAnnonces()
      } else {
        const data = await response.json()
        setError(data.message || 'Une erreur est survenue.')
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
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
              Covoiturage PKBA
            </h1>
            <p className="text-xl font-montserrat max-w-3xl mx-auto leading-relaxed">
              Partagez vos trajets avec les autres familles du club !
              Proposez ou recherchez un covoiturage pour les entraînements et événements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it works + Security */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Car,
                title: 'Publiez votre trajet',
                description: 'Indiquez votre ville, vos jours et si vous proposez ou cherchez un covoiturage',
              },
              {
                icon: Users,
                title: 'Trouvez un partenaire',
                description: 'Consultez les annonces des autres familles du club',
              },
              {
                icon: Shield,
                title: 'Contact via le club',
                description: 'Pour votre sécurité, les contacts se font uniquement via le club',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-cheddar font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm font-montserrat text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Shield size={18} className="text-blue-600" />
              <p className="text-blue-900 font-montserrat font-semibold text-sm">Sécurité & confidentialité</p>
            </div>
            <p className="text-sm text-blue-800 font-montserrat">
              Vos informations personnelles (email, téléphone) ne sont pas affichées publiquement.
              Pour mettre en relation deux familles, contactez le club au <strong>06 60 14 71 44</strong> ou par email.
            </p>
          </div>
        </div>
      </section>

      {/* Board des annonces */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-cheddar font-bold text-gray-900">
                Annonces actives
              </h2>
              <button
                onClick={fetchAnnonces}
                className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-montserrat font-medium text-sm transition-colors"
              >
                <RefreshCw size={16} />
                <span>Actualiser</span>
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500 font-montserrat">Chargement des annonces...</p>
              </div>
            ) : annonces.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Car size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-montserrat mb-2">Aucune annonce pour le moment</p>
                <p className="text-sm text-gray-400 font-montserrat">Soyez le premier à publier un trajet !</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {annonces.map((annonce) => (
                  <motion.div
                    key={annonce.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-cheddar font-bold text-gray-900">{annonce.prenom}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium font-montserrat ${
                          annonce.type === 'Propose'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {annonce.type === 'Propose' ? 'Propose' : 'Cherche'}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm font-montserrat text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                        <span>{annonce.ville}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                        <span>{annonce.jours}</span>
                      </div>
                      {annonce.places && (
                        <div className="flex items-center space-x-2">
                          <Users size={14} className="text-gray-400 flex-shrink-0" />
                          <span>{annonce.places} place{Number(annonce.places) > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                    {annonce.message && (
                      <p className="mt-3 text-sm text-gray-500 font-montserrat italic border-t border-gray-100 pt-3">
                        {annonce.message}
                      </p>
                    )}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-400 font-montserrat">
                        Contact via le club : <strong>06 60 14 71 44</strong>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-accent" id="publier">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-cheddar font-bold text-gray-900 mb-2 text-center">
              Publier une annonce
            </h2>
            <p className="text-sm font-montserrat text-gray-600 mb-8 text-center">
              Vos informations de contact (email, téléphone) resteront confidentielles.
            </p>

            {isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start space-x-2">
                <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-green-700 font-montserrat text-sm">
                  Votre annonce a été publiée avec succès !
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-2">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 font-montserrat text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Type */}
              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                  Je... <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Propose', 'Cherche'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, type }))}
                      className={`py-3 px-4 rounded-lg font-montserrat font-medium text-center transition-all duration-200 border-2 ${
                        formData.type === type
                          ? type === 'Propose'
                            ? 'bg-green-50 text-green-700 border-green-300'
                            : 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {type === 'Propose' ? '🚗 Propose un trajet' : '🔍 Cherche un trajet'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Ville de départ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                    required
                    placeholder="ex: Gujan-Mestras"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-400 ml-1">(non affiché)</span>
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
                    Téléphone <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-400 ml-1">(non affiché)</span>
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

              {/* Jours */}
              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                  Jours disponibles <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {JOURS_OPTIONS.map((jour) => (
                    <button
                      key={jour}
                      type="button"
                      onClick={() => handleJourToggle(jour)}
                      className={`px-4 py-2 rounded-lg text-sm font-montserrat font-medium transition-all duration-200 border ${
                        formData.jours.includes(jour)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
                      }`}
                    >
                      {jour}
                    </button>
                  ))}
                </div>
              </div>

              {formData.type === 'Propose' && (
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Nombre de places disponibles
                  </label>
                  <input
                    type="number"
                    name="places"
                    min="1"
                    max="8"
                    value={formData.places}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Précisions sur votre trajet, horaires préférés..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.type}
                className="w-full bg-primary hover:bg-secondary text-white font-montserrat font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Envoi en cours...</span>
                ) : (
                  <>
                    <span>Publier l'annonce</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm font-montserrat text-gray-500 mb-3">
                Besoin de mettre en relation ? Contactez le club :
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
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

export { CovoituragePage }
