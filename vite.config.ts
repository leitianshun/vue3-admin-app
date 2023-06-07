import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      AutoImport({
        imports: ['vue', 'pinia', 'vue-router'],
        dirs: ['src/stores/*', 'src/utils', 'src/api/*/*'],
        resolvers: [ElementPlusResolver()],
      }),
      VueComponents({
        dirs: ['src/components'],
        resolvers: [ElementPlusResolver()],
        types: [],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve', // 保证开发阶段可以使用mock接口
      }),
      vue(),
      UnoCSS(),

    ],
    css: { // 配置全局变量css
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss"; ',
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVER, // 目标url
          changeOrigin: true, // 需要代理跨域,这个要打开
          rewrite: path => path.replace(/^\/api/, ''), // 路径重写
        },
      },
    },
  }
})
