let moduleA = {
  // 你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块
  // https://vuex.vuejs.org/zh/guide/modules.html#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  getters: {
    countGetter: (state) => 'moduleA:' + state.count
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  }
}


export {
  moduleA
}