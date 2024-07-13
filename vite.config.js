import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from "vite-plugin-eslint"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),eslint()],

    server: {
      port: 3000, // or any other port you prefer
      host: '0.0.0.0', // this binds the server to all available IP addresses
    },
  
})
