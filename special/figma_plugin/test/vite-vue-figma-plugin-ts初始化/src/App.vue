<template>
  <!-- <img width="50px" alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <CesiumGloble />
  <RectangleCreatorDemo />

  <TemplateVue />
  <SideBar />
</template>

<script setup lang="ts">
import TemplateVue from "./components/qkui/Template.vue";
import SideBar from "./components/qkui/SideBar.vue";

import CesiumGloble from "./components/CesiumGloble.vue";
import HelloWorld from "./components/HelloWorld.vue";
import RectangleCreatorDemo from "./components/RectangleCreatorDemo.vue";
</script>

<style>
body {
  margin: 0;
}
</style>
