a<template>
  <header class="app-header flex align-center space-between">
    <nav class="left-nav flex">
      <div class="nav-btn flex align-center">
        <i @click.stop="goToWelcomePage" class="el-icon-s-home"></i>
      </div>
      <div class="nav-btn flex align-center">
        <i @click.stop="goToHomePage" class="el-icon-s-grid"></i>
      </div>
    </nav>
    <h1 class="logo"><span>Three</span>ller</h1>
    <nav class="right-nav flex justify-center align-center">
      <div class="flex">
        <avatar class="user-avatar" :fullname="username" :size="32"></avatar>
        <button class="clickable logout-btn" @click="logout">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script>
import Avatar from "vue-avatar-component";

export default {
  name: "app-header",
  methods: {
    goToHomePage() {
      this.$router.push("/threeller/home");
    },
    goToWelcomePage() {
      this.$router.push("/");
    },
    logout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
  },
  components: {
    Avatar,
  },
  computed: {
    username() {
      return this.$store.getters.loggedinUser.fullName;
    },
  },
};
</script>