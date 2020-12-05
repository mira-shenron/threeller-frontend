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
      const url = await uploadImg(ev).url;
      console.log(res);
      const user = JSON.parse(JSON.stringify(this.user));
      user.imgUrl = url;
      if (!url) return;
      this.$emit("onCloseProfileMenu");
      this.$store.dispatch({
        type: "updateUser",
        user,
      });
      eventBus.$emit(UPDATE_USER, url);
    },
  },
  created() {
    this.user = this.$store.getters.loggedInUser;
  },
};
</script>