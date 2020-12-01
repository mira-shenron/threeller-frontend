<template>
  <section>
    <h2>Login</h2>
    <form @submit.prevent="doLogin">
      <input type="text" v-model="loginCred.email" placeholder="Email" />
      <br />
      <input type="text" v-model="loginCred.password" placeholder="Password" />
      <br />
      <button class="btn">Login</button>
    </form>
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
      await this.$store.dispatch({ type: 'login', userCred: cred })
      this.loginCred = {};
      this.$router.push('/home');
    },

    // doLogout() {
    //   this.$store.dispatch({ type: 'logout' })
    // },
  }
}
</script>
