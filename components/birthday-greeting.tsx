'use client'

import { useEffect, useState } from 'react'

export default function BirthdayGreeting() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4 py-20">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Selamat Ulang{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tahun
          </span>
        </h1>

        <p className="text-3xl md:text-4xl font-semibold text-primary mb-8">
          Sayang <span>🎉</span>
        </p>

        <div className="flex justify-center gap-4 text-4xl md:text-5xl mb-12">
          <span>🎂</span>
        </div>

        <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed">
          Scroll down untuk melihat momen-momen indah dan ucapan terbaik kami
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
