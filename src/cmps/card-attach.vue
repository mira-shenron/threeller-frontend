<template>
  <div>
    <input class="clickable attach" type="file" @change="onUploadImg($event)" />
    <el-button @click="addAtachment" type="success">Add Attachment</el-button>
  </div>
</template>
<script>
// import {
//   eventBus,
//   COPY_CARD,
//   CLOSE_DETAILS,
// } from "@/services/event-bus.service.js";
// import utilService from "../services/util.service";
import { uploadImg } from "@/services/img-upload.service.js";

export default {
  props: {
    currCard: {
      type: Object,
    },
  },
  data() {
    return {
      card: null,
      attachment: null,
    };
  },
  computed: {},
  methods: {
    async onUploadImg(ev) {
      const res = await uploadImg(ev);
      this.attachment = res.url;
    },
    addAtachment() {
      if (!this.attachment) return;
      console.log(this.attachment);
      this.card.attachment = this.attachment;
      this.$emit("updatingCard", this.card);
    },
  },
  created() {
    this.card = JSON.parse(JSON.stringify(this.currCard));
  },
};
</script>