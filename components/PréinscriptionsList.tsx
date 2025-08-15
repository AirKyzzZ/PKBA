'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  AlertCircle,
  Shield,
  Camera,
  FileText,
  PenTool,
  Users,
  Award,
  Clock as ClockIcon,
  Shield as ShieldIcon
} from 'lucide-react'

interface Préinscription {
  id: string
  fields: {
    'Nom': string
    'Prénom': string
    'Date de naissance': string
    'Sexe': string
    'Type d\'adhésion': string
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

const PréinscriptionsList = () => {
  const [inscriptions, setInscriptions] = useState<Préinscription[]>([])
  const [filteredInscriptions, setFilteredInscriptions] = useState<Préinscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [medicalFilter, setMedicalFilter] = useState('')
  const [selectedInscription, setSelectedInscription] = useState<Préinscription | null>(null)
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
      console.log('=== FETCHING PRÉINSCRIPTIONS START ===')
      console.log('Force refresh:', forceRefresh)
      console.log('Current préinscriptions before fetch:', inscriptions.length)
      console.log('Current filtered préinscriptions before fetch:', filteredInscriptions.length)
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
        throw new Error('Erreur lors de la récupération des préinscriptions')
      }
      
      const data = await response.json()
      console.log('API response data:', data)
      console.log('Number of préinscriptions received:', data.inscriptions?.length || 0)
      
      const newCount = data.inscriptions?.length || 0
      
      // Check if there are new inscriptions
      if (previousCount > 0 && newCount > previousCount) {
        const newInscriptions = newCount - previousCount
        console.log(`${newInscriptions} nouvelle(s) préinscription(s) trouvée(s)`)
      }
      
      console.log('Setting préinscriptions state with new data...')
      setInscriptions(data.inscriptions || [])
      console.log('Setting previous count to:', newCount)
      setPreviousCount(newCount)
      console.log('Setting last updated to:', new Date())
      setLastUpdated(new Date())
      console.log('=== PRÉINSCRIPTIONS UPDATED SUCCESSFULLY ===')
    } catch (err) {
      console.error('=== ERROR IN FETCH PRÉINSCRIPTIONS ===')
      console.error('Error details:', err)
              setError('Impossible de charger les préinscriptions')
    } finally {
      console.log('Setting loading to false...')
      setLoading(false)
      console.log('Setting refreshing to false...')
      setRefreshing(false)
      console.log('=== FETCHING PRÉINSCRIPTIONS END ===')
    }
  }

  const filterInscriptions = () => {
    console.log('=== FILTERING PRÉINSCRIPTIONS ===')
    console.log('Total préinscriptions to filter:', inscriptions.length)
    console.log('Current search term:', searchTerm)
    console.log('Current status filter:', statusFilter)
    console.log('Current medical filter:', medicalFilter)
    
    let filtered = inscriptions

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(inscription => 
        inscription.fields['Nom']?.toLowerCase().includes(searchLower) ||
        inscription.fields['Prénom']?.toLowerCase().includes(searchLower) ||
        inscription.fields['Email']?.toLowerCase().includes(searchLower) ||
        inscription.fields['Téléphone']?.includes(searchTerm)
      )
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(inscription => 
        inscription.fields['Statut'] === statusFilter
      )
    }

    // Medical filter
    if (medicalFilter) {
      filtered = filtered.filter(inscription => 
        inscription.fields['Certificat médical'] === medicalFilter
      )
    }

    console.log('Filtered préinscriptions count:', filtered.length)
    setFilteredInscriptions(filtered)
  }

  const updateInscriptionStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/update-inscription-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status })
      })

      if (response.ok) {
        // Update local state
        setInscriptions(prev => prev.map(inscription => 
          inscription.id === id 
            ? { ...inscription, fields: { ...inscription.fields, 'Statut': status } }
            : inscription
        ))
        setSelectedInscription(null)
      } else {
        console.error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const updateMedicalStatus = async (id: string, medicalStatus: string) => {
    try {
      const response = await fetch('/api/update-inscription-medical', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, medicalStatus })
      })

      if (response.ok) {
        // Update local state
        setInscriptions(prev => prev.map(inscription => 
          inscription.id === id 
            ? { ...inscription, fields: { ...inscription.fields, 'Certificat médical': medicalStatus } }
            : inscription
        ))
        setSelectedInscription(null)
      } else {
        console.error('Failed to update medical status')
      }
    } catch (error) {
      console.error('Error updating medical status:', error)
    }
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

  const getMedicalColor = (status: string) => {
    switch (status) {
      case 'Vérifié': return 'bg-green-100 text-green-800'
      case 'Manquant': return 'bg-red-100 text-red-800'
      case 'Non vérifié': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Non renseigné'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    } catch {
      return 'Date invalide'
    }
  }

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 'Non renseigné'
    try {
      const birth = new Date(birthDate)
      const today = new Date()
      let age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
      }
      return `${age} ans`
    } catch {
      return 'Âge invalide'
    }
  }

  const exportToCSV = () => {
    const headers = [
      'Nom', 'Prénom', 'Date de naissance', 'Sexe', 'Type d\'adhésion', 'Club d\'origine',
      'Adresse', 'Code postal', 'Ville', 'Téléphone', 'Email',
      'Responsable 1 - Civilité', 'Responsable 1 - Nom', 'Responsable 1 - Prénom', 'Responsable 1 - Téléphone', 'Responsable 1 - Email',
      'Responsable 2 - Civilité', 'Responsable 2 - Nom', 'Responsable 2 - Prénom', 'Responsable 2 - Téléphone', 'Responsable 2 - Email',
      'Contact d\'urgence - Nom', 'Contact d\'urgence - Téléphone',
      'Droit à l\'image', 'Règlement intérieur accepté', 'Signature', 'Date d\'inscription',
      'Statut', 'Certificat médical'
    ]

    const csvContent = [
      headers.join(','),
      ...filteredInscriptions.map(inscription => [
        inscription.fields['Nom'] || '',
        inscription.fields['Prénom'] || '',
        inscription.fields['Date de naissance'] || '',
        inscription.fields['Sexe'] || '',
        inscription.fields['Type d\'adhésion'] || '',
        inscription.fields['Club d\'origine'] || '',
        inscription.fields['Adresse'] || '',
        inscription.fields['Code postal'] || '',
        inscription.fields['Ville'] || '',
        inscription.fields['Téléphone'] || '',
        inscription.fields['Email'] || '',
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
        inscription.fields['Contact d\'urgence - Nom'] || '',
        inscription.fields['Contact d\'urgence - Téléphone'] || '',
        inscription.fields['Droit à l\'image'] ? 'Oui' : 'Non',
        inscription.fields['Règlement intérieur accepté'] ? 'Oui' : 'Non',
        inscription.fields['Signature'] || '',
        inscription.fields['Date d\'inscription'] || '',
        inscription.fields['Statut'] || '',
        inscription.fields['Certificat médical'] || ''
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `préinscriptions-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Chargement des préinscriptions...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => fetchInscriptions(true)}
              className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestion des Préinscriptions
            </h1>
            <p className="text-gray-600">
                              {inscriptions.length} préinscription(s) au total
              {lastUpdated && (
                <span className="ml-2 text-sm text-gray-500">
                  • Dernière mise à jour : {lastUpdated.toLocaleTimeString('fr-FR')}
                </span>
              )}
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <button
              onClick={() => fetchInscriptions(true)}
              disabled={refreshing}
              className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Actualiser</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FileText className="w-4 h-4" />
              <span>Exporter CSV</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Tous les statuts</option>
                <option value="En attente">En attente</option>
                <option value="Validée">Validée</option>
                <option value="Refusée">Refusée</option>
                <option value="Nouvelle inscription">Nouvelle inscription</option>
              </select>
            </div>

            {/* Medical Filter */}
            <div>
              <select
                value={medicalFilter}
                onChange={(e) => setMedicalFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Tous les certificats</option>
                <option value="En attente">En attente</option>
                <option value="Vérifié">Vérifié</option>
                <option value="Manquant">Manquant</option>
                <option value="Non vérifié">Non vérifié</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 flex items-center justify-center">
              {filteredInscriptions.length} résultat(s)
            </div>
          </div>
        </div>

        {/* Préinscriptions List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                    Âge
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Médical
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
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
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {inscription.fields['Prénom']} {inscription.fields['Nom']}
                          </div>
                          <div className="text-sm text-gray-500">
                            {inscription.fields['Sexe']}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{inscription.fields['Email']}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{inscription.fields['Téléphone']}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {calculateAge(inscription.fields['Date de naissance'])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inscription.fields['Statut'])}`}>
                        {inscription.fields['Statut'] || 'Non défini'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMedicalColor(inscription.fields['Certificat médical'])}`}>
                        {inscription.fields['Certificat médical'] || 'Non défini'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(inscription.fields['Date d\'inscription'])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedInscription(inscription)}
                        className="text-primary hover:text-secondary transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredInscriptions.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune préinscription trouvée</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter || medicalFilter 
                ? 'Essayez de modifier vos critères de recherche.'
                : 'Aucune préinscription n\'a encore été soumise.'
              }
            </p>
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedInscription && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedInscription(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Détails de la Préinscription
                    </h2>
                    <button
                      onClick={() => setSelectedInscription(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Informations Personnelles
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Nom complet</label>
                          <p className="text-gray-900">
                            {selectedInscription.fields['Prénom']} {selectedInscription.fields['Nom']}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Date de naissance</label>
                          <p className="text-gray-900">
                            {formatDate(selectedInscription.fields['Date de naissance'])} 
                            ({calculateAge(selectedInscription.fields['Date de naissance'])})
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Sexe</label>
                          <p className="text-gray-900">{selectedInscription.fields['Sexe']}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Mail className="w-5 h-5 mr-2" />
                        Coordonnées
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <p className="text-gray-900">{selectedInscription.fields['Email']}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Téléphone</label>
                          <p className="text-gray-900">{selectedInscription.fields['Téléphone']}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Adresse</label>
                          <p className="text-gray-900">
                            {selectedInscription.fields['Adresse']}<br />
                            {selectedInscription.fields['Code postal']} {selectedInscription.fields['Ville']}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Adhesion Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Type d'Adhésion
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Type</label>
                          <p className="text-gray-900">{selectedInscription.fields['Type d\'adhésion'] || 'Non renseigné'}</p>
                        </div>
                        {selectedInscription.fields['Club d\'origine'] && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">Club d'origine</label>
                            <p className="text-gray-900">{selectedInscription.fields['Club d\'origine']}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Contact d'Urgence
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Nom</label>
                          <p className="text-gray-900">{selectedInscription.fields['Contact d\'urgence - Nom']}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Téléphone</label>
                          <p className="text-gray-900">{selectedInscription.fields['Contact d\'urgence - Téléphone']}</p>
                        </div>
                      </div>
                    </div>

                    {/* Legal Guardians (if minor) */}
                    {(selectedInscription.fields['Responsable 1 - Nom'] || selectedInscription.fields['Responsable 2 - Nom']) && (
                      <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          Responsables Légaux
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedInscription.fields['Responsable 1 - Nom'] && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-900 mb-2">Responsable 1</h4>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Civilité:</span> {selectedInscription.fields['Responsable 1 - Civilité']}</p>
                                <p><span className="font-medium">Nom:</span> {selectedInscription.fields['Responsable 1 - Nom']}</p>
                                <p><span className="font-medium">Prénom:</span> {selectedInscription.fields['Responsable 1 - Prénom']}</p>
                                <p><span className="font-medium">Téléphone:</span> {selectedInscription.fields['Responsable 1 - Téléphone']}</p>
                                <p><span className="font-medium">Email:</span> {selectedInscription.fields['Responsable 1 - Email']}</p>
                              </div>
                            </div>
                          )}
                          {selectedInscription.fields['Responsable 2 - Nom'] && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-900 mb-2">Responsable 2</h4>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Civilité:</span> {selectedInscription.fields['Responsable 2 - Civilité']}</p>
                                <p><span className="font-medium">Nom:</span> {selectedInscription.fields['Responsable 2 - Nom']}</p>
                                <p><span className="font-medium">Prénom:</span> {selectedInscription.fields['Responsable 2 - Prénom']}</p>
                                <p><span className="font-medium">Téléphone:</span> {selectedInscription.fields['Responsable 2 - Téléphone']}</p>
                                <p><span className="font-medium">Email:</span> {selectedInscription.fields['Responsable 2 - Email']}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Consents */}
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Consentements
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Camera className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            Droit à l'image: {selectedInscription.fields['Droit à l\'image'] ? 'Oui' : 'Non'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            Règlement intérieur: {selectedInscription.fields['Règlement intérieur accepté'] ? 'Accepté' : 'Non accepté'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Management */}
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestion du Statut</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Statut de la préinscription</label>
                          <select
                            value={selectedInscription.fields['Statut'] || ''}
                            onChange={(e) => updateInscriptionStatus(selectedInscription.id, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="En attente">En attente</option>
                            <option value="Validée">Validée</option>
                            <option value="Refusée">Refusée</option>
                            <option value="Nouvelle inscription">Nouvelle inscription</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Certificat médical</label>
                          <select
                            value={selectedInscription.fields['Certificat médical'] || ''}
                            onChange={(e) => updateMedicalStatus(selectedInscription.id, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="En attente">En attente</option>
                            <option value="Vérifié">Vérifié</option>
                            <option value="Manquant">Manquant</option>
                            <option value="Non vérifié">Non vérifié</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PréinscriptionsList
