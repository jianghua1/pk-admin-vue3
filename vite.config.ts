import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import I18n from '@intlify/unplugin-vue-i18n/vite'
import { visualizer } from 'rollup-plugin-visualizer'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VpAutoImports, VpComponentsResolver } from 'el-admin-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'
import { viteMockServe } from 'vite-plugin-mock'
import UnoCSS from 'unocss/vite'
import { cdn } from 'vite-plugin-cdn2'
import { VitePWA } from 'vite-plugin-pwa'

import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const isProd = mode === 'production'
  const base = isProd ? process.env.BASE_PATH || '/' : './'
  const isSourceMap = process.env.SOURCE_MAP === 'true'
  const isAnalysis = process.env.ANALYSIS === 'true'
  const EPComponentsResolver = isProd ? [] : [ElementPlusResolver()]
  return {
    base,
    build: {
      sourcemap: isSourceMap,
      emptyOutDir: true
    },
    plugins: [
      AutoImport({
        include: [
          /.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /.vue$/,
          /.vue?vue/, // .vue
          /.md$/ // .md
        ],

        // global imports to register
        imports: [
          // presets
          'vue',
          'vue-router',
          '@vueuse/core',
          VpAutoImports
        ],
        resolvers: isProd ? [] : [ElementPlusResolver()],
        vueTemplate: true
      }),
      Components({
        directoryAsNamespace: false,
        collapseSamePrefixes: true,
        resolvers: [...EPComponentsResolver, VpComponentsResolver]
      }),
      VueRouter(),
      AutoImport({
        include: [
          /.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /.vue$/,
          /.vue?vue/, // .vue
          /.md$/ // .md
        ],
        imports: ['vue', VueRouterAutoImports, '@vueuse/core', VpAutoImports],
        resolvers: isProd ? [] : [ElementPlusResolver()],
        vueTemplate: true
      }),
      Layouts({
        layoutsDirs: 'src/layouts',
        defaultLayout: 'default'
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: true
      }),
      UnoCSS(),
      cdn({
        // 1.0.0版本之后，不再支持
        // url: 'https//unpkg.com',
        logLevel: 'warn',
        resolve: {
          name: 'custom',
          setup({ extra }) {
            const { version, name, relativeModule } = extra
            const baseURL = 'https://unpkg.com'
            const attrs: any = {}
            if (name === 'sortablejs') {
              attrs.async = true
            }
            if (['echarts', 'vditor', 'video.js'].includes(name)) {
              attrs.defer = true
            }
            return {
              url: `${baseURL}/${name}@${version}/${relativeModule?.replace('./', '')}`,
              attrs
            }
          }
        },
        modules: [
          { name: 'vue', relativeModule: './dist/vue.global.prod.js' },
          'vue-demi',
          { name: 'pinia', relativeModule: './dist/pinia.iife.prod.js' },
          // 关注issue: https://github.com/nonzzz/vite-plugin-cdn/issues/30
          // { name: 'vue-router',aliases: ['auto', 'auto/routes'], relativeModule: './dist/vue-router.global.prod.js' },
          {
            name: 'element-plus',
            aliases: ['lib', 'es'],
            spare: [
              { url: 'https://unpkg.com/element-plus@2.4.2/dist/index.css' },
              { url: 'https://unpkg.com/element-plus@2.4.2/theme-chalk/dark/css-vars.css' }
            ]
          },
          {
            name: 'echarts',
            aliases: ['core', 'renderers', 'components', 'features', 'charts']
          },
          {
            name: 'vue-i18n',
            relativeModule: './dist/vue-i18n.global.prod.js'
          },
          {
            name: 'sortablejs',
            global: 'Sortable',
            relativeModule: './Sortable.min.js'
          },
          {
            name: 'vditor',
            global: 'Vditor',
            relativeModule: './dist/index.min.js',
            spare: 'https://unpkg.com/vditor@3.9.6/dist/index.css'
          },
          {
            name: 'video.js',
            global: 'videojs',
            relativeModule: './dist/video.min.js',
            spare: 'https://unpkg.com/video.js@8.6.1/dist/video-js.min.css'
          }
        ]
      }),
      VitePWA({
        manifest: {
          name: 'Vite App',
          short_name: 'Vite App',
          theme_color: '#ffffff',
          icons: [
            {
              src: path.join(base, '/192x192.png'),
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: path.join(base, '/512x512.png'),
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        registerType: 'autoUpdate'
      }),
      vue({
        script: {
          defineModel: true,
          propsDestructure: true
        }
      }),
      vueJsx(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      I18n({
        include: [path.resolve(__dirname, './locales/**')],
        // 说明:由于配置了modules/i18n.ts中默认为legacy: false
        // 所以禁止修改
        compositionOnly: true,
        jitCompilation: true
      }),
      visualizer({
        open: isAnalysis
      })
      // FilterPlugin()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://toimc.cn:8787',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/dev': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev/, '')
        }
      }
    },
    define: {
      'process.env': process.env,
      __APP_VERSION__: JSON.stringify(version)
    },
    optimizeDeps: {
      include: isProd
        ? []
        : [
            'element-plus',
            'dayjs',
            'element-plus/es/components/**/style/css',
            // 'element-plus/es/components/button/style/css',
            // 'element-plus/es/components/radio-button/style/css',
            // 'element-plus/es/components/radio-group/style/css',
            // 'element-plus/es/components/table/style/css',
            // 'element-plus/es/components/pagination/style/css',
            // 'element-plus/es/components/icon/style/css',
            // 'element-plus/es/components/input/style/css',
            // 'element-plus/es/components/popover/style/css',
            // 'element-plus/es/components/tag/style/css',
            // 'element-plus/es/components/loading/style/css',
            'sortablejs'
          ]
    }
  }
})
