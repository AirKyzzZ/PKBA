'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface AdminAuthProps {
  children: React.ReactNode
}

const AdminAuth = ({ children }: AdminAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Check if already authenticated on component mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simple password check (in production, this should be server-side)
    if (password === 'vertiflow') {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
    } else {
      setError('Mot de passe incorrect')
      setPassword('')
    }
    
    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
  }

  if (isAuthenticated) {
    return (
      <div className="pt-16 lg:pt-20">
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Administration PKBA</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Accès Administrateur
          </h1>
          <p className="text-gray-600">
            Entrez le mot de passe pour accéder à la gestion des inscriptions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                placeholder="Entrez le mot de passe"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-primary hover:bg-secondary disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Vérification...</span>
              </>
            ) : (
              <>
                <Lock size={20} />
                <span>Accéder</span>
              </>
              )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Accès réservé aux administrateurs de l'association PKBA
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminAuth
