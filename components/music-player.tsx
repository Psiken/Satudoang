'use client'

import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [volume, setVolume] = useState(0.7) // Default volume 70%
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 300) {
        setHasScrolled(true)
        setShowPlayer(true)
        // Auto play when user scrolls down with fade in
        if (audioRef.current) {
          audioRef.current.volume = 0
          const playPromise = audioRef.current.play()
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Autoplay berhasil, lakukan fade in
                fadeIn()
                setIsPlaying(true)
              })
              .catch((error) => {
                // Autoplay diblok browser
                console.log('Autoplay was prevented:', error)
                setIsPlaying(false)
              })
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolled, volume])

  const fadeIn = () => {
    if (!audioRef.current) return
    
    audioRef.current.volume = 0
    audioRef.current.play().catch(() => {
      console.log('Autoplay was prevented')
    })

    let currentVolume = 0
    const targetVolume = volume
    const fadeStep = targetVolume / 20 // 20 steps for smooth fade

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
    }

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return
      
      currentVolume += fadeStep
      if (currentVolume >= targetVolume) {
        audioRef.current.volume = targetVolume
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current)
        }
      } else {
        audioRef.current.volume = currentVolume
      }
    }, 50) // 50ms intervals = 1 second total fade
  }

  const fadeOut = () => {
    if (!audioRef.current) return

    let currentVolume = audioRef.current.volume
    const fadeStep = currentVolume / 20

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
    }

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return

      currentVolume -= fadeStep
      if (currentVolume <= 0) {
        audioRef.current.volume = 0
        audioRef.current.pause()
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current)
        }
      } else {
        audioRef.current.volume = currentVolume
      }
    }, 50)
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        fadeOut()
        setIsPlaying(false)
      } else {
        fadeIn()
        setIsPlaying(true)
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const toggleVolumeSlider = () => {
    if (isMobile) {
      setShowVolumeSlider(!showVolumeSlider)
    }
  }

  return (
    <>
      {/* Audio element - using JVKE "Next to You" preview */}
      <audio
        ref={audioRef}
        loop
        className="hidden"
      >
        <source
          src="/music/next to you - JVKE.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Floating music player */}
      {showPlayer && (
        <div
          className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 transition-all duration-500 ${
            showPlayer ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onMouseEnter={() => !isMobile && setShowVolumeSlider(true)}
          onMouseLeave={() => !isMobile && setShowVolumeSlider(false)}
        >
          {/* Volume Slider */}
          {showVolumeSlider && (
            <div className={`absolute ${isMobile ? 'bottom-20 left-1/2 -translate-x-1/2' : 'bottom-20 right-0'} bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-4 mb-2 animate-in slide-in-from-bottom-4 duration-300`}>
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-3`}>
                {/* Volume Icon */}
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    color: volume === 0 ? '#94a3b8' : volume < 0.3 ? '#ef4444' : volume < 0.7 ? '#f59e0b' : '#3b82f6'
                  }}
                >
                  {volume === 0 ? (
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  ) : volume < 0.5 ? (
                    <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                  ) : (
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  )}
                </svg>
                
                {/* Slider Container */}
                <div className={`${isMobile ? 'w-full' : 'h-10'} flex flex-col items-center justify-center`}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className={`${isMobile ? 'w-40' : 'w-32'} h-2 rounded-lg appearance-none cursor-pointer`}
                    style={{
                      background: `linear-gradient(to right, 
                        ${volume < 0.3 ? '#ef4444' : volume < 0.7 ? '#f59e0b' : '#3b82f6'} 0%, 
                        ${volume < 0.3 ? '#ef4444' : volume < 0.7 ? '#f59e0b' : '#3b82f6'} ${volume * 100}%, 
                        #e5e7eb ${volume * 100}%, 
                        #e5e7eb 100%)`
                    }}
                  />
                  <style jsx>{`
                    input[type="range"]::-webkit-slider-thumb {
                      appearance: none;
                      width: 18px;
                      height: 18px;
                      border-radius: 50%;
                      background: ${volume < 0.3 ? '#ef4444' : volume < 0.7 ? '#f59e0b' : '#3b82f6'};
                      cursor: pointer;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                      transition: all 0.2s ease;
                    }
                    input[type="range"]::-webkit-slider-thumb:hover {
                      transform: scale(1.2);
                      box-shadow: 0 3px 8px rgba(0,0,0,0.3);
                    }
                    input[type="range"]::-moz-range-thumb {
                      width: 18px;
                      height: 18px;
                      border-radius: 50%;
                      background: ${volume < 0.3 ? '#ef4444' : volume < 0.7 ? '#f59e0b' : '#3b82f6'};
                      cursor: pointer;
                      border: none;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                      transition: all 0.2s ease;
                    }
                    input[type="range"]::-moz-range-thumb:hover {
                      transform: scale(1.2);
                      box-shadow: 0 3px 8px rgba(0,0,0,0.3);
                    }
                  `}</style>
                </div>
                
                {/* Volume Percentage */}
                <div 
                  className="text-sm font-bold min-w-[3rem] text-center"
                  style={{
                    color: volume === 0 ? '#94a3b8' : volume < 0.3 ? '#ef4444' : volume < 0.7 ? '#f59e0b' : '#3b82f6'
                  }}
                >
                  {Math.round(volume * 100)}%
                </div>
              </div>
            </div>
          )}

          {/* Volume Toggle Button for Mobile */}
          {isMobile && (
            <button
              onClick={toggleVolumeSlider}
              className="absolute -top-14 right-0 bg-white/95 backdrop-blur-sm shadow-lg rounded-full p-3 transition-all duration-300 active:scale-95"
              aria-label="Toggle volume"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{
                  color: volume === 0 ? '#94a3b8' : volume < 0.3 ? '#ef4444' : volume < 0.7 ? '#f59e0b' : '#3b82f6'
                }}
              >
                {volume === 0 ? (
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                ) : volume < 0.5 ? (
                  <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                ) : (
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                )}
              </svg>
            </button>
          )}

          <div className="bg-gradient-to-br from-primary to-accent shadow-2xl rounded-full p-1">
            <button
              onClick={togglePlay}
              className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? (
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                  <div className="w-1 h-6 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              ) : (
                <svg
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Label */}
          <div className="absolute -top-12 right-0 bg-primary/90 text-white px-3 py-2 rounded-lg whitespace-nowrap text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p>JVKE - Next to You 🎵</p>
          </div>
        </div>
      )}

      {/* Info banner when music starts - DIHAPUS */}
    </>
  )
}
