<template>
  <!-- <v-app> -->
  <!-- <v-main> -->
  <!-- <keep-alive> -->
  | <router-link to="/">Index0</router-link> |
  <router-link to="/Simple">Simple</router-link> |
  <router-link to="/RouterChildren">RouterChildren</router-link> |
  <router-link to="/Vuex">Vuex</router-link> |
  <router-link to="/VuexChange">VuexChange</router-link> |
  <!-- <router-link to="/IndexSimple1">IndexSimple1</router-link>
    <router-link to="/IndexSimple1">IndexSimple1</router-link> -->
  <!-- <router-link to="/TheBabylons">TheBabylons</router-link> -->
  <!-- <keep-alive> -->
    <!-- <router-view></router-view> -->
  <!-- </keep-alive> -->
  <!-- 新版本keep-alive -->
  <router-view v-slot="{ Component }">
   <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <!-- </v-main> -->
  <!-- </v-app> -->
</template>

<script>
// import  "./assets/css/index/App.css";

export default {
  name: "App",
};
// 开发调试
window.debug_xu = !true;
// 运行调试
window.debug0_xu = !true;
</script>

