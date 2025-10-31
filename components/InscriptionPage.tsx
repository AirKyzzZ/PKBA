'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, Shield, CheckCircle, AlertCircle, Users, Award, Clock, MapPin, FileText, Camera, PenTool, Euro } from 'lucide-react'

const InscriptionPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    
    // Adhésion
    adhesionType: [] as string[],
    otherClub: '',
    
    // Adresse
    address: '',
    postalCode: '',
    city: '',
    phone: '',
    email: '',
    
    // Responsables légaux (si mineur)
    legalGuardian1: {
      title: '',
      lastName: '',
      firstName: '',
      phone: '',
      email: ''
    },
    legalGuardian2: {
      title: '',
      lastName: '',
      firstName: '',
      phone: '',
      email: ''
    },
    
    // Contact d'urgence
    emergencyContact: {
      name: '',
      phone: ''
    },
    
    // Consentements
    imageRights: false,
    termsAccepted: false,
    
    // Signature
    signature: '',
    signatureDate: ''
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const adhesionTypes = [
    { value: 'ancien', label: 'Ancien Adhérent' },
    { value: 'nouveau', label: 'Nouvel Adhérent' },
    { value: 'autre_club', label: 'En provenance d\'un autre club' }
  ]

  const benefits = [
    {
      icon: Calendar,
      title: '4 jours de stage',
      description: '22-23 décembre & 29-30 décembre 2024'
    },
    {
      icon: Users,
      title: 'Groupes par âge',
      description: '-12 ans, +12 ans et groupe compétition'
    },
    {
      icon: Clock,
      title: 'Horaires adaptés',
      description: '10h30-12h, 14h-16h ou 16h-18h selon l\'âge'
    },
    {
      icon: Award,
      title: 'Coach professionnel',
      description: 'Encadrement par un coach diplômé et expérimenté'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    
    
    
    setFormData({
      ...formData,
      [name]: newValue
    })
  }

  const handleAdhesionTypeChange = (value: string) => {
    const selectedType = adhesionTypes.find(type => type.value === value)
    if (selectedType) {
      setFormData(prev => ({
        ...prev,
        adhesionType: prev.adhesionType.includes(selectedType.label)
          ? prev.adhesionType.filter(type => type !== selectedType.label)
          : [...prev.adhesionType, selectedType.label]
      }))
    }
  }

  const handleLegalGuardianChange = (guardianIndex: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`legalGuardian${guardianIndex + 1}`]: {
        ...prev[`legalGuardian${guardianIndex + 1}` as keyof typeof prev] as any,
        [field]: value
      }
    }))
  }

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }))
  }

  // Signature handling
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        ctx.beginPath()
        ctx.moveTo(x, y)
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        ctx.lineTo(x, y)
        ctx.stroke()
      }
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      const signatureData = canvas.toDataURL()
      setFormData(prev => ({
        ...prev,
        signature: signatureData,
        signatureDate: new Date().toISOString()
      }))
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setFormData(prev => ({
          ...prev,
          signature: '',
          signatureDate: ''
        }))
      }
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

  const isTooYoung = () => {
    if (!formData.birthDate) return false
    const birthDate = new Date(formData.birthDate)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age -= 1
    }
    return age < 6
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    

    try {
      // Envoi vers Airtable via API
      const response = await fetch('/.netlify/functions/submit-inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSuccess(true)
        // Reset form ONLY after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          birthDate: '',
          gender: '',
          adhesionType: [] as string[],
          otherClub: '',
          address: '',
          postalCode: '',
          city: '',
          phone: '',
          email: '',
          legalGuardian1: { title: '', lastName: '', firstName: '', phone: '', email: '' },
          legalGuardian2: { title: '', lastName: '', firstName: '', phone: '', email: '' },
          emergencyContact: { name: '', phone: '' },
          imageRights: false,
          termsAccepted: false,
          signature: '',
          signatureDate: ''
        })
        clearSignature()
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Une erreur est survenue lors de l\'envoi de la préinscription. Veuillez réessayer.')
      }
    } catch (error) {
              setError('Une erreur est survenue lors de l\'envoi de la préinscription. Veuillez réessayer.')
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
              Inscription au Stage Confirmée !
            </h1>
            <p className="text-xl font-montserrat text-gray-600 max-w-2xl mx-auto mb-8">
              Votre inscription au stage de Noël 2024 a été enregistrée avec succès. 
              Nous vous contacterons dans les plus brefs délais pour confirmer les détails et les modalités de paiement.
            </p>
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
              <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-4">
                Informations du Stage
              </h3>
              <div className="space-y-3 text-left font-montserrat text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Dates : 22-23 & 29-30 décembre 2024</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Horaires selon l'âge et le groupe</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Confirmation et infos pratiques par email</span>
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
              Stage de Parkour - Vacances de Noël 2024
            </h1>
            <p className="text-xl font-montserrat max-w-3xl mx-auto leading-relaxed">
              Inscrivez-vous au stage de parkour pendant les vacances de Noël ! 
              4 jours de pratique intensive : 22-23 décembre & 29-30 décembre
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

      {/* Message d'information - Stage de Noël */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar size={32} className="text-primary" />
            </div>
            <h2 className="text-3xl font-cheddar font-bold text-gray-900 mb-4">
              Stage de Noël 2024 - Inscriptions Ouvertes !
            </h2>
            <p className="text-lg font-montserrat text-gray-600 mb-6 max-w-2xl mx-auto">
              Profitez des vacances de Noël pour découvrir ou progresser en parkour ! 
              4 jours de stage intensif avec notre coach diplômé.
            </p>
            <div className="bg-orange-50 border border-orange-300 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <p className="text-orange-900 font-montserrat font-semibold text-center">
                💰 Stage payant : 15€/séance (non licenciés) • 10€/séance (licenciés) • Pack 4 séances : 10€ (non licenciés)
              </p>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-cheddar font-semibold text-gray-900 mb-4">
                Planning du Stage
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-montserrat">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar size={20} className="text-primary" />
                    <strong className="text-gray-900">Dates</strong>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• 22 et 23 décembre 2024</div>
                    <div>• 29 et 30 décembre 2024</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock size={20} className="text-primary" />
                    <strong className="text-gray-900">Horaires</strong>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• 10h30-12h30 : Moins de 12 ans</div>
                    <div>• 14h-16h : Plus de 12 ans</div>
                    <div>• 16h-18h : Groupe compétition</div>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Euro size={20} className="text-orange-600" />
                  <strong className="text-gray-900">Tarif</strong>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Non licenciés :</strong> 15€/séance • Pack 4 séances : 10€</p>
                  <p><strong>Licenciés :</strong> 10€/séance</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-cheddar font-semibold text-blue-900 mb-3">
                Pourquoi participer ?
              </h3>
              <div className="space-y-2 text-left font-montserrat text-blue-800">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Progressez rapidement pendant les vacances</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Encadrement professionnel par coach diplômé</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Groupes adaptés à chaque âge et niveau</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Activité sportive pendant les vacances</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#formulaire"
                className="bg-primary hover:bg-secondary text-white font-montserrat font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <CheckCircle size={20} />
                <span>S'inscrire au stage</span>
              </a>
              <a
                href="/contact"
                className="bg-gray-600 hover:bg-gray-700 text-white font-montserrat font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Mail size={20} />
                <span>Nous contacter</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16" id="formulaire">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-cheddar font-bold text-gray-900 mb-4 text-center">
              Formulaire d'inscription au stage
            </h2>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} className="text-primary" />
                <p className="text-gray-800 font-montserrat font-medium">
                  Inscrivez-vous dès maintenant au stage de Noël 2024 ! Places limitées.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informations Personnelles */}
              <div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4 flex items-center">
                  <User className="mr-2" />
                  Informations personnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="ex: Martin"
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
                      onChange={handleInputChange}
                      required
                      placeholder="ex: John"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Date de naissance <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                    <p className="text-xs text-gray-500 mt-1">Âge minimum: 6 ans (avec autorisation parentale pour les mineurs).</p>
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Sexe <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="Masculin">Masculin</option>
                      <option value="Féminin">Féminin</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Type d'Adhésion */}
              <div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="mr-2" />
                  Type d'adhésion
                </h3>
                <div className="space-y-3">
                  {adhesionTypes.map((type) => (
                    <div key={type.value} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={type.value}
                        checked={formData.adhesionType.includes(type.label)}
                        onChange={() => handleAdhesionTypeChange(type.value)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <label htmlFor={type.value} className="text-sm font-montserrat text-gray-700">
                        {type.label}
                      </label>
                    </div>
                  ))}
                  
                  {formData.adhesionType.includes('En provenance d\'un autre club') && (
                    <div className="mt-3">
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                        Nom du club d'origine
                      </label>
                      <input
                        type="text"
                        name="otherClub"
                        value={formData.otherClub}
                        onChange={handleInputChange}
                        placeholder="ex: Club de Parkour de Lyon"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Adresse */}
              <div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="mr-2" />
                  Adresse
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Adresse <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="ex: 123 Rue de la Paix"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                        Code postal <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        placeholder="ex: 69000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                        Ville <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="ex: Lyon"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Coordonnées */}
              <div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4 flex items-center">
                  <Phone className="mr-2" />
                  Coordonnées
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="ex: martin.john@gmail.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                </div>
              </div>

              {/* Responsables Légaux (si mineur) */}
              {isMinor() && (
                <div>
                  <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="mr-2" />
                    Responsables Légaux
                  </h3>
                  <div className="space-y-6">
                    {/* Responsable 1 */}
                    <div>
                      <h4 className="text-lg font-cheddar font-semibold text-gray-800 mb-3">Responsable 1</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                            Civilité
                          </label>
                          <select
                            value={formData.legalGuardian1.title}
                            onChange={(e) => handleLegalGuardianChange(0, 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                          >
                            <option value="">Sélectionnez</option>
                            <option value="Mme">Mme</option>
                            <option value="Mr">Mr</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                            Nom
                          </label>
                          <input
                            type="text"
                            value={formData.legalGuardian1.lastName}
                            onChange={(e) => handleLegalGuardianChange(0, 'lastName', e.target.value)}
                            placeholder="ex: John"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                            Prénom
                          </label>
                          <input
                            type="text"
                            value={formData.legalGuardian1.firstName}
                            onChange={(e) => handleLegalGuardianChange(0, 'firstName', e.target.value)}
                            placeholder="ex: Jean"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            value={formData.legalGuardian1.phone}
                            onChange={(e) => handleLegalGuardianChange(0, 'phone', e.target.value)}
                            placeholder="ex: 06 11 22 33 44"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.legalGuardian1.email}
                          onChange={(e) => handleLegalGuardianChange(0, 'email', e.target.value)}
                          placeholder="ex: jean.john@gmail.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                        />
                      </div>
                    </div>

                    {/* Responsable 2 */}
                    <div>
                      <h4 className="text-lg font-cheddar font-semibold text-gray-800 mb-3">Responsable 2</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                            Civilité
                          </label>
                          <select
                            value={formData.legalGuardian2.title}
                            onChange={(e) => handleLegalGuardianChange(1, 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                          >
                            <option value="">Sélectionnez</option>
                            <option value="Mme">Mme</option>
                            <option value="Mr">Mr</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                            Nom
                          </label>
                          <input
                            type="text"
                            value={formData.legalGuardian2.lastName}
                            onChange={(e) => handleLegalGuardianChange(1, 'lastName', e.target.value)}
                            placeholder="ex: John"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                            Prénom
                          </label>
                          <input
                            type="text"
                            value={formData.legalGuardian2.firstName}
                            onChange={(e) => handleLegalGuardianChange(1, 'firstName', e.target.value)}
                            placeholder="ex: Marie"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            value={formData.legalGuardian2.phone}
                            onChange={(e) => handleLegalGuardianChange(1, 'phone', e.target.value)}
                            placeholder="ex: 06 98 76 54 32"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.legalGuardian2.email}
                          onChange={(e) => handleLegalGuardianChange(1, 'email', e.target.value)}
                          placeholder="ex: marie.john@gmail.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact d'Urgence */}
              <div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="mr-2" />
                  Contact d'Urgence
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Personne disponible sur les horaires d'entraînement en cas d'urgence
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Nom et Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact.name}
                      onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                      required
                      placeholder="ex: Marie John"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                      required
                      placeholder="ex: 06 98 76 54 32"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
                </div>
              </div>

              {/* Droit à l'Image */}
              <div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4 flex items-center">
                  <Camera className="mr-2" />
                  Droit à l'Image
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-700 font-montserrat mb-3">
                    <strong>Des photos où apparaît mon enfant peuvent être prises au cours des différentes manifestations auxquelles participe l'association ou organisées par elle.</strong>
                  </p>
                  <p className="text-sm text-gray-600 font-montserrat mb-2">
                    Je note que je ne suis pas obligé(e) de les acheter. Ces photos peuvent être utilisées dans le cadre de la promotion de PKBA (Presse, affichage, site web, etc.).
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="imageRights"
                    checked={formData.imageRights}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label className="text-sm font-montserrat text-gray-700">
                    J'accepte l'utilisation de mon image (ou de celle de mon enfant si mineur) dans le cadre de la promotion de PKBA
                  </label>
                </div>
              </div>

              {/* Règlement Intérieur */}
              <div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="mr-2" />
                  Règlement Intérieur
                </h3>
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
                    Vu et pris connaissance du <a href="/reglement-interieur" className="text-primary hover:underline font-semibold">règlement intérieur</a> *
                  </label>
                </div>
              </div>

              {/* Signature */}
              <div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4 flex items-center">
                  <PenTool className="mr-2" />
                  Signature et Date
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                      Signature <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                      <canvas
                        ref={canvasRef}
                        width={400}
                        height={150}
                        className="border border-gray-300 rounded cursor-crosshair"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                      />
                      <div className="mt-2 flex space-x-2">
                        <button
                          type="button"
                          onClick={clearSignature}
                          className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Effacer
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                      Date de préinscription <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="signatureDate"
                      value={formData.signatureDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-montserrat"
                    />
                  </div>
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
                disabled={isSubmitting || isTooYoung() || !formData.signature}
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
                    <span>
                      {isTooYoung() 
                        ? 'Âge minimum 6 ans requis' 
                        : !formData.signature 
                          ? 'Signature requise' 
                          : "S'inscrire au stage"
                      }
                    </span>
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