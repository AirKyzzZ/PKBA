'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, User, BookOpen, Globe, Users, Award, MapPin, Star, Zap } from 'lucide-react'

const ActualitesPage = () => {
  const article = {
    id: 1,
    title: 'Nouveau Site Web PKBA - Une Évolution Numérique pour la Communauté Parkour',
    excerpt: 'Le club PKBA - Parkour Bassin d\'Arcachon lance son nouveau site web moderne et interactif pour connecter la communauté et faciliter l\'accès aux informations essentielles.',
    content: `
      <p class="mb-6">Nous sommes ravis d'annoncer le lancement officiel de notre nouveau site web PKBA ! Après plusieurs mois de développement et de tests, notre plateforme numérique est enfin en ligne depuis le 15 août 2025, marquant une étape importante dans l'évolution de notre club.</p>
      
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Une Refonte Complète pour une Meilleure Expérience</h2>
      <p class="mb-6">Ce nouveau site web représente bien plus qu'une simple mise à jour. Il s'agit d'une refonte complète pensée et conçue pour répondre aux besoins de notre communauté grandissante. Notre objectif était de créer une plateforme moderne, intuitive et accessible qui facilite l'accès à toutes les informations essentielles du club.</p>
      
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Fonctionnalités Principales du Nouveau Site</h2>
      
              <h3 class="text-xl font-cheddar font-bold text-gray-800 mb-3 mt-6">🎯 Pré-inscriptions Simplifiées</h3>
        <p class="mb-4">Le processus de pré-inscription est maintenant entièrement digitalisé. Les nouveaux adhérents peuvent se pré-inscrire en ligne en quelques clics, avec un formulaire intuitif qui guide chaque étape. Plus besoin de se déplacer au club pour les démarches administratives !</p>
      
      <h3 class="text-xl font-cheddar font-bold text-gray-800 mb-3 mt-6">🛒 Boutique en Ligne Intégrée</h3>
      <p class="mb-4">Notre boutique en ligne est désormais directement accessible depuis le site principal. Les membres peuvent commander leurs équipements, vêtements aux couleurs du club et accessoires sans quitter notre plateforme. Le système de panier et de commande est sécurisé et facile à utiliser.</p>
      
      <h3 class="text-xl font-cheddar font-bold text-gray-800 mb-3 mt-6">💳 Système de Donations et Paiements</h3>
      <p class="mb-4">Pour soutenir le développement du club, nous avons intégré un système de donations sécurisé. Les sympathisants et membres peuvent contribuer financièrement au projet PKBA via des paiements sécurisés en ligne.</p>
      
      <h3 class="text-xl font-cheddar font-bold text-gray-800 mb-3 mt-6">📱 Design Responsive et Moderne</h3>
      <p class="mb-4">Le site s'adapte parfaitement à tous les appareils : ordinateurs, tablettes et smartphones. L'interface utilisateur a été pensée pour offrir une expérience fluide et agréable, quel que soit l'appareil utilisé.</p>
      
      <h3 class="text-xl font-cheddar font-bold text-gray-800 mb-3 mt-6">🔍 Navigation Intuitive</h3>
      <p class="mb-4">La structure du site a été repensée pour une navigation plus logique et intuitive. Les informations sont organisées de manière claire, permettant aux visiteurs de trouver rapidement ce qu'ils cherchent.</p>
      
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Pourquoi ce Nouveau Site ?</h2>
      <p class="mb-6">L'évolution numérique était devenue nécessaire pour plusieurs raisons :</p>
      <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
        <li>Simplifier les démarches administratives pour nos membres</li>
        <li>Améliorer la communication avec la communauté</li>
        <li>Faciliter l'accès aux informations du club</li>
        <li>Moderniser notre image et notre présence en ligne</li>
        <li>Créer une plateforme centralisée pour tous nos services</li>
      </ul>
      
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Technologies et Sécurité</h2>
      <p class="mb-6">Notre nouveau site utilise les technologies web les plus récentes pour garantir performance, sécurité et fiabilité :</p>
      <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
        <li>Framework Next.js pour des performances optimales</li>
        <li>Paiements sécurisés via Stripe</li>
        <li>Protection des données personnelles (RGPD)</li>
        <li>Certificat SSL pour la sécurité des échanges</li>
        <li>Optimisation SEO pour une meilleure visibilité</li>
      </ul>
      
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Ce qui Change pour les Membres</h2>
      <p class="mb-6">Avec ce nouveau site, l'expérience des membres PKBA s'améliore significativement :</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-gray-50 p-6 rounded-lg">
          <h4 class="font-cheddar font-bold text-gray-900 mb-3">✅ Avant</h4>
          <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Pré-inscriptions uniquement sur place</li>
            <li>• Informations dispersées</li>
            <li>• Communication limitée</li>
            <li>• Boutique physique uniquement</li>
          </ul>
        </div>
        <div class="bg-green-50 p-6 rounded-lg">
          <h4 class="font-cheddar font-bold text-gray-900 mb-3">🚀 Maintenant</h4>
          <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Pré-inscriptions 100% en ligne</li>
            <li>• Toutes les infos centralisées</li>
            <li>• Communication instantanée</li>
            <li>• Boutique en ligne intégrée</li>
          </ul>
        </div>
      </div>
      
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Prochaines Étapes et Évolutions</h2>
      <p class="mb-6">Ce lancement n'est qu'une première étape. Nous prévoyons déjà plusieurs améliorations et nouvelles fonctionnalités :</p>
      <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
        <li>Espace membre personnalisé</li>
        <li>Blog et actualités régulières</li>
        <li>Galerie photos et vidéos</li>
      </ul>
      
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Comment Utiliser le Nouveau Site</h2>
      <p class="mb-6">Pour tirer le meilleur parti de notre nouvelle plateforme :</p>
      <ol class="list-decimal list-inside mb-6 space-y-2 text-gray-700">
        <li><strong>Explorez les différentes sections</strong> pour découvrir toutes les fonctionnalités</li>
        <li><strong>Utilisez la boutique en ligne</strong> pour vos équipements</li>
        <li><strong>Restez informés</strong> via notre section actualités</li>
        <li><strong>Partagez le site</strong> avec votre entourage</li>
      </ol>
      
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Remerciements</h2>
      <p class="mb-6">Ce projet n'aurait pas été possible sans l'engagement de toute l'équipe PKBA et le soutien de notre communauté. Un grand merci à tous ceux qui ont contribué à cette évolution numérique.</p>
      
      <p class="mb-6">Nous sommes convaincus que ce nouveau site web marquera un tournant positif dans l'histoire de notre club et contribuera à renforcer les liens au sein de notre communauté parkour.</p>
      
      <div class="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
        <p class="text-gray-800 font-montserrat italic">
          "L'innovation numérique au service de la passion parkour - Bienvenue dans l'ère moderne de PKBA !"
        </p>
      </div>
    `,
    category: 'annonces',
    date: '2025-08-15',
    author: 'Équipe PKBA',
    readTime: '8 min',
    image: '/images/hero_background.webp',
    featured: true
  }

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
              Découvrez les dernières nouvelles, annonces et événements du club. 
              Découvrez les actualités de la communauté PKBA !
            </p>
          </motion.div>
        </div>
      </section>

      {/* Single Article */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Article Header */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 lg:h-80 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe size={48} className="text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-cheddar font-bold text-gray-900">
                  Nouveau Site Web
                </h2>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-montserrat font-medium">
                  Article à la une
                </span>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Calendar size={16} />
                  <span className="font-montserrat text-sm">{formatDate(article.date)}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <User size={16} />
                  <span className="font-montserrat text-sm">{article.author}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock size={16} />
                  <span className="font-montserrat text-sm">{article.readTime}</span>
                </div>
              </div>

              {/* Article Title */}
              <h1 className="text-3xl md:text-4xl font-cheddar font-bold text-gray-900 mb-6">
                {article.title}
              </h1>

              {/* Article Excerpt */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
                <p className="text-lg font-montserrat text-gray-800 italic">
                  {article.excerpt}
                </p>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none font-montserrat text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Call to Action */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-cheddar font-bold text-gray-900 mb-4">
                    Prêt à Découvrir le Nouveau Site ?
                  </h3>
                  <p className="text-gray-600 font-montserrat mb-6">
                    Explorez toutes les fonctionnalités et découvrez comment le nouveau site PKBA peut améliorer votre expérience !
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-montserrat font-medium transition-colors duration-200 flex items-center space-x-2">
                      <Zap size={20} />
                      <span>Explorer le Site</span>
                    </button>
                    <button className="bg-white hover:bg-gray-50 text-primary border-2 border-primary px-8 py-3 rounded-lg font-montserrat font-medium transition-colors duration-200 flex items-center space-x-2">
                      <Users size={20} />
                      <span>Rejoindre PKBA</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>


    </div>
  )
}

export default ActualitesPage 