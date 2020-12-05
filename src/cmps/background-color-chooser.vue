<template>
  <div class="color-chooser-container">
    <div class="color-chooser-grid">
      <div @click.stop="changeBgc(color)" v-for="(color, idx) in colors" :key="idx" :class="color" class="grid-color clickable">
      <div class="cover"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {eventBus, CHANGE_BGC} from "@/services/event-bus.service.js";
export default {
  name: "background-chooser",
  data() {
    return {
      colors: [
        "green",
        "yellow",
        "orange",
        "red",
        "purple",
        "blue",
        "sky",
        "pink",
        "grey",
      ],
    };
  },
  methods: {
    changeBgc(color) {
      eventBus.$emit(CHANGE_BGC, color);
    },
  },
};
</script>