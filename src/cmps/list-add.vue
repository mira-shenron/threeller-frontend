<template>
  <div class="add-list-container">
    <transition name="list-animation">
      <div
        v-if="!isShowAddList"
        class="list-placeholder-container"
        @click.stop="openAddListComposer"
      >
        <span class="list-placeholder flex align-center">
          <div class="svg-container flex align-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path
                class="plus"
                d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
              />
            </svg>
          </div>
          <div class="add-list-text">Add another list</div>
        </span>
      </div>
    </transition>
    <transition name="list-animation">
      <div
        v-if="isShowAddList"
        class="add-list-composer"
        v-click-outside="closeAddListComposer"
      >
        <form @submit.prevent="addList">
          <el-input
            ref="addListInput"
            type="text"
            placeholder="Enter list title..."
            v-model="listName"
          />
        </form>
        <transition name="list-controls-animation">
          <div v-show="isRunAnimation" class="list-controls flex">
            <el-button type="success" @click="addList">Add List</el-button>
            <div
              class="cancel-btn flex align-center clickable"
              @click="closeAddListComposer"
            >
              <i class="el-icon-close"></i>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { boardService } from "../services/board.service.js";
export default {
  name: "list-add",
  data() {
    return {
      listName: "",
      isShowAddList: false,
      isRunAnimation: false,
    };
  },
  methods: {
    addList() {
      this.$nextTick(() => {
        this.$refs.addListInput.focus();
      });
      if (this.listName === "") return;
      var list = boardService.getEmptyList(this.listName);
      this.$emit("emitAddList", list);
      this.listName = "";
    },
    openAddListComposer() {
      this.isShowAddList = true;
      setTimeout(() => (this.isRunAnimation = true), 85);
      this.$nextTick(() => {
        this.$refs.addListInput.focus();
      });
    },
    closeAddListComposer() {
      this.isRunAnimation = false     
      this.isShowAddList = false;
    },
  },
};
</script>