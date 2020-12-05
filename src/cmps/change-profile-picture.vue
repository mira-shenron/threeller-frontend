<template>
  <div class="change-profile-container">
    <span class="action-header">Choose Image</span>
    <input
      @change="onUploadImg($event)"
      name="profile-pic-uploader"
      type="file"
      placeholder="Insert URL Here..."
    />
  </div>
</template>
<script>
import { uploadImg } from "@/services/img-upload.service.js";
import { eventBus, UPDATE_USER } from "@/services/event-bus.service.js";
export default {
  name: "change-profile-picture",
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async onUploadImg(ev) {
      const res = await uploadImg(ev);
      const userCred = JSON.parse(JSON.stringify(this.user));
      userCred.imgUrl = res.url;
      if (!userCred.imgUrl) return;
      this.$emit("onCloseProfileMenu");
      this.$store.dispatch({
        type: "updateUser",
        userCred,
      });
      eventBus.$emit(UPDATE_USER, userCred);
    },
  },
  created() {
    this.user = this.$store.getters.loggedInUser;
  },
};
</script>