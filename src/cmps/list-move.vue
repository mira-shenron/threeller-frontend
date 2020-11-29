<template>
  <div v-if="currList">
    <form @submit.prevent="moveList">
      <label class="select-display clickable flex column">
        <span class="position-span">Position</span>
        <span class="idx-span">{{ currIdx + 1 }}</span>
        <el-select v-model="currIdx" placeholder="Select">
          <el-option
            v-for="(list, idx) in lists"
            :key="list.id"
            :value="idx"
            :disabled="list.id === currList.id"
          >
            {{ idx + 1 }} <span v-if="list.id === currList.id">(current)</span>
          </el-option>
        </el-select>
      </label>
      <el-button @click="moveList" type="success">Move List</el-button>
    </form>
  </div>
</template>

<script>
import { eventBus, MOVE_LIST } from "@/services/event-bus.service.js";

export default {
  name: "list-move",
  props: {
    currList: {
      type: Object,
    },
  },
  data() {
    return {
      currIdx: null,
    };
  },
  computed: {
    lists() {
      return this.$store.getters.currBoard.groups;
    },
  },
  methods: {
    moveList() {
      console.log(this.currIdx, this.currList.id);
      eventBus.$emit(MOVE_LIST, {
        newIdx: this.currIdx,
        listId: this.currList.id,
      });
    },
  },
  created() {
    this.currIdx = this.lists.findIndex((list) => list.id === this.currList.id);
  },
};
</script>