const modules =
  import.meta.glob('../views/*/*/*/*.vue')
/**
 * 转化路由component实例化动态导入本地文件
 * @param routes asyncRoutes
 */
// console.log('modules', modules)

function filterAsyncRoutes(arrays, children) {
  arrays.forEach(element => {
    if (element.completeness > 0) {
      let path = (element.realPath!=null)?element.realPath:element.key
      let child = {
        path: path,
        name: element.title,
        component: modules[`../views${element.key}.vue`]
      }
      children.push(child)
    }
    element.children && filterAsyncRoutes(element.children,children)
  });
}


export { filterAsyncRoutes }