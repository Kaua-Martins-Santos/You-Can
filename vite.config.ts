import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Tracker Premium',
        short_name: 'Tracker',
        description: 'Dashboard pessoal offline de acompanhamento corporal',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png', // Você pode colocar qualquer imagem 192x192 na pasta public/
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Você pode colocar qualquer imagem 512x512 na pasta public/
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})