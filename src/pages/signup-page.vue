<template>
  <section>
      <h2>Sign Up</h2>
      <form @submit.prevent="doSignup">
        <input type="text" v-model="signupCred.email" placeholder="Email" />
        <br />
        <input type="text" v-model="signupCred.password" placeholder="Password"/>
        <br />
        <input type="text"  v-model="signupCred.username" placeholder="Full Name"/>
        <br />
        <button class="btn">Signup</button>
      </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      signupCred: {},
      msg: '',
    }
  },
  methods: {
    doSignup() {
      const cred = this.signupCred
      if (!cred.email || !cred.password || !cred.username) return this.msg = 'Please fill up the form'
      this.$store.dispatch({ type: 'signup', userCred: cred })
      this.$router.push('/home')
    }
  }
}
</script>
