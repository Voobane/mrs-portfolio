import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Assets load from the site root, so pages like /projects/personal find them
  base: '/',

  // Used by `npm start` (`vite preview`) when the site runs as a Render Web Service:
  // listen on the port Render provides and accept requests for these domains
  // (a leading dot also allows subdomains, such as www.mrsportfolio.com)
  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    allowedHosts: ['.mrsportfolio.com', '.onrender.com'],
  },
})
