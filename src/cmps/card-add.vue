<template>
  <section class="card-composer" v-click-outside="closeAddCard">
    <div class="add-card-container">
        <el-input
          @change="addCard"
          ref="textarea"
          class="list-card-composer-textarea"
          type="textarea"
          autosize
          resize="none"
          placeholder="Enter title for this card..."
          v-model="txt"
        >
        </el-input>
    </div>
    <div class="card-controls flex">
      <el-button type="success" @click="addCard">Add Card</el-button>
      <div class="cancel-btn flex align-center clickable" @click="closeAddCard">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </section>
</template>

<script>
import vClickOutside from "v-click-outside";
export default {
  name: "card-add",
  data() {
    return {
      txt: "",
    };
  },
  methods: {
    addCard() {
      if (this.txt === "") return;
      this.$emit("emitAddCard", this.txt);
      this.txt = "";
    },
    closeAddCard() {
      this.$emit("emitCloseAddCard");
      this.txt = "";
    },
  },
  mounted() {
    this.$refs.textarea.focus();
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>