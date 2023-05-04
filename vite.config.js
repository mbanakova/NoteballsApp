import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }, css: {
    preprocessorOptions: {
      scss: {
        // Both ways can
        additionalData: '@import "@/assets/scss/vars.scss";'
        // additionalData: '@use "@/assets/scss/global.scss" as *;'
      }
    }
  }
})
