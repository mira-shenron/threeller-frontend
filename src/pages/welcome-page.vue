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
            width="500px"
            src="../assets/imgs/orange.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="section-three-container">
        <div class="grid-container">
          <h6>Core features</h6>
          <div class="section flex">
              <h5>
                Redesigned <br />
                Interface
              </h5>
              <span>
                Designed to put focus on your needs and comfort. <br />
                Enjoy an intuitive UI that’s out of your way, keeping you in
                <br />
                the zone, working the way you want.
              </span>
          </div>
          <div class="section flex">
            <h5>
              Information At <br />
              A Glance
            </h5>
            <span>
              Dive into the details by adding comments, <br />
              attachments, due dates, and more directly to Threeller cards.
              <br />
              Collaborate on projects from beginning to end.
            </span>
          </div>
          <div class="section flex">
            <h5>
              Work With Any <br />
              Team
            </h5>
            <span>
              Whether it’s for work, a side project <br />
              or even the next family vacation, <br />
              Trello helps your team stay organized.
            </span>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">Coming Soon</footer>
  </section>
</template>

<script>
// @ is an alias to /src


export default {
  components: {

  },
  computed: {

  },
  created(){
    this.$store.dispatch({ type: 'loadUsers' });
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

