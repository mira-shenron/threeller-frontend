<template>
  <section class="login-page">
    <div class="login-section">
      <h1 class="logo clickable">Threeller</h1>
      <h2>Login To Threeller</h2>

      <el-input
        class="input"
        placeholder="Enter email"
        v-model="loginCred.email"
        clearable
      ></el-input>

      <el-input
        class="input"
        placeholder="Enter password"
        v-model="loginCred.password"
        show-password
      ></el-input>
      <div>
        <el-button
          class="login-btn"
          size="medium"
          type="success"
          @click="doLogin"
          >Login</el-button
        >
      </div>
    </div>
  </section>
</template>


<script>
export default {
  created() {

  },
  data() {
    return {
      loginCred: {},
      msg: ''
    }
  },
  methods: {
    async doLogin() {
      const cred = this.loginCred
      if (!cred.email || !cred.password) return this.msg = 'Please enter user/password'
      try {
        await this.$store.dispatch({ type: 'login', userCred: cred })
        this.loginCred = {};
        this.$router.push('/threeller/home');
      } catch (e) {
        console.log(e);
        this.handleFailedLogin();
      }
    },
    handleFailedLogin() {
      this.loginCred = {};
      this.$alert('Wrong email or password', 'Login failed', {
        confirmButtonText: 'OK',
        callback: () => { }
      });
    }

    // doLogout() {
    //   this.$store.dispatch({ type: 'logout' })
    // },
  }
}
</script>
