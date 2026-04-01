'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

// Daftar foto - tambahkan path foto Anda di sini
const INITIAL_PHOTOS = [
  '/gallery/tesfototia1.jpg.jpeg',
  '/gallery/tesfototia2.jpeg',
  '/gallery/tesfototia3.jpeg',
  '/gallery/tesfototia4.jpeg',
  '/gallery/tesfotobarengtia.jpeg',
  '/gallery/tesfotobarengtia2.jpeg',
]

export default function PhotoGallery() {
  const [photos] = useState<string[]>(INITIAL_PHOTOS)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [visiblePhotos, setVisiblePhotos] = useState<boolean[]>(new Array(INITIAL_PHOTOS.length).fill(false))
  const photoRefs = useRef<(HTMLDivElement | null)[]>([])

  // Intersection Observer untuk animasi saat scroll
  useEffect(() => {
    const observers = photoRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisiblePhotos((prev) => {
                  const newVisible = [...prev]
                  newVisible[index] = true
                  return newVisible
                })
              }, index * 100) // Stagger animation
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  // Layout kolase - ukuran berbeda untuk variasi
  const getCollageClass = (index: number) => {
    const patterns = [
      'md:col-span-2 md:row-span-2', // Besar
      'md:col-span-1 md:row-span-1', // Kecil
      'md:col-span-1 md:row-span-1', // Kecil
      'md:col-span-1 md:row-span-2', // Vertikal
      'md:col-span-2 md:row-span-1', // Horizontal
      'md:col-span-1 md:row-span-1', // Kecil
    ]
    return patterns[index % patterns.length]
  }

  const getRotationClass = (index: number) => {
    const rotations = ['rotate-2', '-rotate-3', 'rotate-1', '-rotate-2', 'rotate-3', '-rotate-1']
    return rotations[index % rotations.length]
  }

  const PhotoCard = ({ photo, index }: { photo: string; index: number }) => {
    const isVisible = visiblePhotos[index]
    // Prioritize first 2 images untuk LCP optimization
    const isPriority = index < 2

    return (
      <div 
        ref={(el) => { photoRefs.current[index] = el }}
        className={`${getCollageClass(index)} transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{ 
          transitionDelay: `${index * 100}ms`,
        }}
      >
        <div 
          className={`relative w-full h-full min-h-[200px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-all duration-500 cursor-pointer group ${getRotationClass(index)} hover:scale-105 hover:rotate-0 border-4 border-white bg-white`}
          onClick={() => setSelectedPhoto(photo)}
        >
          {/* Polaroid tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/80 z-20 shadow-md" 
               style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}>
          </div>
          
          <Image
            src={photo}
            alt={`Foto kenangan ${index + 1}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            priority={isPriority}
            loading={isPriority ? 'eager' : 'lazy'}
            quality={85}
          />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
            <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <svg 
                className="w-8 h-8 mx-auto mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              <p className="text-xs font-medium">Klik zoom</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              📸 Galeri Kenangan
            </h2>
            <p className="text-lg text-foreground/70">
              Dirimu dan bersamaku.
            </p>
          </div>

          {/* Photo collage grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
            {photos.map((photo, index) => (
              <PhotoCard key={index} photo={photo} index={index} />
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-4 w-16 h-16 bg-primary/10 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-20 right-8 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Lightbox Modal untuk zoom foto */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-4xl aspect-square">
            <Image
              src={selectedPhoto}
              alt="Foto diperbesar"
              fill
              className="object-contain"
              sizes="100vw"
              quality={90}
            />
          </div>
        </div>
      )}
    </>
  )
}
