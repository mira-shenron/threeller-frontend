<template>
  <div class="bgc-chooser-container">
    <div class="bgc-choose-type clickable">
      <div class="photo-image">
        <div @click="changeMenuAction('Photos')" class="cover"></div>
      </div>
      <div class="bgc-text">Photos</div>
    </div>
    <div @click="changeMenuAction('Colors')" class="bgc-choose-type clickable">
      <div class="color-image">
        <div class="cover"></div>
      </div>
      <div class="bgc-text">Colors</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "background-chooser",
  methods: {
    changeMenuAction(actionType) {
      this.$emit("emitChangeMenuAction", actionType);
    },
  },
};
</script>