import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'],
      dirs: ['src/stores'],
      resolvers: [ElementPlusResolver()],
    }),
    VueComponents({
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver()],
      types: [],
    }),
    vue(),
    UnoCSS(),

  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
    },
  },
})
