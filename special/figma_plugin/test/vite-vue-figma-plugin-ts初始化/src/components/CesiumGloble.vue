

<template>
  <div id="cesiumContainer"></div>
</template>



<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as Cesium from "cesium";
// defineProps<{ msg: string }>()
// const count = ref(0);
onMounted(() => {
  const viewer = new Cesium.Viewer("cesiumContainer");
  viewer.scene.debugShowFramesPerSecond = true;
});
// // 停止;
// Cesium.Ion.defaultAccessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YWVjNGJlZC05MjEzLTRlNDEtYjcwYy05NzY2NmJiMzBjNGQiLCJpZCI6MTExODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTgzNzQ5MTV9.0jiPX8lzZIYzTd-tzeNju0hOFnBmMyxiPtxSeXaA8s0";
</script>
