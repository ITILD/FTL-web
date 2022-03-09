import { createStore } from 'vuex'
import { moduleA } from './modulesTest/moduleA'
 
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  getters: {
    countGetter: (state) => {
      return 'Getter处理:'+ state.count
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  // 模块化
  modules: {
    ma: moduleA
  }
})

store.commit('increment')

console.log(store.state.count) // -> 1
 
export default store