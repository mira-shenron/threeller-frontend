<template>
  <section class="card-delete">
    <div
      @click="toggleDeletelist"
      class="close-btn close-list-btn flex align-center clickable"
    >
      <i class="el-icon-close"></i>
    </div>
    <div class="list-delete-text">
      All actions will be removed from the activity feed and you won’t be able
      to re-open the list. There is no undo.
    </div>
    <el-button @click.stop="onDeleteList" type="danger">Delete</el-button>
  </section>
</template>

<script>
import { eventBus, DELETE_LIST } from "@/services/event-bus.service.js";
export default {
  props: {
    listId: String,
  },
  methods: {
    addActivity(txt) {
      this.$store.commit({ type: "setCurrActivityText", activityTxt: txt });
    },
    onDeleteList() {
      this.addActivity(`Deleted list`);
      eventBus.$emit(DELETE_LIST, this.listId);
    },
    toggleDeletelist() {
      this.$emit("emmitToggleDeletelist");
    },
  },

};
</script>