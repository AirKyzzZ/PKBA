'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Boutique', href: '/boutique' },
    { name: 'Inscription', href: '/inscription' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Contact', href: '/contact' },
  ]

  // Always white navbar (with slight blur and shadow on scroll)
  const headerBgClasses = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-lg ring-1 ring-black/10'
    : 'bg-white'

  // Position and shape for dynamic island-like pill on scroll (desktop only)
  const basePositionClasses = 'top-0 left-0 right-0 translate-x-0'
  const desktopScrolledPositionClasses = isScrolled
    ? 'lg:top-5 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:rounded-full'
    : 'lg:top-0 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:rounded-none'

  // Width behavior: shrink on scroll (desktop only); keep full width on mobile/tablet
  const containerWidthClasses = isScrolled
    ? 'w-full lg:w-[70%] xl:w-[56%]'
    : 'w-full lg:w-full'

  // Height: shrink on desktop only
  const containerHeightClasses = isScrolled ? 'h-16 lg:h-14' : 'h-16 lg:h-20'

  // Logo size: shrink on desktop only
  const logoImageHeight = isScrolled ? 'h-10 lg:h-8' : 'h-10 lg:h-10'

  // Brand text: hide on desktop when scrolled only
  const brandInfoVisibility = isScrolled ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden' : ''

  // Desktop nav spacing only
  const desktopNavSpacing = isScrolled ? 'lg:space-x-6' : 'lg:space-x-8'

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${basePositionClasses} ${desktopScrolledPositionClasses} ${containerWidthClasses} ${headerBgClasses}`}
    >
      <div className="px-4 sm:px-5 lg:px-6">
        <div className={`flex justify-between items-center transition-all duration-500 ${containerHeightClasses}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/transparent_full.png"
              alt="PKBA logo"
              width={120}
              height={40}
              priority
              className={`${logoImageHeight} w-auto transition-all duration-300`}
            />
            <div className={`hidden sm:block transition-opacity duration-300 ${brandInfoVisibility}`}>
              <h1 className="text-xl lg:text-2xl font-cheddar font-bold gradient-text">
                PKBA
              </h1>
              <p className="text-xs text-gray-600 font-montserrat">
                Parkour Bassin d'Arcachon
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center ${desktopNavSpacing} transition-all duration-300`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary font-montserrat font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Social Links & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://instagram.com/parkourbassindarcachon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <Instagram size={20} />
            </a>
            <Link
              href="/inscription"
              className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-montserrat font-medium transition-all duration-200 transform hover:scale-105"
            >
              Rejoindre le club
            </Link>
          </div>

          {/* Mobile Quick Links */}
          <div className="flex items-center lg:hidden">
            <a
              href="https://instagram.com/parkourbassindarcachon"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200 mr-1"
              aria-label="Instagram PKBA"
            >
              <Instagram size={22} />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
              aria-label="Ouvrir le menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-primary font-montserrat font-medium py-2 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/inscription"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg text-center font-montserrat font-semibold transition-all duration-200"
              >
                Rejoindre le club
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="https://instagram.com/parkourbassindarcachon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  <Instagram size={20} />
                  <span className="font-montserrat">@parkourbassindarcachon</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header 