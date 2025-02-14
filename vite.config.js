import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Logger/', //Git repository name is Logger
  plugins: [react()],
})
