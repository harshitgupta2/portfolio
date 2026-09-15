import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Keep the animation vendors in their own chunks so the app code can be
        // re-deployed without busting their cache entries.
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion'))
            return 'motion'
          return undefined
        },
      },
    },
  },
})
