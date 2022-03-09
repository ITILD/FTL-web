
<template>
  <div>Vuex</div>
  <div>
    <table border="1">
      <tr>
        <th>属性</th>
        <th>值</th>
      </tr>
      <tr>
        <td>按钮:</td>
        <td><button @click="incrementTest">count++</button></td>
      </tr>
      <tr>
        <td>store_state_count_first:</td>
        <td>{{ store_state_count_first }}</td>
      </tr>
      <tr>
        <td>store_state_count:</td>
        <td>{{ store_state_count }}</td>
      </tr>

         <tr>
        <td>按钮:</td>
        <td><button @click="incrementTest_ma">count++</button></td>
      </tr>
      <tr>
        <td>store_state_ma_count:</td>
        <td>{{ store_state_ma_count }}</td>
      </tr>
      <tr>
        <td>store_getters_ma_count_get:</td>
        <td>{{ store_getters_ma_count_get }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
//
const store_state_count_first = ref(0);
store_state_count_first.value = store.state.count;
// 动态绑定一种方式
const store_state_count = computed(() => {
  return store.state.count;
});

// const store_state_count_get = ref(0);//
const store_state_count_get = computed(() => store.getters.countGetter);

let incrementTest = () => {
  store.commit("increment");
  store_state_count_first.value = store.state.count;
  //   console.log(this.$store.state.count);F
};



// 模块A
const store_state_ma_count_first = ref(0);
store_state_ma_count_first.value = store.state.ma.count;
// 动态绑定一种方式
const store_state_ma_count = computed(() => {
  return store.state.ma.count;
});

// const store_state_count_get = ref(0);//
const store_getters_ma_count_get = computed(() => store.getters['ma/countGetter']);

let incrementTest_ma = () => {
  store.commit("ma/increment");
  store_state_count_first.value = store.state.count;
  //   console.log(this.$store.state.count);F
};
</script>
