<template>
  <div class="color-photo-container">
    <el-input
      v-model="txt"
      placeholder="Search photos in Unsplash..."
      @change="searchPhotos"
      type="text"
    >
      <i
        @click="searchPhotos"
        slot="suffix"
        class="el-input__icon el-icon-search clickable"
      ></i>
    </el-input>
    <div v-if="photos" class="color-photo-grid">
      <div
        class="photo-wrapper clickable"
        v-for="photo in photos"
        :key="photo.id"
      >
        <img class="unsplash-photo" :src="photo.urls.thumb" />
        <div @click="changeBg(photo.urls.raw)" class="cover"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus, CHANGE_BGP } from "@/services/event-bus.service.js";
import unsplashService from "@/services/unsplash.service.js";
export default {
  name: "background-chooser",
  data() {
    return {
      txt: "",
      photos: null,
    };
  },
  methods: {
    async searchPhotos() {
      const res = await unsplashService.searchPhotos(this.txt);
      this.photos = res;
    },
    changeBg(url) {
      eventBus.$emit(CHANGE_BGP, url);
    },
  },
};
</script>