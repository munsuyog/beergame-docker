import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  preview: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000, // Use the PORT environment variable or default to 3000
  },
})
