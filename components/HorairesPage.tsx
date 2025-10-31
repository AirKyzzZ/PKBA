'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, Users, Euro, Filter, Calendar, Star, Trophy } from 'lucide-react'

interface TrainingSession {
  id: string
  day: string
  time: string
  ageGroup: string
  group: string
  type: 'loisir' | 'performance'
  location: string
}

interface Pricing {
  ageGroup: string
  sessions: string
  price: number
  type: 'loisir' | 'performance'
}

interface StagePricing {
  title: string
  description: string
  pricePerSession: number
  pricePack?: number
  packDescription?: string
}

const trainingSessions: TrainingSession[] = [
  // Mardi
  { id: '1', day: 'Mardi', time: '18h30-20h30', ageGroup: 'Sélection', group: 'Perf grand et petit', type: 'performance', location: 'À définir' },
  
  // Mercredi
  { id: '2', day: 'Mercredi', time: '13h30-14h30', ageGroup: '6-8 ans (2018-2019)', group: 'G1', type: 'loisir', location: 'À définir' },
  { id: '3', day: 'Mercredi', time: '14h30-16h', ageGroup: '8-12 ans (2017-2014)', group: 'G2', type: 'loisir', location: 'À définir' },
  { id: '4', day: 'Mercredi', time: '16h-17h30', ageGroup: 'Performance', group: 'Perf petit', type: 'performance', location: 'À définir' },
  { id: '5', day: 'Mercredi', time: '17h30-19h', ageGroup: '12 ans et + (2013 et +)', group: 'G1', type: 'loisir', location: 'À définir' },
  { id: '6', day: 'Mercredi', time: '19h-20h30', ageGroup: '12 ans et + (2013 et +)', group: 'G2', type: 'loisir', location: 'À définir' },
  
  // Vendredi
  { id: '7', day: 'Vendredi', time: '17h30-19h', ageGroup: 'Performance', group: 'Perf petit', type: 'performance', location: 'À définir' },
  { id: '8', day: 'Vendredi', time: '19h-20h30', ageGroup: 'Performance', group: 'Perf grand', type: 'performance', location: 'À définir' },
  
  // Samedi
  { id: '9', day: 'Samedi', time: '13h30-15h', ageGroup: '8-12 ans (2017-2014)', group: 'G1', type: 'loisir', location: 'À définir' },
  { id: '10', day: 'Samedi', time: '15h-16h', ageGroup: '6-8 ans (2018-2019)', group: 'G2', type: 'loisir', location: 'À définir' },
  { id: '11', day: 'Samedi', time: '16h-17h30', ageGroup: 'Performance', group: 'Perf grand', type: 'performance', location: 'À définir' },
]

const pricing: Pricing[] = [
  { ageGroup: '6-8 ans', sessions: '1 x 1h', price: 250, type: 'loisir' },
  { ageGroup: '8-12 ans', sessions: '1 x 1h30', price: 265, type: 'loisir' },
  { ageGroup: '12 ans et +', sessions: '1 x 1h30', price: 265, type: 'loisir' },
  { ageGroup: 'Performance – 12 ans', sessions: '2 ou 3 x 1h30', price: 365, type: 'performance' },
  { ageGroup: 'Performance 12 ans et +', sessions: '2 ou 3 x 1h30', price: 365, type: 'performance' },
]



const includedInPrice = [
  { item: 'Assurance', price: 17.19 },
  { item: 'Part FFGYM', price: 26.50 },
  { item: 'Part comité régional', price: 17 },
  { item: 'Part comité départemental', price: 4.50 }
]

const stagePricing: StagePricing[] = [
  { 
    title: 'Non licenciés', 
    description: 'Tarif à la séance',
    pricePerSession: 15,
    pricePack: 10,
    packDescription: 'Les 4 séances'
  },
  { 
    title: 'Licenciés', 
    description: 'Tarif à la séance',
    pricePerSession: 10
  }
]

