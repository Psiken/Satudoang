/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'], // Modern format yang lebih ringan
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Thumbnail sizes
    minimumCacheTTL: 60, // Cache 60 detik
  },
}

export default nextConfig
