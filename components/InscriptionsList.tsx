'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  RefreshCw
} from 'lucide-react'

interface Inscription {
  id: string
  fields: {
    'Nom': string
    'Prénom': string
    'Date de naissance': string
    'Sexe': string
    'Type d\'adhésion': string[]
    'Club d\'origine'?: string
    'Adresse': string
    'Code postal': string
    'Ville': string
    'Téléphone': string
    'Email': string
    'Responsable 1 - Civilité'?: string
    'Responsable 1 - Nom'?: string
    'Responsable 1 - Prénom'?: string
    'Responsable 1 - Téléphone'?: string
    'Responsable 1 - Email'?: string
    'Responsable 2 - Civilité'?: string
    'Responsable 2 - Nom'?: string
    'Responsable 2 - Prénom'?: string
    'Responsable 2 - Téléphone'?: string
    'Responsable 2 - Email'?: string
    'Contact d\'urgence - Nom': string
    'Contact d\'urgence - Téléphone': string
                       'Droit à l\'image': boolean
                   'Règlement intérieur accepté': boolean
    'Signature': string
    'Date d\'inscription': string
    'Statut': string
    'Certificat médical': string
  }
}

const InscriptionsList = () => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [filteredInscriptions, setFilteredInscriptions] = useState<Inscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [medicalFilter, setMedicalFilter] = useState('')
  const [selectedInscription, setSelectedInscription] = useState<Inscription | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [previousCount, setPreviousCount] = useState(0)

  useEffect(() => {
    fetchInscriptions()
  }, [])

  // Auto-refresh every 30 seconds to get new inscriptions
  useEffect(() => {
    const interval = setInterval(() => {
      fetchInscriptions()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [inscriptions.length]) // Re-run when inscriptions count changes

  useEffect(() => {
    filterInscriptions()
  }, [inscriptions, searchTerm, statusFilter, medicalFilter])

  
  

  const fetchInscriptions = async (forceRefresh = false) => {
    try {
      console.log('=== FETCHING INSCRIPTIONS START ===')
      console.log('Force refresh:', forceRefresh)
      console.log('Current inscriptions before fetch:', inscriptions.length)
      console.log('Current filtered inscriptions before fetch:', filteredInscriptions.length)
      console.log('Setting refreshing to true...')
      setRefreshing(true)
      
      // Add timestamp to prevent caching when force refresh
      const url = forceRefresh 
        ? `/api/get-inscriptions?t=${Date.now()}`
        : '/api/get-inscriptions'
      
      console.log('Making API call to:', url)
      const response = await fetch(url, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      console.log('API response status:', response.status)
      console.log('API response ok:', response.ok)
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des inscriptions')
      }
      
      const data = await response.json()
      console.log('API response data:', data)
      console.log('Number of inscriptions received:', data.inscriptions?.length || 0)
      
      const newCount = data.inscriptions?.length || 0
      
      // Check if there are new inscriptions
      if (previousCount > 0 && newCount > previousCount) {
        const newInscriptions = newCount - previousCount
        console.log(`${newInscriptions} nouvelle(s) inscription(s) trouvée(s)`)
      }
      
      console.log('Setting inscriptions state with new data...')
      setInscriptions(data.inscriptions || [])
      console.log('Setting previous count to:', newCount)
      setPreviousCount(newCount)
      console.log('Setting last updated to:', new Date())
      setLastUpdated(new Date())
      console.log('=== INSCRIPTIONS UPDATED SUCCESSFULLY ===')
    } catch (err) {
      console.error('=== ERROR IN FETCH INSCRIPTIONS ===')
      console.error('Error details:', err)
      setError('Impossible de charger les inscriptions')
    } finally {
      console.log('Setting loading to false...')
      setLoading(false)
      console.log('Setting refreshing to false...')
      setRefreshing(false)
      console.log('=== FETCHING INSCRIPTIONS END ===')
    }
  }

  const filterInscriptions = () => {
    console.log('=== FILTERING INSCRIPTIONS ===')
    console.log('Total inscriptions to filter:', inscriptions.length)
    console.log('Current search term:', searchTerm)
    console.log('Current status filter:', statusFilter)
    console.log('Current medical filter:', medicalFilter)
    
    let filtered = inscriptions

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(inscription => 
        inscription.fields['Prénom'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.fields['Nom'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.fields['Email'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.fields['Ville'].toLowerCase().includes(searchTerm.toLowerCase())
      )
      console.log('After search filter:', filtered.length)
    }

    // Filtre par statut
    if (statusFilter) {
      filtered = filtered.filter(inscription => 
        inscription.fields['Statut'] === statusFilter
      )
      console.log('After status filter:', filtered.length)
    }

    // Filtre par certificat médical
    if (medicalFilter) {
      filtered = filtered.filter(inscription => 
        inscription.fields['Certificat médical'] === medicalFilter
      )
      console.log('After medical filter:', filtered.length)
    }

    console.log('Final filtered count:', filtered.length)
    console.log('Setting filtered inscriptions...')
    setFilteredInscriptions(filtered)
    console.log('=== FILTERING COMPLETE ===')
  }

  const updateStatus = async (inscriptionId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/update-inscription-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inscriptionId, status: newStatus })
      })

      if (response.ok) {
        setInscriptions(prev => prev.map(inscription => 
          inscription.id === inscriptionId 
            ? { ...inscription, fields: { ...inscription.fields, 'Statut': newStatus } }
            : inscription
        ))
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err)
    }
  }

  const updateMedicalStatus = async (inscriptionId: string, medicalStatus: string) => {
    try {
      const response = await fetch('/api/update-inscription-medical', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inscriptionId, medicalStatus })
      })

      if (response.ok) {
        setInscriptions(prev => prev.map(inscription => 
          inscription.id === inscriptionId 
            ? { ...inscription, fields: { ...inscription.fields, 'Certificat médical': medicalStatus } }
            : inscription
        ))
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut médical:', err)
    }
  }

  const exportToCSV = () => {
    const headers = [
      'Nom', 'Prénom', 'Date de naissance', 'Sexe', 'Type d\'adhésion',
      'Club d\'origine', 'Adresse', 'Code postal', 'Ville', 'Téléphone', 'Email',
      'Responsable 1 - Civilité', 'Responsable 1 - Nom', 'Responsable 1 - Prénom', 'Responsable 1 - Téléphone', 'Responsable 1 - Email',
      'Responsable 2 - Civilité', 'Responsable 2 - Nom', 'Responsable 2 - Prénom', 'Responsable 2 - Téléphone', 'Responsable 2 - Email',
      'Contact d\'urgence - Nom', 'Contact d\'urgence - Téléphone',
      'Droit à l\'image', 'Règlement intérieur accepté', 'Signature', 'Date d\'inscription',
      'Statut', 'Certificat médical'
    ]

    const csvContent = [
      headers.join(','),
      ...filteredInscriptions.map(inscription => [
        inscription.fields['Nom'],
        inscription.fields['Prénom'],
        inscription.fields['Date de naissance'],
        inscription.fields['Sexe'],
        inscription.fields['Type d\'adhésion'].join(','),
        inscription.fields['Club d\'origine'] || '',
        inscription.fields['Adresse'],
        inscription.fields['Code postal'],
        inscription.fields['Ville'],
        inscription.fields['Téléphone'],
        inscription.fields['Email'],
        inscription.fields['Responsable 1 - Civilité'] || '',
        inscription.fields['Responsable 1 - Nom'] || '',
        inscription.fields['Responsable 1 - Prénom'] || '',
        inscription.fields['Responsable 1 - Téléphone'] || '',
        inscription.fields['Responsable 1 - Email'] || '',
        inscription.fields['Responsable 2 - Civilité'] || '',
        inscription.fields['Responsable 2 - Nom'] || '',
        inscription.fields['Responsable 2 - Prénom'] || '',
        inscription.fields['Responsable 2 - Téléphone'] || '',
        inscription.fields['Responsable 2 - Email'] || '',
        inscription.fields['Contact d\'urgence - Nom'],
        inscription.fields['Contact d\'urgence - Téléphone'],
        inscription.fields['Droit à l\'image'],
        inscription.fields['Règlement intérieur accepté'],
        inscription.fields['Signature'],
        inscription.fields['Date d\'inscription'],
        inscription.fields['Statut'],
        inscription.fields['Certificat médical']
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `inscriptions_pkba_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente': return 'bg-yellow-100 text-yellow-800'
      case 'Validée': return 'bg-green-100 text-green-800'
      case 'Refusée': return 'bg-red-100 text-red-800'
      case 'Nouvelle inscription': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMedicalColor = (medical: string) => {
    switch (medical) {
      case 'Vérifié': return 'bg-green-100 text-green-800'
      case 'Manquant': return 'bg-red-100 text-red-800'
      case 'Non vérifié': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchInscriptions(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 p-6">

      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-cheddar font-bold text-gray-900 mb-2">
                Liste des Inscriptions
                {previousCount > 0 && inscriptions.length > previousCount && (
                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Nouveau!
                  </span>
                )}
              </h1>
              <p className="text-gray-600">
                {filteredInscriptions.length} inscription(s) trouvée(s) sur {inscriptions.length} total
              </p>
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-1">
                  Dernière mise à jour : {lastUpdated.toLocaleTimeString('fr-FR')}
                </p>
              )}
            </div>
            <div className="flex space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => {
                  console.log('=== ACTUALISER BUTTON CLICKED ===')
                  console.log('Button clicked at:', new Date().toISOString())
                  console.log('Current refreshing state:', refreshing)
                  console.log('Current inscriptions count:', inscriptions.length)
                  
                  // Force refresh with cache busting
                  fetchInscriptions(true)
                }}
                disabled={refreshing}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
                <span>{refreshing ? 'Actualisation...' : 'Actualiser'}</span>
              </button>
              <button
                onClick={exportToCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <Download size={20} />
                <span>Exporter CSV</span>
              </button>
              
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recherche
              </label>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nom, prénom, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              {/* Note: These values must exist in your Airtable base as Single Select options */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Tous les statuts</option>
                <option value="En attente">En attente</option>
                <option value="Validée">Validée</option>
                <option value="Refusée">Refusée</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificat Médical
              </label>
              <select
                value={medicalFilter}
                onChange={(e) => setMedicalFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Tous</option>
                <option value="Vérifié">Vérifié</option>
                <option value="Non vérifié">Non vérifié</option>
                <option value="Manquant">Manquant</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('')
                  setMedicalFilter('')
                }}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {/* Liste des inscriptions */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adhérent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adresse
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Médical
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInscriptions.map((inscription) => (
                  <tr key={inscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {inscription.fields['Prénom']} {inscription.fields['Nom']}
                        </div>
                        <div className="text-sm text-gray-500">
                          {inscription.fields['Date de naissance']} • {inscription.fields['Sexe']}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <Phone size={16} className="text-gray-400" />
                          <span>{inscription.fields['Téléphone']}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Mail size={16} className="text-gray-400" />
                          <span>{inscription.fields['Email']}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-gray-400" />
                          <span>{inscription.fields['Ville']}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {inscription.fields['Code postal']}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={inscription.fields['Statut']}
                        onChange={(e) => updateStatus(inscription.id, e.target.value)}
                        className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(inscription.fields['Statut'])}`}
                      >
                        {/* Note: These values must exist in your Airtable base as Single Select options */}
                        <option value="En attente">En attente</option>
                        <option value="Validée">Validée</option>
                        <option value="Refusée">Refusée</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={inscription.fields['Certificat médical']}
                        onChange={(e) => updateMedicalStatus(inscription.id, e.target.value)}
                        className={`text-sm px-3 py-1 rounded-full font-medium ${getMedicalColor(inscription.fields['Certificat médical'])}`}
                      >
                        <option value="Non vérifié">Non vérifié</option>
                        <option value="Vérifié">Vérifié</option>
                        <option value="Manquant">Manquant</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                                         onClick={() => setSelectedInscription(inscription)}
                        className="text-primary hover:text-secondary"
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de détails */}
        {selectedInscription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-cheddar font-bold text-gray-900">
                    Détails de l'inscription
                  </h3>
                  <button
                                             onClick={() => setSelectedInscription(null)}
                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Informations personnelles */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Informations Personnelles</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Prénom:</span>
                        <span className="ml-2 text-gray-900">{selectedInscription.fields['Prénom']}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Nom:</span>
                        <span className="ml-2 text-gray-900">{selectedInscription.fields['Nom']}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Date de naissance:</span>
                        <span className="ml-2 text-gray-900">{selectedInscription.fields['Date de naissance']}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Sexe:</span>
                        <span className="ml-2 text-gray-900">{selectedInscription.fields['Sexe']}</span>
                      </div>
                    </div>
                  </div>

                  {/* Adhésion */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Adhésion</h4>
                    <div className="text-sm">
                      <div className="mb-2">
                        <span className="font-medium text-gray-600">Type:</span>
                        <span className="ml-2 text-gray-900">{selectedInscription.fields['Type d\'adhésion'].join(', ')}</span>
                      </div>
                      {selectedInscription.fields['Club d\'origine'] && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-600">Club d'origine:</span>
                          <span className="ml-2 text-gray-900">{selectedInscription.fields['Club d\'origine']}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Responsables légaux si mineur */}
                  {(selectedInscription.fields['Responsable 1 - Nom'] || selectedInscription.fields['Responsable 1 - Prénom']) && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Responsables Légaux</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Responsable 1:</span>
                          <span className="ml-2 text-gray-900">
                            {selectedInscription.fields['Responsable 1 - Prénom']} {selectedInscription.fields['Responsable 1 - Nom']}
                          </span>
                          <div className="ml-4 text-gray-500">
                            {selectedInscription.fields['Responsable 1 - Téléphone']} • {selectedInscription.fields['Responsable 1 - Email']}
                          </div>
                        </div>
                        {selectedInscription.fields['Responsable 2 - Nom'] && (
                          <div>
                            <span className="font-medium text-gray-600">Responsable 2:</span>
                            <span className="ml-2 text-gray-900">
                              {selectedInscription.fields['Responsable 2 - Prénom']} {selectedInscription.fields['Responsable 2 - Nom']}
                            </span>
                            <div className="ml-4 text-gray-500">
                              {selectedInscription.fields['Responsable 2 - Téléphone']} • {selectedInscription.fields['Responsable 2 - Email']}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact d'urgence */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact d'Urgence</h4>
                    <div className="text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Nom:</span>
                        <span className="ml-2 text-gray-900">{selectedInscription.fields['Contact d\'urgence - Nom']}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Téléphone:</span>
                        <span className="ml-2 text-gray-900">{selectedInscription.fields['Contact d\'urgence - Téléphone']}</span>
                      </div>
                    </div>
                  </div>

                  {/* Consentements */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Consentements</h4>
                    <div className="text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Droit à l'image:</span>
                        <span className="ml-2 text-gray-900">{selectedInscription.fields['Droit à l\'image']}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Règlement intérieur:</span>
                        <span className="ml-2 text-gray-900">{selectedInscription.fields['Règlement intérieur accepté']}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Dates</h4>
                    <div className="text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Date d'inscription:</span>
                        <span className="ml-2 text-gray-900">{selectedInscription.fields['Date d\'inscription']}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InscriptionsList
