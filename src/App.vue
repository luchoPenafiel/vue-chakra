<template>
  <!-- <c-theme-provider> -->
  <!-- <c-reset> -->
  <c-box>
    <router-view />
  </c-box>
  <!-- </c-reset> -->
  <!-- </c-theme-provider> -->
</template>

<script lang="js">
// import { CThemeProvider, CBox, CReset } from '@chakra-ui/vue'

export default {
  name: 'App',
  // components: {
  //   CBox,
  //   CReset,
  //   CThemeProvider,
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
