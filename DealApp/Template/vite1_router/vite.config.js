import {
  defineConfig,
  loadEnv
} from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/

export default ({
  mode
}) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())//合并其他配置
  };
  console.log('node环境配置:', mode)


  // export default defineConfig({
  return defineConfig({
    // base:'./',
    // base:'/vite1_router/dist/',
    base: process.env.VITE_BASE,
    plugins: [vue()],
    define: {
      'process.env': process.env
    },
    server: {
      host: '0.0.0.0',
      port: process.env.VITE_PORT,
    },
    build: {
      // 拆分块
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
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