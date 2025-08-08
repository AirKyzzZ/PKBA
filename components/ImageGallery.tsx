'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from 'lucide-react'

interface Image {
  id: string
  src: string
  alt: string
  color: 'white' | 'black'
}

interface ImageGalleryProps {
  images: Image[]
  selectedColor: 'white' | 'black'
}

const ImageGallery = ({ images, selectedColor }: ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)

  // Filter images by selected color
  const colorImages = images.filter(img => img.color === selectedColor)
  
  const currentImage = colorImages[currentImageIndex] || colorImages[0]

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === colorImages.length - 1 ? 0 : prev + 1
    )
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? colorImages.length - 1 : prev - 1
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  const openLightbox = () => {
    setShowLightbox(true)
  }

  const closeLightbox = () => {
    setShowLightbox(false)
    setIsZoomed(false)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-50 rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ZoomIn size={48} className="text-primary" />
            </div>
            <p className="text-gray-700 font-montserrat font-medium">
              T-shirt PKBA {selectedColor === 'white' ? 'Blanc' : 'Noir'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Image {currentImageIndex + 1} sur {colorImages.length}
            </p>
          </div>
          
          {/* Navigation Arrows */}
          {colorImages.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </>
          )}
          
          {/* Zoom Button */}
          <button
            onClick={openLightbox}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <ZoomIn size={16} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {colorImages.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {colorImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-all duration-200 z-10"
              >
                <X size={24} />
              </button>

              {/* Zoom Controls */}
              <div className="absolute top-4 left-4 flex space-x-2 z-10">
                <button
                  onClick={toggleZoom}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-all duration-200"
                >
                  {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                </button>
              </div>

              {/* Main Lightbox Image */}
              <div 
                className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={toggleZoom}
              >
                <div className="w-full h-full min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ZoomIn size={48} />
                    </div>
                    <p className="text-lg font-medium">
                      T-shirt PKBA {selectedColor === 'white' ? 'Blanc' : 'Noir'}
                    </p>
                    <p className="text-sm opacity-80 mt-2">
                      Image {currentImageIndex + 1} sur {colorImages.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lightbox Navigation */}
              {colorImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      previousImage()
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-all duration-200"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-all duration-200"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Lightbox Thumbnails */}
              {colorImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {colorImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        goToImage(index)
                      }}
                      className={`w-12 h-12 rounded border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'border-white bg-white/20'
                          : 'border-white/50 hover:border-white/80'
                      }`}
                    >
                      <div className="w-full h-full bg-white/10 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ImageGallery
