'use client'

import { motion } from 'framer-motion'
import { FileText, Users, Shield, Clock, MapPin, Phone, Mail, AlertTriangle } from 'lucide-react'

const ReglementInterieurPage = () => {
  const sections = [
    {
      icon: Users,
      title: 'Adhésion et Inscription',
      content: [
        'L\'adhésion est ouverte à toute personne âgée d\'au moins 6 ans',
        'Un certificat médical de non-contre-indication à la pratique du parkour est obligatoire',
        'L\'inscription se fait sur présentation d\'une pièce d\'identité et du certificat médical',
        'Les mineurs doivent fournir une autorisation parentale signée',
        'L\'adhésion est valable pour la saison sportive (septembre à juillet)'
      ]
    },
    {
      icon: Shield,
      title: 'Règles de Sécurité',
      content: [
        'Le port de chaussures de sport adaptées est obligatoire',
        'Les bijoux et accessoires dangereux sont interdits pendant l\'entraînement',
        'Respecter les consignes de sécurité données par les encadrants',
        'Ne pas pratiquer de figures dangereuses sans l\'accord de l\'encadrant',
        'Signaler immédiatement tout incident ou blessure'
      ]
    },
    {
      icon: Clock,
      title: 'Horaires et Ponctualité',
      content: [
        'Les entraînements ont lieu aux horaires définis en début de saison',
        'Arriver 10 minutes avant le début de l\'entraînement',
        'En cas de retard, demander l\'autorisation de rejoindre le groupe',
        'Prévenir l\'encadrant en cas d\'absence prévue',
        'Les entraînements commencent et finissent à l\'heure précise'
      ]
    },
    {
      icon: MapPin,
      title: 'Lieux d\'Entraînement',
      content: [
        'Respecter les lieux d\'entraînement et leur environnement',
        'Ne pas dégrader le matériel ou les installations',
        'Ranger le matériel utilisé après chaque séance',
        'Respecter les règles spécifiques de chaque lieu',
        'Signaler tout problème constaté sur les installations'
      ]
    },
    {
      icon: Users,
      title: 'Comportement et Respect',
      content: [
        'Respecter les autres adhérents et l\'équipe d\'encadrement',
        'Adopter un langage correct et respectueux',
        'Éviter les comportements dangereux ou perturbateurs',
        'Participer activement et positivement aux entraînements',
        'Respecter les valeurs de l\'association : solidarité, respect, progression'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Sanctions et Exclusions',
      content: [
        'Tout manquement aux règles peut entraîner un avertissement',
        'En cas de récidive, une suspension temporaire peut être prononcée',
        'Les comportements graves peuvent entraîner l\'exclusion définitive',
        'Les décisions sont prises par le conseil d\'administration',
        'Un recours est possible auprès du bureau de l\'association'
      ]
    }
  ]

  const contactInfo = [
    {
      icon: Phone,
      label: 'Téléphone',
      value: '06 60 14 71 44',
      link: 'tel:0660147144'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@pkba.fr',
      link: 'mailto:contact@pkba.fr'
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: 'Bassin d\'Arcachon',
      link: '#'
    }
  ]

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
            <FileText size={64} className="mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-cheddar font-bold mb-6">
              Règlement Intérieur
            </h1>
            <p className="text-xl font-montserrat max-w-3xl mx-auto leading-relaxed">
              Les règles et bonnes pratiques à respecter au sein de l'association PKBA pour assurer 
              la sécurité et le bon fonctionnement de tous.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Règlement Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <section.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-cheddar font-bold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 font-montserrat text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-cheddar font-bold text-gray-900 mb-8">
              Questions sur le Règlement ?
            </h2>
            <p className="text-lg font-montserrat text-gray-600 mb-8">
              N'hésitez pas à nous contacter pour toute question concernant le règlement intérieur 
              ou pour demander des clarifications.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <contact.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-cheddar font-semibold text-gray-900 mb-2">
                    {contact.label}
                  </h3>
                  <a
                    href={contact.link}
                    className="text-primary hover:text-secondary font-montserrat transition-colors"
                  >
                    {contact.value}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-montserrat text-gray-600">
            Ce règlement intérieur est approuvé par le conseil d'administration de l'association PKBA. 
            Il peut être modifié à tout moment par décision du conseil d'administration.
          </p>
          <p className="text-xs font-montserrat text-gray-500 mt-2">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </section>
    </div>
  )
}

export default ReglementInterieurPage
