'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  Users,
} from 'lucide-react'
import { CLUB } from '@/content/club'
import {
  AG_DATE,
  AG_DATE_LABEL,
  AG_REPLY_BY_LABEL,
  MESSAGE_MAX_LEN,
  validateAg,
  type AgResponse,
} from '@/lib/ag'
import { toLocalIsoDate } from '@/lib/validation'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  members: '',
  response: '' as AgResponse | '',
  proxyName: '',
  message: '',
}

const RESPONSE_OPTIONS: Array<{ value: AgResponse; label: string }> = [
  { value: 'present', label: 'Je serai présent(e)' },
  { value: 'pouvoir', label: 'Je ne peux pas venir, je donne mon pouvoir' },
  { value: 'absent', label: 'Je ne peux pas venir' },
]

const inputClass =
  'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat'
const labelClass = 'block text-sm font-montserrat font-medium text-gray-700 mb-1'

const AgPage = () => {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sentTo, setSentTo] = useState('')
  const [error, setError] = useState('')
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    setIsClosed(toLocalIsoDate() > AG_DATE)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateAg(formData, toLocalIsoDate())
    if (validationError) {
      setError(validationError)
      return
    }
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/submit-ag/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSentTo(formData.email.trim())
        window.scrollTo({ top: 0, behavior: 'smooth' })
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

  if (sentTo || isClosed) {
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
              {sentTo ? 'Réponse envoyée\u00a0!' : 'Les réponses sont closes'}
            </h1>
            <p className="text-lg font-montserrat text-gray-600 max-w-2xl mx-auto mb-6">
              {sentTo
                ? `Merci, votre réponse est bien enregistrée. Une confirmation vient de partir à ${sentTo}.`
                : "L'assemblée générale du PKBA a eu lieu le vendredi 6 novembre 2026."}
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
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-cheddar font-bold mb-4">
              Assemblée générale du PKBA
            </h1>
            <p className="text-lg md:text-xl font-montserrat max-w-3xl mx-auto leading-relaxed text-white/90">
              Le {AG_DATE_LABEL}, au local du club. Dites-nous si vous venez, ou donnez votre
              pouvoir, avant le {AG_REPLY_BY_LABEL}.
            </p>
            <a
              href="#reponse"
              className="inline-flex items-center gap-2 mt-8 bg-white text-primary px-6 py-3 rounded-lg font-montserrat font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              <CheckCircle size={20} />
              Répondre
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-gray-100 shadow-sm p-6">
            <Calendar className="text-primary mb-3" size={28} />
            <h2 className="font-cheddar font-bold text-xl text-gray-900 mb-1">Quand</h2>
            <p className="font-montserrat text-gray-600">Vendredi 6 novembre 2026 à 19h</p>
          </div>
          <a
            href={CLUB.google.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-primary transition-colors"
          >
            <MapPin className="text-primary mb-3" size={28} />
            <h2 className="font-cheddar font-bold text-xl text-gray-900 mb-1">Où</h2>
            <p className="font-montserrat text-gray-600">Au local du club, {CLUB.address.full}</p>
          </a>
          <div className="rounded-2xl border border-gray-100 shadow-sm p-6">
            <Users className="text-primary mb-3" size={28} />
            <h2 className="font-cheddar font-bold text-xl text-gray-900 mb-1">Le quorum</h2>
            <p className="font-montserrat text-gray-600">
              L&apos;assemblée ne peut voter que si un quart des adhérents est présent ou
              représenté. Chaque réponse compte.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 font-montserrat text-amber-900">
            <h2 className="font-cheddar font-bold text-2xl mb-2">
              Vous ne pouvez pas venir&nbsp;? Envoyez votre pouvoir&nbsp;!
            </h2>
            <p className="mb-2">
              Confiez votre voix à un adhérent, ou au parent d&apos;un adhérent, qui sera présent.
              Chaque personne peut porter 3 pouvoirs au maximum.
            </p>
            <p>
              Pour un adhérent de moins de 16 ans, c&apos;est l&apos;un des parents qui répond et
              qui vote. À partir de 16 ans, l&apos;adhérent répond lui-même.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white" id="reponse">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10"
          >
            <h2 className="text-3xl font-cheddar font-bold text-gray-900 mb-2 text-center">
              Votre réponse
            </h2>
            <p className="text-center font-montserrat text-gray-600 mb-8">
              Une réponse par famille suffit, en indiquant tous les adhérents concernés.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ag-firstName" className={labelClass}>
                    Votre prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ag-firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    autoComplete="given-name"
                    placeholder="ex: Sophie"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="ag-lastName" className={labelClass}>
                    Votre nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ag-lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    autoComplete="family-name"
                    placeholder="ex: Martin"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ag-email" className={labelClass}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="ag-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="ex: sophie.martin@gmail.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="ag-members" className={labelClass}>
                  Adhérent(s) concerné(s) <span className="text-red-500">*</span>
                </label>
                <input
                  id="ag-members"
                  type="text"
                  name="members"
                  value={formData.members}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  placeholder="ex: Léa Martin, Tom Martin"
                  className={inputClass}
                />
                <p className="text-xs text-gray-500 mt-1 font-montserrat">
                  Vous-même si vous êtes adhérent, ou vos enfants inscrits au club.
                </p>
              </div>

              <fieldset>
                <legend className={labelClass}>
                  Votre réponse <span className="text-red-500">*</span>
                </legend>
                <div className="space-y-2">
                  {RESPONSE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer font-montserrat transition-colors ${
                        formData.response === opt.value
                          ? 'border-primary bg-primary/5 text-gray-900'
                          : 'border-gray-300 text-gray-700 hover:border-primary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="response"
                        value={opt.value}
                        checked={formData.response === opt.value}
                        onChange={handleChange}
                        required
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {formData.response === 'pouvoir' && (
                <div>
                  <label htmlFor="ag-proxyName" className={labelClass}>
                    Qui votera pour vous&nbsp;? <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ag-proxyName"
                    type="text"
                    name="proxyName"
                    value={formData.proxyName}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    placeholder="Nom d'un adhérent ou d'un parent présent"
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-500 mt-1 font-montserrat">
                    Pensez à la prévenir. 3 pouvoirs maximum par personne.
                  </p>
                </div>
              )}

              {formData.response === 'absent' && (
                <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-200 rounded-lg font-montserrat text-sm text-amber-900">
                  <AlertCircle size={20} className="text-amber-600 flex-shrink-0" />
                  <span>
                    Sans pouvoir, votre voix ne compte pas pour le quorum. Si vous le pouvez,
                    confiez-la à quelqu&apos;un qui sera présent.
                  </span>
                </div>
              )}

              <div>
                <label htmlFor="ag-message" className={labelClass}>
                  Message (optionnel)
                </label>
                <textarea
                  id="ag-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  maxLength={MESSAGE_MAX_LEN}
                  placeholder="Une question pour l'ordre du jour, une précision..."
                  className={inputClass}
                />
                <p className="text-xs text-gray-500 mt-1 text-right font-montserrat">
                  {formData.message.length} / {MESSAGE_MAX_LEN} caractères
                </p>
              </div>

              <p className="text-xs text-gray-500 font-montserrat">
                Vos réponses servent uniquement à préparer l&apos;assemblée générale et à vérifier
                le quorum.
              </p>

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
                    <span>Envoyer ma réponse</span>
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

export { AgPage }
