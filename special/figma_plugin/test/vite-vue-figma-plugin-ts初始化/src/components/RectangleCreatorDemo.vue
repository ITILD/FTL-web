<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);

const create = () => {
  parent.postMessage(
    { pluginMessage: { type: "create-rectangles", count: count.value } },
    "*"
  );
};

const cancel = () => {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
};
</script>

<template>
  <div id="figma_info">
    <h2>Rectangle Creator</h2>
    <p>Count: <input id="count" v-model="count" /></p>
    <button @click="create">Create</button>
    <button @click="cancel">Cancel</button>
  </div>
</template>

<style>
#figma_info {
  left: 100px;
  top: 100px;
  position: absolute;
  z-index: 2;
}
</style>