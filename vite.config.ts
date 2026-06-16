import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/agent-skill-html-deck/',
  plugins: [react()],
})
