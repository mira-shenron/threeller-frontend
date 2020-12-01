<template>
  <div class="main-layout" id="app">
    <app-header />
    <router-view class="main-content"/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: poppins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>

<script>
import appHeader from "../cmps/app-header.vue";
export default {
  components: {
    appHeader,
  },
  created() {
      this.$store.dispatch({
        type: "loadBoards",
      });
  },
};
</script>
