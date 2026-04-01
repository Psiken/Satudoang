'use client'

import { useEffect, useState } from 'react'

const moments = [
  {
    emoji: '😄',
    title: 'Tawa Terpecah',
    description: 'Setiap kali tertawa bersama, selalu membuat hari menjadi lebih berwarna.',
  },
  {
    emoji: '🎵',
    title: 'Lagu Favorit',
    description: 'Musik yang kita sukai menjadi soundtrack indah dalam setiap momen bersama.',
  },
  {
    emoji: '🌟',
    title: 'Kilau Bintang',
    description:
      'Kamu bersinar terang di tengah kegelapan, membimbing kami dengan kehangatanmu.',
  },
  {
    emoji: '💪',
    title: 'Semangat Tanpa Henti',
    description:
      'Dedikasi dan kerja kerasmu menginspirasi kami untuk selalu memberikan yang terbaik.',
  },
  {
    emoji: '❤️',
    title: 'Hati yang Mulia',
    description:
      'Kebaikan hatimu adalah hadiah paling berharga yang bisa kami terima dari dirimu.',
  },
  {
    emoji: '✨',
    title: 'Kenangan Abadi',
    description:
      'Setiap detik bersama dirimu adalah kenangan yang akan kami hargai selamanya.',
  },
]

export default function BestMoments() {
  const [visibleMoments, setVisibleMoments] = useState<boolean[]>([])

  useEffect(() => {
    // Animate moments on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = moments.indexOf(
              moments[parseInt(entry.target.getAttribute('data-index') || '0')]
            )
            setVisibleMoments((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    document.querySelectorAll('[data-moment]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            🌈 Best Moments
          </h2>
          <p className="text-lg text-foreground/70">
            Hal-hal terbaik yang membuat hari kami bersama dirimu istimewa
          </p>
        </div>

        {/* Moments grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moments.map((moment, index) => (
            <div
              key={index}
              data-moment
              data-index={index}
              className={`group relative bg-gradient-to-br from-card to-card/80 border border-primary/20 rounded-xl p-8 hover:border-primary/40 transition-all duration-500 ${
                visibleMoments[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

              <div className="relative z-10">
                {/* Emoji icon */}
                <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {moment.emoji}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {moment.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/70 leading-relaxed text-sm">
                  {moment.description}
                </p>

                {/* Decorative accent line */}
                <div className="mt-6 h-1 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-8 py-4">
            <p className="text-lg font-semibold text-foreground">
              Terima kasih telah menjadi bagian dari hidup aku
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
