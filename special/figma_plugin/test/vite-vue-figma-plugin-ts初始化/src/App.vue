<template>
  <!-- <img width="50px" alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <RectangleCreatorDemo />
  测试椭球
  <CesiumGloble style="z-index:-999" />
  <TemplateVue />
  
</template>

<script setup lang="ts">
import TemplateVue from './components/qkui/Template.vue';


import CesiumGloble from './components/CesiumGloble.vue'
import HelloWorld from './components/HelloWorld.vue'
import RectangleCreatorDemo from './components/RectangleCreatorDemo.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
