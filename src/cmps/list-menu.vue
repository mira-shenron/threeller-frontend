<template>
  <section>
    <div class="list-menu">
      <div class="list-menu-header">List Actions</div>
      <div @click="closeListMenu" class="close-btn flex align-center clickable">
        <i class="el-icon-close"></i>
      </div>
      <div class="list-menu-content">
        <ul class="clean-list list-actions">
          <li @click="openAddCardCmp">Add Card...</li>
          <li @click="chooseAction('copyList')">Copy List...</li>
          <li @click="chooseAction('moveList')">Move List...</li>
        </ul>
        <ul class="clean-list list-actions">
          <li>
            <span @click="toggleDeletelist" v-if="!isShowDelete"
              >Delete This List</span
            >
            <list-delete
              :listId="listId"
              @emmitToggleDeletelist="toggleDeletelist"
              v-if="isShowDelete"
            ></list-delete>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import listDelete from "@/cmps/list-delete";
export default {
  name: "list-menu",
  props: {
    listId: String,
  },
  data() {
    return {
      isShowDelete: null,
    };
  },
  components: {
    listDelete,
  },
  methods: {
    closeListMenu() {
      this.$emit("emitCloseMenu");
    },
    chooseAction(type) {
      this.$emit("emitChooseAction", type);
    },
    openAddCardCmp() {
      this.$emit("emitOpenAddCard");
    },
    toggleDeletelist() {
      this.isShowDelete = !this.isShowDelete;
    },
  },
};
</script>