

<template>
<div id="cesiumContainer" style="width: 100vw; height:100vh"></div>
</template>



<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>


<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{ msg: string }>()

const count = ref(0)

// 停止;
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YWVjNGJlZC05MjEzLTRlNDEtYjcwYy05NzY2NmJiMzBjNGQiLCJpZCI6MTExODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTgzNzQ5MTV9.0jiPX8lzZIYzTd-tzeNju0hOFnBmMyxiPtxSeXaA8s0";
const viewer = new Cesium.Viewer("cesiumContainer");
viewer.scene.debugShowFramesPerSecond = true;
// const cyanPolygon = viewer.entities.add({
//   name: "Cyan vertical polygon with per-position heights and outline",
//   polygon: {
//     hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
//       120.0,
//       41.0,
//       0.0,
//       120.0,
//       41.0,
//       10000.0,
//       120.0001,
//       41.0,
//       0.0
//     ]),

//     perPositionHeight: true,
//     // material: Cesium.Color.CYAN.withAlpha(0.5),
//     outline: true,
//     outlineColor: Cesium.Color.BLACK
//   }
// });



</script>
