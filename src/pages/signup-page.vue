<template>
  <section class="login-page">
    <div class="login-section">
      <div class="logo">
        <span class="logo-first">Three</span
        ><span class="logo-last">ller.</span>
      </div>
      <h2>Sign Up</h2>
      <el-input
        class="input"
        placeholder="Enter email"
        v-model="signupCred.email"
        clearable
      ></el-input>
      <el-input
        class="input"
        placeholder="Enter password"
        v-model="signupCred.password"
        show-password
      ></el-input>
      <el-input
        class="input"
        placeholder="Enter full name"
        v-model="signupCred.username"
      ></el-input>
      <div>
        <el-button class="login-btn" size="medium" type="info" @click="doSignup"
          >Sign Up</el-button
        >
      </div>
    </div>
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
      this.$router.push('/threeller/home')
    }
  }
}
</script>
