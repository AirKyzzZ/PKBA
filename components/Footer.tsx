import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/transparent_full.png"
                alt="PKBA logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <h3 className="text-xl font-cheddar font-bold gradient-text">PKBA</h3>
            </div>
            <p className="text-gray-300 font-montserrat text-sm">
              Club de parkour associatif au Bassin d'Arcachon. 
              Encadrement professionnel, progression et sécurité.
            </p>
            <p className="text-gray-400 font-montserrat text-xs">
              Affilié à la Fédération française de gymnastique (FFG)
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/parkourbassindarcachon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-montserrat font-semibold">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors duration-200 font-montserrat text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="text-gray-300 hover:text-primary transition-colors duration-200 font-montserrat text-sm">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="text-gray-300 hover:text-primary transition-colors duration-200 font-montserrat text-sm">
                  Préinscription
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="text-gray-300 hover:text-primary transition-colors duration-200 font-montserrat text-sm">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors duration-200 font-montserrat text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-montserrat font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary" />
                <a 
                  href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`} 
                  className="text-gray-300 hover:text-primary transition-colors duration-200 font-montserrat text-sm"
                >
                  06 60 14 71 44
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary" />
                <a 
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} 
                  className="text-gray-300 hover:text-primary transition-colors duration-200 font-montserrat text-sm"
                >
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-primary" />
                <span className="text-gray-300 font-montserrat text-sm">
                  Bassin d'Arcachon
                </span>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-montserrat font-semibold">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-gray-300 hover:text-primary transition-colors duration-200 font-montserrat text-sm">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-gray-300 hover:text-primary transition-colors duration-200 font-montserrat text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-gray-300 hover:text-primary transition-colors duration-200 font-montserrat text-sm">
                  Conditions générales de vente
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 font-montserrat text-sm">
              © {currentYear} {process.env.NEXT_PUBLIC_SITE_NAME}. Tous droits réservés.
            </p>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-gray-400 font-montserrat text-sm">
                Lancement Septembre 2025
              </p>
              <p className="text-gray-400 font-montserrat text-sm">
                Site réalisé par{' '}
                <a 
                  href="https://klyx.fr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  Klyx
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 