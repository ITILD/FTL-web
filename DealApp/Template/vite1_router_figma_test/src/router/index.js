import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Index from '../views/sys/Index.vue'
import Simple from '../views/sys/Simple.vue'

// const routerHistory = createWebHistory('/apps/Template/vite1_router/dist/')
// 历史路由根目录 VITE_BASE = '/vite1_router/dist/'
const routerHistory = createWebHistory(process.env.VITE_BASE)


const router = createRouter({
  history: routerHistory,
  routes: [{
      path: '',
      component: Index
    },
    {
      path: '/Simple',
      component: Simple
    },
    {
      path: '/RouterChildren',
      component: () =>
        import(
          '../views/sys/RouterChildren.vue'
        ),
    },
    {
      path: '/Vuex',
      component: () =>
        import(
          '../views/sys/Vuex.vue'
        ),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/VuexChange',
      component: () =>
        import(
          '../views/sys/VuexChange.vue'
        ),
    },
    {
      // path: '',
      // component: Index,
      // children: [
      //   // -----------------------------------------------当前测试
      //   {
      //     path: '',
      //     name: 'FullProject',
      //     // component: Index1,
      //     component: () =>
      //       import(
      //         '../views/App/Templates/Index/Axios.vue'
      //       ),
      //   },
      //   // -----------------------------------------------Cesium
      //   // {
      //   //   path: '/App/GL/Cesium/CesiumStart',
      //   //   // path: '/App/GL/Cesium/CesiumStart',
      //   //   name: 'CesiumStart',
      //   //   component: () => import('../views/App/GL/Cesium/CesiumStart.vue'),
      //   // },
      //   // {
      //   //   path: '/App/GL/Cesium/CesiumTest',
      //   //   name: 'CesiumTest',
      //   //   component: () => import('../views/App/GL/Cesium/CesiumTest.vue'),
      //   // },
      //   // // -----------------------------------------------Babylon
      //   // {
      //   //   path: '/App/GL/Babylon/BabylonStart',
      //   //   // path: '/App/GL/Babylon/BabylonStart',
      //   //   name: 'BabylonStart',
      //   //   component: () => import('../views/App/GL/Babylon/BabylonStart.vue'),
      //   // },
      //   // {
      //   //   path: '/App/GL/Babylon/BabylonTest',
      //   //   name: 'BabylonTest',
      //   //   component: () => import('../views/App/GL/Babylon/BabylonTest.vue'),
      //   // },
      //   // {
      //   //   path: '/App/GL/Babylon/BabylonBatch',
      //   //   name: 'BabylonBatch',
      //   //   component: () => import('../views/App/GL/Babylon/BabylonBatch.vue'),
      //   // },
      //   // {
      //   //   path: '/App/GL/Babylon/BabylonBatch_WithTrangle',
      //   //   name: 'BabylonBatch_WithTrangle',
      //   //   component: () => import('../views/App/GL/Babylon/BabylonBatch_WithTrangle.vue'),
      //   // },
      // ]
    }
    // ,
    // {}
  ]
})

export default router