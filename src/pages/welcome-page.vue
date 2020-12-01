<template>
  <section class="home-page">
    <div class="welcome-nav">
      <h2>Welcome</h2>
      <el-button type="primary" @click="goToLoginPage" round>Login</el-button>
      <el-button type="warning" round @click="goToSignupPage">Sign Up</el-button>
      <el-button type="success" round @click="guestLogin">Continue as guest</el-button>
    </div>
    <br>
    <div class="welcome-layout">
      <el-row :gutter="20">
        <el-col :span="10"
          ><img src="../assets/imgs/clear.jpg" class="grid-content" alt=""
        /></el-col>
        <el-col :span="14"
          ><div class="grid-content bg-purple-dark">cool stuff</div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="14"
          ><div class="grid-content bg-purple">cool stuff</div></el-col
        >
        <el-col :span="10"
          ><img src="../assets/imgs/not-ideal.jpg" class="grid-content" alt=""
        /></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10"
          ><img src="../assets/imgs/ideal.jpg" class="grid-content" alt=""
        /></el-col>
        <el-col :span="14"
          ><div class="grid-content bg-purple">cool stuff</div></el-col
        >
      </el-row>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src


export default {
  components: {

  },
  computed: {

  },
  methods: {
    goToLoginPage() {
      this.$router.push('/login');
    },
    goToSignupPage() {
      this.$router.push('/signup');
    },
    async guestLogin() {
      const cred = {
        email: 'guest@mail.com',
        password: 'guest',
      }
      await this.$store.dispatch({ type: 'login', userCred: cred })
      this.$router.push('/threeller/home');
    }
  }
};
</script>

