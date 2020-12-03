<template>
  <div class="board-menu">
    <div
      v-if="actionType"
      @click="changeMenuAction('')"
      class="back-btn flex align-center clickable"
    >
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="board-menu-header">
      <div class="board-menu-title">
        {{ actionType ? actionType : "Menu" }}
      </div>
    </div>
    <div @click="closeBoardMenu" class="close-btn flex align-center clickable">
      <i class="el-icon-close"></i>
    </div>
    <div class="board-menu-content">
      <slot name="edit-body">
        <ul class="board-actions clean-list">
          <li
            @click="changeMenuAction('Change Background')"
            class="change-bgc-li clickable"
          >
            Change Background
          </li>
          <li>Search Cards</li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    actionType: {
      type: String,
    },
  },
  methods: {
    closeBoardMenu() {
      this.$emit("emmiToggleBoardMenu");
    },
    changeMenuAction(newType) {
      if (this.actionType === "Colors" || this.actionType === "Photos") {
        this.$emit("emitChangeMenuAction", "Change Background");
      } else this.$emit("emitChangeMenuAction", newType);
    },
  },
  created() {
    console.log(this.actionType);
  },
};
</script>