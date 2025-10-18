'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import { articles } from '@/content/articles'

const ActualitesPage = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const sorted = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
              Suivez la vie du club : annonces, bilans, événements et projets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((a) => (
              <motion.article
                key={a.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link href={`/actualites/${a.slug}`} className="block group">
                  <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {a.featured && (
                      <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-montserrat">
                        À la une
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-gray-500 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs font-montserrat bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        <Tag size={14} /> {a.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-montserrat">
                        <Calendar size={14} /> {formatDate(a.date)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-montserrat">
                        <Clock size={14} /> {a.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-2 line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="text-gray-600 font-montserrat text-sm line-clamp-3">
                      {a.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-primary font-montserrat group-hover:underline">
                      <User size={16} /> {a.author}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ActualitesPage