<!--  -->
<template>
  <div> <button>test</button></div>
</template>

<script >
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: '',
      setup() {
          //开始创建组件
          const object = reactive({ foo: 'bar' })
          //组件挂载页面之前执行
          onBeforeMount(() => {})
          //组件挂载到页面之后执行
          onMounted(() => {})
          return {
              object,
          }
      }
  };
</script>
<style scoped>
</style>