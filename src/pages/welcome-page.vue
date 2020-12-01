<template>
  <section>
    <div>
      <h2>Welcome</h2>
      <button @click="goToLoginPage">Login</button>
      <button @click="goToSignupPage">Sign Up</button>
      <button @click="guestLogin">Continue as guest</button>
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
      this.$router.push('/home');
    }
  }
};
</script>

