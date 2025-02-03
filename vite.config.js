import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3001,
    strictPort: true,
    hmr: {
      port: 3001
    }
  },
  build: {
    chunkSizeWarningLimit: 1600,
  }
})