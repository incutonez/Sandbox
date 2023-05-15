import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    // Per https://stackoverflow.com/a/74856116/1253609, we need to include CommonJS code like this
    include: ['shared-differ']
  }
})
