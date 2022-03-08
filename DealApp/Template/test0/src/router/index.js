import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  IndexInfo
} from './IndexInfo.js'

import Index from '../views/Index.vue'
import {
  filterAsyncRoutes
} from './filterAsyncRoutes.js'
const routerHistory = createWebHistory()

// const children = []
// mock json转路由
// filterAsyncRoutes(IndexInfo.workList, children)
// const router = createRouter({
//   history: routerHistory,
//   routes: [
//   {
//     path: '',
//     component: Index,
//     children: children

//   }
//   // ,
//   // other

// ]

// })

const router = createRouter({
  history: routerHistory,
  routes: [{
    path: '',
    component: Index,
    children: [
      // -----------------------------------------------当前测试
      {
        path: '',
        name: 'FullProject',
        // component: Index1,
        component: () =>
          import(
            '../views/App/Templates/Index/Axios.vue'
          ),
      },
      // -----------------------------------------------Cesium
      // {
      //   path: '/App/GL/Cesium/CesiumStart',
      //   // path: '/App/GL/Cesium/CesiumStart',
      //   name: 'CesiumStart',
      //   component: () => import('../views/App/GL/Cesium/CesiumStart.vue'),
      // },
      // {
      //   path: '/App/GL/Cesium/CesiumTest',
      //   name: 'CesiumTest',
      //   component: () => import('../views/App/GL/Cesium/CesiumTest.vue'),
      // },
      // // -----------------------------------------------Babylon
      // {
      //   path: '/App/GL/Babylon/BabylonStart',
      //   // path: '/App/GL/Babylon/BabylonStart',
      //   name: 'BabylonStart',
      //   component: () => import('../views/App/GL/Babylon/BabylonStart.vue'),
      // },
      // {
      //   path: '/App/GL/Babylon/BabylonTest',
      //   name: 'BabylonTest',
      //   component: () => import('../views/App/GL/Babylon/BabylonTest.vue'),
      // },
      // {
      //   path: '/App/GL/Babylon/BabylonBatch',
      //   name: 'BabylonBatch',
      //   component: () => import('../views/App/GL/Babylon/BabylonBatch.vue'),
      // },
      // {
      //   path: '/App/GL/Babylon/BabylonBatch_WithTrangle',
      //   name: 'BabylonBatch_WithTrangle',
      //   component: () => import('../views/App/GL/Babylon/BabylonBatch_WithTrangle.vue'),
      // },
    ]
  }
  // ,
  // {}
]
})

export default router






/*
const router = createRouter({
  history: routerHistory,
  routes: [
  {
    path: '',
    component: Index,
    children:
     [
      // -----------------------------------------------当前测试
      {
        path: '',
        name: 'FullProject',
        component: Index1,
        // component: () =>
        //   import(
        //     '../views/App/Index/FullProject.vue'
        //   ),
      },
      // -----------------------------------------------Cesium
      {
        path: '/App/GL/Cesium/CesiumStart',
        // path: '/App/GL/Cesium/CesiumStart',
        name: 'CesiumStart',
        component: () => import('../views/App/GL/Cesium/CesiumStart.vue'),
      },
    ],
  },
  {
    path: '/EasyCAD',
    name: 'EasyCAD',
    component: () => import('../views/App/EasyCAD/Index.vue'),
  },
    {
      path: 'novel',
      name: 'App_EasyCAD_Index',
      component: () => import('../views/App/Library/novel.vue'),
    }, ]
})
*/