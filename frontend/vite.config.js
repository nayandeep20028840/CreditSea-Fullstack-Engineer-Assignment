import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://creditsea-fullstack-engineer-assignment.onrender.com/',
    },
  },
  plugins: [react()],
  build: {
    outDir: 'build', // Ensure output directory is "dist"
  },
})
