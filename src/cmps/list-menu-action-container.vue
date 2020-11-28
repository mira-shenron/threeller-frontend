<template>
  <div class="list-menu">
    <div @click="backToMenu" class="back-btn flex align-center clickable">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="list-menu-header">{{ actionType }}</div>
    <div @click="closeListMenu" class="close-btn flex align-center clickable">
      <i class="el-icon-close"></i>
    </div>
    <div class="list-menu-content">
      <slot name="edit-body"></slot>
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
    closeListMenu() {
      this.$emit("emitCloseMenu");
      },
    backToMenu() {
      this.$emit("emitClearMenuAction", null);
      },
  },
};
</script>