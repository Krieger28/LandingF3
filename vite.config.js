import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Optimiza automáticamente las fotos de src/assets/images:
    // las redimensiona (nunca agranda), las comprime y genera AVIF + WebP.
    imagetools({ removeMetadata: true }),
  ],
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
  },
})
