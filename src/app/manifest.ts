import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'Workshop App',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/vercel.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/vercel.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  }
}