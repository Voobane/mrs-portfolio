import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' makes every asset path relative, so the built site works on
// GitHub Pages no matter what the repository is called.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
