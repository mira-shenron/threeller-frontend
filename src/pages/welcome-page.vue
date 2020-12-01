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
        <div class="section-two flex justify-center space-between">
          <div class="flex column">
            <h6>All favorite features</h6>
            <h5>
              Get the same functionality<br />
              with better design<br />
              You don`t even need account to start. <br />
              Explore and enjoy
            </h5>
          </div>
          <img
            class="img-two"
            width="450px"
            src="../assets/imgs/better.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="section-three-container">
        <h6>Core features</h6>
        <div class="flex">
          <h5>Redesigned Interface</h5>
          <span>
            Designed to put focus on your canvas and creativity. Enjoy an
            intuitive UI that’s out of your way, keeping you in the zone,
            working the way you want.
          </span>
        </div>
        <div class="flex">
          <h5>Advanced Layer System</h5>
          <span>
            With PSD compatibility and the ability to export layers as web-ready
            PNG files, multiple page PDFs, or frames of an animated GIF, PNG or
            MP4. Pocket gives everybody the power to create stunning graphics on
            the go.
          </span>
        </div>
        <div class="flex">
          <h5>Silica-M Painting Engine</h5>
          <span>
            Procreate is built from the ground up to give you the most fluid
            painting experience with beautiful colors, pixel perfect painting,
            and even better performance than ever before.
          </span>
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

