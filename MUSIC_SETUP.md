# Setup Musik untuk Birthday Page

## Cara Menambahkan Musik JVKE "Next to You"

Saat ini, komponen musik player sudah terintegrasi dan akan otomatis diputar saat pengguna menggulir ke bawah. Anda memiliki beberapa opsi untuk menambahkan file musik:

### Opsi 1: Gunakan URL dari Platform Streaming (Recommended)
Edit file `components/music-player.tsx` pada bagian `<source>` dan ganti dengan URL musik Anda:

```tsx
<source
  src="public\music\next to you - JVKE.mp3"
  type="audio/mpeg"
/>
```

### Opsi 2: Upload ke Vercel Blob Storage
1. Upload file MP3 ke Vercel Blob Storage
2. Copy URL yang didapatkan
3. Paste di komponen music-player.tsx

### Opsi 3: Gunakan File Lokal (Public Folder)
1. Letakkan file MP3 di folder `/public/music/`
2. Ubah src menjadi: `src="/music/jvke-next-to-you.mp3"`

## Catatan Penting
- File audio harus dalam format MP3 atau format yang didukung browser
- Gunakan file dengan ukuran yang reasonable (untuk performa lebih baik)
- Autoplay mungkin diblokir oleh beberapa browser - user masih bisa klik tombol untuk memutar

## Testing
1. Buka halaman dan scroll ke bawah
2. Pemain musik akan muncul di kanan bawah
3. Klik tombol untuk memutar/pause musik

Selamat! 🎵
