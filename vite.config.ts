import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'],
      dirs:['src/stores']
    }),
    VueComponents({
      dirs: ['src/components'],
      resolvers: [],
      types: [],
    }),
    vue()],
})
