import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs',
  },
  // Pre-bundle heavy dependencies to speed up dev server startup
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
    ],
  },
  server: {
    // Improves performance on WSL/cross-filesystem setups
    watch: {
      usePolling: true,
    },
  },
})
