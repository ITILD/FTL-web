import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { minifyHtml } from 'vite-plugin-html'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import viteCompression from 'vite-plugin-compression'
import htmlPlugin from 'vite-plugin-html-config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression(),
    viteExternalsPlugin({
      cesium: 'Cesium',
      // "ant-design-vue": "antd"
    }),
    htmlPlugin({
      links: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/cesium@1.90.0/Build/Cesium/Widgets/widgets.css',
        },
      ],
      scripts: [
        `window['CESIUM_BASE_URL'] = 'https://cdn.jsdelivr.net/npm/cesium@1.90.0/Build/Cesium/'`,
        {
          // src: "https://cdn.jsdelivr.net/npm/cesium@1.90.0/Build/Cesium/Cesium.js",
          src: 'https://cdn.jsdelivr.net/npm/cesium@1.90.0/Build/Cesium/Cesium.min.js',
        },
      ],
      // 字节cdn有问题
    }),
    viteSingleFile(),
    minifyHtml(),
  ],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        manualChunks: () => 'everything.js',
      },
    },
  },
})
