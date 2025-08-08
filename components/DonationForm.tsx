'use client'

import { useState, useRef } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import emailjs from '@emailjs/browser'
import { Calendar, Upload, FileText, Heart } from 'lucide-react'

interface DonationFormData {
  nom: string
  prenom: string
  raisonSociale: string
  adresse: string
  codePostal: string
  ville: string
  telephone: string
  email: string
  montant: string
  signature: string | null
}

export default function DonationForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [signatureData, setSignatureData] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentDate] = useState(new Date().toLocaleDateString('fr-FR'))

  const [formData, setFormData] = useState<DonationFormData>({
    nom: '',
    prenom: '',
    raisonSociale: '',
    adresse: '',
    codePostal: '',
    ville: '',
    telephone: '',
    email: '',
    montant: '',
    signature: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = '#1f2937'
    ctx.lineWidth = 2
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      setSignatureData(canvas.toDataURL())
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setSignatureData(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      console.error('Stripe not loaded')
      return
    }

    if (!signatureData) {
      alert('Veuillez signer le formulaire')
      return
    }

    setIsLoading(true)

    try {
      // Create payment intent
      const response = await fetch('/api/create-donation-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(parseFloat(formData.montant) * 100), // Convert to cents
          currency: 'eur',
        }),
      })

      const { clientSecret } = await response.json()

      // Confirm payment
      const { error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: `${formData.prenom} ${formData.nom}`,
            email: formData.email,
          },
        },
      })

      if (paymentError) {
        console.error('Payment error:', paymentError)
        alert('Erreur de paiement: ' + paymentError.message)
        return
      }

      // Send email with EmailJS
      const templateParams = {
        to_name: `${formData.prenom} ${formData.nom}`,
        from_name: 'PKBA',
        nom: formData.nom,
        prenom: formData.prenom,
        raison_sociale: formData.raisonSociale,
        adresse: formData.adresse,
        code_postal: formData.codePostal,
        ville: formData.ville,
        telephone: formData.telephone,
        email: formData.email,
        montant: formData.montant,
        date: currentDate,
        signature: signatureData,
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      alert('Don effectué avec succès! Un reçu vous sera envoyé par email.')
      
      // Reset form
      setFormData({
        nom: '',
        prenom: '',
        raisonSociale: '',
        adresse: '',
        codePostal: '',
        ville: '',
        telephone: '',
        email: '',
        montant: '',
        signature: null
      })
      clearSignature()

    } catch (error) {
      console.error('Error:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8">
      <div className="text-center mb-8">
        <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Formulaire de Don
        </h2>
        <p className="text-gray-600">
          Je soussigné(e)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom *
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prénom *
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Raison sociale
            </label>
            <input
              type="text"
              name="raisonSociale"
              value={formData.raisonSociale}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Montant (€) *
            </label>
            <input
              type="number"
              name="montant"
              value={formData.montant}
              onChange={handleInputChange}
              min="1"
              step="0.01"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse complète *
          </label>
          <textarea
            name="adresse"
            value={formData.adresse}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code postal *
            </label>
            <input
              type="text"
              name="codePostal"
              value={formData.codePostal}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ville *
            </label>
            <input
              type="text"
              name="ville"
              value={formData.ville}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Informations légales
          </h3>
          <p className="text-gray-700 mb-4">
            Un reçu vous sera adressé par PKBA afin de vous permettre de bénéficier 
            des dispositions des articles 200, 200 bis et 238 bis du code des Impôts.
          </p>
          <p className="text-sm text-gray-600">
            Date: {currentDate}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Signature *
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="border border-gray-300 rounded bg-white cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={clearSignature}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Effacer
              </button>
              <span className="text-sm text-gray-600 flex items-center">
                Signez dans la zone ci-dessus
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Paiement sécurisé
          </h3>
          <div className="border border-gray-300 rounded-lg p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !signatureData}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Traitement en cours...
            </div>
          ) : (
            <>
              <Heart className="w-5 h-5 mr-2" />
              Effectuer le don
            </>
          )}
        </button>
      </form>
    </div>
  )
}
