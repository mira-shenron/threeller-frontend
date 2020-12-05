<template>
  <div class="main-layout" id="app">
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
export default {
  components: {

  },
  created() {
      this.$store.dispatch({
        type: "loadBoards",
      });
  },
};
</script>
