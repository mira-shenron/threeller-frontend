<template>
  <div v-if="currList">
    <form @submit.prevent="copyList">
      <label class="action-header" for="list-name" ref="autofocus"> Name </label>
      <el-input
        autosize
        resize="none"
        placeholder="Please enter list name..."
        type="textarea"
        id="list-name"
        v-model="newList.title"
      >
      </el-input>
      <el-button @click="copyList" type="success">Create List</el-button>
    </form>
  </div>
</template>

<script>
import { eventBus, COPY_LIST } from "@/services/event-bus.service.js";
import utilService from "../services/util.service";
export default {
  name: "list-copy",
  props: {
    currList: {
      type: Object,
    },
  },
  data() {
    return {
      newList: null,
    };
  },
  methods: {
    copyList() {
      if (!this.newList.title || !this.newList) return;
      eventBus.$emit(COPY_LIST, {list: this.newList, currId: this.currList.id});
    },
  },
  created() {
    console.log(this.currList);
    this.newList = JSON.parse(JSON.stringify(this.currList));
    this.newList.id = utilService.makeId();
  },
  mounted(){
    this.$refs.autofocus.focus()
  }
};
</script>