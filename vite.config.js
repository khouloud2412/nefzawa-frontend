import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Indispensable pour gérer les chemins

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // On définit nos raccourcis
      '@shared': path.resolve(__dirname, './src/shared'),
      '@main': path.resolve(__dirname, './src/platforms/main'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
})