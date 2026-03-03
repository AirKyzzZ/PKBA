'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowRight, Filter } from 'lucide-react'
import { events, eventTypeConfig, getUpcomingEvents } from '@/content/events'
import type { EventType, ClubEvent } from '@/content/events'

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getMonthYear(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  })
}

function groupByMonth(evts: ClubEvent[]): Record<string, ClubEvent[]> {
  const groups: Record<string, ClubEvent[]> = {}
  for (const evt of evts) {
    const key = getMonthYear(evt.startDate)
    if (!groups[key]) groups[key] = []
    groups[key].push(evt)
  }
  return groups
}

const PlanningPage = () => {
  const [activeFilter, setActiveFilter] = useState<EventType | 'all'>('all')

  const allTypes: EventType[] = ['stage', 'competition', 'entrainement', 'sortie', 'autre']
  const upcomingEvents = getUpcomingEvents(3)

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter((e) => e.type === activeFilter)

  const sortedEvents = [...filteredEvents].sort((a, b) => a.startDate.localeCompare(b.startDate))
  const groupedEvents = groupByMonth(sortedEvents)

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
              Planning & Calendrier
            </h1>
            <p className="text-xl font-montserrat max-w-3xl mx-auto leading-relaxed">
              Retrouvez tous les événements du club : stages, compétitions, entraînements et sorties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Highlight */}
      {upcomingEvents.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-cheddar font-bold text-gray-900 mb-8 text-center">
                Prochains événements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingEvents.map((evt, i) => {
                  const config = eventTypeConfig[evt.type]
                  return (
                    <motion.div
                      key={evt.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className={`bg-white rounded-xl p-6 shadow-sm border ${config.borderColor} hover:shadow-md transition-shadow duration-300`}
                    >
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium font-montserrat ${config.bgColor} ${config.color} mb-3`}>
                        {config.label}
                      </span>
                      <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-2">
                        {evt.title}
                      </h3>
                      <div className="space-y-1.5 text-sm font-montserrat text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} className="flex-shrink-0" />
                          <span>
                            {formatDate(evt.startDate)}
                            {evt.endDate && ` — ${formatDate(evt.endDate)}`}
                          </span>
                        </div>
                        {evt.time && (
                          <div className="flex items-center space-x-2">
                            <Clock size={14} className="flex-shrink-0" />
                            <span>{evt.time}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} className="flex-shrink-0" />
                          <span>{evt.location}</span>
                        </div>
                      </div>
                      {evt.link && (
                        <Link
                          href={evt.link}
                          className="inline-flex items-center space-x-1 text-primary hover:text-secondary font-montserrat font-medium text-sm transition-colors duration-200"
                        >
                          <span>En savoir plus</span>
                          <ArrowRight size={14} />
                        </Link>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Full Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-cheddar font-bold text-gray-900 mb-6 text-center">
              Tous les événements
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-montserrat font-medium transition-all duration-200 ${
                  activeFilter === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
                }`}
              >
                <Filter size={14} className="inline mr-1.5" />
                Tous
              </button>
              {allTypes.map((type) => {
                const config = eventTypeConfig[type]
                return (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`px-4 py-2 rounded-full text-sm font-montserrat font-medium transition-all duration-200 ${
                      activeFilter === type
                        ? `${config.bgColor} ${config.color} ring-2 ring-offset-1 ${config.borderColor}`
                        : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {config.label}
                  </button>
                )
              })}
            </div>

            {/* Timeline */}
            {Object.keys(groupedEvents).length === 0 ? (
              <p className="text-center text-gray-500 font-montserrat py-12">
                Aucun événement trouvé pour ce filtre.
              </p>
            ) : (
              <div className="space-y-10">
                {Object.entries(groupedEvents).map(([month, evts]) => (
                  <div key={month}>
                    <h3 className="text-lg font-cheddar font-bold text-gray-900 mb-4 capitalize sticky top-20 bg-gray-50/90 backdrop-blur-sm py-2 z-10">
                      {month}
                    </h3>
                    <div className="relative border-l-2 border-gray-200 ml-4 space-y-6">
                      {evts.map((evt) => {
                        const config = eventTypeConfig[evt.type]
                        return (
                          <motion.div
                            key={evt.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative pl-8"
                          >
                            {/* Timeline dot */}
                            <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ${config.bgColor} border-2 ${config.borderColor}`} />

                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                <h4 className="text-base font-cheddar font-bold text-gray-900">
                                  {evt.title}
                                </h4>
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium font-montserrat ${config.bgColor} ${config.color}`}>
                                  {config.label}
                                </span>
                              </div>
                              <p className="text-sm font-montserrat text-gray-600 mb-3">
                                {evt.description}
                              </p>
                              <div className="flex flex-wrap gap-4 text-xs font-montserrat text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <Calendar size={12} />
                                  <span>
                                    {formatDate(evt.startDate)}
                                    {evt.endDate && ` — ${formatDate(evt.endDate)}`}
                                  </span>
                                </span>
                                {evt.time && (
                                  <span className="flex items-center space-x-1">
                                    <Clock size={12} />
                                    <span>{evt.time}</span>
                                  </span>
                                )}
                                <span className="flex items-center space-x-1">
                                  <MapPin size={12} />
                                  <span>{evt.location}</span>
                                </span>
                              </div>
                              {evt.link && (
                                <Link
                                  href={evt.link}
                                  className="inline-flex items-center space-x-1 mt-3 text-primary hover:text-secondary font-montserrat font-medium text-sm transition-colors duration-200"
                                >
                                  <span>Voir détails</span>
                                  <ArrowRight size={14} />
                                </Link>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export { PlanningPage }
