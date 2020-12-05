<template>
  <div class="list-menu">
        <div v-if="actionType" @click="changeAction(null)" class="back-btn flex align-center clickable">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="list-menu-header">
      {{ actionType ? actionType : "Account" }}
    </div>
    <div
      @click="closeProfileMenu"
      class="close-btn flex align-center clickable"
    >
      <i class="el-icon-close"></i>
    </div>
    <div class="list-menu-content">
      <slot name="edit-profile">
        <ul class="clean-list list-actions">
          <li @click="changeAction('Change Profile Picture')">Chanage Profile Picture</li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "profile-menu",
  props:{
    actionType: String,
  },
  methods: {
    closeProfileMenu() {
      this.$emit("onCloseProfileMenu");
    },
    changeAction(actionType){
      this.$emit('emitChangeAction', actionType)
    }
  },
};
</script>