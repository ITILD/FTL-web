import { defineConfig ,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],//插件列表
//   server:{
//     // host:"localhost",
//     host:'0.0.0.0',
//     // host:'82.157.51.203',
//     port:5000
//   }
// })

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  console.log('环境配置:', mode)

  showEvnInfo()

  return defineConfig({
    base: './',
    plugins: [
      vue(),
      // vitePluginCesium(),

    ],
    define: {

      // 'process.env': {}
    },
    server: {
      host:'0.0.0.0',
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

function showEvnInfo() {
  console.log('打包配置')
  console.log(process.env.NODE_ENV)
  console.log(process.env.VUE_APP_Cesium)
}
