

<template>
  <!--侧边栏 -->
  <div id="sidebar" :class="{ 'show-sidebar': isshow }" @click="trans">
    <div>
      
    </div>
    test
  </div>
</template>



<style scoped>
#sidebar {
  transform: translateX(-100%);
  width: 100px;
  height: 100px;
  background-color: blueviolet;
}

.show-sidebar #sidebar {
  transform: none;
}
</style>


<script setup lang="ts">
import { ref, onMounted } from "vue";
const isshow = ref(true);
// const date = ref("");

let trans = () => {
  alert(111);
};
</script>
