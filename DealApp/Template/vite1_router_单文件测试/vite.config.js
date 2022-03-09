import {
  defineConfig,
  loadEnv
} from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
// import { minifyHtml } from 'vite-plugin-html'
// https://vitejs.dev/config/

// import { createHtmlPlugin } from 'vite-plugin-html'

export default ({
  mode
}) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()) //合并其他配置
  };
  console.log('node环境配置:', mode)


  // export default defineConfig({
  return defineConfig({
    // base:'./',
    // base:'/vite1_router/dist/',
    base: process.env.VITE_BASE,
    plugins: [
      vue(),
      viteSingleFile(),
      // minifyHtml() 
    ],
    define: {
      'process.env': process.env
    },
    server: {
      host: '0.0.0.0',
      port: process.env.VITE_PORT,
    },
    build: {
      target: "esnext",
      assetsInlineLimit: 100000000,
      chunkSizeWarningLimit: 100000000,
      cssCodeSplit: false,
      brotliSize: false,
      // 拆分块
      rollupOptions: {
        inlineDynamicImports: true,
        output: {
          manualChunks: () => "everything.js",
        },
      }
    }

    /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
    resolve: {
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ]
    },
    */
  })

}