export default function HorairesPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'loisir' | 'performance'>('all')
  const [selectedDay, setSelectedDay] = useState<string>('all')
  const [selectedAge, setSelectedAge] = useState<string>('all')

  const filteredSessions = trainingSessions.filter(session => {
    const typeMatch = selectedFilter === 'all' || session.type === selectedFilter
    const dayMatch = selectedDay === 'all' || session.day === selectedDay
    const ageMatch = selectedAge === 'all' || session.ageGroup.includes(selectedAge)
    return typeMatch && dayMatch && ageMatch
  })

  const getGroupColor = (type: 'loisir' | 'performance') => {
    return type === 'performance' 
      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
      : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
  }

  const getGroupIcon = (type: 'loisir' | 'performance') => {
    return type === 'performance' ? <Trophy className="w-4 h-4" /> : <Users className="w-4 h-4" />
  }

  const days = ['all', 'Mardi', 'Mercredi', 'Vendredi', 'Samedi']
  const ageGroups = ['all', '6-8 ans', '8-12 ans', '12 ans et +']

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Horaires & Tarifs
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Découvrez nos créneaux d'entraînement et nos tarifs pour la saison 2025/2026
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <Calendar className="w-4 h-4" />
                <span>Horaires adaptés</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <Users className="w-4 h-4" />
                <span>Groupes par âge</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <Euro className="w-4 h-4" />
                <span>Tarifs transparents</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      

      {/* Schedule Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planning des Entraînements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trouvez le créneau qui correspond à l'âge et au niveau de votre enfant
            </p>
          </motion.div>

                     {/* Filters */}
           <div className="max-w-4xl mx-auto mb-8 px-4">
             {/* Mobile-first responsive filters */}
             <div className="space-y-4">
               {/* Age Filter - Most Important for Parents */}
               <div className="text-center">
                 <div className="flex items-center justify-center gap-2 mb-3">
                   <Filter className="w-4 h-4 text-gray-600" />
                   <span className="text-sm text-gray-700 font-medium">Filtrer par âge :</span>
                 </div>
                 <div className="flex flex-wrap gap-2 justify-center">
                   {ageGroups.map((age) => (
                     <button
                       key={age}
                       onClick={() => setSelectedAge(age)}
                       className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                         selectedAge === age
                           ? 'bg-blue-500 text-white shadow-md'
                           : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                       }`}
                     >
                       {age === 'all' ? 'Tous âges' : age}
                     </button>
                   ))}
                 </div>
               </div>

               {/* Type Filter */}
               <div className="text-center">
                 <span className="text-sm text-gray-700 font-medium mb-3 block">Type :</span>
                 <div className="flex flex-wrap gap-2 justify-center">
                   <button
                     onClick={() => setSelectedFilter('all')}
                     className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                       selectedFilter === 'all'
                         ? 'bg-primary text-white shadow-md'
                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                     }`}
                   >
                     Tous
                   </button>
                   <button
                     onClick={() => setSelectedFilter('loisir')}
                     className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                       selectedFilter === 'loisir'
                         ? 'bg-green-500 text-white shadow-md'
                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                     }`}
                   >
                     <Users className="w-3 h-3" />
                     <span className="hidden sm:inline">Loisirs</span>
                     <span className="sm:hidden">Loisir</span>
                   </button>
                   <button
                     onClick={() => setSelectedFilter('performance')}
                     className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                       selectedFilter === 'performance'
                         ? 'bg-red-500 text-white shadow-md'
                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                     }`}
                   >
                     <Trophy className="w-3 h-3" />
                     <span className="hidden sm:inline">Performance</span>
                     <span className="sm:hidden">Perf</span>
                   </button>
                 </div>
               </div>

               {/* Day Filter */}
               <div className="text-center">
                 <span className="text-sm text-gray-700 font-medium mb-3 block">Jour :</span>
                 <div className="flex flex-wrap gap-2 justify-center">
                   {days.map((day) => (
                     <button
                       key={day}
                       onClick={() => setSelectedDay(day)}
                       className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                         selectedDay === day
                           ? 'bg-primary text-white shadow-md'
                           : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                       }`}
                     >
                       {day === 'all' ? 'Tous' : day}
                     </button>
                   ))}
                 </div>
               </div>
             </div>
           </div>

                     {/* Schedule Table */}
           <div className="max-w-6xl mx-auto px-4">
             <AnimatePresence mode="wait">
               <motion.div
                 key={`${selectedFilter}-${selectedDay}-${selectedAge}`}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.3 }}
                 className="bg-white rounded-xl shadow-lg overflow-hidden"
               >
                 {/* Desktop Table */}
                 <div className="hidden lg:block overflow-x-auto">
                   <table className="w-full">
                     <thead className="bg-gray-50">
                       <tr>
                         <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-900">Jour</th>
                         <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-900">Horaires</th>
                         <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-900">Âge / Groupe</th>
                         <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200">
                       {filteredSessions.map((session) => (
                         <motion.tr
                           key={session.id}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ duration: 0.3 }}
                           className="hover:bg-gray-50 transition-colors duration-200"
                         >
                           <td className="px-4 lg:px-6 py-4 text-sm font-medium text-gray-900">
                             {session.day}
                           </td>
                           <td className="px-4 lg:px-6 py-4 text-sm text-gray-600">
                             <div className="flex items-center gap-2">
                               <Clock className="w-4 h-4 text-primary" />
                               {session.time}
                             </div>
                           </td>
                           <td className="px-4 lg:px-6 py-4 text-sm text-gray-600">
                             <div>
                               <div className="font-medium text-gray-900">{session.ageGroup}</div>
                               <div className="text-gray-500">{session.group}</div>
                             </div>
                           </td>
                           <td className="px-4 lg:px-6 py-4">
                             <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${getGroupColor(session.type)}`}>
                               {getGroupIcon(session.type)}
                               <span className="hidden xl:inline">{session.type === 'performance' ? 'Performance' : 'Loisirs'}</span>
                               <span className="xl:hidden">{session.type === 'performance' ? 'Perf' : 'Loisir'}</span>
                             </span>
                           </td>
                         </motion.tr>
                       ))}
                     </tbody>
                   </table>
                 </div>

                 {/* Mobile Cards */}
                 <div className="lg:hidden">
                   {filteredSessions.map((session) => (
                     <motion.div
                       key={session.id}
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ duration: 0.3 }}
                       className="p-4 border-b border-gray-200 last:border-b-0"
                     >
                       <div className="flex items-center justify-between mb-2">
                         <h3 className="font-semibold text-gray-900">{session.day}</h3>
                         <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getGroupColor(session.type)}`}>
                           {getGroupIcon(session.type)}
                           {session.type === 'performance' ? 'Performance' : 'Loisirs'}
                         </span>
                       </div>
                       <div className="space-y-1">
                         <div className="flex items-center gap-2 text-sm text-gray-600">
                           <Clock className="w-4 h-4 text-primary" />
                           <span className="font-medium">{session.time}</span>
                         </div>
                         <div className="text-sm text-gray-600">
                           <span className="font-medium">{session.ageGroup}</span>
                         </div>
                         <div className="text-sm text-gray-500">
                           {session.group}
                         </div>
                       </div>
                     </motion.div>
                   ))}
                 </div>

                 {filteredSessions.length === 0 && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="text-center py-12"
                   >
                     <div className="text-gray-400 mb-4">
                       <Calendar className="w-16 h-16 mx-auto" />
                     </div>
                     <h3 className="text-xl font-semibold text-gray-600 mb-2">
                       Aucun créneau trouvé
                     </h3>
                     <p className="text-gray-500">
                       Essayez de modifier vos filtres pour voir plus de créneaux
                     </p>
                   </motion.div>
                 )}
               </motion.div>
             </AnimatePresence>
           </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tarifs de la Saison 2025/2026
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des tarifs transparents avec tout inclus pour une saison complète
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto px-4">
            <div className="grid gap-4 sm:gap-6">
              {pricing.map((price, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl shadow-md border p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 ${
                    price.type === 'performance' 
                      ? 'border-red-200 bg-gradient-to-r from-red-50 to-red-100' 
                      : 'border-green-200 bg-gradient-to-r from-green-50 to-green-100'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getGroupColor(price.type)}`}>
                          {getGroupIcon(price.type)}
                          {price.type === 'performance' ? 'Performance' : 'Loisirs'}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                        {price.ageGroup}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">{price.sessions} par semaine</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Euro className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        {price.price}
                      </span>
                      <span className="text-sm sm:text-base text-gray-500">€/an</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Included in Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 sm:mt-12 bg-gray-50 rounded-xl p-4 sm:p-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                Inclus dans tous les tarifs
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {includedInPrice.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{item.item}</span>
                    <span className="text-sm sm:text-base text-primary font-semibold">{item.price}€</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Total des frais inclus : <span className="font-semibold text-primary">65,19€</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stage Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tarifs des Stages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tarifs pour les stages et séances ponctuelles
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto px-4">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {stagePricing.map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl shadow-md border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                      {stage.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                        <div>
                          <span className="text-sm sm:text-base text-gray-700 font-medium">À la séance</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Euro className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          <span className="text-xl sm:text-2xl font-bold text-primary">
                            {stage.pricePerSession}
                          </span>
                          <span className="text-sm sm:text-base text-gray-500">€</span>
                        </div>
                      </div>

                      {stage.pricePack && stage.packDescription && (
                        <div className="flex items-center justify-between bg-white rounded-lg p-3 sm:p-4 shadow-sm border-2 border-primary">
                          <div>
                            <span className="text-sm sm:text-base text-gray-700 font-medium">{stage.packDescription}</span>
                            <span className="ml-2 text-xs text-gray-500">(tarif réduit)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Euro className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            <span className="text-xl sm:text-2xl font-bold text-primary">
                              {stage.pricePack}
                            </span>
                            <span className="text-sm sm:text-base text-gray-500">€</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à rejoindre l'aventure PKBA ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Inscrivez-vous dès maintenant pour la saison 2025/2026
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/inscription"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
              >
                S'inscrire maintenant
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
              >
                Nous contacter
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
