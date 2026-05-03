'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, ShoppingBag, Mail } from 'lucide-react'

const CTA = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cheddar font-bold text-white mb-4 sm:mb-6">
            Prêt à nous rejoindre ?
          </h2>
          <p className="text-lg sm:text-xl font-montserrat text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
            Que vous soyez débutant ou confirmé, il y a une place pour vous chez PKBA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: Calendar,
              title: 'S\'inscrire',
              description: 'Stages d\'Été ou saison régulière',
              href: '/inscription',
              style: 'bg-primary hover:bg-secondary text-white',
              iconStyle: 'text-white',
              delay: 0.2
            },
            {
              icon: ShoppingBag,
              title: 'Boutique',
              description: 'T-shirts et goodies PKBA',
              href: '/boutique',
              style: 'bg-white hover:bg-gray-50 text-gray-900',
              iconStyle: 'text-primary',
              delay: 0.4
            },
            {
              icon: Mail,
              title: 'Contact',
              description: 'Une question ? Écrivez-nous',
              href: '/contact',
              style: 'bg-white/10 border border-white/20 text-white hover:bg-white/20',
              iconStyle: 'text-white',
              delay: 0.6
            }
          ].map((action) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: action.delay }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                href={action.href}
                className={`block p-6 sm:p-8 rounded-xl transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl ${action.style}`}
              >
                <div className="text-center space-y-3">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200">
                    <action.icon size={28} className={action.iconStyle} />
                  </div>
                  <h3 className="text-2xl font-cheddar font-bold">
                    {action.title}
                  </h3>
                  <p className="font-montserrat text-sm opacity-80">
                    {action.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm font-montserrat font-medium opacity-70">
                    <span>En savoir plus</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CTA
