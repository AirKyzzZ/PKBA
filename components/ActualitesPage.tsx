'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, MessageCircle, Heart, Share2, BookOpen, Users, Award, MapPin } from 'lucide-react'

const ActualitesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Toutes les actualités' },
    { id: 'annonces', name: 'Annonces' },
    { id: 'evenements', name: 'Événements' },
    { id: 'entrainements', name: 'Entraînements' },
    { id: 'competitions', name: 'Compétitions' }
  ]

  const articles = [
    {
      id: 1,
      title: 'Inscriptions Ouvertes - Saison 2025/2026',
      excerpt: 'Les inscriptions pour la nouvelle saison sont maintenant ouvertes ! Rejoignez PKBA dès septembre 2025.',
      content: 'Nous sommes ravis d\'annoncer l\'ouverture des inscriptions pour la saison 2025/2026. Cette année promet d\'être exceptionnelle avec de nouveaux entraînements, des événements passionnants et une communauté qui ne cesse de grandir.',
      category: 'annonces',
      date: '2025-01-15',
      author: 'Équipe PKBA',
      readTime: '3 min',
      image: '/images/inscriptions-2025.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Planning des Entraînements - Septembre 2025',
      excerpt: 'Découvrez le nouveau planning d\'entraînements pour la saison 2025/2026.',
      content: 'Voici le planning des entraînements pour la saison 2025/2026. Nous proposons des créneaux adaptés à tous les niveaux, du débutant au confirmé.',
      category: 'entrainements',
      date: '2025-01-10',
      author: 'Coach PKBA',
      readTime: '5 min',
      image: '/images/planning-entrainements.jpg',
      featured: false
    },
    {
      id: 3,
      title: 'Premier Rassemblement PKBA - 15 Septembre 2025',
      excerpt: 'Rendez-vous le 15 septembre pour le premier rassemblement de la saison !',
      content: 'Nous organisons notre premier rassemblement de la saison le 15 septembre 2025. Une occasion parfaite pour rencontrer les autres membres et découvrir les installations.',
      category: 'evenements',
      date: '2025-01-05',
      author: 'Équipe PKBA',
      readTime: '4 min',
      image: '/images/rassemblement-septembre.jpg',
      featured: false
    },
    {
      id: 4,
      title: 'Nouveaux Équipements de Sécurité',
      excerpt: 'PKBA investit dans de nouveaux équipements de sécurité pour tous les adhérents.',
      content: 'Nous avons fait l\'acquisition de nouveaux équipements de sécurité pour garantir une pratique en toute sécurité. Ces équipements seront disponibles dès la rentrée.',
      category: 'annonces',
      date: '2025-01-01',
      author: 'Équipe PKBA',
      readTime: '2 min',
      image: '/images/equipements-securite.jpg',
      featured: false
    },
    {
      id: 5,
      title: 'Compétition Régionale - Octobre 2025',
      excerpt: 'PKBA participera à la compétition régionale de parkour en octobre 2025.',
      content: 'Nous sommes fiers d\'annoncer la participation de PKBA à la compétition régionale de parkour qui se déroulera en octobre 2025. Une belle occasion de représenter notre club.',
      category: 'competitions',
      date: '2024-12-28',
      author: 'Coach PKBA',
      readTime: '6 min',
      image: '/images/competition-regionale.jpg',
      featured: false
    }
  ]

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
              Actualités PKBA
            </h1>
            <p className="text-xl font-montserrat max-w-3xl mx-auto leading-relaxed">
              Restez informés des dernières nouvelles, annonces et événements du club. 
              Découvrez les actualités de la communauté PKBA !
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-montserrat font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {filteredArticles.find(article => article.featured) && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {(() => {
                const featuredArticle = filteredArticles.find(article => article.featured)
                if (!featuredArticle) return null
                
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 lg:h-full flex items-center justify-center">
                      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                        <BookOpen size={48} className="text-primary" />
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-montserrat font-medium">
                          Article à la une
                        </span>
                        <span className="text-gray-500 font-montserrat text-sm">
                          {formatDate(featuredArticle.date)}
                        </span>
                      </div>
                      <h2 className="text-2xl font-cheddar font-bold text-gray-900 mb-4">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-gray-600 font-montserrat mb-6">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 font-montserrat">
                          <div className="flex items-center space-x-1">
                            <User size={16} />
                            <span>{featuredArticle.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={16} />
                            <span>{featuredArticle.readTime}</span>
                          </div>
                        </div>
                        <button className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-montserrat font-medium transition-colors duration-200">
                          Lire la suite
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles
              .filter(article => !article.featured)
              .map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                      <BookOpen size={32} className="text-primary" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-montserrat font-medium">
                        {categories.find(cat => cat.id === article.category)?.name}
                      </span>
                      <span className="text-gray-500 font-montserrat text-sm">
                        {formatDate(article.date)}
                      </span>
                    </div>
                    <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 font-montserrat text-sm mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500 font-montserrat">
                        <div className="flex items-center space-x-1">
                          <User size={14} />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <button className="text-primary hover:text-secondary font-montserrat font-medium text-sm transition-colors duration-200">
                        Lire plus →
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-cheddar font-bold text-gray-900 mb-6">
              Communauté PKBA
            </h2>
            <p className="text-lg font-montserrat text-gray-600 max-w-3xl mx-auto">
              Rejoignez notre communauté en ligne pour échanger, partager vos progrès et rester connectés !
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Forum Communautaire',
                description: 'Échangez avec les autres membres, partagez vos techniques et posez vos questions.',
                action: 'Accéder au forum'
              },
              {
                icon: Award,
                title: 'Progression',
                description: 'Suivez votre progression et celle des autres membres du club.',
                action: 'Voir les progrès'
              },
              {
                icon: MapPin,
                title: 'Événements',
                description: 'Découvrez les prochains événements et rassemblements PKBA.',
                action: 'Voir les événements'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-montserrat mb-6">
                  {item.description}
                </p>
                <button className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-montserrat font-medium transition-colors duration-200">
                  {item.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ActualitesPage 