a<template>
  <header class="app-header flex align-center space-between">
    <nav class="left-nav flex">
      <div class="nav-btn flex align-center">
        <i @click.stop="goToWelcomePage" class="el-icon-s-home"></i>
      </div>
      <div class="nav-btn flex align-center">
        <i  @click.stop="goToHomePage" class="el-icon-s-grid"></i>
      </div>
    </nav>
    <h1 class="logo"><span>Three</span>ller</h1>
    <nav class="right-nav flex justify-center align-center">
      <div class="flex relative">
        <avatar
          :src="imgUrl"
          class="user-avatar clickable"
          @click.native="toggleShowProfileMenu"
          :fullname="username"
          :size="32"
        ></avatar>
        <button class="clickable logout-btn" @click="logout">Logout</button>
        <profile-menu
          :actionType="actionType"
          v-if="isShowProfileMenu"
          @emitChangeAction="changeAction"
          @onCloseProfileMenu="toggleShowProfileMenu"
        >
          <change-profile-picture
            v-if="actionType === 'Change Profile Picture'"
            slot="edit-profile"
            @onCloseProfileMenu="toggleShowProfileMenu"
          />
        </profile-menu>
      </div>
    </nav>
  </header>
</template>

<script>
import Avatar from "vue-avatar-component";
import profileMenu from "@/cmps/profile-menu.vue";
import changeProfilePicture from "@/cmps/change-profile-picture.vue";

export default {
  name: "app-header",
  data() {
    return {
      isShowProfileMenu: false,
      actionType: null,
    };
  },
  methods: {
    goToWelcomePage(){
       this.$router.push("/");
    },
    goToHomePage() {
      this.$router.push("/threeller/home");
    },
    logout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
    toggleShowProfileMenu() {
      this.isShowProfileMenu = !this.isShowProfileMenu;
      this.actionType = null
    },
    changeAction(actionType) {
      this.actionType = actionType;
      console.log(actionType);
    },
  },
  components: {
    Avatar,
    profileMenu,
    changeProfilePicture,
  },
  computed: {
    username() {
      return this.$store.getters.loggedInUser.fullName;
    },
    imgUrl() {
      return this.$store.getters.loggedInUser.imgUrl;
    }
  },
};
</script>