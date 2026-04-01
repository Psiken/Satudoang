import BirthdayGreeting from '@/components/birthday-greeting'
import BestWishes from '@/components/best-wishes'
import PhotoGallery from '@/components/photo-gallery'
// import BestMoments from '@/components/best-moments'
import MusicPlayer from '@/components/music-player'

export default function Home() {
  return (
    <main className="w-full bg-background">
      <BirthdayGreeting />
      <BestWishes />
      <PhotoGallery />
      {/* <BestMoments /> */}
      <MusicPlayer />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-primary/10 to-accent/10 border-t border-primary/20 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center text-foreground/70">
          <p className="text-sm">
            Dibuat dengan 💜 untuk merayakan hari istimewamu
          </p>
          <p className="text-xs mt-2 text-foreground/50">
            Semoga sehat selalu, bahagia, selamat di dunia dan di akhirat, dikelilingi dengan orang-orang yang baik, dijauhkan dari segala bahaya, dan panjang umur yaa sayang... 🎂✨
          </p>
        </div>
      </footer>
    </main>
  )
}
