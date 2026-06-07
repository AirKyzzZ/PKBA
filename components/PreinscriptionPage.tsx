'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Send,
  ArrowRight,
  Sun,
  CalendarClock,
} from 'lucide-react'
import { PREINSCRIPTION_GROUP_OPTIONS, SEASON_LABEL } from '@/content/schedule'

const initialForm = {
  firstName: '',
  lastName: '',
  birthDate: '',
  groupeSouhaite: '',
  parentName: '',
  phone: '',
  email: '',
  message: '',
  consent: false,
}

const PreinscriptionPage = () => {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target
    const nextValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: nextValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/submit-preinscription/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData(initialForm)
      } else {
        const data = await response.json().catch(() => ({}))
        setError(data.message || 'Une erreur est survenue. Merci de réessayer.')
      }
    } catch {
      setError('Une erreur est survenue. Merci de réessayer ou de nous contacter directement.')
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
              Préinscription envoyée !
            </h1>
            <p className="text-lg font-montserrat text-gray-600 max-w-2xl mx-auto mb-6">
              Merci, votre préinscription pour la saison {SEASON_LABEL} est bien enregistrée. On
              revient vers vous pour confirmer la place et finaliser l&apos;inscription (dossier et
              paiement) à la rentrée.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-montserrat font-semibold"
            >
              <ArrowRight size={18} />
              <span>Retour à l&apos;accueil</span>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-cheddar font-bold mb-4">
              Préinscription, saison {SEASON_LABEL}
            </h1>
            <p className="text-lg md:text-xl font-montserrat max-w-3xl mx-auto leading-relaxed text-white/90">
              Réservez votre place pour la rentrée. La préinscription est rapide et sans engagement,
              on vous recontacte pour finaliser le dossier et le paiement.
            </p>
            <a
              href="#preinscription"
              className="inline-flex items-center gap-2 mt-8 bg-white text-primary px-6 py-3 rounded-lg font-montserrat font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              <CheckCircle size={20} />
              Se préinscrire
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stage redirect */}
      <section className="bg-amber-50 border-y border-amber-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <Sun size={20} className="text-amber-600 flex-shrink-0" />
          <span className="font-montserrat text-amber-900">
            Vous cherchez les <strong>stages d&apos;été 2026</strong> (juillet et août) ?
          </span>
          <Link
            href="/stage"
            className="inline-flex items-center gap-1 font-montserrat font-bold text-amber-700 hover:text-amber-900 underline"
          >
            C&apos;est par ici
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Horaires & tarifs (détaillés sur /horaires, pas de duplication) */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-cheddar font-bold text-gray-900 mb-3">
            Horaires et tarifs {SEASON_LABEL}
          </h2>
          <p className="text-gray-600 font-montserrat mb-6">
            Le planning prévisionnel des entraînements et les tarifs de la saison sont détaillés sur
            la page dédiée.
          </p>
          <Link
            href="/horaires"
            className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-montserrat font-bold transition-all duration-200 transform hover:scale-105"
          >
            <CalendarClock size={20} />
            Voir les horaires et tarifs
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 bg-white" id="preinscription">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10"
          >
            <h2 className="text-3xl font-cheddar font-bold text-gray-900 mb-2 text-center">
              Formulaire de préinscription
            </h2>
            <p className="text-center font-montserrat text-gray-600 mb-8">
              Quelques infos suffisent. On vous recontacte pour la suite.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Prénom de l&apos;enfant <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="ex: Léa"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="ex: Martin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Date de naissance <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  />
                  <p className="text-xs text-gray-500 mt-1 font-montserrat">À partir de 3 ans.</p>
                </div>
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Groupe souhaité <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="groupeSouhaite"
                    value={formData.groupeSouhaite}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                  >
                    <option value="">Sélectionnez</option>
                    {PREINSCRIPTION_GROUP_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                  Nom du parent / responsable
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  placeholder="ex: Sophie Martin"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="ex: 06 12 34 56 78"
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
                    onChange={handleChange}
                    required
                    placeholder="ex: sophie.martin@gmail.com"
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
                  onChange={handleChange}
                  rows={3}
                  placeholder="Une question, un niveau déjà pratiqué, une précision..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label className="text-sm font-montserrat text-gray-700">
                  J&apos;accepte d&apos;être recontacté(e) par le club au sujet de cette
                  préinscription. <span className="text-red-500">*</span>
                </label>
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
                    <span>Envoyer ma préinscription</span>
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
                <span>06 60 14 71 44 (David)</span>
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center space-x-2 text-gray-700 hover:text-primary font-montserrat transition-colors"
              >
                <Mail size={18} />
                <span>Nous écrire</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export { PreinscriptionPage }
