<template>
  <section class="welcome-container flex column">
    <header class="welcome-header">
      <div class="welcome-nav flex space-between align-center">
        <div class="logo">
          <span class="logo-first">Three</span
          ><span class="logo-last">ller.</span>
        </div>
        <div class="nav-links">
          <a class="clickable" @click="goToLoginPage">Login</a>
          <a class="clickable" @click="goToSignupPage">Sign Up</a>
          <a class="clickable" @click="guestLogin">Continue as guest</a>
        </div>
      </div>
    </header>
    <div class="main-section">
      <div class="section-one">
        <h6>task manager</h6>
        <h2>Organize it all.</h2>
        <a class="clickable start-here" @click="guestLogin">Start here ></a>
        <div>
          <img
            class="img-one"
            width="600px"
            src="../assets/imgs/tasks.png"
            alt=""
          />
        </div>
      </div>
      <div class="section-two-container">
        <div class="section-two flex">
          <div class="flex column">
            <h6>All favorite features</h6>
            <h5>
              Get the same functions<br />
              with better design
            </h5>
          </div>
          <div>Placeholder</div>
        </div>
      </div>
    </div>
    <footer class="footer">Footer Placeholder</footer>
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

